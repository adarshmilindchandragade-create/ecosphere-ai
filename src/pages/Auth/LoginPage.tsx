import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, ArrowRight, Github } from 'lucide-react';
import { AIOrb } from '../../components/ui/AIOrb';
import { TiltCard } from '../../components/ui/TiltCard';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('auth', 'true');
    navigate('/demo');
  };

  return (
    <div className="landing-theme page-enter page-enter-active" style={{ minHeight: '100vh', display: 'flex', overflow: 'hidden' }}>
      
      {/* Left Column: AI Identity & Stats */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '4rem', background: 'var(--bg-color)', borderRight: '1px solid var(--border-color)' }}>
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--primary)' }}><Leaf size={24} /></span>
            EcoSphere<small style={{ color: 'var(--primary)' }}>AI</small>
          </Link>
        </div>

        <div className="animate-float-slow" style={{ zIndex: 10, position: 'relative' }}>
          <AIOrb />
        </div>
        
        <TiltCard style={{ position: 'absolute', bottom: '15%', left: '15%', width: '220px', padding: '1.25rem', borderRadius: '16px', zIndex: 11 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Active Carbon Twins</div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>24,892</span>
        </TiltCard>

        <TiltCard style={{ position: 'absolute', top: '25%', right: '15%', width: '220px', padding: '1.25rem', borderRadius: '16px', zIndex: 11 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>AI Accuracy Score</div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}>99.2%</span>
        </TiltCard>
      </div>

      {/* Right Column: Authentication Form */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--card-bg)', backdropFilter: 'blur(20px)' }}>
        <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Welcome back</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Log in to access your Carbon Twin and insights.</p>
          </div>

          <form onSubmit={handleDemoLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Email</label>
              <input type="email" placeholder="alex@example.com" className="premium-input" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Password</label>
              <input type="password" placeholder="••••••••" className="premium-input" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> Remember me
              </label>
              <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
              Log in securely <ArrowRight size={18} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0', color: 'var(--border-color)' }}>
            <div style={{ flex: 1, height: '1px', background: 'currentColor' }}></div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'currentColor' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button onClick={handleDemoLogin} className="btn-secondary" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', padding: '0.75rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button onClick={handleDemoLogin} className="btn-secondary" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', padding: '0.75rem' }}>
              <Github size={20} />
              GitHub
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
