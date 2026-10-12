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
const BUDGET_LANDING_Q11 = 78_000; // bytes. Was 75.000. De trap naar 80.000 uit G §3 (tegenspraak 9) is deels genomen: de fotoparallax-hero (laadpoort, tijdgebaseerde demping), de hoofdactie in de band en de archetype-verkenner met embleem kosten samen ~3 KB bovenop de 72 KB van de landing zonder die onderdelen. Meer dan 78.000 is een nieuwe beslissing. Het woordmerk als beeld kostte hier kort 4 KB extra, tot bleek dat Vite de kleinste plaat als base64 in de JS zette; zie assetsInlineLimit in vite.config.ts.
const BUDGET_CSS_Q11 = 19_000; // was 18.000: de fotoparallax in de hero (band, vel, lagen, naam tussen de lagen) en de archetypeverkenner kosten samen ~0,5 KB. 20.000 blijft het plafond.
const BUDGET_FONTS = 60_000; // bytes op de lijn voor de basisbestanden samen
// Beeldmateriaal van de landing: de zeven SVG-collages uit src/assets/art/landing/
// plus het emblem in de rapport-mock, brotli q11 samen. Het zijn <img>-bestanden,
// dus geen JS; deze grens bewaakt dat er geen zwaardere illustratie sluipt.
// hero-collage.svg is vervallen: de hero is nu een fotoparallax (zie hieronder).
// Gemeten zonder die plaat; grens = ~125 % daarvan.
const BUDGET_ART_Q11 = 3_000; // alleen het emblem in de rapport-mock is nog SVG; de rest van de landing zijn de renders hieronder
const LANDING_ART = /^emblem-theSeeker-.+\.svg$/;

// De fotoparallax van de hero (scripts/bereid-parallax.mjs). Dit is bewust de
// zwaarste post van de pagina: de eigenaar koos voor maximale kwaliteit boven
// een lichtere hero. WebP is al gecomprimeerd, dus hier telt de ruwe omvang en
// niet brotli.
//
// Wat een bezoeker werkelijk ophaalt:
//   mobiel en prefers-reduced-motion   alleen composiet.webp (~93 KB)
//   desktop met beweging               de zes lagen (~890 KB), composiet niet
//
// Daarom staan die twee grenzen apart: de som van alles beschrijft geen enkel
// scenario.
// De zes renders onder de vouw (scripts/bereid-renders.mjs): tegels, doorgang, buste,
// bergstrook. WebP, lazy, dus geen JS en geen eerste-verf; ruwe omvang telt.
// Gemeten 878 KB; grens ~125 %.
// De twaalf archetypepagina's in "De twaalf namen" (scripts/bereid-archetypepaginas.mjs):
// WebP, elk ~170 KB, en alleen de gekozen pagina wordt geladen. Telt dus niet mee
// voor de eerste laadbeurt; deze grens bewaakt dat er geen zwaardere pagina sluipt.
const PAGINA_ART = /^pagina-the.+\.webp$/;
const BUDGET_PAGINA_STUK = 200_000; // bytes per pagina, ruw

const RENDER_ART = /^render-.+\.webp$/;
const BUDGET_RENDERS = 1_100_000; // bytes, ruw

const HERO_ART = /^(papier|landschap|boog|collage|jung|tafel)-.+\.webp$/;
const HERO_PLAT = /^composiet-.+\.webp$/;
const BUDGET_HERO_LAGEN = 1_000_000; // bytes, ruw
const BUDGET_HERO_PLAT = 120_000; // bytes, ruw — dit is wat mobiel betaalt

// Het logo in twee versies (scripts/bereid-woordmerk.mjs):
//   licht   koper op papier, in drie maten; srcset kiest. Hero, voet, rapport.
//   donker  donkerrood op zuiver zwart, één maat. De zwarte kop bovenaan.
//
// Wat een bezoeker betaalt:
//   telefoon         logo-donker (kop). De hero toont het logo daar niet en de
//                    voet laadt pas als je er bijna bent (loading="lazy").
//   scherm 1x        logo-donker + logo-midden (hero), later logo-klein (voet)
//   scherm 2x        logo-donker + logo (hero), later logo-klein (voet)
// Kwaliteit verlagen helpt niet (metaalkorrel comprimeert niet), dus wie deze
// grenzen ziet stijgen heeft het logo gróter geëxporteerd.
const LOGO_GROOT = /^logo-(?!klein|midden|donker)[^.]+.webp$/;
const LOGO_MIDDEN = /^logo-midden-.+.webp$/;
const LOGO_KLEIN = /^logo-klein-.+.webp$/;
const LOGO_DONKER = /^logo-donker-.+.webp$/;
const BUDGET_LOGO_GROOT = 180_000; // bytes, ruw
const BUDGET_LOGO_MIDDEN = 75_000;
const BUDGET_LOGO_KLEIN = 20_000;
const BUDGET_LOGO_DONKER = 14_000; // dit is wat een telefoon betaalt

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
const art = files.filter((f) => LANDING_ART.test(f.name));
const heroLagen = files.filter((f) => HERO_ART.test(f.name));
const heroPlat = files.filter((f) => HERO_PLAT.test(f.name));
const logoGroot = files.filter((f) => LOGO_GROOT.test(f.name));
const logoMidden = files.filter((f) => LOGO_MIDDEN.test(f.name));
const logoKlein = files.filter((f) => LOGO_KLEIN.test(f.name));
const logoDonker = files.filter((f) => LOGO_DONKER.test(f.name));
const renders = files.filter((f) => RENDER_ART.test(f.name));
const paginas = files.filter((f) => PAGINA_ART.test(f.name));

// De chunks krijgen hun naam van Rollup: index (entry), vendor, en de lazy
// chunks naar hun bronbestand. Wat er op de landing laadt: entry + vendor.
const isLanding = (f) => /^(index|vendor)-/.test(f.name);
const isTest = (f) => /^(ArcanaTest|ArcanaIntake|arcanaQuestions)/.test(f.name);
const isEngine = (f) => /^(arcanaReportGenerator|arcanaScoringEngine|engine)/.test(f.name);
const isReport = (f) => /^(ArcanaReport)/.test(f.name);
// Laadt alleen op verzoek: de deelpagina (#/delen). Telt in geen scenario mee.
// Alleen op verzoek geladen: de deelpagina en de PDF-generator (pdf-lib, pas bij de klik op "Download als PDF").
const isOptional = (f) => /^(ArcanaSharePage|arcanaPdf)/.test(f.name);
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
scenario('volledig eerste bezoek', js.filter((f) => !isOptional(f)));
scenario('terugkomen om het rapport te herlezen', [...landingJs, ...js.filter(isReport), ...rest]);
if (rest.length) console.log(`  (gedeelde chunks: ${rest.map((f) => f.name).join(', ')})`);

console.log(`Landing-art: ${kb(sum(art, 'q11'))} q11 (${art.length} van 1 SVG) · grens ${kb(BUDGET_ART_Q11)}`);
console.log(`Archetypepagina's op verzoek: ${paginas.length} van 12 · zwaarste ${kb(Math.max(0, ...paginas.map((f) => f.raw)))} · grens per stuk ${kb(BUDGET_PAGINA_STUK)}`);
console.log(`Renders onder de vouw: ${kb(sum(renders, 'raw'))} ruw in ${renders.length} platen · grens ${kb(BUDGET_RENDERS)}`);
console.log(
  `Hero-parallax: ${kb(sum(heroLagen, 'raw'))} ruw in ${heroLagen.length} lagen · grens ${kb(BUDGET_HERO_LAGEN)}` +
    `
  daarvan op mobiel: ${kb(sum(heroPlat, 'raw'))} (alleen de platte composiet) · grens ${kb(BUDGET_HERO_PLAT)}`,
);
console.log(
  `Logo: ${kb(sum(logoGroot, 'raw'))} groot · ${kb(sum(logoMidden, 'raw'))} midden · ${kb(sum(logoKlein, 'raw'))} klein · ${kb(sum(logoDonker, 'raw'))} donker` +
    `
  daarvan op mobiel: ${kb(sum(logoDonker, 'raw'))} (alleen de zwarte kop) · grenzen ${kb(BUDGET_LOGO_GROOT)} / ${kb(BUDGET_LOGO_MIDDEN)} / ${kb(BUDGET_LOGO_KLEIN)} / ${kb(BUDGET_LOGO_DONKER)}`,
);

// Wat de landing aan fonts ophaalt: de basisbestanden, zonder de cursief (die
// laadt alleen op het rapport). De aanvullingen laden alleen bij een naam met
// een teken buiten de basisset.
const fontsBase = fonts.filter((f) => /-basis-/.test(f.name) && !/italic/.test(f.name));
const fontsExtra = fonts.filter((f) => /aanvulling/.test(f.name));
console.log(`\nCSS: ${kb(sum(css, 'q11'))} q11 · fonts op de landing: ${kb(sum(fontsBase, 'raw'))} (${fontsBase.length} basisbestanden)${fontsExtra.length ? ` · aanvullingen samen: ${kb(sum(fontsExtra, 'raw'))}` : ''}`);

const fouten = [];
if (sum(landingJs, 'q11') > BUDGET_LANDING_Q11) fouten.push(`landing ${sum(landingJs, 'q11')} B > ${BUDGET_LANDING_Q11} B (q11)`);
if (sum(css, 'q11') > BUDGET_CSS_Q11) fouten.push(`css ${sum(css, 'q11')} B > ${BUDGET_CSS_Q11} B (q11)`);
if (art.length !== 1) fouten.push(`landing-art: ${art.length} van de 1 verwachte SVG in dist/assets (hernoemd of inline gezet?)`);
if (heroLagen.length !== 6) fouten.push(`hero-parallax: ${heroLagen.length} van de 6 lagen in dist/assets (draaide scripts/bereid-parallax.mjs?)`);
if (paginas.length !== 12) fouten.push(`archetypepagina's: ${paginas.length} van de 12 in dist/assets (draaide scripts/bereid-archetypepaginas.mjs?)`);
if (paginas.some((f) => f.raw > BUDGET_PAGINA_STUK)) fouten.push(`een archetypepagina is zwaarder dan ${BUDGET_PAGINA_STUK} B`);
if (renders.length !== 6) fouten.push(`renders: ${renders.length} van de 6 platen in dist/assets (draaide scripts/bereid-renders.mjs?)`);
if (sum(renders, 'raw') > BUDGET_RENDERS) fouten.push(`renders ${sum(renders, 'raw')} B > ${BUDGET_RENDERS} B`);
if (sum(heroLagen, 'raw') > BUDGET_HERO_LAGEN) fouten.push(`hero-lagen ${sum(heroLagen, 'raw')} B > ${BUDGET_HERO_LAGEN} B`);
if (sum(heroPlat, 'raw') > BUDGET_HERO_PLAT) fouten.push(`hero-composiet ${sum(heroPlat, 'raw')} B > ${BUDGET_HERO_PLAT} B`);
if (logoGroot.length !== 1 || logoMidden.length !== 1 || logoKlein.length !== 1 || logoDonker.length !== 1)
  fouten.push(
    `logo: ${logoGroot.length} grote, ${logoMidden.length} middelste, ${logoKlein.length} kleine en ${logoDonker.length} donkere plaat in dist/assets, verwacht 1 van elk (draaide scripts/bereid-woordmerk.mjs?)`,
  );
if (sum(logoGroot, 'raw') > BUDGET_LOGO_GROOT) fouten.push(`logo groot ${sum(logoGroot, 'raw')} B > ${BUDGET_LOGO_GROOT} B`);
if (sum(logoMidden, 'raw') > BUDGET_LOGO_MIDDEN) fouten.push(`logo midden ${sum(logoMidden, 'raw')} B > ${BUDGET_LOGO_MIDDEN} B`);
if (sum(logoKlein, 'raw') > BUDGET_LOGO_KLEIN) fouten.push(`logo klein ${sum(logoKlein, 'raw')} B > ${BUDGET_LOGO_KLEIN} B`);
if (sum(logoDonker, 'raw') > BUDGET_LOGO_DONKER) fouten.push(`logo donker ${sum(logoDonker, 'raw')} B > ${BUDGET_LOGO_DONKER} B`);
if (sum(art, 'q11') > BUDGET_ART_Q11) fouten.push(`landing-art ${sum(art, 'q11')} B > ${BUDGET_ART_Q11} B (q11)`);
if (fontsBase.length && sum(fontsBase, 'raw') > BUDGET_FONTS) fouten.push(`fonts ${sum(fontsBase, 'raw')} B > ${BUDGET_FONTS} B`);

if (fouten.length) {
  console.error('\nBegroting overschreden:\n  - ' + fouten.join('\n  - ') + '\n');
  process.exit(1);
}
console.log('\nBegroting gehaald.\n');

// Ongebruikt maar handig bij het debuggen van de chunkindeling:
void statSync;
