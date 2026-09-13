import React from 'react';
import { Eye, Sparkles, MonitorPlay, Zap, Layers, Compass } from 'lucide-react';

export default function VisualsSection() {
  return (
    <section id="visuals" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background neon ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="cyber-card rounded-3xl p-6 sm:p-10 lg:p-14 border border-cyan-500/30 bg-gradient-to-b from-[#0c0f18]/95 via-[#06070c]/95 to-black relative overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)]">
        {/* Top Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSCENDENT STAGE ARCHITECTURE</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none mb-3">
            ANYMA-STYLE IMMERSIVE VISUALS
          </h2>

          <p className="font-heading text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 tracking-[0.2em] uppercase mb-4">
            VISUALS THAT HIT DIFFERENT
          </p>

          <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 mb-6">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">STAGE DESIGN BY</span>
            <span className="font-heading font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-300 uppercase tracking-wider">
              ANDRU VISUALS
            </span>
          </div>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
            “Inspired by the iconic transcendent productions of Anyma and global underground festivals, AFTRHRS pushes stage architecture into an otherworldly dimension with monumental 3D humanoid avatar projections, synchronized laser arrays, and surreal visual motion that captivates the entire room.”
          </p>
        </div>

        {/* Monumental Hero Image: Anyma Visuals (Uploaded Image 5) */}
        <div className="relative aspect-[21/9] sm:aspect-[2/1] w-full rounded-2xl overflow-hidden border border-cyan-500/40 bg-black group mb-10 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
          <img
            src="/assets/anyma-visuals.jpg"
            alt="Anyma Style Monumental 3D Visuals by Andru Visuals"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-110 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

          {/* Holographic scanning overlay & badges */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <span className="text-[10px] sm:text-xs font-black tracking-widest px-3 py-1.5 rounded-full bg-cyan-900/80 border border-cyan-400/50 text-cyan-200 uppercase backdrop-blur-md">
              ANYMA-INSPIRED // MONUMENTAL 3D AVATAR
            </span>
          </div>

          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase font-bold block">
                ANDRU VISUALS LIVE ENGINE
              </span>
              <h3 className="font-heading font-black text-xl sm:text-3xl text-white uppercase">
                BEYOND SOUND // HYPER-REAL AFTERLIFE EXPERIENCE
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-200 bg-black/80 px-3.5 py-1.5 rounded-lg border border-cyan-500/40">
              60 FPS REAL-TIME AUDIO REACTIVITY
            </span>
          </div>
        </div>

        {/* 4 Architectural Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-gray-300">
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-start gap-3">
            <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-heading font-black text-white text-sm uppercase block mb-1">
                3D Digital Avatars
              </span>
              <p className="text-gray-400 text-xs leading-normal">
                Colossal kinetic humanoid figures synchronised with drop transitions and bass swells.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-heading font-black text-white text-sm uppercase block mb-1">
                Golden Beam Flares
              </span>
              <p className="text-gray-400 text-xs leading-normal">
                Coordinated radial light trails and atmospheric haze creating a cathedral of sound.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-start gap-3">
            <Layers className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-heading font-black text-white text-sm uppercase block mb-1">
                Biomechanic Textures
              </span>
              <p className="text-gray-400 text-xs leading-normal">
                Organic floral tendrils and chrome metallic extrusions mutating across the screen.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-start gap-3">
            <MonitorPlay className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-heading font-black text-white text-sm uppercase block mb-1">
                AV Lockstep
              </span>
              <p className="text-gray-400 text-xs leading-normal">
                Every snare hit, sub kick, and riser triggers custom stage lighting cues in real time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
