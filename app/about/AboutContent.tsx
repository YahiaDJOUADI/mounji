'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import MagneticButton from '@/components/MagneticButton';

const skills = [
  { name: 'Architectural Design',  level: 95 },
  { name: 'Interior Design',       level: 88 },
  { name: 'Project Management',    level: 82 },
  { name: '3D Visualization',      level: 90 },
  { name: 'Sustainable Design',    level: 78 },
  { name: 'Urban Planning',        level: 72 },
];

const timeline = [
  { year: '2012', title: 'Practice Founded',    sub: 'Established in Algeria with focus on high-end residential.' },
  { year: '2016', title: 'First Major Award',   sub: 'Recognized for Blida Cultural Center by the Algerian Architecture Institute.' },
  { year: '2019', title: 'Es-Safoua Mall',      sub: 'Delivered the landmark commercial center — a defining moment.' },
  { year: '2023', title: 'Coastal Retreat',     sub: 'Award-winning seaside residence in Annaba recognized nationally.' },
  { year: '2024', title: 'Regional Expansion',  sub: 'Extended operations across North Africa, active in 8 cities.' },
];

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-2 items-baseline">
        <span className="text-arch-cream text-sm font-light">{name}</span>
        <span className="mono-tag">{level}%</span>
      </div>
      <div className="h-px bg-arch-border/40 w-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-arch-gold/70 to-arch-gold"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

export default function AboutContent() {
  const bioRef  = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bioScroll } = useScroll({ target: bioRef, offset: ['start end', 'end start'] });
  const imgParallax = useTransform(bioScroll, [0, 1], [40, -40]);

  return (
    <>
      <PageHero
        title="About"
        label="The Architect"
        subtitle="Over a decade of transforming architectural visions into enduring realities across North Africa."
        backgroundImage="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=90&w=2000"
      />

      {/* ── Bio — Split Screen ── */}
      <section ref={bioRef} className="relative bg-arch-black overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* Portrait column */}
          <div className="relative lg:h-screen lg:sticky lg:top-0 overflow-hidden">
            <div className="absolute inset-0">
              <motion.div style={{ y: imgParallax }} className="absolute inset-0">
                <Image
                  src="/images/architect-portrait.jpg"
                  alt="Djouadi Mounji"
                  fill
                  className="object-cover object-top"
                  sizes="50vw"
                />
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-arch-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-arch-black/80 to-transparent" />

            {/* Technical overlay */}
            <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-arch-gold/25" />
            <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-arch-gold/25" />
            <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-arch-gold/25" />

            {/* Bottom badge */}
            <div className="absolute bottom-10 left-8 lg:left-12">
              <div className="mono-tag mb-2">ARCHITECT · ALG</div>
              <div className="font-display text-8xl text-arch-gold italic leading-none">12+</div>
              <div className="eyebrow mt-2">Years of Excellence</div>
            </div>
          </div>

          {/* Text column */}
          <div className="px-8 py-24 lg:px-14 xl:px-20 lg:py-32 flex flex-col justify-center gap-20">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span className="section-label mb-6">Biography</span>
              <h2 className="font-display font-light text-arch-white text-6xl lg:text-7xl leading-[0.85] tracking-tight mb-10 hero-shadow">
                Djouadi<br /><span className="text-arch-gold italic text-glow-gold">Mounji</span>
              </h2>
              <div className="space-y-5 text-arch-muted font-light leading-relaxed text-lg">
                <p>
                  A licensed architect with over 12 years of professional practice, specializing in residential and commercial architecture across Algeria.
                </p>
                <p>
                  My work is rooted in a deep respect for context, materials, and the lives that inhabit built space. Each project begins with an intensive listening phase — understanding site, climate, culture, and client aspirations.
                </p>
                <p>
                  From intimate private residences to landmark commercial centers like <span className="text-arch-cream">Es-Safoua Mall</span>, the same commitment to craft, detail, and spatial narrative applies to every scale.
                </p>
              </div>
              <div className="mt-12 flex gap-4">
                <MagneticButton strength={20}>
                  <Link href="/contact" className="arch-btn arch-btn-primary group">
                    Start a Project <ArrowRight size={13} className="btn-icon ml-2" />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="border-t border-arch-border/30 pt-12 grid grid-cols-2 gap-8"
            >
              {[
                { l: 'Based In', v: 'Algeria, North Africa' },
                { l: 'Founded', v: '2012' },
                { l: 'Speciality', v: 'Residential & Commercial' },
                { l: 'Available', v: '2026 Projects' },
              ].map(({ l, v }) => (
                <div key={l}>
                  <div className="eyebrow mb-1">{l}</div>
                  <div className="text-arch-cream text-sm font-light">{v}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-arch-dark py-32 relative overflow-hidden border-t border-arch-border/20">
        <div className="blueprint-grid absolute inset-0 opacity-30" />
        <div className="container-wide relative z-10">

          {/* Section header — large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-arch-gold" />
              <span className="eyebrow">Journey</span>
            </div>
            <h2 className="font-display font-light text-arch-white leading-none tracking-tight hero-shadow"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
            >
              Key<br /><span className="text-outline-gold">Milestones</span>
            </h2>
          </motion.div>

          {/* Timeline entries */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 lg:left-24 top-0 bottom-0 w-px bg-arch-gold/10" />

            <div className="space-y-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group grid grid-cols-1 lg:grid-cols-12 border-b border-arch-border/15 hover:border-arch-gold/15 transition-colors duration-500 py-10 pl-6 lg:pl-0 items-start gap-4 lg:gap-0"
                >
                  {/* Year */}
                  <div className="lg:col-span-3 lg:pl-8">
                    <div className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[33px] top-2 w-3 h-3 rounded-full border border-arch-gold/30 bg-arch-dark group-hover:border-arch-gold group-hover:bg-arch-gold/20 transition-all duration-400 hidden lg:block" />
                      <div className="font-display text-5xl text-arch-gold/20 italic leading-none group-hover:text-arch-gold/50 transition-colors duration-400">
                        {item.year}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-9 lg:pr-8">
                    <h3 className="font-display text-3xl lg:text-4xl text-arch-cream font-light leading-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-arch-muted font-light leading-relaxed">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="bg-arch-black py-32 border-t border-arch-border/20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-arch-gold" />
                <span className="eyebrow">Expertise</span>
              </div>
              <h2 className="font-display font-light text-arch-white text-5xl leading-tight tracking-tight mb-12">
                Skills &<br />Capabilities
              </h2>
              <div className="space-y-8">
                {skills.map((s, i) => <SkillBar key={s.name} {...s} index={i} />)}
              </div>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-arch-gold" />
                <span className="eyebrow">Philosophy</span>
              </div>
              <h2 className="font-display font-light text-arch-white text-5xl leading-tight tracking-tight mb-12">
                Design<br />Thinking
              </h2>
              <div className="space-y-12">
                {[
                  {
                    n: '01',
                    title: 'Context First',
                    desc: 'Architecture must respond to its site — climate, culture, history — before asserting its own formal language.',
                  },
                  {
                    n: '02',
                    title: 'Material Honesty',
                    desc: 'Materials are chosen for their intrinsic qualities and the way they age. Decoration that conceals structure is avoided.',
                  },
                  {
                    n: '03',
                    title: 'The Human Scale',
                    desc: 'Every dimension is tested against the human body — how it feels to stand, move, gather, and be alone within a space.',
                  },
                ].map(({ n, title, desc }) => (
                  <div key={title} className="grid grid-cols-12 gap-4 group">
                    <div className="col-span-2">
                      <span className="font-display text-3xl text-arch-gold/20 italic group-hover:text-arch-gold/50 transition-colors duration-400">{n}</span>
                    </div>
                    <div className="col-span-10 border-l border-arch-gold/15 pl-5 group-hover:border-arch-gold/40 transition-colors duration-400">
                      <h3 className="font-display text-2xl text-arch-cream font-light mb-2">{title}</h3>
                      <p className="text-arch-muted text-sm font-light leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-t border-arch-border/20">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
          alt="CTA"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-arch-black/80" />
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        {/* Corner marks */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-arch-gold/20" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-arch-gold/20" />

        <div className="relative z-10 text-center">
          <span className="eyebrow text-arch-gold mb-8 block">Start a Conversation</span>
          <h2 className="font-display font-light text-arch-white text-7xl lg:text-9xl leading-none tracking-tight mb-12 hero-shadow">
            Ready to Build<br /><span className="text-arch-gold italic text-glow-gold">Together?</span>
          </h2>
          <MagneticButton strength={40}>
            <Link href="/contact" className="arch-btn arch-btn-primary arch-btn-xl">
              Get in Touch <ArrowUpRight size={14} className="ml-2" />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
