import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Leaf, Sparkles, Activity } from 'lucide-react';
import DashboardApp from '../../DashboardApp';

export function DemoDashboard() {
  const [loadingStep, setLoadingStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    { text: 'Calculating Impact...', icon: <Target className="animate-spin-slow" /> },
    { text: 'Analyzing Habits...', icon: <Activity className="animate-spin-slow" /> },
    { text: 'Generating Recommendations...', icon: <Leaf className="animate-spin-slow" /> },
    { text: 'Building Carbon Twin...', icon: <Sparkles className="animate-spin-slow" /> }
  ];

  useEffect(() => {
    // Check local storage auth
    if (!localStorage.getItem('auth')) {
      navigate('/login');
      return;
    }

    const timer = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          return prev + 1; // move to complete
        }
        return prev + 1;
      });
    }, 700); // ~2.8s total loading time

    return () => clearInterval(timer);
  }, [navigate, steps.length]);

  if (loadingStep < steps.length) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--brand-gradient)', display: 'grid', placeItems: 'center', color: '#fff', marginBottom: '2rem', animation: 'float 2s infinite ease-in-out' }}>
          {steps[loadingStep].icon}
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          {steps[loadingStep].text}
        </h2>
        <div style={{ width: '200px', height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${((loadingStep + 1) / steps.length) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.5s ease-out' }}></div>
        </div>
      </div>
    );
  }

  // Load the main dashboard app when loading is complete
  return <DashboardApp />;
}
