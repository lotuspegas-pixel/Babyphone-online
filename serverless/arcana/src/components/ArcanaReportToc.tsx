import { useState } from 'react';
import { SECTION_GROUPS } from '../data/arcanaSectionGroups';
import type { ArcanaReportSection } from '../types/arcana';

interface Props {
  sections: ArcanaReportSection[];
}

/** Eerste zin van de deelopening: de korte beschrijving naast de deeltitel. */
function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
}

/**
 * De inhoudsopgave: de zes delen in twee kolommen (nummer, titel, haarlijn,
 * een zin), met onder elk deel de hoofdstukken. Op het scherm zijn die
 * hoofdstukken uitklapbaar zodat de lijst kort blijft; op papier staan ze er
 * altijd, want wie print kan niet doorklikken. De beschrijving komt uit de
 * bestaande deelopeningen (arcanaSectionGroups.ts), niets nieuws.
 *
 * Paginanummers staan er bewust niet bij: de browser bepaalt de paginering
 * pas bij het afdrukken. De delen zijn genummerd en beginnen elk op een nieuwe
 * pagina met "Deel X van 6".
 */
export function ArcanaReportToc({ sections }: Props) {
  const [open, setOpen] = useState(false);

  if (sections.length === 0) return null;

  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const groups = SECTION_GROUPS.map((group) => ({
    group,
    chapters: group.ids
      .map((id) => sectionById.get(id))
      .filter((section): section is ArcanaReportSection => section !== undefined),
  })).filter(({ chapters }) => chapters.length > 0);
  const listIds = groups.map(({ group }) => `arcana-toc-chapters-${group.id}`).join(' ');

  return (
    <nav className="arcana-toc" id="arcana-report-toc" aria-labelledby="arcana-toc-title">
      <h3 className="arcana-toc__title" id="arcana-toc-title">
        Inhoudsopgave
      </h3>
      <ol className="arcana-toc__list">
        {groups.map(({ group, chapters }, index) => (
          <li key={group.id} className="arcana-toc__item">
            <a className="arcana-toc__head" href={`#arcana-report-group-${group.id}`}>
              <span className="arcana-toc__num">{String(index + 1).padStart(2, '0')}</span>
              <span className="arcana-toc__name">{group.title}</span>
              <span className="arcana-toc__line" aria-hidden="true" />
            </a>
            <p className="arcana-toc__desc arcana-print-hide">{firstSentence(group.lead)}</p>
            <ul className="arcana-toc__chapters" id={`arcana-toc-chapters-${group.id}`} hidden={!open}>
              {chapters.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="arcana-toc__toggle arcana-print-hide"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listIds}
      >
        {open ? 'Verberg de hoofdstukken' : 'Toon alle hoofdstukken'}
        <svg className="arcana-toc__chevron" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}
