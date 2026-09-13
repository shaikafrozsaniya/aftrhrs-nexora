import React from 'react';
import { Zap, Disc3, ShieldAlert, Sparkles, Film, Volume2 } from 'lucide-react';

export default function SpidermanEditsSection() {
  return (
    <section id="spiderman-edits" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Ambient Red/Crimson Cyber Web Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4 backdrop-blur-md">
          <Zap className="w-4 h-4 text-red-400 animate-pulse" />
          <span>EXCLUSIVE AUDIOVISUAL CLASH</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none mb-3">
          SPECIAL SPIDER-MAN EDITS
        </h2>

        <p className="font-heading text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-300 to-red-500 tracking-[0.2em] uppercase mb-4">
          TFI X SPIDER-MAN TAKEOVER
        </p>

        <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
          “Where legendary Telugu Cinema power anthems collide with Spider-Man multiversal themes, heavy techno pressure, and relentless bass drops designed to shake the dancefloor.”
        </p>
      </div>

      {/* Main Feature Banner: TFI X SPIDERMAN (Image 2) */}
      <div className="cyber-card rounded-3xl p-4 sm:p-8 border-2 border-red-500/40 bg-gradient-to-b from-[#140608] via-[#09080c] to-[#120508] relative overflow-hidden mb-10 shadow-[0_0_60px_rgba(239,68,68,0.25)] group">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
          <img
            src="/assets/tfi-spiderman.png"
            alt="TFI X SPIDERMAN"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

          {/* Floating Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <span className="text-[10px] sm:text-xs font-black tracking-widest px-3 py-1.5 rounded-full bg-red-600 text-white uppercase shadow-lg">
              MAIN SHOWCASE // TFI X SPIDER-MAN
            </span>
          </div>

          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase block">
                NEXORA EXCLUSIVE PRODUCTION
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase">
                THE ULTIMATE HEROES MASHUP
              </h3>
            </div>
            <span className="text-xs font-mono text-gray-300 bg-black/80 px-3 py-1.5 rounded-lg border border-red-500/30">
              CUSTOM AFTRHRS EDITS
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Feature Cards (Poster & Spider Logo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Spider-Man Poster */}
        <div className="cyber-card rounded-2xl overflow-hidden border border-red-500/30 bg-[#0d070a] p-6 flex flex-col justify-between group">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-black">
            <img
              src="/assets/spiderman-poster.jpg"
              alt="Special Spider-Man Edits Poster"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-mono tracking-widest text-red-300 font-bold uppercase bg-red-950/80 px-2.5 py-1 rounded border border-red-500/40">
                MULTIVERSE SOUND
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-black text-2xl text-white uppercase mb-2">
              THREE SPIDERS. ONE DANCEFLOOR.
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Experience the special Spider-Man orchestral hooks reimagined with 130 BPM club pressure, stutter edits, and earth-shattering bass drops.
            </p>
          </div>
        </div>

        {/* Card 2: Spider Emblem & Feature Breakdown */}
        <div className="cyber-card rounded-2xl border border-red-500/30 bg-[#0d070a] p-6 flex flex-col justify-between group">
          {/* Zoomed & Hero-Framed 3rd Spider Emblem */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-black/95 flex items-center justify-center p-6 border border-red-500/20 group-hover:border-red-500/50 transition-all">
            {/* Dramatic deep red radial glow behind emblem */}
            <div className="absolute inset-0 bg-red-600/25 blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute w-48 h-48 rounded-full bg-red-500/20 blur-xl pointer-events-none" />
            
            <img
              src="/assets/spiderman-logo.png"
              alt="Spider Emblem"
              className="w-full h-full object-contain scale-110 sm:scale-125 group-hover:scale-135 transition-transform duration-500 filter drop-shadow-[0_0_35px_rgba(239,68,68,0.95)]"
            />

            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-mono tracking-widest text-red-400 font-bold uppercase bg-red-950/90 px-2.5 py-1 rounded border border-red-500/40">
                AFTRHRS ICON
              </span>
            </div>

            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-mono tracking-widest text-red-300 font-bold uppercase bg-red-950/80 px-2.5 py-1 rounded border border-red-500/40">
                DAYLIGHT DESTROYED // EDITS
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-black text-2xl text-white uppercase mb-2">
              BASS-BOOSTED TFI CLASH
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Film className="w-4 h-4 text-red-400 shrink-0" />
                <span>Iconic TFI mass dialogues synced with cinematic drops</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Volume2 className="w-4 h-4 text-red-400 shrink-0" />
                <span>Heavy orchestral techno & hardstyle Spider edits</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Sparkles className="w-4 h-4 text-red-400 shrink-0" />
                <span>Reactive red-laser stage visuals running in lockstep</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
