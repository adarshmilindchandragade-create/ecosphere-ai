/**
 * EcoSphere AI — Carbon Calculation Tests
 *
 * Covers: expanded categories, edge cases, scenario simulator,
 * sustainability score, and environmental equivalents.
 */

import { describe, expect, it } from 'vitest';
import {
  calculateFootprint,
  totalFootprint,
  sustainabilityScore,
  categoryShares,
  simulateScenario,
  DEFAULT_INPUT,
} from './carbon';
import { toEquivalents } from './equivalents';

describe('carbon calculation engine', () => {
  it('calculates a stable category breakdown with default input', () => {
    const result = calculateFootprint(DEFAULT_INPUT);
    expect(result.transport).toBeGreaterThan(0);
    expect(result.energy).toBeGreaterThan(0);
    expect(result.food).toBeGreaterThan(0);
    expect(result.shopping).toBeGreaterThan(0);
    expect(result.waste).toBeGreaterThan(0);
    expect(totalFootprint(result)).toBeGreaterThan(100);
  });

  it('returns zero transport for bike-only commuters', () => {
    const input = { ...DEFAULT_INPUT, carKm: 0, busKm: 0, metroKm: 0, bikeKm: 10, flightHoursPerYear: 0 };
    const result = calculateFootprint(input);
    expect(result.transport).toBe(0);
  });

  it('returns lower food emissions for plant diet', () => {
    const plant = calculateFootprint({ ...DEFAULT_INPUT, diet: 'plant' });
    const meat = calculateFootprint({ ...DEFAULT_INPUT, diet: 'meat' });
    expect(plant.food).toBeLessThan(meat.food);
  });

  it('accounts for local sourcing reduction', () => {
    const local0 = calculateFootprint({ ...DEFAULT_INPUT, localSourcePct: 0 });
    const local100 = calculateFootprint({ ...DEFAULT_INPUT, localSourcePct: 100 });
    expect(local100.food).toBeLessThan(local0.food);
  });

  it('accounts for recycling reduction', () => {
    const recycle0 = calculateFootprint({ ...DEFAULT_INPUT, recyclingPct: 0 });
    const recycle80 = calculateFootprint({ ...DEFAULT_INPUT, recyclingPct: 80 });
    expect(recycle80.waste).toBeLessThan(recycle0.waste);
  });

  it('handles zero input gracefully', () => {
    const input = {
      carKm: 0, busKm: 0, metroKm: 0, bikeKm: 0, flightHoursPerYear: 0,
      electricityKwh: 0, acHoursPerDay: 0, applianceKwh: 0,
      diet: 'plant' as const, localSourcePct: 100,
      electronicsSpend: 0, fashionSpend: 0, generalSpend: 0,
      wasteBags: 0, recyclingPct: 100,
    };
    const result = calculateFootprint(input);
    expect(totalFootprint(result)).toBeGreaterThanOrEqual(0);
  });
});

describe('sustainability score', () => {
  it('caps at 98 for zero emissions', () => {
    expect(sustainabilityScore(0)).toBe(98);
  });

  it('floors at 20 for very high emissions', () => {
    expect(sustainabilityScore(10000)).toBe(20);
  });

  it('returns reasonable scores for typical values', () => {
    const score = sustainabilityScore(462);
    expect(score).toBeGreaterThan(30);
    expect(score).toBeLessThan(90);
  });
});

describe('category shares', () => {
  it('shares sum to approximately 100%', () => {
    const breakdown = calculateFootprint(DEFAULT_INPUT);
    const shares = categoryShares(breakdown);
    const sum = Object.values(shares).reduce((s, v) => s + v, 0);
    expect(sum).toBeGreaterThanOrEqual(98);
    expect(sum).toBeLessThanOrEqual(102); // rounding tolerance
  });
});

describe('scenario simulator', () => {
  it('returns savings when metro days are added', () => {
    const result = simulateScenario(DEFAULT_INPUT, {
      metroDaysPerWeek: 3,
      meatFreeMealsPerWeek: 0,
      ledSwitch: false,
      acReductionHours: 0,
      recyclingIncreasePct: 0,
    });
    expect(result.savingsKg).toBeGreaterThan(0);
    expect(result.projectedTotal).toBeLessThan(result.currentTotal);
    expect(result.moneySaved).toBeGreaterThan(0);
  });

  it('returns savings when LED switch is enabled', () => {
    const result = simulateScenario(DEFAULT_INPUT, {
      metroDaysPerWeek: 0,
      meatFreeMealsPerWeek: 0,
      ledSwitch: true,
      acReductionHours: 0,
      recyclingIncreasePct: 0,
    });
    expect(result.savingsKg).toBeGreaterThan(0);
  });

  it('returns zero savings with no changes', () => {
    const result = simulateScenario(DEFAULT_INPUT, {
      metroDaysPerWeek: 0,
      meatFreeMealsPerWeek: 0,
      ledSwitch: false,
      acReductionHours: 0,
      recyclingIncreasePct: 0,
    });
    expect(result.savingsKg).toBe(0);
    expect(result.projectedTotal).toBe(result.currentTotal);
  });

  it('includes environmental equivalents in result', () => {
    const result = simulateScenario(DEFAULT_INPUT, {
      metroDaysPerWeek: 2,
      meatFreeMealsPerWeek: 3,
      ledSwitch: true,
      acReductionHours: 1,
      recyclingIncreasePct: 20,
    });
    expect(result.equivalents).toBeDefined();
    expect(result.equivalents.treesNeeded).toBeGreaterThanOrEqual(0);
  });
});

describe('environmental equivalents', () => {
  it('returns all fields for positive input', () => {
    const eq = toEquivalents(100);
    expect(eq.treesNeeded).toBeGreaterThan(0);
    expect(eq.domesticFlights).toBeGreaterThan(0);
    expect(eq.electricityKwh).toBeGreaterThan(0);
    expect(eq.drivingKm).toBeGreaterThan(0);
    expect(eq.smartphoneCharges).toBeGreaterThan(0);
  });

  it('returns zero/near-zero for zero input', () => {
    const eq = toEquivalents(0);
    expect(eq.treesNeeded).toBe(0);
    expect(eq.domesticFlights).toBe(0);
  });
});
