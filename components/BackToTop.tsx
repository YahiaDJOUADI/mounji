'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-6 z-40 group w-11 h-11 overflow-hidden border border-arch-gold bg-arch-black text-arch-gold flex items-center justify-center shadow-[0_0_24px_rgba(201,168,76,0.12)] cursor-pointer isolate"
        >
          <span
            className="absolute inset-0 bg-arch-gold -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-[480ms]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
          />
          <ArrowUp size={16} className="relative z-10 transition-colors duration-300 group-hover:text-arch-black" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
