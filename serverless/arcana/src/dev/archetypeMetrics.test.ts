import { it } from 'vitest';
import { ARCHETYPES } from '../data/arcanaArchetypes';
import { generateDummyAnswers, type DummyMode } from '../lib/arcanaDummyAnswers';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';

/**
 * Aanvullende archetype-metingen: secondary-winstverdeling, stress-archetypeverdeling,
 * en formule-overlap (identieke of bijna-identieke subdimensiesets) tussen archetypes.
 * Draai met:
 *   cd arcana && npx vitest run --dir src/dev --exclude '' -t 'archetypemetingen' --reporter=verbose
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

it('archetypemetingen: formule-overlap, secondary-verdeling, stress-archetypeverdeling', () => {
  console.log('\n=== Formule-overlap tussen archetypeparen (gedeelde subdimensies) ===');
  for (let i = 0; i < ARCHETYPES.length; i += 1) {
    for (let j = i + 1; j < ARCHETYPES.length; j += 1) {
      const a = ARCHETYPES[i];
      const b = ARCHETYPES[j];
      const setA = new Set(a.formula);
      const shared = a.formula.filter((t) => setA.has(t) && b.formula.includes(t));
      if (shared.length >= 3) {
        const identical = shared.length === 4 && new Set(b.formula).size === 4 && setA.size === 4 &&
          [...setA].every((t) => b.formula.includes(t));
        console.log(
          `${a.id} <-> ${b.id}: ${shared.length}/4 gedeeld [${shared.join(', ')}]${identical ? '  <-- IDENTIEKE FORMULE (verschillende volgorde)' : ''}`,
        );
      }
    }
  }

  const primaryWins: Record<string, number> = {};
  const secondaryWins: Record<string, number> = {};
  const stressWins: Record<string, number> = {};
  for (const a of ARCHETYPES) {
    primaryWins[a.id] = 0;
    secondaryWins[a.id] = 0;
  }

  let total = 0;
  for (const mode of MODES) {
    for (let seed = 1; seed <= SEEDS_PER_MODE; seed += 1) {
      const answers = generateDummyAnswers(mode, seed * 1000 + mode.length);
      const result = calculateArcanaResult(answers);
      total += 1;
      primaryWins[result.primaryArchetype] += 1;
      secondaryWins[result.secondaryArchetype] += 1;
      stressWins[result.stressArchetype] = (stressWins[result.stressArchetype] ?? 0) + 1;
    }
  }

  console.log(`\n=== Secondary-archetype-verdeling over ${total} invullingen ===`);
  for (const a of ARCHETYPES) {
    console.log(`${a.id.padEnd(18)} ${secondaryWins[a.id]} (${((100 * secondaryWins[a.id]) / total).toFixed(1)}%)`);
  }

  console.log(`\n=== Hoe vaak is primary+secondary hetzelfde paar (Flame/Performer check) ===`);
  let flamePerformerPair = 0;
  for (const mode of MODES) {
    for (let seed = 1; seed <= SEEDS_PER_MODE; seed += 1) {
      const answers = generateDummyAnswers(mode, seed * 1000 + mode.length);
      const result = calculateArcanaResult(answers);
      const pair = [result.primaryArchetype, result.secondaryArchetype].sort().join('+');
      if (pair === 'theFlame+thePerformer') flamePerformerPair += 1;
    }
  }
  console.log(`theFlame+thePerformer als primary+secondary paar: ${flamePerformerPair}/${total} (${((100 * flamePerformerPair) / total).toFixed(1)}%)`);

  console.log(`\n=== Stress-archetypeverdeling over ${total} invullingen ===`);
  for (const id of Object.keys(stressWins)) {
    console.log(`${id.padEnd(18)} ${stressWins[id]} (${((100 * stressWins[id]) / total).toFixed(1)}%)`);
  }
});
