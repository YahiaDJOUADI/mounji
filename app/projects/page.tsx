import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore the portfolio of Djouadi Mounji — residential villas, commercial centers, and bespoke interior designs across Algeria.',
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
