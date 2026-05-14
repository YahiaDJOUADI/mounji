'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MagneticButton from '@/components/MagneticButton';
import { projects } from '@/data/projects';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const featuredProjects = projects.filter(p => p.featured);

export default function HomeContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY    = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split title
      if (titleRef.current && !titleRef.current.querySelector('.line-wrap')) {
        const html = titleRef.current.innerHTML;
        const parts = html.split('<br>');
        titleRef.current.innerHTML = parts.map(p =>
          `<div class="overflow-hidden line-wrap"><span class="line-inner inline-block">${p}</span></div>`
        ).join('');
      }

      gsap.from('.line-inner', {
        y: 140, rotateX: -20, opacity: 0,
        duration: 1.2, stagger: 0.15, ease: 'expo.out', delay: 0.2,
      });
      gsap.from('.hero-fade', {
        y: 30, opacity: 0,
        duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.9,
      });

      // Horizontal scrolling project showcase
      const projectsWrapper = document.querySelector('.projects-horizontal') as HTMLElement;
      if (projectsWrapper) {
        const cards = gsap.utils.toArray<HTMLElement>('.proj-card');
        const totalWidth = projectsWrapper.scrollWidth - window.innerWidth;
        gsap.to(cards, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: '.projects-scroll-section',
            pin: true,
            scrub: 1,
            end: () => `+=${totalWidth + 400}`,
            invalidateOnRefresh: true,
          },
        });
      }

      // Section reveals
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
        gsap.from(el, {
          y: 70, opacity: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, containerRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">

      {/* ═══ HERO — FULL CINEMATIC ═══ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden bg-arch-black flex flex-col justify-end">

        {/* Full-bleed background image */}
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 origin-center z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=90&w=2000"
            alt="Architecture"
            fill priority
            className="object-cover"
          />
          {/* Deepened overlays for visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-arch-black/90 via-arch-black/45 to-arch-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-arch-black/85 via-arch-black/25 to-transparent" />
        </motion.div>

        {/* Technical grid overlay */}
        <div className="absolute inset-0 z-0 blueprint-grid opacity-20" />

        {/* Top-left coordinate label */}
        <div className="absolute top-28 left-8 lg:left-16 z-20 pointer-events-none">
          <div className="mono-tag">N 36°43′ / E 3°13′</div>
          <div className="mono-tag mt-1">ALG_STUDIO · EST.2012</div>
        </div>

        {/* Top-right technical marks */}
        <div className="absolute top-28 right-8 lg:right-16 z-20 pointer-events-none hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-arch-gold/30" />
            <div className="mono-tag">PROJ_REF·085</div>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-6 h-px bg-arch-gold/30" />
            <div className="mono-tag">REV_01 · 2026</div>
          </div>
        </div>

        {/* Side year marker */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 z-50 pointer-events-none">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-arch-gold/30" />
          <div className="mono-tag rotate-90 whitespace-nowrap">2026 · DM/ALG</div>
          <div className="w-px h-16 bg-gradient-to-t from-transparent to-arch-gold/30" />
        </div>

        {/* HERO CONTENT — bottom aligned */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container-wide pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
            
            {/* Main title — extreme scale */}
            <div className="lg:col-span-8">
              <div className="hero-fade flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-arch-gold" />
                <span className="eyebrow">Architectural Excellence · Algeria</span>
              </div>
              <h1
                ref={titleRef}
                className="font-display font-light text-arch-white leading-[0.82] tracking-[-0.03em] hero-shadow"
                style={{ fontSize: 'clamp(3.5rem, 15vw, 12rem)', perspective: '1000px' }}
              >
                Djouadi<br /><span className="text-arch-gold italic text-glow-gold">Mounji</span>
              </h1>

              {/* Bottom bar */}
              <div className="hero-fade mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                <p className="text-arch-muted font-light text-base max-w-xs leading-relaxed">
                  Timeless architectural narratives across North Africa and beyond.
                </p>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 shrink-0">
                  <MagneticButton strength={40}>
                    <Link href="/projects" className="arch-btn arch-btn-primary arch-btn-lg w-full sm:w-auto">
                      View Portfolio
                    </Link>
                  </MagneticButton>
                  <MagneticButton strength={20}>
                    <Link href="/contact" className="arch-btn arch-btn-ghost arch-btn-lg w-full sm:w-auto">
                      Discuss Project
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Stats column */}
            <div className="lg:col-span-4 hero-fade hidden lg:block">
              <div className="border-l border-arch-gold/15 pl-8 space-y-8">
                {[
                  { n: '12+', l: 'Years' },
                  { n: '85+', l: 'Projects' },
                  { n: '12',  l: 'Awards' },
                  { n: '8',   l: 'Cities' },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-display text-5xl text-arch-gold italic leading-none">{s.n}</div>
                    <div className="eyebrow mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
          <motion.div
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-16 bg-gradient-to-b from-arch-gold/60 to-transparent origin-top"
          />
          <span className="eyebrow text-arch-gold/40">Scroll</span>
        </div>
      </section>

      {/* ═══ PROJECTS — FULL-BLEED CINEMATIC SEQUENCE ═══ */}
      <div className="projects-scroll-section">
        <div className="projects-horizontal flex" style={{ width: `${featuredProjects.length * 100}vw` }}>
          {featuredProjects.map((project, i) => (
            <div
              key={project.id}
              className="proj-card relative h-screen flex-shrink-0 overflow-hidden"
              style={{ width: '100vw' }}
            >
              {/* Full-bleed image */}
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
              />
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-arch-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-arch-black/60 to-transparent" />
              {/* Blueprint grid */}
              <div className="absolute inset-0 blueprint-grid opacity-10" />

              {/* Technical corner marks */}
              <div className="absolute top-8 left-8 lg:top-12 lg:left-16">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-arch-gold/40" />
                  <span className="mono-tag">0{i + 1} / {String(featuredProjects.length).padStart(2,'0')}</span>
                </div>
                <div className="mono-tag mt-2">{project.year}</div>
              </div>
              <div className="absolute top-8 right-8 lg:top-12 lg:right-16">
                <span className="eyebrow text-arch-gold/50">{project.category}</span>
              </div>

              {/* Project content — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
                  <div className="lg:col-span-7">
                    <div className="font-display text-[clamp(1rem,3vw,2rem)] text-arch-gold/40 italic mb-2">
                      0{i + 1}
                    </div>
                    <h2 className="font-display font-light text-arch-white leading-none tracking-tight hero-shadow"
                      style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
                    >
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-6 mt-5">
                      <div className="w-8 h-px bg-arch-gold/40" />
                      <span className="text-arch-muted text-sm font-light">{project.location}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex lg:justify-end items-end">
                    <Link
                      href={`/projects/${project.id}`}
                      className="group flex items-center gap-5 hover:gap-8 transition-all duration-500"
                    >
                      <span className="eyebrow text-arch-gold group-hover:text-arch-gold-light transition-colors">View Project</span>
                      <div className="w-12 h-12 border border-arch-gold/40 flex items-center justify-center group-hover:bg-arch-gold group-hover:border-arch-gold transition-all duration-400">
                        <ArrowUpRight size={16} className="text-arch-gold group-hover:text-arch-black transition-colors duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Bottom progress bar */}
                <div className="mt-10 flex gap-2">
                  {featuredProjects.map((_, j) => (
                    <div
                      key={j}
                      className={`h-px flex-1 transition-colors duration-300 ${j === i ? 'bg-arch-gold' : 'bg-arch-gold/15'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ARCHITECTURAL MARQUEE BAND ═══ */}
      <div className="py-8 bg-arch-dark border-y border-arch-border/30 overflow-hidden">
        <div className="marquee-track">
          {['Architecture', 'Interior Design', 'Urban Planning', '85+ Projects', 'Algeria', '12 Years', 'Structural Precision', 'Timeless Vision', 'North Africa'].concat(
           ['Architecture', 'Interior Design', 'Urban Planning', '85+ Projects', 'Algeria', '12 Years', 'Structural Precision', 'Timeless Vision', 'North Africa']
          ).map((t, i) => (
            <span key={i} className="flex items-center gap-10 mx-10 shrink-0">
              <span className="font-display text-arch-white/8 text-4xl font-light uppercase tracking-widest whitespace-nowrap italic">
                {t}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-arch-gold/20 shrink-0 rotate-45" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══ PHILOSOPHY — SPLIT SCREEN IMMERSIVE ═══ */}
      <section className="relative bg-arch-black overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* Left — image (sticky) */}
          <div className="relative h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
            <Image
              src="/images/architect-portrait.jpg"
              alt="Djouadi Mounji"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-arch-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-arch-black/60 to-transparent" />

            {/* Technical annotation overlay */}
            <div className="absolute inset-0 flex items-end p-10 lg:p-16">
              <div>
                {/* Measurement-style annotation */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-px bg-arch-gold/40" />
                  <span className="mono-tag">ARCHITECT · DM</span>
                </div>
                <div className="font-display text-7xl text-arch-gold italic leading-none opacity-90">12+</div>
                <div className="eyebrow mt-2">Years of Practice</div>
              </div>
            </div>

            {/* Corner crosshairs */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-arch-gold/25" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-arch-gold/25" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-arch-gold/25" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-arch-gold/25" />
          </div>

          {/* Right — scrolling philosophy content */}
          <div className="relative bg-arch-black lg:bg-transparent py-20 lg:py-32 px-6 lg:px-16 xl:px-24 flex flex-col justify-center gap-20 lg:gap-32">

            {/* Philosophy text 1 */}
            <div className="reveal-up">
              <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <span className="font-display text-[6rem] lg:text-[8rem] text-arch-gold/6 italic absolute -left-2 lg:-left-4 -top-12 lg:-top-16 pointer-events-none leading-none select-none">01</span>
                <div className="w-8 h-px bg-arch-gold/30" />
                <span className="eyebrow">Context</span>
              </div>
              <h3 className="font-display font-light text-arch-white text-5xl lg:text-6xl leading-[0.88] tracking-tight mb-8">
                Space is the<br /><span className="text-arch-gold italic">silent language</span><br />of human life.
              </h3>
              <p className="text-arch-muted font-light leading-relaxed text-lg max-w-md">
                Architecture is the art of giving form to the spaces where life unfolds. Each project begins with listening — to the site, the culture, the people who will inhabit it.
              </p>
            </div>

            {/* Philosophy text 2 */}
            <div className="reveal-up">
              <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <span className="font-display text-[6rem] lg:text-[8rem] text-arch-gold/6 italic absolute -left-2 lg:-left-4 -top-12 lg:-top-16 pointer-events-none leading-none select-none">02</span>
                <div className="w-8 h-px bg-arch-gold/30" />
                <span className="eyebrow">Precision</span>
              </div>
              <h3 className="font-display font-light text-arch-white text-5xl lg:text-6xl leading-[0.88] tracking-tight mb-8">
                Algerian roots,<br /><span className="text-arch-gold italic">global precision.</span>
              </h3>
              <p className="text-arch-muted font-light leading-relaxed text-lg max-w-md">
                We blend the cultural depth of North Africa with contemporary structural precision — creating environments that are both purposeful and timeless.
              </p>
              <MagneticButton strength={25}>
                <Link href="/about" className="arch-btn arch-btn-outline mt-10 group">
                  Our Philosophy <ArrowRight size={13} className="btn-icon ml-2" />
                </Link>
              </MagneticButton>
            </div>

            {/* Stats row */}
            <div className="reveal-up border-t border-arch-border/30 pt-12 lg:pt-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                {[
                  { n: '12+', l: 'Years' },
                  { n: '85+', l: 'Projects' },
                  { n: '12',  l: 'Awards' },
                  { n: '8',   l: 'Cities' },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-display text-5xl text-arch-cream italic leading-none mb-1">{s.n}</div>
                    <div className="eyebrow">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROJECT GRID TEASER ═══ */}
      <section className="bg-arch-dark py-32 relative overflow-hidden border-t border-arch-border/20">
        <div className="blueprint-grid absolute inset-0 opacity-40" />

        <div className="container-wide relative z-10">
          <div className="flex items-end justify-between mb-16 reveal-up">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-px bg-arch-gold" />
                <span className="eyebrow">Selected Works</span>
              </div>
              <h2 className="font-display font-light text-arch-white leading-none tracking-tight"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}
              >
                Recent<br /><span className="text-outline-gold">Projects</span>
              </h2>
            </div>
            <Link href="/projects" className="hidden md:flex items-center gap-4 group">
              <span className="eyebrow text-arch-gold group-hover:text-arch-gold-light transition-colors duration-300">All Work</span>
              <div className="w-10 h-10 border border-arch-gold/30 flex items-center justify-center group-hover:bg-arch-gold group-hover:border-arch-gold transition-all duration-400">
                <ArrowUpRight size={14} className="text-arch-gold group-hover:text-arch-black transition-colors duration-300" />
              </div>
            </Link>
          </div>

          {/* Asymmetric project grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 reveal-up">
            {/* Large feature — left */}
            {projects[0] && (
              <Link href={`/projects/${projects[0].id}`} className="lg:col-span-7 group relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] overflow-hidden arch-corner block">
                <Image src={projects[0].thumbnail} alt={projects[0].title} fill className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-arch-black/90 via-arch-black/20 to-transparent" />
                {/* Label */}
                <div className="absolute top-6 left-6">
                  <span className="eyebrow text-arch-gold/60 bg-arch-black/50 backdrop-blur-sm px-3 py-1.5 block">{projects[0].category}</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="mono-tag mb-2">{projects[0].year}</div>
                  <h3 className="font-display text-4xl text-arch-white font-light leading-tight">{projects[0].title}</h3>
                  <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="w-6 h-px bg-arch-gold" />
                    <span className="eyebrow text-arch-gold">View Project</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Right column — stacked */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              {projects.slice(1, 3).map(project => (
                <Link key={project.id} href={`/projects/${project.id}`} className="group relative aspect-[4/3] overflow-hidden arch-corner block">
                  <Image src={project.thumbnail} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-arch-black/90 via-arch-black/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="eyebrow text-arch-gold/50 bg-arch-black/50 backdrop-blur-sm px-2.5 py-1 block">{project.category}</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="mono-tag mb-1">{project.year}</div>
                    <h3 className="font-display text-2xl text-arch-white font-light leading-tight">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                      <div className="w-4 h-px bg-arch-gold" />
                      <span className="eyebrow text-arch-gold text-[0.5rem]">View</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom link — mobile */}
          <div className="mt-10 flex justify-center md:hidden">
            <Link href="/projects" className="arch-btn arch-btn-outline">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA — FULL SCREEN ═══ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=90&w=2000"
          alt="CTA"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-arch-black/75" />
        <div className="absolute inset-0 blueprint-grid opacity-15" />

        {/* Corner marks */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-arch-gold/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-arch-gold/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-arch-gold/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-arch-gold/20" />

        {/* Technical labels */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 mono-tag">CTA · SECTION_05</div>

        <div className="relative z-10 text-center container-wide reveal-up px-8">
          <span className="eyebrow text-arch-gold mb-8 block">Begin the Dialogue</span>
          <h2
            className="font-display font-light text-arch-white leading-[0.82] tracking-[-0.03em] mb-16 hero-shadow"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 13rem)' }}
          >
            Start your<br /><span className="text-arch-gold italic text-glow-gold">Legacy</span>
          </h2>
          <MagneticButton strength={60}>
            <Link href="/contact" className="arch-btn arch-btn-primary arch-btn-xl">
              Build Together
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
