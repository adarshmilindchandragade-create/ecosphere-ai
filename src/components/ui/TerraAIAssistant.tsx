import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

export function TerraAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '1rem'
    }}>
      {isOpen && (
        <div className="glass-panel animate-fade-in-up" style={{
          width: '320px',
          height: '400px',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1rem',
            background: 'var(--brand-gradient)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Terra AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>
          
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-color)', padding: '0.75rem', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--text-primary)', alignSelf: 'flex-start', maxWidth: '85%' }}>
              Hi! I'm Terra, your personal sustainability coach. How can I help you reduce your footprint today?
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>
                Analyze my footprint
              </button>
              <button style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>
                How to reduce emissions?
              </button>
            </div>
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Ask Terra..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button style={{
              width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer'
            }}>
              <Send size={16} style={{ marginLeft: '-2px' }} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--primary)',
          border: 'none',
          boxShadow: 'var(--shadow-xl)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Sparkles size={24} />
      </button>
    </div>
  );
}
