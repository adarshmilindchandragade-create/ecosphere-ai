import { useMemo, useState } from 'react';
import { ArrowRight, Car, Home, Salad, ShoppingBag, Sparkles, Trash2 } from 'lucide-react';
import { calculateFootprint, sustainabilityScore, totalFootprint } from '../utils/carbon';
import type { FootprintInput } from '../types';
export function CalculatorView() {
  const [input, setInput] = useState<FootprintInput>({
    carKm: 20, busKm: 0, metroKm: 0, bikeKm: 0, flightHoursPerYear: 0,
    electricityKwh: 180, acHoursPerDay: 0, applianceKwh: 0,
    diet: 'mixed', localSourcePct: 0,
    electronicsSpend: 0, fashionSpend: 0, generalSpend: 200,
    wasteBags: 3, recyclingPct: 0
  });
  const result = useMemo(()=>calculateFootprint(input),[input]); const total = totalFootprint(result);
  const num = (key:keyof FootprintInput, value:string) => setInput({...input,[key]:Math.max(0,Number(value))});
  return <section className="page-view calculator-view"><div className="page-heading"><div><span className="eyebrow"><Sparkles size={14}/> SMART CALCULATOR</span><h1>Measure what matters</h1><p>Get a practical estimate in under two minutes.</p></div></div>
    <div className="calculator-grid"><form className="calculator-form" onSubmit={e=>e.preventDefault()}>
      <div className="field"><label htmlFor="commute"><Car/>Daily car commute <span>km/day</span></label><input id="commute" type="number" min="0" value={input.carKm} onChange={e=>num('carKm',e.target.value)}/></div>
      <div className="field"><label htmlFor="energy"><Home/>Monthly electricity <span>kWh</span></label><input id="energy" type="number" min="0" value={input.electricityKwh} onChange={e=>num('electricityKwh',e.target.value)}/></div>
      <div className="field"><label htmlFor="diet"><Salad/>Your usual diet</label><select id="diet" value={input.diet} onChange={e=>setInput({...input,diet:e.target.value as FootprintInput['diet']})}><option value="plant">Plant-forward</option><option value="mixed">Mixed diet</option><option value="meat">Meat-heavy</option></select></div>
      <div className="field"><label htmlFor="shopping"><ShoppingBag/>Monthly shopping <span>₹</span></label><input id="shopping" type="number" min="0" value={input.generalSpend} onChange={e=>num('generalSpend',e.target.value)}/></div>
      <div className="field"><label htmlFor="waste"><Trash2/>Landfill waste <span>bags/week</span></label><input id="waste" type="number" min="0" value={input.wasteBags} onChange={e=>num('wasteBags',e.target.value)}/></div>
    </form><aside className="result-card" aria-live="polite"><span>Your estimated footprint</span><div className="result-number"><strong>{total}</strong><small>kg CO₂e<br/>per month</small></div><div className="score-row"><span>Sustainability score</span><b>{sustainabilityScore(total)}/100</b></div><div className="score-bar"><i style={{width:`${sustainabilityScore(total)}%`}}/></div><p>Your biggest opportunity is <strong>{Object.entries(result).sort((a,b)=>b[1]-a[1])[0][0]}</strong>. Terra can build a tailored reduction plan from this result.</p><button>Build my roadmap <ArrowRight size={17}/></button></aside></div>
  </section>;
}
