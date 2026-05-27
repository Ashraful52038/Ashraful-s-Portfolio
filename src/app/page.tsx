'use client';

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
];

const TECH_TAGS = ['Go · Echo', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'Kubernetes'];

/* ─── Utility hook: reveal on mount ─────────────────────────────── */
function useReveal() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);
  return visible;
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function Home() {
  const visible = useReveal();
  const [hovered, setHovered] = useState<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  /* Custom cursor */
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
      {/* ── Global styles ────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Syne:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

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
          --font-display: 'Playfair Display', serif;
          --font-body:    'Syne', sans-serif;
          --font-mono:    'JetBrains Mono', monospace;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          -webkit-font-smoothing: antialiased;
          cursor: none;
        }

        ::selection { background: var(--accent); color: #000; }

        /* reveal animation */
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

        /* noise overlay */
        .noise::after {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.25;
        }

        /* horizontal rule accent */
        .hr { height: 0.5px; background: var(--border); width: 100%; }

        /* scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
      `}</style>

      {/* Custom cursor */}
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
        {/* ── Hero ─────────────────────────────────────── */}
        <section style={{ padding: '80px 48px 72px', borderBottom: '0.5px solid var(--border)', position: 'relative', overflow: 'hidden' }}>

          {/* Background decorative text */}
          <div style={{
            position: 'absolute', right: -20, top: 20,
            fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem, 16vw, 14rem)',
            color: 'rgba(255,255,255,0.025)', fontWeight: 700, lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em',
          }}>
            DEV
          </div>

          {/* Status */}
          <div className={`reveal ${visible ? 'visible' : ''}`} style={{ marginBottom: 32 }}>
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
              AVAILABLE FOR NEW PROJECTS
            </span>
          </div>

          {/* Name */}
          <h1 className={`reveal reveal-d1 ${visible ? 'visible' : ''}`} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
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
            Full Stack Developer
          </p>

          <p className={`reveal reveal-d3 ${visible ? 'visible' : ''}`} style={{
            fontSize: 16, lineHeight: 1.85, color: 'var(--muted)',
            maxWidth: 480, fontWeight: 300, marginBottom: 36,
          }}>
            I design and build fast, reliable web applications — from backend APIs in Go
            to polished React interfaces. Focused on clean architecture and developer experience.
          </p>

          {/* Tech tags */}
          <div className={`reveal reveal-d4 ${visible ? 'visible' : ''}`} style={{
            display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40,
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

          {/* CTA buttons */}
          <div className={`reveal reveal-d5 ${visible ? 'visible' : ''}`} style={{ display: 'flex', gap: 12 }}>
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
            <button style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400,
              padding: '12px 24px', borderRadius: 6, cursor: 'none',
              background: 'transparent', color: 'var(--text)',
              border: '0.5px solid var(--border2)',
              letterSpacing: '0.04em', transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Download CV
            </button>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '0.5px solid var(--border)',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: '32px 40px',
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

        {/* ── Services ─────────────────────────────────── */}
        <div style={{ padding: '64px 48px', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>What I do</span>
            <div className="hr" style={{ flex: 1 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border)' }}>
            {SERVICES.map((svc, i) => (
              <div
                key={svc.num}
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
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--accent)', letterSpacing: '0.08em',
                }}>{svc.num}</span>

                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 22,
                  fontWeight: 400, lineHeight: 1.25, whiteSpace: 'pre-line',
                  color: 'var(--text)',
                }}>{svc.title}</h3>

                <p style={{
                  fontSize: 13.5, lineHeight: 1.75, color: 'var(--muted)',
                  fontWeight: 300, flex: 1,
                }}>{svc.desc}</p>

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

        {/* ── CTA ──────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24, padding: '52px 48px',
          marginTop: 'auto',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 28,
              fontWeight: 400, marginBottom: 8, color: 'var(--text)',
            }}>
              Have a project in mind?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>
              Open to freelance work, full-time roles, and interesting collaborations.
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

        {/* ── Footer ───────────────────────────────────── */}
        <div style={{
          borderTop: '0.5px solid var(--border)',
          padding: '20px 48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>
            © 2025 ASHRAFUL ISLAM
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>
            DHAKA, BD
          </span>
        </div>

      </div>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(74,222,128,0.8); }
          50%       { box-shadow: 0 0 14px rgba(74,222,128,0.3); }
        }
      `}</style>
    </>
  );
}