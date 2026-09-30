import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Target, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import BookingModal from '../components/BookingModal';
import Hero from '../components/hero/Hero';
import { SERVICES, BRAND_NAME } from '../data/mockData';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('kundali');
  const navigate = useNavigate();

  const handleOpenBooking = (serviceId = 'kundali') => {
    setSelectedService(serviceId);
    setIsBookingOpen(true);
  };

  const reasons = [
    {
      icon: Target,
      title: 'Precision Counsel',
      desc: 'No generic advice. Every strategic roadmap is mathematically and empirical tailored.'
    },
    {
      icon: ShieldCheck,
      title: 'Absolute Discretion',
      desc: 'Strict non-disclosure standards protecting corporate assets and personal charts.'
    },
    {
      icon: Award,
      title: 'Interdisciplinary Mastery',
      desc: 'Seamless synthesis of ancient Jyotish foresight with contemporary business law.'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* 1. Animated Centerpiece Hero Section */}
      <Hero />

      {/* 2. Services Preview */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <h2 className="text-xs font-semibold tracking-widest text-neutral-mid uppercase">
            Core Practices
          </h2>
          <p className="text-2xl md:text-3xl font-light text-charcoal mt-2">
            Tailored Consultation Domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <GlassCard
                key={service.id}
                className="flex flex-col justify-between cursor-pointer group"
                onClick={() => navigate('/services')}
              >
                <div>
                  <div className="p-3 bg-white/70 rounded-xl border border-white/80 w-fit mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-charcoal" />
                  </div>
                  <h3 className="text-xl font-light text-charcoal mb-2 group-hover:text-black transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-mid leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-medium text-charcoal gap-1 group-hover:gap-2 transition-all pt-4 border-t border-charcoal/10">
                  <span>Explore Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 3. Why Choose Us Strip */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <h2 className="text-xs font-semibold tracking-widest text-neutral-mid uppercase">
            The {BRAND_NAME} Standard
          </h2>
          <p className="text-2xl md:text-3xl font-light text-charcoal mt-2">
            Why Discerning Leaders Trust Us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard key={idx} hoverEffect={true}>
                <div className="p-3 bg-white/70 rounded-xl border border-white/80 w-fit mb-4">
                  <Icon className="w-5 h-5 text-charcoal" />
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-mid leading-relaxed">{item.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. Simple Call to Action Band */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 mb-12">
        <GlassCard className="text-center py-12 px-6 md:px-12" hoverEffect={false}>
          <h2 className="text-2xl md:text-4xl font-light text-charcoal mb-4">
            Ready to chart your next strategic phase?
          </h2>
          <p className="text-sm text-neutral-mid max-w-xl mx-auto mb-8">
            Schedule a private consultation with our principal advisors today.
          </p>
          <button
            onClick={() => handleOpenBooking('kundali')}
            className="px-8 py-3.5 bg-charcoal text-white rounded-xl text-sm font-medium hover:bg-stone-accent transition-all shadow-md"
          >
            Request Private Consultation
          </button>
        </GlassCard>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedServiceId={selectedService}
      />
    </div>
  );
}
