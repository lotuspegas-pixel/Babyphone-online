import { describe, expect, it } from 'vitest';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { SUB_DIMENSION_IDS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import { ARCHETYPES } from '../data/arcanaArchetypes';
import {
  calculateArcanaResult,
  detectResponseQuality,
  detectStressArchetype,
  detectTensions,
  scoreBand,
} from '../lib/arcanaScoringEngine';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import type {
  ArcanaAnswerMap,
  ArcanaProfile,
  ArcanaQuestion,
  LikertQuestion,
  SubDimensionId,
  SubDimensionScore,
} from '../types/arcana';

const PROFILE: ArcanaProfile = { name: 'Robin', addressForm: 'je', lifePhase: 'van25tot40' };

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

function expectNoContamination(strings: string[]) {
  for (const str of strings) {
    expect(str).not.toMatch(/\bNaN\b/);
    expect(str).not.toMatch(/\bundefined\b/);
    expect(str).not.toMatch(/\bnull\b/);
    expect(str).not.toMatch(/\{naam\}/);
  }
}

/** Bouwt antwoorden waarin élk item zo ver mogelijk naar één kant wijst. */
function buildExtremeAnswers(direction: 'min' | 'max'): ArcanaAnswerMap {
  const answers: ArcanaAnswerMap = {};
  for (const q of ARCANA_QUESTIONS) {
    if (q.type === 'likert') {
      answers[q.id] = { type: 'likert', questionId: q.id, value: direction === 'max' ? 7 : 1 };
    } else if (q.type === 'forcedChoice' || q.type === 'scenario') {
      const option = direction === 'max' ? q.options[q.options.length - 1] : q.options[0];
      answers[q.id] = { type: q.type, questionId: q.id, optionKey: option.key };
    } else {
      const keys = q.items.map((i) => i.key);
      const order = direction === 'max' ? keys : [...keys].reverse();
      answers[q.id] = { type: 'ranking', questionId: q.id, order };
    }
  }
  return answers;
}

describe('extreme profielen: alles minimaal of alles maximaal', () => {
  it.each(['min', 'max'] as const)('genereert een schoon, geldig rapport bij een volledig %s-profiel', (direction) => {
    const answers = buildExtremeAnswers(direction);
    const result = calculateArcanaResult(answers);

    for (const id of SUB_DIMENSION_IDS) {
      const s = result.subDimensions[id];
      expect(Number.isFinite(s.score)).toBe(true);
      expect(s.score).toBeGreaterThanOrEqual(0);
      expect(s.score).toBeLessThanOrEqual(100);
      expect(Number.isFinite(s.confidence)).toBe(true);
    }

    const report = generateArcanaReport(result, PROFILE, '2026-01-01T00:00:00.000Z');
    expect(report.sections.length).toBeGreaterThan(0);
    for (const s of report.sections) {
      const hasContent = s.paragraphs.length > 0 || s.bullets.length >= 1;
      expect(hasContent).toBe(true);
    }
    expectNoContamination(collectStrings(report));
  });

  it('is deterministisch voor het volledig maximale profiel (twee keer dezelfde invoer, identiek rapport)', () => {
    const answers = buildExtremeAnswers('max');
    const resultA = calculateArcanaResult(answers);
    const resultB = calculateArcanaResult(answers);
    expect(resultA).toEqual(resultB);
    const reportA = generateArcanaReport(resultA, PROFILE, '2026-01-01T00:00:00.000Z');
    const reportB = generateArcanaReport(resultB, PROFILE, '2026-01-01T00:00:00.000Z');
    expect(reportA).toEqual(reportB);
  });

  it('een volledig minimaal profiel scoort structureel anders dan een volledig maximaal profiel', () => {
    const min = calculateArcanaResult(buildExtremeAnswers('min'));
    const max = calculateArcanaResult(buildExtremeAnswers('max'));
    // De twee profielen mogen niet toevallig op exact hetzelfde primaire archetype uitkomen
    // met exact dezelfde subdimensiescores: dat zou duiden op een verzadigde/geклemde schaal.
    const sameEverywhere = SUB_DIMENSION_IDS.every((id) => min.subDimensions[id].score === max.subDimensions[id].score);
    expect(sameEverywhere).toBe(false);
  });
});

describe('onvolledige invulling', () => {
  it('geeft lage confidence en een kanttekening bij slechts één beantwoorde vraag', () => {
    const q = ARCANA_QUESTIONS[0] as LikertQuestion;
    const answers: ArcanaAnswerMap = { [q.id]: { type: 'likert', questionId: q.id, value: 4 } };
    const result = calculateArcanaResult(answers);
    expect(result.responseQuality.confidenceLevel).toBe('low');
    // completionRate wordt afgerond op 2 decimalen (zie detectResponseQuality),
    // dus 1/120 (0.0083) rondt af naar 0.01.
    expect(result.responseQuality.completionRate).toBeCloseTo(0.01, 5);
    expect(result.responseQuality.notes.length).toBeGreaterThan(0);

    // Het rapport moet ondanks bijna volledige afwezigheid van data nog steeds compleet
    // en schoon gegenereerd worden — geen crash, geen NaN, geen lege secties.
    const report = generateArcanaReport(result, PROFILE, '2026-01-01T00:00:00.000Z');
    expect(report.sections.length).toBeGreaterThan(0);
    expectNoContamination(collectStrings(report));
  });

  it('negeert antwoorden op onbekende vraag-ids in plaats van te crashen', () => {
    const answers: ArcanaAnswerMap = {
      'niet-bestaand-id': { type: 'likert', questionId: 'niet-bestaand-id', value: 7 },
    };
    expect(() => calculateArcanaResult(answers)).not.toThrow();
    const result = calculateArcanaResult(answers);
    for (const id of SUB_DIMENSION_IDS) {
      expect(result.subDimensions[id].score).toBe(50);
      expect(result.subDimensions[id].confidence).toBe(0);
    }
  });

  it('negeert een optionKey die niet bij de vraag hoort in plaats van te crashen', () => {
    const forcedChoiceQuestion = ARCANA_QUESTIONS.find((q) => q.type === 'forcedChoice');
    expect(forcedChoiceQuestion).toBeDefined();
    const answers: ArcanaAnswerMap = {
      [forcedChoiceQuestion!.id]: {
        type: 'forcedChoice',
        questionId: forcedChoiceQuestion!.id,
        optionKey: 'deze-optie-bestaat-niet',
      },
    };
    expect(() => calculateArcanaResult(answers)).not.toThrow();
  });
});

describe('scoredrempels: grensgevallen', () => {
  it('scoreBand: 34 is laag, 35 is precies de grens naar gemiddeld', () => {
    expect(scoreBand(34)).toBe('laag');
    expect(scoreBand(35)).toBe('gemiddeld');
  });

  it('scoreBand: 64 is gemiddeld, 65 is precies de grens naar hoog', () => {
    expect(scoreBand(64)).toBe('gemiddeld');
    expect(scoreBand(65)).toBe('hoog');
  });

  it('scoreBand: 79 is hoog, 80 is precies de grens naar zeer hoog', () => {
    expect(scoreBand(79)).toBe('hoog');
    expect(scoreBand(80)).toBe('zeer hoog');
  });

  function neutralSubDimensions(): Record<SubDimensionId, SubDimensionScore> {
    const rec = {} as Record<SubDimensionId, SubDimensionScore>;
    for (const id of SUB_DIMENSION_IDS) rec[id] = { id, score: 50, confidence: 100, itemCount: 6 };
    return rec;
  }

  it('spanningsveld: precies 65/65 is nog niet actief, 66/66 wel', () => {
    const def = TENSION_DEFINITIONS[0];
    const sub65 = neutralSubDimensions();
    sub65[def.a as SubDimensionId] = { id: def.a as SubDimensionId, score: 65, confidence: 100, itemCount: 6 };
    sub65[def.b as SubDimensionId] = { id: def.b as SubDimensionId, score: 65, confidence: 100, itemCount: 6 };
    const tensions65 = detectTensions(sub65);
    expect(tensions65.find((t) => t.id === def.id)?.active).toBe(false);

    const sub66 = neutralSubDimensions();
    sub66[def.a as SubDimensionId] = { id: def.a as SubDimensionId, score: 66, confidence: 100, itemCount: 6 };
    sub66[def.b as SubDimensionId] = { id: def.b as SubDimensionId, score: 66, confidence: 100, itemCount: 6 };
    const tensions66 = detectTensions(sub66);
    expect(tensions66.find((t) => t.id === def.id)?.active).toBe(true);
  });

  it('spanningsveld: precies 75/75 is nog niet "zeer sterk", 76/76 wel', () => {
    const def = TENSION_DEFINITIONS[0];
    const sub75 = neutralSubDimensions();
    sub75[def.a as SubDimensionId] = { id: def.a as SubDimensionId, score: 75, confidence: 100, itemCount: 6 };
    sub75[def.b as SubDimensionId] = { id: def.b as SubDimensionId, score: 75, confidence: 100, itemCount: 6 };
    const tensions75 = detectTensions(sub75);
    const t75 = tensions75.find((t) => t.id === def.id);
    expect(t75?.active).toBe(true);
    expect(t75?.intense).toBe(false);

    const sub76 = neutralSubDimensions();
    sub76[def.a as SubDimensionId] = { id: def.a as SubDimensionId, score: 76, confidence: 100, itemCount: 6 };
    sub76[def.b as SubDimensionId] = { id: def.b as SubDimensionId, score: 76, confidence: 100, itemCount: 6 };
    const tensions76 = detectTensions(sub76);
    expect(tensions76.find((t) => t.id === def.id)?.intense).toBe(true);
  });

  it('confidenceLevel: exact 70% volledigheid geeft "medium", één vraag minder geeft "low"', () => {
    const fakeQuestions: ArcanaQuestion[] = Array.from({ length: 20 }, (_, i) => ({
      id: `q${i}`,
      type: 'likert' as const,
      text: '',
      targets: [] as SubDimensionId[],
    }));
    const sub = neutralSubDimensions();

    const answers70: ArcanaAnswerMap = {};
    for (let i = 0; i < 14; i += 1) {
      answers70[`a${i}`] = { type: 'likert', questionId: `a${i}`, value: 4 };
    }
    const quality70 = detectResponseQuality(answers70, sub, fakeQuestions);
    expect(quality70.completionRate).toBeCloseTo(0.7, 5);
    expect(quality70.confidenceLevel).toBe('medium');

    const answers65: ArcanaAnswerMap = {};
    for (let i = 0; i < 13; i += 1) {
      answers65[`a${i}`] = { type: 'likert', questionId: `a${i}`, value: 4 };
    }
    const quality65 = detectResponseQuality(answers65, sub, fakeQuestions);
    expect(quality65.completionRate).toBeLessThan(0.7);
    expect(quality65.confidenceLevel).toBe('low');
  });

  it('confidenceLevel: exact 95% volledigheid geeft "high", één vraag minder geeft "medium"', () => {
    const fakeQuestions: ArcanaQuestion[] = Array.from({ length: 20 }, (_, i) => ({
      id: `q${i}`,
      type: 'likert' as const,
      text: '',
      targets: [] as SubDimensionId[],
    }));
    const sub = neutralSubDimensions();

    const answers95: ArcanaAnswerMap = {};
    for (let i = 0; i < 19; i += 1) {
      answers95[`a${i}`] = { type: 'likert', questionId: `a${i}`, value: 4 };
    }
    const quality95 = detectResponseQuality(answers95, sub, fakeQuestions);
    expect(quality95.completionRate).toBeCloseTo(0.95, 5);
    expect(quality95.confidenceLevel).toBe('high');

    const answers90: ArcanaAnswerMap = {};
    for (let i = 0; i < 18; i += 1) {
      answers90[`a${i}`] = { type: 'likert', questionId: `a${i}`, value: 4 };
    }
    const quality90 = detectResponseQuality(answers90, sub, fakeQuestions);
    expect(quality90.completionRate).toBeLessThan(0.95);
    expect(quality90.confidenceLevel).toBe('medium');
  });
});

describe('deterministische tie-breaks', () => {
  it('bij volledig gelijke stress-subdimensies wint altijd hetzelfde stress-archetype (theController, eerste kandidaat)', () => {
    const rec = {} as Record<SubDimensionId, SubDimensionScore>;
    for (const id of SUB_DIMENSION_IDS) rec[id] = { id, score: 50, confidence: 100, itemCount: 6 };
    // Alle vier directe stress-subdimensies en de twee pleaser-subdimensies gelijk zetten.
    for (const id of ['stressControl', 'stressWithdrawal', 'stressAcceleration', 'stressFreeze', 'peoplePleasing', 'conflictAvoidance', 'shadowDefensiveness'] as SubDimensionId[]) {
      rec[id] = { id, score: 70, confidence: 100, itemCount: 6 };
    }
    const first = detectStressArchetype(rec);
    const second = detectStressArchetype(rec);
    expect(first).toBe('theController');
    expect(second).toBe(first);
  });

  it('bij een lege antwoordenset (alle subdimensies op 50) is het primaire archetype altijd hetzelfde, vast archetype', () => {
    const resultA = calculateArcanaResult({});
    const resultB = calculateArcanaResult({});
    expect(resultA.primaryArchetype).toBe(resultB.primaryArchetype);
    expect(resultA.primaryArchetype).toBe(ARCHETYPES[0].id);
  });
});
