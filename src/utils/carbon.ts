/**
 * EcoSphere AI — Carbon Calculation Engine
 *
 * Emission factors sourced from illustrative MVP values.
 * Each factor is documented with its unit for transparency.
 *
 * Methodology: Scope 1 + Scope 2 + Scope 3 approximations
 * at the individual household level.
 */

import type { Breakdown, FootprintInput, ScenarioChange, ScenarioResult } from '../types';
import { toEquivalents } from './equivalents';

/* ────────────────────────────────────────────
 * Emission Factors (kg CO₂e per unit)
 * ──────────────────────────────────────────── */

export const FACTORS = {
  /* Transport (per km) */
  car: 0.171,
  bus: 0.089,
  metro: 0.041,
  bike: 0,
  flight: 0.255,        // per km, ~900 km/hr average

  /* Energy */
  electricity: 0.708,   // per kWh (India grid average)
  ac: 1.2,              // per hour (typical window AC ~1.7 kW × 0.708)
  appliance: 0.708,     // per kWh

  /* Food (monthly) */
  diet_plant: 52,
  diet_mixed: 108,
  diet_meat: 172,
  local_reduction: 0.15, // 15% reduction for local sourcing

  /* Shopping (per ₹ spent) */
  electronics: 0.28,
  fashion: 0.22,
  general: 0.14,

  /* Waste */
  waste_bag: 2.1,       // per bag per week
  recycling_factor: 0.6, // 60% reduction per recycled bag
} as const;

/* Working days per month */
const WORK_DAYS = 22;
const WEEKS_PER_MONTH = 4.33;

/* ────────────────────────────────────────────
 * Core Calculation
 * ──────────────────────────────────────────── */

export function calculateFootprint(input: FootprintInput): Breakdown {
  const transport =
    input.carKm * WORK_DAYS * FACTORS.car +
    input.busKm * WORK_DAYS * FACTORS.bus +
    input.metroKm * WORK_DAYS * FACTORS.metro +
    input.bikeKm * WORK_DAYS * FACTORS.bike +
    input.flightHoursPerYear * 900 * FACTORS.flight / 12;

  const energy =
    input.electricityKwh * FACTORS.electricity +
    input.acHoursPerDay * 30 * FACTORS.ac +
    input.applianceKwh * FACTORS.appliance;

  const baseDiet =
    input.diet === 'plant' ? FACTORS.diet_plant :
    input.diet === 'mixed' ? FACTORS.diet_mixed :
    FACTORS.diet_meat;
  const food = baseDiet * (1 - (input.localSourcePct / 100) * FACTORS.local_reduction);

  const shopping =
    input.electronicsSpend * FACTORS.electronics +
    input.fashionSpend * FACTORS.fashion +
    input.generalSpend * FACTORS.general;

  const grossWaste = input.wasteBags * WEEKS_PER_MONTH * FACTORS.waste_bag;
  const waste = grossWaste * (1 - (input.recyclingPct / 100) * FACTORS.recycling_factor);

  return {
    transport: Math.round(transport),
    energy: Math.round(energy),
    food: Math.round(food),
    shopping: Math.round(shopping),
    waste: Math.round(waste),
  };
}

/* ────────────────────────────────────────────
 * Derived Metrics
 * ──────────────────────────────────────────── */

export function totalFootprint(b: Breakdown): number {
  return Object.values(b).reduce((sum, v) => sum + v, 0);
}

export function sustainabilityScore(total: number): number {
  return Math.max(20, Math.min(98, Math.round(100 - total / 8)));
}

export function categoryShares(b: Breakdown): Record<keyof Breakdown, number> {
  const total = totalFootprint(b) || 1;
  return {
    transport: Math.round((b.transport / total) * 100),
    energy: Math.round((b.energy / total) * 100),
    food: Math.round((b.food / total) * 100),
    shopping: Math.round((b.shopping / total) * 100),
    waste: Math.round((b.waste / total) * 100),
  };
}

export function annualProjection(monthlyTotal: number): number {
  return monthlyTotal * 12;
}

/* ────────────────────────────────────────────
 * Scenario Simulator
 *
 * Takes current inputs + proposed changes
 * and returns projected footprint with savings.
 * ──────────────────────────────────────────── */

export function simulateScenario(
  input: FootprintInput,
  changes: ScenarioChange,
): ScenarioResult {
  const currentBreakdown = calculateFootprint(input);
  const currentTotal = totalFootprint(currentBreakdown);

  /* Apply scenario changes */
  const modified: FootprintInput = { ...input };

  /* Metro days: each metro day replaces a car commute */
  if (changes.metroDaysPerWeek > 0) {
    const carDaysReduced = changes.metroDaysPerWeek * WEEKS_PER_MONTH;
    const originalCarDays = WORK_DAYS;
    const newCarDays = Math.max(0, originalCarDays - carDaysReduced);
    const ratio = newCarDays / originalCarDays;
    modified.carKm = Math.round(input.carKm * ratio);
    modified.metroKm = input.metroKm + Math.round(input.carKm * (1 - ratio));
  }

  /* Meat-free meals: shift diet toward plant */
  if (changes.meatFreeMealsPerWeek >= 7) {
    modified.diet = 'plant';
  } else if (changes.meatFreeMealsPerWeek >= 3) {
    modified.diet = input.diet === 'meat' ? 'mixed' : input.diet;
  }

  /* LED switch: reduces appliance consumption ~20% */
  if (changes.ledSwitch) {
    modified.applianceKwh = Math.round(input.applianceKwh * 0.8);
    modified.electricityKwh = Math.round(input.electricityKwh * 0.92);
  }

  /* AC reduction */
  modified.acHoursPerDay = Math.max(0, input.acHoursPerDay - changes.acReductionHours);

  /* Recycling increase */
  modified.recyclingPct = Math.min(100, input.recyclingPct + changes.recyclingIncreasePct);

  const projectedBreakdown = calculateFootprint(modified);
  const projectedTotal = totalFootprint(projectedBreakdown);
  const savingsKg = currentTotal - projectedTotal;

  /* Rough money savings estimate: ₹15 per kg CO₂e avoided */
  const moneySaved = Math.round(savingsKg * 15);

  const categoryDeltas: Record<keyof Breakdown, number> = {
    transport: currentBreakdown.transport - projectedBreakdown.transport,
    energy: currentBreakdown.energy - projectedBreakdown.energy,
    food: currentBreakdown.food - projectedBreakdown.food,
    shopping: currentBreakdown.shopping - projectedBreakdown.shopping,
    waste: currentBreakdown.waste - projectedBreakdown.waste,
  };

  return {
    currentTotal,
    projectedTotal,
    savingsKg,
    moneySaved,
    equivalents: toEquivalents(savingsKg),
    categoryDeltas,
  };
}

/* ────────────────────────────────────────────
 * Default Input Values
 * ──────────────────────────────────────────── */

export const DEFAULT_INPUT: FootprintInput = {
  carKm: 20,
  busKm: 0,
  metroKm: 0,
  bikeKm: 0,
  flightHoursPerYear: 4,
  electricityKwh: 180,
  acHoursPerDay: 3,
  applianceKwh: 40,
  diet: 'mixed',
  localSourcePct: 20,
  electronicsSpend: 500,
  fashionSpend: 300,
  generalSpend: 200,
  wasteBags: 3,
  recyclingPct: 15,
};
