import type { Breakdown, FootprintInput } from '../../types';

export type ImpactLevel = 'high' | 'medium' | 'low';
export type EmissionCategory = keyof Breakdown;

export type HabitProfile = FootprintInput & {
  metroDays: number;
  vegetarianDays: number;
  energyReduction: number;
};

export type Recommendation = {
  category: EmissionCategory;
  impact: ImpactLevel;
  confidence: number;
  carbonSaved: number;
  moneySaved: number;
  recommendation: string;
  reasoning: string;
  evidence: string;
};

export type BehaviorSignal = {
  category: EmissionCategory;
  value: number;
  share: number;
  rank: number;
};
