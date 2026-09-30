import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, Inter } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Savora Singapore | Every Dish Tells A Story — Haute Gastronomie',
  description:
    'Singapore’s destination for exceptional Michelin-level dining experiences, editorial chef showcases, bespoke omakase, and private dining salons across 15 Singapore estates.',
  keywords: [
    'Savora Singapore',
    'Fine Dining Singapore',
    'Michelin Restaurant Singapore',
    'Marina Bay Gastronomy',
    'Haute Cuisine',
    'Private Dining Salons Singapore',
    'Omakase Singapore',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${inter.variable}`}
    >
      <body className="bg-[#F7F3EB] text-[#1B1B1B] font-sans antialiased selection:bg-[#C8A96A] selection:text-[#1B1B1B]">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
