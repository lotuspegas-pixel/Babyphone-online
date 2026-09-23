/**
 * "Bewaar als PDF" opent het printvenster van de browser, waar de gebruiker
 * bij bestemming "Opslaan als PDF" kiest.
 *
 * Dit is bewust geen eigen PDF-generator: een echte PDF-bibliotheek (jsPDF,
 * pdfmake) kost enkele honderden kilobytes, terwijl deze app verder alleen
 * react en react-dom als afhankelijkheid heeft. De printweergave in
 * arcana.css is bovendien al op A4 ingericht, dus de browser levert langs
 * deze weg een nette, doorzoekbare PDF met werkende tekstselectie — beter
 * dan wat een client-side generator eruit zou krijgen.
 *
 * De instructie stond eerder alleen in een `title`-attribuut, dat op een
 * touchscreen nooit verschijnt. Daarom nu een zichtbare helptekst eronder
 * (C §4.10, rij 48).
 */
export function ArcanaPdfButton() {
  return (
    <span className="arcana-pdf-button">
      <button
        type="button"
        className="arcana-button arcana-button--primary arcana-print-hide"
        onClick={() => window.print()}
      >
        Bewaar als PDF
      </button>
      <span className="arcana-pdf-button__hint arcana-print-hide">
        Kies in het printvenster bij &ldquo;Bestemming&rdquo; voor &ldquo;Opslaan als PDF&rdquo;.
      </span>
    </span>
  );
}
