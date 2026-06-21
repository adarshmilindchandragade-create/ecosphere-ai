import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck } from 'lucide-react';
import { AIOrb } from '../../components/ui/AIOrb';
import { TiltCard } from '../../components/ui/TiltCard';

export function SignUpPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let s = 0;
    if (password.length > 5) s += 25;
    if (password.length > 8) s += 25;
    if (/[A-Z]/.test(password)) s += 25;
    if (/[0-9]/.test(password)) s += 25;
    setStrength(s);
  }, [password]);

  const handleDemoSignup = (e: React.FormEvent) => {
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
        
        <TiltCard style={{ position: 'absolute', bottom: '15%', right: '15%', width: '260px', padding: '1.25rem', borderRadius: '16px', zIndex: 11 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your Journey Begins Here</div>
          <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>Join a movement of 24k+ individuals reaching zero emissions.</p>
        </TiltCard>
      </div>

      {/* Right Column: Sign Up Form */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--card-bg)', backdropFilter: 'blur(20px)', overflowY: 'auto', padding: '2rem 0' }}>
        <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Create Account</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Set up your profile to generate your Carbon Twin.</p>
          </div>

          <form onSubmit={handleDemoSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>First Name</label>
                <input type="text" placeholder="Alex" required className="premium-input" style={{ paddingLeft: '1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Last Name</label>
                <input type="text" placeholder="Morgan" required className="premium-input" style={{ paddingLeft: '1rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Work Email</label>
              <input type="email" placeholder="alex@company.com" required className="premium-input" style={{ paddingLeft: '1rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Password</label>
              <input type="password" placeholder="Create a strong password" required className="premium-input" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingLeft: '1rem' }} />
              
              <div style={{ display: 'flex', gap: '4px', marginTop: '0.75rem', height: '4px' }}>
                {[1, 2, 3, 4].map(level => (
                  <div key={level} style={{ flex: 1, borderRadius: '2px', background: level * 25 <= strength ? (strength === 100 ? 'var(--primary)' : strength > 50 ? 'var(--secondary)' : '#f59e0b') : 'var(--border-color)', transition: 'background 0.3s ease' }}></div>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'right' }}>
                {strength === 100 ? 'Excellent' : strength > 50 ? 'Good' : strength > 0 ? 'Weak' : 'Required'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" required style={{ accentColor: 'var(--primary)', marginTop: '0.25rem' }} /> 
              <span>By continuing, you agree to EcoSphere's <a href="#" style={{ color: 'var(--primary)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary)' }}>Privacy Policy</a>.</span>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
              Create Account <ArrowRight size={18} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }} />
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
            <ShieldCheck size={14} /> Secured by Enterprise-Grade Encryption
          </div>
        </div>
      </div>
    </div>
  );
}
