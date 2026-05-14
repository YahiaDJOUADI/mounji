'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectDetailContent({ project, prevProject, nextProject }: Props) {
  const router = useRouter();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <Image src={project.images[0]} alt={project.title} fill priority className="object-cover" sizes="100vw" />
        {/* Deepened overlay for visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-arch-black/95 via-arch-black/50 to-transparent" />
        <div className="container-custom relative z-10 pb-12">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-arch-muted hover:text-arch-gold transition-colors duration-300 mb-8 text-sm cursor-pointer group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" /> Back to Projects
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="section-label bg-arch-black/40 backdrop-blur-sm px-3 py-1">{project.category}</span>
              <span className="section-label bg-arch-black/40 backdrop-blur-sm px-3 py-1">{project.year}</span>
              <span className="section-label bg-arch-black/40 backdrop-blur-sm px-3 py-1">{project.location}</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-arch-white font-light hero-shadow">{project.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-arch-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <p className="section-label mb-4">Project Overview</p>
              <div className="space-y-4">
                {project.description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-arch-muted leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
            <div className="border-l border-arch-border pl-8">
              <p className="section-label mb-6">Project Details</p>
              <div className="space-y-5">
                {[{ label: 'Category', value: project.category }, { label: 'Year', value: String(project.year) }, { label: 'Location', value: project.location }].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-arch-muted text-xs tracking-widest uppercase mb-1">{label}</p>
                    <p className="text-arch-cream capitalize">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images.length > 1 && (
        <section className="py-20 bg-arch-dark">
          <div className="container-custom">
            <p className="section-label mb-10">Gallery</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <motion.div
                  key={i}
                  className={`relative overflow-hidden cursor-pointer ${i === 0 ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxIdx(i)}
                >
                  <Image src={img} alt={`${project.title} — image ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center" onClick={() => setLightboxIdx(null)}>
          <button className="absolute top-6 right-6 text-arch-muted hover:text-arch-cream text-2xl cursor-pointer">✕</button>
          <button className="absolute left-6 text-arch-muted hover:text-arch-gold cursor-pointer" onClick={e => { e.stopPropagation(); setLightboxIdx(Math.max(0, lightboxIdx - 1)); }}><ChevronLeft size={36} /></button>
          <div className="relative max-w-5xl max-h-[80vh] w-full mx-12" onClick={e => e.stopPropagation()}>
            <Image src={project.images[lightboxIdx]} alt={project.title} width={1200} height={800} className="object-contain max-h-[80vh] w-full" />
          </div>
          <button className="absolute right-6 text-arch-muted hover:text-arch-gold cursor-pointer" onClick={e => { e.stopPropagation(); setLightboxIdx(Math.min(project.images.length - 1, lightboxIdx + 1)); }}><ChevronRight size={36} /></button>
        </div>
      )}

      {/* Prev / Next */}
      <section className="py-16 bg-arch-black border-t border-arch-border">
        <div className="container-custom flex justify-between gap-8">
          {prevProject ? (
            <Link href={`/projects/${prevProject.id}`} className="group flex items-center gap-3 text-arch-muted hover:text-arch-cream transition-colors duration-300">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <div><p className="text-xs text-arch-muted tracking-widest uppercase mb-0.5">Previous</p><p className="font-display text-lg">{prevProject.title}</p></div>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link href={`/projects/${nextProject.id}`} className="group flex items-center gap-3 text-arch-muted hover:text-arch-cream transition-colors duration-300 text-right ml-auto">
              <div><p className="text-xs text-arch-muted tracking-widest uppercase mb-0.5">Next</p><p className="font-display text-lg">{nextProject.title}</p></div>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          ) : <div />}
        </div>
      </section>
    </>
  );
}
