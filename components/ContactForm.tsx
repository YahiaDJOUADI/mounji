'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { submitContactForm } from '@/app/actions/contact';

const inputBase =
  'w-full bg-transparent border-b border-arch-border/60 text-arch-cream placeholder-arch-muted/35 px-0 py-3.5 text-sm focus:outline-none focus:border-arch-gold transition-colors duration-400 font-light';

const labelClass = 'block text-[9px] uppercase tracking-[0.25em] font-bold text-arch-gold/60 mb-3';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const actionHandler = async (formDataEvent: FormData) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    const response = await submitContactForm(formDataEvent);
    setIsSubmitting(false);
    if (response?.error) {
      setErrorMsg(response.error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 border border-arch-gold/30 flex items-center justify-center mx-auto mb-8 relative">
          <CheckCircle2 size={32} className="text-arch-gold" />
          <div className="absolute inset-0 bg-arch-gold/5 animate-pulse" />
        </div>
        <h3 className="font-display text-3xl text-arch-cream font-light mb-4">Message Received</h3>
        <p className="text-arch-muted text-sm font-light">Thank you. We'll be in touch within 24 hours.</p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
          className="mt-8 text-[9px] uppercase tracking-widest text-arch-gold/60 hover:text-arch-gold transition-colors duration-300 font-semibold"
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <form action={actionHandler} className="space-y-10">
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-950/30 border border-red-500/30 p-5 flex items-start gap-4 text-red-300"
          >
            <AlertCircle size={15} className="shrink-0 text-red-400 mt-0.5" />
            <p className="text-sm font-light">{errorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className={inputBase}
          />
        </div>
        <div>
          <label className={labelClass}>Email Address *</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Project Type</label>
        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Residential / Commercial / Interior..."
          className={inputBase}
        />
      </div>

      <div>
        <label className={labelClass}>Project Vision *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project, site, timeline, and aspirations..."
          rows={5}
          required
          className={cn(inputBase, 'resize-none')}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileTap={{ scale: 0.97 }}
        className="arch-btn arch-btn-primary arch-btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isSubmitting ? (
          <><Loader2 size={14} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={13} className="btn-icon" /> Send Message</>
        )}
      </motion.button>

      <p className="text-arch-muted/40 text-[9px] tracking-widest uppercase font-semibold text-center">
        Encrypted · Secure · Confidential
      </p>
    </form>
  );
};

export default ContactForm;
