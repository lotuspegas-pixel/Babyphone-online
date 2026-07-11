import type { LikertAnswer, LikertQuestion } from '../types/arcana';

const LIKERT_LABELS: Record<number, string> = {
  1: 'helemaal niet herkenbaar',
  2: 'nauwelijks herkenbaar',
  3: 'een beetje herkenbaar',
  4: 'neutraal / soms',
  5: 'behoorlijk herkenbaar',
  6: 'sterk herkenbaar',
  7: 'volledig herkenbaar',
};

interface Props {
  question: LikertQuestion;
  answer: LikertAnswer | undefined;
  onAnswer: (answer: LikertAnswer) => void;
}

export function ArcanaLikertQuestion({ question, answer, onAnswer }: Props) {
  return (
    <div className="arcana-likert" role="radiogroup" aria-label={question.text}>
      {[1, 2, 3, 4, 5, 6, 7].map((value) => (
        <button
          key={value}
          type="button"
          className={`arcana-likert__option${answer?.value === value ? ' is-selected' : ''}`}
          onClick={() => onAnswer({ type: 'likert', questionId: question.id, value: value as LikertAnswer['value'] })}
          aria-pressed={answer?.value === value}
        >
          <span className="arcana-likert__number">{value}</span>
          <span className="arcana-likert__label">{LIKERT_LABELS[value]}</span>
        </button>
      ))}
    </div>
  );
}
