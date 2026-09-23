import { isReportVersionSupported } from '../lib/arcanaReportCompat';
import type { ArcanaReport as ReportType } from '../types/arcana';
import { ArcanaReport } from './ArcanaReport';
import { ArcanaReportErrorBoundary } from './ArcanaReportErrorBoundary';
import { ArcanaReportIncompatible } from './ArcanaReportIncompatible';

interface Props {
  report: ReportType;
  onRestart: () => void;
  onClearAnswers: () => void;
  onBackToSite: () => void;
}

/**
 * Poortwachter vóór de rapportweergave (G-rebuild-spec taak 10): een
 * `arcana_result` met een onbekende of te nieuwe hoofdversie (bijvoorbeeld
 * uit een toekomstige build) krijgt meteen het uitlegscherm in plaats van een
 * renderpoging, en alles wat wél door de versiecheck komt staat bovendien in
 * een foutgrens voor het geval de structuur toch ergens tijdens het tekenen
 * struikelt. Eén lazy-chunk samen met `ArcanaReport` zelf (via App.tsx), dus
 * dit voegt niets toe aan het eerste scherm van een bezoeker.
 */
export function ArcanaReportGate({ report, onRestart, onClearAnswers, onBackToSite }: Props) {
  if (!isReportVersionSupported(report.meta?.version)) {
    return <ArcanaReportIncompatible report={report} onRestart={onRestart} />;
  }

  return (
    <ArcanaReportErrorBoundary report={report} onRestart={onRestart}>
      <ArcanaReport report={report} onRestart={onRestart} onClearAnswers={onClearAnswers} onBackToSite={onBackToSite} />
    </ArcanaReportErrorBoundary>
  );
}
