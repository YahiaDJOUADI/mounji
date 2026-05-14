'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  label?: string;
  backgroundImage?: string;
  bgImage?: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, subtitle, label, backgroundImage, bgImage, children }: PageHeroProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const scanlineRef  = useRef<HTMLDivElement>(null);
  const bg = backgroundImage || bgImage;

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const imgY     = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.from('.hero-title-line', {
          y: 120, opacity: 0, rotateX: -20,
          duration: 1.2, stagger: 0.15, ease: 'expo.out', delay: 0.1,
        });
      }

      // Scanline animation
      if (scanlineRef.current) {
        gsap.to(scanlineRef.current, {
          x: '110vw',
          duration: 2.5,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: 4,
        });
      }

      // Technical elements reveal
      gsap.from('.tech-tag', {
        x: -20, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.8
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = title.split(' ');
  const first = words[0];
  const rest  = words.slice(1).join(' ');

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden bg-arch-black"
    >
      {/* Full-bleed background */}
      {bg && (
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 origin-center z-0">
          <Image src={bg} alt={title} fill priority className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-arch-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-arch-black via-transparent to-transparent" />
        </motion.div>
      )}

      {/* ── Matrix Elements ── */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.08] z-0" />
      
      {/* Technical Scanline */}
      <div 
        ref={scanlineRef}
        className="absolute top-0 bottom-0 w-px bg-arch-gold/40 z-10 pointer-events-none"
        style={{ boxShadow: '0 0 20px rgba(201,168,76,0.6)', left: '-10vw' }}
      />

      {/* Meta Pings */}
      <div className="absolute top-28 left-8 lg:left-16 z-20 flex flex-col gap-4">
        <div className="tech-tag flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-arch-gold animate-pulse" />
          <span className="mono-tag text-arch-gold/50 tracking-[0.3em]">{label?.toUpperCase() || 'DATA'} // PROTOCOL_0{title.length}</span>
        </div>
        <div className="tech-tag flex items-center gap-3">
          <div className="h-px w-8 bg-arch-gold/20" />
          <span className="mono-tag text-arch-gold/30 text-[0.45rem]">LAT_36.7538° N // LON_3.0588° E</span>
        </div>
      </div>

      {/* Side Data Trace */}
      <div className="absolute right-8 lg:right-14 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:block">
        <div className="tech-tag mono-tag rotate-90 whitespace-nowrap origin-right text-arch-gold/20 tracking-[0.6em] uppercase">
          Mounji Archive Matrix · System_v2.1
        </div>
      </div>

      {/* Corner Frame */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-arch-gold/20 z-10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-arch-gold/20 z-10" />

      {/* Giant Watermark */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none z-0">
        <div
          className="font-display text-arch-gold/[0.03] whitespace-nowrap font-light italic leading-none tracking-tighter uppercase"
          style={{ fontSize: '35vw' }}
        >
          {title}
        </div>
      </div>

      {/* ── Content ── */}
      <motion.div style={{ opacity }} className="relative z-20 container-wide pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-12">
          <div className="lg:col-span-9">
            
            {label && (
              <div className="flex items-center gap-6 mb-10 overflow-hidden">
                <div className="w-12 h-px bg-arch-gold/40" />
                <span className="eyebrow text-arch-gold tracking-[0.4em] uppercase">{label}</span>
              </div>
            )}

            <h1
              ref={titleRef}
              className="font-display font-light text-arch-white leading-[0.85] tracking-[-0.04em] hero-shadow"
              style={{ fontSize: 'clamp(4rem, 11vw, 10.5rem)', perspective: '1000px' }}
            >
              <div className="overflow-hidden">
                <span className="hero-title-line inline-block">{first}</span>
              </div>
              {rest && (
                <div className="overflow-hidden">
                  <span className="hero-title-line inline-block text-arch-gold italic text-glow-gold">
                    {rest}
                  </span>
                </div>
              )}
            </h1>

            {subtitle && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-12 flex flex-col sm:flex-row sm:items-start gap-8"
              >
                <div className="w-px h-16 bg-arch-gold/30 hidden sm:block mt-2" />
                <p className="text-arch-muted text-lg font-light leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              </motion.div>
            )}
            
            {children}
          </div>
        </div>
      </motion.div>

      {/* Technical Scroll Cue */}
      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-3 z-20">
        <div className="mono-tag text-arch-gold/40 text-[0.45rem] tracking-[0.3em]">INITIALIZING_SCROLL</div>
        <div className="w-px h-12 bg-gradient-to-b from-arch-gold/60 to-transparent" />
      </div>
    </section>
  );
};

export default PageHero;
