// Bereidt het logo van Arcana Profile voor op het web.
//
//   node scripts/bereid-woordmerk.mjs <pad-naar-het-logo.webp>
//
// Het logo is één plaat: "Arcana" in koper boven "Profile.com" in steen, met
// de staart van de A die onder het woord doorloopt. Het komt overal in
// dezelfde vorm terug — hero, kop, voet, rapport en de deelafbeelding — dus
// er is één bron en deze ene stap.
//
// Wat hier gebeurt:
//
//   1. bijsnijden op de letters: de export heeft een flinterdunne rand;
//   2. drie maten (klein, midden, groot) voor `srcset`. Kwaliteit verlagen
//      helpt niet (het is metaalkorrel, en die comprimeert niet), alleen de
//      maat telt. Kop en voet halen de kleine, een gewoon scherm de middelste,
//      een scherm met dubbele pixeldichtheid de grote;
//   3. src/site/woordmerk.ts schrijven met de URL's en de afmetingen;
//   4. public/og-image.jpg opnieuw samenstellen: het logo op het papier uit de
//      hero, met een zachte schaduw. Dat is de afbeelding die verschijnt als
//      iemand de site deelt, en die moet hetzelfde merk tonen als de site.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const bron = process.argv[2];
if (!bron) {
  console.error('Gebruik: node scripts/bereid-woordmerk.mjs <pad-naar-het-logo.webp>');
  process.exit(1);
}

const UIT = join(process.cwd(), 'src', 'assets', 'art', 'woordmerk');
mkdirSync(UIT, { recursive: true });

/** Breedtes in pixels. `groot` is ruim genomen voor schermen met dubbele pixeldichtheid. */
const MATEN = [
  { naam: 'klein', breedte: 320 },
  { naam: 'midden', breedte: 800 },
  { naam: 'groot', breedte: 1400 },
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
      if (data[(y * w + x) * channels + 3] > 24) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error('het logo is volledig doorzichtig');
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const box = await vak(bron);
const uitsnede = await sharp(bron).extract(box).toBuffer();

const gemaakt = [];
for (const maat of MATEN) {
  const buf = await sharp(uitsnede)
    .resize({ width: maat.breedte, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6, alphaQuality: 100 })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  const bestand = maat.naam === 'groot' ? 'logo.webp' : `logo-${maat.naam}.webp`;
  writeFileSync(join(UIT, bestand), buf);
  gemaakt.push({ ...maat, bestand, buf, w: meta.width, h: meta.height });
  console.log(
    `${maat.naam.padEnd(7)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(4)} ${(buf.length / 1024).toFixed(1).padStart(7)} KB  ${bestand}`,
  );
}

const groot = gemaakt.find((m) => m.naam === 'groot');
console.log(`\nVerhouding ${(groot.w / groot.h).toFixed(3)}  (bron na bijsnijden ${box.width}x${box.height})`);

writeFileSync(
  join(process.cwd(), 'src', 'site', 'woordmerk.ts'),
  `// GEGENEREERD door scripts/bereid-woordmerk.mjs — niet met de hand aanpassen.
//
// Het logo: één plaat in drie maten, bijgesneden op de letters. Alle plekken
// waar het merk staat gebruiken dit bestand via ArcanaLogo.tsx; er is geen
// tweede versie.

import logo from '../assets/art/woordmerk/logo.webp';
import logoMidden from '../assets/art/woordmerk/logo-midden.webp';
import logoKlein from '../assets/art/woordmerk/logo-klein.webp';

export const LOGO = {
  /** De grootste maat: print en schermen met dubbele pixeldichtheid. */
  bron: logo,
  breedte: ${groot.w},
  hoogte: ${groot.h},
  /** Breedte gedeeld door hoogte; de CSS rekent er niet mee, de hero wel. */
  verhouding: ${(groot.w / groot.h).toFixed(4)},
  srcSet: \`\${logoKlein} ${gemaakt[0].w}w, \${logoMidden} ${gemaakt[1].w}w, \${logo} ${gemaakt[2].w}w\`,
} as const;
`,
);
console.log('src/site/woordmerk.ts geschreven.');

// ── De deelafbeelding (Open Graph) ───────────────────────────────────────────
// 1200x630 is wat sociale netwerken verwachten, en wat index.html al opgeeft.
const OG = { w: 1200, h: 630 };
const papier = join(process.cwd(), 'src', 'assets', 'art', 'hero', 'papier.webp');
const logoBreedte = 860;
const logoBuf = await sharp(uitsnede).resize({ width: logoBreedte }).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();

// Slagschaduw: dezelfde vorm in inkt, doorzichtig gemaakt en vervaagd.
const { data: rgba, info } = await sharp(logoBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const schaduwRuw = Buffer.from(rgba);
for (let i = 0; i < schaduwRuw.length; i += 4) {
  schaduwRuw[i] = 28;
  schaduwRuw[i + 1] = 23;
  schaduwRuw[i + 2] = 18;
  schaduwRuw[i + 3] = Math.round(schaduwRuw[i + 3] * 0.34);
}
const schaduw = await sharp(schaduwRuw, { raw: { width: info.width, height: info.height, channels: 4 } })
  .blur(9)
  .png()
  .toBuffer();

const links = Math.round((OG.w - logoMeta.width) / 2);
const boven = Math.round((OG.h - logoMeta.height) / 2) - 6;

const og = await sharp(papier)
  .resize(OG.w, OG.h, { fit: 'cover' })
  .composite([
    { input: schaduw, left: links, top: boven + 14 },
    { input: logoBuf, left: links, top: boven },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toBuffer();

writeFileSync(join(process.cwd(), 'public', 'og-image.jpg'), og);
console.log(`public/og-image.jpg geschreven (${OG.w}x${OG.h}, ${(og.length / 1024).toFixed(1)} KB).`);
