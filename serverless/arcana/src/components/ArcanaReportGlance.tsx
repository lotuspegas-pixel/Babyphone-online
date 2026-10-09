import type { ReactNode } from 'react';

import { ARCHETYPES } from '../data/arcanaArchetypes';
import { MAIN_DIMENSIONS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import { CONFIDENCE_TEXT, MAIN_DIMENSION_GLOSS } from '../data/arcanaReportBlocks';
import type { ArcanaReport as ReportType, MainDimensionId } from '../types/arcana';
import { ArcanaReportEmblem } from './ArcanaReportEmblem';

interface Props {
  report: ReportType;
  /** Aantal vragen in de test, voor de betrouwbaarheidsregel. */
  questionCount: number;
  /** Aantal hoofdstukken in het deck, voor de cijferstrook. */
  chapterCount: number;
  /** Inhoudsopgave en legenda: die horen bij het blad "Inhoud & profielsamenvatting". */
  children?: ReactNode;
}

interface CoreCard {
  key: string;
  title: string;
  /** De regel in Courier ónder de titel: wat dit gegeven is, met zijn cijfer. */
  meta: string;
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
 * Het blad "Inhoud & profielsamenvatting" (cijferstrook en, als `children`,
 * de inhoudsopgave), gevolgd door "Wat er uit je antwoorden kwam": de
 * samenvatting die op zichzelf staat, direct onder de masthead en vóór het
 * portret (C §3.1). Naam en archetype staan op het scherm al in de masthead
 * en verschijnen hier alleen op papier (waar geen masthead is).
 *
 * Regels: geen enkele verwijzing naar iets erboven of eronder als voorwaarde
 * om dit te begrijpen; elke uitspraak met een cijfer; de betrouwbaarheidszin
 * in dezelfde kaart; en drie knoppen die geen van drieën iets vernietigen.
 * Introduceert geen nieuwe rapporttekst — elke kaart is een selectie van al
 * bestaande, uit scores afgeleide data, met een ankerlink naar het hoofdstuk.
 * Onderdelen die niet bestaan (bijvoorbeeld geen actief spanningsveld) vallen
 * weg; er wordt nooit met placeholdertekst gevuld.
 */
export function ArcanaReportGlance({ report, questionCount, chapterCount, children }: Props) {
  const primaryDef = ARCHETYPES.find((a) => a.id === report.archetypes.primary)!;
  const secondaryDef = ARCHETYPES.find((a) => a.id === report.archetypes.secondary);
  const primaryScore = report.scores.archetypeScores[report.archetypes.primary]?.score;
  const secondaryScore = report.scores.archetypeScores[report.archetypes.secondary]?.score;

  const section = (id: string) => report.sections.find((s) => s.id === id);

  const cards: CoreCard[] = [];

  // 1 — Waarom juist dit archetype, herleid naar de twee sterkste dimensies.
  const [first, second] = strongestTwo(report);
  const gap =
    typeof primaryScore === 'number' && typeof secondaryScore === 'number' ? primaryScore - secondaryScore : undefined;
  const tweedeZin =
    secondaryDef && typeof secondaryScore === 'number'
      ? gap !== undefined && gap <= 3
        ? ` Als tweede stem klinkt ${secondaryDef.name} (${secondaryScore}/100) mee — die twee liggen zo dicht bij elkaar dat geen van beide leidend is; je wisselt waarschijnlijk per situatie.`
        : ` Als tweede stem klinkt ${secondaryDef.name} (${secondaryScore}/100) mee, ${gap} punten lager: hoorbaar, maar niet leidend.`
      : '';
  cards.push({
    key: 'archetype',
    title: primaryDef.name,
    meta: `Je sterkste patroon · ${primaryScore}/100`,
    body:
      `Dat komt vooral uit twee dimensies: je ${first.dim.label.toLowerCase()} scoort ${first.score} — ` +
      `${MAIN_DIMENSION_GLOSS[first.dim.id]} — en je ${second.dim.label.toLowerCase()} scoort ${second.score}, die bepaalt ` +
      `hoe dat naar buiten komt. Samen verklaren die twee waarom sommige situaties je moeiteloos afgaan en andere onevenredig veel van je vragen.${tweedeZin}`,
    href: '#who-you-are',
    hrefLabel: 'Lees wie je bent',
  });

  // 2 — Wat er onder druk gebeurt.
  const stress = section('stress');
  if (stress?.intro) {
    cards.push({
      key: 'stress',
      title: stress.title,
      meta: 'Zodra de druk oploopt',
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
      title: 'Waar je kracht doorschiet',
      meta: 'Grootste valkuil',
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
      title: 'De eerste concrete stap',
      meta: 'Je eerste stap',
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
      title: tensionDef.label,
      meta: 'Wat het meest aan je trekt',
      body:
        `${labelA} scoort ${activeTension.scoreA}/100 en ${labelB} ${activeTension.scoreB}/100. ` +
        'Allebei hoog, dus geen van beide wint — daarom blijft die keuze bij je terugkomen.',
      href: '#tensions',
      hrefLabel: 'Lees je spanningsvelden',
    });
  }

  const quality = report.meta.responseQuality;
  const beantwoord = Math.round(quality.completionRate * questionCount);
  const name = report.meta.profile.name.trim();

  // Alleen getallen die uit dit rapport volgen — nooit een getal uit een voorbeeld.
  const stats = [
    { label: 'Antwoorden', value: beantwoord },
    { label: 'Hoofddimensies', value: Object.keys(report.scores.mainDimensions).length },
    { label: 'Subdimensies', value: Object.keys(report.scores.subDimensions).length },
    { label: 'Hoofdstukken', value: chapterCount },
  ];

  return (
    <>
      {/* Het blad "Inhoud & profielsamenvatting" (pagina 2 van de PDF): in
          cijfers wat er gemeten is, en waar alles staat. */}
      <section className="arcana-summary" id="samenvatting" aria-labelledby="arcana-summary-title">
        <div className="arcana-summary__head">
          <div className="arcana-summary__text">
            <h2 className="arcana-summary__title" id="arcana-summary-title">
              Inhoud &amp; profielsamenvatting
            </h2>
            <span className="arcana-rule" />
            {/* Op het scherm staan naam, archetype en de openingszin al op de
                voorpagina; op papier is er geen voorpagina-tekst, dus dan hier. */}
            <div className="arcana-summary__who arcana-print-only">
              {name && <p className="arcana-summary__name">{name}</p>}
              <p className="arcana-summary__archetype">{primaryDef.name}</p>
              {secondaryDef && <p className="arcana-summary__second">(tweede stem: {secondaryDef.name})</p>}
              <p className="arcana-summary__intro">{report.sections[0].intro}</p>
            </div>
          </div>
          <ArcanaReportEmblem archetype={report.archetypes.primary} className="arcana-emblem--summary" />
        </div>
        <dl className="arcana-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="arcana-stats__item">
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        {children}
      </section>

      <section className="arcana-core-sheet" id="in-het-kort" aria-labelledby="arcana-core-title" data-kind="profile">
        <h2 className="arcana-core-sheet__title" id="arcana-core-title">
          Wat er uit je antwoorden kwam
        </h2>
        <p className="arcana-core__lead">
          Deze pagina staat op zichzelf. Lees je verder niets, dan heb je hiermee het antwoord.
        </p>
        <div className="arcana-core">
          {cards.map((card) => (
            <article key={card.key} className="arcana-core__card arcana-torn" data-tone={card.tone}>
              <h3 className="arcana-core__title">{card.title}</h3>
              <p className="arcana-core__meta">{card.meta}</p>
              <p className="arcana-core__body">{card.body}</p>
              {card.href && (
                <a className="arcana-core__link arcana-print-hide" href={card.href}>
                  {card.hrefLabel} →
                </a>
              )}
            </article>
          ))}
        </div>
        <div className="arcana-samenvatting__foot">
          <p>
            Hoe stevig dit staat: je beantwoordde {beantwoord} van de {questionCount} vragen.{' '}
            {CONFIDENCE_TEXT[quality.confidenceLevel]}
          </p>
          <p>
            Alle uitspraken hierboven komen uit een gemeten score. Waar ze en je eigen ervaring uiteenlopen, is je
            ervaring leidend.
          </p>
          <div className="arcana-samenvatting__actions arcana-print-hide">
            <a className="arcana-button arcana-button--primary" href="#verdieping">
              Lees het hele rapport ↓
            </a>
            <button
              type="button"
              className="arcana-button arcana-button--ghost"
              onClick={() => window.print()}
              title="Opent het printvenster van je browser"
            >
              Printen
            </button>
            <a className="arcana-button arcana-button--ghost" href="#arcana-report-toc">
              Inhoudsopgave
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
