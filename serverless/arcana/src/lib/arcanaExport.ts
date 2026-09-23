import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import { DISCLAIMER_TEXT, PRIVACY_TEXT } from '../data/arcanaReportBlocks';
import type { ArcanaReport } from '../types/arcana';
import { applyVoice } from './arcanaVoice';

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

  lines.push(`# Arcana Profile — rapport${name ? ` van ${name}` : ''}`);
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
    for (const o of section.outro ?? []) {
      lines.push(o);
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
  lines.push(applyVoice(PRIVACY_TEXT, report.meta.profile.addressForm));
  lines.push('');
  lines.push(DISCLAIMER_TEXT);
  lines.push('');

  return lines.join('\n');
}

/**
 * De tekstversie van de deelbare pagina (#/delen): hetzelfde hoofdstuk, met
 * de aanhef aan de ontvanger en de eigen disclaimer, voor "Kopiëren als
 * tekst". Puur functie, net als de volledige export.
 */
export function buildSharePageText(report: ArcanaReport): string {
  const section = report.sections.find((s) => s.id === 'understood-by-others');
  if (!section) return '';
  const name = report.meta.profile.name.trim();
  const van = name || 'iemand die dichtbij staat';
  const wie = name || 'diegene';
  const lines: string[] = [];
  lines.push(name ? `Een pagina uit het rapport van ${name}` : 'Een pagina uit een rapport');
  lines.push('');
  lines.push(`# ${section.title}`);
  lines.push('');
  lines.push(
    `Je krijgt dit van ${van}. Het is één hoofdstuk uit een zelfreflectietest die ${wie} invulde: 120 vragen, waaruit scores worden berekend op twaalf eigenschappen. Dit hoofdstuk is het enige dat geschreven is om door te geven. Je hoeft er niets mee te doen. Lezen is genoeg.`,
  );
  lines.push('');
  lines.push('## Wat mensen aan mij missen');
  lines.push('');
  for (const b of section.bullets) lines.push(`- ${b}`);
  lines.push('');
  const herkomst = (section.outro ?? []).map((o) => {
    const zonder = o.replace(/^Waar dit vandaan komt:\s*/i, '');
    return zonder.charAt(0).toUpperCase() + zonder.slice(1);
  });
  if (herkomst.length > 0) {
    lines.push('## Waar dit vandaan komt');
    lines.push('');
    for (const p of herkomst) {
      lines.push(p);
      lines.push('');
    }
  }
  lines.push('## Wat dit niet is');
  lines.push('');
  lines.push(
    `Dit is geen diagnose en geen gevalideerde psychologische test. Er is geen normgroep en geen validatiestudie. Het is ook geen vrijbrief: "zo ben ik nu eenmaal" is het einde van een gesprek, niet het begin. ${name ? `${name} kreeg` : 'Wie dit invulde, kreeg'} die waarschuwing er zelf ook bij.`,
  );
  lines.push('');
  lines.push(
    `Als je iets herkent, zeg het. Als je iets niet herkent, zeg dat ook — dat is even bruikbaar. De test meet hoe ${wie} zichzelf beschrijft, niet hoe ${wie} is. Jij hebt informatie die de test niet heeft.`,
  );
  lines.push('');
  lines.push(`Arcana Profile · gemaakt op ${formatReportDate(report.meta.generatedAt)} · arcanaprofile.com`);
  lines.push('');
  return lines.join('\n');
}

export function formatReportDate(iso: string): string {
  return formatDate(iso);
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
