import React from 'react';
import { ExternalLink } from 'lucide-react';

function InstagramGlyph({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function FloatingInstagram() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/90 border border-pink-500/40 text-[11px] font-bold text-pink-200 tracking-wider uppercase mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none shadow-xl backdrop-blur-md">
        <span>Follow @nexora.productions_</span>
        <ExternalLink className="w-3 h-3 text-pink-400" />
      </div>

      {/* Floating Glowing Insta Button */}
      <a
        href="https://www.instagram.com/nexora.productions_/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-[0_0_25px_rgba(244,63,94,0.55)] hover:shadow-[0_0_35px_rgba(244,63,94,0.85)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Follow Nexora Productions on Instagram"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 opacity-40 blur-sm group-hover:opacity-80 animate-pulse pointer-events-none" />

        <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center text-white group-hover:bg-transparent transition-colors">
          <InstagramGlyph className="w-6 h-6 text-white filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
        </div>
      </a>
    </div>
  );
}
