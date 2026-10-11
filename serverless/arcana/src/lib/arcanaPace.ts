/**
 * Resttijd van de test, uit het tempo waarmee iemand nú antwoordt.
 *
 * Vroeger werd de tijd sinds `arcana_started_at` door het aantal antwoorden
 * gedeeld. Wie de test pauzeerde en een dag later verderging (of nog een oude
 * starttijd had staan), kreeg "nog ongeveer 145007 minuten": de pauze telde
 * mee als antwoordtijd. Nu telt alleen de tijd per vraag binnen deze sessie, en
 * een vraag waar langer dan MAX_VRAAGTIJD_MS over gedaan is (koffie, telefoon,
 * pauze) telt helemaal niet mee. Er is dus geen opgeslagen tijd meer nodig: een
 * herlaadde pagina begint met het standaardtempo.
 */

/** 25 minuten voor 120 vragen: wat de landing belooft en wat een gemiddelde deelnemer doet. */
export const STANDAARD_MS_PER_VRAAG = 12_500;

/** Langer dan dit op één vraag is een onderbreking, geen denktijd. */
export const MAX_VRAAGTIJD_MS = 90_000;

/** Sneller dan dit is doorklikken, geen lezen: zo'n vraag zegt niets over het tempo. */
export const MIN_VRAAGTIJD_MS = 800;

/** Zoveel metingen in deze sessie voordat het eigen tempo het standaardtempo vervangt. */
export const MIN_METINGEN = 3;

/** Het tempo blijft binnen deze grenzen, zodat één vreemde reeks de teller niet laat ontsporen. */
const ONDERGRENS_MS = 4_000;
const BOVENGRENS_MS = 45_000;

export interface PaceState {
  /** Welke vraag er nu getoond wordt. */
  index: number;
  /** Sinds wanneer die vraag getoond wordt (ms, Date.now). */
  sinds: number;
  /** Opgetelde tijd van de meegetelde vragen (ms). */
  totaalMs: number;
  /** Aantal meegetelde vragen. */
  metingen: number;
}

export function beginPace(index: number, now: number): PaceState {
  return { index, sinds: now, totaalMs: 0, metingen: 0 };
}

/**
 * Verwerkt een bladwissel. Alleen een stap vooruit met precies één vraag erbij
 * levert een meting op; terugbladeren of een sprong verplaatst alleen het
 * ijkpunt.
 */
export function registreerWissel(state: PaceState, index: number, now: number): PaceState {
  if (index === state.index) return state;
  const duur = now - state.sinds;
  const meetellen = index === state.index + 1 && duur >= MIN_VRAAGTIJD_MS && duur <= MAX_VRAAGTIJD_MS;
  return {
    index,
    sinds: now,
    totaalMs: meetellen ? state.totaalMs + duur : state.totaalMs,
    metingen: meetellen ? state.metingen + 1 : state.metingen,
  };
}

export function msPerVraag(state: PaceState): number {
  const eigen = state.metingen >= MIN_METINGEN ? state.totaalMs / state.metingen : STANDAARD_MS_PER_VRAAG;
  return Math.min(BOVENGRENS_MS, Math.max(ONDERGRENS_MS, eigen));
}

/** Resterende minuten, of undefined als er niets meer te doen is. Altijd een eindig, positief getal. */
export function resterendeMinuten(state: PaceState, beantwoord: number, totaal: number): number | undefined {
  const rest = totaal - beantwoord;
  if (rest <= 0) return undefined;
  return Math.max(1, Math.round((msPerVraag(state) * rest) / 60_000));
}
