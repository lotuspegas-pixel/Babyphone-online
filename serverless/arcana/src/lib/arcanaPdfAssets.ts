import { chapterArtUrl, emblemUrl } from '../data/arcanaArt';
import { SECTION_GROUPS } from '../data/arcanaSectionGroups';
import type { ArchetypeId } from '../types/arcana';
import { PDF_FONT_FILES, type ArcanaPdfAssets, type PdfFaceName, type PdfImage } from './arcanaPdf';

/**
 * De browserkant van de PDF: haalt de zeven TTF's op en rastert het embleem
 * en de zes hoofdstuktekeningen (SVG) via <canvas> naar PNG, want pdf-lib
 * tekent geen SVG. Alleen hier staat DOM-code; arcanaPdf.ts blijft puur.
 * Alles blijft op het apparaat: de bestanden komen van dezelfde oorsprong en
 * er gaat niets naar buiten.
 *
 * Een tekening die niet laadt wordt overgeslagen (de opmaak laat de ruimte
 * dan leeg); een font dat niet laadt is wél fataal, want zonder letters is
 * er geen PDF. Beide worden per sessie gecachet.
 */

const FONT_URLS = import.meta.glob('../fonts/pdf/*.ttf', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

/** Rasterbreedte in pixels per punt op papier: 2× de geplaatste maat. */
const RASTER_SCALE = 2;
/** Geplaatste breedtes (punten) zoals arcanaPdf.ts ze gebruikt. */
const EMBLEM_WIDTH_PT = 300;
const CHAPTER_WIDTH_PT = 190;

let fontsPromise: Promise<Record<PdfFaceName, Uint8Array>> | undefined;
const imageCache = new Map<string, Promise<PdfImage | undefined>>();

async function fetchBytes(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`lettertype niet geladen (${response.status})`);
  return new Uint8Array(await response.arrayBuffer());
}

function loadFonts(): Promise<Record<PdfFaceName, Uint8Array>> {
  fontsPromise ??= (async () => {
    const entries = await Promise.all(
      (Object.keys(PDF_FONT_FILES) as PdfFaceName[]).map(async (face): Promise<[PdfFaceName, Uint8Array]> => {
        const url = FONT_URLS[`../fonts/pdf/${PDF_FONT_FILES[face]}`];
        if (!url) throw new Error(`lettertype ontbreekt: ${PDF_FONT_FILES[face]}`);
        return [face, await fetchBytes(url)];
      }),
    );
    return Object.fromEntries(entries) as Record<PdfFaceName, Uint8Array>;
  })();
  // Een mislukte poging niet blijvend cachen: de volgende klik probeert opnieuw.
  fontsPromise.catch(() => {
    fontsPromise = undefined;
  });
  return fontsPromise;
}

/** Rastert een SVG (via een Image op een canvas) naar een transparante PNG. */
async function rasterise(url: string, widthPt: number): Promise<PdfImage | undefined> {
  const svg = await (await fetch(url)).text();
  const viewBox = /viewBox="([\d.\s-]+)"/.exec(svg)?.[1]?.trim().split(/\s+/).map(Number);
  const ratio = viewBox && viewBox.length === 4 && viewBox[2] > 0 ? viewBox[3] / viewBox[2] : 1;
  const width = Math.round(widthPt * RASTER_SCALE);
  const height = Math.round(width * ratio);
  // Firefox tekent een SVG zonder expliciete width/height niet op een canvas.
  const sized = /<svg\b[^>]*\swidth=/.test(svg) ? svg : svg.replace(/<svg\b/, `<svg width="${width}" height="${height}"`);
  const objectUrl = URL.createObjectURL(new Blob([sized], { type: 'image/svg+xml' }));
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('tekening niet geladen'));
      image.src = objectUrl;
    });
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) return undefined;
    context.drawImage(image, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return undefined;
    return { png: new Uint8Array(await blob.arrayBuffer()), width, height };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(key: string, url: string | undefined, widthPt: number): Promise<PdfImage | undefined> {
  if (!url) return Promise.resolve(undefined);
  let pending = imageCache.get(key);
  if (!pending) {
    pending = rasterise(url, widthPt).catch(() => undefined);
    imageCache.set(key, pending);
  }
  return pending;
}

export async function loadArcanaPdfAssets(primary: ArchetypeId): Promise<ArcanaPdfAssets> {
  const [fonts, emblem, ...chapters] = await Promise.all([
    loadFonts(),
    loadImage(`emblem:${primary}`, emblemUrl(primary), EMBLEM_WIDTH_PT),
    ...SECTION_GROUPS.map((group) => loadImage(`chapter:${group.id}`, chapterArtUrl(group.id), CHAPTER_WIDTH_PT)),
  ]);
  const images: ArcanaPdfAssets['images'] = {};
  if (emblem) images.emblem = emblem;
  SECTION_GROUPS.forEach((group, i) => {
    const art = chapters[i];
    if (art) images[group.id] = art;
  });
  return { fonts, images };
}
