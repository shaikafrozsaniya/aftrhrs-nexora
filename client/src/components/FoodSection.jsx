import React from 'react';
import { UtensilsCrossed, CheckCircle2, Flame, Sparkles, GlassWater } from 'lucide-react';

export default function FoodSection() {
  // Featured Starters & Beverage Spotlights
  const spotlights = [
    {
      title: 'Tandoori Paneer Tikka',
      category: 'VEG STARTER SPOTLIGHT',
      badgeColor: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/60',
      image: '/assets/paneer-tikka.jpg',
      alt: 'Tandoori Paneer Tikka Skewers',
      description:
        'Cubes of marinated fresh cottage cheese grilled to perfection with smoky charred edges, skewered with bell peppers and red onions, served with zesty mint chutney and lemon wedges.',
      tags: ['Smoky Charcoal Grill', 'Mint Chutney', 'Unlimited Refills']
    },
    {
      title: 'Sizzling Chicken Tikka',
      category: 'NON-VEG STARTER SPOTLIGHT',
      badgeColor: 'border-rose-500/50 text-rose-400 bg-rose-950/60',
      image: '/assets/chicken-tikka.jpg',
      alt: 'Succulent Charcoal Chicken Tikka',
      description:
        'Succulent, tender boneless chicken chunks steeped in fiery royal tandoori marinade, chargrilled over open coals, served sizzling with fresh onion rings, coriander, and chaat spices.',
      tags: ['Live Tandoor', 'Spicy Glaze', 'Unlimited Refills']
    },
    {
      title: 'Signature Club Mocktails',
      category: 'CRAFT MOCKTAIL BAR',
      badgeColor: 'border-cyan-500/50 text-cyan-400 bg-cyan-950/60',
      image: '/assets/mocktails.jpg',
      alt: 'Artisanal Club Mocktails and Coolers',
      description:
        'Ice-cold, vibrant artisanal mocktails to keep you hydrated on the dance floor. Enjoy fresh Virgin Mint Mojitos, Electric Blue Curacao Fizz, and Passion Berry Coolers throughout the party.',
      tags: ['100% Non-Alcoholic', 'Chilled & Fizzy', 'All You Can Drink']
    }
  ];

  // Full Menu Categories
  const menuCategories = [
    {
      category: 'UNLIMITED VEGETARIAN',
      badge: 'VEG DELIGHTS',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
      accent: 'emerald',
      items: [
        'Smoky Tandoori Paneer Tikka skewers with peppers',
        'Crispy spiced corn bowls & chilli cheese poppers',
        'Golden peri-peri loaded potato wedges & dips',
        'Live pasta counter & street-style party platters',
        'Gourmet mini sliders & freshly prepared dessert bites'
      ]
    },
    {
      category: 'UNLIMITED NON-VEGETARIAN',
      badge: 'NON-VEG SPECIALS',
      color: 'border-rose-500/40 text-rose-400 bg-rose-950/30',
      accent: 'rose',
      items: [
        'Sizzling Chargrilled Chicken Tikka with mint chutney',
        'Crispy spiced chicken skewers & party wings',
        'Juicy grilled chicken kebabs & peri-peri bites',
        'Chef\'s signature club main course selections',
        'Gourmet chicken sliders & hot party bowls'
      ]
    },
    {
      category: 'UNLIMITED MOCKTAIL BAR',
      badge: 'CRAFT COOLERS',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30',
      accent: 'cyan',
      items: [
        'Classic Virgin Mint Mojito with crushed lime & mint',
        'Electric Blue Curacao Citrus Fizz with party bubbles',
        'Ruby Passion Berry & Pomegranate Spritzer',
        'Chilled Fresh Lime Soda (Sweet / Salt / Mixed)',
        'Tropical Fruit Splash & iced club quenchers'
      ]
    }
  ];

  return (
    <section id="food" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.25em] text-purple-400 uppercase mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>CULINARY & CRAFT BAR SPREAD INCLUDED</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none mb-3">
          UNLIMITED FOOD & MOCKTAILS
        </h2>

        <p className="font-heading text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-amber-200 to-cyan-300 font-black tracking-wider uppercase mb-4">
          COME HUNGRY. STAY REFRESHED.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold tracking-wider uppercase mt-4">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            UNLIMITED VEG
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            UNLIMITED NON-VEG
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5">
            <GlassWater className="w-3.5 h-3.5 text-cyan-400" />
            UNLIMITED MOCKTAILS
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300">
            STRICTLY ZERO ALCOHOL
          </span>
        </div>

        <p className="text-gray-300 text-base sm:text-lg mt-6 leading-relaxed font-normal">
          “Every single pass includes all-you-can-eat gourmet vegetarian & non-vegetarian food, sizzling live starters, and unlimited refreshing craft mocktails served non-stop.”
        </p>
      </div>

      {/* 3 Visual Spotlight Cards: Paneer Tikka, Chicken Tikka, Mocktails */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
        {spotlights.map((item, idx) => (
          <div
            key={idx}
            className="cyber-card rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col bg-[#0b0a10] group"
          >
            {/* Image Banner */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105 brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a10] via-transparent to-black/40 pointer-events-none" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full border ${item.badgeColor} uppercase shadow-lg backdrop-blur-md`}>
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-wide mb-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive Menu Category Cards (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {menuCategories.map((cat) => (
          <div
            key={cat.category}
            className="cyber-card p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between bg-gradient-to-b from-[#110d18] to-[#07060a]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                  {cat.accent === 'cyan' ? (
                    <GlassWater className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <UtensilsCrossed className="w-6 h-6" />
                  )}
                </div>
                <span className={`text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full border ${cat.color} uppercase`}>
                  {cat.badge}
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-black text-white tracking-wider uppercase mb-4">
                {cat.category}
              </h3>

              <ul className="space-y-3">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-gray-400 font-mono">
              * Unlimited live buffet & mocktail bar open from 12:00 PM – 5:00 PM
            </div>
          </div>
        ))}
      </div>

      {/* Assurance banner */}
      <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10 text-center max-w-2xl mx-auto text-xs text-gray-400">
        <span className="text-purple-400 font-bold uppercase mr-2">Nexora Quality Standard:</span>
        Prepared fresh by culinary masters at Open Your Mouth Club & Kitchen. Strict hygiene, allergen separation, and premium ingredients.
      </div>
    </section>
  );
}
