import { writeFileSync } from 'node:fs';
import { it } from 'vitest';
import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import { MAIN_DIMENSIONS, SUB_DIMENSIONS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import { generateDummyAnswers, type DummyMode } from '../lib/arcanaDummyAnswers';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import type { ArcanaProfile } from '../types/arcana';

/**
 * Genereert een volledig voorbeeldrapport als markdown, zodat je kunt zien wat een
 * deelnemer te lezen krijgt zonder 120 vragen te hoeven invullen.
 *
 *   npm run sample
 *   ARCANA_SAMPLE_NAME=Ilse ARCANA_SAMPLE_SEED=7 npm run sample
 *
 * Dit bestand staat bewust in src/dev/ en is uitgesloten van `npm run test`
 * (zie vite.config.ts): het schrijft een bestand weg en toetst niets.
 */
const OUT = process.env.ARCANA_SAMPLE_OUT ?? 'voorbeeldrapport.md';
const SEED = Number(process.env.ARCANA_SAMPLE_SEED ?? 20260729);
const NAME = process.env.ARCANA_SAMPLE_NAME ?? 'Noor';
const MODE = (process.env.ARCANA_SAMPLE_MODE ?? 'random') as DummyMode;

it('genereert een voorbeeldrapport', () => {
  const profile: ArcanaProfile = { name: NAME, addressForm: 'je', lifePhase: 'van25tot40' };
  const answers = generateDummyAnswers(MODE, SEED);
  const result = calculateArcanaResult(answers);
  const report = generateArcanaReport(result, profile, '2026-07-29T12:00:00.000Z');

  const lines: string[] = [];
  const archName = (id: string) => ARCHETYPES.find((a) => a.id === id)?.name ?? id;

  lines.push(`# Voorbeeldrapport — ${NAME}`);
  lines.push('');
  lines.push(`Antwoordmodus \`${MODE}\`, seed ${SEED}. Zo ziet een deelnemer het rapport.`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Kerngegevens');
  lines.push('');
  lines.push(`- Primair archetype: **${archName(report.archetypes.primary)}** (${report.scores.archetypeScores[report.archetypes.primary].score}/100)`);
  lines.push(`- Secundair archetype: **${archName(report.archetypes.secondary)}** (${report.scores.archetypeScores[report.archetypes.secondary].score}/100)`);
  lines.push(`- Onder druk: **${STRESS_ARCHETYPES.find((s) => s.id === report.archetypes.stress)?.name}**`);
  lines.push(`- Betrouwbaarheid: ${report.meta.responseQuality.confidenceLevel}, volledigheid ${Math.round(report.meta.responseQuality.completionRate * 100)}%`);
  if (report.meta.responseQuality.notes.length) {
    lines.push(`- Kanttekeningen: ${report.meta.responseQuality.notes.join(' ')}`);
  }
  lines.push('');

  lines.push('## Alle archetypescores');
  lines.push('');
  lines.push('| Archetype | Score |');
  lines.push('|---|---|');
  for (const a of ARCHETYPES) {
    lines.push(`| ${a.name} | ${report.scores.archetypeScores[a.id].score} |`);
  }
  lines.push('');

  lines.push('## De 12 hoofddimensies');
  lines.push('');
  lines.push('| Hoofddimensie | Score |');
  lines.push('|---|---|');
  for (const d of MAIN_DIMENSIONS) {
    lines.push(`| ${d.label} | ${report.scores.mainDimensions[d.id].score} |`);
  }
  lines.push('');

  lines.push('## De 30 subdimensies');
  lines.push('');
  lines.push('| Subdimensie | Score | Betrouwbaarheid |');
  lines.push('|---|---|---|');
  for (const d of SUB_DIMENSIONS) {
    const s = report.scores.subDimensions[d.id];
    lines.push(`| ${d.label} | ${s.score} | ${s.confidence}% |`);
  }
  lines.push('');

  lines.push('## Spanningsvelden');
  lines.push('');
  lines.push('| Spanningsveld | Kant A | Kant B | Status |');
  lines.push('|---|---|---|---|');
  for (const t of report.tensions) {
    const def = TENSION_DEFINITIONS.find((d) => d.id === t.id)!;
    const status = t.intense ? 'zeer sterk' : t.active ? 'actief' : 'niet actief';
    lines.push(`| ${def.label} | ${t.scoreA} | ${t.scoreB} | ${status} |`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(`# Het rapport zoals ${NAME} het leest`);
  lines.push('');
  lines.push(`_${report.sections.length} secties._`);
  lines.push('');

  for (const s of report.sections) {
    lines.push(`## ${s.title}`);
    lines.push('');
    lines.push(`**${s.intro}**`);
    lines.push('');
    for (const p of s.paragraphs) {
      lines.push(p);
      lines.push('');
    }
    for (const b of s.bullets) {
      lines.push(`- ${b}`);
    }
    if (s.bullets.length) lines.push('');
  }

  writeFileSync(OUT, lines.join('\n'), 'utf8');
});
