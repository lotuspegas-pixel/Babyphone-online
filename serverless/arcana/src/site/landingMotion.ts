import { useEffect, type RefObject } from 'react';

/** Parallax alleen op desktop mét bewegingsvoorkeur; daaronder één stilstaand beeld. */
export const PARALLAX_MQ = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

/**
 * Scroll- en pointerparallax voor de hero. Zet --py (scrollafstand, px) en
 * --px/--pyy (pointer, −1…1) op de wortel; site.css vertaalt dat per diepte
 * (--diepte).
 *
 * De lagen volgen de muis en de scroll niet rechtstreeks maar met vertraging:
 * elke frame schuift de getoonde waarde een deel van de afstand naar de
 * gewenste waarde op (`TAU_SCROLL`, `TAU_POINTER`). Dat is wat het zware, trage gevoel
 * geeft — de platen komen na, alsof ze gewicht hebben, in plaats van aan de
 * cursor vast te zitten. Pointer en scroll hebben een eigen snelheid: de muis
 * mag losjes nazwaaien, de scroll moet dichter op de pagina blijven, anders
 * lijkt de band te zweven.
 *
 * De lus draait alleen zolang er nog afstand te overbruggen is en valt daarna
 * vanzelf stil. `will-change` staat permanent op de lagen (site.css): aan- en
 * uitzetten per beweging liet de platen bij elke eerste scroll even
 * herrasteren en daarmee haperen.
 */

/**
 * Hoe lang de platen erover doen om een afstand te dempen (tijdconstante, in
 * seconden: na één tijdconstante is 63 % van de weg afgelegd, na drie 95 %).
 * Dit is de knop voor het gevoel — hoger is zwaarder en trager:
 *
 *   0,20 s   vlot, de platen volgen kort op de voet
 *   0,34 s   rustig; 95 % van de weg in ~1 s            ← scroll, nu ingesteld
 *   0,60 s   traag en zwevend; 95 % in ~1,8 s           ← muis, nu ingesteld
 *
 * De demping rekent met de verstreken tijd en niet met "per frame": op een
 * scherm van 120 of 144 Hz voelt het daardoor precies zo traag als op 60 Hz.
 * Scroll staat bewust lager dan de muis: de band hangt aan de pagina en mag er
 * niet achteraan zeilen, terwijl de muis juist mag nazwaaien.
 */
const TAU_SCROLL = 0.34;
const TAU_POINTER = 0.6;

/** Onder deze afstand is het verschil onzichtbaar en stopt de lus. */
const RUST_POINTER = 0.0008;
const RUST_SCROLL = 0.06;

export function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia(PARALLAX_MQ).matches) return;

    let raf = 0;
    // Waar we naartoe bewegen (door scroll en muis gezet) …
    let pyDoel = 0;
    let pxDoel = 0;
    let pyyDoel = 0;
    // … en waar we nu staan (wat de CSS te zien krijgt).
    let py = 0;
    let px = 0;
    let pyy = 0;

    let vorige = 0;
    const stap = (nu: number) => {
      // Eerste frame na stilstand: aannemen dat er 1/60 s voorbij is, anders
      // springt de eerste stap met de hele stilstandstijd tegelijk.
      const dt = vorige ? Math.min((nu - vorige) / 1000, 0.064) : 1 / 60;
      vorige = nu;
      const ks = 1 - Math.exp(-dt / TAU_SCROLL);
      const kp = 1 - Math.exp(-dt / TAU_POINTER);
      py += (pyDoel - py) * ks;
      px += (pxDoel - px) * kp;
      pyy += (pyyDoel - pyy) * kp;

      const klaar =
        Math.abs(pyDoel - py) < RUST_SCROLL &&
        Math.abs(pxDoel - px) < RUST_POINTER &&
        Math.abs(pyyDoel - pyy) < RUST_POINTER;

      if (klaar) {
        // Netjes op de eindwaarde landen in plaats van er oneindig naartoe
        // kruipen.
        py = pyDoel;
        px = pxDoel;
        pyy = pyyDoel;
      }

      el.style.setProperty('--py', py.toFixed(2));
      el.style.setProperty('--px', px.toFixed(4));
      el.style.setProperty('--pyy', pyy.toFixed(4));

      if (klaar) {
        raf = 0;
        vorige = 0;
        return;
      }
      raf = requestAnimationFrame(stap);
    };

    const vraag = () => {
      if (raf) return;
      raf = requestAnimationFrame(stap);
    };

    const scroll = () => {
      pyDoel = Math.min(window.scrollY, 1200);
      vraag();
    };
    const beweeg = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      pxDoel = ((e.clientX - r.left) / r.width) * 2 - 1;
      pyyDoel = ((e.clientY - r.top) / r.height) * 2 - 1;
      vraag();
    };
    const weg = () => {
      pxDoel = 0;
      pyyDoel = 0;
      vraag();
    };

    addEventListener('scroll', scroll, { passive: true });
    el.addEventListener('pointermove', beweeg, { passive: true });
    el.addEventListener('pointerleave', weg);
    // Beginstand meteen goed zetten: bij een herladen halverwege de pagina
    // hoort de band niet eerst vanaf nul naar binnen te glijden.
    py = pyDoel = Math.min(window.scrollY, 1200);
    el.style.setProperty('--py', py.toFixed(2));

    return () => {
      removeEventListener('scroll', scroll);
      el.removeEventListener('pointermove', beweeg);
      el.removeEventListener('pointerleave', weg);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/**
 * Eén onthulling per blok: elk [data-onthul] onder de wortel krijgt .is-in
 * zodra 35 % ervan in beeld is, daarna wordt het niet meer gevolgd. Cijfers
 * met [data-tel] in zo'n blok tellen op. Bij reduced-motion (of zonder
 * IntersectionObserver) staat alles meteen in de eindstand.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const blokken = root.querySelectorAll<HTMLElement>('[data-onthul]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      blokken.forEach((b) => b.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (items) => {
        for (const item of items) {
          if (!item.isIntersecting) continue;
          item.target.classList.add('is-in');
          item.target.querySelectorAll<HTMLElement>('[data-tel]').forEach(telOp);
          io.unobserve(item.target);
        }
      },
      { threshold: 0.35 },
    );
    blokken.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [ref]);
}

/** Telt van 0 naar het getal in de tekst (300–900 ms, langer bij grotere getallen); punt en plusje blijven. */
function telOp(el: HTMLElement) {
  const eind = el.textContent ?? '';
  const n = Number(eind.replace(/\D/g, ''));
  if (!n) return;
  const staart = eind.replace(/[\d.]/g, '');
  const duur = 300 + 150 * Math.log10(n);
  const start = performance.now();
  const stap = (nu: number) => {
    const t = Math.min(1, (nu - start) / duur);
    const k = Math.round(n * (1 - (1 - t) ** 3));
    el.textContent = t < 1 ? k.toLocaleString('nl-NL') + staart : eind;
    if (t < 1) requestAnimationFrame(stap);
  };
  requestAnimationFrame(stap);
}
