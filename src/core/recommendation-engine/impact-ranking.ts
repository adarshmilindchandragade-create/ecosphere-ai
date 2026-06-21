import type { Recommendation } from './recommendation-types';

const impactWeight = { high: 3, medium: 2, low: 1 };

export function rankOpportunities(recommendations: Recommendation[]): Recommendation[] {
  return [...recommendations].sort((a, b) =>
    (impactWeight[b.impact] * b.confidence * b.carbonSaved) -
    (impactWeight[a.impact] * a.confidence * a.carbonSaved)
  );
}
