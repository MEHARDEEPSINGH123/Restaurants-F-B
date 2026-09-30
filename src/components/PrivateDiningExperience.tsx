'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  RawPrivateDiningPackage,
} from '@/lib/dataset';
import {
  Crown,
  Sparkles,
  Users,
  Wine,
  ShieldCheck,
  ArrowRight,
  X,
  Search,
  CheckCircle2,
} from 'lucide-react';

export default function PrivateDiningExperience() {
  const [selectedPackage, setSelectedPackage] = useState<RawPrivateDiningPackage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllDrawer, setShowAllDrawer] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  // Curate rich attributes for all 30 packages
  const packagesEnriched = dataset.private_dining_packages.map((pkg, idx) => {
    const capacities = [8, 12, 16, 20, 24, 30];
    const styles = [
      'The Skyline Glass Salon · Marina Bay',
      'The Subterranean Wine Vault · Orchard',
      'The Waterfront Pavilion · Sentosa',
      'The Hinoki Kaiseki Chamber · Bugis',
      'The Heritage Shophouse Attic · Katong',
    ];
    const experiences = [
      'Full bespoke 8-course degustation personally executed by an Executive Chef with dedicated Master Sommelier.',
      'Intimate omakase counter with rare seasonal seafood flown directly from Tokyo’s Toyosu market.',
      'Candlelit terrace dining with private champagne bar and customized live harp accompaniment.',
      'Heirloom Peranakan feast served on antique porcelain with rare aged tea pairings.',
    ];
    return {
      ...pkg,
      capacity: capacities[idx % capacities.length],
      locationTheme: styles[idx % styles.length],
      experience: experiences[idx % experiences.length],
      minimumSpendSGD: 2800 + (idx * 350),
      image: [
        'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      ][idx % 4],
    };
  });

  const featured = packagesEnriched.slice(0, 3);

  const filtered = packagesEnriched.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locationTheme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="private-dining" className="relative py-28 md:py-36 bg-[#1B1B1B] text-[#FFFDF8] overflow-hidden">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5A4A42]/50 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>Private Salons & Ateliers</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#FFFDF8] tracking-tight">
              Private Dining
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#E7DFD4]/70 leading-relaxed font-light">
              Bespoke hospitality designed for dignitaries, intimate family milestones, and discrete
              gatherings. Complete acoustic privacy, personal kitchen brigade, and custom menu calligraphy.
            </p>
            <button
              onClick={() => setShowAllDrawer(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#C8A96A] hover:text-[#FFFDF8] transition-colors"
            >
              <span>Explore All 30 Private Dining Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured 3 Private Salons (Magazine Style Layout) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {featured.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 md:p-10 rounded-sm bg-[#242424]/60 border border-[#5A4A42]/40 hover:border-[#C8A96A]/60 transition-all"
          >
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-sm overflow-hidden bg-[#1B1B1B]">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#1B1B1B]/80 backdrop-blur-md border border-[#C8A96A]/40 rounded-full text-[10px] font-modern uppercase tracking-widest text-[#FFFDF8]">
                {pkg.id} · Up to {pkg.capacity} Guests
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-modern uppercase tracking-widest text-[#C8A96A]">
                <Crown className="w-4 h-4 text-[#A63A2B]" />
                <span>{pkg.locationTheme}</span>
              </div>
              <h3 className="font-editorial text-3xl md:text-4xl text-[#FFFDF8]">
                {pkg.name}
              </h3>
              <p className="font-sans text-sm text-[#E7DFD4]/80 leading-relaxed font-light">
                {pkg.experience}
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#5A4A42]/30 text-xs font-modern">
                <div>
                  <span className="text-[#C8A96A] uppercase tracking-wider block">Service Allocation</span>
                  <span className="text-[#FFFDF8]">1 Butler per 4 Guests</span>
                </div>
                <div>
                  <span className="text-[#C8A96A] uppercase tracking-wider block">Starting Allocation</span>
                  <span className="text-[#FFFDF8]">${pkg.minimumSpendSGD} SGD</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="px-6 py-3 rounded-full bg-[#FFFDF8] text-[#1B1B1B] hover:bg-[#A63A2B] hover:text-white text-xs font-modern uppercase tracking-[0.2em] font-medium transition-all"
                >
                  Inquire Private Salon
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 30 Package Fullscreen Drawer */}
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
                      Bespoke Hospitality
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#FFFDF8]">
                      All 30 Private Dining Packages
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
                    placeholder="Search private dining packages by name or district..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#242424] border border-[#5A4A42] rounded-sm text-xs font-modern placeholder:text-[#E7DFD4]/40 focus:outline-none focus:border-[#C8A96A] text-[#FFFDF8]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className="p-5 bg-[#242424] border border-[#5A4A42]/50 rounded-sm hover:border-[#C8A96A] cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-2">
                        <span className="font-semibold text-[#A63A2B]">{pkg.id}</span>
                        <span>Max {pkg.capacity} Guests</span>
                      </div>
                      <h4 className="font-editorial text-2xl text-[#FFFDF8] mb-1">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-[#C8A96A] font-modern mb-2">
                        {pkg.locationTheme}
                      </p>
                      <p className="text-xs text-[#E7DFD4]/70 line-clamp-2 font-light">
                        {pkg.experience}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#5A4A42]/50 mt-8 text-center text-xs font-modern text-[#E7DFD4]/60">
                Displaying {filtered.length} of 30 private dining packages rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Private Dining Inquiry Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1B1B1B]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-xl w-full bg-[#242424] border border-[#C8A96A]/60 rounded-sm p-6 md:p-10 shadow-2xl relative text-[#FFFDF8]"
            >
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  setInquirySent(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#5A4A42] hover:bg-[#FFFDF8] hover:text-[#1B1B1B] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-modern uppercase tracking-widest text-[#C8A96A] mb-2">
                <span>{selectedPackage.id}</span>
                <span>·</span>
                <span>Private Dining Concierge</span>
              </div>

              <h3 className="font-editorial text-3xl md:text-4xl text-[#FFFDF8] mb-2">
                {selectedPackage.name}
              </h3>
              <p className="text-xs font-modern text-[#C8A96A] mb-6">
                {selectedPackage.name}
              </p>

              {inquirySent ? (
                <div className="p-8 text-center bg-[#1B1B1B] border border-[#C8A96A]/40 rounded-sm space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#C8A96A] mx-auto" />
                  <h4 className="font-editorial text-2xl text-[#FFFDF8]">
                    Inquiry Confirmed
                  </h4>
                  <p className="text-xs text-[#E7DFD4]/80">
                    The Chief Sommelier & Private Dining Director will reach out within 4 hours to craft your tailored tasting itinerary.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInquirySent(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[10px] font-modern uppercase tracking-wider text-[#C8A96A] mb-1">
                      Guest Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ambassador Laurent or Private Host"
                      className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#5A4A42] rounded-sm text-xs font-modern text-[#FFFDF8] focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-modern uppercase tracking-wider text-[#C8A96A] mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2 bg-[#1B1B1B] border border-[#5A4A42] rounded-sm text-xs font-modern text-[#FFFDF8] focus:outline-none focus:border-[#C8A96A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-modern uppercase tracking-wider text-[#C8A96A] mb-1">
                        Guest Count
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="30"
                        defaultValue="8"
                        required
                        className="w-full px-4 py-2 bg-[#1B1B1B] border border-[#5A4A42] rounded-sm text-xs font-modern text-[#FFFDF8] focus:outline-none focus:border-[#C8A96A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-modern uppercase tracking-wider text-[#C8A96A] mb-1">
                      Special Dining Requests / Vintage Cellar Preference
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please note any dietary requirements, anniversary preparations, or grand cru wine preferences..."
                      className="w-full px-4 py-2.5 bg-[#1B1B1B] border border-[#5A4A42] rounded-sm text-xs font-modern text-[#FFFDF8] focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#C8A96A] text-[#1B1B1B] font-modern text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#FFFDF8] transition-colors"
                  >
                    Submit Private Salon Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
