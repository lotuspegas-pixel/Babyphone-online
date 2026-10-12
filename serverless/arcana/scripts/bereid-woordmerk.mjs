// Bereidt het logo van Arcana Profile voor op het web.
//
//   node scripts/bereid-woordmerk.mjs [licht.webp] [donker.webp]
//
// Zonder argumenten leest het scripts/bron/logo-licht.webp en logo-donker.webp.
// De bronnen staan met opzet in de repo: het logo komt uit een ontwerp, niet uit
// code, en zonder bron kan niemand het opnieuw maken.
//
// Het logo bestaat in twee versies voor twee ondergronden:
//
//   licht   "Arcana" in koper boven "Profile.com" in steen, op een transparante
//           achtergrond. Voor het papier: hero, voet, rapport, deelafbeelding.
//   donker  dezelfde letters in donkerrood en steen, op zuiver zwart. Voor de
//           zwarte kop bovenaan de site. Geen alpha: de zwarte achtergrond is
//           onderdeel van de plaat, dus de kop moet exact #000 zijn.
//
// Wat hier gebeurt:
//
//   1. bijsnijden op de letters: de export heeft een flinterdunne rand;
//   2. licht in drie maten (klein, midden, groot) voor `srcset`. Kwaliteit
//      verlagen helpt niet (het is metaalkorrel, en die comprimeert niet),
//      alleen de maat telt. Donker in één maat: de kop is overal even breed;
//   3. src/site/woordmerk.ts schrijven met de URL's en de afmetingen;
//   4. public/og-image.jpg opnieuw samenstellen: het lichte logo op het papier
//      uit de hero, met een zachte schaduw. Dat is de afbeelding die verschijnt
//      als iemand de site deelt, en die moet hetzelfde merk tonen als de site.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const bron = process.argv[2] ?? join(process.cwd(), 'scripts', 'bron', 'logo-licht.webp');
const bronDonker = process.argv[3] ?? join(process.cwd(), 'scripts', 'bron', 'logo-donker.webp');

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

// ── Donkere versie voor de zwarte kop ────────────────────────────────────────
// Geen alpha: de letters staan op zuiver zwart. Bijsnijden gaat daarom op
// helderheid, en alles dat bijna zwart is gaat naar exact zwart. De export is
// lossy en heeft ruis van 1-3 waardes in de zwarte vlakken; op een kop van #000
// is dat onzichtbaar, maar op een kop die ook maar een fractie afwijkt zie je de
// rechthoek van de plaat verschijnen. Exact zwart houdt die rand weg.
const DONKER_BREEDTE = 480;
const { data: dRuw, info: dInfo } = await sharp(bronDonker).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const donkerBox = (() => {
  const { width: w, height: h } = dInfo;
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const i = (y * w + x) * 3;
      const max = Math.max(dRuw[i], dRuw[i + 1], dRuw[i + 2]);
      if (max < 14) {
        dRuw[i] = 0;
        dRuw[i + 1] = 0;
        dRuw[i + 2] = 0;
      } else if (max > 28) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error('het donkere logo is volledig zwart');
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
})();
const donkerBuf = await sharp(dRuw, { raw: { width: dInfo.width, height: dInfo.height, channels: 3 } })
  .extract(donkerBox)
  .resize({ width: DONKER_BREEDTE, withoutEnlargement: true })
  .webp({ quality: 86, effort: 6 })
  .toBuffer();
const donkerMeta = await sharp(donkerBuf).metadata();
writeFileSync(join(UIT, 'logo-donker.webp'), donkerBuf);
console.log(
  `donker  ${String(donkerMeta.width).padStart(5)}x${String(donkerMeta.height).padEnd(4)} ${(donkerBuf.length / 1024).toFixed(1).padStart(7)} KB  logo-donker.webp  (verhouding ${(donkerMeta.width / donkerMeta.height).toFixed(3)})`,
);

writeFileSync(
  join(process.cwd(), 'src', 'site', 'woordmerk.ts'),
  `// GEGENEREERD door scripts/bereid-woordmerk.mjs — niet met de hand aanpassen.
//
// Het logo in twee versies voor twee ondergronden, bijgesneden op de letters.
// Alle plekken waar het merk staat gebruiken deze bestanden via ArcanaLogo.tsx.
//
//   LOGO         koper en steen op een doorzichtige achtergrond, in drie maten.
//                Voor het papier: hero, voet, rapport.
//   LOGO_DONKER  donkerrood en steen op zuiver zwart, één maat. Voor de zwarte
//                kop; de zwarte achtergrond is onderdeel van de plaat.

import logo from '../assets/art/woordmerk/logo.webp';
import logoMidden from '../assets/art/woordmerk/logo-midden.webp';
import logoKlein from '../assets/art/woordmerk/logo-klein.webp';
import logoDonker from '../assets/art/woordmerk/logo-donker.webp';

export const LOGO = {
  /** De grootste maat: print en schermen met dubbele pixeldichtheid. */
  bron: logo,
  breedte: ${groot.w},
  hoogte: ${groot.h},
  /** Breedte gedeeld door hoogte; de CSS rekent er niet mee, de hero wel. */
  verhouding: ${(groot.w / groot.h).toFixed(4)},
  srcSet: \`\${logoKlein} ${gemaakt[0].w}w, \${logoMidden} ${gemaakt[1].w}w, \${logo} ${gemaakt[2].w}w\`,
} as const;

export const LOGO_DONKER = {
  bron: logoDonker,
  breedte: ${donkerMeta.width},
  hoogte: ${donkerMeta.height},
  verhouding: ${(donkerMeta.width / donkerMeta.height).toFixed(4)},
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
