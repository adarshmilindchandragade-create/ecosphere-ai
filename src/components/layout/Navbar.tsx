import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(2, 6, 23, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      color: '#fff'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff' }}>
        <div style={{ display: 'grid', placeItems: 'center', width: '36px', height: '36px', borderRadius: '10px', background: 'var(--brand-gradient)', color: '#fff' }}>
          <Leaf size={20} />
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
          EcoSphere AI
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/#features" style={{ textDecoration: 'none', color: '#94A3B8', fontWeight: 600, fontSize: '0.9rem', transition: 'color 0.2s' }}>Features</Link>
        <Link to="/#impact" style={{ textDecoration: 'none', color: '#94A3B8', fontWeight: 600, fontSize: '0.9rem', transition: 'color 0.2s' }}>Impact</Link>
        <Link to="/#about" style={{ textDecoration: 'none', color: '#94A3B8', fontWeight: 600, fontSize: '0.9rem', transition: 'color 0.2s' }}>About</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/login" style={{ textDecoration: 'none', color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Login</Link>
        <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>Sign Up</Link>
      </div>
    </nav>
  );
}
