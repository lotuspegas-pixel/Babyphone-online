import { describe, expect, it } from 'vitest';

import { plume, portraitLayout, wrapLabel } from '../lib/arcanaPortraitGeometry';

/**
 * Het portret belooft hetzelfde als het rapport: dezelfde antwoorden geven
 * exact hetzelfde beeld. Deze test houdt de geometrie aan die belofte, en
 * bewaakt de vormregels die het beeld leesbaar maken.
 */
describe('portretgeometrie', () => {
  const layout = portraitLayout(880, 'full');

  it('is deterministisch: dezelfde score geeft byte-voor-byte dezelfde paden', () => {
    const a = plume(layout, 3, 72, 'Emotionele gevoeligheid');
    const b = plume(layout, 3, 72, 'Emotionele gevoeligheid');
    expect(a).toEqual(b);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('de lengte van de pluim volgt de score: 0 op de kernrand, 100 op de buitencirkel', () => {
    const laag = plume(layout, 0, 0, 'x');
    const hoog = plume(layout, 0, 100, 'x');
    const midden = plume(layout, 0, 50, 'x');
    const afstand = (p: { tip: { x: number; y: number } }) => Math.hypot(p.tip.x - layout.cx, p.tip.y - layout.cy);
    expect(afstand(laag)).toBeCloseTo(layout.r0, 5);
    expect(afstand(hoog)).toBeCloseTo(layout.rMax, 5);
    expect(afstand(midden)).toBeCloseTo(layout.rMid, 5);
  });

  it('verder van 50 betekent meer baardjes en een zwaardere lijn', () => {
    const midden = plume(layout, 0, 50, 'x');
    const uitgesproken = plume(layout, 0, 90, 'x');
    const tel = (p: { vanes: { d: string }[] }) => p.vanes.reduce((n, v) => n + (v.d.match(/M /g)?.length ?? 0), 0);
    expect(tel(uitgesproken)).toBeGreaterThan(tel(midden));
    expect(uitgesproken.vaneWidth).toBeGreaterThan(midden.vaneWidth);
  });

  it('de buiging draait met de score: boven 50 met de klok mee, eronder ertegenin', () => {
    const boven = plume(layout, 0, 90, 'x');
    const onder = plume(layout, 0, 10, 'x');
    // Dimensie 0 staat op twaalf uur; met de klok mee is dan naar rechts (x groter).
    expect(boven.tip.x).toBeGreaterThan(layout.cx);
    expect(onder.tip.x).toBeLessThan(layout.cx);
  });

  it('nooit meer dan vier dekkingsklassen per pluim', () => {
    for (const score of [0, 25, 50, 75, 100]) {
      expect(plume(layout, 5, score, 'x').vanes.length).toBeLessThanOrEqual(4);
    }
  });

  it('breekt lange labels af zonder een woord te splitsen', () => {
    expect(wrapLabel('Emotionele gevoeligheid', 15)).toEqual(['Emotionele', 'gevoeligheid']);
    expect(wrapLabel('Controle en zekerheid', 15)).toEqual(['Controle en', 'zekerheid']);
    expect(wrapLabel('Denkstijl', 15)).toEqual(['Denkstijl']);
  });

  it('de compacte lay-out is vierkant en laat de buitenlabels weg', () => {
    const compact = portraitLayout(380, 'compact');
    expect(compact.height).toBe(380);
    expect(plume(compact, 2, 60, 'Denkstijl').label.lines).toEqual([]);
    expect(compact.rMax).toBeGreaterThan(layout.rMax * 0.4);
  });
});
