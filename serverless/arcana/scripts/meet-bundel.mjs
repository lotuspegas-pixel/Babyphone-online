// Bundelbegroting: meet wat een bezoeker per scenario over de lijn krijgt en
// laat de build falen zodra de landing zijn budget overschrijdt.
//
//   npm run build   (draait dit als laatste stap)
//   node scripts/meet-bundel.mjs
//
// Gemeten wordt brotli op twee kwaliteitsniveaus: q11 (de begroting uit
// docs/rebuild/G-rebuild-spec.md §6) en q5 (wat een gemiddelde statische host
// in de praktijk levert; de nulmeting van 139,5 KB kwam daar het dichtst bij).
// Een begroting die niet automatisch faalt, is geen begroting.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { brotliCompressSync, constants } from 'node:zlib';

const ASSETS = join(process.cwd(), 'dist', 'assets');
const BUDGET_LANDING_Q11 = 75_000; // bytes; wordt 80.000 vanaf taak 8 (het voorbeeldwiel)
const BUDGET_CSS_Q11 = 14_000;
const BUDGET_FONTS = 60_000; // bytes op de lijn voor de basisbestanden samen

function brotli(buf, quality) {
  return brotliCompressSync(buf, { params: { [constants.BROTLI_PARAM_QUALITY]: quality } }).length;
}

const files = readdirSync(ASSETS).map((name) => {
  const buf = readFileSync(join(ASSETS, name));
  return { name, raw: buf.length, q11: name.endsWith('.woff2') ? buf.length : brotli(buf, 11), q5: name.endsWith('.woff2') ? buf.length : brotli(buf, 5) };
});

const js = files.filter((f) => f.name.endsWith('.js'));
const css = files.filter((f) => f.name.endsWith('.css'));
const fonts = files.filter((f) => f.name.endsWith('.woff2'));

// De chunks krijgen hun naam van Rollup: index (entry), vendor, en de lazy
// chunks naar hun bronbestand. Wat er op de landing laadt: entry + vendor.
const isLanding = (f) => /^(index|vendor)-/.test(f.name);
const isTest = (f) => /^(ArcanaTest|ArcanaIntake|arcanaQuestions)/.test(f.name);
const isEngine = (f) => /^(arcanaReportGenerator|arcanaScoringEngine|engine)/.test(f.name);
const isReport = (f) => /^(ArcanaReport)/.test(f.name);
// Laadt alleen met ?vergelijk in de URL (de oude canvas-tekening, tot taak 13); telt in geen scenario mee.
const isOptional = (f) => /^(ArcanaPortraitCanvas)/.test(f.name);
const rest = js.filter((f) => !isLanding(f) && !isTest(f) && !isEngine(f) && !isReport(f) && !isOptional(f));

const sum = (arr, key) => arr.reduce((a, f) => a + f[key], 0);
const kb = (n) => (n / 1024).toFixed(1).padStart(6) + ' KB';

console.log('\nBundelmeting (dist/assets)\n');
console.log('  chunk                                   raw       q11       q5');
for (const f of [...js, ...css].sort((a, b) => b.raw - a.raw)) {
  console.log(`  ${f.name.padEnd(38)} ${kb(f.raw)} ${kb(f.q11)} ${kb(f.q5)}`);
}

const landingJs = js.filter(isLanding);
const scenario = (label, arr) =>
  console.log(`  ${label.padEnd(44)} ${kb(sum(arr, 'q11'))} q11   ${kb(sum(arr, 'q5'))} q5`);
console.log('\nPer scenario, JavaScript over de lijn:');
scenario('landing bekijken en weggaan', landingJs);
scenario('landing → test starten', [...landingJs, ...js.filter(isTest)]);
scenario('volledig eerste bezoek', js);
scenario('terugkomen om het rapport te herlezen', [...landingJs, ...js.filter(isReport), ...rest]);
if (rest.length) console.log(`  (gedeelde chunks: ${rest.map((f) => f.name).join(', ')})`);

// Wat de landing aan fonts ophaalt: de basisbestanden, zonder de cursief (die
// laadt alleen op het rapport). De aanvullingen laden alleen bij een naam met
// een teken buiten de basisset.
const fontsBase = fonts.filter((f) => /-basis-/.test(f.name) && !/italic/.test(f.name));
const fontsExtra = fonts.filter((f) => /aanvulling/.test(f.name));
console.log(`\nCSS: ${kb(sum(css, 'q11'))} q11 · fonts op de landing: ${kb(sum(fontsBase, 'raw'))} (${fontsBase.length} basisbestanden)${fontsExtra.length ? ` · aanvullingen samen: ${kb(sum(fontsExtra, 'raw'))}` : ''}`);

const fouten = [];
if (sum(landingJs, 'q11') > BUDGET_LANDING_Q11) fouten.push(`landing ${sum(landingJs, 'q11')} B > ${BUDGET_LANDING_Q11} B (q11)`);
if (sum(css, 'q11') > BUDGET_CSS_Q11) fouten.push(`css ${sum(css, 'q11')} B > ${BUDGET_CSS_Q11} B (q11)`);
if (fontsBase.length && sum(fontsBase, 'raw') > BUDGET_FONTS) fouten.push(`fonts ${sum(fontsBase, 'raw')} B > ${BUDGET_FONTS} B`);

if (fouten.length) {
  console.error('\nBegroting overschreden:\n  - ' + fouten.join('\n  - ') + '\n');
  process.exit(1);
}
console.log('\nBegroting gehaald.\n');

// Ongebruikt maar handig bij het debuggen van de chunkindeling:
void statSync;
