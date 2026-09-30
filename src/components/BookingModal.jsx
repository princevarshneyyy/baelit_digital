import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { SERVICES, BRAND_NAME } from '../data/mockData';
import { fetchAvailableTimeSlots, createBooking } from '../lib/servicesApi';
import { useAuth } from '../context/AuthContext';

export default function BookingModal({ isOpen, onClose, selectedServiceId = 'kundali' }) {
  const { user } = useAuth();
  const [serviceId, setServiceId] = useState(selectedServiceId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    startTime: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [slotsData, setSlotsData] = useState({ available: [], booked: [] });
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Minimum date = today
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setBookingResult(null);
      setApiError(null);
      setErrors({});
      if (user) {
        setFormData((prev) => ({
          ...prev,
          name: user.full_name || prev.name,
          email: user.email || prev.email,
        }));
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, user]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Load available slots when date or service changes
  useEffect(() => {
    if (formData.preferredDate) {
      setLoadingSlots(true);
      fetchAvailableTimeSlots(serviceId, formData.preferredDate).then((res) => {
        setSlotsData(res);
        setLoadingSlots(false);
      });
    }
  }, [formData.preferredDate, serviceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
    if (apiError) setApiError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a date';
    } else if (formData.preferredDate < todayStr) {
      newErrors.preferredDate = 'Booking date cannot be in the past';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Please select an available time slot';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    const selectedServiceObj = SERVICES.find((s) => s.id === serviceId);
    const amount = serviceId === 'kundali' ? 1499.0 : 2999.0;

    const res = await createBooking({
      userId: user?.id,
      serviceId,
      bookingDate: formData.preferredDate,
      startTime: formData.startTime,
      notes: formData.notes,
      amount,
    });

    setIsSubmitting(false);

    if (res.error) {
      setApiError(res.error.message || 'Failed to create booking. Please try another slot.');
    } else {
      setBookingResult(res.data);
      // Reset sensitive form input state on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        startTime: '',
        notes: '',
      });
    }
  };

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 w-full max-w-lg glass-modal rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-mid hover:text-charcoal hover:bg-neutral-light/50 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase">
                {BRAND_NAME} Advisory Session
              </span>
              <h2 id="booking-modal-title" className="text-2xl font-light text-charcoal mt-1">
                Book Consultation
              </h2>
              <p className="text-xs text-neutral-mid mt-1">
                Select your preferred advisory service and schedule a live session.
              </p>
            </div>

            {apiError && (
              <div className="p-3 mb-4 bg-red-50/80 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{apiError}</span>
              </div>
            )}

            {bookingResult ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 flex flex-col items-center"
              >
                <CheckCircle className="w-14 h-14 text-charcoal mb-4" />
                <span className="text-xs font-mono bg-neutral-light px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  Booking #{bookingResult.booking_number}
                </span>
                <h3 className="text-2xl font-light text-charcoal">
                  Consultation Confirmed
                </h3>
                <p className="text-sm text-neutral-mid mt-2 max-w-sm">
                  Your appointment for <span className="font-medium text-charcoal">{bookingResult.booking_date}</span> at{' '}
                  <span className="font-medium text-charcoal">{bookingResult.start_time}</span> has been created.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-charcoal text-white rounded-xl text-sm font-medium hover:bg-stone-accent transition-colors shadow-md"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="block text-xs font-medium text-neutral-mid mb-1">
                    Select Advisory Service
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/80 border border-neutral-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.name ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.email ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-mid mb-1">
                    Select Consultation Date *
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 bg-white/70 border ${
                      errors.preferredDate ? 'border-red-400' : 'border-neutral-light'
                    } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                  />
                  {errors.preferredDate && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.preferredDate}</span>
                  )}
                </div>

                {/* Available Time Slots Selector */}
                {formData.preferredDate && (
                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Available Time Slots *</span>
                    </label>
                    {loadingSlots ? (
                      <div className="py-3 text-center text-xs text-neutral-mid">
                        Checking slot availability...
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {slotsData.available.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, startTime: slot });
                              if (errors.startTime) setErrors({ ...errors, startTime: null });
                            }}
                            className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                              formData.startTime === slot
                                ? 'bg-charcoal text-white border-charcoal shadow-sm'
                                : 'bg-white/70 text-charcoal border-neutral-light hover:bg-white'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                        {slotsData.booked.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            disabled
                            className="py-2 text-xs font-medium rounded-xl border bg-neutral-light/50 text-neutral-mid/50 border-neutral-light cursor-not-allowed line-through"
                          >
                            {slot} (Booked)
                          </button>
                        ))}
                      </div>
                    )}
                    {errors.startTime && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.startTime}</span>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-neutral-mid mb-1">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Briefly describe your scenario..."
                    className="w-full px-4 py-2.5 bg-white/70 border border-neutral-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-charcoal text-white rounded-xl text-sm font-medium hover:bg-stone-accent transition-all shadow-md mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm & Book Consultation</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
