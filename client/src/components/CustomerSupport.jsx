import React, { useState } from 'react';
import { Phone, MessageSquare, HelpCircle, X, Headphones, Sparkles } from 'lucide-react';

export default function CustomerSupport() {
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  return (
    <>
      {/* Static Section in Page */}
      <section id="support" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
        <div className="cyber-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 bg-gradient-to-r from-[#12101f] via-[#090812] to-[#120f24] text-center relative overflow-hidden shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-purple-900/40 border border-purple-400/30 flex items-center justify-center mx-auto mb-4 text-purple-300">
            <Headphones className="w-7 h-7" />
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
            NEED HELP?
          </h2>

          <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto font-normal">
            “Questions about passes, payments or the event?”
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:6304728210"
              className="btn-primary px-6 py-3.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>CALL 6304728210</span>
            </a>

            <a
              href="tel:9014947885"
              className="btn-primary px-6 py-3.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>CALL 9014947885</span>
            </a>

            <a
              href="https://wa.me/916304728210?text=Hi%20Nexora%20Productions,%20I%20have%20a%20query%20regarding%20AFTRHRS%20Daylight%20Destroyed%20passes."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP SUPPORT</span>
            </a>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            Dedicated team available daily • Rapid payment assistance & pass troubleshooting
          </div>
        </div>
      </section>

      {/* Floating Mobile / Desktop Quick Support Button */}
      <div className="fixed bottom-6 left-6 z-40">
        {isFloatingOpen && (
          <div className="cyber-card mb-3 p-5 rounded-2xl border border-purple-500/50 bg-[#0c0c14] shadow-2xl w-72 animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-purple-400" />
                <span className="font-heading font-black text-xs text-white uppercase tracking-wider">
                  NEXORA SUPPORT
                </span>
              </div>
              <button
                onClick={() => setIsFloatingOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-gray-400 mb-3">
              Have questions regarding pass booking, venue, or payments?
            </p>

            <div className="space-y-2">
              <a
                href="tel:6304728210"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 6304728210</span>
              </a>

              <a
                href="tel:9014947885"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 9014947885</span>
              </a>

              <a
                href="https://wa.me/916304728210?text=Hi%20Nexora,%20I%20have%20a%20question%20about%20AFTRHRS%20passes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsFloatingOpen(!isFloatingOpen)}
          className="btn-primary px-4 py-3.5 rounded-full text-xs font-black tracking-widest flex items-center gap-2 shadow-[0_0_30px_rgba(147,51,234,0.6)] cursor-pointer"
          aria-label="Need Help Support"
        >
          <HelpCircle className="w-4 h-4" />
          <span>NEED HELP?</span>
        </button>
      </div>
    </>
  );
}
