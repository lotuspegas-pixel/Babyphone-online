import { useState } from 'react';
import { loadResult } from '../lib/arcanaStorage';
import type { ArcanaReport } from '../types/arcana';

interface Props {
  /** Het getoonde rapport; zonder prop valt de knop terug op het opgeslagen rapport. */
  report?: ArcanaReport;
}

type Status = { kind: 'idle' } | { kind: 'busy' } | { kind: 'error'; message: string };

/**
 * "Download als PDF" maakt het bestand in de browser zelf: pdf-lib en de
 * fonts laden pas bij de klik (eigen lazy chunk, dus de rapportchunk en de
 * landing groeien niet), de PDF wordt opgebouwd uit het rapportobject
 * (src/lib/arcanaPdf.ts) en als download aangeboden. Niets verlaat het
 * apparaat. Het printvenster van de browser blijft de reserve, ook als de
 * generator om wat voor reden dan ook faalt.
 */
export function ArcanaPdfButton({ report }: Props) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const busy = status.kind === 'busy';

  async function download() {
    const target = report ?? loadResult();
    if (!target) {
      setStatus({ kind: 'error', message: 'Er is geen rapport gevonden om op te slaan.' });
      return;
    }
    setStatus({ kind: 'busy' });
    try {
      const [{ buildArcanaPdf, buildArcanaPdfFilename }, { loadArcanaPdfAssets }] = await Promise.all([
        import('../lib/arcanaPdf'),
        import('../lib/arcanaPdfAssets'),
      ]);
      const assets = await loadArcanaPdfAssets(target.archetypes.primary);
      const bytes = await buildArcanaPdf(target, assets);
      const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = buildArcanaPdfFilename(target);
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Niet meteen intrekken: de download start pas na de klik.
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setStatus({ kind: 'idle' });
    } catch (error) {
      const detail = error instanceof Error && error.message ? error.message : '';
      setStatus({
        kind: 'error',
        message: detail.includes('lettertype')
          ? `De PDF kon niet worden gemaakt: ${detail}. Controleer de verbinding en probeer het opnieuw.`
          : `De PDF kon niet worden gemaakt${detail ? ` (${detail})` : ''}.`,
      });
    }
  }

  return (
    <span className="arcana-pdf-button">
      <button
        type="button"
        className="arcana-button arcana-button--primary arcana-print-hide"
        onClick={download}
        disabled={busy}
        aria-busy={busy}
      >
        {busy ? 'PDF wordt gemaakt…' : 'Download als PDF'}
      </button>
      {status.kind === 'error' && (
        <span className="arcana-pdf-button__error arcana-print-hide" role="alert">
          {status.message}
        </span>
      )}
      <span className="arcana-pdf-button__hint arcana-print-hide">
        Het bestand wordt in je browser gemaakt; niets verlaat je apparaat.{' '}
        <button type="button" className="arcana-pdf-button__fallback" onClick={() => window.print()}>
          Of gebruik het printvenster
        </button>{' '}
        en kies bij &ldquo;Bestemming&rdquo; voor &ldquo;Opslaan als PDF&rdquo;.
      </span>
    </span>
  );
}
