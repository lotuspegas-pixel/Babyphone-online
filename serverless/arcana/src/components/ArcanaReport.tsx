import { ARCHETYPES } from '../data/arcanaArchetypes';
import { DISCLAIMER_TEXT, PRIVACY_TEXT } from '../data/arcanaReportBlocks';
import type { ArcanaReport as ReportType } from '../types/arcana';
import { ArcanaArchetypeCard } from './ArcanaArchetypeCard';
import { ArcanaPrintButton } from './ArcanaPrintButton';
import { ArcanaReportSection } from './ArcanaReportSection';
import { ArcanaScoreWheel } from './ArcanaScoreWheel';
import { ArcanaTensionCard } from './ArcanaTensionCard';

interface Props {
  report: ReportType;
  onRestart: () => void;
  onClearAnswers: () => void;
}

export function ArcanaReport({ report, onRestart, onClearAnswers }: Props) {
  const primaryDef = ARCHETYPES.find((a) => a.id === report.archetypes.primary)!;

  return (
    <div className="arcana-screen arcana-report">
      <div className="arcana-report__header arcana-print-hide">
        <p className="arcana-eyebrow">Arcana Mirror</p>
        <div className="arcana-report__header-actions">
          <ArcanaPrintButton />
          <button type="button" className="arcana-button arcana-button--ghost" onClick={onRestart}>
            Opnieuw beginnen
          </button>
          <button type="button" className="arcana-button arcana-button--text" onClick={onClearAnswers}>
            Antwoorden wissen
          </button>
        </div>
      </div>

      <div className="arcana-card arcana-report__hero">
        <p className="arcana-eyebrow">Jouw archetype</p>
        <h1>{primaryDef.name}</h1>
        <p className="arcana-body">{report.sections[0].intro}</p>
      </div>

      <ArcanaArchetypeCard
        primary={report.archetypes.primary}
        secondary={report.archetypes.secondary}
        stress={report.archetypes.stress}
        primaryScore={report.scores.archetypeScores[report.archetypes.primary].score}
        secondaryScore={report.scores.archetypeScores[report.archetypes.secondary].score}
      />

      <div className="arcana-card arcana-report__wheel">
        <h3>Je score-overzicht</h3>
        <ArcanaScoreWheel scores={report.scores.mainDimensions} />
      </div>

      {report.sections.map((section) => (
        <ArcanaReportSection key={section.id} section={section} />
      ))}

      <div className="arcana-card arcana-report__tensions-grid">
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

      <div className="arcana-card arcana-report__footer">
        <p className="arcana-fineprint">{PRIVACY_TEXT}</p>
        <p className="arcana-fineprint arcana-fineprint--disclaimer">{DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
}
