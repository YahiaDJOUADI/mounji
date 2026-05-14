'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const NAV_ITEMS = [
  { key: 'nav.home',     href: '/' },
  { key: 'nav.about',    href: '/about' },
  { key: 'nav.projects', href: '/projects' },
  { key: 'nav.services', href: '/services' },
  { key: 'nav.contact',  href: '/contact' },
];

const NavLink = ({ item, index, isActive }: { item: { name: string; href: string }; index: number; isActive: boolean }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index + 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={item.href} className="group relative flex flex-col items-center gap-0.5 pb-1.5" aria-current={isActive ? 'page' : undefined}>
        <motion.span
          className="text-[8px] tracking-[0.25em] font-bold select-none font-mono"
          animate={{ color: isActive || hovered ? '#C9A84C' : 'rgba(138,133,128,0.5)' }}
          transition={{ duration: 0.2 }}
        >
          {'0' + (index + 1)}
        </motion.span>
        <motion.span
          className="text-[10px] tracking-[0.18em] uppercase font-semibold"
          animate={{ color: isActive || hovered ? '#F2EDE6' : 'rgba(242,237,230,0.45)' }}
          transition={{ duration: 0.2 }}
        >
          {item.name}
        </motion.span>
        <motion.span
          className="absolute -bottom-0 left-0 h-px bg-arch-gold origin-left"
          animate={{ scaleX: isActive || hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: '100%' }}
        />
        {isActive && (
          <motion.span
            layoutId="nav-dot"
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-arch-gold"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navigation = NAV_ITEMS.map((item) => ({ name: t(item.key as Parameters<typeof t>[0]), href: item.href }));

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? sy / docH : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          scrolled
            ? 'bg-arch-black/95 backdrop-blur-2xl border-b border-arch-border/60'
            : 'bg-transparent'
        )}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-arch-gold via-arch-gold-light to-arch-gold origin-left"
          style={{ scaleX: scrollProgress, transformOrigin: '0% 50%' }}
        />

        <AnimatePresence>
          {scrolled && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-arch-gold/50 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        <div className="container-custom mx-auto flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <motion.div
              className="relative w-9 h-9 border border-arch-gold flex items-center justify-center overflow-hidden"
              whileHover={{ borderColor: '#DEC06A' }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-arch-gold origin-bottom"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              />
              <span className="font-display text-arch-gold text-base font-medium relative z-10 group-hover:text-arch-black transition-colors duration-300">D</span>
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-arch-cream text-lg font-medium tracking-tight group-hover:text-arch-gold transition-colors duration-400">
                Djouadi Mounji
              </span>
              <span className="text-arch-muted text-[8px] tracking-[0.28em] uppercase font-semibold">
                Architecture & Design
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" role="navigation" aria-label="Main navigation">
            {navigation.map((item, i) => (
              <NavLink key={item.href} item={item} index={i} isActive={pathname === item.href} />
            ))}
            <div className="w-px h-5 bg-arch-border/60 mx-1" />
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link href="/contact" className="arch-btn arch-btn-outline arch-btn-sm group">
                Get in Touch <ArrowUpRight size={11} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center border border-arch-border hover:border-arch-gold/60 transition-colors duration-300 text-arch-cream"
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={16} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-arch-black flex flex-col blueprint-grid"
          >
            {/* Top accent */}
            <div className="w-full h-px bg-gradient-to-r from-arch-gold via-arch-gold/60 to-transparent shrink-0" />

            <div className="container-custom flex items-center justify-between h-[72px] shrink-0">
              <Link href="/" className="font-display text-arch-cream text-xl font-light" onClick={() => setIsOpen(false)}>
                Djouadi Mounji
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-arch-border text-arch-muted hover:text-arch-gold hover:border-arch-gold transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex-1 container-custom flex flex-col justify-center gap-1">
              {navigation.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.12, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-baseline gap-5 py-4 border-b border-arch-border/20 group-hover:border-arch-gold/20 transition-colors duration-300"
                    >
                      <span className={cn('font-display text-sm font-light transition-colors duration-300', isActive ? 'text-arch-gold' : 'text-arch-muted/40 group-hover:text-arch-gold/60')}>
                        {'0' + (i + 1)}
                      </span>
                      <span className={cn('font-display text-5xl sm:text-6xl font-light tracking-tight transition-colors duration-300', isActive ? 'text-arch-gold' : 'text-arch-cream/60 group-hover:text-arch-cream')}>
                        {item.name}
                      </span>
                      <motion.span
                        className="ml-auto text-arch-gold"
                        animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
                      >
                        <ArrowUpRight size={20} />
                      </motion.span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              className="container-custom pb-10 flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div>
                <p className="eyebrow mb-1">Studio Location</p>
                <p className="text-arch-muted text-sm font-light">Algeria</p>
              </div>
              <div className="text-right">
                <p className="eyebrow mb-1">Status</p>
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-arch-gold animate-pulse" />
                  <p className="text-arch-muted text-sm font-light">Available 2026</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
