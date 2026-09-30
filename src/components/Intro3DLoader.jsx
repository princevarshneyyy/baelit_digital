import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Intro3DLoader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: initial light line, 1: 3D flip & shine, 2: fade out
  const brandName = "BAELIT";
  const letters = brandName.split('');

  useEffect(() => {
    // Phase 1: 3D Flip & Light Sweep (at 0.8s)
    const timer1 = setTimeout(() => {
      setPhase(1);
    }, 800);

    // Phase 2: Fade Out Intro Screen (at 3.5s)
    const timer2 = setTimeout(() => {
      setPhase(2);
    }, 3500);

    // Complete Intro & unmount (at 4.0s)
    const timer3 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F4F1] overflow-hidden select-none"
        >
          {/* Subtle background glow */}
          <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl opacity-80" />

          {/* Perspective Container for 3D Text Animation */}
          <div
            className="relative z-10 flex flex-col items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            {/* Top expanding line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '120px', opacity: 0.6 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-[1px] bg-charcoal/40 mb-6"
            />

            {/* 3D Rotating & Extruding BAELIT Wordmark */}
            <motion.div
              initial={{
                rotateX: 85,
                rotateY: -20,
                scale: 0.7,
                opacity: 0,
                z: -200,
              }}
              animate={{
                rotateX: phase >= 1 ? 0 : 45,
                rotateY: phase >= 1 ? 0 : -10,
                scale: phase >= 1 ? 1 : 0.85,
                opacity: 1,
                z: 0,
              }}
              transition={{
                duration: 2.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex items-center gap-2 md:gap-4 px-6 py-4 rounded-2xl glass-panel border border-white/80 shadow-2xl backdrop-blur-2xl bg-white/50"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 25px 50px -12px rgba(28, 28, 28, 0.15)',
              }}
            >
              {/* Light Sweep Beam */}
              <motion.div
                initial={{ x: '-150%' }}
                animate={{ x: phase >= 1 ? '200%' : '-150%' }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/90 to-transparent skew-x-12 pointer-events-none z-20"
              />

              {letters.map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{
                    opacity: 0,
                    y: 30,
                    rotateY: -60,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-4xl md:text-7xl font-semibold tracking-widest text-charcoal uppercase inline-block drop-shadow-sm font-jakarta"
                  style={{
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Subtitle DIGITAL in slightly smaller text */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 15, filter: phase >= 1 ? 'blur(0px)' : 'blur(6px)' }}
              transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
              className="flex items-center gap-3 mt-4"
            >
              <div className="h-[1px] w-6 bg-charcoal/30" />
              <span className="text-sm md:text-lg font-medium tracking-[0.45em] text-neutral-mid uppercase font-jakarta">
                DIGITAL
              </span>
              <div className="h-[1px] w-6 bg-charcoal/30" />
            </motion.div>

            {/* Subtitle tag */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase >= 1 ? 0.8 : 0, y: phase >= 1 ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-[10px] uppercase tracking-[0.35em] text-neutral-mid mt-2 font-medium"
            >
              Strategic Advisory Practice
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
