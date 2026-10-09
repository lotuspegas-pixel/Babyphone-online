import type { ArchetypeId } from '../types/arcana';

/**
 * De illustraties van het rapport: de 12 archetype-emblemen en de 6
 * hoofdstukafbeeldingen. Het zijn <img>-bestanden (decoratief, alt=""), geen
 * inline SVG: elk bestand heeft eigen filters en ids, en zo blijft de HTML
 * klein en de tekening zelfstandig.
 *
 * Staat bewust niet in de landingsbundel: dit bestand wordt alleen door de
 * rapportcomponenten geïmporteerd, die als lazy chunk laden. Importeer het
 * nooit vanuit src/site/ of App.tsx (zie arcanaChunks.test.ts).
 *
 * Een ontbrekend bestand geeft `undefined`; de aanroepers renderen dan niets
 * in plaats van een kapot-afbeelding-icoon.
 */
const urls = (mods: Record<string, unknown>, prefix: string): Record<string, string> =>
  Object.fromEntries(
    Object.entries(mods).map(([path, url]) => [path.slice(path.lastIndexOf('/') + 1 + prefix.length).replace(/\.svg$/, ''), url as string]),
  );

const EMBLEMS = urls(
  import.meta.glob('../assets/art/emblems/emblem-*.svg', { eager: true, query: '?url', import: 'default' }),
  'emblem-',
);
const CHAPTERS = urls(
  import.meta.glob('../assets/art/secties/sectie-*.svg', { eager: true, query: '?url', import: 'default' }),
  'sectie-',
);

/** Het emblem van een hoofdarchetype (320×340, onderaan een leeg etiket voor de naam). */
export const emblemUrl = (id: ArchetypeId): string | undefined => EMBLEMS[id];

/** De hoofdstukafbeelding van een rapportdeel (420×380); `groupId` = `SECTION_GROUPS[i].id`. */
export const chapterArtUrl = (groupId: string): string | undefined => CHAPTERS[groupId];

/**
 * Een afbeelding die niet laadt neemt zijn hele omhulsel mee: nooit een
 * kapot-icoon in het rapport. Staat hier (en niet in een componentbestand)
 * omdat het bij de tekeningen hoort — en zo exporteren de componentbestanden
 * alleen componenten, wat Fast Refresh vraagt.
 */
export function hideOnError(event: { currentTarget: HTMLImageElement }) {
  event.currentTarget.parentElement?.style.setProperty('display', 'none');
}
