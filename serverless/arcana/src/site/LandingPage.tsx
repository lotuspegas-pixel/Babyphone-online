import { useRef, type CSSProperties, type ReactNode } from 'react';
import emblem from '../assets/art/emblems/emblem-theSeeker.svg';
import { ArcanaIcon } from '../components/ArcanaIcon';
import { ArcanaMotif, type MotifKind } from '../components/ArcanaMotif';
import { ArcanaSeal } from '../components/ArcanaSeal';
import { ArchetypeVerkenner } from './ArchetypeVerkenner';
import { DIMENSION_FAMILIES, MAIN_DIMENSIONS, type DimensionFamilyId } from '../data/arcanaDimensions';
import { FunnelDiagram } from './FunnelDiagram';
import { HeroParallax } from './HeroParallax';
import { useParallax, useReveal } from './landingMotion';
import { PortraitSample } from './PortraitSample';
import {
  ARCHETYPE_VERKENNER,
  CONTROLEER,
  DIMENSIE_TEKST,
  EERLIJK,
  FAQ,
  HERO,
  HERO_NOTES,
  HOE_HET_WERKT,
  JUNG_CITAAT,
  KIJK_NA,
  LENZEN,
  MEER,
  METHODE,
  NUT,
  RAPPORT,
  RAPPORT_BAND,
  SITE_STATS,
  SLOT_CTA,
  STATS_STRIP,
  VERTROUWEN,
  VOORBEELD_KORT,
  VOORBEELD_URL,
  VOORDELEN,
  VOOR_WIE,
} from './siteContent';

import { RENDER } from './renderBeeld';

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

/** Het motief van elke familie, in zijn eigen familiekleur — dezelfde vier
 * koppelingen als src/data/arcanaMotifs.ts, het portret en het rapport. Staat
 * in de familiekop bij "Wat het meet"; geen losse iconenstrook. */
const MOTIEF: Record<DimensionFamilyId, { kind: MotifKind; kleur: string }> = {
  zelf: { kind: 'doorgang', kleur: 'var(--fam-zelf)' },
  motor: { kind: 'brein', kleur: 'var(--fam-motor)' },
  grip: { kind: 'vlam', kleur: 'var(--fam-grip)' },
  contact: { kind: 'kompas', kleur: 'var(--fam-contact)' },
};

const LENS_BEELD = { persona: RENDER.persona, schaduw: RENDER.schaduw, denkstijl: RENDER.denkstijl };

/** Kort handschrift in de marge. Altijd Engels (lang="en") en decoratief
 * (aria-hidden): het is sfeer, geen inhoud. `d` is de vertraging van het
 * intekenmoment in de hero. */
function Hand({ cls, d, children }: { cls: string; d?: string; children: ReactNode }) {
  return (
    <p className={`hand ${cls}`} style={d ? ({ '--d': d } as CSSProperties) : undefined} lang="en" aria-hidden="true">
      {children}
    </p>
  );
}

/** Mono-kapitalenlijstje; de hoofdletters komen uit CSS, de tekst staat gewoon in de DOM. */
function Mono({ items, cls = '', hidden }: { items: readonly string[]; cls?: string; hidden?: boolean }) {
  return (
    <ul className={`mono ${cls}`} aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** "120 vragen · 20–25 minuten · …" als lijstje, zonder middenpunten in de tekst. */
function Meta() {
  return (
    <ul className="landing__meta">
      {HERO.ctaMeta.split(' · ').map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  );
}

/** Regels voor de nagebootste pagina's; breedtes in procenten. */
function Regels({ w }: { w: number[] }) {
  return (
    <div className="rmock__regels">
      {w.map((x, i) => (
        <i key={i} style={{ width: `${x}%` }} />
      ))}
    </div>
  );
}

/**
 * Drie pagina's uit het voorbeeldrapport als waaier. Gebouwd uit HTML, CSS en
 * het bestaande voorbeeldportret — geen schermafbeelding, geen echte inhoud —
 * en volledig aria-hidden: de lijst ernaast draagt de betekenis.
 */
function RapportMock() {
  // De buitenste laag draagt draai en schaduw, de binnenste het gescheurde
  // papier: clip-path knipt een schaduw op hetzelfde element weg.
  const blad = (n: number, kinderen: ReactNode) => (
    <div className={`rmock__pagina rmock__pagina--${n}`}>
      <div className="rmock__blad arcana-torn">{kinderen}</div>
    </div>
  );
  return (
    <div className="rmock" aria-hidden="true">
      {blad(
        3,
        <>
          <p className="rmock__kop">Persoonlijke inzichten</p>
          <Regels w={[100, 94, 100, 72]} />
          <ul className="rmock__lijst">
            {[88, 96, 70].map((x) => (
              <li key={x}>
                <i style={{ width: `${x}%` }} />
              </li>
            ))}
          </ul>
          <Regels w={[100, 90, 60]} />
        </>,
      )}
      {blad(
        2,
        <>
          <p className="rmock__kop">Jouw dimensies</p>
          <PortraitSample />
          <Regels w={[100, 84]} />
        </>,
      )}
      {blad(
        1,
        <>
          <ArcanaSeal size={26} />
          <p className="rmock__titel">Jouw Arcana Profile rapport</p>
          <img src={emblem} alt="" width={320} height={340} loading="lazy" decoding="async" />
          <p className="rmock__label">Voorbeeld</p>
        </>,
      )}
    </div>
  );
}

/**
 * De landingspagina. Volgorde: hero, de drie controleerbare beweringen, de
 * donkere band "Meer dan een test", de drie lenzen, het rapport, de vijf
 * voordelen, de methode met de uitleg die erbij hoort, de cijfers, de
 * bestaande onderbouwing en de slotoproep. Elke sectie is volle breedte en
 * houdt zijn inhoud in een kolom.
 *
 * Beweging: één geregisseerd moment bij laden (de hero), daarna scroll- en
 * pointerparallax in de hero en per blok één onthulling (data-onthul, zie
 * landingMotion.ts). De rest staat stil.
 */
export function LandingPage({
  onStart,
  onResume,
  onViewResult,
  hasInProgress,
  hasResult,
  resumeQuestionNumber,
}: Props) {
  const wortel = useRef<HTMLDivElement>(null);
  const heroArt = useRef<HTMLDivElement>(null);
  useReveal(wortel);
  useParallax(heroArt);

  return (
    <div className="landing" id="top" ref={wortel}>
      {/* ---------------------------------------------------------------- hero */}
      <section className="landing__hero">
        {/* De collage ligt als volle band achter de tekst: zes losse lagen met
            de naam van de test ertussen (HeroParallax.tsx). Dit blok is de
            parallaxwortel — het draagt --py, --px en --pyy. */}
        <div className="landing__hero-art" aria-hidden="true" ref={heroArt}>
          <HeroParallax />
        </div>

        <div className="landing__inner landing__hero-grid">
          <div className="landing__hero-tekst">
            <h1 className="landing__titel">
              {HERO.titelRegels.map((regel) => (
                <span key={regel}>{regel}</span>
              ))}
            </h1>

            <p className="landing__belofte">{HERO.belofte}</p>

            <div className="landing__knoppen">
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
                  {HERO.cta} <span aria-hidden="true">→</span>
                </button>
              )}
              <a className="landing__voorbeeld-link" href={VOORBEELD_URL}>
                <ArcanaIcon kind="document" size={22} />
                {VOORBEELD_KORT}
              </a>
            </div>
            <Meta />

            <ul className="landing__vertrouwen">
              {HERO.vertrouwen.map((punt) => (
                <li key={punt}>{punt}</li>
              ))}
            </ul>

            <div className="landing__hero-voet" aria-hidden="true">
              <Mono items={HERO_NOTES.lijst} cls="landing__hero-lijst" />
              <Hand cls="hand--kaart">{HERO_NOTES.kaart}</Hand>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------ controleerbaar */}
      {/* Hoort bij de hero: geen kaarten, geen eyebrow, drie kolommen met elk
          een eigen accentlijn (narekenen rood, van jou groen, grenzen inkt). */}
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

      {/* ---------------------------------------------------- meer dan een test */}
      <section className="landing__sectie landing__sectie--ink landing__meer" aria-labelledby="meer-kop">
        <div className="landing__inner landing__meer-grid">
          <div className="landing__meer-links" data-onthul>
            <blockquote className="hand landing__jung" lang="en">
              <p>{JUNG_CITAAT.tekst}</p>
              <footer>
                — <cite>{JUNG_CITAAT.auteur}</cite>
              </footer>
            </blockquote>
            <img src={RENDER.doorgang.src} alt="" width={RENDER.doorgang.width} height={RENDER.doorgang.height} loading="lazy" decoding="async" />
          </div>

          <div className="landing__meer-midden">
            <h2 id="meer-kop">{MEER.titel}</h2>
            <p>{MEER.tekst}</p>
          </div>

          <div className="landing__meer-rechts">
            <Mono items={MEER.lijst} />
            <Hand cls="hand--same">{MEER.noot}</Hand>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- de lenzen */}
      <section className="landing__lenzen" aria-label="Persona, schaduw en denkstijl">
        <div className="landing__inner landing__lenzen-grid" data-onthul>
          {LENZEN.map((lens) => (
            <article key={lens.id} className={`landing__lens landing__lens--${lens.id}`}>
              <h3>{lens.titel}</h3>
              <p>{lens.tekst}</p>
              <div className="landing__lens-beeld">
                <img
                  src={LENS_BEELD[lens.id].src}
                  alt=""
                  width={LENS_BEELD[lens.id].width}
                  height={LENS_BEELD[lens.id].height}
                  loading="lazy"
                  decoding="async"
                />
                {lens.noot && <Hand cls="hand--lens">{lens.noot}</Hand>}
                {lens.lijst && <Mono items={lens.lijst} cls="landing__lens-lijst" />}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- je rapport */}
      <section className="landing__sectie landing__sectie--ink landing__rapport" id="je-rapport" aria-labelledby="rapport-kop">
        <div className="landing__inner">
          <div className="landing__rapport-grid">
            <div className="landing__rapport-tekst">
              <h2 id="rapport-kop">{RAPPORT_BAND.titel}</h2>
              <p className="landing__lead">{RAPPORT.lead}</p>
              <a className="landing__pijl" href={VOORBEELD_URL}>
                {RAPPORT_BAND.cta} <span aria-hidden="true">→</span>
              </a>
              <ul className="landing__groepen">
                {RAPPORT.groepen.map((g) => (
                  <li key={g.titel}>
                    <h3>{g.titel}</h3>
                    <p>{g.tekst}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="landing__rapport-mock" data-onthul>
              <RapportMock />
              <p className="landing__bijschrift">{RAPPORT.voorbeeldBijschrift}</p>
            </div>
          </div>

          <ul className="landing__extras">
            {RAPPORT.extras.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- voordelen */}
      <section className="landing__nut" aria-label="Wat je eraan hebt">
        <ul className="landing__inner landing__nut-lijst" data-onthul>
          {NUT.map((n) => (
            <li key={n.titel}>
              <ArcanaIcon kind={n.icoon} />
              <h3>{n.titel}</h3>
              <p>{n.tekst}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ de methode */}
      <section className="landing__sectie landing__methode" id="methode" aria-labelledby="methode-kop">
        <div className="landing__inner landing__methode-grid" data-onthul>
          <div className="landing__methode-tekst">
            <h2 id="methode-kop">{METHODE.titel}</h2>
            <p>{METHODE.tekst}</p>
            <a className="landing__pijl" href="#hoe-het-werkt">
              {METHODE.cta} <span aria-hidden="true">→</span>
            </a>
          </div>
          <Mono items={METHODE.lijst} cls="landing__methode-lijst" />
          <div className="landing__methode-beeld" aria-hidden="true">
            <img src={RENDER.methode.src} alt="" width={RENDER.methode.width} height={RENDER.methode.height} loading="lazy" decoding="async" />
            <Hand cls="hand--know">{METHODE.noot}</Hand>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- hoe het werkt */}
      <section className="landing__sectie landing__sectie--veil" id="hoe-het-werkt">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
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
                  <ArcanaMotif
                    kind={MOTIEF[familie.id].kind}
                    color={MOTIEF[familie.id].kleur}
                    className="landing__familie-motief"
                  />
                  {familie.label}
                  <span className="landing__familie-betekenis">{familie.meaning}</span>
                </h3>
                <ul className="landing__dimensies">
                  {familie.dimensies.map((d) => (
                    <li key={d.id} style={{ '--kleur': `var(${d.token})` } as CSSProperties}>
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

      {/* ----------------------------------------------------------- de twaalf */}
      {/* Volgt direct op "wat het meet": eerst wat er gemeten wordt, dan hoe de
          uitkomst gaat heten. De verkenner laat zien dat die naam een optelsom
          is van vier van die eigenschappen, niet een etiket dat erbovenop komt. */}
      <section className="landing__sectie landing__twaalf" id="de-twaalf" aria-labelledby="twaalf-kop">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
            <h2 id="twaalf-kop">{ARCHETYPE_VERKENNER.titel}</h2>
            <p className="landing__lead">{ARCHETYPE_VERKENNER.lead}</p>
          </header>

          <ArchetypeVerkenner />

          <p className="landing__twaalf-naschrift">{ARCHETYPE_VERKENNER.naschrift}</p>
        </div>
      </section>

      {/* --------------------------------------------------------------- cijfers */}
      {/* Alleen gemeten getallen en één eerlijke zin: geen gebruikersaantal,
          geen beoordeling, geen getuigenis (E §5.9). De getallen staan
          voluit in de DOM; het optellen (data-tel) is alleen beweging. */}
      <section className="landing__trust" aria-label="De test in cijfers">
        <div className="landing__inner landing__trust-grid" data-onthul>
          <p className="landing__trust-tekst">{VERTROUWEN}</p>
          {STATS_STRIP.map((s) => (
            <div key={s.label} className="landing__stat">
              <span className="landing__stat-getal" data-tel>
                {s.getal}
              </span>
              <span className="landing__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- voordelen */}
      <section className="landing__sectie landing__sectie--veil" id="waarom">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
            <h2>Een rapport dat zich laat narekenen</h2>
            <p className="landing__lead">
              De meeste persoonlijkheidstests geven je een type en een verhaal dat op veel mensen past. Hier hangt elke
              uitspraak aan een cijfer, en dat cijfer staat erbij.
            </p>
          </header>

          <ul className="landing__waarom">
            {VOORDELEN.map((v) => (
              <li key={v.titel}>
                <h3>{v.titel}</h3>
                <p>{v.tekst}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- kijk het zelf na */}
      {/* E §5.9: geen verzonnen bewijs, wél drie controleerbare dingen. De eerste
          leidt naar het statische voorbeeldrapport — de derde weg voor wie geen
          25 minuten heeft. */}
      <section className="landing__sectie landing__sectie--band" id="kijk-na" aria-labelledby="kijk-na-kop">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
            <h2 id="kijk-na-kop">{KIJK_NA.titel}</h2>
            <p className="landing__lead">{KIJK_NA.lead}</p>
          </header>

          <div className="landing__na">
            {KIJK_NA.blokken.map((blok, i) => (
              <div key={blok.titel} className={`landing__na-blok${i === 0 ? ' landing__na-blok--eerst arcana-torn' : ''}`}>
                <h3>{blok.titel}</h3>
                <p>{blok.tekst}</p>
                {blok.href && (
                  <a
                    className={`landing__na-cta${i === 0 ? ' arcana-button arcana-button--ghost' : ''}`}
                    href={blok.href}
                  >
                    {blok.cta} →
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="landing__terzijde">{KIJK_NA.slotregel}</p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- voor wie */}
      <section className="landing__sectie landing__sectie--kort" id="voor-wie">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
            <h2>Wanneer dit de moeite waard is</h2>
          </header>

          <ul className="landing__voorwie">
            {VOOR_WIE.map((d) => (
              <li key={d.titel}>
                <h3>{d.titel}</h3>
                <p>{d.tekst}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------------- eerlijk */}
      {/* Onaantastbaar (C §4 rij 26): tekst, plek en volle leesbreedte blijven. */}
      <section className="landing__sectie landing__sectie--ink landing__sectie--eerlijk" id="eerlijk">
        <div className="landing__inner">
          <header className="landing__sectie-kop">
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
      <section className="landing__slot" aria-labelledby="slot-kop">
        <div className="landing__inner landing__slot-inner">
          <h2 id="slot-kop">{SLOT_CTA.titel}</h2>
          <p>{SLOT_CTA.tekst}</p>
          <div className="landing__knoppen">
            <button
              type="button"
              className="arcana-button arcana-button--primary"
              onClick={hasInProgress ? onResume : onStart}
            >
              {hasInProgress ? 'Verdergaan met de test' : SLOT_CTA.cta} <span aria-hidden="true">→</span>
            </button>
            <a className="arcana-button arcana-button--ghost" href={VOORBEELD_URL}>
              {VOORBEELD_KORT}
            </a>
          </div>
          <Meta />
          {/* Marginalia links en rechts van de slotoproep, zoals op de plaat: geen kop-labels. */}
          <p className="mono landing__slot-noot" lang="en" aria-hidden="true">
            {HERO_NOTES.diepte}
          </p>
          <Mono items={HERO_NOTES.woorden} cls="landing__slot-lijst" hidden />
        </div>
        <img
          className="landing__scene"
          src={RENDER.slot.src}
          alt=""
          width={RENDER.slot.width}
          height={RENDER.slot.height}
          loading="lazy"
          decoding="async"
        />
      </section>
    </div>
  );
}
