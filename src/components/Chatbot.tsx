'use client';

import React, { useEffect, useState } from 'react';
import { MessageSquare, X, Sparkles, RefreshCw } from 'lucide-react';

declare global {
  interface Window {
    DagsisChat?: {
      init: (config: { agentId: string; apiKey: string; name?: string }) => void;
      [key: string]: unknown;
    };
  }
}

const AGENT_ID = 'f8936f57-7797-42e2-8205-9ccb77805526';
const API_KEY = '77958730-d7d9-43f8-bcc3-3dc5e33ffea7';
const AGENT_NAME = 'Savora AI Concierge';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Clean up any legacy broken widget elements from dagsis.jsuite.in if present
  useEffect(() => {
    const cleanLegacyWidget = () => {
      const oldBtn = document.getElementById('dagsis-chat-button');
      if (oldBtn) oldBtn.remove();
      const oldContainer = document.getElementById('dagsis-chat-container');
      if (oldContainer) oldContainer.remove();
    };

    cleanLegacyWidget();

    // Define standard DagsisChat object on window to satisfy integration contract
    if (typeof window !== 'undefined') {
      window.DagsisChat = {
        init: (config: { agentId: string; apiKey: string; name?: string }) => {
          console.log('DagsisChat initialized with live endpoint:', config);
        },
      };
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[999999] font-sans antialiased pointer-events-auto">
      {/* Chat Window Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[600px] max-h-[82vh] bg-[#FFFDF8] rounded-2xl shadow-[0_16px_60px_rgba(27,27,27,0.35)] border border-[#C8A96A]/60 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Luxury Editorial Header */}
          <div className="px-5 py-3.5 bg-[#1B1B1B] text-[#FFFDF8] flex items-center justify-between border-b border-[#C8A96A]/30 select-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C8A96A]/20 border border-[#C8A96A] flex items-center justify-center text-[#C8A96A]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-serif font-light tracking-[0.2em] uppercase text-[#FFFDF8]">
                  Savora Concierge
                </h3>
                <p className="text-[9px] font-mono tracking-wider text-[#C8A96A]">
                  AI Gastronomy Assistant · Active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsLoading(true);
                  const iframe = document.getElementById('savora-chat-iframe') as HTMLIFrameElement;
                  if (iframe) {
                    iframe.src = iframe.src;
                  }
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#E7DFD4] hover:text-white transition-colors"
                title="Reload Chat"
                aria-label="Reload Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#E7DFD4] hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Iframe with live dagsis.ai endpoint */}
          <div className="relative flex-1 w-full h-full bg-[#FFFDF8]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F7F3EB] text-[#5A4A42] z-10 gap-3">
                <div className="w-6 h-6 border-2 border-[#C8A96A] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#C8A96A]">
                  Connecting to Concierge...
                </span>
              </div>
            )}
            <iframe
              id="savora-chat-iframe"
              src={`https://dagsis.ai/embed/${AGENT_ID}?name=${encodeURIComponent(
                AGENT_NAME
              )}#apiKey=${encodeURIComponent(API_KEY)}`}
              className="w-full h-full border-none"
              allow="clipboard-write"
              title="Savora AI Concierge"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      )}

      {/* Luxury Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#1B1B1B] text-[#FFFDF8] border border-[#C8A96A] shadow-[0_8px_30px_rgba(27,27,27,0.35)] hover:bg-[#A63A2B] hover:border-[#A63A2B] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
        aria-label="Toggle Savora AI Concierge"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#C8A96A] group-hover:text-white transition-colors" />
        ) : (
          <MessageSquare className="w-5 h-5 text-[#C8A96A] group-hover:text-white transition-colors" />
        )}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-serif tracking-[0.2em] uppercase font-light leading-none">
            {isOpen ? 'Close' : 'Ask Concierge'}
          </span>
          <span className="text-[8px] font-mono tracking-wider text-[#C8A96A] group-hover:text-white/80 leading-tight">
            AI Gastronomy
          </span>
        </div>
      </button>
    </div>
  );
}
