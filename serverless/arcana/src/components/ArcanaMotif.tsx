export type MotifKind = 'doorgang' | 'brein' | 'vlam' | 'kompas';

interface Props {
  kind: MotifKind;
  /** CSS-kleurwaarde (meestal een dimensiefamilie-token); stuurt --motif. */
  color: string;
  /** Speelt het intekenmoment af (~2s). Alleen voor de rapport-voorpagina —
   * elders (kaarten, PDF-voorblad) staat het beeld stil, zie de skill-regel
   * "spend your boldness in one place". */
  animated?: boolean;
  className?: string;
}

/**
 * De vier herbruikbare illustraties van "Het Arcana Dossier": een doorgang
 * (drempel/individuatie), een brein (denkstijl/analyse), een vlam (energie/
 * expressie) en een kompas (richting/stabiliteit). Gebouwd als pure SVG —
 * geen foto's — zodat elk archetype en elk rapporthoofdstuk zijn eigen
 * combinatie van motief + familiekleur krijgt zonder 18 losse
 * illustraties te bestellen. Zie src/data/arcanaMotifs.ts voor de mapping.
 *
 * `color` wordt op het wortel-element als `--motif` gezet; alle paden lezen
 * die variabele, dus hetzelfde component hertekent zich in elke kleur en
 * volgt de donkere modus zonder extra werk.
 */
export function ArcanaMotif({ kind, color, animated = false, className }: Props) {
  const cls = [className, animated ? 'arcana-motif--animated' : ''].filter(Boolean).join(' ');
  const style = { ['--motif' as string]: color };

  if (kind === 'doorgang') {
    return (
      <svg className={cls} style={style} viewBox="0 0 300 340" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="doorgang-gloed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--motif)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--motif)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle className="am-ring" cx="150" cy="170" r="128" fill="none" stroke="var(--motif)" strokeWidth="1" opacity="0.16" />
        <g className="am-sun">
          <circle cx="90" cy="72" r="46" fill="url(#doorgang-gloed)" />
          <circle cx="90" cy="72" r="30" fill="var(--motif)" opacity="0.92" />
        </g>
        <path className="am-layer am-layer--back" d="M0 250 L60 195 L110 235 L170 180 L230 240 L300 200 L300 340 L0 340 Z" opacity="0.5" />
        <path className="am-layer am-layer--front" d="M0 210 L45 130 L75 175 L115 95 L155 190 L190 140 L225 210 L260 165 L300 220 L300 340 L0 340 Z" opacity="0.82" />
        <path className="am-arch-line" d="M108 340 L108 205 Q108 165 150 165 Q192 165 192 205 L192 340 Z" fill="none" strokeWidth="7" />
        <path className="am-arch-fill" d="M118 340 L118 208 Q118 178 150 178 Q182 178 182 208 L182 340 Z" />
        <g className="am-steps">
          <rect x="112" y="322" width="76" height="7" />
          <rect x="116" y="311" width="68" height="7" />
          <rect x="120" y="300" width="60" height="7" />
          <rect x="124" y="289" width="52" height="7" />
          <rect x="128" y="278" width="44" height="7" />
          <rect x="132" y="267" width="36" height="7" />
        </g>
        <g className="am-figure">
          <circle cx="150" cy="225" r="8" />
          <path d="M138 250 Q138 234 150 234 Q162 234 162 250 L162 268 L138 268 Z" />
        </g>
      </svg>
    );
  }

  if (kind === 'brein') {
    return (
      <svg className={cls} style={style} viewBox="0 0 240 260" role="img" aria-hidden="true">
        <path
          className="am-line"
          d="M70 130 Q52 105 70 78 Q64 42 104 42 Q118 22 144 34 Q176 24 186 54 Q212 60 204 88 Q220 108 200 128 Q202 154 174 154 L174 176 L96 176 L96 154 Q68 152 70 130 Z"
          fill="none"
          strokeWidth="4.5"
        />
        <path className="am-line am-line--thin" d="M104 56 Q116 76 110 98 M138 40 Q136 74 148 100 M164 60 Q170 86 154 108" fill="none" strokeWidth="2.6" opacity="0.8" />
        <circle className="am-line am-line--thin" cx="135" cy="205" r="32" fill="none" strokeWidth="1.4" opacity="0.55" />
        <circle className="am-line am-line--thin" cx="135" cy="205" r="52" fill="none" strokeWidth="1" opacity="0.3" />
        <line className="am-line am-line--thin" x1="135" y1="169" x2="135" y2="241" strokeWidth="1" opacity="0.45" />
        <line className="am-line am-line--thin" x1="99" y1="205" x2="171" y2="205" strokeWidth="1" opacity="0.45" />
      </svg>
    );
  }

  if (kind === 'vlam') {
    return (
      <svg className={cls} style={style} viewBox="0 0 240 260" role="img" aria-hidden="true">
        <path
          className="am-fill"
          d="M120 24 Q150 70 138 104 Q168 96 172 130 Q176 170 140 192 Q158 176 152 154 Q140 172 116 172 Q84 172 74 144 Q66 122 82 100 Q78 122 96 132 Q84 100 100 70 Q108 92 118 92 Q100 58 120 24 Z"
        />
        <circle className="am-ring" cx="120" cy="205" r="34" fill="none" strokeWidth="1.4" opacity="0.5" />
        <circle className="am-ring" cx="120" cy="205" r="54" fill="none" strokeWidth="1" opacity="0.28" />
        <line className="am-ring" x1="120" y1="166" x2="120" y2="244" strokeWidth="1" opacity="0.4" />
        <line className="am-ring" x1="80" y1="205" x2="160" y2="205" strokeWidth="1" opacity="0.4" />
      </svg>
    );
  }

  // kompas
  return (
    <svg className={cls} style={style} viewBox="0 0 240 260" role="img" aria-hidden="true">
      <path className="am-layer am-layer--back" d="M0 200 L40 150 L75 180 L115 120 L155 190 L190 150 L240 195 L240 260 L0 260 Z" opacity="0.5" />
      <path className="am-layer am-layer--front" d="M0 220 L55 160 L90 195 L130 140 L165 205 L205 165 L240 210 L240 260 L0 260 Z" opacity="0.85" />
      <g className="am-line">
        <circle cx="120" cy="90" r="40" fill="none" strokeWidth="1.4" />
        <path d="M120 54 L128 84 L120 90 L112 84 Z" fill="var(--motif)" stroke="none" />
        <path d="M120 126 L128 96 L120 90 L112 96 Z" fill="none" strokeWidth="1.4" />
        <line x1="120" y1="50" x2="120" y2="130" strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="90" x2="160" y2="90" strokeWidth="1" opacity="0.4" />
      </g>
    </svg>
  );
}
