'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  getSignatureDishDetails,
  RawSignatureDish,
} from '@/lib/dataset';
import {
  Sparkles,
  Wine,
  Compass,
  ArrowRight,
  BookOpen,
  X,
  Search,
  CheckCircle2,
} from 'lucide-react';

export default function SignatureCollection() {
  const [selectedDishModal, setSelectedDishModal] = useState<RawSignatureDish | null>(null);
  const [showAllDrawer, setShowAllDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');

  // Spotlighted featured signature dishes for the alternating editorial layout
  const featuredDishes = dataset.signature_dishes.slice(0, 5).map((dish, i) =>
    getSignatureDishDetails(dish, i)
  );

  // Full 100 dishes prepared for the interactive anthology archive
  const allDishesEnriched = dataset.signature_dishes.map((dish, i) =>
    getSignatureDishDetails(dish, i)
  );

  const filteredDishes = allDishesEnriched.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.curatedTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.pairing.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse =
      selectedCourseFilter === 'All' || d.course.includes(selectedCourseFilter);
    return matchesSearch && matchesCourse;
  });

  return (
    <section id="signature" className="relative py-28 md:py-36 bg-[#F7F3EB] overflow-hidden">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>Culinary Anthology</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#1B1B1B] tracking-tight">
              Signature Creations
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed">
              Instead of ordinary dishes, our chefs articulate Singapore&apos;s maritime history,
              indigenous botanicals, and classical French discipline into singular tasting journeys.
            </p>
            <button
              onClick={() => setShowAllDrawer(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#A63A2B] hover:text-[#1B1B1B] transition-colors"
            >
              <span>Explore Complete 100-Dish Anthology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Alternating Magazine Storytelling Blocks (No Boring Cards) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28 md:space-y-40">
        {featuredDishes.map((dish, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 lg:gap-20 items-center`}
            >
              {/* Large Photography with Architectural Frame */}
              <div className="w-full lg:w-7/12 relative group cursor-pointer" onClick={() => setSelectedDishModal(dish)}>
                <div className="relative aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-sm bg-[#1B1B1B]">
                  <motion.img
                    src={dish.image}
                    alt={dish.curatedTitle}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
                  />
                  {/* Subtle Gradient & Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/70 via-transparent to-transparent opacity-80" />

                  {/* Top Left Original ID Tag from JSON */}
                  <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-[#1B1B1B]/70 backdrop-blur-md border border-[#C8A96A]/40 text-[#FFFDF8] text-[10px] font-modern uppercase tracking-[0.25em]">
                    {dish.id} · {dish.name}
                  </div>

                  {/* Bottom Course Indicator */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#FFFDF8]">
                    <span className="font-modern text-xs uppercase tracking-[0.25em] text-[#C8A96A]">
                      {dish.course}
                    </span>
                    <span className="font-modern text-[10px] tracking-widest text-[#E7DFD4]/80 uppercase">
                      Click to inspect terroir
                    </span>
                  </div>
                </div>

                {/* Decorative Offset Gold Framing Line */}
                <div
                  className={`hidden lg:block absolute -bottom-4 ${
                    isEven ? '-right-4' : '-left-4'
                  } w-2/3 h-2/3 border border-[#C8A96A]/30 -z-10 pointer-events-none`}
                />
              </div>

              {/* Editorial Typography & Story Block */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[11px] font-modern uppercase tracking-[0.3em] text-[#A63A2B] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Haute Gastronomie Masterpiece</span>
                </div>

                <h3 className="font-editorial text-3xl md:text-5xl font-normal text-[#1B1B1B] leading-[1.1] mb-6 tracking-tight">
                  {dish.curatedTitle}
                </h3>

                <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed mb-6 font-light">
                  {dish.inspiration}
                </p>

                {/* Wine Pairing Architecture */}
                <div className="p-5 rounded-sm bg-[#FFFDF8] border border-[#E7DFD4] mb-8 shadow-[0_4px_20px_rgba(27,27,27,0.03)]">
                  <div className="flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#C8A96A] mb-1.5">
                    <Wine className="w-4 h-4 text-[#A63A2B]" />
                    <span>Sommelier Pairing Selection</span>
                  </div>
                  <p className="font-editorial text-lg md:text-xl text-[#1B1B1B] italic">
                    {dish.pairing}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setSelectedDishModal(dish)}
                    className="inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#1B1B1B] hover:text-[#A63A2B] transition-colors pb-1 border-b border-[#1B1B1B] hover:border-[#A63A2B]"
                  >
                    <span>Read Tasting Notes & Provenance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Complete 100-Dish Anthology Fullscreen Modal / Drawer */}
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
              className="w-full max-w-4xl h-full bg-[#F7F3EB] overflow-y-auto p-6 md:p-12 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E7DFD4] pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-modern uppercase tracking-[0.3em] text-[#C8A96A]">
                      The Complete Savora Archive
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B]">
                      All 100 Signature Dishes
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAllDrawer(false)}
                    className="p-2.5 rounded-full border border-[#E7DFD4] hover:bg-[#1B1B1B] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#5A4A42] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by dish name, ID, ingredient or wine pairing..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 bg-[#FFFDF8] border border-[#E7DFD4] rounded-sm text-xs font-modern placeholder:text-[#5A4A42]/60 focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
                    {['All', 'Entrée', 'Poisson', 'Viande', 'Dessert'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCourseFilter(c)}
                        className={`px-3 py-2 text-[10px] font-modern uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap ${
                          selectedCourseFilter === c
                            ? 'bg-[#1B1B1B] text-white'
                            : 'bg-[#FFFDF8] border border-[#E7DFD4] text-[#5A4A42] hover:border-[#C8A96A]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dish Grid List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDishes.map((dish) => (
                    <div
                      key={dish.id}
                      onClick={() => setSelectedDishModal(dish)}
                      className="group p-5 bg-[#FFFDF8] border border-[#E7DFD4] rounded-sm hover:border-[#C8A96A] cursor-pointer transition-all duration-300 hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-2">
                          <span className="font-semibold text-[#A63A2B]">{dish.id}</span>
                          <span>{dish.name}</span>
                        </div>
                        <h4 className="font-editorial text-xl text-[#1B1B1B] leading-tight mb-2 group-hover:text-[#A63A2B] transition-colors">
                          {dish.curatedTitle}
                        </h4>
                        <p className="text-xs text-[#5A4A42] line-clamp-2 font-sans mb-3">
                          {dish.inspiration}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E7DFD4]/60 flex items-center justify-between text-[11px] font-modern text-[#5A4A42]">
                        <span className="italic truncate pr-2">{dish.pairing}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C8A96A] group-hover:translate-x-1 transition-transform shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#E7DFD4] mt-8 text-center text-xs font-modern text-[#5A4A42]">
                Showing {filteredDishes.length} of 100 signature creations rendered from uploaded dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dish Detailed Inspection Modal */}
      <AnimatePresence>
        {selectedDishModal && (
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
              className="max-w-2xl w-full bg-[#FFFDF8] border border-[#C8A96A]/50 rounded-sm p-6 md:p-10 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedDishModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#E7DFD4] hover:bg-[#1B1B1B] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.25em] text-[#C8A96A] mb-3">
                <span className="px-2 py-0.5 bg-[#A63A2B] text-white rounded text-[10px]">
                  {selectedDishModal.id}
                </span>
                <span>{selectedDishModal.name}</span>
              </div>

              {(() => {
                const enriched = getSignatureDishDetails(
                  selectedDishModal,
                  parseInt(selectedDishModal.id.replace('SIG', ''), 10) || 0
                );
                return (
                  <div>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B] mb-4">
                      {enriched.curatedTitle}
                    </h3>

                    <div className="aspect-[16/9] w-full rounded-sm overflow-hidden mb-6 bg-[#1B1B1B]">
                      <img
                        src={enriched.image}
                        alt={enriched.curatedTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4 text-sm font-sans text-[#5A4A42]">
                      <p className="leading-relaxed">
                        <strong className="text-[#1B1B1B] font-modern text-xs uppercase tracking-wider block mb-1">
                          Culinary Inspiration:
                        </strong>
                        {enriched.inspiration}
                      </p>

                      <div className="p-4 bg-[#F7F3EB] rounded-sm border border-[#E7DFD4]">
                        <span className="text-xs font-modern uppercase tracking-widest text-[#A63A2B] block mb-1">
                          Sommelier Recommended Vintage:
                        </span>
                        <p className="font-editorial text-xl text-[#1B1B1B] italic">
                          {enriched.pairing}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#E7DFD4] text-xs font-modern text-[#5A4A42]">
                        <span>Course: {enriched.course}</span>
                        <span className="text-[#C8A96A]">Available for Degustation & Private Dining</span>
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
