import type { ArcanaTension } from '../types/arcana';
import { TENSION_DEFINITIONS } from '../data/arcanaDimensions';

interface Props {
  tension: ArcanaTension;
}

export function ArcanaTensionCard({ tension }: Props) {
  const def = TENSION_DEFINITIONS.find((d) => d.id === tension.id)!;
  const [labelA, labelB] = def.label.split(' versus ');

  return (
    <div className={`arcana-card arcana-tension-card${tension.intense ? ' is-intense' : ''}`}>
      <h4>{def.label}</h4>
      <div className="arcana-tension-card__bars">
        <div className="arcana-tension-card__bar-row">
          <span>{labelA}</span>
          <div className="arcana-tension-card__bar">
            <div className="arcana-tension-card__bar-fill" style={{ width: `${tension.scoreA}%` }} />
          </div>
          <span>{tension.scoreA}</span>
        </div>
        <div className="arcana-tension-card__bar-row">
          <span>{labelB}</span>
          <div className="arcana-tension-card__bar">
            <div className="arcana-tension-card__bar-fill" style={{ width: `${tension.scoreB}%` }} />
          </div>
          <span>{tension.scoreB}</span>
        </div>
      </div>
    </div>
  );
}
