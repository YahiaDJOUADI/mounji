'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Preloader from '@/components/Preloader';
import PageTransition from '@/components/PageTransition';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Hide preloader if it was already shown in this session
    if (sessionStorage.getItem('preloader-shown')) {
      setShowPreloader(false);
    }

    // Initialize Lenis smooth scroll
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });

      // Expose to window for BackToTop
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as unknown as Record<string, unknown>).lenis = lenis;

      // Sync with GSAP ticker
      const { gsap } = await import('gsap');
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader-shown', 'true');
    setShowPreloader(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
        <CustomCursor />
        <ScrollProgress />
        <PageTransition />
        {children}
        <BackToTop />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
