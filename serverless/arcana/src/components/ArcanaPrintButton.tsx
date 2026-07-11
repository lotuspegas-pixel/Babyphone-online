export function ArcanaPrintButton() {
  return (
    <button type="button" className="arcana-button arcana-button--ghost arcana-print-hide" onClick={() => window.print()}>
      Rapport printen
    </button>
  );
}
