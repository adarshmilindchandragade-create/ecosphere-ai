import type { Forecast } from './CarbonTwinForecast';

export function CarbonTwinComparison({ forecast }: { forecast: Forecast }) {
  const points = [forecast.current, Math.round((forecast.current + forecast.day90) / 2), forecast.day90, Math.round((forecast.day90 + forecast.year) / 2), forecast.year];
  return <article className="forecast-card panel"><div className="panel-head"><div><h3>One-year trajectory</h3><p>If you complete 70% of your roadmap</p></div><strong>{forecast.year} kg</strong></div><div className="forecast-bars" role="img" aria-label={`Predicted footprint falls from ${forecast.current} to ${forecast.year} kilograms CO2 equivalent per month over one year`}>{points.map((point,i)=><div key={i}><i style={{height:`${Math.round(point/forecast.current*100)}%`}}/><span>{['Now','30d','90d','6m','1yr'][i]}</span></div>)}</div></article>;
}
