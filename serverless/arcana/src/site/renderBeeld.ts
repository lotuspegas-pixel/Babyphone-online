// GEGENEREERD door scripts/bereid-renders.mjs — niet met de hand aanpassen.
import persona from '../assets/art/renders/render-persona.webp';
import schaduw from '../assets/art/renders/render-schaduw.webp';
import denkstijl from '../assets/art/renders/render-denkstijl.webp';
import doorgang from '../assets/art/renders/render-doorgang.webp';
import methode from '../assets/art/renders/render-methode.webp';
import slot from '../assets/art/renders/render-slot.webp';

export interface RenderBeeld {
  src: string;
  width: number;
  height: number;
}

export const RENDER = {
  persona: { src: persona, width: 640, height: 751 },
  schaduw: { src: schaduw, width: 640, height: 808 },
  denkstijl: { src: denkstijl, width: 640, height: 816 },
  doorgang: { src: doorgang, width: 600, height: 657 },
  methode: { src: methode, width: 720, height: 873 },
  slot: { src: slot, width: 1500, height: 463 },
} satisfies Record<string, RenderBeeld>;
