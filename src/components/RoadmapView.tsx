import { Check, Clock3, Flag, LockKeyhole, Sparkles } from 'lucide-react'; import { useState } from 'react';
const tasks = [['Take public transport twice this week','Easy','31 kg','₹720'],['Plan three plant-forward lunches','Easy','18 kg','₹480'],['Run a home energy audit','Medium','22 kg','₹610'],['Start composting food scraps','Medium','12 kg','₹160']];
export function RoadmapView() {
  const [done,setDone]=useState<number[]>([0]);
  return <section className="page-view roadmap-view"><div className="page-heading"><div><span className="eyebrow"><Flag size={14}/> YOUR ACTION PLAN</span><h1>A roadmap built for real life</h1><p>Your next 90 days, broken into achievable wins.</p></div></div>
    <div className="roadmap-tabs"><button className="active">30 days</button><button>60 days</button><button>90 days</button></div><div className="roadmap-summary"><div><span>THIS MONTH'S POTENTIAL</span><strong>83 kg CO₂e</strong><small>≈ 4 mature trees growing for one year</small></div><div className="roadmap-ring">25%<small>complete</small></div></div>
    <div className="task-list">{tasks.map((t,i)=><article key={t[0]} className={done.includes(i)?'done':''}><button onClick={()=>setDone(d=>d.includes(i)?d.filter(x=>x!==i):[...d,i])} aria-label={`Mark ${t[0]} complete`}>{done.includes(i)?<Check/>:<span/>}</button><div><strong>{t[0]}</strong><span><i className={t[1].toLowerCase()}>{t[1]}</i><b>{t[2]} saved</b><b>{t[3]} saved</b></span></div><Clock3/></article>)}</div><div className="locked-plan"><LockKeyhole/><div><strong>60-day plan unlocks in 18 days</strong><span>Keep completing actions to personalize your next phase.</span></div><Sparkles/></div>
  </section>;
}
