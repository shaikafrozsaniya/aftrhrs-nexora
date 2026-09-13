import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  initialTier = 'single',
  initialQuantity = 1,
  onPaymentSuccess
}) {
  if (!isOpen) return null;

  const ticketPrices = {
    single: { name: 'SINGLE PASS', price: 1249, admit: 1 },
    couple: { name: 'COUPLE PASS', price: 2449, admit: 2 },
    group_5: { name: 'GROUP OF 5', price: 6000, admit: 5 },
    group_10: { name: 'GROUP OF 10', price: 11000, admit: 10 }
  };

  const [ticketType, setTicketType] = useState(initialTier);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusState, setStatusState] = useState(null); // 'creating_order', 'waiting_payment', 'verifying'

  const tierInfo = ticketPrices[ticketType] || ticketPrices.single;
  const subtotal = tierInfo.price * quantity;
  const fees = 0;
  const total = subtotal + fees;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Form Validations
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!agreedTerms) {
      setErrorMessage('You must agree to the event Terms & Conditions and Refund Policy.');
      return;
    }

    try {
      setIsLoading(true);
      setStatusState('creating_order');

      // Step 1: Request authoritative Order ID from backend
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketType,
          quantity,
          fullName: fullName.trim(),
          email: email.trim(),
          mobile: cleanMobile
        })
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment order with server.');
      }

      setStatusState('waiting_payment');

      // If Razorpay API was in local test fallback mode
      if (orderData.isLocalFallback) {
        setStatusState('verifying');
        // Simulate immediate test payment completion
        const fakePaymentId = 'pay_test_' + Math.random().toString(36).substring(2, 12);
        const verifyRes = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.razorpayOrderId,
            razorpay_payment_id: fakePaymentId,
            razorpay_signature: 'test_local_signature',
            order_id: orderData.orderId
          })
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.verified) {
          throw new Error(verifyData.error || 'Test payment verification failed.');
        }

        setIsLoading(false);
        setStatusState(null);
        onClose();
        onPaymentSuccess({
          order: verifyData.order,
          ticket: verifyData.ticket,
          qrCodeDataUrl: verifyData.qrCodeDataUrl,
          customerName: fullName.trim(),
          tierName: tierInfo.name,
          totalAmount: total,
          paymentId: fakePaymentId
        });
        return;
      }

      // Step 2: Initialize Razorpay Checkout
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      const options = {
        key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID || '',
        amount: orderData.amountPaise,
        currency: 'INR',
        name: 'AFTRHRS — NEXORA PRODUCTIONS',
        description: `${tierInfo.name} (Qty: ${quantity})`,
        image: '/assets/nexora-logo.png',
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: fullName.trim(),
          email: email.trim(),
          contact: cleanMobile
        },
        theme: {
          color: '#7928ca'
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            setStatusState(null);
            setErrorMessage('Payment cancelled. You can retry whenever you are ready.');
          }
        },
        handler: async function (response) {
          // Step 3: Server-side Cryptographic Signature Verification
          try {
            setStatusState('verifying');

            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderData.orderId
              })
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.verified) {
              throw new Error(verifyData.error || 'Cryptographic payment verification failed on server.');
            }

            // Success: verified ticket received
            setIsLoading(false);
            setStatusState(null);
            onClose();
            onPaymentSuccess({
              order: verifyData.order,
              ticket: verifyData.ticket,
              qrCodeDataUrl: verifyData.qrCodeDataUrl,
              customerName: fullName.trim(),
              tierName: tierInfo.name,
              totalAmount: total,
              paymentId: response.razorpay_payment_id
            });
          } catch (verifyErr) {
            console.error('Verification error:', verifyErr);
            setIsLoading(false);
            setStatusState(null);
            setErrorMessage(verifyErr.message || 'Payment verification failed on the server.');
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        setIsLoading(false);
        setStatusState(null);
        setErrorMessage(`Payment failed: ${response.error.description || 'Transaction declined.'}`);
      });

      rzpInstance.open();
    } catch (err) {
      console.error('Checkout error:', err);
      setIsLoading(false);
      setStatusState(null);
      setErrorMessage(err.message || 'An unexpected error occurred during checkout.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="cyber-card relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-purple-500/40 bg-[#0c0c12] shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-widest mb-2">
            <Lock className="w-3 h-3" />
            <span>SECURE RAZORPAY CHECKOUT</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            BOOK YOUR PASS
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            20 Sept 2026 • Open Your Mouth Club & Kitchen, Hyderabad
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pass Type Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Pass Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ticketPrices).map(([key, t]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setTicketType(key)}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                    ticketType === key
                      ? 'border-purple-500 bg-purple-900/30 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="font-heading uppercase tracking-wider">{t.name}</div>
                  <div className="text-purple-300 font-bold text-sm">₹{t.price.toLocaleString('en-IN')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg bg-black/50 border border-white/10 text-white font-bold hover:bg-white/10 flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="font-heading font-bold text-white text-base min-w-[1.5rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="w-7 h-7 rounded-lg bg-black/50 border border-white/10 text-white font-bold hover:bg-white/10 flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Attendee Details */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Manish Sharma"
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Price Summary Breakdown */}
          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Pass Type:</span>
              <span className="text-white font-semibold">{tierInfo.name}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Subtotal ({quantity} x ₹{tierInfo.price.toLocaleString('en-IN')}):</span>
              <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Convenience Fees:</span>
              <span className="text-emerald-400 font-semibold">₹0 (Waived)</span>
            </div>
            <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
              <span className="font-heading uppercase">Total Amount:</span>
              <span className="font-heading text-purple-300 text-base">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms-check"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 rounded border-white/20 bg-black/40 text-purple-600 focus:ring-purple-500 cursor-pointer"
            />
            <label htmlFor="terms-check" className="text-[11px] text-gray-400 leading-snug cursor-pointer">
              I agree to the event <span className="text-purple-400 underline">Terms & Conditions</span> and <span className="text-purple-400 underline">Refund/Cancellation Policy</span>. I understand that safety and responsible conduct are a priority, and NO ALCOHOL is provided at the event.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>
                  {statusState === 'creating_order' && 'GENERATING ORDER...'}
                  {statusState === 'waiting_payment' && 'OPENING RAZORPAY...'}
                  {statusState === 'verifying' && 'VERIFYING SIGNATURE...'}
                  {!statusState && 'PROCESSING...'}
                </span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>PROCEED TO PAYMENT (₹{total.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>

          <div className="text-center">
            <span className="text-[10px] text-gray-400">
              Operating in <strong>Razorpay Test Mode</strong>. Cards, UPI and Netbanking simulations accepted.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
