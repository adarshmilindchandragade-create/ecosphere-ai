/**
 * EcoSphere AI — Core Type Definitions
 *
 * All domain types used across the carbon calculation engine,
 * recommendation system, gamification, and scenario simulator.
 */

/* ────────────────────────────────────────────
 * Carbon Footprint Input & Breakdown
 * ──────────────────────────────────────────── */

export type Diet = 'plant' | 'mixed' | 'meat';

export interface FootprintInput {
  /* Transport */
  carKm: number;
  busKm: number;
  metroKm: number;
  bikeKm: number;
  flightHoursPerYear: number;

  /* Energy */
  electricityKwh: number;
  acHoursPerDay: number;
  applianceKwh: number;

  /* Food */
  diet: Diet;
  localSourcePct: number;

  /* Shopping */
  electronicsSpend: number;
  fashionSpend: number;
  generalSpend: number;

  /* Waste */
  wasteBags: number;
  recyclingPct: number;
}

export interface Breakdown {
  transport: number;
  energy: number;
  food: number;
  shopping: number;
  waste: number;
}

/* ────────────────────────────────────────────
 * Environmental Equivalents
 * ──────────────────────────────────────────── */

export interface Equivalents {
  treesNeeded: number;
  domesticFlights: number;
  electricityKwh: number;
  drivingKm: number;
  smartphoneCharges: number;
}

/* ────────────────────────────────────────────
 * Scenario Simulator
 * ──────────────────────────────────────────── */

export interface ScenarioChange {
  metroDaysPerWeek: number;
  meatFreeMealsPerWeek: number;
  ledSwitch: boolean;
  acReductionHours: number;
  recyclingIncreasePct: number;
}

export interface ScenarioResult {
  currentTotal: number;
  projectedTotal: number;
  savingsKg: number;
  moneySaved: number;
  equivalents: Equivalents;
  categoryDeltas: Record<keyof Breakdown, number>;
}

/* ────────────────────────────────────────────
 * AI Insight Cards
 * ──────────────────────────────────────────── */

export type InsightType = 'biggest_source' | 'most_improved' | 'risk_prediction' | 'opportunity';

export interface InsightCard {
  type: InsightType;
  title: string;
  value: string;
  detail: string;
  confidence: number;
  icon: string;
  trend?: 'up' | 'down' | 'stable';
}

/* ────────────────────────────────────────────
 * Gamification
 * ──────────────────────────────────────────── */

export type LevelName =
  | 'Beginner'
  | 'Green Explorer'
  | 'Climate Warrior'
  | 'Planet Guardian'
  | 'Net Zero Champion';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface Level {
  name: LevelName;
  threshold: number;
  progress: number;
  nextLevel?: LevelName;
}

/* ────────────────────────────────────────────
 * Coach Message
 * ──────────────────────────────────────────── */

export interface CoachMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
  explanation?: {
    detectedPattern: string;
    evidence: string;
    confidence: number;
    expectedImpact: string;
  };
}
