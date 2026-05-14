import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Djouadi Mounji — architect, designer, and creative visionary based in Algeria with over a decade of professional practice.',
};

export default function AboutPage() {
  return <AboutContent />;
}
