import type { ArcanaReportSection as Section } from '../types/arcana';

interface Props {
  section: Section;
}

export function ArcanaReportSection({ section }: Props) {
  return (
    <section className="arcana-card arcana-report-section" id={section.id}>
      <h3>{section.title}</h3>
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
    </section>
  );
}
