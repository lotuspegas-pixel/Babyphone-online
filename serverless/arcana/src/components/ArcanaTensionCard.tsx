import type { ArcanaTension } from '../types/arcana';
import { TENSION_DEFINITIONS } from '../data/arcanaDimensions';

interface Props {
  tension: ArcanaTension;
}

export function ArcanaTensionCard({ tension }: Props) {
  const def = TENSION_DEFINITIONS.find((d) => d.id === tension.id)!;
  const [labelA, labelB] = def.label.split(' versus ');
  const titleId = `${tension.id}-tension-title`;

  return (
    <article
      className={`arcana-card-shell arcana-tension-card${tension.intense ? ' is-intense' : ''}`}
      id={`tension-${tension.id}`}
      aria-labelledby={titleId}
    >
      <div className="arcana-card-clip">
        <p className="arcana-card-kicker">
          <span className="arcana-tension-card__mark" aria-hidden="true" />
          Spanningsveld
        </p>
        <h4 className="arcana-tension-card__title" id={titleId}>
          {labelA} <span className="arcana-tension-card__vs">versus</span> {labelB}
        </h4>
        <div className="arcana-tension-card__tug" aria-hidden="true">
          <div className="arcana-tension-card__tug-half arcana-tension-card__tug-half--left">
            <span className="arcana-tension-card__tug-fill" style={{ width: `${tension.scoreA}%` }} />
          </div>
          <div className="arcana-tension-card__tug-mid" />
          <div className="arcana-tension-card__tug-half arcana-tension-card__tug-half--right">
            <span className="arcana-tension-card__tug-fill" style={{ width: `${tension.scoreB}%` }} />
          </div>
        </div>
        <div className="arcana-tension-card__tug-labels">
          <span className="arcana-tension-card__tug-label">
            <span className="arcana-tension-card__tug-name">{labelA}</span>
            <span className="arcana-tension-card__tug-num">{tension.scoreA}</span>
          </span>
          <span className="arcana-tension-card__tug-label arcana-tension-card__tug-label--right">
            <span className="arcana-tension-card__tug-name">{labelB}</span>
            <span className="arcana-tension-card__tug-num">{tension.scoreB}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
