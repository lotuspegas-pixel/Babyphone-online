// Bereidt de twaalf archetypepagina's (de ontwerpen van de eigenaar) voor op het web.
//
//   node scripts/bereid-archetypepaginas.mjs "<map met 4.webp ... 15.webp>"
//
// Elke pagina is een volledig ontwerp van ~1055x1491 (of 1122x1402) met de tekst
// erin. Ze worden alleen geladen als iemand dat archetype in "De twaalf namen"
// kiest (of er met de muis/toets naartoe gaat), dus ze tellen niet mee voor de
// eerste laadbeurt. Hier: schalen naar 1000 px breed, WebP q80, en een
// gegenereerd src/site/archetypePaginas.ts met de bestandsnaam en maten per
// archetype, zodat de pagina geen maten hoeft te raden.
//
// Koppeling bronbestand -> archetype (volgorde waarin de eigenaar ze aanleverde,
// gecontroleerd op de titel op elke pagina):

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const bronMap = process.argv[2];
if (!bronMap) {
  console.error('Gebruik: node scripts/bereid-archetypepaginas.mjs "<map met 4.webp ... 15.webp>"');
  process.exit(1);
}

const PAGINAS = [
  ['theHermit', 4],
  ['theSeeker', 5],
  ['theArchitect', 6],
  ['theMirror', 7],
  ['theFlame', 8],
  ['theGuardian', 9],
  ['theAlchemist', 10],
  ['theStrategist', 11],
  ['theWoundedHealer', 12],
  ['theVisionary', 13],
  ['theAnchor', 14],
  ['thePerformer', 15],
];

const UIT = join(process.cwd(), 'src', 'assets', 'art', 'archetypes');
mkdirSync(UIT, { recursive: true });

const regels = [];
let totaal = 0;
for (const [id, nr] of PAGINAS) {
  const { data, info } = await sharp(join(bronMap, `${nr}.webp`))
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toBuffer({ resolveWithObject: true });
  const naam = `pagina-${id}.webp`;
  writeFileSync(join(UIT, naam), data);
  totaal += data.length;
  console.log(`${naam.padEnd(32)} ${info.width}x${info.height}  ${(data.length / 1024).toFixed(0).padStart(4)} KB`);
  regels.push({ id, naam, w: info.width, h: info.height });
}
console.log(`samen ${(totaal / 1024).toFixed(0)} KB (per archetype geladen op verzoek)`);

const ts = `// GEGENEREERD door scripts/bereid-archetypepaginas.mjs — niet met de hand aanpassen.
import type { ArchetypeId } from '../types/arcana';
${regels.map((r) => `import ${r.id} from '../assets/art/archetypes/${r.naam}';`).join('\n')}

export interface ArchetypePagina {
  src: string;
  width: number;
  height: number;
}

export const ARCHETYPE_PAGINA: Record<ArchetypeId, ArchetypePagina> = {
${regels.map((r) => `  ${r.id}: { src: ${r.id}, width: ${r.w}, height: ${r.h} },`).join('\n')}
};
`;
writeFileSync(join(process.cwd(), 'src', 'site', 'archetypePaginas.ts'), ts);
console.log('src/site/archetypePaginas.ts geschreven');
