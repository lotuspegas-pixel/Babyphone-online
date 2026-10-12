import type { CSSProperties } from 'react';
import { LOGO, LOGO_DONKER } from '../site/woordmerk';

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
  /** Pas laden als het in beeld komt; voor plekken onder de vouw, zoals de voet. */
  lazy?: boolean;
  /**
   * De versie voor een zwarte ondergrond: donkerrood en steen op zuiver zwart,
   * zonder doorzichtigheid. Alleen te gebruiken op een vlak van exact #000; op
   * elke andere kleur staat de plaat als zwarte rechthoek op de pagina.
   */
  donker?: boolean;
}

/**
 * Het logo van Arcana Profile — "Arcana" boven "Profile.com". Er zijn twee
 * versies, niet per plek maar per ondergrond: de koperen op papier (hero, voet,
 * rapport) en de donkerrode op zwart (de kop bovenaan). Wie het logo ergens
 * anders nodig heeft, gebruikt dit onderdeel en kiest op de kleur van de
 * ondergrond.
 */
export function ArcanaLogo({
  hoogte,
  sizes,
  className,
  style,
  decoratief = false,
  priority = false,
  lazy = false,
  donker = false,
}: Props) {
  const versie = donker ? LOGO_DONKER : LOGO;
  const breedte = hoogte ? Math.round(hoogte * versie.verhouding) : undefined;
  return (
    <img
      className={['arcana-logo', donker && 'arcana-logo--donker', className].filter(Boolean).join(' ')}
      src={versie.bron}
      // De donkere versie bestaat in één maat en heeft dus geen srcset nodig.
      srcSet={donker ? undefined : LOGO.srcSet}
      sizes={donker ? undefined : (sizes ?? (breedte ? `${breedte}px` : '100vw'))}
      width={versie.breedte}
      height={versie.hoogte}
      alt={decoratief ? '' : 'Arcana Profile'}
      aria-hidden={decoratief || undefined}
      decoding="async"
      loading={lazy ? 'lazy' : undefined}
      fetchPriority={priority ? 'high' : undefined}
      style={hoogte || style ? ({ ...(hoogte ? { '--logo-hoogte': `${hoogte}px` } : null), ...style } as CSSProperties) : undefined}
    />
  );
}
