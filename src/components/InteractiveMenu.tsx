'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  getMenuItemDetails,
  CATEGORY_EDITORIAL_NAMES,
  RawMenuItem,
} from '@/lib/dataset';
import {
  Sparkles,
  Wine,
  Utensils,
  Leaf,
  Plus,
  Check,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ShoppingBag,
  X,
  Flame,
} from 'lucide-react';

export default function InteractiveMenu() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedDishIndex, setSelectedDishIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [tastingFlight, setTastingFlight] = useState<RawMenuItem[]>([]);
  const [showFlightDrawer, setShowFlightDrawer] = useState(false);

  // Group the 300 menu items across the 20 categories (15 items per category)
  const allEnrichedItems = useMemo(() => {
    return dataset.menu_items.map((item, index) => getMenuItemDetails(item, index));
  }, []);

  // Filter items based on active category, search, and dietary
  const currentCategoryItems = useMemo(() => {
    return allEnrichedItems.filter((item, index) => {
      const itemCatIndex = index % 20;
      const matchesCategory = searchQuery
        ? true
        : itemCatIndex === activeCategoryIndex;
      const matchesSearch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.categoryEditorial.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesDietary =
        dietaryFilter === 'All' || item.dietary === dietaryFilter;

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [allEnrichedItems, activeCategoryIndex, searchQuery, dietaryFilter]);

  const activeDish =
    currentCategoryItems[selectedDishIndex] || currentCategoryItems[0] || allEnrichedItems[0];

  const toggleFlightItem = (item: RawMenuItem) => {
    if (tastingFlight.some((f) => f.id === item.id)) {
      setTastingFlight(tastingFlight.filter((f) => f.id !== item.id));
    } else {
      if (tastingFlight.length >= 7) {
        alert('Tasting flight limited to 7 courses for optimal digestive equilibrium.');
        return;
      }
      setTastingFlight([...tastingFlight, item]);
    }
  };

  const totalFlightPrice = tastingFlight.reduce((sum, item) => sum + item.price_sgd, 0);

  return (
    <section id="menu" className="relative py-28 md:py-36 bg-[#F7F3EB] overflow-hidden">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>Degustation & Culinary Scores</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#1B1B1B] tracking-tight">
              Interactive Menu
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md flex flex-col items-start md:items-end">
            <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed md:text-right font-light">
              Explore 300 curated dishes across 20 gastronomic movements. Select any course to reveal
              preparation secrets, botanical sourcing, and sommelier pairings.
            </p>
            {/* Degustation Tasting Flight Floating Trigger */}
            <button
              onClick={() => setShowFlightDrawer(true)}
              className="mt-4 px-4 py-2 rounded-full border border-[#C8A96A] bg-[#FFFDF8] text-[#1B1B1B] text-xs font-modern uppercase tracking-widest flex items-center gap-2 hover:bg-[#1B1B1B] hover:text-white transition-all shadow-sm"
            >
              <Utensils className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span>Your Degustation Flight ({tastingFlight.length}/7 Courses)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar (All 20 Categories from dataset) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#E7DFD4]/60">
          {dataset.menu_categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategoryIndex(idx);
                setSelectedDishIndex(0);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-full text-xs font-modern uppercase tracking-wider transition-all whitespace-nowrap focus:outline-none ${
                activeCategoryIndex === idx && !searchQuery
                  ? 'bg-[#1B1B1B] text-[#FFFDF8] shadow-md'
                  : 'bg-[#FFFDF8] border border-[#E7DFD4] text-[#5A4A42] hover:border-[#C8A96A] hover:text-[#1B1B1B]'
              }`}
            >
              <span>{category}: {CATEGORY_EDITORIAL_NAMES[idx] || category}</span>
            </button>
          ))}
        </div>

        {/* Search & Dietary Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-[#5A4A42] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes across all 300 creations..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedDishIndex(0);
              }}
              className="w-full pl-9 pr-4 py-2 bg-[#FFFDF8] border border-[#E7DFD4] rounded-sm text-xs font-modern placeholder:text-[#5A4A42]/60 focus:outline-none focus:border-[#C8A96A]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
            <span className="text-[11px] font-modern uppercase tracking-wider text-[#5A4A42] shrink-0">
              Dietary Profile:
            </span>
            {['All', 'Chef Signature', 'Gluten-Free', 'Plant-Based'].map((d) => (
              <button
                key={d}
                onClick={() => setDietaryFilter(d)}
                className={`px-3 py-1 rounded text-[10px] font-modern uppercase tracking-wider transition-colors whitespace-nowrap ${
                  dietaryFilter === d
                    ? 'bg-[#A63A2B] text-white'
                    : 'bg-[#FFFDF8] border border-[#E7DFD4] text-[#5A4A42] hover:border-[#C8A96A]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split-Screen Interactive Storytelling Explorer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Dish List */}
          <div className="lg:col-span-6 space-y-3 max-h-[680px] overflow-y-auto pr-3">
            {currentCategoryItems.length === 0 ? (
              <div className="p-8 text-center bg-[#FFFDF8] border border-[#E7DFD4] rounded-sm text-sm text-[#5A4A42]">
                No menu items match your search filter. Clear search to view category items.
              </div>
            ) : (
              currentCategoryItems.map((item, idx) => {
                const isSelected = activeDish?.id === item.id;
                const isInFlight = tastingFlight.some((f) => f.id === item.id);

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setSelectedDishIndex(idx)}
                    whileHover={{ x: 4 }}
                    className={`p-5 rounded-sm cursor-pointer transition-all duration-300 border flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#FFFDF8] border-[#C8A96A] shadow-md'
                        : 'bg-[#FFFDF8]/70 border-[#E7DFD4] hover:border-[#C8A96A]/60'
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2.5 text-[10px] font-modern uppercase tracking-wider mb-1">
                        <span className="font-semibold text-[#A63A2B]">{item.id}</span>
                        <span className="text-[#C8A96A]">·</span>
                        <span className="text-[#5A4A42]">{item.categoryName}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#E7DFD4]/50 text-[#1B1B1B]">
                          {item.dietary}
                        </span>
                      </div>
                      <h4
                        className={`font-editorial text-xl md:text-2xl transition-colors ${
                          isSelected
                            ? 'text-[#A63A2B] font-medium'
                            : 'text-[#1B1B1B] group-hover:text-[#A63A2B]'
                        }`}
                      >
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#5A4A42] line-clamp-1 mt-1 font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="font-editorial text-2xl text-[#1B1B1B] font-light">
                          ${item.price_sgd}
                        </span>
                        <span className="block text-[9px] font-modern uppercase tracking-wider text-[#5A4A42]">
                          SGD
                        </span>
                      </div>

                      {/* Add to Flight Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlightItem(item);
                        }}
                        className={`p-2 rounded-full border transition-all ${
                          isInFlight
                            ? 'bg-[#A63A2B] border-[#A63A2B] text-white'
                            : 'border-[#E7DFD4] text-[#5A4A42] hover:border-[#C8A96A] hover:text-[#1B1B1B] bg-white'
                        }`}
                        title={isInFlight ? 'Remove from flight' : 'Add to degustation flight'}
                      >
                        {isInFlight ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Right Column: Sticky Visual Dish Projection & Pairing Storytelling */}
          <div className="lg:col-span-6 sticky top-28">
            <AnimatePresence mode="wait">
              {activeDish && (
                <motion.div
                  key={activeDish.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 md:p-10 rounded-sm bg-[#FFFDF8] border border-[#C8A96A]/40 shadow-xl"
                >
                  {/* Category Header Badge */}
                  <div className="flex items-center justify-between text-xs font-modern uppercase tracking-[0.25em] text-[#C8A96A] mb-4">
                    <span>
                      {activeDish.id} · {activeDish.categoryName}
                    </span>
                    <span className="text-[#A63A2B] font-semibold">
                      ${activeDish.price_sgd} SGD
                    </span>
                  </div>

                  <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B] mb-2 leading-tight">
                    {activeDish.name}
                  </h3>
                  <p className="font-modern text-xs text-[#5A4A42] uppercase tracking-wider mb-6">
                    {activeDish.categoryEditorial}
                  </p>

                  {/* High Res Plating Presentation */}
                  <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden mb-6 bg-[#1B1B1B]">
                    <img
                      src={activeDish.image}
                      alt={activeDish.name}
                      className="w-full h-full object-cover filter contrast-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-[11px] font-modern">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#C8A96A]" />
                        {activeDish.calories} kcal · {activeDish.dietary}
                      </span>
                      <span className="text-[#E8D3A7]">Live Plating Preview</span>
                    </div>
                  </div>

                  {/* Culinary Preparation Story */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-[10px] font-modern uppercase tracking-widest text-[#A63A2B] block mb-1">
                        Savora Preparation Method
                      </span>
                      <p className="text-sm font-sans text-[#5A4A42] leading-relaxed">
                        {activeDish.description}
                      </p>
                    </div>

                    <div className="p-4 rounded-sm bg-[#F7F3EB] border border-[#E7DFD4] flex items-start gap-3">
                      <Wine className="w-5 h-5 text-[#A63A2B] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] block">
                          Sommelier Recommendation
                        </span>
                        <p className="font-editorial text-base text-[#1B1B1B] italic">
                          Pair with a crisp 2020 Sancerre or biodynamic Straits botanical tea infusion.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flight Button CTA */}
                  <button
                    onClick={() => toggleFlightItem(activeDish)}
                    className={`w-full py-3 rounded-full text-xs font-modern uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 ${
                      tastingFlight.some((f) => f.id === activeDish.id)
                        ? 'bg-[#A63A2B] text-white hover:bg-[#8e2e21]'
                        : 'bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B]'
                    }`}
                  >
                    {tastingFlight.some((f) => f.id === activeDish.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Included In Your Tasting Flight</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-[#C8A96A]" />
                        <span>Add To Tasting Flight (${activeDish.price_sgd} SGD)</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Tasting Flight Curated Drawer */}
      <AnimatePresence>
        {showFlightDrawer && (
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
              className="w-full max-w-lg h-full bg-[#FFFDF8] p-6 md:p-10 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E7DFD4] pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-modern uppercase tracking-widest text-[#C8A96A]">
                      Personal Degustation
                    </span>
                    <h3 className="font-editorial text-2xl md:text-3xl text-[#1B1B1B]">
                      Tasting Flight Builder
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowFlightDrawer(false)}
                    className="p-2 rounded-full border border-[#E7DFD4] hover:bg-[#1B1B1B] hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {tastingFlight.length === 0 ? (
                  <div className="py-16 text-center text-[#5A4A42]">
                    <Utensils className="w-10 h-10 text-[#C8A96A] mx-auto mb-3 opacity-60" />
                    <p className="font-editorial text-xl text-[#1B1B1B] mb-2">
                      Your Degustation Flight is Empty
                    </p>
                    <p className="text-xs font-sans max-w-xs mx-auto">
                      Explore the 300 menu items and click &ldquo;+&rdquo; to curate your bespoke multi-course journey.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tastingFlight.map((dish, i) => (
                      <div
                        key={dish.id}
                        className="p-4 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm flex items-center justify-between"
                      >
                        <div>
                          <span className="text-[9px] font-modern uppercase tracking-widest text-[#A63A2B]">
                            Degustation Selection · {dish.id}
                          </span>
                          <h5 className="font-editorial text-lg text-[#1B1B1B]">{dish.name}</h5>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-editorial text-xl text-[#1B1B1B]">
                            ${dish.price_sgd}
                          </span>
                          <button
                            onClick={() => toggleFlightItem(dish)}
                            className="text-[#5A4A42] hover:text-[#A63A2B]"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {tastingFlight.length > 0 && (
                <div className="pt-6 border-t border-[#E7DFD4] space-y-4">
                  <div className="flex items-center justify-between text-sm font-modern">
                    <span className="text-[#5A4A42] uppercase tracking-wider">Flight Total:</span>
                    <span className="font-editorial text-3xl text-[#1B1B1B] font-light">
                      ${totalFlightPrice} SGD
                    </span>
                  </div>
                  <a
                    href="#reservations"
                    onClick={() => setShowFlightDrawer(false)}
                    className="w-full py-3.5 rounded-full bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] text-xs font-modern uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Reserve Table With This Tasting Flight</span>
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
