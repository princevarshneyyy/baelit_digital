import React from 'react';
import { motion } from 'framer-motion';

export default function GlassButton({
  children,
  onClick,
  variant = 'glass', // 'glass' | 'solid'
  className = '',
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantStyles =
    variant === 'solid'
      ? 'bg-charcoal text-white hover:bg-stone-accent shadow-md hover:shadow-lg hover:-translate-y-0.5'
      : 'glass-panel text-charcoal hover:bg-white/80 border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5';

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
