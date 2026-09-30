import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { fetchUserDashboardData } from '../lib/servicesApi';
import GlassCard from '../components/GlassCard';
import { Calendar, FileText, User, Clock, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export default function Dashboard() {
  const { profile, user, logout } = useAuth();
  const [data, setData] = useState({ bookings: [], orders: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchUserDashboardData(user.id).then((res) => {
        setData(res);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  const downloadCalendarEvent = (booking) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BAELIT Digital Advisory//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:BAELIT Advisory Consultation (${booking.service_id.toUpperCase()})
DESCRIPTION:Private advisory session with BAELIT senior partner. Booking Ref: ${booking.booking_number}
DTSTART:${booking.booking_date.replace(/-/g, '')}T100000Z
DTEND:${booking.booking_date.replace(/-/g, '')}T110000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `BAELIT_Consultation_${booking.booking_number}.ics`;
    link.click();
  };

  return (
    <div className="min-h-screen py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-3.5 py-1 rounded-full border border-white/80">
            Client Portal Workspace
          </span>
          <h1 className="text-3xl md:text-4xl font-light text-charcoal mt-2">
            Welcome back, {profile?.full_name || user?.email}
          </h1>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 glass-panel text-charcoal rounded-xl text-xs font-medium uppercase tracking-wider hover:bg-white/80 transition-colors w-fit"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - 8 cols */}
        <div className="lg:col-span-8 space-y-8">
          {/* Upcoming Consultations */}
          <GlassCard hoverEffect={false}>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-charcoal/10">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-charcoal" />
                <h2 className="text-lg font-medium text-charcoal">Upcoming Consultations</h2>
              </div>
              <span className="text-xs text-neutral-mid">{data.bookings.length} Total Booked</span>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-neutral-mid">Loading bookings...</div>
            ) : data.bookings.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-mid">
                No active consultation bookings found.
              </div>
            ) : (
              <div className="space-y-4">
                {data.bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-white/70 rounded-xl border border-white/90 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-neutral-light px-2.5 py-0.5 rounded-full text-neutral-mid">
                        {b.booking_number}
                      </span>
                      <h3 className="text-base font-semibold text-charcoal mt-1 capitalize">
                        {b.service_id} Advisory Session
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-neutral-mid mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {b.booking_date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {b.start_time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                        {b.status}
                      </span>
                      <button
                        onClick={() => downloadCalendarEvent(b)}
                        className="p-2 rounded-xl glass-panel text-charcoal hover:bg-white transition-colors"
                        title="Add to Calendar (.ics)"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Orders & Reports */}
          <GlassCard hoverEffect={false}>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-charcoal/10">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-charcoal" />
                <h2 className="text-lg font-medium text-charcoal">Kundali Orders & Dossiers</h2>
              </div>
              <span className="text-xs text-neutral-mid">{data.orders.length} Orders</span>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-neutral-mid">Loading orders...</div>
            ) : data.orders.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-mid">No Kundali orders on file.</div>
            ) : (
              <div className="space-y-4">
                {data.orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-white/70 rounded-xl border border-white/90 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-neutral-light px-2.5 py-0.5 rounded-full text-neutral-mid">
                        {ord.order_number}
                      </span>
                      <h3 className="text-base font-semibold text-charcoal mt-1">
                        160+ Page Premium Kundali PDF Report
                      </h3>
                      <p className="text-xs text-neutral-mid mt-0.5">Amount Paid: ₹{ord.amount}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                        {ord.order_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* User Profile Card - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard hoverEffect={false}>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-charcoal/10">
              <User className="w-5 h-5 text-charcoal" />
              <h2 className="text-lg font-medium text-charcoal">Account Credentials</h2>
            </div>

            <div className="space-y-4 text-xs text-neutral-mid">
              <div>
                <span className="font-semibold text-charcoal block uppercase tracking-wider text-[10px]">
                  Full Name
                </span>
                <p className="text-sm font-medium text-charcoal mt-0.5">
                  {profile?.full_name || 'Client Account'}
                </p>
              </div>

              <div>
                <span className="font-semibold text-charcoal block uppercase tracking-wider text-[10px]">
                  Email Address
                </span>
                <p className="text-sm font-medium text-charcoal mt-0.5">{user?.email}</p>
              </div>

              <div>
                <span className="font-semibold text-charcoal block uppercase tracking-wider text-[10px]">
                  Account Role
                </span>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-neutral-light text-charcoal font-semibold text-[10px] uppercase">
                  {profile?.role || 'User'}
                </span>
              </div>

              <div className="pt-4 border-t border-charcoal/10 flex items-center gap-2 text-[11px] text-neutral-mid">
                <ShieldCheck className="w-4 h-4 text-charcoal" />
                <span>Protected by RLS Encryption</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
