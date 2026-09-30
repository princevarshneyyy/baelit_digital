import { supabase, isSupabaseConfigured } from './supabaseClient';
import { SERVICES } from '../data/mockData';

// Generate human readable booking sequence fallback
const generateBookingNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `BAE-${year}-${random}`;
};

// Generate human readable order sequence fallback
const generateOrderNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `ORD-${year}-${random}`;
};

// 1. Fetch available time slots for a given date
export const fetchAvailableTimeSlots = async (serviceId, dateStr) => {
  const allSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
  ];

  if (!isSupabaseConfigured()) {
    // Demo mode: mock booked slot
    const booked = dateStr.endsWith('5') || dateStr.endsWith('0') ? ['02:00 PM'] : [];
    return {
      available: allSlots.filter((s) => !booked.includes(s)),
      booked,
    };
  }

  try {
    const { data: existingBookings, error } = await supabase
      .from('bookings')
      .select('start_time, status')
      .eq('booking_date', dateStr)
      .neq('status', 'cancelled');

    if (error) throw error;

    const bookedTimes = existingBookings.map((b) => b.start_time);
    return {
      available: allSlots.filter((s) => !bookedTimes.includes(s)),
      booked: bookedTimes,
    };
  } catch (err) {
    console.warn('Error fetching slots:', err.message);
    return { available: allSlots, booked: [] };
  }
};

// 2. Create Real Booking
export const createBooking = async (bookingData) => {
  const { userId, serviceId, bookingDate, startTime, notes, amount } = bookingData;

  const newBooking = {
    booking_number: generateBookingNumber(),
    user_id: userId || null,
    service_id: serviceId,
    booking_date: bookingDate,
    start_time: startTime,
    end_time: startTime, // Simple end time mapping
    status: 'confirmed',
    payment_status: 'paid',
    amount: amount || 1499.0,
    notes: notes || '',
  };

  if (!isSupabaseConfigured()) {
    // Store in local storage for demo fallback
    const existing = JSON.parse(localStorage.getItem('baelit_demo_bookings') || '[]');
    const created = { ...newBooking, id: 'demo-b-' + Date.now(), created_at: new Date().toISOString() };
    existing.unshift(created);
    localStorage.setItem('baelit_demo_bookings', JSON.stringify(existing));
    return { data: created, error: null };
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select()
    .single();

  return { data, error };
};

// 3. Create Kundali Order
export const createKundaliOrder = async (orderData) => {
  const { userId, serviceId, amount, dob, tob, pob, name, email } = orderData;

  const newOrder = {
    order_number: generateOrderNumber(),
    user_id: userId || null,
    service_id: serviceId || 'kundali',
    amount: amount || 499.0,
    dob,
    tob,
    pob,
    payment_status: 'paid',
    order_status: 'processing',
  };

  if (!isSupabaseConfigured()) {
    const existing = JSON.parse(localStorage.getItem('baelit_demo_orders') || '[]');
    const created = { ...newOrder, id: 'demo-ord-' + Date.now(), created_at: new Date().toISOString(), name, email };
    existing.unshift(created);
    localStorage.setItem('baelit_demo_orders', JSON.stringify(existing));
    return { data: created, error: null };
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select()
    .single();

  return { data, error };
};

// 4. Create Contact Submission
export const submitContactInquiry = async (contactData) => {
  const { name, email, phone, service, message } = contactData;

  const newSubmission = {
    name,
    email,
    phone: phone || null,
    service: service || 'general',
    message,
    status: 'new',
  };

  if (!isSupabaseConfigured()) {
    const existing = JSON.parse(localStorage.getItem('baelit_demo_inquiries') || '[]');
    const created = { ...newSubmission, id: 'demo-inq-' + Date.now(), created_at: new Date().toISOString() };
    existing.unshift(created);
    localStorage.setItem('baelit_demo_inquiries', JSON.stringify(existing));
    return { data: created, error: null };
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([newSubmission])
    .select()
    .single();

  return { data, error };
};

// 5. Fetch User Bookings & Orders for Dashboard
export const fetchUserDashboardData = async (userId) => {
  if (!isSupabaseConfigured()) {
    const bookings = JSON.parse(localStorage.getItem('baelit_demo_bookings') || '[]');
    const orders = JSON.parse(localStorage.getItem('baelit_demo_orders') || '[]');
    return { bookings, orders, error: null };
  }

  try {
    const [bookingsRes, ordersRes] = await Promise.all([
      supabase.from('bookings').select('*, services(name)').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    ]);

    return {
      bookings: bookingsRes.data || [],
      orders: ordersRes.data || [],
      error: bookingsRes.error || ordersRes.error,
    };
  } catch (err) {
    return { bookings: [], orders: [], error: err };
  }
};
