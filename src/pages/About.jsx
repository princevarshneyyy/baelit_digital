import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { TEAM_MEMBERS, STATS, BRAND_NAME } from '../data/mockData';
import { UserCheck, Compass, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      {/* Background soft glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-neutral-light/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-4 py-1.5 rounded-full border border-white/80">
            About {BRAND_NAME}
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-charcoal tracking-tight mt-4 mb-6">
            Architects of Clarity & Counsel
          </h1>
          <p className="text-sm md:text-base text-neutral-mid leading-relaxed">
            Founded on the principle that high-stakes choices require both quantitative foresight and qualitative wisdom, {BRAND_NAME} brings specialized, discreet advisory to leaders, executives, and global families.
          </p>
        </div>

        {/* Mission & Story Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <GlassCard hoverEffect={false}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/70 rounded-xl border border-white/80">
                <Compass className="w-5 h-5 text-charcoal" />
              </div>
              <h2 className="text-xl font-light text-charcoal">Our Mission</h2>
            </div>
            <p className="text-sm text-neutral-mid leading-relaxed">
              To eliminate ambiguity from critical life and business inflection points. We merge timeless Vedic wisdom, corporate legal mastery, wealth preservation strategies, and career counseling into an integrated advisory framework.
            </p>
          </GlassCard>

          <GlassCard hoverEffect={false}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/70 rounded-xl border border-white/80">
                <Shield className="w-5 h-5 text-charcoal" />
              </div>
              <h2 className="text-xl font-light text-charcoal">Our Commitment</h2>
            </div>
            <p className="text-sm text-neutral-mid leading-relaxed">
              Every client engagement is built upon total confidentiality, objective analytical rigor, and bespoke strategy. We operate without conflict of interest, prioritizing client longevity above all else.
            </p>
          </GlassCard>
        </div>

        {/* Small Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, idx) => (
            <GlassCard key={idx} className="text-center py-8" hoverEffect={true}>
              <p className="text-3xl md:text-4xl font-light text-charcoal mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-neutral-mid font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Minimal Team Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-xs font-semibold tracking-widest text-neutral-mid uppercase">
              Leadership
            </h2>
            <p className="text-2xl md:text-3xl font-light text-charcoal mt-2">
              Principal Advisory Partners
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <GlassCard key={idx} className="flex flex-col items-center text-center">
                {/* Greyscale Avatar Placeholder */}
                <div className="w-20 h-20 rounded-full bg-neutral-light/80 border border-white flex items-center justify-center mb-4 shadow-sm grayscale hover:grayscale-0 transition-all duration-300">
                  <UserCheck className="w-8 h-8 text-neutral-mid" />
                </div>
                <h3 className="text-base font-medium text-charcoal">{member.name}</h3>
                <p className="text-xs text-neutral-mid font-medium mt-0.5">{member.role}</p>
                <span className="text-[10px] text-neutral-mid uppercase tracking-widest bg-white/60 px-2.5 py-0.5 rounded-full my-3 border border-white/70">
                  {member.experience}
                </span>
                <p className="text-xs text-neutral-mid leading-relaxed mt-1">
                  {member.bio}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
