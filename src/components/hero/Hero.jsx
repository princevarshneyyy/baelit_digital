import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Scale,
  Wallet,
  Compass,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Pause,
  Play,
  ChevronDown,
} from 'lucide-react';

import BackgroundShapes from './BackgroundShapes';
import GlassButton from './GlassButton';
import BookingModal from '../BookingModal';
import KundaliPricingModal from '../KundaliPricingModal';
import { BRAND_NAME } from '../../data/mockData';

// Config for the 4 Feature Practices
export const HERO_FEATURES_CONFIG = {
  brandName: BRAND_NAME || 'BAELIT',
  cycleIntervalMs: 3500, // 3.5 seconds per feature highlight
  features: [
    {
      id: 'kundali',
      title: 'Kundali Advisory',
      badge: 'Vedic Foresight',
      tagline: 'Cosmic alignment & natal chart timing for pivotal decisions.',
      icon: Sparkles,
      description:
        'Empirical Jyotish analysis mapping planetary transits, dasha cycles, and personal chart remedies to optimize long-term timing.',
      highlights: [
        'In-depth Natal & Dasha Analysis',
        'Strategic Matchmaking & Synergy',
        'Favorable Timing for Expansion',
      ],
    },
    {
      id: 'legal',
      title: 'Legal Advisory',
      badge: 'Risk Mitigation',
      tagline: 'Precision contracts & governance for high-stakes ventures.',
      icon: Scale,
      description:
        'Comprehensive legal structuring, contract negotiation, regulatory compliance, and dispute resolution for individuals and firms.',
      highlights: [
        'Enterprise & Startup Contracts',
        'Property & Asset Protection',
        'Compliance & Governance Audits',
      ],
    },
    {
      id: 'finance',
      title: 'Strategic Finance',
      badge: 'Capital Optimization',
      tagline: 'Sophisticated wealth preservation & capital growth planning.',
      icon: Wallet,
      description:
        'Customized portfolio analysis, tax efficiency structuring, cashflow optimization, and estate protection tailored for HNW clients.',
      highlights: [
        'Portfolio Allocation Strategy',
        'Tax Efficiency & Estate Plans',
        'Business Cashflow Engineering',
      ],
    },
    {
      id: 'career',
      title: 'Executive Career Counsel',
      badge: 'Leadership Roadmap',
      tagline: 'Strategic positioning & board-level career counseling.',
      icon: Compass,
      description:
        'Personal executive branding, C-suite interview coaching, compensation negotiations, and long-term career trajectory mapping.',
      highlights: [
        'Executive Personal Branding',
        'C-Suite & Board Coaching',
        'Strategic Career Pathing',
      ],
    },
  ],
};

export default function Hero() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isKundaliModalOpen, setIsKundaliModalOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: -500, y: -500 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Motion preference check
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setIsPlaying(false);
    }
  }, []);

  // Tab visibility check
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) setIsPlaying(false);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Auto-cycling timer between the 4 features
  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_FEATURES_CONFIG.features.length);
    }, HERO_FEATURES_CONFIG.cycleIntervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, isReducedMotion]);

  const handleMouseMove = (e) => {
    if (isReducedMotion) return;
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  const activeFeature = HERO_FEATURES_CONFIG.features[activeIdx];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden py-10 px-6 md:px-12 select-none"
    >
      {/* Background Shapes & Cursor Spotlight */}
      <BackgroundShapes
        cursorPosition={cursorPosition}
        isReducedMotion={isReducedMotion}
      />

      <div className="max-w-7xl mx-auto w-full z-20">
        {/* Top Header Tag */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-4 py-1.5 rounded-full border border-white/80 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-charcoal" />
            <span>Integrated Strategic Advisory</span>
          </motion.span>
        </div>

        {/* 4 Feature Interactive Tabs Bar (Horizontally scrollable on mobile) */}
        <div className="flex lg:grid lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-2 px-2">
          {HERO_FEATURES_CONFIG.features.map((feature, idx) => {
            const Icon = feature.icon;
            const isActive = idx === activeIdx;

            return (
              <button
                key={feature.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsPlaying(false); // Pause auto-rotation on manual interaction
                }}
                className={`relative p-3.5 sm:p-4 md:p-5 rounded-2xl text-left transition-all duration-300 flex items-center lg:items-start gap-3 cursor-pointer shrink-0 w-[72vw] sm:w-[45vw] lg:w-auto snap-center focus:outline-none focus:ring-2 focus:ring-charcoal ${
                  isActive
                    ? 'glass-panel bg-white/85 border-white/90 shadow-glass-md scale-[1.01]'
                    : 'glass-panel bg-white/40 border-white/50 opacity-75 hover:opacity-100 hover:bg-white/60'
                }`}
                aria-label={`Select ${feature.title}`}
              >
                {/* Active progress border bar */}
                {isActive && isPlaying && !isReducedMotion && (
                  <motion.div
                    key={idx}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: HERO_FEATURES_CONFIG.cycleIntervalMs / 1000,
                      ease: 'linear',
                    }}
                    className="absolute top-0 left-0 h-1 bg-charcoal rounded-t-2xl"
                  />
                )}

                <div
                  className={`p-2 sm:p-2.5 rounded-xl border shrink-0 transition-colors ${
                    isActive
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-white/70 text-charcoal border-white/80'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                <div className="overflow-hidden">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-mid block font-semibold">
                    {feature.badge}
                  </span>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-charcoal truncate">
                    {feature.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Centerpiece Showcase Panel for the Selected Feature */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={
              isReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 15, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              isReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -15, scale: 0.98 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-3xl p-6 md:p-10 border border-white/80 shadow-glass-lg backdrop-blur-xl bg-white/55"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Feature Title & Story */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-mid bg-white/80 px-3 py-1 rounded-full border border-white/90">
                    {activeFeature.badge}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-light text-charcoal tracking-tight leading-tight">
                  {activeFeature.title}
                </h2>

                <p className="text-base md:text-lg text-charcoal/80 font-medium">
                  "{activeFeature.tagline}"
                </p>

                <p className="text-xs md:text-sm text-neutral-mid leading-relaxed max-w-xl">
                  {activeFeature.description}
                </p>

                {/* CTA Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <GlassButton
                    variant="solid"
                    onClick={() => {
                      if (activeFeature.id === 'kundali') {
                        setIsKundaliModalOpen(true);
                      } else {
                        setIsBookingOpen(true);
                      }
                    }}
                  >
                    <span>Book {activeFeature.title}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </GlassButton>

                  <GlassButton
                    variant="glass"
                    onClick={() => navigate('/services')}
                  >
                    <span>Explore All Practices</span>
                  </GlassButton>
                </div>
              </div>

              {/* Right Column: Key Focus Highlights */}
              <div className="lg:col-span-5 bg-white/40 p-6 rounded-2xl border border-white/60 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal border-b border-charcoal/10 pb-2">
                  Key Focus Areas
                </h4>
                {activeFeature.highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 text-xs md:text-sm text-neutral-mid py-1.5 border-b border-neutral-light/40 last:border-none"
                  >
                    <CheckCircle2 className="w-4 h-4 text-charcoal shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Play / Pause Toggle Button */}
      {!isReducedMotion && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-6 right-6 z-30 p-3 rounded-full glass-panel text-charcoal hover:bg-white/80 transition-all border border-white/80 focus:outline-none focus:ring-2 focus:ring-charcoal"
          aria-label={isPlaying ? 'Pause auto showcase' : 'Play auto showcase'}
          title={isPlaying ? 'Pause auto feature rotation' : 'Play auto feature rotation'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-charcoal" />
          ) : (
            <Play className="w-4 h-4 text-charcoal" />
          )}
        </button>
      )}

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={handleScrollDown}
        animate={isReducedMotion ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 p-2 rounded-full text-neutral-mid hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal transition-colors cursor-pointer"
        aria-label="Scroll to details"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedServiceId={activeFeature.id}
      />

      {/* Kundali Pricing & Consultation Modal */}
      <KundaliPricingModal
        isOpen={isKundaliModalOpen}
        onClose={() => setIsKundaliModalOpen(false)}
      />
    </section>
  );
}
