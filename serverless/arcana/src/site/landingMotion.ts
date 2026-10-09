import { useEffect, type RefObject } from 'react';

/** Parallax alleen op desktop mét bewegingsvoorkeur; daaronder één stilstaand beeld. */
export const PARALLAX_MQ = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

/**
 * Scroll- en pointerparallax voor de hero. Zet --py (scrollafstand, px) en
 * --px/--pyy (pointer, −1…1) op de wortel; site.css vertaalt dat per diepte
 * (--diepte). Passieve listeners, één rAF per frame, will-change alleen
 * zolang er beweging is (.is-bewegend).
 */
export function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia(PARALLAX_MQ).matches) return;
    let raf = 0;
    let rust = 0;
    let py = 0;
    let px = 0;
    let pyy = 0;
    const teken = () => {
      raf = 0;
      el.style.setProperty('--py', String(py));
      el.style.setProperty('--px', px.toFixed(3));
      el.style.setProperty('--pyy', pyy.toFixed(3));
      el.classList.add('is-bewegend');
      clearTimeout(rust);
      rust = window.setTimeout(() => el.classList.remove('is-bewegend'), 400);
    };
    const vraag = () => {
      if (!raf) raf = requestAnimationFrame(teken);
    };
    const scroll = () => {
      py = Math.min(window.scrollY, 1200);
      vraag();
    };
    const beweeg = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      pyy = ((e.clientY - r.top) / r.height) * 2 - 1;
      vraag();
    };
    const weg = () => {
      px = 0;
      pyy = 0;
      vraag();
    };
    addEventListener('scroll', scroll, { passive: true });
    el.addEventListener('pointermove', beweeg, { passive: true });
    el.addEventListener('pointerleave', weg);
    scroll();
    return () => {
      removeEventListener('scroll', scroll);
      el.removeEventListener('pointermove', beweeg);
      el.removeEventListener('pointerleave', weg);
      cancelAnimationFrame(raf);
      clearTimeout(rust);
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
