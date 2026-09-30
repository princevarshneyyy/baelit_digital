import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundShapes({ cursorPosition, isReducedMotion }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Base warm background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-warm via-[#F0EFEA] to-neutral-light/60" />

      {/* Floating neutral blurred shapes */}
      <motion.div
        animate={
          isReducedMotion
            ? {}
            : {
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-white/60 rounded-full blur-[100px]"
      />

      <motion.div
        animate={
          isReducedMotion
            ? {}
            : {
                x: [0, -40, 30, 0],
                y: [0, 30, -30, 0],
                scale: [1, 0.9, 1.08, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-[26rem] h-[26rem] bg-neutral-light/70 rounded-full blur-[90px]"
      />

      <motion.div
        animate={
          isReducedMotion
            ? {}
            : {
                x: [0, 25, -25, 0],
                y: [0, 25, -15, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-[#EAE8E3]/50 rounded-full blur-[110px]"
      />

      {/* Interactive Cursor Radial Spotlight Glow */}
      {!isReducedMotion && (
        <div
          className="absolute w-[32rem] h-[32rem] rounded-full pointer-events-none transition-transform duration-75 ease-out blur-[80px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(228, 228, 224, 0.3) 50%, rgba(245, 244, 241, 0) 80%)',
            left: `${cursorPosition.x - 256}px`,
            top: `${cursorPosition.y - 256}px`,
          }}
        />
      )}
    </div>
  );
}
