import React from 'react';
import { Music, Utensils, Users, Gamepad2, Sparkles, Flame } from 'lucide-react';

export default function Experience() {
  const cards = [
    {
      title: 'MUSIC',
      icon: Music,
      color: 'from-purple-500/20 to-fuchsia-500/10',
      border: 'border-purple-500/30',
      tag: 'NON-STOP SOUND',
      desc: 'Bollytech drops, high-energy Telugu anthems, Afro rhythms, and heavy techno sets curated for peak daytime euphoria.'
    },
    {
      title: 'FOOD',
      icon: Utensils,
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      tag: 'ALL-INCLUSIVE',
      desc: 'Unlimited gourmet vegetarian & non-vegetarian culinary spreads included with every single pass. Come hungry.'
    },
    {
      title: 'PEOPLE',
      icon: Users,
      color: 'from-blue-500/20 to-cyan-500/10',
      border: 'border-blue-500/30',
      tag: 'COMMUNITY',
      desc: 'Connect with hundreds of like-minded creators, music lovers, and partygoers. Come solo or roll with your entire crew.'
    },
    {
      title: 'GAMES',
      icon: Gamepad2,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      tag: 'INTERACTIVE',
      desc: 'Interactive icebreakers and the signature UNO Matchmaking experience created for singles to meet effortlessly.'
    },
    {
      title: 'VISUALS',
      icon: Sparkles,
      color: 'from-violet-500/20 to-indigo-500/10',
      border: 'border-violet-500/30',
      tag: 'ANDRU VISUALS',
      desc: 'Custom-rendered stage architecture, reactive light trails, and underground visual aesthetics that elevate the dancefloor.'
    },
    {
      title: 'VIBES',
      icon: Flame,
      color: 'from-rose-500/20 to-red-500/10',
      border: 'border-rose-500/30',
      tag: 'DAYTIME ENERGY',
      desc: 'Five full hours of unfiltered daytime energy. Zero alcohol needed to experience the most electric dancefloor in Jubilee Hills.'
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-[0.25em] text-purple-400 uppercase">
          THE AFTRHRS ETHOS
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mt-3 mb-6 uppercase">
          THIS IS NOT JUST A PARTY.
        </h2>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
          “AFTRHRS is a daytime experience built around music, movement, food and people. Meet new faces, find your people, lose yourself in the music and destroy the daylight.”
        </p>
      </div>

      {/* 6 Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`cyber-card p-6 sm:p-8 rounded-2xl relative overflow-hidden group border ${card.border}`}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-3 group-hover:text-purple-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-purple-400 font-semibold tracking-wider">
                  <span>0{idx + 1} // EXPERIENCE</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
