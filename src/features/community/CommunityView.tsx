/**
 * Community Impact Board
 *
 * Simplified community page — no fake social media.
 * Shows: leaderboard, eco tips carousel, and community impact stats.
 * Clean, credible, and easy to implement without auth.
 */

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Sparkles,
  TreePine,
  Trophy,
  Users,
} from 'lucide-react';

const LEADERBOARD = [
  { rank: 1, name: 'Maya R.', initials: 'MR', points: 3420, badge: 'Planet Guardian', reduced: 142 },
  { rank: 2, name: 'Dev K.', initials: 'DK', points: 3180, badge: 'Climate Warrior', reduced: 128 },
  { rank: 3, name: 'Alex M.', initials: 'AM', points: 1840, badge: 'Green Explorer', reduced: 81, isYou: true },
  { rank: 4, name: 'Samira P.', initials: 'SP', points: 1720, badge: 'Green Explorer', reduced: 76 },
  { rank: 5, name: 'Ravi T.', initials: 'RT', points: 1580, badge: 'Green Explorer', reduced: 68 },
];

const ECO_TIPS = [
  { author: 'Maya R.', tip: 'I switched to a bamboo toothbrush and reusable bags — small but it adds up over months!', likes: 24 },
  { author: 'Dev K.', tip: 'Meal prepping Sunday cuts food waste by 40% for me. Plus I save ₹2,000/month.', likes: 31 },
  { author: 'Samira P.', tip: 'Taking the metro Mon-Wed and cycling Thu-Fri. My transport footprint is down 38%.', likes: 19 },
  { author: 'Ravi T.', tip: 'Unplugging chargers and standby devices saved me 12 kWh/month. Every bit counts.', likes: 15 },
];

const COMMUNITY_STATS = [
  { label: 'Total CO₂ reduced', value: '4.2 tonnes', icon: '🌍' },
  { label: 'Active members', value: '1,247', icon: '👥' },
  { label: 'Trees equivalent', value: '191 trees', icon: '🌳' },
  { label: 'Challenges completed', value: '3,891', icon: '🏆' },
];

export function CommunityView() {
  const [tipIndex, setTipIndex] = useState(0);

  const nextTip = () => setTipIndex((i) => (i + 1) % ECO_TIPS.length);
  const prevTip = () => setTipIndex((i) => (i - 1 + ECO_TIPS.length) % ECO_TIPS.length);

  return (
    <section className="page-view community-view" role="main" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Users size={14} /> COMMUNITY IMPACT
          </span>
          <h1>Better together</h1>
          <p>Learn from people turning small choices into collective impact.</p>
        </div>
      </div>

      {/* ── Community Stats ── */}
      <div className="community-stats-grid" aria-label="Community impact statistics">
        {COMMUNITY_STATS.map((stat) => (
          <article className="community-stat panel" key={stat.label}>
            <span className="stat-emoji">{stat.icon}</span>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      {/* ── Leaderboard ── */}
      <div className="leaderboard panel">
        <div className="panel-head">
          <div>
            <h3>
              <Trophy size={16} /> This month's climate leaders
            </h3>
          </div>
        </div>
        {LEADERBOARD.map((person) => (
          <div
            className={person.isYou ? 'you' : ''}
            key={person.name}
          >
            <b className={`rank rank-${person.rank}`}>{person.rank}</b>
            <span className="avatar">{person.initials}</span>
            <div className="leader-info">
              <strong>
                {person.name}
                {person.isYou && <small>You</small>}
              </strong>
              <span className="leader-badge">{person.badge}</span>
            </div>
            <div className="leader-stats">
              <em>{person.points.toLocaleString()} pts</em>
              <span className="leader-reduced">
                <Leaf size={11} /> -{person.reduced} kg
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Eco Tips Carousel ── */}
      <div className="eco-tips panel">
        <div className="panel-head">
          <div>
            <h3>
              <Sparkles size={16} /> Community eco tips
            </h3>
          </div>
          <div className="tip-nav">
            <button onClick={prevTip} aria-label="Previous tip">
              <ChevronLeft size={16} />
            </button>
            <span>
              {tipIndex + 1}/{ECO_TIPS.length}
            </span>
            <button onClick={nextTip} aria-label="Next tip">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <blockquote className="tip-card">
          <p>"{ECO_TIPS[tipIndex].tip}"</p>
          <footer>
            <strong>{ECO_TIPS[tipIndex].author}</strong>
            <span>
              <TreePine size={12} /> {ECO_TIPS[tipIndex].likes} found helpful
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
