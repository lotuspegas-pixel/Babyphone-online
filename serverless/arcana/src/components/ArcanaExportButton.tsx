import { buildArcanaExportFilename, buildArcanaExportText } from '../lib/arcanaExport';
import type { ArcanaReport } from '../types/arcana';

interface Props {
  report: ArcanaReport;
}

/**
 * Downloadt het volledige rapport als lokaal .md-bestand (Blob + <a download>).
 * Geen netwerkaanroep, geen dependency: puur client-side zodat het rapport
 * bewaard, doorgestuurd of op een ander apparaat teruggelezen kan worden.
 */
export function ArcanaExportButton({ report }: Props) {
  function handleExport() {
    const text = buildArcanaExportText(report);
    const filename = buildArcanaExportFilename(report);
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      className="arcana-button arcana-button--ghost arcana-print-hide"
      onClick={handleExport}
    >
      Rapport downloaden
    </button>
  );
}
