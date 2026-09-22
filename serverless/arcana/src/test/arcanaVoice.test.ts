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

  /**
   * Gevonden door de gouden master (src/test/goldenMaster.test.ts): drie
   * bronzinnen leverden in de u-vorm "van uw overkomt" op, omdat de omzetter
   * alleen een whitelist van werkwoorden kende en "overkomt", "uitgaat" en het
   * partikel "naar" daar niet in stonden. Na een voorzetsel is "je" het
   * voorwerp, niet de bezitter — behalve wanneer er een zelfstandig naamwoord
   * op volgt, en dat onderscheid maakt het volgende woord.
   */
  describe('voorwerp na een voorzetsel wordt "u", bezit blijft "uw"', () => {
    it('zet "van je" om naar "van u" wanneer er een werkwoord op volgt', () => {
      expect(toFormal('Dit is wat er van je overkomt voordat iemand je kent.')).toBe(
        'Dit is wat er van u overkomt voordat iemand u kent.',
      );
      expect(toFormal('de druk die van je uitgaat')).toBe('de druk die van u uitgaat');
    });

    it('zet "van je" om naar "van u" wanneer er een partikel op volgt', () => {
      expect(toFormal('een eerlijker versie van je naar boven halen')).toBe(
        'een eerlijker versie van u naar boven halen',
      );
      expect(toFormal('dat gaat bij je af')).toBe('dat gaat bij u af');
    });

    it('laat echt bezit met rust', () => {
      expect(toFormal('van je patroon, van je week, van je groeipad')).toBe(
        'van uw patroon, van uw week, van uw groeipad',
      );
      expect(toFormal('Dit is de kant van je persoonlijkheid die zichtbaar wordt.')).toBe(
        'Dit is de kant van uw persoonlijkheid die zichtbaar wordt.',
      );
    });

    it('scheidt onderwerp, voorwerp en bezit binnen één zin', () => {
      expect(toFormal('Je voelt je niet gezien en je grens verschuift.')).toBe(
        'U voelt u niet gezien en uw grens verschuift.',
      );
    });
  });
});
