'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Compass,
  Calendar,
  Sparkles,
  ArrowUpRight,
  PhoneCall,
} from 'lucide-react';

interface NavigationProps {
  onOpenReserve?: () => void;
}

export default function Navigation({ onOpenReserve }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check active section
      const sections = [
        'signature',
        'chefs',
        'menu',
        'ingredients',
        'restaurants',
        'private-dining',
        'catering',
        'seasonal',
        'events',
        'reservations',
        'reviews',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(element);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Anthology', id: 'signature' },
    { label: 'Chefs', id: 'chefs' },
    { label: 'Degustation', id: 'menu' },
    { label: 'Terroir', id: 'ingredients' },
    { label: 'Estates', id: 'restaurants' },
    { label: 'Salons', id: 'private-dining' },
    { label: 'Banquets', id: 'catering' },
    { label: 'Seasons', id: 'seasonal' },
    { label: 'Events', id: 'events' },
    { label: 'Critics', id: 'reviews' },
  ];

  const leftLinks = navLinks.slice(0, 4);
  const rightLinks = navLinks.slice(4, 7);

  return (
    <>
      {/* Adaptive Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'py-3.5 bg-[#F7F3EB]/95 backdrop-blur-md border-b border-[#E7DFD4]/90 shadow-[0_10px_30px_rgba(27,27,27,0.06)]'
            : 'py-5 md:py-6 bg-gradient-to-b from-[#1B1B1B]/85 via-[#1B1B1B]/40 to-transparent'
        }`}
      >
        <div className="w-full px-6 md:px-10 lg:px-12 relative flex items-center justify-between min-h-[48px]">
          {/* Left Wing: Navigation Links (Desktop) & Mobile Menu Toggle */}
          <div className="flex items-center gap-4 xl:gap-6 shrink-0 z-10">
            {/* Mobile / Tablet Menu Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full border transition-all shrink-0 ${
                scrolled
                  ? 'border-[#E7DFD4] bg-[#FFFDF8]/80 text-[#1B1B1B] hover:text-[#A63A2B]'
                  : 'border-white/20 bg-black/40 text-[#FFFDF8] hover:text-[#C8A96A]'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
            </button>

            {/* Desktop Editorial Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0">
              {navLinks.slice(0, 5).map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`group relative text-[11px] font-modern uppercase tracking-[0.16em] transition-colors duration-300 py-1 whitespace-nowrap shrink-0 flex items-center ${
                    activeSection === link.id
                      ? scrolled
                        ? 'text-[#A63A2B] font-semibold'
                        : 'text-[#C8A96A] font-semibold'
                      : scrolled
                      ? 'text-[#5A4A42] hover:text-[#1B1B1B]'
                      : 'text-[#FFFDF8]/90 hover:text-[#FFFDF8]'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${
                        scrolled ? 'bg-[#A63A2B]' : 'bg-[#C8A96A]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}

              {/* Full Index Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`text-[11px] font-modern uppercase tracking-[0.16em] transition-colors duration-300 py-1 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  scrolled
                    ? 'text-[#5A4A42] hover:text-[#A63A2B]'
                    : 'text-[#FFFDF8]/70 hover:text-[#C8A96A]'
                }`}
              >
                <span>Index</span>
                <span className="text-[9px] opacity-60">＋</span>
              </button>
            </nav>
          </div>

          {/* Centered Brand Wordmark (Absolute Center) */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center text-center focus:outline-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 pointer-events-auto"
          >
            <span
              className={`font-editorial text-2xl md:text-3xl font-light tracking-[0.24em] uppercase transition-colors duration-300 whitespace-nowrap ${
                scrolled
                  ? 'text-[#1B1B1B] group-hover:text-[#A63A2B]'
                  : 'text-[#FFFDF8] group-hover:text-[#E8D3A7]'
              }`}
            >
              Savora
            </span>
            <span
              className={`font-modern text-[8px] md:text-[9px] uppercase tracking-[0.24em] font-medium -mt-0.5 transition-colors duration-300 whitespace-nowrap ${
                scrolled ? 'text-[#5A4A42]' : 'text-[#E7DFD4]/90'
              }`}
            >
              Singapore · Haute Table
            </span>
          </button>

          {/* Right Corner: The Reserve Table Button Pinned in Corner */}
          <div className="flex items-center shrink-0 z-10">
            <button
              onClick={() => {
                if (onOpenReserve) {
                  onOpenReserve();
                } else {
                  scrollToSection('reservations');
                }
              }}
              className={`group relative px-4 md:px-5 py-2 md:py-2.5 overflow-hidden rounded-full border transition-all duration-300 text-[10px] md:text-[11px] font-modern tracking-[0.18em] uppercase flex items-center gap-2 shrink-0 whitespace-nowrap shadow-[0_4px_25px_rgba(0,0,0,0.25)] ${
                scrolled
                  ? 'border-[#C8A96A] bg-[#1B1B1B] text-[#FFFDF8] hover:bg-[#A63A2B] hover:border-[#A63A2B]'
                  : 'border-[#C8A96A] bg-[#FFFDF8] text-[#1B1B1B] hover:bg-[#A63A2B] hover:text-[#FFFDF8] hover:border-[#A63A2B]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#C8A96A] group-hover:text-inherit transition-colors shrink-0" />
              <span className="font-semibold whitespace-nowrap hidden sm:inline">Reserve Table</span>
              <span className="font-semibold whitespace-nowrap sm:hidden">Reserve</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#F7F3EB] pt-28 pb-12 px-8 overflow-y-auto flex flex-col justify-between"
          >
            {/* Top Magazine Intro */}
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex items-center justify-between border-b border-[#E7DFD4] pb-4 mb-8">
                <span className="font-modern text-xs uppercase tracking-[0.3em] text-[#C8A96A]">
                  Editorial Index
                </span>
                <span className="font-modern text-xs tracking-widest text-[#5A4A42]">
                  15 Singapore Estates · 3 Michelin Stars
                </span>
              </div>

              {/* Navigation Links with large Cormorant serif */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="group flex items-baseline justify-between text-left py-2 border-b border-[#E7DFD4]/50 hover:border-[#C8A96A] transition-all"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-editorial text-2xl md:text-3xl font-light text-[#1B1B1B] group-hover:text-[#A63A2B] transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#5A4A42] group-hover:text-[#A63A2B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Estate Info */}
            <div className="max-w-4xl mx-auto w-full pt-8 border-t border-[#E7DFD4] mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-modern text-[#5A4A42]">
              <div>
                <p className="font-medium text-[#1B1B1B]">Savora Singapore Concierge</p>
                <p>Marina Bay Sands · Orchard · Sentosa · Bugis · 15 Estates</p>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="tel:+6567891234"
                  className="flex items-center gap-1.5 text-[#A63A2B] hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  +65 6789 1234
                </a>
                <span className="text-[#C8A96A]">Private Bookings Daily 10:00 – 22:00</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
