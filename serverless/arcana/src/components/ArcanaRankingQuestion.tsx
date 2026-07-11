import { useEffect, useState } from 'react';
import type { RankingAnswer, RankingQuestion } from '../types/arcana';

interface Props {
  question: RankingQuestion;
  answer: RankingAnswer | undefined;
  onAnswer: (answer: RankingAnswer) => void;
}

export function ArcanaRankingQuestion({ question, answer, onAnswer }: Props) {
  const [order, setOrder] = useState<string[]>(answer?.order ?? question.items.map((i) => i.key));

  useEffect(() => {
    const initial = answer?.order ?? question.items.map((i) => i.key);
    setOrder(initial);
    if (!answer) {
      onAnswer({ type: 'ranking', questionId: question.id, order: initial });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    const next = order.slice();
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    onAnswer({ type: 'ranking', questionId: question.id, order: next });
  }

  const itemByKey = new Map(question.items.map((i) => [i.key, i]));

  return (
    <ol className="arcana-ranking" aria-label={question.text}>
      {order.map((key, index) => {
        const item = itemByKey.get(key);
        if (!item) return null;
        return (
          <li key={key} className="arcana-ranking__item">
            <span className="arcana-ranking__rank">{index + 1}</span>
            <span className="arcana-ranking__text">{item.text}</span>
            <span className="arcana-ranking__controls">
              <button
                type="button"
                aria-label={`${item.text} omhoog`}
                disabled={index === 0}
                onClick={() => move(index, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                aria-label={`${item.text} omlaag`}
                disabled={index === order.length - 1}
                onClick={() => move(index, 1)}
              >
                ↓
              </button>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
