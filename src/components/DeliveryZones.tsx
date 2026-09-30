'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dataset } from '@/lib/dataset';
import {
  Truck,
  ShieldCheck,
  Thermometer,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  Search,
} from 'lucide-react';

export default function DeliveryZones() {
  const [selectedZone, setSelectedZone] = useState('Zone 1');
  const [zoneSearch, setZoneSearch] = useState('');

  // Map 50 zones to Singapore districts and postal codes
  const zonesEnriched = dataset.delivery_zones.map((zone, idx) => {
    const districts = [
      'Marina Bay & Raffles Place (D01)',
      'Tanjong Pagar & Chinatown (D02)',
      'River Valley & Queenstown (D03)',
      'Sentosa Cove & Harbourfront (D04)',
      'Buona Vista & Pasir Panjang (D05)',
      'City Hall & High Street (D06)',
      'Bugis & Beach Road (D07)',
      'Farrer Park & Little India (D08)',
      'Orchard & Cairnhill (D09)',
      'Tanglin, Ardmore & Holland (D10)',
      'Newton & Novena (D11)',
      'Balestier & Toa Payoh (D12)',
      'Braddell & MacPherson (D13)',
      'Geylang & Eunos (D14)',
      'Katong & Marine Parade (D15)',
      'Bedok & Upper East Coast (D16)',
      'Changi & Loyang (D17)',
      'Tampines & Pasir Ris (D18)',
      'Serangoon & Hougang (D19)',
      'Ang Mo Kio & Bishan (D20)',
      'Upper Bukit Timah & Clementi (D21)',
      'Jurong Gateway & Lakeside (D22)',
      'Bukit Batok & Hillview (D23)',
      'Kranji & Woodlands (D25)',
      'Mandai & Springleaf (D26)',
      'Yishun & Sembawang (D27)',
      'Seletar Aerospace & Punggol (D28)',
    ];

    const districtName = districts[idx % districts.length];
    const dispatchTime = 25 + (idx % 20);

    return {
      name: zone,
      district: districtName,
      dispatchWindow: `${dispatchTime} — ${dispatchTime + 15} mins`,
      temperatureControl: 'Dual-Zone Chamber (68°C / -2°C)',
      butlerAvailable: true,
      freeOverSGD: 350,
    };
  });

  const activeZoneDetails =
    zonesEnriched.find((z) => z.name === selectedZone) || zonesEnriched[0];

  const filteredZones = zonesEnriched.filter(
    (z) =>
      z.name.toLowerCase().includes(zoneSearch.toLowerCase()) ||
      z.district.toLowerCase().includes(zoneSearch.toLowerCase())
  );

  return (
    <section className="relative py-24 md:py-32 bg-[#F7F3EB] overflow-hidden border-t border-[#E7DFD4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E7DFD4] pb-8 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs font-modern uppercase tracking-[0.3em] text-[#C8A96A] mb-3">
              <span className="w-6 h-[1px] bg-[#C8A96A]" />
              <span>White-Glove Thermal Concierge</span>
            </div>
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-light text-[#1B1B1B] tracking-tight">
              50 Singapore Delivery Zones
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-md">
            <p className="font-sans text-sm text-[#5A4A42] leading-relaxed font-light">
              Fine dining transported in custom titanium thermal insulated chambers. Complete with
              warm linen napkins, tableside plating instructions, or personal butler service.
            </p>
          </div>
        </div>

        {/* Interactive Zone Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Zone Search & 50 Zone Selector */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#5A4A42] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across all 50 Singapore Delivery Zones..."
                value={zoneSearch}
                onChange={(e) => setZoneSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFDF8] border border-[#E7DFD4] rounded-sm text-xs font-modern placeholder:text-[#5A4A42]/60 focus:outline-none focus:border-[#C8A96A]"
              />
            </div>

            <div className="max-h-96 overflow-y-auto pr-2 space-y-2">
              {filteredZones.map((z) => (
                <button
                  key={z.name}
                  onClick={() => setSelectedZone(z.name)}
                  className={`w-full p-3.5 rounded-sm border text-left flex items-center justify-between transition-all ${
                    selectedZone === z.name
                      ? 'bg-[#1B1B1B] text-[#FFFDF8] border-[#1B1B1B] shadow-sm'
                      : 'bg-[#FFFDF8] border-[#E7DFD4] text-[#1B1B1B] hover:border-[#C8A96A]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-modern uppercase tracking-widest text-[#C8A96A] block">
                      {z.name}
                    </span>
                    <span className="font-editorial text-lg">
                      {z.district}
                    </span>
                  </div>
                  <span className={`text-[11px] font-modern ${selectedZone === z.name ? 'text-[#E8D3A7]' : 'text-[#5A4A42]'}`}>
                    {z.dispatchWindow}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] font-modern text-[#5A4A42] text-center">
              Displaying {filteredZones.length} of 50 delivery zones from dataset
            </p>
          </div>

          {/* Right: Selected Zone Thermal Guarantee Panel */}
          <div className="lg:col-span-6 bg-[#FFFDF8] border border-[#C8A96A]/50 rounded-sm p-8 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7DFD4] pb-4">
              <div>
                <span className="text-[10px] font-modern uppercase tracking-widest text-[#C8A96A]">
                  Active Zone Selected
                </span>
                <h3 className="font-editorial text-3xl text-[#1B1B1B]">
                  {activeZoneDetails.name} · {activeZoneDetails.district}
                </h3>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#A63A2B]" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-modern">
              <div className="p-4 bg-[#F7F3EB] rounded-sm border border-[#E7DFD4]">
                <Clock className="w-4 h-4 text-[#A63A2B] mb-2" />
                <span className="text-[#5A4A42] block">White-Glove Dispatch Time</span>
                <span className="font-semibold text-sm text-[#1B1B1B]">{activeZoneDetails.dispatchWindow}</span>
              </div>
              <div className="p-4 bg-[#F7F3EB] rounded-sm border border-[#E7DFD4]">
                <Thermometer className="w-4 h-4 text-[#C8A96A] mb-2" />
                <span className="text-[#5A4A42] block">Thermal Chamber Seal</span>
                <span className="font-semibold text-sm text-[#1B1B1B]">Precision Calibrated</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-sans text-[#5A4A42]">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A96A] shrink-0" />
                <span>Complimentary white-glove courier on tasting orders above $350 SGD.</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A96A] shrink-0" />
                <span>Optional butler tableside plating and sommelier decanting service available.</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A96A] shrink-0" />
                <span>All items packed in recyclable brushed bamboo and gold foil packaging.</span>
              </p>
            </div>

            <div>
              <a
                href="#reservations"
                className="w-full py-3.5 rounded-full bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] text-xs font-modern uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2"
              >
                <span>Request Concierge In-Residence Tasting</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
