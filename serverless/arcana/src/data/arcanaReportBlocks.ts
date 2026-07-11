export const PRIVACY_TEXT =
  "Je antwoorden worden standaard alleen in deze browser opgeslagen om je rapport te maken. Verwijder je je browserdata of klik je op 'Antwoorden wissen', dan verdwijnen je antwoorden.";

export const DISCLAIMER_TEXT =
  'Arcana Mirror is bedoeld voor zelfreflectie en persoonlijke ontwikkeling. Het is geen medisch, psychologisch of therapeutisch diagnose-instrument.';

export interface ThirtyDayWeek {
  week: number;
  title: string;
  goal: string;
  task: string;
  reflection: string;
}

/** Static scaffolding; goal/task/reflection get personalized by the report generator. */
export const THIRTY_DAY_WEEK_TITLES: ThirtyDayWeek[] = [
  { week: 1, title: 'Observeren', goal: '', task: '', reflection: '' },
  { week: 2, title: 'Grenzen en patronen herkennen', goal: '', task: '', reflection: '' },
  { week: 3, title: 'Eén nieuw gedrag oefenen', goal: '', task: '', reflection: '' },
  { week: 4, title: 'Nieuwe richting verankeren', goal: '', task: '', reflection: '' },
];

export const CLOSING_SENTENCE_FALLBACK =
  'Jouw groei zit niet in meer worden wie je zou moeten zijn, maar in minder verbergen wie je al bent.';
