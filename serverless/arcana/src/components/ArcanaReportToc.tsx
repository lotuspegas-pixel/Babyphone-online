import { useState } from 'react';
import type { ArcanaReportSection } from '../types/arcana';

interface Props {
  sections: ArcanaReportSection[];
}

/**
 * Inklapbare inhoudsopgave die ankerlinkt naar de bestaande section-id's.
 * Zo kan een deelnemer een specifieke sectie (bv. "relaties" of "stress")
 * terugvinden zonder door 33 secties te scrollen. Print-hidden, want op
 * papier heeft een sprong-navigatie geen functie.
 */
export function ArcanaReportToc({ sections }: Props) {
  const [open, setOpen] = useState(false);

  if (sections.length === 0) return null;

  return (
    <div className="arcana-card arcana-report-toc arcana-print-hide">
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
          <ol className="arcana-report-toc__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} onClick={() => setOpen(false)}>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}
