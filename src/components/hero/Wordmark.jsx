import React from 'react';
import { motion } from 'framer-motion';

export default function Wordmark({ text = 'BAELIT', isReducedMotion, animationStep }) {
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative inline-block select-none overflow-hidden py-2 px-6">
      {/* Light sweep effect */}
      {!isReducedMotion && (
        <motion.div
          animate={
            animationStep >= 1
              ? {
                  x: ['-100%', '200%'],
                }
              : { x: '-100%' }
          }
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            repeat: Infinity,
            repeatDelay: 8,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 z-20 pointer-events-none w-1/2"
        />
      )}

      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-[clamp(2.5rem,7vw,7.5rem)] font-semibold tracking-[0.15em] text-charcoal uppercase leading-none pl-[0.15em] whitespace-nowrap"
      >
        {letters.map((char, idx) => (
          <motion.span
            key={idx}
            variants={isReducedMotion ? {} : letterVariants}
            className="inline-block transition-colors duration-500 hover:text-black"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
