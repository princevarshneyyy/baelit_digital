import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Sparkles, FileText, UserCheck, Calendar, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { BRAND_NAME } from '../data/mockData';

export default function KundaliPricingModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('1499'); // Default to most chosen option
  const [step, setStep] = useState('pricing'); // 'pricing' | 'form' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    tob: '',
    pob: '',
    preferredDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('pricing');
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.pob) newErrors.pob = 'Place of birth is required';
    if (selectedPlan === '1499' && !formData.preferredDate) {
      newErrors.preferredDate = 'Preferred consultation date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('success');
    }
  };

  const plans = [
    {
      id: '499',
      name: 'Premium Kundali Report',
      price: '₹499',
      popular: false,
      icon: FileText,
      tagline: 'Comprehensive 160+ Page Life & Transit Blueprint',
      description: 'Extensive, computer-generated & verified astrological dossier covering your complete life transits, dasha phases, gem suggestions, and remedial charts.',
      features: [
        'Complete 160+ Page Exhaustive Kundali PDF',
        'Lifetime Dasha & Planetary Period Breakdown',
        'Matchmaking & Relationship Chart Analysis',
        'Vedic Gemstone & Yantra Recommendations',
        'Delivered instantly via Email within 24 hours'
      ]
    },
    {
      id: '1499',
      name: 'Kundali + Personal Advisory Session',
      price: '₹1,499',
      popular: true, // Most Chosen
      icon: UserCheck,
      tagline: '160+ Page Kundali PDF + 1-on-1 Senior Astrologer Session',
      description: 'Our flagship offering. Includes the full 160+ page report plus a 45-minute private live consultation with our senior Vedic Jyotish scholar to address your specific life, career, and marital questions.',
      features: [
        'Includes Complete 160+ Page Premium Kundali Report',
        '45-Minute Private 1-on-1 Consultation Session',
        'Direct Remedies & Custom Timing Strategies',
        'In-depth Question Answering (Career, Legal, Marriage)',
        'Priority Appointment Scheduling & Recording'
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 w-full max-w-3xl glass-modal rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Book Kundali Advisory"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-mid hover:text-charcoal hover:bg-neutral-light/50 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-3.5 py-1 rounded-full border border-white/80">
                <Sparkles className="w-3.5 h-3.5 text-charcoal" />
                <span>{BRAND_NAME} Jyotish Practice</span>
              </span>
              <h2 className="text-2xl md:text-3xl font-light text-charcoal mt-2">
                Book Kundali Advisory
              </h2>
              <p className="text-xs text-neutral-mid mt-1">
                Select your preferred advisory package to unlock cosmic clarity and strategic timing.
              </p>
            </div>

            {step === 'pricing' && (
              <div className="space-y-6">
                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plans.map((plan) => {
                    const PlanIcon = plan.icon;
                    const isSelected = selectedPlan === plan.id;

                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative rounded-2xl p-6 transition-all cursor-pointer border flex flex-col justify-between ${
                          plan.popular
                            ? 'bg-white/80 border-charcoal shadow-lg ring-2 ring-charcoal/10'
                            : 'bg-white/50 border-white/80 hover:bg-white/70 shadow-sm'
                        }`}
                      >
                        {/* Most Popular Badge */}
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[10px] uppercase tracking-widest font-semibold px-3 py-0.5 rounded-full shadow flex items-center gap-1">
                            <Star className="w-3 h-3 fill-white text-white" />
                            <span>Most Chosen</span>
                          </div>
                        )}

                        <div>
                          {/* Plan Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2.5 bg-white/80 rounded-xl border border-white/90 shadow-sm">
                              <PlanIcon className="w-5 h-5 text-charcoal" />
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-semibold text-charcoal">{plan.price}</span>
                              <span className="text-[10px] text-neutral-mid block uppercase tracking-wider">One-time</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-medium text-charcoal mb-1">{plan.name}</h3>
                          <p className="text-xs font-medium text-neutral-mid mb-3 leading-snug">{plan.tagline}</p>
                          <p className="text-xs text-neutral-mid/90 mb-4 leading-relaxed">{plan.description}</p>

                          {/* Features */}
                          <div className="space-y-2 pt-3 border-t border-charcoal/10">
                            {plan.features.map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-neutral-mid">
                                <CheckCircle className="w-3.5 h-3.5 text-charcoal shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Select Radio */}
                        <div className="mt-6 pt-3 border-t border-charcoal/10 flex items-center justify-between">
                          <span className="text-xs font-medium text-charcoal">
                            {isSelected ? 'Selected Package' : 'Click to Select'}
                          </span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-charcoal bg-charcoal' : 'border-neutral-mid/40'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue to Details Form Button */}
                <button
                  onClick={() => setStep('form')}
                  className="w-full py-3.5 bg-charcoal text-white rounded-xl text-sm font-medium hover:bg-stone-accent transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed with {selectedPlan === '1499' ? '₹1,499 Advisory' : '₹499 Report'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'form' && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                <div className="p-3 bg-white/60 rounded-xl border border-white/80 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold text-charcoal uppercase tracking-wider block">Selected Package</span>
                    <span className="text-sm font-medium text-neutral-mid">
                      {selectedPlan === '1499' ? 'Kundali PDF + Personal Advisory (₹1,499)' : 'Premium 160+ Page Kundali PDF (₹499)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('pricing')}
                    className="text-xs text-charcoal underline font-medium hover:opacity-80"
                  >
                    Change
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.name ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.email ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.dob ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    />
                    {errors.dob && <span className="text-xs text-red-500 mt-1 block">{errors.dob}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">Time of Birth (Approx)</label>
                    <input
                      type="time"
                      name="tob"
                      value={formData.tob}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/70 border border-neutral-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">Place of Birth *</label>
                    <input
                      type="text"
                      name="pob"
                      value={formData.pob}
                      onChange={handleChange}
                      placeholder="City, State"
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.pob ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    />
                    {errors.pob && <span className="text-xs text-red-500 mt-1 block">{errors.pob}</span>}
                  </div>
                </div>

                {selectedPlan === '1499' && (
                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">Preferred Consultation Date *</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.preferredDate ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    />
                    {errors.preferredDate && <span className="text-xs text-red-500 mt-1 block">{errors.preferredDate}</span>}
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('pricing')}
                    className="w-1/3 py-3 glass-panel text-charcoal rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-white/80 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-charcoal text-white rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-stone-accent transition-all shadow-md"
                  >
                    Confirm Booking ({selectedPlan === '1499' ? '₹1,499' : '₹499'})
                  </button>
                </div>
              </motion.form>
            )}

            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10 flex flex-col items-center"
              >
                <CheckCircle className="w-16 h-16 text-charcoal mb-4" />
                <h3 className="text-2xl font-light text-charcoal">
                  Booking Confirmed!
                </h3>
                <p className="text-sm text-neutral-mid mt-2 max-w-md">
                  Thank you, <span className="font-semibold text-charcoal">{formData.name}</span>. Your order for the{' '}
                  <span className="font-semibold text-charcoal">
                    {selectedPlan === '1499' ? 'Kundali + Personal Advisory Session (₹1,499)' : '160+ Page Premium Kundali Report (₹499)'}
                  </span>{' '}
                  has been placed successfully.
                </p>
                <p className="text-xs text-neutral-mid mt-3">
                  A confirmation email with session details and PDF report download instructions has been dispatched to <span className="font-medium text-charcoal">{formData.email}</span>.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-3 bg-charcoal text-white rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-stone-accent transition-colors shadow-md"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
