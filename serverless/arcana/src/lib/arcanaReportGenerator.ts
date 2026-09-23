import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import { ARCHETYPE_CONTENT, STRESS_ARCHETYPE_CONTENT } from '../data/arcanaArchetypeContent';
import { SUB_DIMENSION_IDS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import {
  CLOSING_SENTENCE_FALLBACK,
  GROWTH_MEANING_NOTE,
  MAIN_DIMENSION_GLOSS,
  SHADOW_NOT_FAILURE_NOTE,
} from '../data/arcanaReportBlocks';
import { REFLECTION_THEMES, type ReflectionRule, type ReflectionTheme } from '../data/arcanaReflections';
import { SECTION_PHRASINGS } from '../data/arcanaSectionPhrasings';
import { TRAIT_CONTENT, type TraitContent } from '../data/arcanaTraitContent';
import { scoreBand } from './arcanaScoringEngine';
import { pick } from './arcanaVariants';
import { applyVoice, displayName } from './arcanaVoice';
import type {
  ArcanaProfile,
  ArcanaReport,
  ArcanaReportSection,
  ArcanaScoreResult,
  ArchetypeId,
  LifePhase,
  SubDimensionId,
  SubDimensionScore,
} from '../types/arcana';

// 2.1.0 → 2.2.0: afsluiters per hoofdstuktype (C §3.3) en de u-vorm-fixes.
// Alleen tekst toegevoegd/hersteld, geen sectie hernoemd of verwijderd — een
// oudere `arcana_result` blijft dus renderbaar, hij toont alleen de nieuwe
// afsluiters niet totdat het rapport opnieuw wordt gegenereerd.
const REPORT_VERSION = '2.3.0';

/** Subdimensies die, wanneer ze hoog uitvallen, schaduw- en valkuilmateriaal zijn. */
const RISK_DIMENSIONS: SubDimensionId[] = [
  'selfDoubt',
  'shadowAvoidance',
  'shadowDefensiveness',
  'perfectionism',
  'peoplePleasing',
  'conflictAvoidance',
  'criticismSensitivity',
  'stressWithdrawal',
  'stressControl',
  'stressAcceleration',
  'stressFreeze',
  'controlNeed',
];

/** Subdimensies die doorgaans zichtbaar zijn voor anderen. */
const VISIBLE_DIMENSIONS: SubDimensionId[] = [
  'directness',
  'socialEnergy',
  'recognitionNeed',
  'connectionNeed',
  'selfConfidence',
  'creativeThinking',
  'practicalThinking',
];

/** Subdimensies die doorgaans onder de oppervlakte blijven. */
const HIDDEN_DIMENSIONS: SubDimensionId[] = [
  'selfDoubt',
  'emotionalSensitivity',
  'shadowAvoidance',
  'stressWithdrawal',
  'criticismSensitivity',
  'trustNeed',
  'intimacyNeed',
];

/** Subdimensies die het sterkst bepalen hoe iemand alleen is. */
const SOLO_DIMENSIONS: SubDimensionId[] = [
  'solitudeNeed',
  'analyticalThinking',
  'creativeThinking',
  'selfDoubt',
  'meaningNeed',
  'intuitiveThinking',
  'shadowAvoidance',
];

/** Subdimensies die het sterkst bepalen hoe iemand in gezelschap is. */
const SOCIAL_DIMENSIONS: SubDimensionId[] = [
  'socialEnergy',
  'connectionNeed',
  'directness',
  'peoplePleasing',
  'conflictAvoidance',
  'emotionalSensitivity',
  'trustNeed',
];

/** Subdimensies die het sterkst bepalen hoe iemand op werk functioneert. */
const WORK_DIMENSIONS: SubDimensionId[] = [
  'practicalThinking',
  'analyticalThinking',
  'creativeThinking',
  'controlNeed',
  'perfectionism',
  'meaningNeed',
  'autonomyNeed',
];

/** Subdimensies die het sterkst bepalen hoe iemand in vertrouwde kring is. */
const CLOSE_CIRCLE_DIMENSIONS: SubDimensionId[] = [
  'connectionNeed',
  'trustNeed',
  'intimacyNeed',
  'peoplePleasing',
  'independenceNeed',
  'conflictAvoidance',
  'emotionalSensitivity',
];

function archetypeById(id: ArchetypeId) {
  const found = ARCHETYPES.find((a) => a.id === id);
  if (!found) throw new Error(`Unknown archetype ${id}`);
  return found;
}

/** Subdimensies die elkaar inhoudelijk uitsluiten; nodig om verwachtingen af te leiden. */
const OPPOSITES: Partial<Record<SubDimensionId, SubDimensionId>> = {
  solitudeNeed: 'socialEnergy',
  socialEnergy: 'solitudeNeed',
  connectionNeed: 'independenceNeed',
  independenceNeed: 'connectionNeed',
  directness: 'conflictAvoidance',
  conflictAvoidance: 'directness',
  selfConfidence: 'selfDoubt',
  selfDoubt: 'selfConfidence',
};

type Expectation = 'hoog' | 'laag' | 'neutraal';

/**
 * Wat het archetype op deze subdimensie doet verwachten. Afgeleid uit de
 * scoreformule: zit de dimensie erin, dan verwacht het archetype een hoge score;
 * zit haar tegenpool erin, dan een lage.
 */
function expectationFor(archetypeId: ArchetypeId, dim: SubDimensionId): Expectation {
  const formula = archetypeById(archetypeId).formula;
  if (formula.includes(dim)) return 'hoog';
  const opposite = OPPOSITES[dim];
  if (opposite && formula.includes(opposite)) return 'laag';
  return 'neutraal';
}

/**
 * Het algemene archetypeportret kan botsen met een individuele score. In dat geval
 * is de eigen score leidend en benoemen we het verschil expliciet, zodat het rapport
 * geen twee tegengestelde dingen beweert.
 */
function reconciliation(
  archetypeId: ArchetypeId,
  dim: SubDimensionId,
  score: number,
): string | null {
  const expectation = expectationFor(archetypeId, dim);
  const label = TRAIT_CONTENT[dim].label.toLowerCase();
  const name = archetypeById(archetypeId).name;

  if (expectation === 'hoog' && score < 45) {
    return `Let op één afwijking: bij ${name} hoort doorgaans een hoge score op ${label}, maar bij jou valt die met ${score}/100 juist laag uit. Waar het portret hierboven en je eigen score elkaar tegenspreken, is je score leidend — die komt rechtstreeks uit je antwoorden.`;
  }
  if (expectation === 'laag' && score >= 65) {
    return `Let op één afwijking: bij ${name} hoort doorgaans een lage score op ${label}, terwijl die bij jou met ${score}/100 juist hoog uitvalt. Waar het portret hierboven en je eigen score elkaar tegenspreken, is je score leidend — die komt rechtstreeks uit je antwoorden. Deze combinatie is bovendien interessanter dan een zuiver profiel: ze wijst op twee kanten die je allebei bedient.`;
  }
  return null;
}

function topSubDimensions(
  sub: Record<SubDimensionId, SubDimensionScore>,
  pool: SubDimensionId[],
  count: number,
): SubDimensionId[] {
  return pool
    .slice()
    .sort((a, b) => sub[b].score - sub[a].score || pool.indexOf(a) - pool.indexOf(b))
    .slice(0, count);
}

function section(
  id: string,
  title: string,
  intro: string,
  paragraphs: string[],
  bullets: string[] = [],
  outro?: string[],
): ArcanaReportSection {
  return outro && outro.length > 0 ? { id, title, intro, paragraphs, bullets, outro } : { id, title, intro, paragraphs, bullets };
}

/** Een subdimensie met alle formuleringen al gekozen — platte strings. */
type ResolvedTrait = {
  [K in keyof TraitContent]: string;
};

/**
 * Lost één subdimensie op voor dit rapport: velden met meerdere formuleringen
 * krijgen er deterministisch één toegewezen op basis van de antwoorden.
 *
 * `salt` maakt het mogelijk om dezelfde subdimensie in verschillende secties
 * op te halen zonder telkens letterlijk dezelfde formulering te krijgen — een
 * top-subdimensie duikt in meerdere secties op (sterke punten, valkuilen,
 * onder druk, ...), en zonder salt kiest `pick` daar overal dezelfde variant.
 * De zes velden blijven inhoudelijk gelijkwaardig; alleen de bewoording wisselt.
 */
function T(result: ArcanaScoreResult, id: SubDimensionId, salt = ''): ResolvedTrait {
  const t = TRAIT_CONTENT[id];
  const seed = result.variantSeed;
  return {
    label: t.label,
    behavior: pick(t.behavior, seed, `${id}.behavior${salt}`),
    hiddenNeed: pick(t.hiddenNeed, seed, `${id}.hiddenNeed${salt}`),
    effect: pick(t.effect, seed, `${id}.effect${salt}`),
    pitfall: pick(t.pitfall, seed, `${id}.pitfall${salt}`),
    growthKey: pick(t.growthKey, seed, `${id}.growthKey${salt}`),
    alone: t.alone,
    withOthers: t.withOthers,
    atWork: t.atWork,
    closeCircle: t.closeCircle,
    atEase: t.atEase,
    jungian: t.jungian,
  };
}

/** Kiest deterministisch één formulering van een vaste sectietekst. */
function S(result: ArcanaScoreResult, key: string): string {
  const phrasing = SECTION_PHRASINGS[key];
  if (!phrasing) throw new Error(`Onbekende sectietekst "${key}"`);
  return pick(phrasing, result.variantSeed, `section.${key}`);
}

/**
 * Zoals `S()`, maar met een salt. De afsluiters hieronder hergebruiken
 * dezelfde sectietekst-sleutel in tot wel veertien hoofdstukken; zonder salt
 * kiest `pick` daar overal dezelfde variant (zelfde seed, zelfde sleutel) en
 * leest elke afsluiter in het rapport woordelijk hetzelfde. De sectie-id als
 * salt is dezelfde truc als `T()` met zijn `salt`-parameter hierboven.
 */
function Sc(result: ArcanaScoreResult, key: string, salt: string): string {
  const phrasing = SECTION_PHRASINGS[key];
  if (!phrasing) throw new Error(`Onbekende sectietekst "${key}"`);
  return pick(phrasing, result.variantSeed, `section.${key}:${salt}`);
}

/**
 * Afsluiters per hoofdstuktype (C §3.3): één regel die zegt wat de lezer met
 * het hoofdstuk kan, in hetzelfde "label: zin"-patroon dat de bestaande
 * herkomstzin bij "understood-by-others" al gebruikt. Ze komen als losse
 * `outro`-regel na de opsomming, dus de bestaande platte weergave volstaat —
 * er is geen apart kopveld nodig en er verschijnt nergens een letterlijke "**".
 */
function insightCloser(
  result: ArcanaScoreResult,
  salt: string,
  labelA: string,
  scoreA: number,
  labelB: string,
  scoreB: number,
): string {
  return Sc(result, 'closer.insight', salt)
    .replace('{labelA}', labelA)
    .replace('{scoreA}', String(scoreA))
    .replace('{labelB}', labelB)
    .replace('{scoreB}', String(scoreB));
}

/** Insight-afsluiter voor het gangbare geval: twee subdimensies met hun score. */
function insightCloserForDims(result: ArcanaScoreResult, salt: string, a: SubDimensionId, b: SubDimensionId): string {
  return insightCloser(
    result,
    salt,
    TRAIT_CONTENT[a].label,
    result.subDimensions[a].score,
    TRAIT_CONTENT[b].label,
    result.subDimensions[b].score,
  );
}

/** Variant voor de hoofdstukken die letterlijk over "wat anderen van je merken" gaan. */
function aboutOthersCloser(result: ArcanaScoreResult, salt: string): string {
  return Sc(result, 'closer.insight-about-others', salt);
}

/** Voor de zware hoofdstukken naast "Je valkuilen" zelf: dezelfde geruststelling, zonder een aantal te noemen. */
function shadowNoteCloser(result: ArcanaScoreResult, salt: string): string {
  return Sc(result, 'closer.shadow-note', salt);
}

/** Groei-afsluiter; zonder puntenlijst valt de "van de {n} punten"-opening weg. */
function growthCloser(result: ArcanaScoreResult, salt: string, bulletCount: number): string {
  return bulletCount > 0
    ? Sc(result, 'closer.growth', salt).replace('{n}', String(bulletCount))
    : Sc(result, 'closer.growth-no-bullets', salt);
}

/**
 * De velden in TRAIT_CONTENT staan in hoofdzinsvolgorde ("mensen weten precies waar
 * ze aan toe zijn"). Het Nederlands vraagt in een bijzin een andere woordvolgorde,
 * dus zulke fragmenten mogen nooit achter "dat" of "waardoor" geplakt worden. In
 * plaats daarvan zetten we ze als zelfstandige zin neer.
 */
function asSentence(fragment: string): string {
  const trimmed = fragment.trim();
  if (trimmed.length === 0) return '';
  const capitalised = trimmed[0].toUpperCase() + trimmed.slice(1);
  return /[.!?]$/.test(capitalised) ? capitalised : `${capitalised}.`;
}

/** Aanhef met naam wanneer die er is, anders een neutrale opening. */
function addressed(profile: ArcanaProfile, withName: string, withoutName: string): string {
  const name = displayName(profile);
  return name.length > 0 ? withName.replace(/\{naam\}/g, name) : withoutName;
}

const LIFE_PHASE_NOTE: Record<LifePhase, string> = {
  onbekend: '',
  tot25:
    'In deze levensfase is veel van wat je hier leest nog niet vastgelegd. Patronen die nu al sterk uitslaan, zijn vaker aangeleerd dan aangeboren — en dat betekent dat ze ook nog te herzien zijn.',
  van25tot40:
    'Dit is de fase waarin de meeste mensen hun patronen voor het eerst tegenkomen als iets wat hen in de weg zit in plaats van iets wat hen vooruithelpt. Dat is geen achteruitgang; dat is het moment waarop het werk begint.',
  van40tot55:
    'In deze fase levert bijstellen doorgaans het meest op. Je kent je patronen inmiddels goed genoeg om ze te herkennen, en je hebt nog ruim de tijd om er iets anders mee te doen.',
  vanaf55:
    'In deze fase gaat groei zelden nog over veranderen en meestal over verzoenen: minder energie steken in wie je had moeten worden, meer in wie je geworden bent. Dat is geen berusting, dat is opruimen.',
};

// ---------------------------------------------------------------------------
// Secties
// ---------------------------------------------------------------------------

function generateHeroSection(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const primary = archetypeById(result.primaryArchetype);
  const secondary = archetypeById(result.secondaryArchetype);
  const primaryScore = result.archetypeScores[result.primaryArchetype].score;
  const secondaryScore = result.archetypeScores[result.secondaryArchetype].score;
  const gap = primaryScore - secondaryScore;

  const opening = addressed(
    profile,
    `{naam}, op basis van je 120 antwoorden komt ${primary.name} het sterkst naar voren (${primaryScore}/100), met ${secondary.name} als tweede stem (${secondaryScore}/100).`,
    `Op basis van je 120 antwoorden komt ${primary.name} het sterkst naar voren (${primaryScore}/100), met ${secondary.name} als tweede stem (${secondaryScore}/100).`,
  );

  const balance =
    gap <= 3
      ? `Die twee liggen zo dicht bij elkaar dat er geen dominant patroon is. Je wisselt waarschijnlijk per situatie tussen deze twee manieren van zijn — en dat vraagt van je dat je bewust kiest welke stem je op welk moment volgt.`
      : `Waar ${primary.name} de toon zet, kleurt ${secondary.name} de nuances: het eerste zegt vooral wát je zoekt, het tweede vooral hóe je het zoekt.`;

  return section(
    'hero',
    `Jouw archetype: ${primary.name}`,
    opening,
    [primary.baseText, balance],
  );
}

function generateWhoYouAreSection(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const primary = archetypeById(result.primaryArchetype);
  const secondary = archetypeById(result.secondaryArchetype);
  const top = topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 3);
  const [first, second, third] = top;

  const bullets = top.map((id) => {
    const t = T(result, id, ':who-you-are');
    return `${t.label} (${result.subDimensions[id].score}/100): ${t.behavior}.`;
  });

  const strongest = T(result, first, ':who-you-are');
  const strongestConfidence = result.subDimensions[first].confidence;

  const paragraphs = [
    `Wat voor mens je bent, laat zich scherper aflezen aan je drie sterkst uitgeslagen eigenschappen dan aan één archetype. Bij jou zijn dat ${strongest.label.toLowerCase()}, ${T(result, second).label.toLowerCase()} en ${T(result, third).label.toLowerCase()}. Die drie samen verklaren waarom bepaalde situaties je moeiteloos afgaan en andere onevenredig veel van je vragen.`,
    // Het cijfer zelf staat al canoniek in de eerste bullet hieronder (samen met de
    // andere twee, symmetrisch) — hier volstaat de kwalitatieve aanduiding "sterkste".
    `De sterkste daarvan is ${strongest.label.toLowerCase()}. Daaronder zit ${strongest.hiddenNeed} — en dat is het punt waar het interessant wordt, want die behoefte stuurt je ook op momenten waarop je denkt dat je een rationele keuze maakt.`,
    `Dat patroon wordt in dit rapport samengevat als ${primary.name}, met ${secondary.name} als tweede stem. Dat zijn geen hokjes maar leeswijzers: een manier om vier getallen zo op te schrijven dat je jezelf erin herkent. Waar de naam en je eigen ervaring uiteenlopen, is je ervaring leidend.`,
  ];
  if (strongestConfidence < 50) {
    paragraphs.push(
      `Kanttekening: ${strongest.label.toLowerCase()} steunt hier op relatief weinig antwoorden (betrouwbaarheid ${strongestConfidence}%), dus lees deze uitspraak als een aanwijzing, niet als een vaststaand feit — je eigen herkenning weegt zwaarder dan het getal.`,
    );
  }
  // Vooruit in plaats van achteruit: de rode draad wijst naar waar dezelfde
  // drie scores straks anders uitpakken (C §3.2).
  paragraphs.push(S(result, 'who-you-are.vooruit'));

  return section(
    'who-you-are',
    'Wie je bent',
    addressed(
      profile,
      '{naam}, dit is de kern die uit je antwoorden naar voren komt — niet als etiket, maar als het patroon dat het vaakst terugkwam.',
      'Dit is de kern die uit je antwoorden naar voren komt — niet als etiket, maar als het patroon dat het vaakst terugkwam.',
    ),
    paragraphs,
    bullets,
    [insightCloserForDims(result, 'who-you-are', first, second)],
  );
}

function generateCorePatternSection(result: ArcanaScoreResult): ArcanaReportSection {
  const main = result.mainDimensions;
  const ranked = (Object.keys(main) as (keyof typeof main)[])
    .slice()
    .sort((a, b) => main[b].score - main[a].score);
  const top = ranked.slice(0, 3);
  const labels: Record<string, string> = {
    innerMotor: 'je innerlijke motor',
    socialPattern: 'je sociale energie',
    thinkingStyle: 'je denkstijl',
    emotionalSensitivityMain: 'je emotionele gevoeligheid',
    controlAndSecurity: 'je behoefte aan controle en zekerheid',
    conflictStyle: 'je conflictstijl',
    selfImage: 'je zelfbeeld',
    shadowPattern: 'je schaduwpatroon',
    relationshipPattern: 'je relatiepatroon',
    workStyle: 'je werkstijl',
    stressPattern: 'je stressreactie',
    growthPath: 'je groeipad',
  };

  const bullets = top.map(
    (id) => `${labels[id]} scoort ${scoreBand(main[id].score)} (${main[id].score}/100): ${MAIN_DIMENSION_GLOSS[id]}`,
  );

  return section(
    'core-pattern',
    'Jouw kernpatroon',
    'Drie hoofddimensies steken het scherpst boven de rest uit en vormen samen de kern van hoe jij in het leven staat.',
    [
      `Wat opvalt is dat vooral ${labels[top[0]]} en ${labels[top[1]]} je gedrag sturen. Dat is geen toeval: de onderliggende subdimensies daarachter kwamen consistent terug in je antwoorden op vragen over heel verschillende situaties.`,
      'Dat wil niet zeggen dat de rest van je profiel er niet toe doet — het betekent dat deze combinatie de meeste verklaringskracht heeft voor waarom je doet wat je doet, en waarom bepaalde situaties meer bij je binnenkomen dan andere.',
    ],
    bullets,
    [insightCloser(result, 'core-pattern', labels[top[0]], main[top[0]].score, labels[top[1]], main[top[1]].score)],
  );
}

function generateSeenByOthersSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, VISIBLE_DIMENSIONS, 3);
  const bullets = top.map((id) => {
    const t = T(result, id);
    return `${t.label}: ${t.behavior}. ${asSentence(t.effect)}`;
  });
  return section(
    'seen-by-others',
    'Wat anderen aan jou zien',
    S(result, 'seen-by-others.intro'),
    [
      S(result, 'seen-by-others.persona'),
    ],
    bullets,
    [insightCloserForDims(result, 'seen-by-others', top[0], top[1])],
  );
}

function generateHiddenInnerWorldSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, HIDDEN_DIMENSIONS, 3);
  const bullets = top.map((id) => {
    const t = T(result, id, ':hidden-inner-world');
    return `${t.label}: van binnen draait dit om ${t.hiddenNeed}. Van buiten zien mensen iets anders — ${t.behavior} — en niet hoe sterk dat vanbinnen speelt.`;
  });
  return section(
    'hidden-inner-world',
    'Wat mensen vaak niet aan jou zien',
    S(result, 'hidden-inner-world.intro'),
    [
      S(result, 'hidden-inner-world.note'),
    ],
    bullets,
    [insightCloserForDims(result, 'hidden-inner-world', top[0], top[1])],
  );
}

function generateAloneSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, SOLO_DIMENSIONS, 3);
  const solitude = result.subDimensions.solitudeNeed.score;

  const bullets = top.map((id) => `${T(result, id).label}: ${T(result, id).alone}.`);

  const rhythm =
    solitude >= 65
      ? `Je behoefte aan stilte scoort ${solitude}/100. Alleen zijn is voor jou geen leegte maar herstel — en het wordt pas ongezond wanneer terugtrekken de standaard wordt in plaats van de adempauze.`
      : solitude <= 40
        ? `Je behoefte aan stilte scoort ${solitude}/100. Lang alleen zijn levert je weinig op; je komt eerder tot jezelf in contact dan in afzondering. Let erop dat je daardoor niet altijd toekomt aan wat alleen in stilte boven komt drijven.`
        : `Je behoefte aan stilte scoort ${solitude}/100. Je verdraagt alleen zijn goed zonder het op te zoeken — je gebruikt het functioneel, als de omstandigheden erom vragen.`;

  const paragraphs = [content.alone, rhythm];
  const nuance = reconciliation(result.primaryArchetype, 'solitudeNeed', solitude);
  if (nuance) paragraphs.push(nuance);

  return section(
    'alone',
    'Hoe je bent wanneer je alleen bent',
    S(result, 'alone.intro'),
    paragraphs,
    bullets,
    [insightCloserForDims(result, 'alone', top[0], top[1])],
  );
}

function generateWithOthersSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, SOCIAL_DIMENSIONS, 3);
  const bullets = top.map((id) => `${T(result, id).label}: ${T(result, id).withOthers}.`);

  const social = result.mainDimensions.socialPattern.score;

  const paragraphs = [
    content.withOthers,
    S(result, 'with-others.note'),
  ];
  const nuance = reconciliation(
    result.primaryArchetype,
    'socialEnergy',
    result.subDimensions.socialEnergy.score,
  );
  if (nuance) paragraphs.push(nuance);

  return section(
    'with-others',
    'Hoe je bent met anderen',
    `Je sociale patroon scoort ${scoreBand(social)} (${social}/100) — dat zegt niet of je aardig gevonden wordt, maar hoeveel van jezelf je meeneemt naar het contact.`,
    paragraphs,
    bullets,
    [aboutOthersCloser(result, 'with-others')],
  );
}

function generateAtWorkSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const score = result.mainDimensions.workStyle.score;
  const top = topSubDimensions(result.subDimensions, WORK_DIMENSIONS, 3);
  const bullets = top.map((id) => `${T(result, id).label}: ${T(result, id).atWork}.`);

  const dominant = [
    { label: 'praktisch uitvoeren', value: result.subDimensions.practicalThinking.score },
    { label: 'analytisch doordenken', value: result.subDimensions.analyticalThinking.score },
    { label: 'creatief bedenken', value: result.subDimensions.creativeThinking.score },
    { label: 'structureren en plannen', value: result.subDimensions.controlNeed.score },
  ].sort((a, b) => b.value - a.value)[0];

  return section(
    'work-style',
    'Hoe je bent op werk',
    `Je werkstijl scoort ${scoreBand(score)} (${score}/100); het sterkste onderdeel daarin is ${dominant.label} (${dominant.value}/100).`,
    [
      content.atWork,
      `Betekenis speelt hierbij een rol die je niet moet onderschatten (${result.subDimensions.meaningNeed.score}/100): ${T(result, 'meaningNeed').behavior}. Werk dat daar haaks op staat kost je meer energie dan de taak zelf rechtvaardigt.`,
    ],
    bullets,
    [aboutOthersCloser(result, 'work-style')],
  );
}

function generateCloseCircleSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, CLOSE_CIRCLE_DIMENSIONS, 3);
  const bullets = top.map((id) => `${T(result, id).label}: ${T(result, id).closeCircle}.`);

  const loyalty = result.subDimensions.connectionNeed.score;
  const boundaries = result.subDimensions.peoplePleasing.score;

  const tension =
    boundaries >= 65 && loyalty >= 65
      ? `In vertrouwde kring komt jouw kwetsbaarste combinatie naar boven: hoge verbinding (${loyalty}/100) met hoge neiging tot pleasen (${boundaries}/100). Juist bij mensen van wie je houdt, kost het je het meest om nee te zeggen — en juist daar wordt het het vaakst van je gevraagd.`
      : `Verbinding scoort ${loyalty}/100 en pleasen ${boundaries}/100. Dat maakt je in vertrouwde kring redelijk in staat om te blijven staan waar je staat, ook wanneer er iets van je verwacht wordt.`;

  const paragraphs = [content.closeCircle, tension];
  const nuance = reconciliation(result.primaryArchetype, 'connectionNeed', loyalty);
  if (nuance) paragraphs.push(nuance);

  return section(
    'close-circle',
    'Hoe je bent met familie en vrienden',
    S(result, 'close-circle.intro'),
    paragraphs,
    bullets,
    [aboutOthersCloser(result, 'close-circle')],
  );
}

function generateStressSection(result: ArcanaScoreResult): ArcanaReportSection {
  const stressDef = STRESS_ARCHETYPES.find((s) => s.id === result.stressArchetype);
  const stressContent = STRESS_ARCHETYPE_CONTENT[result.stressArchetype];
  const underPressure = pick(stressContent.underPressure, result.variantSeed, `stress.${result.stressArchetype}.underPressure`);
  const stressDimMap: Record<string, SubDimensionId> = {
    theController: 'stressControl',
    theVanisher: 'stressWithdrawal',
    theSprinter: 'stressAcceleration',
    theFrozenOne: 'stressFreeze',
    thePleaser: 'peoplePleasing',
    theDefender: 'shadowDefensiveness',
  };
  const dimId = stressDimMap[result.stressArchetype];
  const t = T(result, dimId, ':stress');
  const s = result.subDimensions[dimId].score;

  // Conditioneel, zelden waar: de stress-subdimensie kan toevallig ook in de
  // top-3 van "Wie je bent" zitten. Zo ja, staat het cijfer erbij mét de
  // verwijzing — hetzelfde getal op twee plekken is het verband, niet de
  // herhaling (C §3.2); zo nee — het gangbare geval — is dit de eerste plek
  // met een cijfer en toont deze sectie het met de band.
  const whoYouAreTop = topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 3);
  const driveSentence = whoYouAreTop.includes(dimId)
    ? `De drijfveer eronder is ${t.hiddenNeed} (${s}/100). ${S(result, 'stress.already-named')}`
    : `De drijfveer eronder is ${t.hiddenNeed} (${s}/100, ${scoreBand(s)}).`;

  return section(
    'stress',
    'Hoe je bent onder druk',
    `Onder druk laat jij vooral het patroon van ${stressDef?.name} zien: ${stressDef?.description}`,
    [
      underPressure,
      `Concreet vertaalt zich dat naar: ${t.behavior}. ${driveSentence}`,
      `De valkuil daarbij: ${t.pitfall}. Groeisleutel: ${t.growthKey}. Jung zou hier wijzen op enantiodromie: elke houding die je te lang en te ver doorzet, slaat op een dag om in haar tegendeel. Dat is te voorkomen door de andere kant kleine, vrijwillige beurten te geven voordat die zijn beurt met geweld opeist.`,
    ],
    [],
    [shadowNoteCloser(result, 'stress')],
  );
}

function generateAtEaseSection(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 3);
  const bullets = top.map((id) => `${T(result, id).label}: ${T(result, id).atEase}.`);

  // De top-3 hier is per definitie identiek aan de top-3 van "Wie je bent" (zelfde
  // pool, zelfde sortering, zelfde count). Het cijfer staat erbij: dezelfde
  // score op twee plekken is het verband dat de lezer kan narekenen (C §3.2).
  const [first, second, third] = top;
  const metScore = (id: SubDimensionId) => `${T(result, id).label.toLowerCase()} (${result.subDimensions[id].score})`;
  const labelList = `${metScore(first)}, ${metScore(second)} en ${metScore(third)}`;
  const bridge = S(result, 'at-ease.bridge').replace('{labels}', labelList);

  return section(
    'at-ease',
    'Hoe je bent op je gemak',
    addressed(
      profile,
      `{naam}, de meeste tests beschrijven wie je bent als het moeilijk is. Dit gaat over wie je bent als er niets te bewijzen valt — en dat is minstens zo veelzeggend.`,
      'De meeste tests beschrijven wie je bent als het moeilijk is. Dit gaat over wie je bent als er niets te bewijzen valt — en dat is minstens zo veelzeggend.',
    ),
    [
      content.atEase,
      S(result, 'at-ease.note'),
      bridge,
    ],
    bullets,
    [insightCloserForDims(result, 'at-ease', first, second)],
  );
}

/**
 * Items #1-3 van de top-5 hier zijn per definitie identiek aan de top-3 van
 * "Wie je bent" (zelfde pool, zelfde sortering — een top-5 deelt altijd zijn
 * eerste drie met de top-3). Die drie krijgen het cijfer mét de verwijzing:
 * hetzelfde getal op twee plekken leest als verband, "zoals hierboven al
 * genoemd" las als excuus voor herhaling (C §3.2). #4-5 zijn exclusief voor
 * deze sectie en tonen het cijfer met de band.
 */
const STRENGTH_SAME_SCORE: readonly string[] = [
  'dezelfde score als bij wie je bent, hier gelezen als kracht',
  'hetzelfde cijfer als bij wie je bent; hier telt het als sterk punt',
  'het cijfer dat bij wie je bent al stond, nu van de kant waar het voor je werkt',
  'dezelfde score als bij wie je bent — wat verandert is waar hij op uitkomt',
  'net als bij wie je bent; hier zie je wat dat cijfer je oplevert',
];

function generateStrengthsSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 5);
  const bullets = top.map((id, index) => {
    const t = T(result, id, ':strengths');
    const s = result.subDimensions[id].score;
    const label =
      index < 3
        ? `${t.label} (${s}/100 — ${pick(STRENGTH_SAME_SCORE, result.variantSeed, `strengths.bridge.${id}`)})`
        : `${t.label} (${s}/100, ${scoreBand(s)})`;
    return `${label}: ${t.behavior}. Dit komt voort uit ${t.hiddenNeed}. ${asSentence(t.effect)}`;
  });
  return section(
    'strengths',
    'Jouw sterke punten',
    'Dit zijn de vijf subdimensies waar je het hoogst op scoort — de plekken waar je patroon het sterkst en meest natuurlijk naar buiten komt.',
    [
      S(result, 'strengths.note'),
      S(result, 'strengths.vooruit'),
    ],
    bullets,
    [insightCloserForDims(result, 'strengths', top[0], top[1])],
  );
}

/**
 * Referentiefragment voor wanneer een valkuil dezelfde subdimensie is als een
 * eerder getoonde sterkte — de "sterkte = valkuil"-combinatie is inhoudelijk
 * waardevol en blijft dus staan, mét het cijfer: hetzelfde getal bij de sterke
 * punten en hier is precies het verband dat de lezer kan narekenen (C §3.2).
 */
const SHADOW_ALSO_STRENGTH: readonly string[] = [
  'dezelfde score als bij je sterke punten, hier van de kant waar hij tegen je werkt',
  'hetzelfde cijfer stond bij je sterke punten; hier is de keerzijde',
  'bij je sterke punten telde dit cijfer als kracht, hier als valkuil',
  'dezelfde eigenschap als bij je sterke punten, nu de kant die tegen je werkt',
  'het cijfer dat bij je sterke punten stond, hier gelezen als keerzijde',
];

function generateShadowSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 5);
  // Conditioneel, niet gegarandeerd: afhankelijk van de individuele scores kan
  // een valkuil ook in de top-5 sterke punten staan. Zo ja, staat het cijfer
  // erbij mét de verwijzing naar de sterke punten; zo nee, met de band.
  const strengthsTop = new Set(topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 5));
  const bullets = top.map((id) => {
    const t = T(result, id, ':shadow');
    const s = result.subDimensions[id].score;
    if (strengthsTop.has(id)) {
      const bridge = pick(SHADOW_ALSO_STRENGTH, result.variantSeed, `shadow.bridge.${id}`);
      return `${t.label} (${s}/100 — ${bridge}). Valkuil: ${t.pitfall}. Groeisleutel: ${t.growthKey}.`;
    }
    return `${t.label} (${s}/100, ${scoreBand(s)}): valkuil — ${t.pitfall}. Groeisleutel: ${t.growthKey}.`;
  });
  // De troost staat direct onder de lijst, niet negentien hoofdstukken verder:
  // wie hier 's avonds leest dat zijn belangrijkste eigenschap een vluchtroute
  // is, krijgt de nuance meteen (C §6.7). De tekst is per archetype geschreven.
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  return section(
    'shadow',
    'Je valkuilen',
    S(result, 'shadow.intro'),
    [
      S(result, 'shadow.disclaimer'),
    ],
    bullets,
    [S(result, 'shadow.neem-die-ene'), `Als dit niet klopt: ${content.ifItDoesNotFit}`, SHADOW_NOT_FAILURE_NOTE],
  );
}

function generateJungianSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const topShadow = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 2);
  const lowest = SUB_DIMENSION_IDS.slice()
    .sort((a, b) => result.subDimensions[a].score - result.subDimensions[b].score)
    .slice(0, 2);

  // De twee laagst scorende subdimensies krijgen één gezamenlijke zin in
  // plaats van twee bijna identieke bullets met alleen een andere naam en
  // score — dat sjabloon-stiksel viel op in een verder essayistische sectie.
  const [lowestFirst, lowestSecond] = lowest;
  const lowestBullet =
    lowestSecond === undefined
      ? `${T(result, lowestFirst).label} scoort met ${result.subDimensions[lowestFirst].score}/100 opvallend laag. Jung zou vragen of deze eigenschap werkelijk ontbreekt, of dat je hem hebt weggelegd. Wat je bij anderen op dit punt afkeurt of juist bewondert, wijst meestal naar het antwoord.`
      : `${T(result, lowestFirst).label} (${result.subDimensions[lowestFirst].score}/100) en ${T(result, lowestSecond).label.toLowerCase()} (${result.subDimensions[lowestSecond].score}/100) steken er allebei opvallend laag uit. Jung zou bij beide vragen of ze werkelijk ontbreken, of dat je ze hebt weggelegd — en wat je bij anderen op precies die twee punten afkeurt of juist bewondert, wijst meestal naar het antwoord.`;

  const bullets = [
    ...topShadow.map((id) => `${T(result, id).label}: ${T(result, id).jungian}`),
    lowestBullet,
  ];

  return section(
    'jungian',
    'De Jungiaanse laag: persona, schaduw en projectie',
    'Jung noemde het deel van jezelf dat niet in je zelfbeeld past de schaduw. Die bestaat niet alleen uit slechte eigenschappen — hij bestaat vooral uit alles wat je niet mocht zijn.',
    [
      content.shadow,
      'De schaduw verdwijnt niet als je hem wegkijkt; hij komt terug als projectie (je ergert je bovenmatig aan iemand die doet wat jij jezelf verbiedt), als uitbarsting (de zachtaardige mens die na twee jaar inschikken plots iets zegt waar iedereen van schrikt), of als vermoeidheid (het volhouden van een halve mens kost energie).',
      'Een bruikbare vuistregel: irritatie die groter is dan de aanleiding, wijst naar binnen. En bewondering die groter is dan de prestatie, wijst naar iets wat je jezelf nog niet toestaat.',
    ],
    bullets,
    [shadowNoteCloser(result, 'jungian')],
  );
}

function generateRelationshipSection(result: ArcanaScoreResult): ArcanaReportSection {
  const score = result.mainDimensions.relationshipPattern.score;
  const trustScore = result.subDimensions.trustNeed.score;
  const intimacyScore = result.subDimensions.intimacyNeed.score;
  const conflictAvoidanceScore = result.subDimensions.conflictAvoidance.score;

  return section(
    'relationship',
    'Je relatiepatroon',
    `Je relatiepatroon scoort ${scoreBand(score)} (${score}/100) op de combinatie van verbinding, vertrouwen en intimiteit.`,
    [
      `Je vertrouwensbehoefte (${trustScore}/100) en intimiteitsbehoefte (${intimacyScore}/100) bepalen samen hoe snel je mensen echt dichtbij laat komen: ${T(result, 'trustNeed').behavior}.`,
      // Het conflictAvoidance-cijfer staat canoniek bij "Je communicatiestijl" (daar
      // is het functioneel bewijs voor de driefactor-stijlclassificatie); hier
      // volstaat een kwalitatieve brug ernaartoe, zonder het cijfer te herhalen.
      conflictAvoidanceScore > 60
        ? S(result, 'relationship.conflict-bridge-high')
        : S(result, 'relationship.conflict-bridge-low'),
    ],
    [],
    [aboutOthersCloser(result, 'relationship')],
  );
}

function generateCommunicationSection(result: ArcanaScoreResult): ArcanaReportSection {
  const directness = result.subDimensions.directness.score;
  const peoplePleasing = result.subDimensions.peoplePleasing.score;
  const conflictAvoidance = result.subDimensions.conflictAvoidance.score;

  let style: string;
  if (directness >= 65 && peoplePleasing < 50) {
    style = 'direct en helder — je zegt liever te veel dan te weinig';
  } else if (peoplePleasing >= 65 || conflictAvoidance >= 65) {
    style = 'zorgvuldig en aftastend — je weegt eerst de sfeer voordat je iets zegt';
  } else {
    style = 'situationeel — je stijl verschuift afhankelijk van wie er tegenover je zit';
  }

  return section(
    'communication',
    'Je communicatiestijl',
    `Je communicatiestijl is het best te omschrijven als ${style}.`,
    [
      `Directheid (${directness}/100), pleasen (${peoplePleasing}/100) en conflictvermijding (${conflictAvoidance}/100) bepalen samen hoeveel filter er zit tussen wat je denkt en wat je uitspreekt.`,
      directness >= 65
        ? `Je valkuil: ${T(result, 'directness').pitfall}. Groeisleutel: ${T(result, 'directness').growthKey}.`
        : `Je valkuil: ${T(result, 'conflictAvoidance').pitfall}. Groeisleutel: ${T(result, 'conflictAvoidance').growthKey}.`,
    ],
    [],
    [aboutOthersCloser(result, 'communication')],
  );
}

/**
 * De sterkste spanningsvelden, met beide polen bij naam. Gedeeld tussen
 * "Je spanningsvelden" (dat de volledige cijfers toont, canoniek) en het
 * 30-dagenplan (dat alleen de twee polen noemt, zonder cijfers te herhalen).
 */
function topTensionsList(result: ArcanaScoreResult, count: number) {
  const withLabels = result.tensions.map((tension) => {
    const def = TENSION_DEFINITIONS.find((d) => d.id === tension.id)!;
    const [labelA, labelB] = def.label.split(' versus ');
    return { ...tension, label: def.label, labelA, labelB };
  });

  const active = withLabels.filter((t) => t.active);
  const pool = active.length >= 3 ? active : withLabels;
  return pool
    .slice()
    .sort((a, b) => b.scoreA + b.scoreB - (a.scoreA + a.scoreB))
    .slice(0, count);
}

function generateTensionsSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topTensionsList(result, 3);

  const bullets = top.map((t) => {
    const intensity = t.intense ? 'zeer sterk aanwezig' : t.active ? 'actief aanwezig' : 'op de achtergrond aanwezig';
    return `${t.label} (${intensity}): ${t.labelA} scoort ${t.scoreA}/100, ${t.labelB.toLowerCase()} scoort ${t.scoreB}/100. Beide trekken tegelijk aan je, en geen van beide wint definitief.`;
  });

  return section(
    'tensions',
    'Je spanningsvelden',
    S(result, 'tensions.intro'),
    [
      S(result, 'tensions.note'),
      'Jung noemde dit het spanningspaar, en hij zag er de motor van ontwikkeling in. Wie zo\'n paar te snel platslaat door één kant te kiezen, verliest niet alleen de andere kant maar ook de beweging. Wie de spanning lang genoeg verdraagt, ziet er soms een derde weg uit ontstaan die hij vooraf niet had kunnen bedenken.',
    ],
    bullets,
    [shadowNoteCloser(result, 'tensions')],
  );
}

function generateBlindSpotsSection(result: ArcanaScoreResult): ArcanaReportSection {
  const shadowTop5 = new Set(topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 5));
  const remaining = RISK_DIMENSIONS.filter((id) => !shadowTop5.has(id));
  const blindSpots = topSubDimensions(result.subDimensions, remaining, 2);

  const bullets = blindSpots.map((id) => {
    const t = T(result, id);
    const s = result.subDimensions[id].score;
    return `${t.label} (${s}/100): dit patroon is minder op de voorgrond, maar ${t.pitfall} — vaak juist omdat het weinig aandacht krijgt.`;
  });

  if (result.responseQuality.notes.length > 0) {
    bullets.push(...result.responseQuality.notes);
  }

  return section(
    'blind-spots',
    'Je blinde vlekken',
    S(result, 'blind-spots.intro'),
    [
      S(result, 'blind-spots.note'),
    ],
    bullets,
    [shadowNoteCloser(result, 'blind-spots')],
  );
}

function generateWhoYouCanBecomeSection(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const primary = archetypeById(result.primaryArchetype);
  const phaseNote = LIFE_PHASE_NOTE[profile.lifePhase];

  const paragraphs = [
    content.whoYouCanBecome,
    `Individuatie — Jungs woord voor dit proces — gaat niet over iemand anders worden. Het gaat over vollediger worden: dezelfde mens, met minder dwang. Voor jou als ${primary.name} betekent dat niet dat je patroon verdwijnt, maar dat je het inzet omdat je ervoor kiest in plaats van omdat het je overkomt.`,
    // Het groeibereidheid-cijfer staat canoniek bij "Je groeipad" (die sectie is
    // om precies dat cijfer gebouwd); hier volstaat een kwalitatieve brug ernaartoe.
    S(result, 'who-you-can-become.growth-bridge'),
  ];

  if (phaseNote) paragraphs.push(phaseNote);

  return section(
    'who-you-can-become',
    'Hoe je kunt worden',
    addressed(
      profile,
      '{naam}, dit is geen belofte en geen doel dat je moet halen. Het is de rijpe versie van het patroon dat je al hebt.',
      'Dit is geen belofte en geen doel dat je moet halen. Het is de rijpe versie van het patroon dat je al hebt.',
    ),
    paragraphs,
    [],
    [growthCloser(result, 'who-you-can-become', 0), GROWTH_MEANING_NOTE],
  );
}

function generateWhatYouNeedSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const shadowTop = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 2);

  const bullets = [
    ...content.whatYouNeed,
    ...shadowTop.map((id) => `${T(result, id, ':what-you-need').label}: ${T(result, id, ':what-you-need').growthKey}.`),
  ];

  return section(
    'what-you-need',
    'Wat je nodig hebt om dat te worden',
    'Voorwaarden, geen voornemens. Dit zijn de omstandigheden en oefeningen die bij jouw specifieke patroon het meeste verschil maken.',
    [
      S(result, 'what-you-need.note'),
    ],
    bullets,
    [growthCloser(result, 'what-you-need', bullets.length), GROWTH_MEANING_NOTE],
  );
}

function generateGrowthPathSection(result: ArcanaScoreResult): ArcanaReportSection {
  const shadowTop5 = new Set(topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 5));
  const remaining = RISK_DIMENSIONS.filter((id) => !shadowTop5.has(id));
  const growthDims = topSubDimensions(result.subDimensions, remaining.length >= 2 ? remaining : RISK_DIMENSIONS, 2);

  const bullets = growthDims.map((id) => `${T(result, id).label}: ${T(result, id).growthKey}.`);
  const growthScore = result.subDimensions.growthReadiness.score;

  return section(
    'growth-path',
    'Je groeipad',
    `Je groeibereidheid scoort ${scoreBand(growthScore)} (${growthScore}/100) — dat bepaalt hoeveel ruimte je jezelf momenteel geeft om naar deze patronen te kijken.`,
    [
      S(result, 'growth-path.note'),
    ],
    bullets,
    // Alleen de eerste zin van de groei-afsluiter: de tweede ("groei betekent
    // niet dat het patroon verdwijnt") staat hierboven al bijna letterlijk in
    // growth-path.note — nog een keer zou een doublure zijn.
    [growthCloser(result, 'growth-path', bullets.length)],
  );
}

function generateUnderstoodByOthersSection(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  // Neemt bewust de op-drie-na-hoogste hidden dimensions (niet de top 3), zodat
  // deze sectie niet dezelfde subdimensie herhaalt als "Wat mensen vaak niet
  // aan jou zien" — dat leverde tweemaal bijna hetzelfde inzicht op.
  const hidden = topSubDimensions(result.subDimensions, HIDDEN_DIMENSIONS, HIDDEN_DIMENSIONS.length).slice(3, 5);

  const bullets = [
    ...content.howOthersShouldUnderstand,
    ...hidden.map(
      // `behavior` staat in hoofdzinsvolgorde ("je voelt … aan"), dus als
      // tussenzin achter een gedachtestreep, niet als lijdend voorwerp.
      (id) => `Van buiten zie je vooral het gedrag — ${T(result, id, ':understood-by-others').behavior}. Wat daaronder zit is ${T(result, id, ':understood-by-others').hiddenNeed} — en dat is het deel dat zelden hardop gaat.`,
    ),
  ];
  // Waar dit vandaan komt, met de twee scores erbij: op de losse deelpagina is
  // dit de enige plek waar de ontvanger ziet dat het geen mening is.
  const herkomst = hidden.map((id) => `${T(result, id).label.toLowerCase()} (${result.subDimensions[id].score}/100)`);
  const origin = `Waar dit vandaan komt: dit is geen mening en geen zelfbeeld. Het volgt uit ${herkomst.join(' en ')} — twee van de dertig eigenschappen die deze test meet. Alle cijfers lopen van 0 tot 100 met 50 als midden. Hoog is niet beter dan laag.`;

  return section(
    'understood-by-others',
    'Wat ik je zou willen uitleggen',
    addressed(
      profile,
      '{naam}, dit hoofdstuk is geschreven om door te geven aan iemand die dichtbij staat. Als losse pagina heeft het een eigen aanhef en uitleg voor wie het krijgt; de rest van je rapport gaat niet mee.',
      'Dit hoofdstuk is geschreven om door te geven aan iemand die dichtbij staat. Als losse pagina heeft het een eigen aanhef en uitleg voor wie het krijgt; de rest van je rapport gaat niet mee.',
    ),
    [
      S(result, 'understood-by-others.note'),
    ],
    bullets,
    [origin],
  );
}

function generateUnderstandYourselfSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const topShadowPair = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 2);
  const topShadow = topShadowPair[0];

  const bullets = [
    ...content.howToUnderstandYourself,
    `Let deze maand op momenten waarop dit gebeurt: ${T(result, topShadow, ':understand-yourself').behavior}. Noteer wat er vlak daarvoor gebeurde — daar zit de trigger, niet in het gedrag zelf.`,
    'Vraag aan twee mensen die je vertrouwen: wat merk jij aan mij dat ik zelf waarschijnlijk niet doorheb? Vraag door tot het ongemakkelijk wordt; daar begint de informatie.',
  ];

  // De per-archetype troosttekst (ifItDoesNotFit) stond hier, negentien
  // hoofdstukken na de valkuilen; hij staat nu direct onder die lijst.
  return section(
    'understand-yourself',
    'Hoe je jezelf beter kunt begrijpen',
    S(result, 'understand-yourself.intro'),
    [],
    bullets,
    [insightCloserForDims(result, 'understand-yourself', topShadowPair[0], topShadowPair[1])],
  );
}

/** Geeft de regels waarvan alle scorecondities gelden. */
function matchingRules(theme: ReflectionTheme, sub: Record<SubDimensionId, SubDimensionScore>): ReflectionRule[] {
  return theme.rules.filter((rule) =>
    rule.when.every((condition) => {
      const value = sub[condition.id].score;
      return value >= (condition.min ?? 0) && value <= (condition.max ?? 100);
    }),
  );
}

/**
 * "Waar dit vandaan komt"-afsluiter voor een beschouwing (C §3.3): benoemt
 * dat de opening algemeen is en dat alleen de middenstukken op de eigen
 * scores zijn gekozen, met de twee subdimensies die de gebruikte regels
 * samen aandragen. Zonder match (fallback-alinea) is er niets score-gedreven
 * om naar te wijzen; dat wordt dan ook letterlijk gezegd.
 */
function reflectionCloser(
  result: ArcanaScoreResult,
  theme: ReflectionTheme,
  matched: ReflectionRule[],
  anchorId: SubDimensionId | undefined,
): string {
  if (matched.length === 0) return S(result, 'closer.reflection-fallback');

  const usedIds = Array.from(
    new Set<SubDimensionId>([
      ...(anchorId ? [anchorId] : []),
      ...matched.flatMap((rule) => rule.when.map((condition) => condition.id)),
    ]),
  );
  const ranked = usedIds
    .slice()
    .sort((a, b) => result.subDimensions[b].score - result.subDimensions[a].score || usedIds.indexOf(a) - usedIds.indexOf(b));
  let [labelIdA, labelIdB] = ranked;
  if (!labelIdB) {
    // Zeldzaam: alle matchende regels wijzen samen naar maar één subdimensie.
    // Vul aan met de op-één-na-hoogste uit de rest van dit thema.
    const allThemeIds = Array.from(new Set(theme.rules.flatMap((rule) => rule.when.map((c) => c.id))));
    labelIdB =
      allThemeIds
        .filter((id) => id !== labelIdA)
        .sort((a, b) => result.subDimensions[b].score - result.subDimensions[a].score)[0] ?? labelIdA;
  }

  const n = matched.length;
  const stukjeAantal = n === 1 ? 'De alinea' : `De ${n} alinea's`;
  const isZijn = n === 1 ? 'is' : 'zijn';

  return Sc(result, 'closer.reflection', theme.id)
    .replace('{stukjeAantal}', stukjeAantal)
    .replace('{isZijn}', isZijn)
    .replace('{label1}', TRAIT_CONTENT[labelIdA].label)
    .replace('{score1}', String(result.subDimensions[labelIdA].score))
    .replace('{label2}', TRAIT_CONTENT[labelIdB].label)
    .replace('{score2}', String(result.subDimensions[labelIdB].score));
}

function generateReflectionSections(result: ArcanaScoreResult): ArcanaReportSection[] {
  const seed = result.variantSeed;
  return REFLECTION_THEMES.map((theme) => {
    // De eerste conditie van de eerste regel is de subdimensie waar deze
    // beschouwing inhoudelijk om draait. Door die score mee te nemen in de
    // seed voor de essence-alinea's, hangt óók de gekozen formulering van de
    // kernalinea (niet alleen de score-gebonden bullets eronder) samen met
    // wat er bij déze persoon is gemeten, in plaats van alleen met de
    // algemene antwoordenset. Dat verkleint de kans dat twee heel
    // verschillende profielen woordelijk dezelfde kernalinea krijgen.
    const anchorId = theme.rules[0]?.when[0]?.id;
    const anchorScore = anchorId ? result.subDimensions[anchorId].score : 0;
    const essenceSeed = seed + anchorScore;
    const essence = theme.essence.map((paragraph, i) =>
      pick(paragraph, essenceSeed, `reflectie.${theme.id}.essence${i}`),
    );
    const question = pick(theme.question, seed, `reflectie.${theme.id}.question`);
    const matched = matchingRules(theme, result.subDimensions).slice(0, 3);
    const bullets = matched.length > 0 ? matched.map((rule) => rule.text) : [theme.fallback];
    return section(
      `reflectie-${theme.id}`,
      theme.title,
      essence[0],
      [...essence.slice(1), `Vraag om bij stil te staan: ${question}`],
      bullets,
      [reflectionCloser(result, theme, matched, anchorId)],
    );
  });
}

function generateThirtyDayPlan(result: ArcanaScoreResult): ArcanaReportSection {
  const primary = archetypeById(result.primaryArchetype);
  const topShadow = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 1)[0];
  const shadowTrait = T(result, topShadow, ':thirty-day');
  // Alleen de twee polen bij naam, zonder scores of statuslabel: de volledige
  // cijfers staan al canoniek in "Je spanningsvelden" en horen hier niet nogmaals.
  const topTensionEntry = topTensionsList(result, 1)[0];
  const tensionTask = topTensionEntry
    ? `Beschrijf een situatie deze week waarin ${topTensionEntry.labelA.toLowerCase()} en ${topTensionEntry.labelB.toLowerCase()} allebei om voorrang leken te vragen.`
    : 'Beschrijf een situatie deze week waarin twee behoeften tegelijk aan je trokken.';
  const growthDims = topSubDimensions(
    result.subDimensions,
    RISK_DIMENSIONS.filter((id) => id !== topShadow),
    1,
  );
  const secondTrait = T(result, growthDims[0] ?? topShadow, ':thirty-day');

  const weeks = [
    {
      week: 1,
      title: 'Observeren',
      goal: `Zicht krijgen op wanneer ${shadowTrait.label.toLowerCase()} aan het stuur staat.`,
      task: `Noteer deze week drie momenten waarop je merkt: "${shadowTrait.behavior}."`,
      reflection: 'Wat gebeurde er vlak voordat dit patroon aansloeg?',
    },
    {
      week: 2,
      title: 'Grenzen en patronen herkennen',
      goal: 'Herkennen hoe het spanningsveld tussen je twee sterkste behoeften in de praktijk werkt.',
      task: tensionTask,
      reflection: 'Welke van de twee kanten kreeg dit keer de overhand, en waarom?',
    },
    {
      week: 3,
      title: 'Eén nieuw gedrag oefenen',
      goal: 'Eén keer bewust anders reageren dan je automatische patroon.',
      task: `Oefen minstens één keer met: "${secondTrait.growthKey}."`,
      reflection: 'Wat voelde er anders in het moment zelf, en achteraf?',
    },
    {
      week: 4,
      title: 'Nieuwe richting verankeren',
      goal: `Een concrete gewoonte bouwen die past bij ${primary.name}.`,
      task: 'Kies één van de vorige drie oefeningen om vast onderdeel te maken van je week.',
      reflection: 'Wat heb je nodig om dit ook over een maand nog vol te houden?',
    },
  ];

  const bullets = weeks.map(
    (w) => `Week ${w.week} — ${w.title}. Doel: ${w.goal} Opdracht: ${w.task} Reflectievraag: ${w.reflection}`,
  );

  return section(
    'thirty-day-plan',
    '30-dagen actieplan',
    S(result, 'thirty-day.intro'),
    [
      S(result, 'thirty-day.note'),
    ],
    bullets,
  );
}

function generateFinalSentence(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const primary = archetypeById(result.primaryArchetype);
  const topShadow = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 1)[0];
  const shadowTrait = T(result, topShadow);

  const sentence =
    result.responseQuality.confidenceLevel === 'low'
      ? CLOSING_SENTENCE_FALLBACK
      : addressed(
          profile,
          `{naam}, jouw kracht als ${primary.name} zit niet in het wegwerken van ${shadowTrait.label.toLowerCase()}, maar in het steeds sneller herkennen van het moment waarop dat patroon het overneemt.`,
          `Jouw kracht als ${primary.name} zit niet in het wegwerken van ${shadowTrait.label.toLowerCase()}, maar in het steeds sneller herkennen van het moment waarop dat patroon het overneemt.`,
        );

  const closingParagraphs = [
    'En tot slot iets wat in geen enkele score staat: je hoeft niet eerst genezen te zijn om blij te mogen zijn. De blijdschap ligt niet aan het eind van je groeipad — ze ligt ernaast, de hele weg.',
  ];
  if (result.responseQuality.confidenceLevel !== 'low') {
    closingParagraphs.push(CLOSING_SENTENCE_FALLBACK);
  }

  return section('final-sentence', 'Samenvatting in één zin', sentence, closingParagraphs);
}

// ---------------------------------------------------------------------------

/** Past de gekozen aanspreekvorm toe op alle tekst in een sectie. */
function voiceSection(section: ArcanaReportSection, profile: ArcanaProfile): ArcanaReportSection {
  return {
    id: section.id,
    title: applyVoice(section.title, profile.addressForm),
    intro: applyVoice(section.intro, profile.addressForm),
    paragraphs: section.paragraphs.map((p) => applyVoice(p, profile.addressForm)),
    bullets: section.bullets.map((b) => applyVoice(b, profile.addressForm)),
    ...(section.outro ? { outro: section.outro.map((o) => applyVoice(o, profile.addressForm)) } : {}),
  };
}

export function generateArcanaReport(
  result: ArcanaScoreResult,
  profile: ArcanaProfile,
  generatedAt: string = new Date(0).toISOString(),
): ArcanaReport {
  const sections: ArcanaReportSection[] = [
    generateHeroSection(result, profile),
    generateWhoYouAreSection(result, profile),
    generateCorePatternSection(result),
    generateSeenByOthersSection(result),
    generateHiddenInnerWorldSection(result),
    generateAloneSection(result),
    generateWithOthersSection(result),
    generateAtWorkSection(result),
    generateCloseCircleSection(result),
    generateStressSection(result),
    generateAtEaseSection(result, profile),
    generateStrengthsSection(result),
    generateShadowSection(result),
    generateJungianSection(result),
    generateRelationshipSection(result),
    generateCommunicationSection(result),
    generateTensionsSection(result),
    generateBlindSpotsSection(result),
    generateWhoYouCanBecomeSection(result, profile),
    generateWhatYouNeedSection(result),
    generateGrowthPathSection(result),
    generateUnderstoodByOthersSection(result, profile),
    generateUnderstandYourselfSection(result),
    ...generateReflectionSections(result),
    generateThirtyDayPlan(result),
    generateFinalSentence(result, profile),
  ].map((s) => voiceSection(s, profile));

  return {
    meta: {
      generatedAt,
      version: REPORT_VERSION,
      responseQuality: result.responseQuality,
      profile,
    },
    archetypes: {
      primary: result.primaryArchetype,
      secondary: result.secondaryArchetype,
      stress: result.stressArchetype,
    },
    scores: {
      subDimensions: result.subDimensions,
      mainDimensions: result.mainDimensions,
      archetypeScores: result.archetypeScores,
    },
    tensions: result.tensions,
    sections,
  };
}

export {
  generateHeroSection,
  generateWhoYouAreSection,
  generateCorePatternSection,
  generateSeenByOthersSection,
  generateHiddenInnerWorldSection,
  generateAloneSection,
  generateWithOthersSection,
  generateAtWorkSection,
  generateCloseCircleSection,
  generateStressSection,
  generateAtEaseSection,
  generateStrengthsSection,
  generateShadowSection,
  generateJungianSection,
  generateRelationshipSection,
  generateCommunicationSection,
  generateTensionsSection,
  generateBlindSpotsSection,
  generateWhoYouCanBecomeSection,
  generateWhatYouNeedSection,
  generateGrowthPathSection,
  generateUnderstoodByOthersSection,
  generateUnderstandYourselfSection,
  generateReflectionSections,
  generateThirtyDayPlan,
  generateFinalSentence,
};
