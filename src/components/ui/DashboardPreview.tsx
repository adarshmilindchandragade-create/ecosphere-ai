import React, { useState } from 'react';
import { Sparkles, TrendingDown } from 'lucide-react';
import { CountUp } from './CountUp';

export function DashboardPreview() {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const data = [15, 14, 13, 11, 12, 10, 8];
  const max = 16;
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`).join(' ');

  return (
    <div className="glass-panel-dark animate-fade-in-up" style={{ 
      width: '100%', maxWidth: '500px', padding: '1.5rem', borderRadius: '24px', 
      position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)',
      background: 'rgba(15, 23, 42, 0.8)', zIndex: 30
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></span>
            <span style={{ fontSize: '0.875rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Live Dashboard</span>
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fff' }}>Sustainability Profile</h3>
        </div>
        <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '0.5rem 1rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={14} color="var(--primary)" />
          <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.875rem' }}>Score: <CountUp end={84} />/100</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Current Footprint</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fff' }}><CountUp end={462} /></span>
            <span style={{ color: '#94A3B8', fontWeight: 600 }}>kg</span>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Projected Savings</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}><CountUp end={124} /></span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>kg</span>
          </div>
        </div>
      </div>

      {/* SVG Trend Chart */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ color: '#94A3B8', fontSize: '0.875rem', fontWeight: 600 }}>Weekly Emissions Trend</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 700 }}><TrendingDown size={14} /> -14%</span>
        </div>
        
        <div style={{ position: 'relative', height: '100px', width: '100%' }} onMouseLeave={() => setHoveredDay(null)}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--secondary)" />
                <stop offset="100%" stopColor="var(--primary)" />
              </linearGradient>
              <linearGradient id="fill-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,100 ${points} 100,100`} fill="url(#fill-gradient)" />
            <polyline points={points} fill="none" stroke="url(#line-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            
            {data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 100 - (d / max) * 100;
              const isHovered = hoveredDay === i;
              return (
                <g key={i} style={{ cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={() => setHoveredDay(i)}>
                  <circle cx={x} cy={y} r={isHovered ? "4" : "0"} fill="#fff" stroke="var(--primary)" strokeWidth="2" style={{ transition: 'r 0.2s' }} />
                  <circle cx={x} cy={y} r="8" fill="transparent" />
                </g>
              );
            })}
          </svg>

          {hoveredDay !== null && (
            <div style={{
              position: 'absolute',
              left: `${(hoveredDay / (data.length - 1)) * 100}%`,
              top: `${100 - (data[hoveredDay] / max) * 100}%`,
              transform: 'translate(-50%, -120%)',
              background: '#fff',
              color: '#0F172A',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 800,
              pointerEvents: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              zIndex: 20
            }}>
              {data[hoveredDay] * 10}kg
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
