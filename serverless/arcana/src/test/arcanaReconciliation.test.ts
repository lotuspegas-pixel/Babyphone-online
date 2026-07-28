import { describe, expect, it } from 'vitest';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import {
  calculateArchetypeScores,
  calculateMainDimensions,
  detectStressArchetype,
  detectTensions,
} from '../lib/arcanaScoringEngine';
import { generateAloneSection, generateWithOthersSection } from '../lib/arcanaReportGenerator';
import type {
  ArcanaScoreResult,
  ArchetypeId,
  SubDimensionId,
  SubDimensionScore,
} from '../types/arcana';

/** Bouwt een volledig scoreresultaat waarin alleen de opgegeven dimensies afwijken. */
function makeResult(
  overrides: Partial<Record<SubDimensionId, number>>,
  primary: ArchetypeId,
): ArcanaScoreResult {
  const subDimensions = {} as Record<SubDimensionId, SubDimensionScore>;
  for (const id of SUB_DIMENSION_IDS) {
    const score = overrides[id] ?? 50;
    subDimensions[id] = { id, score, confidence: 100, itemCount: 6 };
  }

  const archetypeScores = calculateArchetypeScores(subDimensions);
  return {
    subDimensions,
    mainDimensions: calculateMainDimensions(subDimensions),
    archetypeScores,
    primaryArchetype: primary,
    secondaryArchetype: primary === 'theHermit' ? 'theFlame' : 'theHermit',
    stressArchetype: detectStressArchetype(subDimensions),
    tensions: detectTensions(subDimensions),
    responseQuality: {
      completionRate: 1,
      straightLiningRisk: false,
      contradictionRisk: false,
      socialDesirabilityRisk: false,
      confidenceLevel: 'high',
      notes: [],
    },
  };
}

describe('tegenspraak tussen archetypeportret en eigen score', () => {
  it('benoemt het verschil wanneer The Flame een hoge behoefte aan stilte heeft', () => {
    const result = makeResult({ solitudeNeed: 83, socialEnergy: 40 }, 'theFlame');
    const section = generateAloneSection(result);
    const text = section.paragraphs.join(' ');

    expect(text).toContain('83/100');
    expect(text).toMatch(/afwijking/i);
    expect(text).toMatch(/je score leidend/i);
  });

  it('benoemt het verschil wanneer The Hermit juist veel sociale energie heeft', () => {
    const result = makeResult({ socialEnergy: 80, solitudeNeed: 30 }, 'theHermit');
    const section = generateWithOthersSection(result);
    const text = section.paragraphs.join(' ');

    expect(text).toMatch(/afwijking/i);
    expect(text).toContain('80/100');
  });

  it('voegt geen nuancering toe wanneer portret en score met elkaar kloppen', () => {
    const result = makeResult({ solitudeNeed: 78, socialEnergy: 30 }, 'theHermit');
    const section = generateAloneSection(result);
    const text = section.paragraphs.join(' ');

    expect(text).not.toMatch(/afwijking/i);
  });

  it('blijft stil bij een gemiddelde score, ook als het archetype iets anders doet verwachten', () => {
    const result = makeResult({ solitudeNeed: 52, socialEnergy: 55 }, 'theFlame');
    const section = generateAloneSection(result);
    const text = section.paragraphs.join(' ');

    expect(text).not.toMatch(/afwijking/i);
  });
});
