import type { ForcedChoiceAnswer, ForcedChoiceQuestion } from '../types/arcana';

interface Props {
  question: ForcedChoiceQuestion;
  answer: ForcedChoiceAnswer | undefined;
  onAnswer: (answer: ForcedChoiceAnswer) => void;
}

export function ArcanaForcedChoiceQuestion({ question, answer, onAnswer }: Props) {
  return (
    <div className="arcana-choices" role="radiogroup" aria-label={question.text}>
      {question.options.map((option) => (
        <button
          key={option.key}
          type="button"
          className={`arcana-choice${answer?.optionKey === option.key ? ' is-selected' : ''}`}
          onClick={() => onAnswer({ type: 'forcedChoice', questionId: question.id, optionKey: option.key })}
          aria-pressed={answer?.optionKey === option.key}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}
