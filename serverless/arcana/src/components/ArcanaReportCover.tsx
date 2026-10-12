import { ARCHETYPES } from '../data/arcanaArchetypes';
import { formatReportDate } from '../lib/arcanaExport';
import type { ArcanaReport } from '../types/arcana';
import { ArcanaReportEmblem } from './ArcanaReportEmblem';
import { ArcanaLogo } from './ArcanaLogo';

interface Props {
  report: ArcanaReport;
  /** Deterministische rapportcode (zie arcanaReportCode.ts). */
  code: string;
}

/**
 * Het voorblad van de PDF: alleen zichtbaar bij afdrukken (op het scherm is
 * dit `display: none`, zie "voorblad" in arcana.css). Alles wat erop staat
 * komt uit het rapport zelf: naam, archetypen, datum, rapportcode en versie.
 * Geen naam ingevuld betekent geen naamregel.
 */
export function ArcanaReportCover({ report, code }: Props) {
  const primary = ARCHETYPES.find((a) => a.id === report.archetypes.primary);
  const secondary = ARCHETYPES.find((a) => a.id === report.archetypes.secondary);
  const name = report.meta.profile.name.trim();

  return (
    <section className="arcana-cover" aria-label="Voorblad">
      <div className="arcana-cover__brand">
        <ArcanaLogo className="arcana-cover__logo" sizes="64mm" />
      </div>
      <ArcanaReportEmblem archetype={report.archetypes.primary} className="arcana-emblem--cover" />
      <div className="arcana-cover__body">
        <h1 className="arcana-cover__title">Jouw Arcana Profile rapport</h1>
        <span className="arcana-rule" />
        {name && <p className="arcana-cover__name">{name}</p>}
        {primary && <p className="arcana-cover__archetype">{primary.name}</p>}
        {secondary && <p className="arcana-cover__second">Tweede stem: {secondary.name}</p>}
      </div>
      <dl className="arcana-cover__facts">
        <div>
          <dt>Datum</dt>
          <dd>{formatReportDate(report.meta.generatedAt)}</dd>
        </div>
        <div>
          <dt>Rapportcode</dt>
          <dd>{code}</dd>
        </div>
        <div>
          <dt>Versie</dt>
          <dd>{report.meta.version}</dd>
        </div>
      </dl>
    </section>
  );
}
