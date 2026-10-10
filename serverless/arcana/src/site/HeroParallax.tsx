import type { CSSProperties } from 'react';
import { HERO_LAGEN, HERO_VLAK } from './heroLagen';
import { PARALLAX_MQ } from './landingMotion';
import composiet from '../assets/art/hero/composiet.webp';

/**
 * De hero-collage als echte parallax: zes foto-lagen die los van elkaar
 * bewegen, met de naam van de test ertussen.
 *
 * De lagen komen uit scripts/bereid-parallax.mjs. Elke laag is bijgesneden op
 * zijn eigen beeld en weet via heroLagen.ts waar hij in het vlak van
 * 1672x941 hoort; daarom staan hier geen magische getallen.
 *
 * Diepte (--diepte): 0 staat stil, 1 beweegt het meest.
 *
 *   0,06  papier      het vel waarop alles ligt — staat apart, want het loopt
 *                     van rand tot rand terwijl de rest rechts uitlijnt
 *   0,18  landschap   bergen, meer en de rode zon          ┐ achter het woord
 *   0,30  boog        het stenen venster                   ┘
 *   0,42  ███ ARCANA PROFILE ███   ← de letters staan tússen de lagen
 *   0,60  collage     gescheurd papier, brein, oog, koning ┐
 *   0,76  jung        de denker in zijn stoel              │ vóór het woord
 *   1,00  tafel       schaakbord en globe                  ┘
 *
 * De twee groepen staan er niet om de stapelvolgorde — die volgt al uit de
 * DOM — maar omdat het woord over de volle bandbreedte moet kunnen staan
 * terwijl de platen zelf rechts uitgelijnd blijven. Daardoor blijft er links
 * schoon papier over: precies genoeg dat de naam leesbaar begint en met zijn
 * staart achter het gescheurde papier verdwijnt.
 *
 * Zonder parallax (smal scherm of prefers-reduced-motion) is het één platte
 * composiet van 93 KB; de letters staan er dan gewoon overheen.
 */

/** Waar het woord in de stapel staat. Tussen boog (0,30) en collage (0,60). */
const WOORD_DIEPTE = 0.42;

const VEL = HERO_LAGEN[0];
const ACHTER = HERO_LAGEN.filter((l) => l !== VEL && l.diepte < WOORD_DIEPTE);
const VOOR = HERO_LAGEN.filter((l) => l.diepte > WOORD_DIEPTE);

function Laag({ laag }: { laag: (typeof HERO_LAGEN)[number] }) {
  return (
    <img
      className="hero__laag"
      src={laag.bron}
      alt=""
      decoding="async"
      fetchPriority={laag.diepte < 0.35 ? 'high' : 'auto'}
      style={
        {
          '--diepte': laag.diepte,
          left: `${laag.links}%`,
          top: `${laag.boven}%`,
          width: `${laag.breedte}%`,
        } as CSSProperties
      }
    />
  );
}

function Woord({ diepte }: { diepte: number }) {
  return (
    <p className="hero__woord" aria-hidden="true" style={{ '--diepte': diepte } as CSSProperties}>
      <span className="hero__woord-een">Arcana</span>
      <span className="hero__woord-twee">Profile</span>
    </p>
  );
}

export function HeroParallax() {
  // Eén meting bij het opbouwen: hierna verandert dit niet meer zonder dat de
  // pagina opnieuw laadt, en een luisteraar zou alleen maar lagen in- en
  // uitladen terwijl iemand zijn venster versleept.
  const gelaagd = typeof matchMedia === 'function' && matchMedia(PARALLAX_MQ).matches;

  if (!gelaagd) {
    return (
      <div className="hero__scene hero__scene--plat">
        <img
          className="hero__plat"
          src={composiet}
          alt=""
          width={HERO_VLAK.breedte}
          height={HERO_VLAK.hoogte}
          decoding="async"
          fetchPriority="high"
        />
        <Woord diepte={1} />
      </div>
    );
  }

  return (
    <div className="hero__scene">
      <img
        className="hero__vel"
        src={VEL.bron}
        alt=""
        decoding="async"
        fetchPriority="high"
        style={{ '--diepte': VEL.diepte } as CSSProperties}
      />

      <div className="hero__groep">
        {ACHTER.map((laag) => (
          <Laag key={laag.naam} laag={laag} />
        ))}
      </div>

      <Woord diepte={WOORD_DIEPTE} />

      <div className="hero__groep">
        {VOOR.map((laag) => (
          <Laag key={laag.naam} laag={laag} />
        ))}
      </div>
    </div>
  );
}
