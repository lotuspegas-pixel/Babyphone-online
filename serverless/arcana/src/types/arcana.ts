export type SubDimensionId =
  | 'autonomyNeed'
  | 'securityNeed'
  | 'recognitionNeed'
  | 'meaningNeed'
  | 'connectionNeed'
  | 'socialEnergy'
  | 'solitudeNeed'
  | 'analyticalThinking'
  | 'intuitiveThinking'
  | 'creativeThinking'
  | 'practicalThinking'
  | 'emotionalSensitivity'
  | 'criticismSensitivity'
  | 'controlNeed'
  | 'perfectionism'
  | 'directness'
  | 'conflictAvoidance'
  | 'peoplePleasing'
  | 'trustNeed'
  | 'intimacyNeed'
  | 'independenceNeed'
  | 'selfDoubt'
  | 'selfConfidence'
  | 'stressWithdrawal'
  | 'stressControl'
  | 'stressAcceleration'
  | 'stressFreeze'
  | 'shadowDefensiveness'
  | 'shadowAvoidance'
  | 'growthReadiness';

export type MainDimensionId =
  | 'innerMotor'
  | 'socialPattern'
  | 'thinkingStyle'
  | 'emotionalSensitivityMain'
  | 'controlAndSecurity'
  | 'conflictStyle'
  | 'selfImage'
  | 'shadowPattern'
  | 'relationshipPattern'
  | 'workStyle'
  | 'stressPattern'
  | 'growthPath';

export type ArchetypeId =
  | 'theSeeker'
  | 'theArchitect'
  | 'theMirror'
  | 'theFlame'
  | 'theGuardian'
  | 'theAlchemist'
  | 'theStrategist'
  | 'theWoundedHealer'
  | 'theVisionary'
  | 'theAnchor'
  | 'thePerformer'
  | 'theHermit';

export type StressArchetypeId =
  | 'theController'
  | 'theVanisher'
  | 'theSprinter'
  | 'theFrozenOne'
  | 'thePleaser'
  | 'theDefender';

export type TensionId =
  | 'freedomVsSecurity'
  | 'recognitionVsIndependence'
  | 'controlVsSurrender'
  | 'connectionVsProtection'
  | 'depthVsLightness'
  | 'ambitionVsSelfDoubt'
  | 'intuitionVsEvidence'
  | 'careVsBoundaries'
  | 'creativityVsFinishing'
  | 'restVsImpact';

export interface WeightedTarget {
  target: SubDimensionId;
  weight: number;
}

export type QuestionType = 'likert' | 'forcedChoice' | 'scenario' | 'ranking';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
}

export interface LikertQuestion extends BaseQuestion {
  type: 'likert';
  targets: SubDimensionId[];
}

export interface ChoiceOption {
  key: string;
  text: string;
  targets: SubDimensionId[];
}

export interface ForcedChoiceQuestion extends BaseQuestion {
  type: 'forcedChoice';
  options: ChoiceOption[];
}

export interface ScenarioQuestion extends BaseQuestion {
  type: 'scenario';
  options: ChoiceOption[];
}

export interface RankingItem {
  key: string;
  text: string;
  targets: SubDimensionId[];
}

export interface RankingQuestion extends BaseQuestion {
  type: 'ranking';
  items: RankingItem[];
}

export type ArcanaQuestion =
  | LikertQuestion
  | ForcedChoiceQuestion
  | ScenarioQuestion
  | RankingQuestion;

export interface LikertAnswer {
  type: 'likert';
  questionId: string;
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface ForcedChoiceAnswer {
  type: 'forcedChoice';
  questionId: string;
  optionKey: string;
}

export interface ScenarioAnswer {
  type: 'scenario';
  questionId: string;
  optionKey: string;
}

export interface RankingAnswer {
  type: 'ranking';
  questionId: string;
  order: string[];
}

export type ArcanaAnswer =
  | LikertAnswer
  | ForcedChoiceAnswer
  | ScenarioAnswer
  | RankingAnswer;

export type ArcanaAnswerMap = Record<string, ArcanaAnswer>;

export interface SubDimensionScore {
  id: SubDimensionId;
  score: number;
  confidence: number;
  itemCount: number;
}

export interface MainDimensionScore {
  id: MainDimensionId;
  score: number;
}

export interface ArchetypeScore {
  id: ArchetypeId;
  score: number;
}

export interface ArcanaTension {
  id: TensionId;
  scoreA: number;
  scoreB: number;
  active: boolean;
  intense: boolean;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface ResponseQuality {
  completionRate: number;
  straightLiningRisk: boolean;
  contradictionRisk: boolean;
  socialDesirabilityRisk: boolean;
  confidenceLevel: ConfidenceLevel;
  notes: string[];
}

export interface ArcanaScoreResult {
  subDimensions: Record<SubDimensionId, SubDimensionScore>;
  mainDimensions: Record<MainDimensionId, MainDimensionScore>;
  archetypeScores: Record<ArchetypeId, ArchetypeScore>;
  primaryArchetype: ArchetypeId;
  secondaryArchetype: ArchetypeId;
  stressArchetype: StressArchetypeId;
  tensions: ArcanaTension[];
  responseQuality: ResponseQuality;
  /**
   * Stabiele sleutel, afgeleid uit de antwoorden, waarmee de rapportgenerator
   * kiest tussen gelijkwaardige formuleringen. Zelfde antwoorden → zelfde seed
   * → zelfde rapport.
   */
  variantSeed: number;
}

export interface ArcanaReportSection {
  id: string;
  title: string;
  intro: string;
  paragraphs: string[];
  bullets: string[];
}

/** Hoe iemand aangesproken wil worden in het rapport. */
export type AddressForm = 'je' | 'u';

export type LifePhase = 'onbekend' | 'tot25' | 'van25tot40' | 'van40tot55' | 'vanaf55';

/**
 * Vrijwillige gegevens die alleen dienen om het rapport persoonlijk te maken.
 * Blijven, net als de antwoorden, uitsluitend in localStorage.
 */
export interface ArcanaProfile {
  name: string;
  addressForm: AddressForm;
  lifePhase: LifePhase;
}

export interface ArcanaReportMeta {
  generatedAt: string;
  version: string;
  responseQuality: ResponseQuality;
  profile: ArcanaProfile;
}

export interface ArcanaReport {
  meta: ArcanaReportMeta;
  archetypes: {
    primary: ArchetypeId;
    secondary: ArchetypeId;
    stress: StressArchetypeId;
  };
  scores: {
    subDimensions: Record<SubDimensionId, SubDimensionScore>;
    mainDimensions: Record<MainDimensionId, MainDimensionScore>;
    archetypeScores: Record<ArchetypeId, ArchetypeScore>;
  };
  tensions: ArcanaTension[];
  sections: ArcanaReportSection[];
}
