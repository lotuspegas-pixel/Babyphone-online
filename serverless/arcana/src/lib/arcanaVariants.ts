import type { ArcanaAnswerMap } from '../types/arcana';

/**
 * Eén formulering, of meerdere onderling uitwisselbare formuleringen van
 * dezelfde uitspraak. De rapportgenerator kiest er deterministisch één, zodat
 * twee mensen met vergelijkbare scores niet letterlijk dezelfde zinnen lezen
 * terwijl dezelfde antwoorden nog altijd hetzelfde rapport opleveren.
 *
 * Varianten moeten inhoudelijk gelijkwaardig zijn: ze beschrijven hetzelfde
 * gedrag met dezelfde strekking. Een variant die iets anders beweert, breekt
 * de herleidbaarheid naar de score.
 */
export type Phrasing = string | readonly string[];

/** FNV-1a: klein, snel, en zonder afhankelijkheden — puur voor spreiding. */
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Leidt een stabiele seed af uit de gegeven antwoorden. Sorteert op vraag-id
 * zodat de invoervolgorde niet uitmaakt, en neemt de antwoordinhoud mee zodat
 * twee mensen met andere antwoorden ook andere formuleringen krijgen.
 */
export function deriveVariantSeed(answers: ArcanaAnswerMap): number {
  const parts = Object.keys(answers)
    .sort()
    .map((id) => {
      const answer = answers[id];
      switch (answer.type) {
        case 'likert':
          return `${id}:${answer.value}`;
        case 'forcedChoice':
        case 'scenario':
          return `${id}:${answer.optionKey}`;
        case 'ranking':
          return `${id}:${answer.order.join(',')}`;
        default:
          return id;
      }
    });
  return hashString(parts.join('|'));
}

/**
 * Kiest deterministisch één formulering. `slot` moet uniek zijn per tekstplek
 * (bijvoorbeeld `autonomyNeed.behavior`), anders vallen alle velden op dezelfde
 * index en verdwijnt de spreiding.
 */
export function pick(phrasing: Phrasing, seed: number, slot: string): string {
  if (typeof phrasing === 'string') return phrasing;
  if (phrasing.length === 0) {
    throw new Error(`Lege variantenlijst voor slot "${slot}"`);
  }
  if (phrasing.length === 1) return phrasing[0];
  return phrasing[hashString(`${seed}:${slot}`) % phrasing.length];
}

/** Alle formuleringen van een sleuf — nodig om ze allemaal te kunnen valideren. */
export function allPhrasings(phrasing: Phrasing): readonly string[] {
  return typeof phrasing === 'string' ? [phrasing] : phrasing;
}
