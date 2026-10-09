import { ARCHETYPES, STRESS_ARCHETYPES } from '../data/arcanaArchetypes';
import { emblemUrl, hideOnError } from '../data/arcanaArt';
import { STRESS_ARCHETYPE_MOTIFS } from '../data/arcanaMotifs';
import type { ArchetypeId, StressArchetypeId } from '../types/arcana';
import { ArcanaMotif } from './ArcanaMotif';

interface Props {
  primary: ArchetypeId;
  secondary: ArchetypeId;
  stress: StressArchetypeId;
  primaryScore: number;
  secondaryScore: number;
}

/**
 * Rendert alleen de kaartinhoud: de kaart-omhulling (gescheurde rand,
 * schaduw) wordt door de aanroeper (ArcanaReport) omheen gezet, zodat dezelfde
 * .arcana-card-shell/.arcana-card-clip-structuur voor alle rapportkaarten
 * identiek blijft.
 *
 * Drie "dossierkaarten" met dubbele rand en een titel die in de rand zit
 * (referentie: de "Agent"-kaart): het primaire en het secundaire archetype
 * met hun emblem, en het stress-archetype met zijn motief. Een emblem dat
 * ontbreekt of niet laadt valt weg; de kaart blijft dan gewoon tekst.
 */
export function ArcanaArchetypeCard({ primary, secondary, stress, primaryScore, secondaryScore }: Props) {
  const primaryDef = ARCHETYPES.find((a) => a.id === primary)!;
  const secondaryDef = ARCHETYPES.find((a) => a.id === secondary)!;
  const stressDef = STRESS_ARCHETYPES.find((s) => s.id === stress)!;
  const stressMotif = STRESS_ARCHETYPE_MOTIFS[stress];

  const emblem = (id: ArchetypeId) => {
    const url = emblemUrl(id);
    return url ? (
      <span className="arcana-agent__art" aria-hidden="true">
        <img src={url} alt="" width={320} height={340} decoding="async" onError={hideOnError} />
      </span>
    ) : null;
  };

  return (
    <>
      <span className="arcana-card-mark arcana-card-mark--stamp" aria-hidden="true" />
      <h3>Je archetypen</h3>
      <div className="arcana-archetype-card__grid">
        <div className="arcana-agent arcana-archetype-card__primary">
          <p className="arcana-agent__label">Primair archetype</p>
          <div className="arcana-agent__body">
            {emblem(primary)}
            <div>
              <h3>{primaryDef.name}</h3>
              <span className="arcana-archetype-card__score">{primaryScore}/100</span>
            </div>
          </div>
        </div>
        <div className="arcana-agent arcana-archetype-card__secondary">
          <p className="arcana-agent__label">Secundair archetype</p>
          <div className="arcana-agent__body">
            {emblem(secondary)}
            <div>
              <h4>{secondaryDef.name}</h4>
              <span className="arcana-archetype-card__score">{secondaryScore}/100</span>
            </div>
          </div>
        </div>
        <div className="arcana-agent arcana-archetype-card__stress">
          <p className="arcana-agent__label">Onder druk</p>
          <div className="arcana-agent__body">
            <span className="arcana-agent__art arcana-agent__art--motif" aria-hidden="true">
              <ArcanaMotif kind={stressMotif.motief} color={stressMotif.kleur} />
            </span>
            <div>
              <h4>{stressDef.name}</h4>
              <p className="arcana-fineprint">{stressDef.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
