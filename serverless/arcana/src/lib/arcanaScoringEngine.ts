import { ARCHETYPES, ARCHETYPE_INVERTED_TARGETS, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import { SUB_DIMENSION_IDS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { deriveVariantSeed } from './arcanaVariants';
import type {
  ArcanaAnswer,
  ArcanaAnswerMap,
  ArcanaQuestion,
  ArcanaScoreResult,
  ArcanaTension,
  ArchetypeId,
  ArchetypeScore,
  ConfidenceLevel,
  ForcedChoiceQuestion,
  LikertQuestion,
  MainDimensionId,
  MainDimensionScore,
  RankingQuestion,
  ResponseQuality,
  ScenarioQuestion,
  StressArchetypeId,
  SubDimensionId,
  SubDimensionScore,
} from '../types/arcana';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function average(values: number[]): number {
  if (values.length === 0) return 50;
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}

/** Position-based weighting used everywhere a question lists ordered targets. */
function weightForIndex(index: number): number {
  if (index === 0) return 1.0;
  if (index === 1) return 0.7;
  if (index === 2) return 0.4;
  return 0.2;
}

const LIKERT_VALUE_MAP: Record<number, number> = {
  1: -3,
  2: -2,
  3: -1,
  4: 0,
  5: 1,
  6: 2,
  7: 3,
};

const RANKING_POINTS = [3, 2.25, 1.5, 0.75];
function rankingPointsForPosition(position: number): number {
  return position < RANKING_POINTS.length ? RANKING_POINTS[position] : 0.3;
}

interface Accumulator {
  raw: Record<string, number>;
  max: Record<string, number>;
  count: Record<string, number>;
}

function newAccumulator(): Accumulator {
  const raw: Record<string, number> = {};
  const max: Record<string, number> = {};
  const count: Record<string, number> = {};
  for (const id of SUB_DIMENSION_IDS) {
    raw[id] = 0;
    max[id] = 0;
    count[id] = 0;
  }
  return { raw, max, count };
}

function addContribution(acc: Accumulator, target: SubDimensionId, points: number, weight: number) {
  acc.raw[target] += points * weight;
  acc.max[target] += 3 * Math.abs(weight);
  acc.count[target] += 1;
}

function questionsById(questions: ArcanaQuestion[]): Map<string, ArcanaQuestion> {
  return new Map(questions.map((q) => [q.id, q]));
}

export function calculateSubDimensions(
  answers: ArcanaAnswerMap,
  questions: ArcanaQuestion[] = ARCANA_QUESTIONS,
): Record<SubDimensionId, SubDimensionScore> {
  const acc = newAccumulator();
  const byId = questionsById(questions);

  for (const answer of Object.values(answers)) {
    const question = byId.get(answer.questionId);
    if (!question) continue;
    applyAnswer(acc, question, answer);
  }

  const result = {} as Record<SubDimensionId, SubDimensionScore>;
  for (const id of SUB_DIMENSION_IDS) {
    const raw = acc.raw[id];
    const max = acc.max[id];
    const itemCount = acc.count[id];
    let score: number;
    let confidence: number;
    if (max === 0) {
      score = 50;
      confidence = 0;
    } else {
      score = Math.round(clamp(50 + (raw / max) * 50, 0, 100));
      confidence = Math.min(100, Math.round((itemCount / 6) * 100));
    }
    result[id] = { id, score, confidence, itemCount };
  }
  return result;
}

function applyAnswer(acc: Accumulator, question: ArcanaQuestion, answer: ArcanaAnswer) {
  if (question.type === 'likert' && answer.type === 'likert') {
    applyLikert(acc, question, answer.value);
  } else if (question.type === 'forcedChoice' && answer.type === 'forcedChoice') {
    applyChoice(acc, question, answer.optionKey);
  } else if (question.type === 'scenario' && answer.type === 'scenario') {
    applyChoice(acc, question, answer.optionKey);
  } else if (question.type === 'ranking' && answer.type === 'ranking') {
    applyRanking(acc, question, answer.order);
  }
}

function applyLikert(acc: Accumulator, question: LikertQuestion, value: number) {
  const likertValue = LIKERT_VALUE_MAP[value];
  if (likertValue === undefined) return;
  question.targets.forEach((target, index) => {
    addContribution(acc, target, likertValue, weightForIndex(index));
  });
}

function applyChoice(acc: Accumulator, question: ForcedChoiceQuestion | ScenarioQuestion, optionKey: string) {
  const option = question.options.find((o) => o.key === optionKey);
  if (!option) return;
  option.targets.forEach((target, index) => {
    addContribution(acc, target, 3, weightForIndex(index));
  });
}

function applyRanking(acc: Accumulator, question: RankingQuestion, order: string[]) {
  order.forEach((itemKey, position) => {
    const item = question.items.find((i) => i.key === itemKey);
    if (!item) return;
    const points = rankingPointsForPosition(position);
    item.targets.forEach((target, index) => {
      addContribution(acc, target, points, weightForIndex(index));
    });
  });
}

function score(sub: Record<SubDimensionId, SubDimensionScore>, id: SubDimensionId): number {
  return sub[id].score;
}

function inv(sub: Record<SubDimensionId, SubDimensionScore>, id: SubDimensionId): number {
  return 100 - sub[id].score;
}

export function calculateMainDimensions(
  sub: Record<SubDimensionId, SubDimensionScore>,
): Record<MainDimensionId, MainDimensionScore> {
  const s = (id: SubDimensionId) => score(sub, id);
  const i = (id: SubDimensionId) => inv(sub, id);

  const values: Record<MainDimensionId, number> = {
    innerMotor: average([s('autonomyNeed'), s('securityNeed'), s('recognitionNeed'), s('meaningNeed'), s('connectionNeed')]),
    socialPattern: average([s('socialEnergy'), s('connectionNeed'), i('solitudeNeed')]),
    thinkingStyle: average([s('analyticalThinking'), s('intuitiveThinking'), s('creativeThinking'), s('practicalThinking')]),
    emotionalSensitivityMain: average([s('emotionalSensitivity'), s('criticismSensitivity'), s('intimacyNeed')]),
    controlAndSecurity: average([s('controlNeed'), s('securityNeed'), s('perfectionism')]),
    conflictStyle: average([s('directness'), i('conflictAvoidance'), i('peoplePleasing')]),
    selfImage: average([s('selfConfidence'), s('recognitionNeed'), i('selfDoubt')]),
    shadowPattern: average([s('shadowDefensiveness'), s('shadowAvoidance'), s('perfectionism'), i('growthReadiness')]),
    relationshipPattern: average([s('connectionNeed'), s('trustNeed'), s('intimacyNeed'), i('conflictAvoidance')]),
    workStyle: average([s('practicalThinking'), s('analyticalThinking'), s('creativeThinking'), s('controlNeed'), s('meaningNeed')]),
    stressPattern: average([s('stressWithdrawal'), s('stressControl'), s('stressAcceleration'), s('stressFreeze')]),
    growthPath: average([s('growthReadiness'), s('meaningNeed'), s('selfConfidence'), i('shadowAvoidance')]),
  };

  const result = {} as Record<MainDimensionId, MainDimensionScore>;
  for (const id of Object.keys(values) as MainDimensionId[]) {
    result[id] = { id, score: Math.round(clamp(values[id], 0, 100)) };
  }
  return result;
}

export function calculateArchetypeScores(
  sub: Record<SubDimensionId, SubDimensionScore>,
): Record<ArchetypeId, ArchetypeScore> {
  const result = {} as Record<ArchetypeId, ArchetypeScore>;
  for (const archetype of ARCHETYPES) {
    const inverted = new Set(ARCHETYPE_INVERTED_TARGETS[archetype.id] ?? []);
    const values = archetype.formula.map((id) => (inverted.has(id) ? inv(sub, id) : score(sub, id)));
    result[archetype.id] = { id: archetype.id, score: Math.round(clamp(average(values), 0, 100)) };
  }
  return result;
}

export function detectPrimaryArchetype(scores: Record<ArchetypeId, ArchetypeScore>): ArchetypeId {
  return sortedArchetypeIds(scores)[0];
}

export function detectSecondaryArchetype(scores: Record<ArchetypeId, ArchetypeScore>): ArchetypeId {
  return sortedArchetypeIds(scores)[1];
}

function sortedArchetypeIds(scores: Record<ArchetypeId, ArchetypeScore>): ArchetypeId[] {
  return (Object.values(scores) as ArchetypeScore[])
    .slice()
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return ARCHETYPES.findIndex((x) => x.id === a.id) - ARCHETYPES.findIndex((x) => x.id === b.id);
    })
    .map((a) => a.id);
}

export function detectStressArchetype(sub: Record<SubDimensionId, SubDimensionScore>): StressArchetypeId {
  const s = (id: SubDimensionId) => score(sub, id);
  const candidates: [StressArchetypeId, number][] = [
    ['theController', s('stressControl')],
    ['theVanisher', s('stressWithdrawal')],
    ['theSprinter', s('stressAcceleration')],
    ['theFrozenOne', s('stressFreeze')],
    ['thePleaser', average([s('peoplePleasing'), s('conflictAvoidance')])],
    ['theDefender', s('shadowDefensiveness')],
  ];
  let best = candidates[0];
  for (const candidate of candidates.slice(1)) {
    if (candidate[1] > best[1]) best = candidate;
  }
  return best[0];
}

export function detectTensions(sub: Record<SubDimensionId, SubDimensionScore>): ArcanaTension[] {
  return TENSION_DEFINITIONS.map((def) => {
    const scoreA = score(sub, def.a);
    const scoreB = score(sub, def.b);
    return {
      id: def.id,
      scoreA,
      scoreB,
      active: scoreA > 65 && scoreB > 65,
      intense: scoreA > 75 && scoreB > 75,
    };
  });
}

export function detectResponseQuality(
  answers: ArcanaAnswerMap,
  sub: Record<SubDimensionId, SubDimensionScore>,
  questions: ArcanaQuestion[] = ARCANA_QUESTIONS,
): ResponseQuality {
  const notes: string[] = [];
  const completionRate = clamp(Object.keys(answers).length / questions.length, 0, 1);

  const likertValues = Object.values(answers)
    .filter((a): a is Extract<ArcanaAnswer, { type: 'likert' }> => a.type === 'likert')
    .map((a) => a.value);
  let straightLiningRisk = false;
  if (likertValues.length > 0) {
    const counts = new Map<number, number>();
    for (const v of likertValues) counts.set(v, (counts.get(v) ?? 0) + 1);
    const maxCount = Math.max(...counts.values());
    if (maxCount / likertValues.length > 0.7) {
      straightLiningRisk = true;
      notes.push('Veel Likert-antwoorden hebben dezelfde waarde, wat de betrouwbaarheid kan verlagen.');
    }
  }

  const s = (id: SubDimensionId) => score(sub, id);
  const contradictionPairs: [SubDimensionId, SubDimensionId][] = [
    ['selfConfidence', 'selfDoubt'],
    ['directness', 'conflictAvoidance'],
    ['autonomyNeed', 'securityNeed'],
  ];
  const contradictionRisk = contradictionPairs.some(([a, b]) => s(a) > 75 && s(b) > 75);
  if (contradictionRisk) {
    notes.push('Sommige antwoordpatronen spreken elkaar tegen, wat kan wijzen op interne spanning of wisselende invulcontext.');
  }

  // shadowDefensiveness heeft geen enkel Likert-item (alleen forcedChoice/scenario/ranking),
  // die per ontwerp nooit negatief kunnen bijdragen. Daardoor ligt de structurele ondergrens
  // op 55 (empirisch bevestigd in src/dev/responseQualityContam.test.ts), niet op 0. Een
  // drempel van <20 is daarom wiskundig onbereikbaar en liet deze detector nooit triggeren.
  // <60 ligt ruim boven de structurele bodem (55) maar duidelijk onder het gemiddelde bij
  // neutrale/willekeurige invulling (77-85, zie src/dev/baselineCalibration.test.ts).
  const socialDesirabilityRisk =
    s('growthReadiness') > 80 &&
    s('shadowAvoidance') < 20 &&
    s('shadowDefensiveness') < 60 &&
    s('perfectionism') < 20;
  if (socialDesirabilityRisk) {
    notes.push('De antwoorden zijn opvallend eenzijdig positief over zelfcontrole en groei; dit kan sociaal wenselijk invullen suggereren.');
  }

  let confidenceLevel: ConfidenceLevel = 'low';
  if (completionRate >= 0.95) confidenceLevel = 'high';
  else if (completionRate >= 0.7) confidenceLevel = 'medium';

  if (completionRate < 1) {
    notes.push('De test is niet volledig afgerond; scores op minder bevraagde subdimensies zijn minder betrouwbaar.');
  }

  return {
    completionRate: Math.round(completionRate * 100) / 100,
    straightLiningRisk,
    contradictionRisk,
    socialDesirabilityRisk,
    confidenceLevel,
    notes,
  };
}

export function calculateArcanaResult(
  answers: ArcanaAnswerMap,
  questions: ArcanaQuestion[] = ARCANA_QUESTIONS,
): ArcanaScoreResult {
  const subDimensions = calculateSubDimensions(answers, questions);
  const mainDimensions = calculateMainDimensions(subDimensions);
  const archetypeScores = calculateArchetypeScores(subDimensions);
  const primaryArchetype = detectPrimaryArchetype(archetypeScores);
  const secondaryArchetype = detectSecondaryArchetype(archetypeScores);
  const stressArchetype = detectStressArchetype(subDimensions);
  const tensions = detectTensions(subDimensions);
  const responseQuality = detectResponseQuality(answers, subDimensions, questions);

  return {
    subDimensions,
    mainDimensions,
    archetypeScores,
    primaryArchetype,
    secondaryArchetype,
    stressArchetype,
    tensions,
    responseQuality,
    variantSeed: deriveVariantSeed(answers),
  };
}

export function scoreBand(value: number): 'laag' | 'gemiddeld' | 'hoog' | 'zeer hoog' {
  if (value >= 80) return 'zeer hoog';
  if (value >= 65) return 'hoog';
  if (value >= 35) return 'gemiddeld';
  return 'laag';
}

export { STRESS_ARCHETYPES };
