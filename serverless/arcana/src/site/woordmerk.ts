// GEGENEREERD door scripts/bereid-woordmerk.mjs — niet met de hand aanpassen.
//
// Het logo: één plaat in drie maten, bijgesneden op de letters. Alle plekken
// waar het merk staat gebruiken dit bestand via ArcanaLogo.tsx; er is geen
// tweede versie.

import logo from '../assets/art/woordmerk/logo.webp';
import logoMidden from '../assets/art/woordmerk/logo-midden.webp';
import logoKlein from '../assets/art/woordmerk/logo-klein.webp';

export const LOGO = {
  /** De grootste maat: print en schermen met dubbele pixeldichtheid. */
  bron: logo,
  breedte: 1400,
  hoogte: 461,
  /** Breedte gedeeld door hoogte; de CSS rekent er niet mee, de hero wel. */
  verhouding: 3.0369,
  srcSet: `${logoKlein} 320w, ${logoMidden} 800w, ${logo} 1400w`,
} as const;
