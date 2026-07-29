import { describe, expect, it } from 'vitest';
import { generateArcanaReport } from '../lib/arcanaReportGenerator';
import { calculateArcanaResult } from '../lib/arcanaScoringEngine';
import { generateDummyAnswers, type DummyMode } from '../lib/arcanaDummyAnswers';
import type { ArcanaProfile } from '../types/arcana';

const MODES: DummyMode[] = [
  'balanced',
  'highSensitivity',
  'highControl',
  'highFreedom',
  'highRecognition',
  'random',
  'straightLine',
];

const PROFILE: ArcanaProfile = { name: 'Noor', addressForm: 'je', lifePhase: 'van25tot40' };

function allText(mode: DummyMode, seed = 1): string[] {
  const result = calculateArcanaResult(generateDummyAnswers(mode, seed));
  const report = generateArcanaReport(result, PROFILE, '2026-01-01T00:00:00.000Z');
  return report.sections.flatMap((s) => [s.title, s.intro, ...s.paragraphs, ...s.bullets]);
}

/**
 * De teksten in TRAIT_CONTENT staan in hoofdzinsvolgorde. Worden ze achter "dat" of
 * "waardoor" geplakt, dan ontstaat een bijzin met de persoonsvorm op de verkeerde
 * plek ("waardoor mensen weten precies waar ze aan toe zijn"). Deze test bewaakt dat.
 */
/**
 * In een bijzin staat de persoonsvorm achteraan: "waardoor mensen zich gesteund
 * voelen". Staat hij direct achter het onderwerp en volgt er een reflexief of
 * bijwoord dat ervóór hoort ("waardoor mensen voelen zich gesteund"), dan is er een
 * hoofdzin ingeplakt. Dat patroon zoeken we op.
 */
const FINITE_VERBS =
  'weten|voelen|raken|merken|zien|hebben|worden|krijgen|ervaren|vinden|denken|kunnen|' +
  'zullen|gaan|staan|blijven|komen|nemen|geven|houden|laten|zeggen|maken|leunen|' +
  'weet|voelt|raakt|merkt|ziet|heeft|wordt|krijgt|ervaart|vindt|denkt|kan|zal|gaat|' +
  'staat|blijft|komt|neemt|geeft|houdt|laat|zegt|maakt';
const MISPLACED_ADJUNCTS = 'zich|precies|er|niet|meteen|vaak|soms|snel|altijd|nooit|graag|liever';
const EMBEDDED_MAIN_CLAUSE = new RegExp(
  String.raw`\b(waardoor|dat)\s+(mensen|anderen|je|jij)\s+(${FINITE_VERBS})\s+(${MISPLACED_ADJUNCTS})\b`,
  'i',
);

describe('woordvolgorde in samengestelde zinnen', () => {
  it('plakt geen hoofdzin achter "waardoor" of "dat"', () => {
    for (const mode of MODES) {
      for (const text of allText(mode)) {
        expect(text, `mode ${mode}`).not.toMatch(EMBEDDED_MAIN_CLAUSE);
      }
    }
  });

  it('herkent het foutpatroon wel wanneer het zou optreden', () => {
    // Regressiebescherming voor de test zelf: dit zijn de zinnen die eerder in het
    // rapport stonden en die de fix heeft weggenomen.
    expect('waardoor mensen weten precies waar ze aan toe zijn').toMatch(EMBEDDED_MAIN_CLAUSE);
    expect('waardoor mensen voelen zich gesteund door je zekerheid').toMatch(EMBEDDED_MAIN_CLAUSE);
    // En dit is correct Nederlands, dus het mag niet matchen.
    expect('waardoor je die niet direct herkent').not.toMatch(EMBEDDED_MAIN_CLAUSE);
    expect('waardoor mensen zich gesteund voelen').not.toMatch(EMBEDDED_MAIN_CLAUSE);
  });

  it('bevat geen dubbele spaties of losse leestekens', () => {
    for (const mode of MODES) {
      for (const text of allText(mode)) {
        expect(text, `mode ${mode}`).not.toMatch(/ {2,}/);
        expect(text, `mode ${mode}`).not.toMatch(/\s[.,;]/);
        expect(text, `mode ${mode}`).not.toMatch(/\.\./);
      }
    }
  });

  it('herhaalt de archetype-basistekst niet in twee secties', () => {
    const result = calculateArcanaResult(generateDummyAnswers('random', 20260729));
    const report = generateArcanaReport(result, PROFILE, '2026-01-01T00:00:00.000Z');

    const paragraphs = report.sections.flatMap((s) => s.paragraphs.map((p) => ({ id: s.id, p })));
    const seen = new Map<string, string>();
    for (const { id, p } of paragraphs) {
      if (p.length < 80) continue; // korte overgangszinnen mogen terugkomen
      const previous = seen.get(p);
      expect(previous, `dezelfde alinea staat in "${previous}" en "${id}"`).toBeUndefined();
      seen.set(p, id);
    }
  });
});
