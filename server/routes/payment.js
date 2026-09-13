import express from 'express';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { config } from '../config.js';
import { dbQueries } from '../db/index.js';
import { createRazorpayOrder, verifyRazorpaySignature, verifyWebhookSignature } from '../services/razorpay.js';

const router = express.Router();

/**
 * Public route to get trusted ticket types and pricing
 */
router.get('/ticket-types', async (req, res) => {
  try {
    const types = await dbQueries.getTicketTypes();
    res.json({
      success: true,
      ticketTypes: types,
      paymentMode: config.paymentMode,
      keyId: config.razorpay.keyId
    });
  } catch (err) {
    console.error('Error fetching ticket types:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve ticket pricing.' });
  }
});

/**
 * 17. RAZORPAY ORDER CREATION
 * POST /api/payment/create-order
 * Validates inputs, calculates amount on backend (never trusts client amount),
 * creates Razorpay order, stores pending order in DB.
 */
router.post('/create-order', async (req, res) => {
  try {
    const { ticketType, quantity = 1, fullName, email, mobile } = req.body;

    // Validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }
    if (!mobile || mobile.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ success: false, error: 'A valid 10-digit mobile number is required.' });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1 || qty > 20) {
      return res.status(400).json({ success: false, error: 'Quantity must be between 1 and 20.' });
    }

    // Backend is the ONLY source of truth for pricing
    const ticketConfig = config.ticketTypes[ticketType];
    if (!ticketConfig) {
      return res.status(400).json({ success: false, error: `Invalid ticket type: ${ticketType}` });
    }

    const subtotal = ticketConfig.price * qty;
    const fees = 0; // Transparent zero hidden booking fees
    const total = subtotal + fees;
    const amountPaise = total * 100;

    const customerId = 'cust_' + crypto.randomBytes(6).toString('hex');
    const orderId = 'ord_' + crypto.randomBytes(8).toString('hex');

    // Create Razorpay Order
    const rzpOrder = await createRazorpayOrder({
      amountPaise,
      receipt: orderId,
      notes: {
        customerName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        ticketType,
        quantity: qty
      }
    });

    // Save Customer & Order
    await dbQueries.createCustomer({
      customerId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim()
    });

    await dbQueries.createOrder({
      orderId,
      customerId,
      ticketType,
      quantity: qty,
      subtotal,
      fees,
      total,
      currency: 'INR',
      paymentStatus: 'PENDING',
      razorpayOrderId: rzpOrder.id
    });

    // Return only public order info (NEVER secret)
    res.json({
      success: true,
      orderId,
      razorpayOrderId: rzpOrder.id,
      amount: total,
      amountPaise,
      currency: 'INR',
      keyId: config.razorpay.keyId,
      paymentMode: config.paymentMode,
      isLocalFallback: !!rzpOrder.isLocalFallback,
      ticketDetails: {
        name: ticketConfig.name,
        price: ticketConfig.price,
        quantity: qty,
        total
      }
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({
      success: false,
      error: config.nodeEnv === 'production' ? 'Failed to create payment order. Please try again.' : (err.message || 'Order creation failed')
    });
  }
});

/**
 * 19. PAYMENT VERIFICATION
 * POST /api/payment/verify
 * Cryptographically verifies Razorpay signature.
 * ONLY creates ticket if verification succeeds.
 */
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required Razorpay payment verification parameters.'
      });
    }

    // Step 1: Server-side cryptographic HMAC-SHA256 signature check
    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature
    });

    if (!isValid) {
      console.warn(`🚨 FRAUD ALERT / INVALID SIGNATURE: Order ${razorpay_order_id}, Payment ${razorpay_payment_id}`);
      if (order_id) {
        await dbQueries.updateOrderPayment({
          orderId: order_id,
          paymentStatus: 'FAILED',
          razorpayPaymentId: razorpay_payment_id
        });
      }
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Payment verification failed: Signature does not match trusted cryptographic checksum.'
      });
    }

    // Step 2: Retrieve the order
    let order = order_id ? await dbQueries.getOrderById(order_id) : await dbQueries.getOrderByRazorpayOrderId(razorpay_order_id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Associated order not found.' });
    }

    // Idempotency: If already marked PAID, return existing ticket
    if (order.payment_status === 'PAID') {
      const existingTickets = await dbQueries.getTicketsByOrderId(order.order_id);
      const qrData = existingTickets.length > 0 ? existingTickets[0].qr_identifier : null;
      const qrCodeDataUrl = qrData ? await QRCode.toDataURL(qrData, { width: 320, margin: 2, color: { dark: '#000000', light: '#FFFFFF' } }) : null;
      
      return res.json({
        success: true,
        verified: true,
        alreadyProcessed: true,
        order,
        ticket: existingTickets[0],
        qrCodeDataUrl
      });
    }

    // Step 3: Update Order & Payment
    await dbQueries.updateOrderPayment({
      orderId: order.order_id,
      paymentStatus: 'PAID',
      razorpayPaymentId: razorpay_payment_id
    });

    const paymentId = 'pay_' + crypto.randomBytes(8).toString('hex');
    await dbQueries.createPayment({
      paymentId,
      orderId: order.order_id,
      gateway: 'RAZORPAY',
      gatewayPaymentId: razorpay_payment_id,
      gatewayOrderId: razorpay_order_id,
      status: 'CAPTURED',
      amount: order.total,
      currency: order.currency
    });

    // Step 4: Generate Digital Ticket with secure QR identifier (if not already issued)
    const existing = await dbQueries.getTicketsByOrderId(order.order_id);
    let createdTicket;

    if (existing.length > 0) {
      createdTicket = existing[0];
    } else {
      const ticketId = 'TKT_' + crypto.randomBytes(6).toString('hex').toUpperCase();
      const qrIdentifier = `AFTRHRS-${ticketId}-${crypto.randomBytes(8).toString('hex')}`;

      createdTicket = await dbQueries.createTicket({
        ticketId,
        orderId: order.order_id,
        ticketType: order.ticket_type,
        customerName: order.full_name,
        qrIdentifier
      });
    }

    // Generate high-resolution QR code
    const qrText = createdTicket.qr_identifier || createdTicket.qrIdentifier || `AFTRHRS-${order.order_id}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrText, {
      width: 350,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    console.log(`✓ PAYMENT CONFIRMED & TICKET ISSUED: Order ${order.order_id}, Ticket ${createdTicket.ticket_id}, Customer ${order.full_name}`);

    res.json({
      success: true,
      verified: true,
      order: {
        ...order,
        payment_status: 'PAID',
        razorpay_payment_id
      },
      ticket: createdTicket,
      qrCodeDataUrl
    });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ success: false, error: config.nodeEnv === 'production' ? 'Payment verification failed. Please contact support.' : err.message });
  }
});

/**
 * 20. RAZORPAY WEBHOOK
 * POST /api/payment/webhook
 * Verifies webhook signature and idempotently handles payment captures.
 */
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = req.rawBody || JSON.stringify(req.body);

    if (config.razorpay.webhookSecret && !verifyWebhookSignature({ rawBody, signature })) {
      console.warn('⚠️ Webhook signature mismatch.');
      return res.status(400).json({ status: 'invalid_signature' });
    }

    const event = req.body.event;
    console.log(`🔔 Webhook received event: ${event}`);

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = req.body.payload?.payment?.entity;
      const rzpOrderId = paymentEntity?.order_id || req.body.payload?.order?.entity?.id;
      const rzpPaymentId = paymentEntity?.id;

      if (rzpOrderId) {
        const order = await dbQueries.getOrderByRazorpayOrderId(rzpOrderId);
        if (order) {
          if (order.payment_status !== 'PAID') {
            await dbQueries.updateOrderPayment({
              orderId: order.order_id,
              paymentStatus: 'PAID',
              razorpayPaymentId: rzpPaymentId
            });
          }

          const existingTickets = await dbQueries.getTicketsByOrderId(order.order_id);
          if (existingTickets.length === 0) {
            const ticketId = 'TKT_' + crypto.randomBytes(6).toString('hex').toUpperCase();
            const qrIdentifier = `AFTRHRS-${ticketId}-${crypto.randomBytes(8).toString('hex')}`;
            await dbQueries.createTicket({
              ticketId,
              orderId: order.order_id,
              ticketType: order.ticket_type,
              customerName: order.full_name,
              qrIdentifier
            });
            console.log(`✓ Webhook successfully issued ticket for order ${order.order_id}`);
          }
        }
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = req.body.payload?.payment?.entity;
      const rzpOrderId = paymentEntity?.order_id;
      if (rzpOrderId) {
        const order = await dbQueries.getOrderByRazorpayOrderId(rzpOrderId);
        if (order && order.payment_status === 'PENDING') {
          await dbQueries.updateOrderPayment({
            orderId: order.order_id,
            paymentStatus: 'FAILED',
            razorpayPaymentId: paymentEntity?.id || null
          });
          console.log(`⚠️ Webhook marked order ${order.order_id} as FAILED`);
        }
      }
    }

    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ status: 'error', message: 'Webhook processing failed' });
  }
});

export default router;
