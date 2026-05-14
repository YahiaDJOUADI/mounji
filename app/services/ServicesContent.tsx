'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Ruler, Layers, Milestone, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import PageHero from '@/components/PageHero';
import MagneticButton from '@/components/MagneticButton';
import { services } from '@/data/services';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const serviceImages: Record<string, string> = {
  'architecture':  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=90&w=1600',
  'interior':      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=90&w=1600',
  'urban':         'https://images.unsplash.com/photo-1449156059431-789c137faf3c?auto=format&fit=crop&q=90&w=1600',
  'consultation':  'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=90&w=1600',
};

const processSteps = [
  { id: '01', title: 'Conceptual Brief',  desc: 'Defining the spatial DNA and project objectives through intensive dialogue with client and site analysis.', icon: Compass },
  { id: '02', title: 'Schematic Design', desc: 'Transforming ideas into precise structural blueprints, technical sketches, and 3D conceptual models.', icon: Ruler },
  { id: '03', title: 'Development',       desc: 'Finalizing materials, lighting, environmental integration, and spatial flow with engineering teams.', icon: Layers },
  { id: '04', title: 'Execution',         desc: 'Management of construction with surgical precision, site visits, and quality control until final delivery.', icon: Milestone },
];

export default function ServicesContent() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal scroll process
      if (horizontalRef.current) {
        const steps = gsap.utils.toArray<HTMLElement>('.process-step');
        const totalW = horizontalRef.current.scrollWidth - window.innerWidth;
        gsap.to(steps, {
          x: -totalW,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1.2,
            end: () => `+=${totalW + 200}`,
            invalidateOnRefresh: true,
          },
        });
      }

      // Section reveals
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-arch-black min-h-screen">
      <PageHero
        title="Expertise"
        label="Service Protocols"
        subtitle="End-to-end architectural solutions from concept to completion. Pushing the spatial narrative through technical rigor and visionary design."
        bgImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=90&w=2000"
      />

      {/* ── Service Explorer — Full Width ── */}
      <section className="relative overflow-hidden">
        {/* Full-bleed image panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={serviceImages[services[activeService]?.id] || serviceImages['architecture']}
              alt="Service"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-arch-black via-arch-black/90 to-arch-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-arch-black/60 to-transparent" />
            <div className="absolute inset-0 blueprint-grid opacity-10" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 container-wide py-32 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left — service selector */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="eyebrow mb-10 block">Scope of Work</span>
              <div>
                {services.map((service, i) => (
                  <button
                    key={service.id}
                    onMouseEnter={() => setActiveService(i)}
                    onClick={() => setActiveService(i)}
                    className="group w-full text-left border-b border-arch-white/5 hover:border-arch-gold/15 transition-colors duration-400"
                  >
                    <div className="flex items-center justify-between py-7">
                      <div className="flex items-center gap-6">
                        <span className={`font-display text-xl italic transition-colors duration-400 ${activeService === i ? 'text-arch-gold' : 'text-arch-white/15'}`}>
                          0{i + 1}
                        </span>
                        <h3 className={`font-display tracking-tight transition-all duration-400 ${
                          activeService === i
                            ? 'text-arch-white text-4xl lg:text-5xl'
                            : 'text-arch-white/20 text-3xl lg:text-4xl group-hover:text-arch-white/50'
                        }`}>
                          {service.title}
                        </h3>
                      </div>
                      {activeService === i && (
                        <motion.div
                          layoutId="service-indicator"
                          className="w-2 h-2 bg-arch-gold rounded-full"
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right — service detail */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'circOut' }}
                  className="space-y-12"
                >
                  {/* Service number large */}
                  <div className="font-display text-[15rem] text-arch-gold/5 italic leading-none -mb-16 pointer-events-none select-none">
                    0{activeService + 1}
                  </div>

                  <div>
                    <span className="eyebrow text-arch-gold mb-4 block">Strategic Intent</span>
                    <p className="text-arch-cream/80 text-xl font-light leading-relaxed max-w-xl">
                      {services[activeService]?.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <span className="eyebrow text-arch-gold mb-5 block">Components</span>
                    <div className="flex flex-wrap gap-2">
                      {services[activeService]?.features?.map(f => (
                        <span
                          key={f}
                          className="px-4 py-2 border border-arch-gold/15 text-[0.55rem] uppercase tracking-[0.25em] text-arch-muted hover:bg-arch-gold hover:text-arch-black hover:border-arch-gold transition-all duration-300 cursor-default font-bold"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-6 border-t border-arch-white/5">
                    <MagneticButton strength={25}>
                      <Link href="/contact" className="arch-btn arch-btn-outline group">
                        Project Inquiry
                        <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </MagneticButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process — Horizontal Cinematic ── */}
      <section ref={horizontalRef} className="bg-arch-black border-t border-arch-border/20 overflow-hidden h-screen flex flex-col justify-center">
        <div className="container-wide flex-shrink-0 pb-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow text-arch-gold mb-3 block">Methodology</span>
              <h2 className="font-display font-light text-arch-white leading-none tracking-tight hero-shadow"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
              >
                Architectural<br /><span className="text-outline-gold">Workflow</span>
              </h2>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-arch-white/20">
              <div className="mono-tag">Scroll →</div>
            </div>
          </div>
        </div>

        <div className="flex items-stretch gap-4 lg:gap-6 px-6 lg:px-16 flex-shrink-0" style={{ width: 'max-content' }}>
          {processSteps.map((step, i) => (
            <div key={step.id} className="process-step flex-shrink-0" style={{ width: '42vw', minWidth: '340px' }}>
              <div className="relative p-10 border border-arch-white/5 hover:border-arch-gold/15 h-full group transition-all duration-700 bg-arch-black">

                {/* Big number */}
                <div className="absolute -top-10 -left-6 font-display text-[15rem] text-arch-gold/[0.04] italic leading-none pointer-events-none select-none group-hover:text-arch-gold/[0.07] transition-colors duration-1000">
                  {step.id}
                </div>

                <div className="relative z-10">
                  <step.icon className="text-arch-gold mb-10 w-8 h-8" strokeWidth={1} />
                  <h3 className="font-display text-4xl text-arch-white font-light mb-5 leading-tight">{step.title}</h3>
                  <p className="text-arch-muted font-light leading-relaxed">{step.desc}</p>

                  <div className="mt-14 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-arch-gold animate-pulse" />
                    <span className="mono-tag">Active protocol</span>
                  </div>
                </div>

                {/* Corner marks */}
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-arch-gold/20" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Commitment Section ── */}
      <section className="py-40 relative border-t border-arch-border/20 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-25" />
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <div className="reveal-up relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80"
                  alt="Structural Detail"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-arch-black/60 to-transparent" />
              </div>
              {/* Architectural frame */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-arch-gold/30" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-arch-gold/30" />
              {/* Label */}
              <div className="absolute bottom-6 left-6">
                <div className="mono-tag mb-1">ALG_DRAFT_2026</div>
                <div className="font-display text-arch-gold text-2xl italic">Structural Matrix</div>
              </div>
            </div>

            <div className="space-y-10 reveal-up">
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-arch-gold" />
                <span className="eyebrow">Commitment</span>
              </div>
              <h2 className="font-display font-light text-arch-white leading-none tracking-tight hero-shadow"
                style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)' }}
              >
                Global Precision,<br /><span className="text-arch-gold italic text-glow-gold">Algerian Roots.</span>
              </h2>
              <p className="text-arch-muted font-light leading-relaxed text-lg max-w-md">
                Every project is an opportunity to redefine how people inhabit space. From urban masterplans in Algiers to high-end villas along the coast, our rigor remains absolute.
              </p>
              <div className="grid grid-cols-2 gap-10 pt-10 border-t border-arch-border/20">
                <div>
                  <div className="font-display text-6xl text-arch-gold italic leading-none mb-2">100%</div>
                  <div className="eyebrow">Accuracy to Sketch</div>
                </div>
                <div>
                  <div className="font-display text-6xl text-arch-gold italic leading-none mb-2">A+</div>
                  <div className="eyebrow">Structural Grade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-t border-arch-border/15">
        <Image
          src="https://images.unsplash.com/photo-1449156059431-789c137faf3c?auto=format&fit=crop&q=80&w=2000"
          alt="CTA"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-arch-black/75" />
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-arch-gold/20" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-arch-gold/20" />

        <div className="relative z-10 text-center px-8">
          <span className="eyebrow text-arch-gold mb-10 block">Begin the Draft</span>
          <h2 className="font-display font-light text-arch-white leading-none tracking-tight mb-14 hero-shadow"
            style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
          >
            Start Your<br /><span className="text-arch-gold italic text-glow-gold">Portfolio</span>
          </h2>
          <MagneticButton strength={60}>
            <Link href="/contact" className="arch-btn arch-btn-primary arch-btn-xl">
              Inquire Protocol
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
