import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Djouadi Mounji | Architecture & Design',
  description: 'Award-winning architectural practice based in Algeria, creating timeless residential and commercial spaces.',
};

export default function HomePage() {
  return <HomeContent />;
}
