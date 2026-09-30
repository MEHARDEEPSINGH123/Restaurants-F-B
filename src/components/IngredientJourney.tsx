'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  getIngredientDetails,
  RawIngredient,
} from '@/lib/dataset';
import {
  Globe,
  Compass,
  Calendar,
  Sparkles,
  ShieldCheck,
  Search,
  ArrowRight,
  X,
  MapPin,
} from 'lucide-react';

export default function IngredientJourney() {
  const [selectedIngredient, setSelectedIngredient] = useState<RawIngredient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTerroirHub, setActiveTerroirHub] = useState('All');
  const [showAllDrawer, setShowAllDrawer] = useState(false);

  // Spotlighted ingredients for the visual storytelling feature
  const featuredIngredients = dataset.ingredients.slice(0, 4).map((ing, i) =>
    getIngredientDetails(ing, i)
  );

  // Full 200 ingredients enriched
  const allIngredientsEnriched = dataset.ingredients.map((ing, i) =>
    getIngredientDetails(ing, i)
  );

  const filteredIngredients = allIngredientsEnriched.filter((ing) => {
    const matchesSearch =
      ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.grade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHub =
      activeTerroirHub === 'All' || ing.origin.toLowerCase().includes(activeTerroirHub.toLowerCase());
    return matchesSearch && matchesHub;
  });

  return (
    <section id="ingredients" className="relative py-28 md:py-36 bg-[#FFFDF8] overflow-hidden border-t border-[#E7DFD4]">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>Provenance & Terroir</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#1B1B1B] tracking-tight">
              Ingredient Journey
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed font-light">
              We travel to the edges of maritime archipelagos and regenerative high-altitude farms.
              Every single ingredient in our 200-element pantry has a documented genealogy of purity.
            </p>
            <button
              onClick={() => setShowAllDrawer(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#A63A2B] hover:text-[#1B1B1B] transition-colors"
            >
              <span>Explore All 200 Registered Ingredients</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Terroir Atlas Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
          <span className="text-[11px] font-modern uppercase tracking-widest text-[#5A4A42] shrink-0 mr-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#C8A96A]" /> Terroir Hubs:
          </span>
          {['All', 'Singapore', 'Hokkaido', 'Cameron', 'Kagoshima', 'Brittany'].map((hub) => (
            <button
              key={hub}
              onClick={() => setActiveTerroirHub(hub)}
              className={`px-4 py-1.5 rounded-full text-xs font-modern uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTerroirHub === hub
                  ? 'bg-[#1B1B1B] text-[#FFFDF8]'
                  : 'bg-[#F7F3EB] border border-[#E7DFD4] text-[#5A4A42] hover:border-[#C8A96A]'
              }`}
            >
              {hub === 'All' ? 'All Origins' : hub}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Visual Storytelling Grid (Large Photography Layouts) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuredIngredients.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onClick={() => setSelectedIngredient(item)}
              className="group cursor-pointer bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm overflow-hidden hover:border-[#C8A96A] transition-all duration-500 shadow-sm"
            >
              {/* Large Image Aspect */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1B1B1B]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#1B1B1B]/70 backdrop-blur-md border border-[#C8A96A]/40 rounded-full text-[10px] font-modern uppercase tracking-widest text-[#FFFDF8]">
                  {item.id} · {item.grade}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-modern">
                  <span className="flex items-center gap-1.5 text-[#E8D3A7]">
                    <MapPin className="w-3.5 h-3.5 text-[#A63A2B]" />
                    {item.origin}
                  </span>
                  <span className="text-[#C8A96A]">{item.season}</span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-editorial text-2xl md:text-3xl text-[#1B1B1B] group-hover:text-[#A63A2B] transition-colors">
                    {item.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-[#C8A96A] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs md:text-sm font-sans text-[#5A4A42] leading-relaxed font-light mb-4">
                  {item.story}
                </p>
                <div className="pt-3 border-t border-[#E7DFD4] flex items-center justify-between text-[11px] font-modern text-[#5A4A42]">
                  <span className="uppercase tracking-wider">Genealogy: Single-Origin Documented</span>
                  <span className="text-[#A63A2B]">Inspect Traceability</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Complete 200 Ingredient Atlas Fullscreen Drawer */}
      <AnimatePresence>
        {showAllDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1B1B1B]/80 backdrop-blur-md flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="w-full max-w-4xl h-full bg-[#FFFDF8] overflow-y-auto p-6 md:p-12 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E7DFD4] pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-modern uppercase tracking-[0.3em] text-[#C8A96A]">
                      Provenance Archive
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B]">
                      All 200 Documented Ingredients
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAllDrawer(false)}
                    className="p-2.5 rounded-full border border-[#E7DFD4] hover:bg-[#1B1B1B] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="w-4 h-4 text-[#5A4A42] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ingredient name, ID, origin or quality grade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern placeholder:text-[#5A4A42]/60 focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredIngredients.map((ing) => (
                    <div
                      key={ing.id}
                      onClick={() => setSelectedIngredient(ing)}
                      className="p-4 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm hover:border-[#C8A96A] cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-1">
                        <span className="font-semibold text-[#A63A2B]">{ing.id}</span>
                        <span>{ing.grade}</span>
                      </div>
                      <h4 className="font-editorial text-xl text-[#1B1B1B] mb-1">
                        {ing.name}
                      </h4>
                      <p className="text-xs text-[#5A4A42] font-sans line-clamp-1 mb-2">
                        {ing.origin} · {ing.season}
                      </p>
                      <p className="text-[11px] text-[#5A4A42]/80 line-clamp-2 italic">
                        {ing.story}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#E7DFD4] mt-8 text-center text-xs font-modern text-[#5A4A42]">
                Displaying {filteredIngredients.length} of 200 ingredients rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ingredient Detail Inspection Modal */}
      <AnimatePresence>
        {selectedIngredient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1B1B1B]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-xl w-full bg-[#FFFDF8] border border-[#C8A96A]/50 rounded-sm p-6 md:p-10 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedIngredient(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#E7DFD4] hover:bg-[#1B1B1B] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.25em] text-[#C8A96A] mb-2">
                <span className="px-2 py-0.5 bg-[#A63A2B] text-white rounded text-[10px]">
                  {selectedIngredient.id}
                </span>
                <span>Terroir Profile</span>
              </div>

              {(() => {
                const enriched = getIngredientDetails(
                  selectedIngredient,
                  parseInt(selectedIngredient.id.replace('ING', ''), 10) || 0
                );
                return (
                  <div>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B] mb-2">
                      {enriched.name}
                    </h3>
                    <p className="font-modern text-xs text-[#A63A2B] uppercase tracking-wider mb-6">
                      {enriched.grade} · {enriched.origin}
                    </p>

                    <div className="aspect-[16/9] w-full rounded-sm overflow-hidden mb-6 bg-[#1B1B1B]">
                      <img
                        src={enriched.image}
                        alt={enriched.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4 text-sm font-sans text-[#5A4A42]">
                      <p className="leading-relaxed">
                        <strong className="text-[#1B1B1B] font-modern text-xs uppercase tracking-wider block mb-1">
                          Supplier & Terroir Story:
                        </strong>
                        {enriched.story}
                      </p>

                      <div className="grid grid-cols-2 gap-4 p-4 bg-[#F7F3EB] rounded-sm border border-[#E7DFD4] text-xs font-modern">
                        <div>
                          <span className="text-[#C8A96A] uppercase tracking-wider block">
                            Peak Seasonality
                          </span>
                          <span className="font-medium text-[#1B1B1B]">{enriched.season}</span>
                        </div>
                        <div>
                          <span className="text-[#C8A96A] uppercase tracking-wider block">
                            Purity Certification
                          </span>
                          <span className="font-medium text-[#1B1B1B]">100% Traceable</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
