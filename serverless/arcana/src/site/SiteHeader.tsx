import { useEffect, useState } from 'react';
import { ArcanaThemeToggle } from '../components/ArcanaThemeToggle';
import { SITE_NAME } from './siteContent';

interface Props {
  onStart: () => void;
  /** Toont "Verdergaan" in plaats van "Start de test" als er al antwoorden staan. */
  hasInProgress: boolean;
  onResume: () => void;
}

const NAV = [
  { href: '#hoe-het-werkt', label: 'Hoe het werkt' },
  { href: '#wat-het-meet', label: 'Wat het meet' },
  { href: '#je-rapport', label: 'Je rapport' },
  { href: '#voor-wie', label: 'Voor wie' },
  { href: '#faq', label: 'Vragen' },
];

export function SiteHeader({ onStart, hasInProgress, onResume }: Props) {
  const [open, setOpen] = useState(false);

  // Het menu mag niet open blijven staan zodra het scherm breed genoeg is om
  // de gewone navigatie te tonen; anders blijft een onzichtbaar paneel de
  // focusvolgorde vullen.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 900px)');
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
          <span className="site-header__mark" aria-hidden="true" />
          {SITE_NAME}
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
              Verdergaan
            </button>
          ) : (
            <button type="button" className="arcana-button arcana-button--primary" onClick={onStart}>
              Start de test
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
