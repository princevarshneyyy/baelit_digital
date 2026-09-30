import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Logo({ size = 'medium', className = '' }) {
  // Sizing variants
  const containerSizes = {
    small: 'gap-2',
    medium: 'gap-2.5',
    large: 'gap-3',
  };

  const markSizes = {
    small: 'w-7 h-7 text-xs',
    medium: 'w-8 h-8 text-sm',
    large: 'w-11 h-11 text-lg',
  };

  const titleSizes = {
    small: 'text-base',
    medium: 'text-xl',
    large: 'text-3xl',
  };

  const subtextSizes = {
    small: 'text-[8px] tracking-[0.25em]',
    medium: 'text-[9px] tracking-[0.3em]',
    large: 'text-[11px] tracking-[0.35em]',
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${containerSizes[size]} group focus:outline-none ${className}`}
    >
      {/* Stylish Geometry Logo Icon (Interlocking Glass Diamond Motif) */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-charcoal to-stone-accent text-white font-serif font-bold shadow-md group-hover:scale-105 transition-transform duration-300 ${markSizes[size]}`}
      >
        <span className="relative z-10 tracking-tighter">B</span>
        <div className="absolute inset-0 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xs" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neutral-light rounded-full border border-white opacity-80" />
      </div>

      {/* Brand Text Stack */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-semibold tracking-[0.18em] text-charcoal uppercase group-hover:opacity-90 transition-opacity font-jakarta ${titleSizes[size]}`}
        >
          BAELIT
        </span>
        <span
          className={`font-medium text-neutral-mid uppercase mt-0.5 opacity-80 ${subtextSizes[size]}`}
        >
          DIGITAL
        </span>
      </div>
    </Link>
  );
}
