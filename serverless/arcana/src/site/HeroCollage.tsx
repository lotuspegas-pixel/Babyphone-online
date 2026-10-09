import { useEffect, useState, type CSSProperties } from 'react';
import heroCollage from '../assets/art/landing/hero-collage.svg';
import { PARALLAX_MQ } from './landingMotion';

/**
 * De hero-collage in parallaxlagen. Het SVG-bestand blijft het enige
 * origineel én een gewoon <img> (mobiel, reduced-motion, mislukte fetch);
 * op desktop wordt hetzelfde bestand opgehaald en worden zijn 77 bovenste
 * elementen over drie <svg>-lagen verdeeld (de <defs> gaan mee in de eerste;
 * id-verwijzingen zijn documentbreed). Elke laag is een eigen element, dus
 * de papierfilters worden één keer getekend en de beweging is puur
 * compositor-werk. Inline-JSX van dezelfde tekening zou 6,7 KB brotli aan
 * landing-JS kosten (begroting: 3,4 KB over); dit kost ~0,4 KB.
 *
 * Diepte per index in hero-collage.svg (0 = defs):
 *   0,15  1–9    achterpapier, zwart papier rechtsboven, rode schijf
 *   0,35  10–14  blauwe snipper, kop
 *   0,6   15–25  brein en kompasringen
 *   0,35  26–34  bergen, trap, koning
 *   0,6   35–40  witte snipper met het oog
 *   0,35  41–46  rond venster
 *   0,6   47–77  maan, driehoek, snipper met paard, rank, sterrenbeeld
 * Verandert het bestand (ander aantal kinderen), dan blijft het <img>.
 */
const KINDEREN = 78;
const LAGEN = [0.15, 0.35, 0.6] as const;
const diepte = (i: number) =>
  i <= 9 ? 0.15 : i <= 14 ? 0.35 : i <= 25 ? 0.6 : i <= 34 ? 0.35 : i <= 40 ? 0.6 : i <= 46 ? 0.35 : 0.6;

export function HeroCollage() {
  const [gelaagd, setGelaagd] = useState(() => matchMedia(PARALLAX_MQ).matches);
  const [lagen, setLagen] = useState<string[] | null>(null);

  useEffect(() => {
    if (!gelaagd) return;
    let weg = false;
    fetch(heroCollage)
      .then((r) => r.text())
      .then((tekst) => {
        if (weg) return;
        const root = new DOMParser().parseFromString(tekst, 'image/svg+xml').documentElement;
        const kinderen = Array.from(root.children);
        if (kinderen.length !== KINDEREN) throw new Error('hero-collage.svg heeft een andere opbouw');
        const html = LAGEN.map(() => '');
        kinderen.forEach((k, i) => {
          html[i === 0 ? 0 : LAGEN.indexOf(diepte(i))] += k.outerHTML;
        });
        setLagen(html);
      })
      .catch(() => setGelaagd(false));
    return () => {
      weg = true;
    };
  }, [gelaagd]);

  if (!gelaagd) {
    return <img src={heroCollage} alt="" width={760} height={640} decoding="async" fetchPriority="high" />;
  }
  return (
    <div className="hc">
      {lagen?.map((html, i) => (
        <svg
          key={LAGEN[i]}
          className="hc__laag"
          viewBox="0 0 760 640"
          data-depth={LAGEN[i]}
          style={{ '--diepte': LAGEN[i] } as CSSProperties}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </div>
  );
}
