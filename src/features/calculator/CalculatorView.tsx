/**
 * Smart Carbon Calculator — Expanded Edition
 *
 * All 5 categories with sub-categories:
 * - Transport: car, bus, metro, bike, flight
 * - Energy: electricity, AC, appliances
 * - Food: diet, local sourcing
 * - Shopping: electronics, fashion, general
 * - Waste: landfill bags, recycling %
 *
 * Real-time results with environmental equivalents.
 */

import { useMemo } from 'react';
import {
  ArrowRight,
  Bike,
  Bus,
  Car,
  Home,
  Leaf,
  Plane,
  Recycle,
  Salad,
  ShoppingBag,
  Sparkles,
  Thermometer,
  TrainFront,
  Trash2,
  TreePine,
  Tv,
  Zap,
} from 'lucide-react';
import type { FootprintInput } from '../../types';
import { calculateFootprint, totalFootprint, sustainabilityScore, categoryShares } from '../../utils/carbon';
import { toEquivalents } from '../../utils/equivalents';

interface Props {
  input: FootprintInput;
  onInputChange: (input: FootprintInput) => void;
  onNavigate: (page: string) => void;
}

export function CalculatorView({ input, onInputChange, onNavigate }: Props) {
  const breakdown = useMemo(() => calculateFootprint(input), [input]);
  const total = totalFootprint(breakdown);
  const score = sustainabilityScore(total);
  const shares = categoryShares(breakdown);
  const equivalents = toEquivalents(total);

  const num = (key: keyof FootprintInput, value: string) =>
    onInputChange({ ...input, [key]: Math.max(0, Number(value)) });

  const topCategory = Object.entries(shares).sort((a, b) => b[1] - a[1])[0];

  return (
    <section className="page-view calculator-view" role="main" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} /> SMART CALCULATOR
          </span>
          <h1>Measure what matters</h1>
          <p>Get a comprehensive estimate across 5 emission categories.</p>
        </div>
      </div>

      <div className="calculator-grid">
        <form className="calculator-form" onSubmit={(e) => e.preventDefault()}>
          {/* ── Transport Section ── */}
          <fieldset className="calc-section">
            <legend>
              <Car size={16} /> Transport
            </legend>

            <div className="field">
              <label htmlFor="calc-car">
                <Car size={14} /> Daily car commute <span>km/day</span>
              </label>
              <input
                id="calc-car"
                type="number"
                min="0"
                value={input.carKm}
                onChange={(e) => num('carKm', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-bus">
                <Bus size={14} /> Daily bus travel <span>km/day</span>
              </label>
              <input
                id="calc-bus"
                type="number"
                min="0"
                value={input.busKm}
                onChange={(e) => num('busKm', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-metro">
                <TrainFront size={14} /> Daily metro travel <span>km/day</span>
              </label>
              <input
                id="calc-metro"
                type="number"
                min="0"
                value={input.metroKm}
                onChange={(e) => num('metroKm', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-bike">
                <Bike size={14} /> Daily cycling <span>km/day</span>
              </label>
              <input
                id="calc-bike"
                type="number"
                min="0"
                value={input.bikeKm}
                onChange={(e) => num('bikeKm', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-flight">
                <Plane size={14} /> Flight hours <span>hours/year</span>
              </label>
              <input
                id="calc-flight"
                type="number"
                min="0"
                value={input.flightHoursPerYear}
                onChange={(e) => num('flightHoursPerYear', e.target.value)}
              />
            </div>
          </fieldset>

          {/* ── Energy Section ── */}
          <fieldset className="calc-section">
            <legend>
              <Zap size={16} /> Energy
            </legend>

            <div className="field">
              <label htmlFor="calc-elec">
                <Home size={14} /> Monthly electricity <span>kWh</span>
              </label>
              <input
                id="calc-elec"
                type="number"
                min="0"
                value={input.electricityKwh}
                onChange={(e) => num('electricityKwh', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-ac">
                <Thermometer size={14} /> AC usage <span>hrs/day</span>
              </label>
              <input
                id="calc-ac"
                type="number"
                min="0"
                value={input.acHoursPerDay}
                onChange={(e) => num('acHoursPerDay', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-appliance">
                <Tv size={14} /> Other appliances <span>kWh/mo</span>
              </label>
              <input
                id="calc-appliance"
                type="number"
                min="0"
                value={input.applianceKwh}
                onChange={(e) => num('applianceKwh', e.target.value)}
              />
            </div>
          </fieldset>

          {/* ── Food Section ── */}
          <fieldset className="calc-section">
            <legend>
              <Salad size={16} /> Food
            </legend>

            <div className="field">
              <label htmlFor="calc-diet">
                <Leaf size={14} /> Your usual diet
              </label>
              <select
                id="calc-diet"
                value={input.diet}
                onChange={(e) =>
                  onInputChange({
                    ...input,
                    diet: e.target.value as FootprintInput['diet'],
                  })
                }
              >
                <option value="plant">Plant-forward</option>
                <option value="mixed">Mixed diet</option>
                <option value="meat">Meat-heavy</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="calc-local">
                <TreePine size={14} /> Local sourcing <span>%</span>
              </label>
              <input
                id="calc-local"
                type="range"
                min="0"
                max="100"
                value={input.localSourcePct}
                onChange={(e) => num('localSourcePct', e.target.value)}
                aria-label={`${input.localSourcePct}% locally sourced food`}
              />
              <span className="range-value">{input.localSourcePct}%</span>
            </div>
          </fieldset>

          {/* ── Shopping Section ── */}
          <fieldset className="calc-section">
            <legend>
              <ShoppingBag size={16} /> Shopping
            </legend>

            <div className="field">
              <label htmlFor="calc-electronics">
                <Tv size={14} /> Electronics <span>₹/mo</span>
              </label>
              <input
                id="calc-electronics"
                type="number"
                min="0"
                value={input.electronicsSpend}
                onChange={(e) => num('electronicsSpend', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-fashion">
                <ShoppingBag size={14} /> Fashion <span>₹/mo</span>
              </label>
              <input
                id="calc-fashion"
                type="number"
                min="0"
                value={input.fashionSpend}
                onChange={(e) => num('fashionSpend', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-general">
                <ShoppingBag size={14} /> General purchases <span>₹/mo</span>
              </label>
              <input
                id="calc-general"
                type="number"
                min="0"
                value={input.generalSpend}
                onChange={(e) => num('generalSpend', e.target.value)}
              />
            </div>
          </fieldset>

          {/* ── Waste Section ── */}
          <fieldset className="calc-section">
            <legend>
              <Trash2 size={16} /> Waste
            </legend>

            <div className="field">
              <label htmlFor="calc-waste">
                <Trash2 size={14} /> Landfill bags <span>bags/week</span>
              </label>
              <input
                id="calc-waste"
                type="number"
                min="0"
                value={input.wasteBags}
                onChange={(e) => num('wasteBags', e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="calc-recycle">
                <Recycle size={14} /> Recycling rate <span>%</span>
              </label>
              <input
                id="calc-recycle"
                type="range"
                min="0"
                max="100"
                value={input.recyclingPct}
                onChange={(e) => num('recyclingPct', e.target.value)}
                aria-label={`${input.recyclingPct}% recycling rate`}
              />
              <span className="range-value">{input.recyclingPct}%</span>
            </div>
          </fieldset>
        </form>

        {/* ── Results Card ── */}
        <aside className="result-card" aria-live="polite">
          <span>Your estimated footprint</span>
          <div className="result-number">
            <strong>{total}</strong>
            <small>
              kg CO₂e
              <br />
              per month
            </small>
          </div>

          <div className="score-row">
            <span>Sustainability score</span>
            <b>{score}/100</b>
          </div>
          <div className="score-bar">
            <i style={{ width: `${score}%` }} />
          </div>

          {/* Category Breakdown */}
          <div className="result-categories">
            {(Object.entries(breakdown) as [string, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([cat, val]) => (
                <div className="result-cat-row" key={cat}>
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  <div className="result-cat-bar">
                    <i style={{ width: `${Math.round((val / total) * 100)}%` }} />
                  </div>
                  <strong>{val} kg</strong>
                </div>
              ))}
          </div>

          {/* Environmental Equivalents */}
          <div className="result-equiv">
            <span>That equals:</span>
            <div>🌳 {equivalents.treesNeeded} trees/year to absorb</div>
            <div>✈️ {equivalents.domesticFlights} domestic flights</div>
            <div>⚡ {equivalents.electricityKwh} kWh electricity</div>
          </div>

          <p>
            Your biggest opportunity is <strong>{topCategory[0]}</strong> ({topCategory[1]}%).
            Terra can build a tailored reduction plan.
          </p>
          <button onClick={() => onNavigate('Simulator')}>
            Try the simulator <ArrowRight size={17} />
          </button>
        </aside>
      </div>
    </section>
  );
}
