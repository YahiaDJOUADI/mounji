'use client';

import Link from 'next/link';
import { Mail, MapPin, ArrowUpRight, ExternalLink, AtSign } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact',  href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com',  icon: ExternalLink },
  { label: 'LinkedIn',  href: 'https://linkedin.com',   icon: ExternalLink },
  { label: 'Email',     href: 'mailto:info@djouadimounji.com', icon: AtSign },
];

const MARQUEE_TEXT = ['Architecture', 'Interior Design', 'Urban Planning', 'Algerian Heritage', 'Spatial Precision', 'Timeless Vision'];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer ref={ref} className="bg-arch-black relative overflow-hidden">

      {/* Marquee band */}
      <div className="border-y border-arch-border/40 py-5 overflow-hidden bg-arch-dark">
        <div className="marquee-track">
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT].map((text, i) => (
            <span key={i} className="flex items-center gap-8 mx-8 shrink-0">
              <span className="font-display text-arch-cream/10 text-2xl font-light tracking-widest uppercase whitespace-nowrap">
                {text}
              </span>
              <span className="w-2 h-2 rounded-full bg-arch-gold/20 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* Top gold line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-arch-gold/40 to-transparent" />

      {/* Background decorative number */}
      <div className="absolute bottom-0 right-0 text-[20rem] font-display text-arch-gold/[0.015] leading-none select-none pointer-events-none overflow-hidden">
        D
      </div>

      <div className="container-custom pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          {/* Brand */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 border border-arch-gold flex items-center justify-center">
                <span className="font-display text-arch-gold text-xl font-medium">D</span>
              </div>
              <div>
                <h3 className="font-display text-arch-cream text-2xl font-light">Djouadi Mounji</h3>
                <p className="text-arch-muted text-[9px] tracking-[0.3em] uppercase font-semibold">Architecture & Design</p>
              </div>
            </div>
            <p className="text-arch-muted text-sm leading-relaxed max-w-xs mb-10 font-light">
              Creating timeless architectural environments that bridge Algerian cultural depth with contemporary spatial precision.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-arch-border/60 flex items-center justify-center text-arch-muted hover:text-arch-gold hover:border-arch-gold/60 transition-all duration-300 group"
                >
                  <Icon size={13} className="group-hover:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="eyebrow mb-8">Navigation</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 text-arch-muted text-sm hover:text-arch-cream transition-colors duration-300 font-light"
                  >
                    <span className="w-0 h-px bg-arch-gold group-hover:w-5 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="eyebrow mb-8">Contact</h4>
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 border border-arch-border/40 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={12} className="text-arch-gold" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-arch-gold/60 font-semibold mb-1">Studio</p>
                  <p className="text-arch-muted text-sm font-light">Algeria</p>
                </div>
              </div>
              <a href="mailto:info@djouadimounji.com" className="flex items-start gap-4 group">
                <div className="w-8 h-8 border border-arch-border/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-arch-gold/40 transition-colors duration-300">
                  <Mail size={12} className="text-arch-gold" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-arch-gold/60 font-semibold mb-1">Email</p>
                  <p className="text-arch-muted text-sm font-light group-hover:text-arch-cream transition-colors duration-300">
                    info@djouadimounji.com
                  </p>
                </div>
              </a>
            </div>
            <a href="mailto:info@djouadimounji.com" className="arch-btn arch-btn-outline arch-btn-sm group inline-flex">
              Start a Project <ArrowUpRight size={11} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-arch-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-arch-muted text-[10px] tracking-widest uppercase">
            © {currentYear} Djouadi Mounji Architecture. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-arch-gold animate-pulse" />
            <p className="text-arch-muted text-[10px] tracking-widest uppercase">Crafted with precision & vision</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
