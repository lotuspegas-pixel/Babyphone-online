import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';

import { DIMENSION_FAMILIES, MAIN_DIMENSIONS } from '../data/arcanaDimensions';
import {
  calibrationPoint,
  plume,
  portraitLayout,
  sectorLine,
  type PortraitLayout,
  type PortraitMode,
} from '../lib/arcanaPortraitGeometry';
import type { MainDimensionId, MainDimensionScore } from '../types/arcana';

interface Props {
  scores: Record<MainDimensionId, MainDimensionScore>;
  /** Naam van het primaire archetype, in het hart van het portret. */
  archetypeName: string;
  archetypeScore: number;
  /** Vrijwillige naam uit de intake; leeg betekent gewoon geen naamregel. */
  profileName: string;
}

/**
 * Welke dimensie het open ringetje krijgt: de hoogst scorende hoofddimensie.
 * In dit model is de sterkst uitgesproken kant ook de kant die het vaakst
 * doorschiet (dezelfde sterkte/valkuil-dualiteit die de rapportteksten
 * hanteren). Bij gelijke stand wint de eerste in de vaste volgorde van
 * MAIN_DIMENSIONS, zodat dezelfde antwoorden altijd hetzelfde beeld geven.
 */
function pitfallIndex(scores: Record<MainDimensionId, MainDimensionScore>): number {
  let best = 0;
  for (let i = 1; i < MAIN_DIMENSIONS.length; i += 1) {
    if (scores[MAIN_DIMENSIONS[i].id].score > scores[MAIN_DIMENSIONS[best].id].score) best = i;
  }
  return best;
}

const MAX_WIDTH = 880;
const MIN_WIDTH = 260;
const COMPACT_BELOW = 620;

/** Geschatte breedte van monospace-tekst op 11 px, voor de ijkbolletjes. */
function pillWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.62 + 14;
}

interface PillProps {
  layout: PortraitLayout;
  r: number;
  text: string;
  strong: boolean;
}

function CalibrationPill({ layout, r, text, strong }: PillProps) {
  const fontSize = layout.mode === 'full' ? 11 : 10;
  const h = layout.mode === 'full' ? 19 : 17;
  const w = pillWidth(text, fontSize);
  const p = calibrationPoint(layout, r);
  return (
    <g className={`arcana-portrait__pill${strong ? ' is-strong' : ''}`} aria-hidden="true">
      <rect x={p.x - w / 2} y={p.y - h / 2} width={w} height={h} rx={h / 2} />
      <text x={p.x} y={p.y + 0.5} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize}>
        {text}
      </text>
    </g>
  );
}

/**
 * Het portret als SVG: de twaalf hoofddimensies als pluimen rond een kern.
 *
 * Waarom SVG en geen canvas meer: het print als vector (op papier bleef het
 * canvas op ~150 dpi steken), de scores zijn echte, selecteerbare tekst, het
 * schaalt met de browserzoom, en de kleuren komen rechtstreeks uit de tokens
 * — de donkere modus vraagt dus geen hertekening. De geometrie zelf staat in
 * src/lib/arcanaPortraitGeometry.ts en is een pure functie van de scores.
 *
 * De twaalf waarden staan altijd ook als tekst op de pagina (de lijst onder het
 * beeld), zodat het rapport zonder SVG-ondersteuning, zonder JavaScript en met
 * een schermlezer volledig blijft. Naast elke kleur staat het familiesymbool,
 * zodat kleur nooit de enige drager is.
 */
export function ArcanaPortrait({ scores, archetypeName, archetypeScore, profileName }: Props) {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const uid = useId();
  const [width, setWidth] = useState(() =>
    typeof window === 'undefined' ? MAX_WIDTH : Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, window.innerWidth - 80)),
  );
  const [hover, setHover] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  // Loopt op bij "Teken opnieuw": de SVG wordt opnieuw gemonteerd en de
  // CSS-animatie start opnieuw.
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const meet = () => setWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, field.clientWidth || MAX_WIDTH)));
    meet();
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(meet) : null;
    observer?.observe(field);
    window.addEventListener('resize', meet);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', meet);
    };
  }, []);

  const mode: PortraitMode = width >= COMPACT_BELOW ? 'full' : 'compact';
  const layout = portraitLayout(width, mode);
  const pitfall = pitfallIndex(scores);
  const focus = locked ?? hover;

  const rows = MAIN_DIMENSIONS.map((dim, i) => ({
    id: dim.id,
    label: dim.label,
    meaning: dim.meaning,
    token: dim.token,
    symbol: DIMENSION_FAMILIES[dim.family].symbol,
    familyLabel: DIMENSION_FAMILIES[dim.family].label,
    score: scores[dim.id].score,
    pitfall: i === pitfall,
  }));
  const plumes = rows.map((row, i) => plume(layout, i, row.score, row.label));

  function toggleLock(i: number) {
    setLocked((cur) => (cur === i ? null : i));
  }

  function onKey(e: KeyboardEvent<SVGGElement>, i: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleLock(i);
    }
    if (e.key === 'Escape') setLocked(null);
  }

  const beschrijving =
    `Portret${profileName ? ` van ${profileName}` : ''}. In het hart staat het hoofdprofiel ` +
    `${archetypeName}, score ${archetypeScore}. Daaromheen twaalf gekleurde pluimen, elk even lang ` +
    `als de score van één gemeten kant, met een gestippelde ring op 50 als middenlijn. ` +
    `Alle twaalf waarden staan als tekst onder het beeld.`;

  const { cx, cy, r0, rMid, rMax, maat } = layout;
  const g = Math.min(1, r0 / 124);
  const k = Math.max(0.55, Math.min(1.7, r0 / 60));
  const titleId = `${uid}-titel`;
  const descId = `${uid}-uitleg`;

  return (
    <div className="arcana-portrait">
      <div className="arcana-portrait__field" ref={fieldRef}>
        <svg
          key={replay}
          className="arcana-portrait__svg"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          width="100%"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          data-mode={mode}
          data-focus={focus ?? undefined}
        >
          <title id={titleId}>Je portret in twaalf pluimen</title>
          <desc id={descId}>{beschrijving}</desc>
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

          {/* Papier: de grond, met een warm bed dat vóór de rand uitdooft. */}
          <rect className="arcana-portrait__grond" x="0" y="0" width={layout.width} height={layout.height} />
          <rect x="0" y="0" width={layout.width} height={layout.height} fill={`url(#${uid}-bed)`} />

          {/* Het raster waarop de twaalf staan. */}
          <g className="arcana-portrait__raster" aria-hidden="true">
            {plumes.map((_, i) => {
              const l = sectorLine(layout, i);
              return <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />;
            })}
          </g>

          {/* Gloed onder de pluimen; multiply op licht, screen op donker (CSS). */}
          <g className="arcana-portrait__glows" aria-hidden="true">
            {plumes.map((p, i) => (
              <circle
                key={rows[i].id}
                className={`arcana-portrait__gloed${focus === i ? ' is-focus' : ''}`}
                style={{ '--i': i } as CSSProperties}
                cx={p.glow.x}
                cy={p.glow.y}
                r={p.glow.r}
                fill={`url(#${uid}-gloed-${i})`}
              />
            ))}
          </g>

          {/* De twaalf pluimen: elk een groep die te focussen is. */}
          {plumes.map((p, i) => (
            <g
              key={rows[i].id}
              className={`arcana-portrait__dim${focus === i ? ' is-focus' : ''}${rows[i].pitfall ? ' is-pitfall' : ''}`}
              style={{ '--kleur': `var(${rows[i].token})`, '--i': i } as CSSProperties}
              data-dim={rows[i].id}
              tabIndex={0}
              role="img"
              aria-label={`${rows[i].label}, score ${rows[i].score} van 100`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => toggleLock(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <title>{`${rows[i].symbol} ${rows[i].label} — ${rows[i].score}`}</title>
              {p.vanes.map((v) => (
                <path key={v.alpha} className="arcana-portrait__vaan" d={v.d} strokeOpacity={v.alpha} strokeWidth={p.vaneWidth} />
              ))}
              <path className="arcana-portrait__schacht" d={p.shaftPath} />
            </g>
          ))}

          {/* IJkpunten: 100 als buitencirkel, 50 als stippelring dwars door het beeld. */}
          <g className="arcana-portrait__ringen" aria-hidden="true">
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

          {/* De kern met het hoofdprofiel. */}
          <g className="arcana-portrait__kern" aria-hidden="true">
            <circle className="arcana-portrait__kern-vlak" cx={cx} cy={cy} r={r0} />
            <circle className="arcana-portrait__kern-binnen" cx={cx} cy={cy} r={r0 * 0.9} />
            {mode === 'full' ? (
              <>
                <text className="arcana-portrait__kern-eyebrow" x={cx} y={cy - 46 * g} textAnchor="middle" fontSize={10 * g} letterSpacing={2.1 * g}>
                  HOOFDPROFIEL
                </text>
                <text className="arcana-portrait__kern-naam" x={cx} y={cy - 10 * g} textAnchor="middle" fontSize={33 * g}>
                  {archetypeName}
                </text>
                <text className="arcana-portrait__kern-score" x={cx} y={cy + 25 * g} textAnchor="middle" fontSize={27 * g}>
                  {archetypeScore}
                </text>
                {profileName && (
                  <>
                    <line className="arcana-portrait__kern-lijn" x1={cx - 28 * g} y1={cy + 40 * g} x2={cx + 28 * g} y2={cy + 40 * g} />
                    <text className="arcana-portrait__kern-persoon" x={cx} y={cy + 59 * g} textAnchor="middle" fontSize={12 * g}>
                      {profileName}
                    </text>
                  </>
                )}
              </>
            ) : (
              <>
                <text className="arcana-portrait__kern-naam" x={cx} y={cy - 1 * k} textAnchor="middle" fontSize={18 * k}>
                  {archetypeName}
                </text>
                <text className="arcana-portrait__kern-score" x={cx} y={cy + 21 * k} textAnchor="middle" fontSize={16 * k}>
                  {archetypeScore}
                </text>
              </>
            )}
          </g>

          {mode === 'full' && <CalibrationPill layout={layout} r={r0} text="0" strong={false} />}
          {mode === 'full' && <CalibrationPill layout={layout} r={rMax} text="100" strong={false} />}
          <CalibrationPill layout={layout} r={rMid} text="50" strong />

          {/* Het aandachtspunt: open ring op de top van de hoogste pluim. */}
          {plumes[pitfall] && (
            <g className="arcana-portrait__ringetje" aria-hidden="true">
              <circle className="arcana-portrait__ringetje-halo" cx={plumes[pitfall].tip.x} cy={plumes[pitfall].tip.y} r={mode === 'full' ? 8.5 : 5.5} />
              <circle className="arcana-portrait__ringetje-lijn" cx={plumes[pitfall].tip.x} cy={plumes[pitfall].tip.y} r={mode === 'full' ? 8.5 : 5.5} />
            </g>
          )}

          {/* Buitenlabels: naam en score, of alleen de score op een smal scherm. */}
          <g className="arcana-portrait__labels" aria-hidden="true">
            {plumes.map((p, i) => {
              const row = rows[i];
              const cls = `arcana-portrait__label${focus === i ? ' is-focus' : ''}`;
              if (mode === 'compact') {
                const fs = Math.max(11, Math.min(15, 11.5 * (rMax / 118)));
                return (
                  <text key={row.id} className={cls} x={p.label.x} y={p.label.y} textAnchor="middle" dominantBaseline="middle" fontSize={fs}>
                    <tspan className="arcana-portrait__label-score">{row.score}</tspan>
                  </text>
                );
              }
              const lh = 15.5;
              const hoogte = p.label.lines.length * lh + 17 + (row.pitfall ? 13 : 0);
              let ty: number;
              if (p.label.anchor === 'middle') ty = p.label.above ? p.label.y - hoogte + lh - 3 : p.label.y + lh + 3;
              else ty = p.label.y - hoogte / 2 + lh - 3;
              const scoreY = ty + p.label.lines.length * lh + 1;
              return (
                <text key={row.id} className={cls} x={p.label.x} y={ty} textAnchor={p.label.anchor}>
                  {p.label.lines.map((line, j) => (
                    <tspan key={j} className="arcana-portrait__label-naam" x={p.label.x} y={ty + j * lh} fontSize={12.5}>
                      {line}
                    </tspan>
                  ))}
                  <tspan className="arcana-portrait__label-score" x={p.label.x} y={scoreY} fontSize={13.5}>
                    {row.score}
                  </tspan>
                  {row.pitfall && (
                    <tspan className="arcana-portrait__label-let" x={p.label.x} y={scoreY + 14} fontSize={9.5} letterSpacing={0.7}>
                      LET HIER OP
                    </tspan>
                  )}
                </text>
              );
            })}
          </g>
        </svg>
      </div>

      <p className="arcana-portrait__caption">
        <span>
          Het beeld is getekend uit je twaalf scores. Dezelfde antwoorden geven altijd exact hetzelfde portret.
        </span>
        <button
          type="button"
          className="arcana-button arcana-button--text arcana-print-hide"
          onClick={() => setReplay((n) => n + 1)}
        >
          Teken opnieuw
        </button>
      </p>

      <h4 className="arcana-portrait__key-title">De sleutel</h4>
      <p className="arcana-portrait__key-lead">
        Zonder deze vier regels is het beeld decoratie. Met deze regels is het af te lezen.
      </p>
      <dl className="arcana-portrait__rules">
        <div>
          <dt>Richting — welke kant</dt>
          <dd>
            Elke pluim heeft een vaste plaats in de cirkel. Bovenaan staat Innerlijke motor, daarna volgt de rest
            met de klok mee, in de volgorde van de lijst hieronder.
          </dd>
        </div>
        <div>
          <dt>Lengte — de score</dt>
          <dd>
            Hoe ver een pluim reikt, is de score. De rand van de kern is 0, de gestippelde ring is 50 en de
            buitenste cirkel is 100. Voorbij de stippelring is bovengemiddeld, erbinnen ondergemiddeld.
          </dd>
        </div>
        <div>
          <dt>Dichtheid en buiging — de afstand tot 50</dt>
          <dd>
            Hoe verder een score van 50 af ligt, hoe voller en zwaarder de pluim wordt en hoe sterker hij
            meebuigt. Lengte, dichtheid en buiging vertellen dus hetzelfde en versterken elkaar, zodat een
            uitgesproken kant meteen opvalt.
          </dd>
        </div>
        <div>
          <dt>Kleur en symbool — de familie</dt>
          <dd>
            De twaalf kanten vormen vier families van drie: ◆ motor en richting, ● contact, ▲ grip en ■ zelf.
            De kleur zegt niets over hoog of laag; die hoort bij de familie. Het symbool staat er altijd bij,
            zodat je de families ook zonder kleur uit elkaar houdt. Eén pluimtop draagt een open ringetje: je
            sterkst uitgesproken kant, {rows[pitfall].label.toLowerCase()} — precies die kant is ook degene die
            het vaakst doorschiet.
          </dd>
        </div>
      </dl>

      <p className="arcana-portrait__list-head">
        <span>De twaalf gemeten kanten</span>
        <span>Score · 0–100 · midden 50</span>
      </p>
      <div className="arcana-portrait__list" id="arcana-portrait-list" role="group" aria-label="De twaalf gemeten kanten met hun score">
        {rows.map((row, i) => (
          <button
            key={row.id}
            type="button"
            className={`arcana-portrait__row${row.pitfall ? ' is-pitfall' : ''}${locked === i ? ' is-active' : ''}`}
            style={{ '--portrait-hue': `var(${row.token})` } as CSSProperties}
            aria-pressed={locked === i}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            onClick={() => toggleLock(i)}
          >
            <span className="arcana-portrait__swatch" aria-hidden="true" />
            <span className="arcana-portrait__row-text">
              <span className="arcana-portrait__row-name">
                <span className="arcana-portrait__family" title={row.familyLabel} aria-label={`familie ${row.familyLabel}`}>
                  {row.symbol}
                </span>{' '}
                {row.label}
              </span>
              <span className="arcana-portrait__row-meaning">{row.meaning}</span>
            </span>
            <span className="arcana-portrait__row-score">{row.score}</span>
          </button>
        ))}
      </div>
      <p className="arcana-portrait__list-foot arcana-print-hide">
        Kies een kant om hem in het beeld op te lichten; kies nogmaals of druk op Esc om alles terug te zetten.
      </p>
    </div>
  );
}
