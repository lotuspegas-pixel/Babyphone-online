import { useState } from 'react';

import { buildSharePageText, formatReportDate } from '../lib/arcanaExport';
import type { ArcanaReport } from '../types/arcana';

interface Props {
  report: ArcanaReport;
  /** Terug naar het rapport; niets wordt gewist. */
  onBack: () => void;
}

/**
 * De ene pagina die je mag doorgeven: het hoofdstuk `understood-by-others`
 * als op zichzelf staand document, met een aanhef aan de ontvanger, de
 * herkomst (de twee scores) en een eigen disclaimer (C §3.5). Eigen route
 * (#/delen), zodat "Opslaan als PDF" en "Printen" precies deze pagina
 * opleveren en niets van de rest van het rapport.
 *
 * De ontvanger krijgt de aanhef in de je-vorm; de hoofdstuktekst zelf staat
 * in de aanspreekvorm die de invuller koos, net als in het rapport.
 */
export function ArcanaSharePage({ report, onBack }: Props) {
  const [gekopieerd, setGekopieerd] = useState<'nee' | 'ja' | 'mislukt'>('nee');
  const section = report.sections.find((s) => s.id === 'understood-by-others');
  const name = report.meta.profile.name.trim();
  const van = name || 'iemand die dichtbij staat';
  const wie = name || 'diegene';

  if (!section) {
    return (
      <div className="arcana-screen arcana-deelpagina">
        <p>Dit rapport bevat geen deelbaar hoofdstuk.</p>
        <button type="button" className="arcana-button arcana-button--ghost" onClick={onBack}>
          Terug naar je rapport
        </button>
      </div>
    );
  }

  // De herkomstalinea begint in het rapport met "Waar dit vandaan komt:"; hier
  // staat dat al als kop erboven.
  const herkomst = (section.outro ?? []).map((o) => {
    const zonder = o.replace(/^Waar dit vandaan komt:\s*/i, '');
    return zonder.charAt(0).toUpperCase() + zonder.slice(1);
  });

  async function kopieer() {
    try {
      await navigator.clipboard.writeText(buildSharePageText(report));
      setGekopieerd('ja');
    } catch {
      setGekopieerd('mislukt');
    }
  }

  return (
    <div className="arcana-screen arcana-deelpagina">
      <div className="arcana-deelpagina__acties arcana-print-hide">
        <p>
          <strong>Deze pagina delen.</strong> Dit hoofdstuk is geschreven om door te geven. De rest van je rapport gaat
          niet mee.
        </p>
        <div className="arcana-deelpagina__knoppen">
          <button
            type="button"
            className="arcana-button arcana-button--primary"
            onClick={() => window.print()}
            title="Kies in het printvenster bij bestemming: Opslaan als PDF"
          >
            Opslaan als PDF — één pagina
          </button>
          <button type="button" className="arcana-button arcana-button--ghost" onClick={kopieer}>
            {gekopieerd === 'ja' ? 'Gekopieerd' : 'Kopiëren als tekst'}
          </button>
          <button type="button" className="arcana-button arcana-button--ghost" onClick={() => window.print()}>
            Printen
          </button>
          <button type="button" className="arcana-button arcana-button--text" onClick={onBack}>
            Terug naar je rapport
          </button>
        </div>
        {gekopieerd === 'mislukt' && (
          <p role="alert">Kopiëren lukte niet in deze browser. Selecteer de tekst hieronder en kopieer die zelf.</p>
        )}
        <p>
          Wat je deelt: deze ene pagina{name ? ' met je naam erop' : ''}. Wat je niet deelt: je scores op de andere
          dimensies, je valkuilen, je schaduwkant en je stresspatroon. Die blijven waar ze staan.
        </p>
      </div>

      <article className="legal arcana-deelpagina__blad">
        <p className="arcana-eyebrow">
          {name ? `Een pagina uit het rapport van ${name}` : 'Een pagina uit een rapport'}
        </p>
        <h1>{section.title}</h1>
        <p className="legal__lead">
          Je krijgt dit van {van}. Het is één hoofdstuk uit een zelfreflectietest die {wie} invulde: 120 vragen, waaruit
          scores worden berekend op twaalf eigenschappen. Dit hoofdstuk is het enige dat geschreven is om door te geven.
          Je hoeft er niets mee te doen. Lezen is genoeg.
        </p>

        <h2>Wat mensen aan mij missen</h2>
        <ul>
          {section.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        {herkomst.length > 0 && (
          <>
            <h2>Waar dit vandaan komt</h2>
            {herkomst.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </>
        )}

        <h2>Wat dit niet is</h2>
        <p>
          Dit is geen diagnose en geen gevalideerde psychologische test. Er is geen normgroep en geen validatiestudie.
          Het is ook geen vrijbrief: &ldquo;zo ben ik nu eenmaal&rdquo; is het einde van een gesprek, niet het begin.{' '}
          {name ? `${name} kreeg` : 'Wie dit invulde, kreeg'} die waarschuwing er zelf ook bij.
        </p>
        <p>
          Als je iets herkent, zeg het. Als je iets niet herkent, zeg dat ook — dat is even bruikbaar. De test meet hoe{' '}
          {wie} zichzelf beschrijft, niet hoe {wie} is. Jij hebt informatie die de test niet heeft.
        </p>

        <p className="arcana-fineprint">
          Arcana Profile · gemaakt op {formatReportDate(report.meta.generatedAt)} · arcanaprofile.com
        </p>
      </article>
    </div>
  );
}
