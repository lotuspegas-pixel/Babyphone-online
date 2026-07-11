import type { ArcanaAnswerMap, ArcanaReport } from '../types/arcana';

export const STORAGE_KEYS = {
  answers: 'arcana_answers',
  currentQuestion: 'arcana_current_question',
  result: 'arcana_result',
  startedAt: 'arcana_started_at',
  completedAt: 'arcana_completed_at',
} as const;

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
  window.localStorage.setItem(key, JSON.stringify(value));
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
