import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbQueries } from '../db/index.js';
import { config } from '../config.js';

const router = express.Router();

// Middleware to verify Admin JWT or Master Secret
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const adminSecretHeader = req.headers['x-admin-secret'];
  const queryToken = req.query?.token;

  // Check secret header
  if (adminSecretHeader && config.admin.secret && adminSecretHeader === config.admin.secret) {
    return next();
  }

  // Check Bearer token or URL query token
  const token = (authHeader && authHeader.startsWith('Bearer ')) ? authHeader.split(' ')[1] : queryToken;
  if (token && config.admin.secret) {
    try {
      const decoded = jwt.verify(token, config.admin.secret);
      req.adminUser = decoded;
      return next();
    } catch (e) {
      return res.status(401).json({ success: false, error: 'Invalid or expired admin session token.' });
    }
  }

  return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required.' });
}

/**
 * 27. ADMIN LOGIN
 * POST /api/admin/login
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password are required.' });
  }

  const admin = await dbQueries.getAdminByUsername(username.trim());
  if (!admin) {
    return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
  }

  const isPasswordValid = bcrypt.compareSync(password, admin.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
  }

  const token = jwt.sign(
    { adminId: admin.admin_id, username: admin.username, role: admin.role },
    config.admin.secret,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    token,
    user: {
      username: admin.username,
      role: admin.role
    }
  });
});

/**
 * 26. ADMIN DASHBOARD STATS
 * GET /api/admin/stats
 */
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const stats = await dbQueries.getStats();
    res.json({ success: true, stats });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve admin stats.' });
  }
});

/**
 * GET /api/admin/orders
 */
router.get('/orders', requireAdmin, async (req, res) => {
  try {
    const { search } = req.query;
    let orders = await dbQueries.getAllOrders();

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      orders = orders.filter(o => 
        o.order_id.toLowerCase().includes(q) ||
        o.full_name.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.mobile.toLowerCase().includes(q) ||
        (o.razorpay_payment_id && o.razorpay_payment_id.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, orders });
  } catch (err) {
    console.error('Admin orders fetch error:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve orders.' });
  }
});

/**
 * GET /api/admin/tickets
 */
router.get('/tickets', requireAdmin, async (req, res) => {
  try {
    const { search } = req.query;
    let tickets = await dbQueries.getAllTickets();

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      tickets = tickets.filter(t =>
        t.ticket_id.toLowerCase().includes(q) ||
        t.customer_name.toLowerCase().includes(q) ||
        t.qr_identifier.toLowerCase().includes(q) ||
        t.order_id.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, tickets });
  } catch (err) {
    console.error('Admin tickets fetch error:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve tickets.' });
  }
});

/**
 * GET /api/admin/payments
 */
router.get('/payments', requireAdmin, async (req, res) => {
  try {
    const payments = await dbQueries.getAllPayments();
    res.json({ success: true, payments });
  } catch (err) {
    console.error('Admin payments fetch error:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve payment records.' });
  }
});

/**
 * Export Attendee Data to CSV
 * GET /api/admin/export
 */
router.get('/export', requireAdmin, async (req, res) => {
  try {
    const tickets = await dbQueries.getAllTickets();
    
    // Build CSV
    const headers = ['Ticket ID', 'Order ID', 'Customer Name', 'Email', 'Mobile', 'Pass Type', 'Status', 'Check-In Time', 'Created At'];
    const rows = tickets.map(t => [
      `"${t.ticket_id}"`,
      `"${t.order_id}"`,
      `"${(t.customer_name || '').replace(/"/g, '""')}"`,
      `"${t.email || ''}"`,
      `"${t.mobile || ''}"`,
      `"${t.ticket_type}"`,
      `"${t.status}"`,
      `"${t.check_in_time || 'NOT CHECKED IN'}"`,
      `"${t.created_at}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="AFTRHRS_Attendees_Nexora.csv"');
    res.send(csvContent);
  } catch (err) {
    console.error('Admin export error:', err);
    res.status(500).json({ success: false, error: 'Failed to export attendee data.' });
  }
});

export default router;
