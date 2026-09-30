'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  RawPromotion,
} from '@/lib/dataset';
import {
  Sparkles,
  Wine,
  Gift,
  ArrowRight,
  ShieldCheck,
  Search,
  X,
} from 'lucide-react';

export default function PromotionsExperience() {
  const [showAllDrawer, setShowAllDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Enrich the 40 promotions with luxury privileges
  const promotionsEnriched = dataset.promotions.map((p, idx) => {
    const privileges = [
      'Complimentary Vintage Champagne Welcome Pairing with 7-Course Tasting',
      'Private Sommelier Underground Cellar Tour with Reserve Bookings',
      'Exclusive Chef Table Upgrade for Anniversary Milestones',
      'White-Glove Luxury Chauffeur Arrival Service from Singapore Hotels',
      'Signed Culinary Folio & Rare Botanical Tea Keepsake',
    ];
    return {
      ...p,
      privilege: privileges[idx % privileges.length],
      code: `SAVORA-${p.id}`,
      validity: 'Valid through 2026 Season',
      applicableEstates: 'All 15 Singapore Estates',
    };
  });

  const featured = promotionsEnriched.slice(0, 3);

  const filtered = promotionsEnriched.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.privilege.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative py-24 md:py-32 bg-[#FFFDF8] overflow-hidden border-t border-[#E7DFD4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>Privileges & Cellar Allocations</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-light text-[#1B1B1B] tracking-tight">
              Curated Privileges
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowAllDrawer(true)}
              className="inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#A63A2B] hover:text-[#1B1B1B] transition-colors"
            >
              <span>Explore All 40 Patron Privileges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Featured Patron Privileges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((promo) => (
            <div
              key={promo.id}
              className="p-8 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm hover:border-[#C8A96A] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-3">
                  <span className="font-semibold text-[#A63A2B]">{promo.id}</span>
                  <span>{promo.applicableEstates}</span>
                </div>
                <h3 className="font-editorial text-2xl md:text-3xl text-[#1B1B1B] mb-2">
                  {promo.title}
                </h3>
                <p className="text-xs font-sans text-[#5A4A42] leading-relaxed mb-6 font-light">
                  {promo.privilege}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7DFD4] flex items-center justify-between text-xs font-modern">
                <span className="text-[#5A4A42] tracking-wider">{promo.code}</span>
                <a href="#reservations" className="text-[#A63A2B] hover:underline font-medium">
                  Apply &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 40 Promotions Fullscreen Drawer */}
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
                      Cellar Allocations
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B]">
                      All 40 Exclusive Privileges
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAllDrawer(false)}
                    className="p-2.5 rounded-full border border-[#E7DFD4] hover:bg-[#1B1B1B] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative mb-6">
                  <Search className="w-4 h-4 text-[#5A4A42] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search privileges by title or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern placeholder:text-[#5A4A42]/60 focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((promo) => (
                    <div
                      key={promo.id}
                      className="p-5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm hover:border-[#C8A96A] transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-1">
                        <span className="font-semibold text-[#A63A2B]">{promo.id}</span>
                        <span>{promo.code}</span>
                      </div>
                      <h4 className="font-editorial text-xl text-[#1B1B1B] mb-1">
                        {promo.title}
                      </h4>
                      <p className="text-xs text-[#5A4A42] font-sans mb-3 font-light">
                        {promo.privilege}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-modern text-[#5A4A42] pt-2 border-t border-[#E7DFD4]">
                        <span>{promo.validity}</span>
                        <a href="#reservations" onClick={() => setShowAllDrawer(false)} className="text-[#A63A2B] hover:underline">
                          Reserve With Privilege &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#E7DFD4] mt-8 text-center text-xs font-modern text-[#5A4A42]">
                Displaying {filtered.length} of 40 privileges rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
