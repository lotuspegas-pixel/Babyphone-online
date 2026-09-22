/**
 * Thema: licht, donker of systeem.
 *
 * Drie standen, niet twee — "systeem" is een echte keuze, anders kan iemand die
 * per ongeluk op licht klikte nooit meer terug naar automatisch. De keuze staat
 * in localStorage onder `arcana_theme`, als JSON.stringify net als alle andere
 * sleutels. Hij hoort bewust NIET bij STORAGE_KEYS: "Antwoorden wissen" ruimt
 * persoonsgegevens op, en een leesinstelling is dat niet.
 *
 * Het bootscript in index.html leest dezelfde sleutel vóór de stylesheet, zodat
 * er geen lichte flits is bij het laden. Deze module is de runtime-kant daarvan.
 */

export type ArcanaTheme = 'light' | 'dark' | 'system';

export const THEME_STORAGE_KEY = 'arcana_theme';
export const THEME_CHANGE_EVENT = 'arcana:theme';

const LIGHT_BAR = '#fbf8f3';
const DARK_BAR = '#16130f';

function canUseDom(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function readTheme(): ArcanaTheme {
  if (!canUseDom()) return 'system';
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return parsed === 'light' || parsed === 'dark' ? parsed : 'system';
  } catch {
    return 'system';
  }
}

/** De stand die werkelijk op het scherm staat, na toepassing van "systeem". */
export function resolveTheme(theme: ArcanaTheme = readTheme()): 'light' | 'dark' {
  if (theme !== 'system') return theme;
  if (!canUseDom() || typeof window.matchMedia !== 'function') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Zet het thema op het document en houdt de adresbalkkleur op mobiel in de pas. */
export function applyTheme(theme: ArcanaTheme): void {
  if (!canUseDom()) return;
  const root = document.documentElement;
  if (theme === 'system') delete root.dataset.theme;
  else root.dataset.theme = theme;

  const bar = resolveTheme(theme) === 'dark' ? DARK_BAR : LIGHT_BAR;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    // Eén meta zonder media-attribuut volgt de handmatige keuze; de twee met
    // media blijven het systeem volgen en hebben geen aanpassing nodig.
    if (!meta.hasAttribute('media')) meta.setAttribute('content', bar);
  });

  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
}

export function saveTheme(theme: ArcanaTheme): void {
  if (!canUseDom()) return;
  try {
    if (theme === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch {
    // Privévenster met geblokkeerde opslag: de keuze geldt dan voor deze sessie.
  }
  applyTheme(theme);
}

/**
 * Roept `callback` aan zodra het thema verandert: door een handmatige keuze
 * óf doordat het systeem wisselt terwijl de stand op "systeem" staat.
 * Gebruikt door alles wat zijn kleuren buiten CSS om leest, zoals het portret.
 */
export function subscribeTheme(callback: () => void): () => void {
  if (!canUseDom()) return () => {};
  const mq = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const onSystem = () => {
    if (readTheme() === 'system') callback();
  };
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  mq?.addEventListener('change', onSystem);
  // Ook reageren als iets anders dan deze module het attribuut zet (devtools,
  // een test, later code): dan blijft het portret nooit in het verkeerde thema.
  const observer =
    typeof MutationObserver === 'function'
      ? new MutationObserver(() => {
          callback();
        })
      : null;
  observer?.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    mq?.removeEventListener('change', onSystem);
    observer?.disconnect();
  };
}
