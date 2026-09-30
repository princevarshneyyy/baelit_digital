-- ================================================================
-- BAELIT DIGITAL FULL-STACK SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view their own profile or Admins can view all"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email,
        'user'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- minutes
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
    ON public.services FOR SELECT
    USING (is_active = TRUE OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can manage services"
    ON public.services FOR ALL
    USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Seed Services Data
INSERT INTO public.services (id, name, slug, description, short_description, category, price, duration, is_active)
VALUES 
    ('kundali', 'Kundali Advisory', 'kundali', 'Empirical Vedic chart analysis, planetary transit mapping, and tailored remedies for timing key life transitions.', 'Cosmic alignment & Vedic birth chart analysis', 'astrology', 1499.00, 45, true),
    ('legal', 'Legal Advisory', 'legal', 'Comprehensive legal structuring, contract negotiations, compliance reviews, and governance for individuals & enterprises.', 'Precision contracts & risk mitigation', 'legal', 2999.00, 60, true),
    ('finance', 'Strategic Finance', 'finance', 'Sophisticated wealth preservation, investment strategy, tax structuring, and sustainable financial growth planning.', 'Wealth management & capital optimization', 'finance', 3499.00, 60, true),
    ('career', 'Executive Career Counsel', 'career', 'Strategic career positioning, executive counseling, transition management, and high-impact skill roadmaps.', 'Leadership roadmap & professional counsel', 'career', 2499.00, 60, true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    price = EXCLUDED.price;

-- 3. BOOKINGS TABLE & HUMAN-READABLE NUMBER GENERATOR
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    service_id TEXT REFERENCES public.services(id),
    advisor_id UUID REFERENCES public.profiles(id),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    amount NUMERIC(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_slot_per_date UNIQUE (booking_date, start_time)
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings or Admins view all"
    ON public.bookings FOR SELECT
    USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can create their own bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings or Admins update all"
    ON public.bookings FOR UPDATE
    USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Sequence & Trigger for Human-Readable Booking Number (BAE-2026-XXXXX)
CREATE SEQUENCE IF NOT EXISTS booking_number_seq START WITH 1001;

CREATE OR REPLACE FUNCTION public.generate_booking_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.booking_number := 'BAE-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('booking_number_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_booking_number ON public.bookings;
CREATE TRIGGER set_booking_number
    BEFORE INSERT ON public.bookings
    FOR EACH ROW
    WHEN (NEW.booking_number IS NULL OR NEW.booking_number = '')
    EXECUTE FUNCTION public.generate_booking_number();

-- 4. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    order_id UUID,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    razorpay_order_id TEXT UNIQUE,
    razorpay_payment_id TEXT UNIQUE,
    razorpay_signature TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own payments or Admins view all"
    ON public.payments FOR SELECT
    USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users insert own payments"
    ON public.payments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 5. ORDERS TABLE (Kundali & Products)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    service_id TEXT REFERENCES public.services(id),
    amount NUMERIC(10, 2) NOT NULL,
    dob DATE,
    tob TIME,
    pob TEXT,
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    order_status TEXT NOT NULL DEFAULT 'processing' CHECK (order_status IN ('processing', 'ready', 'failed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own orders or Admins view all"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users insert own orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Sequence & Trigger for Human-Readable Order Number (ORD-2026-XXXXX)
CREATE SEQUENCE IF NOT EXISTS order_number_seq START WITH 5001;

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_order_number ON public.orders;
CREATE TRIGGER set_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
    EXECUTE FUNCTION public.generate_order_number();

-- 6. KUNDALI REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.kundali_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    report_url TEXT,
    status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'ready', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.kundali_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own reports or Admins view all"
    ON public.kundali_reports FOR SELECT
    USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 7. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact inquiries"
    ON public.contact_submissions FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Admins can view contact inquiries"
    ON public.contact_submissions FOR SELECT
    USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can update contact inquiries"
    ON public.contact_submissions FOR UPDATE
    USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
