import type { CSSProperties } from 'react';
import { LOGO } from '../site/woordmerk';

interface Props {
  /**
   * Zichtbare hoogte in CSS-pixels. De breedte volgt uit de verhouding van het
   * logo, zodat hij nooit uitrekt. Weglaten laat de CSS erover beslissen.
   */
  hoogte?: number;
  /**
   * Een `sizes`-hint voor de browser: hoe breed het logo hier ongeveer wordt.
   * Zonder die hint kiest de browser op de breedte van het scherm en haalt hij
   * voor een logo van 150 px in de kop de grote plaat. Standaard wordt de
   * breedte afgeleid van `hoogte`.
   */
  sizes?: string;
  className?: string;
  /** Extra stijl, bijvoorbeeld een eigen CSS-variabele; wordt over de hoogte heen gelegd. */
  style?: CSSProperties;
  /**
   * Standaard heeft het logo de naam van de site als alternatieve tekst: in de
   * kop is het de enige inhoud van de link naar de homepage, en die link moet
   * een naam hebben. Op een plek waar de naam er al naast staat of waar het
   * puur versiering is, geef je `decoratief` mee.
   */
  decoratief?: boolean;
  priority?: boolean;
}

/**
 * Het logo van Arcana Profile — "Arcana" boven "Profile.com". Eén plaat, overal
 * dezelfde: kop, voet, hero, rapport en voorblad. Er is bewust geen variant
 * per plek; wie het logo ergens anders nodig heeft, gebruikt dit onderdeel.
 */
export function ArcanaLogo({ hoogte, sizes, className, style, decoratief = false, priority = false }: Props) {
  const breedte = hoogte ? Math.round(hoogte * LOGO.verhouding) : undefined;
  return (
    <img
      className={['arcana-logo', className].filter(Boolean).join(' ')}
      src={LOGO.bron}
      srcSet={LOGO.srcSet}
      sizes={sizes ?? (breedte ? `${breedte}px` : '100vw')}
      width={LOGO.breedte}
      height={LOGO.hoogte}
      alt={decoratief ? '' : 'Arcana Profile'}
      aria-hidden={decoratief || undefined}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      style={hoogte || style ? ({ ...(hoogte ? { '--logo-hoogte': `${hoogte}px` } : null), ...style } as CSSProperties) : undefined}
    />
  );
}
