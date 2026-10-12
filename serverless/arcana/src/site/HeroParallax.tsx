import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import { HERO_LAGEN, HERO_VLAK } from './heroLagen';
import { ArcanaLogo } from '../components/ArcanaLogo';
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

/**
 * Bijstelling bovenop de gemeten posities uit heroLagen.ts.
 *
 * In de bronplaat liggen Jung en de schaaktafel tegen elkaar aan en valt een
 * deel van de collage achter hem weg. Omdat de lagen hier los zijn, kan dat
 * uit elkaar — dat is precies de winst van parallax boven één platte plaat.
 *
 * Dit staat met opzet níét in heroLagen.ts: dat bestand wordt gegenereerd uit
 * de kunst en moet dus alleen beschrijven waar de platen zaten. Hier staat wat
 * wij daar bewust van afwijken, zodat opnieuw exporteren deze afstemming niet
 * weggooit.
 *
 * Waarden zijn percentpunten van het plaatvlak; `schaal` is een factor op de
 * breedte. Dit zijn smaakgetallen, geen metingen — draai eraan tot het klopt.
 */
const BIJSTELLING: Record<string, { x?: number; y?: number; schaal?: number }> = {
  // Iets omhoog en een slag kleiner: hij domineerde de plaat en drukte de
  // collage achter zich weg.
  jung: { y: -3.5, schaal: 0.95 },
  // De tafel zakt mee naar beneden, zodat er lucht tussen hem en de man komt.
  tafel: { y: 2.5 },
  // Het landschap een duim naar rechts: dan kijkt het venster langs Jung heen
  // in plaats van tegen zijn achterhoofd.
  landschap: { x: 1.5 },
};

const VEL = HERO_LAGEN[0];
const ACHTER = HERO_LAGEN.filter((l) => l !== VEL && l.diepte < WOORD_DIEPTE);
const VOOR = HERO_LAGEN.filter((l) => l.diepte > WOORD_DIEPTE);

function Laag({ laag }: { laag: (typeof HERO_LAGEN)[number] }) {
  const bij = BIJSTELLING[laag.naam];
  const breedte = laag.breedte * (bij?.schaal ?? 1);
  // Krimpt een laag, dan zou hij om zijn linkerbovenhoek krimpen en naar rechts
  // lijken te schuiven; de helft van het verschil terugleggen houdt hem staan.
  const links = laag.links + (laag.breedte - breedte) / 2 + (bij?.x ?? 0);

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
          left: `${links}%`,
          top: `${laag.boven + (bij?.y ?? 0)}%`,
          width: `${breedte}%`,
        } as CSSProperties
      }
    />
  );
}

/**
 * Het logo, als één plaat tussen de lagen (ArcanaLogo.tsx — hetzelfde bestand
 * als in kop, voet en rapport).
 *
 * Eerder bestond het merk uit drie losse letterplaten met elk een eigen diepte.
 * Het logo is nu één ontwerp met "Profile.com" dat onder de staart van de A
 * doorloopt; die onderdelen apart laten bewegen zou de overlap openbreken.
 * Eén plaat op één diepte (WOORD_DIEPTE) is daarom ook de juiste keuze, niet
 * alleen de eenvoudigste.
 *
 * `sizes` is de breedte die --merk in site.css oplevert: ~42-51 % van het
 * scherm. Iets ruim, zodat de browser liever een maat te scherp kiest dan te
 * zacht. Alleen op een breed scherm gerenderd (zie `breed` hieronder).
 */
const MERK_SIZES = '50vw';

function Woord({ gelaagd }: { gelaagd: boolean }) {
  return (
    <div className="hero__woord" aria-hidden="true">
      <ArcanaLogo
        decoratief
        priority
        className="hero__merk"
        sizes={MERK_SIZES}
        style={{ '--diepte': gelaagd ? WOORD_DIEPTE : 1 } as CSSProperties}
      />
    </div>
  );
}

/**
 * De foto-lagen komen pas binnen als ze allemaal gedecodeerd zijn. Anders start
 * hun animatie op lagen die nog niet getekend zijn en zie je ze er halverwege
 * in springen — dat las als haperen. Tot dan staan ze op onzichtbaar (zie
 * `.landing__hero:not(.is-binnen)` in site.css); het vel, de naam en de
 * hoofdactie hangen er niet van af en beginnen meteen. Is er na 3,5 s nog iets
 * niet binnen, dan begint het toch, zodat de hero nooit leeg blijft.
 */
function useIntro(scene: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = scene.current;
    const hero = el?.closest('.landing__hero');
    if (!el || !hero) return;
    let gestart = false;
    const start = () => {
      if (gestart) return;
      gestart = true;
      hero.classList.add('is-binnen');
    };
    const noodstart = window.setTimeout(start, 3500);
    const beelden = Array.from(el.querySelectorAll('img'));
    void Promise.all(beelden.map((b) => b.decode().catch(() => undefined))).then(() => {
      // Twee frames wachten: dan staat de eerste verf er zeker en begint de
      // animatie op een rustig moment, niet midden in het decoderen.
      requestAnimationFrame(() => requestAnimationFrame(start));
    });
    return () => window.clearTimeout(noodstart);
  }, [scene]);
}

export function HeroParallax() {
  // Eén meting bij het opbouwen: hierna verandert dit niet meer zonder dat de
  // pagina opnieuw laadt, en een luisteraar zou alleen maar lagen in- en
  // uitladen terwijl iemand zijn venster versleept.
  const gelaagd = typeof matchMedia === 'function' && matchMedia(PARALLAX_MQ).matches;
  // Het logo in de hero alleen op een breed scherm. Op een telefoon staat
  // hetzelfde logo al in de kop er vlak boven, en op de platte afbeelding valt
  // "Profile.com" daar over de collage heen, waar het niet te lezen is. Niet
  // renderen in plaats van met CSS verbergen: een verborgen plaat wordt tóch
  // opgehaald, en dat zijn 60-140 KB voor iets wat niemand ziet.
  const breed = typeof matchMedia === 'function' && matchMedia('(min-width: 900px)').matches;
  const scene = useRef<HTMLDivElement>(null);
  useIntro(scene);

  if (!gelaagd) {
    return (
      <div className="hero__scene hero__scene--plat" ref={scene}>
        <img
          className="hero__plat"
          src={composiet}
          alt=""
          width={HERO_VLAK.breedte}
          height={HERO_VLAK.hoogte}
          decoding="async"
          fetchPriority="high"
        />
        {breed && <Woord gelaagd={false} />}
      </div>
    );
  }

  return (
    <div className="hero__scene" ref={scene}>
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

      <Woord gelaagd />

      <div className="hero__groep">
        {VOOR.map((laag) => (
          <Laag key={laag.naam} laag={laag} />
        ))}
      </div>
    </div>
  );
}
