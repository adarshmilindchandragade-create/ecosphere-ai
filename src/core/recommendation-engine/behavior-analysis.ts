import type { Breakdown } from '../../types';
import type { BehaviorSignal } from './recommendation-types';

export function analyzeBehavior(breakdown: Breakdown): BehaviorSignal[] {
  const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0) || 1;
  return (Object.entries(breakdown) as [keyof Breakdown, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([category, value], index) => ({
      category,
      value,
      share: Math.round((value / total) * 100),
      rank: index + 1,
    }));
}
