import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { STORAGE_KEYS } from '../lib/arcanaStorage';
import { THEME_STORAGE_KEY, applyTheme, readTheme, resolveTheme, saveTheme } from '../lib/arcanaTheme';

/**
 * Er is geen jsdom in dit project (geen nieuwe dependency), dus net als in
 * arcanaStorage.test.ts simuleren we het kleine stukje DOM dat de thema-
 * module aanraakt: localStorage, matchMedia, het data-attribuut op <html>
 * en de theme-color-meta.
 */
function mockDom(systemDark: boolean) {
  const store = new Map<string, string>();
  const dataset: Record<string, string> = {};
  const meta = { content: '#fbf8f3', hasAttribute: () => false, setAttribute: (_: string, v: string) => void (meta.content = v) };
  const window = {
    localStorage: {
      getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    },
    matchMedia: () => ({ matches: systemDark, addEventListener() {}, removeEventListener() {} }),
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return true;
    },
  };
  const document = {
    documentElement: { dataset },
    querySelectorAll: () => [meta],
  };
  const g = globalThis as unknown as { window?: unknown; document?: unknown };
  g.window = window;
  g.document = document;
  return { store, dataset, meta };
}

let dom: ReturnType<typeof mockDom>;

describe('thema', () => {
  beforeEach(() => {
    dom = mockDom(false);
  });

  afterEach(() => {
    const g = globalThis as unknown as { window?: unknown; document?: unknown };
    delete g.window;
    delete g.document;
  });

  it('valt terug op "systeem" zonder opgeslagen keuze of bij rommel in de opslag', () => {
    expect(readTheme()).toBe('system');
    dom.store.set(THEME_STORAGE_KEY, 'dark'); // kale waarde, geen JSON
    expect(readTheme()).toBe('system');
    dom.store.set(THEME_STORAGE_KEY, JSON.stringify('paars'));
    expect(readTheme()).toBe('system');
  });

  it('slaat op als JSON, net als alle andere sleutels, en leest dat terug', () => {
    saveTheme('dark');
    expect(dom.store.get(THEME_STORAGE_KEY)).toBe('"dark"');
    expect(readTheme()).toBe('dark');
    expect(dom.dataset.theme).toBe('dark');
    expect(dom.meta.content).toBe('#16130f');
  });

  it('"systeem" verwijdert de sleutel en het data-attribuut en volgt het apparaat', () => {
    saveTheme('light');
    saveTheme('system');
    expect(dom.store.has(THEME_STORAGE_KEY)).toBe(false);
    expect(dom.dataset.theme).toBeUndefined();
    expect(resolveTheme('system')).toBe('light');

    dom = mockDom(true);
    expect(resolveTheme('system')).toBe('dark');
    applyTheme('system');
    expect(dom.meta.content).toBe('#16130f');
  });

  it('een handmatige keuze wint van het systeem', () => {
    dom = mockDom(true); // apparaat op donker
    applyTheme('light');
    expect(resolveTheme('light')).toBe('light');
    expect(dom.dataset.theme).toBe('light');
    expect(dom.meta.content).toBe('#fbf8f3');
  });

  it('hoort niet bij de sleutels die "Antwoorden wissen" opruimt', () => {
    // Een leesinstelling is geen persoonsgegeven; wie zijn antwoorden wist,
    // hoort zijn donkere modus niet kwijt te raken.
    expect(Object.values(STORAGE_KEYS)).not.toContain(THEME_STORAGE_KEY);
  });
});
