import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { RankingAnswer, RankingQuestion } from '../types/arcana';

interface Props {
  question: RankingQuestion;
  answer: RankingAnswer | undefined;
  onAnswer: (answer: RankingAnswer) => void;
}

/** Pijl omhoog of omlaag als getekende lijn (currentColor), geen letterteken. */
function Arrow({ up }: { up: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {up ? <path d="M8 13V3M4 7l4-4 4 4" /> : <path d="M8 3v10M4 9l4 4 4-4" />}
    </svg>
  );
}

export function ArcanaRankingQuestion({ question, answer, onAnswer }: Props) {
  const [order, setOrder] = useState<string[]>(answer?.order ?? question.items.map((i) => i.key));
  const listRef = useRef<HTMLOListElement>(null);
  const [dragKey, setDragKey] = useState<string | null>(null);

  useEffect(() => {
    const initial = answer?.order ?? question.items.map((i) => i.key);
    setOrder(initial);
    if (!answer) {
      onAnswer({ type: 'ranking', questionId: question.id, order: initial });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  function commit(next: string[]) {
    setOrder(next);
    onAnswer({ type: 'ranking', questionId: question.id, order: next });
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    const next = order.slice();
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  }

  /**
   * Slepen met de aanwijzer (muis, vinger, pen): de greep vangt de pointer
   * en zodra die boven een andere rij hangt, schuift het item daarheen —
   * elke verschuiving wordt meteen vastgelegd, net als bij de knoppen. Geen
   * bibliotheek en geen HTML-drag-and-drop (dat werkt niet op touch). De
   * knoppen blijven de toetsenbordweg; de greep zelf is pointer-only.
   */
  function startDrag(event: PointerEvent<HTMLSpanElement>, key: string) {
    if (event.button !== 0) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Geen actieve pointer (bv. een synthetisch event): dan werkt het
      // slepen alleen zolang de aanwijzer boven de greep blijft.
    }
    setDragKey(key);
  }

  function drag(event: PointerEvent<HTMLSpanElement>, key: string) {
    if (dragKey !== key || !listRef.current) return;
    const from = order.indexOf(key);
    const rows = Array.from(listRef.current.children) as HTMLElement[];
    const to = rows.findIndex((row) => {
      const box = row.getBoundingClientRect();
      return event.clientY >= box.top && event.clientY <= box.bottom;
    });
    if (to === -1 || to === from) return;
    const next = order.slice();
    next.splice(from, 1);
    next.splice(to, 0, key);
    commit(next);
  }

  function endDrag() {
    setDragKey(null);
  }

  const itemByKey = new Map(question.items.map((i) => [i.key, i]));

  return (
    <ol className="arcana-ranking" aria-label={question.text} ref={listRef}>
      {order.map((key, index) => {
        const item = itemByKey.get(key);
        if (!item) return null;
        return (
          <li key={key} className={`arcana-ranking__item${dragKey === key ? ' is-dragging' : ''}`}>
            <span
              className="arcana-ranking__grip"
              aria-hidden="true"
              onPointerDown={(event) => startDrag(event, key)}
              onPointerMove={(event) => drag(event, key)}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <svg viewBox="0 0 10 16" width="10" height="16" fill="currentColor">
                <circle cx="3" cy="3" r="1.3" />
                <circle cx="7" cy="3" r="1.3" />
                <circle cx="3" cy="8" r="1.3" />
                <circle cx="7" cy="8" r="1.3" />
                <circle cx="3" cy="13" r="1.3" />
                <circle cx="7" cy="13" r="1.3" />
              </svg>
            </span>
            <span className="arcana-ranking__rank">{index + 1}</span>
            <span className="arcana-ranking__text">{item.text}</span>
            <span className="arcana-ranking__controls">
              <button
                type="button"
                aria-label={`${item.text} omhoog`}
                disabled={index === 0}
                onClick={() => move(index, -1)}
              >
                <Arrow up />
              </button>
              <button
                type="button"
                aria-label={`${item.text} omlaag`}
                disabled={index === order.length - 1}
                onClick={() => move(index, 1)}
              >
                <Arrow up={false} />
              </button>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
