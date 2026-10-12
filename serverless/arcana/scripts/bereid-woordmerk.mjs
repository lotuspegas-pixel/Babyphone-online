// Bereidt het woordmerk van de hero voor op het web.
//
//   node scripts/bereid-woordmerk.mjs <map-met-arcana-profile-com>
//
// De bron zijn drie losse platen — "Arcana", "Profile" en ".com" — als
// uitgesneden letters op een doorzichtige achtergrond. Ze komen binnen op
// 2000 px breed met flink wat lege rand eromheen; hier worden ze bijgesneden
// op de letters zelf en geschaald naar wat de hero werkelijk nodig heeft.
//
// Bijsnijden doet hier meer dan bytes besparen: de CSS lijnt de drie delen op
// elkaar uit, en dat kan alleen als de rand van het beeld ook de rand van de
// letters is. Anders zweeft "Profile" op een onvoorspelbare afstand onder
// "Arcana", afhankelijk van hoeveel leegte de export toevallig meegaf.
//
// Let op: de letters zijn roomwit (#f9ebc9) en liggen op papier dat nauwelijks
// donkerder is (#ede4cc). Ze zijn dus niet leesbaar op kleurverschil alleen;
// site.css zet er een zachte slagschaduw onder zodat ze als uitgesneden
// letters óp het vel liggen. Dat is ook wat ze zijn.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const bronMap = process.argv[2];
if (!bronMap) {
  console.error('Gebruik: node scripts/bereid-woordmerk.mjs <map-met-platen>');
  process.exit(1);
}

const UIT = join(process.cwd(), 'src', 'assets', 'art', 'woordmerk');
mkdirSync(UIT, { recursive: true });

/**
 * De drie delen, elk in twee maten. Kwaliteit verlagen levert hier vrijwel
 * niets op (q88 → q58 scheelt 20 %, want de platen zijn papierkorrel en die
 * comprimeert niet); de maat is de enige echte knop. Vandaar srcset: een
 * telefoon toont het merk op ~120 px en hoeft de grote plaat niet te halen.
 *
 * `groot` is ruim genomen ten opzichte van de maximale schermmaat (~1120 px),
 * zodat de letterranden op een scherm met dubbele pixeldichtheid scherp
 * blijven. Bij letters zie je dat, anders dan bij de collage.
 */
const DELEN = [
  { naam: 'arcana', bestand: '2.webp', klein: 500, groot: 1400 },
  { naam: 'profile', bestand: '3.webp', klein: 340, groot: 950 },
  { naam: 'punt-com', bestand: '4.webp', klein: 120, groot: 340 },
];

/** Bounding box van alles wat niet (bijna) doorzichtig is. */
async function vak(pad) {
  const { data, info } = await sharp(pad).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      // Drempel 24 en niet 8: de export heeft een flinterdunne halo rond de
      // letters. Die mag weg, anders zit er een onzichtbare marge in de
      // uitsnede en klopt de uitlijning alsnog niet.
      if (data[(y * w + x) * channels + 3] > 24) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error('plaat is volledig doorzichtig');
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const regels = [];
let totaalKlein = 0;
let totaalGroot = 0;

for (const deel of DELEN) {
  const pad = join(bronMap, deel.bestand);
  const box = await vak(pad);

  const maak = async (breedte) => {
    const buf = await sharp(pad)
      .extract(box)
      .resize({ width: breedte, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6, alphaQuality: 100 })
      .toBuffer();
    const meta = await sharp(buf).metadata();
    return { buf, w: meta.width, h: meta.height };
  };

  const klein = await maak(deel.klein);
  const groot = await maak(deel.groot);
  writeFileSync(join(UIT, `${deel.naam}-klein.webp`), klein.buf);
  writeFileSync(join(UIT, `${deel.naam}.webp`), groot.buf);
  totaalKlein += klein.buf.length;
  totaalGroot += groot.buf.length;

  regels.push({ naam: deel.naam, sleutel: deel.naam.replace('-', ''), klein, groot });
  console.log(
    `${deel.naam.padEnd(9)} bron ${box.width}x${box.height} → ` +
      `${String(klein.w).padStart(4)}px ${(klein.buf.length / 1024).toFixed(1).padStart(5)} KB · ` +
      `${String(groot.w).padStart(4)}px ${(groot.buf.length / 1024).toFixed(1).padStart(6)} KB   ` +
      `verhouding ${(groot.w / groot.h).toFixed(3)}`,
  );
}

console.log(
  `\nSamen: ${(totaalKlein / 1024).toFixed(1)} KB klein (telefoon) · ${(totaalGroot / 1024).toFixed(1)} KB groot (desktop)\n`,
);

const imports = regels
  .map((r) => `import ${r.sleutel} from '../assets/art/woordmerk/${r.naam}.webp';\nimport ${r.sleutel}Klein from '../assets/art/woordmerk/${r.naam}-klein.webp';`)
  .join('\n');
const items = regels
  .map(
    (r) =>
      `  ${r.sleutel}: {\n` +
      `    bron: ${r.sleutel}, breedte: ${r.groot.w}, hoogte: ${r.groot.h},\n` +
      `    srcSet: \`\${${r.sleutel}Klein} ${r.klein.w}w, \${${r.sleutel}} ${r.groot.w}w\`,\n` +
      `  },`,
  )
  .join('\n');

writeFileSync(
  join(process.cwd(), 'src', 'site', 'woordmerk.ts'),
  `// GEGENEREERD door scripts/bereid-woordmerk.mjs — niet met de hand aanpassen.
//
// De drie platen van het woordmerk, bijgesneden op de letters zelf. Dat
// bijsnijden is geen besparing maar een voorwaarde: site.css lijnt de delen op
// elkaar uit, en dat kan alleen als de rand van het beeld ook de rand van de
// letters is.
//
// Elk deel komt in twee maten. Een telefoon toont het merk op ~120 px en haalt
// de kleine plaat; een breed scherm de grote. De \`sizes\` die daarbij hoort
// staat in HeroParallax.tsx.

${imports}

export interface MerkDeel {
  bron: string;
  srcSet: string;
  breedte: number;
  hoogte: number;
}

export const WOORDMERK: Record<'arcana' | 'profile' | 'puntcom', MerkDeel> = {
${items}
};
`,
);
console.log('src/site/woordmerk.ts geschreven.');
