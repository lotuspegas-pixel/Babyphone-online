import { it } from 'vitest';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import type {
  ArcanaAnswerMap,
  ForcedChoiceQuestion,
  LikertQuestion,
  RankingQuestion,
  ScenarioQuestion,
  SubDimensionId,
} from '../types/arcana';

/**
 * Test of elke subdimensie individueel naar de uitersten (laag/hoog) bewogen kan
 * worden wanneer AL zijn eigen items maximaal in dezelfde richting worden beantwoord.
 * Dit onderscheidt "geen enkele dummy-modus targette deze dimensie" van
 * "de dimensie kan structureel niet discrimineren, ongeacht antwoord".
 *
 * Draai met:
 *   cd arcana && npx vitest run --dir src/dev --exclude '' -t 'uiterste-bias' --reporter=verbose
 */

function weightForIndex(index: number): number {
  if (index === 0) return 1.0;
  if (index === 1) return 0.7;
  if (index === 2) return 0.4;
  return 0.2;
}

function weightedTargetScore(targets: SubDimensionId[], target: SubDimensionId): number {
  const idx = targets.indexOf(target);
  return idx === -1 ? 0 : weightForIndex(idx);
}

/** Build answers that push `target` to its extreme (high or low) on every question that mentions it. */
function buildExtremeAnswers(target: SubDimensionId, direction: 'high' | 'low'): ArcanaAnswerMap {
  const answers: ArcanaAnswerMap = {};
  for (const q of ARCANA_QUESTIONS) {
    if (q.type === 'likert') {
      const lq = q as LikertQuestion;
      if (lq.targets.includes(target)) {
        answers[q.id] = { type: 'likert', questionId: q.id, value: direction === 'high' ? 7 : 1 };
      } else {
        answers[q.id] = { type: 'likert', questionId: q.id, value: 4 };
      }
    } else if (q.type === 'forcedChoice' || q.type === 'scenario') {
      const cq = q as ForcedChoiceQuestion | ScenarioQuestion;
      let best = cq.options[0];
      let bestScore = weightedTargetScore(best.targets, target);
      for (const opt of cq.options.slice(1)) {
        const s = weightedTargetScore(opt.targets, target);
        const better = direction === 'high' ? s > bestScore : s < bestScore;
        if (better) {
          best = opt;
          bestScore = s;
        }
      }
      answers[q.id] = { type: q.type, questionId: q.id, optionKey: best.key };
    } else {
      const rq = q as RankingQuestion;
      const ordered = rq.items
        .map((item) => ({ key: item.key, s: weightedTargetScore(item.targets, target) }))
        .sort((a, b) => (direction === 'high' ? b.s - a.s : a.s - b.s))
        .map((i) => i.key);
      answers[q.id] = { type: 'ranking', questionId: q.id, order: ordered };
    }
  }
  return answers;
}

it('uiterste-bias: bereik per subdimensie wanneer alle eigen items maximaal dezelfde kant op wijzen', () => {
  console.log('\n=== Bereikbaar bereik per subdimensie bij volledig eenzijdige beantwoording ===');
  console.log('id, laag, hoog, spanwijdte, itemCount(laag/hoog)');
  const flat: string[] = [];
  for (const id of SUB_DIMENSION_IDS) {
    const lowAnswers = buildExtremeAnswers(id, 'low');
    const highAnswers = buildExtremeAnswers(id, 'high');
    const lowResult = calculateArcanaResult(lowAnswers);
    const highResult = calculateArcanaResult(highAnswers);
    const lowScore = lowResult.subDimensions[id].score;
    const highScore = highResult.subDimensions[id].score;
    const span = highScore - lowScore;
    console.log(
      `${id.padEnd(24)} low=${lowScore} high=${highScore} span=${span} items=${lowResult.subDimensions[id].itemCount}/${highResult.subDimensions[id].itemCount}`,
    );
    if (span < 40) flat.push(`${id} (span=${span})`);
  }
  console.log(`\nSubdimensies met span < 40 bij eenzijdige beantwoording (structureel probleem): ${flat.join(', ') || 'geen'}`);
});
