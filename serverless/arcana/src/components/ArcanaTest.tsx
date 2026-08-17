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

export function ArcanaTest({ currentIndex, answers, onAnswer, onNext, onPrevious, onPause }: Props) {
  const question = ARCANA_QUESTIONS[currentIndex];
  const answer = answers[question.id];
  const isAnswered = Boolean(answer);
  const isLast = currentIndex === ARCANA_QUESTIONS.length - 1;
  const blockLabel = BLOCK_LABELS[question.type];

  return (
    <div className="arcana-screen arcana-test">
      <div className="arcana-card arcana-test__card">
        <ArcanaProgress current={currentIndex + 1} total={ARCANA_QUESTIONS.length} blockLabel={blockLabel} />

        <h2 className="arcana-question-text">{question.text}</h2>

        <div className="arcana-question-body">
          <ArcanaQuestionRenderer question={question} answer={answer} onAnswer={onAnswer} />
        </div>

        <div className="arcana-test__nav">
          <button
            type="button"
            className="arcana-button arcana-button--ghost"
            onClick={onPrevious}
            disabled={currentIndex === 0}
          >
            Vorige
          </button>
          <button type="button" className="arcana-button arcana-button--text" onClick={onPause}>
            Pauzeren
          </button>
          <button
            type="button"
            className="arcana-button arcana-button--primary"
            onClick={onNext}
            disabled={!isAnswered}
          >
            {isLast ? 'Afronden' : 'Volgende'}
          </button>
        </div>
      </div>
    </div>
  );
}
