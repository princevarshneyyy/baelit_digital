import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { SERVICES, BRAND_NAME } from '../data/mockData';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'kundali',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Please include a message or inquiry';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSent(true);
    }
  };

  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      {/* Soft background shape */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-neutral-light/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-4 py-1.5 rounded-full border border-white/80">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-charcoal tracking-tight mt-4 mb-6">
            Initiate a Private Dialogue
          </h1>
          <p className="text-sm md:text-base text-neutral-mid leading-relaxed">
            Reach out to schedule an executive briefing, inquire about custom advisory engagements, or connect directly with our practice leads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form - 7 cols */}
          <div className="lg:col-span-7">
            <GlassCard hoverEffect={false}>
              <h2 className="text-2xl font-light text-charcoal mb-2">
                Send an Inquiry
              </h2>
              <p className="text-xs text-neutral-mid mb-6">
                All communications are treated with strict confidential protocols.
              </p>

              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <CheckCircle2 className="w-14 h-14 text-charcoal mb-4" />
                  <h3 className="text-2xl font-light text-charcoal">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-neutral-mid mt-2 max-w-sm">
                    Thank you, <span className="font-medium text-charcoal">{formData.name}</span>. A senior partner will review your inquiry and respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: '', email: '', service: 'kundali', message: '' });
                    }}
                    className="mt-6 px-6 py-2.5 bg-charcoal text-white rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-stone-accent transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                      placeholder="jane@company.com"
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.email ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">
                      Practice Area of Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/80 border border-neutral-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your advisory requirements..."
                      className={`w-full px-4 py-2.5 bg-white/70 border ${
                        errors.message ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal`}
                    ></textarea>
                    {errors.message && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-charcoal text-white rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-stone-accent transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </GlassCard>
          </div>

          {/* Side Panel & Map Placeholder - 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <GlassCard hoverEffect={false}>
              <h3 className="text-lg font-medium text-charcoal mb-6 pb-2 border-b border-charcoal/10">
                Direct Contact & HQ
              </h3>

              <div className="space-y-5 text-xs text-neutral-mid">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-white/70 rounded-lg border border-white/80 shrink-0">
                    <Mail className="w-4 h-4 text-charcoal" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal uppercase tracking-wider block mb-0.5">
                      Email
                    </span>
                    <p>advisory@{BRAND_NAME.toLowerCase()}.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-white/70 rounded-lg border border-white/80 shrink-0">
                    <Phone className="w-4 h-4 text-charcoal" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal uppercase tracking-wider block mb-0.5">
                      Telephone
                    </span>
                    <p>+1 (800) 248-3742</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-white/70 rounded-lg border border-white/80 shrink-0">
                    <MapPin className="w-4 h-4 text-charcoal" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal uppercase tracking-wider block mb-0.5">
                      Global Headquarters
                    </span>
                    <p>750 Fifth Avenue, Suite 2400</p>
                    <p>New York, NY 10019</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-white/70 rounded-lg border border-white/80 shrink-0">
                    <Clock className="w-4 h-4 text-charcoal" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal uppercase tracking-wider block mb-0.5">
                      Working Hours
                    </span>
                    <p>Mon – Fri: 09:00 – 18:00 EST</p>
                    <p>Sat – Sun: By Executive Appointment Only</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Neutral Map Placeholder */}
            <GlassCard hoverEffect={false} className="flex-1 min-h-[200px] flex flex-col justify-center items-center text-center relative overflow-hidden bg-neutral-light/30">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1C1C1C_1px,transparent_1px)] [background-size:16px_16px]" />
              <MapPin className="w-8 h-8 text-neutral-mid mb-2" />
              <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">
                Interactive Map View
              </span>
              <span className="text-[11px] text-neutral-mid mt-1">
                750 Fifth Ave, NYC
              </span>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
