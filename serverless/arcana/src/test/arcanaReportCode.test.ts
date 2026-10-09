import { describe, expect, it } from 'vitest';

import { generateDummyAnswers } from '../lib/arcanaDummyAnswers';
import { buildReportCode, fnv1a } from '../lib/arcanaReportCode';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';

const report = (seed: number, name = 'Noor', at = '2026-10-06T12:00:00.000Z') =>
  generateArcanaReport(
    calculateArcanaResult(generateDummyAnswers('random', seed)),
    { name, addressForm: 'je', lifePhase: 'onbekend' },
    at,
  );

describe('rapportcode', () => {
  it('fnv1a is stabiel (bekende FNV-1a-waarden)', () => {
    expect(fnv1a('')).toBe(0x811c9dc5);
    expect(fnv1a('a')).toBe(0xe40c292c);
  });

  it('heeft de vorm AP-XXXX-XXXX', () => {
    expect(buildReportCode(report(1))).toMatch(/^AP-[0-9A-F]{4}-[0-9A-F]{4}$/);
  });

  it('dezelfde antwoorden geven dezelfde code, ook bij andere naam en datum', () => {
    const a = buildReportCode(report(7));
    expect(buildReportCode(report(7))).toBe(a);
    expect(buildReportCode(report(7, 'Van Dijk', '2030-01-01T00:00:00.000Z'))).toBe(a);
  });

  it('andere antwoorden geven een andere code', () => {
    const codes = new Set([1, 2, 3, 4, 5, 6, 7, 8].map((s) => buildReportCode(report(s))));
    expect(codes.size).toBe(8);
  });
});
