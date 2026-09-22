import valley from '../assets/valley.webp';
import { DIMENSION_FAMILIES, MAIN_DIMENSIONS } from '../data/arcanaDimensions';
import { FunnelDiagram } from './FunnelDiagram';
import { PortraitSample } from './PortraitSample';
import {
  CONTROLEER,
  DIMENSIE_TEKST,
  EERLIJK,
  FAQ,
  HERO,
  HOE_HET_WERKT,
  RAPPORT,
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

/** De twaalf dimensies in de vier families van het portret, in dezelfde volgorde. */
const FAMILIES = Object.values(DIMENSION_FAMILIES).map((familie) => ({
  ...familie,
  dimensies: MAIN_DIMENSIONS.filter((d) => d.family === familie.id),
}));

/**
 * De landingspagina: elf secties met een eigen vlak en ritme (B §4), de copy
 * uit E §5 met herovariant A. De volgorde is de ingreep: de propositie en de
 * drie controleerbare beweringen staan nu vóór het beeld en de cijfers.
 * Elke sectie is volle breedte en houdt zijn inhoud in een kolom van 1180 px.
 */
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
        <div className="landing__inner">
          <p className="landing__merk">{HERO.merk}</p>
          <p className="arcana-eyebrow landing__eyebrow">{HERO.eyebrow}</p>

          <h1 className="landing__titel">
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
        </div>
      </section>

      {/* ------------------------------------------------------ controleerbaar */}
      {/* Hoort bij de hero: geen kaarten, geen eyebrow, drie kolommen met elk
          een eigen accentlijn (narekenen goud, van jou groen, grenzen inkt). */}
      <section className="landing__controleer" aria-labelledby="controleer-kop">
        <div className="landing__inner">
          <h2 id="controleer-kop" className="landing__controleer-kop">
            {CONTROLEER.titel}
          </h2>
          <div className="landing__controleer-grid">
            {CONTROLEER.punten.map((punt) => (
              <div key={punt.id} className={`landing__controleer-punt landing__controleer-punt--${punt.id}`}>
                <h3>{punt.titel}</h3>
                <p>{punt.tekst}</p>
              </div>
            ))}
          </div>
          <p className="landing__terzijde">{CONTROLEER.terzijde}</p>
        </div>
      </section>

      {/* ------------------------------------------------------------ landschap */}
      <div className="landing__landschap" aria-hidden="true">
        <img src={valley} alt="" loading="lazy" decoding="async" width={1600} height={651} />
      </div>

      {/* --------------------------------------------------------------- cijfers */}
      <section className="landing__sectie landing__sectie--ink landing__sectie--kort" aria-label="De test in cijfers">
        <div className="landing__inner landing__stats">
          {STATS_STRIP.map((s) => (
            <div key={s.label} className="landing__stat">
              <span className="landing__stat-getal">{s.getal}</span>
              <span className="landing__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- voordelen */}
      <section className="landing__sectie" id="waarom">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
            <p className="arcana-eyebrow">Waarom dit anders leest</p>
            <h2>Een rapport dat zich laat narekenen</h2>
            <p className="landing__lead">
              De meeste persoonlijkheidstests geven je een type en een verhaal dat op veel mensen past. Hier hangt elke
              uitspraak aan een cijfer, en dat cijfer staat erbij.
            </p>
          </header>

          <div className="landing__grid landing__grid--waarom">
            {VOORDELEN.map((v, i) => (
              <article key={v.titel} className={`landing__kaart${i === 0 ? ' landing__kaart--hoofd' : ''}`}>
                <h3>{v.titel}</h3>
                <p>{v.tekst}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- hoe het werkt */}
      <section className="landing__sectie landing__sectie--veil" id="hoe-het-werkt">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
            <p className="arcana-eyebrow">Hoe het werkt</p>
            <h2>Van 120 antwoorden naar één patroon</h2>
            <p className="landing__lead">
              Je vult geen hokje in. Elk antwoord verschuift meerdere scores tegelijk, en pas aan het einde ontstaat het
              beeld.
            </p>
          </header>

          <div className="landing__hoe">
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
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ wat het meet */}
      <section className="landing__sectie landing__sectie--ruim" id="wat-het-meet">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
            <p className="arcana-eyebrow">Wat het meet</p>
            <h2>Twaalf dimensies, dertig eigenschappen</h2>
            <p className="landing__lead">
              Achter elke dimensie zitten meerdere gemeten eigenschappen. Je ziet ze in je rapport allemaal terug, met
              de score erbij — in dezelfde vier kleurfamilies als in je portret.
            </p>
          </header>

          <div className="landing__families">
            {FAMILIES.map((familie) => (
              <section key={familie.id} className="landing__familie" aria-labelledby={`familie-${familie.id}`}>
                <h3 id={`familie-${familie.id}`} className="landing__familie-kop">
                  <span className="landing__familie-symbool" aria-hidden="true">
                    {familie.symbol}
                  </span>
                  {familie.label}
                  <span className="landing__familie-betekenis">{familie.meaning}</span>
                </h3>
                <ul className="landing__dimensies">
                  {familie.dimensies.map((d) => (
                    <li key={d.id} style={{ '--kleur': `var(${d.token})` } as React.CSSProperties}>
                      <strong>{d.label}</strong>
                      <p>{DIMENSIE_TEKST[d.id]}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- je rapport */}
      <section className="landing__sectie landing__sectie--deep" id="je-rapport">
        <div className="landing__inner">
          <div className="landing__rapport">
            <div className="landing__rapport-beeld">
              <header className="landing__sectie-kop">
                <p className="arcana-eyebrow">Wat je krijgt</p>
                <h2>
                  {SITE_STATS.hoofdstukken} hoofdstukken, {SITE_STATS.woordenOngeveer} woorden
                </h2>
                <p className="landing__lead">{RAPPORT.lead}</p>
              </header>
              <PortraitSample />
              <p className="landing__rapport-bijschrift">{RAPPORT.voorbeeldBijschrift}</p>
            </div>

            <div className="landing__rapport-lijst">
              <ol className="landing__groepen">
                {RAPPORT.groepen.map((g, i) => (
                  <li key={g.titel}>
                    <span className="landing__kaart-index">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{g.titel}</h3>
                      <p>{g.tekst}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ul className="landing__extras">
                {RAPPORT.extras.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- voor wie */}
      <section className="landing__sectie landing__sectie--kort" id="voor-wie">
        <div className="landing__inner landing__inner--smal">
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
        </div>
      </section>

      {/* ----------------------------------------------------------------- eerlijk */}
      {/* Onaantastbaar (C §4 rij 26): tekst, plek en volle leesbreedte blijven. */}
      <section className="landing__sectie landing__sectie--ink landing__sectie--eerlijk" id="eerlijk">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
            <p className="arcana-eyebrow">Eerlijk gezegd</p>
            <h2>{EERLIJK.titel}</h2>
            <p className="landing__lead">
              Een instrument dat zijn eigen grenzen niet benoemt, verdient je vertrouwen niet. Daarom hier, niet
              verstopt in de kleine lettertjes.
            </p>
          </header>

          <ul className="landing__eerlijk">
            {EERLIJK.punten.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------------------- faq */}
      <section className="landing__sectie landing__sectie--veil" id="faq">
        <div className="landing__inner landing__inner--smal">
          <header className="landing__sectie-kop">
            <p className="arcana-eyebrow">Vragen</p>
            <h2>Wat mensen willen weten</h2>
          </header>

          <div className="landing__faq">
            {FAQ.map((item, i) => (
              <details key={item.vraag} open={i === 0}>
                <summary>{item.vraag}</summary>
                <p>{item.antwoord}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- slot-cta */}
      <section className="landing__sectie landing__sectie--band landing__slot">
        <div className="landing__inner">
          <h2>{SLOT_CTA.titel}</h2>
          <p>{SLOT_CTA.tekst}</p>
          <button
            type="button"
            className="arcana-button arcana-button--primary"
            onClick={hasInProgress ? onResume : onStart}
          >
            {hasInProgress ? 'Verdergaan met de test' : SLOT_CTA.cta}
          </button>
          <p className="landing__cta-meta">{HERO.ctaMeta}</p>
        </div>
      </section>
    </div>
  );
}
