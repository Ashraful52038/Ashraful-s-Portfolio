'use client';

import { motion } from 'motion/react';

/* ─── 5×7 dot-matrix glyphs (only the letters this portfolio needs) ── */
const FONT: Record<string, string[]> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};

/* gold / ash / reddish — cycled per-bead so every glyph reads as a mosaic */
const PALETTE = ['#c9a96e', '#9a958c', '#c1533a'];

function cellColor(letterIndex: number, row: number, col: number) {
  return PALETTE[(letterIndex * 41 + row * 7 + col * 13) % PALETTE.length];
}

/** deterministic 0..1 "random" — stable across server & client render */
function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function shade(hex: string, percent: number) {
  const num = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((num >> 16) + Math.round(255 * percent));
  const g = clamp(((num >> 8) & 0x00ff) + Math.round(255 * percent));
  const b = clamp((num & 0x0000ff) + Math.round(255 * percent));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

interface PixelTextProps {
  text: string;
  /** any valid CSS length, e.g. '9px' or 'clamp(5px, 1.6vw, 9px)' */
  size?: string;
  gap?: string;
  letterGap?: string;
  className?: string;
  /** seconds to wait before this word starts settling into place */
  startDelay?: number;
  /** granules per lit cell — more = denser "guti guti" cluster look */
  density?: number;
}

export default function PixelText({
  text,
  size = 'clamp(5px, 1.6vw, 9px)',
  gap = 'clamp(1px, 0.4vw, 2px)',
  letterGap = 'clamp(4px, 1.2vw, 8px)',
  className,
  startDelay = 0,
  density = 2,
}: PixelTextProps) {
  const letters = text.toUpperCase().split('');
  let globalIndex = 0;

  return (
    <div className={className} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <style>{`.pixel-bead-inner { display: block; width: 100%; height: 100%; }`}</style>
      {letters.map((ch, li) => {
        const glyph = FONT[ch] ?? FONT[' '];
        return (
          <div
            key={li}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(5, ${size})`,
              gridTemplateRows: `repeat(7, ${size})`,
              gap,
              marginRight: letterGap,
            }}
          >
            {glyph.flatMap((rowStr, row) =>
              rowStr.split('').map((bit, col) => {
                if (bit === '0') return <div key={`${row}-${col}`} />;
                const cellSeed = li * 137 + row * 17 + col * 3;
                return (
                  <div key={`${row}-${col}`} style={{ position: 'relative', width: size, height: size }}>
                    {Array.from({ length: density }).map((_, d) => {
                      const idx = globalIndex++;
                      const seed = cellSeed * 7 + d * 91;
                      const jitterX = (hash(seed) - 0.5) * 55;
                      const jitterY = (hash(seed + 1) - 0.5) * 55;
                      const beadScale = 0.5 + hash(seed + 2) * 0.4;
                      const color = cellColor(li, row, col + d);
                      const light = shade(color, 0.32);
                      const dark = shade(color, -0.3);
                      // Two layers on purpose: motion writes styles straight to the DOM
                      // node (bypassing React), and the browser re-normalizes whatever
                      // it writes — which would fight React's SSR string and trip a
                      // hydration mismatch. So the plain outer <span> (ordinary React,
                      // safe to SSR) owns position/shape/gradient via a single `transform`
                      // (no calc() string-math for the browser to reformat), and the
                      // inner motion.span owns only its own opacity/transform.
                      return (
                        <span
                          key={d}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            transform: `translate(${jitterX.toFixed(3)}%, ${jitterY.toFixed(3)}%) scale(${beadScale.toFixed(3)})`,
                            borderRadius: '46% 54% 51% 49% / 55% 49% 51% 45%',
                            background: `radial-gradient(circle at 32% 28%, ${light}, ${color} 55%, ${dark} 100%)`,
                            boxShadow: `0 1px 2px rgba(0,0,0,0.35)`,
                          }}
                        >
                          <motion.span
                            className="pixel-bead-inner"
                            initial={{ opacity: 0, y: 9, scale: 0.25 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 340,
                              damping: 15,
                              delay: startDelay + idx * 0.0055,
                            }}
                          />
                        </span>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  );
}
