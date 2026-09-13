import React from 'react';
import { ShieldCheck, Ban, Users, AlertCircle, FileText, Check } from 'lucide-react';

export default function SafetySection() {
  const policies = [
    {
      title: 'ZERO ALCOHOL EVENT',
      icon: Ban,
      desc: 'No alcohol is provided at the event. Outside beverages, alcohol, or illicit substances are strictly prohibited.'
    },
    {
      title: 'RESPECT ALL ATTENDEES',
      icon: Users,
      desc: 'Nexora enforces a zero-tolerance policy against harassment, discrimination, or non-consensual behavior.'
    },
    {
      title: 'FOLLOW VENUE & STAFF RULES',
      icon: ShieldCheck,
      desc: 'All guests must adhere to venue guidelines and cooperate with on-site security and event personnel.'
    },
    {
      title: 'VALID PASS & ID REQUIRED',
      icon: FileText,
      desc: 'Entry is granted upon scanning a verified digital ticket QR code. Please carry a valid photo ID.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="cyber-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 bg-gradient-to-br from-[#100e1a] via-[#07060c] to-[#12081c] relative overflow-hidden">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>EVENT GUIDELINES</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-3">
            SAFE. SOCIAL. DAYTIME.
          </h2>

          <div className="inline-block px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 font-heading font-extrabold text-sm sm:text-base uppercase tracking-wider mb-4">
            NO ALCOHOL IS PROVIDED AT THE EVENT.
          </div>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
            “Safety and responsible conduct are a priority throughout the event.”
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-purple-500/40 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Entry is strictly subject to security screening and adherence to event policies.</span>
        </div>
      </div>
    </section>
  );
}
