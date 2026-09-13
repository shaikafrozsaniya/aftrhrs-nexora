import React, { useEffect, useState } from 'react';

export default function BackgroundParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Watermark 1: Top Hero to Experience */}
      <div
        className="absolute -top-10 -right-20 w-[600px] sm:w-[850px] opacity-[0.07] will-change-transform filter drop-shadow-[0_0_80px_rgba(239,68,68,0.5)] select-none"
        style={{
          transform: `translate3d(0, ${scrollY * 0.22}px, 0) rotate(${scrollY * 0.015}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img
          src="/assets/aftrhrs-trimmed.png"
          alt=""
          className="w-full h-auto object-contain filter invert"
        />
      </div>

      {/* Background Watermark 2: Mid-section (Sound & Food) */}
      <div
        className="absolute top-[40%] -left-28 w-[500px] sm:w-[750px] opacity-[0.06] will-change-transform filter drop-shadow-[0_0_100px_rgba(168,85,247,0.4)] select-none"
        style={{
          transform: `translate3d(0, ${(scrollY - 1000) * 0.18}px, 0) rotate(-6deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img
          src="/assets/aftrhrs-trimmed.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Background Watermark 3: Pass Selection & Bottom */}
      <div
        className="absolute top-[75%] -right-16 w-[550px] sm:w-[800px] opacity-[0.08] will-change-transform filter drop-shadow-[0_0_90px_rgba(239,68,68,0.45)] select-none"
        style={{
          transform: `translate3d(0, ${(scrollY - 2200) * 0.2}px, 0) scale(${1 + Math.sin(scrollY * 0.002) * 0.04})`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img
          src="/assets/aftrhrs-trimmed.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
