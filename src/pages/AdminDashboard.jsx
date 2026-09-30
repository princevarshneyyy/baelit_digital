import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import GlassCard from '../components/GlassCard';
import { ShieldCheck, Users, Calendar, FileText, DollarSign, Mail, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const { profile, logout } = useAuth();
  const [stats, setStats] = useState({
    usersCount: 0,
    bookingsCount: 0,
    ordersCount: 0,
    inquiriesCount: 0,
    revenue: 0,
  });
  const [bookingsList, setBookingsList] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    if (!isSupabaseConfigured()) {
      // Mock data for demo admin
      setStats({
        usersCount: 142,
        bookingsCount: 28,
        ordersCount: 64,
        inquiriesCount: 19,
        revenue: 148500,
      });
      setBookingsList([
        { id: '1', booking_number: 'BAE-2026-00102', booking_date: '2026-10-08', start_time: '02:00 PM', amount: 1499, status: 'confirmed', service_id: 'kundali' },
        { id: '2', booking_number: 'BAE-2026-00103', booking_date: '2026-10-10', start_time: '11:30 AM', amount: 2999, status: 'confirmed', service_id: 'legal' },
      ]);
      setInquiriesList([
        { id: '1', name: 'Eleanor Vance', email: 'eleanor@vance.com', service: 'legal', message: 'Inquiring regarding tech startup IP advisory.', status: 'new', created_at: '2026-10-01' },
      ]);
      setLoading(false);
      return;
    }

    try {
      const [bookingsRes, ordersRes, inquiriesRes, profilesRes] = await Promise.all([
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('id', { count: 'exact' }),
      ]);

      const bookings = bookingsRes.data || [];
      const orders = ordersRes.data || [];
      const inquiries = inquiriesRes.data || [];

      const totalRev =
        bookings.reduce((sum, b) => sum + Number(b.amount || 0), 0) +
        orders.reduce((sum, o) => sum + Number(o.amount || 0), 0);

      setStats({
        usersCount: profilesRes.count || profilesRes.data?.length || 0,
        bookingsCount: bookings.length,
        ordersCount: orders.length,
        inquiriesCount: inquiries.length,
        revenue: totalRev,
      });

      setBookingsList(bookings);
      setInquiriesList(inquiries);
    } catch (err) {
      console.warn('Admin load error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Executive Console</span>
          </span>
          <h1 className="text-3xl md:text-4xl font-light text-charcoal mt-2">
            System Overview & Control
          </h1>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 glass-panel text-charcoal rounded-xl text-xs font-medium uppercase tracking-wider hover:bg-white/80 transition-colors w-fit"
        >
          Sign Out Admin
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <GlassCard hoverEffect={false}>
          <div className="flex items-center gap-3 text-neutral-mid mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Total Clients</span>
          </div>
          <p className="text-3xl font-light text-charcoal">{stats.usersCount}</p>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <div className="flex items-center gap-3 text-neutral-mid mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Bookings</span>
          </div>
          <p className="text-3xl font-light text-charcoal">{stats.bookingsCount}</p>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <div className="flex items-center gap-3 text-neutral-mid mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Kundali Orders</span>
          </div>
          <p className="text-3xl font-light text-charcoal">{stats.ordersCount}</p>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <div className="flex items-center gap-3 text-neutral-mid mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Total Revenue</span>
          </div>
          <p className="text-3xl font-light text-charcoal">₹{stats.revenue.toLocaleString()}</p>
        </GlassCard>
      </div>

      {/* Bookings & Inquiries Tables */}
      <div className="space-y-8">
        <GlassCard hoverEffect={false}>
          <h2 className="text-lg font-medium text-charcoal mb-4 pb-2 border-b border-charcoal/10">
            Recent Client Bookings
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-mid">
              <thead className="bg-neutral-warm/80 uppercase font-semibold text-charcoal">
                <tr>
                  <th className="p-3">Ref</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {bookingsList.map((b) => (
                  <tr key={b.id}>
                    <td className="p-3 font-mono text-charcoal font-medium">{b.booking_number}</td>
                    <td className="p-3 uppercase font-medium">{b.service_id}</td>
                    <td className="p-3">{b.booking_date}</td>
                    <td className="p-3">{b.start_time}</td>
                    <td className="p-3 font-medium text-charcoal">₹{b.amount}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold uppercase text-[10px]">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <h2 className="text-lg font-medium text-charcoal mb-4 pb-2 border-b border-charcoal/10">
            Incoming Contact Inquiries
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-mid">
              <thead className="bg-neutral-warm/80 uppercase font-semibold text-charcoal">
                <tr>
                  <th className="p-3">Client</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {inquiriesList.map((inq) => (
                  <tr key={inq.id}>
                    <td className="p-3 font-medium text-charcoal">{inq.name}</td>
                    <td className="p-3">{inq.email}</td>
                    <td className="p-3 uppercase">{inq.service}</td>
                    <td className="p-3 max-w-xs truncate">{inq.message}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold uppercase text-[10px]">
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
