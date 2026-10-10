// Bereidt de parallaxlagen van de hero voor op het web.
//
//   node scripts/bereid-parallax.mjs <map-met-pngs>
//
// De bron is zeven PNG's van 1672x941 (samen 12,8 MB) waarvan de meeste voor
// 40-70 % uit doorzichtig niets bestaan. Per laag gebeurt hier drie dingen:
//
//   1. bijsnijden op de bounding box van alles met alpha > 8 (zie
//      analyseer-lagen.mjs) — dat scheelt het meeste;
//   2. schalen naar de breedte die de laag op een 1600px-hero echt nodig heeft;
//   3. wegschrijven als WebP, met alpha waar die er is.
//
// De positie van elke uitsnede wordt als percentage van het oorspronkelijke
// vlak in heroLagen.ts gezet, zodat CSS ze zonder magische getallen terugzet.
//
// De vlakke composiet (laag 1) gaat apart mee als één beeld: dat is wat mobiel
// en prefers-reduced-motion te zien krijgen.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const bronMap = process.argv[2];
if (!bronMap) {
  console.error('Gebruik: node scripts/bereid-parallax.mjs <map-met-pngs>');
  process.exit(1);
}

const UIT = join(process.cwd(), 'src', 'assets', 'art', 'hero');
mkdirSync(UIT, { recursive: true });

/** Het vlak waarin de lagen op elkaar passen. Alle posities zijn hierop betrokken. */
const CANVAS = { width: 1672, height: 941 };

/**
 * De lagen van achter naar voren. `diepte` is wat site.css als --diepte leest:
 * 0 = staat stil, 1 = beweegt het meest. De sprong tussen 0,30 (boog) en
 * 0,60 (collage) is bewust groot: daar komt het woord ARCANA tussen te staan.
 */
const LAGEN = [
  { bestand: 'ChatGPT-afbeelding 10 okt 2026, 08_50_16-2.png', naam: 'papier', diepte: 0.06, breedte: 900, kwaliteit: 58, bijsnijden: false },
  { bestand: 'ChatGPT-afbeelding 10 okt 2026, 08_50_19-3.png', naam: 'landschap', diepte: 0.18, breedte: 1100, kwaliteit: 70 },
  { bestand: 'ChatGPT-afbeelding 10 okt 2026, 08_50_21-4.png', naam: 'boog', diepte: 0.3, breedte: 520, kwaliteit: 72 },
  { bestand: 'ChatGPT-afbeelding 10 okt 2026, 08_50_23-5.png', naam: 'collage', diepte: 0.6, breedte: 1120, kwaliteit: 72 },
  { bestand: 'ChatGPT-afbeelding 10 okt 2026, 08_50_25-6.png', naam: 'jung', diepte: 0.76, breedte: 1220, kwaliteit: 74 },
  { bestand: 'ChatGPT-afbeelding 10 okt 2026, 08_50_26-7.png', naam: 'tafel', diepte: 1, breedte: 1380, kwaliteit: 74 },
];

/** De vlakke composiet: mobiel, reduced-motion en de fallback als er iets misgaat. */
const COMPOSIET = { bestand: 'ChatGPT-afbeelding 10 okt 2026, 08_49_52-1.png', naam: 'composiet', breedte: 1000, kwaliteit: 68 };

/** Bounding box van alles met alpha > 8. Null als de laag nergens alpha heeft. */
async function vak(pad) {
  const { data, info } = await sharp(pad).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      if (data[(y * w + x) * channels + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const pct = (n) => Number(n.toFixed(4));
const regels = [];
let totaal = 0;

for (const laag of LAGEN) {
  const pad = join(bronMap, laag.bestand);
  const box = laag.bijsnijden === false ? { left: 0, top: 0, ...CANVAS } : ((await vak(pad)) ?? { left: 0, top: 0, ...CANVAS });

  const pijp = sharp(pad).extract(box).resize({ width: laag.breedte, withoutEnlargement: true });
  const buf = await pijp.webp({ quality: laag.kwaliteit, effort: 6, alphaQuality: 90 }).toBuffer();

  const uitNaam = `${laag.naam}.webp`;
  writeFileSync(join(UIT, uitNaam), buf);
  totaal += buf.length;

  const meta = await sharp(buf).metadata();
  regels.push({
    naam: laag.naam,
    bestand: uitNaam,
    diepte: laag.diepte,
    links: pct((box.left / CANVAS.width) * 100),
    boven: pct((box.top / CANVAS.height) * 100),
    breedte: pct((box.width / CANVAS.width) * 100),
    hoogte: pct((box.height / CANVAS.height) * 100),
    px: `${meta.width}x${meta.height}`,
    kb: buf.length / 1024,
  });
  console.log(
    `${laag.naam.padEnd(10)} ${String(box.width).padStart(4)}x${String(box.height).padEnd(4)} → ` +
      `${String(meta.width).padStart(4)}x${String(meta.height).padEnd(4)} ${(buf.length / 1024).toFixed(1).padStart(6)} KB`,
  );
}

// De vlakke composiet.
{
  const buf = await sharp(join(bronMap, COMPOSIET.bestand))
    .resize({ width: COMPOSIET.breedte, withoutEnlargement: true })
    .webp({ quality: COMPOSIET.kwaliteit, effort: 6 })
    .toBuffer();
  writeFileSync(join(UIT, 'composiet.webp'), buf);
  totaal += buf.length;
  console.log(`${'composiet'.padEnd(10)} ${'—'.padStart(9)} → ${String(COMPOSIET.breedte).padStart(4)}       ${(buf.length / 1024).toFixed(1).padStart(6)} KB`);
}

console.log(`\nSamen: ${(totaal / 1024).toFixed(1)} KB (bron was 12,8 MB)\n`);

// Het manifest. Vite hasht de imports, dus de bestanden worden hier
// geïmporteerd en niet als pad-string doorgegeven.
const imports = regels.map((r) => `import ${r.naam} from '../assets/art/hero/${r.bestand}';`).join('\n');
const items = regels
  .map(
    (r) =>
      `  { naam: '${r.naam}', bron: ${r.naam}, diepte: ${r.diepte},\n` +
      `    links: ${r.links}, boven: ${r.boven}, breedte: ${r.breedte}, hoogte: ${r.hoogte} },`,
  )
  .join('\n');

writeFileSync(
  join(process.cwd(), 'src', 'site', 'heroLagen.ts'),
  `// GEGENEREERD door scripts/bereid-parallax.mjs — niet met de hand aanpassen.
//
// De zes lagen van de hero-collage, van achter naar voren. Posities zijn
// percentages van het vlak ${CANVAS.width}x${CANVAS.height} waarin de lagen op elkaar
// passen; HeroParallax.tsx zet ze daarmee terug op hun plek.

${imports}

export const HERO_VLAK = { breedte: ${CANVAS.width}, hoogte: ${CANVAS.height} } as const;

export interface HeroLaag {
  naam: string;
  bron: string;
  /** 0 = staat stil op de achtergrond, 1 = beweegt het meest mee. */
  diepte: number;
  links: number;
  boven: number;
  breedte: number;
  hoogte: number;
}

export const HERO_LAGEN: readonly HeroLaag[] = [
${items}
];
`,
);
console.log('src/site/heroLagen.ts geschreven.');
