import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaglineRotator({ activeIndex, taglines, isReducedMotion }) {
  const currentTagline = taglines[activeIndex] || taglines[0];

  return (
    <div className="h-8 md:h-10 flex items-center justify-center overflow-hidden my-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTagline}
          initial={
            isReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 12, filter: 'blur(4px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={
            isReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -12, filter: 'blur(4px)' }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-lg font-light tracking-wide text-neutral-mid"
        >
          Clarity in{' '}
          <span className="font-medium text-charcoal border-b border-charcoal/20 pb-0.5">
            {currentTagline}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
