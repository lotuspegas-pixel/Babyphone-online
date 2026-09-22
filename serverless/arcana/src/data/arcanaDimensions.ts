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

export interface MainDimensionDefinition {
  id: MainDimensionId;
  label: string;
  /**
   * Wat een hoge score op deze dimensie betekent, in gewone taal. Staat naast
   * het cijfer in het portret, zodat een dimensienaam nooit een kaal etiket is.
   */
  meaning: string;
  /**
   * Vaste tint van deze dimensie in het portret. De twaalf lopen als één reeks
   * van diep indigo via jade en oker naar karmijn; de kleur hoort bij de plaats
   * in de cirkel en zegt niets over hoog of laag. Niet los aanpassen: de reeks
   * werkt alleen als geheel.
   */
  color: string;
}

export const MAIN_DIMENSIONS: MainDimensionDefinition[] = [
  {
    id: 'innerMotor',
    label: 'Innerlijke motor',
    meaning: 'Hoe hard je motor draait als niemand je aanzet.',
    color: '#33386b',
  },
  {
    id: 'socialPattern',
    label: 'Sociale energie',
    meaning: 'Of je oplaadt bij mensen of juist alleen.',
    color: '#33527a',
  },
  {
    id: 'thinkingStyle',
    label: 'Denkstijl',
    meaning: 'Hoeveel je eerst uitrekent voor je iets vindt.',
    color: '#2f6b78',
  },
  {
    id: 'emotionalSensitivityMain',
    label: 'Emotionele gevoeligheid',
    meaning: 'Hoe hard gevoelens van anderen binnenkomen.',
    color: '#2f7f6d',
  },
  {
    id: 'controlAndSecurity',
    label: 'Controle en zekerheid',
    meaning: 'Hoeveel je zelf wilt sturen.',
    color: '#4c8a5b',
  },
  {
    id: 'conflictStyle',
    label: 'Conflictstijl',
    meaning: 'Of je de confrontatie opzoekt of ontwijkt.',
    color: '#75934f',
  },
  {
    id: 'selfImage',
    label: 'Zelfbeeld',
    meaning: 'Hoe stevig je over jezelf denkt.',
    color: '#9a9349',
  },
  {
    id: 'shadowPattern',
    label: 'Schaduwkant',
    meaning: 'Hoe vaak je afgeweerde kant meespeelt zonder dat je het merkt.',
    color: '#b58b41',
  },
  {
    id: 'relationshipPattern',
    label: 'Relatiepatroon',
    meaning: 'Hoe dichtbij je mensen laat komen.',
    color: '#bf7540',
  },
  {
    id: 'workStyle',
    label: 'Werkstijl',
    meaning: 'Hoeveel structuur je aanbrengt.',
    color: '#b85a41',
  },
  {
    id: 'stressPattern',
    label: 'Stressreactie',
    meaning: 'Wat er als eerste gebeurt zodra de druk oploopt.',
    color: '#a6423f',
  },
  {
    id: 'growthPath',
    label: 'Groeipad',
    meaning: 'Hoe makkelijk je van richting verandert.',
    color: '#8e3350',
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
