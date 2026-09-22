import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import type { ArchetypeId, StressArchetypeId } from '../types/arcana';

interface Props {
  primary: ArchetypeId;
  secondary: ArchetypeId;
  stress: StressArchetypeId;
  primaryScore: number;
  secondaryScore: number;
}

/**
 * Rendert alleen de kaartinhoud: de kaart-omhulling (geknipte hoek,
 * accentbalk, drop-shadow) wordt door de aanroeper (ArcanaReport) omheen
 * gezet, zodat dezelfde .arcana-card-shell/.arcana-card-clip-structuur voor
 * alle rapportkaarten identiek blijft.
 */
export function ArcanaArchetypeCard({ primary, secondary, stress, primaryScore, secondaryScore }: Props) {
  const primaryDef = ARCHETYPES.find((a) => a.id === primary)!;
  const secondaryDef = ARCHETYPES.find((a) => a.id === secondary)!;
  const stressDef = STRESS_ARCHETYPES.find((s) => s.id === stress)!;

  return (
    <>
      <p className="arcana-card-kicker">
        <span className="arcana-card-mark" aria-hidden="true" />
        Profiel
      </p>
      <div className="arcana-archetype-card__grid">
        <div className="arcana-archetype-card__primary">
          <p className="arcana-eyebrow">Primair archetype</p>
          <h3>{primaryDef.name}</h3>
          <span className="arcana-archetype-card__score">{primaryScore}/100</span>
        </div>
        <div className="arcana-archetype-card__secondary">
          <p className="arcana-eyebrow">Secundair archetype</p>
          <h4>{secondaryDef.name}</h4>
          <span className="arcana-archetype-card__score">{secondaryScore}/100</span>
        </div>
        <div className="arcana-archetype-card__stress">
          <p className="arcana-eyebrow">Onder druk</p>
          <h4>{stressDef.name}</h4>
          <p className="arcana-fineprint">{stressDef.description}</p>
        </div>
      </div>
    </>
  );
}
