// Bereidt de zes beeldplaten van de landing voor op het web: de tegels
// Persona / Schaduw / Denkstijl, de doorgang in de donkere band, de buste bij
// "De methode" en de bergstrook onder de slotoproep.
//
//   node scripts/bereid-renders.mjs "<map met de Codex-afbeeldingen>"
//
// De bron zijn de eigen renders van de eigenaar (map "Arcana Design Sep 2026",
// 1122x1402 of 1672x941 PNG met doorzichtige achtergrond, 2-3 MB per stuk).
// Per plaat: bijsnijden op de rand van wat niet doorzichtig is, schalen naar
// de breedte die de plek werkelijk nodig heeft (met ruimte voor scherpe
// schermen), wegschrijven als WebP met alpha. Daarna een gegenereerd
// src/site/renderBeeld.ts met de bestandsnaam, breedte en hoogte per plaat,
// zodat de pagina geen maten hoeft te raden (geen layoutsprong).
//
// Herkomst per plaat staat hieronder bij BRON: alleen beelden zonder
// herkenbare echte persoon (standbeeld, silhouet, abstracte profielen).

import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const bronMap = process.argv[2];
if (!bronMap) {
  console.error('Gebruik: node scripts/bereid-renders.mjs "<map met de Codex-afbeeldingen>"');
  process.exit(1);
}

const UIT = join(process.cwd(), 'src', 'assets', 'art', 'renders');
mkdirSync(UIT, { recursive: true });

/** `deel` is een stuk van de bronbestandsnaam (Codex-afbeelding 23 sep 2026, <deel>.png). */
const PLATEN = [
  { naam: 'persona', deel: '20_12_29-8', breedte: 640, kwaliteit: 70 }, // standbeeld met lauwerblad en rode schijf
  { naam: 'schaduw', deel: '20_12_14-3', breedte: 640, kwaliteit: 68 }, // donker profiel in mist en bergen
  { naam: 'denkstijl', deel: '19_15_36-9', breedte: 640, kwaliteit: 70 }, // profiel met brein en baanlijnen
  { naam: 'doorgang', deel: '20_12_08-2', breedte: 600, kwaliteit: 70 }, // poort met trap en figuur
  { naam: 'methode', deel: '20_12_16-4', breedte: 720, kwaliteit: 68 }, // profiel met brein tussen bergen
  { naam: 'slot', deel: '20_12_24-7', breedte: 1500, kwaliteit: 64 }, // bergstrook met rode schijf
];

function vind(deel) {
  const lijst = [...readdirSync(bronMap), ...readdirSync(join(bronMap, 'Rapport')).map((f) => join('Rapport', f))];
  const hit = lijst.find((f) => f.includes(deel) && f.endsWith('.png'));
  if (!hit) throw new Error(`Geen bronbestand met "${deel}" in ${bronMap}`);
  return join(bronMap, hit);
}

const regels = [];
let totaal = 0;
for (const plaat of PLATEN) {
  const bron = vind(plaat.deel);
  const { data, info } = await sharp(bron)
    .ensureAlpha()
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
    .resize({ width: plaat.breedte, withoutEnlargement: true })
    .webp({ quality: plaat.kwaliteit, alphaQuality: 85, effort: 5 })
    .toBuffer({ resolveWithObject: true });
  const naam = `render-${plaat.naam}.webp`;
  writeFileSync(join(UIT, naam), data);
  totaal += data.length;
  console.log(`${naam.padEnd(24)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ${(data.length / 1024).toFixed(0).padStart(5)} KB   <- ${bron.split(/[\\/]/).pop()}`);
  regels.push({ sleutel: plaat.naam, naam, breedte: info.width, hoogte: info.height });
}
console.log(`samen ${(totaal / 1024).toFixed(0)} KB`);

const ts = `// GEGENEREERD door scripts/bereid-renders.mjs — niet met de hand aanpassen.
${regels.map((r) => `import ${r.sleutel} from '../assets/art/renders/${r.naam}';`).join('\n')}

export interface RenderBeeld {
  src: string;
  width: number;
  height: number;
}

export const RENDER = {
${regels.map((r) => `  ${r.sleutel}: { src: ${r.sleutel}, width: ${r.breedte}, height: ${r.hoogte} },`).join('\n')}
} satisfies Record<string, RenderBeeld>;
`;
writeFileSync(join(process.cwd(), 'src', 'site', 'renderBeeld.ts'), ts);
console.log('src/site/renderBeeld.ts geschreven');
