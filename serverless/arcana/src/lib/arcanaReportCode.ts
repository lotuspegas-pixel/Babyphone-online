import type { ArcanaReport } from '../types/arcana';

/**
 * Rapportcode: een korte, deterministische vingerafdruk van de scores achter
 * een rapport, voor op het voorblad. Dezelfde antwoorden geven dezelfde scores
 * en dus dezelfde code; andere antwoorden geven (vrijwel altijd) een andere.
 *
 * Bewust géén nummer uit een register: er is geen server en niemand deelt
 * codes uit, dus de code bewijst niets over echtheid. Hij helpt alleen om twee
 * uitdraaien van hetzelfde rapport als dezelfde te herkennen.
 *
 * De naam, de datum en de aanspreekvorm doen niet mee: die veranderen de
 * antwoorden niet. De rekenversie wel, want een andere versie kan met dezelfde
 * antwoorden andere scores geven.
 */

/** FNV-1a, 32 bit — klein, geen afhankelijkheid, overal gelijk. */
export function fnv1a(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function buildReportCode(report: ArcanaReport): string {
  const parts: string[] = [report.meta.version, report.archetypes.primary, report.archetypes.secondary];
  for (const id of Object.keys(report.scores.subDimensions).sort()) {
    parts.push(`${id}=${report.scores.subDimensions[id as keyof typeof report.scores.subDimensions].score.toFixed(4)}`);
  }
  for (const id of Object.keys(report.scores.archetypeScores).sort()) {
    parts.push(`${id}=${report.scores.archetypeScores[id as keyof typeof report.scores.archetypeScores].score.toFixed(4)}`);
  }
  const hex = fnv1a(parts.join('|')).toString(16).toUpperCase().padStart(8, '0');
  return `AP-${hex.slice(0, 4)}-${hex.slice(4)}`;
}
