import { buildArcanaExportFilename, buildArcanaExportText } from '../lib/arcanaExport';
import type { ArcanaReport } from '../types/arcana';

interface Props {
  report: ArcanaReport;
  onRestart: () => void;
}

/**
 * Uitlegscherm voor een opgeslagen rapport dat deze build niet kan tonen —
 * een onbekende of te nieuwe `meta.version` (zie `arcanaReportCompat.ts`),
 * of een structuur die tijdens het tekenen alsnog crasht (afgevangen door
 * `ArcanaReportErrorBoundary`, die dit scherm ook toont). Nooit een leeg
 * scherm: er is altijd uitleg, een downloadknop en een uitweg (G-rebuild-spec
 * taak 10).
 */
export function ArcanaReportIncompatible({ report, onRestart }: Props) {
  function download() {
    let text: string;
    let filename: string;
    try {
      text = buildArcanaExportText(report);
      filename = buildArcanaExportFilename(report);
    } catch {
      // Vangnet binnen het vangnet: struikelt zelfs de nette export over
      // dezelfde onbekende structuur, dan gaat de ruwe opgeslagen data mee —
      // beter een ruw bestand dan niets.
      text = JSON.stringify(report, null, 2);
      filename = 'arcana-rapport-ruwe-data.txt';
    }
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const version = report.meta?.version || 'onbekend';

  return (
    <div className="arcana-screen arcana-engine-unavailable" role="alert">
      <div className="arcana-card">
        <p className="arcana-eyebrow">Dit rapport is niet leesbaar in deze versie</p>
        <h2>Je antwoorden en je rapport staan nog op dit apparaat.</h2>
        <p>
          Dit rapport is gemaakt met een andere versie van de berekening (versie {version}) dan deze app nu gebruikt,
          en kan daardoor niet volledig getoond worden. Er is niets verloren gegaan: je kunt het bewaren als
          tekstbestand, of de test opnieuw doen.
        </p>
        <div className="arcana-engine-unavailable__actions">
          <button type="button" className="arcana-button arcana-button--primary" onClick={download}>
            Bewaren als tekstbestand
          </button>
          <button type="button" className="arcana-button arcana-button--ghost" onClick={onRestart}>
            De test opnieuw doen
          </button>
        </div>
      </div>
    </div>
  );
}
