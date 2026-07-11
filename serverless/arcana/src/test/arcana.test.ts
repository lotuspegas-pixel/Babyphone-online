import { describe, expect, it } from 'vitest';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import { validateQuestionBank } from '../lib/arcanaValidation';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { generateDummyAnswers, type DummyMode } from '../lib/arcanaDummyAnswers';

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
});

describe('report generator', () => {
  for (const mode of DUMMY_MODES) {
    it(`generates a complete, clean report for mode "${mode}"`, () => {
      const answers = generateDummyAnswers(mode);
      const result = calculateArcanaResult(answers);
      const report = generateArcanaReport(result, '2026-01-01T00:00:00.000Z');

      expect(report.sections.length).toBe(15);
      for (const s of report.sections) {
        expect(s.title.trim().length).toBeGreaterThan(0);
        expect(s.intro.trim().length).toBeGreaterThan(0);
        if (s.id === 'final-sentence') continue; // deliberately a single closing line
        const hasContent = s.paragraphs.length > 0 || s.bullets.length >= 2;
        expect(hasContent).toBe(true);
      }

      const strings = collectStrings(report);
      for (const str of strings) {
        expect(str).not.toMatch(/\bNaN\b/);
        expect(str).not.toMatch(/\bundefined\b/);
        expect(str).not.toMatch(/\bnull\b/);
      }
    });
  }

  it('is deterministic: identical answers produce an identical report', () => {
    const answers = generateDummyAnswers('highSensitivity');
    const result = calculateArcanaResult(answers);
    const reportA = generateArcanaReport(result, '2026-01-01T00:00:00.000Z');
    const reportB = generateArcanaReport(result, '2026-01-01T00:00:00.000Z');
    expect(reportA).toEqual(reportB);
  });
});
