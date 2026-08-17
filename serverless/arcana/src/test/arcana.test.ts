import { describe, expect, it } from 'vitest';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import { validateQuestionBank } from '../lib/arcanaValidation';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { generateDummyAnswers, type DummyMode } from '../lib/arcanaDummyAnswers';
import type { ArcanaAnswerMap, ArcanaProfile } from '../types/arcana';

const DUMMY_MODES: DummyMode[] = [
  'balanced',
  'highSensitivity',
  'highControl',
  'highFreedom',
  'highRecognition',
  'random',
  'straightLine',
];

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const v of value) collectStrings(v, out);
  } else if (value && typeof value === 'object') {
    for (const v of Object.values(value)) collectStrings(v, out);
  }
  return out;
}

describe('question bank', () => {
  it('has exactly 120 questions in the required distribution', () => {
    const result = validateQuestionBank(ARCANA_QUESTIONS);
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
    expect(ARCANA_QUESTIONS).toHaveLength(120);
  });

  it('has unique ids', () => {
    const ids = new Set(ARCANA_QUESTIONS.map((q) => q.id));
    expect(ids.size).toBe(120);
  });
});

describe('scoring engine', () => {
  it('is deterministic for identical answers', () => {
    const answers = generateDummyAnswers('balanced');
    const resultA = calculateArcanaResult(answers);
    const resultB = calculateArcanaResult(answers);
    expect(resultA).toEqual(resultB);
  });

  it('produces a 0-100 score with no NaN for every subdimension across all dummy modes', () => {
    for (const mode of DUMMY_MODES) {
      const answers = generateDummyAnswers(mode);
      const result = calculateArcanaResult(answers);
      for (const id of SUB_DIMENSION_IDS) {
        const s = result.subDimensions[id];
        expect(Number.isFinite(s.score)).toBe(true);
        expect(s.score).toBeGreaterThanOrEqual(0);
        expect(s.score).toBeLessThanOrEqual(100);
        expect(Number.isFinite(s.confidence)).toBe(true);
      }
    }
  });

  it('returns 50/0-confidence when no answers are given', () => {
    const result = calculateArcanaResult({});
    for (const id of SUB_DIMENSION_IDS) {
      expect(result.subDimensions[id].score).toBe(50);
      expect(result.subDimensions[id].confidence).toBe(0);
    }
  });

  it('biases highControl mode toward controlNeed and highFreedom toward autonomyNeed', () => {
    const control = calculateArcanaResult(generateDummyAnswers('highControl'));
    const freedom = calculateArcanaResult(generateDummyAnswers('highFreedom'));
    expect(control.subDimensions.controlNeed.score).toBeGreaterThan(freedom.subDimensions.controlNeed.score);
    expect(freedom.subDimensions.autonomyNeed.score).toBeGreaterThan(control.subDimensions.autonomyNeed.score);
  });

  it('flags straight-lining risk for the straightLine dummy mode', () => {
    const result = calculateArcanaResult(generateDummyAnswers('straightLine'));
    expect(result.responseQuality.straightLiningRisk).toBe(true);
  });

  it('theFlame and thePerformer can diverge (no longer a mathematically identical formula)', () => {
    // Regression test voor het gevonden defect: theFlame en thePerformer deelden exact dezelfde
    // vier subdimensies (alleen in andere volgorde), waardoor average() ze altijd identiek
    // scoorde en thePerformer nooit primary archetype kon worden (0/360 in archetypeMetrics.test.ts).
    // thePerformer gebruikt nu creativeThinking i.p.v. directness, zodat "expressie/impact"
    // (Performer) kan afwijken van "beweging/lef" (Flame, docs/arcana/01-testmodel.md).
    const answers: ArcanaAnswerMap = {};
    for (const q of ARCANA_QUESTIONS) {
      if (q.type === 'likert') {
        if (q.targets.includes('creativeThinking')) {
          answers[q.id] = { type: 'likert', questionId: q.id, value: 7 };
        } else if (q.targets.includes('directness')) {
          answers[q.id] = { type: 'likert', questionId: q.id, value: 1 };
        } else {
          answers[q.id] = { type: 'likert', questionId: q.id, value: 4 };
        }
      } else if (q.type === 'forcedChoice' || q.type === 'scenario') {
        const creativeOpt = q.options.find((o) => o.targets.includes('creativeThinking'));
        const directOpt = q.options.find((o) => o.targets.includes('directness'));
        const pick = creativeOpt ?? q.options.find((o) => o !== directOpt) ?? q.options[0];
        answers[q.id] = { type: q.type, questionId: q.id, optionKey: pick.key };
      } else {
        const ordered = [...q.items]
          .sort((a, b) => {
            const score = (t: typeof a) =>
              (t.targets.includes('creativeThinking') ? 1 : 0) - (t.targets.includes('directness') ? 1 : 0);
            return score(b) - score(a);
          })
          .map((i) => i.key);
        answers[q.id] = { type: 'ranking', questionId: q.id, order: ordered };
      }
    }
    const result = calculateArcanaResult(answers);
    expect(result.archetypeScores.theFlame.score).not.toBe(result.archetypeScores.thePerformer.score);
    expect(result.archetypeScores.thePerformer.score).toBeGreaterThan(result.archetypeScores.theFlame.score);
  });

  it('flags socialDesirabilityRisk for a maximally "sociaal wenselijk" answer set', () => {
    // Regression test voor het gevonden defect: shadowDefensiveness heeft geen enkel
    // Likert-item, dus de forcedChoice/scenario/ranking-bijdrage kan nooit onder de
    // structurele bodem van 55 komen. Een drempel van <20 was daardoor onbereikbaar en
    // liet deze detector nooit triggeren (zie src/dev/responseQualityContam.test.ts).
    const answers: ArcanaAnswerMap = {};
    for (const q of ARCANA_QUESTIONS) {
      if (q.type === 'likert') {
        const wantsGrowth = q.targets.includes('growthReadiness');
        const wantsLowShadow = q.targets.some(
          (t) => t === 'shadowAvoidance' || t === 'shadowDefensiveness' || t === 'perfectionism',
        );
        if (wantsGrowth) answers[q.id] = { type: 'likert', questionId: q.id, value: 7 };
        else if (wantsLowShadow) answers[q.id] = { type: 'likert', questionId: q.id, value: 1 };
        else answers[q.id] = { type: 'likert', questionId: q.id, value: 5 };
      } else if (q.type === 'forcedChoice' || q.type === 'scenario') {
        const isShadowTarget = (t: (typeof q.options)[number]['targets'][number]) =>
          t === 'shadowAvoidance' || t === 'shadowDefensiveness' || t === 'perfectionism';
        const growthOpt = q.options.find((o) => o.targets.includes('growthReadiness'));
        const nonShadowOpt = q.options.find((o) => !o.targets.some(isShadowTarget));
        const pick = growthOpt ?? nonShadowOpt ?? q.options[0];
        answers[q.id] = { type: q.type, questionId: q.id, optionKey: pick.key };
      } else {
        const isShadowTarget = (t: (typeof q.items)[number]['targets'][number]) =>
          t === 'shadowAvoidance' || t === 'shadowDefensiveness' || t === 'perfectionism';
        const ordered = [...q.items]
          .sort((a, b) => {
            const aGrowth = a.targets.includes('growthReadiness') ? 1 : 0;
            const bGrowth = b.targets.includes('growthReadiness') ? 1 : 0;
            const aShadow = a.targets.some(isShadowTarget) ? 1 : 0;
            const bShadow = b.targets.some(isShadowTarget) ? 1 : 0;
            return bGrowth - aGrowth || aShadow - bShadow;
          })
          .map((i) => i.key);
        answers[q.id] = { type: 'ranking', questionId: q.id, order: ordered };
      }
    }
    const result = calculateArcanaResult(answers);
    expect(result.responseQuality.socialDesirabilityRisk).toBe(true);
  });
});

const TEST_PROFILE: ArcanaProfile = { name: 'Sam', addressForm: 'je', lifePhase: 'van25tot40' };

/** Elke sectie die het rapport volgens de productspecificatie moet bevatten. */
const REQUIRED_SECTION_IDS = [
  'hero',
  'who-you-are',
  'core-pattern',
  'seen-by-others',
  'hidden-inner-world',
  'alone',
  'with-others',
  'work-style',
  'close-circle',
  'stress',
  'at-ease',
  'strengths',
  'shadow',
  'jungian',
  'relationship',
  'communication',
  'tensions',
  'blind-spots',
  'who-you-can-become',
  'what-you-need',
  'growth-path',
  'understood-by-others',
  'understand-yourself',
  'reflectie-liefde',
  'reflectie-haat',
  'reflectie-pijn',
  'reflectie-intuitie',
  'reflectie-verdriet',
  'reflectie-tegenslagen',
  'reflectie-geluk',
  'reflectie-blijdschap',
  'thirty-day-plan',
  'final-sentence',
];

describe('report generator', () => {
  for (const mode of DUMMY_MODES) {
    it(`generates a complete, clean report for mode "${mode}"`, () => {
      const answers = generateDummyAnswers(mode);
      const result = calculateArcanaResult(answers);
      const report = generateArcanaReport(result, TEST_PROFILE, '2026-01-01T00:00:00.000Z');

      const ids = report.sections.map((s) => s.id);
      for (const required of REQUIRED_SECTION_IDS) {
        expect(ids).toContain(required);
      }

      for (const s of report.sections) {
        expect(s.title.trim().length).toBeGreaterThan(0);
        expect(s.intro.trim().length).toBeGreaterThan(0);
        const hasContent = s.paragraphs.length > 0 || s.bullets.length >= 1;
        expect(hasContent).toBe(true);
      }

      const strings = collectStrings(report);
      for (const str of strings) {
        expect(str).not.toMatch(/\bNaN\b/);
        expect(str).not.toMatch(/\bundefined\b/);
        expect(str).not.toMatch(/\bnull\b/);
        expect(str).not.toMatch(/\{naam\}/);
      }
    });
  }

  it('is deterministic: identical answers produce an identical report', () => {
    const answers = generateDummyAnswers('highSensitivity');
    const result = calculateArcanaResult(answers);
    const reportA = generateArcanaReport(result, TEST_PROFILE, '2026-01-01T00:00:00.000Z');
    const reportB = generateArcanaReport(result, TEST_PROFILE, '2026-01-01T00:00:00.000Z');
    expect(reportA).toEqual(reportB);
  });

  it('spreekt de deelnemer op naam aan', () => {
    const result = calculateArcanaResult(generateDummyAnswers('balanced'));
    const report = generateArcanaReport(result, TEST_PROFILE, '2026-01-01T00:00:00.000Z');
    const hero = report.sections.find((s) => s.id === 'hero');
    expect(hero?.intro).toContain('Sam');
  });

  it('werkt ook zonder naam, zonder lege aanhef achter te laten', () => {
    const anon: ArcanaProfile = { name: '', addressForm: 'je', lifePhase: 'onbekend' };
    const result = calculateArcanaResult(generateDummyAnswers('balanced'));
    const report = generateArcanaReport(result, anon, '2026-01-01T00:00:00.000Z');
    for (const str of collectStrings(report)) {
      expect(str).not.toMatch(/^\s*,/);
      expect(str).not.toMatch(/\{naam\}/);
    }
  });

  it('zet het volledige rapport om naar de u-vorm', () => {
    const formal: ArcanaProfile = { name: 'Sam', addressForm: 'u', lifePhase: 'onbekend' };
    const result = calculateArcanaResult(generateDummyAnswers('balanced'));
    const report = generateArcanaReport(result, formal, '2026-01-01T00:00:00.000Z');
    for (const s of report.sections) {
      const text = [s.title, s.intro, ...s.paragraphs, ...s.bullets].join(' ');
      expect(text).not.toMatch(/\bje\b/i);
      expect(text).not.toMatch(/\bjij\b/i);
      expect(text).not.toMatch(/\bjouw\b/i);
      expect(text).not.toMatch(/\bjezelf\b/i);
    }
  });

  it('kiest reflectieduidingen die bij de scores passen', () => {
    const control = calculateArcanaResult(generateDummyAnswers('highControl'));
    const freedom = calculateArcanaResult(generateDummyAnswers('highFreedom'));
    const controlReport = generateArcanaReport(control, TEST_PROFILE, '2026-01-01T00:00:00.000Z');
    const freedomReport = generateArcanaReport(freedom, TEST_PROFILE, '2026-01-01T00:00:00.000Z');

    const controlLuck = controlReport.sections.find((s) => s.id === 'reflectie-geluk')?.bullets.join(' ');
    const freedomLuck = freedomReport.sections.find((s) => s.id === 'reflectie-geluk')?.bullets.join(' ');
    expect(controlLuck).not.toEqual(freedomLuck);
  });

  it('bewaart het profiel in de rapport-metadata', () => {
    const result = calculateArcanaResult(generateDummyAnswers('balanced'));
    const report = generateArcanaReport(result, TEST_PROFILE, '2026-01-01T00:00:00.000Z');
    expect(report.meta.profile).toEqual(TEST_PROFILE);
  });
});
