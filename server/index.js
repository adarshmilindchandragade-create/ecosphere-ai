/**
 * EcoSphere AI — Express API Server
 *
 * Endpoints:
 *   GET  /api/health          — service status
 *   POST /api/coach           — AI coach response (max 500 chars)
 *   POST /api/calculate       — server-side footprint calculation
 *   POST /api/scenario        — scenario simulation
 *   GET  /api/analytics       — AI insight cards
 *   GET  /api/predictions     — carbon forecast data
 *   GET  /api/carbon-twin     — current vs future comparison
 *   GET  /api/leaderboard     — community leaderboard
 *   GET  /api/challenges      — active challenges
 *
 * Security:
 *   - Disabled x-powered-by header
 *   - JSON body limit (20KB)
 *   - Rate limiting (60 req/min per IP)
 *   - Input sanitization
 *   - Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
 *   - CORS with configurable origin
 */

import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

const app = express();
const port = Number(process.env.PORT || 8787);
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

/* ─── Security Headers (Helmet) ─── */
app.use(helmet());

/* ─── CORS ─── */
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (_req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

/* ─── Body Parser ─── */
app.use(express.json({ limit: '20kb' }));

/* ─── Rate Limiting ─── */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

/* ─── Request Logging ─── */
app.use('/api', (req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/* ─── Input Sanitization & Zod Validation ─── */
const messageSchema = z.string().min(1).max(500);

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .trim()
    .slice(0, 500);
}

/* ═══════════════════════════════════════════
   ENDPOINTS
   ═══════════════════════════════════════════ */

/* Health Check */
app.get('/api/health', (_req, res) =>
  res.json({
    status: 'healthy',
    service: 'ecosphere-api',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  }),
);

/* AI Coach */
app.post('/api/coach', (req, res) => {
  try {
    const validMessage = messageSchema.parse(req.body?.message);
    const message = sanitize(validMessage);
    const lower = message.toLowerCase();
  let topic = 'general';
  if (/transport|car|commut|drive|bus|metro/.test(lower)) topic = 'transport';
  else if (/food|diet|meat|veg|plant/.test(lower)) topic = 'food';
  else if (/energy|electric|ac|power/.test(lower)) topic = 'energy';
  else if (/waste|recycl|trash/.test(lower)) topic = 'waste';

  const responses = {
    transport: {
      answer: 'Transport is your highest-impact opportunity. Two clean commutes per week may save around 31 kg CO₂e monthly.',
      explanation: { pattern: 'High transport usage', evidence: 'Transport ~41% of footprint', confidence: 92, impact: '31 kg CO₂e/month' },
    },
    food: {
      answer: 'Try two plant-forward lunches each week. Based on your profile, that may save around 18 kg CO₂e monthly.',
      explanation: { pattern: 'Mixed diet detected', evidence: 'Food ~22% of footprint', confidence: 84, impact: '18 kg CO₂e/month' },
    },
    energy: {
      answer: 'Schedule AC to run only during peak heat hours and switch off standby devices. This could reduce energy emissions by ~15%.',
      explanation: { pattern: 'High energy usage', evidence: 'Energy ~27% of footprint', confidence: 87, impact: '20 kg CO₂e/month' },
    },
    waste: {
      answer: 'Increase your recycling rate by segregating paper, plastic, and food waste. Even 25% more recycling cuts waste emissions significantly.',
      explanation: { pattern: 'Low recycling rate', evidence: 'Waste ~10% of footprint', confidence: 82, impact: '8 kg CO₂e/month' },
    },
    general: {
      answer: 'Your total footprint is approximately 462 kg CO₂e/month. Transport is the biggest category. Ask about specific areas for targeted advice.',
      explanation: { pattern: 'General inquiry', evidence: '5 categories analyzed', confidence: 85, impact: 'Ask specific questions' },
    },
  };

  const result = responses[topic] || responses.general;
  res.json({ ...result, source: 'local-recommendation-engine', topic });
  } catch (e) {
    res.status(400).json({ error: 'Invalid input message.' });
  }
});

/* Server-Side Calculation */
app.post('/api/calculate', (req, res) => {
  const { input } = req.body || {};
  if (!input) return res.status(400).json({ error: 'Input data required.' });

  const factors = { car: 0.171, bus: 0.089, metro: 0.041, flight: 0.255, electricity: 0.708, ac: 1.2 };
  const transport = (input.carKm || 0) * 22 * factors.car + (input.busKm || 0) * 22 * factors.bus + (input.metroKm || 0) * 22 * factors.metro;
  const energy = (input.electricityKwh || 0) * factors.electricity + (input.acHoursPerDay || 0) * 30 * factors.ac;
  const dietMap = { plant: 52, mixed: 108, meat: 172 };
  const food = dietMap[input.diet] || 108;
  const shopping = ((input.electronicsSpend || 0) * 0.28) + ((input.fashionSpend || 0) * 0.22) + ((input.generalSpend || 0) * 0.14);
  const waste = (input.wasteBags || 0) * 4.33 * 2.1;
  const total = Math.round(transport + energy + food + shopping + waste);

  res.json({ breakdown: { transport: Math.round(transport), energy: Math.round(energy), food: Math.round(food), shopping: Math.round(shopping), waste: Math.round(waste) }, total, score: Math.max(20, Math.min(98, Math.round(100 - total / 8))) });
});

/* Scenario Simulation */
app.post('/api/scenario', (req, res) => {
  const { currentTotal, changes } = req.body || {};
  if (!currentTotal) return res.status(400).json({ error: 'Current total required.' });

  const savings = {
    metro: (changes?.metroDaysPerWeek || 0) * 4.33 * 5,
    meals: (changes?.meatFreeMealsPerWeek || 0) * 2.5,
    led: changes?.ledSwitch ? 15 : 0,
    ac: (changes?.acReductionHours || 0) * 30 * 1.2,
    recycling: (changes?.recyclingIncreasePct || 0) * 0.3,
  };
  const totalSaved = Math.round(Object.values(savings).reduce((s, v) => s + v, 0));
  const projected = Math.max(50, currentTotal - totalSaved);

  res.json({ currentTotal, projected, savings: totalSaved, moneySaved: totalSaved * 15, categoryBreakdown: savings });
});

/* AI Analytics / Insights */
app.get('/api/analytics', (_req, res) =>
  res.json({
    insights: [
      { type: 'biggest_source', title: 'Biggest Emission Source', value: 'Transport · 41%', confidence: 92 },
      { type: 'most_improved', title: 'Most Improved Category', value: 'Energy ↓14%', confidence: 88 },
      { type: 'risk_prediction', title: 'On Track to Reduce', value: '18 kg reduction likely', confidence: 79 },
      { type: 'opportunity', title: 'Untapped Opportunity', value: 'Food · 22%', confidence: 85 },
    ],
    generatedAt: new Date().toISOString(),
  }),
);

/* Predictions / Forecast */
app.get('/api/predictions', (_req, res) =>
  res.json({
    current: 462,
    day30: 440,
    day90: 381,
    year: 292,
    currentScore: 78,
    futureScore: 92,
    confidence: 89,
    methodology: 'Linear projection with 70% roadmap completion assumption',
  }),
);

/* Carbon Twin */
app.get('/api/carbon-twin', (_req, res) =>
  res.json({
    current: { total: 462, score: 78 },
    future: { total: 381, score: 88, timeframe: '90 days' },
    reduction: { kg: 81, percent: 18, treesEquivalent: 3.7 },
    confidence: 89,
  }),
);

/* Leaderboard */
app.get('/api/leaderboard', (_req, res) =>
  res.json({
    leaders: [
      { rank: 1, name: 'Maya R.', points: 3420, badge: 'Planet Guardian', reduced: 142 },
      { rank: 2, name: 'Dev K.', points: 3180, badge: 'Climate Warrior', reduced: 128 },
      { rank: 3, name: 'Alex M.', points: 1840, badge: 'Green Explorer', reduced: 81, isUser: true },
      { rank: 4, name: 'Samira P.', points: 1720, badge: 'Green Explorer', reduced: 76 },
      { rank: 5, name: 'Ravi T.', points: 1580, badge: 'Green Explorer', reduced: 68 },
    ],
    communityStats: { totalReduced: 4200, activeMembers: 1247, challengesCompleted: 3891 },
  }),
);

/* Active Challenges */
app.get('/api/challenges', (_req, res) =>
  res.json({
    challenges: [
      { id: 'clean-commute', title: 'Commute the cleaner way', target: 2, current: 1, points: 150, daysLeft: 4 },
      { id: 'plant-meals', title: 'Plant-forward lunches', target: 3, current: 2, points: 120, daysLeft: 3 },
      { id: 'energy-audit', title: 'Standby power check', target: 5, current: 3, points: 80, daysLeft: 1 },
    ],
  }),
);

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ─── Static Frontend Serving ─── */
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/* ─── Start Server ─── */
app.listen(port, () => console.log(`EcoSphere API listening on ${port}`));
