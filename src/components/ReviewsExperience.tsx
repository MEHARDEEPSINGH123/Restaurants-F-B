'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  REVIEW_CRITICS,
  REVIEW_QUOTES,
  RawReview,
} from '@/lib/dataset';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search,
  X,
  Sparkles,
} from 'lucide-react';

export default function ReviewsExperience() {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [showAllDrawer, setShowAllDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Enrich the 300 reviews from the dataset
  const enrichedReviews = dataset.reviews.map((rev, idx) => {
    const critic = REVIEW_CRITICS[idx % REVIEW_CRITICS.length];
    const quote = REVIEW_QUOTES[idx % REVIEW_QUOTES.length];
    const diningDates = ['October 2026', 'September 2026', 'August 2026', 'July 2026', 'June 2026'];
    const estates = [
      'Marina Bay Atelier (RST001)',
      'Orchard Haute Pavilion (RST002)',
      'Sentosa Coastal Reef Deck (RST003)',
      'Bugis Hinoki Counter (RST004)',
      'Novena Tuscan Herb Conservatory (RST008)',
    ];

    return {
      ...rev,
      criticSource: critic.source,
      criticName: critic.critic,
      quote,
      diningDate: diningDates[idx % diningDates.length],
      estate: estates[idx % estates.length],
    };
  });

  const currentReview = enrichedReviews[activeReviewIdx];

  const handleNext = () => {
    setActiveReviewIdx((prev) => (prev + 1) % 10);
  };

  const handlePrev = () => {
    setActiveReviewIdx((prev) => (prev - 1 + 10) % 10);
  };

  const filtered = enrichedReviews.filter(
    (r) =>
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.criticSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.criticName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.quote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="reviews" className="relative py-28 md:py-36 bg-[#1B1B1B] text-[#FFFDF8] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A63A2B]/10 blur-[150px] pointer-events-none" />

      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5A4A42]/50 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>The Critics & Accreditations</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#FFFDF8] tracking-tight">
              Editorial Reviews
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#E7DFD4]/70 leading-relaxed font-light">
              Reflections from international culinary inspectors, gastronomy laureates, and patrons of
              the arts who have experienced our 15 Singapore dining rooms.
            </p>
            <button
              onClick={() => setShowAllDrawer(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#C8A96A] hover:text-[#FFFDF8] transition-colors"
            >
              <span>Explore All 300 Certified 5-Star Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Large Minimal Editorial Quote Presentation */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-8"
          >
            {/* 5-Star & ID Header */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1 text-[#C8A96A]">
                {Array.from({ length: currentReview.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C8A96A]" />
                ))}
              </div>
              <span className="text-xs font-modern uppercase tracking-widest text-[#E7DFD4]/60">
                {currentReview.id} · Certified Review
              </span>
            </div>

            {/* Giant Cormorant Pull Quote */}
            <blockquote className="relative">
              <Quote className="w-16 h-16 text-[#C8A96A]/20 mx-auto mb-4" />
              <p className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFDF8] font-light leading-snug tracking-tight italic">
                &ldquo;{currentReview.quote}&rdquo;
              </p>
            </blockquote>

            {/* Critic Colophon */}
            <div className="pt-4 border-t border-[#5A4A42]/50 space-y-1">
              <p className="font-modern text-sm md:text-base text-[#C8A96A] uppercase tracking-widest font-medium">
                {currentReview.criticSource}
              </p>
              <p className="text-xs font-modern text-[#E7DFD4]/60">
                {currentReview.criticName} · Evaluated at {currentReview.estate}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Minimal Controls */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-[#5A4A42] text-[#E7DFD4] hover:border-[#C8A96A] hover:text-white transition-colors"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-modern uppercase tracking-widest text-[#C8A96A]">
            Featured Accreditations
          </span>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-[#5A4A42] text-[#E7DFD4] hover:border-[#C8A96A] hover:text-white transition-colors"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 300 Reviews Archive Drawer */}
      <AnimatePresence>
        {showAllDrawer && (
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
                      Editorial Accreditations
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#FFFDF8]">
                      All 300 Certified 5-Star Reviews
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAllDrawer(false)}
                    className="p-2.5 rounded-full border border-[#5A4A42] hover:bg-[#FFFDF8] hover:text-[#1B1B1B] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative mb-6">
                  <Search className="w-4 h-4 text-[#C8A96A] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search reviews by ID, critic, or quote keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#242424] border border-[#5A4A42] rounded-sm text-xs font-modern placeholder:text-[#E7DFD4]/40 focus:outline-none focus:border-[#C8A96A] text-[#FFFDF8]"
                  />
                </div>

                <div className="space-y-4">
                  {filtered.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 bg-[#242424] border border-[#5A4A42]/50 rounded-sm hover:border-[#C8A96A] transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#A63A2B]">{rev.id}</span>
                          <span>·</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-[#C8A96A] text-[#C8A96A]" />
                            ))}
                          </div>
                        </div>
                        <span className="text-[#E7DFD4]/60">{rev.diningDate}</span>
                      </div>
                      <p className="font-editorial text-lg text-[#FFFDF8] italic mb-3 font-light leading-relaxed">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-modern text-[#E7DFD4]/60 pt-2 border-t border-[#5A4A42]/30">
                        <span className="text-[#C8A96A]">{rev.criticSource}</span>
                        <span>{rev.estate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#5A4A42]/50 mt-8 text-center text-xs font-modern text-[#E7DFD4]/60">
                Displaying {filtered.length} of 300 reviews dynamically rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
