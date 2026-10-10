// Eenmalige analyse: waar zit in elke parallaxlaag daadwerkelijk beeld?
// De lagen komen als 1672x941 PNG's binnen waarvan het grootste deel
// doorzichtig is. Dit meet per laag de bounding box van alles met alpha > 8,
// zodat bijsnijden in bereid-parallax.mjs op cijfers rust en niet op het oog.
//
//   node scripts/analyseer-lagen.mjs <map-met-pngs>

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const map = process.argv[2];
if (!map) {
  console.error('Gebruik: node scripts/analyseer-lagen.mjs <map-met-pngs>');
  process.exit(1);
}

const bestanden = readdirSync(map)
  .filter((n) => n.toLowerCase().endsWith('.png'))
  .sort();

for (const naam of bestanden) {
  const pad = join(map, naam);
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

  if (maxX < 0) {
    console.log(`${naam}: volledig doorzichtig`);
    continue;
  }
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const dekking = ((bw * bh) / (w * h)) * 100;
  console.log(
    `${naam}\n  bron ${w}x${h}  box x:${minX} y:${minY} ${bw}x${bh}` +
      `  (${dekking.toFixed(0)}% van het vlak)` +
      `  links:${((minX / w) * 100).toFixed(1)}% boven:${((minY / h) * 100).toFixed(1)}%`,
  );
}
