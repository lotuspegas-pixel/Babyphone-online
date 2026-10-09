import { useEffect, useState } from 'react';

import { ArcanaSeal } from './ArcanaSeal';

/**
 * Optie B uit `C` §4.9: vier regels met echte getallen in de actieve vorm.
 * De vorige tekst ("Patronen worden herkend…") stond grotendeels in de
 * lijdende vorm zonder handelend voorwerp — het register van een taalmodel
 * dat doet alsof het nadenkt, op een product zonder taalmodel.
 */
const MESSAGES = [
  '120 antwoorden opgeteld',
  '30 eigenschappen berekend',
  '12 dimensies samengevoegd',
  'Je rapport is klaar',
];

/** Ondergrens zodat het scherm niet flikkert bij een razendsnelle berekening. */
const MIN_VISIBLE_MS = 1200;
/** De eerste drie regels wisselen op een vast tempo dat precies de ondergrens vult. */
const MESSAGE_STEP_MS = MIN_VISIBLE_MS / (MESSAGES.length - 1);
/** Korte rust op de slotregel zodat die ook echt leesbaar is vóór het rapport verschijnt. */
const FINAL_BEAT_MS = 350;

interface Props {
  /** Start het echte rekenwerk (engine laden + scoren + rapport bouwen) en levert of het gelukt is. */
  run: () => Promise<boolean>;
  /** Vuurt pas als (a) het rekenen klaar is én (b) minstens MIN_VISIBLE_MS is verstreken. */
  onDone: (success: boolean) => void;
}

/**
 * Het laadscherm: het zegel tekent zichzelf (CSS, één wijzerslag) en de
 * regels wisselen op een vast tempo. Duurt het rekenen langer, dan draait
 * de gestippelde buitenring van het zegel langzaam door.
 */
export function ArcanaResultLoading({ run, onDone }: Props) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Bij een langzamere berekening blijft de derde regel staan — samen met
    // de doorlopende ringanimatie de "bovengrens met voortgangsindicatie".
    let messageTimer: number | undefined;
    if (!prefersReducedMotion) {
      messageTimer = window.setInterval(() => {
        setMessageIndex((i) => Math.min(i + 1, MESSAGES.length - 2));
      }, MESSAGE_STEP_MS);
    } else {
      setMessageIndex(MESSAGES.length - 2);
    }

    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MIN_VISIBLE_MS);
    });

    // Het rekenen begint meteen, niet pas na deze ondergrens — de ondergrens
    // loopt er alleen parallel aan, zodat een razendsnelle berekening niet
    // als een flits voorbijschiet.
    Promise.all([run().catch(() => false), minDelay]).then(([success]) => {
      if (cancelled) return;
      if (messageTimer !== undefined) window.clearInterval(messageTimer);
      if (!success) {
        onDone(false);
        return;
      }
      setMessageIndex(MESSAGES.length - 1);
      window.setTimeout(
        () => {
          if (!cancelled) onDone(true);
        },
        prefersReducedMotion ? 0 : FINAL_BEAT_MS,
      );
    });

    return () => {
      cancelled = true;
      if (messageTimer !== undefined) window.clearInterval(messageTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="arcana-screen arcana-loading" role="status" aria-live="polite">
      <div className="arcana-loading__seal" aria-hidden="true">
        <ArcanaSeal size={120} />
      </div>
      <p className="arcana-loading__text">{MESSAGES[messageIndex]}</p>
    </div>
  );
}
