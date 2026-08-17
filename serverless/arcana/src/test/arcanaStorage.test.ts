import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_PROFILE,
  clearArcanaStorage,
  hasInProgressTest,
  loadAnswers,
  loadCurrentQuestionIndex,
  loadProfile,
  loadResult,
  saveAnswers,
  saveCurrentQuestionIndex,
  saveProfile,
  saveResult,
} from '../lib/arcanaStorage';
import type { ArcanaAnswerMap, ArcanaProfile, ArcanaReport } from '../types/arcana';

/**
 * arcanaStorage.ts wordt nergens anders getest. Er is geen jsdom in dit project
 * (geen nieuwe dependency toegestaan), dus we simuleren `window.localStorage`
 * met een minimale in-memory implementatie die desgewenst quota-fouten en
 * corrupte JSON kan produceren — precies de twee risico's die de rest van de
 * suite niet dekt: "localStorage die corrupt of vol is".
 */
function createMockLocalStorage(opts: { quotaBytes?: number } = {}) {
  const store = new Map<string, string>();
  let used = 0;
  return {
    getItem(key: string): string | null {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string): void {
      const previousLength = store.get(key)?.length ?? 0;
      const additional = value.length - previousLength;
      if (opts.quotaBytes !== undefined && used + additional > opts.quotaBytes) {
        throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
      }
      used += additional;
      store.set(key, value);
    },
    removeItem(key: string): void {
      const existing = store.get(key);
      if (existing !== undefined) used -= existing.length;
      store.delete(key);
    },
    clear(): void {
      store.clear();
      used = 0;
    },
    get length(): number {
      return store.size;
    },
    key(index: number): string | null {
      return Array.from(store.keys())[index] ?? null;
    },
    /** Alleen voor tests: directe toegang om corrupte data te injecteren. */
    _raw: store,
  };
}

let mockStorage: ReturnType<typeof createMockLocalStorage>;

beforeEach(() => {
  mockStorage = createMockLocalStorage();
  (globalThis as unknown as { window: unknown }).window = { localStorage: mockStorage };
});

afterEach(() => {
  delete (globalThis as unknown as { window?: unknown }).window;
});

describe('arcanaStorage — corrupte data', () => {
  it('valt terug op een lege answer-map wanneer de opgeslagen JSON kapot is', () => {
    mockStorage._raw.set('arcana_answers', '{ dit is geen geldige JSON');
    expect(loadAnswers()).toEqual({});
  });

  it('valt terug op null wanneer het opgeslagen rapport corrupte JSON is', () => {
    mockStorage._raw.set('arcana_result', 'undefined-achtige troep {{{');
    expect(loadResult()).toBeNull();
  });

  it('valt terug op het default profiel wanneer het opgeslagen profiel corrupte JSON is', () => {
    mockStorage._raw.set('arcana_profile', '{"name": "Sam", "addressForm":');
    expect(loadProfile()).toEqual(DEFAULT_PROFILE);
  });

  it('vult ontbrekende velden in een gedeeltelijk profiel aan met defaults in plaats van undefined door te geven', () => {
    mockStorage._raw.set('arcana_profile', JSON.stringify({ name: 'Ilse' }));
    const profile = loadProfile();
    expect(profile.name).toBe('Ilse');
    expect(profile.addressForm).toBe('je');
    expect(profile.lifePhase).toBe(DEFAULT_PROFILE.lifePhase);
    expect(profile.addressForm).not.toBeUndefined();
    expect(profile.lifePhase).not.toBeUndefined();
  });

  it('accepteert geen willekeurige string als addressForm en valt terug op "je"', () => {
    mockStorage._raw.set('arcana_profile', JSON.stringify({ name: 'Sam', addressForm: 'onzin' }));
    expect(loadProfile().addressForm).toBe('je');
  });
});

describe('arcanaStorage — volle opslag', () => {
  it('saveAnswers gooit niet onafgevangen door wanneer localStorage.setItem een QuotaExceededError geeft', () => {
    // Reproduceert het gevonden defect: writeJson() ving schrijffouten niet af.
    // App.tsx roept saveAnswers() aan binnen de setAnswers-updater; als dat
    // onafgevangen een QuotaExceededError gooit, crasht de hele testflow op
    // het moment dat de opslag vol raakt in plaats van gewoon door te gaan.
    const fullStorage = createMockLocalStorage({ quotaBytes: 10 });
    (globalThis as unknown as { window: unknown }).window = { localStorage: fullStorage };
    const answers: ArcanaAnswerMap = {
      q1: { type: 'likert', questionId: 'q1', value: 7 },
    };
    expect(() => saveAnswers(answers)).not.toThrow();
  });

  it('saveResult gooit niet onafgevangen door bij een volle opslag', () => {
    const fullStorage = createMockLocalStorage({ quotaBytes: 5 });
    (globalThis as unknown as { window: unknown }).window = { localStorage: fullStorage };
    const fakeReport = { sections: [], meta: { profile: { name: '' } } } as unknown as ArcanaReport;
    expect(() => saveResult(fakeReport)).not.toThrow();
  });

  it('laat andere sleutels intact wanneer één specifieke write faalt door quota', () => {
    const fullStorage = createMockLocalStorage({ quotaBytes: 200 });
    (globalThis as unknown as { window: unknown }).window = { localStorage: fullStorage };
    const profile: ArcanaProfile = { name: 'Noor', addressForm: 'je', lifePhase: 'van25tot40' };
    saveProfile(profile);
    // Deze write is te groot en faalt stil; het profiel hierboven blijft desondanks leesbaar.
    const hugeAnswers: ArcanaAnswerMap = {};
    for (let i = 0; i < 500; i += 1) {
      hugeAnswers[`q${i}`] = { type: 'likert', questionId: `q${i}`, value: 4 };
    }
    expect(() => saveAnswers(hugeAnswers)).not.toThrow();
    expect(loadProfile()).toEqual(profile);
  });
});

describe('arcanaStorage — ontbrekend of leeg profiel', () => {
  it('geeft het default profiel terug wanneer er nog nooit iets is opgeslagen', () => {
    expect(loadProfile()).toEqual(DEFAULT_PROFILE);
    expect(loadAnswers()).toEqual({});
    expect(loadResult()).toBeNull();
    expect(loadCurrentQuestionIndex()).toBe(0);
  });

  it('hasInProgressTest is false zonder antwoorden, ook al ligt er toevallig een oud resultaat', () => {
    const fakeReport = { sections: [], meta: { profile: { name: '' } } } as unknown as ArcanaReport;
    saveResult(fakeReport);
    expect(hasInProgressTest()).toBe(false);
  });

  it('hasInProgressTest is true met antwoorden maar zonder resultaat', () => {
    saveAnswers({ q1: { type: 'likert', questionId: 'q1', value: 4 } });
    expect(hasInProgressTest()).toBe(true);
  });

  it('hasInProgressTest is false zodra er een resultaat is opgeslagen, ook met antwoorden', () => {
    saveAnswers({ q1: { type: 'likert', questionId: 'q1', value: 4 } });
    const fakeReport = { sections: [], meta: { profile: { name: '' } } } as unknown as ArcanaReport;
    saveResult(fakeReport);
    expect(hasInProgressTest()).toBe(false);
  });
});

describe('arcanaStorage — wissen', () => {
  it('clearArcanaStorage verwijdert antwoorden, resultaat, profiel en voortgang tegelijk', () => {
    saveAnswers({ q1: { type: 'likert', questionId: 'q1', value: 4 } });
    saveCurrentQuestionIndex(12);
    saveProfile({ name: 'Sam', addressForm: 'u', lifePhase: 'vanaf55' });
    const fakeReport = { sections: [], meta: { profile: { name: '' } } } as unknown as ArcanaReport;
    saveResult(fakeReport);

    clearArcanaStorage();

    expect(loadAnswers()).toEqual({});
    expect(loadResult()).toBeNull();
    expect(loadProfile()).toEqual(DEFAULT_PROFILE);
    expect(loadCurrentQuestionIndex()).toBe(0);
  });
});
