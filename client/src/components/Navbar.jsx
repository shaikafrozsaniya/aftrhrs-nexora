import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Ticket, ShieldAlert } from 'lucide-react';

export default function Navbar({ onOpenPasses, onNavigateAdmin, onNavigateScanner }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'AFTRHRS', href: '#hero' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'LINEUP', href: '#lineup' },
    { name: 'SPIDER-MAN', href: '#spiderman-edits' },
    { name: 'VISUALS', href: '#visuals' },
    { name: 'FOOD & DRINKS', href: '#food' },
    { name: 'ACTIVITIES', href: '#activities' },
    { name: 'PASSES', href: '#passes' },
    { name: 'VENUE', href: '#venue' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070709]/90 backdrop-blur-md border-b border-purple-900/30 py-3 shadow-lg shadow-black/60'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group cursor-pointer"
            onClick={(e) => handleLinkClick(e, '#hero')}
          >
            <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center p-1 bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 group-hover:border-purple-400/80 transition-all duration-300">
              <img
                src="/assets/nexora-logo.png"
                alt="Nexora Productions"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-[0.2em] text-white group-hover:text-purple-300 transition-colors">
                NEXORA
              </span>
              <span className="text-[9px] tracking-[0.25em] text-purple-400 font-medium -mt-1 uppercase">
                PRODUCTIONS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold tracking-wider text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-purple-400 transition-colors uppercase tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:6304728210"
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/10"
              title="Customer Support"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>6304728210</span>
            </a>

            <button
              onClick={onOpenPasses}
              className="btn-primary text-xs px-5 py-2.5 rounded-full flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>GET YOUR PASS</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenPasses}
              className="btn-primary text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <Ticket className="w-3 h-3" />
              <span>PASSES</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-4">
            <div className="pb-4 border-b border-white/10">
              <p className="text-xs uppercase tracking-widest text-purple-400 font-bold">
                AFTRHRS — DAYLIGHT DESTROYED
              </p>
              <p className="text-xs text-gray-400 mt-1">20 Sept 2026 • Hyderabad</p>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-lg font-heading font-bold uppercase tracking-wider text-gray-200 hover:text-purple-400 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPasses();
              }}
              className="btn-primary w-full py-3.5 rounded-xl font-heading text-sm font-extrabold flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>GET YOUR PASS FROM ₹1,249</span>
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:6304728210"
                className="flex items-center justify-center gap-2 bg-white/5 py-2.5 rounded-lg border border-white/10 text-gray-300"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>Call 6304728210</span>
              </a>
              <a
                href="tel:9014947885"
                className="flex items-center justify-center gap-2 bg-white/5 py-2.5 rounded-lg border border-white/10 text-gray-300"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>Call 9014947885</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
