'use client';

import Script from "next/script";

declare global {
  interface Window {
    DagsisChat?: {
      init: (config: { agentId: string; apiKey: string }) => void;
      [key: string]: unknown;
    };
  }
}

export default function Chatbot() {
  return (
    <Script
      src="https://dagsis.ai/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.DagsisChat) {
          window.DagsisChat.init({
            agentId: "08bb7519-e3b1-4120-9278-a9e1ae3a80e0",
            apiKey: "71166395-9fa6-4b2e-baf0-7c7c4d5ad36f"
          });
        }
      }}
    />
  );
}
