import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Bot,
  Calculator,
  Flag,
  Home,
  Leaf,
  SlidersHorizontal,
  Users,
  X,
  LogOut,
  User
} from 'lucide-react';

const links = [
  ['Overview', Home],
  ['Calculator', Calculator],
  ['AI Coach', Bot],
  ['My Roadmap', Flag],
  ['Analytics', BarChart3],
  ['Simulator', SlidersHorizontal],
  ['Community', Users],
] as const;

export function Sidebar({
  active,
  onSelect,
  open,
  onClose,
}: {
  active: string;
  onSelect: (s: string) => void;
  open: boolean;
  onClose: () => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <aside
      className={`sidebar ${open ? 'open' : ''}`}
      aria-label="Primary navigation"
    >
      <div className="brand">
        <span>
          <Leaf size={22} />
        </span>
        <div>
          EcoSphere<small>AI</small>
        </div>
        <button
          onClick={onClose}
          className="close-menu"
          aria-label="Close menu"
        >
          <X />
        </button>
      </div>

      <nav>
        <p>WORKSPACE</p>
        {links.map(([label, Icon]) => (
          <button
            key={label}
            className={active === label ? 'active' : ''}
            aria-current={active === label ? 'page' : undefined}
            onClick={() => {
              onSelect(label);
              onClose();
            }}
          >
            <Icon size={18} />
            <span>{label}</span>
            {label === 'Simulator' && <em>New</em>}
          </button>
        ))}
      </nav>

      <div className="impact-card">
        <div className="mini-earth">
          <Leaf size={20} />
        </div>
        <strong>Lifetime Carbon Saved</strong>
        <div style={{ fontSize: '18px', fontWeight: 800, color: '#1a4434', margin: '4px 0' }}>
          1,284 kg CO₂
        </div>
        <p>Equivalent to 52 trees planted.</p>
        <button onClick={() => onSelect('Analytics')}>View details →</button>
      </div>

      <div className="user-card" style={{ position: 'relative' }}>
        <div className="avatar">AM</div>
        <div>
          <strong>Alex Morgan</strong>
          <span>Green Explorer</span>
        </div>
        <button aria-label="Account options" onClick={() => setShowDropdown(!showDropdown)}>•••</button>
        
        {showDropdown && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            right: '0',
            marginBottom: '0.5rem',
            background: 'white',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-md)',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            minWidth: '150px',
            zIndex: 50
          }}>
            <button 
              onClick={() => { setShowDropdown(false); alert('Profile page coming soon!'); }} 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem', border: 'none', background: 'transparent', textAlign: 'left', borderRadius: '6px', fontSize: '12px', color: '#18352a', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f5f7f3'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <User size={14} /> Profile
            </button>
            <button 
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem', border: 'none', background: 'transparent', textAlign: 'left', borderRadius: '6px', fontSize: '12px', color: '#d36b54', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#fae8e2'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
