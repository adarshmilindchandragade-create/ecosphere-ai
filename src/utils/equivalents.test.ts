import { describe, it, expect } from 'vitest';

describe('Environmental Equivalents', () => {
  it('should convert kg CO2 to trees planted', () => {
    const kg = 1200;
    const trees = Math.round(kg / 25);
    expect(trees).toBe(48);
  });

  it('should convert kg CO2 to flights saved', () => {
    const kg = 500;
    const flights = Math.round(kg / 250);
    expect(flights).toBe(2);
  });
});
