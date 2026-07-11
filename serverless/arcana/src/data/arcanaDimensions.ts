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
  { id: 'stressWithdrawal', label: 'Stress: terugtrekken', description: 'onder druk stiller of afstandelijker worden.' },
  { id: 'stressControl', label: 'Stress: controleren', description: 'onder druk meer controle pakken.' },
  { id: 'stressAcceleration', label: 'Stress: versnellen', description: 'onder druk sneller of chaotischer worden.' },
  { id: 'stressFreeze', label: 'Stress: bevriezen', description: 'onder druk vastlopen.' },
  { id: 'shadowDefensiveness', label: 'Schaduw: verdedigen', description: 'kritiek wegduwen of rationaliseren.' },
  { id: 'shadowAvoidance', label: 'Schaduw: vermijden', description: 'lastige gevoelens, keuzes of waarheden uitstellen.' },
  { id: 'growthReadiness', label: 'Groeibereidheid', description: 'bereidheid om naar jezelf te kijken en te veranderen.' },
];

export const SUB_DIMENSION_IDS: SubDimensionId[] = SUB_DIMENSIONS.map((d) => d.id);

export interface MainDimensionDefinition {
  id: MainDimensionId;
  label: string;
}

export const MAIN_DIMENSIONS: MainDimensionDefinition[] = [
  { id: 'innerMotor', label: 'Innerlijke motor' },
  { id: 'socialPattern', label: 'Sociale energie' },
  { id: 'thinkingStyle', label: 'Denkstijl' },
  { id: 'emotionalSensitivityMain', label: 'Emotionele gevoeligheid' },
  { id: 'controlAndSecurity', label: 'Controle en zekerheid' },
  { id: 'conflictStyle', label: 'Conflictstijl' },
  { id: 'selfImage', label: 'Zelfbeeld' },
  { id: 'shadowPattern', label: 'Schaduwkant' },
  { id: 'relationshipPattern', label: 'Relatiepatroon' },
  { id: 'workStyle', label: 'Werkstijl' },
  { id: 'stressPattern', label: 'Stressreactie' },
  { id: 'growthPath', label: 'Groeipad' },
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
