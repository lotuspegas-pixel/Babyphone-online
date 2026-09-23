// Genereert robots.txt en sitemap.xml uit één domeinbron (VITE_SITE_URL),
// zodat het domein niet op meerdere plekken met de hand getypt staat (E §3.5,
// maatregel 1). Draait vóór de bundel wordt gebouwd, zodat de bestanden in
// public/ staan en meegekopieerd worden naar dist/ — waar check-domains.mjs ze
// daarna nog eens controleert.
//
//   node scripts/generate-seo-files.mjs
//   (draait automatisch als eerste stap van `npm run build`)
//
// De JSON-LD blijft bewust in index.html staan: die moet statisch in de HTML
// aanwezig zijn vóór hydratie (crawlers en de #root-fallback), en het domein
// daarin wordt door check-domains.mjs gedekt. Eén generator die ook de JSON-LD
// zou uitspugen zou de statische HTML-structuur die al bewezen werkt onnodig
// aanraken; dat risico is het niet waard voor deze taak.

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = (process.env.VITE_SITE_URL || 'https://arcanaprofile.com').replace(/\/+$/, '');
try {
  // Faalt hard bij een onzinnige waarde, zodat een typefout in .env niet
  // stilzwijgend een kapotte sitemap oplevert.
  // eslint-disable-next-line no-new
  new URL(SITE);
} catch {
  console.error(`FOUT: VITE_SITE_URL is geen geldige URL: ${SITE}`);
  process.exit(1);
}

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// Eén datum per build; de sitemap heeft een lastmod nodig (E §7.4) en de site
// verandert per oplevering, niet per uur.
const lastmod = new Date().toISOString().slice(0, 10);

// De pagina's die geïndexeerd mogen worden. Zolang er één publieke pagina is,
// staat hier één URL; het voorbeeldrapport (taak 12) voegt hier zijn eigen
// regel toe.
const PAGINAS = [{ pad: '/', changefreq: 'monthly', priority: '1.0' }];

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGINAS.map(
  (p) => `  <url>
    <loc>${SITE}${p.pad}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`;

writeFileSync(join(PUBLIC, 'robots.txt'), robots);
writeFileSync(join(PUBLIC, 'sitemap.xml'), sitemap);
console.log(`SEO-bestanden gegenereerd voor ${SITE} (lastmod ${lastmod}): robots.txt, sitemap.xml (${PAGINAS.length} URL).`);
