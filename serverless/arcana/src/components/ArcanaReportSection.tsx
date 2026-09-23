import type { ReactNode } from 'react';

import type { ArcanaReportSection as Section } from '../types/arcana';

interface Props {
  section: Section;
  /** 1-based positie van deze kaart in het volledige deck (voor "Kaart X / Y"). */
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

export function ArcanaReportSection({ section, index, total, prevId, prevTitle, nextId, nextTitle, action }: Props) {
  const isReflection = section.id.startsWith('reflectie-');
  const kind = sectionKind(section.id);
  const titleId = `${section.id}-title`;
  const showNav = typeof index === 'number' && typeof total === 'number';

  return (
    <article
      className={`arcana-card-shell arcana-report-section${isReflection ? ' arcana-report-section--reflection' : ''}`}
      id={section.id}
      data-kind={kind}
      aria-labelledby={titleId}
    >
      <div className="arcana-card-clip">
        <p className="arcana-card-kicker">
          <span className="arcana-card-mark" aria-hidden="true" />
          {showNav ? (
            <span>
              Kaart {index} / {total}
            </span>
          ) : (
            <span className="arcana-sr-only">Rapportkaart</span>
          )}
        </p>
        <h3 id={titleId}>{section.title}</h3>
        <p className="arcana-report-section__intro">{section.intro}</p>
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
              <a href={`#${prevId}`}>← {prevTitle ?? 'Vorige'}</a>
            ) : (
              <span className="arcana-card-nav__stub">← Vorige</span>
            )}
            <span className="arcana-card-nav__count">
              {index} / {total}
            </span>
            {nextId ? (
              <a href={`#${nextId}`}>{nextTitle ?? 'Volgende'} →</a>
            ) : (
              <span className="arcana-card-nav__stub">Volgende →</span>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
