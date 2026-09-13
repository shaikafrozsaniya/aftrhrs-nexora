import express from 'express';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { dbQueries } from '../db/index.js';
import { config } from '../config.js';

const router = express.Router();

/**
 * 24. DIGITAL TICKET FETCH
 * GET /api/tickets/:ticketId
 */
router.get('/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await dbQueries.getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found.' });
    }

    const qrCodeDataUrl = await QRCode.toDataURL(ticket.qr_identifier, {
      width: 350,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' }
    });

    const ticketConfig = config.ticketTypes[ticket.ticket_type] || {};

    res.json({
      success: true,
      ticket: {
        ...ticket,
        typeName: ticketConfig.name || ticket.ticket_type,
        admitCount: ticketConfig.admitCount || 1,
        event: config.event
      },
      qrCodeDataUrl
    });
  } catch (err) {
    console.error('Ticket fetch error:', err);
    res.status(500).json({ success: false, error: 'Failed to load ticket details.' });
  }
});

/**
 * 25. QR CHECK-IN
 * POST /api/tickets/checkin
 * Staff scans QR code. System checks validity and prevents duplicate check-in.
 */
router.post('/checkin', async (req, res) => {
  try {
    const { qrIdentifier, staffId = 'gate-staff-1' } = req.body;

    if (!qrIdentifier || !qrIdentifier.trim()) {
      return res.status(400).json({
        success: false,
        status: 'INVALID',
        message: '✕ INVALID TICKET: Missing QR Identifier.'
      });
    }

    const ticket = await dbQueries.getTicketByQr(qrIdentifier.trim());

    // Check 1: Ticket exists and associated order was paid
    if (!ticket || ticket.payment_status !== 'PAID') {
      return res.status(200).json({
        success: false,
        status: 'INVALID',
        message: '✕ INVALID TICKET',
        details: 'No verified paid ticket found matching this QR code.'
      });
    }

    // Check 2: Ticket already checked in
    if (ticket.status === 'CHECKED_IN') {
      return res.status(200).json({
        success: false,
        status: 'ALREADY_CHECKED_IN',
        message: '⚠ ALREADY CHECKED IN',
        details: `Ticket was already checked in at ${ticket.check_in_time}`,
        ticket: {
          ticketId: ticket.ticket_id,
          customerName: ticket.customer_name,
          ticketType: ticket.ticket_type,
          checkInTime: ticket.check_in_time
        }
      });
    }

    // Check 3: Active ticket -> Check in successfully
    const checkinId = 'chk_' + crypto.randomBytes(6).toString('hex');
    await dbQueries.recordCheckin({
      checkinId,
      ticketId: ticket.ticket_id,
      staffId
    });

    const ticketConfig = config.ticketTypes[ticket.ticket_type] || {};

    return res.status(200).json({
      success: true,
      status: 'VALID',
      message: '✓ VALID TICKET',
      ticket: {
        ticketId: ticket.ticket_id,
        orderId: ticket.order_id,
        customerName: ticket.customer_name,
        ticketType: ticketConfig.name || ticket.ticket_type,
        admitCount: ticketConfig.admitCount || 1,
        quantity: ticket.quantity,
        total: ticket.total,
        checkInTime: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Checkin error:', err);
    res.status(500).json({ success: false, status: 'ERROR', message: 'Internal check-in validation error.' });
  }
});

export default router;
