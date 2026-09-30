'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onExploreClick }: { onExploreClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        scale: 1.08,
        duration: 18,
        ease: 'power1.out',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  const handleScrollExplore = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const signatureSection = document.getElementById('signature');
    if (signatureSection) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(signatureSection);
      } else {
        signatureSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#1B1B1B] text-[#FFFDF8]"
    >
      {/* Background Cinematic Visual with Zoom & Parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center origin-center filter brightness-[0.72] contrast-[1.08]"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop")',
        }}
      />

      {/* Atmospheric Luxury Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/95 via-[#1B1B1B]/40 to-transparent" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#1B1B1B]/30 to-[#1B1B1B]/80" />

      {/* Subtle Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Main Editorial Centerpiece Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center pt-16 md:pt-20">
        {/* Curated Tagline Monogram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#C8A96A]/40 bg-[#1B1B1B]/40 backdrop-blur-md mb-6 md:mb-8"
        >
          <span className="text-[10px] md:text-[11px] font-modern uppercase tracking-[0.35em] text-[#E7DFD4]">
            Haute Gastronomie · Singapore
          </span>
        </motion.div>

        {/* The Exact Headline Requested */}
        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[-0.03em] leading-[0.95] text-[#FFFDF8] mb-6 md:mb-8"
        >
          Every Dish <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF8] via-[#E8D3A7] to-[#C8A96A]">
            Tells A Story
          </span>
        </motion.h1>

        {/* The Exact Subheadline Requested */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base md:text-xl font-light text-[#E7DFD4]/85 leading-relaxed font-sans mb-10 md:mb-12 tracking-wide"
        >
          Singapore&apos;s destination for exceptional dining experiences.
        </motion.p>

        {/* The Exact CTA Requested: Explore Experiences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={handleScrollExplore}
            className="group relative px-8 py-4 rounded-full border border-[#C8A96A] bg-[#FFFDF8] text-[#1B1B1B] text-xs md:text-sm font-modern uppercase tracking-[0.25em] font-medium overflow-hidden transition-all duration-500 hover:bg-[#A63A2B] hover:text-[#FFFDF8] hover:border-[#A63A2B] shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Explore Experiences</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Editorial Coordinates & Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between text-[#E7DFD4]/60 text-[10px] md:text-xs font-modern tracking-[0.25em] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#C8A96A]/60" />
          <span>Culinary Inception</span>
        </div>

        <button
          onClick={handleScrollExplore}
          className="flex items-center gap-2 hover:text-[#C8A96A] transition-colors group cursor-pointer"
        >
          <span>Scroll To Discover</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C8A96A]" />
          </motion.div>
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <span>15 Singapore Estates</span>
          <span className="w-8 h-[1px] bg-[#C8A96A]/60" />
        </div>
      </div>
    </section>
  );
}
