import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive architectural and design services — from conceptual design and interior spaces to full project management.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
