import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import { initDB, closeDB } from './db/index.js';
import paymentRouter from './routes/payment.js';
import ticketsRouter from './routes/tickets.js';
import adminRouter from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB schema and initial seeds
await initDB();

const app = express();

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https://checkout.razorpay.com',
          'https://api.razorpay.com'
        ],
        frameSrc: [
          "'self'",
          'https://api.razorpay.com',
          'https://checkout.razorpay.com'
        ],
        connectSrc: [
          "'self'",
          'https://api.razorpay.com',
          'https://lumberjack.razorpay.com',
          'https://lumberjack-cx.razorpay.com'
        ],
        imgSrc: ["'self'", 'data:', 'blob:', 'https://*'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:']
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// Environment-driven CORS configuration
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:3000',
  'http://localhost:5001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5001'
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, same-origin, curl)
      if (!origin) return callback(null, true);
      if (config.nodeEnv !== 'production') return callback(null, true);
      if (allowedOrigins.some(o => origin === o || origin.endsWith(o.replace(/^https?:\/\//, '')))) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true
  })
);

// Retain raw body for Razorpay webhook cryptographic verification
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  }
  next();
});

// API Routes
app.use('/api/payment', paymentRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/admin', adminRouter);

// System Health Check (useful for cloud platforms like Render, Railway, AWS)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'AFTRHRS Ticketing Platform',
    organizer: 'NEXORA PRODUCTIONS',
    paymentMode: config.paymentMode,
    isTestMode: config.paymentMode === 'test',
    timestamp: new Date().toISOString()
  });
});

// Serve Vite frontend in production
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// SPA Client-side routing fallback (never intercepts /api)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  const indexHtml = path.resolve(distPath, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.status(200).send(`
        <html>
          <body style="background:#070709; color:#fff; font-family:sans-serif; text-align:center; padding:50px;">
            <h1 style="color:#a855f7;">AFTRHRS Backend API Server Running</h1>
            <p>Payment Mode: <strong>${config.paymentMode.toUpperCase()}</strong></p>
            <p>Please run <code>npm run build</code> to compile the client application.</p>
          </body>
        </html>
      `);
    }
  });
});

// Production-safe global error handler (never leaks stack traces in production)
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.message || err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    success: false,
    error: config.nodeEnv === 'production' ? 'An unexpected internal error occurred.' : (err.message || 'Internal server error')
  });
});

// Start Server on 0.0.0.0 for cloud hosting compatibility
const server = app.listen(config.port, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(`🚀 AFTRHRS BACKEND RUNNING ON http://0.0.0.0:${config.port}`);
  console.log(`🛡️  PAYMENT MODE: ${config.paymentMode.toUpperCase()}`);
  console.log(`🎫 EVENT: 20 September 2026 @ Open Your Mouth, Hyderabad`);
  console.log('====================================================');
});

// Graceful Shutdown
const handleShutdown = async (signal) => {
  console.log(`\nReceived ${signal}, closing server and database...`);
  server.close(async () => {
    await closeDB();
    console.log('Server and database gracefully closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
