// GEGENEREERD door scripts/bereid-archetypepaginas.mjs — niet met de hand aanpassen.
import type { ArchetypeId } from '../types/arcana';
import theHermit from '../assets/art/archetypes/pagina-theHermit.webp';
import theSeeker from '../assets/art/archetypes/pagina-theSeeker.webp';
import theArchitect from '../assets/art/archetypes/pagina-theArchitect.webp';
import theMirror from '../assets/art/archetypes/pagina-theMirror.webp';
import theFlame from '../assets/art/archetypes/pagina-theFlame.webp';
import theGuardian from '../assets/art/archetypes/pagina-theGuardian.webp';
import theAlchemist from '../assets/art/archetypes/pagina-theAlchemist.webp';
import theStrategist from '../assets/art/archetypes/pagina-theStrategist.webp';
import theWoundedHealer from '../assets/art/archetypes/pagina-theWoundedHealer.webp';
import theVisionary from '../assets/art/archetypes/pagina-theVisionary.webp';
import theAnchor from '../assets/art/archetypes/pagina-theAnchor.webp';
import thePerformer from '../assets/art/archetypes/pagina-thePerformer.webp';

export interface ArchetypePagina {
  src: string;
  width: number;
  height: number;
}

export const ARCHETYPE_PAGINA: Record<ArchetypeId, ArchetypePagina> = {
  theHermit: { src: theHermit, width: 1000, height: 1250 },
  theSeeker: { src: theSeeker, width: 1000, height: 1413 },
  theArchitect: { src: theArchitect, width: 1000, height: 1413 },
  theMirror: { src: theMirror, width: 1000, height: 1413 },
  theFlame: { src: theFlame, width: 1000, height: 1413 },
  theGuardian: { src: theGuardian, width: 1000, height: 1413 },
  theAlchemist: { src: theAlchemist, width: 1000, height: 1413 },
  theStrategist: { src: theStrategist, width: 1000, height: 1413 },
  theWoundedHealer: { src: theWoundedHealer, width: 1000, height: 1413 },
  theVisionary: { src: theVisionary, width: 1000, height: 1413 },
  theAnchor: { src: theAnchor, width: 1000, height: 1413 },
  thePerformer: { src: thePerformer, width: 1000, height: 1250 },
};
