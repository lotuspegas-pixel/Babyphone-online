interface ArcanaProgressProps {
  current: number;
  total: number;
  blockLabel?: string;
  /** Geschatte resterende tijd in hele minuten; ontbreekt zolang er te weinig tempo bekend is. */
  remainingMinutes?: number;
}

export function ArcanaProgress({ current, total, blockLabel, remainingMinutes }: ArcanaProgressProps) {
  const percent = Math.round((current / total) * 100);
  return (
    <div
      className="arcana-progress"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`Vraag ${current} van ${total}${blockLabel ? `, ${blockLabel}` : ''}`}
    >
      {blockLabel && <p className="arcana-progress__block">{blockLabel}</p>}
      <div className="arcana-progress__track">
        <div className="arcana-progress__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="arcana-progress__label">
        Vraag {current} van {total}
        {remainingMinutes != null &&
          ` · nog ongeveer ${remainingMinutes} ${remainingMinutes === 1 ? 'minuut' : 'minuten'}`}
      </span>
    </div>
  );
}
