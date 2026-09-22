import { ARCHETYPES } from '../data/arcanaArchetypes';
import { MAIN_DIMENSIONS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import { MAIN_DIMENSION_GLOSS } from '../data/arcanaReportBlocks';
import type { ArcanaReport as ReportType, MainDimensionId } from '../types/arcana';

interface Props {
  report: ReportType;
}

interface CoreCard {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Anker naar de sectie verderop waar dit gegeven volledig wordt uitgewerkt. */
  href?: string;
  hrefLabel?: string;
  /** De valkuil krijgt visueel een andere behandeling dan de rest. */
  tone?: 'warn';
}

/** De twee hoofddimensies die het verst boven het midden liggen. */
function strongestTwo(report: ReportType) {
  return [...MAIN_DIMENSIONS]
    .map((dim) => ({ dim, score: report.scores.mainDimensions[dim.id as MainDimensionId].score }))
    .sort((a, b) => b.score - a.score || MAIN_DIMENSIONS.indexOf(a.dim) - MAIN_DIMENSIONS.indexOf(b.dim))
    .slice(0, 2);
}

/**
 * "De kern": het compacte hart van het rapport, direct onder het portret.
 *
 * Introduceert geen nieuwe rapporttekst — elke kaart is een selectie van al
 * bestaande, uit scores afgeleide data, met een ankerlink naar de sectie waar
 * hetzelfde punt volledig wordt uitgewerkt. Zo weet een lezer binnen één scherm
 * wat er uit kwam, zonder eerst 32 hoofdstukken te moeten doorlopen.
 * Onderdelen die niet bestaan (bijvoorbeeld geen actief spanningsveld) vallen
 * weg; er wordt nooit met placeholdertekst gevuld.
 */
export function ArcanaReportGlance({ report }: Props) {
  const primaryDef = ARCHETYPES.find((a) => a.id === report.archetypes.primary)!;
  const secondaryDef = ARCHETYPES.find((a) => a.id === report.archetypes.secondary);
  const primaryScore = report.scores.archetypeScores[report.archetypes.primary]?.score;
  const secondaryScore = report.scores.archetypeScores[report.archetypes.secondary]?.score;

  const section = (id: string) => report.sections.find((s) => s.id === id);

  const cards: CoreCard[] = [];

  // 1 — Waarom juist dit archetype, herleid naar de twee sterkste dimensies.
  const [first, second] = strongestTwo(report);
  const gap =
    typeof primaryScore === 'number' && typeof secondaryScore === 'number'
      ? primaryScore - secondaryScore
      : undefined;
  const tweedeZin =
    secondaryDef && typeof secondaryScore === 'number'
      ? gap !== undefined && gap <= 3
        ? ` ${secondaryDef.name} komt met ${secondaryScore}/100 vrijwel even sterk naar voren — lees beide portretten, ze gelden allebei.`
        : ` Het tweede beeld uit dezelfde antwoorden is ${secondaryDef.name} (${secondaryScore}/100), ${gap} punten lager: hoorbaar, maar niet leidend.`
      : '';
  cards.push({
    key: 'archetype',
    eyebrow: `In het hart van het portret · ${primaryScore}/100`,
    title: `Waarom ${primaryDef.name}`,
    body:
      `Twee dimensies sturen het sterkst: je ${first.dim.label.toLowerCase()} (${first.score}) — ` +
      `${MAIN_DIMENSION_GLOSS[first.dim.id]} — en je ${second.dim.label.toLowerCase()} (${second.score}), die bepaalt ` +
      `hoe dat naar buiten komt. Samen maken ze dit profiel.${tweedeZin}`,
    href: '#who-you-are',
    hrefLabel: 'Lees wie je bent',
  });

  // 2 — Wat er onder druk gebeurt.
  const stress = section('stress');
  if (stress?.intro) {
    cards.push({
      key: 'stress',
      eyebrow: 'Zodra de druk oploopt',
      title: stress.title,
      body: stress.intro,
      href: '#stress',
      hrefLabel: 'Lees het hele hoofdstuk',
    });
  }

  // 3 — De grootste valkuil.
  const shadowBullet = section('shadow')?.bullets[0];
  if (shadowBullet) {
    cards.push({
      key: 'shadow',
      eyebrow: 'Grootste valkuil',
      title: 'Waar je kracht doorschiet',
      body: shadowBullet,
      href: '#shadow',
      hrefLabel: 'Lees al je valkuilen',
      tone: 'warn',
    });
  }

  // 4 — De eerste concrete stap.
  const growthBullet = section('growth-path')?.bullets[0];
  if (growthBullet) {
    cards.push({
      key: 'growth',
      eyebrow: 'Waar je groei zit',
      title: 'De eerste concrete stap',
      body: growthBullet,
      href: '#growth-path',
      hrefLabel: 'Lees je groeipad',
    });
  }

  // 5 — Het spanningsveld dat het hardst trekt.
  const activeTension = report.tensions.filter((t) => t.active)[0];
  const tensionDef = activeTension ? TENSION_DEFINITIONS.find((d) => d.id === activeTension.id) : undefined;
  if (activeTension && tensionDef) {
    const [labelA, labelB] = tensionDef.label.split(' versus ');
    cards.push({
      key: 'tension',
      eyebrow: 'Wat er aan je trekt',
      title: tensionDef.label,
      body:
        `${labelA} scoort ${activeTension.scoreA}/100 en ${labelB} ${activeTension.scoreB}/100. ` +
        'Allebei hoog, dus geen van beide wint — daarom blijft die keuze bij je terugkomen.',
      href: '#tensions',
      hrefLabel: 'Lees je spanningsvelden',
    });
  }

  return (
    <>
      <p className="arcana-card-kicker">
        <span className="arcana-card-mark" aria-hidden="true" />
        Profiel
      </p>
      <h3>De kern</h3>
      <p className="arcana-core__lead">
        Dezelfde meting als in het portret hierboven, nu in woorden. Vijf punten; alles daarna is verdieping.
      </p>
      <div className="arcana-core">
        {cards.map((card) => (
          <article key={card.key} className="arcana-core__card" data-tone={card.tone}>
            <p className="arcana-core__eyebrow">{card.eyebrow}</p>
            <h4 className="arcana-core__title">{card.title}</h4>
            <p className="arcana-core__body">{card.body}</p>
            {card.href && (
              <a className="arcana-core__link" href={card.href}>
                {card.hrefLabel} →
              </a>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
