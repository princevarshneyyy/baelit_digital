import React from 'react';
import GlassCard from '../components/GlassCard';

export default function PrivacyPolicy() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-6 md:px-12">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-4 py-1 rounded-full border border-white/80">
          Legal & Compliance
        </span>
        <h1 className="text-3xl md:text-4xl font-light text-charcoal mt-3">
          Privacy Policy & Data Security
        </h1>
        <p className="text-xs text-neutral-mid mt-2">Last updated: October 2026</p>
      </div>

      <GlassCard hoverEffect={false} className="space-y-6 text-xs md:text-sm text-neutral-mid leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-charcoal mb-2">1. Data Ownership & Confidentiality</h2>
          <p>
            BAELIT Digital operates under a strict non-disclosure baseline. All personal information, birth details, financial indicators, and legal contracts submitted through our client portal are encrypted and access-controlled via Supabase Row Level Security (RLS).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-charcoal mb-2">2. Information Collection</h2>
          <p>
            We only collect information necessary to deliver advisory services, such as your full name, email address, preferred session dates, and birth data (for Jyotish chart calculations). We never sell or share data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-charcoal mb-2">3. Storage & Security</h2>
          <p>
            All records are preserved using industry-standard PostgreSQL database architecture with role-based policies. Authentication sessions use secure JWT tokens with automatic expiration.
          </p>
        </section>
      </GlassCard>
    </div>
  );
}
