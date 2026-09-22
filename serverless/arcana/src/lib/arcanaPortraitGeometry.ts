/**
 * De rekenkant van het portret, los van React en los van het tekenoppervlak.
 *
 * Alles hier is een pure functie van de twaalf scores en de gewenste maat:
 * geen Math.random(), geen DOM. Dezelfde scores geven dus exact dezelfde
 * paden — dat is de belofte van het product, en het is ook wat een statisch
 * voorbeeldwiel op de landingspagina mogelijk maakt zonder de rapportcode
 * mee te laden.
 *
 * De vormregels (uit de oorspronkelijke canvas-tekening):
 *
 *   plaats in de cirkel    <- index van de dimensie (0 = boven, dan met de klok mee)
 *   lengte van de pluim    <- de score          r = r0 + (score/100) * (rMax - r0)
 *   buiging van de schacht <- (score - 50)/50   positief = met de klok mee
 *   aantal baarden         <- |score - 50|/50   11 bij 50, 26 bij 0 of 100
 *   schuinte van de baard  <- |score - 50|/50   38 graden bij 50, 53 bij 0 of 100
 *   lijndikte              <- |score - 50|/50   dunner bij het midden, zwaarder aan de randen
 *   baardvariatie          <- de index j van de baard (sinus), niet uit toeval
 */

export type PortraitMode = 'full' | 'compact';

export interface PortraitLayout {
  width: number;
  height: number;
  mode: PortraitMode;
  cx: number;
  cy: number;
  /** Straal van de kern (= score 0). */
  r0: number;
  /** Straal van de middenring (= score 50). */
  rMid: number;
  /** Buitenstraal (= score 100). */
  rMax: number;
  /** Schaalfactor voor lijndiktes; 1 bij een buitenstraal van 310. */
  maat: number;
}

export interface PortraitBarb {
  /** SVG-padgegevens van de twee gebogen baardjes op dit punt van de schacht. */
  d: string;
  /** Dekking 0..1 zoals de oorspronkelijke tekening die per baardje koos. */
  alpha: number;
}

export interface PortraitPlume {
  index: number;
  score: number;
  /** De schacht als gesloten, taps toelopende vorm. */
  shaftPath: string;
  /** Alle baardjes, gegroepeerd in vier dekkingsklassen (van licht naar vol). */
  vanes: { alpha: number; d: string }[];
  /** Lijndikte van de baardjes. */
  vaneWidth: number;
  /** Zachte gloed onder de pluim. */
  glow: { x: number; y: number; r: number };
  /** Het uiteinde van de schacht (waar het aandachtsringetje komt). */
  tip: { x: number; y: number };
  /** Ankerpunt en uitlijning van het buitenlabel. */
  label: { x: number; y: number; anchor: 'start' | 'middle' | 'end'; above: boolean; lines: string[] };
}

const TAU = Math.PI * 2;
const SECTOR = TAU / 12;
const HALF = SECTOR / 2;

/** Dezelfde maatvoering als de canvas-tekening, zodat beide naast elkaar te leggen zijn. */
export function portraitLayout(width: number, mode: PortraitMode): PortraitLayout {
  const height = mode === 'full' ? Math.round(width * 0.88) : width;
  const padX = mode === 'full' ? 120 : 34;
  const padY = mode === 'full' ? 64 : 52;
  const rMax = Math.max(40, Math.min(width / 2 - padX, height / 2 - padY));
  const r0 = rMax * (mode === 'full' ? 0.4 : 0.46);
  return {
    width,
    height,
    mode,
    cx: width / 2,
    cy: height / 2,
    r0,
    rMid: r0 + (rMax - r0) * 0.5,
    rMax,
    maat: rMax / 310,
  };
}

export function plumeAngle(index: number): number {
  return -Math.PI / 2 + index * SECTOR;
}

function fmt(n: number): string {
  return (Math.round(n * 100) / 100).toString();
}

/** Woorden afbreken op een maximumbreedte in tekens, zonder een woord te splitsen. */
export function wrapLabel(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(' ')) {
    const proef = current ? `${current} ${word}` : word;
    if (current && proef.length > maxChars) {
      lines.push(current);
      current = word;
    } else current = proef;
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Berekent één pluim. `index` bepaalt de plaats (0 = twaalf uur), `score` de
 * vorm. Alle coördinaten in user units van de lay-out.
 */
export function plume(layout: PortraitLayout, index: number, score: number, label: string): PortraitPlume {
  const { cx, cy, r0, rMax, maat, mode } = layout;
  const d = (score - 50) / 50;
  const ad = Math.abs(d);
  const rt = r0 + (score / 100) * (rMax - r0);
  const base = plumeAngle(index);

  /** Punt op de schacht, t in [0,1]: hoek buigt mee met de score, straal loopt van r0 naar rt. */
  function at(t: number): { x: number; y: number; r: number; a: number } {
    const a = base + d * 0.235 * t * t;
    const r = r0 + (rt - r0) * t;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, r, a };
  }

  // Schacht: 46 segmenten met aflopende dikte, als gesloten vorm zodat de
  // taps toelopende lijn ook in SVG een echte taps toelopende lijn is.
  const K = 46;
  const baseWidth = (1.5 + ad * 1.8) * maat;
  const left: string[] = [];
  const right: string[] = [];
  for (let m = 0; m <= K; m += 1) {
    const t = m / K;
    const p = at(t);
    const q = at(Math.min(t + 1 / K, 1));
    let tx = q.x - p.x;
    let ty = q.y - p.y;
    const tl = Math.hypot(tx, ty) || 1;
    tx /= tl;
    ty /= tl;
    const w = Math.max(0.7, baseWidth * (1 - 0.7 * t)) / 2;
    left.push(`${fmt(p.x - ty * w)} ${fmt(p.y + tx * w)}`);
    right.unshift(`${fmt(p.x + ty * w)} ${fmt(p.y - tx * w)}`);
  }
  const shaftPath = `M ${left[0]} L ${left.slice(1).join(' L ')} L ${right.join(' L ')} Z`;

  // Baardjes.
  const nb = Math.round(11 + ad * 15);
  const theta = ((38 + ad * 15) * Math.PI) / 180;
  const Lmax = (rMax - r0) * 0.4;
  const vaneWidth = Math.max(0.55, (0.72 + ad * 0.85) * maat);
  const barbs: PortraitBarb[] = [];
  for (let j = 0; j < nb; j += 1) {
    const t = 0.05 + 0.93 * (j / (nb - 1));
    const w = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.72)), 0.9);
    const p = at(t);
    const p2 = at(Math.min(t + 0.02, 1));
    let tx = p2.x - p.x;
    let ty = p2.y - p.y;
    const tl = Math.hypot(tx, ty) || 1;
    tx /= tl;
    ty /= tl;
    const nx = -ty;
    const ny = tx;
    const grens = (p.r * Math.sin(HALF) * 0.88) / Math.cos(theta);
    const L = Math.min(Lmax * w, grens);
    if (L < 1) continue;
    const variatie = 0.8 + 0.2 * Math.abs(Math.sin(j * 1.9 + index));
    const alpha = (0.26 + 0.4 * w) * variatie;
    const parts: string[] = [];
    for (const sgn of [1, -1]) {
      const Ls = L * (1 + 0.14 * d * sgn); // lichte asymmetrie uit de score
      const dx = nx * sgn * Math.cos(theta) - tx * Math.sin(theta);
      const dy = ny * sgn * Math.cos(theta) - ty * Math.sin(theta);
      parts.push(
        `M ${fmt(p.x)} ${fmt(p.y)} Q ${fmt(p.x + dx * Ls * 0.55 - tx * Ls * 0.14)} ${fmt(p.y + dy * Ls * 0.55 - ty * Ls * 0.14)} ${fmt(p.x + dx * Ls)} ${fmt(p.y + dy * Ls)}`,
      );
    }
    barbs.push({ d: parts.join(' '), alpha });
  }

  // Vier dekkingsklassen: het verschil met een klasse per baardje is met het
  // blote oog niet te zien, en het scheelt de helft van de DOM-knopen.
  const classes = [0.3, 0.42, 0.54, 0.66];
  const vanes = classes
    .map((alpha, k) => {
      const lo = k === 0 ? -Infinity : (classes[k - 1] + alpha) / 2;
      const hi = k === classes.length - 1 ? Infinity : (alpha + classes[k + 1]) / 2;
      return { alpha, d: barbs.filter((b) => b.alpha >= lo && b.alpha < hi).map((b) => b.d).join(' ') };
    })
    .filter((v) => v.d.length > 0);

  const g = at(0.52);
  const glow = { x: g.x, y: g.y, r: (rt - r0) * 0.6 + r0 * 0.2 };
  const tipPoint = at(1);

  // Buitenlabel.
  const lr = rMax + (mode === 'full' ? 21 : 16);
  const c = Math.cos(base);
  const anchor: 'start' | 'middle' | 'end' = c > 0.25 ? 'start' : c < -0.25 ? 'end' : 'middle';
  const lines = mode === 'full' ? wrapLabel(label, 15) : [];
  const labelPoint = {
    x: cx + Math.cos(base) * lr,
    y: cy + Math.sin(base) * lr,
    anchor,
    above: Math.sin(base) < 0,
    lines,
  };

  return {
    index,
    score,
    shaftPath,
    vanes,
    vaneWidth,
    glow,
    tip: { x: tipPoint.x, y: tipPoint.y },
    label: labelPoint,
  };
}

/** Positie van de ijkbolletjes (0, 50, 100) op de as van 165 graden. */
export function calibrationPoint(layout: PortraitLayout, r: number): { x: number; y: number } {
  const a = (165 * Math.PI) / 180;
  return { x: layout.cx + Math.cos(a) * r, y: layout.cy + Math.sin(a) * r };
}

/** De haarfijne sectorgrens tussen dimensie i en i+1. */
export function sectorLine(layout: PortraitLayout, index: number): { x1: number; y1: number; x2: number; y2: number } {
  const a = plumeAngle(index) + HALF;
  return {
    x1: layout.cx + Math.cos(a) * layout.r0 * 1.02,
    y1: layout.cy + Math.sin(a) * layout.r0 * 1.02,
    x2: layout.cx + Math.cos(a) * layout.rMax,
    y2: layout.cy + Math.sin(a) * layout.rMax,
  };
}
