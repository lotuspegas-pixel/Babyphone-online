import { it } from 'vitest';
import { SUB_DIMENSION_IDS } from '../data/arcanaDimensions';
import { generateDummyAnswers } from '../lib/arcanaDummyAnswers';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';

/**
 * Controleert of 'balanced' (neutraal, geen bias) en 'random' werkelijk rond de 50
 * uitkomen, of dat er een systematische verschuiving in de score-schaal zit
 * (bijvoorbeeld door forced-choice/scenario/ranking items die per definitie
 * alleen positieve bijdrages leveren, nooit negatieve).
 * Draai met:
 *   cd arcana && npx vitest run --dir src/dev --exclude '' -t 'basiskalibratie' --reporter=verbose
 */
it('basiskalibratie: gemiddelde score per subdimensie bij neutrale/willekeurige invulling', () => {
  const balanced = calculateArcanaResult(generateDummyAnswers('balanced', 1));

  console.log('\n=== balanced (geen bias, alle Likert op 4) ===');
  for (const id of SUB_DIMENSION_IDS) {
    console.log(`${id.padEnd(24)} ${balanced.subDimensions[id].score}`);
  }

  const N = 200;
  const sums: Record<string, number> = {};
  for (const id of SUB_DIMENSION_IDS) sums[id] = 0;
  for (let seed = 1; seed <= N; seed += 1) {
    const r = calculateArcanaResult(generateDummyAnswers('random', seed));
    for (const id of SUB_DIMENSION_IDS) sums[id] += r.subDimensions[id].score;
  }
  console.log(`\n=== random gemiddelde over ${N} seeds (zou rond 50 moeten liggen als schaal ongebiased is) ===`);
  const skewed: string[] = [];
  for (const id of SUB_DIMENSION_IDS) {
    const m = sums[id] / N;
    console.log(`${id.padEnd(24)} ${m.toFixed(1)}`);
    if (Math.abs(m - 50) > 8) skewed.push(`${id}=${m.toFixed(1)}`);
  }
  console.log(`\nSubdimensies met random-gemiddelde >8 punten afwijkend van 50: ${skewed.join(', ') || 'geen'}`);
});
