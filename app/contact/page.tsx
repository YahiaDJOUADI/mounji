import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation about your next architectural project with Djouadi Mounji.',
};

export default function ContactPage() {
  return <ContactContent />;
}
