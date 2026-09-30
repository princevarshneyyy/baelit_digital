import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import BookingModal from '../components/BookingModal';
import KundaliPricingModal from '../components/KundaliPricingModal';
import { SERVICES } from '../data/mockData';
import { Sparkles, Scale, Wallet, Compass, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [isKundaliModalOpen, setIsKundaliModalOpen] = React.useState(false);

  const service = SERVICES.find((s) => s.id === slug) || SERVICES[0];
  const Icon = service.icon;

  const faqs = [
    {
      q: `How does the ${service.title} consultation work?`,
      a: 'After selecting your preferred date and time, you will receive a calendar confirmation and link. Our principal advisor will conduct a private 45-60 minute session.',
    },
    {
      q: 'Can I reschedule or cancel my appointment?',
      a: 'Yes, rescheduling is permitted up to 24 hours prior to the session directly through your Client Portal workspace.',
    },
    {
      q: 'How is my personal information protected?',
      a: 'All data is stored in encrypted Supabase database instances protected with strict Row Level Security (RLS). We never share data with third parties.',
    },
  ];

  const handleBook = () => {
    if (service.id === 'kundali') {
      setIsKundaliModalOpen(true);
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-neutral-mid">
          <Link to="/services" className="hover:text-charcoal transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-charcoal font-medium">{service.title}</span>
        </div>

        {/* Hero Section */}
        <GlassCard className="mb-12" hoverEffect={false}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/80 rounded-xl border border-white/90 shadow-sm">
              <Icon className="w-6 h-6 text-charcoal" />
            </div>
            <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-3.5 py-1 rounded-full border border-white/80">
              {service.subtitle}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-4">
            {service.title}
          </h1>

          <p className="text-base md:text-lg text-neutral-mid leading-relaxed max-w-3xl mb-8">
            {service.description}
          </p>

          <button
            onClick={handleBook}
            className="px-8 py-3.5 bg-charcoal text-white rounded-xl text-sm font-medium hover:bg-stone-accent transition-all shadow-md flex items-center gap-2"
          >
            <span>Book {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </GlassCard>

        {/* What We Offer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <GlassCard hoverEffect={false}>
            <h2 className="text-xl font-light text-charcoal mb-4">What We Offer</h2>
            <div className="space-y-3">
              {service.offerings.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-neutral-mid">
                  <CheckCircle2 className="w-4 h-4 text-charcoal shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false}>
            <h2 className="text-xl font-light text-charcoal mb-4">Who It Is For</h2>
            <p className="text-sm text-neutral-mid leading-relaxed mb-4">
              Designed for executive directors, high-net-worth individuals, tech founders, and global families requiring objective, empirical guidance during pivotal life decisions.
            </p>
            <div className="p-4 bg-white/60 rounded-xl border border-white/80 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-charcoal shrink-0" />
              <span className="text-xs text-neutral-mid font-medium">
                Strict Non-Disclosure & Confidentiality Protocol Guaranteed
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-xs font-semibold tracking-widest text-neutral-mid uppercase">
              Methodology
            </h2>
            <p className="text-2xl md:text-3xl font-light text-charcoal mt-2">
              Four Steps to Actionable Clarity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Discover', desc: 'Understand your unique scenario & requirements.' },
              { num: '02', title: 'Analyze', desc: 'Review relevant astrological or legal data.' },
              { num: '03', title: 'Advise', desc: 'Develop a tailored, structured roadmap.' },
              { num: '04', title: 'Act', desc: 'Execute key recommendations with precision.' },
            ].map((step, i) => (
              <GlassCard key={i} hoverEffect={true}>
                <span className="text-2xl font-semibold text-neutral-mid/40 block mb-2 font-mono">
                  {step.num}
                </span>
                <h3 className="text-base font-medium text-charcoal mb-1">{step.title}</h3>
                <p className="text-xs text-neutral-mid leading-relaxed">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-xs font-semibold tracking-widest text-neutral-mid uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <GlassCard key={idx} hoverEffect={false} className="p-6">
                <h3 className="text-base font-medium text-charcoal mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-charcoal shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs md:text-sm text-neutral-mid leading-relaxed pl-6">
                  {faq.a}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedServiceId={service.id}
      />

      <KundaliPricingModal
        isOpen={isKundaliModalOpen}
        onClose={() => setIsKundaliModalOpen(false)}
      />
    </div>
  );
}
