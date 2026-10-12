// GEGENEREERD door scripts/bereid-woordmerk.mjs — niet met de hand aanpassen.
//
// Het logo in twee versies voor twee ondergronden, bijgesneden op de letters.
// Alle plekken waar het merk staat gebruiken deze bestanden via ArcanaLogo.tsx.
//
//   LOGO         koper en steen op een doorzichtige achtergrond, in drie maten.
//                Voor het papier: hero, voet, rapport.
//   LOGO_DONKER  donkerrood en steen op zuiver zwart, één maat. Voor de zwarte
//                kop; de zwarte achtergrond is onderdeel van de plaat.

import logo from '../assets/art/woordmerk/logo.webp';
import logoMidden from '../assets/art/woordmerk/logo-midden.webp';
import logoKlein from '../assets/art/woordmerk/logo-klein.webp';
import logoDonker from '../assets/art/woordmerk/logo-donker.webp';

export const LOGO = {
  /** De grootste maat: print en schermen met dubbele pixeldichtheid. */
  bron: logo,
  breedte: 1400,
  hoogte: 461,
  /** Breedte gedeeld door hoogte; de CSS rekent er niet mee, de hero wel. */
  verhouding: 3.0369,
  srcSet: `${logoKlein} 320w, ${logoMidden} 800w, ${logo} 1400w`,
} as const;

export const LOGO_DONKER = {
  bron: logoDonker,
  breedte: 480,
  hoogte: 160,
  verhouding: 3.0000,
} as const;
