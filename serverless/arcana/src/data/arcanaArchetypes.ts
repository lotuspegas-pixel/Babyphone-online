import type { ArchetypeId, StressArchetypeId, SubDimensionId } from '../types/arcana';

export interface ArchetypeDefinition {
  id: ArchetypeId;
  name: string;
  formula: SubDimensionId[];
  baseText: string;
}

export const ARCHETYPES: ArchetypeDefinition[] = [
  {
    id: 'theSeeker',
    name: 'The Seeker',
    formula: ['meaningNeed', 'intuitiveThinking', 'autonomyNeed', 'growthReadiness'],
    baseText:
      'Jij lijkt iemand die niet genoeg heeft aan simpelweg functioneren. Je zoekt betekenis, richting en een gevoel dat wat je doet ergens over gaat. Wanneer je leven te oppervlakkig wordt, zakt je energie. Je kracht zit in vragen stellen die anderen vermijden. Je valkuil is dat je zo lang naar de juiste richting zoekt dat je soms vergeet een richting te kiezen.',
  },
  {
    id: 'theArchitect',
    name: 'The Architect',
    formula: ['controlNeed', 'analyticalThinking', 'securityNeed', 'practicalThinking'],
    baseText:
      'Jij brengt rust door structuur. Je ziet waar dingen wankel zijn en probeert systemen te bouwen die standhouden. Mensen kunnen op je vertrouwen wanneer iets overzicht nodig heeft. Je valkuil is dat je soms te veel zekerheid zoekt voordat je beweegt.',
  },
  {
    id: 'theMirror',
    name: 'The Mirror',
    formula: ['emotionalSensitivity', 'intuitiveThinking', 'connectionNeed', 'intimacyNeed'],
    baseText:
      'Jij voelt vaak meer dan je zegt. Je merkt subtiele signalen, ondertonen en verschuivingen in mensen. Daardoor kun je anderen diep begrijpen. Je valkuil is dat je soms emoties van anderen draagt alsof ze van jou zijn.',
  },
  {
    id: 'theFlame',
    name: 'The Flame',
    formula: ['socialEnergy', 'recognitionNeed', 'directness', 'selfConfidence'],
    baseText:
      'Jij brengt beweging. Wanneer jij ergens in gelooft, kun je anderen meenemen. Je energie maakt zichtbaar wat stil lag. Je valkuil is dat je onder druk sneller kunt worden dan goed voor je is.',
  },
  {
    id: 'theGuardian',
    name: 'The Guardian',
    formula: ['connectionNeed', 'trustNeed', 'peoplePleasing', 'securityNeed'],
    baseText:
      'Jij bewaakt wat kwetsbaar is. Je voelt verantwoordelijkheid voor mensen, sfeer en veiligheid. Je kracht is trouw. Je valkuil is dat je soms te lang zorgt voor anderen terwijl je eigen grens al overschreden is.',
  },
  {
    id: 'theAlchemist',
    name: 'The Alchemist',
    formula: ['creativeThinking', 'meaningNeed', 'growthReadiness', 'emotionalSensitivity'],
    baseText:
      'Jij kunt chaos omzetten in inzicht. Je ziet niet alleen wat er gebeurt, maar ook wat eruit kan ontstaan. Je kracht zit in transformatie. Je valkuil is dat je soms te lang in complexiteit blijft hangen.',
  },
  {
    id: 'theStrategist',
    name: 'The Strategist',
    formula: ['analyticalThinking', 'intuitiveThinking', 'controlNeed', 'practicalThinking'],
    baseText:
      "Jij ziet patronen, risico's en routes. Je denkt vooruit en begrijpt hoe keuzes elkaar beïnvloeden. Je kracht zit in overzicht. Je valkuil is dat je soms zo veel ziet dat spontaniteit moeilijk wordt.",
  },
  {
    id: 'theWoundedHealer',
    name: 'The Wounded Healer',
    formula: ['emotionalSensitivity', 'criticismSensitivity', 'connectionNeed', 'growthReadiness'],
    baseText:
      'Jij begrijpt pijn omdat je gevoelig bent voor wat mensen vaak verbergen. Je kunt anderen raken met herkenning. Je valkuil is dat je soms te veel verantwoordelijkheid voelt voor herstel dat niet van jou is.',
  },
  {
    id: 'theVisionary',
    name: 'The Visionary',
    formula: ['creativeThinking', 'autonomyNeed', 'intuitiveThinking', 'meaningNeed'],
    baseText:
      'Jij ziet mogelijkheden voordat ze concreet zijn. Je denkt voorbij de huidige vorm. Je kracht zit in verbeelding en richting. Je valkuil is dat uitvoering soms achterblijft bij je ideeën.',
  },
  {
    id: 'theAnchor',
    name: 'The Anchor',
    formula: ['securityNeed', 'practicalThinking', 'trustNeed', 'stressAcceleration'],
    baseText:
      'Jij brengt stabiliteit. Mensen voelen dat jij rustiger wordt wanneer iets duidelijk en echt is. Je kracht zit in betrouwbaarheid. Je valkuil is dat je verandering soms pas toelaat wanneer het bijna niet anders kan.',
  },
  {
    id: 'thePerformer',
    name: 'The Performer',
    formula: ['recognitionNeed', 'socialEnergy', 'selfConfidence', 'directness'],
    baseText:
      'Jij wilt impact maken. Niet alleen aanwezig zijn, maar iets neerzetten dat gezien wordt. Je kracht zit in expressie. Je valkuil is dat erkenning soms ongemerkt invloed krijgt op je keuzes.',
  },
  {
    id: 'theHermit',
    name: 'The Hermit',
    formula: ['solitudeNeed', 'intuitiveThinking', 'meaningNeed', 'independenceNeed'],
    baseText:
      'Jij hebt een rijke binnenwereld. Stilte is voor jou geen leegte, maar een plek waar dingen op hun plek vallen. Je kracht zit in diepte. Je valkuil is dat anderen soms niet weten wat er in jou leeft.',
  },
];

/** theAnchor uses (100 - stressAcceleration); flag which formula entries are inverted. */
export const ARCHETYPE_INVERTED_TARGETS: Partial<Record<ArchetypeId, SubDimensionId[]>> = {
  theAnchor: ['stressAcceleration'],
};

export interface StressArchetypeDefinition {
  id: StressArchetypeId;
  name: string;
  description: string;
}

export const STRESS_ARCHETYPES: StressArchetypeDefinition[] = [
  { id: 'theController', name: 'The Controller', description: 'grijpt onder druk naar grip en overzicht.' },
  { id: 'theVanisher', name: 'The Vanisher', description: 'trekt zich onder druk terug en wordt stil.' },
  { id: 'theSprinter', name: 'The Sprinter', description: 'versnelt onder druk en doet te veel tegelijk.' },
  { id: 'theFrozenOne', name: 'The Frozen One', description: 'loopt onder druk vast, ook al blijft het hoofd actief.' },
  { id: 'thePleaser', name: 'The Pleaser', description: 'past zich onder druk aan om spanning te vermijden.' },
  { id: 'theDefender', name: 'The Defender', description: 'verdedigt zich onder druk tegen kritiek.' },
];
