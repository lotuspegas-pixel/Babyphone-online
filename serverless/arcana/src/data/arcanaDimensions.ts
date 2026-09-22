import type { MainDimensionId, SubDimensionId } from '../types/arcana';

export interface SubDimensionDefinition {
  id: SubDimensionId;
  label: string;
  description: string;
}

export const SUB_DIMENSIONS: SubDimensionDefinition[] = [
  { id: 'autonomyNeed', label: 'Autonomie', description: 'behoefte aan vrijheid, ruimte en eigen richting.' },
  { id: 'securityNeed', label: 'Zekerheid', description: 'behoefte aan zekerheid, rust en voorspelbaarheid.' },
  { id: 'recognitionNeed', label: 'Erkenning', description: 'behoefte om gezien en gewaardeerd te worden.' },
  { id: 'meaningNeed', label: 'Betekenis', description: 'behoefte aan betekenis, diepgang en richting.' },
  { id: 'connectionNeed', label: 'Verbinding', description: 'behoefte aan verbinding, nabijheid en menselijk contact.' },
  { id: 'socialEnergy', label: 'Sociale energie', description: 'energie uit sociale interactie.' },
  { id: 'solitudeNeed', label: 'Behoefte aan stilte', description: 'behoefte aan stilte, afzondering en herstelruimte.' },
  { id: 'analyticalThinking', label: 'Analytisch denken', description: 'denken via logica, bewijs en analyse.' },
  { id: 'intuitiveThinking', label: 'Intuïtief denken', description: 'denken via gevoel, patronen en onderlagen.' },
  { id: 'creativeThinking', label: 'Creatief denken', description: 'denken in mogelijkheden en nieuwe combinaties.' },
  { id: 'practicalThinking', label: 'Praktisch denken', description: 'denken in uitvoering en concrete stappen.' },
  { id: 'emotionalSensitivity', label: 'Emotionele gevoeligheid', description: 'gevoeligheid voor sfeer, emoties en spanning.' },
  { id: 'criticismSensitivity', label: 'Kritiekgevoeligheid', description: 'gevoeligheid voor kritiek of afwijzing.' },
  { id: 'controlNeed', label: 'Controlebehoefte', description: 'behoefte aan grip, planning en controle.' },
  { id: 'perfectionism', label: 'Perfectionisme', description: 'hoge eisen, fouten willen voorkomen.' },
  { id: 'directness', label: 'Directheid', description: 'duidelijk en confronterend communiceren.' },
  { id: 'conflictAvoidance', label: 'Conflictvermijding', description: 'spanning of ruzie vermijden.' },
  { id: 'peoplePleasing', label: 'Pleasen', description: 'anderen tevreden houden ten koste van eigen grenzen.' },
  { id: 'trustNeed', label: 'Vertrouwensbehoefte', description: 'veiligheid nodig hebben voordat iemand zich opent.' },
  { id: 'intimacyNeed', label: 'Intimiteitsbehoefte', description: 'behoefte aan diepe, echte verbinding.' },
  { id: 'independenceNeed', label: 'Onafhankelijkheid', description: 'behoefte om niet afhankelijk te zijn.' },
  { id: 'selfDoubt', label: 'Zelftwijfel', description: 'twijfelen, heroverwegen en innerlijke onzekerheid.' },
  { id: 'selfConfidence', label: 'Zelfvertrouwen', description: 'vertrouwen in eigen oordeel en kracht.' },
  { id: 'stressWithdrawal', label: 'Terugtrekken onder druk', description: 'onder druk stiller of afstandelijker worden.' },
  { id: 'stressControl', label: 'Grip zoeken onder druk', description: 'onder druk meer controle pakken.' },
  { id: 'stressAcceleration', label: 'Versnellen onder druk', description: 'onder druk sneller of chaotischer worden.' },
  { id: 'stressFreeze', label: 'Vastlopen onder druk', description: 'onder druk vastlopen.' },
  { id: 'shadowDefensiveness', label: 'Jezelf verdedigen bij kritiek', description: 'kritiek wegduwen of rationaliseren.' },
  { id: 'shadowAvoidance', label: 'Uitstellen wat ongemakkelijk is', description: 'lastige gevoelens, keuzes of waarheden uitstellen.' },
  { id: 'growthReadiness', label: 'Groeibereidheid', description: 'bereidheid om naar jezelf te kijken en te veranderen.' },
];

export const SUB_DIMENSION_IDS: SubDimensionId[] = SUB_DIMENSIONS.map((d) => d.id);

/**
 * Vier families van drie. Twaalf losse kleuren zijn onder kleurenblindheid
 * niet uit elkaar te houden (het theoretische plafond ligt op ΔE2000 ≈ 10,6);
 * vier families wél. De kleur draagt daarom de familie, de lichtheid het lid
 * binnen de familie, en het symbool is de drager die ook zonder kleur werkt —
 * in zwart-wit print, in de tekstexport, voor wie kleuren niet onderscheidt.
 * Onderbouwing en metingen: docs/rebuild/B-designrichting.md §3.
 */
export type DimensionFamilyId = 'motor' | 'contact' | 'grip' | 'zelf';

export interface DimensionFamily {
  id: DimensionFamilyId;
  label: string;
  /** Vier vormen die op afstand en in monochroom te onderscheiden zijn. */
  symbol: '◆' | '●' | '▲' | '■';
  /** Wat de familie inhoudelijk bindt; volgt de zesdelige rapportstructuur. */
  meaning: string;
}

export const DIMENSION_FAMILIES: Record<DimensionFamilyId, DimensionFamily> = {
  motor: { id: 'motor', label: 'Motor en richting', symbol: '◆', meaning: 'wat je aandrijft en hoe je denkt en werkt' },
  contact: { id: 'contact', label: 'Contact', symbol: '●', meaning: 'hoe je je tot anderen verhoudt' },
  grip: { id: 'grip', label: 'Grip', symbol: '▲', meaning: 'wat je doet als het spannend wordt' },
  zelf: { id: 'zelf', label: 'Zelf', symbol: '■', meaning: 'hoe je naar jezelf kijkt en verandert' },
};

export interface MainDimensionDefinition {
  id: MainDimensionId;
  label: string;
  /**
   * Wat een hoge score op deze dimensie betekent, in gewone taal. Staat naast
   * het cijfer in het portret, zodat een dimensienaam nooit een kaal etiket is.
   */
  meaning: string;
  family: DimensionFamilyId;
  /**
   * De CSS-variabele die de kleur draagt — géén hex. De waarde staat in
   * src/styles/tokens.css, twee keer: licht en donker, beide gemeten op AA.
   * Zo volgt het portret de donkere modus zonder eigen kleurlogica.
   */
  token: `--dim-${string}`;
}

/*
 * De volgorde hieronder is de vaste volgorde op het wiel (1 = twaalf uur, dan
 * met de klok mee) én in elke lijst: per familie gegroepeerd, zodat het wiel
 * vier kwadranten toont in plaats van een regenboog zonder betekenis
 * (B-designrichting §3.2). De rapportgenerator leest deze array niet, dus de
 * volgorde raakt geen zin en geen score — de gouden master is er blind voor.
 */
export const MAIN_DIMENSIONS: MainDimensionDefinition[] = [
  {
    id: 'innerMotor',
    label: 'Innerlijke motor',
    meaning: 'Hoe hard je motor draait als niemand je aanzet.',
    family: 'motor',
    token: '--dim-innerlijke-motor',
  },
  {
    id: 'thinkingStyle',
    label: 'Denkstijl',
    meaning: 'Hoeveel je eerst uitrekent voor je iets vindt.',
    family: 'motor',
    token: '--dim-denkstijl',
  },
  {
    id: 'workStyle',
    label: 'Werkstijl',
    meaning: 'Hoeveel structuur je aanbrengt.',
    family: 'motor',
    token: '--dim-werkstijl',
  },
  {
    id: 'socialPattern',
    label: 'Sociale energie',
    meaning: 'Of je oplaadt bij mensen of juist alleen.',
    family: 'contact',
    token: '--dim-sociale-energie',
  },
  {
    id: 'emotionalSensitivityMain',
    label: 'Emotionele gevoeligheid',
    meaning: 'Hoe hard gevoelens van anderen binnenkomen.',
    family: 'contact',
    token: '--dim-emotionele-gevoeligheid',
  },
  {
    id: 'relationshipPattern',
    label: 'Relatiepatroon',
    meaning: 'Hoe dichtbij je mensen laat komen.',
    family: 'contact',
    token: '--dim-relatiepatroon',
  },
  {
    id: 'controlAndSecurity',
    label: 'Controle en zekerheid',
    meaning: 'Hoeveel je zelf wilt sturen.',
    family: 'grip',
    token: '--dim-controle-zekerheid',
  },
  {
    id: 'conflictStyle',
    label: 'Conflictstijl',
    meaning: 'Of je de confrontatie opzoekt of ontwijkt.',
    family: 'grip',
    token: '--dim-conflictstijl',
  },
  {
    id: 'stressPattern',
    label: 'Stressreactie',
    meaning: 'Wat er als eerste gebeurt zodra de druk oploopt.',
    family: 'grip',
    token: '--dim-stressreactie',
  },
  {
    id: 'selfImage',
    label: 'Zelfbeeld',
    meaning: 'Hoe stevig je over jezelf denkt.',
    family: 'zelf',
    token: '--dim-zelfbeeld',
  },
  {
    id: 'shadowPattern',
    label: 'Schaduwkant',
    meaning: 'Hoe vaak je afgeweerde kant meespeelt zonder dat je het merkt.',
    family: 'zelf',
    token: '--dim-schaduwkant',
  },
  {
    id: 'growthPath',
    label: 'Groeipad',
    meaning: 'Hoe makkelijk je van richting verandert.',
    family: 'zelf',
    token: '--dim-groeipad',
  },
];

export const TENSION_DEFINITIONS = [
  { id: 'freedomVsSecurity', label: 'Vrijheid versus zekerheid', a: 'autonomyNeed', b: 'securityNeed' },
  { id: 'recognitionVsIndependence', label: 'Erkenning versus onafhankelijkheid', a: 'recognitionNeed', b: 'independenceNeed' },
  { id: 'controlVsSurrender', label: 'Controle versus overgave', a: 'controlNeed', b: 'emotionalSensitivity' },
  { id: 'connectionVsProtection', label: 'Verbinding versus bescherming', a: 'connectionNeed', b: 'trustNeed' },
  { id: 'depthVsLightness', label: 'Diepgang versus luchtigheid', a: 'meaningNeed', b: 'solitudeNeed' },
  { id: 'ambitionVsSelfDoubt', label: 'Ambitie versus zelftwijfel', a: 'recognitionNeed', b: 'selfDoubt' },
  { id: 'intuitionVsEvidence', label: 'Intuïtie versus bewijsdrang', a: 'intuitiveThinking', b: 'analyticalThinking' },
  { id: 'careVsBoundaries', label: 'Zorg voor anderen versus eigen grenzen', a: 'peoplePleasing', b: 'connectionNeed' },
  { id: 'creativityVsFinishing', label: 'Creativiteit versus afmaken', a: 'creativeThinking', b: 'perfectionism' },
  { id: 'restVsImpact', label: 'Rust versus impact', a: 'solitudeNeed', b: 'recognitionNeed' },
] as const;
