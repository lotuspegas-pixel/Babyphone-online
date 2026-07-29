import { it } from 'vitest';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import { SECTION_PHRASINGS } from '../data/arcanaSectionPhrasings';
import { TRAIT_CONTENT } from '../data/arcanaTraitContent';
import { generateDummyAnswers } from '../lib/arcanaDummyAnswers';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import { allPhrasings } from '../lib/arcanaVariants';
import type { ArcanaProfile } from '../types/arcana';

/**
 * Meet hoeveel twee willekeurige rapporten op elkaar lijken. Draai met:
 *   npm run overlap
 *
 * Uitgesloten van `npm run test` (zie vite.config.ts): dit meet, het toetst niet.
 */
const PROFILE: ArcanaProfile = { name: 'X', addressForm: 'je', lifePhase: 'onbekend' };
const SAMPLE = 300;
const PAIRS_FROM = 70;

const VARIANT_FIELDS = ['behavior', 'hiddenNeed', 'effect', 'pitfall', 'growthKey'] as const;

it('meet de tekstoverlap tussen rapporten', () => {
  let traitStrings = 0;
  for (const id of SUB_DIMENSION_IDS) {
    for (const field of VARIANT_FIELDS) {
      traitStrings += allPhrasings(TRAIT_CONTENT[id][field]).length;
    }
  }
  const sectionStrings = Object.values(SECTION_PHRASINGS).reduce(
    (sum, p) => sum + allPhrasings(p).length,
    0,
  );

  const lineSets: Set<string>[] = [];
  const whole = new Set<string>();

  for (let seed = 1; seed <= SAMPLE; seed += 1) {
    const result = calculateArcanaResult(generateDummyAnswers('random', seed));
    const report = generateArcanaReport(result, PROFILE, '2026-01-01T00:00:00.000Z');
    const lines = report.sections
      .flatMap((s) => [s.intro, ...s.paragraphs, ...s.bullets])
      .filter((l) => l.trim().length > 40);
    lineSets.push(new Set(lines));
    whole.add(lines.join('\n'));
  }

  let sum = 0;
  let pairs = 0;
  for (let i = 0; i < PAIRS_FROM; i += 1) {
    for (let j = i + 1; j < PAIRS_FROM; j += 1) {
      const a = lineSets[i];
      const b = lineSets[j];
      let shared = 0;
      for (const line of a) if (b.has(line)) shared += 1;
      sum += shared / Math.max(a.size, b.size);
      pairs += 1;
    }
  }

  console.log('');
  console.log(`Steekproef:                    ${SAMPLE} willekeurige invullingen`);
  console.log(`Volledig unieke rapporten:     ${whole.size} van ${SAMPLE}`);
  console.log(`Formuleringen in trait-data:   ${traitStrings}`);
  console.log(`Formuleringen in sectie-data:  ${sectionStrings}`);
  console.log(`Gemiddelde tekstoverlap:       ${(100 * (sum / pairs)).toFixed(1)}%`);
  console.log('');
});
