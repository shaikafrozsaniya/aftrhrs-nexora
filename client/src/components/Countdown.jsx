import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown() {
  // Target: 20 September 2026 12:00:00 IST (UTC +5:30)
  const targetDate = new Date('2026-09-20T12:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEnded: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isEnded: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isEnded) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-purple-950/40 border border-purple-500/40 backdrop-blur-md">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
        <span className="font-heading tracking-widest text-sm font-bold text-purple-200 uppercase">
          AFTRHRS HAS ENDED
        </span>
      </div>
    );
  }

  const timeUnits = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold tracking-[0.2em] text-purple-400 uppercase">
        <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
        <span>COUNTDOWN TO DAYLIGHT DESTROYED</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg w-full">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[#101017]/80 border border-purple-900/40 backdrop-blur-md shadow-[0_0_20px_rgba(147,51,234,0.15)] relative overflow-hidden group hover:border-purple-500/50 transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
            <span className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
              {unit.value}
            </span>
            <span className="text-[9px] sm:text-[11px] font-semibold tracking-widest text-gray-400 mt-1 uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
