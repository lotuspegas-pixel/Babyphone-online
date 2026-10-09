import { ARCHETYPES } from '../data/arcanaArchetypes';
import { emblemUrl, hideOnError } from '../data/arcanaArt';
import type { ArchetypeId } from '../types/arcana';

interface Props {
  archetype: ArchetypeId;
  className?: string;
}

/**
 * Het emblem van een hoofdarchetype op zijn "podium": een groot dieprood vlak
 * en een gescheurd papierstuk erachter, het emblem erboven en de archetypenaam
 * als echte tekst op het lege etiket onderin de tekening. Zo blijft de naam
 * doorzoekbaar en meeschaalbaar (zie `container-type` in de CSS).
 *
 * Puur decoratief en aria-hidden: de naam staat al in de kop ernaast. Zonder
 * tekeningbestand rendert dit niets.
 */
export function ArcanaReportEmblem({ archetype, className }: Props) {
  const url = emblemUrl(archetype);
  const name = ARCHETYPES.find((a) => a.id === archetype)?.name;
  if (!url || !name) return null;

  return (
    <div className={`arcana-emblem${className ? ` ${className}` : ''}`} aria-hidden="true">
      <span className="arcana-emblem__disc" />
      <span className="arcana-emblem__paper arcana-torn" />
      <img className="arcana-emblem__art" src={url} alt="" width={320} height={340} decoding="async" onError={hideOnError} />
      <span className="arcana-emblem__name">{name}</span>
    </div>
  );
}
