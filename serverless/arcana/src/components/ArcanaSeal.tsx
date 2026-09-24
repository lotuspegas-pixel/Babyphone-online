interface Props {
  /** Vierkante afmeting in CSS-pixels; de viewBox is altijd 0 0 100 100. */
  size?: number;
  className?: string;
}

/**
 * Het zegel: een ster boven een figuur op een drietredige sokkel, in een
 * gestempelde ring — het woordmerk van "Het Arcana Dossier" (sept. 2026,
 * referentiemap "Arcana Design Sep 2026"). Vervangt de kleine achtpuntige
 * ster uit de vorige stijl; groter en herkenbaarder, zoals gevraagd.
 *
 * Puur `currentColor`, dus hij volgt de tekstkleur van zijn ouder en werkt
 * zonder aanpassing in licht en donker. Vector, geen raster: scherp op elke
 * grootte van favicon tot PDF-voorblad.
 */
export function ArcanaSeal({ size = 40, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Het Arcana-zegel"
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.6" strokeDasharray="1 2.4" strokeLinecap="round" opacity="0.9" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M50 14 L54.5 34 L59 24 L57 40 L74 36 L60 46 L76 50 L60 54 L74 64 L57 60 L59 76 L54.5 66 L50 86 L45.5 66 L41 76 L43 60 L26 64 L40 54 L24 50 L40 46 L26 36 L43 40 L41 24 L45.5 34 Z"
        fill="currentColor"
      />
      <rect x="44" y="58" width="12" height="4" fill="currentColor" />
      <rect x="46" y="62" width="8" height="3" fill="currentColor" />
      <path d="M47 65 L47 78 Q47 82 50 82 Q53 82 53 78 L53 65 Z" fill="currentColor" />
      <rect x="40" y="82" width="20" height="3" fill="currentColor" />
      <rect x="38" y="85" width="24" height="3" fill="currentColor" />
    </svg>
  );
}
