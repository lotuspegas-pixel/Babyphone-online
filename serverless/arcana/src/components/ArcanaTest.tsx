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

export function ArcanaTest({ currentIndex, answers, onAnswer, onNext, onPrevious, onPause }: Props) {
  const question = ARCANA_QUESTIONS[currentIndex];
  const answer = answers[question.id];
  const isAnswered = Boolean(answer);
  const isLast = currentIndex === ARCANA_QUESTIONS.length - 1;

  return (
    <div className="arcana-screen arcana-test">
      <div className="arcana-card arcana-test__card">
        <ArcanaProgress current={currentIndex + 1} total={ARCANA_QUESTIONS.length} />

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
