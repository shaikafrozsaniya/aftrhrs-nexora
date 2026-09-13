import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'WHAT IS AFTRHRS?',
      a: 'AFTRHRS is a high-energy daytime social music experience produced by Nexora Productions. Tagline: DAYLIGHT DESTROYED. Built around music, movement, food and people — meet new faces, find your people, lose yourself in the music and destroy the daylight.'
    },
    {
      q: 'WHEN IS AFTRHRS?',
      a: 'AFTRHRS takes place on Sunday, 20 September 2026, running from 12:00 PM to 05:00 PM as a high-octane daytime experience.'
    },
    {
      q: 'WHERE IS AFTRHRS?',
      a: 'At OPEN YOUR MOUTH CLUB & KITCHEN, located in Jubilee Hills, Hyderabad, Telangana, India.'
    },
    {
      q: 'IS ALCOHOL PROVIDED?',
      a: 'NO ALCOHOL IS PROVIDED AT THE EVENT. We provide an unlimited spread of handcrafted artisan mocktails (virgin mojitos, blue curacao fizz, berry coolers) and refreshing coolers. The event is focused entirely on clean daytime music, dancing, and socializing.'
    },
    {
      q: 'WHAT IS INCLUDED IN MY PASS?',
      a: 'Your pass includes complete event admission, non-stop DJ sets by Jaedyn, Pradeep, and Komal, the exclusive Spider-Man AV clash, Anyma-style humanoid visuals, UNO Matchmaking games, unlimited vegetarian & non-vegetarian food (featuring Paneer Tikka & Chicken Tikka), and unlimited craft mocktails.'
    },
    {
      q: 'ARE FOOD & MOCKTAILS INCLUDED?',
      a: 'Yes! Unlimited food and refreshing artisan mocktails are 100% included with every single pass experience. Come hungry and thirsty!'
    },
    {
      q: 'WHAT FOOD & BEVERAGES ARE AVAILABLE?',
      a: 'Unlimited live tandoori Paneer Tikka, sizzling Chicken Tikka, crispy party snacks, gourmet sliders, pasta bowls, and unlimited craft mocktails (Virgin Mojito, Blue Curacao Fizz, Berry Coolers) served fresh from 12:00 PM to 5:00 PM.'
    },
    {
      q: 'WHAT PASS OPTIONS ARE AVAILABLE?',
      a: 'Four pass tiers are available: Single Pass (₹1,249), Couple Pass (₹2,449), Group of 5 (₹6,000), and Group of 10 (₹11,000). Prices are transparent with zero hidden fees.'
    },
    {
      q: 'HOW DO I GET MY TICKET?',
      a: 'Once your payment is verified on the backend, a digital ticket containing your unique secure QR code and ticket ID is instantly generated on screen. You can view, save, or download it immediately.'
    },
    {
      q: 'HOW DOES QR CHECK-IN WORK?',
      a: 'When you arrive at the venue, present your digital ticket QR code to event staff at the gate. The staff will scan it using the mobile scanner, validating your entry in real time.'
    },
    {
      q: 'WHAT IF PAYMENT FAILS?',
      a: 'If a payment fails or is interrupted, no charges are processed. You can safely retry checkout. If money was debited from your account without a ticket confirmation, please contact our support team immediately with your transaction reference.'
    },
    {
      q: 'WHO DO I CONTACT?',
      a: 'You can reach Nexora customer support directly by phone at 6304728210 or 9014947885, or reach out via WhatsApp chat for instant assistance.'
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>QUESTIONS & ANSWERS</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-4">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Everything you need to know about passes, entry, and the AFTRHRS experience.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.q}
              className={`cyber-card rounded-2xl border transition-all overflow-hidden ${
                isOpen ? 'border-purple-500/50 bg-[#13111f]/90' : 'border-white/10 bg-[#0c0c12]/80'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-wider">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-gray-300 text-sm leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct support trigger */}
      <div className="mt-12 text-center p-6 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-4">
        <span>Still have questions? Our team is available to help.</span>
        <div className="flex items-center gap-3">
          <a
            href="tel:6304728210"
            className="text-purple-400 hover:text-white font-bold flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>6304728210</span>
          </a>
          <span>•</span>
          <a
            href="tel:9014947885"
            className="text-purple-400 hover:text-white font-bold flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>9014947885</span>
          </a>
        </div>
      </div>
    </section>
  );
}
