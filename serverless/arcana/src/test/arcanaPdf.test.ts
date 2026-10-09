import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import { beforeAll, describe, expect, it } from 'vitest';
import { ARCHETYPES } from '../data/arcanaArchetypes';
import { SECTION_GROUPS } from '../data/arcanaSectionGroups';
import { generateDummyAnswers } from '../lib/arcanaDummyAnswers';
import { buildArcanaPdf, buildArcanaPdfFilename, PDF_FONT_FILES, type ArcanaPdfAssets, type PdfFaceName } from '../lib/arcanaPdf';
import { buildReportCode } from '../lib/arcanaReportCode';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import type { ArcanaProfile } from '../types/arcana';

const FONT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'fonts', 'pdf');

/** 2×2 RGBA-PNG (zegelrood, half transparant): genoeg om de beeldroute te testen. */
const PNG_2X2 = Uint8Array.from(
  atob('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFUlEQVR4nGOok5NuqJOT/s8AIkAcADM5Bds9Lgp/AAAAAElFTkSuQmCC'),
  (c) => c.charCodeAt(0),
);

const profile: ArcanaProfile = { name: 'Noor Çelik-Łukasz', addressForm: 'je', lifePhase: 'van25tot40' };
const report = generateArcanaReport(calculateArcanaResult(generateDummyAnswers('balanced', 1)), profile, '2026-10-06T12:00:00.000Z');

const fonts = Object.fromEntries(
  (Object.keys(PDF_FONT_FILES) as PdfFaceName[]).map((face) => [face, new Uint8Array(readFileSync(join(FONT_DIR, PDF_FONT_FILES[face])))]),
) as Record<PdfFaceName, Uint8Array>;

const withImages: ArcanaPdfAssets = {
  fonts,
  images: Object.fromEntries([['emblem', { png: PNG_2X2, width: 320, height: 340 }], ...SECTION_GROUPS.map((g) => [g.id, { png: PNG_2X2, width: 420, height: 380 }])]),
};

describe('arcanaPdf', () => {
  let bytes: Uint8Array;
  let again: Uint8Array;
  const drawn: string[] = [];

  beforeAll(async () => {
    bytes = await buildArcanaPdf(report, withImages, { trace: (t) => drawn.push(t) });
    again = await buildArcanaPdf(report, withImages);
  });

  it('is een geldige A4-PDF van minstens acht pagina’s met de juiste metadata', async () => {
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(8);
    const { width, height } = doc.getPage(0).getSize();
    expect(width).toBeCloseTo(595.28, 1);
    expect(height).toBeCloseTo(841.89, 1);
    expect(doc.getTitle()).toBe('Arcana Profile rapport — Noor Çelik-Łukasz');
    expect(doc.getAuthor()).toBe('Arcana Profile');
    expect(doc.getSubject()).toContain(buildReportCode(report));
    expect(doc.getCreationDate()?.toISOString()).toBe('2026-10-06T12:00:00.000Z');
  });

  it('is deterministisch: twee keer bouwen geeft identieke bytes', () => {
    expect(bytes.length).toBe(again.length);
    expect(Buffer.compare(Buffer.from(bytes), Buffer.from(again))).toBe(0);
  });

  it('tekent naam, archetype, elk hoofdstuk en de colofonteksten, en nooit "undefined"', () => {
    // Regels zijn apart getekend; met spaties aaneengeregen is een zin weer één geheel.
    const text = drawn.join(' ');
    expect(text).toContain('Noor Çelik-Łukasz');
    expect(text).toContain(ARCHETYPES.find((a) => a.id === report.archetypes.primary)!.name);
    for (const group of SECTION_GROUPS) {
      expect(text).toContain(group.title);
      for (const id of group.ids) {
        const section = report.sections.find((s) => s.id === id);
        if (section) expect(text).toContain(section.title.slice(0, 20));
      }
    }
    expect(text).toContain('browser opgeslagen');
    expect(text).toContain('geen medisch, psychologisch of therapeutisch');
    expect(text).toMatch(/PAGINA 2 VAN \d+/);
    expect(text).not.toMatch(/\b(undefined|NaN|null)\b/);
  });

  it('bouwt ook zonder afbeeldingen en zonder naam', async () => {
    const anoniem = generateArcanaReport(calculateArcanaResult(generateDummyAnswers('balanced', 1)), { name: '', addressForm: 'u', lifePhase: 'onbekend' }, '2026-01-05T00:00:00.000Z');
    const drawnAnon: string[] = [];
    const out = await buildArcanaPdf(anoniem, { fonts, images: {} }, { trace: (t) => drawnAnon.push(t) });
    const doc = await PDFDocument.load(out);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(8);
    expect(doc.getTitle()).toBe('Arcana Profile rapport');
    const text = drawnAnon.join(' ');
    expect(text).not.toMatch(/\b(undefined|NaN|null)\b/);
    expect(text).toContain('Uw antwoorden');
  });

  it('kiest een bestandsnaam uit naam of rapportcode en datum', () => {
    expect(buildArcanaPdfFilename(report)).toBe('Arcana-Profile-rapport-Noor-Celik-Lukasz-2026-10-06.pdf');
    const anoniem = { ...report, meta: { ...report.meta, profile: { ...profile, name: '  ' } } };
    expect(buildArcanaPdfFilename(anoniem)).toBe(`Arcana-Profile-rapport-${buildReportCode(report)}-2026-10-06.pdf`);
  });
});
