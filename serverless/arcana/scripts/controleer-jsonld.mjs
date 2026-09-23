// Controleert de JSON-LD in de gebouwde dist/index.html: geldig JSON, de
// verwachte types aanwezig, en elke @id/url op het eigen domein. Exit 1 bij
// een fout, zodat een kapotte of afgedwaalde graaf de build tegenhoudt.
//
//   node scripts/controleer-jsonld.mjs        (leest dist/index.html)
//   node scripts/controleer-jsonld.mjs pad/naar/index.html

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE = (process.env.VITE_SITE_URL || 'https://arcanaprofile.com').replace(/\/+$/, '');
const EIGEN_HOST = new URL(SITE).hostname;
const VERWACHTE_TYPES = ['WebSite', 'WebApplication', 'Organization', 'FAQPage'];

const bestand = process.argv[2] || join(process.cwd(), 'dist', 'index.html');
let html;
try {
  html = readFileSync(bestand, 'utf8');
} catch {
  console.error(`FOUT: kan ${bestand} niet lezen. Draai eerst \`npm run build\`.`);
  process.exit(1);
}

const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!match) {
  console.error('FOUT: geen JSON-LD-blok gevonden in de HTML.');
  process.exit(1);
}

let data;
try {
  data = JSON.parse(match[1]);
} catch (e) {
  console.error('FOUT: de JSON-LD is geen geldig JSON:', e.message);
  process.exit(1);
}

const nodes = Array.isArray(data['@graph']) ? data['@graph'] : [data];
const fouten = [];

// Alle verwachte types aanwezig?
const gevondenTypes = new Set(nodes.map((n) => n['@type']).filter(Boolean));
for (const t of VERWACHTE_TYPES) {
  if (!gevondenTypes.has(t)) fouten.push(`ontbrekend type: ${t}`);
}

// Elke @id en url op het eigen domein.
function loopUrls(node, pad) {
  for (const [key, val] of Object.entries(node)) {
    if ((key === '@id' || key === 'url' || key === 'logo') && typeof val === 'string' && /^https?:\/\//i.test(val)) {
      let host;
      try {
        host = new URL(val).hostname;
      } catch {
        fouten.push(`ongeldige URL bij ${pad}.${key}: ${val}`);
        continue;
      }
      if (host !== EIGEN_HOST) fouten.push(`vreemde host bij ${pad}.${key}: ${val}`);
    } else if (val && typeof val === 'object') {
      loopUrls(val, `${pad}.${key}`);
    }
  }
}
nodes.forEach((n, i) => loopUrls(n, `@graph[${i}]`));

// De FAQ moet minstens de negen zichtbare vragen dekken (E §7.4).
const faq = nodes.find((n) => n['@type'] === 'FAQPage');
const vragen = faq && Array.isArray(faq.mainEntity) ? faq.mainEntity.length : 0;
if (vragen < 9) fouten.push(`FAQPage heeft ${vragen} vragen, verwacht ≥ 9`);

if (fouten.length) {
  console.error('\nJSON-LD-controle mislukt:\n  - ' + fouten.join('\n  - ') + '\n');
  process.exit(1);
}
console.log(`JSON-LD geslaagd: ${nodes.length} entiteiten, types [${[...gevondenTypes].join(', ')}], ${vragen} FAQ-vragen, alle URL's op ${EIGEN_HOST}.`);
