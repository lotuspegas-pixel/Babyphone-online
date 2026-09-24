import { ArcanaSeal } from '../components/ArcanaSeal';
import { SITE_NAME } from './siteContent';

interface Props {
  onNavigate: (route: 'privacy' | 'voorwaarden') => void;
}

export function SiteFooter({ onNavigate }: Props) {
  const jaar = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <ArcanaSeal size={40} className="site-header__mark" />
          <strong>{SITE_NAME}</strong>
          <p>Een zelfinzicht-instrument voor persoonlijke reflectie.</p>
        </div>

        <nav className="site-footer__links" aria-label="Voettekstnavigatie">
          <a href="#hoe-het-werkt">Hoe het werkt</a>
          <a href="#wat-het-meet">Wat het meet</a>
          <a href="#je-rapport">Je rapport</a>
          <a href="#faq">Vragen</a>
          <button type="button" onClick={() => onNavigate('privacy')}>
            Privacy
          </button>
          <button type="button" onClick={() => onNavigate('voorwaarden')}>
            Voorwaarden
          </button>
        </nav>
      </div>

      <div className="site-footer__fineprint">
        <p>
          {SITE_NAME} is bedoeld voor zelfreflectie en persoonlijke ontwikkeling. Het is geen medisch,
          psychologisch of therapeutisch diagnose-instrument en niet geschikt voor selectie of beoordeling van
          anderen. Herken je iets dat zwaarder weegt dan reflectie alleen, bespreek dat dan met je huisarts of
          een behandelaar.
        </p>
        <p>© {jaar} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
