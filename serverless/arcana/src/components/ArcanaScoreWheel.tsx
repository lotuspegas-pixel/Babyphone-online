import { MAIN_DIMENSIONS } from '../data/arcanaDimensions';
import type { MainDimensionId, MainDimensionScore } from '../types/arcana';

interface Props {
  scores: Record<MainDimensionId, MainDimensionScore>;
}

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 120;

function pointFor(index: number, total: number, value: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / 100) * RADIUS;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

function labelPointFor(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = RADIUS + 26;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

export function ArcanaScoreWheel({ scores }: Props) {
  const total = MAIN_DIMENSIONS.length;
  const points = MAIN_DIMENSIONS.map((dim, i) => pointFor(i, total, scores[dim.id].score));
  const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');
  const rings = [25, 50, 75, 100];

  return (
    <>
      <svg
        className="arcana-score-wheel"
        viewBox={`0 0 ${SIZE} ${SIZE + 40}`}
        role="img"
        aria-label="Scorewiel van je 12 hoofddimensies"
        aria-hidden="true"
        focusable="false"
      >
        <g transform="translate(0, 20)">
          {rings.map((ring) => (
            <circle
              key={ring}
              cx={CENTER}
              cy={CENTER}
              r={(ring / 100) * RADIUS}
              className="arcana-score-wheel__ring"
            />
          ))}
          {MAIN_DIMENSIONS.map((_, i) => {
            const outer = pointFor(i, total, 100);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={outer.x}
                y2={outer.y}
                className="arcana-score-wheel__spoke"
              />
            );
          })}
          <polygon points={polygon} className="arcana-score-wheel__shape" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3.5} className="arcana-score-wheel__point" />
          ))}
          {MAIN_DIMENSIONS.map((dim, i) => {
            const p = labelPointFor(i, total);
            return (
              <text
                key={dim.id}
                x={p.x}
                y={p.y}
                className="arcana-score-wheel__label"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {dim.label}
              </text>
            );
          })}
        </g>
      </svg>
      {/* Tekstalternatief voor screenreaders: dezelfde 12 scores die de SVG
          alleen als geometrie codeert, ook als leesbare lijst. */}
      <ul className="arcana-score-wheel__sr-only">
        {MAIN_DIMENSIONS.map((dim) => (
          <li key={dim.id}>
            {dim.label}: {scores[dim.id].score} van 100
          </li>
        ))}
      </ul>
    </>
  );
}
