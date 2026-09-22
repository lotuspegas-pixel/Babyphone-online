import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { QUESTION_COUNT } from '../data/arcanaQuestionCount';

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Bewaakt de bundelsplitsing op bronniveau. De landingspagina mag de vragenbank,
 * de rekenengine en de rapportteksten niet statisch importeren — anders zit
 * alles weer in één chunk en is de winst van 70 KB stilletjes weg. De echte
 * meting staat in scripts/meet-bundel.mjs; dit is de snelle poort die al bij
 * `npm test` afgaat.
 */
describe('bundelsplitsing', () => {
  it('QUESTION_COUNT is de werkelijke lengte van de vragenbank', () => {
    expect(ARCANA_QUESTIONS).toHaveLength(QUESTION_COUNT);
  });

  it('de app-root en de site-laag importeren de zware modules niet statisch', () => {
    const zwaar = /from\s+'[^']*(arcanaQuestions|arcanaScoringEngine|arcanaReportGenerator|arcanaTraitContent|arcanaArchetypeContent|arcanaReflections)'/;
    const bestanden = [
      'App.tsx',
      'site/LandingPage.tsx',
      'site/SiteHeader.tsx',
      'site/SiteFooter.tsx',
      'site/LegalPages.tsx',
      'site/siteContent.ts',
    ];
    for (const rel of bestanden) {
      const src = readFileSync(join(SRC, rel), 'utf8');
      // Dynamische imports (import('…')) zijn juist de bedoeling; alleen
      // statische `from '…'`-imports tellen.
      expect(zwaar.test(src), `${rel} importeert een zware module statisch`).toBe(false);
    }
  });
});
