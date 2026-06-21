import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, Zap, Target, Brain, BarChart3, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AIOrb } from '../../components/ui/AIOrb';
import { CountUp } from '../../components/ui/CountUp';
import { DashboardPreview } from '../../components/ui/DashboardPreview';

export function LandingPage() {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.classList.add('dark'); // Force dark mode for premium feel
    return () => { 
      document.documentElement.style.scrollBehavior = 'auto'; 
      document.body.classList.remove('dark');
    }
  }, []);

  const calculateFootprint = () => Math.round(462 - (sliderValue * 185));
  const currentFootprint = calculateFootprint();

  return (
    <div className="page-enter page-enter-active" style={{ background: '#020617', color: '#fff', minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section className="hero-dark-bg" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '10rem 2rem 4rem',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', width: '100%', position: 'relative', zIndex: 10 }}>
          
          {/* Left Column */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="glass-panel-dark animate-fade-in-up" style={{ padding: '0.5rem 1.25rem', borderRadius: '30px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></span>
              <span className="text-gradient">Terra AI Engine v2.0 Live</span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-2px', color: '#fff' }}>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Track.</div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Understand.</div>
              <div className="animate-fade-in-up text-gradient" style={{ animationDelay: '0.3s' }}>Reduce. Sustain.</div>
            </h1>
            
            <p className="animate-fade-in-up" style={{ animationDelay: '0.4s', fontSize: '1.25rem', color: '#94A3B8', maxWidth: '500px', marginBottom: '3rem', lineHeight: 1.6 }}>
              Turn your lifestyle into actionable climate intelligence with AI-powered sustainability forecasting.
            </p>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', display: 'flex', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => navigate('/signup')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '1rem 2rem', background: '#fff', color: '#0F172A', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                Get Started <ArrowRight size={20} />
              </button>
              <button className="btn-secondary" onClick={() => navigate('/demo')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '1rem 2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                Try Demo <Zap size={20} />
              </button>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s', display: 'flex', gap: '1.5rem', color: '#64748B', fontSize: '0.875rem', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Target size={16} color="var(--primary)"/> Free Demo</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} color="var(--primary)"/> Privacy Focused</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Brain size={16} color="var(--primary)"/> AI Insights</span>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)', zIndex: 0 }}>
              <AIOrb />
            </div>
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding: '6rem 2rem', background: '#0F172A', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '2px', color: '#64748B', textTransform: 'uppercase', marginBottom: '3rem' }}>TRUSTED BY SUSTAINABILITY ENTHUSIASTS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[{role: "Student", co2: 42, score: 88}, {role: "Professional", co2: 28, score: 94}, {role: "Family of 4", co2: 35, score: 82}, {role: "Startup Founder", co2: 45, score: 91}].map((user, i) => (
              <div key={i} className="glass-panel-dark" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800, margin: '0 auto 1rem' }}>{user.role[0]}</div>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>{user.role}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>-{user.co2}% CO₂</span>
                  <span style={{ color: '#94A3B8' }}>Score: {user.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIO SIMULATOR */}
      <section style={{ padding: '8rem 2rem', position: 'relative', background: '#020617' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px', color: '#fff' }}>Real-time Scenario Simulator</h2>
            <p style={{ fontSize: '1.25rem', color: '#94A3B8' }}>Adjust your lifestyle choices and instantly see the impact. Zero latency.</p>
          </div>
          
          <div className="glass-panel-dark" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', padding: '4rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>Commitment Level</h3>
              <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>Move the slider to simulate adopting more sustainable habits like public transport, plant-based meals, and green energy.</p>
              
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={sliderValue} 
                onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', outline: 'none' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.875rem', fontWeight: 600, color: '#64748B' }}>
                <span>Minor Tweaks</span>
                <span>Full Eco-Warrior</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '1rem' }}>Projected Footprint</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1, color: '#fff' }}>{currentFootprint}</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#94A3B8' }}>kg</span>
              </div>
              <div style={{ background: 'rgba(34, 197, 94, 0.2)', color: 'var(--primary)', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: 700 }}>
                Savings: -{462 - currentFootprint}kg
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ECOSPHERE */}
      <section id="features" style={{ padding: '8rem 2rem', background: '#0F172A', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px', color: '#fff' }}>Built for the future.</h2>
            <p style={{ fontSize: '1.25rem', color: '#94A3B8' }}>Everything you need to take control of your environmental impact.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <Brain size={32} color="var(--primary)" />, title: 'Terra AI Assistant', desc: 'Chat with our advanced AI to get personalized reduction strategies based on your exact lifestyle.' },
              { icon: <BarChart3 size={32} color="var(--secondary)" />, title: 'Predictive Analytics', desc: 'See your future footprint before it happens. Our models forecast your emissions based on habits.' },
              { icon: <Shield size={32} color="var(--accent)" />, title: 'Bank-grade Privacy', desc: 'Your data never leaves your device. We use local-first architecture to ensure total privacy.' },
              { icon: <Users size={32} color="var(--primary)" />, title: 'Community Benchmarks', desc: 'Compare your progress anonymously with similar households in your region to stay motivated.' }
            ].map((feature, i) => (
              <div key={i} className="glass-panel-dark" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'inline-block' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>{feature.title}</h3>
                <p style={{ color: '#94A3B8', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '8rem 2rem', background: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-1px', color: '#fff' }}>Ready to make a difference?</h2>
          <p style={{ fontSize: '1.25rem', color: '#94A3B8', marginBottom: '3rem' }}>
            Join over 12,000 users who are actively reducing their carbon footprint with EcoSphere AI.
          </p>
          <button className="btn-primary" onClick={() => navigate('/signup')} style={{ fontSize: '1.25rem', padding: '1.25rem 3rem', background: '#fff', color: '#0F172A', boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
}
