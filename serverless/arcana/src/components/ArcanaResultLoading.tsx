import { useEffect, useState } from 'react';

const MESSAGES = [
  'Je antwoorden worden gespiegeld…',
  'Patronen worden herkend…',
  'Spanningsvelden worden opgebouwd…',
  'Je rapport wordt samengesteld…',
];

interface Props {
  onDone: () => void;
}

export function ArcanaResultLoading({ onDone }: Props) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 1500);
    const timeout = setTimeout(onDone, 6000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="arcana-screen arcana-loading" role="status" aria-live="polite">
      <div className="arcana-loading__mark" aria-hidden="true" />
      <p className="arcana-loading__text">{MESSAGES[messageIndex]}</p>
    </div>
  );
}
