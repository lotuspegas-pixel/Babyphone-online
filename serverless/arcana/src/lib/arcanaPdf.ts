import fontkit from '@pdf-lib/fontkit';
import { LineCapStyle, PDFDocument, rgb, type PDFFont, type PDFImage, type PDFPage, type RGB } from 'pdf-lib';
import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import {
  DIMENSION_FAMILIES,
  MAIN_DIMENSIONS,
  SUB_DIMENSIONS,
  TENSION_DEFINITIONS,
  type DimensionFamilyId,
} from '../data/arcanaDimensions';
import { QUESTION_COUNT } from '../data/arcanaQuestionCount';
import { DISCLAIMER_TEXT, PRIVACY_TEXT } from '../data/arcanaReportBlocks';
import { SECTION_GROUPS } from '../data/arcanaSectionGroups';
import type { ArcanaReport, ArcanaReportSection } from '../types/arcana';
import { formatReportDate } from './arcanaExport';
import { buildReportCode } from './arcanaReportCode';
import { applyVoice } from './arcanaVoice';

/**
 * De PDF van het rapport, volledig in de browser gebouwd (pdf-lib + fontkit;
 * geen server, geen DOM). Dit bestand is een pure functie van het
 * rapportobject plus de aangeleverde fonts en afbeeldingen: dezelfde invoer
 * geeft byte-voor-byte dezelfde PDF. Alles wat met de browser te maken heeft
 * (fonts ophalen, SVG's rasteren) staat in arcanaPdfAssets.ts.
 *
 * Opbouw: voorblad · inhoud & profielsamenvatting · scores · zes delen met
 * hun hoofdstukken · colofon (privacy en disclaimer). A4 staand, zelf
 * geregeld: regelafbreking, paginering met wezen-/hoerenjongencontrole,
 * lopende kop en voet, en een inhoudsopgave met paginanummers (tweede pas).
 */

export type PdfFaceName = 'display' | 'displayItalic' | 'body' | 'bodyBold' | 'bodyItalic' | 'mono' | 'hand';

/** Bestandsnamen in src/fonts/pdf/ (gemaakt door scripts/subset-fonts.py). */
export const PDF_FONT_FILES: Record<PdfFaceName, string> = {
  display: 'bodoni-moda-600.ttf',
  displayItalic: 'bodoni-moda-600-italic.ttf',
  body: 'spectral-400.ttf',
  bodyBold: 'spectral-600.ttf',
  bodyItalic: 'spectral-400-italic.ttf',
  mono: 'courier-prime-400.ttf',
  hand: 'shadows-into-light-400.ttf',
};

export interface PdfImage {
  png: Uint8Array;
  /** Beeldverhouding van de bron; de plaatsing schaalt op breedte. */
  width: number;
  height: number;
}

export interface ArcanaPdfAssets {
  fonts: Record<PdfFaceName, Uint8Array>;
  /** Sleutels: 'emblem' (het archetype-embleem) en de id's uit SECTION_GROUPS. */
  images: Partial<Record<string, PdfImage>>;
}

export interface BuildArcanaPdfOptions {
  /** Krijgt elke getekende tekst; alleen voor tests (geen "undefined" in de PDF). */
  trace?: (text: string) => void;
  /** Zonder objectstreams is de PDF iets groter maar met `grep` te lezen; alleen voor tests. */
  useObjectStreams?: boolean;
}

/* ── Maten (punten; A4 = 595,28 × 841,89) ───────────────────────────────── */
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 56;
const COL_W = PAGE_W - 2 * MARGIN;
/** Bovenkant van de tekstkolom op een gewone pagina, onder de lopende kop. */
const TOP = PAGE_H - 92;
/** Onderkant van de tekstkolom, boven de voet. */
const BOTTOM = 68;

/* ── Kleuren: hex uit src/styles/tokens.css (lichte modus) ──────────────── */
const hex = (h: string): RGB =>
  rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const C = {
  parchment: hex('#ede4cc'), // --bg
  surface: hex('#f4edda'), // --surface
  ink: hex('#1c1712'), // --ink
  inkSoft: hex('#4e4338'), // --ink-soft
  inkFaint: hex('#6b5f4e'), // --ink-faint
  crimson: hex('#7e1e1b'), // --gold (het zegelrood)
  crimsonGlyph: hex('#9c2b22'), // --gold-glyph (alleen grafisch)
  track: hex('#dccc9f'), // --bg-deep
};
const DIM_HEX: Record<string, string> = {
  '--dim-innerlijke-motor': '#4261b6',
  '--dim-denkstijl': '#4242a2',
  '--dim-werkstijl': '#3c2c73',
  '--dim-sociale-energie': '#057358',
  '--dim-emotionele-gevoeligheid': '#006a5c',
  '--dim-relatiepatroon': '#005041',
  '--dim-controle-zekerheid': '#79632f',
  '--dim-conflictstijl': '#755a00',
  '--dim-stressreactie': '#633a00',
  '--dim-zelfbeeld': '#9b496d',
  '--dim-schaduwkant': '#b43758',
  '--dim-groeipad': '#85003c',
};
const FAMILY_HEX: Record<DimensionFamilyId, string> = {
  motor: '#4242a2', // --fam-motor = --dim-denkstijl
  contact: '#006a5c', // --fam-contact = --dim-emotionele-gevoeligheid
  grip: '#755a00', // --fam-grip = --dim-conflictstijl
  zelf: '#b43758', // --fam-zelf = --dim-schaduwkant
};

/* ── Het zegel, dezelfde geometrie als ArcanaSeal.tsx (viewBox 0 0 100 100) ─ */
const SEAL_STAR =
  'M50 14 L54.5 34 L59 24 L57 40 L74 36 L60 46 L76 50 L60 54 L74 64 L57 60 L59 76 L54.5 66 L50 86 L45.5 66 L41 76 L43 60 L26 64 L40 54 L24 50 L40 46 L26 36 L43 40 L41 24 L45.5 34 Z';
const SEAL_PEDESTAL = [
  'M44 58 h12 v4 h-12 z',
  'M46 62 h8 v3 h-8 z',
  'M47 65 L47 78 Q47 82 50 82 Q53 82 53 78 L53 65 Z',
  'M40 82 h20 v3 h-20 z',
  'M38 85 h24 v3 h-24 z',
];

/** Tekent het zegel met linkerbovenhoek (x, top) en zijde `size`. */
function drawSeal(page: PDFPage, x: number, top: number, size: number, color: RGB): void {
  const s = size / 100;
  const cx = x + 50 * s;
  const cy = top - 50 * s;
  page.drawCircle({
    x: cx,
    y: cy,
    size: 46 * s,
    borderColor: color,
    borderWidth: 2.6 * s,
    borderDashArray: [1 * s, 2.4 * s],
    borderLineCap: LineCapStyle.Round,
    borderOpacity: 0.9,
  });
  page.drawCircle({ x: cx, y: cy, size: 38 * s, borderColor: color, borderWidth: 1 * s, borderOpacity: 0.5 });
  page.drawSvgPath(SEAL_STAR, { x, y: top, scale: s, color });
  for (const d of SEAL_PEDESTAL) page.drawSvgPath(d, { x, y: top, scale: s, color });
}

/** Vier familiesymbolen (◆ ● ▲ ■) als vector, zodat kleur nooit de enige drager is. */
function drawFamilySymbol(page: PDFPage, family: DimensionFamilyId, cx: number, cy: number, r: number, color: RGB): void {
  if (family === 'contact') page.drawCircle({ x: cx, y: cy, size: r, color });
  else if (family === 'motor') page.drawSvgPath(`M0 ${-r} L${r} 0 L0 ${r} L${-r} 0 Z`, { x: cx, y: cy, color });
  else if (family === 'grip') page.drawSvgPath(`M0 ${-r} L${r} ${r * 0.8} L${-r} ${r * 0.8} Z`, { x: cx, y: cy, color });
  else page.drawRectangle({ x: cx - r * 0.85, y: cy - r * 0.85, width: r * 1.7, height: r * 1.7, color });
}

/**
 * Een paar vaste, lage-alpha vlakken: de "papiervlekken" van het perkament.
 * Vector, geen raster, en altijd dezelfde vormen (determinisme).
 */
function drawPaper(page: PDFPage): void {
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: C.parchment });
  const patches: Array<[string, RGB, number]> = [
    ['M0 0 L150 0 L142 28 L155 62 L138 96 L150 130 L128 168 L96 190 L70 222 L30 236 L0 226 Z', C.surface, 0.32],
    ['M595 841 L440 841 L448 812 L432 778 L452 742 L436 704 L462 672 L500 652 L540 646 L570 660 L595 652 Z', C.surface, 0.28],
    ['M0 841 L96 841 L84 818 L98 792 L72 770 L82 744 L44 732 L22 748 L0 742 Z', C.ink, 0.022],
    ['M595 0 L508 0 L520 26 L504 54 L530 78 L512 104 L548 120 L574 108 L595 118 Z', C.ink, 0.02],
  ];
  for (const [d, color, opacity] of patches) page.drawSvgPath(d, { x: 0, y: PAGE_H, color, opacity, scale: 1 });
}

/* ── Tekst ──────────────────────────────────────────────────────────────── */
interface TextStyle {
  font: PDFFont;
  size: number;
  color: RGB;
  /** Regelafstand als factor van de korpsgrootte. */
  leading: number;
}

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  for (const rawLine of text.split('\n')) {
    const words = rawLine.split(/\s+/).filter(Boolean);
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= width) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = word;
      // Een woord breder dan de kolom (komt in lopende tekst niet voor):
      // teken voor teken afbreken, zonder koppelteken.
      while (font.widthOfTextAtSize(line, size) > width && line.length > 1) {
        let cut = line.length - 1;
        while (cut > 1 && font.widthOfTextAtSize(line.slice(0, cut), size) > width) cut -= 1;
        lines.push(line.slice(0, cut));
        line = line.slice(cut);
      }
    }
    lines.push(line);
  }
  return lines.length ? lines : [''];
}

function trackedWidth(text: string, font: PDFFont, size: number, tracking: number): number {
  return font.widthOfTextAtSize(text, size) + tracking * Math.max(0, text.length - 1);
}

/* ── De opmaak-engine ───────────────────────────────────────────────────── */
interface BodyPage {
  page: PDFPage;
  partTitle: string;
}

class Layout {
  readonly pages: BodyPage[] = [];
  y = TOP;
  private partTitle = '';

  readonly doc: PDFDocument;
  readonly f: Record<PdfFaceName, PDFFont>;
  readonly trace: (text: string) => void;

  constructor(doc: PDFDocument, f: Record<PdfFaceName, PDFFont>, trace: (text: string) => void) {
    this.doc = doc;
    this.f = f;
    this.trace = trace;
  }

  get page(): PDFPage {
    return this.pages[this.pages.length - 1].page;
  }

  get pageNumber(): number {
    return this.pages.length + 1; // het voorblad is pagina 1
  }

  get atTop(): boolean {
    return this.y === TOP;
  }

  newPage(partTitle = this.partTitle): PDFPage {
    this.partTitle = partTitle;
    const page = this.doc.addPage([PAGE_W, PAGE_H]);
    drawPaper(page);
    this.pages.push({ page, partTitle });
    this.y = TOP;
    return page;
  }

  /** Zorgt dat `height` punten onder de cursor passen; anders nieuwe pagina. */
  ensure(height: number): void {
    if (this.y - height < BOTTOM) this.newPage();
  }

  space(points: number): void {
    if (!this.atTop) this.y -= points;
  }

  text(page: PDFPage, text: string, x: number, y: number, style: Omit<TextStyle, 'leading'>, tracking = 0): void {
    if (!text) return;
    this.trace(text);
    if (tracking === 0) {
      page.drawText(text, { x, y, size: style.size, font: style.font, color: style.color });
      return;
    }
    let cx = x;
    for (const ch of text) {
      page.drawText(ch, { x: cx, y, size: style.size, font: style.font, color: style.color });
      cx += style.font.widthOfTextAtSize(ch, style.size) + tracking;
    }
  }

  /** Kleine kapitalen-kicker in Courier, met spatiëring. */
  kicker(page: PDFPage, text: string, x: number, y: number, color: RGB, size = 7.5, align: 'left' | 'right' | 'center' = 'left'): number {
    const upper = text.toUpperCase();
    const tracking = size * 0.18;
    const w = trackedWidth(upper, this.f.mono, size, tracking);
    const start = align === 'right' ? x - w : align === 'center' ? x - w / 2 : x;
    this.text(page, upper, start, y, { font: this.f.mono, size, color }, tracking);
    return w;
  }

  hairline(page: PDFPage, x1: number, x2: number, y: number, opacity = 0.18, thickness = 0.6): void {
    page.drawLine({ start: { x: x1, y }, end: { x: x2, y }, thickness, color: C.ink, opacity });
  }

  /**
   * Een alinea in de stroom, met wezen-/hoerenjongencontrole: nooit één
   * losse regel onder- of bovenaan een pagina. `marker` tekent iets vóór de
   * eerste regel (het opsommingsteken).
   */
  paragraph(
    text: string,
    style: TextStyle,
    opts: { x?: number; width?: number; marker?: (page: PDFPage, x: number, baseline: number) => void; after?: number } = {},
  ): void {
    const x = opts.x ?? MARGIN;
    const width = opts.width ?? MARGIN + COL_W - x;
    const lh = style.size * style.leading;
    const lines = wrap(text, style.font, style.size, width);
    let i = 0;
    while (i < lines.length) {
      const remaining = lines.length - i;
      let fit = Math.floor((this.y - BOTTOM) / lh);
      if (fit < Math.min(2, remaining)) {
        this.newPage();
        continue;
      }
      if (fit < remaining && remaining - fit === 1) fit -= 1; // geen wees op de volgende pagina
      if (fit < 2 && remaining > 1) {
        this.newPage();
        continue;
      }
      const count = Math.min(fit, remaining);
      for (let k = 0; k < count; k += 1) {
        const baseline = this.y - style.size;
        if (i === 0 && k === 0 && opts.marker) opts.marker(this.page, x, baseline);
        this.text(this.page, lines[i + k], x, baseline, style);
        this.y -= lh;
      }
      i += count;
      if (i < lines.length) this.newPage();
    }
    this.y -= opts.after ?? 0;
  }

  /** Kop die nooit onderaan een pagina blijft hangen: er moet ruimte zijn voor de kop én twee tekstregels. */
  heading(text: string, style: TextStyle, opts: { before?: number; after?: number; keep?: number; x?: number; width?: number } = {}): void {
    const x = opts.x ?? MARGIN;
    const width = opts.width ?? MARGIN + COL_W - x;
    const lh = style.size * style.leading;
    const lines = wrap(text, style.font, style.size, width);
    const need = lines.length * lh + (opts.after ?? 0) + (opts.keep ?? 2 * 16);
    if (this.y - (this.atTop ? 0 : opts.before ?? 0) - need < BOTTOM) this.newPage();
    else this.space(opts.before ?? 0);
    for (const line of lines) {
      this.text(this.page, line, x, this.y - style.size, style);
      this.y -= lh;
    }
    this.y -= opts.after ?? 0;
  }
}

/* ── Hulpfuncties op het rapport ────────────────────────────────────────── */
function archetypeName(id: string): string {
  return ARCHETYPES.find((a) => a.id === id)?.name ?? STRESS_ARCHETYPES.find((s) => s.id === id)?.name ?? id;
}

function orderedGroups(report: ArcanaReport): Array<{ group: (typeof SECTION_GROUPS)[number]; sections: ArcanaReportSection[] }> {
  return SECTION_GROUPS.map((group) => ({
    group,
    sections: group.ids.map((id) => report.sections.find((s) => s.id === id)).filter((s): s is ArcanaReportSection => Boolean(s)),
  }));
}

function safeDate(iso: string): Date {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
}

/** Letters zonder NFD-ontleding die anders uit de bestandsnaam zouden vallen. */
const PLAIN_LETTERS: Record<string, string> = { Ł: 'L', ł: 'l', Ø: 'O', ø: 'o', Đ: 'D', đ: 'd', ß: 'ss', Æ: 'AE', æ: 'ae', Œ: 'OE', œ: 'oe' };

/** Bestandsnaam: Arcana-Profile-rapport-<naam-of-code>-<jjjj-mm-dd>.pdf */
export function buildArcanaPdfFilename(report: ArcanaReport): string {
  const name = report.meta.profile.name
    .trim()
    .replace(/[ŁłØøĐđßÆæŒœ]/g, (ch) => PLAIN_LETTERS[ch])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const who = name || buildReportCode(report);
  const date = report.meta.generatedAt.slice(0, 10) || 'onbekend';
  return `Arcana-Profile-rapport-${who}-${date}.pdf`;
}

/* ── De bouw ────────────────────────────────────────────────────────────── */
export async function buildArcanaPdf(report: ArcanaReport, assets: ArcanaPdfAssets, options: BuildArcanaPdfOptions = {}): Promise<Uint8Array> {
  const trace = options.trace ?? (() => {});
  const doc = await PDFDocument.create({ updateMetadata: false });
  doc.registerFontkit(fontkit);

  const name = report.meta.profile.name.trim();
  const code = buildReportCode(report);
  const date = formatReportDate(report.meta.generatedAt);
  const primary = archetypeName(report.archetypes.primary);
  const secondary = archetypeName(report.archetypes.secondary);
  const stress = archetypeName(report.archetypes.stress);
  const groups = orderedGroups(report);
  const chapterCount = groups.reduce((n, g) => n + g.sections.length, 0);

  doc.setTitle(name ? `Arcana Profile rapport — ${name}` : 'Arcana Profile rapport');
  doc.setAuthor('Arcana Profile');
  doc.setSubject(`Persoonlijk rapport · ${primary} · rapportcode ${code}`);
  doc.setKeywords(['Arcana Profile', primary, code]);
  doc.setCreator('Arcana Profile (arcanaprofile.com)');
  doc.setProducer('Arcana Profile · pdf-lib');
  doc.setLanguage('nl');
  doc.setCreationDate(safeDate(report.meta.generatedAt));
  doc.setModificationDate(safeDate(report.meta.generatedAt));

  const f = Object.fromEntries(
    await Promise.all(
      (Object.keys(PDF_FONT_FILES) as PdfFaceName[]).map(async (face): Promise<[PdfFaceName, PDFFont]> => [
        face,
        await doc.embedFont(assets.fonts[face], { subset: true }),
      ]),
    ),
  ) as Record<PdfFaceName, PDFFont>;

  const images: Partial<Record<string, { img: PDFImage; ratio: number }>> = {};
  for (const [key, image] of Object.entries(assets.images)) {
    if (!image) continue;
    try {
      images[key] = { img: await doc.embedPng(image.png), ratio: image.height / image.width };
    } catch {
      // Een kapotte afbeelding kost alleen de illustratie, nooit de PDF.
    }
  }

  const L = new Layout(doc, f, trace);
  const body: TextStyle = { font: f.body, size: 10.5, color: C.ink, leading: 1.55 };
  const intro: TextStyle = { font: f.bodyItalic, size: 11, color: C.inkSoft, leading: 1.5 };
  const quote: TextStyle = { font: f.bodyItalic, size: 11.5, color: C.ink, leading: 1.45 };

  /** Het embleem met de archetypenaam op het etiket onderin (zoals ArcanaReportEmblem). */
  const drawEmblem = (page: PDFPage, x: number, top: number, width: number): number => {
    const emblem = images.emblem;
    if (!emblem) return 0;
    const height = width * emblem.ratio;
    page.drawImage(emblem.img, { x, y: top - height, width, height });
    const size = width * 0.064;
    const labelW = width * 0.74;
    const labelX = x + width * 0.15;
    const labelCy = top - height * 0.91;
    const lines = wrap(primary, f.displayItalic, size, labelW);
    let ly = labelCy + ((lines.length - 1) * size * 1.05) / 2 - size * 0.35;
    for (const line of lines) {
      const w = f.displayItalic.widthOfTextAtSize(line, size);
      L.text(page, line, labelX + (labelW - w) / 2, ly, { font: f.displayItalic, size, color: C.ink });
      ly -= size * 1.05;
    }
    page.drawRectangle({ x: labelX + labelW / 2 - size * 1.1, y: top - height * 0.985, width: size * 2.2, height: 1.2, color: C.crimsonGlyph });
    return height;
  };

  /* ── 1. Voorblad ──────────────────────────────────────────────────────── */
  const cover = doc.addPage([PAGE_W, PAGE_H]);
  drawPaper(cover);
  {
    const sealSize = 30;
    const wordmark = 'Arcana Profile';
    const wmSize = 19;
    const wmW = f.display.widthOfTextAtSize(wordmark, wmSize);
    const groupW = sealSize + 10 + wmW;
    const gx = (PAGE_W - groupW) / 2;
    const top = PAGE_H - 48;
    drawSeal(cover, gx, top, sealSize, C.ink);
    L.text(cover, wordmark, gx + sealSize + 10, top - 19, { font: f.display, size: wmSize, color: C.ink });
    L.kicker(cover, 'Know your patterns', gx + sealSize + 10, top - 30, C.inkSoft, 7);

    // Rode schijf, deels achter het embleem.
    const emblemW = 300;
    const emblemX = (PAGE_W - emblemW) / 2 + 28;
    const emblemTop = PAGE_H - 118;
    cover.drawCircle({ x: emblemX - 20, y: emblemTop - 95, size: 98, color: C.crimson, opacity: 0.92 });
    const drawn = drawEmblem(cover, emblemX, emblemTop, emblemW);
    if (!drawn) {
      // Zonder embleem toch een beeld: het zegel groot in de schijf.
      drawSeal(cover, emblemX + 40, emblemTop - 40, 200, C.ink);
    }
    // Eén handgeschreven kanttekening, zoals in het masthead op het web.
    L.text(cover, 'The map is not the territory.', PAGE_W - MARGIN - 128, emblemTop - 336, { font: f.hand, size: 12, color: C.inkSoft });

    const titleSize = 40;
    let ty = 338;
    for (const line of ['Jouw', 'Arcana Profile', 'rapport']) {
      L.text(cover, line, MARGIN, ty, { font: f.display, size: titleSize, color: C.ink });
      ty -= titleSize * 1.02;
    }
    cover.drawRectangle({ x: MARGIN, y: ty + 18, width: 38, height: 2, color: C.crimson });
    let py = ty - 12;
    if (name) {
      L.text(cover, name, MARGIN, py, { font: f.display, size: 22, color: C.ink });
      py -= 26;
    }
    L.text(cover, primary, MARGIN, py, { font: f.bodyBold, size: 15, color: C.ink });
    py -= 19;
    L.text(cover, `Tweede stem: ${secondary}`, MARGIN, py, { font: f.body, size: 12, color: C.inkSoft });

    // Voetstrook: DATUM | RAPPORTCODE | VERSIE
    const stripTop = 118;
    L.hairline(cover, MARGIN, PAGE_W - MARGIN, stripTop, 0.28, 0.8);
    const cells: Array<[string, string]> = [
      ['Datum', date],
      ['Rapportcode', code],
      ['Versie', report.meta.version],
    ];
    const cellW = COL_W / 3;
    cells.forEach(([label, value], i) => {
      const cx = MARGIN + i * cellW + (i === 0 ? 0 : 18);
      L.kicker(cover, label, cx, stripTop - 22, C.inkFaint, 7);
      L.text(cover, value, cx, stripTop - 40, { font: f.body, size: 11.5, color: C.ink });
      if (i > 0) cover.drawLine({ start: { x: MARGIN + i * cellW, y: stripTop - 8 }, end: { x: MARGIN + i * cellW, y: stripTop - 48 }, thickness: 0.6, color: C.ink, opacity: 0.18 });
    });
  }

  /* ── 2. Inhoud & profielsamenvatting (gevuld na de opmaak, i.v.m. paginanummers) ── */
  const tocPage = L.newPage('Inhoud & profielsamenvatting');

  /* ── 3. Scores ───────────────────────────────────────────────────────── */
  L.newPage('Scores');
  const scoresPageNumber = L.pageNumber;
  {
    L.heading('Scores in één oogopslag', { font: f.display, size: 26, color: C.ink, leading: 1.1 }, { after: 10 });
    L.page.drawRectangle({ x: MARGIN, y: L.y - 2, width: 38, height: 2, color: C.crimson });
    L.y -= 16;
    L.paragraph(
      'Twaalf hoofddimensies, drie archetypen en de spanningsvelden die bij jou actief zijn — de cijfers waar elke uitspraak in dit rapport op teruggaat. Alle scores lopen van 0 tot 100.',
      intro,
      { after: 10 },
    );
    const labelW = 150;
    const barX = MARGIN + labelW + 10;
    const barW = COL_W - labelW - 10 - 34;
    const bar = (label: string, value: number, color: RGB, opts: { size?: number; height?: number; labelFont?: PDFFont; x?: number } = {}) => {
      const h = opts.height ?? 7;
      const size = opts.size ?? 10;
      const row = Math.max(16, h + 9);
      L.ensure(row);
      const baseline = L.y - size;
      L.text(L.page, label, opts.x ?? MARGIN, baseline, { font: opts.labelFont ?? f.body, size, color: C.ink });
      const by = baseline + size * 0.3 - h / 2;
      L.page.drawRectangle({ x: barX, y: by, width: barW, height: h, color: C.track });
      const v = Math.max(0, Math.min(100, value));
      if (v > 0) L.page.drawRectangle({ x: barX, y: by, width: (barW * v) / 100, height: h, color });
      L.text(L.page, String(Math.round(v)), barX + barW + 8, baseline, { font: f.mono, size: 9, color: C.inkSoft });
      L.y -= row;
    };

    for (const famId of Object.keys(DIMENSION_FAMILIES) as DimensionFamilyId[]) {
      const fam = DIMENSION_FAMILIES[famId];
      const famColor = hex(FAMILY_HEX[famId]);
      L.ensure(18 + 3 * 16);
      L.space(8);
      drawFamilySymbol(L.page, famId, MARGIN + 4, L.y - 5.5, 3.2, famColor);
      L.kicker(L.page, fam.label, MARGIN + 14, L.y - 8, famColor, 7.5);
      L.text(L.page, fam.meaning, MARGIN + 14 + trackedWidth(fam.label.toUpperCase(), f.mono, 7.5, 7.5 * 0.18) + 8, L.y - 8, {
        font: f.bodyItalic,
        size: 8.5,
        color: C.inkFaint,
      });
      L.y -= 16;
      for (const dim of MAIN_DIMENSIONS.filter((d) => d.family === famId)) {
        const score = report.scores.mainDimensions[dim.id]?.score;
        if (typeof score !== 'number' || Number.isNaN(score)) continue;
        bar(dim.label, score, hex(DIM_HEX[dim.token] ?? FAMILY_HEX[famId]));
      }
    }

    L.heading('Archetypen', { font: f.display, size: 15, color: C.ink, leading: 1.2 }, { before: 16, after: 8 });
    const archetypeScore = (id: string) => report.scores.archetypeScores[id as keyof typeof report.scores.archetypeScores]?.score;
    const pScore = archetypeScore(report.archetypes.primary);
    const sScore = archetypeScore(report.archetypes.secondary);
    if (typeof pScore === 'number') bar(`${primary} · primair`, pScore, C.crimson, { labelFont: f.bodyBold });
    if (typeof sScore === 'number') bar(`${secondary} · tweede stem`, sScore, C.inkSoft);
    L.ensure(16);
    L.text(L.page, `${stress} · onder druk`, MARGIN, L.y - 10, { font: f.body, size: 10, color: C.ink });
    L.text(L.page, 'stress-archetype, zonder score', barX, L.y - 10, { font: f.bodyItalic, size: 8.5, color: C.inkFaint });
    L.y -= 16;

    // Spanningsvelden in twee kolommen: elk veld een kopje en twee gepaarde
    // balkjes (pool A in zegelrood, pool B in zachte inkt), zodat ook tien
    // actieve velden op deze pagina passen.
    const active = report.tensions.filter((t) => t.active);
    if (active.length) {
      L.heading('Spanningsvelden', { font: f.display, size: 15, color: C.ink, leading: 1.2 }, { before: 16, after: 8 });
      const colGap = 24;
      const colW2 = (COL_W - colGap) / 2;
      const labelW2 = 100;
      const bar2W = colW2 - 8 - labelW2 - 26;
      const blockH = 15 + 2 * 12 + 8;
      for (let i = 0; i < active.length; i += 2) {
        L.ensure(blockH);
        const rowTop = L.y;
        active.slice(i, i + 2).forEach((tension, ci) => {
          const def = TENSION_DEFINITIONS.find((d) => d.id === tension.id);
          if (!def) return;
          const x = MARGIN + ci * (colW2 + colGap);
          let y = rowTop;
          L.text(L.page, def.label, x, y - 10, { font: f.bodyBold, size: 9.5, color: C.ink });
          if (tension.intense) L.kicker(L.page, 'intens', x + f.bodyBold.widthOfTextAtSize(def.label, 9.5) + 6, y - 10, C.crimson, 6);
          y -= 15;
          const poles: Array<[string, number, RGB]> = [
            [def.a, tension.scoreA, C.crimson],
            [def.b, tension.scoreB, C.inkSoft],
          ];
          for (const [sub, value, color] of poles) {
            const label = SUB_DIMENSIONS.find((s) => s.id === sub)?.label ?? sub;
            const baseline = y - 8.5;
            L.text(L.page, label, x + 8, baseline, { font: f.body, size: 8.5, color: C.ink });
            const bx = x + 8 + labelW2;
            const by = baseline + 8.5 * 0.3 - 2.5;
            L.page.drawRectangle({ x: bx, y: by, width: bar2W, height: 5, color: C.track });
            const v = Math.max(0, Math.min(100, value));
            if (v > 0) L.page.drawRectangle({ x: bx, y: by, width: (bar2W * v) / 100, height: 5, color });
            L.text(L.page, String(Math.round(v)), bx + bar2W + 6, baseline, { font: f.mono, size: 8.5, color: C.inkSoft });
            y -= 12;
          }
        });
        L.y = rowTop - blockH;
      }
    }
  }

  /* ── 4. De zes delen ─────────────────────────────────────────────────── */
  const pageOf: Record<string, number> = {};
  let chapter = 0;
  groups.forEach(({ group, sections }, gi) => {
    L.newPage(group.title);
    pageOf[group.id] = L.pageNumber;
    const art = images[group.id];
    const artW = 190;
    const textW = art ? COL_W - artW - 24 : COL_W;
    const artTop = L.y;
    L.kicker(L.page, `Deel ${gi + 1} van ${groups.length}`, MARGIN, L.y - 8, C.crimson, 8);
    L.y -= 22;
    L.heading(group.title, { font: f.display, size: 30, color: C.ink, leading: 1.08 }, { after: 10, width: textW });
    L.page.drawRectangle({ x: MARGIN, y: L.y - 2, width: 38, height: 2, color: C.crimson });
    L.y -= 18;
    L.paragraph(group.lead, intro, { width: textW });
    if (art) {
      const artH = artW * art.ratio;
      L.page.drawImage(art.img, { x: PAGE_W - MARGIN - artW, y: artTop - artH, width: artW, height: artH });
      L.y = Math.min(L.y, artTop - artH - 6);
    }
    L.y -= 10;

    for (const section of sections) {
      chapter += 1;
      const kickerStyle = { font: f.mono, size: 8, color: C.crimson };
      // Kicker + kop + twee regels bij elkaar houden.
      const titleLines = wrap(section.title, f.display, 18, COL_W).length;
      const need = 14 + titleLines * 18 * 1.15 + 8 + 2 * body.size * body.leading;
      if (L.y - (L.atTop ? 0 : 26) - need < BOTTOM) L.newPage();
      else L.space(26);
      pageOf[section.id] = L.pageNumber;
      const num = String(chapter).padStart(2, '0');
      L.text(L.page, num, MARGIN, L.y - 8, kickerStyle, 1.2);
      L.hairline(L.page, MARGIN + 22, MARGIN + 150, L.y - 5.5, 0.28, 0.6);
      L.y -= 14;
      L.heading(section.title, { font: f.display, size: 18, color: C.ink, leading: 1.15 }, { after: 6, keep: 0 });
      if (section.intro) L.paragraph(section.intro, intro, { after: 6 });
      for (const p of section.paragraphs) L.paragraph(p, body, { after: 6 });
      if (section.bullets.length) {
        L.y -= 2;
        for (const b of section.bullets) {
          L.paragraph(b, body, {
            x: MARGIN + 16,
            after: 3,
            marker: (page, x, baseline) => page.drawCircle({ x: x - 9, y: baseline + body.size * 0.32, size: 2.1, color: C.crimson }),
          });
        }
        L.y -= 4;
      }
      const outro = section.outro ?? [];
      outro.slice(0, -1).forEach((o) => L.paragraph(o, body, { after: 6 }));
      const last = outro[outro.length - 1];
      if (last) {
        L.ensure(14 + 2 * quote.size * quote.leading);
        L.y -= 4;
        L.page.drawRectangle({ x: MARGIN + 16, y: L.y - 1, width: 26, height: 1.2, color: C.crimson });
        L.y -= 10;
        L.paragraph(last, quote, { x: MARGIN + 16, width: COL_W - 32, after: 4 });
      }
    }
  });

  /* ── 5. Colofon: privacy en disclaimer ───────────────────────────────── */
  L.newPage('Over dit rapport');
  {
    const small: TextStyle = { font: f.body, size: 9.5, color: C.inkSoft, leading: 1.5 };
    L.heading('Over dit rapport', { font: f.display, size: 18, color: C.ink, leading: 1.15 }, { after: 10 });
    L.paragraph(
      `Gemaakt op ${date} uit ${QUESTION_COUNT} antwoorden · versie ${report.meta.version} van de berekening · rapportcode ${code}. Dezelfde antwoorden geven altijd hetzelfde rapport.`,
      small,
      { after: 8 },
    );
    L.paragraph(applyVoice(PRIVACY_TEXT, report.meta.profile.addressForm), small, { after: 8 });
    L.paragraph(DISCLAIMER_TEXT, small, { after: 8 });
    L.paragraph('Arcana Profile · arcanaprofile.com · Inzicht · Patronen · Groei', { ...small, font: f.mono, size: 8 }, { after: 0 });
  }

  /* ── 2 (vervolg). Inhoud & profielsamenvatting ───────────────────────── */
  {
    const page = tocPage;
    let y = TOP;
    const title = { font: f.display, size: 28, color: C.ink };
    L.text(page, 'Inhoud &', MARGIN, y - 28, title);
    y -= 28 * 1.08;
    L.text(page, 'profielsamenvatting', MARGIN, y - 28, title);
    y -= 28 + 13;
    page.drawRectangle({ x: MARGIN, y, width: 38, height: 2, color: C.crimson });
    y -= 16;

    const leftW = 272;
    const emblemW = 140;
    const emblemX = PAGE_W - MARGIN - emblemW - 8;
    const emblemTop = y + 14;
    let emblemBottom = emblemTop;
    if (images.emblem) {
      page.drawCircle({ x: emblemX + 6, y: emblemTop - 58, size: 50, color: C.crimson, opacity: 0.9 });
      emblemBottom = emblemTop - drawEmblem(page, emblemX, emblemTop, emblemW);
    }

    if (name) {
      L.text(page, name, MARGIN, y - 20, { font: f.display, size: 20, color: C.ink });
      y -= 26;
    }
    L.text(page, primary, MARGIN, y - 13, { font: f.bodyBold, size: 13, color: C.ink });
    y -= 17;
    L.text(page, `Tweede stem: ${secondary} · onder druk: ${stress}`, MARGIN, y - 10, { font: f.body, size: 10, color: C.inkSoft });
    y -= 20;
    const summary = report.sections[0]?.intro ?? '';
    for (const line of wrap(summary, f.body, 10.5, leftW)) {
      L.text(page, line, MARGIN, y - 10.5, { font: f.body, size: 10.5, color: C.ink });
      y -= 10.5 * 1.55;
    }
    y = Math.min(y - 8, emblemBottom - 10);

    // Feitenregel: alleen echte cijfers.
    const sScore = report.scores.archetypeScores[report.archetypes.secondary]?.score;
    const facts: Array<[string, string]> = [
      [String(QUESTION_COUNT), 'antwoorden'],
      [String(MAIN_DIMENSIONS.length), 'dimensies'],
      [String(chapterCount), 'hoofdstukken'],
      typeof sScore === 'number' ? [`${Math.round(sScore)}/100`, 'tweede stem'] : [String(SECTION_GROUPS.length), 'delen'],
    ];
    y -= 8;
    L.hairline(page, MARGIN, PAGE_W - MARGIN, y, 0.28, 0.8);
    const cellW = COL_W / facts.length;
    facts.forEach(([value, label], i) => {
      const cx = MARGIN + i * cellW + cellW / 2;
      const vw = f.display.widthOfTextAtSize(value, 22);
      L.text(page, value, cx - vw / 2, y - 30, { font: f.display, size: 22, color: C.ink });
      L.kicker(page, label, cx, y - 44, C.inkFaint, 7, 'center');
      if (i > 0) page.drawLine({ start: { x: MARGIN + i * cellW, y: y - 10 }, end: { x: MARGIN + i * cellW, y: y - 50 }, thickness: 0.6, color: C.ink, opacity: 0.18 });
    });
    y -= 54;
    L.hairline(page, MARGIN, PAGE_W - MARGIN, y, 0.28, 0.8);
    y -= 26;

    L.text(page, 'Inhoudsopgave', MARGIN, y - 16, { font: f.display, size: 16, color: C.ink });
    y -= 26;
    const gap = 26;
    const colW = (COL_W - gap) / 2;
    const numW = 22;
    const pageW = 18;
    interface TocEntry {
      kind: 'part' | 'section';
      lines: string[];
      page: number;
      size: number;
      font: PDFFont;
      height: number;
    }
    const entry = (kind: TocEntry['kind'], label: string, pageNo: number): TocEntry => {
      const font = kind === 'part' ? f.display : f.body;
      const size = kind === 'part' ? 10.5 : 9.2;
      const lines = wrap(label, font, size, colW - numW - pageW - 8);
      return { kind, lines, page: pageNo, size, font, height: lines.length * size * 1.32 + (kind === 'part' ? 7 : 1) };
    };
    const entries: TocEntry[] = [entry('section', 'Scores in één oogopslag', scoresPageNumber)];
    groups.forEach(({ group, sections }, gi) => {
      entries.push(entry('part', `Deel ${gi + 1} · ${group.title}`, pageOf[group.id]));
      for (const s of sections) entries.push(entry('section', s.title, pageOf[s.id]));
    });
    // Twee kolommen van (bijna) gelijke hoogte; een deelkop blijft bij zijn eerste hoofdstuk.
    const totalH = entries.reduce((n, e) => n + e.height, 0);
    let split = entries.length;
    let acc = 0;
    for (let i = 0; i < entries.length; i += 1) {
      acc += entries[i].height;
      if (acc >= totalH / 2) {
        split = i + 1;
        break;
      }
    }
    if (entries[split - 1]?.kind === 'part') split -= 1;
    const columns = [entries.slice(0, split), entries.slice(split)];
    const top = y;
    let lowest = top;
    columns.forEach((col, ci) => {
      const x = MARGIN + ci * (colW + gap);
      let cy = top;
      for (const e of col) {
        const isPart = e.kind === 'part';
        if (isPart) cy -= 6;
        const num = String(e.page);
        L.text(page, num, x + numW - f.mono.widthOfTextAtSize(num, 8.5) - 6, cy - e.size, { font: f.mono, size: 8.5, color: isPart ? C.crimson : C.inkSoft });
        e.lines.forEach((line, li) => {
          L.text(page, line, x + numW, cy - e.size, { font: e.font, size: e.size, color: isPart ? C.ink : C.inkSoft });
          if (li === e.lines.length - 1) {
            const lw = e.font.widthOfTextAtSize(line, e.size);
            L.hairline(page, x + numW + lw + 6, x + colW, cy - e.size + e.size * 0.3, 0.14, 0.5);
          }
          cy -= e.size * 1.32;
        });
        cy -= 1;
      }
      lowest = Math.min(lowest, cy);
    });
    page.drawLine({ start: { x: MARGIN + colW + gap / 2, y: top }, end: { x: MARGIN + colW + gap / 2, y: Math.max(BOTTOM, lowest + 6) }, thickness: 0.6, color: C.ink, opacity: 0.14 });
  }

  /* ── Lopende kop en voet (tweede pas: het totaal is nu bekend) ───────── */
  const total = L.pages.length + 1;
  L.pages.forEach(({ page, partTitle }, i) => {
    const n = i + 2;
    const headY = PAGE_H - 46;
    drawSeal(page, MARGIN, headY + 12, 13, C.ink);
    L.text(page, 'Arcana Profile', MARGIN + 18, headY + 1, { font: f.display, size: 10, color: C.ink });
    L.kicker(page, partTitle, PAGE_W - MARGIN, headY + 2, C.inkFaint, 7, 'right');
    L.hairline(page, MARGIN, PAGE_W - MARGIN, headY - 8, 0.22, 0.6);

    const footY = 38;
    L.hairline(page, MARGIN, PAGE_W - MARGIN, footY + 12, 0.14, 0.5);
    L.kicker(page, 'Inzicht · Patronen · Groei', MARGIN, footY, C.inkFaint, 6.5);
    const dw = f.body.widthOfTextAtSize(date, 8);
    L.text(page, date, (PAGE_W - dw) / 2, footY, { font: f.body, size: 8, color: C.inkFaint });
    L.kicker(page, `Pagina ${n} van ${total}`, PAGE_W - MARGIN, footY, C.inkFaint, 6.5, 'right');
  });

  return doc.save({ useObjectStreams: options.useObjectStreams ?? true });
}
