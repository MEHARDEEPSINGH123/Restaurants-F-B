'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  RawEvent,
} from '@/lib/dataset';
import {
  Calendar,
  Wine,
  Sparkles,
  Flame,
  Clock,
  MapPin,
  ArrowRight,
  Search,
  X,
  Ticket,
} from 'lucide-react';

export default function EventsExperience() {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventModal, setSelectedEventModal] = useState<RawEvent | null>(null);
  const [showAllDrawer, setShowAllDrawer] = useState(false);

  // Map the 50 events to the 4 categories specified by the prompt:
  // Chef's Table, Wine Pairing Nights, Seasonal Launches, Private Events
  const eventsEnriched = dataset.events.map((evt, idx) => {
    const categories = [
      "Chef's Table",
      'Wine Pairing Nights',
      'Seasonal Launches',
      'Private Events',
    ];
    const category = categories[idx % categories.length];

    const months = ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];
    const month = months[idx % months.length];
    const day = (10 + (idx * 3) % 18).toString();

    const descriptions = [
      'An intimate 8-seat counter experience with our Executive Director featuring live tableside finishing and experimental flavor pairings.',
      'A vertical flight through premier grand cru vintages cellared under temperature-perfect conditions, paired with 6 artisanal courses.',
      'Unveiling the new temporal harvest degustation with live classical acoustic performance and commemorative menu folio.',
      'Discreet salon gathering with vintage champagne reception, rare caviar bar, and bespoke culinary storytelling.',
    ];

    const locations = [
      'Marina Bay Flagship Atelier (RST001)',
      'Orchard Haute Pavilion (RST002)',
      'Sentosa Coastal Reef Deck (RST003)',
      'Bugis Hinoki Counter (RST004)',
      'Novena Tuscan Conservatory (RST008)',
    ];

    return {
      ...evt,
      category,
      dateString: `${month} ${day}, 2026`,
      timeString: idx % 2 === 0 ? '19:00 — 22:30' : '18:30 — 22:00',
      description: descriptions[idx % descriptions.length],
      location: locations[idx % locations.length],
      seatsAvailable: 2 + (idx % 8),
      ticketPriceSGD: 320 + (idx * 25),
    };
  });

  const featured = eventsEnriched.slice(0, 4);

  const filteredEvents = eventsEnriched.filter((e) => {
    const matchesCategory = filterType === 'All' || e.category === filterType;
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="events" className="relative py-28 md:py-36 bg-[#F7F3EB] overflow-hidden">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>Nocturnes & Gastronomic Soirées</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#1B1B1B] tracking-tight">
              Events Experience
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed font-light">
              Limited-attendance masterclass dinners, four-hands chef collabs, and grand cru nocturnal
              tastings hosted across our Singapore estates.
            </p>
            <button
              onClick={() => setShowAllDrawer(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#A63A2B] hover:text-[#1B1B1B] transition-colors"
            >
              <span>View All 50 Scheduled Gastronomic Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills (Chef's Table, Wine Pairing Nights, Seasonal Launches, Private Events) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
          {['All', "Chef's Table", 'Wine Pairing Nights', 'Seasonal Launches', 'Private Events'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-5 py-2 rounded-full text-xs font-modern uppercase tracking-wider transition-all whitespace-nowrap ${
                  filterType === cat
                    ? 'bg-[#1B1B1B] text-[#FFFDF8] shadow-md'
                    : 'bg-[#FFFDF8] border border-[#E7DFD4] text-[#5A4A42] hover:border-[#C8A96A] hover:text-[#1B1B1B]'
                }`}
              >
                {cat === 'All' ? 'All Movements' : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Interactive Timeline Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="space-y-6">
          {featured.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-6 md:p-8 bg-[#FFFDF8] border border-[#E7DFD4] rounded-sm hover:border-[#C8A96A] transition-all duration-300 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Date Block */}
              <div className="flex items-center gap-6 lg:w-4/12">
                <div className="w-20 h-20 rounded-sm bg-[#F7F3EB] border border-[#E7DFD4] flex flex-col items-center justify-center text-center shrink-0">
                  <span className="font-modern text-[10px] uppercase tracking-widest text-[#A63A2B] font-semibold">
                    {evt.dateString.split(' ')[0]}
                  </span>
                  <span className="font-editorial text-2xl text-[#1B1B1B] font-light">
                    {evt.dateString.split(' ')[1].replace(',', '')}
                  </span>
                  <span className="text-[9px] font-modern text-[#5A4A42]">2026</span>
                </div>

                <div>
                  <span className="text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] block mb-1">
                    {evt.id} · {evt.category}
                  </span>
                  <h3 className="font-editorial text-2xl md:text-3xl text-[#1B1B1B] group-hover:text-[#A63A2B] transition-colors leading-tight">
                    {evt.name}
                  </h3>
                </div>
              </div>

              {/* Event Location & Experience */}
              <div className="lg:w-5/12 space-y-2">
                <div className="flex items-center gap-4 text-xs font-modern text-[#5A4A42]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C8A96A]" />
                    {evt.timeString}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A63A2B]" />
                    {evt.location}
                  </span>
                </div>
                <p className="text-xs font-sans text-[#5A4A42] leading-relaxed line-clamp-2 font-light">
                  {evt.description}
                </p>
              </div>

              {/* Pricing & Reservation CTA */}
              <div className="lg:w-3/12 flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E7DFD4]">
                <div className="text-left lg:text-right">
                  <span className="font-editorial text-2xl text-[#1B1B1B] font-light">
                    ${evt.ticketPriceSGD}
                  </span>
                  <span className="block text-[9px] font-modern uppercase tracking-wider text-[#A63A2B]">
                    {evt.seatsAvailable} Seats Left
                  </span>
                </div>

                <a
                  href="#reservations"
                  className="px-5 py-2.5 rounded-full bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] text-xs font-modern uppercase tracking-[0.15em] font-medium transition-all whitespace-nowrap shadow-sm"
                >
                  Reserve Seat
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 50 Events Timeline Drawer */}
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
                      Gastronomic Calendar
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B]">
                      All 50 Scheduled Experiences
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
                    placeholder="Search events by name, ID, category or estate..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern placeholder:text-[#5A4A42]/60 focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div className="space-y-3">
                  {filteredEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-4 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm hover:border-[#C8A96A] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] mb-1">
                          <span className="font-semibold text-[#A63A2B]">{evt.id}</span>
                          <span>·</span>
                          <span>{evt.category}</span>
                          <span>·</span>
                          <span>{evt.dateString}</span>
                        </div>
                        <h4 className="font-editorial text-xl text-[#1B1B1B]">
                          {evt.name}
                        </h4>
                        <p className="text-xs text-[#5A4A42] font-sans">
                          {evt.location} ({evt.timeString})
                        </p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-editorial text-xl text-[#1B1B1B]">
                          ${evt.ticketPriceSGD} SGD
                        </span>
                        <a
                          href="#reservations"
                          onClick={() => setShowAllDrawer(false)}
                          className="px-4 py-2 rounded-full bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] text-[10px] font-modern uppercase tracking-wider transition-colors"
                        >
                          Book
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#E7DFD4] mt-8 text-center text-xs font-modern text-[#5A4A42]">
                Displaying {filteredEvents.length} of 50 events rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
