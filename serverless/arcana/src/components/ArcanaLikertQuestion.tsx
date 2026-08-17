import { useRef } from 'react';
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

const VALUES = [1, 2, 3, 4, 5, 6, 7] as const;

interface Props {
  question: LikertQuestion;
  answer: LikertAnswer | undefined;
  onAnswer: (answer: LikertAnswer) => void;
}

export function ArcanaLikertQuestion({ question, answer, onAnswer }: Props) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function select(value: (typeof VALUES)[number]) {
    onAnswer({ type: 'likert', questionId: question.id, value: value as LikertAnswer['value'] });
  }

  // Volgt het WAI-ARIA radiogroup-patroon: pijltjestoetsen verplaatsen focus
  // én selectie binnen de groep, zodat je met twee toetsaanslagen een
  // stelling kunt beantwoorden in plaats van door 7 opties te moeten Tabben.
  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % VALUES.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + VALUES.length) % VALUES.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = VALUES.length - 1;
    }
    if (nextIndex !== null) {
      event.preventDefault();
      select(VALUES[nextIndex]);
      optionRefs.current[nextIndex]?.focus();
    }
  }

  const selectedIndex = VALUES.findIndex((value) => answer?.value === value);

  return (
    <div className="arcana-likert" role="radiogroup" aria-label={question.text}>
      {VALUES.map((value, index) => {
        const isSelected = answer?.value === value;
        const isTabbable = selectedIndex === -1 ? index === 0 : isSelected;
        return (
          <button
            key={value}
            type="button"
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            className={`arcana-likert__option${isSelected ? ' is-selected' : ''}`}
            onClick={() => select(value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isTabbable ? 0 : -1}
          >
            <span className="arcana-likert__number">{value}</span>
            <span className="arcana-likert__label">{LIKERT_LABELS[value]}</span>
          </button>
        );
      })}
    </div>
  );
}
