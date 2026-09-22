import { ARCHETYPES } from '../data/arcanaArchetypes';
import { QUESTION_COUNT } from '../data/arcanaQuestionCount';
import { DISCLAIMER_TEXT, PRIVACY_TEXT } from '../data/arcanaReportBlocks';
import { SECTION_GROUPS } from '../data/arcanaSectionGroups';
import type { ArcanaReport as ReportType, ArcanaReportSection as ReportSectionType } from '../types/arcana';
import { ArcanaArchetypeCard } from './ArcanaArchetypeCard';
import { ArcanaBackToTocButton } from './ArcanaBackToTocButton';
import { ArcanaExportButton } from './ArcanaExportButton';
import { ArcanaMethod } from './ArcanaMethod';
import { ArcanaPdfButton } from './ArcanaPdfButton';
import { ArcanaPrintButton } from './ArcanaPrintButton';
import { ArcanaPortrait } from './ArcanaPortrait';
import { ArcanaReportGlance } from './ArcanaReportGlance';
import { ArcanaReportSection } from './ArcanaReportSection';
import { ArcanaReportToc } from './ArcanaReportToc';
import { ArcanaTensionCard } from './ArcanaTensionCard';
import { ArcanaThemeToggle } from './ArcanaThemeToggle';

interface Props {
  report: ReportType;
  onRestart: () => void;
  onClearAnswers: () => void;
  /** Niet-destructieve weg terug naar de website; het rapport blijft bewaard. */
  onBackToSite: () => void;
}

/** De 5 kaartsoorten die de legenda toelicht, met hun kleur+vorm-sleutel. */
const LEGEND_ITEMS: { kind: string; label: string }[] = [
  { kind: 'insight', label: 'Inzicht' },
  { kind: 'shadow', label: 'Schaduw' },
  { kind: 'reflection', label: 'Beschouwing' },
  { kind: 'growth', label: 'Groei' },
  { kind: 'profile', label: 'Profiel' },
];

export function ArcanaReport({ report, onRestart, onClearAnswers, onBackToSite }: Props) {
  const primaryDef = ARCHETYPES.find((a) => a.id === report.archetypes.primary)!;

  // Groepeer de 32 niet-hero secties volgens de vaste indeling in
  // arcanaSectionGroups.ts, in de volgorde waarin ze al in report.sections
  // staan (dit herschikt niets, het filtert alleen per groep). Secties die
  // onverhoopt in geen enkele groep voorkomen vallen niet stilzwijgend weg:
  // die renderen als vangnet ongegroepeerd aan het eind, zodat een gemiste
  // indeling nooit rapportinhoud laat verdwijnen.
  const sectionById = new Map(report.sections.map((section) => [section.id, section]));
  const groupedSectionIds = new Set(SECTION_GROUPS.flatMap((group) => group.ids));
  const ungroupedSections = report.sections.filter(
    (section) => section.id !== 'hero' && !groupedSectionIds.has(section.id),
  );

  // Platte, geordende lijst van alle kaarten in het deck (ongeacht groep),
  // puur om "vorige/volgende"-navigatie en een "kaart X van Y"-teller per
  // kaart te kunnen tonen. Verandert niets aan welke secties getoond worden
  // of in welke volgorde — dat blijft SECTION_GROUPS + de vangnet-lijst.
  const orderedSections: ReportSectionType[] = [
    ...SECTION_GROUPS.flatMap((group) =>
      group.ids.map((id) => sectionById.get(id)).filter((section): section is ReportSectionType => section !== undefined),
    ),
    ...ungroupedSections,
  ];
  const deckTotal = orderedSections.length;

  function cardNavProps(section: ReportSectionType) {
    const index = orderedSections.findIndex((s) => s.id === section.id);
    const prev = index > 0 ? orderedSections[index - 1] : undefined;
    const next = index >= 0 && index < deckTotal - 1 ? orderedSections[index + 1] : undefined;
    return {
      index: index + 1,
      total: deckTotal,
      prevId: prev?.id,
      prevTitle: prev?.title,
      nextId: next?.id,
      nextTitle: next?.title,
    };
  }

  const groupedSectionElements = SECTION_GROUPS.flatMap((group) => {
    const groupSections = group.ids
      .map((id) => sectionById.get(id))
      .filter((section): section is ReportSectionType => section !== undefined);

    if (groupSections.length === 0) return [];

    return [
      <h2 key={`title-${group.id}`} id={`arcana-report-group-${group.id}`} className="arcana-report-group__title">
        {group.title}
      </h2>,
      ...groupSections.map((section) => (
        <ArcanaReportSection key={section.id} section={section} {...cardNavProps(section)} />
      )),
    ];
  });

  return (
    <div className="arcana-screen arcana-report">
      <ArcanaBackToTocButton />

      <header className="arcana-report__masthead" id="arcana-report-hero">
        <div className="arcana-report__masthead-text">
          <p className="arcana-eyebrow">Jouw archetype</p>
          <h1>{primaryDef.name}</h1>
          <p className="arcana-report__masthead-quote">{report.sections[0].intro}</p>
        </div>
        <div className="arcana-report__masthead-actions arcana-print-hide">
          <div className="arcana-report__masthead-buttons">
            <ArcanaPdfButton />
            <ArcanaPrintButton />
            <ArcanaExportButton report={report} />
          </div>
          {/* Het rapport is lang en wordt 's avonds gelezen: hier is de
              schakelaar een leeshulp, geen instelling. */}
          <ArcanaThemeToggle />
          <div className="arcana-report__masthead-buttons arcana-report__masthead-buttons--secondary">
            <button type="button" className="arcana-button arcana-button--ghost" onClick={onBackToSite}>
              Terug naar de website
            </button>
            <button
              type="button"
              className="arcana-button arcana-button--ghost"
              onClick={() => {
                if (window.confirm('Weet je zeker dat je opnieuw wilt beginnen? Je huidige antwoorden en rapport gaan verloren. Overweeg eerst "Rapport downloaden".')) {
                  onRestart();
                }
              }}
            >
              Opnieuw beginnen
            </button>
            <button
              type="button"
              className="arcana-button arcana-button--text"
              onClick={() => {
                if (window.confirm('Weet je zeker dat je al je antwoorden en dit rapport wilt wissen? Dit kan niet ongedaan worden gemaakt. Overweeg eerst "Rapport downloaden".')) {
                  onClearAnswers();
                }
              }}
            >
              Antwoorden wissen
            </button>
          </div>
        </div>
      </header>

      {/* Het portret is de voorkant van het rapport: één beeld waarin de twaalf
          gemeten kanten samen zichtbaar zijn, met de sleutel eronder. Alles
          daarna is verdieping, en dat wordt verderop ook zo aangekondigd. */}
      <div className="arcana-card-shell arcana-report__portrait" data-kind="profile" id="portret">
        <div className="arcana-card-clip">
          <p className="arcana-card-kicker">
            <span className="arcana-card-mark" aria-hidden="true" />
            Profiel
          </p>
          <h3>Je portret — twaalf kanten in één beeld</h3>
          <ArcanaPortrait
            scores={report.scores.mainDimensions}
            archetypeName={primaryDef.name}
            archetypeScore={report.scores.archetypeScores[report.archetypes.primary].score}
            profileName={report.meta.profile.name}
          />
        </div>
      </div>

      <div className="arcana-card-shell arcana-archetype-card" data-kind="profile">
        <div className="arcana-card-clip">
          <ArcanaArchetypeCard
            primary={report.archetypes.primary}
            secondary={report.archetypes.secondary}
            stress={report.archetypes.stress}
            primaryScore={report.scores.archetypeScores[report.archetypes.primary].score}
            secondaryScore={report.scores.archetypeScores[report.archetypes.secondary].score}
          />
        </div>
      </div>

      <div className="arcana-card-shell arcana-report-glance" data-kind="profile" id="in-het-kort">
        <div className="arcana-card-clip">
          <ArcanaReportGlance report={report} />
        </div>
      </div>

      {/* De verantwoording staat bewust vóór de verdieping: wie straks 32
          hoofdstukken met cijfers in gaat, moet eerst weten wat die cijfers
          betekenen en wat dit rapport níet beweert. */}
      <div className="arcana-card-shell arcana-report__method" data-kind="profile" id="hoe-gemeten">
        <div className="arcana-card-clip">
          <ArcanaMethod quality={report.meta.responseQuality} questionCount={QUESTION_COUNT} />
        </div>
      </div>

      {/* Vanaf hier begint de verdieping. De scheiding is expliciet, zodat het
          rapport niet leest als één ongedeelde stapel van gelijkwaardige
          kaarten — dat was precies de klacht over de vorige weergave. */}
      <div className="arcana-report__depth-intro" id="verdieping">
        <p className="arcana-eyebrow">Vanaf hier de verdieping</p>
        <h2>Het volledige rapport</h2>
        <p>
          Het portret, de kern en de verantwoording hierboven zijn samen het korte antwoord. Wat nu volgt is de
          uitwerking: {deckTotal} hoofdstukken, gegroepeerd in {SECTION_GROUPS.length} delen. Je hoeft ze niet op
          volgorde te lezen — gebruik de inhoudsopgave om te springen naar wat je zoekt.
        </p>
      </div>

      <ul className="arcana-legend">
        {LEGEND_ITEMS.map((item) => (
          <li key={item.kind} className="arcana-legend__item" data-kind={item.kind}>
            <span className="arcana-card-mark" aria-hidden="true" />
            {item.label}
          </li>
        ))}
        <li className="arcana-legend__note">Kleur en vorm tonen het kaartsoort — geen label nodig.</li>
      </ul>

      <ArcanaReportToc sections={report.sections} />

      {groupedSectionElements}
      {ungroupedSections.map((section) => (
        <ArcanaReportSection key={section.id} section={section} {...cardNavProps(section)} />
      ))}

      <div className="arcana-card-shell arcana-report__tensions-grid" data-kind="profile" id="tensions-detail">
        <div className="arcana-card-clip">
          <p className="arcana-card-kicker">
            <span className="arcana-card-mark" aria-hidden="true" />
            Profiel
          </p>
          <h3>Spanningsvelden in detail</h3>
          <div className="arcana-tension-grid">
            {report.tensions
              .filter((t) => t.active)
              .map((t) => (
                <ArcanaTensionCard key={t.id} tension={t} />
              ))}
            {report.tensions.every((t) => !t.active) &&
              report.tensions.slice(0, 3).map((t) => <ArcanaTensionCard key={t.id} tension={t} />)}
          </div>
        </div>
      </div>

      <footer className="arcana-report__footer">
        <p className="arcana-fineprint">{PRIVACY_TEXT}</p>
        <p className="arcana-fineprint arcana-fineprint--disclaimer">{DISCLAIMER_TEXT}</p>
      </footer>
    </div>
  );
}
