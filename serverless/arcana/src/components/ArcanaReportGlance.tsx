import { ARCHETYPES } from '../data/arcanaArchetypes';
import { MAIN_DIMENSIONS, TENSION_DEFINITIONS } from '../data/arcanaDimensions';
import { CONFIDENCE_TEXT, MAIN_DIMENSION_GLOSS } from '../data/arcanaReportBlocks';
import type { ArcanaReport as ReportType, MainDimensionId } from '../types/arcana';

interface Props {
  report: ReportType;
  /** Aantal vragen in de test, voor de betrouwbaarheidsregel. */
  questionCount: number;
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
 * "Je rapport in het kort": de samenvatting die op zichzelf staat, direct
 * onder de masthead en vóór het portret (C §3.1).
 *
 * Regels: geen enkele verwijzing naar iets erboven of eronder als voorwaarde
 * om dit te begrijpen; elke uitspraak met een cijfer; de betrouwbaarheidszin
 * in dezelfde kaart; en drie knoppen die geen van drieën iets vernietigen.
 * Introduceert geen nieuwe rapporttekst — elke kaart is een selectie van al
 * bestaande, uit scores afgeleide data, met een ankerlink naar het hoofdstuk.
 * Onderdelen die niet bestaan (bijvoorbeeld geen actief spanningsveld) vallen
 * weg; er wordt nooit met placeholdertekst gevuld.
 */
export function ArcanaReportGlance({ report, questionCount }: Props) {
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
    eyebrow: `Je sterkste patroon · ${primaryScore}/100`,
    title: primaryDef.name,
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
      eyebrow: 'Je eerste stap',
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
      eyebrow: 'Wat het meest aan je trekt',
      title: tensionDef.label,
      body:
        `${labelA} scoort ${activeTension.scoreA}/100 en ${labelB} ${activeTension.scoreB}/100. ` +
        'Allebei hoog, dus geen van beide wint — daarom blijft die keuze bij je terugkomen.',
      href: '#tensions',
      hrefLabel: 'Lees je spanningsvelden',
    });
  }

  const quality = report.meta.responseQuality;
  const beantwoord = Math.round(quality.completionRate * questionCount);

  return (
    <>
      <p className="arcana-card-kicker">
        <span className="arcana-card-mark" aria-hidden="true" />
        Je rapport in het kort
      </p>
      <h3>Wat er uit je antwoorden kwam</h3>
      <p className="arcana-core__lead">
        Deze pagina staat op zichzelf. Lees je verder niets, dan heb je hiermee het antwoord.
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
            title="Kies in het printvenster bij bestemming: Opslaan als PDF"
          >
            Bewaar als PDF
          </button>
          <a className="arcana-button arcana-button--ghost" href="#arcana-report-toc">
            Inhoudsopgave
          </a>
        </div>
      </div>
    </>
  );
}
