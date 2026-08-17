import type { ArcanaAnswerMap, ArcanaProfile, ArcanaReport } from '../types/arcana';

export const STORAGE_KEYS = {
  answers: 'arcana_answers',
  currentQuestion: 'arcana_current_question',
  result: 'arcana_result',
  startedAt: 'arcana_started_at',
  completedAt: 'arcana_completed_at',
  profile: 'arcana_profile',
} as const;

export const DEFAULT_PROFILE: ArcanaProfile = {
  name: '',
  addressForm: 'je',
  lifePhase: 'onbekend',
};

function hasLocalStorage(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

function readJson<T>(key: string): T | null {
  if (!hasLocalStorage()) return null;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage kan een QuotaExceededError gooien (opslag vol) of een
    // SecurityError (bv. privénavigatie in sommige browsers). Zonder deze
    // try/catch gooit saveAnswers() dit onafgevangen door de setAnswers-updater
    // in App.tsx, wat de hele testflow laat crashen en de huidige antwoorden in
    // React-state onbereikbaar maakt. Beter: het schrijven mislukt stil, de
    // antwoorden blijven in memory bruikbaar voor de rest van de sessie, en
    // hervatten na herladen werkt dan voor dit veld niet meer — dat is een
    // kleiner verlies dan een crash.
  }
}

export function loadAnswers(): ArcanaAnswerMap {
  return readJson<ArcanaAnswerMap>(STORAGE_KEYS.answers) ?? {};
}

export function saveAnswers(answers: ArcanaAnswerMap): void {
  writeJson(STORAGE_KEYS.answers, answers);
}

export function loadCurrentQuestionIndex(): number {
  return readJson<number>(STORAGE_KEYS.currentQuestion) ?? 0;
}

export function saveCurrentQuestionIndex(index: number): void {
  writeJson(STORAGE_KEYS.currentQuestion, index);
}

export function loadResult(): ArcanaReport | null {
  return readJson<ArcanaReport>(STORAGE_KEYS.result);
}

export function saveResult(report: ArcanaReport): void {
  writeJson(STORAGE_KEYS.result, report);
}

export function loadProfile(): ArcanaProfile {
  const stored = readJson<Partial<ArcanaProfile>>(STORAGE_KEYS.profile);
  if (!stored) return { ...DEFAULT_PROFILE };
  return {
    name: typeof stored.name === 'string' ? stored.name : DEFAULT_PROFILE.name,
    addressForm: stored.addressForm === 'u' ? 'u' : 'je',
    lifePhase: stored.lifePhase ?? DEFAULT_PROFILE.lifePhase,
  };
}

export function saveProfile(profile: ArcanaProfile): void {
  writeJson(STORAGE_KEYS.profile, profile);
}

export function loadStartedAt(): string | null {
  return readJson<string>(STORAGE_KEYS.startedAt);
}

export function saveStartedAt(iso: string): void {
  writeJson(STORAGE_KEYS.startedAt, iso);
}

export function saveCompletedAt(iso: string): void {
  writeJson(STORAGE_KEYS.completedAt, iso);
}

export function clearArcanaStorage(): void {
  if (!hasLocalStorage()) return;
  for (const key of Object.values(STORAGE_KEYS)) {
    window.localStorage.removeItem(key);
  }
}

export function hasInProgressTest(): boolean {
  const answers = loadAnswers();
  return Object.keys(answers).length > 0 && !loadResult();
}
