import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Camera,
  RefreshCw,
  ArrowLeft,
  ShieldCheck,
  User,
  Ticket,
  Utensils
} from 'lucide-react';

export default function StaffScanner({ onBackToHome }) {
  const [staffId, setStaffId] = useState('gate-staff-1');
  const [manualCode, setManualCode] = useState('');
  const [scannerState, setScannerState] = useState('idle'); // 'scanning', 'processing', 'result'
  const [checkinResult, setCheckinResult] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const html5QrCodeRef = useRef(null);

  const playFeedbackAudio = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'valid') {
        // Happy ascending dual tone
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      } else {
        // Low error buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  const handleVerifyCheckin = async (qrString) => {
    if (!qrString || !qrString.trim()) return;

    setScannerState('processing');

    try {
      const res = await fetch('/api/tickets/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qrIdentifier: qrString.trim(),
          staffId
        })
      });

      const data = await res.json();
      setCheckinResult(data);
      setScannerState('result');

      if (data.status === 'VALID') {
        playFeedbackAudio('valid');
      } else {
        playFeedbackAudio('error');
      }
    } catch (err) {
      console.error('Check-in error:', err);
      setCheckinResult({
        status: 'ERROR',
        message: 'Network error communicating with check-in server.'
      });
      setScannerState('result');
      playFeedbackAudio('error');
    }
  };

  const startCamera = async () => {
    setCameraError('');
    try {
      const qrCode = new Html5Qrcode('qr-reader-container');
      html5QrCodeRef.current = qrCode;

      await qrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          stopCamera();
          handleVerifyCheckin(decodedText);
        },
        () => {}
      );

      setIsCameraActive(true);
      setScannerState('scanning');
    } catch (err) {
      console.error('Camera start error:', err);
      setCameraError('Camera access denied or unavailable. Use manual QR code entry below.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = async () => {
    if (html5QrCodeRef.current && isCameraActive) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (e) {}
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const resetScanner = () => {
    setCheckinResult(null);
    setScannerState('idle');
    setManualCode('');
  };

  return (
    <div className="min-h-screen bg-[#060608] text-gray-100 flex flex-col p-4 sm:p-6 max-w-xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-white font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Scanner</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-gray-400 uppercase">GATE SYSTEM ACTIVE</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center mx-auto mb-2 text-purple-300">
          <QrCode className="w-6 h-6" />
        </div>
        <h1 className="font-heading font-black text-2xl text-white uppercase tracking-wider">
          STAFF QR CHECK-IN
        </h1>
        <p className="text-xs text-purple-300 font-semibold tracking-widest uppercase">
          AFTRHRS • 20 SEPT 2026 • OPEN YOUR MOUTH
        </p>
      </div>

      {/* Staff ID Selector */}
      <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
        <span className="text-gray-400 uppercase font-bold">Staff / Gate ID:</span>
        <input
          type="text"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          className="bg-black/60 border border-white/10 px-3 py-1.5 rounded-lg text-white font-mono text-right text-xs focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Result Display Box */}
      {checkinResult && (
        <div className="mb-6 animate-in zoom-in-95 duration-200">
          {/* VALID TICKET (Instruction 25: ✓ VALID TICKET) */}
          {checkinResult.status === 'VALID' && (
            <div className="p-6 rounded-3xl bg-emerald-950/70 border-2 border-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="font-heading text-2xl font-black text-emerald-300 tracking-wider">
                    ✓ VALID TICKET
                  </h3>
                  <span className="text-[11px] text-emerald-200 font-medium">
                    Entry Approved • Pass Checked In
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs pt-3 border-t border-emerald-500/40">
                <div className="flex justify-between">
                  <span className="text-emerald-300 uppercase">Attendee Name:</span>
                  <span className="font-bold text-white text-sm">{checkinResult.ticket?.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300 uppercase">Pass Type:</span>
                  <span className="font-extrabold text-white">{checkinResult.ticket?.ticketType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300 uppercase">Admit Count:</span>
                  <span className="font-bold text-white">{checkinResult.ticket?.admitCount || 1} Person(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300 uppercase">Ticket ID:</span>
                  <span className="font-mono text-white">{checkinResult.ticket?.ticketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300 uppercase">Food & Bar:</span>
                  <span className="text-emerald-200 font-bold">UNLIMITED FOOD + MOCKTAILS</span>
                </div>
              </div>

              <button
                onClick={resetScanner}
                className="btn-primary w-full py-3 rounded-xl font-heading text-xs font-black uppercase tracking-wider mt-4"
              >
                Scan Next Attendee →
              </button>
            </div>
          )}

          {/* ALREADY CHECKED IN (Instruction 25: ⚠ ALREADY CHECKED IN) */}
          {checkinResult.status === 'ALREADY_CHECKED_IN' && (
            <div className="p-6 rounded-3xl bg-amber-950/70 border-2 border-amber-500 text-white shadow-[0_0_40px_rgba(245,158,11,0.3)]">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <h3 className="font-heading text-2xl font-black text-amber-300 tracking-wider">
                    ⚠ ALREADY CHECKED IN
                  </h3>
                  <span className="text-[11px] text-amber-200 font-medium">
                    Duplicate Entry Detected • Replay Blocked
                  </span>
                </div>
              </div>

              <p className="text-xs text-amber-100 mb-3">
                {checkinResult.details}
              </p>

              <div className="space-y-1.5 text-xs pt-3 border-t border-amber-500/40">
                <div className="flex justify-between">
                  <span className="text-amber-300">Name:</span>
                  <span className="font-bold text-white">{checkinResult.ticket?.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-300">Check-in Timestamp:</span>
                  <span className="font-mono text-amber-200">{checkinResult.ticket?.checkInTime}</span>
                </div>
              </div>

              <button
                onClick={resetScanner}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 font-heading text-xs font-black uppercase tracking-wider mt-4 transition-colors"
              >
                Scan Next Attendee
              </button>
            </div>
          )}

          {/* INVALID TICKET (Instruction 25: ✕ INVALID TICKET) */}
          {checkinResult.status === 'INVALID' && (
            <div className="p-6 rounded-3xl bg-red-950/80 border-2 border-red-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.3)]">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                <div>
                  <h3 className="font-heading text-2xl font-black text-red-300 tracking-wider">
                    ✕ INVALID TICKET
                  </h3>
                  <span className="text-[11px] text-red-200 font-medium">
                    Barcode or QR code not verified
                  </span>
                </div>
              </div>

              <p className="text-xs text-red-200 mb-4">
                {checkinResult.details || 'This QR identifier does not correspond to any verified paid ticket.'}
              </p>

              <button
                onClick={resetScanner}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 font-heading text-xs font-black uppercase tracking-wider transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Camera Live Scanner Container */}
      <div className="cyber-card rounded-3xl p-6 border border-purple-500/30 mb-6 bg-[#0e0e16] text-center">
        <div
          id="qr-reader-container"
          className="w-full max-w-[320px] aspect-square mx-auto rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center relative mb-4"
        >
          {!isCameraActive && (
            <div className="p-6 text-center text-gray-400">
              <Camera className="w-12 h-12 mx-auto mb-2 text-purple-400 opacity-60" />
              <p className="text-xs">Camera is currently paused.</p>
            </div>
          )}
        </div>

        {cameraError && (
          <div className="mb-4 text-xs text-amber-400 bg-amber-950/40 p-2.5 rounded-lg border border-amber-500/30">
            {cameraError}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          {!isCameraActive ? (
            <button
              onClick={startCamera}
              className="btn-primary px-6 py-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>START CAMERA SCANNER</span>
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              <span>STOP CAMERA</span>
            </button>
          )}
        </div>
      </div>

      {/* Manual Code Fallback Lookup */}
      <div className="cyber-card rounded-2xl p-5 border border-white/10 bg-white/5">
        <h4 className="font-heading font-black text-xs text-white uppercase tracking-wider mb-2">
          MANUAL TICKET / QR ENTRY
        </h4>
        <p className="text-[11px] text-gray-400 mb-3">
          If camera is unable to focus on attendee's screen, enter or paste the QR string / Ticket ID below:
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyCheckin(manualCode);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="e.g. AFTRHRS-TKT_12345..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:border-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            VALIDATE
          </button>
        </form>
      </div>
    </div>
  );
}
