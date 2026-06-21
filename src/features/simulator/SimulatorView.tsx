/**
 * Scenario Simulator — "What If" Impact Simulator
 *
 * Lets users toggle hypothetical habit changes and instantly
 * see how their carbon footprint, money savings, and environmental
 * impact would change. High demo value — differentiates from
 * generic challenge pages.
 */

import { useState, useMemo } from 'react';
import {
  ArrowDown,
  Leaf,
  Lightbulb,
  Sparkles,
  TrainFront,
  Salad,
  Thermometer,
  Recycle,
  TreePine,
  Plane,
  Zap,
  Car,
} from 'lucide-react';
import type { FootprintInput, ScenarioChange } from '../../types';
import { simulateScenario, totalFootprint, calculateFootprint } from '../../utils/carbon';
import { toEquivalents } from '../../utils/equivalents';

interface Props {
  input: FootprintInput;
}

const DEFAULT_CHANGES: ScenarioChange = {
  metroDaysPerWeek: 0,
  meatFreeMealsPerWeek: 0,
  ledSwitch: false,
  acReductionHours: 0,
  recyclingIncreasePct: 0,
};

export function SimulatorView({ input }: Props) {
  const [changes, setChanges] = useState<ScenarioChange>(DEFAULT_CHANGES);
  const result = useMemo(() => simulateScenario(input, changes), [input, changes]);
  const currentTotal = totalFootprint(calculateFootprint(input));
  const hasChanges =
    changes.metroDaysPerWeek > 0 ||
    changes.meatFreeMealsPerWeek > 0 ||
    changes.ledSwitch ||
    changes.acReductionHours > 0 ||
    changes.recyclingIncreasePct > 0;

  const equivalents = toEquivalents(currentTotal);
  const savedEquivalents = result.equivalents;

  const reductionPct = currentTotal > 0
    ? Math.round(((currentTotal - result.projectedTotal) / currentTotal) * 100)
    : 0;

  return (
    <section className="page-view simulator-view" role="main" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} /> IMPACT SIMULATOR
          </span>
          <h1>What if you changed one habit?</h1>
          <p>
            Adjust the sliders below and watch your footprint, savings, and
            planet impact update in real-time.
          </p>
        </div>
      </div>

      <div className="simulator-grid">
        {/* ── Habit Controls ── */}
        <div className="simulator-controls panel">
          <h3>Choose your changes</h3>

          <div className="sim-control">
            <label htmlFor="sim-metro">
              <TrainFront size={16} />
              <span>Take metro instead of car</span>
              <strong>{changes.metroDaysPerWeek} days/week</strong>
            </label>
            <input
              id="sim-metro"
              type="range"
              min={0}
              max={5}
              value={changes.metroDaysPerWeek}
              onChange={(e) =>
                setChanges({ ...changes, metroDaysPerWeek: Number(e.target.value) })
              }
              aria-label={`Take metro ${changes.metroDaysPerWeek} days per week`}
            />
          </div>

          <div className="sim-control">
            <label htmlFor="sim-meals">
              <Salad size={16} />
              <span>Meat-free meals</span>
              <strong>{changes.meatFreeMealsPerWeek} meals/week</strong>
            </label>
            <input
              id="sim-meals"
              type="range"
              min={0}
              max={14}
              value={changes.meatFreeMealsPerWeek}
              onChange={(e) =>
                setChanges({ ...changes, meatFreeMealsPerWeek: Number(e.target.value) })
              }
              aria-label={`${changes.meatFreeMealsPerWeek} meat-free meals per week`}
            />
          </div>

          <div className="sim-control">
            <label htmlFor="sim-led">
              <Lightbulb size={16} />
              <span>Switch to LED lighting</span>
              <strong>{changes.ledSwitch ? 'Yes' : 'No'}</strong>
            </label>
            <button
              id="sim-led"
              className={`toggle-btn ${changes.ledSwitch ? 'active' : ''}`}
              onClick={() => setChanges({ ...changes, ledSwitch: !changes.ledSwitch })}
              role="switch"
              aria-checked={changes.ledSwitch}
              aria-label="Switch to LED lighting"
            >
              <span />
            </button>
          </div>

          <div className="sim-control">
            <label htmlFor="sim-ac">
              <Thermometer size={16} />
              <span>Reduce AC usage</span>
              <strong>{changes.acReductionHours} hrs/day</strong>
            </label>
            <input
              id="sim-ac"
              type="range"
              min={0}
              max={Math.max(1, input.acHoursPerDay)}
              value={changes.acReductionHours}
              onChange={(e) =>
                setChanges({ ...changes, acReductionHours: Number(e.target.value) })
              }
              aria-label={`Reduce AC by ${changes.acReductionHours} hours per day`}
            />
          </div>

          <div className="sim-control">
            <label htmlFor="sim-recycle">
              <Recycle size={16} />
              <span>Increase recycling</span>
              <strong>+{changes.recyclingIncreasePct}%</strong>
            </label>
            <input
              id="sim-recycle"
              type="range"
              min={0}
              max={Math.min(85, 100 - input.recyclingPct)}
              value={changes.recyclingIncreasePct}
              onChange={(e) =>
                setChanges({ ...changes, recyclingIncreasePct: Number(e.target.value) })
              }
              aria-label={`Increase recycling by ${changes.recyclingIncreasePct} percent`}
            />
          </div>

          <button
            className="reset-btn"
            onClick={() => setChanges(DEFAULT_CHANGES)}
            disabled={!hasChanges}
          >
            Reset all
          </button>
        </div>

        {/* ── Results Panel ── */}
        <div className="simulator-results">
          <div className="sim-comparison panel">
            <div className="sim-current">
              <span>Current footprint</span>
              <strong>
                {currentTotal} <small>kg CO₂e</small>
              </strong>
            </div>
            <div className="sim-arrow" aria-hidden="true">
              <ArrowDown size={20} />
              {hasChanges && <em>-{reductionPct}%</em>}
            </div>
            <div className={`sim-projected ${hasChanges ? 'active' : ''}`}>
              <span>Projected footprint</span>
              <strong>
                {result.projectedTotal} <small>kg CO₂e</small>
              </strong>
            </div>
          </div>

          <div className="sim-savings-grid">
            <article className="sim-saving panel">
              <Leaf size={18} />
              <div>
                <span>Carbon saved</span>
                <strong>{result.savingsKg} kg</strong>
              </div>
            </article>
            <article className="sim-saving panel">
              <span className="rupee-icon">₹</span>
              <div>
                <span>Money saved</span>
                <strong>₹{result.moneySaved.toLocaleString()}/mo</strong>
              </div>
            </article>
          </div>

          {/* ── Environmental Equivalents ── */}
          <div className="equivalents-card panel" aria-label="Environmental equivalents of your savings">
            <h3>Your savings equal</h3>
            <div className="equiv-grid">
              <div className="equiv-item">
                <TreePine size={20} />
                <strong>{savedEquivalents.treesNeeded}</strong>
                <span>trees/year</span>
              </div>
              <div className="equiv-item">
                <Plane size={20} />
                <strong>{savedEquivalents.domesticFlights}</strong>
                <span>flights saved</span>
              </div>
              <div className="equiv-item">
                <Zap size={20} />
                <strong>{savedEquivalents.electricityKwh}</strong>
                <span>kWh electricity</span>
              </div>
              <div className="equiv-item">
                <Car size={20} />
                <strong>{savedEquivalents.drivingKm}</strong>
                <span>km not driven</span>
              </div>
            </div>
          </div>

          {/* ── Category Breakdown ── */}
          {hasChanges && (
            <div className="sim-categories panel" aria-label="Savings by category">
              <h3>Savings by category</h3>
              {(Object.entries(result.categoryDeltas) as [string, number][])
                .filter(([, v]) => v > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, val]) => (
                  <div className="sim-cat-row" key={cat}>
                    <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                    <div className="sim-cat-bar">
                      <i
                        style={{
                          width: `${Math.min(100, Math.round((val / currentTotal) * 100) * 5)}%`,
                        }}
                      />
                    </div>
                    <strong>-{val} kg</strong>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
