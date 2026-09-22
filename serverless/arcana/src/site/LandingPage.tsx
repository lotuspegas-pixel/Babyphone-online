import valley from '../assets/valley.webp';
import { FunnelDiagram } from './FunnelDiagram';
import {
  DIMENSIES,
  EERLIJK,
  FAQ,
  HERO,
  HOE_HET_WERKT,
  RAPPORT_GROEPEN,
  SITE_STATS,
  SLOT_CTA,
  STATS_STRIP,
  VOORDELEN,
  VOOR_WIE,
} from './siteContent';

interface Props {
  onStart: () => void;
  onResume: () => void;
  onViewResult: () => void;
  hasInProgress: boolean;
  hasResult: boolean;
  resumeQuestionNumber: number;
}

export function LandingPage({
  onStart,
  onResume,
  onViewResult,
  hasInProgress,
  hasResult,
  resumeQuestionNumber,
}: Props) {
  return (
    <div className="landing" id="top">
      {/* ---------------------------------------------------------------- hero */}
      <section className="landing__hero">
        <p className="arcana-eyebrow">{HERO.eyebrow}</p>

        <h1 className="landing__wordmark">
          {HERO.titelRegels.map((regel) => (
            <span key={regel}>{regel}</span>
          ))}
        </h1>

        <p className="landing__belofte">{HERO.belofte}</p>

        <div className="landing__cta-blok">
          {hasResult ? (
            <>
              <button type="button" className="arcana-button arcana-button--primary" onClick={onViewResult}>
                Bekijk je rapport
              </button>
              <button type="button" className="arcana-button arcana-button--ghost" onClick={onStart}>
                Opnieuw beginnen
              </button>
            </>
          ) : hasInProgress ? (
            <>
              <button type="button" className="arcana-button arcana-button--primary" onClick={onResume}>
                Verdergaan — vraag {resumeQuestionNumber} van {SITE_STATS.vragen}
              </button>
              <button type="button" className="arcana-button arcana-button--ghost" onClick={onStart}>
                Opnieuw beginnen
              </button>
            </>
          ) : (
            <button type="button" className="arcana-button arcana-button--primary" onClick={onStart}>
              {HERO.cta}
            </button>
          )}
          <p className="landing__cta-meta">{HERO.ctaMeta}</p>
        </div>

        <ul className="landing__vertrouwen">
          {HERO.vertrouwen.map((punt) => (
            <li key={punt}>{punt}</li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ landschap */}
      <div className="landing__landschap" aria-hidden="true">
        <img src={valley} alt="" loading="lazy" decoding="async" width={1600} height={651} />
      </div>

      {/* --------------------------------------------------------------- cijfers */}
      <section className="landing__stats" aria-label="De test in cijfers">
        {STATS_STRIP.map((s) => (
          <div key={s.label} className="landing__stat">
            <span className="landing__stat-getal">{s.getal}</span>
            <span className="landing__stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* -------------------------------------------------------------- voordelen */}
      <section className="landing__sectie" id="waarom">
        <header className="landing__sectie-kop">
          <p className="arcana-eyebrow">Waarom dit anders leest</p>
          <h2>Een rapport dat zich laat narekenen</h2>
          <p className="landing__lead">
            De meeste persoonlijkheidstests geven je een type en een verhaal dat op veel mensen past. Hier
            hangt elke uitspraak aan een cijfer, en dat cijfer staat erbij.
          </p>
        </header>

        <div className="landing__grid landing__grid--3">
          {VOORDELEN.map((v) => (
            <article key={v.titel} className="landing__kaart">
              <h3>{v.titel}</h3>
              <p>{v.tekst}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- hoe het werkt */}
      <section className="landing__sectie landing__sectie--veil" id="hoe-het-werkt">
        <header className="landing__sectie-kop">
          <p className="arcana-eyebrow">Hoe het werkt</p>
          <h2>Van 120 antwoorden naar één patroon</h2>
          <p className="landing__lead">
            Je vult geen hokje in. Elk antwoord verschuift meerdere scores tegelijk, en pas aan het einde
            ontstaat het beeld.
          </p>
        </header>

        <FunnelDiagram />

        <ol className="landing__stappen">
          {HOE_HET_WERKT.map((stap) => (
            <li key={stap.nummer} className="landing__stap">
              <span className="landing__stap-nummer">{stap.nummer}</span>
              <div>
                <h3>{stap.titel}</h3>
                <p>{stap.tekst}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------------ wat het meet */}
      <section className="landing__sectie" id="wat-het-meet">
        <header className="landing__sectie-kop">
          <p className="arcana-eyebrow">Wat het meet</p>
          <h2>Twaalf dimensies, dertig eigenschappen</h2>
          <p className="landing__lead">
            Achter elke dimensie zitten meerdere gemeten eigenschappen. Je ziet ze in je rapport allemaal
            terug, met de score erbij.
          </p>
        </header>

        <ul className="landing__dimensies">
          {DIMENSIES.map((d) => (
            <li key={d.naam}>
              <h3>{d.naam}</h3>
              <p>{d.tekst}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------------------- je rapport */}
      <section className="landing__sectie landing__sectie--veil" id="je-rapport">
        <header className="landing__sectie-kop">
          <p className="arcana-eyebrow">Wat je krijgt</p>
          <h2>{SITE_STATS.hoofdstukken} hoofdstukken, {SITE_STATS.woordenOngeveer} woorden</h2>
          <p className="landing__lead">
            Geen samenvatting van een alinea, maar een volledig document dat je kunt bewaren, printen of
            meenemen naar een gesprek.
          </p>
        </header>

        <div className="landing__grid landing__grid--3">
          {RAPPORT_GROEPEN.map((g, i) => (
            <article key={g.titel} className="landing__kaart landing__kaart--genummerd">
              <span className="landing__kaart-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{g.titel}</h3>
              <p>{g.tekst}</p>
            </article>
          ))}
        </div>

        <ul className="landing__extras">
          <li>Je portret: al je twaalf dimensies samen in één getekend beeld</li>
          <li>Je vijf sterkste eigenschappen én je vijf grootste valkuilen, met groeisleutel</li>
          <li>Je stresspatroon: wie je wordt zodra de druk oploopt</li>
          <li>Je spanningsvelden: twee dingen die je allebei wilt en elkaar in de weg zitten</li>
          <li>Een hoofdstuk dat geschreven is om door te geven aan iemand die dichtbij staat</li>
          <li>Een actieplan van vier weken met één concrete stap per week</li>
        </ul>
      </section>

      {/* ---------------------------------------------------------------- voor wie */}
      <section className="landing__sectie" id="voor-wie">
        <header className="landing__sectie-kop">
          <p className="arcana-eyebrow">Voor wie</p>
          <h2>Wanneer dit de moeite waard is</h2>
        </header>

        <div className="landing__grid landing__grid--2">
          {VOOR_WIE.map((d) => (
            <article key={d.titel} className="landing__kaart">
              <h3>{d.titel}</h3>
              <p>{d.tekst}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- eerlijk */}
      <section className="landing__sectie landing__sectie--eerlijk" id="eerlijk">
        <header className="landing__sectie-kop">
          <p className="arcana-eyebrow">Eerlijk gezegd</p>
          <h2>{EERLIJK.titel}</h2>
          <p className="landing__lead">
            Een instrument dat zijn eigen grenzen niet benoemt, verdient je vertrouwen niet. Daarom hier,
            niet verstopt in de kleine lettertjes.
          </p>
        </header>

        <ul className="landing__eerlijk">
          {EERLIJK.punten.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------------------- faq */}
      <section className="landing__sectie landing__sectie--veil" id="faq">
        <header className="landing__sectie-kop">
          <p className="arcana-eyebrow">Vragen</p>
          <h2>Wat mensen willen weten</h2>
        </header>

        <div className="landing__faq">
          {FAQ.map((item) => (
            <details key={item.vraag}>
              <summary>{item.vraag}</summary>
              <p>{item.antwoord}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- slot-cta */}
      <section className="landing__slot">
        <h2>{SLOT_CTA.titel}</h2>
        <p>{SLOT_CTA.tekst}</p>
        <button type="button" className="arcana-button arcana-button--primary" onClick={hasInProgress ? onResume : onStart}>
          {hasInProgress ? 'Verdergaan met de test' : SLOT_CTA.cta}
        </button>
        <p className="landing__cta-meta">{HERO.ctaMeta}</p>
      </section>
    </div>
  );
}
