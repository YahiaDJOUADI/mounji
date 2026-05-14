'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const PAGE_NAMES: Record<string, { label: string; code: string }> = {
  '/':          { label: 'Home',     code: 'REF_01' },
  '/about':     { label: 'About',    code: 'REF_02' },
  '/projects':  { label: 'Projects', code: 'REF_03' },
  '/services':  { label: 'Services', code: 'REF_04' },
  '/contact':   { label: 'Contact',  code: 'REF_05' },
};

const PageTransition = () => {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const barRef      = useRef<HTMLDivElement>(null);
  const pathname    = usePathname();

  const page = PAGE_NAMES[pathname] ?? { label: 'Loading', code: 'REF_00' };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bar     = barRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();

    // ENTRY: Slide up and reveal
    tl.set(overlay, { yPercent: 100, display: 'flex', opacity: 1, pointerEvents: 'all' })
      .to(overlay,  { yPercent: 0, duration: 0.6, ease: 'expo.inOut' })

      // Technical Elements
      .from('.tr-line', { y: 20, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, '-=0.2')
      
      // Progress Bar
      .fromTo(bar, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.4')

      // EXIT: Slide up off screen
      .to(overlay, { yPercent: -100, duration: 0.6, ease: 'expo.inOut', delay: 0.4 })
      .set(overlay, { display: 'none', pointerEvents: 'none' });

    return () => { tl.kill(); };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] hidden flex-col items-center justify-center overflow-hidden pointer-events-none"
      style={{ background: '#060606' }}
    >
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Atmospheric Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-arch-gold/5 via-transparent to-transparent opacity-50" />

      {/* Corner accents */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-arch-gold/20" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-arch-gold/20" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-arch-gold/20" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-arch-gold/20" />

      {/* Main content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        
        {/* Meta Label */}
        <div className="tr-line flex items-center gap-4 mb-10">
          <div className="w-1.5 h-1.5 rounded-full bg-arch-gold animate-pulse" />
          <span className="mono-tag text-[0.55rem] tracking-[0.4em] opacity-40">
            DM · {page.code} · PROTOCOL
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-arch-gold animate-pulse" />
        </div>

        {/* Big Title */}
        <div className="overflow-hidden mb-8">
          <h2
            className="tr-line font-display font-light tracking-tight leading-none text-arch-white"
            style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', fontFamily: 'var(--font-cormorant), serif' }}
          >
            {page.label}
          </h2>
        </div>

        {/* Technical Progress */}
        <div className="tr-line flex flex-col items-center gap-4">
          <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
            <div ref={barRef} className="absolute top-0 left-0 h-full bg-arch-gold" />
          </div>
          <span className="mono-tag text-[0.45rem] tracking-[0.3em] opacity-30">ARCHITECTURAL SCANNING IN PROGRESS</span>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="mono-tag text-[0.45rem] tracking-[0.5em] uppercase opacity-20" style={{ writingMode: 'vertical-rl' }}>
          Initializing Data Matrix
        </span>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-12 right-12 text-right">
        <div className="mono-tag text-[0.45rem] opacity-30 mb-1 tracking-widest">ALGIERS STUDIO</div>
        <div className="mono-tag text-[0.45rem] opacity-20 tracking-widest">© 2026 Mounji Design</div>
      </div>
    </div>
  );
};

export default PageTransition;
