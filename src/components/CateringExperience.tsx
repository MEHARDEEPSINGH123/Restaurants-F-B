'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  RawCateringPackage,
} from '@/lib/dataset';
import {
  Building2,
  Heart,
  Ship,
  Sparkles,
  Users,
  UtensilsCrossed,
  ArrowRight,
  Search,
  X,
  CheckCircle2,
} from 'lucide-react';

export default function CateringExperience() {
  const [selectedPillar, setSelectedPillar] = useState<'corporate' | 'weddings' | 'gatherings' | 'luxury'>('corporate');
  const [selectedPackage, setSelectedPackage] = useState<RawCateringPackage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllDrawer, setShowAllDrawer] = useState(false);
  const [cateringSent, setCateringSent] = useState(false);

  // The 4 Core Pillars required by the prompt
  const PILLARS = [
    {
      id: 'corporate',
      title: 'Corporate Events',
      icon: Building2,
      subtitle: 'Boardroom State Banquets & High-Jewelry Soirées',
      desc: 'Seamless Michelin-level dining for international diplomatic delegations, Fortune 500 summits, and private luxury maison reveals with silver-cloche service.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'weddings',
      title: 'Weddings',
      icon: Heart,
      subtitle: 'Grand Straits Botanical & Heritage Celebrations',
      desc: 'Orchestrating unforgettable romantic galas with bespoke floral installations, custom 7-course bridal tasting menus, and vintage champagne towers.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'gatherings',
      title: 'Private Gatherings',
      icon: Ship,
      subtitle: 'Superyacht Charters & Private Residence Soirées',
      desc: 'Intimate fine dining transported directly to your private estate or superyacht berthed at Sentosa Cove, complete with private chef brigade and live embers.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'luxury',
      title: 'Luxury Catering',
      icon: Sparkles,
      subtitle: 'Mobile Michelin Gastronomy & Sommelier Curation',
      desc: 'Complete mobile kitchen suites, hand-blown crystal stemware, and tableside master culinary theatrical performances anywhere in Singapore.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  // Enrich all 50 packages
  const packagesEnriched = dataset.catering_packages.map((pkg, idx) => {
    const capacities = ['30 – 80 Guests', '50 – 150 Guests', '100 – 300 Guests', '250 – 600 Guests'];
    const themes = [
      'Imperial State Degustation Reception',
      'Botanical Straits Gala Feast',
      'The Grand Cru & Live Embers Pavilion',
      'The Caviar, Oyster & Champagne Salon',
      'Haute Heritage Nyonya Royal Banquet',
    ];
    return {
      ...pkg,
      capacity: capacities[idx % capacities.length],
      theme: themes[idx % themes.length],
      serviceRatio: '1 Butler per 6 Guests',
      chefSupervision: 'Executive Sous Chef & Sommelier on-site',
      startingPerGuestSGD: 180 + (idx * 15),
    };
  });

  const activePillarData = PILLARS.find((p) => p.id === selectedPillar) || PILLARS[0];

  const filteredPackages = packagesEnriched.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.theme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="catering" className="relative py-28 md:py-36 bg-[#F7F3EB] overflow-hidden border-t border-[#E7DFD4]">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>Banquets & Haute Catering</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#1B1B1B] tracking-tight">
              Catering Experiences
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed font-light">
              We bring the theatrical artistry of Savora&apos;s Michelin kitchens to Singapore&apos;s most
              magnificent ballrooms, superyachts, and private colonial villas.
            </p>
            <button
              onClick={() => setShowAllDrawer(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#A63A2B] hover:text-[#1B1B1B] transition-colors"
            >
              <span>Explore All 50 Catering Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars Interactive Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id as typeof selectedPillar)}
                className={`p-6 rounded-sm text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-lg'
                    : 'bg-[#FFFDF8] text-[#1B1B1B] border-[#E7DFD4] hover:border-[#C8A96A]'
                }`}
              >
                <div>
                  <Icon
                    className={`w-6 h-6 mb-4 ${
                      isSelected ? 'text-[#C8A96A]' : 'text-[#A63A2B]'
                    }`}
                  />
                  <h3 className="font-editorial text-2xl mb-1">{p.title}</h3>
                </div>
                <span className={`text-[10px] font-modern uppercase tracking-wider ${
                  isSelected ? 'text-[#C8A96A]' : 'text-[#5A4A42]'
                }`}>
                  Explore Discipline &rarr;
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Pillar Editorial Feature Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <motion.div
          key={activePillarData.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-8 md:p-12 bg-[#FFFDF8] border border-[#E7DFD4] rounded-sm shadow-md"
        >
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-sm overflow-hidden bg-[#1B1B1B]">
            <img
              src={activePillarData.image}
              alt={activePillarData.title}
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-modern">
              <span className="text-[#C8A96A]">{activePillarData.title}</span>
              <span>White-Glove Hospitality</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-modern uppercase tracking-[0.25em] text-[#A63A2B] block">
              Curated Catering Discipline
            </span>
            <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B]">
              {activePillarData.subtitle}
            </h3>
            <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed font-light">
              {activePillarData.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#E7DFD4] text-xs font-modern text-[#5A4A42]">
              <div>
                <span className="text-[#C8A96A] uppercase tracking-wider block">Staffing Allocation</span>
                <span className="text-[#1B1B1B] font-medium">1 Butler per 6 Guests</span>
              </div>
              <div>
                <span className="text-[#C8A96A] uppercase tracking-wider block">Kitchen Architecture</span>
                <span className="text-[#1B1B1B] font-medium">Mobile Induction & Embers</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowAllDrawer(true)}
                className="px-6 py-3 rounded-full bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] text-xs font-modern uppercase tracking-[0.2em] font-medium transition-all"
              >
                View Packages For {activePillarData.title}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* All 50 Catering Packages Drawer */}
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
                      State & Gala Banquets
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B]">
                      All 50 Catering Packages
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
                    placeholder="Search catering packages by ID, name or format..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern placeholder:text-[#5A4A42]/60 focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className="p-5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm hover:border-[#C8A96A] cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-1.5">
                        <span className="font-semibold text-[#A63A2B]">{pkg.id}</span>
                        <span>{pkg.capacity}</span>
                      </div>
                      <h4 className="font-editorial text-2xl text-[#1B1B1B] mb-1">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-[#5A4A42] font-modern mb-2">
                        {pkg.theme}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-modern pt-2 border-t border-[#E7DFD4]">
                        <span className="text-[#5A4A42]">From ${pkg.startingPerGuestSGD} SGD / guest</span>
                        <span className="text-[#A63A2B] font-medium">Inquire &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#E7DFD4] mt-8 text-center text-xs font-modern text-[#5A4A42]">
                Displaying {filteredPackages.length} of 50 catering packages rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Catering Inquiry Modal */}
      <AnimatePresence>
        {selectedPackage && (
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
              className="max-w-xl w-full bg-[#FFFDF8] border border-[#C8A96A]/60 rounded-sm p-6 md:p-10 shadow-2xl relative text-[#1B1B1B]"
            >
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  setCateringSent(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#E7DFD4] hover:bg-[#1B1B1B] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-modern uppercase tracking-widest text-[#C8A96A] mb-2">
                <span>{selectedPackage.id}</span>
                <span>·</span>
                <span>Haute Banquet Consultation</span>
              </div>

              <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B] mb-1">
                {selectedPackage.name}
              </h3>
              <p className="text-xs font-modern text-[#A63A2B] mb-6">
                {selectedPackage.name}
              </p>

              {cateringSent ? (
                <div className="p-8 text-center bg-[#F7F3EB] border border-[#C8A96A]/40 rounded-sm space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#C8A96A] mx-auto" />
                  <h4 className="font-editorial text-2xl text-[#1B1B1B]">
                    Consultation Requested
                  </h4>
                  <p className="text-xs text-[#5A4A42]">
                    Our Senior Banquet Director will contact you within 24 hours to arrange a private tasting consultation.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCateringSent(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[10px] font-modern uppercase tracking-wider text-[#5A4A42] mb-1">
                      Event Host Name / Corporation
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marina Bay Gala Committee"
                      className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-modern uppercase tracking-wider text-[#5A4A42] mb-1">
                        Anticipated Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-modern uppercase tracking-wider text-[#5A4A42] mb-1">
                        Estimated Guests
                      </label>
                      <input
                        type="number"
                        min="20"
                        max="1000"
                        defaultValue="80"
                        required
                        className="w-full px-4 py-2 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-modern uppercase tracking-wider text-[#5A4A42] mb-1">
                      Event Venue / Superyacht Berth / Location Details
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sentosa Cove Marina berth or private botanical residence..."
                      className="w-full px-4 py-2 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#1B1B1B] text-[#FFFDF8] font-modern text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#A63A2B] transition-colors"
                  >
                    Submit Haute Catering Inquiry
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
