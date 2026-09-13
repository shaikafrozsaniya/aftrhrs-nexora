-- AFTRHRS — NEXORA PRODUCTIONS
-- Supabase Migration: 01_init.sql

CREATE TABLE IF NOT EXISTS events (
  event_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  event_date TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  venue_location TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ticket_types (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_inr INTEGER NOT NULL,
  admit_count INTEGER NOT NULL DEFAULT 1,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  customer_id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  order_id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(customer_id),
  ticket_type TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  subtotal INTEGER NOT NULL,
  fees INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_status TEXT DEFAULT 'PENDING',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(order_id),
  gateway TEXT DEFAULT 'RAZORPAY',
  gateway_payment_id TEXT,
  gateway_order_id TEXT,
  status TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tickets (
  ticket_id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(order_id),
  ticket_type TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  qr_identifier TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  check_in_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS checkins (
  checkin_id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL REFERENCES tickets(ticket_id),
  staff_id TEXT DEFAULT 'staff-gate-1',
  check_in_time TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  admin_id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'ADMIN',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning-fast queries
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay ON orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_tickets_qr ON tickets(qr_identifier);
CREATE INDEX IF NOT EXISTS idx_tickets_order ON tickets(order_id);
