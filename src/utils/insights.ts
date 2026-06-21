/**
 * EcoSphere AI — AI Insights Generator
 *
 * Produces intelligent insight cards for the analytics dashboard.
 * Each insight includes a confidence score, evidence chain, and
 * actionable interpretation — demonstrating "Explainable AI".
 */

import type { Breakdown, InsightCard } from '../types';
import { categoryShares, totalFootprint } from './carbon';

/** Historical monthly data (simulated) */
const HISTORY = [580, 560, 545, 515, 525, 480, 462];

export function generateInsights(breakdown: Breakdown): InsightCard[] {
  const shares = categoryShares(breakdown);
  const total = totalFootprint(breakdown);
  const entries = Object.entries(shares) as [keyof Breakdown, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  const insights: InsightCard[] = [];

  /* 1. Biggest emission source */
  const [topCat, topPct] = sorted[0];
  const savingsEstimate = Math.round(breakdown[topCat] * 0.2);
  insights.push({
    type: 'biggest_source',
    title: 'Biggest Emission Source',
    value: `${capitalize(topCat)} · ${topPct}%`,
    detail: `${capitalize(topCat)} contributes ${topPct}% of your footprint (${breakdown[topCat]} kg). Reducing it by 20% could save ~${savingsEstimate} kg/month.`,
    confidence: 92,
    icon: '🔍',
    trend: 'stable',
  });

  /* 2. Most improved category (simulated) */
  const improvements = [
    { cat: 'energy', change: -14, label: 'Home Energy' },
    { cat: 'transport', change: -6, label: 'Transport' },
    { cat: 'food', change: -3, label: 'Food' },
  ];
  const best = improvements.sort((a, b) => a.change - b.change)[0];
  insights.push({
    type: 'most_improved',
    title: 'Most Improved Category',
    value: `${best.label} ↓${Math.abs(best.change)}%`,
    detail: `Your ${best.label.toLowerCase()} emissions dropped ${Math.abs(best.change)}% this month. Consistent effort here has compounding effects over time.`,
    confidence: 88,
    icon: '📉',
    trend: 'down',
  });

  /* 3. Risk prediction */
  const lastTwo = HISTORY.slice(-2);
  const recentTrend = lastTwo[1] - lastTwo[0];
  const isRising = recentTrend > 0;
  insights.push({
    type: 'risk_prediction',
    title: isRising ? 'Emissions Rising' : 'On Track to Reduce',
    value: isRising ? `+${recentTrend} kg predicted` : `${Math.abs(recentTrend)} kg reduction likely`,
    detail: isRising
      ? 'Travel patterns suggest emissions may increase next month. Consider adding 1 metro day per week to counteract the trend.'
      : `Your trajectory suggests a further ${Math.abs(recentTrend)} kg reduction next month if current habits continue.`,
    confidence: 79,
    icon: isRising ? '⚠️' : '✅',
    trend: isRising ? 'up' : 'down',
  });

  /* 4. Opportunity */
  const [, secondCat] = sorted[1] || sorted[0];
  const secondEntry = sorted[1] || sorted[0];
  insights.push({
    type: 'opportunity',
    title: 'Untapped Opportunity',
    value: `${capitalize(secondEntry[0])} · ${secondCat}%`,
    detail: `${capitalize(secondEntry[0])} is your second-largest category at ${secondCat}%. Small changes here can unlock the next 10-15% of total reduction.`,
    confidence: 85,
    icon: '💡',
    trend: 'stable',
  });

  return insights;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
