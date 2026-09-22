import { useEffect, useRef, useState } from 'react';

import { MAIN_DIMENSIONS } from '../data/arcanaDimensions';
import type { MainDimensionId, MainDimensionScore } from '../types/arcana';

interface Props {
  scores: Record<MainDimensionId, MainDimensionScore>;
  /** Naam van het primaire archetype, in het hart van het portret. */
  archetypeName: string;
  archetypeScore: number;
  /** Vrijwillige naam uit de intake; leeg betekent gewoon geen naamregel. */
  profileName: string;
}

interface PortraitDimension {
  id: MainDimensionId;
  label: string;
  meaning: string;
  color: string;
  score: number;
  pitfall: boolean;
}

interface PortraitCore {
  archetypeName: string;
  archetypeScore: number;
  profileName: string;
}

interface PortraitEngine {
  setFocus: (index: number | null) => void;
  replay: () => void;
  destroy: () => void;
}

/**
 * Welke dimensie het open ringetje krijgt: de hoogst scorende hoofddimensie.
 * Dat is geen willekeurige keuze — in dit model is de sterkst uitgesproken kant
 * ook de kant die het vaakst doorschiet (dezelfde sterkte/valkuil-dualiteit die
 * de rapportteksten hanteren). Bij gelijke stand wint de eerste in de vaste
 * volgorde van MAIN_DIMENSIONS, zodat dezelfde antwoorden altijd hetzelfde
 * beeld geven.
 */
function pitfallIndex(scores: Record<MainDimensionId, MainDimensionScore>): number {
  let best = 0;
  for (let i = 1; i < MAIN_DIMENSIONS.length; i += 1) {
    if (scores[MAIN_DIMENSIONS[i].id].score > scores[MAIN_DIMENSIONS[best].id].score) best = i;
  }
  return best;
}

/* ------------------------------------------------------------------
   HET PORTRET — deterministisch getekend uit de twaalf hoofddimensies.
   Geen Math.random(): elke vorm-eigenschap komt uit een concreet getal.

     plaats in de cirkel    <- index van de dimensie (1 = boven, dan met de klok mee)
     lengte van de pluim    <- de score          r = r0 + (score/100) * (rMax - r0)
     kleur                  <- de index          (vaste reeks indigo -> karmijn)
     buiging van de schacht <- (score - 50)/50   positief = met de klok mee
     aantal baarden         <- |score - 50|/50   11 bij 50, 26 bij 0 of 100
     schuinte van de baard  <- |score - 50|/50   38 graden bij 50, 53 bij 0 of 100
     lijndikte              <- |score - 50|/50   dunner bij het midden, zwaarder aan de randen
     baardvariatie          <- de index j van de baard (sinus), niet uit toeval

   Zelfde antwoorden -> zelfde scores -> exact hetzelfde beeld. Dat is een
   harde projectregel, geen toevallige eigenschap van deze implementatie.
------------------------------------------------------------------- */
function createEngine(
  canvas: HTMLCanvasElement,
  field: HTMLElement,
  dims: PortraitDimension[],
  core: PortraitCore,
): PortraitEngine | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const TAU = Math.PI * 2;
  const SECTOR = TAU / 12;
  const HALF = SECTOR / 2;
  const GROND = '#fbf8f3';
  const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  const LEES = "'Inter', system-ui, -apple-system, sans-serif";
  const TITEL = "'Cormorant Garamond', ui-serif, Georgia, serif";

  function rgba(hex: string, a: number) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  // Inkt en inkt-zacht uit de huisstijltokens (--color-ink / --color-ink-soft).
  function inkt(a: number) {
    return `rgba(41,36,32,${a})`;
  }
  function zacht(a: number) {
    return `rgba(87,79,71,${a})`;
  }
  function klem(v: number, a: number, b: number) {
    return v < a ? a : v > b ? b : v;
  }
  function uit(x: number) {
    return 1 - Math.pow(1 - x, 3);
  }

  let W = 0;
  let H = 0;
  let cx = 0;
  let cy = 0;
  let rMax = 0;
  let r0 = 0;
  let rMid = 0;
  let modus: 'full' | 'compact' = 'full';
  let maat = 1;

  function meetkunde() {
    cx = W / 2;
    cy = H / 2;
    const padX = modus === 'full' ? 120 : 34;
    const padY = modus === 'full' ? 64 : 52;
    rMax = Math.max(40, Math.min(W / 2 - padX, H / 2 - padY));
    r0 = rMax * (modus === 'full' ? 0.4 : 0.46);
    rMid = r0 + (rMax - r0) * 0.5;
    maat = rMax / 310;
  }

  function hoek(i: number) {
    return -Math.PI / 2 + i * SECTOR;
  }
  function straal(score: number) {
    return r0 + (score / 100) * (rMax - r0);
  }

  /** Punt op de schacht van pluim i, t in [0,1]. */
  function punt(i: number, t: number, d: number, rt: number): [number, number, number] {
    const a = hoek(i) + d * 0.235 * t * t;
    const r = r0 + (rt - r0) * t;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r, r];
  }

  function waas(i: number, zicht: number, alfa: number) {
    const D = dims[i];
    const d = (D.score - 50) / 50;
    const rt = straal(D.score);
    const p = punt(i, 0.52 * zicht, d, rt);
    const rad = (rt - r0) * 0.6 * zicht + r0 * 0.2;
    if (rad < 2) return;
    const g = ctx!.createRadialGradient(p[0], p[1], 0, p[0], p[1], rad);
    g.addColorStop(0, rgba(D.color, 0.085 * alfa));
    g.addColorStop(1, rgba(D.color, 0));
    ctx!.fillStyle = g;
    ctx!.beginPath();
    ctx!.arc(p[0], p[1], rad, 0, TAU);
    ctx!.fill();
  }

  function pluim(i: number, zicht: number, alfa: number) {
    const D = dims[i];
    const s = D.score;
    const d = (s - 50) / 50;
    const ad = Math.abs(d);
    const rt = straal(s);
    const nb = Math.round(11 + ad * 15);
    const theta = ((38 + ad * 15) * Math.PI) / 180;
    const Lmax = (rMax - r0) * 0.4;
    const lijn = Math.max(0.55, (0.72 + ad * 0.85) * maat);
    ctx!.lineCap = 'round';

    for (let j = 0; j < nb; j += 1) {
      const t = 0.05 + 0.93 * (j / (nb - 1));
      if (t > zicht) break;
      const w = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.72)), 0.9);
      const p = punt(i, t, d, rt);
      const p2 = punt(i, Math.min(t + 0.02, 1), d, rt);
      let tx = p2[0] - p[0];
      let ty = p2[1] - p[1];
      const tl = Math.sqrt(tx * tx + ty * ty) || 1;
      tx /= tl;
      ty /= tl;
      const nx = -ty;
      const ny = tx;
      const grens = (p[2] * Math.sin(HALF) * 0.88) / Math.cos(theta);
      const L = Math.min(Lmax * w, grens);
      if (L < 1) continue;
      const variatie = 0.8 + 0.2 * Math.abs(Math.sin(j * 1.9 + i));
      ctx!.strokeStyle = rgba(D.color, (0.26 + 0.4 * w) * variatie * alfa);
      ctx!.lineWidth = lijn;
      for (let k = 0; k < 2; k += 1) {
        const sgn = k ? -1 : 1;
        const Ls = L * (1 + 0.14 * d * sgn); // lichte asymmetrie uit de score
        const dx = nx * sgn * Math.cos(theta) - tx * Math.sin(theta);
        const dy = ny * sgn * Math.cos(theta) - ty * Math.sin(theta);
        ctx!.beginPath();
        ctx!.moveTo(p[0], p[1]);
        ctx!.quadraticCurveTo(
          p[0] + dx * Ls * 0.55 - tx * Ls * 0.14,
          p[1] + dy * Ls * 0.55 - ty * Ls * 0.14,
          p[0] + dx * Ls,
          p[1] + dy * Ls,
        );
        ctx!.stroke();
      }
    }

    const K = 46;
    let vorig = punt(i, 0, d, rt);
    const basis = (1.5 + ad * 1.8) * maat;
    ctx!.strokeStyle = rgba(D.color, alfa);
    for (let m = 1; m <= K; m += 1) {
      let tt = m / K;
      let laatste = false;
      if (tt >= zicht) {
        tt = zicht;
        laatste = true;
      }
      const q = punt(i, tt, d, rt);
      ctx!.lineWidth = Math.max(0.7, basis * (1 - 0.7 * tt));
      ctx!.beginPath();
      ctx!.moveTo(vorig[0], vorig[1]);
      ctx!.lineTo(q[0], q[1]);
      ctx!.stroke();
      vorig = q;
      if (laatste) break;
    }
  }

  function bus(x: number, y: number, b: number, h: number, r: number) {
    ctx!.beginPath();
    ctx!.moveTo(x + r, y);
    ctx!.lineTo(x + b - r, y);
    ctx!.quadraticCurveTo(x + b, y, x + b, y + r);
    ctx!.lineTo(x + b, y + h - r);
    ctx!.quadraticCurveTo(x + b, y + h, x + b - r, y + h);
    ctx!.lineTo(x + r, y + h);
    ctx!.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx!.lineTo(x, y + r);
    ctx!.quadraticCurveTo(x, y, x + r, y);
    ctx!.closePath();
  }

  /** Handmatige letterspatiëring; canvas kent geen letter-spacing overal. */
  function spatie(tekst: string, x: number, y: number, sp: number, uitlijn: 'left' | 'center' | 'right') {
    const c = String(tekst).split('');
    let totaal = 0;
    for (let i = 0; i < c.length; i += 1) totaal += ctx!.measureText(c[i]).width + sp;
    totaal -= sp;
    let sx = uitlijn === 'center' ? x - totaal / 2 : uitlijn === 'right' ? x - totaal : x;
    const bewaar = ctx!.textAlign;
    ctx!.textAlign = 'left';
    for (let i = 0; i < c.length; i += 1) {
      ctx!.fillText(c[i], sx, y);
      sx += ctx!.measureText(c[i]).width + sp;
    }
    ctx!.textAlign = bewaar;
  }

  function breek(tekst: string, maxB: number) {
    const woorden = tekst.split(' ');
    const regels: string[] = [];
    let nu = '';
    for (let i = 0; i < woorden.length; i += 1) {
      const proef = nu ? `${nu} ${woorden[i]}` : woorden[i];
      if (nu && ctx!.measureText(proef).width > maxB) {
        regels.push(nu);
        nu = woorden[i];
      } else nu = proef;
    }
    if (nu) regels.push(nu);
    return regels;
  }

  function ijkbus(tekst: string, r: number, sterk: boolean, alfa: number) {
    const a = (165 * Math.PI) / 180;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    ctx!.font = `500 ${modus === 'full' ? 11 : 10}px ${MONO}`;
    const b = ctx!.measureText(tekst).width + 14;
    const h = modus === 'full' ? 19 : 17;
    ctx!.fillStyle = `rgba(251,248,243,${0.94 * alfa})`;
    bus(x - b / 2, y - h / 2, b, h, h / 2);
    ctx!.fill();
    ctx!.strokeStyle = inkt((sterk ? 0.36 : 0.15) * alfa);
    ctx!.lineWidth = 1;
    ctx!.stroke();
    ctx!.fillStyle = sterk ? inkt(alfa) : zacht(0.95 * alfa);
    ctx!.textAlign = 'center';
    ctx!.textBaseline = 'middle';
    ctx!.fillText(tekst, x, y + 0.5);
  }

  function etiket(i: number, alfa: number) {
    const D = dims[i];
    const a = hoek(i);
    const lr = rMax + (modus === 'full' ? 21 : 16);
    const px = cx + Math.cos(a) * lr;
    const py = cy + Math.sin(a) * lr;
    ctx!.textBaseline = 'alphabetic';

    if (modus !== 'full') {
      ctx!.font = `500 ${klem(11.5 * (rMax / 118), 11, 15).toFixed(1)}px ${MONO}`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillStyle = inkt(0.92 * alfa);
      ctx!.fillText(String(D.score), px, py);
      return;
    }
    const c = Math.cos(a);
    const uitlijn: 'left' | 'center' | 'right' = c > 0.25 ? 'left' : c < -0.25 ? 'right' : 'center';
    ctx!.font = `400 12.5px ${LEES}`;
    const regels = breek(D.label, 94);
    const lh = 15.5;
    const hoogte = regels.length * lh + 17 + (D.pitfall ? 13 : 0);
    let ty: number;
    if (uitlijn === 'center') ty = Math.sin(a) < 0 ? py - hoogte + lh - 3 : py + lh + 3;
    else ty = py - hoogte / 2 + lh - 3;
    ctx!.textAlign = uitlijn;
    ctx!.fillStyle = zacht(0.97 * alfa);
    for (let j = 0; j < regels.length; j += 1) {
      ctx!.fillText(regels[j], px, ty);
      ty += lh;
    }
    ctx!.font = `500 13.5px ${MONO}`;
    ctx!.fillStyle = inkt(alfa);
    ctx!.fillText(String(D.score), px, ty + 1);
    if (D.pitfall) {
      ctx!.font = `400 9.5px ${MONO}`;
      ctx!.fillStyle = zacht(0.9 * alfa);
      spatie('LET HIER OP', px, ty + 14, 0.7, uitlijn);
    }
  }

  function kern(alfa: number) {
    ctx!.beginPath();
    ctx!.arc(cx, cy, r0, 0, TAU);
    ctx!.fillStyle = GROND;
    ctx!.fill();
    ctx!.strokeStyle = inkt(0.3 * alfa);
    ctx!.lineWidth = 1.1;
    ctx!.stroke();
    ctx!.beginPath();
    ctx!.arc(cx, cy, r0 * 0.9, 0, TAU);
    ctx!.strokeStyle = inkt(0.09 * alfa);
    ctx!.lineWidth = 1;
    ctx!.stroke();

    ctx!.textAlign = 'center';
    ctx!.textBaseline = 'alphabetic';
    if (modus === 'full') {
      const g = Math.min(1, r0 / 124);
      ctx!.font = `500 ${10 * g}px ${MONO}`;
      ctx!.fillStyle = zacht(0.92 * alfa);
      spatie('HOOFDPROFIEL', cx, cy - 46 * g, 2.1 * g, 'center');
      ctx!.font = `500 ${33 * g}px ${TITEL}`;
      ctx!.fillStyle = inkt(alfa);
      ctx!.fillText(core.archetypeName, cx, cy - 10 * g);
      ctx!.font = `500 ${27 * g}px ${MONO}`;
      ctx!.fillStyle = inkt(alfa);
      ctx!.fillText(String(core.archetypeScore), cx, cy + 25 * g);
      if (core.profileName) {
        ctx!.strokeStyle = inkt(0.18 * alfa);
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(cx - 28 * g, cy + 40 * g);
        ctx!.lineTo(cx + 28 * g, cy + 40 * g);
        ctx!.stroke();
        ctx!.font = `400 ${12 * g}px ${LEES}`;
        ctx!.fillStyle = zacht(0.95 * alfa);
        ctx!.fillText(core.profileName, cx, cy + 59 * g);
      }
    } else {
      const k = klem(r0 / 60, 0.55, 1.7);
      ctx!.font = `500 ${18 * k}px ${TITEL}`;
      ctx!.fillStyle = inkt(alfa);
      ctx!.fillText(core.archetypeName, cx, cy - 1 * k);
      ctx!.font = `500 ${16 * k}px ${MONO}`;
      ctx!.fillText(String(core.archetypeScore), cx, cy + 21 * k);
    }
  }

  let focus: number | null = null;
  let p = 1;
  let start = 0;
  let bezig = false;
  let frame = 0;
  const rustig =
    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function zichtbaar(i: number) {
    if (p >= 1) return 1;
    return uit(klem((p - (i / 12) * 0.42) / 0.5, 0, 1));
  }

  function teken() {
    if (!W || !H) return;
    const laat = p >= 1 ? 1 : klem((p - 0.55) / 0.35, 0, 1);
    const kernA = p >= 1 ? 1 : klem(p / 0.2, 0, 1);
    let i: number;

    ctx!.fillStyle = GROND;
    ctx!.fillRect(0, 0, W, H);
    /* Warm papierbed onder de rozet; dooft uit voor de rand, zodat het doek
       naadloos in de pagina overgaat en het beeld ook los blijft kloppen. */
    const vg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, rMax * 1.24);
    vg.addColorStop(0.0, 'rgba(244,238,228,0.92)');
    vg.addColorStop(0.58, 'rgba(244,238,228,0.80)');
    vg.addColorStop(0.86, 'rgba(244,238,228,0.42)');
    vg.addColorStop(1.0, 'rgba(244,238,228,0)');
    ctx!.fillStyle = vg;
    ctx!.fillRect(0, 0, W, H);

    /* Haarfijne sectorgrenzen: het raster waarop de twaalf staan. */
    ctx!.lineWidth = 1;
    for (i = 0; i < 12; i += 1) {
      const a = hoek(i) + HALF;
      ctx!.strokeStyle = inkt(0.06 * laat);
      ctx!.beginPath();
      ctx!.moveTo(cx + Math.cos(a) * r0 * 1.02, cy + Math.sin(a) * r0 * 1.02);
      ctx!.lineTo(cx + Math.cos(a) * rMax, cy + Math.sin(a) * rMax);
      ctx!.stroke();
    }

    const alfa = (n: number) => (focus === null || focus === n ? 1 : 0.13);

    ctx!.globalCompositeOperation = 'multiply';
    for (i = 0; i < 12; i += 1) waas(i, zichtbaar(i), alfa(i));
    ctx!.globalCompositeOperation = 'source-over';
    for (i = 0; i < 12; i += 1) pluim(i, zichtbaar(i), alfa(i));

    /* IJkpunten: 100 als buitencirkel, 50 als stippelring dwars door het beeld. */
    ctx!.setLineDash([]);
    ctx!.strokeStyle = inkt(0.14 * laat);
    ctx!.lineWidth = 1;
    ctx!.beginPath();
    ctx!.arc(cx, cy, rMax, 0, TAU);
    ctx!.stroke();
    ctx!.strokeStyle = `rgba(251,248,243,${0.66 * laat})`;
    ctx!.lineWidth = 4.5;
    ctx!.beginPath();
    ctx!.arc(cx, cy, rMid, 0, TAU);
    ctx!.stroke();
    ctx!.strokeStyle = inkt(0.48 * laat);
    ctx!.lineWidth = 1.1;
    ctx!.setLineDash([5 * maat + 2, 6 * maat + 2]);
    ctx!.beginPath();
    ctx!.arc(cx, cy, rMid, 0, TAU);
    ctx!.stroke();
    ctx!.setLineDash([]);

    kern(kernA);

    /* IJkbolletjes ná de kern: '0' ligt precies op de kernrand, en de kern
       wordt dekkend gevuld — eerst tekenen zou dat bolletje halveren. */
    if (modus === 'full') {
      ijkbus('0', r0, false, laat);
      ijkbus('100', rMax, false, laat);
    }
    ijkbus('50', rMid, true, laat);

    /* Het aandachtspunt: open ring op de top van de hoogste pluim. */
    for (i = 0; i < 12; i += 1) {
      if (!dims[i].pitfall) continue;
      if (zichtbaar(i) < 0.98) break;
      const dd = (dims[i].score - 50) / 50;
      const tip = punt(i, 1, dd, straal(dims[i].score));
      const rr = modus === 'full' ? 8.5 : 5.5;
      ctx!.strokeStyle = `rgba(251,248,243,${0.9 * alfa(i)})`;
      ctx!.lineWidth = 3.4;
      ctx!.beginPath();
      ctx!.arc(tip[0], tip[1], rr, 0, TAU);
      ctx!.stroke();
      ctx!.strokeStyle = inkt(0.82 * alfa(i));
      ctx!.lineWidth = 1.3;
      ctx!.beginPath();
      ctx!.arc(tip[0], tip[1], rr, 0, TAU);
      ctx!.stroke();
      break;
    }

    for (i = 0; i < 12; i += 1) etiket(i, laat * (focus === null || focus === i ? 1 : 0.28));
  }

  function pas() {
    const b = Math.max(260, Math.min(field.clientWidth || 320, 880));
    if (Math.round(b) === W) {
      teken();
      return;
    }
    W = Math.round(b);
    // Breed genoeg voor buitenlabels? Dan mag het doek platter dan vierkant:
    // de zijkanten hebben meer marge nodig (padX 120) dan boven en onder
    // (padY 64), dus 0.88 scheelt dode ruimte zonder de rozet te verkleinen.
    // Smal blijft het vierkant, anders krimpt de cirkel wél.
    modus = W >= 620 ? 'full' : 'compact';
    H = modus === 'full' ? Math.round(W * 0.88) : W;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    meetkunde();
    teken();
  }

  function tik(nu: number) {
    p = Math.min(1, (nu - start) / 1500);
    teken();
    if (p < 1) frame = requestAnimationFrame(tik);
    else bezig = false;
  }

  function speel() {
    if (rustig || document.visibilityState !== 'visible') {
      p = 1;
      teken();
      return;
    }
    p = 0;
    start = performance.now();
    if (!bezig) {
      bezig = true;
      frame = requestAnimationFrame(tik);
    }
  }

  /* Printen: de intekening mag nooit halverwege op papier belanden, en de
     printbreedte verschilt van de schermbreedte. Beide vóór het pagineren
     afhandelen. */
  function voorPrint() {
    p = 1;
    bezig = false;
    cancelAnimationFrame(frame);
    pas();
  }
  window.addEventListener('beforeprint', voorPrint);

  /* Beide signalen, bewust. De ResizeObserver vangt het geval waarin de kaart
     van breedte verandert zonder dat het venster meebeweegt; het resize-event
     vangt het omgekeerde, én omgevingen waarin de observer niet afgaat (zoals
     apparaat-emulatie in devtools). pas() doet niets als de breedte gelijk is
     gebleven, dus dubbel luisteren kost niets. */
  const observer =
    typeof ResizeObserver === 'function'
      ? new ResizeObserver(() => {
          pas();
        })
      : null;
  observer?.observe(field);
  window.addEventListener('resize', pas);

  pas();
  speel();
  if (document.fonts?.ready) {
    void document.fonts.ready.then(() => {
      teken();
    });
  }
  // Vangnet: als een rAF-lus wordt gesmoord (achtergrondtab), staat het beeld
  // alsnog compleet in plaats van half getekend.
  const vangnet = window.setTimeout(() => {
    if (p < 1) {
      p = 1;
      teken();
    }
  }, 3000);

  return {
    setFocus(index) {
      focus = index;
      teken();
    },
    replay: speel,
    destroy() {
      cancelAnimationFrame(frame);
      window.clearTimeout(vangnet);
      window.removeEventListener('beforeprint', voorPrint);
      window.removeEventListener('resize', pas);
      observer?.disconnect();
    },
  };
}

/**
 * Het portret: de twaalf hoofddimensies als één getekend beeld, met daaronder
 * de sleutel waarmee het af te lezen is. Zonder die sleutel is het decoratie.
 *
 * De twaalf waarden staan altijd ook als tekst op de pagina (de lijst hieronder
 * is de tekstversie van het beeld), zodat het rapport zonder canvas, zonder
 * JavaScript en met een schermlezer volledig blijft.
 */
export function ArcanaPortrait({ scores, archetypeName, archetypeScore, profileName }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<PortraitEngine | null>(null);
  const [locked, setLocked] = useState<number | null>(null);

  const pitfall = pitfallIndex(scores);
  const dims: PortraitDimension[] = MAIN_DIMENSIONS.map((dim, i) => ({
    id: dim.id,
    label: dim.label,
    meaning: dim.meaning,
    color: dim.color,
    score: scores[dim.id].score,
    pitfall: i === pitfall,
  }));

  // Alleen de waarden die het beeld bepalen in de sleutel, zodat de tekening
  // niet bij elke render opnieuw wordt opgebouwd.
  const signature = dims.map((d) => `${d.id}:${d.score}`).join('|');

  useEffect(() => {
    const canvas = canvasRef.current;
    const field = fieldRef.current;
    if (!canvas || !field) return;
    const engine = createEngine(canvas, field, dims, { archetypeName, archetypeScore, profileName });
    engineRef.current = engine;
    return () => {
      engine?.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, archetypeName, archetypeScore, profileName]);

  useEffect(() => {
    engineRef.current?.setFocus(locked);
  }, [locked]);

  function hover(index: number | null) {
    if (locked === null) engineRef.current?.setFocus(index);
  }

  const beschrijving =
    `Portret${profileName ? ` van ${profileName}` : ''}. In het hart staat het hoofdprofiel ` +
    `${archetypeName}, score ${archetypeScore}. Daaromheen twaalf gekleurde pluimen, elk even lang ` +
    `als de score van één gemeten kant, met een gestippelde ring op 50 als middenlijn. ` +
    `Alle twaalf waarden staan als tekst onder het beeld.`;

  return (
    <div className="arcana-portrait">
      <div className="arcana-portrait__field" ref={fieldRef}>
        <canvas
          ref={canvasRef}
          className="arcana-portrait__canvas"
          role="img"
          aria-describedby="arcana-portrait-list"
          aria-label={beschrijving}
        />
      </div>

      <p className="arcana-portrait__caption">
        <span>
          Het beeld is getekend uit je twaalf scores. Dezelfde antwoorden geven altijd exact hetzelfde portret.
        </span>
        <button
          type="button"
          className="arcana-button arcana-button--text arcana-print-hide"
          onClick={() => engineRef.current?.replay()}
        >
          Teken opnieuw
        </button>
      </p>

      <h4 className="arcana-portrait__key-title">De sleutel</h4>
      <p className="arcana-portrait__key-lead">
        Zonder deze vier regels is het beeld decoratie. Met deze regels is het af te lezen.
      </p>
      <dl className="arcana-portrait__rules">
        <div>
          <dt>Richting — welke kant</dt>
          <dd>
            Elke pluim heeft een vaste plaats in de cirkel. Bovenaan staat Innerlijke motor, daarna volgt de rest
            met de klok mee, in de volgorde van de lijst hieronder.
          </dd>
        </div>
        <div>
          <dt>Lengte — de score</dt>
          <dd>
            Hoe ver een pluim reikt, is de score. De rand van de kern is 0, de gestippelde ring is 50 en de
            buitenste cirkel is 100. Voorbij de stippelring is bovengemiddeld, erbinnen ondergemiddeld.
          </dd>
        </div>
        <div>
          <dt>Dichtheid en buiging — de afstand tot 50</dt>
          <dd>
            Hoe verder een score van 50 af ligt, hoe voller en zwaarder de pluim wordt en hoe sterker hij
            meebuigt. Lengte, dichtheid en buiging vertellen dus hetzelfde en versterken elkaar, zodat een
            uitgesproken kant meteen opvalt. De kleur zegt niets over hoog of laag; die hoort bij de plaats in de
            cirkel.
          </dd>
        </div>
        <div>
          <dt>De open ring — het aandachtspunt</dt>
          <dd>
            Eén pluimtop draagt een open ringetje: je sterkst uitgesproken kant, {dims[pitfall].label.toLowerCase()}.
            Precies die kant is ook degene die het vaakst doorschiet.
          </dd>
        </div>
      </dl>

      <p className="arcana-portrait__list-head">
        <span>De twaalf gemeten kanten</span>
        <span>Score · 0–100 · midden 50</span>
      </p>
      <div className="arcana-portrait__list" id="arcana-portrait-list" role="group" aria-label="De twaalf gemeten kanten met hun score">
        {dims.map((dim, i) => (
          <button
            key={dim.id}
            type="button"
            className={`arcana-portrait__row${dim.pitfall ? ' is-pitfall' : ''}${locked === i ? ' is-active' : ''}`}
            style={{ '--portrait-hue': dim.color } as React.CSSProperties}
            aria-pressed={locked === i}
            onPointerEnter={() => hover(i)}
            onPointerLeave={() => hover(null)}
            onFocus={() => engineRef.current?.setFocus(i)}
            onBlur={() => engineRef.current?.setFocus(locked)}
            onClick={() => setLocked((cur) => (cur === i ? null : i))}
          >
            <span className="arcana-portrait__swatch" aria-hidden="true" />
            <span className="arcana-portrait__row-text">
              <span className="arcana-portrait__row-name">{dim.label}</span>
              <span className="arcana-portrait__row-meaning">{dim.meaning}</span>
            </span>
            <span className="arcana-portrait__row-score">{dim.score}</span>
          </button>
        ))}
      </div>
      <p className="arcana-portrait__list-foot arcana-print-hide">
        Kies een kant om hem in het beeld op te lichten; kies nogmaals om alles terug te zetten.
      </p>
    </div>
  );
}
