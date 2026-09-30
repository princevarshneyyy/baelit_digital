import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverEffect = true, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel rounded-2xl p-6 md:p-8 ${
        hoverEffect ? 'glass-panel-hover' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
