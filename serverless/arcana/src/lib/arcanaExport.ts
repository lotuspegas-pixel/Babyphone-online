import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import { DISCLAIMER_TEXT, PRIVACY_TEXT } from '../data/arcanaReportBlocks';
import type { ArcanaReport } from '../types/arcana';

/**
 * Bouwt een platte, leesbare Markdown-weergave van het volledige rapport.
 * Puur functie: geen DOM, geen storage, geen netwerk. Alleen tekst afgeleid
 * van het reeds berekende rapportobject, zodat dezelfde input altijd
 * dezelfde export oplevert (determinisme blijft behouden).
 */
export function buildArcanaExportText(report: ArcanaReport): string {
  const primary = ARCHETYPES.find((a) => a.id === report.archetypes.primary);
  const secondary = ARCHETYPES.find((a) => a.id === report.archetypes.secondary);
  const stress = STRESS_ARCHETYPES.find((s) => s.id === report.archetypes.stress);

  const lines: string[] = [];
  const name = report.meta.profile.name.trim();

  lines.push(`# Arcana Mirror — rapport${name ? ` van ${name}` : ''}`);
  lines.push('');
  lines.push(`Gegenereerd op: ${formatDate(report.meta.generatedAt)}`);
  lines.push('');
  lines.push(`Primair archetype: ${primary?.name ?? report.archetypes.primary}`);
  lines.push(`Secundair archetype: ${secondary?.name ?? report.archetypes.secondary}`);
  lines.push(`Stress-archetype: ${stress?.name ?? report.archetypes.stress}`);
  lines.push('');

  lines.push('## Score-overzicht (hoofddimensies)');
  lines.push('');
  for (const dim of Object.values(report.scores.mainDimensions)) {
    lines.push(`- ${dim.id}: ${Math.round(dim.score)}/100`);
  }
  lines.push('');

  for (const section of report.sections) {
    lines.push(`## ${section.title}`);
    lines.push('');
    if (section.intro) {
      lines.push(section.intro);
      lines.push('');
    }
    for (const p of section.paragraphs) {
      lines.push(p);
      lines.push('');
    }
    if (section.bullets.length > 0) {
      for (const b of section.bullets) {
        lines.push(`- ${b}`);
      }
      lines.push('');
    }
  }

  const activeTensions = report.tensions.filter((t) => t.active);
  if (activeTensions.length > 0) {
    lines.push('## Spanningsvelden');
    lines.push('');
    for (const t of activeTensions) {
      lines.push(`- ${t.id} (${Math.round(t.scoreA)} / ${Math.round(t.scoreB)})`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push(PRIVACY_TEXT);
  lines.push('');
  lines.push(DISCLAIMER_TEXT);
  lines.push('');

  return lines.join('\n');
}

function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Bestandsnaam zonder speciale tekens, stabiel afgeleid van naam en datum. */
export function buildArcanaExportFilename(report: ArcanaReport): string {
  const name = report.meta.profile.name.trim();
  const safeName = name
    ? name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    : 'rapport';
  const datePart = report.meta.generatedAt.slice(0, 10) || 'onbekend';
  return `arcana-mirror-${safeName}-${datePart}.md`;
}
