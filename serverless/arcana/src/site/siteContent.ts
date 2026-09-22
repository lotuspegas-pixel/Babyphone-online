/**
 * Alle teksten van de publieke website op één plek. De testflow zelf haalt
 * zijn teksten uit de rapportdata; dit bestand gaat alleen over de pagina's
 * eromheen (landing, privacy, voorwaarden).
 *
 * Alle cijfers hieronder zijn gemeten aan de echte testdata en rapportuitvoer,
 * niet geschat — zie SITE_STATS. Bij wijziging van het vragenbestand of de
 * rapportgenerator moeten deze mee.
 */

export const SITE_NAME = 'Arcana Profile';

/** Gemeten aan de echte data; zie docs/arcana/PROJECT_STATUS.md. */
export const SITE_STATS = {
  vragen: 120,
  vraagsoorten: 4,
  subdimensies: 30,
  hoofddimensies: 12,
  archetypen: 12,
  stressArchetypen: 6,
  spanningsvelden: 10,
  hoofdstukken: 33,
  /** Gemeten spreiding 5.668–6.012 woorden over zes verschillende invulprofielen. */
  woordenOngeveer: '5.500+',
  minuten: '20–25',
} as const;

export const HERO = {
  eyebrow: 'Zelfinzicht zonder hokjes',
  titelRegels: ['Arcana', 'Profile'],
  belofte:
    'Beantwoord 120 vragen en lees terug wat je patronen zijn: waar je kracht zit, waar je jezelf in de weg staat, en wat dat betekent voor je werk, je relaties en de keuze waar je nu voor staat.',
  cta: 'Start de test',
  ctaMeta: `${SITE_STATS.vragen} vragen · ${SITE_STATS.minuten} minuten · gratis`,
  vertrouwen: [
    'Je antwoorden blijven op je eigen apparaat',
    'Geen account nodig',
    'Direct je volledige rapport',
  ],
} as const;

export const STATS_STRIP = [
  { getal: String(SITE_STATS.vragen), label: 'vragen in vier vraagsoorten' },
  { getal: String(SITE_STATS.hoofdstukken), label: 'hoofdstukken in je rapport' },
  { getal: SITE_STATS.woordenOngeveer, label: 'woorden, volledig over jou' },
  { getal: String(SITE_STATS.hoofddimensies), label: 'dimensies die gemeten worden' },
] as const;

export interface Voordeel {
  titel: string;
  tekst: string;
}

/**
 * De onderscheidende punten. Elk punt is een eigenschap die daadwerkelijk in
 * de code zit — geen marketingbelofte die het product niet waarmaakt.
 */
export const VOORDELEN: Voordeel[] = [
  {
    titel: 'Elke zin komt uit een score',
    tekst:
      'Geen algemene uitspraken die op iedereen passen. Elke zin in je rapport is gekoppeld aan een gemeten score op een specifieke eigenschap. Staat er iets over je conflictstijl, dan staat het cijfer erbij waar het uit volgt.',
  },
  {
    titel: 'Dezelfde antwoorden geven hetzelfde rapport',
    tekst:
      'Er zit geen taalmodel in dat elke keer iets anders verzint. De test rekent, en die berekening ligt vast. Doe je hem over een jaar opnieuw met dezelfde antwoorden, dan krijg je hetzelfde resultaat terug.',
  },
  {
    titel: 'Ook de kant die je liever niet leest',
    tekst:
      'De meeste tests vertellen je vooral wat je goed doet. Hier staat er ook in waar je kracht doorslaat, wat je vermijdt, en wat mensen om je heen merken zonder het te zeggen. Eerlijk, maar niet hard.',
  },
  {
    titel: 'Vier vraagsoorten, geen eindeloze eens-of-oneens',
    tekst:
      'Naast stellingen krijg je keuzes tussen twee dingen die allebei kloppen, situaties waarin je moet kiezen, en rangschikkingen. Dat vangt nuance die een enkele schaal mist.',
  },
  {
    titel: 'Je gegevens gaan nergens heen',
    tekst:
      'Er is geen server en geen account. Je antwoorden en je rapport staan in de opslag van je eigen browser. Wis je je browsergegevens, dan is het weg — ook voor ons.',
  },
  {
    titel: 'Van jou, om te bewaren',
    tekst:
      'Download je rapport als PDF of tekstbestand, print het, of neem het mee naar een gesprek met je coach of therapeut. Het is jouw document.',
  },
];

export interface Stap {
  nummer: string;
  titel: string;
  tekst: string;
}

export const HOE_HET_WERKT: Stap[] = [
  {
    nummer: '01',
    titel: 'Je beantwoordt 120 vragen',
    tekst:
      'Stellingen, keuzes, situaties en rangschikkingen. De volgende vraag verschijnt vanzelf zodra je antwoordt — je hoeft nergens op te klikken.',
  },
  {
    nummer: '02',
    titel: 'Elk antwoord telt mee op 30 eigenschappen',
    tekst:
      'Eén vraag raakt meestal meerdere eigenschappen, elk met een eigen gewicht. Zo ontstaat een score op 30 subdimensies, van behoefte aan controle tot gevoeligheid voor kritiek.',
  },
  {
    nummer: '03',
    titel: 'Die 30 worden 12 hoofddimensies',
    tekst:
      'De subdimensies worden samengevoegd tot twaalf hoofdlijnen: je innerlijke motor, je denkstijl, je conflictstijl, je schaduwkant, en acht andere.',
  },
  {
    nummer: '04',
    titel: 'Je patroon krijgt een naam en een verhaal',
    tekst:
      'Uit die twaalf volgt welk archetype het sterkst naar voren komt, hoe je onder druk verandert, en welke spanningsvelden er in je spelen. Dat wordt je rapport.',
  },
];

export const DIMENSIES = [
  { naam: 'Innerlijke motor', tekst: 'Welke doelen je energie geven en welke je leegtrekken' },
  { naam: 'Sociale energie', tekst: 'Hoeveel en welk soort contact je oplaadt' },
  { naam: 'Denkstijl', tekst: 'Of je naar het patroon springt of eerst de feiten wilt' },
  { naam: 'Emotionele gevoeligheid', tekst: 'Hoe snel de stemming van een ander de jouwe wordt' },
  { naam: 'Controle en zekerheid', tekst: 'Hoeveel onzekerheid je verdraagt voor je grip zoekt' },
  { naam: 'Conflictstijl', tekst: 'Of je een aanvaring aangaat of eromheen beweegt' },
  { naam: 'Zelfbeeld', tekst: 'Hoeveel bevestiging je nodig hebt om jezelf te vertrouwen' },
  { naam: 'Schaduwkant', tekst: 'Welk deel van jezelf je het liefst niet onder ogen ziet' },
  { naam: 'Relatiepatroon', tekst: 'Hoe snel je iemand toelaat en hoeveel ruimte je daarna houdt' },
  { naam: 'Werkstijl', tekst: 'In wat voor werk je opbloeit in plaats van leegloopt' },
  { naam: 'Stressreactie', tekst: 'Wat je eerste automatische reactie is als de druk oploopt' },
  { naam: 'Groeipad', tekst: 'Hoeveel ruimte je jezelf nu geeft om hiernaar te kijken' },
] as const;

export const RAPPORT_GROEPEN = [
  {
    titel: 'Wie je bent',
    tekst: 'Je kernpatroon, wat anderen als eerste zien, en wat daaronder zit.',
  },
  {
    titel: 'Jij en anderen',
    tekst: 'Hoe je bent in gezelschap, op werk, in je vertrouwde kring en in relaties.',
  },
  {
    titel: 'Onder druk en in je kracht',
    tekst: 'Je sterke punten, je valkuilen, je stresspatroon en je blinde vlekken.',
  },
  {
    titel: 'Groeien',
    tekst: 'De rijpere versie van je patroon, en wat daarvoor nodig is.',
  },
  {
    titel: 'Acht beschouwingen',
    tekst: 'Over liefde, verdriet, pijn, intuïtie, tegenslag, geluk, haat en blijdschap.',
  },
  {
    titel: 'Je actieplan',
    tekst: 'Vier weken met één concrete stap per week, en je samenvatting in één zin.',
  },
] as const;

export interface Doelgroep {
  titel: string;
  tekst: string;
}

export const VOOR_WIE: Doelgroep[] = [
  {
    titel: 'Je staat voor een keuze',
    tekst:
      'Een andere baan, een relatie die schuurt, een verhuizing. Het helpt om eerst te weten welke behoefte er onder je twijfel zit voordat je kiest.',
  },
  {
    titel: 'Je herkent een patroon maar kunt het niet benoemen',
    tekst:
      'Steeds dezelfde botsing, steeds hetzelfde moment waarop je afhaakt. Dit geeft er taal aan, inclusief wat het je oplevert om het in stand te houden.',
  },
  {
    titel: 'Je werkt aan jezelf, met of zonder begeleiding',
    tekst:
      'Neem je rapport mee naar je coach of therapeut. Het is geschreven om samen te lezen, met concrete aanknopingspunten in plaats van vage typeringen.',
  },
  {
    titel: 'Je wilt begrepen worden door iemand die dichtbij staat',
    tekst:
      'Er zit een hoofdstuk in dat geschreven is om door te geven: hoe je bedoeld wordt, en wat mensen makkelijk verkeerd lezen aan jou.',
  },
];

export interface FaqItem {
  vraag: string;
  antwoord: string;
}

export const FAQ: FaqItem[] = [
  {
    vraag: 'Hoe lang duurt de test?',
    antwoord:
      'Ongeveer 20 tot 25 minuten voor 120 vragen. Je kunt tussendoor pauzeren: je voortgang blijft bewaard in je browser, dus je kunt later verder waar je gebleven was.',
  },
  {
    vraag: 'Wat kost het?',
    antwoord:
      'Niets. Je krijgt het volledige rapport van alle 33 hoofdstukken, zonder betaalmuur en zonder account.',
  },
  {
    vraag: 'Wat gebeurt er met mijn antwoorden?',
    antwoord:
      'Die blijven in de opslag van je eigen browser staan. Er is geen server waar ze naartoe gaan en geen account waarin ze bewaard worden. Wis je je browsergegevens of klik je op "Antwoorden wissen", dan zijn ze definitief weg.',
  },
  {
    vraag: 'Is dit wetenschappelijk gevalideerd?',
    antwoord:
      'Nee, en dat zeggen we liever eerlijk. Dit is een reflectie-instrument, geen gevalideerde psychologische test. De vragen en berekeningen zijn zorgvuldig opgebouwd en volledig herleidbaar, maar er is geen normgroep en geen validatiestudie. Gebruik het als spiegel, niet als bewijs.',
  },
  {
    vraag: 'Is dit hetzelfde als MBTI, DISC of Insights?',
    antwoord:
      'Nee. Die systemen delen je in bij een vast type. Hier wordt per eigenschap een score berekend, en het archetype is niet meer dan een samenvattende leeswijzer daarover. Waar het archetype en je eigen score elkaar tegenspreken, zegt het rapport expliciet dat je score voorgaat.',
  },
  {
    vraag: 'Kan ik dit gebruiken om iemand aan te nemen of te beoordelen?',
    antwoord:
      'Nee. Het is niet gemaakt of getoetst voor selectie, beoordeling of welke beslissing over iemand anders dan ook. Gebruik het alleen voor jezelf, of samen met iemand die er vrijwillig aan meedoet.',
  },
  {
    vraag: 'Krijg ik hetzelfde rapport als iemand anders met dezelfde uitslag?',
    antwoord:
      'Niet helemaal. De teksten kennen meerdere gelijkwaardige formuleringen, en welke je krijgt hangt af van je specifieke antwoordenpatroon — niet alleen van je scores. Twee mensen met vergelijkbare uitslagen lezen dus niet hetzelfde stuk tekst.',
  },
  {
    vraag: 'Kan ik mijn rapport bewaren?',
    antwoord:
      'Ja. Je kunt het opslaan als PDF, printen, of downloaden als tekstbestand. Doe dat ook als je het wilt houden — het staat verder alleen in deze browser.',
  },
];

export const EERLIJK = {
  titel: 'Wat dit niet is',
  punten: [
    'Geen medische of psychologische diagnose. Herken je iets zwaars, bespreek dat met je huisarts of een behandelaar.',
    'Geen selectie- of beoordelingsinstrument. Niet gemaakt om anderen mee te meten.',
    'Geen wetenschappelijk gevalideerde test. Zorgvuldig opgebouwd en herleidbaar, maar zonder normgroep of validatiestudie.',
    'Geen voorspelling. Het beschrijft patronen die uit je antwoorden volgen, geen toekomst en geen vaststaand karakter.',
  ],
} as const;

export const SLOT_CTA = {
  titel: 'Klaar om te lezen wat je al vermoedde?',
  tekst:
    'Twintig minuten, 120 vragen, en een rapport dat je kunt bewaren. Je hebt er geen account voor nodig en je antwoorden blijven van jou.',
  cta: 'Start de test',
} as const;
