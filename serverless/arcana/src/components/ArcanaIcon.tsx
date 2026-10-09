import type { ReactNode } from 'react';

export type IcoonKind = 'kompas' | 'scheut' | 'driehoek' | 'venn' | 'zon' | 'document';

interface Props {
  kind: IcoonKind;
  /** Vierkante afmeting in CSS-pixels; de viewBox is altijd 0 0 64 64. */
  size?: number;
  className?: string;
}

/**
 * Fijne lijniconen voor de voordelenstrook en de voorbeeldlink: dezelfde
 * dunne inktlijn als het zegel, puur `currentColor`, decoratief (de tekst
 * ernaast draagt de betekenis). Eén pad of twee per icoon, geen bibliotheek.
 * pathLength="1" op elke vorm: zo kan de landing de lijn intekenen met
 * stroke-dasharray/-dashoffset 1 → 0, zonder per icoon de lengte te kennen.
 */
const PADEN: Record<IcoonKind, ReactNode> = {
  // kompas: ring, vier streepjes en een vierpuntige ster als naald
  kompas: (
    <>
      <circle pathLength="1" cx="32" cy="32" r="27" />
      <path pathLength="1" d="M32 5v9M32 50v9M5 32h9M50 32h9" />
      <path pathLength="1" d="M32 15l4.5 12.5L49 32l-12.5 4.5L32 49l-4.5-12.5L15 32l12.5-4.5z" fill="currentColor" />
    </>
  ),
  // scheut: stengel met twee blaadjes
  scheut: (
    <>
      <path pathLength="1" d="M32 59V30" />
      <path pathLength="1" d="M32 34C32 22 23 14 9 14c0 13 9 20 23 20z" />
      <path pathLength="1" d="M32 27C32 15 41 7 55 7c0 13-9 20-23 20z" fill="currentColor" fillOpacity=".85" />
    </>
  ),
  // driehoek in een cirkel, met een punt in het midden
  driehoek: (
    <>
      <circle pathLength="1" cx="32" cy="32" r="27" />
      <path pathLength="1" d="M32 13L51 47H13z" />
      <circle pathLength="1" cx="32" cy="38" r="1.6" fill="currentColor" />
    </>
  ),
  // twee overlappende cirkels binnen een derde
  venn: (
    <>
      <circle pathLength="1" cx="32" cy="32" r="28" />
      <circle pathLength="1" cx="25" cy="32" r="14" />
      <circle pathLength="1" cx="39" cy="32" r="14" />
    </>
  ),
  // zon: schijf met acht stralen
  zon: (
    <>
      <circle pathLength="1" cx="32" cy="32" r="11" />
      <path pathLength="1" d="M32 6v9M32 49v9M6 32h9M49 32h9M14 14l6 6M44 44l6 6M14 50l6-6M44 20l6-6" />
    </>
  ),
  // document: blad met omgevouwen hoek en drie regels
  document: (
    <>
      <path pathLength="1" d="M16 6h22l12 12v40H16z" />
      <path pathLength="1" d="M38 6v12h12M24 32h18M24 41h18M24 50h10" />
    </>
  ),
};

export function ArcanaIcon({ kind, size = 56, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PADEN[kind]}
    </svg>
  );
}
