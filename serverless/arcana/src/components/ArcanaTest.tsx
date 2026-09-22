import { useRef, useState } from 'react';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import type { ArcanaAnswer, ArcanaAnswerMap } from '../types/arcana';
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

// Vaste bloktypering van de 120 vragen: eerst 72 korte stellingen, dan 24
// keuzes tussen twee, dan 16 situaties en tot slot 8 rangschikkingen. Dit
// label geeft de deelnemer ritme en zicht op afwisseling in plaats van één
// uniforme reeks van 120 gelijke vragen.
const BLOCK_LABELS: Record<string, string> = {
  likert: 'Deel 1 van 4 — korte stellingen',
  forcedChoice: 'Deel 2 van 4 — kiezen tussen twee',
  scenario: 'Deel 3 van 4 — situaties',
  ranking: 'Deel 4 van 4 — op volgorde zetten',
};

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
  const blockLabel = BLOCK_LABELS[question.type];

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
      <div className="arcana-card arcana-test__card">
        <ArcanaProgress current={currentIndex + 1} total={ARCANA_QUESTIONS.length} blockLabel={blockLabel} />

        <h2 className="arcana-question-text">{question.text}</h2>

        <div className="arcana-question-body">
          <ArcanaQuestionRenderer question={question} answer={answer} onAnswer={handleAnswer} />
        </div>

        {autoAdvances && !arrival.hadAnswer && (
          <p className="arcana-test__hint">Kies een antwoord — de volgende vraag verschijnt vanzelf.</p>
        )}

        <div className="arcana-test__nav">
          <button
            type="button"
            className="arcana-button arcana-button--ghost"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Vorige
          </button>
          <button type="button" className="arcana-button arcana-button--text" onClick={handlePause}>
            Pauzeren
          </button>
          {showForwardButton && (
            <button
              type="button"
              className="arcana-button arcana-button--primary"
              onClick={onNext}
              disabled={!answer}
            >
              {isLast ? 'Afronden' : 'Volgende'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
