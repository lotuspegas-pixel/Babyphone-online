import { useEffect, useRef, useState } from 'react';

import { ARCHETYPES } from '../data/arcanaArchetypes';
import { chapterArtUrl, hideOnError } from '../data/arcanaArt';
import { QUESTION_COUNT } from '../data/arcanaQuestionCount';
import { DISCLAIMER_TEXT, PRIVACY_TEXT } from '../data/arcanaReportBlocks';
import { SECTION_GROUPS } from '../data/arcanaSectionGroups';
import { formatReportDate } from '../lib/arcanaExport';
import { buildReportCode } from '../lib/arcanaReportCode';
import { applyVoice } from '../lib/arcanaVoice';
import type { ArcanaReport as ReportType, ArcanaReportSection as ReportSectionType } from '../types/arcana';
import { ArcanaArchetypeCard } from './ArcanaArchetypeCard';
import { ArcanaBackToTocButton } from './ArcanaBackToTocButton';
import { ArcanaConfirmDialog } from './ArcanaConfirmDialog';
import { ArcanaExportButton } from './ArcanaExportButton';
import { ArcanaMethod } from './ArcanaMethod';
import { ArcanaOrnament } from './ArcanaOrnament';
import { ArcanaPdfButton } from './ArcanaPdfButton';
import { ArcanaPortrait } from './ArcanaPortrait';
import { ArcanaReportCover } from './ArcanaReportCover';
import { ArcanaReportEmblem } from './ArcanaReportEmblem';
import { ArcanaReportGlance } from './ArcanaReportGlance';
import { ArcanaReportSection } from './ArcanaReportSection';
import { ArcanaReportToc } from './ArcanaReportToc';
import { ArcanaSeal } from './ArcanaSeal';
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

/** Het ene hoofdstuk dat als losse pagina (#/delen) door te geven is. */
const SHAREABLE_SECTION_ID = 'understood-by-others';

/** Twee korte kanttekeningen in handschrift op de voorpagina: sfeer, geen rapporttekst. */
const MARGINALIA = ['The map is not the territory.', 'Who looks outside, dreams; who looks inside, awakens.'];

/** Het zegel als plaatje voor de lopende kop bovenaan elke pagina (alleen inkt: currentColor kan hier niet). */
const SEAL_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='26' height='26' fill='%231c1712'%3E%3Ccircle cx='50' cy='50' r='46' fill='none' stroke='%231c1712' stroke-width='2.6' stroke-dasharray='1 2.4' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='50' r='38' fill='none' stroke='%231c1712' stroke-width='1' opacity='.5'/%3E%3Cpath d='M50 14 54.5 34 59 24 57 40 74 36 60 46 76 50 60 54 74 64 57 60 59 76 54.5 66 50 86 45.5 66 41 76 43 60 26 64 40 54 24 50 40 46 26 36 43 40 41 24 45.5 34Z'/%3E%3Crect x='44' y='58' width='12' height='4'/%3E%3Cpath d='M47 62h6v16q0 4-3 4t-3-4z'/%3E%3Crect x='38' y='82' width='24' height='6'/%3E%3C/svg%3E";

/**
 * De paginakop en -voet van de PDF, als @page-margeboxen (Chrome en Edge vanaf
 * 131; waar ze niet bestaan, vallen ze weg en verandert er niets aan de
 * inhoud). Dit staat hier en niet in arcana.css omdat de tekst per rapport
 * verschilt (datum, rapportcode) en de deeltitels uit SECTION_GROUPS komen: zo
 * staat er nooit een titel in de kop die niet in het rapport staat. Elk deel
 * krijgt een eigen benoemde pagina, waardoor de kop per deel van titel wisselt.
 */
function buildPrintPageCss(dateLabel: string, code: string): string {
  const q = (text: string) => `"${text.replace(/["\\\n]/g, ' ')}"`;
  // #4e4338 (--ink-soft, licht): 8,23 op de kaartkleur, 7,59 op het perkament.
  const mono =
    'font-family:"Courier Prime",ui-monospace,monospace;font-size:6.8pt;letter-spacing:.14em;text-transform:uppercase;color:#4e4338;white-space:nowrap;';
  const head = `${mono}border-bottom:.4pt solid #4e4338;padding-bottom:2.5mm;vertical-align:bottom;`;
  const foot = `${mono}border-top:.4pt solid #4e4338;padding-top:2.5mm;vertical-align:top;`;
  const none = (box: string) => `@${box}{content:none;border:0}`;
  let css =
    '@page{size:A4;margin:26mm 16mm 22mm;background:#ede4cc;' +
    `@top-left{content:url("${SEAL_IMAGE}") " Arcana Profile";font:600 10.5pt "Bodoni Moda",Didot,serif;color:#1c1712;border-bottom:.4pt solid #4e4338;padding-bottom:2.5mm;vertical-align:bottom;white-space:nowrap}` +
    `@top-center{content:"";border-bottom:.4pt solid #4e4338}` +
    `@top-right{content:"";${head}}` +
    `@bottom-left{content:"Inzicht • Patronen • Groei";${foot}}` +
    `@bottom-center{content:${q(dateLabel)};${foot}}` +
    `@bottom-right{content:"Rapportcode ${code}  |  " counter(page,decimal-leading-zero);${foot}}` +
    '}' +
    '@page:first{margin:0;' +
    ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(none).join('') +
    '}';
  SECTION_GROUPS.forEach((group, i) => {
    css += `@page deel-${i + 1}{@top-right{content:${q(`Deel ${i + 1} · ${group.title}`)}}}`;
    css += `.arcana-group[data-part="${i + 1}"]{page:deel-${i + 1}}`;
  });
  return css;
}

/**
 * Leesvoortgang (de inktlijn bovenaan), het actieve deel (voor de deelwijzer
 * links) en het eenmalige intekenen van elke deelopening — één effect, één
 * scroll-luisteraar op rAF die alleen een transform schrijft, en één
 * IntersectionObserver. Zonder JavaScript of waarnemer staat alles in zijn
 * eindstand: .is-wait/.is-seen werken alleen op het scherm en buiten
 * prefers-reduced-motion (zie arcana.css).
 */
function useReading() {
  const inkRef = useRef<HTMLSpanElement>(null);
  const [activePart, setActivePart] = useState(0);

  useEffect(() => {
    const groups = Array.from(document.querySelectorAll<HTMLElement>('.arcana-group[data-part]'));
    let frame = 0;
    const paint = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      inkRef.current?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`);
      // Het actieve deel: het laatste deel dat de leeslijn op 40 % van het venster gepasseerd is.
      const line = window.innerHeight * 0.4;
      let part = 0;
      for (const group of groups) {
        if (group.getBoundingClientRect().top <= line) part = Number(group.dataset.part);
      }
      setActivePart(part);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.replace('is-wait', 'is-seen');
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.25 },
      );
      document.querySelectorAll('.arcana-chapter').forEach((el) => {
        el.classList.add('is-wait');
        observer?.observe(el);
      });
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
      document.querySelectorAll('.arcana-chapter.is-wait').forEach((el) => el.classList.remove('is-wait'));
    };
  }, []);

  return { inkRef, activePart };
}

export function ArcanaReport({ report, onRestart, onClearAnswers, onBackToSite }: Props) {
  const primaryDef = ARCHETYPES.find((a) => a.id === report.archetypes.primary)!;
  const name = report.meta.profile.name.trim();
  // Welke bevestigingsdialoog open staat (C §5.6) — vervangt de twee
  // window.confirm-aanroepen die hier stonden.
  const [openDialog, setOpenDialog] = useState<'restart' | 'clear' | null>(null);
  const restartButtonRef = useRef<HTMLButtonElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const { inkRef, activePart } = useReading();

  // Papier is altijd licht: wie in de donkere modus op "Bewaar als PDF" klikt,
  // krijgt een lichte pagina. De tokens van het donkere thema hangen aan
  // data-theme, dus tijdens het printen zetten we dat tijdelijk op licht (de
  // CSS in @media print vangt de belangrijkste kleuren daarnaast zelf op).
  useEffect(() => {
    const root = document.documentElement;
    let saved: string | null | undefined;
    const before = () => {
      if (saved !== undefined) return;
      saved = root.getAttribute('data-theme');
      root.setAttribute('data-theme', 'light');
    };
    const after = () => {
      if (saved === undefined) return;
      if (saved === null) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', saved);
      saved = undefined;
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
      after();
    };
  }, []);

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
      group.ids
        .map((id) => sectionById.get(id))
        .filter((section): section is ReportSectionType => section !== undefined),
    ),
    ...ungroupedSections,
  ];
  const deckTotal = orderedSections.length;
  const code = buildReportCode(report);

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

  const shareAction = (
    <a className="arcana-button arcana-button--primary" href="#/delen">
      Deze pagina delen
    </a>
  );

  const groupedSectionElements = SECTION_GROUPS.flatMap((group, groupIndex) => {
    const groupSections = group.ids
      .map((id) => sectionById.get(id))
      .filter((section): section is ReportSectionType => section !== undefined);

    if (groupSections.length === 0) return [];
    const artUrl = chapterArtUrl(group.id);

    return [
      // Eén deel = één deelopening (folionummer, kop, "Deel X van 6", de
      // deelopening en de tekening op een los stuk papier, om en om links en
      // rechts) en de kaarten eronder. Op papier begint elk deel op een nieuwe pagina.
      <section
        key={group.id}
        className="arcana-group"
        data-part={groupIndex + 1}
        aria-labelledby={`arcana-report-group-${group.id}`}
      >
        <div className={`arcana-chapter${groupIndex % 2 === 1 ? ' arcana-chapter--flip' : ''}`}>
          <div className="arcana-chapter__text">
            <span className="arcana-chapter__num" aria-hidden="true">
              {groupIndex + 1}
            </span>
            <h2 id={`arcana-report-group-${group.id}`} className="arcana-chapter__title">
              {group.title}
            </h2>
            <span className="arcana-rule" />
            <p className="arcana-chapter__meta">
              Deel {groupIndex + 1} van {SECTION_GROUPS.length} · {groupSections.length}{' '}
              {groupSections.length === 1 ? 'hoofdstuk' : 'hoofdstukken'}
            </p>
            {/* De deelopening: één zin die zegt waarom dit deel hier staat (C §3.2). */}
            <p className="arcana-chapter__lead">{group.lead}</p>
          </div>
          {artUrl && (
            <div className="arcana-chapter__art" aria-hidden="true">
              <span className="arcana-chapter__paper arcana-torn" />
              <img src={artUrl} alt="" width={420} height={380} decoding="async" onError={hideOnError} />
            </div>
          )}
        </div>
        <div className="arcana-group__cards">
          {groupSections.map((section) => (
            <ArcanaReportSection
              key={section.id}
              section={section}
              {...cardNavProps(section)}
              action={section.id === SHAREABLE_SECTION_ID ? shareAction : undefined}
            />
          ))}
        </div>
      </section>,
    ];
  });

  return (
    <div className="arcana-screen arcana-report">
      <style>{buildPrintPageCss(formatReportDate(report.meta.generatedAt), code)}</style>

      {/* De leeslijn: hoe ver je in het dossier bent, als dunne inktlijn bovenaan. */}
      <div className="arcana-readline arcana-print-hide" aria-hidden="true">
        <span className="arcana-readline__ink" ref={inkRef} />
      </div>

      {/* De deelwijzer (alleen op een breed scherm): in welk deel je leest, en de zes delen als folio's. */}
      <nav className="arcana-partrail arcana-print-hide" aria-label="Delen van het rapport">
        <p className="arcana-partrail__now">
          {activePart > 0 ? `Deel ${activePart} van ${SECTION_GROUPS.length}` : 'Het korte antwoord'}
        </p>
        <ol className="arcana-partrail__list">
          {SECTION_GROUPS.map((group, i) => (
            <li key={group.id}>
              <a
                href={`#arcana-report-group-${group.id}`}
                aria-current={activePart === i + 1 ? 'location' : undefined}
                aria-label={`Deel ${i + 1}: ${group.title}`}
              >
                <span className="arcana-partrail__num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="arcana-partrail__name" aria-hidden="true">
                  {group.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <ArcanaBackToTocButton />

      {/* Het voorblad van de PDF; op het scherm niet zichtbaar. */}
      <ArcanaReportCover report={report} code={code} />

      <header className="arcana-masthead arcana-print-hide" id="arcana-report-hero">
        {/* De lopende kop van het dossier: zegel, woordmerk, haarlijn — en de
            leeshulp voor 's avonds (de themaschakelaar). */}
        <div className="arcana-masthead__band">
          <ArcanaSeal size={30} className="arcana-masthead__seal" />
          <span className="arcana-masthead__wordmark">Arcana Profile</span>
          <span className="arcana-masthead__band-tag">Know your patterns</span>
          <span className="arcana-masthead__band-line" aria-hidden="true" />
          <ArcanaThemeToggle compact />
        </div>
        <div className="arcana-masthead__text">
          <h1 className="arcana-masthead__title">{primaryDef.name}</h1>
          <p className="arcana-masthead__quote">{report.sections[0].intro}</p>
          {/* De feitenregel van het dossier: voor wie, wanneer, waaruit, welke versie, welke code. */}
          <p className="arcana-masthead__facts">
            {name && <span>{name}</span>}
            <span>{formatReportDate(report.meta.generatedAt)}</span>
            <span>{QUESTION_COUNT} antwoorden</span>
            <span>versie {report.meta.version}</span>
            <span className="arcana-nowrap">rapportcode {code}</span>
          </p>
          {/* Drie knoppen die geen van drieën iets vernietigen. Het eerste wat
              iemand na 25 minuten ziet mag geen knop zijn die dat werk wist;
              "Opnieuw beginnen" en "Antwoorden wissen" staan in de voettekst. */}
          <div className="arcana-masthead__buttons">
            <ArcanaPdfButton report={report} />
            <ArcanaExportButton report={report} />
            <a className="arcana-button arcana-button--ghost" href="#/delen">
              Deel één pagina
            </a>
          </div>
          <p className="arcana-note arcana-note--1" lang="en" aria-hidden="true">
            {MARGINALIA[0]}
          </p>
        </div>
        <ArcanaReportEmblem archetype={report.archetypes.primary} className="arcana-emblem--masthead" />
        <p className="arcana-note arcana-note--2" lang="en" aria-hidden="true">
          {MARGINALIA[1]}
        </p>
      </header>

      {/* Het blad "Inhoud & profielsamenvatting" en daaronder de samenvatting
          die op zichzelf staat: wie hier stopt met lezen, heeft het antwoord
          (C §3.1). De legenda hoort bij de inhoudsopgave: ze legt de
          kaartsoorten uit die in de hele verdieping terugkomen. */}
      <ArcanaReportGlance report={report} questionCount={QUESTION_COUNT} chapterCount={deckTotal}>
        <ArcanaReportToc sections={report.sections} />
        <ul className="arcana-legend">
          {LEGEND_ITEMS.map((item) => (
            <li key={item.kind} className="arcana-legend__item" data-kind={item.kind}>
              <span className="arcana-card-mark" aria-hidden="true" />
              {item.label}
            </li>
          ))}
          <li className="arcana-legend__note">Kleur en vorm in de hoek van elke kaart tonen het kaartsoort.</li>
        </ul>
      </ArcanaReportGlance>

      {/* Het portret: één beeld waarin de twaalf gemeten kanten samen
          zichtbaar zijn, met de sleutel eronder. */}
      <div className="arcana-card-shell arcana-report__portrait" data-kind="profile" id="portret">
        <div className="arcana-card-clip arcana-torn">
          <span className="arcana-card-mark arcana-card-mark--stamp" aria-hidden="true" />
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
        <div className="arcana-card-clip arcana-torn">
          <ArcanaArchetypeCard
            primary={report.archetypes.primary}
            secondary={report.archetypes.secondary}
            stress={report.archetypes.stress}
            primaryScore={report.scores.archetypeScores[report.archetypes.primary].score}
            secondaryScore={report.scores.archetypeScores[report.archetypes.secondary].score}
          />
        </div>
      </div>

      {/* De verantwoording staat bewust vóór de verdieping: wie straks 32
          hoofdstukken met cijfers in gaat, moet eerst weten wat die cijfers
          betekenen en wat dit rapport níet beweert. */}
      <div className="arcana-card-shell arcana-report__method" data-kind="profile" id="hoe-gemeten">
        <div className="arcana-card-clip arcana-torn">
          <ArcanaMethod quality={report.meta.responseQuality} questionCount={QUESTION_COUNT} />
        </div>
      </div>

      {/* Vanaf hier begint de verdieping. De scheiding is expliciet, zodat het
          rapport niet leest als één ongedeelde stapel van gelijkwaardige
          kaarten — dat was precies de klacht over de vorige weergave. Op
          papier doen de deelopeningen dit werk, dus daar vervalt dit blok. */}
      <div className="arcana-report__depth-intro arcana-print-hide" id="verdieping">
        <ArcanaOrnament kind="maanfasen" size={20} className="arcana-report__ornament" />
        <h2>Het volledige rapport</h2>
        <p>
          De samenvatting, het portret en de verantwoording hierboven zijn samen het korte antwoord. Wat nu volgt is de
          uitwerking: {deckTotal} hoofdstukken, gegroepeerd in {SECTION_GROUPS.length} delen. Je hoeft ze niet op
          volgorde te lezen — gebruik de inhoudsopgave om te springen naar wat je zoekt.
        </p>
      </div>

      {groupedSectionElements}
      {ungroupedSections.length > 0 && (
        <div className="arcana-group__cards">
          {ungroupedSections.map((section) => (
            <ArcanaReportSection key={section.id} section={section} {...cardNavProps(section)} />
          ))}
        </div>
      )}

      <div className="arcana-card-shell arcana-report__tensions-grid" data-kind="profile" id="tensions-detail">
        <div className="arcana-card-clip arcana-torn">
          <span className="arcana-card-mark arcana-card-mark--stamp" aria-hidden="true" />
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
        <div className="arcana-report__footer-actions arcana-print-hide">
          <button type="button" className="arcana-button arcana-button--ghost" onClick={onBackToSite}>
            Terug naar de website
          </button>
          <button
            type="button"
            ref={restartButtonRef}
            className="arcana-button arcana-button--ghost"
            onClick={() => setOpenDialog('restart')}
          >
            Opnieuw beginnen
          </button>
          <button
            type="button"
            ref={clearButtonRef}
            className="arcana-button arcana-button--text"
            onClick={() => setOpenDialog('clear')}
          >
            Antwoorden wissen
          </button>
        </div>
        <p className="arcana-fineprint">{applyVoice(PRIVACY_TEXT, report.meta.profile.addressForm)}</p>
        <p className="arcana-fineprint arcana-fineprint--disclaimer">{DISCLAIMER_TEXT}</p>
        {/* De lopende voet van het dossier, met het zegel. */}
        <p className="arcana-report__colophon">
          <ArcanaSeal size={22} />
          <span>Arcana Profile · Know your patterns · rapportcode {code}</span>
        </p>
      </footer>

      {openDialog === 'restart' && (
        <ArcanaConfirmDialog
          titleText="Opnieuw beginnen?"
          description={
            <p>
              Je huidige antwoorden en je rapport verdwijnen. Je naam en aanspreekvorm blijven staan, zodat je niet
              opnieuw hoeft in te vullen.
            </p>
          }
          confirmLabel="Ja, opnieuw beginnen"
          cancelLabel="Nee, terug naar mijn rapport"
          returnFocusRef={restartButtonRef}
          onCancel={() => setOpenDialog(null)}
          onConfirm={() => {
            setOpenDialog(null);
            onRestart();
          }}
        />
      )}
      {openDialog === 'clear' && (
        <ArcanaConfirmDialog
          titleText="Al je antwoorden en je rapport wissen?"
          description={
            <>
              <p>
                Dit wist je {QUESTION_COUNT} antwoorden en het rapport dat eruit volgde, uit deze browser. Wij hebben
                geen kopie — er is geen server. Dit kan niet ongedaan worden gemaakt.
              </p>
              <p>Bewaar eerst wat je wilt houden.</p>
            </>
          }
          confirmLabel="Ja, wis alles"
          cancelLabel="Nee, laat staan"
          returnFocusRef={clearButtonRef}
          onCancel={() => setOpenDialog(null)}
          onConfirm={() => {
            setOpenDialog(null);
            onClearAnswers();
          }}
        />
      )}
    </div>
  );
}
