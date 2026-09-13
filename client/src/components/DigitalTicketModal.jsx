import React, { useEffect } from 'react';
import { X, Download, Printer, CheckCircle, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DigitalTicketModal({ isOpen, onClose, ticketData }) {
  if (!isOpen || !ticketData) return null;

  useEffect(() => {
    // Fire festive neon celebration confetti on payment success!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b']
      });
    } catch (e) {}
  }, []);

  const {
    ticket,
    order,
    qrCodeDataUrl,
    customerName,
    tierName,
    totalAmount,
    paymentId
  } = ticketData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-md my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Banner */}
        <div className="mb-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-2 text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl font-black text-white uppercase tracking-wider">
            PASS CONFIRMED!
          </h3>
          <p className="text-xs text-gray-400">
            Payment verified successfully. Present this QR at the gate.
          </p>
        </div>

        {/* Printable Ticket Card */}
        <div
          id="printable-ticket"
          className="cyber-card rounded-3xl p-6 sm:p-8 border-2 border-purple-500/50 bg-[#0c0c14] shadow-[0_0_50px_rgba(168,85,247,0.3)] relative overflow-hidden"
        >
          {/* Top Notch Cutouts for Ticket Look */}
          <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-black border border-purple-500/40" />
          <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-black border border-purple-500/40" />

          {/* Ticket Header */}
          <div className="flex items-center justify-between pb-5 border-b border-dashed border-purple-500/30">
            <div className="flex items-center gap-3">
              <img
                src="/assets/nexora-logo.png"
                alt="Nexora"
                className="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              />
              <div>
                <span className="text-[10px] tracking-[0.25em] text-purple-400 font-extrabold uppercase block">
                  NEXORA PRODUCTIONS
                </span>
                <h4 className="font-heading text-2xl font-black text-white uppercase tracking-tight -mt-1">
                  AFTRHRS
                </h4>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold uppercase">
              {ticket?.status || 'ACTIVE'}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="font-heading text-xs font-black tracking-[0.3em] text-red-500 uppercase">
              DAYLIGHT DESTROYED
            </span>
          </div>

          {/* QR Code Container */}
          <div className="my-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-black shadow-inner">
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt="Ticket QR Code"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-gray-100 text-xs font-mono text-gray-500">
                Generating QR...
              </div>
            )}
            <span className="text-[10px] font-mono tracking-wider text-gray-700 mt-2 font-bold uppercase">
              TICKET ID: {ticket?.ticket_id || 'TKT-PENDING'}
            </span>
          </div>

          {/* Ticket Details Grid */}
          <div className="space-y-3 pt-4 border-t border-dashed border-purple-500/30 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400 uppercase font-semibold">ATTENDEE</span>
              <span className="text-white font-bold">{customerName || ticket?.customer_name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400 uppercase font-semibold">PASS TYPE</span>
              <span className="text-purple-300 font-extrabold">{tierName || ticket?.ticket_type}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400 uppercase font-semibold">QUANTITY</span>
              <span className="text-white font-bold">{order?.quantity || 1} Person(s)</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400 uppercase font-semibold">ORDER ID</span>
              <span className="font-mono text-gray-300">{order?.order_id || ticket?.order_id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400 uppercase font-semibold">FOOD & BAR</span>
              <span className="text-emerald-400 font-bold uppercase">UNLIMITED FOOD & MOCKTAILS</span>
            </div>
          </div>

          {/* Event Venue & Date */}
          <div className="mt-5 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1 text-[11px] text-gray-300">
            <div className="flex items-center gap-2 text-white font-bold">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>20 SEPTEMBER 2026 • SUNDAY</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>12:00 PM — 05:00 PM DAY PARTY</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              <span>OPEN YOUR MOUTH CLUB & KITCHEN, JUBILEE HILLS, HYDERABAD</span>
            </div>
          </div>

          {/* Bottom Security Notice */}
          <div className="mt-4 text-center">
            <span className="text-[10px] text-gray-400 font-medium">
              * Non-transferable. Valid government ID required at entry.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handlePrint}
            className="btn-primary py-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PASS</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl text-xs font-bold tracking-wider uppercase border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4 text-purple-400" />
            <span>PRINT PASS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
