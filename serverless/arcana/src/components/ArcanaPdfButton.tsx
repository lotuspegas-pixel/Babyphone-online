/**
 * "Download als PDF" opent het printvenster van de browser, waar de gebruiker
 * bij bestemming "Opslaan als PDF" kiest.
 *
 * Dit is bewust geen eigen PDF-generator: een echte PDF-bibliotheek (jsPDF,
 * pdfmake) kost enkele honderden kilobytes, terwijl deze app verder alleen
 * react en react-dom als afhankelijkheid heeft. De printweergave in
 * arcana.css is bovendien al op A4 ingericht, dus de browser levert langs
 * deze weg een nette, doorzoekbare PDF met werkende tekstselectie — beter
 * dan wat een client-side generator eruit zou krijgen.
 */
export function ArcanaPdfButton() {
  return (
    <button
      type="button"
      className="arcana-button arcana-button--primary arcana-print-hide"
      onClick={() => window.print()}
      title="Kies in het printvenster bij bestemming: Opslaan als PDF"
    >
      Download als PDF
    </button>
  );
}
