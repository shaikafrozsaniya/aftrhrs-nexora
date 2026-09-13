import React from 'react';
import { Phone, ShieldCheck, Ticket, QrCode, Lock, ExternalLink, Heart } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer({ onOpenPasses, onNavigateAdmin, onNavigateScanner }) {
  return (
    <footer className="border-t border-white/10 bg-[#040406] text-gray-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Instagram Callout Banner (Instruction 29) */}
        <div className="mb-16 cyber-card p-8 sm:p-10 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-black to-fuchsia-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-[11px] font-extrabold tracking-[0.25em] text-purple-400 uppercase block mb-1">
              FOLLOW THE MOVEMENT
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              @nexora.productions_
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Follow us on Instagram for lineup updates, artist drops, and behind-the-scenes teasers.
            </p>
          </div>

          <a
            href="https://www.instagram.com/nexora.productions_/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2.5 shrink-0 hover:scale-105 transition-transform"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>FOLLOW NEXORA</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/nexora-logo.png"
                alt="Nexora Productions"
                className="w-9 h-9 object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              />
              <div>
                <span className="font-heading font-black text-white text-base tracking-[0.2em] block">
                  NEXORA PRODUCTIONS
                </span>
                <span className="text-[10px] text-purple-400 tracking-[0.25em] font-extrabold uppercase block -mt-1">
                  AFTRHRS // DAYLIGHT DESTROYED
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              20 SEPTEMBER 2026 • HYDERABAD<br />
              OPEN YOUR MOUTH CLUB & KITCHEN, JUBILEE HILLS.<br />
              A high-octane daytime experience built around music, food, movement, and people.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenPasses}
                className="btn-primary text-xs px-5 py-2.5 rounded-full inline-flex items-center gap-2"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>GET YOUR PASS FROM ₹1,249</span>
              </button>
            </div>
          </div>

          {/* Customer Support Col */}
          <div>
            <h4 className="font-heading font-black text-xs text-white uppercase tracking-widest mb-4">
              CUSTOMER SUPPORT
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="tel:6304728210"
                  className="hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>Call 6304728210</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:9014947885"
                  className="hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>Call 9014947885</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/916304728210?text=Hi%20Nexora,%20I%20have%20a%20question%20about%20AFTRHRS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>WhatsApp Direct Chat</span>
                </a>
              </li>
              <li className="pt-2 text-[11px] text-gray-400">
                NO ALCOHOL IS PROVIDED AT THE EVENT.
              </li>
            </ul>
          </div>

          {/* Quick Links & Internal Portals */}
          <div>
            <h4 className="font-heading font-black text-xs text-white uppercase tracking-widest mb-4">
              EVENT & PORTALS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#experience" className="hover:text-purple-400 transition-colors">
                  Experience & Activities
                </a>
              </li>
              <li>
                <a href="#lineup" className="hover:text-purple-400 transition-colors">
                  DJ Lineup & Sound
                </a>
              </li>
              <li>
                <a href="#food" className="hover:text-purple-400 transition-colors">
                  Unlimited Food Info
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-purple-400 transition-colors">
                  FAQ & Entry Rules
                </a>
              </li>
              <li className="pt-3 border-t border-white/10">
                <button
                  onClick={onNavigateScanner}
                  className="text-purple-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Staff QR Scanner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateAdmin}
                  className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <div>
            © 2026 NEXORA PRODUCTIONS. All rights reserved. AFTRHRS — DAYLIGHT DESTROYED.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
