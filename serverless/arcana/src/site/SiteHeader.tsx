import { useEffect, useState } from 'react';
import { ArcanaLogo } from '../components/ArcanaLogo';
import { ArcanaThemeToggle } from '../components/ArcanaThemeToggle';
import { VOORBEELD_URL } from './siteContent';

interface Props {
  onStart: () => void;
  /** Toont "Verdergaan" in plaats van "Start de test" als er al antwoorden staan. */
  hasInProgress: boolean;
  onResume: () => void;
}

const NAV = [
  { href: '#hoe-het-werkt', label: 'Hoe het werkt' },
  { href: '#methode', label: 'De methode' },
  { href: VOORBEELD_URL, label: 'Voorbeeldrapport' },
  { href: '#faq', label: 'Vragen' },
];

/** Breakpoint waarop de gewone navigatie plaatsmaakt voor de menuknop; gelijk aan site.css. */
const NAV_BREEDTE = '(min-width: 1200px)';

/**
 * Het logo in kop en voet. De kop is zwart en krijgt de donkere versie; de voet
 * ligt op papier en krijgt de koperen. De alt-tekst is de naam van de site, want
 * het logo is de enige inhoud van de link naar de homepage.
 */
export function SiteMerk({ hoogte = 52, donker = false }: { hoogte?: number; donker?: boolean }) {
  return <ArcanaLogo hoogte={hoogte} className="site-merk__logo" donker={donker} lazy={!donker} />;
}

export function SiteHeader({ onStart, hasInProgress, onResume }: Props) {
  const [open, setOpen] = useState(false);

  // Het menu mag niet open blijven staan zodra het scherm breed genoeg is om
  // de gewone navigatie te tonen; anders blijft een onzichtbaar paneel de
  // focusvolgorde vullen.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(NAV_BREEDTE);
    const close = () => setOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, [open]);

  // Escape sluit het menu — standaardgedrag dat mensen verwachten.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top" onClick={() => setOpen(false)}>
          <SiteMerk donker />
        </a>

        <nav className="site-header__nav" aria-label="Hoofdnavigatie">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <ArcanaThemeToggle compact />
          {hasInProgress ? (
            <button type="button" className="arcana-button arcana-button--primary" onClick={onResume}>
              Verdergaan <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button type="button" className="arcana-button arcana-button--primary" onClick={onStart}>
              Start de test <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="arcana-sr-only">{open ? 'Menu sluiten' : 'Menu openen'}</span>
          <span className={`site-header__burger${open ? ' is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open && (
        <div className="site-header__menu" id="site-menu">
          <ArcanaThemeToggle />
          <nav aria-label="Navigatie">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="arcana-button arcana-button--primary"
            onClick={() => {
              setOpen(false);
              if (hasInProgress) onResume();
              else onStart();
            }}
          >
            {hasInProgress ? 'Verdergaan' : 'Start de test'}
          </button>
        </div>
      )}
    </header>
  );
}
