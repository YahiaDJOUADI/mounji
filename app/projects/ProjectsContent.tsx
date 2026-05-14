'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Search, LayoutGrid, List } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/lib/utils';
import PageHero from '@/components/PageHero';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const categories = ['all', 'architecture', 'interior', 'residential', 'commercial'] as const;
type Category = typeof categories[number];

export default function ProjectsContent() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');
  const horizontalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter(p => p.featured);
  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (horizontalRef.current) {
        const sections = gsap.utils.toArray('.project-card-featured');
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + horizontalRef.current?.offsetWidth,
            invalidateOnRefresh: true,
          }
        });
      }

      // Stagger reveals for the grid
      gsap.from('.grid-project-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.project-grid-section',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="bg-arch-black min-h-screen">
      <PageHero
        title="Project Archive"
        label="The Matrix"
        subtitle="A technical repository of architectural responses. From urban commercial centers to precision-crafted residential retreats."
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=90&w=2000"
      />

      {/* ── Featured Horizontal Scroll ── */}
      <section className="relative overflow-hidden border-b border-arch-border/20">
        <div className="absolute top-8 left-12 z-20">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-arch-gold/40" />
            <span className="eyebrow text-arch-gold/60">Featured Masterworks</span>
          </div>
        </div>

        <div ref={horizontalRef} className="flex flex-nowrap h-[85vh]">
          {featuredProjects.map((project, i) => (
            <div 
              key={project.id} 
              className="project-card-featured flex-shrink-0 w-screen h-full relative overflow-hidden group"
            >
              {/* Background Image */}
              <div className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-1500 ease-out">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-arch-black via-arch-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-transparent to-transparent" />
              </div>

              {/* Technical Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] border border-arch-gold/15" />
                <div className="absolute top-[15%] left-[10%] mono-tag text-arch-gold/40">LAT_36.75_N</div>
                <div className="absolute bottom-[15%] right-[10%] mono-tag text-arch-gold/40">LON_3.05_E</div>
                <div className="absolute top-1/2 right-12 h-32 w-px bg-arch-gold/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-12 lg:p-24 max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-display text-4xl text-arch-gold italic leading-none">0{i + 1}</span>
                    <div className="h-px flex-1 bg-arch-gold/30" />
                    <span className="mono-tag text-arch-gold/60">{project.category}</span>
                  </div>
                  <h3 className="font-display text-5xl sm:text-6xl lg:text-8xl text-arch-white font-light leading-tight mb-8 hero-shadow">
                    {project.title.split(' ').map((word, idx) => (
                      <span key={idx} className={idx === project.title.split(' ').length - 1 ? 'text-arch-gold italic text-glow-gold' : ''}>
                        {word}{' '}
                      </span>
                    ))}
                  </h3>
                  <div className="flex flex-wrap items-center gap-8 mb-12">
                    <div>
                      <div className="eyebrow text-arch-muted mb-1">Location</div>
                      <div className="text-arch-cream">{project.location}</div>
                    </div>
                    <div>
                      <div className="eyebrow text-arch-muted mb-1">Year</div>
                      <div className="text-arch-cream">{project.year}</div>
                    </div>
                    <Link 
                      href={`/projects/${project.id}`}
                      className="group/btn flex items-center gap-4 px-8 py-4 bg-arch-white text-arch-black font-bold text-[0.6rem] uppercase tracking-[0.25em] hover:bg-arch-gold transition-colors duration-400"
                    >
                      View Protocol
                      <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Side numbering */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 font-display text-[12rem] text-white/[0.03] italic leading-none pointer-events-none select-none">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Project Matrix / Grid Section ── */}
      <section className="project-grid-section relative py-32 border-t border-arch-border/10 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        
        <div className="container-wide relative z-10">
          
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-24 pb-12 border-b border-arch-border/30">
            <div>
              <span className="eyebrow text-arch-gold mb-3 block">Filter Protocol</span>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'relative px-6 py-3 text-[0.55rem] font-bold tracking-[0.2em] uppercase transition-all duration-400 border',
                      activeCategory === cat
                        ? 'text-arch-black bg-arch-gold border-arch-gold'
                        : 'text-arch-muted hover:text-arch-cream border-arch-border/40 hover:border-arch-gold/30'
                    )}
                  >
                    {cat === 'all' ? 'Universal Archive' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="hidden lg:flex items-center gap-3">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn('p-2 transition-colors', viewMode === 'grid' ? 'text-arch-gold' : 'text-arch-muted hover:text-arch-cream')}
                >
                  <LayoutGrid size={20} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => setViewMode('editorial')}
                  className={cn('p-2 transition-colors', viewMode === 'editorial' ? 'text-arch-gold' : 'text-arch-muted hover:text-arch-cream')}
                >
                  <List size={20} strokeWidth={1.5} />
                </button>
              </div>
              <div className="mono-tag text-arch-gold/40">
                {filtered.length.toString().padStart(2, '0')} ENTRIES_FOUND
              </div>
            </div>
          </div>

          {/* Result View */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-arch-border/20 border border-arch-border/20"
              >
                {filtered.map((project) => (
                  <Link 
                    key={project.id} 
                    href={`/projects/${project.id}`}
                    className="grid-project-card group relative aspect-[4/5] bg-arch-black overflow-hidden block"
                  >
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-arch-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Hover Technical Frame */}
                    <div className="absolute inset-4 border border-arch-gold/0 group-hover:border-arch-gold/30 transition-all duration-500 pointer-events-none">
                      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-arch-gold/60 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-arch-gold/60 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
                    </div>

                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="mono-tag text-arch-gold/60 mb-2">{project.year} · {project.category}</div>
                      <h4 className="font-display text-2xl text-arch-white group-hover:text-arch-gold transition-colors duration-400">
                        {project.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="editorial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filtered.map((project, i) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group flex flex-col lg:flex-row lg:items-center gap-8 py-10 border-b border-arch-border/20 hover:border-arch-gold/20 transition-colors"
                  >
                    <span className="font-display text-3xl text-arch-gold/20 group-hover:text-arch-gold/60 transition-colors italic">0{i+1}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-3xl lg:text-5xl text-arch-white font-light group-hover:text-arch-gold transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-6 mt-2">
                        <span className="mono-tag text-arch-muted">{project.location}</span>
                        <div className="w-1 h-1 rounded-full bg-arch-border" />
                        <span className="mono-tag text-arch-muted">{project.category}</span>
                      </div>
                    </div>
                    <div className="hidden lg:block w-32 aspect-[4/3] relative overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <Image src={project.thumbnail} alt={project.title} fill className="object-cover" />
                    </div>
                    <div className="mono-tag text-arch-gold/40 text-lg">{project.year}</div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-48 text-center">
              <p className="font-display text-4xl text-arch-white/10 italic">No project matches the current filter protocol.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-40 border-t border-arch-border/20">
        <div className="container-wide text-center">
          <span className="eyebrow text-arch-gold mb-8 block">Project Inquiry</span>
          <h2 className="font-display text-5xl lg:text-8xl text-arch-white font-light leading-none mb-12 hero-shadow">
            Start a <span className="text-arch-gold italic text-glow-gold">New Draft</span>
          </h2>
          <Link href="/contact" className="arch-btn arch-btn-primary arch-btn-xl">
            Initialize Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
