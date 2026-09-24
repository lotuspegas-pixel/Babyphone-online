import type { ArchetypeId, StressArchetypeId } from '../types/arcana';
import type { MotifKind } from '../components/ArcanaMotif';

/**
 * Welk motief en welke familiekleur bij elk archetype hoort — de ene bron
 * die de rapport-voorpagina, de hoofdstukopeners en het PDF-voorblad allemaal
 * gebruiken, zodat "The Seeker" overal hetzelfde beeld en dezelfde kleur
 * draagt. Handmatig gecureerd (dezelfde aanpak als de bestaande
 * dimensiefamilies in tokens.css), niet automatisch afgeleid uit de
 * scoreformules: vier archetypes delen soms een formule-zwaartepunt maar
 * lezen inhoudelijk heel verschillend.
 *
 * De vier kleuren zijn de bestaande, al AA-geverifieerde familie-ankers uit
 * tokens.css (--fam-motor/--fam-contact/--fam-grip/--fam-zelf) — geen nieuwe
 * kleuren, dus geen nieuwe contrastmeting nodig.
 */
export interface ArcanaMotifDef {
  motief: MotifKind;
  /** CSS custom property, bv. 'var(--fam-motor)'. */
  kleur: string;
}

const MOTOR = 'var(--fam-motor)';
const CONTACT = 'var(--fam-contact)';
const GRIP = 'var(--fam-grip)';
const ZELF = 'var(--fam-zelf)';

export const ARCHETYPE_MOTIFS: Record<ArchetypeId, ArcanaMotifDef> = {
  theSeeker: { motief: 'doorgang', kleur: ZELF },
  theArchitect: { motief: 'brein', kleur: MOTOR },
  theMirror: { motief: 'kompas', kleur: CONTACT },
  theFlame: { motief: 'vlam', kleur: GRIP },
  theGuardian: { motief: 'kompas', kleur: CONTACT },
  theAlchemist: { motief: 'doorgang', kleur: GRIP },
  theStrategist: { motief: 'brein', kleur: MOTOR },
  theWoundedHealer: { motief: 'doorgang', kleur: CONTACT },
  theVisionary: { motief: 'vlam', kleur: MOTOR },
  theAnchor: { motief: 'kompas', kleur: GRIP },
  thePerformer: { motief: 'vlam', kleur: ZELF },
  theHermit: { motief: 'doorgang', kleur: MOTOR },
};

export const STRESS_ARCHETYPE_MOTIFS: Record<StressArchetypeId, ArcanaMotifDef> = {
  theController: { motief: 'brein', kleur: GRIP },
  theVanisher: { motief: 'doorgang', kleur: CONTACT },
  theSprinter: { motief: 'vlam', kleur: GRIP },
  theFrozenOne: { motief: 'doorgang', kleur: ZELF },
  thePleaser: { motief: 'kompas', kleur: CONTACT },
  theDefender: { motief: 'brein', kleur: ZELF },
};
