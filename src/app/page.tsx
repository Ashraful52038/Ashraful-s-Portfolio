'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* ─── Data ──────────────────────────────────────────────────────── */
const STATS = [
  { value: '1+',  label: 'Years of\nexperience' },
  { value: '30+', label: 'Projects\nshipped' },
  { value: '12+', label: 'Technologies\nmastered' },
];

const SERVICES = [
  {
    num: '01',
    title: 'Frontend\nDevelopment',
    desc: 'Modern, accessible UIs built with React and Next.js. Pixel-perfect components, smooth animations, and great performance.',
    stack: ['Next.js', 'TypeScript', 'Ant Design', 'Redux'],
  },
  {
    num: '02',
    title: 'Backend &\nAPI Design',
    desc: 'Scalable REST APIs using Go and Echo. Clean architecture, proper error handling, and database design that holds up under load.',
    stack: ['Go', 'Echo', 'PostgreSQL', 'Redis'],
  },
  {
    num: '03',
    title: 'Cloud &\nDevOps',
    desc: 'Containerised deployments, CI/CD pipelines, and cloud infrastructure. From a single Dockerfile to a full Kubernetes cluster.',
    stack: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS'],
  },
  {
    num: '04',
    title: 'Product &\nTeam Leadership',
    desc: 'Running Hakaluki day to day — scoping products, hiring engineers, and shipping AI-augmented software for clients end to end.',
    stack: ['Strategy', 'Hiring', 'AI Automation', 'SaaS'],
  },
];

const TICKER = [
  'CEO @ HAKALUKI', 'FULL STACK DEVELOPER', 'GO · ECHO', 'NEXT.JS', 'DHAKA, BANGLADESH',
  'SYLHET SOFTWARE STUDIO', 'AI AUTOMATION', 'OPEN TO SELECT COLLABORATIONS',
];

const TECH_TAGS = ['Go · Echo', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'Kubernetes'];

function useReveal() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);
  return visible;
}

export default function Home() {
  const visible = useReveal();
  const [hovered, setHovered] = useState<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Syne:wght@300;400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:       #0a0a0a;
          --bg2:      #111111;
          --bg3:      #181818;
          --border:   rgba(255,255,255,0.08);
          --border2:  rgba(255,255,255,0.14);
          --text:     #f0ede8;
          --muted:    #888;
          --accent:   #c9a96e;
          --accent2:  rgba(201,169,110,0.12);
          --teal:     #6ee7c7;
          --teal2:    rgba(110,231,199,0.12);
          --font-display: 'Playfair Display', serif;
          --font-body:    'Syne', sans-serif;
          --font-mono:    'JetBrains Mono', monospace;
          --px: 48px;
        }

        @media (max-width: 640px) {
          :root { --px: 20px; }
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          -webkit-font-smoothing: antialiased;
          cursor: none;
        }

        @media (max-width: 640px) {
          body { cursor: auto; }
        }

        ::selection { background: var(--accent); color: #000; }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.35s; }
        .reveal-d4 { transition-delay: 0.5s; }
        .reveal-d5 { transition-delay: 0.65s; }

        .noise::after {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.25;
        }

        .grid-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(ellipse 80% 60% at 70% 30%, black, transparent);
        }

        .hr { height: 0.5px; background: var(--border); width: 100%; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

        /* ── Ticker ── */
        .ticker-wrap {
          overflow: hidden;
          border-bottom: 0.5px solid var(--border);
          background: var(--bg2);
          padding: 10px 0;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          gap: 40px;
          animation: ticker 28s linear infinite;
        }
        .ticker-track span {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--muted);
          white-space: nowrap;
          display: flex; align-items: center; gap: 40px;
        }
        .ticker-track span em { color: var(--accent); font-style: normal; }
        .ticker-track b { color: var(--border2); font-weight: 400; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── Hero layout ── */
        .hero-inner {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
          min-height: 460px;
        }

        .hero-photo-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 40px;
            min-height: unset;
          }
          .hero-photo-col {
            order: -1;
          }
        }

        /* ── Polaroid-style photo frame (unique, replaces old spinning ring) ── */
        .photo-frame {
          position: relative;
          width: 300px;
          padding: 14px 14px 54px;
          background: var(--bg2);
          border: 0.5px solid var(--border2);
          border-radius: 6px;
          transform: rotate(-3deg);
          box-shadow: 0 40px 70px -30px rgba(0,0,0,0.7);
        }
        .photo-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 0.5px solid var(--border);
          border-radius: 6px;
          background: var(--bg3);
          transform: rotate(6deg);
          z-index: -1;
        }
        @media (max-width: 1024px) { .photo-frame { width: 250px; } }
        @media (max-width: 768px)  { .photo-frame { width: 200px; padding: 10px 10px 38px; } }

        .photo-frame-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 2px;
          background: var(--bg3);
        }

        .photo-caption {
          position: absolute;
          left: 14px; right: 14px; bottom: 16px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.12em;
          color: var(--muted);
          text-transform: uppercase;
          line-height: 1.5;
        }
        @media (max-width: 768px) { .photo-caption { font-size: 8px; left: 10px; right: 10px; bottom: 12px; } }

        .ceo-sticker {
          position: absolute;
          top: -14px; right: -18px;
          transform: rotate(7deg);
          background: var(--teal);
          color: #06231b;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 7px 12px;
          border-radius: 5px;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 5px;
          box-shadow: 0 10px 24px -8px rgba(110,231,199,0.5);
          transition: transform 0.2s ease;
          cursor: none;
        }
        .ceo-sticker:hover { transform: rotate(0deg) scale(1.04); }
        @media (max-width: 768px) {
          .ceo-sticker { font-size: 8.5px; padding: 5px 9px; top: -10px; right: -10px; }
        }

        /* ── Stats grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 0.5px solid var(--border);
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .stats-grid > *:last-child {
            grid-column: 1 / -1;
            border-right: none !important;
            border-top: 0.5px solid var(--border);
          }
        }

        /* ── Now / Hakaluki bento ── */
        .now-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 1px;
          background: var(--border);
          border-bottom: 0.5px solid var(--border);
        }
        @media (max-width: 820px) {
          .now-grid { grid-template-columns: 1fr; }
        }

        .now-card {
          background: var(--bg);
          padding: 44px var(--px);
        }

        .hakaluki-mark {
          width: 46px; height: 46px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--teal), #3fae8f);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display);
          font-size: 22px; font-weight: 700; color: #06231b;
          flex-shrink: 0;
        }

        .now-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 12.5px;
          color: var(--teal); text-decoration: none;
          border-bottom: 0.5px solid rgba(110,231,199,0.35);
          padding-bottom: 2px;
          transition: opacity 0.2s;
          cursor: none;
        }
        .now-link:hover { opacity: 0.75; }

        /* ── Services / bento grid ── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--border);
        }

        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        /* ── Nav ── */
        .nav-links {
          display: flex;
          gap: 36px;
        }

        @media (max-width: 640px) {
          .nav-links {
            display: none;
          }
        }

        /* ── CTA section ── */
        .cta-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          padding: 52px var(--px);
          margin-top: auto;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(74,222,128,0.8); }
          50%       { box-shadow: 0 0 14px rgba(74,222,128,0.3); }
        }
      `}</style>

      {/* Custom cursor — hidden on mobile via CSS */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', width: 20, height: 20, borderRadius: '50%',
          border: '1.5px solid var(--accent)', zIndex: 9999,
          pointerEvents: 'none', transition: 'transform 0.08s linear',
          mixBlendMode: 'difference',
        }}
      />

      <div className="noise" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* ── Ticker ─────────────────────────────────── */}
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i}>
                {t === 'CEO @ HAKALUKI' ? <em>{t}</em> : t}
                <b>/</b>
              </span>
            ))}
          </div>
        </div>

        {/* ── Hero ────────────────────────────────────── */}
        <section style={{
          padding: '64px var(--px) 72px',
          borderBottom: '0.5px solid var(--border)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div className="grid-overlay" />

          <div className="hero-inner">

            {/* ── Left: text content ── */}
            <div style={{ position: 'relative' }}>
              {/* Status badge */}
              <div className={`reveal ${visible ? 'visible' : ''}`} style={{ marginBottom: 32, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: '#4ade80', border: '0.5px solid rgba(74,222,128,0.3)',
                  padding: '5px 14px', borderRadius: 99, letterSpacing: '0.08em',
                  background: 'rgba(74,222,128,0.06)',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#4ade80',
                    boxShadow: '0 0 8px rgba(74,222,128,0.8)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }} />
                  OPEN FOR SELECT COLLABORATIONS
                </span>
                <a
                  href="https://www.hakaluki.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'var(--teal)', border: '0.5px solid rgba(110,231,199,0.3)',
                    padding: '5px 14px', borderRadius: 99, letterSpacing: '0.08em',
                    background: 'rgba(110,231,199,0.06)', textDecoration: 'none', cursor: 'none',
                  }}
                >
                  CEO @ HAKALUKI ↗
                </a>
              </div>

              <h1 className={`reveal reveal-d1 ${visible ? 'visible' : ''}`} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
                fontWeight: 400, lineHeight: 1.06,
                letterSpacing: '-0.02em', marginBottom: 8,
                color: 'var(--text)',
              }}>
                Ashraful<br /><em style={{ color: 'var(--accent)' }}>Islam</em>
              </h1>

              <p className={`reveal reveal-d2 ${visible ? 'visible' : ''}`} style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--muted)', letterSpacing: '0.2em',
                textTransform: 'uppercase', marginBottom: 28,
              }}>
                Full Stack Developer <span style={{ color: 'var(--border2)' }}>·</span>{' '}
                <span style={{ color: 'var(--teal)' }}>CEO, Hakaluki</span>
              </p>

              <p className={`reveal reveal-d3 ${visible ? 'visible' : ''}`} style={{
                fontSize: 15, lineHeight: 1.85, color: 'var(--muted)',
                maxWidth: 480, fontWeight: 300, marginBottom: 32,
              }}>
                I design and build fast, reliable web applications — from backend APIs in Go
                to polished React interfaces. These days I lead{' '}
                <a href="https://www.hakaluki.dev/" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--teal)', textDecoration: 'none', borderBottom: '0.5px solid rgba(110,231,199,0.35)' }}>
                  Hakaluki
                </a>, a software studio building scalable products and AI automation for clients,
                while still shipping code every day.
              </p>

              <div className={`reveal reveal-d4 ${visible ? 'visible' : ''}`} style={{
                display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36,
              }}>
                {TECH_TAGS.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    padding: '5px 12px', borderRadius: 4,
                    border: '0.5px solid var(--border2)',
                    color: 'var(--muted)', background: 'var(--bg2)',
                    letterSpacing: '0.04em',
                  }}>{t}</span>
                ))}
              </div>

              <div className={`reveal reveal-d5 ${visible ? 'visible' : ''}`} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button style={{
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                  padding: '12px 28px', borderRadius: 6, cursor: 'none',
                  background: 'var(--accent)', color: '#000', border: 'none',
                  letterSpacing: '0.04em', transition: 'opacity 0.2s',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  View Projects →
                </button>
                <a
                  href="https://www.hakaluki.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400,
                    padding: '12px 24px', borderRadius: 6, cursor: 'none',
                    background: 'transparent', color: 'var(--text)',
                    border: '0.5px solid var(--border2)',
                    letterSpacing: '0.04em', transition: 'background 0.2s',
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  Visit Hakaluki ↗
                </a>
              </div>
            </div>

            {/* ── Right: photo ── */}
            <div className="hero-photo-col">
              <div className={`reveal reveal-d2 ${visible ? 'visible' : ''}`} style={{ position: 'relative', display: 'inline-block' }}>
                <div className="photo-frame">
                  <div className="photo-frame-inner">
                    <Image
                      src="/Ash.jpeg"
                      alt="Ashraful Islam"
                      fill
                      sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  </div>
                  <div className="photo-caption">
                    ASHRAFUL ISLAM<br />DHAKA, BD
                  </div>
                  <a
                    href="https://www.hakaluki.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ceo-sticker"
                  >
                    CEO @ HAKALUKI
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Now: Hakaluki spotlight ─────────────────── */}
        <div className="now-grid">
          <div className="now-card" style={{ borderRight: '0.5px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 20 }}>
              <div className="hakaluki-mark">H</div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
                  color: 'var(--teal)', textTransform: 'uppercase', marginBottom: 8,
                }}>
                  Currently — CEO
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400,
                  color: 'var(--text)', marginBottom: 2,
                }}>
                  Hakaluki
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.04em' }}>
                  Software development studio · Sylhet, Bangladesh
                </div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--muted)', fontWeight: 300, maxWidth: 560, marginBottom: 20 }}>
              I run Hakaluki, a creative technology studio engineering scalable software,
              intelligent automation, and AI-powered products for businesses — from internal
              tools and SaaS platforms to full production applications, built and shipped fast.
            </p>
            <a href="https://www.hakaluki.dev/" target="_blank" rel="noopener noreferrer" className="now-link">
              hakaluki.dev ↗
            </a>
          </div>

          <div className="now-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
            {[
              ['Role', 'Chief Executive Officer'],
              ['Focus', 'Product, AI Automation, Engineering'],
              ['Based in', 'Dhaka, Bangladesh'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, borderBottom: '0.5px solid var(--border)', paddingBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text)', textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats ───────────────────────────────────── */}
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: '28px var(--px)',
              borderRight: i < 2 ? '0.5px solid var(--border)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 44, fontWeight: 400, lineHeight: 1,
                color: 'var(--accent)', marginBottom: 8,
              }}>{s.value}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--muted)', letterSpacing: '0.1em',
                textTransform: 'uppercase', whiteSpace: 'pre-line', lineHeight: 1.6,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Services ────────────────────────────────── */}
        <div style={{ padding: '64px var(--px)', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>What I do</span>
            <div className="hr" style={{ flex: 1 }} />
          </div>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.num}
                className="svc-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === i ? 'var(--bg3)' : 'var(--bg)',
                  padding: '36px 32px',
                  transition: 'background 0.25s',
                  display: 'flex', flexDirection: 'column', gap: 16,
                  cursor: 'none',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em' }}>{svc.num}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, lineHeight: 1.25, whiteSpace: 'pre-line', color: 'var(--text)' }}>{svc.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'var(--muted)', fontWeight: 300, flex: 1 }}>{svc.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  {svc.stack.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      padding: '3px 9px', borderRadius: 3,
                      border: '0.5px solid var(--border2)',
                      color: hovered === i ? 'var(--accent)' : 'var(--muted)',
                      background: hovered === i ? 'var(--accent2)' : 'transparent',
                      transition: 'color 0.2s, background 0.2s',
                      letterSpacing: '0.06em',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────── */}
        <div className="cta-section">
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, marginBottom: 8, color: 'var(--text)' }}>
              Have a project in mind?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>
              Open to freelance work directly, or through{' '}
              <a href="https://www.hakaluki.dev/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)', textDecoration: 'none', borderBottom: '0.5px solid rgba(110,231,199,0.35)' }}>Hakaluki</a>.
            </p>
          </div>
          <button style={{
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
            padding: '13px 30px', borderRadius: 6, cursor: 'none',
            background: 'transparent', color: 'var(--text)',
            border: '0.5px solid var(--border2)',
            letterSpacing: '0.06em', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--accent)';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.borderColor = 'var(--border2)';
            }}
          >
            Get in touch ↗
          </button>
        </div>

        {/* ── Footer ──────────────────────────────────── */}
        <div style={{
          borderTop: '0.5px solid var(--border)', padding: '20px var(--px)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 8,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>
            © 2026 ASHRAFUL ISLAM — CEO, HAKALUKI
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>
            DHAKA, BD
          </span>
        </div>

      </div>
    </>
  );
}
