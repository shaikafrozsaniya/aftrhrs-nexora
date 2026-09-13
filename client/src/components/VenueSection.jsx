import React from 'react';
import { MapPin, Navigation, Calendar, Clock, ExternalLink } from 'lucide-react';

export default function VenueSection({
  venueName = 'OPEN YOUR MOUTH CLUB & KITCHEN',
  venueLocation = 'Jubilee Hills, Hyderabad, Telangana, India',
  mapsUrl = 'https://maps.google.com/?q=Open+Your+Mouth+Club+and+Kitchen+Jubilee+Hills+Hyderabad'
}) {
  return (
    <section id="venue" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="cyber-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-purple-500/30 bg-gradient-to-br from-[#0c0c14] via-[#08070e] to-purple-950/20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              <span>THE DESTINATION</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight mb-2">
              {venueName}
            </h2>

            <p className="font-heading text-lg sm:text-xl text-purple-300 font-bold uppercase tracking-wider mb-6">
              JUBILEE HILLS • HYDERABAD
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
                <Calendar className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">20 SEPTEMBER 2026 (SUNDAY)</span>
                  <span className="text-xs text-gray-400">Mark your calendar for the ultimate daytime takeover</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
                <Clock className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">12:00 PM — 05:00 PM</span>
                  <span className="text-xs text-gray-400">Gates open sharp at 11:30 AM for express check-in</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
                <Navigation className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">{venueLocation}</span>
                  <span className="text-xs text-gray-400">Valet parking & cab drop-off accessible</span>
                </div>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex px-8 py-4 rounded-full text-xs font-black tracking-widest uppercase items-center gap-2 cursor-pointer group"
            >
              <Navigation className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Map Preview Graphic */}
          <div className="relative aspect-video sm:aspect-square max-h-[420px] rounded-2xl overflow-hidden border border-purple-500/40 bg-black flex flex-col justify-between p-6 group">
            {/* Stylized Cyber Map Simulation */}
            <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300">
                GPS: 17.4319° N, 78.4073° E
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>VENUE READY</span>
              </span>
            </div>

            <div className="relative z-10 text-center py-8">
              <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-400 flex items-center justify-center mx-auto text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.7)] animate-bounce">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-black text-xl text-white uppercase mt-4">
                OPEN YOUR MOUTH
              </h4>
              <p className="text-xs text-purple-300 uppercase tracking-widest">
                JUBILEE HILLS • HYDERABAD
              </p>
            </div>

            <div className="relative z-10 flex justify-between items-center text-[11px] text-gray-400 border-t border-white/10 pt-3">
              <span>5 MIN FROM JUBILEE CHECKPOST</span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-white font-semibold underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
