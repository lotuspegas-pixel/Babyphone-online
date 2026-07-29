import { describe, expect, it } from 'vitest';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import { REFLECTION_THEMES } from '../data/arcanaReflections';
import { SECTION_PHRASINGS } from '../data/arcanaSectionPhrasings';
import { TRAIT_CONTENT } from '../data/arcanaTraitContent';
import { generateDummyAnswers } from '../lib/arcanaDummyAnswers';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import { allPhrasings, deriveVariantSeed, pick } from '../lib/arcanaVariants';
import { applyVoice } from '../lib/arcanaVoice';
import type { ArcanaProfile } from '../types/arcana';

const PROFILE: ArcanaProfile = { name: 'Sam', addressForm: 'je', lifePhase: 'onbekend' };

/** Elk veld van TRAIT_CONTENT dat meerdere formuleringen mag hebben. */
const VARIANT_FIELDS = ['behavior', 'hiddenNeed', 'effect', 'pitfall', 'growthKey'] as const;

describe('variantselectie', () => {
  it('geeft dezelfde seed voor dezelfde antwoorden', () => {
    const a = generateDummyAnswers('balanced');
    const b = generateDummyAnswers('balanced');
    expect(deriveVariantSeed(a)).toBe(deriveVariantSeed(b));
  });

  it('geeft een andere seed voor andere antwoorden', () => {
    const a = deriveVariantSeed(generateDummyAnswers('highControl'));
    const b = deriveVariantSeed(generateDummyAnswers('highFreedom'));
    expect(a).not.toBe(b);
  });

  it('is ongevoelig voor de volgorde waarin antwoorden binnenkomen', () => {
    const answers = generateDummyAnswers('balanced');
    const reversed = Object.fromEntries(Object.entries(answers).reverse());
    expect(deriveVariantSeed(reversed)).toBe(deriveVariantSeed(answers));
  });

  it('kiest dezelfde variant bij dezelfde seed en sleuf', () => {
    const options = ['a', 'b', 'c'];
    expect(pick(options, 42, 'x.behavior')).toBe(pick(options, 42, 'x.behavior'));
  });

  it('spreidt over de beschikbare varianten', () => {
    const options = ['a', 'b', 'c'];
    const seen = new Set<string>();
    for (let seed = 0; seed < 200; seed += 1) {
      seen.add(pick(options, seed, 'x.behavior'));
    }
    expect(seen.size).toBe(3);
  });

  it('gebruikt niet voor elke sleuf dezelfde index', () => {
    const options = ['a', 'b', 'c'];
    const bySlot = VARIANT_FIELDS.map((field) => pick(options, 7, `autonomyNeed.${field}`));
    expect(new Set(bySlot).size).toBeGreaterThan(1);
  });

  it('accepteert nog steeds een enkele string', () => {
    expect(pick('alleen dit', 99, 'x.behavior')).toBe('alleen dit');
  });
});

describe('alle varianten zijn bruikbaar', () => {
  it('bevat geen lege of dubbele formuleringen', () => {
    for (const id of SUB_DIMENSION_IDS) {
      for (const field of VARIANT_FIELDS) {
        const options = allPhrasings(TRAIT_CONTENT[id][field]);
        expect(options.length, `${id}.${field}`).toBeGreaterThan(0);
        for (const option of options) {
          expect(option.trim().length, `${id}.${field}`).toBeGreaterThan(0);
        }
        expect(new Set(options).size, `${id}.${field} bevat duplicaten`).toBe(options.length);
      }
    }
  });

  it('is per veld consistent in stijl: kleine letter, geen eindpunt', () => {
    // De rapportgenerator monteert deze fragmenten midden in zinnen.
    for (const id of SUB_DIMENSION_IDS) {
      for (const field of VARIANT_FIELDS) {
        for (const option of allPhrasings(TRAIT_CONTENT[id][field])) {
          expect(option[0], `${id}.${field}: "${option}"`).toBe(option[0].toLowerCase());
          expect(option.endsWith('.'), `${id}.${field}: "${option}"`).toBe(false);
        }
      }
    }
  });

  it('overleeft de omzetting naar de u-vorm', () => {
    for (const id of SUB_DIMENSION_IDS) {
      for (const field of VARIANT_FIELDS) {
        for (const option of allPhrasings(TRAIT_CONTENT[id][field])) {
          const formal = applyVoice(option, 'u');
          expect(formal, `${id}.${field}`).not.toMatch(/\bje\b/i);
          expect(formal, `${id}.${field}`).not.toMatch(/\bjouw\b/i);
          expect(formal, `${id}.${field}`).not.toMatch(/\bjezelf\b/i);
        }
      }
    }
  });
});

describe('sectie- en beschouwingsvarianten', () => {
  it('bevat geen lege of dubbele sectieteksten', () => {
    for (const [key, phrasing] of Object.entries(SECTION_PHRASINGS)) {
      const options = allPhrasings(phrasing);
      expect(options.length, key).toBeGreaterThan(0);
      for (const option of options) {
        expect(option.trim().length, key).toBeGreaterThan(0);
      }
      expect(new Set(options).size, `${key} bevat duplicaten`).toBe(options.length);
    }
  });

  it('schrijft sectieteksten als volledige zinnen', () => {
    for (const [key, phrasing] of Object.entries(SECTION_PHRASINGS)) {
      for (const option of allPhrasings(phrasing)) {
        expect(option[0], `${key}: "${option.slice(0, 40)}"`).toBe(option[0].toUpperCase());
        expect(/[.!?"]$/.test(option.trim()), `${key} eindigt niet op een leesteken`).toBe(true);
      }
    }
  });

  it('zet alle sectie- en beschouwingsvarianten correct om naar de u-vorm', () => {
    const all: [string, string][] = [];
    for (const [key, phrasing] of Object.entries(SECTION_PHRASINGS)) {
      for (const option of allPhrasings(phrasing)) all.push([key, option]);
    }
    for (const theme of REFLECTION_THEMES) {
      theme.essence.forEach((paragraph, i) => {
        for (const option of allPhrasings(paragraph)) all.push([`${theme.id}.essence${i}`, option]);
      });
      for (const option of allPhrasings(theme.question)) all.push([`${theme.id}.question`, option]);
    }

    for (const [key, text] of all) {
      const formal = applyVoice(text, 'u');
      expect(formal, key).not.toMatch(/\bje\b/i);
      expect(formal, key).not.toMatch(/\bjouw\b/i);
      expect(formal, key).not.toMatch(/\bjezelf\b/i);
    }
  });

  it('houdt elke beschouwing bij dezelfde reflectievraag-vorm', () => {
    for (const theme of REFLECTION_THEMES) {
      for (const option of allPhrasings(theme.question)) {
        expect(option.trim().endsWith('?'), `${theme.id}: "${option}"`).toBe(true);
      }
    }
  });
});

describe('determinisme met varianten', () => {
  it('levert een identiek rapport bij identieke antwoorden', () => {
    const answers = generateDummyAnswers('random', 3);
    const a = generateArcanaReport(calculateArcanaResult(answers), PROFILE, '2026-01-01T00:00:00.000Z');
    const b = generateArcanaReport(calculateArcanaResult(answers), PROFILE, '2026-01-01T00:00:00.000Z');
    expect(a).toEqual(b);
  });

  it('levert verschillende formuleringen bij verschillende antwoorden', () => {
    const seeds = [1, 2, 3, 4, 5, 6, 7, 8];
    const bodies = seeds.map((seed) => {
      const result = calculateArcanaResult(generateDummyAnswers('random', seed));
      return generateArcanaReport(result, PROFILE, '2026-01-01T00:00:00.000Z')
        .sections.flatMap((s) => s.bullets)
        .join('\n');
    });
    expect(new Set(bodies).size).toBe(seeds.length);
  });
});
