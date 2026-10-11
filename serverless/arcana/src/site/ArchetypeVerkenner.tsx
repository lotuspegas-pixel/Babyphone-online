import { useRef, useState } from 'react';
import { ARCHETYPES } from '../data/arcanaArchetypes';
import { SUB_DIMENSIONS } from '../data/arcanaDimensions';
import type { ArchetypeId } from '../types/arcana';
import { ARCHETYPE_PAGINA } from './archetypePaginas';
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
 * Bij elke naam hoort ook de ontworpen archetypepagina. Die staat als beeld
 * onder de tekst en opent op volledige grootte in een dialoog: de tekst in het
 * ontwerp is op schermbreedte klein, op volle grootte goed te lezen. Alleen de
 * gekozen pagina wordt geladen (zie `voorlaad`).
 *
 * Radio's en geen knoppen: dan regelt de browser de pijltjestoetsen, de
 * rolverdeling en het voorlezen zelf, en hoeft hier geen toetsenbordcode te
 * staan die toch net anders werkt dan mensen gewend zijn.
 */

const LABEL = new Map(SUB_DIMENSIONS.map((d) => [d.id, d.label]));

/** Een pagina is ~170 KB; die van een naam waar je naartoe gaat halen we alvast binnen. */
const voorgeladen = new Set<ArchetypeId>();
function voorlaad(id: ArchetypeId) {
  if (voorgeladen.has(id)) return;
  voorgeladen.add(id);
  new Image().src = ARCHETYPE_PAGINA[id].src;
}

export function ArchetypeVerkenner() {
  const [actief, setActief] = useState<ArchetypeId>(ARCHETYPES[0].id);
  const groot = useRef<HTMLDialogElement>(null);
  const gekozen = ARCHETYPES.find((a) => a.id === actief) ?? ARCHETYPES[0];
  const pagina = ARCHETYPE_PAGINA[gekozen.id];

  return (
    <div className="verkenner">
      <fieldset className="verkenner__index">
        <legend className="arcana-sr-only">{ARCHETYPE_VERKENNER.keuzeLabel}</legend>
        {ARCHETYPES.map((archetype) => (
          <label
            key={archetype.id}
            className="verkenner__regel"
            onPointerEnter={() => voorlaad(archetype.id)}
            onFocus={() => voorlaad(archetype.id)}
          >
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

        <figure className="verkenner__pagina" key={gekozen.id}>
          <button
            type="button"
            className="verkenner__pagina-knop"
            onClick={() => groot.current?.showModal()}
            aria-label={`Vergroot de archetypepagina van ${gekozen.name}`}
          >
            <img
              src={pagina.src}
              alt={`Ontwerp van de archetypepagina van ${gekozen.name}`}
              width={pagina.width}
              height={pagina.height}
              decoding="async"
            />
          </button>
          <figcaption>Archetypepagina, klik om te vergroten</figcaption>
        </figure>
      </article>

      {/* Native dialoog: Escape, focusval en teruggeven van de focus regelt de
          browser. Klikken naast de pagina sluit hem ook. */}
      <dialog
        ref={groot}
        className="verkenner__groot"
        aria-label={`Archetypepagina ${gekozen.name}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) groot.current?.close();
        }}
      >
        <button
          type="button"
          className="verkenner__sluit arcana-button arcana-button--primary"
          onClick={() => groot.current?.close()}
        >
          Sluiten
        </button>
        <img src={pagina.src} alt="" width={pagina.width} height={pagina.height} />
      </dialog>
    </div>
  );
}
