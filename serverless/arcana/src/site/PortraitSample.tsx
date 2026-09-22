import { useId, type CSSProperties } from 'react';

import { DIMENSION_FAMILIES, MAIN_DIMENSIONS } from '../data/arcanaDimensions';
import { calibrationPoint, plume, portraitLayout, sectorLine, type PortraitMode } from '../lib/arcanaPortraitGeometry';
import { PORTRET_VOORBEELD } from './siteContent';

/**
 * Het voorbeeldportret op de landingspagina: dezelfde geometrie en dezelfde
 * CSS-klassen als het echte portret in het rapport, maar zonder de
 * rapportcomponent (die sleept de dimensiedata plus interactie mee, D §4.4).
 * Statisch: geen hover, geen focus, geen meting van de breedte. Twee vaste
 * tekeningen — een volle en een compacte — en CSS kiest er één per
 * schermbreedte, zodat er geen JavaScript nodig is om te schalen.
 *
 * De scores zijn verzonnen; dat staat in het bijschrift ernaast.
 */
function Tekening({ mode, width }: { mode: PortraitMode; width: number }) {
  const uid = useId();
  const layout = portraitLayout(width, mode);
  const { cx, cy, r0, rMid, rMax, maat } = layout;
  const g = Math.min(1, r0 / 124);
  const k = Math.max(0.55, Math.min(1.7, r0 / 60));

  const rows = MAIN_DIMENSIONS.map((dim) => ({
    id: dim.id,
    label: dim.label,
    token: dim.token,
    symbol: DIMENSION_FAMILIES[dim.family].symbol,
    score: PORTRET_VOORBEELD.scores[dim.id],
  }));
  let pitfall = 0;
  rows.forEach((row, i) => {
    if (row.score > rows[pitfall].score) pitfall = i;
  });
  const plumes = rows.map((row, i) => plume(layout, i, row.score, row.label));
  const pill = (r: number, text: string, strong: boolean) => {
    const fontSize = mode === 'full' ? 11 : 10;
    const h = mode === 'full' ? 19 : 17;
    const w = text.length * fontSize * 0.62 + 14;
    const p = calibrationPoint(layout, r);
    return (
      <g className={`arcana-portrait__pill${strong ? ' is-strong' : ''}`}>
        <rect x={p.x - w / 2} y={p.y - h / 2} width={w} height={h} rx={h / 2} />
        <text x={p.x} y={p.y + 0.5} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize}>
          {text}
        </text>
      </g>
    );
  };

  return (
    <svg
      className={`arcana-portrait__svg portret-voorbeeld__svg portret-voorbeeld__svg--${mode}`}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      width="100%"
      aria-hidden="true"
      data-mode={mode}
    >
      <defs>
        <radialGradient id={`${uid}-bed`} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} r={rMax * 1.24}>
          <stop offset="0" className="arcana-portrait__bed-stop" stopOpacity="0.92" />
          <stop offset="0.58" className="arcana-portrait__bed-stop" stopOpacity="0.8" />
          <stop offset="0.86" className="arcana-portrait__bed-stop" stopOpacity="0.42" />
          <stop offset="1" className="arcana-portrait__bed-stop" stopOpacity="0" />
        </radialGradient>
        {plumes.map((p, i) => (
          <radialGradient
            key={rows[i].id}
            id={`${uid}-gloed-${i}`}
            gradientUnits="userSpaceOnUse"
            cx={p.glow.x}
            cy={p.glow.y}
            r={p.glow.r}
            style={{ '--kleur': `var(${rows[i].token})` } as CSSProperties}
          >
            <stop offset="0" className="arcana-portrait__gloed-stop" stopOpacity="0.085" />
            <stop offset="1" className="arcana-portrait__gloed-stop" stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <rect className="arcana-portrait__grond" x="0" y="0" width={layout.width} height={layout.height} />
      <rect x="0" y="0" width={layout.width} height={layout.height} fill={`url(#${uid}-bed)`} />

      <g className="arcana-portrait__raster">
        {plumes.map((_, i) => {
          const l = sectorLine(layout, i);
          return <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />;
        })}
      </g>

      <g className="arcana-portrait__glows">
        {plumes.map((p, i) => (
          <circle
            key={rows[i].id}
            className="arcana-portrait__gloed"
            cx={p.glow.x}
            cy={p.glow.y}
            r={p.glow.r}
            fill={`url(#${uid}-gloed-${i})`}
          />
        ))}
      </g>

      {plumes.map((p, i) => (
        <g
          key={rows[i].id}
          className="arcana-portrait__dim"
          style={{ '--kleur': `var(${rows[i].token})` } as CSSProperties}
        >
          {p.vanes.map((v) => (
            <path
              key={v.alpha}
              className="arcana-portrait__vaan"
              d={v.d}
              strokeOpacity={v.alpha}
              strokeWidth={p.vaneWidth}
            />
          ))}
          <path className="arcana-portrait__schacht" d={p.shaftPath} />
        </g>
      ))}

      <g className="arcana-portrait__ringen">
        <circle className="arcana-portrait__ring-buiten" cx={cx} cy={cy} r={rMax} />
        <circle className="arcana-portrait__ring-halo" cx={cx} cy={cy} r={rMid} />
        <circle
          className="arcana-portrait__ring-midden"
          cx={cx}
          cy={cy}
          r={rMid}
          strokeDasharray={`${5 * maat + 2} ${6 * maat + 2}`}
        />
      </g>

      <g className="arcana-portrait__kern">
        <circle className="arcana-portrait__kern-vlak" cx={cx} cy={cy} r={r0} />
        <circle className="arcana-portrait__kern-binnen" cx={cx} cy={cy} r={r0 * 0.9} />
        {mode === 'full' ? (
          <>
            <text
              className="arcana-portrait__kern-eyebrow"
              x={cx}
              y={cy - 46 * g}
              textAnchor="middle"
              fontSize={10 * g}
              letterSpacing={2.1 * g}
            >
              HOOFDPROFIEL
            </text>
            <text className="arcana-portrait__kern-naam" x={cx} y={cy - 10 * g} textAnchor="middle" fontSize={33 * g}>
              {PORTRET_VOORBEELD.archetypeName}
            </text>
            <text className="arcana-portrait__kern-score" x={cx} y={cy + 25 * g} textAnchor="middle" fontSize={27 * g}>
              {PORTRET_VOORBEELD.archetypeScore}
            </text>
            <line
              className="arcana-portrait__kern-lijn"
              x1={cx - 28 * g}
              y1={cy + 40 * g}
              x2={cx + 28 * g}
              y2={cy + 40 * g}
            />
            <text
              className="arcana-portrait__kern-persoon"
              x={cx}
              y={cy + 59 * g}
              textAnchor="middle"
              fontSize={12 * g}
            >
              voorbeeld
            </text>
          </>
        ) : (
          <>
            <text className="arcana-portrait__kern-naam" x={cx} y={cy - 1 * k} textAnchor="middle" fontSize={18 * k}>
              {PORTRET_VOORBEELD.archetypeName}
            </text>
            <text className="arcana-portrait__kern-score" x={cx} y={cy + 21 * k} textAnchor="middle" fontSize={16 * k}>
              {PORTRET_VOORBEELD.archetypeScore}
            </text>
          </>
        )}
      </g>

      {mode === 'full' && pill(r0, '0', false)}
      {mode === 'full' && pill(rMax, '100', false)}
      {pill(rMid, '50', true)}

      <g className="arcana-portrait__ringetje">
        <circle
          className="arcana-portrait__ringetje-halo"
          cx={plumes[pitfall].tip.x}
          cy={plumes[pitfall].tip.y}
          r={mode === 'full' ? 8.5 : 5.5}
        />
        <circle
          className="arcana-portrait__ringetje-lijn"
          cx={plumes[pitfall].tip.x}
          cy={plumes[pitfall].tip.y}
          r={mode === 'full' ? 8.5 : 5.5}
        />
      </g>

      <g className="arcana-portrait__labels">
        {plumes.map((p, i) => {
          const row = rows[i];
          if (mode === 'compact') {
            const fs = Math.max(11, Math.min(15, 11.5 * (rMax / 118)));
            return (
              <text
                key={row.id}
                className="arcana-portrait__label"
                x={p.label.x}
                y={p.label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={fs}
              >
                <tspan className="arcana-portrait__label-score">{row.score}</tspan>
              </text>
            );
          }
          const lh = 15.5;
          const let_ = i === pitfall;
          const hoogte = p.label.lines.length * lh + 17 + (let_ ? 13 : 0);
          let ty: number;
          if (p.label.anchor === 'middle') ty = p.label.above ? p.label.y - hoogte + lh - 3 : p.label.y + lh + 3;
          else ty = p.label.y - hoogte / 2 + lh - 3;
          const scoreY = ty + p.label.lines.length * lh + 1;
          return (
            <text key={row.id} className="arcana-portrait__label" x={p.label.x} y={ty} textAnchor={p.label.anchor}>
              {p.label.lines.map((line, j) => (
                <tspan key={j} className="arcana-portrait__label-naam" x={p.label.x} y={ty + j * lh} fontSize={12.5}>
                  {line}
                </tspan>
              ))}
              <tspan className="arcana-portrait__label-score" x={p.label.x} y={scoreY} fontSize={13.5}>
                {row.score}
              </tspan>
              {let_ && (
                <tspan
                  className="arcana-portrait__label-let"
                  x={p.label.x}
                  y={scoreY + 14}
                  fontSize={9.5}
                  letterSpacing={0.7}
                >
                  LET HIER OP
                </tspan>
              )}
            </text>
          );
        })}
      </g>
    </svg>
  );
}

export function PortraitSample() {
  // Eén beschrijving voor beide tekeningen; de SVG's zelf zijn decoratief.
  const tekst = MAIN_DIMENSIONS.map((d) => `${d.label} ${PORTRET_VOORBEELD.scores[d.id]}`).join(', ');
  return (
    <figure
      className="portret-voorbeeld"
      role="img"
      aria-label={`Voorbeeldportret met hoofdprofiel ${PORTRET_VOORBEELD.archetypeName} en twaalf verzonnen scores: ${tekst}.`}
    >
      <Tekening mode="full" width={760} />
      <Tekening mode="compact" width={400} />
    </figure>
  );
}
