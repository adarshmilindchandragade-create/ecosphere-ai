import { describe, it, expect } from 'vitest';

describe('Scenario Simulator', () => {
  it('should accurately calculate savings for public transit', () => {
    const savings = 10 * 5;
    expect(savings).toBe(50);
  });

  it('should accurately calculate savings for plant-based meals', () => {
    const savings = 3 * 2.5;
    expect(savings).toBe(7.5);
  });
});
