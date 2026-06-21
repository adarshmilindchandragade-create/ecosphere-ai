import React from 'react';
import { Brain, Car, Home, Salad, Trash2 } from 'lucide-react';

export function AIOrb() {
  return (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer Glows */}
      <div className="orb-breathe" style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.3, mixBlendMode: 'screen', filter: 'blur(40px)' }}></div>
      <div className="orb-breathe" style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--secondary)', opacity: 0.3, mixBlendMode: 'screen', filter: 'blur(30px)', animationDelay: '1s' }}></div>
      <div className="orb-breathe" style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--accent)', opacity: 0.3, mixBlendMode: 'screen', filter: 'blur(20px)', animationDelay: '2s' }}></div>

      {/* Inner Core / Meaningful Data */}
      <div style={{
        position: 'relative', zIndex: 10, width: '120px', height: '120px', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(2,6,23,0.9))',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 0 50px rgba(34, 197, 94,0.2) inset, 0 0 30px var(--primary-glow)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#fff', textAlign: 'center'
      }}>
        <Brain size={24} color="var(--primary)" style={{ marginBottom: '4px' }} />
        <strong style={{ fontSize: '14px', fontFamily: 'var(--font-heading)' }}>Terra AI</strong>
        <span style={{ fontSize: '10px', color: 'var(--secondary)' }}>92% Confidence</span>
      </div>

      {/* Orbiting Indicators */}
      <div className="animate-orbit-cw" style={{ position: 'absolute', animationDelay: '0s' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--primary)', display: 'grid', placeItems: 'center', color: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}>
          <Car size={14} />
        </div>
      </div>

      <div className="animate-orbit-cw" style={{ position: 'absolute', animationDelay: '-5s' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--secondary)', display: 'grid', placeItems: 'center', color: 'var(--secondary)', boxShadow: '0 0 10px var(--secondary-glow)' }}>
          <Home size={14} />
        </div>
      </div>

      <div className="animate-orbit-ccw" style={{ position: 'absolute', animationDelay: '0s' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--accent)', display: 'grid', placeItems: 'center', color: 'var(--accent)', boxShadow: '0 0 10px var(--accent-glow)' }}>
          <Salad size={14} />
        </div>
      </div>

      <div className="animate-orbit-ccw" style={{ position: 'absolute', animationDelay: '-12.5s' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.3)', display: 'grid', placeItems: 'center', color: '#fff' }}>
          <Trash2 size={14} />
        </div>
      </div>
    </div>
  );
}
