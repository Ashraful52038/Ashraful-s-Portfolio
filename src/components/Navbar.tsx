'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        /* Navbar Styles */
        .custom-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 0.5px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
          background: ${scrolled ? 'rgba(10,10,10,0.85)' : 'rgba(10,10,10,0.5)'};
          backdrop-filter: blur(12px);
          transition: background 0.3s ease;
        }

        .navbar-logo {
          font-family: var(--font-mono);
          font-size: clamp(10px, 4vw, 12px);
          color: var(--accent);
          letter-spacing: 0.12em;
          cursor: none;
        }

        .desktop-menu {
          display: none;
          gap: 36px;
        }

        .desktop-menu a {
          font-size: 12px;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
          font-family: var(--font-body);
          cursor: none;
        }

        .desktop-menu a:hover {
          color: var(--text);
        }

        .mobile-menu-btn {
          display: block;
          background: transparent;
          border: none;
          cursor: none;
          padding: 8px;
          z-index: 101;
        }

        .menu-line {
          width: 24px;
          height: 2px;
          background: var(--text);
          margin-bottom: 6px;
          transition: 0.3s;
        }

        .menu-line.open:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .menu-line.open:nth-child(2) {
          opacity: 0;
        }

        .menu-line.open:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 70%;
          max-width: 300px;
          height: 100vh;
          background: rgba(10,10,10,0.95);
          backdrop-filter: blur(20px);
          z-index: 99;
          padding: 80px 32px;
          transition: right 0.3s ease;
          border-left: 0.5px solid var(--border);
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-menu-items {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .mobile-menu-items a {
          font-size: 20px;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
          font-family: var(--font-body);
          cursor: none;
        }

        .mobile-menu-items a:hover {
          color: var(--text);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 98;
        }

        /* Tablet */
        @media (min-width: 640px) {
          .custom-navbar {
            padding: 20px 32px;
          }
        }

        /* Desktop */
        @media (min-width: 768px) {
          .custom-navbar {
            padding: 24px 48px;
          }
          
          .desktop-menu {
            display: flex;
          }
          
          .mobile-menu-btn {
            display: none;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className="custom-navbar">
        <span className="navbar-logo">
          AI.DEV
        </span>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {['Work', 'Services', 'About', 'Contact'].map(item => (
            <a key={item} href="#">{item}</a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
        >
          <div className={`menu-line ${mobileMenuOpen ? 'open' : ''}`} />
          <div className={`menu-line ${mobileMenuOpen ? 'open' : ''}`} />
          <div className={`menu-line ${mobileMenuOpen ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-items">
          {['Work', 'Services', 'About', 'Contact'].map(item => (
            <a
              key={item}
              href="#"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}