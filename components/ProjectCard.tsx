'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      className="group"
      ref={cardRef}
    >
      <Link href={`/projects/${project.id}`} className="block" data-cursor="project">

        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] mb-0">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Base overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-arch-black/60 via-transparent to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-arch-black/0 group-hover:bg-arch-black/40 transition-all duration-700" />

          {/* Top metadata */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="eyebrow bg-arch-black/70 backdrop-blur-md px-3 py-1.5 border border-arch-gold/20 text-arch-gold/80">
              {project.category}
            </span>
            <span className="text-[9px] tracking-widest text-arch-cream/50 font-mono bg-arch-black/60 backdrop-blur-sm px-2 py-1">
              {project.year}
            </span>
          </div>

          {/* Hover CTA */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
          >
            <span className="text-arch-cream text-[10px] tracking-[0.25em] uppercase font-semibold">View Project</span>
            <div className="w-8 h-8 border border-arch-gold/60 flex items-center justify-center text-arch-gold">
              <ArrowUpRight size={13} />
            </div>
          </motion.div>
        </div>

        {/* Meta strip */}
        <div className="bg-arch-surface border-l-2 border-transparent group-hover:border-arch-gold transition-colors duration-500 px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg text-arch-cream font-medium group-hover:text-arch-gold transition-colors duration-400 mb-0.5 leading-tight">
              {project.title}
            </h3>
            <p className="text-arch-muted text-[10px] tracking-widest uppercase font-semibold">{project.location}</p>
          </div>
          <div className="w-7 h-7 border border-arch-border/40 flex items-center justify-center text-arch-muted group-hover:text-arch-gold group-hover:border-arch-gold/40 transition-all duration-300 shrink-0">
            <ArrowUpRight size={12} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProjectCard;
