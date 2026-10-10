// GEGENEREERD door scripts/bereid-parallax.mjs — niet met de hand aanpassen.
//
// De zes lagen van de hero-collage, van achter naar voren. Posities zijn
// percentages van het vlak 1672x941 waarin de lagen op elkaar
// passen; HeroParallax.tsx zet ze daarmee terug op hun plek.

import papier from '../assets/art/hero/papier.webp';
import landschap from '../assets/art/hero/landschap.webp';
import boog from '../assets/art/hero/boog.webp';
import collage from '../assets/art/hero/collage.webp';
import jung from '../assets/art/hero/jung.webp';
import tafel from '../assets/art/hero/tafel.webp';

export const HERO_VLAK = { breedte: 1672, hoogte: 941 } as const;

export interface HeroLaag {
  naam: string;
  bron: string;
  /** 0 = staat stil op de achtergrond, 1 = beweegt het meest mee. */
  diepte: number;
  links: number;
  boven: number;
  breedte: number;
  hoogte: number;
}

export const HERO_LAGEN: readonly HeroLaag[] = [
  { naam: 'papier', bron: papier, diepte: 0.06,
    links: 0, boven: 0, breedte: 100, hoogte: 100 },
  { naam: 'landschap', bron: landschap, diepte: 0.18,
    links: 36.1842, boven: 12.3273, breedte: 63.8158, hoogte: 87.6727 },
  { naam: 'boog', bron: boog, diepte: 0.3,
    links: 70.8134, boven: 0, breedte: 29.1866, hoogte: 95.1116 },
  { naam: 'collage', bron: collage, diepte: 0.6,
    links: 16.9258, boven: 0, breedte: 65.3708, hoogte: 99.2561 },
  { naam: 'jung', bron: jung, diepte: 0.76,
    links: 20.933, boven: 17.5345, breedte: 71.5311, hoogte: 82.4655 },
  { naam: 'tafel', bron: tafel, diepte: 1,
    links: 18.8995, boven: 35.813, breedte: 81.1005, hoogte: 64.187 },
];
