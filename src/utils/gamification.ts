/**
 * EcoSphere AI — Gamification Engine
 *
 * Level progression, badge system, and eco points logic.
 * Pure functions — no side effects, fully testable.
 */

import type { Badge, Level, LevelName } from '../types';

/* ────────────────────────────────────────────
 * Level Thresholds
 * ──────────────────────────────────────────── */

const LEVELS: { name: LevelName; threshold: number }[] = [
  { name: 'Beginner', threshold: 0 },
  { name: 'Green Explorer', threshold: 500 },
  { name: 'Climate Warrior', threshold: 1500 },
  { name: 'Planet Guardian', threshold: 3500 },
  { name: 'Net Zero Champion', threshold: 7000 },
];

export function calculateLevel(points: number): Level {
  let current = LEVELS[0];
  let next = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].threshold) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || LEVELS[i];
      break;
    }
  }

  const range = next.threshold - current.threshold || 1;
  const progress = Math.min(100, Math.round(((points - current.threshold) / range) * 100));

  return {
    name: current.name,
    threshold: current.threshold,
    progress,
    nextLevel: next.name !== current.name ? next.name : undefined,
  };
}

/* ────────────────────────────────────────────
 * Badge Definitions
 * ──────────────────────────────────────────── */

const BADGE_DEFS: Omit<Badge, 'earned' | 'earnedDate'>[] = [
  { id: 'first-calc', name: 'First Footprint', description: 'Completed your first carbon calculation', icon: '🧮' },
  { id: 'week-streak', name: '7-Day Streak', description: 'Logged activity for 7 consecutive days', icon: '🔥' },
  { id: 'commuter', name: 'Clean Commuter', description: 'Used public transport 10 times', icon: '🚇' },
  { id: 'plant-power', name: 'Plant Power', description: 'Logged 20 plant-based meals', icon: '🥗' },
  { id: 'energy-saver', name: 'Energy Saver', description: 'Reduced energy usage by 15%', icon: '💡' },
  { id: 'recycler', name: 'Recycling Hero', description: 'Maintained 50%+ recycling rate for a month', icon: '♻️' },
  { id: 'simulator', name: 'Scenario Explorer', description: 'Used the What If simulator 5 times', icon: '🔮' },
  { id: 'mentor', name: 'Community Mentor', description: 'Shared 3 eco tips with the community', icon: '🌟' },
  { id: 'month-goal', name: 'Monthly Goal Met', description: 'Met your carbon reduction target', icon: '🎯' },
  { id: 'net-zero', name: 'Net Zero Path', description: 'Reached a sustainability score of 90+', icon: '🏆' },
];

export function getBadges(earnedIds: string[]): Badge[] {
  return BADGE_DEFS.map((def) => ({
    ...def,
    earned: earnedIds.includes(def.id),
    earnedDate: earnedIds.includes(def.id) ? '2026-06' : undefined,
  }));
}

/* ────────────────────────────────────────────
 * Weekly Challenges (sample data)
 * ──────────────────────────────────────────── */

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  points: number;
  daysLeft: number;
  icon: string;
}

export function getActiveChallenges(): Challenge[] {
  return [
    {
      id: 'clean-commute',
      title: 'Commute the cleaner way',
      description: 'Use public transport, cycle, or walk twice this week.',
      target: 2,
      current: 1,
      points: 150,
      daysLeft: 4,
      icon: '🚲',
    },
    {
      id: 'plant-meals',
      title: 'Plant-forward lunches',
      description: 'Choose a vegetarian lunch 3 times this week.',
      target: 3,
      current: 2,
      points: 120,
      daysLeft: 3,
      icon: '🥬',
    },
    {
      id: 'energy-audit',
      title: 'Standby power check',
      description: 'Switch off 5 devices on standby today.',
      target: 5,
      current: 3,
      points: 80,
      daysLeft: 1,
      icon: '🔌',
    },
  ];
}

/* ────────────────────────────────────────────
 * Eco Points Calculation
 * ──────────────────────────────────────────── */

export function calculateEcoPoints(kgReduced: number): number {
  return Math.round(kgReduced * 4);
}
