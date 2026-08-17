import { it } from 'vitest';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import { ARCHETYPES } from '../data/arcanaArchetypes';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { generateDummyAnswers, type DummyMode } from '../lib/arcanaDummyAnswers';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import type { SubDimensionId } from '../types/arcana';

/**
 * Empirische metingen van het scoremodel: spreiding, itemdekking, correlatie,
 * archetype-winstverdeling, spanningsvelddrempels. Draai met:
 *   cd arcana && npx vitest run --dir src/dev --exclude '' -t 'modelmetingen' --reporter=verbose
 */

const MODES: DummyMode[] = [
  'balanced',
  'highSensitivity',
  'highControl',
  'highFreedom',
  'highRecognition',
  'random',
];
const SEEDS_PER_MODE = 60;

function mean(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}
function stdev(xs: number[]): number {
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
}
function pearson(xs: number[], ys: number[]): number {
  const mx = mean(xs);
  const my = mean(ys);
  let num = 0;
  let dx2 = 0;
  let dy2 = 0;
  for (let i = 0; i < xs.length; i += 1) {
    const dx = xs[i] - mx;
    const dy = ys[i] - my;
    num += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }
  const denom = Math.sqrt(dx2 * dy2);
  return denom === 0 ? 0 : num / denom;
}

it('modelmetingen: spreiding, itemdekking, correlatie, archetypeverdeling, spanningsvelden', () => {
  // 1. itemCount per subdimensie (statisch, telling over alle vragen/opties/targets, ongewogen naar aantal keer dat het als target voorkomt)
  const itemCounts: Record<string, number> = {};
  for (const id of SUB_DIMENSION_IDS) itemCounts[id] = 0;
  for (const q of ARCANA_QUESTIONS) {
    if (q.type === 'likert') {
      q.targets.forEach((t) => (itemCounts[t] += 1));
    } else if (q.type === 'forcedChoice' || q.type === 'scenario') {
      for (const opt of q.options) opt.targets.forEach((t) => (itemCounts[t] += 1));
    } else if (q.type === 'ranking') {
      for (const item of q.items) item.targets.forEach((t) => (itemCounts[t] += 1));
    }
  }

  console.log('\n=== Statische itemdekking per subdimensie (aantal vraag/optie-vermeldingen) ===');
  const sortedByCount = [...SUB_DIMENSION_IDS].sort((a, b) => itemCounts[a] - itemCounts[b]);
  for (const id of sortedByCount) {
    console.log(`${id.padEnd(24)} ${itemCounts[id]}`);
  }

  // 2. Verzamel scores over alle modi/seeds
  const scoresBySub: Record<string, number[]> = {};
  const confidenceBySub: Record<string, number[]> = {};
  const itemCountBySub: Record<string, number[]> = {};
  for (const id of SUB_DIMENSION_IDS) {
    scoresBySub[id] = [];
    confidenceBySub[id] = [];
    itemCountBySub[id] = [];
  }
  const archetypeWins: Record<string, number> = {};
  for (const a of ARCHETYPES) archetypeWins[a.id] = 0;
  const tensionActiveCounts: Record<string, number> = {};
  const tensionIntenseCounts: Record<string, number> = {};

  let total = 0;
  for (const mode of MODES) {
    for (let seed = 1; seed <= SEEDS_PER_MODE; seed += 1) {
      const answers = generateDummyAnswers(mode, seed * 1000 + mode.length);
      const result = calculateArcanaResult(answers);
      total += 1;
      for (const id of SUB_DIMENSION_IDS) {
        const sd = result.subDimensions[id];
        scoresBySub[id].push(sd.score);
        confidenceBySub[id].push(sd.confidence);
        itemCountBySub[id].push(sd.itemCount);
      }
      archetypeWins[result.primaryArchetype] += 1;
      for (const t of result.tensions) {
        tensionActiveCounts[t.id] = (tensionActiveCounts[t.id] ?? 0) + (t.active ? 1 : 0);
        tensionIntenseCounts[t.id] = (tensionIntenseCounts[t.id] ?? 0) + (t.intense ? 1 : 0);
      }
    }
  }

  console.log(`\n=== Spreiding per subdimensie over ${total} invullingen (${MODES.join(', ')}) ===`);
  console.log('id, mean, stdev, min, max, meanConfidence, meanItemCount');
  const narrowSpread: string[] = [];
  for (const id of SUB_DIMENSION_IDS) {
    const xs = scoresBySub[id];
    const m = mean(xs);
    const sd = stdev(xs);
    const mn = Math.min(...xs);
    const mx = Math.max(...xs);
    const mc = mean(confidenceBySub[id]);
    const mic = mean(itemCountBySub[id]);
    console.log(
      `${id.padEnd(24)} mean=${m.toFixed(1)} sd=${sd.toFixed(1)} range=[${mn},${mx}] conf=${mc.toFixed(0)} items=${mic.toFixed(1)}`,
    );
    if (sd < 8) narrowSpread.push(id);
  }
  console.log(`\nSubdimensies met sd < 8 (weinig discriminerend vermogen): ${narrowSpread.join(', ') || 'geen'}`);

  // 3. Correlatiematrix tussen subdimensieparen (op 'random' + 'balanced' gecombineerd voor bredere spreiding)
  console.log('\n=== Sterk gecorreleerde subdimensieparen (|r| > 0.8, over alle metingen) ===');
  const pairs: { a: SubDimensionId; b: SubDimensionId; r: number }[] = [];
  for (let i = 0; i < SUB_DIMENSION_IDS.length; i += 1) {
    for (let j = i + 1; j < SUB_DIMENSION_IDS.length; j += 1) {
      const a = SUB_DIMENSION_IDS[i];
      const b = SUB_DIMENSION_IDS[j];
      const r = pearson(scoresBySub[a], scoresBySub[b]);
      pairs.push({ a, b, r });
    }
  }
  pairs.sort((x, y) => Math.abs(y.r) - Math.abs(x.r));
  for (const p of pairs.filter((p) => Math.abs(p.r) > 0.8)) {
    console.log(`${p.a} <-> ${p.b}: r=${p.r.toFixed(2)}`);
  }
  console.log('\nTop 15 sterkst gecorreleerde paren ongeacht drempel:');
  for (const p of pairs.slice(0, 15)) {
    console.log(`${p.a} <-> ${p.b}: r=${p.r.toFixed(2)}`);
  }

  // 4. Archetype winstverdeling
  console.log(`\n=== Archetype-winstverdeling (primary) over ${total} invullingen ===`);
  for (const a of ARCHETYPES) {
    const n = archetypeWins[a.id];
    console.log(`${a.id.padEnd(18)} ${n} (${((100 * n) / total).toFixed(1)}%)`);
  }

  // 5. Spanningsveld drempel-frequentie
  console.log(`\n=== Spanningsveld actief/intens-frequentie over ${total} invullingen ===`);
  for (const id of Object.keys(tensionActiveCounts)) {
    const act = tensionActiveCounts[id];
    const int = tensionIntenseCounts[id];
    console.log(
      `${id.padEnd(24)} actief=${act} (${((100 * act) / total).toFixed(1)}%) intens=${int} (${((100 * int) / total).toFixed(1)}%)`,
    );
  }
});
