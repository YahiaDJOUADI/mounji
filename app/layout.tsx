import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-mono',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://mounjidjouadi.netlify.app'),
  title: {
    default: 'Djouadi Mounji | Architecture & Design',
    template: '%s | Djouadi Mounji',
  },
  description:
    'Djouadi Mounji is an architect based in Algeria, creating timeless residential and commercial spaces with an emphasis on craftsmanship, material honesty, and spatial storytelling.',
  keywords: ['architecture', 'interior design', 'Algeria', 'Djouadi Mounji', 'residential', 'commercial'],
  authors: [{ name: 'Djouadi Mounji' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mounjidjouadi.netlify.app',
    siteName: 'Djouadi Mounji Architecture',
    title: 'Djouadi Mounji | Architecture & Design',
    description: 'Timeless architectural spaces crafted with vision and precision.',
    images: [{ url: '/images/architect-portrait.jpg', width: 800, height: 800, alt: 'Djouadi Mounji' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Djouadi Mounji | Architecture & Design',
    description: 'Timeless architectural spaces crafted with vision and precision.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="grain-overlay" />
        <Providers>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden w-full">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
