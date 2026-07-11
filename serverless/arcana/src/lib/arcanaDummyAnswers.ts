import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import type { ArcanaAnswerMap, ArcanaQuestion, SubDimensionId } from '../types/arcana';

export type DummyMode =
  | 'balanced'
  | 'highSensitivity'
  | 'highControl'
  | 'highFreedom'
  | 'highRecognition'
  | 'random'
  | 'straightLine';

type BiasMap = Partial<Record<SubDimensionId, number>>;

const MODE_BIASES: Record<Exclude<DummyMode, 'random' | 'straightLine'>, BiasMap> = {
  balanced: {},
  highSensitivity: { emotionalSensitivity: 1, intuitiveThinking: 0.6, connectionNeed: 0.4, criticismSensitivity: 0.5 },
  highControl: { controlNeed: 1, analyticalThinking: 0.6, securityNeed: 0.5, perfectionism: 0.4 },
  highFreedom: { autonomyNeed: 1, independenceNeed: 0.7, creativeThinking: 0.4 },
  highRecognition: { recognitionNeed: 1, selfConfidence: 0.6, socialEnergy: 0.4, directness: 0.3 },
};

/** Deterministic PRNG (mulberry32) so the "random" and tie-break paths stay reproducible. */
function mulberry32(seed: number) {
  let a = seed;
  return function next(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function weightForIndex(index: number): number {
  if (index === 0) return 1.0;
  if (index === 1) return 0.7;
  if (index === 2) return 0.4;
  return 0.2;
}

function weightedBias(targets: SubDimensionId[], bias: BiasMap): number {
  let sum = 0;
  targets.forEach((t, i) => {
    sum += (bias[t] ?? 0) * weightForIndex(i);
  });
  return sum;
}

export function generateDummyAnswers(mode: DummyMode = 'balanced', seed = 42): ArcanaAnswerMap {
  const answers: ArcanaAnswerMap = {};
  const rng = mulberry32(seed);
  const bias = mode === 'random' || mode === 'straightLine' ? {} : MODE_BIASES[mode];

  for (const question of ARCANA_QUESTIONS) {
    answers[question.id] = buildAnswer(question, mode, bias, rng);
  }

  return answers;
}

function buildAnswer(
  question: ArcanaQuestion,
  mode: DummyMode,
  bias: BiasMap,
  rng: () => number,
): ArcanaAnswerMap[string] {
  if (question.type === 'likert') {
    if (mode === 'straightLine') {
      return { type: 'likert', questionId: question.id, value: 5 };
    }
    if (mode === 'random') {
      const value = (Math.floor(rng() * 7) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
      return { type: 'likert', questionId: question.id, value };
    }
    const score = weightedBias(question.targets, bias);
    const value = Math.min(7, Math.max(1, Math.round(4 + score * 2.5))) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
    return { type: 'likert', questionId: question.id, value };
  }

  if (question.type === 'forcedChoice' || question.type === 'scenario') {
    if (mode === 'straightLine') {
      return { type: question.type, questionId: question.id, optionKey: question.options[0].key };
    }
    if (mode === 'random') {
      const idx = Math.floor(rng() * question.options.length);
      return { type: question.type, questionId: question.id, optionKey: question.options[idx].key };
    }
    let best = question.options[0];
    let bestScore = weightedBias(best.targets, bias);
    for (const opt of question.options.slice(1)) {
      const s = weightedBias(opt.targets, bias);
      if (s > bestScore) {
        best = opt;
        bestScore = s;
      }
    }
    return { type: question.type, questionId: question.id, optionKey: best.key };
  }

  // ranking
  if (mode === 'straightLine') {
    return { type: 'ranking', questionId: question.id, order: question.items.map((i) => i.key) };
  }
  if (mode === 'random') {
    const keys = question.items.map((i) => i.key);
    for (let i = keys.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    return { type: 'ranking', questionId: question.id, order: keys };
  }
  const ordered = question.items
    .map((item) => ({ key: item.key, score: weightedBias(item.targets, bias) }))
    .sort((a, b) => b.score - a.score)
    .map((i) => i.key);
  return { type: 'ranking', questionId: question.id, order: ordered };
}
