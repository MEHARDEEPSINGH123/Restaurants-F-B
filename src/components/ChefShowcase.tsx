'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  SPOTLIGHT_CHEFS,
  RawChef,
} from '@/lib/dataset';
import {
  Award,
  Sparkles,
  Quote,
  ArrowRight,
  UtensilsCrossed,
  MapPin,
  ChevronRight,
  X,
  Search,
} from 'lucide-react';

export default function ChefShowcase() {
  const [activeChefIndex, setActiveChefIndex] = useState(0);
  const [showBrigadeDrawer, setShowBrigadeDrawer] = useState(false);
  const [brigadeSearch, setBrigadeSearch] = useState('');

  const currentChef = SPOTLIGHT_CHEFS[activeChefIndex];

  // Map all 50 chefs from raw dataset
  const allChefs = dataset.chefs.map((chef, index) => {
    const estateIndex = index % dataset.restaurants.length;
    const estate = dataset.restaurants[estateIndex];
    const roles = [
      'Chef de Cuisine',
      'Executive Sous Chef',
      'Master Pâtissier',
      'Principal Forager & Botanist',
      'Head Yakitori & Embers Master',
      'Master Saucier & Fermentation Specialist',
      'Kaiseki Specialist',
      'Cellar & Degustation Director',
    ];
    return {
      ...chef,
      role: roles[index % roles.length],
      estateName: estate.name,
      district: estate.district,
      cuisine: estate.cuisine,
      yearsInBrigade: 8 + (index * 3) % 20,
    };
  });

  const filteredBrigade = allChefs.filter((c) =>
    c.name.toLowerCase().includes(brigadeSearch.toLowerCase()) ||
    c.id.toLowerCase().includes(brigadeSearch.toLowerCase()) ||
    c.estateName.toLowerCase().includes(brigadeSearch.toLowerCase()) ||
    c.district.toLowerCase().includes(brigadeSearch.toLowerCase())
  );

  return (
    <section id="chefs" className="relative py-28 md:py-36 bg-[#1B1B1B] text-[#FFFDF8] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#A63A2B]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#C8A96A]/10 blur-[120px] pointer-events-none" />

      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5A4A42]/50 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>The Culinary Brigade</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#FFFDF8] tracking-tight">
              Master Profiles
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#E7DFD4]/70 leading-relaxed font-light">
              Craft without compromise. Savora&apos;s kitchen brigade unites 50 master artisans whose
              pedigrees span classical French ateliers, Tokyo kaiseki temples, and Singaporean heritage stoves.
            </p>
            <button
              onClick={() => setShowBrigadeDrawer(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#C8A96A] hover:text-[#FFFDF8] transition-colors"
            >
              <span>View Full 50-Chef Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Spread: NOT A CARD LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Interactive Master Selector Navigation */}
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-6 mb-12 border-b border-[#5A4A42]/40 scrollbar-none">
          {SPOTLIGHT_CHEFS.map((chef, idx) => (
            <button
              key={chef.id}
              onClick={() => setActiveChefIndex(idx)}
              className={`group flex items-center gap-3.5 text-left pb-2 transition-all whitespace-nowrap focus:outline-none ${
                activeChefIndex === idx
                  ? 'border-b-2 border-[#C8A96A] text-[#FFFDF8]'
                  : 'text-[#E7DFD4]/50 hover:text-[#E7DFD4]'
              }`}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C8A96A]/40 shrink-0">
                <img
                  src={chef.profilePic}
                  alt={chef.name}
                  className="w-full h-full object-cover filter brightness-[0.95]"
                />
              </div>
              <div>
                <span className="block text-[10px] font-modern uppercase tracking-widest text-[#C8A96A]">
                  {chef.id} · {chef.rawName}
                </span>
                <span className="font-editorial text-lg md:text-xl font-light">
                  {chef.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Master Chef Editorial Feature Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChef.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left: Large Editorial Portrait Presentation */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#242424] shadow-2xl">
                <img
                  src={currentChef.profilePic}
                  alt={currentChef.name}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/80 via-transparent to-transparent" />

                {/* Overlaid Michelin Star Badge */}
                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-[#1B1B1B]/80 backdrop-blur-md border border-[#C8A96A]/60 flex items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: currentChef.michelinStars }).map((_, i) => (
                      <span key={i} className="text-[#C8A96A] text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-modern uppercase tracking-widest text-[#E7DFD4]">
                    {currentChef.michelinStars} Stars
                  </span>
                </div>

                {/* Bottom Signature Dish Reference */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#1B1B1B]/80 backdrop-blur-md border border-[#E7DFD4]/20 rounded-sm">
                  <span className="text-[9px] font-modern uppercase tracking-widest text-[#C8A96A] block mb-1">
                    Signature Creation
                  </span>
                  <p className="font-editorial text-sm md:text-base text-[#FFFDF8] italic line-clamp-2">
                    &ldquo;{currentChef.signatureDish}&rdquo;
                  </p>
                </div>
              </div>

              {/* Offset Golden Accent Frame */}
              <div className="hidden lg:block absolute -top-4 -left-4 w-1/2 h-1/2 border border-[#C8A96A]/40 -z-10" />
            </div>

            {/* Right: Editorial Narrative, Philosophy & Specialty */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
              {/* Header Details */}
              <div>
                <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.25em] text-[#C8A96A] mb-2">
                  <span>{currentChef.id}</span>
                  <span>·</span>
                  <span>{currentChef.rawName}</span>
                  <span>·</span>
                  <span>{currentChef.yearsOfExperience} Years of Mastery</span>
                </div>
                <h3 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#FFFDF8] font-light leading-none mb-3">
                  {currentChef.name}
                </h3>
                <p className="font-modern text-sm md:text-base text-[#C8A96A] tracking-wider uppercase font-medium">
                  {currentChef.title}
                </p>
              </div>

              {/* Philosophy Quote */}
              <div className="relative pl-6 border-l-2 border-[#C8A96A] py-2">
                <Quote className="w-8 h-8 text-[#C8A96A]/30 absolute -top-4 -left-3" />
                <p className="font-editorial text-2xl md:text-3xl text-[#E7DFD4] italic leading-relaxed font-light">
                  &ldquo;{currentChef.philosophy}&rdquo;
                </p>
              </div>

              {/* Culinary Story & Sourcing Philosophy */}
              <div className="space-y-4 font-sans text-sm md:text-base text-[#E7DFD4]/80 font-light leading-relaxed">
                <p>{currentChef.story}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#5A4A42]/40">
                  <div>
                    <span className="font-modern text-[10px] uppercase tracking-widest text-[#C8A96A] block mb-1">
                      Culinary Specialty
                    </span>
                    <p className="text-xs text-[#FFFDF8] font-medium leading-relaxed">
                      {currentChef.specialty}
                    </p>
                  </div>
                  <div>
                    <span className="font-modern text-[10px] uppercase tracking-widest text-[#C8A96A] block mb-1">
                      Resident Estate
                    </span>
                    <p className="text-xs text-[#FFFDF8] font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A63A2B]" />
                      {currentChef.estateName}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA To Reserve Table with Chef */}
              <div className="pt-4 flex items-center gap-6">
                <a
                  href="#reservations"
                  className="px-6 py-3 rounded-full border border-[#C8A96A] bg-[#FFFDF8] text-[#1B1B1B] text-xs font-modern uppercase tracking-[0.2em] font-medium hover:bg-[#A63A2B] hover:text-white hover:border-[#A63A2B] transition-all"
                >
                  Reserve Chef&apos;s Table Counter
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full 50-Chef Brigade Archive Drawer */}
      <AnimatePresence>
        {showBrigadeDrawer && (
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
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#5A4A42]/50 pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-modern uppercase tracking-[0.3em] text-[#C8A96A]">
                      Savora Culinary Brigade
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#FFFDF8]">
                      All 50 Master Chefs
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowBrigadeDrawer(false)}
                    className="p-2.5 rounded-full border border-[#5A4A42] hover:bg-[#FFFDF8] hover:text-[#1B1B1B] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                  <Search className="w-4 h-4 text-[#C8A96A] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search chef by ID, name, district or cuisine..."
                    value={brigadeSearch}
                    onChange={(e) => setBrigadeSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#242424] border border-[#5A4A42] rounded-sm text-xs font-modern placeholder:text-[#E7DFD4]/40 focus:outline-none focus:border-[#C8A96A] text-[#FFFDF8]"
                  />
                </div>

                {/* Brigade Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBrigade.map((chef) => (
                    <div
                      key={chef.id}
                      className="p-4 bg-[#242424]/80 border border-[#5A4A42]/40 rounded-sm hover:border-[#C8A96A] transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-1.5">
                        <span className="font-semibold text-[#A63A2B]">{chef.id}</span>
                        <span>{chef.role}</span>
                      </div>
                      <h4 className="font-editorial text-xl text-[#FFFDF8] mb-1">
                        {chef.name}
                      </h4>
                      <p className="text-xs text-[#E7DFD4]/70 mb-2 font-light">
                        {chef.estateName} ({chef.district}) · {chef.cuisine}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-modern text-[#E7DFD4]/50 pt-2 border-t border-[#5A4A42]/30">
                        <span>Tenure: {chef.yearsInBrigade} Years</span>
                        <span className="text-[#C8A96A]">Haute Gastronomie</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#5A4A42]/50 mt-8 text-center text-xs font-modern text-[#E7DFD4]/60">
                Displaying {filteredBrigade.length} of 50 chefs dynamically rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
