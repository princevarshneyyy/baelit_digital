import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import BookingModal from '../components/BookingModal';
import KundaliPricingModal from '../components/KundaliPricingModal';
import { SERVICES, BRAND_NAME } from '../data/mockData';

export default function Services() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isKundaliModalOpen, setIsKundaliModalOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState('kundali');

  const handleBook = (serviceId) => {
    setActiveServiceId(serviceId);
    if (serviceId === 'kundali') {
      setIsKundaliModalOpen(true);
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      {/* Soft background shapes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-neutral-light/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-4 py-1.5 rounded-full border border-white/80">
            Advisory Practices
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-charcoal tracking-tight mt-4 mb-6">
            Comprehensive Strategic Solutions
          </h1>
          <p className="text-sm md:text-base text-neutral-mid leading-relaxed">
            Four specialized practices tailored to provide strategic clarity, legal compliance, astrological foresight, and executive career trajectory.
          </p>
        </div>

        {/* 4 Large Glass Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={handleBook}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedServiceId={activeServiceId}
      />

      {/* Kundali Pricing Modal */}
      <KundaliPricingModal
        isOpen={isKundaliModalOpen}
        onClose={() => setIsKundaliModalOpen(false)}
      />
    </div>
  );
}
