import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { buildArcanaExportText } from '../lib/arcanaExport';
import { generateDummyAnswers, type DummyMode } from '../lib/arcanaDummyAnswers';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import type { ArcanaProfile } from '../types/arcana';

/**
 * DE GOUDEN MASTER — de belangrijkste regressietest van dit project.
 *
 * De site belooft letterlijk: "Dezelfde antwoorden geven hetzelfde rapport.
 * Doe je hem over een jaar opnieuw met dezelfde antwoorden, dan krijg je
 * hetzelfde resultaat terug." Deze test is het bewijs daarvan.
 *
 * Waarom dit nodig is. De variantkeuze werkt via `hash(seed) % lijstlengte`.
 * Eén zin toevoegen aan een variantenlijst herrolt de keuze voor vrijwel elke
 * bestaande antwoordset — stilletjes, zonder foutmelding, en de bestaande
 * tests merken het niet omdat die de vorm toetsen en niet de inhoud. Alleen
 * een byte-vergelijking met een vastgelegde uitvoer ziet dat gebeuren.
 *
 * Twaalf antwoordsets dekken: de vijf biasprofielen, vier willekeurige seeds,
 * beide aanspreekvormen, een leeg naamveld en straight-lining.
 *
 * Bijwerken na een BEWUSTE tekstwijziging:
 *   ARCANA_GOLDEN_UPDATE=1 npx vitest run src/test/goldenMaster.test.ts
 * Zet de gewijzigde snapshots in dezelfde commit als de tekstwijziging, zodat
 * de diff precies laat zien wat er voor de lezer veranderde.
 */

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'golden');
const UPDATE = process.env.ARCANA_GOLDEN_UPDATE === '1';

/** Vaste tijdstempel; anders verandert elke uitvoer bij elke run. */
const FROZEN = '2026-07-29T12:00:00.000Z';

const PROFILES = {
  je: { name: 'Noor', addressForm: 'je', lifePhase: 'van25tot40' },
  u: { name: 'Van Dijk', addressForm: 'u', lifePhase: 'van40tot55' },
  naamloos: { name: '', addressForm: 'je', lifePhase: 'onbekend' },
} satisfies Record<string, ArcanaProfile>;

type Fixture = { id: string; mode: DummyMode; seed: number; profile: ArcanaProfile };

const FIXTURES: Fixture[] = [
  { id: 'balanced-je', mode: 'balanced', seed: 1, profile: PROFILES.je },
  { id: 'random-20260729', mode: 'random', seed: 20260729, profile: PROFILES.je },
  { id: 'random-777', mode: 'random', seed: 777, profile: PROFILES.je },
  { id: 'random-31337', mode: 'random', seed: 31337, profile: PROFILES.u },
  { id: 'random-13', mode: 'random', seed: 13, profile: PROFILES.je },
  { id: 'sensitivity', mode: 'highSensitivity', seed: 42, profile: PROFILES.je },
  { id: 'control', mode: 'highControl', seed: 42, profile: PROFILES.je },
  { id: 'freedom', mode: 'highFreedom', seed: 42, profile: PROFILES.u },
  { id: 'recognition', mode: 'highRecognition', seed: 42, profile: PROFILES.je },
  { id: 'straightline', mode: 'straightLine', seed: 7, profile: PROFILES.je },
  { id: 'naamloos', mode: 'random', seed: 999, profile: PROFILES.naamloos },
  { id: 'aanspreekvorm-u', mode: 'balanced', seed: 1, profile: PROFILES.u },
];

function render(f: Fixture): string {
  const answers = generateDummyAnswers(f.mode, f.seed);
  const result = calculateArcanaResult(answers);
  const report = generateArcanaReport(result, f.profile, FROZEN);
  return buildArcanaExportText(report);
}

/** Geeft een bruikbare foutmelding in plaats van 40.000 tekens diff. */
function describeDifference(id: string, expected: string, actual: string): string {
  const a = expected.split('\n');
  const b = actual.split('\n');
  const i = a.findIndex((line, n) => line !== b[n]);
  return (
    `Het rapport van fixture '${id}' is veranderd.\n` +
    `Eerste afwijking op regel ${i + 1}:\n` +
    `  was: ${JSON.stringify(a[i]?.slice(0, 160) ?? '(regel bestaat niet meer)')}\n` +
    `  nu:  ${JSON.stringify(b[i]?.slice(0, 160) ?? '(regel is verdwenen)')}\n` +
    `Regels ${a.length} → ${b.length}, tekens ${expected.length} → ${actual.length}.\n` +
    `Was dit bedoeld? Werk de snapshots bij met:\n` +
    `  ARCANA_GOLDEN_UPDATE=1 npx vitest run src/test/goldenMaster.test.ts`
  );
}

describe('gouden master — determinisme van het rapport', () => {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

  for (const f of FIXTURES) {
    it(`${f.id} levert exact dezelfde tekst op`, () => {
      const actual = render(f);
      const path = join(DIR, `${f.id}.md`);

      if (UPDATE || !existsSync(path)) {
        writeFileSync(path, actual, 'utf8');
        return;
      }

      const expected = readFileSync(path, 'utf8');
      if (actual !== expected) throw new Error(describeDifference(f.id, expected, actual));
      expect(actual).toBe(expected);
    });
  }

  it('twee keer draaien binnen dezelfde run geeft hetzelfde resultaat', () => {
    for (const f of FIXTURES) {
      expect(render(f)).toBe(render(f));
    }
  });

  it('elke fixture levert een volwaardig rapport op', () => {
    for (const f of FIXTURES) {
      const report = generateArcanaReport(
        calculateArcanaResult(generateDummyAnswers(f.mode, f.seed)),
        f.profile,
        FROZEN,
      );
      expect(report.sections.length, `${f.id} heeft te weinig secties`).toBeGreaterThanOrEqual(30);
    }
  });

  it('legt hashes en omvang vast, zodat een wijziging opvalt in de diff', () => {
    const rows = FIXTURES.map((f) => {
      const md = render(f);
      const hash = createHash('sha256').update(md).digest('hex').slice(0, 16);
      const woorden = md.split(/\s+/).filter(Boolean).length;
      return `${f.id.padEnd(18)} ${hash}  ${String(md.length).padStart(6)} tekens  ${String(woorden).padStart(5)} woorden`;
    });
    const content = rows.join('\n') + '\n';
    const path = join(DIR, 'HASHES.txt');

    if (UPDATE || !existsSync(path)) {
      writeFileSync(path, content, 'utf8');
      return;
    }
    expect(content).toBe(readFileSync(path, 'utf8'));
  });
});
