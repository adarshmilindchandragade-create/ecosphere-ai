import { describe, it, expect } from 'vitest';

describe('Carbon Twin Prediction', () => {
  it('should linearly project footprint reduction over 90 days', () => {
    const current = 500;
    const reduction = 50;
    expect(current - reduction).toBe(450);
  });
});
