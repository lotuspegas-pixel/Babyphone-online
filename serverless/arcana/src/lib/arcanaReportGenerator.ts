import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import { SUB_DIMENSION_IDS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import { CLOSING_SENTENCE_FALLBACK } from '../data/arcanaReportBlocks';
import { TRAIT_CONTENT } from '../data/arcanaTraitContent';
import { scoreBand } from './arcanaScoringEngine';
import type {
  ArcanaReport,
  ArcanaReportSection,
  ArcanaScoreResult,
  ArchetypeId,
  SubDimensionId,
  SubDimensionScore,
} from '../types/arcana';

const REPORT_VERSION = '1.0.0';

/** Subdimensions that, when elevated, represent shadow/pitfall material rather than pure strength. */
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

/** Subdimensions that tend to be visible to others. */
const VISIBLE_DIMENSIONS: SubDimensionId[] = [
  'directness',
  'socialEnergy',
  'recognitionNeed',
  'connectionNeed',
  'selfConfidence',
  'creativeThinking',
  'practicalThinking',
];

/** Subdimensions that tend to stay hidden underneath the surface. */
const HIDDEN_DIMENSIONS: SubDimensionId[] = [
  'selfDoubt',
  'emotionalSensitivity',
  'shadowAvoidance',
  'stressWithdrawal',
  'criticismSensitivity',
  'trustNeed',
  'intimacyNeed',
];

function archetypeById(id: ArchetypeId) {
  const found = ARCHETYPES.find((a) => a.id === id);
  if (!found) throw new Error(`Unknown archetype ${id}`);
  return found;
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

function generateHeroSection(result: ArcanaScoreResult): ArcanaReportSection {
  const primary = archetypeById(result.primaryArchetype);
  const secondary = archetypeById(result.secondaryArchetype);
  const primaryScore = result.archetypeScores[result.primaryArchetype].score;

  return section(
    'hero',
    'Jouw archetype: ' + primary.name,
    `Op basis van je 120 antwoorden komt ${primary.name} het sterkst naar voren (score ${primaryScore}/100), met ${secondary.name} als tweede stem op de achtergrond.`,
    [
      primary.baseText,
      `Waar ${primary.name} de toon zet, kleurt ${secondary.name} de nuances: dat betekent dat je patronen niet in één hokje passen, maar een combinatie zijn van deze twee stemmen.`,
    ],
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
      `Dat wil niet zeggen dat de rest van je profiel er niet toe doet — het betekent dat deze combinatie de meeste verklaringskracht heeft voor waarom je doet wat je doet, en waarom bepaalde situaties meer bij je binnenkomen dan andere.`,
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
      'Deze eigenschappen zijn niet je hele verhaal, maar wel het deel dat als eerste indruk blijft hangen.',
    ],
    bullets,
  );
}

function generateHiddenInnerWorldSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, HIDDEN_DIMENSIONS, 3);
  const bullets = top.map((id) => {
    const t = TRAIT_CONTENT[id];
    return `${t.label}: ${t.hiddenNeed}, terwijl ${t.effect.replace('mensen', 'de meeste mensen om je heen')} vaak niet doorheeft hoe sterk dat speelt.`;
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

function generateStrengthsSection(result: ArcanaScoreResult): ArcanaReportSection {
  const top = topSubDimensions(result.subDimensions, SUB_DIMENSION_IDS, 5);
  const bullets = top.map((id) => {
    const t = TRAIT_CONTENT[id];
    const s = result.subDimensions[id].score;
    return `${t.label} (${s}/100, ${scoreBand(s)}): ${t.behavior}. Dit komt voort uit ${t.hiddenNeed}, en het effect is dat ${t.effect}.`;
  });
  return section(
    'strengths',
    'Jouw natuurlijke kracht',
    'Dit zijn de vijf subdimensies waar je het hoogst op scoort — de plekken waar je patroon het sterkst en meest natuurlijk naar buiten komt.',
    [],
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
    'Je schaduwkant',
    'Elke kracht heeft een keerzijde. Dit zijn de patronen die, als ze te sterk worden, tegen je gaan werken in plaats van voor je.',
    [
      'Dit is geen diagnose en geen tekortkoming — het zijn de plekken waar bewustwording het meeste oplevert.',
    ],
    bullets,
  );
}

function generateStressSection(result: ArcanaScoreResult): ArcanaReportSection {
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
    'Je stressprofiel',
    `Onder druk laat jij vooral het patroon van ${stressDef?.name} zien: ${stressDef?.description}`,
    [
      `Dat vertaalt zich concreet naar: ${t.behavior}. De onderliggende drijfveer is ${t.hiddenNeed} (${s}/100, ${scoreBand(s)}).`,
      `De valkuil daarbij is dat ${t.pitfall}. Groeisleutel: ${t.growthKey}.`,
    ],
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

function generateWorkStyleSection(result: ArcanaScoreResult): ArcanaReportSection {
  const score = result.mainDimensions.workStyle.score;
  const practical = result.subDimensions.practicalThinking.score;
  const analytical = result.subDimensions.analyticalThinking.score;
  const creative = result.subDimensions.creativeThinking.score;
  const control = result.subDimensions.controlNeed.score;

  const dominant = [
    { label: 'praktisch uitvoeren', value: practical },
    { label: 'analytisch doordenken', value: analytical },
    { label: 'creatief bedenken', value: creative },
    { label: 'structureren en plannen', value: control },
  ].sort((a, b) => b.value - a.value)[0];

  return section(
    'work-style',
    'Je werkstijl',
    `Je werkstijl scoort ${scoreBand(score)} (${score}/100); het sterkste onderdeel daarin is ${dominant.label} (${dominant.value}/100).`,
    [
      `Dat betekent dat je het beste werkt wanneer een taak ruimte geeft aan die kant van je — en dat werk dat daar haaks op staat sneller energie kost dan het zou moeten.`,
      `Betekenis (${result.subDimensions.meaningNeed.score}/100) speelt hierbij een grote rol: ${TRAIT_CONTENT.meaningNeed.behavior}.`,
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
        ? `${TRAIT_CONTENT.directness.pitfall}. ${TRAIT_CONTENT.directness.growthKey}.`
        : `${TRAIT_CONTENT.conflictAvoidance.pitfall}. ${TRAIT_CONTENT.conflictAvoidance.growthKey}.`,
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
    [],
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
      goal: `Herkennen hoe het spanningsveld tussen je twee sterkste behoeften in de praktijk werkt.`,
      task: `Beschrijf een situatie deze week waarin je dit voelde: ${topTension || 'twee behoeften trokken tegelijk aan je.'}`,
      reflection: 'Welke van de twee kanten kreeg dit keer de overhand, en waarom?',
    },
    {
      week: 3,
      title: 'Eén nieuw gedrag oefenen',
      goal: `Eén keer bewust anders reageren dan je automatische patroon.`,
      task: `Oefen minstens één keer met: "${secondTrait.growthKey}."`,
      reflection: 'Wat voelde er anders in het moment zelf, en achteraf?',
    },
    {
      week: 4,
      title: 'Nieuwe richting verankeren',
      goal: `Een concrete gewoonte bouwen die past bij ${primary.name}.`,
      task: `Kies één van de vorige drie oefeningen om vast onderdeel te maken van je week.`,
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
    [],
    bullets,
  );
}

function generateFinalSentence(result: ArcanaScoreResult): ArcanaReportSection {
  const primary = archetypeById(result.primaryArchetype);
  const topShadow = topSubDimensions(result.subDimensions, RISK_DIMENSIONS, 1)[0];
  const shadowTrait = TRAIT_CONTENT[topShadow];

  const sentence =
    result.responseQuality.confidenceLevel === 'low'
      ? CLOSING_SENTENCE_FALLBACK
      : `Jouw kracht als ${primary.name} zit niet in het wegwerken van ${shadowTrait.label.toLowerCase()}, maar in het steeds sneller herkennen van het moment waarop dat patroon het overneemt.`;

  return section('final-sentence', 'Samenvatting in één zin', sentence, []);
}

export function generateArcanaReport(result: ArcanaScoreResult, generatedAt: string = new Date(0).toISOString()): ArcanaReport {
  const sections: ArcanaReportSection[] = [
    generateHeroSection(result),
    generateCorePatternSection(result),
    generateSeenByOthersSection(result),
    generateHiddenInnerWorldSection(result),
    generateStrengthsSection(result),
    generateShadowSection(result),
    generateStressSection(result),
    generateRelationshipSection(result),
    generateWorkStyleSection(result),
    generateCommunicationSection(result),
    generateTensionsSection(result),
    generateBlindSpotsSection(result),
    generateGrowthPathSection(result),
    generateThirtyDayPlan(result),
    generateFinalSentence(result),
  ];

  return {
    meta: {
      generatedAt,
      version: REPORT_VERSION,
      responseQuality: result.responseQuality,
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
  generateCorePatternSection,
  generateSeenByOthersSection,
  generateHiddenInnerWorldSection,
  generateStrengthsSection,
  generateShadowSection,
  generateStressSection,
  generateRelationshipSection,
  generateWorkStyleSection,
  generateCommunicationSection,
  generateTensionsSection,
  generateBlindSpotsSection,
  generateGrowthPathSection,
  generateThirtyDayPlan,
  generateFinalSentence,
};
