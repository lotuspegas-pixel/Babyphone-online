import { useEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';

interface Props {
  titleText: string;
  description: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** De knop die de dialoog opende; krijgt de focus terug zodra hij sluit. */
  returnFocusRef: RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Eigen, toegankelijke bevestigingsdialoog — vervangt `window.confirm`, dat
 * twee knoppen oplevert die altijd "OK" en "Annuleren" heten. Daarmee
 * bevestig je een destructieve actie met het woord "OK"; hier benoemen beide
 * knoppen de handeling zelf (C §5.6).
 *
 * Focus-trap met Tab/Shift+Tab, Escape sluit (= annuleren), en de focus gaat
 * bij openen naar de annuleerknop — de veilige default — en bij sluiten
 * terug naar de knop die de dialoog opende.
 */
export function ArcanaConfirmDialog({
  titleText,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  returnFocusRef,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Vastleggen bij openen, niet pas bij sluiten opzoeken: de knop die de
    // dialoog opende staat dan al vast, en dat voorkomt dat de cleanup een
    // inmiddels verouderde `.current` van de ref leest.
    const elementToRestore = returnFocusRef.current;
    cancelButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      elementToRestore?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- open/sluit-cyclus hoort bij mount/unmount, niet bij prop-wissels
  }, []);

  return (
    <div className="arcana-dialog-scrim" onClick={onCancel}>
      <div
        ref={dialogRef}
        className="arcana-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="arcana-dialog-title"
        aria-describedby="arcana-dialog-description"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="arcana-dialog-title">{titleText}</h2>
        <div id="arcana-dialog-description" className="arcana-dialog__body">
          {description}
        </div>
        <div className="arcana-dialog__actions">
          <button type="button" className="arcana-button arcana-button--primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button type="button" ref={cancelButtonRef} className="arcana-button arcana-button--ghost" onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
