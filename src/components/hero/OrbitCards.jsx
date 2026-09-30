import React from 'react';
import { motion } from 'framer-motion';

export default function OrbitCards({
  cards,
  activeIndex,
  isReducedMotion,
  onCardClick,
}) {
  // Positional coordinates for orbit on desktop screens
  const orbitPositions = [
    { top: '12%', left: '14%', scale: 0.95 },   // Top-Left (Kundali)
    { top: '15%', right: '14%', scale: 0.95 },  // Top-Right (Legal)
    { bottom: '18%', left: '16%', scale: 0.95 }, // Bottom-Left (Finance)
    { bottom: '20%', right: '16%', scale: 0.95 },// Bottom-Right (Career)
  ];

  return (
    <>
      {/* Desktop Orbit View (hidden on small mobile screens) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isActive = idx === activeIndex;
          const pos = orbitPositions[idx] || orbitPositions[0];

          return (
            <motion.div
              key={card.id}
              onClick={() => onCardClick(idx)}
              style={{
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
              }}
              initial={
                isReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8, y: 20 }
              }
              animate={
                isReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: isActive ? 1 : 0.65,
                      scale: isActive ? 1.08 : 0.92,
                      y: isActive ? [0, -6, 0] : [0, 6, 0],
                      zIndex: isActive ? 30 : 10,
                    }
              }
              transition={{
                opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                y: {
                  duration: 4 + idx * 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className={`absolute pointer-events-auto cursor-pointer p-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'glass-panel border-white/90 shadow-glass-lg bg-white/70 backdrop-blur-xl'
                  : 'glass-panel border-white/50 shadow-glass-sm bg-white/40 backdrop-blur-md hover:bg-white/60 hover:opacity-90'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Select ${card.title} practice`}
            >
              <div className="flex items-center gap-3 w-48">
                <div
                  className={`p-2.5 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-white/70 text-charcoal border-white/80'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isActive ? 'text-charcoal' : 'text-neutral-mid'
                    }`}
                  >
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-neutral-mid line-clamp-1">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Stacked Vertical Floating View (visible only on mobile) */}
      <div className="lg:hidden w-full max-w-sm mx-auto mt-6 grid grid-cols-2 gap-3 px-4 z-20 pointer-events-auto">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isActive = idx === activeIndex;

          return (
            <div
              key={card.id}
              onClick={() => onCardClick(idx)}
              className={`p-3 rounded-xl transition-all ${
                isActive
                  ? 'glass-panel border-white/90 bg-white/80 shadow-md'
                  : 'glass-panel border-white/50 bg-white/40 opacity-70'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/80 rounded-lg text-charcoal shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-[11px] font-semibold text-charcoal uppercase tracking-wider truncate">
                    {card.title}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
