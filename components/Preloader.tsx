'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount]   = useState(0);
  const [phase, setPhase]   = useState<'scanning' | 'calibrating' | 'entering'>('scanning');

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
          onComplete,
        });
      },
    });

    // Reset paths
    tl.set('.pre-path', {
      strokeDashoffset: (i, t: SVGPathElement) => t.getTotalLength?.() ?? 400,
      strokeDasharray:  (i, t: SVGPathElement) => t.getTotalLength?.() ?? 400,
      opacity: 0
    })
    .set('.scanline', { x: -50, opacity: 0 })
    .set('.ping', { scale: 0, opacity: 0 });

    // ── Phase 1: The Scan ──
    tl.to('.scanline', { opacity: 1, duration: 0.2 })
      .to('.scanline', { x: 330, duration: 1.0, ease: 'none' });

    // Drawing paths as scanline passes
    tl.to('.pre-path', {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.04,
      ease: 'power2.inOut'
    }, 0.2);

    // Pings at corner points
    tl.to('.ping', {
      scale: 1,
      opacity: 1,
      duration: 0.2,
      stagger: 0.08,
      ease: 'back.out(2)'
    }, 0.3)
    .to('.ping', { opacity: 0, duration: 0.2, stagger: 0.05 }, '+=0.1');

    // ── Phase 2: Calibration (Counter) ──
    tl.call(() => setPhase('calibrating'), undefined, '+=0.1')
      .to({ val: 0 }, {
        val: 100,
        duration: 0.6,
        ease: 'power3.inOut',
        onUpdate: function() { setCount(Math.round(this.targets()[0].val)); },
      });

    // ── Phase 3: Final Reveal ──
    tl.call(() => setPhase('entering'), undefined, '+=0.1')
      .to('.preloader-content', { scale: 1.05, opacity: 0, duration: 0.4, ease: 'power2.in' })
      .to('.bg-accent', { opacity: 0, duration: 0.3 }, '-=0.2');

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#060606' }}
    >
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 bg-accent overflow-hidden pointer-events-none">
        {/* Blueprint grid with parallax feel */}
        <div 
          className="absolute inset-[-10%] opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'perspective(1000px) rotateX(15deg)'
          }}
        />
        {/* Atmospheric Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-arch-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-arch-gold/3 blur-[100px] rounded-full" />
      </div>

      {/* ── Technical Scan Labels ── */}
      <div className="absolute top-10 left-10 flex flex-col gap-1">
        <div className="mono-tag text-[0.45rem] opacity-40">System Status: {phase.toUpperCase()}</div>
        <div className="mono-tag text-[0.45rem] opacity-40">Frequency: 44.1 KHZ</div>
      </div>
      <div className="absolute top-10 right-10 flex flex-col items-end gap-1 text-right">
        <div className="mono-tag text-[0.45rem] opacity-40">Lat: 36.7538° N</div>
        <div className="mono-tag text-[0.45rem] opacity-40">Lon: 3.0588° E</div>
      </div>

      {/* ── Central Stage ── */}
      <div className="preloader-content relative z-10 flex flex-col items-center">
        
        {/* Architectural Scanner View */}
        <div className="relative mb-12" style={{ width: 320, height: 220 }}>
          {/* Boundary box */}
          <div className="absolute inset-0 border border-white/5" />
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-arch-gold/60" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-arch-gold/60" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-arch-gold/60" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-arch-gold/60" />

          {/* SVG Schematic */}
          <svg
            viewBox="0 0 280 200"
            className="w-full h-full px-6 pt-4"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.8"
          >
            {/* Ground / Foundation */}
            <path className="pre-path" d="M20 180 H260" strokeOpacity="0.3" />
            
            {/* Structural skeleton */}
            <path className="pre-path" d="M60 180 V80 H220 V180" />
            <path className="pre-path" d="M60 80 L140 20 L220 80" />
            
            {/* Internal partitioning */}
            <path className="pre-path" d="M140 80 V180" strokeOpacity="0.3" />
            <path className="pre-path" d="M60 130 H220" strokeOpacity="0.2" />

            {/* Architectural details */}
            <path className="pre-path" d="M95 180 V145 H125 V180" /> {/* Door */}
            <path className="pre-path" d="M165 145 H200 V165 H165 Z" strokeOpacity="0.5" /> {/* Window 1 */}
            <path className="pre-path" d="M80 95 H115 V115 H80 Z" strokeOpacity="0.5" />    {/* Window 2 */}
            <path className="pre-path" d="M175 45 V30 H195 V55" strokeOpacity="0.4" />     {/* Chimney */}

            {/* Pings (Corner dots) */}
            <circle className="ping" cx="60" cy="180" r="1.5" fill="#C9A84C" />
            <circle className="ping" cx="220" cy="180" r="1.5" fill="#C9A84C" />
            <circle className="ping" cx="140" cy="20" r="1.5" fill="#C9A84C" />
            <circle className="ping" cx="60" cy="80" r="1.5" fill="#C9A84C" />
            <circle className="ping" cx="220" cy="80" r="1.5" fill="#C9A84C" />
          </svg>

          {/* Technical Scanline */}
          <div 
            className="scanline absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-arch-gold to-transparent"
            style={{ boxShadow: '0 0 15px rgba(201,168,76,0.8)' }}
          />

          {/* Bottom scale labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-2">
            <span className="mono-tag text-[0.4rem] opacity-30 tracking-[0.2em]">DM-SPEC: 08-B</span>
            <span className="mono-tag text-[0.4rem] opacity-30 tracking-[0.2em]">1:50 METRIC</span>
          </div>
        </div>

        {/* Studio Branding */}
        <div className="text-center mb-8">
          <div className="overflow-hidden">
            <h2 
              className="font-display font-light text-arch-white text-5xl lg:text-6xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Djouadi Mounji
            </h2>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="h-px w-6 bg-arch-gold/20" />
            <span className="mono-tag text-[0.55rem] tracking-[0.4em] text-arch-gold/60 uppercase">Studio Architecture</span>
            <div className="h-px w-6 bg-arch-gold/20" />
          </div>
        </div>

        {/* Counter Display */}
        <div className="relative flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl text-arch-white tabular-nums" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              {String(count).padStart(3, '0')}
            </span>
            <span className="mono-tag text-xs text-arch-gold/40">%</span>
          </div>
          <div className="w-48 h-px bg-white/5 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-arch-gold transition-all duration-300"
              style={{ width: `${count}%`, boxShadow: '0 0 10px rgba(201,168,76,0.4)' }}
            />
          </div>
          <div className="mono-tag text-[0.45rem] mt-3 tracking-[0.3em] text-arch-gold/30">
            {phase === 'scanning' ? 'Optical Scan Underway' : phase === 'calibrating' ? 'Matrix Calibration' : 'Interface Ready'}
          </div>
        </div>
      </div>

      {/* ── Footer Metadata ── */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end border-t border-white/5 pt-6">
        <div className="mono-tag text-[0.45rem] opacity-25 max-w-[120px] leading-relaxed">
          Proprietary drafting sequence. Unauthorized replication prohibited.
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="mono-tag text-[0.45rem] opacity-40">Build v2.1.0-Release</div>
          <div className="mono-tag text-[0.45rem] opacity-25">© 2026 Djouadi Mounji</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
