'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '24px 48px',
      borderBottom: '0.5px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,10,0.85)' : 'rgba(10,10,10,0.5)',
      backdropFilter: 'blur(12px)',
      transition: 'background 0.3s ease',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.12em' }}>
        AI.DEV
      </span>
      <div style={{ display: 'flex', gap: 36 }}>
        {['Work', 'Services', 'About', 'Contact'].map(item => (
          <a key={item} href="#" style={{
            fontSize: 12, color: 'var(--muted)', textDecoration: 'none',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'color 0.2s',
            fontFamily: 'var(--font-body)',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >{item}</a>
        ))}
      </div>
    </nav>
  );
}