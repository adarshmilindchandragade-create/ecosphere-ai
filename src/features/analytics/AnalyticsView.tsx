/**
 * AI Analytics Dashboard
 *
 * Not just charts — intelligent insight cards with confidence scores,
 * trend predictions, and explainable AI evidence. Integrates Carbon Twin
 * and environmental equivalents. Differentiates from generic dashboards.
 */

import { useMemo } from 'react';
import {
  BarChart3,
  Brain,
  Sparkles,
  Target,
  TreePine,
  TrendingDown,
  TrendingUp,
  Zap,
  Plane,
  Car,
} from 'lucide-react';
import type { Breakdown, FootprintInput, InsightCard } from '../../types';
import { calculateFootprint, totalFootprint, categoryShares, sustainabilityScore } from '../../utils/carbon';
import { generateInsights } from '../../utils/insights';
import { toEquivalents } from '../../utils/equivalents';
import { buildForecast } from '../carbon-twin/CarbonTwinForecast';

interface Props {
  input: FootprintInput;
}

/** Monthly historical data (simulated trend) */
const HISTORY = [580, 560, 545, 515, 525, 480, 462];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export function AnalyticsView({ input }: Props) {
  const breakdown = useMemo(() => calculateFootprint(input), [input]);
  const total = totalFootprint(breakdown);
  const shares = categoryShares(breakdown);
  const score = sustainabilityScore(total);
  const insights = useMemo(() => generateInsights(breakdown), [breakdown]);
  const equivalents = toEquivalents(total);
  const forecast = buildForecast(total);

  return (
    <section className="page-view analytics-view" role="main" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Brain size={14} /> AI-POWERED ANALYTICS
          </span>
          <h1>Intelligent insights</h1>
          <p>
            AI analyzes your habits to surface what matters most, predict
            trends, and find your biggest opportunities.
          </p>
        </div>
      </div>

      {/* ── AI Insight Cards ── */}
      <div className="insights-grid" aria-label="AI-generated insight cards">
        {insights.map((insight) => (
          <InsightCardComponent key={insight.type} insight={insight} />
        ))}
      </div>

      {/* ── Carbon Twin ── */}
      <div className="analytics-twin-row">
        <article className="panel twin-analytics-card">
          <div className="panel-head">
            <div>
              <span className="eyebrow">
                <Sparkles size={13} /> CARBON TWIN
              </span>
              <h3>Current you vs Future you</h3>
            </div>
            <span className="model-badge">89% confidence</span>
          </div>
          <div className="twin-compare-row">
            <div className="twin-now">
              <span>Today</span>
              <strong>{forecast.current}</strong>
              <small>kg CO₂e/mo</small>
              <em>Score {forecast.currentScore}</em>
            </div>
            <div className="twin-delta">
              <TrendingDown size={20} />
              <span>-{Math.round(((forecast.current - forecast.day90) / forecast.current) * 100)}%</span>
            </div>
            <div className="twin-future">
              <span>90 days</span>
              <strong>{forecast.day90}</strong>
              <small>kg CO₂e/mo</small>
              <em>Score {forecast.futureScore}</em>
            </div>
          </div>
        </article>

        {/* ── One-Year Trajectory ── */}
        <article className="panel forecast-analytics-card">
          <div className="panel-head">
            <div>
              <h3>One-year trajectory</h3>
              <p>If you complete 70% of your roadmap</p>
            </div>
            <strong className="forecast-target">{forecast.year} kg</strong>
          </div>
          <div
            className="forecast-bars"
            role="img"
            aria-label={`Predicted footprint falls from ${forecast.current} to ${forecast.year} kg CO₂e per month over one year`}
          >
            {[forecast.current, Math.round((forecast.current + forecast.day90) / 2), forecast.day90, Math.round((forecast.day90 + forecast.year) / 2), forecast.year].map((val, i) => (
              <div key={i}>
                <i style={{ height: `${Math.round((val / forecast.current) * 100)}%` }} />
                <span>{['Now', '30d', '90d', '6m', '1yr'][i]}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      {/* ── Charts Row ── */}
      <div className="analytics-charts-row">
        {/* Trend Chart */}
        <article className="panel analytics-trend-panel">
          <div className="panel-head">
            <div>
              <h3>Carbon trend</h3>
              <p>Monthly emissions over time</p>
            </div>
          </div>
          <div className="trend-meta">
            <strong>{total} kg</strong>
            <span>
              <TrendingDown size={10} /> 12.4%
            </span>
          </div>
          <div
            className="trend-wrap"
            aria-label="Carbon emissions trend showing 12.4 percent decrease over 7 months"
          >
            <svg viewBox="0 0 400 175" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1e9b68" stopOpacity=".22" />
                  <stop offset="1" stopColor="#1e9b68" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[32, 72, 112, 152].map((y) => (
                <line
                  key={y}
                  x1="12"
                  x2="388"
                  y1={y}
                  y2={y}
                  stroke="#e7ece6"
                  strokeDasharray="3 5"
                />
              ))}
              <polygon
                points={`18,160 ${HISTORY.map((v, i) => `${i * 60 + 18},${150 - (580 - v) * 0.55}`).join(' ')} 378,160`}
                fill="url(#areaGrad)"
              />
              <polyline
                points={HISTORY.map((v, i) => `${i * 60 + 18},${150 - (580 - v) * 0.55}`).join(' ')}
                fill="none"
                stroke="#12825a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chart-line-animated"
              />
              {HISTORY.map((v, i) => (
                <circle
                  key={v}
                  cx={i * 60 + 18}
                  cy={150 - (580 - v) * 0.55}
                  r={i === 6 ? 5 : 3}
                  fill={i === 6 ? '#fff' : '#12825a'}
                  stroke="#12825a"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <div className="chart-labels">
              {MONTHS.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </article>

        {/* Category Distribution */}
        <article className="panel analytics-breakdown-panel">
          <div className="panel-head">
            <div>
              <h3>Category distribution</h3>
              <p>Where your emissions come from</p>
            </div>
          </div>
          <div
            className="donut-shell"
            role="img"
            aria-label={`Emissions: transport ${shares.transport}%, energy ${shares.energy}%, food ${shares.food}%, shopping ${shares.shopping}%, waste ${shares.waste}%`}
          >
            <div className="donut">
              <div>
                <strong>{total}</strong>
                <span>kg CO₂e</span>
              </div>
            </div>
            <div className="legend">
              {(Object.entries(shares) as [string, number][]).map(([cat, pct]) => (
                <span key={cat}>
                  <i className={cat} />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)} <b>{pct}%</b>
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* ── Environmental Equivalents ── */}
      <div className="analytics-equiv panel" aria-label="Your monthly footprint in relatable terms">
        <h3>Your footprint in perspective</h3>
        <p className="equiv-subtitle">
          {total} kg CO₂e per month is equivalent to:
        </p>
        <div className="equiv-grid large">
          <div className="equiv-item">
            <TreePine size={22} />
            <strong>{equivalents.treesNeeded}</strong>
            <span>trees needed to absorb</span>
          </div>
          <div className="equiv-item">
            <Plane size={22} />
            <strong>{equivalents.domesticFlights}</strong>
            <span>domestic flights</span>
          </div>
          <div className="equiv-item">
            <Zap size={22} />
            <strong>{equivalents.electricityKwh}</strong>
            <span>kWh of electricity</span>
          </div>
          <div className="equiv-item">
            <Car size={22} />
            <strong>{equivalents.drivingKm}</strong>
            <span>km of driving</span>
          </div>
        </div>
      </div>

      {/* ── Sustainability Score ── */}
      <div className="analytics-score panel">
        <div className="score-gauge">
          <svg viewBox="0 0 120 120" role="img" aria-label={`Sustainability score ${score} out of 100`}>
            <circle cx="60" cy="60" r="52" fill="none" stroke="#e8efe9" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#12825a"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 327} 327`}
              transform="rotate(-90 60 60)"
              className="score-ring-animated"
            />
            <text x="60" y="56" textAnchor="middle" className="score-number">
              {score}
            </text>
            <text x="60" y="72" textAnchor="middle" className="score-label">
              / 100
            </text>
          </svg>
        </div>
        <div>
          <h3>Sustainability Score</h3>
          <p>
            Your score reflects overall environmental impact relative to
            recommended sustainable living targets.
          </p>
          <div className="score-breakdown-mini">
            <span>
              <Target size={14} /> Target: 85+
            </span>
            <span>
              <BarChart3 size={14} /> National avg: 62
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Insight Card Component ── */
function InsightCardComponent({ insight }: { insight: InsightCard }) {
  const trendIcon =
    insight.trend === 'down' ? (
      <TrendingDown size={14} />
    ) : insight.trend === 'up' ? (
      <TrendingUp size={14} />
    ) : null;

  return (
    <article
      className={`insight-card panel insight-${insight.type}`}
      aria-label={`${insight.title}: ${insight.value}`}
    >
      <div className="insight-header">
        <span className="insight-icon">{insight.icon}</span>
        <span className="insight-confidence">
          <Brain size={11} /> {insight.confidence}% confidence
        </span>
      </div>
      <h4>{insight.title}</h4>
      <div className="insight-value">
        {trendIcon}
        <strong>{insight.value}</strong>
      </div>
      <p>{insight.detail}</p>
    </article>
  );
}
