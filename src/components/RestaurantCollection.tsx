'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dataset,
  RESTAURANT_METADATA,
  RawRestaurant,
} from '@/lib/dataset';
import {
  MapPin,
  Clock,
  Sparkles,
  Award,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface RestaurantCollectionProps {
  onSelectEstateForReservation?: (estateId: string, estateName: string) => void;
}

export default function RestaurantCollection({
  onSelectEstateForReservation,
}: RestaurantCollectionProps) {
  const [selectedEstateId, setSelectedEstateId] = useState<string>('RST001');

  const selectedRestaurant =
    dataset.restaurants.find((r) => r.id === selectedEstateId) || dataset.restaurants[0];
  const meta = RESTAURANT_METADATA[selectedRestaurant.id] || RESTAURANT_METADATA['RST001'];

  const handleBookEstate = (restaurant: RawRestaurant) => {
    if (onSelectEstateForReservation) {
      onSelectEstateForReservation(restaurant.id, restaurant.name);
    } else {
      const resSection = document.getElementById('reservations');
      if (resSection) {
        resSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="restaurants" className="relative py-28 md:py-36 bg-[#F7F3EB] overflow-hidden">
      {/* Editorial Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>The Singapore Estates</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light text-[#1B1B1B] tracking-tight">
              15 Dining Sanctuaries
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="font-sans text-sm md:text-base text-[#5A4A42] leading-relaxed font-light">
              From the cantilevered glass pavilion over Marina Bay to historic Peranakan shophouse
              vaults in Katong, each Savora estate is an architectural ode to its Singapore district.
            </p>
          </div>
        </div>
      </div>

      {/* District Selector Horizon (All 15 Restaurants) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#E7DFD4]/60">
          {dataset.restaurants.map((restaurant) => {
            const isSelected = selectedEstateId === restaurant.id;
            return (
              <button
                key={restaurant.id}
                onClick={() => setSelectedEstateId(restaurant.id)}
                className={`group px-4 py-2.5 rounded-full text-xs font-modern uppercase tracking-wider transition-all whitespace-nowrap focus:outline-none flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#1B1B1B] text-[#FFFDF8] shadow-md'
                    : 'bg-[#FFFDF8] border border-[#E7DFD4] text-[#5A4A42] hover:border-[#C8A96A] hover:text-[#1B1B1B]'
                }`}
              >
                <span className={`text-[10px] ${isSelected ? 'text-[#C8A96A]' : 'text-[#A63A2B]'} font-semibold`}>
                  {restaurant.id}
                </span>
                <span>{restaurant.district}</span>
                <span className="text-[10px] text-[#5A4A42] group-hover:text-inherit">
                  · {restaurant.cuisine}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Editorial Estate Showcase (NOT A DIRECTORY) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRestaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left: Monumental Architectural Photography */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-[#1B1B1B] shadow-2xl">
                <img
                  src={meta.image}
                  alt={selectedRestaurant.name}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/80 via-transparent to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#1B1B1B]/80 backdrop-blur-md border border-[#C8A96A]/60 text-[#FFFDF8] text-[10px] font-modern uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C8A96A]" />
                    {meta.michelinStatus}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] block">
                      Location Terroir
                    </span>
                    <span className="font-editorial text-2xl text-[#FFFDF8]">
                      {selectedRestaurant.district}, Singapore
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-modern uppercase tracking-widest text-[#E7DFD4]/70 block">
                      Seating Salon
                    </span>
                    <span className="font-modern text-sm text-[#FFFDF8]">
                      {meta.seatingCapacity} Guests Maximum
                    </span>
                  </div>
                </div>
              </div>

              {/* Offset Gold Architectural Hairline */}
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-2/3 h-2/3 border border-[#C8A96A]/30 -z-10" />
            </div>

            {/* Right: Estate Narrative, Ambience & Operating Specifications */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-modern uppercase tracking-[0.25em] text-[#A63A2B] mb-2">
                  <span>{selectedRestaurant.id}</span>
                  <span>·</span>
                  <span>{selectedRestaurant.cuisine}</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1B1B1B] font-light leading-tight mb-2">
                  {selectedRestaurant.name}
                </h3>
                <p className="font-modern text-sm text-[#C8A96A] uppercase tracking-wider font-medium">
                  {meta.subtitle}
                </p>
              </div>

              {/* Ambience Description */}
              <div className="p-5 rounded-sm bg-[#FFFDF8] border border-[#E7DFD4] shadow-sm">
                <span className="text-[10px] font-modern uppercase tracking-widest text-[#5A4A42] block mb-1.5">
                  Spatial Ambience & Architecture
                </span>
                <p className="font-sans text-sm text-[#1B1B1B] leading-relaxed font-light">
                  {meta.ambience}
                </p>
              </div>

              {/* Operating Hours & Sommelier */}
              <div className="space-y-3 text-xs font-modern text-[#5A4A42]">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#A63A2B]" />
                  <span>{meta.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#C8A96A]" />
                  <span>Head Sommelier: {meta.sommelier}</span>
                </div>
              </div>

              {/* Facilities Chips */}
              <div>
                <span className="text-[10px] font-modern uppercase tracking-widest text-[#5A4A42] block mb-2">
                  Estate Facilities & Amenities
                </span>
                <div className="flex flex-wrap gap-2">
                  {meta.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="px-3 py-1 bg-[#FFFDF8] border border-[#E7DFD4] text-[#1B1B1B] text-[11px] font-modern rounded-full"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reserve CTA */}
              <div className="pt-2">
                <button
                  onClick={() => handleBookEstate(selectedRestaurant)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] text-xs font-modern uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C8A96A]" />
                  <span>Reserve Table at {selectedRestaurant.district}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
