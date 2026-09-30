'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  RawReservation,
  RESTAURANT_METADATA,
} from '@/lib/dataset';
import {
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Sparkles,
  Clock,
  Wine,
  CheckCircle2,
  ShieldCheck,
  Download,
  Search,
  X,
  ArrowRight,
} from 'lucide-react';

interface ReservationStudioProps {
  initialEstateId?: string;
}

export default function ReservationStudio({ initialEstateId }: ReservationStudioProps) {
  const [selectedEstateId, setSelectedEstateId] = useState(initialEstateId || 'RST001');
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [guestCount, setGuestCount] = useState(2);
  const [seatingExperience, setSeatingExperience] = useState('The Chef’s Counter Front Row');
  const [seatingTime, setSeatingTime] = useState('19:30');
  const [winePairingPreference, setWinePairingPreference] = useState('Grand Cru Sommelier Flight');
  const [specialRequests, setSpecialRequests] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<{
    id: string;
    code: string;
    estateName: string;
    district: string;
    date: string;
    time: string;
    guests: number;
    experience: string;
  } | null>(null);
  const [showLedgerDrawer, setShowAllLedgerDrawer] = useState(false);
  const [ledgerSearch, setLedgerSearch] = useState('');

  const selectedRestaurant =
    dataset.restaurants.find((r) => r.id === selectedEstateId) || dataset.restaurants[0];
  const meta = RESTAURANT_METADATA[selectedRestaurant.id] || RESTAURANT_METADATA['RST001'];

  // Handle Form Submission
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    // Dynamically assign one available reservation ID from dataset
    const availableSlot = dataset.reservations[Math.floor(Math.random() * dataset.reservations.length)];
    const assignedId = availableSlot?.id || 'RES001';

    setConfirmedReservation({
      id: assignedId,
      code: `SAVORA-${assignedId}-${Math.floor(1000 + Math.random() * 9000)}`,
      estateName: selectedRestaurant.name,
      district: selectedRestaurant.district,
      date: selectedDate,
      time: seatingTime,
      guests: guestCount,
      experience: seatingExperience,
    });
  };

  const seatingExperiences = [
    'The Chef’s Counter Front Row (Direct Kitchen Theatre)',
    'Waterfront Skyline Banquette (Marina & Panoramic Views)',
    'The Travertine Main Salon (Classical Ambiance)',
    'Private Vault Alcove (Intimate Acoustic Enclosure)',
  ];

  const diningTimes = [
    '12:00',
    '12:45',
    '13:30',
    '18:00',
    '18:45',
    '19:30',
    '20:15',
    '21:00',
  ];

  const filteredReservations = dataset.reservations.filter((res) =>
    res.id.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
    res.status.toLowerCase().includes(ledgerSearch.toLowerCase())
  );

  return (
    <section id="reservations" className="relative py-28 md:py-36 bg-[#F7F3EB] overflow-hidden">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>L&apos;Accueil & Table Concierge</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#1B1B1B] tracking-tight">
              Reservation Studio
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed font-light">
              Modeled after the quiet precision of five-star Swiss hospitality. Every reservation includes
              a dedicated table sommelier, personalized dietary accommodation, and valet greeting.
            </p>
            <button
              onClick={() => setShowAllLedgerDrawer(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-modern uppercase tracking-[0.2em] text-[#A63A2B] hover:text-[#1B1B1B] transition-colors"
            >
              <span>Inspect Live 150-Table Reservation Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Reservation Studio Card (Luxury Hotel Booking Interface) */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="bg-[#FFFDF8] border border-[#C8A96A]/50 rounded-sm shadow-xl p-8 md:p-14 relative">
          <div className="flex items-center justify-between border-b border-[#E7DFD4] pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A63A2B] animate-pulse" />
              <span className="text-xs font-modern uppercase tracking-widest text-[#1B1B1B] font-medium">
                Live Table Concierge · Singapore
              </span>
            </div>
            <span className="text-xs font-modern text-[#C8A96A] uppercase tracking-wider">
              150 Verified Real-Time Slots
            </span>
          </div>

          {confirmedReservation ? (
            /* Confirmed Luxury VIP Pass Presentation */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 rounded-sm bg-[#F7F3EB] border-2 border-[#C8A96A] text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#1B1B1B] text-[#C8A96A] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-modern uppercase tracking-[0.3em] text-[#A63A2B] font-semibold">
                  Reservation Confirmed · Dataset Verified {confirmedReservation.id}
                </span>
                <h3 className="font-editorial text-4xl md:text-5xl text-[#1B1B1B] mt-2 mb-1">
                  We Await Your Arrival
                </h3>
                <p className="font-modern text-sm text-[#5A4A42]">
                  Reference: <span className="text-[#1B1B1B] font-bold">{confirmedReservation.code}</span>
                </p>
              </div>

              {/* Pass Details Card */}
              <div className="max-w-xl mx-auto p-6 bg-[#FFFDF8] border border-[#E7DFD4] rounded-sm text-left grid grid-cols-2 gap-4 text-xs font-modern text-[#5A4A42]">
                <div>
                  <span className="text-[#C8A96A] uppercase tracking-wider block">Estate</span>
                  <span className="font-semibold text-sm text-[#1B1B1B]">{confirmedReservation.estateName}</span>
                </div>
                <div>
                  <span className="text-[#C8A96A] uppercase tracking-wider block">District</span>
                  <span className="font-semibold text-sm text-[#1B1B1B]">{confirmedReservation.district}</span>
                </div>
                <div>
                  <span className="text-[#C8A96A] uppercase tracking-wider block">Date & Seating</span>
                  <span className="font-semibold text-sm text-[#1B1B1B]">{confirmedReservation.date} at {confirmedReservation.time}</span>
                </div>
                <div>
                  <span className="text-[#C8A96A] uppercase tracking-wider block">Guests & Table</span>
                  <span className="font-semibold text-sm text-[#1B1B1B]">{confirmedReservation.guests} Guests · {confirmedReservation.experience.split('(')[0]}</span>
                </div>
              </div>

              <p className="text-xs font-sans text-[#5A4A42] max-w-md mx-auto leading-relaxed">
                A confirmation dossier has been dispatched to your mobile concierge. Dress code is smart elegant.
              </p>

              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-full border border-[#1B1B1B] bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] hover:border-[#A63A2B] text-xs font-modern uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span>Download VIP Pass</span>
                </button>
                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="px-6 py-3 rounded-full border border-[#E7DFD4] text-[#1B1B1B] hover:border-[#C8A96A] text-xs font-modern uppercase tracking-wider transition-colors"
                >
                  Book Another Estate
                </button>
              </div>
            </motion.div>
          ) : (
            /* Booking Flow Form */
            <form onSubmit={handleConfirmReservation} className="space-y-8">
              {/* Step 1: Location & Estate Selector */}
              <div>
                <label className="block text-xs font-modern uppercase tracking-widest text-[#C8A96A] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A63A2B]" />
                  <span>Select Singapore Estate</span>
                </label>
                <select
                  value={selectedEstateId}
                  onChange={(e) => setSelectedEstateId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-sm font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A] cursor-pointer"
                >
                  {dataset.restaurants.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.district}) — {r.cuisine}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-[#5A4A42] font-light">
                  {meta.subtitle} · {meta.operatingHours}
                </p>
              </div>

              {/* Step 2: Date, Time & Guests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-modern uppercase tracking-widest text-[#C8A96A] mb-2 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#A63A2B]" />
                    <span>Reservation Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-modern uppercase tracking-widest text-[#C8A96A] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A63A2B]" />
                    <span>Seating Time</span>
                  </label>
                  <select
                    value={seatingTime}
                    onChange={(e) => setSeatingTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A] cursor-pointer"
                  >
                    {diningTimes.map((t) => (
                      <option key={t} value={t}>
                        {t} {parseInt(t.split(':')[0], 10) < 15 ? 'Lunch' : 'Dinner'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-modern uppercase tracking-widest text-[#C8A96A] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#A63A2B]" />
                    <span>Guests</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setGuestCount(num)}
                        className={`flex-1 py-2 text-xs font-modern rounded-sm border transition-colors ${
                          guestCount === num
                            ? 'bg-[#1B1B1B] text-[#FFFDF8] border-[#1B1B1B]'
                            : 'bg-[#F7F3EB] border-[#E7DFD4] text-[#5A4A42] hover:border-[#C8A96A]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step: Dining Experience & Table Placement */}
              <div>
                <label className="block text-xs font-modern uppercase tracking-widest text-[#C8A96A] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A63A2B]" />
                  <span>Dining Experience & Salon Atmosphere</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingExperiences.map((exp) => (
                    <button
                      type="button"
                      key={exp}
                      onClick={() => setSeatingExperience(exp)}
                      className={`p-3.5 rounded-sm border text-left text-xs font-modern transition-all ${
                        seatingExperience === exp
                          ? 'bg-[#1B1B1B] text-[#FFFDF8] border-[#1B1B1B] shadow-sm'
                          : 'bg-[#F7F3EB] border-[#E7DFD4] text-[#1B1B1B] hover:border-[#C8A96A]'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Guest Contact Details & Special Requests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E7DFD4]">
                <div>
                  <label className="block text-[10px] font-modern uppercase tracking-wider text-[#5A4A42] mb-1">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Sterling / Dr. Evelyn Tan"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-modern uppercase tracking-wider text-[#5A4A42] mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+65 9123 4567"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-2 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-modern uppercase tracking-wider text-[#5A4A42] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@luxuryestate.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-modern uppercase tracking-wider text-[#5A4A42] mb-1">
                  Special Requests & Dietary Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Allergies, anniversary champagne arrangements, preferred vintage cellar allocations..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-2 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern text-[#1B1B1B] focus:outline-none focus:border-[#C8A96A]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] text-xs font-modern uppercase tracking-[0.25em] font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C8A96A]" />
                  <span>Confirm Table Reservation at {selectedRestaurant.name}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 150 Reservations Live Ledger Drawer */}
      <AnimatePresence>
        {showLedgerDrawer && (
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
              className="w-full max-w-3xl h-full bg-[#FFFDF8] overflow-y-auto p-6 md:p-12 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E7DFD4] pb-6 mb-8">
                  <div>
                    <span className="text-[10px] font-modern uppercase tracking-[0.3em] text-[#C8A96A]">
                      Live Table Availability
                    </span>
                    <h3 className="font-editorial text-3xl md:text-4xl text-[#1B1B1B]">
                      150 Real-Time Reservation Slots
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAllLedgerDrawer(false)}
                    className="p-2.5 rounded-full border border-[#E7DFD4] hover:bg-[#1B1B1B] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative mb-6">
                  <Search className="w-4 h-4 text-[#5A4A42] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search reservation slot by ID (RES001 - RES150)..."
                    value={ledgerSearch}
                    onChange={(e) => setLedgerSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm text-xs font-modern placeholder:text-[#5A4A42]/60 focus:outline-none focus:border-[#C8A96A]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredReservations.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 bg-[#F7F3EB] border border-[#E7DFD4] rounded-sm flex items-center justify-between text-xs font-modern"
                    >
                      <span className="font-semibold text-[#1B1B1B]">{res.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#A63A2B]/10 text-[#A63A2B] font-medium">
                        {res.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#E7DFD4] mt-8 text-center text-xs font-modern text-[#5A4A42]">
                Displaying {filteredReservations.length} of 150 real-time reservation tokens rendered from dataset
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
