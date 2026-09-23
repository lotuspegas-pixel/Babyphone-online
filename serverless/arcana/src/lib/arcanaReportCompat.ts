/**
 * Compatibiliteitscheck voor een opgeslagen `arcana_result` (G-rebuild-spec,
 * taak 10). De rapportgenerator werkt additief: een hoger patch- of
 * minor-nummer op dezelfde hoofdversie blijft renderbaar, want ontbrekende
 * velden vallen gewoon weg (zie `ArcanaReportSection.outro?`, bijvoorbeeld).
 * Alleen een hogere HOOFDversie duidt op een structuurwijziging die deze
 * build niet kent — dat is het enige geval waarin we vooraf ingrijpen in
 * plaats van te laten renderen.
 *
 * Moet in de pas blijven met `REPORT_VERSION` in arcanaReportGenerator.ts:
 * zodra die naar een nieuwe hoofdversie gaat (bewust, met een eigen FAQ-regel
 * — zie G-rebuild-spec taak 10), hoort dit getal mee omhoog.
 */
export const KNOWN_REPORT_MAJOR_VERSION = 2;

function parseMajorVersion(version: string | undefined | null): number | null {
  if (!version) return null;
  const match = /^(\d+)\.\d+\.\d+/.exec(version);
  if (!match) return null;
  return Number(match[1]);
}

/**
 * `true` zolang de hoofdversie bekend is en niet hoger dan wat deze build
 * kent. Een ontbrekende, onleesbare of te hoge versie levert `false` op —
 * de aanroeper toont dan een uitlegscherm in plaats van te proberen te
 * renderen.
 */
export function isReportVersionSupported(version: string | undefined | null): boolean {
  const major = parseMajorVersion(version);
  return major !== null && major <= KNOWN_REPORT_MAJOR_VERSION;
}
