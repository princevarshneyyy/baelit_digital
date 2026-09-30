import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import GlassCard from './GlassCard';

export default function ServiceCard({ service, onBook }) {
  const IconComponent = service.icon;

  return (
    <GlassCard className="flex flex-col justify-between h-full group relative overflow-hidden">
      <div>
        {/* Icon & Title Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3.5 bg-white/70 rounded-xl border border-white/80 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-charcoal" />
          </div>
          <span className="text-xs uppercase tracking-widest text-neutral-mid font-medium bg-neutral-light/40 px-3 py-1 rounded-full border border-white/50">
            Advisory
          </span>
        </div>

        <h3 className="text-2xl font-light text-charcoal mb-1 group-hover:text-black transition-colors">
          {service.title}
        </h3>
        <p className="text-xs text-neutral-mid font-medium uppercase tracking-wider mb-4">
          {service.subtitle}
        </p>

        <p className="text-sm text-neutral-mid leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Key Offerings List */}
        <div className="space-y-2 mb-8 pt-4 border-t border-charcoal/10">
          <span className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">
            Key Focus Areas
          </span>
          {service.offerings.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-mid">
              <CheckCircle2 className="w-3.5 h-3.5 text-charcoal shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Book Consultation Button */}
      <div className="pt-4 flex items-center justify-between border-t border-charcoal/10 mt-auto">
        <button
          onClick={() => onBook(service.id)}
          className="w-full py-3 px-4 bg-charcoal text-white rounded-xl text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-stone-accent transition-all shadow-sm group-hover:shadow-md"
        >
          <span>{service.id === 'kundali' ? 'Book Kundali Advisory' : 'Book Consultation'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </GlassCard>
  );
}
