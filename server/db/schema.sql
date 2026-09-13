-- AFTRHRS — NEXORA PRODUCTIONS
-- PostgreSQL / Supabase & SQLite Unified Schema

-- 1. Events Table
CREATE TABLE IF NOT EXISTS events (
  event_id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  event_date VARCHAR(64) NOT NULL,
  venue_name VARCHAR(255) NOT NULL,
  venue_location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Ticket Types Table
CREATE TABLE IF NOT EXISTS ticket_types (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price_inr INTEGER NOT NULL,
  admit_count INTEGER NOT NULL DEFAULT 1,
  description TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS customers (
  customer_id VARCHAR(64) PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(32) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  order_id VARCHAR(64) PRIMARY KEY,
  customer_id VARCHAR(64) NOT NULL,
  ticket_type VARCHAR(64) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  subtotal INTEGER NOT NULL,
  fees INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  payment_status VARCHAR(32) DEFAULT 'PENDING', -- PENDING, PAID, FAILED, CANCELLED
  razorpay_order_id VARCHAR(128),
  razorpay_payment_id VARCHAR(128),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- 5. Payments Table
CREATE TABLE IF NOT EXISTS payments (
  payment_id VARCHAR(64) PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL,
  gateway VARCHAR(32) DEFAULT 'RAZORPAY',
  gateway_payment_id VARCHAR(128),
  gateway_order_id VARCHAR(128),
  status VARCHAR(32) NOT NULL, -- CAPTURED, FAILED, PENDING
  amount INTEGER NOT NULL, -- in INR or paise
  currency VARCHAR(10) DEFAULT 'INR',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- 6. Tickets Table
CREATE TABLE IF NOT EXISTS tickets (
  ticket_id VARCHAR(64) PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL,
  ticket_type VARCHAR(64) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  qr_identifier VARCHAR(128) UNIQUE NOT NULL,
  status VARCHAR(32) DEFAULT 'ACTIVE', -- ACTIVE, CHECKED_IN, CANCELLED
  check_in_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- 7. Check-ins Table
CREATE TABLE IF NOT EXISTS checkins (
  checkin_id VARCHAR(64) PRIMARY KEY,
  ticket_id VARCHAR(64) NOT NULL,
  staff_id VARCHAR(64) DEFAULT 'staff-gate-1',
  check_in_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
);

-- 8. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  admin_id VARCHAR(64) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(32) DEFAULT 'ADMIN',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
