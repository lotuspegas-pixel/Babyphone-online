// GEGENEREERD door scripts/bereid-woordmerk.mjs — niet met de hand aanpassen.
//
// De drie platen van het woordmerk, bijgesneden op de letters zelf. Dat
// bijsnijden is geen besparing maar een voorwaarde: site.css lijnt de delen op
// elkaar uit, en dat kan alleen als de rand van het beeld ook de rand van de
// letters is.
//
// Elk deel komt in twee maten. Een telefoon toont het merk op ~120 px en haalt
// de kleine plaat; een breed scherm de grote. De `sizes` die daarbij hoort
// staat in HeroParallax.tsx.

import arcana from '../assets/art/woordmerk/arcana.webp';
import arcanaKlein from '../assets/art/woordmerk/arcana-klein.webp';
import profile from '../assets/art/woordmerk/profile.webp';
import profileKlein from '../assets/art/woordmerk/profile-klein.webp';
import puntcom from '../assets/art/woordmerk/punt-com.webp';
import puntcomKlein from '../assets/art/woordmerk/punt-com-klein.webp';

export interface MerkDeel {
  bron: string;
  srcSet: string;
  breedte: number;
  hoogte: number;
}

export const WOORDMERK: Record<'arcana' | 'profile' | 'puntcom', MerkDeel> = {
  arcana: {
    bron: arcana, breedte: 1400, hoogte: 428,
    srcSet: `${arcanaKlein} 500w, ${arcana} 1400w`,
  },
  profile: {
    bron: profile, breedte: 950, hoogte: 253,
    srcSet: `${profileKlein} 340w, ${profile} 950w`,
  },
  puntcom: {
    bron: puntcom, breedte: 340, hoogte: 79,
    srcSet: `${puntcomKlein} 120w, ${puntcom} 340w`,
  },
};
