import { loadAnswers, loadProfile } from '../lib/arcanaStorage';

interface Props {
  onRetry: () => void;
  onBackToSite: () => void;
}

/**
 * Het scherm dat verschijnt als de rekenmodule niet geladen kan worden nadat
 * de laatste vraag is beantwoord — in de trein, achter een haperende wifi.
 *
 * Dit is het duurste moment om iets te verliezen: 25 minuten werk. De
 * antwoorden staan op dat moment al volledig in localStorage, dus er gaat
 * niets verloren; zeg dat dan ook, en geef een uitweg die niet van het
 * netwerk afhangt: de antwoorden als bestand meenemen.
 */
export function ArcanaEngineUnavailable({ onRetry, onBackToSite }: Props) {
  function downloadAnswers() {
    const payload = { profile: loadProfile(), answers: loadAnswers(), exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arcana-antwoorden.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="arcana-screen arcana-engine-unavailable" role="alert">
      <div className="arcana-card">
        <h2>Je antwoorden zijn bewaard op dit apparaat.</h2>
        <p>
          Je rapport kan nu niet gemaakt worden, omdat het deel van de app dat rekent niet geladen kon worden.
          Meestal is de verbinding even weggevallen. Probeer het opnieuw, of kom later terug — je hoeft niets
          over te doen.
        </p>
        <div className="arcana-engine-unavailable__actions">
          <button type="button" className="arcana-button arcana-button--primary" onClick={onRetry}>
            Opnieuw proberen
          </button>
          <button type="button" className="arcana-button arcana-button--ghost" onClick={downloadAnswers}>
            Antwoorden downloaden
          </button>
          <button type="button" className="arcana-button arcana-button--text" onClick={onBackToSite}>
            Terug naar de website
          </button>
        </div>
      </div>
    </div>
  );
}
