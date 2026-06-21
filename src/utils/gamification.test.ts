/**
 * EcoSphere AI — Gamification Tests
 */

import { describe, expect, it } from 'vitest';
import { calculateLevel, getBadges, calculateEcoPoints, getActiveChallenges } from './gamification';

describe('level calculation', () => {
  it('returns Beginner for 0 points', () => {
    expect(calculateLevel(0).name).toBe('Beginner');
  });

  it('returns Green Explorer for 500+ points', () => {
    expect(calculateLevel(500).name).toBe('Green Explorer');
  });

  it('returns Net Zero Champion for 7000+ points', () => {
    expect(calculateLevel(7000).name).toBe('Net Zero Champion');
  });

  it('calculates progress percentage', () => {
    const level = calculateLevel(1000);
    expect(level.name).toBe('Green Explorer');
    expect(level.progress).toBe(50); // 500 of 1000 range
    expect(level.nextLevel).toBe('Climate Warrior');
  });
});

describe('badges', () => {
  it('returns all badges with earned status', () => {
    const badges = getBadges(['first-calc', 'week-streak']);
    expect(badges.length).toBe(10);
    expect(badges.find(b => b.id === 'first-calc')?.earned).toBe(true);
    expect(badges.find(b => b.id === 'net-zero')?.earned).toBe(false);
  });

  it('returns no earned badges for empty array', () => {
    const badges = getBadges([]);
    expect(badges.every(b => !b.earned)).toBe(true);
  });
});

describe('eco points', () => {
  it('converts kg reduced to points', () => {
    expect(calculateEcoPoints(10)).toBe(40);
    expect(calculateEcoPoints(0)).toBe(0);
  });
});

describe('active challenges', () => {
  it('returns 3 challenges', () => {
    expect(getActiveChallenges()).toHaveLength(3);
  });

  it('each challenge has required fields', () => {
    getActiveChallenges().forEach(c => {
      expect(c.id).toBeDefined();
      expect(c.title).toBeDefined();
      expect(c.target).toBeGreaterThan(0);
      expect(c.points).toBeGreaterThan(0);
    });
  });
});
