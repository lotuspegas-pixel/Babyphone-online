/**
 * Alle teksten van de publieke website op één plek. De testflow zelf haalt
 * zijn teksten uit de rapportdata; dit bestand gaat alleen over de pagina's
 * eromheen (landing, privacy, voorwaarden).
 *
 * Alle cijfers hieronder zijn gemeten aan de echte testdata en rapportuitvoer,
 * niet geschat — zie SITE_STATS. Bij wijziging van het vragenbestand of de
 * rapportgenerator moeten deze mee.
 *
 * De copy volgt docs/rebuild/E-usp-en-landing.md §4 (herovariant A, gekozen
 * door de eigenaar) en §5, met de herschrijvingen uit C-tekst-en-rapport.md §4.
 * Waar de documenten en de code elkaar tegenspraken, wint de code; dat staat
 * dan bij de regel.
 */

import type { MainDimensionId } from '../types/arcana';

export const SITE_NAME = 'Arcana Profile';

/** Gemeten aan de echte data; zie docs/arcana/PROJECT_STATUS.md. */
export const SITE_STATS = {
  vragen: 120,
  vraagsoorten: 4,
  /** De eerste 72 vragen zijn stellingen; daarna 48 keuzes, situaties en rijtjes. */
  stellingen: 72,
  subdimensies: 30,
  hoofddimensies: 12,
  archetypen: 12,
  stressArchetypen: 6,
  spanningsvelden: 10,
  hoofdstukken: 33,
  /** Gemeten over de twaalf gouden fixtures: 5.852–6.607 woorden (G §3, tegenspraak 1). */
  woordenOngeveer: '5.700+',
  minuten: '20–25',
} as const;

export const HERO = {
  titelRegels: ['De meeste mensen kennen hun patroon.', 'Bijna niemand kan het benoemen.'],
  belofte:
    'Beantwoord 120 vragen en lees terug wat er steeds gebeurt: waar je kracht doorslaat, op welk moment je afhaakt, en waarom dat telkens hetzelfde moment is. Bij elke uitspraak over jou staat het cijfer waar hij uit volgt.',
  cta: 'Begin met de 120 vragen',
  ctaMeta: `${SITE_STATS.vragen} vragen · ${SITE_STATS.minuten} minuten · gratis · je kunt pauzeren`,
  vertrouwen: [
    'Je antwoorden blijven op je eigen apparaat',
    'Geen account, geen e-mailadres',
    'Geen taalmodel — de test rekent',
  ],
} as const;

/**
 * Direct onder de hero: drie controleerbare beweringen, vóórdat de bezoeker
 * iets heeft moeten geloven (E §5.2, letterlijk C §2 versie 3 met de
 * "volgende week"-correctie uit C §6.2).
 */
export const CONTROLEER = {
  titel: 'Drie dingen die je hier wél kunt controleren',
  punten: [
    {
      id: 'narekenen',
      titel: 'Je kunt het narekenen.',
      tekst:
        'Bij elke uitspraak over jou staat het cijfer waar hij uit volgt. Geen taalmodel dat iets verzint — de test rekent, en dat rekenwerk verandert niet. Doe hem volgende week opnieuw met dezelfde antwoorden en je leest hetzelfde terug. Wijzigen we de berekening, dan staat dat bij je rapport vermeld.',
    },
    {
      id: 'van-jou',
      titel: 'Het blijft van jou.',
      tekst:
        'Er is geen server en geen account. Je antwoorden en je rapport staan in de opslag van je eigen browser. Wij kunnen ze niet inzien, niet herstellen en niet terugsturen.',
    },
    {
      id: 'grenzen',
      titel: 'Het zegt zelf wat het niet weet.',
      tekst:
        'Geen diagnose, geen normgroep, geen validatiestudie, niet bruikbaar om iemand te beoordelen. Dat staat op deze pagina en het staat in je rapport, niet in de kleine lettertjes.',
    },
  ],
  terzijde:
    'Wat dit niet oplost: dat je jezelf beoordeelt. Alle 120 antwoorden komen van jou, dus het rapport meet hoe je jezelf ziet — niet hoe je bent. Dat is minder dan het lijkt, en meer dan je denkt.',
} as const;

/**
 * Het citaatblok op de donkere inktband, vlak na "Drie dingen die je hier
 * wél kunt controleren" (rebuild taak "Fundering", herstijling sept. 2026).
 * Letterlijke, geverifieerde wording — niet vertalen, niet parafraseren,
 * geen tweede citaat toevoegen.
 */
export const JUNG_CITAAT = {
  tekst: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
  auteur: 'C.G. Jung',
} as const;

/**
 * De handgeschreven marginalia en korte lijstjes uit de referentiemap
 * ("Arcana Design Sep 2026"). Alles hier is sfeer: het staat in aria-hidden
 * blokken en bevat bewust geen cijfers, geen beloftes en geen toeschrijving.
 */
export const HERO_NOTES = {
  woorden: ['Mind', 'Patterns', 'Choices', 'Growth', 'Freedom'],
  diepte: 'A deeper you',
  lijst: ['Archetypen', 'Patronen', 'Inzicht', 'Keuzes', 'Groei'],
  kaart: 'The map is not the territory, but it can show you the way.',
} as const;

/** Band "Meer dan een test": de kop is onze eigen regel, níét toegeschreven. */
export const MEER = {
  titel: 'Inzicht is het begin van verandering.',
  tekst:
    'Arcana Profile laat zien hoe je eigenschappen, motivaties, schaduwkanten en denkstijl samenhangen tot één patroon — zodat je bewuster kunt kiezen, leven en groeien.',
  lijst: ['Zelf', 'Relaties', 'Werk', 'Persoonlijke groei', 'Balans', 'Vrijheid'],
  noot: 'Same patterns. Different choices.',
} as const;

interface Lens {
  id: 'persona' | 'schaduw' | 'denkstijl';
  titel: string;
  tekst: string;
  noot?: string;
  lijst?: readonly string[];
}

/** Persona, schaduw en denkstijl zijn lenzen, geen reeks: dus geen nummers. */
export const LENZEN: Lens[] = [
  { id: 'persona', titel: 'Persona', tekst: 'Hoe je je laat zien aan de wereld.', noot: 'The mask is useful.' },
  { id: 'schaduw', titel: 'Schaduw', tekst: 'Wat je liever niet ziet, maar wel stuurt.', noot: 'What you resist persists.' },
  {
    id: 'denkstijl',
    titel: 'Denkstijl',
    tekst: 'Hoe je informatie verwerkt en beslissingen neemt.',
    lijst: ['Analyse', 'Intuïtie', 'Structuur', 'Creativiteit', 'Patronen'],
  },
];

export const RAPPORT_BAND = {
  titel: `Een diepgaand rapport in ${SITE_STATS.hoofdstukken} hoofdstukken.`,
  cta: 'Bekijk voorbeeldrapport',
} as const;

export const NUT = [
  { icoon: 'kompas', titel: 'Zelfinzicht', tekst: 'Begrijp wie je bent en waarom je doet wat je doet.' },
  { icoon: 'scheut', titel: 'Betere keuzes', tekst: 'Maak keuzes die passen bij je eigen patronen.' },
  { icoon: 'driehoek', titel: 'Persoonlijke groei', tekst: 'Zie waar je patroon je helpt en waar het je beperkt.' },
  { icoon: 'venn', titel: 'Sterkere relaties', tekst: 'Meer begrip voor jezelf en voor de mensen om je heen.' },
  { icoon: 'zon', titel: 'Meer vrijheid', tekst: 'Doe minder op de automatische piloot.' },
] as const;

/** "De methode": geen "wetenschappelijke modellen", geen taalmodel; alleen wat de code doet. */
export const METHODE = {
  titel: 'Psychologie en data, samengebracht in een berekening die je kunt narekenen.',
  tekst:
    'Arcana Profile legt Jungiaanse begrippen — persona, schaduw, spanningsvelden — naast twaalf gemeten dimensies. Er zit geen taalmodel in: dezelfde antwoorden geven altijd hetzelfde rapport.',
  cta: 'Meer over de methode',
  lijst: [
    'Jungiaanse psychologie',
    `${SITE_STATS.hoofddimensies} dimensies`,
    `${SITE_STATS.vragen} vragen`,
    'Patronen',
    'Inzicht',
    'Toepassing',
  ],
  noot: 'Know yourself. Change everything.',
} as const;

/** Naast de vier echte cijfers: geen gebruikersaantal, geen beoordeling, geen getuigenis. */
export const VERTROUWEN = 'Geen account. Geen server. Je antwoorden blijven in je browser.';

export const STATS_STRIP = [
  { getal: String(SITE_STATS.vragen), label: 'vragen in vier vraagsoorten' },
  { getal: String(SITE_STATS.hoofdstukken), label: 'hoofdstukken in je rapport' },
  { getal: SITE_STATS.woordenOngeveer, label: 'woorden, met de cijfers erbij' },
  { getal: String(SITE_STATS.hoofddimensies), label: 'dimensies die gemeten worden' },
] as const;

export interface Voordeel {
  titel: string;
  tekst: string;
}

/**
 * De onderscheidende punten. Elk punt is een eigenschap die daadwerkelijk in
 * de code zit — geen marketingbelofte die het product niet waarmaakt.
 * Kaart 3 en 5 zijn woordelijk onaangeraakt (C §4 rij 15 en 17).
 */
export const VOORDELEN: Voordeel[] = [
  {
    titel: 'Bij elke uitspraak staat het cijfer',
    tekst:
      'Geen algemene typeringen die op iedereen passen. Wat er over jou gezegd wordt, hangt aan een gemeten score op een specifieke eigenschap — en die score staat erbij. Staat er iets over je conflictstijl, dan lees je het getal waar het uit volgt. De acht beschouwingen achteraan zijn de uitzondering: daar zijn de openingen algemeen, en dat staat er per stuk bij.',
  },
  {
    titel: 'Dezelfde antwoorden geven hetzelfde rapport',
    tekst:
      'Er zit geen taalmodel in dat elke keer iets anders verzint. De test rekent, en die berekening ligt vast. Doe je hem volgende week opnieuw met dezelfde antwoorden, dan lees je hetzelfde terug. Wijzigen we de berekening, dan staat dat bij je rapport vermeld.',
  },
  {
    titel: 'Ook de kant die je liever niet leest',
    tekst:
      'De meeste tests vertellen je vooral wat je goed doet. Hier staat er ook in waar je kracht doorslaat, wat je vermijdt, en wat mensen om je heen merken zonder het te zeggen. Eerlijk, maar niet hard.',
  },
  {
    titel: 'Vier vraagsoorten, geen eindeloze eens-of-oneens',
    // C §4 rij 16 schrijft "de eerste zestig"; de vragenbank heeft 72 stellingen
    // vooraan (ARCANA_QUESTIONS). De code wint.
    tekst: `Naast stellingen krijg je keuzes tussen twee dingen die allebei kloppen, situaties waarin je moet kiezen, en rijtjes om op volgorde te zetten. Dat vangt nuance die één schaal mist. De eerste ${SITE_STATS.stellingen} gaan het snelst; daarna wordt het afwisselender.`,
  },
  {
    titel: 'Je gegevens gaan nergens heen',
    tekst:
      'Er is geen server en geen account. Je antwoorden en je rapport staan in de opslag van je eigen browser. Wis je je browsergegevens, dan is het weg — ook voor ons.',
  },
  {
    titel: 'Van jou, om te bewaren — en om één pagina van door te geven',
    tekst:
      'Download je rapport als PDF of tekstbestand, print het, of neem het mee naar een gesprek met je coach of therapeut. Eén hoofdstuk is geschreven om apart door te sturen naar iemand die dichtbij staat, zonder dat de rest meegaat.',
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
      'Stellingen, keuzes, situaties en rijtjes op volgorde. De volgende vraag verschijnt vanzelf zodra je antwoordt — je hoeft nergens op te klikken. Stoppen mag: je komt terug waar je gebleven was.',
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
      'De subdimensies tellen op tot twaalf hoofdlijnen: je innerlijke motor, je denkstijl, je conflictstijl, je schaduwkant, en acht andere.',
  },
  {
    nummer: '04',
    titel: 'Je patroon krijgt een naam en een verhaal',
    tekst:
      'Uit die twaalf volgt welk archetype het sterkst naar voren komt, hoe je onder druk verandert, en welke spanningsvelden er in je spelen. Die naam is een leeswijzer, geen hokje: waar hij en je eigen ervaring uiteenlopen, zegt je rapport dat je ervaring voorgaat.',
  },
];

/**
 * De omschrijving per hoofddimensie in gewone taal. Naam, familie en kleur
 * komen uit MAIN_DIMENSIONS, zodat de landing en het portret dezelfde bron
 * hebben en de kaarten in dezelfde vier families staan als het beeld.
 * Tekst ongewijzigd (E §5.7: "doe dat niet").
 */
export const DIMENSIE_TEKST: Record<MainDimensionId, string> = {
  innerMotor: 'Welke doelen je energie geven en welke je leegtrekken',
  socialPattern: 'Hoeveel en welk soort contact je oplaadt',
  thinkingStyle: 'Of je naar het patroon springt of eerst de feiten wilt',
  emotionalSensitivityMain: 'Hoe snel de stemming van een ander de jouwe wordt',
  controlAndSecurity: 'Hoeveel onzekerheid je verdraagt voor je grip zoekt',
  conflictStyle: 'Of je een aanvaring aangaat of eromheen beweegt',
  selfImage: 'Hoeveel bevestiging je nodig hebt om jezelf te vertrouwen',
  shadowPattern: 'Welk deel van jezelf je het liefst niet onder ogen ziet',
  relationshipPattern: 'Hoe snel je iemand toelaat en hoeveel ruimte je daarna houdt',
  workStyle: 'In wat voor werk je opbloeit in plaats van leegloopt',
  stressPattern: 'Wat je eerste automatische reactie is als de druk oploopt',
  growthPath: 'Hoeveel ruimte je jezelf nu geeft om hiernaar te kijken',
};

export const RAPPORT = {
  lead: `Geen samenvatting van een alinea, maar een document van ${SITE_STATS.hoofdstukken} hoofdstukken dat je kunt bewaren, printen of meenemen naar een gesprek — en dat begint met één pagina die alles samenvat, voor als je het later terugleest.`,
  groepen: [
    { titel: 'Wie je bent', tekst: 'Je kernpatroon, wat anderen als eerste zien, en wat daaronder zit.' },
    { titel: 'Jij en anderen', tekst: 'Hoe je bent in gezelschap, op werk, in je vertrouwde kring en in relaties.' },
    {
      titel: 'Onder druk en in je kracht',
      tekst: 'Je sterke punten, je valkuilen, je stresspatroon en je blinde vlekken.',
    },
    { titel: 'Groeien', tekst: 'De rijpere versie van je patroon, en wat daarvoor nodig is.' },
    {
      titel: 'Acht beschouwingen',
      tekst: 'Over liefde, verdriet, pijn, intuïtie, tegenslag, geluk, haat en blijdschap.',
    },
    { titel: 'Je actieplan', tekst: 'Vier weken met één concrete stap per week, en je samenvatting in één zin.' },
  ],
  extras: [
    'Je portret: al je twaalf dimensies samen in één getekend beeld',
    'Je vijf sterkste eigenschappen én je vijf grootste valkuilen, met groeisleutel',
    'Je stresspatroon: wie je wordt zodra de druk oploopt',
    'Je spanningsvelden: twee dingen die je allebei wilt en elkaar in de weg zitten',
    'Een hoofdstuk dat geschreven is om door te geven aan iemand die dichtbij staat',
    'Een actieplan van vier weken met één concrete stap per week',
  ],
  voorbeeldBijschrift: 'Dit is een voorbeeld, geen echte uitslag. Je eigen portret staat bovenaan je rapport.',
} as const;

/**
 * Verzonnen maar plausibele scores voor het voorbeeldportret op de landing:
 * uitgesproken genoeg om te laten zien wat het beeld doet, niet vleiend
 * (een lage conflictstijl en sociale energie, een hoge controlebehoefte).
 * De hoogste score krijgt het open ringetje, precies zoals in het echte
 * rapport. Het archetype is er een uit de echte lijst van twaalf.
 */
export const PORTRET_VOORBEELD = {
  archetypeName: 'The Strategist',
  archetypeScore: 71,
  scores: {
    innerMotor: 74,
    thinkingStyle: 81,
    workStyle: 66,
    socialPattern: 42,
    emotionalSensitivityMain: 58,
    relationshipPattern: 47,
    controlAndSecurity: 77,
    conflictStyle: 39,
    stressPattern: 63,
    selfImage: 55,
    shadowPattern: 61,
    growthPath: 52,
  } satisfies Record<MainDimensionId, number>,
} as const;

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
    antwoord: `Ongeveer 20 tot 25 minuten voor 120 vragen. De eerste ${SITE_STATS.stellingen} zijn korte stellingen en gaan het snelst; de laatste ${SITE_STATS.vragen - SITE_STATS.stellingen} zijn afwisselender en kosten iets meer denkwerk. Je kunt tussendoor pauzeren: je voortgang blijft bewaard in je browser, dus je komt terug waar je gebleven was.`,
  },
  {
    vraag: 'Wat kost het?',
    antwoord: 'Niets. Je krijgt het volledige rapport van alle 33 hoofdstukken, zonder betaalmuur en zonder account.',
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
      'Nee. Die systemen delen je in bij een vast type dat je erbij krijgt. Hier wordt per eigenschap een score berekend en staat die score in je rapport; het archetype is niet meer dan een samenvattende leeswijzer daarover. Waar het archetype en je eigen score elkaar tegenspreken, zegt het rapport expliciet dat je score voorgaat — en waar je score en je eigen ervaring elkaar tegenspreken, gaat je ervaring voor.',
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
      'Ja. Je kunt het opslaan als PDF, printen, of downloaden als tekstbestand. Doe dat ook echt: het staat verder alleen in deze browser, en wij hebben geen kopie. Eén hoofdstuk kun je apart opslaan om door te sturen naar iemand die dichtbij staat.',
  },
  {
    vraag: 'Waarom is dit gratis? Waar verdienen jullie aan?',
    // De slotzin uit E §5.12 ("Verandert dat ooit, dan staat het hier, vóórdat
    // het gebeurt") is een toezegging die de eigenaar moet doen; hij staat er
    // pas als dat besloten is (beslispunt 3 in G).
    antwoord:
      'Nergens aan. Er is geen betaalmuur, geen advertentie, geen nieuwsbrief en geen doorverkoop van gegevens — dat laatste kan ook niet, want er komen geen gegevens bij ons binnen. Dit is gebouwd omdat het gebouwd moest worden.',
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
    'Twintig minuten, 120 vragen, en een rapport waarin bij elke uitspraak het cijfer staat waar hij uit volgt. Stoppen mag onderweg — je komt terug waar je gebleven was.',
  cta: 'Start de test',
} as const;

/** De losse, statische voorbeeldrapport-pagina (taak 12). Echt pad, geen hash-route. */
export const VOORBEELD_URL = '/voorbeeld/';
/** De korte knoptekst voor dezelfde pagina (hero, rapportband, slot-CTA). */
export const VOORBEELD_KORT = 'Bekijk voorbeeldrapport';

/**
 * "Kijk het zelf na" (E §5.9): geen verzonnen bewijs, maar drie dingen die de
 * bezoeker zelf kan controleren vóór hij één vraag beantwoordt. De eerste
 * verwijst naar het voorbeeldrapport, de derde weg voor wie geen 25 minuten heeft.
 */
interface KijkNaBlok {
  titel: string;
  tekst: string;
  cta?: string;
  href?: string;
}

export const KIJK_NA: {
  titel: string;
  lead: string;
  blokken: KijkNaBlok[];
  slotregel: string;
} = {
  titel: 'Je hoeft ons niets te geloven',
  lead: 'Drie dingen die je kunt controleren voordat je één vraag beantwoordt.',
  blokken: [
    {
      titel: 'Lees eerst een heel hoofdstuk',
      tekst:
        'Een volledig voorbeeldrapport, geschreven uit verzonnen antwoorden. Alle 33 hoofdstukken, de cijfers erbij, niets weggelaten. Als het je niets zegt, kost dat je vijf minuten in plaats van vijfentwintig.',
      cta: 'Lees het voorbeeldrapport',
      href: VOORBEELD_URL,
    },
    {
      titel: 'Kijk hoe er gerekend wordt',
      tekst:
        'Alle scores lopen van 0 tot 100, met 50 als midden. Elk antwoord verschuift meerdere scores tegelijk, elk met een eigen gewicht. In je rapport staat per dimensie op hoeveel antwoorden hij steunt, en hoe betrouwbaar dat is — ook wanneer dat weinig is.',
      cta: 'Zo wordt het gerekend',
      href: '#hoe-het-werkt',
    },
    {
      titel: 'Controleer of het hetzelfde blijft',
      tekst:
        'Maak je rapport, bewaar het als tekstbestand, wis je antwoorden en vul dezelfde antwoorden opnieuw in. Je krijgt hetzelfde document terug. Dat is wat "de test rekent" betekent, en het is de enige claim op deze pagina die je binnen een uur zelf kunt falsificeren.',
    },
  ],
  slotregel:
    'We hebben geen bezoekcijfers, geen recensies en geen normgroep om je te laten zien. Wat we wel hebben is een rapport dat je van tevoren mag lezen.',
};

/**
 * De twaalf archetypen om zelf door te lopen (ArchetypeVerkenner.tsx).
 *
 * De toon is hier bewust ontnuchterend: de master-visie zegt dat archetypen
 * alleen een presentatievorm zijn en dat de test mensen niet in hokjes stopt.
 * Dit blok moet dus nieuwsgierig maken zonder te beloven dat je jezelf er nu
 * al in kunt herkennen — je hebt immers nog niets ingevuld.
 */
export const ARCHETYPE_VERKENNER = {
  titel: 'De twaalf namen',
  lead:
    'Een archetype is geen hokje maar een samenvatting: de naam die je rapport geeft aan de vier eigenschappen die bij jou het hoogst uitkomen. Je krijgt er altijd twee, een eerste en een tweede, want vrijwel niemand is maar één ding. Kies er hier een en je ziet waar hij uit wordt opgeteld.',
  keuzeLabel: 'Kies een archetype',
  formuleKop: 'Opgeteld uit',
  naschrift:
    'Herken je jezelf in een naam die je hier leest, dan zegt dat nog niets — deze teksten passen met opzet op veel mensen. Pas als de vier onderliggende scores van jou komen, wordt het een uitspraak over jou.',
} as const;
