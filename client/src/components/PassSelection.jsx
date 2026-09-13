import React, { useState, useEffect } from 'react';
import { Ticket, Users, Check, Sparkles, ShieldCheck } from 'lucide-react';

export default function PassSelection({ onSelectPass }) {
  // Authoritative default prices matching backend
  const [ticketTiers, setTicketTiers] = useState([
    {
      id: 'single',
      name: 'SINGLE PASS',
      price: 1249,
      tag: 'MOST POPULAR',
      admitCount: 1,
      description: 'Single attendee access + Unlimited Veg & Non-Veg food & mocktails + Full DJ sets + Activities',
      features: [
        'Entry for 1 Person',
        'Unlimited Food & Craft Mocktails',
        'Access to JAEDYN, PRADEEP & KOMAL Sets',
        'UNO Matchmaking & Social Games',
        'Immersive Visual Stage Experience'
      ]
    },
    {
      id: 'couple',
      name: 'COUPLE PASS',
      price: 2449,
      tag: 'DUO ENTRY',
      admitCount: 2,
      description: 'Pair entry + Unlimited Veg & Non-Veg food & mocktails + All DJ sets + Activities for two',
      features: [
        'Entry for 2 People',
        'Unlimited Food & Mocktails for 2',
        'Access to All DJ Performances',
        'Interactive Activities & Photo Zones',
        'Express Duo Entry Line'
      ]
    },
    {
      id: 'group_5',
      name: 'GROUP OF 5',
      price: 6000,
      tag: 'SQUAD VALUE',
      admitCount: 5,
      description: 'Squad entry for 5 + Unlimited Veg & Non-Veg food & mocktails + Group entrance line',
      features: [
        'Entry for 5 People (Save ₹245)',
        'Unlimited Food & Mocktails for 5',
        'Direct Group Check-in',
        'Access to All Stages & Zones',
        'Reserved Group Hangout Area'
      ]
    },
    {
      id: 'group_10',
      name: 'GROUP OF 10',
      price: 11000,
      tag: 'MEGA CREW',
      admitCount: 10,
      description: 'Mega crew pass for 10 + Unlimited Veg & Non-Veg food & mocktails + VIP entry line',
      features: [
        'Entry for 10 People (Save ₹1,490)',
        'Unlimited Food & Mocktails for 10',
        'Dedicated Fast-track Entrance',
        'All DJ Stages & Activities Access',
        'Exclusive Event Welcome Kit'
      ]
    }
  ]);

  const [selectedTier, setSelectedTier] = useState('single');
  const [quantity, setQuantity] = useState(1);
  const [isTestMode, setIsTestMode] = useState(true);

  useEffect(() => {
    // Fetch trusted ticket configuration from server
    fetch('/api/payment/ticket-types')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.ticketTypes) {
          setIsTestMode(data.paymentMode === 'test');
        }
      })
      .catch((err) => {
        console.warn('Using client pricing cache:', err);
      });
  }, []);

  const activeTierObj = ticketTiers.find((t) => t.id === selectedTier) || ticketTiers[0];
  const subtotal = activeTierObj.price * quantity;
  const fees = 0; // Transparent: No hidden convenience fees!
  const total = subtotal + fees;

  const handleCheckout = (tierId) => {
    onSelectPass(tierId, quantity);
  };

  return (
    <section id="passes" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Ticket className="w-3.5 h-3.5 text-purple-400" />
          <span>OFFICIAL TICKETING</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase mb-4">
          CHOOSE YOUR PASS
        </h2>

        <p className="text-gray-300 text-base sm:text-lg font-normal">
          All passes include full event admission, <strong className="text-purple-300">unlimited food, and craft mocktails</strong>. No hidden booking charges.
        </p>

        {isTestMode && (
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/40 text-[11px] font-mono text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>TEST PAYMENT MODE ACTIVE (Razorpay Test Gateway)</span>
          </div>
        )}
      </div>

      {/* 4 Pass Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {ticketTiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`cyber-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer border transition-all duration-300 ${
                isSelected
                  ? 'border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.35)] scale-[1.02] bg-[#141220]/90'
                  : 'border-white/10 hover:border-purple-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 uppercase">
                    {tier.tag}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-semibold">
                    <Users className="w-3.5 h-3.5" />
                    <span>Admit {tier.admitCount}</span>
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-purple-400 font-bold uppercase block mb-1">
                    ENTRY TIER
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                    {tier.name}
                  </h3>
                </div>

                {/* Sleek High-End Price Display */}
                <div className="mb-5 p-3.5 rounded-xl bg-black/50 border border-white/10 group-hover:border-purple-500/40 transition-colors">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-base font-bold text-purple-400">₹</span>
                    <span className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight tabular-nums">
                      {tier.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span>Unlimited Food & Mocktails</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-5">
                  {tier.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTier(tier.id);
                    handleCheckout(tier.id);
                  }}
                  className={`w-full py-3 rounded-xl font-heading text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'btn-primary'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <Ticket className="w-4 h-4" />
                  <span>GET PASS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparent Price Summary Box */}
      <div className="max-w-2xl mx-auto cyber-card rounded-2xl p-6 border border-white/10 bg-[#0e0e15]/90">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-widest block">
              SELECTED PASS
            </span>
            <h4 className="font-heading text-xl sm:text-2xl font-black text-white uppercase mt-0.5">
              {activeTierObj.name}
            </h4>
            <div className="flex items-baseline gap-1 mt-0.5 text-xs text-gray-400 font-mono">
              <span>₹{activeTierObj.price.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-gray-500">/ attendee</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Quantity:</span>
            <div className="flex items-center border border-white/15 rounded-xl overflow-hidden bg-black/40">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-gray-300 hover:text-white hover:bg-white/10 font-bold text-lg"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-white font-heading font-bold text-base min-w-[2.5rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="px-3 py-1.5 text-gray-300 hover:text-white hover:bg-white/10 font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Itemized Price Breakdown */}
        <div className="py-4 space-y-2 text-xs">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal ({quantity} x ₹{activeTierObj.price.toLocaleString('en-IN')})</span>
            <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Convenience / Booking Fees</span>
            <span className="text-emerald-400 font-medium">₹0 (Waived by Nexora)</span>
          </div>
          <div className="flex justify-between items-baseline text-white pt-3 border-t border-white/10">
            <span className="font-heading uppercase tracking-wider text-xs sm:text-sm font-bold text-gray-300">Total Payable</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-sm text-purple-400 font-bold">₹</span>
              <span className="font-mono text-xl sm:text-2xl font-black text-white tabular-nums">
                {total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleCheckout(selectedTier)}
          className="btn-primary w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          <Ticket className="w-4 h-4" />
          <span>PROCEED TO CHECKOUT (₹{total.toLocaleString('en-IN')})</span>
        </button>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Protected with Razorpay 256-bit SSL encryption. Zero card details stored.</span>
        </div>
      </div>
    </section>
  );
}
