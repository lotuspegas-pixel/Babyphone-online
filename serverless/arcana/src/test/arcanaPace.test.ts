import { describe, expect, it } from 'vitest';

import {
  MAX_VRAAGTIJD_MS,
  STANDAARD_MS_PER_VRAAG,
  beginPace,
  msPerVraag,
  registreerWissel,
  resterendeMinuten,
} from '../lib/arcanaPace';

const T0 = 1_700_000_000_000;

/** Beantwoordt `n` vragen achter elkaar, elk in `ms`, vanaf vraag `van`. */
function loop(van: number, n: number, ms: number) {
  let s = beginPace(van, T0);
  let t = T0;
  for (let i = 0; i < n; i += 1) {
    t += ms;
    s = registreerWissel(s, van + i + 1, t);
  }
  return s;
}

describe('resterende minuten', () => {
  it('begint met het standaardtempo: 120 vragen ≈ 25 minuten', () => {
    const s = beginPace(0, T0);
    expect(msPerVraag(s)).toBe(STANDAARD_MS_PER_VRAAG);
    expect(resterendeMinuten(s, 0, 120)).toBe(25);
  });

  it('een dag pauze telt niet mee (de oorspronkelijke fout: 145007 minuten)', () => {
    let s = loop(10, 5, 10_000);
    // Dagen later verdergaan: de pauze valt boven de maximale vraagtijd.
    const dagen = 100 * 24 * 60 * 60 * 1000;
    s = registreerWissel(s, 16, T0 + 5 * 10_000 + dagen);
    const min = resterendeMinuten(s, 16, 120);
    expect(min).toBeDefined();
    expect(min!).toBeLessThan(60);
    expect(Number.isFinite(min!)).toBe(true);
  });

  it('gebruikt het eigen tempo na een paar vragen', () => {
    const snel = loop(0, 10, 6_000);
    expect(msPerVraag(snel)).toBe(6_000);
    expect(resterendeMinuten(snel, 10, 120)).toBe(11); // 110 × 6 s = 11 min
    const traag = loop(0, 10, 30_000);
    expect(resterendeMinuten(traag, 10, 120)).toBe(55); // 110 × 30 s
  });

  it('een onderbreking op één vraag verstoort het tempo niet', () => {
    let s = loop(0, 6, 8_000);
    s = registreerWissel(s, 7, T0 + 6 * 8_000 + MAX_VRAAGTIJD_MS + 1);
    expect(s.metingen).toBe(6);
    expect(msPerVraag(s)).toBe(8_000);
  });

  it('terugbladeren en doorklikken leveren geen meting op', () => {
    let s = beginPace(5, T0);
    s = registreerWissel(s, 4, T0 + 5_000); // terug
    s = registreerWissel(s, 5, T0 + 5_100); // vooruit maar < 0,8 s
    expect(s.metingen).toBe(0);
  });

  it('klaar of voorbij het einde: geen schatting', () => {
    expect(resterendeMinuten(beginPace(119, T0), 120, 120)).toBeUndefined();
  });

  it('is nooit onder 1 en blijft binnen de tempogrenzen', () => {
    expect(resterendeMinuten(loop(0, 10, 1_000), 119, 120)).toBe(1);
    expect(resterendeMinuten(loop(0, 10, 80_000 > MAX_VRAAGTIJD_MS ? 89_000 : 80_000), 10, 120)).toBeLessThanOrEqual(83);
  });
});
