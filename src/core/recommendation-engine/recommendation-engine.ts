/**
 * EcoSphere AI — Recommendation Engine
 *
 * Generates personalized, evidence-based recommendations
 * ranked by impact × confidence × feasibility.
 */

import type { Breakdown, FootprintInput } from '../../types';
import { analyzeBehavior } from './behavior-analysis';
import { rankOpportunities } from './impact-ranking';
import type { Recommendation } from './recommendation-types';

export function generateRecommendations(
  input: FootprintInput,
  breakdown: Breakdown,
): Recommendation[] {
  const signals = analyzeBehavior(breakdown);
  const share = (category: keyof Breakdown) =>
    signals.find((s) => s.category === category)?.share ?? 0;

  const recommendations: Recommendation[] = [
    {
      category: 'transport',
      impact: input.carKm >= 15 ? 'high' : 'medium',
      confidence: 92,
      carbonSaved: Math.round(input.carKm * 8 * 0.12),
      moneySaved: Math.round(input.carKm * 8 * 4.05),
      recommendation: `You travel ${input.carKm} km daily by car. Replacing Tuesday and Thursday commutes with metro travel could reduce monthly emissions by approximately ${Math.round(input.carKm * 8 * 0.12)} kg CO₂e while saving ₹${Math.round(input.carKm * 8 * 4.05)}.`,
      reasoning: 'Repeated car commutes are your most consistent high-emission habit.',
      evidence: `Transport represents ${share('transport')}% of your measured footprint.`,
    },
    {
      category: 'energy',
      impact: input.electricityKwh > 160 ? 'high' : 'medium',
      confidence: 87,
      carbonSaved: Math.round(input.electricityKwh * 0.1 * 0.708),
      moneySaved: Math.round(input.electricityKwh * 0.1 * 7.2),
      recommendation: `Reducing electricity use by 10% through AC scheduling and standby control could save ${Math.round(input.electricityKwh * 0.1 * 0.708)} kg CO₂e and about ₹${Math.round(input.electricityKwh * 0.1 * 7.2)} each month.`,
      reasoning:
        'Your monthly electricity use is above the efficient household target used by the model.',
      evidence: `Home energy contributes ${share('energy')}% of your footprint at ${input.electricityKwh} kWh/month.`,
    },
    {
      category: 'food',
      impact: input.diet === 'meat' ? 'high' : 'medium',
      confidence: 84,
      carbonSaved: input.diet === 'plant' ? 5 : 18,
      moneySaved: input.diet === 'plant' ? 120 : 480,
      recommendation:
        input.diet === 'plant'
          ? 'You already eat plant-forward. Choosing local, seasonal produce twice weekly can trim another 5 kg CO₂e.'
          : 'Making Tuesday and Friday lunches vegetarian could save approximately 18 kg CO₂e and ₹480 each month.',
      reasoning:
        'Two predictable meal swaps are easier to sustain than a complete diet change.',
      evidence: `Food accounts for ${share('food')}% of your current footprint.`,
    },
  ];

  return rankOpportunities(recommendations);
}
