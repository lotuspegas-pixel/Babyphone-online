import { useState } from 'react';
import { ARCHETYPES } from '../data/arcanaArchetypes';
import { SUB_DIMENSIONS } from '../data/arcanaDimensions';
import type { ArchetypeId } from '../types/arcana';
import { ARCHETYPE_VERKENNER } from './siteContent';

/**
 * De twaalf archetypen om zelf door te lopen.
 *
 * Het punt van dit blok is niet dat je jezelf hier al kunt herkennen — dat kan
 * niet, want je hebt nog niets ingevuld. Het punt is dat je ziet dat een
 * archetype geen etiket is maar een optelsom: bij elke naam staat uit welke
 * vier gemeten eigenschappen hij volgt. Dat is dezelfde belofte als de rest van
 * de pagina (je kunt het narekenen), maar dan aanraakbaar.
 *
 * Radio's en geen knoppen: dan regelt de browser de pijltjestoetsen, de
 * rolverdeling en het voorlezen zelf, en hoeft hier geen toetsenbordcode te
 * staan die toch net anders werkt dan mensen gewend zijn.
 */

const LABEL = new Map(SUB_DIMENSIONS.map((d) => [d.id, d.label]));

/**
 * De twaalf emblemen als bestands-URL's (geen JS: Vite maakt er alleen hashes
 * van). Hier een eigen glob en niet src/data/arcanaArt.ts: dat bestand hoort
 * bij de lazy rapportchunk en mag niet in de landing komen.
 */
const EMBLEMEN = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/art/emblems/emblem-*.svg', { eager: true, query: '?url', import: 'default' })).map(
    ([pad, url]) => [pad.slice(pad.lastIndexOf('emblem-') + 'emblem-'.length).replace(/\.svg$/, ''), url as string],
  ),
) as Record<string, string>;

export function ArchetypeVerkenner() {
  const [actief, setActief] = useState<ArchetypeId>(ARCHETYPES[0].id);
  const gekozen = ARCHETYPES.find((a) => a.id === actief) ?? ARCHETYPES[0];

  return (
    <div className="verkenner">
      <fieldset className="verkenner__index">
        <legend className="arcana-sr-only">{ARCHETYPE_VERKENNER.keuzeLabel}</legend>
        {ARCHETYPES.map((archetype) => (
          <label key={archetype.id} className="verkenner__regel">
            <input
              type="radio"
              name="archetype"
              value={archetype.id}
              checked={archetype.id === actief}
              onChange={() => setActief(archetype.id)}
            />
            <span className="verkenner__naam">{archetype.name}</span>
          </label>
        ))}
      </fieldset>

      {/* Eén blad dat van inhoud wisselt. aria-live zorgt dat een schermlezer
          de nieuwe tekst hoort nadat de keuze is voorgelezen. */}
      <article className="verkenner__blad" aria-live="polite">
        {EMBLEMEN[gekozen.id] && (
          <div className="arcana-emblem verkenner__embleem" aria-hidden="true" key={gekozen.id}>
            <span className="arcana-emblem__disc" />
            <span className="arcana-emblem__paper arcana-torn" />
            <img className="arcana-emblem__art" src={EMBLEMEN[gekozen.id]} alt="" width={320} height={340} decoding="async" />
            <span className="arcana-emblem__name">{gekozen.name}</span>
          </div>
        )}
        <h3 className="verkenner__blad-kop">{gekozen.name}</h3>

        <p className="verkenner__formule">
          <span className="verkenner__formule-kop">{ARCHETYPE_VERKENNER.formuleKop}</span>
          {gekozen.formula.map((id) => (
            <span key={id} className="verkenner__term">
              {LABEL.get(id) ?? id}
            </span>
          ))}
        </p>

        <p className="verkenner__tekst">{gekozen.baseText}</p>
      </article>
    </div>
  );
}
