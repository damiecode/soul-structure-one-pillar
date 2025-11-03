export enum PillarState {
  Strong = "Strong",
  Growing = "Growing",
  Unsteady = "Unsteady",
  Fragile = "Fragile",
}

export interface ScoreInterpretation {
  state: PillarState;
  narrative: string;
  color: string;
}

export interface AssessmentQuestion {
  text: string;
  reverseCoded: boolean;
}

export interface Result {
  score: number;
  interpretation: ScoreInterpretation;
  categoryScores: Record<string, number>;
}
