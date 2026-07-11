import type { ScenarioAnswer, ScenarioQuestion } from '../types/arcana';

interface Props {
  question: ScenarioQuestion;
  answer: ScenarioAnswer | undefined;
  onAnswer: (answer: ScenarioAnswer) => void;
}

export function ArcanaScenarioQuestion({ question, answer, onAnswer }: Props) {
  return (
    <div className="arcana-choices arcana-choices--scenario" role="radiogroup" aria-label={question.text}>
      {question.options.map((option) => (
        <button
          key={option.key}
          type="button"
          className={`arcana-choice${answer?.optionKey === option.key ? ' is-selected' : ''}`}
          onClick={() => onAnswer({ type: 'scenario', questionId: question.id, optionKey: option.key })}
          aria-pressed={answer?.optionKey === option.key}
        >
          <span className="arcana-choice__key">{option.key}</span>
          <span>{option.text}</span>
        </button>
      ))}
    </div>
  );
}
