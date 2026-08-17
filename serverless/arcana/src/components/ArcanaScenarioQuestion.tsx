import { useRef } from 'react';
import type { ScenarioAnswer, ScenarioQuestion } from '../types/arcana';

interface Props {
  question: ScenarioQuestion;
  answer: ScenarioAnswer | undefined;
  onAnswer: (answer: ScenarioAnswer) => void;
}

export function ArcanaScenarioQuestion({ question, answer, onAnswer }: Props) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const options = question.options;

  function select(key: string) {
    onAnswer({ type: 'scenario', questionId: question.id, optionKey: key });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % options.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + options.length) % options.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = options.length - 1;
    }
    if (nextIndex !== null) {
      event.preventDefault();
      select(options[nextIndex].key);
      optionRefs.current[nextIndex]?.focus();
    }
  }

  const selectedIndex = options.findIndex((option) => answer?.optionKey === option.key);

  return (
    <div className="arcana-choices arcana-choices--scenario" role="radiogroup" aria-label={question.text}>
      {options.map((option, index) => {
        const isSelected = answer?.optionKey === option.key;
        const isTabbable = selectedIndex === -1 ? index === 0 : isSelected;
        return (
          <button
            key={option.key}
            type="button"
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            className={`arcana-choice${isSelected ? ' is-selected' : ''}`}
            onClick={() => select(option.key)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isTabbable ? 0 : -1}
          >
            <span className="arcana-choice__key">{option.key}</span>
            <span>{option.text}</span>
          </button>
        );
      })}
    </div>
  );
}
