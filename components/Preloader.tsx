'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'expo.inOut',
          onComplete,
        });
      },
    });

    // Elegant loading sequence
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2,
      ease: 'power3.inOut',
      onUpdate: function() { setCount(Math.round(this.targets()[0].val)); },
    })
    .to('.loader-line', {
      scaleX: 1,
      duration: 2,
      ease: 'power3.inOut',
    }, '<')
    .to('.loader-text', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2
    }, '-=1.5')
    .to('.loader-content', {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.in',
      delay: 0.3
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-arch-black overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[50vw] h-[50vw] bg-arch-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="loader-content relative z-10 flex flex-col items-center justify-center w-full px-6">
        {/* Brand Text */}
        <div className="overflow-visible mb-16 flex flex-col items-center">
          <div className="overflow-hidden pb-4">
            <h2 
              className="loader-text font-display font-light text-arch-white text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none drop-shadow-lg opacity-0 translate-y-12"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Djouadi <span className="text-arch-gold italic pr-4">Mounji</span>
            </h2>
          </div>
          <div className="overflow-hidden mt-2">
            <div className="loader-text mono-tag text-xs md:text-sm tracking-[0.4em] text-arch-gold/70 uppercase opacity-0 translate-y-6">
              Architecture & Design
            </div>
          </div>
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-full max-w-sm md:max-w-md h-px bg-white/10 relative overflow-hidden mt-8">
          <div 
            className="loader-line absolute top-0 left-0 w-full h-full bg-arch-gold origin-left scale-x-0"
            style={{ boxShadow: '0 0 15px rgba(201,168,76,0.6)' }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="mt-8 overflow-hidden">
          <div className="loader-text font-display text-arch-white text-xl tracking-widest opacity-0 translate-y-6 flex items-baseline gap-2">
            <span className="w-8 text-right">{String(count).padStart(3, '0')}</span>
            <span className="text-arch-gold text-sm">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
