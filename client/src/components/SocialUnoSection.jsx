import React from 'react';
import { Users2, HeartHandshake, Sparkles, Smile, ShieldCheck, Gamepad2 } from 'lucide-react';

export default function SocialUnoSection() {
  return (
    <section id="activities" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* 14. Social Experience Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-[0.25em] text-purple-400 uppercase">
          COMMUNITY & CONNECTION
        </span>
        <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mt-2 mb-3 uppercase">
          MEET. MINGLE. VIBE.
        </h2>
        <p className="font-heading text-xl text-purple-300 font-bold tracking-wider italic mb-6">
          “Come with your people. Leave knowing more.”
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-300 max-w-2xl mx-auto">
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
            <Users2 className="w-4 h-4 text-purple-400" />
            <span>Meet New People</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
            <HeartHandshake className="w-4 h-4 text-purple-400" />
            <span>Socialise Freely</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Make New Connections</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Dance Non-stop</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
            <span>Enjoy Curated Music</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
            <Smile className="w-4 h-4 text-purple-400" />
            <span>Interactive Games</span>
          </div>
        </div>
      </div>

      {/* 15. Real UNO Matchmaking Showcase Card */}
      <div className="cyber-card max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-14 border border-purple-500/30 bg-gradient-to-br from-[#130f24] via-[#090812] to-[#150a1f] relative overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.2)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/50 border border-purple-400/40 text-purple-300 text-xs font-bold tracking-widest uppercase mb-4">
              <Gamepad2 className="w-4 h-4 text-purple-400" />
              <span>THE AFTRHRS SIGNATURE SOCIAL GAME</span>
            </div>

            <h3 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-2">
              UNO MATCHMAKING
            </h3>

            <p className="font-heading text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-400 font-extrabold uppercase tracking-widest mb-4">
              SINGLES, THIS ONE'S FOR YOU.
            </p>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              “An UNO-based social game designed to help singles meet and mingle.”
            </p>

            {/* How it works simple 3 steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-left">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                <span className="font-mono text-purple-400 font-bold text-xs">STEP 01</span>
                <p className="text-xs text-gray-300 mt-1">Receive an authentic color card at the social zone.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                <span className="font-mono text-yellow-400 font-bold text-xs">STEP 02</span>
                <p className="text-xs text-gray-300 mt-1">Find your matching number or color across the crowd.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                <span className="font-mono text-emerald-400 font-bold text-xs">STEP 03</span>
                <p className="text-xs text-gray-300 mt-1">Break the ice, grab food together, and vibe to the music!</p>
              </div>
            </div>

            {/* Crucial Disclaimers */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Participation in the UNO Matchmaking activity is 100% optional. Designed purely as a lighthearted social icebreaker. No romantic outcomes are guaranteed.
              </span>
            </div>
          </div>

          {/* Real UNO Cards Stack Visual Artwork */}
          <div className="relative w-72 h-80 sm:w-80 sm:h-96 shrink-0 flex items-center justify-center select-none">
            {/* Ambient colorful card glows */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-yellow-500/20 to-blue-600/20 rounded-full blur-2xl pointer-events-none" />

            {/* Card 1: Blue UNO Card (Reverse) */}
            <div className="absolute w-40 h-60 sm:w-44 sm:h-64 rounded-2xl bg-[#0055A5] border-[3px] border-white shadow-2xl -rotate-16 transform -translate-x-12 -translate-y-2 flex flex-col justify-between p-3.5 hover:rotate-0 transition-transform duration-300 group/card1">
              <span className="font-heading font-black text-lg text-white">↺</span>
              <div className="w-28 h-40 sm:w-32 sm:h-44 mx-auto rounded-[50%] bg-white -rotate-30 flex items-center justify-center shadow-inner">
                <span className="font-heading font-black text-3xl sm:text-4xl text-[#0055A5] rotate-30">↺</span>
              </div>
              <span className="font-heading font-black text-lg text-white text-right">↺</span>
            </div>

            {/* Card 2: Green UNO Card (7) */}
            <div className="absolute w-40 h-60 sm:w-44 sm:h-64 rounded-2xl bg-[#55AA00] border-[3px] border-white shadow-2xl rotate-6 transform translate-x-6 translate-y-4 flex flex-col justify-between p-3.5 hover:rotate-12 transition-transform duration-300 group/card2">
              <span className="font-heading font-black text-lg text-white">7</span>
              <div className="w-28 h-40 sm:w-32 sm:h-44 mx-auto rounded-[50%] bg-white -rotate-30 flex items-center justify-center shadow-inner">
                <span className="font-heading font-black text-4xl sm:text-5xl text-[#55AA00] rotate-30">7</span>
              </div>
              <span className="font-heading font-black text-lg text-white text-right">7</span>
            </div>

            {/* Card 3: Red UNO Card (Main Front: Draw 4 Wild) */}
            <div className="absolute w-44 h-64 sm:w-48 sm:h-72 rounded-2xl bg-[#E61B23] border-[4px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.8)] -rotate-3 transform translate-y-0 z-20 flex flex-col justify-between p-4 hover:scale-105 transition-transform duration-300">
              <div className="flex justify-between items-center text-white">
                <span className="font-heading font-black text-xl">+4</span>
                <span className="text-[10px] font-mono tracking-widest bg-black/40 px-2 py-0.5 rounded font-bold">WILD</span>
              </div>

              {/* Iconic Center Oval with 4 Quad Colors */}
              <div className="w-32 h-44 sm:w-36 sm:h-48 mx-auto rounded-[50%] bg-white -rotate-30 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-2 rounded-[50%] overflow-hidden grid grid-cols-2 grid-rows-2">
                  <div className="bg-[#E61B23]" />
                  <div className="bg-[#0055A5]" />
                  <div className="bg-[#FFCC00]" />
                  <div className="bg-[#55AA00]" />
                </div>
                <div className="relative z-10 font-heading font-black text-4xl sm:text-5xl text-white rotate-30 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  UNO
                </div>
              </div>

              <div className="flex justify-between items-center text-white">
                <span className="text-[9px] font-mono tracking-wider opacity-80">AFTRHRS MATCH</span>
                <span className="font-heading font-black text-xl">+4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
