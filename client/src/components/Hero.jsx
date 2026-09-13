import React, { useState, useEffect } from 'react';
import { Ticket, Compass, Calendar, MapPin, Volume2, VolumeX, Sparkles } from 'lucide-react';
import Countdown from './Countdown.jsx';
import Nexora3DLogo from './Nexora3DLogo.jsx';

export default function Hero({ onOpenPasses, onExplore }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);
  const [oscillatorNodes, setOscillatorNodes] = useState([]);

  // Synthesize an ambient underground festival club pulse using standard Web Audio API (Zero external assets needed!)
  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      oscillatorNodes.forEach((node) => {
        try { node.stop(); } catch (e) {}
      });
      setOscillatorNodes([]);
      setIsPlayingAudio(false);
      return;
    }

    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Low frequency underground rave bass drone
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      // Filter for deep warm club resonance
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      setAudioCtx(ctx);
      setOscillatorNodes([osc]);
      setIsPlayingAudio(true);
    } catch (err) {
      console.warn('Audio context unavailable:', err);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-dark"
    >
      {/* Background Animated Atmosphere & Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40"></div>

      {/* Futuristic Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-[280px] h-[280px] bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Banner Details */}
      <div className="relative z-10 flex flex-col items-center text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>NEXORA PRODUCTIONS PRESENTS</span>
        </div>

        {/* 3D Chrome Emblem */}
        <div className="my-2">
          <Nexora3DLogo className="w-40 sm:w-56 md:w-64" />
        </div>

        {/* Hero Title Typography (Clean transparent cutout, zero black box) */}
        <div className="relative max-w-2xl mx-auto my-2">
          <img
            src="/assets/aftrhrs-trimmed.png"
            alt="AFTRHRS"
            className="w-72 sm:w-96 md:w-[460px] mx-auto filter drop-shadow-[0_0_40px_rgba(239,68,68,0.85)] hover:scale-105 transition-transform duration-500"
          />
          <p className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-200 to-red-500 tracking-[0.25em] uppercase mt-3">
            DAYLIGHT DESTROYED
          </p>
        </div>

        {/* Key Event Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 text-xs sm:text-sm font-semibold tracking-wider text-gray-300">
          <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-lg border border-white/10">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>20.09.26 • SUNDAY</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3.5 py-2 rounded-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span>12:00 PM — 5:00 PM DAY PARTY</span>
          </div>
          <a
            href="https://maps.google.com/?q=Open+Your+Mouth+Club+and+Kitchen+Jubilee+Hills+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-purple-950/40 hover:bg-purple-900/60 px-3.5 py-2 rounded-lg border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            title="Open Location in Google Maps"
          >
            <MapPin className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold underline underline-offset-2 decoration-purple-400/50 group-hover:decoration-purple-300">
              OPEN YOUR MOUTH • JUBILEE HILLS, HYD ↗
            </span>
          </a>
        </div>

        {/* Notice of Clean Social Energy */}
        <div className="mt-3 text-[11px] font-semibold text-purple-300/80 tracking-widest uppercase">
          NO ALCOHOL IS PROVIDED • UNLIMITED FOOD & MOCKTAILS INCLUDED
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="relative z-10 my-4 w-full max-w-xl">
        <Countdown />
      </div>

      {/* Primary and Secondary CTA Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-6">
        <button
          onClick={onOpenPasses}
          className="btn-primary w-full sm:w-auto px-8 py-4 rounded-full text-sm font-extrabold tracking-widest flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Ticket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>GET YOUR PASS FROM ₹1,249</span>
        </button>

        <button
          onClick={onExplore}
          className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold tracking-widest text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-purple-500/50 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Compass className="w-4 h-4 text-purple-400" />
          <span>EXPLORE AFTRHRS</span>
        </button>

        {/* Ambient Club Vibe Toggle */}
        <button
          onClick={toggleAmbientSound}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-purple-300 transition-colors"
          title={isPlayingAudio ? 'Mute Bass Atmosphere' : 'Play Bass Atmosphere'}
        >
          {isPlayingAudio ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
