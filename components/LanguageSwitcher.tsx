'use client';

import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
];

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-arch-muted hover:text-arch-cream transition-colors duration-300 text-xs tracking-widest"
        aria-label="Change language"
      >
        <Globe size={14} className="text-arch-gold" />
        <span className="font-medium">{language.toUpperCase()}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-8 right-0 bg-arch-surface border border-arch-border z-50 min-w-[80px] shadow-xl"
          >
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => { setLanguage(code); setOpen(false); }}
                className={cn(
                  'w-full px-4 py-2.5 text-xs tracking-widest text-left transition-colors duration-200',
                  language === code ? 'text-arch-gold bg-arch-gold/5' : 'text-arch-muted hover:text-arch-cream hover:bg-white/5'
                )}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
