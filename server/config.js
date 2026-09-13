import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from workspace root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || '',
  databaseUrl: process.env.DATABASE_URL || '',
  paymentMode: (process.env.PAYMENT_MODE || 'test').toLowerCase(),
  
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || ''
  },
  
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || '',
    secret: process.env.ADMIN_SECRET || ''
  },
  
  event: {
    id: 'aftrhrs-2026',
    name: 'AFTRHRS',
    tagline: 'DAYLIGHT DESTROYED',
    date: '2026-09-20',
    startTime: '12:00 PM',
    endTime: '05:00 PM',
    venueName: process.env.VENUE_NAME || 'OPEN YOUR MOUTH CLUB & KITCHEN',
    venueLocation: process.env.VENUE_LOCATION || 'Jubilee Hills, Hyderabad, Telangana, India',
    mapsUrl: process.env.VENUE_MAPS_URL || 'https://maps.google.com/?q=Open+Your+Mouth+Club+and+Kitchen+Jubilee+Hills+Hyderabad',
    supportPhones: ['6304728210', '9014947885'],
    instagram: 'https://www.instagram.com/nexora.productions_/'
  },

  // Authoritative Server-Side Pricing Table (INR)
  ticketTypes: {
    single: {
      id: 'single',
      name: 'SINGLE PASS',
      price: 1249,
      description: 'Full daytime access + Unlimited Veg & Non-Veg food + All DJ sets + Activities',
      admitCount: 1
    },
    couple: {
      id: 'couple',
      name: 'COUPLE PASS',
      price: 2449,
      description: 'Entry for 2 + Unlimited Veg & Non-Veg food + All DJ sets + Activities',
      admitCount: 2
    },
    group_5: {
      id: 'group_5',
      name: 'GROUP OF 5',
      price: 6000,
      description: 'Entry for 5 people + Unlimited Veg & Non-Veg food + Reserved entry queue',
      admitCount: 5
    },
    group_10: {
      id: 'group_10',
      name: 'GROUP OF 10',
      price: 11000,
      description: 'Entry for 10 people + Unlimited Veg & Non-Veg food + VIP entry line',
      admitCount: 10
    }
  }
};
