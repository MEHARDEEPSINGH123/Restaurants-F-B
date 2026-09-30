'use client';

import React from 'react';
import {
  Compass,
  ArrowUp,
  PhoneCall,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { dataset } from '@/lib/dataset';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1B1B1B] text-[#FFFDF8] pt-24 pb-12 overflow-hidden border-t border-[#5A4A42]/40">
      {/* Editorial Watermark / Large Monogram */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 border-b border-[#5A4A42]/40 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] font-light uppercase text-[#FFFDF8]">
                Savora
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C8A96A]" />
            </div>
            <p className="font-editorial text-2xl sm:text-3xl text-[#E8D3A7] italic font-light">
              Every Dish Tells A Story
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="p-3.5 rounded-full border border-[#5A4A42] hover:border-[#C8A96A] text-[#E7DFD4] hover:text-white transition-colors flex items-center gap-2 text-xs font-modern uppercase tracking-widest"
            >
              <span>Return To Inception</span>
              <ArrowUp className="w-4 h-4 text-[#C8A96A]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Editorial Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
        {/* Col 1: Brand & Philosophy */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[10px] font-modern uppercase tracking-[0.3em] text-[#C8A96A] block">
            The Savora Manifesto
          </span>
          <p className="font-sans text-xs md:text-sm text-[#E7DFD4]/75 leading-relaxed font-light">
            Founded in Singapore as an architectural sanctuary for haute gastronomy. We unite 15 Singapore
            estates, 50 master culinary artisans, and 200 pristine single-origin ingredients into an
            uncompromising celebration of Southeast Asian maritime terroir and European classical technique.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-modern text-[#C8A96A]">
            <span>Michelin Guide Singapore 2026</span>
            <span>·</span>
            <span>Forbes Five-Star Rated</span>
          </div>
        </div>

        {/* Col 2: The 15 Singapore Districts */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-modern uppercase tracking-[0.3em] text-[#C8A96A] block">
            15 Singapore Estates
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs font-modern text-[#E7DFD4]/70">
            {dataset.restaurants.map((r) => (
              <a
                key={r.id}
                href="#restaurants"
                className="hover:text-[#C8A96A] transition-colors truncate"
              >
                {r.district} · {r.cuisine.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Col 3: Concierge & Allocations */}
        <div className="lg:col-span-3 space-y-4">
          <span className="text-[10px] font-modern uppercase tracking-[0.3em] text-[#C8A96A] block">
            Private Concierge
          </span>
          <div className="space-y-2 text-xs font-modern text-[#E7DFD4]/80">
            <p className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#A63A2B]" />
              <span>+65 6789 1234 (10:00 — 23:00)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span>concierge@savorasingapore.com</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#A63A2B]" />
              <span>Marina Bay & 14 Sister Estates, Singapore</span>
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[9px] font-modern uppercase tracking-widest text-[#5A4A42] block mb-1">
              Private Cellar Dispatch Newsletter
            </span>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter private allocation email..."
                className="w-full px-3 py-1.5 bg-[#242424] border border-[#5A4A42] rounded-l-sm text-xs font-modern text-[#FFFDF8] focus:outline-none focus:border-[#C8A96A]"
              />
              <button className="px-3 bg-[#C8A96A] text-[#1B1B1B] text-xs font-modern uppercase font-bold rounded-r-sm hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Colophon Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#5A4A42]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-modern uppercase tracking-widest text-[#E7DFD4]/50">
        <div>
          &copy; 2026 Savora Singapore Pte. Ltd. All Rights Reserved.
        </div>
        <div className="flex items-center gap-6">
          <span>Terms of Degustation</span>
          <span>·</span>
          <span>Cellar Privacy Protocol</span>
          <span>·</span>
          <span>Straits Terroir Trust</span>
        </div>
      </div>
    </footer>
  );
}
