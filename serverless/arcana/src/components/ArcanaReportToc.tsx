import { useState } from 'react';
import { SECTION_GROUPS } from '../data/arcanaSectionGroups';
import type { ArcanaReportSection } from '../types/arcana';

interface Props {
  sections: ArcanaReportSection[];
}

/**
 * Inklapbare inhoudsopgave die ankerlinkt naar de bestaande section-id's,
 * genest per leesgroep (zie arcanaSectionGroups.ts) zodat een deelnemer een
 * specifieke sectie (bv. "relaties" of "stress") snel terugvindt zonder
 * door 32 secties te scrollen. De hero-banner staat hier bewust niet in:
 * die is al zichtbaar bovenaan als banner, een link ernaar zou nergens
 * naartoe wijzen. Print-hidden, want op papier heeft sprong-navigatie geen
 * functie.
 */
export function ArcanaReportToc({ sections }: Props) {
  const [open, setOpen] = useState(false);

  if (sections.length === 0) return null;

  const sectionById = new Map(sections.map((section) => [section.id, section]));

  return (
    <div className="arcana-card arcana-report-toc arcana-print-hide" id="arcana-report-toc">
      <button
        type="button"
        className="arcana-report-toc__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Inhoudsopgave {open ? '▲' : '▼'}
      </button>
      {open && (
        <nav aria-label="Inhoudsopgave rapport">
          <ol className="arcana-report-toc__groups">
            {SECTION_GROUPS.map((group) => {
              const groupSections = group.ids
                .map((id) => sectionById.get(id))
                .filter((section): section is ArcanaReportSection => section !== undefined);

              if (groupSections.length === 0) return null;

              return (
                <li key={group.id} className="arcana-report-toc__group">
                  <p className="arcana-eyebrow arcana-report-toc__group-title">{group.title}</p>
                  <ol className="arcana-report-toc__list">
                    {groupSections.map((section) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} onClick={() => setOpen(false)}>
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </div>
  );
}
