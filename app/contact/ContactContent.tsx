'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

const contactItems = [
  { Icon: MapPin, label: 'Studio',    value: 'Algeria, North Africa',     sub: 'Primary location' },
  { Icon: Mail,   label: 'Email',     value: 'info@djouadimounji.com',    href: 'mailto:info@djouadimounji.com', sub: 'Primary contact' },
  { Icon: Clock,  label: 'Response',  value: 'Within 24 hours',            sub: 'Business days only' },
];

export default function ContactContent() {
  return (
    <>
      <PageHero
        title="Contact Us"
        label="Get in Touch"
        subtitle="Let's build something eternal. We respond to new architectural inquiries within 24 hours."
        backgroundImage="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=90&w=2000"
      />

      {/* ── Main Contact ── */}
      <section className="bg-arch-black relative overflow-hidden min-h-screen flex flex-col lg:flex-row">

        {/* Left — info + map image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative lg:w-[45%] flex-shrink-0 bg-arch-dark border-r border-arch-border/30 flex flex-col"
        >
          {/* Top image */}
          <div className="relative h-72 lg:h-96 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
              alt="Studio"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-arch-dark" />
            {/* Corner marks */}
            <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-arch-gold/30" />
            <div className="absolute top-5 right-5 w-8 h-8 border-t border-r border-arch-gold/30" />
            {/* Label */}
            <div className="absolute bottom-6 left-8">
              <div className="mono-tag mb-1">ALG STUDIO · 2026</div>
              <div className="font-display text-2xl text-arch-white font-light">Djouadi Mounji</div>
            </div>
          </div>

          {/* Info content */}
          <div className="flex-1 flex flex-col justify-between p-8 lg:p-12">
            <div>
              <span className="eyebrow text-arch-gold mb-8 block">Studio Information</span>
              <h2 className="font-display font-light text-arch-white text-5xl lg:text-6xl leading-tight tracking-tight mb-12 hero-shadow">
                Let's Create<br />Something<br /><span className="text-arch-gold italic text-glow-gold">Extraordinary</span>
              </h2>

              <div className="space-y-8">
                {contactItems.map(({ Icon, label, value, href, sub }) => (
                  <div key={label} className="flex items-start gap-5 group">
                    <div className="w-11 h-11 border border-arch-border/50 group-hover:border-arch-gold/40 flex items-center justify-center shrink-0 transition-colors duration-300">
                      <Icon size={14} className="text-arch-gold" />
                    </div>
                    <div>
                      <div className="eyebrow mb-1">{label}</div>
                      {href ? (
                        <a href={href} className="text-arch-cream text-sm font-light hover:text-arch-gold transition-colors duration-300 block">{value}</a>
                      ) : (
                        <p className="text-arch-cream text-sm font-light">{value}</p>
                      )}
                      {sub && <div className="mono-tag mt-0.5">{sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-arch-border/30 pt-8 mt-8 grid grid-cols-3 gap-4">
              {[
                { n: '8', l: 'Cities' },
                { n: '85+', l: 'Projects' },
                { n: '12+', l: 'Years' },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="font-display text-3xl text-arch-gold italic leading-none mb-1">{s.n}</div>
                  <div className="mono-tag">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 mt-8">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-arch-gold" />
                <div className="absolute inset-0 rounded-full bg-arch-gold animate-ping opacity-35" />
              </div>
              <span className="mono-tag text-arch-cream/60">Currently accepting projects for 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="flex-1 flex flex-col justify-center p-8 lg:p-16 xl:p-24 relative"
        >
          {/* Background accent */}
          <div className="absolute inset-0 blueprint-grid opacity-15" />

          <div className="relative z-10 max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="eyebrow text-arch-gold mb-2 block">New Inquiry</span>
                <h3 className="font-display font-light text-arch-white text-4xl leading-tight">
                  Send a Message
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-arch-gold animate-pulse" />
                <span className="mono-tag">Encrypted</span>
              </div>
            </div>

            {/* Corner accents for form */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-arch-gold/20 z-10 pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-arch-gold/20 z-10 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-arch-gold/20 z-10 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-arch-gold/20 z-10 pointer-events-none" />
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
