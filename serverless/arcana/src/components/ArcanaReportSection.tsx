import type { ReactNode } from 'react';

import { SECTION_NAV_REASONS } from '../data/arcanaSectionNavReasons';
import type { ArcanaReportSection as Section } from '../types/arcana';

interface Props {
  section: Section;
  /** 1-based positie van deze kaart in het volledige deck (voor "Kaart X van Y"). */
  index?: number;
  total?: number;
  prevId?: string;
  prevTitle?: string;
  nextId?: string;
  nextTitle?: string;
  /** Eén handeling die bij dit hoofdstuk hoort, zoals "Deze pagina delen". */
  action?: ReactNode;
}

/** De 5 "kinden" die de CSS gebruikt voor de randaccenten en het merkteken. */
type SectionKind = 'insight' | 'shadow' | 'reflection' | 'growth' | 'summary';

/**
 * Vaste lookup van section-id naar kind. Puur presentatie: bepaalt alleen
 * het data-kind-attribuut hieronder, verandert niets aan tekst of volgorde.
 * De 8 reflectie-secties worden via hun bestaande id-prefix herkend (zie
 * isReflection) in plaats van hier stuk voor stuk opgesomd.
 */
const SECTION_KIND: Record<string, SectionKind> = {
  'who-you-are': 'insight',
  'core-pattern': 'insight',
  'seen-by-others': 'insight',
  'hidden-inner-world': 'insight',
  alone: 'insight',
  'with-others': 'insight',
  'work-style': 'insight',
  'close-circle': 'insight',
  'at-ease': 'insight',
  strengths: 'insight',
  relationship: 'insight',
  communication: 'insight',
  'understood-by-others': 'insight',
  'understand-yourself': 'insight',
  shadow: 'shadow',
  jungian: 'shadow',
  'blind-spots': 'shadow',
  stress: 'shadow',
  tensions: 'shadow',
  'who-you-can-become': 'growth',
  'what-you-need': 'growth',
  'growth-path': 'growth',
  'thirty-day-plan': 'growth',
  'final-sentence': 'summary',
};

function sectionKind(id: string): SectionKind | undefined {
  if (id.startsWith('reflectie-')) return 'reflection';
  return SECTION_KIND[id];
}

/**
 * Eén hoofdstuk als stuk gescheurd papier. Het kaartsoort staat als stempel
 * (kleur + vorm, zie de legenda) in de hoek — geen tekstlabel boven de
 * titel; "Kaart X van Y" staat in de navigatie onderaan.
 */
export function ArcanaReportSection({ section, index, total, prevId, prevTitle, nextId, nextTitle, action }: Props) {
  const isReflection = section.id.startsWith('reflectie-');
  // De slotzin is het enige hoofdstuk dat als citaat gelezen moet worden.
  const isClosing = section.id === 'final-sentence';
  const kind = sectionKind(section.id);
  const titleId = `${section.id}-title`;
  const showNav = typeof index === 'number' && typeof total === 'number';
  // Een halve regel context per richting (C §3.2, laag 3). Bestaat de reden
  // niet voor dit paar — het vangnet buiten SECTION_GROUPS, of een kant die
  // (nog) niet in de tabel staat — dan valt de link terug op de kale titel.
  const navReason = SECTION_NAV_REASONS[section.id];

  return (
    <article
      className={`arcana-card-shell arcana-report-section${isReflection ? ' arcana-report-section--reflection' : ''}${isClosing ? ' arcana-report-section--closing' : ''}`}
      id={section.id}
      data-kind={kind}
      aria-labelledby={titleId}
    >
      <div className="arcana-card-clip arcana-torn">
        <span className="arcana-card-mark arcana-card-mark--stamp" aria-hidden="true" />
        <h3 id={titleId}>{section.title}</h3>
        {isClosing ? (
          <blockquote className="arcana-pullquote">{section.intro}</blockquote>
        ) : (
          <p className="arcana-report-section__intro">{section.intro}</p>
        )}
        {section.paragraphs.map((p, i) => (
          <p key={i} className="arcana-body">
            {p}
          </p>
        ))}
        {section.bullets.length > 0 && (
          <ul className="arcana-report-section__bullets">
            {section.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
        {/* Tekst die bij de lijst hoort en erna komt (de troost onder de
            valkuilen); oudere opgeslagen rapporten hebben dit veld niet. */}
        {section.outro?.map((o, i) => (
          <p key={`outro-${i}`} className="arcana-body arcana-report-section__outro">
            {o}
          </p>
        ))}
        {action && <div className="arcana-report-section__action arcana-print-hide">{action}</div>}
        <div className="arcana-card-spacer" />
        {showNav && (
          <nav className="arcana-card-nav arcana-print-hide" aria-label={`Kaartnavigatie: ${section.title}`}>
            {prevId ? (
              navReason?.backward ? (
                <a href={`#${prevId}`} className="arcana-card-nav__link arcana-card-nav__link--prev">
                  <span className="arcana-card-nav__label">Waar dit vandaan komt ←</span>
                  <span className="arcana-card-nav__detail">
                    <em>{prevTitle}</em> — {navReason.backward}
                  </span>
                </a>
              ) : (
                <a href={`#${prevId}`}>← {prevTitle ?? 'Vorige'}</a>
              )
            ) : (
              <span className="arcana-card-nav__stub">← Vorige</span>
            )}
            <span className="arcana-card-nav__count">
              Kaart {index} van {total}
            </span>
            {nextId ? (
              navReason?.forward ? (
                <a href={`#${nextId}`} className="arcana-card-nav__link arcana-card-nav__link--next">
                  <span className="arcana-card-nav__label">Waar dit naartoe leidt →</span>
                  <span className="arcana-card-nav__detail">
                    <em>{nextTitle}</em> — {navReason.forward}
                  </span>
                </a>
              ) : (
                <a href={`#${nextId}`}>{nextTitle ?? 'Volgende'} →</a>
              )
            ) : (
              <span className="arcana-card-nav__stub">Volgende →</span>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
