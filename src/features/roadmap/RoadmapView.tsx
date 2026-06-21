/**
 * Carbon Reduction Roadmap
 *
 * 30/60/90 day action plan with difficulty, estimated savings,
 * and completion tracking. Properly formatted and accessible.
 */

import { useState } from 'react';
import { Check, Clock3, Flag, LockKeyhole, Sparkles } from 'lucide-react';

interface Task {
  title: string;
  difficulty: 'Easy' | 'Medium';
  carbonSaved: string;
  moneySaved: string;
}

const TASKS_30: Task[] = [
  { title: 'Take public transport twice this week', difficulty: 'Easy', carbonSaved: '31 kg', moneySaved: '₹720' },
  { title: 'Plan three plant-forward lunches', difficulty: 'Easy', carbonSaved: '18 kg', moneySaved: '₹480' },
  { title: 'Run a home energy audit', difficulty: 'Medium', carbonSaved: '22 kg', moneySaved: '₹610' },
  { title: 'Start composting food scraps', difficulty: 'Medium', carbonSaved: '12 kg', moneySaved: '₹160' },
];

const TASKS_60: Task[] = [
  { title: 'Switch to LED lighting in all rooms', difficulty: 'Easy', carbonSaved: '15 kg', moneySaved: '₹380' },
  { title: 'Set up recycling bins for paper, plastic, glass', difficulty: 'Easy', carbonSaved: '9 kg', moneySaved: '₹120' },
  { title: 'Schedule AC to run only 12-4 PM', difficulty: 'Medium', carbonSaved: '28 kg', moneySaved: '₹850' },
  { title: 'Try a refurbished phone or laptop', difficulty: 'Medium', carbonSaved: '35 kg', moneySaved: '₹2,000' },
];

const TASKS_90: Task[] = [
  { title: 'Make 3 metro commutes per week a habit', difficulty: 'Easy', carbonSaved: '42 kg', moneySaved: '₹1,100' },
  { title: 'Join a local community garden', difficulty: 'Medium', carbonSaved: '8 kg', moneySaved: '₹200' },
  { title: 'Install a smart power strip', difficulty: 'Easy', carbonSaved: '11 kg', moneySaved: '₹350' },
  { title: 'Adopt a capsule wardrobe approach', difficulty: 'Medium', carbonSaved: '25 kg', moneySaved: '₹1,500' },
];

const TAB_DATA: Record<string, { tasks: Task[]; potential: string; equiv: string }> = {
  '30': { tasks: TASKS_30, potential: '83 kg CO₂e', equiv: '≈ 4 mature trees growing for one year' },
  '60': { tasks: TASKS_60, potential: '87 kg CO₂e', equiv: '≈ 1 domestic flight offset' },
  '90': { tasks: TASKS_90, potential: '86 kg CO₂e', equiv: '≈ 500 km of driving avoided' },
};

export function RoadmapView() {
  const [activeTab, setActiveTab] = useState('30');
  const [done, setDone] = useState<number[]>([0]);
  const data = TAB_DATA[activeTab];
  const totalTasks = data.tasks.length;
  const completedCount = done.length;
  const progressPct = Math.round((completedCount / totalTasks) * 100);

  return (
    <section className="page-view roadmap-view" role="main" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Flag size={14} /> YOUR ACTION PLAN
          </span>
          <h1>A roadmap built for real life</h1>
          <p>Your next 90 days, broken into achievable wins.</p>
        </div>
      </div>

      <div className="roadmap-tabs" role="tablist" aria-label="Roadmap duration">
        {['30', '60', '90'].map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => {
              setActiveTab(tab);
              setDone(tab === '30' ? [0] : []);
            }}
          >
            {tab} days
          </button>
        ))}
      </div>

      <div className="roadmap-summary">
        <div>
          <span>THIS MONTH'S POTENTIAL</span>
          <strong>{data.potential}</strong>
          <small>{data.equiv}</small>
        </div>
        <div className="roadmap-ring" aria-label={`${progressPct}% complete`}>
          {progressPct}%
          <small>complete</small>
        </div>
      </div>

      <div className="task-list" role="tabpanel">
        {data.tasks.map((task, i) => (
          <article
            key={task.title}
            className={done.includes(i) ? 'done' : ''}
          >
            <button
              onClick={() =>
                setDone((d) =>
                  d.includes(i) ? d.filter((x) => x !== i) : [...d, i],
                )
              }
              aria-label={`Mark "${task.title}" ${done.includes(i) ? 'incomplete' : 'complete'}`}
            >
              {done.includes(i) ? <Check /> : <span />}
            </button>
            <div>
              <strong>{task.title}</strong>
              <span>
                <i className={task.difficulty.toLowerCase()}>
                  {task.difficulty}
                </i>
                <b>{task.carbonSaved} saved</b>
                <b>{task.moneySaved} saved</b>
              </span>
            </div>
            <Clock3 />
          </article>
        ))}
      </div>

      {activeTab === '30' && (
        <div className="locked-plan">
          <LockKeyhole />
          <div>
            <strong>60-day plan unlocks in 18 days</strong>
            <span>Keep completing actions to personalize your next phase.</span>
          </div>
          <Sparkles />
        </div>
      )}
    </section>
  );
}
