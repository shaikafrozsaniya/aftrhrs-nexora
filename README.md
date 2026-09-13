# AFTRHRS — NEXORA PRODUCTIONS
## livw website
### FULL-STACK EVENT WEBSITE + RAZORPAY TEST PAYMENTS + DIGITAL TICKETING + QR SCANNER + ADMIN DASHBOARD

> **Event**: AFTRHRS  
> **Tagline**: DAYLIGHT DESTROYED  
> **Date**: 20 September 2026 (12:00 PM – 05:00 PM IST)  
> **Venue**: OPEN YOUR MOUTH CLUB & KITCHEN, Jubilee Hills, Hyderabad, Telangana, India  
> **Organizer**: Nexora Productions (`@nexora.productions_`)  
> **Sound**: Jaedyn (Bollytech), Pradeep (Telugu / High-Energy Party Music), Spider (Spider-Man Edits + Techno + Afro)  
> **Visuals**: Andru Visuals  
> **Inclusions**: Unlimited Vegetarian & Non-Vegetarian Food included with all passes  
> **Safety Policy**: Safety and responsible conduct are a priority. **NO ALCOHOL IS PROVIDED AT THE EVENT.**

---

## 1. Tech Stack & Architecture

- **Frontend**: React 19, Vite 6, Tailwind CSS v4, Lucide Icons, Canvas-Confetti, HTML5-QRCode Scanner.
- **Backend**: Node.js v24+, Express 4, Helmet (strict CSP for Razorpay), CORS, crypto timingSafeEqual.
- **Payment Gateway**: Razorpay Test Mode with server-side HMAC-SHA256 signature verification & idempotent webhooks.
- **Database**:
  - **Local Zero-Config Mode**: SQLite (`better-sqlite3`) in WAL mode for immediate offline execution.
  - **Production Mode**: PostgreSQL / Supabase supported with SQL migration in `supabase/migrations/01_init.sql`.
- **Security**: Strict secret isolation (Key Secret never leaves backend), JWT Admin Auth, BCrypt password hashing, anti-tampering order pricing.

---

## 2. Pass Tiers & Authoritative Server Pricing

| Pass Tier | Price (INR) | Inclusions |
| :--- | :--- | :--- |
| **SINGLE PASS** | **₹1,249** | Entry for 1 + Unlimited Veg & Non-Veg food + All sets & games |
| **COUPLE PASS** | **₹2,449** | Entry for 2 + Unlimited Veg & Non-Veg food + Express duo entry |
| **GROUP OF 5** | **₹6,000** | Entry for 5 + Unlimited Veg & Non-Veg food + Squad check-in |
| **GROUP OF 10** | **₹11,000** | Entry for 10 + Unlimited Veg & Non-Veg food + VIP entry line |

*Pricing is strictly verified and calculated on the server. The client cannot manipulate the order total.*

---

## 3. Environment Variables

Create `.env` based on `.env.example` in the root folder:

```env
PORT=5001
NODE_ENV=development

# PAYMENT MODE: 'test' for development testing, 'live' for real production transactions
PAYMENT_MODE=test

# RAZORPAY CREDENTIALS (SERVER-SIDE ONLY)
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# PUBLIC KEY EXPOSED TO CLIENT
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here

# DATABASE (Leave empty for instant SQLite mode or supply PostgreSQL URL)
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=

# ADMIN PORTAL CREDENTIALS
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_SECRET=your_admin_jwt_secret_token_key

# VENUE DETAILS
VENUE_NAME=OPEN YOUR MOUTH CLUB & KITCHEN
VENUE_LOCATION=Jubilee Hills, Hyderabad, Telangana, India
VENUE_MAPS_URL=https://maps.google.com/?q=Open+Your+Mouth+Club+and+Kitchen+Jubilee+Hills+Hyderabad
```

---

## 4. How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Automated Test Suite**:
   ```bash
   npm run test:api
   ```

3. **Start Development Servers (Backend + Frontend)**:
   ```bash
   npm run dev
   ```
   - Vite Client: `http://localhost:3000`
   - Express Backend API: `http://localhost:5001`

4. **Production Build & Launch**:
   ```bash
   npm run build
   npm start
   ```
   Access full application at: `http://localhost:5001`

---

## 5. Staff & Admin Portals

- **Staff QR Check-in Scanner**:
  - URL: `http://localhost:5001/#scanner` (or click "Staff QR Scanner" in footer)
  - Features: Uses mobile device camera or webcam with live QR code scanning.
  - Verification states:
    - `✓ VALID TICKET` (green banner + attendee details)
    - `⚠ ALREADY CHECKED IN` (amber warning + previous check-in time)
    - `✕ INVALID TICKET` (red alert for fake or unpaid codes)
  - Manual text code fallback for damaged screens.

- **Admin Dashboard**:
  - URL: `http://localhost:5001/#admin` (or click "Admin Dashboard" in footer)
  - Default Username: Set in `ADMIN_USERNAME`
  - Default Password: Set in `ADMIN_PASSWORD`
  - Features: Live revenue tracking, total tickets sold, payment status breakdown, searchable orders and tickets, one-click attendee data export to CSV.

---

## 6. Razorpay Webhook Configuration

1. Log into your [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Navigate to **Settings** → **Webhooks** → **Add New Webhook**.
3. Set Webhook URL to: `https://your-domain.com/api/payment/webhook`
4. Set Secret to match `RAZORPAY_WEBHOOK_SECRET`.
5. Select active events:
   - `order.paid`
   - `payment.captured`
   - `payment.failed`
6. The backend handler is **strictly idempotent** and prevents duplicate ticket issuance on retries.

---

## 7. Transitioning from TEST to LIVE Mode

Before launching ticket sales to the public:
1. In `.env` on your production server:
   ```env
   PAYMENT_MODE=live
   RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
   VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
   ```
2. Re-run `npm run build` so Vite injects the live key ID into the client bundle.
3. Restart the server with `npm start`.

---

## 8. Customer Support Contacts

- **Helpline 1**: `6304728210` (`tel:6304728210`)
- **Helpline 2**: `9014947885` (`tel:9014947885`)
- **WhatsApp**: Click-to-chat enabled
- **Instagram**: [https://www.instagram.com/nexora.productions_/](https://www.instagram.com/nexora.productions_/)
