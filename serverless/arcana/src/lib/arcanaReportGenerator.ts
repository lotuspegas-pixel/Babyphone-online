import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import { ARCHETYPE_CONTENT } from '../data/arcanaArchetypeContent';
import { SUB_DIMENSION_IDS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import { CLOSING_SENTENCE_FALLBACK } from '../data/arcanaReportBlocks';
import { REFLECTION_THEMES, type ReflectionTheme } from '../data/arcanaReflections';
import { TRAIT_CONTENT } from '../data/arcanaTraitContent';
import { scoreBand } from './arcanaScoringEngine';
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

const REPORT_VERSION = '2.0.0';

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
): ArcanaReportSection {
  return { id, title, intro, paragraphs, bullets };
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
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 3);

  const bullets = top.map((id) => {
    const t = TRAIT_CONTENT[id];
    return `${t.label} (${result.subDimensions[id].score}/100): ${t.behavior}.`;
  });

  return section(
    'who-you-are',
    'Wie je bent',
    addressed(
      profile,
      `{naam}, dit is de kern die uit je antwoorden naar voren komt — niet als etiket, maar als het patroon dat het vaakst terugkwam.`,
      'Dit is de kern die uit je antwoorden naar voren komt — niet als etiket, maar als het patroon dat het vaakst terugkwam.',
    ),
    [
      primary.baseText,
      `Wat voor mens dat maakt, laat zich het best aflezen aan je drie sterkst uitgeslagen eigenschappen. Die bepalen niet alles, maar ze verklaren wel waarom bepaalde situaties je moeiteloos afgaan en andere onevenredig veel van je vragen.`,
      content.whoYouCanBecome,
    ],
    bullets,
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

  const bullets = top.map((id) => `${labels[id]} scoort ${scoreBand(main[id].score)} (${main[id].score}/100)`);

  return section(
    'core-pattern',
    'Jouw kernpatroon',
    'Drie hoofddimensies steken het scherpst boven de rest uit en vormen samen de kern van hoe jij in het leven staat.',
    [
      `Wat opvalt is dat vooral ${labels[top[0]]} en ${labels[top[1]]} je gedrag sturen. Dat is geen toeval: de onderliggende subdimensies daarachter kwamen consistent terug in je antwoorden op vragen over heel verschillende situaties.`,
      'Dat wil niet zeggen dat de rest van je profiel er niet toe doet — het betekent dat deze combinatie de meeste verklaringskracht heeft voor waarom je doet wat je doet, en waarom bepaalde situaties meer bij je binnenkomen dan andere.',
    ],
    bullets,
  );
}

function generateSeenByOthersSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, VISIBLE_DIMENSIONS, 3);
  const bullets = top.map((id) => {
    const t = TRAIT_CONTENT[id];
    return `${t.label}: ${t.behavior}, waardoor ${t.effect}.`;
  });
  return section(
    'seen-by-others',
    'Wat anderen aan jou zien',
    'Dit is de kant van je persoonlijkheid die het snelst zichtbaar wordt in gedrag, ook voor mensen die je nog niet goed kennen.',
    [
      'Deze eigenschappen zijn niet je hele verhaal, maar wel het deel dat als eerste indruk blijft hangen. In Jungs taal is dit je persona: het gezicht dat je meeneemt naar buiten. Een persona is niet oneerlijk — je hebt er een nodig. Hij wordt pas een probleem wanneer je hem thuis niet meer af krijgt.',
    ],
    bullets,
  );
}

function generateHiddenInnerWorldSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, HIDDEN_DIMENSIONS, 3);
  const bullets = top.map((id) => {
    const t = TRAIT_CONTENT[id];
    return `${t.label}: van binnen draait dit om ${t.hiddenNeed}, maar de meeste mensen om je heen merken alleen dat ${t.behavior} — niet hoe sterk dat vanbinnen speelt.`;
  });
  return section(
    'hidden-inner-world',
    'Wat mensen vaak niet aan jou zien',
    'Onder de zichtbare laag zit een deel van je patroon dat je minder snel laat zien, ook aan mensen die dichtbij staan.',
    [
      'Dit is niet iets wat je verbergt om te misleiden — het is vaak zo vertrouwd geworden dat je het zelf nauwelijks meer opmerkt.',
    ],
    bullets,
  );
}

function generateAloneSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, SOLO_DIMENSIONS, 3);
  const solitude = result.subDimensions.solitudeNeed.score;

  const bullets = top.map((id) => `${TRAIT_CONTENT[id].label}: ${TRAIT_CONTENT[id].alone}.`);

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
    'Wie je bent zonder publiek is vaak eerlijker dan wie je bent in gezelschap, en het is de versie waar je het minst over praat.',
    paragraphs,
    bullets,
  );
}

function generateWithOthersSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, SOCIAL_DIMENSIONS, 3);
  const bullets = top.map((id) => `${TRAIT_CONTENT[id].label}: ${TRAIT_CONTENT[id].withOthers}.`);

  const social = result.mainDimensions.socialPattern.score;

  const paragraphs = [
    content.withOthers,
    'Let bij het lezen hiervan op het verschil tussen bekende en onbekende gezelschappen. De meeste mensen zijn in een vertrouwde groep een ander mens dan onder vreemden, en het is de moeite waard om te weten welke van de twee jij als "jezelf" beschouwt.',
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
  );
}

function generateAtWorkSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const score = result.mainDimensions.workStyle.score;
  const top = topSubDimensions(result.subDimensions, WORK_DIMENSIONS, 3);
  const bullets = top.map((id) => `${TRAIT_CONTENT[id].label}: ${TRAIT_CONTENT[id].atWork}.`);

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
      `Betekenis speelt hierbij een rol die je niet moet onderschatten (${result.subDimensions.meaningNeed.score}/100): ${TRAIT_CONTENT.meaningNeed.behavior}. Werk dat daar haaks op staat kost je meer energie dan de taak zelf rechtvaardigt.`,
    ],
    bullets,
  );
}

function generateCloseCircleSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, CLOSE_CIRCLE_DIMENSIONS, 3);
  const bullets = top.map((id) => `${TRAIT_CONTENT[id].label}: ${TRAIT_CONTENT[id].closeCircle}.`);

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
    'In langdurige banden gedraagt bijna iedereen zich anders dan op werk of onder vreemden. Oude rollen liggen daar het dichtst aan de oppervlakte.',
    paragraphs,
    bullets,
  );
}

function generateStressSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const stressDef = STRESS_ARCHETYPES.find((s) => s.id === result.stressArchetype);
  const stressDimMap: Record<string, SubDimensionId> = {
    theController: 'stressControl',
    theVanisher: 'stressWithdrawal',
    theSprinter: 'stressAcceleration',
    theFrozenOne: 'stressFreeze',
    thePleaser: 'peoplePleasing',
    theDefender: 'shadowDefensiveness',
  };
  const dimId = stressDimMap[result.stressArchetype];
  const t = TRAIT_CONTENT[dimId];
  const s = result.subDimensions[dimId].score;

  return section(
    'stress',
    'Hoe je bent onder druk',
    `Onder druk laat jij vooral het patroon van ${stressDef?.name} zien: ${stressDef?.description}`,
    [
      content.underPressure,
      `Concreet vertaalt zich dat naar: ${t.behavior}. De drijfveer eronder is ${t.hiddenNeed} (${s}/100, ${scoreBand(s)}).`,
      `De valkuil daarbij is dat ${t.pitfall}. Groeisleutel: ${t.growthKey}. Jung zou hier wijzen op enantiodromie: elke houding die je te lang en te ver doorzet, slaat op een dag om in haar tegendeel. Dat is te voorkomen door de andere kant kleine, vrijwillige beurten te geven voordat die zijn beurt met geweld opeist.`,
    ],
  );
}

function generateAtEaseSection(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const top = topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 3);
  const bullets = top.map((id) => `${TRAIT_CONTENT[id].label}: ${TRAIT_CONTENT[id].atEase}.`);

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
      'Als je jezelf hier niet in herkent, is dat op zichzelf informatie. Het kan betekenen dat je zelden lang genoeg veilig bent geweest om deze versie van jezelf te leren kennen — en dat is geen tekortkoming, maar wel iets om serieus te nemen.',
    ],
    bullets,
  );
}

function generateStrengthsSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 5);
  const bullets = top.map((id) => {
    const t = TRAIT_CONTENT[id];
    const s = result.subDimensions[id].score;
    return `${t.label} (${s}/100, ${scoreBand(s)}): ${t.behavior}. Dit komt voort uit ${t.hiddenNeed}, en het effect is dat ${t.effect}.`;
  });
  return section(
    'strengths',
    'Jouw sterke punten',
    'Dit zijn de vijf subdimensies waar je het hoogst op scoort — de plekken waar je patroon het sterkst en meest natuurlijk naar buiten komt.',
    [
      'Let op: een sterke eigenschap is niet hetzelfde als een deugd. Dit zijn de eigenschappen die je het makkelijkst inzet, ook op momenten waarop een andere aanpak beter was geweest.',
    ],
    bullets,
  );
}

function generateShadowSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 5);
  const bullets = top.map((id) => {
    const t = TRAIT_CONTENT[id];
    const s = result.subDimensions[id].score;
    return `${t.label} (${s}/100, ${scoreBand(s)}): valkuil — ${t.pitfall}. Groeisleutel: ${t.growthKey}.`;
  });
  return section(
    'shadow',
    'Je valkuilen',
    'Elke kracht heeft een keerzijde. Dit zijn de patronen die, als ze te sterk worden, tegen je gaan werken in plaats van voor je.',
    [
      'Dit is geen diagnose en geen tekortkoming — het zijn de plekken waar bewustwording het meeste oplevert.',
    ],
    bullets,
  );
}

function generateJungianSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const topShadow = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 2);
  const lowest = SUB_DIMENSION_IDS.slice()
    .sort((a, b) => result.subDimensions[a].score - result.subDimensions[b].score)
    .slice(0, 2);

  const bullets = [
    ...topShadow.map((id) => `${TRAIT_CONTENT[id].label}: ${TRAIT_CONTENT[id].jungian}`),
    ...lowest.map(
      (id) =>
        `${TRAIT_CONTENT[id].label} scoort met ${result.subDimensions[id].score}/100 opvallend laag. Jung zou vragen of deze eigenschap werkelijk ontbreekt, of dat je hem hebt weggelegd. Wat je bij anderen op dit punt afkeurt of juist bewondert, wijst meestal naar het antwoord.`,
    ),
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
      `Je vertrouwensbehoefte (${trustScore}/100) en intimiteitsbehoefte (${intimacyScore}/100) bepalen samen hoe snel je mensen echt dichtbij laat komen: ${TRAIT_CONTENT.trustNeed.behavior}.`,
      conflictAvoidanceScore > 60
        ? `Je conflictvermijding (${conflictAvoidanceScore}/100) zorgt ervoor dat je liever de sfeer bewaart dan spanning aangaat, wat op korte termijn rust geeft maar op lange termijn onuitgesproken irritatie kan opstapelen.`
        : `Je bent relatief bereid om spanning direct aan te gaan (conflictvermijding: ${conflictAvoidanceScore}/100), wat helpt om irritatie niet te laten opstapelen.`,
    ],
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
        ? `Je valkuil: ${TRAIT_CONTENT.directness.pitfall}. Groeisleutel: ${TRAIT_CONTENT.directness.growthKey}.`
        : `Je valkuil: ${TRAIT_CONTENT.conflictAvoidance.pitfall}. Groeisleutel: ${TRAIT_CONTENT.conflictAvoidance.growthKey}.`,
    ],
  );
}

function generateTensionsSection(result: ArcanaScoreResult): ArcanaReportSection {
  const withLabels = result.tensions.map((tension) => {
    const def = TENSION_DEFINITIONS.find((d) => d.id === tension.id)!;
    const [labelA, labelB] = def.label.split(' versus ');
    return { ...tension, label: def.label, labelA, labelB };
  });

  const active = withLabels.filter((t) => t.active);
  const pool = active.length >= 3 ? active : withLabels;
  const top = pool
    .slice()
    .sort((a, b) => b.scoreA + b.scoreB - (a.scoreA + a.scoreB))
    .slice(0, 3);

  const bullets = top.map((t) => {
    const intensity = t.intense ? 'zeer sterk aanwezig' : t.active ? 'actief aanwezig' : 'op de achtergrond aanwezig';
    return `${t.label} (${intensity}): ${t.labelA} scoort ${t.scoreA}/100, ${t.labelB.toLowerCase()} scoort ${t.scoreB}/100. Beide trekken tegelijk aan je, en geen van beide wint definitief.`;
  });

  return section(
    'tensions',
    'Je spanningsvelden',
    'Spanningsvelden ontstaan wanneer twee echte behoeften in jou tegelijk sterk zijn, zonder dat de één de ander opheft.',
    [
      'Dit zijn geen tegenstrijdigheden die opgelost moeten worden — het zijn polen die om beurten om aandacht vragen, afhankelijk van de situatie.',
      'Jung noemde dit het spanningspaar, en hij zag er de motor van ontwikkeling in. Wie zo\'n paar te snel platslaat door één kant te kiezen, verliest niet alleen de andere kant maar ook de beweging. Wie de spanning lang genoeg verdraagt, ziet er soms een derde weg uit ontstaan die hij vooraf niet had kunnen bedenken.',
    ],
    bullets,
  );
}

function generateBlindSpotsSection(result: ArcanaScoreResult): ArcanaReportSection {
  const shadowTop5 = new Set(topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 5));
  const remaining = RISK_DIMENSIONS.filter((id) => !shadowTop5.has(id));
  const blindSpots = topSubDimensions(result.subDimensions, remaining, 2);

  const bullets = blindSpots.map((id) => {
    const t = TRAIT_CONTENT[id];
    const s = result.subDimensions[id].score;
    return `${t.label} (${s}/100): dit patroon is minder op de voorgrond, maar ${t.pitfall} — vaak juist omdat het weinig aandacht krijgt.`;
  });

  if (result.responseQuality.notes.length > 0) {
    bullets.push(...result.responseQuality.notes);
  }

  return section(
    'blind-spots',
    'Je blinde vlekken',
    'Blinde vlekken zijn de patronen die net onder de radar blijven — niet groot genoeg om als schaduwkant op te vallen, maar wel invloedrijk.',
    [
      'Een blinde vlek herken je zelden aan het patroon zelf, maar aan de reacties die het oproept. Als meerdere mensen je onafhankelijk van elkaar hetzelfde hebben teruggegeven, is de kans groot dat het hier staat.',
    ],
    bullets,
  );
}

function generateWhoYouCanBecomeSection(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const primary = archetypeById(result.primaryArchetype);
  const growthScore = result.subDimensions.growthReadiness.score;
  const phaseNote = LIFE_PHASE_NOTE[profile.lifePhase];

  const paragraphs = [
    content.whoYouCanBecome,
    `Individuatie — Jungs woord voor dit proces — gaat niet over iemand anders worden. Het gaat over vollediger worden: dezelfde mens, met minder dwang. Voor jou als ${primary.name} betekent dat niet dat je patroon verdwijnt, maar dat je het inzet omdat je ervoor kiest in plaats van omdat het je overkomt.`,
    `Je groeibereidheid scoort ${scoreBand(growthScore)} (${growthScore}/100). Dat bepaalt vooral het tempo, niet de bestemming.`,
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
  );
}

function generateWhatYouNeedSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const shadowTop = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 2);

  const bullets = [
    ...content.whatYouNeed,
    ...shadowTop.map((id) => `${TRAIT_CONTENT[id].label}: ${TRAIT_CONTENT[id].growthKey}.`),
  ];

  return section(
    'what-you-need',
    'Wat je nodig hebt om dat te worden',
    'Voorwaarden, geen voornemens. Dit zijn de omstandigheden en oefeningen die bij jouw specifieke patroon het meeste verschil maken.',
    [
      'Kies er één. Wie aan alles tegelijk begint, verandert doorgaans niets — en bij jouw profiel is dat een reëel risico.',
    ],
    bullets,
  );
}

function generateGrowthPathSection(result: ArcanaScoreResult): ArcanaReportSection {
  const shadowTop5 = new Set(topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 5));
  const remaining = RISK_DIMENSIONS.filter((id) => !shadowTop5.has(id));
  const growthDims = topSubDimensions(result.subDimensions, remaining.length >= 2 ? remaining : RISK_DIMENSIONS, 2);

  const bullets = growthDims.map((id) => `${TRAIT_CONTENT[id].label}: ${TRAIT_CONTENT[id].growthKey}.`);
  const growthScore = result.subDimensions.growthReadiness.score;

  return section(
    'growth-path',
    'Je groeipad',
    `Je groeibereidheid scoort ${scoreBand(growthScore)} (${growthScore}/100) — dat bepaalt hoeveel ruimte je jezelf momenteel geeft om naar deze patronen te kijken.`,
    [
      'Groei betekent hier niet dat een patroon verdwijnt, maar dat je sneller herkent wanneer het aan het stuur zit — en dan bewust kunt kiezen of je dat wilt.',
    ],
    bullets,
  );
}

function generateUnderstoodByOthersSection(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const hidden = topSubDimensions(result.subDimensions, HIDDEN_DIMENSIONS, 2);

  const bullets = [
    ...content.howOthersShouldUnderstand,
    ...hidden.map(
      (id) => `Wat mensen makkelijk missen: ${TRAIT_CONTENT[id].hiddenNeed}. Van buiten zien ze vooral dat ${TRAIT_CONTENT[id].behavior}.`,
    ),
  ];

  return section(
    'understood-by-others',
    'Hoe anderen jou zouden moeten begrijpen',
    addressed(
      profile,
      '{naam}, dit is het deel dat je zou kunnen laten lezen aan iemand die dichtbij staat. Het is geschreven om door te geven.',
      'Dit is het deel dat je zou kunnen laten lezen aan iemand die dichtbij staat. Het is geschreven om door te geven.',
    ),
    [
      'Belangrijk: dit is geen vrijbrief. "Zo ben ik nu eenmaal" is het einde van een gesprek, niet het begin. Gebruik dit om jezelf uit te leggen, niet om jezelf te verdedigen.',
    ],
    bullets,
  );
}

function generateUnderstandYourselfSection(result: ArcanaScoreResult): ArcanaReportSection {
  const content = ARCHETYPE_CONTENT[result.primaryArchetype];
  const topShadow = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 1)[0];

  const bullets = [
    ...content.howToUnderstandYourself,
    `Let deze maand op momenten waarop dit gebeurt: ${TRAIT_CONTENT[topShadow].behavior}. Noteer wat er vlak daarvoor gebeurde — daar zit de trigger, niet in het gedrag zelf.`,
    'Vraag aan twee mensen die je vertrouwen: wat merk jij aan mij dat ik zelf waarschijnlijk niet doorheb? Vraag door tot het ongemakkelijk wordt; daar begint de informatie.',
  ];

  return section(
    'understand-yourself',
    'Hoe je jezelf beter kunt begrijpen',
    'Zelfkennis komt zelden uit nadenken. Ze komt uit terugkijken op wat je deed toen je niet nadacht.',
    [content.ifItDoesNotFit],
    bullets,
  );
}

/** Kiest de duidingen waarvan alle scorecondities gelden. */
function matchingReflections(theme: ReflectionTheme, sub: Record<SubDimensionId, SubDimensionScore>): string[] {
  const matches = theme.rules
    .filter((rule) =>
      rule.when.every((condition) => {
        const value = sub[condition.id].score;
        return value >= (condition.min ?? 0) && value <= (condition.max ?? 100);
      }),
    )
    .map((rule) => rule.text);

  return matches.length > 0 ? matches.slice(0, 3) : [theme.fallback];
}

function generateReflectionSections(result: ArcanaScoreResult): ArcanaReportSection[] {
  return REFLECTION_THEMES.map((theme) =>
    section(
      `reflectie-${theme.id}`,
      theme.title,
      theme.essence[0],
      [...theme.essence.slice(1), `Vraag om bij stil te staan: ${theme.question}`],
      matchingReflections(theme, result.subDimensions),
    ),
  );
}

function generateThirtyDayPlan(result: ArcanaScoreResult): ArcanaReportSection {
  const primary = archetypeById(result.primaryArchetype);
  const topShadow = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 1)[0];
  const shadowTrait = TRAIT_CONTENT[topShadow];
  const topTension = generateTensionsSection(result).bullets[0] ?? '';
  const growthDims = topSubDimensions(
    result.subDimensions,
    RISK_DIMENSIONS.filter((id) => id !== topShadow),
    1,
  );
  const secondTrait = TRAIT_CONTENT[growthDims[0] ?? topShadow];

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
      task: `Beschrijf een situatie deze week waarin je dit voelde: ${topTension || 'twee behoeften trokken tegelijk aan je.'}`,
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
    'Vier weken, elk met een concrete stap, gebaseerd op jouw sterkste schaduwpatroon en spanningsveld.',
    [
      'Dit plan is bewust klein. Niet omdat je niet meer aankunt, maar omdat verandering die je op je slechtste dag niet volhoudt, geen verandering is.',
    ],
    bullets,
  );
}

function generateFinalSentence(result: ArcanaScoreResult, profile: ArcanaProfile): ArcanaReportSection {
  const primary = archetypeById(result.primaryArchetype);
  const topShadow = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 1)[0];
  const shadowTrait = TRAIT_CONTENT[topShadow];

  const sentence =
    result.responseQuality.confidenceLevel === 'low'
      ? CLOSING_SENTENCE_FALLBACK
      : addressed(
          profile,
          `{naam}, jouw kracht als ${primary.name} zit niet in het wegwerken van ${shadowTrait.label.toLowerCase()}, maar in het steeds sneller herkennen van het moment waarop dat patroon het overneemt.`,
          `Jouw kracht als ${primary.name} zit niet in het wegwerken van ${shadowTrait.label.toLowerCase()}, maar in het steeds sneller herkennen van het moment waarop dat patroon het overneemt.`,
        );

  return section('final-sentence', 'Samenvatting in één zin', sentence, [
    'En tot slot iets wat in geen enkele score staat: je hoeft niet eerst genezen te zijn om blij te mogen zijn. De blijdschap ligt niet aan het eind van je groeipad — ze ligt ernaast, de hele weg.',
    CLOSING_SENTENCE_FALLBACK,
  ]);
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
