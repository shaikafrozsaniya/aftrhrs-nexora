import React, { useState, useRef } from 'react';

export default function Nexora3DLogo({ src = '/assets/nexora-logo-trimmed.png', className = '' }) {
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / (rect.height / 2)) * 18;
    const rotateY = (x / (rect.width / 2)) * 22;

    setMouseOffset({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none py-4 ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Dynamic Purple/Pink/Cyan Neon Glow behind cutout */}
      <div
        className={`absolute -inset-10 rounded-full bg-gradient-to-tr from-purple-600/35 via-fuchsia-500/25 to-cyan-400/20 blur-3xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-100 scale-110' : 'opacity-60 scale-95'
        }`}
      />

      {/* 3D Rotating Wrapper */}
      <div
        className="relative will-change-transform transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${mouseOffset.x}deg) rotateY(${mouseOffset.y}deg) scale3d(1.08, 1.08, 1.08)`
            : undefined,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Continuous 3D Gyroscopic Rotation on idle */}
        <div
          className={`${!isHovered ? 'animate-logo-3d-spin' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Real transparent logo cutout (ZERO background box) */}
          <img
            src={src}
            alt="Nexora 3D Chrome Emblem"
            className="w-44 sm:w-56 md:w-72 h-auto object-contain filter drop-shadow-[0_10px_30px_rgba(168,85,247,0.65)] pointer-events-none"
            style={{
              backfaceVisibility: 'visible',
            }}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
