import { describe, expect, it } from 'vitest';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { generateDummyAnswers } from '../lib/arcanaDummyAnswers';
import { buildArcanaExportFilename, buildArcanaExportText } from '../lib/arcanaExport';
import type { ArcanaProfile } from '../types/arcana';

const profile: ArcanaProfile = { name: 'Test Persoon', addressForm: 'je', lifePhase: 'van25tot40' };

function makeReport() {
  const answers = generateDummyAnswers('balanced');
  const result = calculateArcanaResult(answers);
  return generateArcanaReport(result, profile, '2026-08-17T10:00:00.000Z');
}

describe('arcanaExport', () => {
  it('produces deterministic text for the same report', () => {
    const report = makeReport();
    const a = buildArcanaExportText(report);
    const b = buildArcanaExportText(report);
    expect(a).toBe(b);
  });

  it('includes the archetype name and every section title', () => {
    const report = makeReport();
    const text = buildArcanaExportText(report);
    for (const section of report.sections) {
      expect(text).toContain(section.title);
    }
    expect(text).toContain('archetype');
  });

  it('includes the privacy and disclaimer text', () => {
    const report = makeReport();
    const text = buildArcanaExportText(report);
    expect(text).toContain('browser opgeslagen');
    expect(text).toContain('geen medisch, psychologisch of therapeutisch');
  });

  it('never contains network-looking directives (no fetch/http calls embedded)', () => {
    const report = makeReport();
    const text = buildArcanaExportText(report);
    expect(text).not.toMatch(/https?:\/\//);
  });

  it('builds a filename derived from name and generation date without special characters', () => {
    const report = makeReport();
    const filename = buildArcanaExportFilename(report);
    expect(filename).toBe('arcana-mirror-test-persoon-2026-08-17.md');
  });

  it('falls back to a generic filename when no name is set', () => {
    const report = generateArcanaReport(
      calculateArcanaResult(generateDummyAnswers('balanced')),
      { name: '', addressForm: 'je', lifePhase: 'onbekend' },
      '2026-01-05T00:00:00.000Z',
    );
    const filename = buildArcanaExportFilename(report);
    expect(filename).toBe('arcana-mirror-rapport-2026-01-05.md');
  });

  it('produces different text for reports with different answers', () => {
    const reportA = generateArcanaReport(
      calculateArcanaResult(generateDummyAnswers('highControl')),
      profile,
      '2026-08-17T10:00:00.000Z',
    );
    const reportB = generateArcanaReport(
      calculateArcanaResult(generateDummyAnswers('highFreedom')),
      profile,
      '2026-08-17T10:00:00.000Z',
    );
    expect(buildArcanaExportText(reportA)).not.toBe(buildArcanaExportText(reportB));
  });
});
