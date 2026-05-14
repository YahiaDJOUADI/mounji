import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import ProjectDetailContent from './ProjectDetailContent';

// Pre-render all project pages at build time (SSG)
export function generateStaticParams() {
  return projects.map(p => ({ id: p.id }));
}

// Per-project SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find(p => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description.slice(0, 155),
    openGraph: {
      title: `${project.title} | Djouadi Mounji`,
      images: [{ url: project.thumbnail, width: 1200, height: 800 }],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find(p => p.id === id);
  if (!project) notFound();
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;
  return <ProjectDetailContent project={project} prevProject={prevProject} nextProject={nextProject} />;
}
