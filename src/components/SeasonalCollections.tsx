'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  RawSeasonalMenu,
} from '@/lib/dataset';
import {
  Sun,
  CloudRain,
  Wind,
  Sparkles,
  ArrowRight,
  Calendar,
  X,
  Search,
} from 'lucide-react';

export default function SeasonalCollections() {
  const [activeSeasonIdx, setActiveSeasonIdx] = useState(0);
  const [showArchive, setShowArchive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 4 Curated Grand Editorial Movements for the full-width visual layouts
  const SEASONAL_MOVEMENTS = [
    {
      title: 'Monsoon Equinox Orchid Collection',
      seasonPeriod: 'November — February',
      concept: 'Cool maritime breezes and rich botanical infusions inspired by tropical monsoon rains.',
      heroDish: 'Slow-Poached Coral Trout with Lemongrass Blossom & Wild Pepper Velouté',
      sommelierNote: 'Paired with 2017 Meursault Premier Cru Domaine des Comtes Lafon.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
      menuId: 'SEA001',
    },
    {
      title: 'Midsummer Straits Marine Harvest',
      seasonPeriod: 'March — June',
      concept: 'Pristine deep-sea catches from cold current Pacific trenches paired with coastal sea vegetables.',
      heroDish: 'Live Hokkaido Sea Urchin with Oscietra Caviar & Dashi Jelly',
      sommelierNote: 'Paired with 2012 Krug Vintage Champagne.',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1600&auto=format&fit=crop',
      menuId: 'SEA002',
    },
    {
      title: 'Autumn Solstice Truffle & Bincho Symphony',
      seasonPeriod: 'July — October',
      concept: 'The smoky alchemy of Japanese white oak charcoal and freshly foraged Alba white truffles.',
      heroDish: 'Bincho-tan Grilled A5 Miyazaki Striploin with 50-Year Balsamic Reduction',
      sommelierNote: 'Paired with 2010 Tenuta San Guido Sassicaia.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop',
      menuId: 'SEA003',
    },
    {
      title: 'Winter Imperial Cacao & Fermented Spices',
      seasonPeriod: 'Special Equinox Gala',
      concept: 'Rich dark equatorial single-origin cacaos distilled with aged nutmeg and fermented vanilla.',
      heroDish: 'Smoked Chuao Cacao Sphere with Hibiscus Gelée & Gold Leaf',
      sommelierNote: 'Paired with 1985 Fonseca Vintage Port.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1600&auto=format&fit=crop',
      menuId: 'SEA004',
    },
  ];

  // Enrich all 30 seasonal menus from dataset
  const allSeasonalMenus = dataset.seasonal_menus.map((menu, idx) => ({
    ...menu,
    seasonRange: idx % 4 === 0 ? 'Monsoon Equinox' : idx % 4 === 1 ? 'Midsummer Marine' : idx % 4 === 2 ? 'Autumn Truffle' : 'Winter Solstice',
    courseCount: 6 + (idx % 4),
    priceSGD: 268 + (idx * 12),
  }));

  const activeMovement = SEASONAL_MOVEMENTS[activeSeasonIdx];

  const filtered = allSeasonalMenus.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.seasonRange.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="seasonal" className="relative py-28 md:py-36 bg-[#1B1B1B] text-[#FFFDF8] overflow-hidden">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5A4A42]/50 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>Temporal Gastronomy</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#FFFDF8] tracking-tight">
              Seasonal Collections
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#E7DFD4]/70 leading-relaxed font-light">
              We do not impose static menus onto the calendar. Nature dictates our rhythm, following
              lunar tides, equatorial rain cycles, and first-flush mountain harvests.
            </p>
            <button
              onClick={() => setShowArchive(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#C8A96A] hover:text-[#FFFDF8] transition-colors"
            >
              <span>Explore All 30 Seasonal Menus Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Movement Switcher Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none border-b border-[#5A4A42]/40">
          {SEASONAL_MOVEMENTS.map((mov, idx) => (
            <button
              key={mov.title}
              onClick={() => setActiveSeasonIdx(idx)}
              className={`pb-2 text-xs font-modern uppercase tracking-widest transition-all whitespace-nowrap focus:outline-none ${
                activeSeasonIdx === idx
                  ? 'border-b-2 border-[#C8A96A] text-[#FFFDF8] font-medium'
                  : 'text-[#E7DFD4]/50 hover:text-[#E7DFD4]'
              }`}
            >
              <span>{mov.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Full-Width Magazine Editorial Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMovement.title}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-sm overflow-hidden bg-[#242424] min-h-[560px] flex flex-col justify-end p-8 md:p-16 shadow-2xl"
          >
            {/* Background Full Bleed Imagery */}
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-[0.6] contrast-[1.05]"
              style={{ backgroundImage: `url("${activeMovement.image}")` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-[#1B1B1B]/40 to-transparent" />

            {/* Overlaid Editorial Content */}
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.25em] text-[#C8A96A]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activeMovement.seasonPeriod}</span>
                <span>·</span>
                <span className="text-[#E7DFD4]">{activeMovement.menuId}</span>
              </div>

              <h3 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#FFFDF8] leading-[1.05] font-light">
                {activeMovement.title}
              </h3>

              <p className="font-sans text-base md:text-lg text-[#E7DFD4]/85 leading-relaxed font-light">
                {activeMovement.concept}
              </p>

              <div className="p-5 bg-[#1B1B1B]/80 backdrop-blur-md border border-[#5A4A42]/50 rounded-sm space-y-2">
                <div>
                  <span className="text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] block">
                    Hero Degustation Highlight
                  </span>
                  <p className="font-editorial text-xl text-[#FFFDF8]">
                    {activeMovement.heroDish}
                  </p>
                </div>
                <p className="font-sans text-xs text-[#E7DFD4]/70 italic">
                  {activeMovement.sommelierNote}
                </p>
              </div>

              <div>
                <a
                  href="#reservations"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FFFDF8] text-[#1B1B1B] hover:bg-[#A63A2B] hover:text-white text-xs font-modern uppercase tracking-[0.2em] font-medium transition-all shadow-lg"
                >
                  <span>Experience This Seasonal Tasting</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 30 Seasonal Menus Archive Drawer */}
      <AnimatePresence>
        {showArchive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1B1B1B]/85 backdrop-blur-md flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="w-full max-w-4xl h-full bg-[#1B1B1B] text-[#FFFDF8] overflow-y-auto p-6 md:p-12 border-l border-[#5A4A42]/50 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#5A4A42]/50 pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-modern uppercase tracking-[0.3em] text-[#C8A96A]">
                      Temporal Archives
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#FFFDF8]">
                      All 30 Seasonal Menus
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowArchive(false)}
                    className="p-2.5 rounded-full border border-[#5A4A42] hover:bg-[#FFFDF8] hover:text-[#1B1B1B] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative mb-6">
                  <Search className="w-4 h-4 text-[#C8A96A] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search seasonal menus by ID, name or seasonal movement..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#242424] border border-[#5A4A42] rounded-sm text-xs font-modern placeholder:text-[#E7DFD4]/40 focus:outline-none focus:border-[#C8A96A] text-[#FFFDF8]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((menu) => (
                    <div
                      key={menu.id}
                      className="p-5 bg-[#242424] border border-[#5A4A42]/50 rounded-sm hover:border-[#C8A96A] transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-1">
                        <span className="font-semibold text-[#A63A2B]">{menu.id}</span>
                        <span>{menu.courseCount} Courses</span>
                      </div>
                      <h4 className="font-editorial text-2xl text-[#FFFDF8] mb-1">
                        {menu.name}
                      </h4>
                      <p className="text-xs text-[#E7DFD4]/70 mb-3 font-light">
                        {menu.seasonRange} · Singapore Terroir
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-modern pt-2 border-t border-[#5A4A42]/40 text-[#E7DFD4]/60">
                        <span>Degustation: ${menu.priceSGD} SGD</span>
                        <a href="#reservations" onClick={() => setShowArchive(false)} className="text-[#C8A96A] hover:underline">
                          Reserve &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#5A4A42]/50 mt-8 text-center text-xs font-modern text-[#E7DFD4]/60">
                Displaying {filtered.length} of 30 seasonal menus rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
