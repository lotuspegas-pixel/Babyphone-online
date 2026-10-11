import { useEffect, useRef, useState } from 'react';
import {
  ARCANA_QUESTIONS,
  FORCED_CHOICE_QUESTIONS,
  LIKERT_QUESTIONS,
  RANKING_QUESTIONS,
  SCENARIO_QUESTIONS,
} from '../data/arcanaQuestions';
import { beginPace, registreerWissel, resterendeMinuten } from '../lib/arcanaPace';
import type { ArcanaAnswer, ArcanaAnswerMap, QuestionType } from '../types/arcana';
import { ArcanaProgress } from './ArcanaProgress';
import { ArcanaQuestionRenderer } from './ArcanaQuestionRenderer';

interface Props {
  currentIndex: number;
  answers: ArcanaAnswerMap;
  onAnswer: (answer: ArcanaAnswer) => void;
  onNext: () => void;
  onPrevious: () => void;
  onPause: () => void;
}

/**
 * Vaste bloktypering van de 120 vragen: eerst 72 korte stellingen, dan 24
 * keuzes tussen twee, dan 16 situaties en tot slot 8 rangschikkingen — in die
 * volgorde in `ARCANA_QUESTIONS`. De voortgang tekent zich per blok (zie
 * ArcanaProgress) en de blokaanduiding telt binnen het eigen blok.
 */
const BLOCK_ORDER: QuestionType[] = ['likert', 'forcedChoice', 'scenario', 'ranking'];
const BLOCK_LENGTHS: Record<QuestionType, number> = {
  likert: LIKERT_QUESTIONS.length,
  forcedChoice: FORCED_CHOICE_QUESTIONS.length,
  scenario: SCENARIO_QUESTIONS.length,
  ranking: RANKING_QUESTIONS.length,
};
const BLOCK_TITLES: Record<QuestionType, string> = {
  likert: 'Stellingen',
  forcedChoice: 'Kiezen tussen twee',
  scenario: 'Situaties',
  ranking: 'Op volgorde zetten',
};
const BLOCKS = BLOCK_ORDER.map((type) => ({ title: BLOCK_TITLES[type], length: BLOCK_LENGTHS[type] }));
const BLOCK_STARTS: Record<QuestionType, number> = (() => {
  let offset = 0;
  const starts = {} as Record<QuestionType, number>;
  for (const type of BLOCK_ORDER) {
    starts[type] = offset;
    offset += BLOCK_LENGTHS[type];
  }
  return starts;
})();

/**
 * Pauze tussen het aanklikken van een antwoord en het doorschakelen. Lang
 * genoeg om de keuze te zien oplichten, kort genoeg om niet als wachten te
 * voelen.
 */
const ADVANCE_DELAY_MS = 260;

export function ArcanaTest({ currentIndex, answers, onAnswer, onNext, onPrevious, onPause }: Props) {
  const question = ARCANA_QUESTIONS[currentIndex];
  const answer = answers[question.id];
  const isLast = currentIndex === ARCANA_QUESTIONS.length - 1;
  const blockIndex = BLOCK_ORDER.indexOf(question.type);
  const positionInBlock = currentIndex - BLOCK_STARTS[question.type] + 1;

  // Tempo van deze sessie (zie arcanaPace.ts): alleen de tijd per vraag telt,
  // nooit de tijd sinds de start — die liep na een pauze op tot honderdduizenden
  // minuten.
  const [pace, setPace] = useState(() => beginPace(currentIndex, Date.now()));
  useEffect(() => {
    setPace((vorige) => registreerWissel(vorige, currentIndex, Date.now()));
  }, [currentIndex]);
  const remainingMinutes = resterendeMinuten(pace, Object.keys(answers).length, ARCANA_QUESTIONS.length);

  /**
   * Richting van de bladwissel: vooruit schuift het nieuwe blad van rechts
   * in, terug van links (CSS op data-dir; bij reduced motion staat het er
   * meteen). Afgeleid tijdens het renderen uit de vorige index, zodat de
   * eerste render van het nieuwe blad de richting al kent.
   */
  const lastIndex = useRef(currentIndex);
  const direction = currentIndex < lastIndex.current ? 'back' : 'forward';
  useEffect(() => {
    lastIndex.current = currentIndex;
  }, [currentIndex]);

  /**
   * Focuskader-fix (A §3.9): de radiogroup-opties gebruiken per vraagtype
   * steeds dezelfde React-keys (1–7 voor Likert, de eigen optiesleutels voor
   * de rest), dus React hergebruikt hetzelfde DOM-knopelement over vragen
   * heen. Daardoor bleef de browserfocus na het doorschakelen op dezelfde
   * plek staan — wat er zonder toelichting uitziet alsof de nieuwe vraag al
   * beantwoord is. Bij elke wisseling van vraag verplaatst dit de focus
   * expliciet naar de kop van de nieuwe vraag, ongeacht het vraagtype: dat
   * werkt voor alle vier de vormen (incl. rangschikking, die geen
   * radiogroup is) en kondigt de nieuwe vraagtekst meteen aan voor
   * schermlezers.
   */
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [currentIndex]);

  /**
   * Rangschikvragen schakelen NIET automatisch door. Ze leggen bij het openen
   * al een antwoord vast (de beginvolgorde, zie ArcanaRankingQuestion) en
   * daarna opnieuw bij elke verschuiving. Automatisch doorschakelen zou zo'n
   * vraag dus meteen overslaan voordat de deelnemer iets heeft gesorteerd.
   * Die vier vraagsoorten met één klik per antwoord doen dat wél.
   */
  const autoAdvances = question.type !== 'ranking';

  /**
   * Of de deelnemer hier aankwam met een antwoord dat er al lag. Alleen dán is
   * een vooruit-knop nodig: bij het teruglopen door de test moet je verder
   * kunnen zonder je antwoord te hoeven wijzigen. Bij een verse vraag verschijnt
   * de knop niet — daar doet het automatisch doorschakelen het werk.
   *
   * Bewust afgeleid tijdens het renderen in plaats van in een effect: een effect
   * loopt pas ná de eerste render, waardoor de knop één frame lang verkeerd zou
   * staan.
   */
  const [arrival, setArrival] = useState(() => ({
    index: currentIndex,
    hadAnswer: Boolean(answers[ARCANA_QUESTIONS[currentIndex].id]),
  }));
  if (arrival.index !== currentIndex) {
    setArrival({ index: currentIndex, hadAnswer: Boolean(answer) });
  }

  const advanceTimer = useRef<number | null>(null);

  function handleAnswer(next: ArcanaAnswer) {
    onAnswer(next);

    if (!autoAdvances) return;
    // Twee snelle klikken achter elkaar mogen niet twee keer doorschakelen; het
    // laatst gekozen antwoord is al opgeslagen door de onAnswer hierboven.
    if (advanceTimer.current !== null) return;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    advanceTimer.current = window.setTimeout(
      () => {
        advanceTimer.current = null;
        onNext();
      },
      prefersReducedMotion ? 0 : ADVANCE_DELAY_MS,
    );
  }

  function stopPendingAdvance() {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }

  // Terug of pauzeren tijdens de korte pauze mag niet alsnog vooruit springen.
  function handlePrevious() {
    stopPendingAdvance();
    onPrevious();
  }

  function handlePause() {
    stopPendingAdvance();
    onPause();
  }

  const showForwardButton = !autoAdvances || arrival.hadAnswer;

  return (
    <div className="arcana-screen arcana-test">
      {/* Eén vraag per blad: een stuk gescheurd papier op het perkament. */}
      <div className="arcana-sheet arcana-test__sheet">
        <div className="arcana-sheet__paper arcana-torn">
          <ArcanaProgress
            current={currentIndex + 1}
            total={ARCANA_QUESTIONS.length}
            blocks={BLOCKS}
            blockIndex={blockIndex}
            positionInBlock={positionInBlock}
            remainingMinutes={remainingMinutes}
          />

          {/* De key laat het blad per vraag opnieuw monteren: zo schuift het in. */}
          <div className="arcana-test__page" key={currentIndex} data-dir={direction}>
            <h2 className="arcana-question-text" ref={headingRef} tabIndex={-1}>
              {question.text}
            </h2>

            <div className="arcana-question-body">
              <ArcanaQuestionRenderer question={question} answer={answer} onAnswer={handleAnswer} />
            </div>

            {autoAdvances && !arrival.hadAnswer && (
              <p className="arcana-test__hint">Kies een antwoord — de volgende vraag verschijnt vanzelf.</p>
            )}
          </div>

          <div className="arcana-test__nav">
            <button
              type="button"
              className="arcana-button arcana-button--ghost"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Vorige
            </button>
            <button
              type="button"
              className="arcana-button arcana-button--text"
              onClick={handlePause}
              aria-label="Pauzeren — je antwoorden blijven bewaard"
            >
              Pauzeren<span className="arcana-test__pause-hint"> — je antwoorden blijven bewaard</span>
            </button>
            {showForwardButton && (
              <button
                type="button"
                className="arcana-button arcana-button--primary"
                onClick={onNext}
                disabled={!answer}
              >
                {isLast ? 'Afronden — laat mijn rapport zien' : 'Volgende'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
