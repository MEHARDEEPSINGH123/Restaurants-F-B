'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SignatureCollection from '@/components/SignatureCollection';
import ChefShowcase from '@/components/ChefShowcase';
import InteractiveMenu from '@/components/InteractiveMenu';
import IngredientJourney from '@/components/IngredientJourney';
import RestaurantCollection from '@/components/RestaurantCollection';
import PrivateDiningExperience from '@/components/PrivateDiningExperience';
import CateringExperience from '@/components/CateringExperience';
import SeasonalCollections from '@/components/SeasonalCollections';
import EventsExperience from '@/components/EventsExperience';
import PromotionsExperience from '@/components/PromotionsExperience';
import DeliveryZones from '@/components/DeliveryZones';
import ReviewsExperience from '@/components/ReviewsExperience';
import ReservationStudio from '@/components/ReservationStudio';
import Footer from '@/components/Footer';

export default function Home() {
  const [targetEstateId, setTargetEstateId] = useState('RST001');

  const handleSelectEstateForReservation = (estateId: string) => {
    setTargetEstateId(estateId);
    const reservationSection = document.getElementById('reservations');
    if (reservationSection) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(reservationSection);
      } else {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenReservation = () => {
    const reservationSection = document.getElementById('reservations');
    if (reservationSection) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(reservationSection);
      } else {
        reservationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-[#F7F3EB] text-[#1B1B1B]">
      {/* Minimal Adaptive Navigation */}
      <Navigation onOpenReserve={handleOpenReservation} />

      {/* 1. Cinematic Landing Experience */}
      <Hero onExploreClick={() => {
        const sig = document.getElementById('signature');
        if (sig) sig.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 2. Signature Dining Collection (100 Signature Dishes Archive) */}
      <SignatureCollection />

      {/* 3. Chef Showcase (50 Chefs Roster & 4 Spotlighted Masters with Newly Generated Profile Pictures) */}
      <ChefShowcase />

      {/* 4. Interactive Menu Experience (300 Menu Items & 20 Categories) */}
      <InteractiveMenu />

      {/* 5. Ingredient Origins & Terroir Journey (200 Ingredients) */}
      <IngredientJourney />

      {/* 6. Restaurant Collection (15 Singapore Estates) */}
      <RestaurantCollection onSelectEstateForReservation={handleSelectEstateForReservation} />

      {/* 7. Private Dining Experiences (30 Packages) */}
      <PrivateDiningExperience />

      {/* 8. Catering Experience (50 Packages: Corporate, Weddings, Gatherings, Luxury) */}
      <CateringExperience />

      {/* 9. Seasonal Collections (30 Seasonal Menus) */}
      <SeasonalCollections />

      {/* 10. Events Experience (50 Events: Chef's Table, Wine Pairing, Launches, Private) */}
      <EventsExperience />

      {/* 11. Promotions & Cellar Privileges (40 Promotions) */}
      <PromotionsExperience />

      {/* 12. Delivery Concierge Across All 50 Singapore Zones */}
      <DeliveryZones />

      {/* 13. Customer & Michelin Reviews (300 Reviews) */}
      <ReviewsExperience />

      {/* 14. Luxury Hotel Booking Reservation Studio (150 Real-Time Reservation Tokens) */}
      <ReservationStudio initialEstateId={targetEstateId} />

      {/* 15. Editorial Colophon Footer */}
      <Footer />
    </main>
  );
}
