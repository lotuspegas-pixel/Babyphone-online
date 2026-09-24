export type OrnamentKind = 'zonmaan' | 'sterrenbarst' | 'maanfasen';

interface Props {
  kind: OrnamentKind;
  /** Vierkante afmeting in CSS-pixels (maanfasen is breder dan hoog). */
  size?: number;
  className?: string;
}

/**
 * Kleine, kleurloze sierelementen — geen archetype-illustraties (zie
 * ArcanaMotif) maar decoratieve rustpunten: een zon-maan-medaillon, een
 * sterrenbarst en een maanfasenstrook. Gedestilleerd uit dezelfde
 * referentiemap ("Arcana Design Sep 2026") als het zegel en de motieven —
 * terugkerende symbolen in die collages, hier als vector zodat ze
 * herbruikbaar zijn als hoofdstukscheiding of voorblad-accent in het
 * rapport/PDF-werk.
 *
 * Puur `currentColor`, zoals ArcanaSeal: volgt de tekstkleur van de ouder,
 * geen eigen kleurtoken nodig.
 */
export function ArcanaOrnament({ kind, size = 32, className }: Props) {
  if (kind === 'zonmaan') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 100 100" role="img" aria-hidden="true">
        <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M50 6 A44 44 0 0 1 50 94 Z" fill="currentColor" opacity="0.85" />
        <circle cx="50" cy="50" r="14" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="50" y1="20" x2="50" y2="28" />
          <line x1="50" y1="72" x2="50" y2="80" />
          <line x1="20" y1="50" x2="28" y2="50" />
          <line x1="30.5" y1="30.5" x2="35.8" y2="35.8" />
          <line x1="30.5" y1="69.5" x2="35.8" y2="64.2" />
        </g>
        <path d="M63 32 A13 13 0 1 0 63 68 A16 16 0 0 1 63 32 Z" fill="var(--surface, #fff)" opacity="0.92" />
        <circle cx="72" cy="30" r="1.4" fill="currentColor" opacity="0.7" />
        <circle cx="80" cy="42" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="78" cy="60" r="1.2" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }

  if (kind === 'sterrenbarst') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 100 100" role="img" aria-hidden="true">
        <g stroke="currentColor" strokeLinecap="round">
          <line x1="50" y1="4" x2="50" y2="96" strokeWidth="1.6" />
          <line x1="4" y1="50" x2="96" y2="50" strokeWidth="1.6" />
          <line x1="16" y1="16" x2="84" y2="84" strokeWidth="1" opacity="0.7" />
          <line x1="84" y1="16" x2="16" y2="84" strokeWidth="1" opacity="0.7" />
        </g>
        <path
          d="M50 26 L56 44 L74 50 L56 56 L50 74 L44 56 L26 50 L44 44 Z"
          fill="currentColor"
        />
        <circle cx="50" cy="50" r="4.5" fill="var(--surface, #fff)" />
      </svg>
    );
  }

  // maanfasen — bredere viewBox, size blijft de hoogte.
  // Elke schijf = een buitenboog (vaste straal 11) plus een terminatorboog
  // van cirkelpunt tot cirkelpunt. Zelfde sweep-richting voor beide bogen
  // spoort de hele cirkelrand af (samen = volledig gebied, dus straal 11
  // hier = vol); tegengestelde sweep doorloopt dezelfde curve heen en terug
  // (nul gebied, dus straal 11 hier = nieuw). Vandaar de knik bij illum 0,5.
  return (
    <svg className={className} height={size} viewBox="0 0 260 32" role="img" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const cx = 16 + i * 38;
        const illum = 1 - Math.abs(i - 3) / 3;
        const outerSweep = i < 3 ? 1 : 0;
        const innerR = 11 * Math.abs(2 * illum - 1);
        const innerSweep = illum < 0.5 ? 1 - outerSweep : outerSweep;
        return (
          <g key={i}>
            <circle cx={cx} cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path
              d={`M${cx} 5 A11 11 0 0 ${outerSweep} ${cx} 27 A${innerR} 11 0 0 ${innerSweep} ${cx} 5 Z`}
              fill="currentColor"
            />
          </g>
        );
      })}
    </svg>
  );
}
