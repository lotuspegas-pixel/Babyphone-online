#!/usr/bin/env node
// check-domains.mjs — domeincontrole op de gebouwde uitvoer.
//
// Herkomst: E-usp-en-landing.md §3.5, maatregel 2. Op drie punten aangepast
// nadat het script tegen de werkelijke build is gedraaid:
//   1. De te scannen map is een argument (of MAP=…), zodat hij vandaag op de
//      losse buildmap draait en straks ongewijzigd op `dist/` in de repo.
//   2. `react.dev` staat op de witte lijst. De React-productiebundel bevat twee
//      verwijzingen naar https://react.dev in zijn eigen foutmeldingen. Zonder
//      deze regel faalt de check op elke build — dat is geen theoretisch geval,
//      het is gemeten in app.beautified.js.
//   3. VITE_SITE_URL valt terug op https://arcanaprofile.com, zodat het script
//      ook werkt vóórdat de repo er is en de .env bestaat.
//
// Exit-code 1 laat CI en `npm run build` falen.
//
// Gebruik:
//   node check-domains.mjs                 # scant ./dist
//   node check-domains.mjs ../site         # scant een andere map
//   VITE_SITE_URL=https://voorbeeld.nl node check-domains.mjs dist

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Het script slaat zichzelf over. Het bevat per definitie het verboden domein
// (in VERBODEN) en zou anders op zijn eigen bronregels afgaan wanneer het in
// dezelfde map staat als de uitvoer.
const DIT_BESTAND = resolve(fileURLToPath(import.meta.url));

const SITE = process.env.VITE_SITE_URL || 'https://arcanaprofile.com';
if (!/^https:\/\/[a-z0-9.-]+$/.test(SITE)) {
  console.error(`FOUT: VITE_SITE_URL is ongeldig: ${SITE}`);
  process.exit(1);
}

const EIGEN_HOST = new URL(SITE).hostname; // arcanaprofile.com

// Hosts die wél in de uitvoer mogen voorkomen, met de reden erbij.
const TOEGESTAAN = new Set([
  EIGEN_HOST,
  'www.' + EIGEN_HOST,
  'schema.org', // JSON-LD @context
  'www.w3.org', // SVG- en XML-namespaces
  'www.sitemaps.org', // sitemap-namespace
  'react.dev', // React zet dit zelf in zijn minified foutmeldingen
  'github.com', // pdf-lib (PDF-generator, lazy chunk) verwijst in foutmeldingen en bronvermeldingen naar zijn eigen repository
]);

// Hosts die nooit mogen voorkomen, ongeacht de rest. Hier staat de geschiedenis in.
const VERBODEN = ['speaktoart.com'];

const UITVOER = process.argv[2] || process.env.MAP || 'dist';
const TE_SCANNEN = new Set([
  '.html', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.webmanifest', '.svg',
]);

if (!existsSync(UITVOER)) {
  console.error(`FOUT: map "${UITVOER}" bestaat niet.`);
  process.exit(1);
}

// Mappen die nooit meetellen: afhankelijkheden zijn niet van ons, en een oude
// dist/ is juist de map die het verkeerde domein nog bevat totdat er opnieuw
// gebouwd is. `npm run build` draait deze check ná Vite, op dist/ zelf.
const OVERSLAAN = new Set(['node_modules', 'dist', '.git', 'coverage', '.vite']);

function* bestanden(map) {
  for (const naam of readdirSync(map)) {
    if (OVERSLAAN.has(naam)) continue;
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) yield* bestanden(pad);
    else if (TE_SCANNEN.has(extname(pad))) yield pad;
  }
}

const fouten = [];
let gescand = 0;

for (const pad of bestanden(UITVOER)) {
  if (resolve(pad) === DIT_BESTAND) continue;
  gescand++;
  const regels = readFileSync(pad, 'utf8').split('\n');

  regels.forEach((regel, i) => {
    // 1. Harde blokkade op bekende oude domeinen, in welke vorm dan ook.
    for (const verboden of VERBODEN) {
      if (regel.toLowerCase().includes(verboden)) {
        fouten.push(
          `${pad}:${i + 1}  VERBODEN DOMEIN "${verboden}"\n      ${regel.trim().slice(0, 140)}`,
        );
      }
    }
    // 2. Elke absolute URL naar een host die niet op de witte lijst staat.
    for (const m of regel.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)) {
      const host = m[1].toLowerCase().replace(/\.$/, '');
      if (!TOEGESTAAN.has(host)) {
        fouten.push(
          `${pad}:${i + 1}  ONBEKENDE HOST "${host}"\n      ${regel.trim().slice(0, 140)}`,
        );
      }
    }
  });
}

// 3. De vier plekken die er sowieso moeten staan, op het juiste domein.
const indexPad = join(UITVOER, 'index.html');
if (!existsSync(indexPad)) {
  fouten.push(`${indexPad}  ONTBREEKT — zonder index.html is dit geen build.`);
} else {
  const html = readFileSync(indexPad, 'utf8');
  const VERPLICHT = [
    [`<link rel="canonical" href="${SITE}/"`, 'canonical'],
    [`property="og:url" content="${SITE}/"`, 'og:url'],
    [`property="og:image" content="${SITE}/`, 'og:image'],
    [`"@id": "${SITE}/#website"`, 'JSON-LD @id WebSite'],
  ];
  for (const [naald, naam] of VERPLICHT) {
    if (!html.includes(naald)) {
      fouten.push(`${indexPad}  ONTBREEKT of WIJKT AF: ${naam} (verwacht: ${naald})`);
    }
  }

  // 4. Extra: de JSON-LD moet parsebaar blijven. Een kapotte graaf is net zo
  //    stil als een verkeerd domein.
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) {
    fouten.push(`${indexPad}  GEEN JSON-LD gevonden.`);
  } else {
    try {
      const data = JSON.parse(m[1]);
      const graaf = data['@graph'] ?? [data];
      for (const knoop of graaf) {
        for (const veld of ['@id', 'url']) {
          const v = knoop[veld];
          if (typeof v === 'string' && v.startsWith('http') && new URL(v).hostname !== EIGEN_HOST) {
            fouten.push(`${indexPad}  JSON-LD ${knoop['@type']}.${veld} wijst naar ${v}`);
          }
        }
      }
    } catch (e) {
      fouten.push(`${indexPad}  JSON-LD is geen geldige JSON: ${e.message}`);
    }
  }
}

if (fouten.length) {
  console.error(`\n  Domeincontrole MISLUKT — ${fouten.length} probleem(en) in ${gescand} bestand(en):\n`);
  for (const f of fouten) console.error('  · ' + f);
  console.error(`\n  Het canonieke domein is ${SITE} (uit VITE_SITE_URL).`);
  console.error('  Hoort een host er wel te staan? Zet hem in TOEGESTAAN in check-domains.mjs,');
  console.error('  met een opmerking erbij waarom.\n');
  process.exit(1);
}

console.log(
  `Domeincontrole geslaagd — ${gescand} bestand(en) gescand, alle absolute URL's wijzen naar ${EIGEN_HOST}.`,
);
