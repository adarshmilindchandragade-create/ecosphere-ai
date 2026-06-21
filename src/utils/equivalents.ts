/**
 * EcoSphere AI — Environmental Equivalents
 *
 * Converts kg CO₂e into relatable, human-understandable
 * equivalents. Used across calculator, simulator, analytics,
 * and dashboard to make abstract numbers tangible.
 *
 * Sources (illustrative):
 *  - 1 mature tree absorbs ~22 kg CO₂/year
 *  - 1 domestic flight (Delhi-Mumbai) ≈ 115 kg CO₂
 *  - 1 kWh electricity ≈ 0.708 kg CO₂ (India grid)
 *  - 1 km driving ≈ 0.171 kg CO₂
 *  - 1 smartphone charge ≈ 0.008 kg CO₂
 */

import type { Equivalents } from '../types';

const TREE_ABSORPTION_KG_PER_YEAR = 22;
const DOMESTIC_FLIGHT_KG = 115;
const ELECTRICITY_FACTOR = 0.708;
const DRIVING_KM_FACTOR = 0.171;
const SMARTPHONE_CHARGE_KG = 0.008;

export function toEquivalents(kgCo2: number): Equivalents {
  return {
    treesNeeded: Math.round((kgCo2 / TREE_ABSORPTION_KG_PER_YEAR) * 12 * 10) / 10,
    domesticFlights: Math.round((kgCo2 / DOMESTIC_FLIGHT_KG) * 10) / 10,
    electricityKwh: Math.round(kgCo2 / ELECTRICITY_FACTOR),
    drivingKm: Math.round(kgCo2 / DRIVING_KM_FACTOR),
    smartphoneCharges: Math.round(kgCo2 / SMARTPHONE_CHARGE_KG),
  };
}

/**
 * Format a single equivalent as a human-readable string.
 */
export function formatEquivalent(
  key: keyof Equivalents,
  value: number,
): { label: string; icon: string; formatted: string } {
  switch (key) {
    case 'treesNeeded':
      return { label: 'Trees needed to absorb', icon: '🌳', formatted: `${value} trees/year` };
    case 'domesticFlights':
      return { label: 'Equivalent domestic flights', icon: '✈️', formatted: `${value} flights` };
    case 'electricityKwh':
      return { label: 'Electricity consumption', icon: '⚡', formatted: `${value} kWh` };
    case 'drivingKm':
      return { label: 'Driving distance', icon: '🚗', formatted: `${value} km` };
    case 'smartphoneCharges':
      return { label: 'Smartphone charges', icon: '📱', formatted: `${value.toLocaleString()} charges` };
  }
}
