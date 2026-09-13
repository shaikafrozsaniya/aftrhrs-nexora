import Database from 'better-sqlite3';
import pg from 'pg';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isPostgres = Boolean(config.databaseUrl && config.databaseUrl.trim());

let sqliteDb = null;
let pgPool = null;

if (isPostgres) {
  const isLocalPg = config.databaseUrl.includes('localhost') || config.databaseUrl.includes('127.0.0.1');
  pgPool = new Pool({
    connectionString: config.databaseUrl,
    ssl: isLocalPg ? false : { rejectUnauthorized: false }
  });
} else {
  const dbPath = path.resolve(__dirname, '../../aftrhrs.db');
  sqliteDb = new Database(dbPath);
  sqliteDb.pragma('journal_mode = WAL');
}

/**
 * Converts standard '?' parameter placeholders to PostgreSQL '$1, $2...' positional placeholders.
 */
function convertSqlForPostgres(sql) {
  let paramIndex = 1;
  return sql.replace(/\?/g, () => `$${paramIndex++}`);
}

/**
 * Universal Query Helpers
 */
async function queryAll(sql, params = []) {
  if (isPostgres) {
    const res = await pgPool.query(convertSqlForPostgres(sql), params);
    return res.rows;
  }
  return sqliteDb.prepare(sql).all(...params);
}

async function queryOne(sql, params = []) {
  if (isPostgres) {
    const res = await pgPool.query(convertSqlForPostgres(sql), params);
    return res.rows[0];
  }
  return sqliteDb.prepare(sql).get(...params);
}

async function execute(sql, params = []) {
  if (isPostgres) {
    return await pgPool.query(convertSqlForPostgres(sql), params);
  }
  return sqliteDb.prepare(sql).run(...params);
}

// Initialize database schema and initial seed data
export async function initDB() {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

  if (isPostgres) {
    await pgPool.query(schemaSql);
  } else {
    sqliteDb.exec(schemaSql);
  }

  // Seed Event
  const checkEvent = await queryOne('SELECT COUNT(*) as count FROM events');
  if (Number(checkEvent?.count || 0) === 0) {
    await execute(
      `INSERT INTO events (event_id, name, tagline, event_date, venue_name, venue_location)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        config.event.id,
        config.event.name,
        config.event.tagline,
        config.event.date,
        config.event.venueName,
        config.event.venueLocation
      ]
    );
  }

  // Seed Ticket Types
  const checkTickets = await queryOne('SELECT COUNT(*) as count FROM ticket_types');
  if (Number(checkTickets?.count || 0) === 0) {
    for (const t of Object.values(config.ticketTypes)) {
      await execute(
        `INSERT INTO ticket_types (id, name, price_inr, admit_count, description, is_active)
         VALUES (?, ?, ?, ?, ?, 1)`,
        [t.id, t.name, t.price, t.admitCount, t.description]
      );
    }
  }

  // Seed Admin Account
  if (config.admin.username && config.admin.password) {
    const checkAdmin = await queryOne('SELECT COUNT(*) as count FROM admins WHERE username = ?', [config.admin.username]);
    if (Number(checkAdmin?.count || 0) === 0) {
      const hash = bcrypt.hashSync(config.admin.password, 10);
      await execute(
        `INSERT INTO admins (admin_id, username, password_hash, role)
         VALUES (?, ?, ?, 'ADMIN')`,
        ['admin-root-1', config.admin.username, hash]
      );
    }
  }

  console.log(`✓ Database initialized and seeded successfully (${isPostgres ? 'PostgreSQL' : 'SQLite'}).`);
}

/**
 * Graceful Database Teardown
 */
export async function closeDB() {
  if (isPostgres && pgPool) {
    await pgPool.end();
  } else if (sqliteDb) {
    sqliteDb.close();
  }
}

// Queries
export const dbQueries = {
  getTicketTypes: async () => {
    return await queryAll('SELECT * FROM ticket_types WHERE is_active = 1');
  },

  getTicketTypeById: async (id) => {
    return await queryOne('SELECT * FROM ticket_types WHERE id = ?', [id]);
  },

  createCustomer: async ({ customerId, fullName, email, mobile }) => {
    await execute(
      `INSERT INTO customers (customer_id, full_name, email, mobile)
       VALUES (?, ?, ?, ?)`,
      [customerId, fullName, email, mobile]
    );
    return { customerId, fullName, email, mobile };
  },

  createOrder: async ({ orderId, customerId, ticketType, quantity, subtotal, fees, total, currency, paymentStatus, razorpayOrderId }) => {
    await execute(
      `INSERT INTO orders (order_id, customer_id, ticket_type, quantity, subtotal, fees, total, currency, payment_status, razorpay_order_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, customerId, ticketType, quantity, subtotal, fees, total, currency || 'INR', paymentStatus || 'PENDING', razorpayOrderId]
    );
    return { orderId, customerId, ticketType, quantity, subtotal, fees, total, paymentStatus };
  },

  getOrderByRazorpayOrderId: async (razorpayOrderId) => {
    return await queryOne(
      `SELECT o.*, c.full_name, c.email, c.mobile
       FROM orders o
       JOIN customers c ON o.customer_id = c.customer_id
       WHERE o.razorpay_order_id = ?`,
      [razorpayOrderId]
    );
  },

  getOrderById: async (orderId) => {
    return await queryOne(
      `SELECT o.*, c.full_name, c.email, c.mobile
       FROM orders o
       JOIN customers c ON o.customer_id = c.customer_id
       WHERE o.order_id = ?`,
      [orderId]
    );
  },

  updateOrderPayment: async ({ orderId, paymentStatus, razorpayPaymentId }) => {
    await execute(
      `UPDATE orders
       SET payment_status = ?, razorpay_payment_id = ?
       WHERE order_id = ?`,
      [paymentStatus, razorpayPaymentId, orderId]
    );
  },

  createPayment: async ({ paymentId, orderId, gateway, gatewayPaymentId, gatewayOrderId, status, amount, currency }) => {
    await execute(
      `INSERT INTO payments (payment_id, order_id, gateway, gateway_payment_id, gateway_order_id, status, amount, currency)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [paymentId, orderId, gateway || 'RAZORPAY', gatewayPaymentId, gatewayOrderId, status, amount, currency || 'INR']
    );
  },

  createTicket: async ({ ticketId, orderId, ticketType, customerName, qrIdentifier }) => {
    await execute(
      `INSERT INTO tickets (ticket_id, order_id, ticket_type, customer_name, qr_identifier, status)
       VALUES (?, ?, ?, ?, ?, 'ACTIVE')`,
      [ticketId, orderId, ticketType, customerName, qrIdentifier]
    );
    return {
      ticket_id: ticketId,
      ticketId,
      order_id: orderId,
      orderId,
      ticket_type: ticketType,
      ticketType,
      customer_name: customerName,
      customerName,
      qr_identifier: qrIdentifier,
      qrIdentifier,
      status: 'ACTIVE'
    };
  },

  getTicketsByOrderId: async (orderId) => {
    return await queryAll('SELECT * FROM tickets WHERE order_id = ?', [orderId]);
  },

  getTicketById: async (ticketId) => {
    return await queryOne(
      `SELECT t.*, o.razorpay_payment_id, o.created_at as order_date
       FROM tickets t
       JOIN orders o ON t.order_id = o.order_id
       WHERE t.ticket_id = ?`,
      [ticketId]
    );
  },

  getTicketByQr: async (qrIdentifier) => {
    return await queryOne(
      `SELECT t.*, o.payment_status, o.total, o.quantity, o.created_at as order_date
       FROM tickets t
       JOIN orders o ON t.order_id = o.order_id
       WHERE t.qr_identifier = ?`,
      [qrIdentifier]
    );
  },

  recordCheckin: async ({ checkinId, ticketId, staffId }) => {
    if (isPostgres) {
      const client = await pgPool.connect();
      try {
        await client.query('BEGIN');
        await client.query(
          `UPDATE tickets SET status = 'CHECKED_IN', check_in_time = CURRENT_TIMESTAMP WHERE ticket_id = $1`,
          [ticketId]
        );
        await client.query(
          `INSERT INTO checkins (checkin_id, ticket_id, staff_id) VALUES ($1, $2, $3)`,
          [checkinId, ticketId, staffId || 'staff-gate-1']
        );
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } else {
      const txn = sqliteDb.transaction(() => {
        sqliteDb.prepare(`
          UPDATE tickets
          SET status = 'CHECKED_IN', check_in_time = CURRENT_TIMESTAMP
          WHERE ticket_id = ?
        `).run(ticketId);

        sqliteDb.prepare(`
          INSERT INTO checkins (checkin_id, ticket_id, staff_id)
          VALUES (?, ?, ?)
        `).run(checkinId, ticketId, staffId || 'staff-gate-1');
      });
      txn();
    }
  },

  getAdminByUsername: async (username) => {
    return await queryOne('SELECT * FROM admins WHERE username = ?', [username]);
  },

  getStats: async () => {
    const revenue = await queryOne(`
      SELECT COALESCE(SUM(total), 0) as total_revenue, COUNT(*) as total_orders
      FROM orders
      WHERE payment_status = 'PAID'
    `);

    const ticketsSold = await queryOne(`
      SELECT COALESCE(SUM(quantity), 0) as count
      FROM orders
      WHERE payment_status = 'PAID'
    `);

    const statusCounts = await queryAll(`
      SELECT payment_status, COUNT(*) as count
      FROM orders
      GROUP BY payment_status
    `);

    const checkinsCount = await queryOne(`
      SELECT COUNT(*) as count FROM checkins
    `);

    const totalTicketsGenerated = await queryOne(`
      SELECT COUNT(*) as count FROM tickets
    `);

    const tiersSales = await queryAll(`
      SELECT ticket_type, COUNT(*) as orders_count, SUM(quantity) as tickets_count, SUM(total) as revenue
      FROM orders
      WHERE payment_status = 'PAID'
      GROUP BY ticket_type
    `);

    return {
      revenue: Number(revenue?.total_revenue || 0),
      totalOrders: Number(revenue?.total_orders || 0),
      ticketsSold: Number(ticketsSold?.count || 0),
      checkins: Number(checkinsCount?.count || 0),
      totalTicketsGenerated: Number(totalTicketsGenerated?.count || 0),
      statusBreakdown: (statusCounts || []).map(s => ({ ...s, count: Number(s.count) })),
      tierBreakdown: (tiersSales || []).map(t => ({
        ...t,
        orders_count: Number(t.orders_count || 0),
        tickets_count: Number(t.tickets_count || 0),
        revenue: Number(t.revenue || 0)
      }))
    };
  },

  getAllOrders: async () => {
    return await queryAll(`
      SELECT o.*, c.full_name, c.email, c.mobile
      FROM orders o
      JOIN customers c ON o.customer_id = c.customer_id
      ORDER BY o.created_at DESC
    `);
  },

  getAllTickets: async () => {
    return await queryAll(`
      SELECT t.*, o.payment_status, o.total, o.customer_id, c.email, c.mobile
      FROM tickets t
      JOIN orders o ON t.order_id = o.order_id
      JOIN customers c ON o.customer_id = c.customer_id
      ORDER BY t.created_at DESC
    `);
  },

  getAllPayments: async () => {
    return await queryAll(`
      SELECT p.*, o.ticket_type, c.full_name
      FROM payments p
      JOIN orders o ON p.order_id = o.order_id
      JOIN customers c ON o.customer_id = c.customer_id
      ORDER BY p.created_at DESC
    `);
  }
};
