
export type Gender = 'mujer' | 'hombre';

export interface Option {
  label: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  description?: string;
  options: Option[];
}

export interface TreatmentLevel {
  name: string;
  sessions: number;
  price: number;
  description: string;
  idealFor: string;
}

export type RecommendationType = 'Prevention' | 'Level 1' | 'Level 2' | 'Level 3';

export interface AssessmentResult {
  score: number;
  recommendation: RecommendationType;
  treatment: TreatmentLevel;
  gender: Gender;
}
