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

/**
 * Eén zinsdeel per hoofddimensie dat concreet maakt wát een hoge score daar
 * betekent, los van de naam en het cijfer zelf. Gebruikt in de bullets bij
 * "Jouw kernpatroon" zodat die iets toevoegen aan wat de alinea al zegt,
 * in plaats van naam en score te herhalen.
 */
export const MAIN_DIMENSION_GLOSS: Record<string, string> = {
  innerMotor: 'dit stuurt welke doelen je energie geven en welke je uitputten',
  socialPattern: 'dit bepaalt hoeveel en welk soort contact je oplaadt in plaats van leegtrekt',
  thinkingStyle: 'dit bepaalt of je sneller naar het patroon springt of eerst de feiten op een rij wilt hebben',
  emotionalSensitivityMain: 'dit bepaalt hoe snel de stemming van een ander ook jouw stemming wordt',
  controlAndSecurity: 'dit bepaalt hoeveel onzekerheid je verdraagt voordat je naar houvast grijpt',
  conflictStyle: 'dit bepaalt of je een aanvaring aangaat of er liever omheen beweegt',
  selfImage: 'dit bepaalt hoeveel bevestiging van buitenaf je nodig hebt om jezelf te vertrouwen',
  shadowPattern: 'dit bepaalt welk deel van jezelf je het liefst niet onder ogen ziet',
  relationshipPattern: 'dit bepaalt hoe snel je iemand toelaat en hoeveel ruimte je daarna nog nodig hebt',
  workStyle: 'dit bepaalt in wat voor omgeving werk je energie geeft in plaats van kost',
  stressPattern: 'dit bepaalt wat je eerste, automatische reactie is zodra de druk oploopt',
  growthPath: 'dit bepaalt hoeveel ruimte je jezelf momenteel geeft om naar deze patronen te kijken',
};
