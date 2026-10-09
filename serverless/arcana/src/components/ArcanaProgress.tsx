interface ProgressBlock {
  title: string;
  length: number;
}

interface ArcanaProgressProps {
  /** 1-based nummer van de huidige vraag in de hele test. */
  current: number;
  total: number;
  /** De vier blokken (stellingen, keuzes, situaties, rangschikkingen) met hun lengte. */
  blocks: ProgressBlock[];
  blockIndex: number;
  /** 1-based positie binnen het huidige blok. */
  positionInBlock: number;
  /** Geschatte resterende tijd in hele minuten; ontbreekt zolang er te weinig tempo bekend is. */
  remainingMinutes?: number;
}

/**
 * De voortgang als inktlijn: vier segmenten, één per blok, naar rato van
 * hun lengte (72 · 24 · 16 · 8). Elk segment tekent zich vol terwijl je
 * door dat blok gaat — alleen een transform, dus geen herlay-out per
 * antwoord. De blokaanduiding telt binnen het eigen blok ("3 van 72") in
 * plaats van "Deel 1 van 4", wat bij vraag 40 zou suggereren dat er nog
 * driemaal zoveel komt.
 */
export function ArcanaProgress({ current, total, blocks, blockIndex, positionInBlock, remainingMinutes }: ArcanaProgressProps) {
  const percent = Math.round((current / total) * 100);
  const block = blocks[blockIndex];
  const blockLabel = `${block.title} · ${positionInBlock} van ${block.length}`;
  return (
    <div
      className="arcana-progress"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`Vraag ${current} van ${total}, ${blockLabel}`}
    >
      <p className="arcana-progress__block">{blockLabel}</p>
      <div className="arcana-progress__line" aria-hidden="true">
        {blocks.map((b, i) => {
          const done = i < blockIndex ? 1 : i > blockIndex ? 0 : positionInBlock / b.length;
          return (
            <span
              key={b.title}
              className={`arcana-progress__seg${i === blockIndex ? ' is-current' : ''}`}
              style={{ flexGrow: b.length }}
            >
              <span className="arcana-progress__ink" style={{ transform: `scaleX(${done})` }} />
            </span>
          );
        })}
      </div>
      <p className="arcana-progress__label">
        Vraag {current} van {total}
        {remainingMinutes != null &&
          ` · nog ongeveer ${remainingMinutes} ${remainingMinutes === 1 ? 'minuut' : 'minuten'}`}
      </p>
    </div>
  );
}
