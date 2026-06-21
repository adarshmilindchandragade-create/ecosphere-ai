import React from 'react';
import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 2rem 2rem',
      background: 'var(--bg-color)',
      color: 'var(--text-secondary)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2rem' }}>
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            <Leaf size={24} color="var(--primary)" />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem' }}>EcoSphere AI</span>
          </Link>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '250px' }}>
            AI-powered carbon intelligence that helps you understand your environmental impact and build sustainable habits.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '0.5rem' }}>Product</h4>
          <Link to="/demo" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Demo</Link>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Features</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Pricing</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '0.5rem' }}>Resources</h4>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Blog</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Methodology</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '0.5rem' }}>Legal</h4>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</a>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#" aria-label="GitHub" style={{ color: 'var(--text-secondary)' }}><Github size={20} /></a>
            <a href="#" aria-label="Twitter" style={{ color: 'var(--text-secondary)' }}><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn" style={{ color: 'var(--text-secondary)' }}><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
        <p>© 2026 EcoSphere AI. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}></span>
            Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
