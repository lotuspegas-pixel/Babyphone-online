import { DISCLAIMER_TEXT, PRIVACY_TEXT } from '../data/arcanaReportBlocks';

interface Props {
  hasInProgress: boolean;
  hasResult: boolean;
  onStart: () => void;
  onResume: () => void;
  onViewResult: () => void;
}

export function ArcanaStart({ hasInProgress, hasResult, onStart, onResume, onViewResult }: Props) {
  return (
    <div className="arcana-screen arcana-start">
      <div className="arcana-card arcana-start__card">
        <p className="arcana-eyebrow">Arcana Mirror</p>
        <h1 className="arcana-title">Een persoonlijke spiegel voor je patronen, kracht en groeirichting.</h1>
        <p className="arcana-body">
          Beantwoord 120 vragen. Je ontvangt daarna een persoonlijk rapport over je drijfveren, denkstijl,
          relaties, stresspatronen, sterke kanten en blinde vlekken.
        </p>
        <ul className="arcana-meta-list">
          <li>Duur: ongeveer 20-25 minuten</li>
          <li>Geen diagnose</li>
          <li>Antwoorden worden standaard lokaal opgeslagen</li>
        </ul>

        <div className="arcana-start__actions">
          {hasResult && (
            <button type="button" className="arcana-button arcana-button--primary" onClick={onViewResult}>
              Bekijk mijn rapport
            </button>
          )}
          {hasInProgress && !hasResult && (
            <button type="button" className="arcana-button arcana-button--primary" onClick={onResume}>
              Verdergaan
            </button>
          )}
          <button
            type="button"
            className={`arcana-button ${hasInProgress || hasResult ? 'arcana-button--ghost' : 'arcana-button--primary'}`}
            onClick={onStart}
          >
            {hasResult || hasInProgress ? 'Opnieuw beginnen' : 'Start mijn analyse'}
          </button>
        </div>

        <p className="arcana-fineprint">{PRIVACY_TEXT}</p>
        <p className="arcana-fineprint arcana-fineprint--disclaimer">{DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
}
