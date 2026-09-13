import React, { useState } from 'react';
import { Disc3, ExternalLink, Sparkles } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function DJLineup() {
  const [activeArtist, setActiveArtist] = useState(0);

  const artists = [
    {
      name: 'JAEDYN',
      style: 'BOLLYTECH',
      description:
        '“Hyderabad\'s finest energy meets Bollytech. Expect heavy drops, familiar hooks and a dancefloor that refuses to slow down.”',
      image: '/assets/jaedyn.png',
      badge: 'BANGERS ONLY',
      vibe: 'Heavy Drops • Nostalgic Hooks • 130 BPM',
      instaHandle: '@jaedyn.dcosta',
      instaUrl: 'https://www.instagram.com/jaedyn.dcosta?stkn=MTRtYjNmazJkdWkwMQ=='
    },
    {
      name: 'PRADEEP',
      style: 'TELUGU / HIGH-ENERGY PARTY MUSIC',
      description:
        '“Telugu favourites, high-energy selections and the kind of set that gets the entire room moving.”',
      image: '/assets/pradeep.png',
      badge: 'HYDERABAD FAVOURITES',
      vibe: 'Crowd Anthems • High-Octane Bass • Peak Energy',
      instaHandle: '@djpradeep__',
      instaUrl: 'https://www.instagram.com/djpradeep__?stkn=MXJheHllZmhocHBnZw=='
    },
    {
      name: 'DJ KOMAL',
      style: 'HYDERABAD\'S YOUNG GUN',
      description:
        '“Opening the vibes. Closing the evening. Young. Talented. Unstoppable. Bringing raw daytime energy, seamless transitions and unstoppable party vibes to kick off and close down AFTRHRS.”',
      image: '/assets/komal.jpg',
      badge: 'YOUNG & DYNAMIC',
      vibe: 'Raw Daytime Energy • Seamless Transitions • Unstoppable',
      instaHandle: '@komal._.gavini',
      instaUrl: 'https://www.instagram.com/komal._.gavini?stkn=OXdqNG01cDVzenRn'
    }
  ];

  return (
    <section id="lineup" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold tracking-[0.25em] text-purple-400 uppercase">
          CURATED HEADLINERS
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mt-3 mb-4 uppercase">
          THE SOUND OF AFTRHRS
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Three powerhouse DJ artists taking over the decks from 12 PM to 5 PM at Open Your Mouth. Tap any artist to connect on Instagram.
        </p>
      </div>

      {/* Artist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {artists.map((artist, idx) => (
          <div
            key={artist.name}
            onMouseEnter={() => setActiveArtist(idx)}
            className={`cyber-card rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
              activeArtist === idx
                ? 'border-purple-500/80 shadow-[0_0_35px_rgba(168,85,247,0.35)] scale-[1.02]'
                : 'border-white/10 hover:border-purple-500/40'
            }`}
          >
            {/* Clickable Image linking to Instagram */}
            <a
              href={artist.instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-[4/5] overflow-hidden bg-black/80 block cursor-pointer"
              title={`View ${artist.name} on Instagram`}
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-black/50" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full bg-purple-900/80 border border-purple-400/50 text-purple-200 uppercase backdrop-blur-md">
                  {artist.badge}
                </span>
              </div>

              {/* Instagram Floating Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-pink-500/50 flex items-center justify-center text-pink-300 group-hover:scale-110 group-hover:bg-gradient-to-tr from-amber-500 to-purple-600 group-hover:text-white transition-all shadow-lg">
                <InstagramIcon className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-bold tracking-widest text-purple-400 uppercase block mb-1">
                  {artist.style}
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-wider">
                  {artist.name}
                </h3>
              </div>
            </a>

            {/* Artist Description & Instagram CTA */}
            <div className="p-6 flex flex-col justify-between flex-1 bg-[#0d0d12]/95 border-t border-white/5">
              <p className="text-gray-300 text-sm leading-relaxed italic mb-6">
                {artist.description}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-xs text-purple-300 font-medium">
                  <Disc3 className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
                  <span>{artist.vibe}</span>
                </div>

                {/* Direct Instagram Link Button */}
                <a
                  href={artist.instaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-black hover:from-purple-800/60 hover:to-pink-800/60 border border-pink-500/30 hover:border-pink-400/80 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400 group-hover/btn:scale-110 transition-transform" />
                  <span>{artist.instaHandle}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
