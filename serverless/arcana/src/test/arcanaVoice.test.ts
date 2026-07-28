import { describe, expect, it } from 'vitest';
import { applyVoice, toFormal } from '../lib/arcanaVoice';

describe('toFormal', () => {
  it('maakt van "je" als onderwerp "u"', () => {
    expect(toFormal('je voelt het meteen')).toBe('u voelt het meteen');
    expect(toFormal('je bent loyaal')).toBe('u bent loyaal');
    expect(toFormal('je kunt goed improviseren')).toBe('u kunt goed improviseren');
  });

  it('maakt van "je" als bezittelijk "uw"', () => {
    expect(toFormal('je grens verschuift')).toBe('uw grens verschuift');
    expect(toFormal('je eigen tempo')).toBe('uw eigen tempo');
    expect(toFormal('je hoofd blijft doorgaan')).toBe('uw hoofd blijft doorgaan');
  });

  it('herkent bijwoorden tussen onderwerp en werkwoord', () => {
    expect(toFormal('je niet meer weet')).toBe('u niet meer weet');
    expect(toFormal('je vaak merkt dat')).toBe('u vaak merkt dat');
    expect(toFormal('je liever zwijgt')).toBe('u liever zwijgt');
  });

  it('zet jij, jou, jouw en jezelf correct om', () => {
    expect(toFormal('jij bent degene')).toBe('u bent degene');
    expect(toFormal('het raakt jou')).toBe('het raakt u');
    expect(toFormal('jouw kracht')).toBe('uw kracht');
    expect(toFormal('je verdedigt jezelf')).toBe('u verdedigt uzelf');
  });

  it('behoudt hoofdletters aan het begin van een zin', () => {
    expect(toFormal('Je bent iemand die doorzet.')).toBe('U bent iemand die doorzet.');
    expect(toFormal('Je valkuil is uitstel.')).toBe('Uw valkuil is uitstel.');
  });

  it('herstelt hoofdletters na een punt', () => {
    expect(toFormal('Dat klopt. Je merkt het snel.')).toBe('Dat klopt. U merkt het snel.');
  });

  it('laat woorden die "je" bevatten met rust', () => {
    expect(toFormal('projectie speelt hier mee')).toBe('projectie speelt hier mee');
    expect(toFormal('jezelf kennen is een project')).toBe('uzelf kennen is een project');
  });

  it('verandert niets in de je-vorm', () => {
    const text = 'Je merkt vaak eerder dan anderen dat de sfeer verandert.';
    expect(applyVoice(text, 'je')).toBe(text);
  });

  it('verwerkt een volledige rapportzin', () => {
    const input =
      'Je zegt wat je vindt zonder het lang in te pakken, waardoor mensen weten waar ze aan toe zijn.';
    const expected =
      'U zegt wat u vindt zonder het lang in te pakken, waardoor mensen weten waar ze aan toe zijn.';
    expect(applyVoice(input, 'u')).toBe(expected);
  });
});
