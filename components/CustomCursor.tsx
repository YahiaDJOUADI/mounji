'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project'>('default');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring || !text) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;

    gsap.set(dot, { x: mx, y: my });
    gsap.set(ring, { x: rx, y: ry });
    gsap.set(text, { x: mx, y: my, opacity: 0 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    
    const rxTo = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3" });
    const ryTo = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3" });
    
    const txTo = gsap.quickTo(text, "x", { duration: 0.15, ease: "power3" });
    const tyTo = gsap.quickTo(text, "y", { duration: 0.15, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isProject = target.closest('[data-cursor="project"]');
      const isHover = target.closest('a, button, [role="button"]');
      
      if (isProject) setCursorType('project');
      else if (isHover) setCursorType('hover');
      else setCursorType('default');

      xTo(mx);
      yTo(my);
      rxTo(mx);
      ryTo(my);
      txTo(mx);
      tyTo(my);
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: isVisible ? 1 : 0 }} 
      className="fixed inset-0 pointer-events-none z-[9999]"
    >
      {/* Dot */}
      <div ref={dotRef} className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-1.5 h-1.5 bg-arch-gold"
          animate={{ scale: cursorType !== 'default' ? 0 : 1, rotate: 45 }}
        />
      </div>
      
      {/* Ring / Box */}
      <div ref={ringRef} className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="border border-arch-gold/50 flex items-center justify-center relative"
          initial={{ backgroundColor: 'rgba(201,168,76,0)' }}
          animate={{ 
            width: cursorType === 'project' ? 80 : cursorType === 'hover' ? 56 : 36, 
            height: cursorType === 'project' ? 80 : cursorType === 'hover' ? 56 : 36,
            borderRadius: cursorType === 'default' ? '0%' : '50%',
            backgroundColor: cursorType === 'project' ? 'rgba(201,168,76,0.1)' : cursorType === 'hover' ? 'rgba(201,168,76,0.05)' : 'rgba(201,168,76,0)',
            borderColor: cursorType === 'project' ? 'rgba(201,168,76,1)' : cursorType === 'hover' ? 'rgba(201,168,76,0.8)' : 'rgba(201,168,76,0.4)',
            rotate: cursorType === 'default' ? 45 : 0
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
        >
          {/* Architectural tick marks on default state */}
          <motion.div 
            className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-arch-gold/80" 
            animate={{ opacity: cursorType === 'default' ? 1 : 0 }} 
          />
          <motion.div 
            className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-arch-gold/80" 
            animate={{ opacity: cursorType === 'default' ? 1 : 0 }} 
          />
        </motion.div>
      </div>

      {/* View Text */}
      <div ref={textRef} className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <motion.span
          className="text-[10px] font-medium tracking-widest text-arch-gold uppercase"
          animate={{ opacity: cursorType === 'project' ? 1 : 0, scale: cursorType === 'project' ? 1 : 0.5 }}
        >
          View
        </motion.span>
      </div>
    </motion.div>
  );
};

export default CustomCursor;
