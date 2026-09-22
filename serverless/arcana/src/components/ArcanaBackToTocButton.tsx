import { useEffect, useState } from 'react';

/**
 * Zwevende "Naar inhoudsopgave"-knop. Blijft verborgen tot de lezer voorbij
 * de hero-banner (id="arcana-report-hero") is gescrold — permanent
 * bovenaan zou de hero overlappen — en scrollt bij een klik terug naar de
 * inhoudsopgave (id="arcana-report-toc"). Print-verborgen: op papier heeft
 * sprong-navigatie geen functie.
 */
export function ArcanaBackToTocButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('arcana-report-hero');
    if (!hero || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.getElementById('arcana-report-toc')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <button type="button" className="arcana-back-to-toc arcana-print-hide" onClick={handleClick}>
      Naar inhoudsopgave ↑
    </button>
  );
}
