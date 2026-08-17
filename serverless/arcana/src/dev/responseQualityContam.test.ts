import { it, expect } from 'vitest';
import { ARCANA_QUESTIONS } from '../data/arcanaQuestions';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import type { ArcanaAnswerMap, ForcedChoiceQuestion, LikertQuestion, RankingQuestion, ScenarioQuestion } from '../types/arcana';

/**
 * Test response-quality-detectie met opzettelijk vervuilde invullingen:
 * - "sociaal wenselijk": overal hoge groei/lage schaduw kiezen
 * - straight-lining: alle Likerts hetzelfde
 * Draai met:
 *   cd arcana && npx vitest run --dir src/dev --exclude '' -t 'response-quality-contaminatie' --reporter=verbose
 */

function buildSociallyDesirableAnswers(): ArcanaAnswerMap {
  const answers: ArcanaAnswerMap = {};
  for (const q of ARCANA_QUESTIONS) {
    if (q.type === 'likert') {
      const lq = q as LikertQuestion;
      const wantsGrowth = lq.targets.includes('growthReadiness');
      const wantsLowShadow = lq.targets.some((t) => t === 'shadowAvoidance' || t === 'shadowDefensiveness' || t === 'perfectionism');
      if (wantsGrowth) answers[q.id] = { type: 'likert', questionId: q.id, value: 7 };
      else if (wantsLowShadow) answers[q.id] = { type: 'likert', questionId: q.id, value: 1 };
      else answers[q.id] = { type: 'likert', questionId: q.id, value: 5 };
    } else if (q.type === 'forcedChoice' || q.type === 'scenario') {
      const cq = q as ForcedChoiceQuestion | ScenarioQuestion;
      const growthOpt = cq.options.find((o) => o.targets.includes('growthReadiness'));
      const shadowOpt = cq.options.find((o) => o.targets.some((t) => t === 'shadowAvoidance' || t === 'shadowDefensiveness'));
      const pick = growthOpt ?? cq.options.find((o) => o !== shadowOpt) ?? cq.options[0];
      answers[q.id] = { type: q.type, questionId: q.id, optionKey: pick.key };
    } else {
      const rq = q as RankingQuestion;
      const ordered = [...rq.items].sort((a, b) => {
        const aGrowth = a.targets.includes('growthReadiness') ? 1 : 0;
        const bGrowth = b.targets.includes('growthReadiness') ? 1 : 0;
        const aShadow = a.targets.some((t) => t === 'shadowAvoidance' || t === 'shadowDefensiveness') ? 1 : 0;
        const bShadow = b.targets.some((t) => t === 'shadowAvoidance' || t === 'shadowDefensiveness') ? 1 : 0;
        return bGrowth - aGrowth || aShadow - bShadow;
      }).map((i) => i.key);
      answers[q.id] = { type: 'ranking', questionId: q.id, order: ordered };
    }
  }
  return answers;
}

it('response-quality-contaminatie: sociaal-wenselijk-detectie op maximaal vervuilde invulling', () => {
  const answers = buildSociallyDesirableAnswers();
  const result = calculateArcanaResult(answers);
  console.log('\n=== Maximaal "sociaal wenselijke" invulling (hoge groei, lage schaduw geforceerd) ===');
  console.log(`growthReadiness score:      ${result.subDimensions.growthReadiness.score}`);
  console.log(`shadowAvoidance score:      ${result.subDimensions.shadowAvoidance.score}`);
  console.log(`shadowDefensiveness score:  ${result.subDimensions.shadowDefensiveness.score}`);
  console.log(`perfectionism score:        ${result.subDimensions.perfectionism.score}`);
  console.log(`socialDesirabilityRisk:     ${result.responseQuality.socialDesirabilityRisk}`);

  // Documenteert het actuele (mogelijk onwenselijke) gedrag; wordt in de wijzigingsfase besproken.
  console.log(
    result.responseQuality.socialDesirabilityRisk
      ? '--> detector triggert'
      : '--> detector triggert NIET, ondanks maximaal vervuilde invulling',
  );
});

it('structurele ondergrens shadowDefensiveness: minimum bereikbare score over alle vragen', () => {
  // Kies overal de optie/waarde die shadowDefensiveness NOOIT als target heeft.
  const answers: ArcanaAnswerMap = {};
  for (const q of ARCANA_QUESTIONS) {
    if (q.type === 'likert') {
      const lq = q as LikertQuestion;
      answers[q.id] = { type: 'likert', questionId: q.id, value: lq.targets.includes('shadowDefensiveness') ? 1 : 4 };
    } else if (q.type === 'forcedChoice' || q.type === 'scenario') {
      const cq = q as ForcedChoiceQuestion | ScenarioQuestion;
      const avoid = cq.options.find((o) => !o.targets.includes('shadowDefensiveness')) ?? cq.options[0];
      answers[q.id] = { type: q.type, questionId: q.id, optionKey: avoid.key };
    } else {
      const rq = q as RankingQuestion;
      const ordered = [...rq.items]
        .sort((a, b) => (a.targets.includes('shadowDefensiveness') ? 1 : 0) - (b.targets.includes('shadowDefensiveness') ? 1 : 0))
        .map((i) => i.key);
      answers[q.id] = { type: 'ranking', questionId: q.id, order: ordered };
    }
  }
  const result = calculateArcanaResult(answers);
  console.log(`\nMinimaal haalbare shadowDefensiveness score (alle vragen ontweken): ${result.subDimensions.shadowDefensiveness.score}`);
  console.log(`itemCount: ${result.subDimensions.shadowDefensiveness.itemCount}, confidence: ${result.subDimensions.shadowDefensiveness.confidence}`);
  // Bewijst dat < 20 (nodig voor socialDesirabilityRisk) structureel onbereikbaar is.
  expect(result.subDimensions.shadowDefensiveness.score).toBeGreaterThan(20);
});
