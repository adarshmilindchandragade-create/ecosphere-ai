import { ArrowDown, CircleUserRound, Sparkles } from 'lucide-react';
import type { Forecast } from './CarbonTwinForecast';

export function CarbonTwinCard({ forecast }: { forecast: Forecast }) {
  return <article className="twin-card panel" aria-labelledby="carbon-twin-title">
    <div className="panel-head"><div><span className="eyebrow"><Sparkles size={13}/> PREDICTIVE MODEL</span><h3 id="carbon-twin-title">Your Carbon Twin</h3><p>See where today’s habits can take you.</p></div><span className="model-badge">Model confidence 89%</span></div>
    <div className="twin-comparison"><div><CircleUserRound/><span>Current you</span><strong>{forecast.current}</strong><small>kg CO₂e / month</small><b>Score {forecast.currentScore}</b></div><div className="twin-arrow"><ArrowDown/><span>-{Math.round((1-forecast.day90/forecast.current)*100)}%</span></div><div className="future"><Sparkles/><span>Future you · 90 days</span><strong>{forecast.day90}</strong><small>kg CO₂e / month</small><b>Score {forecast.futureScore}</b></div></div>
  </article>;
}
