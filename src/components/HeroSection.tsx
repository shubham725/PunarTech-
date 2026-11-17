import React, { useState } from 'react';
import {
  ArrowRight,
  CheckSquare,
  ShieldCheck,
  Cpu,
  Tag,
  Headphones,
  Laptop as LaptopIcon,
  MapPin,
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';
import heroLaptopAsset from '../assets/images/hero_business_laptop_1794553475740.jpg';

interface HeroSectionProps {
  onExploreClick: () => void;
  totalLaptops: number;
  puneCount: number;
  delhiCount: number;
  onSelectHub: (hub: 'Pune' | 'Delhi') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  totalLaptops,
  puneCount,
  delhiCount,
  onSelectHub,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(heroLaptopAsset);

  const trustHighlights = [
    {
      title: 'Quality Tested',
      mobileTitle: 'Quality Tested',
      detail: '100% Hardware Check',
      icon: ShieldCheck,
    },
    {
      title: 'Verified Specs',
      mobileTitle: 'Verified Specs',
      detail: 'RAM, SSD, CPU & Display',
      icon: Cpu,
    },
    {
      title: 'Affordable Prices',
      mobileTitle: 'Best Prices',
      detail: 'Best Value Deals',
      icon: Tag,
    },
    {
      title: 'Dedicated Support',
      mobileTitle: 'Support',
      detail: 'WhatsApp & Live Help',
      icon: Headphones,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FAFCFB] via-[#EFFAF3] to-[#CBEAD9] dark:from-[#0B1612] dark:via-[#0D1B15] dark:to-[#11261D] border-b border-[#CBE6D6] dark:border-[#1E332B] transition-colors">
      {/* Subtle Studio Backdrop Light Accent on Right */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute -top-24 right-[-4%] w-[420px] lg:w-[540px] h-[420px] lg:h-[540px] rounded-full bg-[#A7DEC0]/35 dark:bg-[#10B981]/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-14 pb-6 sm:pb-8">
        {/* Tablet & Laptop Split-Pane Banner */}
        <div className="hidden sm:grid grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Badge, Two-Tone Headline, Copy & CTAs */}
          <div className="sm:col-span-7 lg:col-span-6 space-y-4 lg:space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E6F5EC] dark:bg-[#10B981]/15 border border-[#B7E1C8] dark:border-[#10B981]/30 text-xs font-semibold text-[#057A4B] dark:text-[#10B981]">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Premium Refurbished Laptops</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl md:text-[34px] lg:text-[46px] font-extrabold tracking-[-0.03em] leading-[1.08] text-balance">
              <span className="block text-[#17212B] dark:text-[#F1F5F9]">
                Find Your Perfect Laptop.
              </span>
              <span className="block text-[#059669] dark:text-[#10B981] mt-1">
                Quality Refurbished. Smarter Prices.
              </span>
            </h1>

            <p className="font-inter text-xs sm:text-sm lg:text-base text-[#17212B]/80 dark:text-[#F1F5F9]/80 max-w-xl leading-relaxed">
              Explore verified, performance-tested laptops from leading brands at affordable prices. Available at our{' '}
              <button
                type="button"
                onClick={() => onSelectHub('Pune')}
                className="font-semibold text-[#057A4B] dark:text-[#34D399] hover:underline cursor-pointer"
              >
                Pune ({puneCount})
              </button>{' '}
              &amp;{' '}
              <button
                type="button"
                onClick={() => onSelectHub('Delhi')}
                className="font-semibold text-[#057A4B] dark:text-[#34D399] hover:underline cursor-pointer"
              >
                Delhi ({delhiCount})
              </button>{' '}
              showrooms.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 lg:gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 h-10 lg:h-11 px-5 lg:px-6 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs lg:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <LaptopIcon className="w-4 h-4" />
                <span>Explore Laptops</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                  'Hello PunarTech, I am browsing https://punartech.vercel.app/ and would like assistance selecting a laptop.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-10 lg:h-11 px-4 lg:px-5 rounded-lg bg-white dark:bg-[#121B22] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] text-[#057A4B] dark:text-[#10B981] text-xs lg:text-sm font-semibold border border-[#A7DBC0] dark:border-[#2C3F4E] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Viewport-Tuned Studio Laptop Plinth (Tablet & Laptop) */}
          <div className="sm:col-span-5 lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full sm:max-w-[320px] md:max-w-[400px] lg:max-w-[540px] mx-auto flex flex-col items-center">
              <div className="relative z-10 w-[92%] sm:w-[90%] aspect-[4/3] overflow-hidden -mb-5 md:-mb-6 lg:-mb-8 flex items-center justify-center">
                <img
                  src={imgSrc}
                  alt="PunarTech Certified Refurbished Business Laptops"
                  referrerPolicy="no-referrer"
                  onError={() => setImgSrc('/assets/aistudio/images_588341c0.jpg')}
                  className="w-full h-full object-cover object-center mix-blend-multiply dark:mix-blend-normal rounded-xl dark:border dark:border-[#263846] dark:shadow-lg"
                />
              </div>

              {/* Architectural White Studio Plinth */}
              <div className="w-full h-10 lg:h-12 rounded-2xl bg-gradient-to-b from-white via-[#F6FAF8] to-[#E3F1EA] dark:from-[#1A2832] dark:to-[#121B22] border border-white dark:border-[#263846] shadow-[0_18px_40px_-14px_rgba(6,95,70,0.22)] relative z-0 flex items-center justify-between px-3.5 lg:px-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] lg:text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] truncate">
                  <MapPin className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#059669] dark:text-[#10B981] shrink-0" />
                  <span className="truncate">{totalLaptops} Verified Units</span>
                </span>
                <div className="flex items-center gap-2 lg:gap-3 text-[10px] lg:text-[11px] font-mono font-bold shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelectHub('Pune')}
                    className="text-[#057A4B] dark:text-[#34D399] hover:underline cursor-pointer"
                  >
                    Pune: {puneCount}
                  </button>
                  <span className="text-[#CBD5E1] dark:text-[#2C3F4E]">|</span>
                  <button
                    type="button"
                    onClick={() => onSelectHub('Delhi')}
                    className="text-[#057A4B] dark:text-[#34D399] hover:underline cursor-pointer"
                  >
                    Delhi: {delhiCount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & Laptop Integrated 4-Item Trust Row */}
        <div className="hidden sm:grid mt-7 lg:mt-8 pt-5 lg:pt-6 border-t border-[#CBE6D6]/75 dark:border-[#1E332B] grid-cols-12 gap-4 lg:gap-6">
          {trustHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="col-span-6 lg:col-span-3 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-white/85 dark:bg-[#121B22] border border-[#CBE6D6] dark:border-[#1E332B] text-[#059669] dark:text-[#10B981] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xs lg:text-sm font-bold text-[#17212B] dark:text-[#F1F5F9] truncate">
                    {item.title}
                  </h2>
                  <p className="text-[11px] lg:text-xs text-[#475569] dark:text-[#94A3B8] leading-snug truncate">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Hero Layout (<640px) */}
        <div className="sm:hidden space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E6F5EC] dark:bg-[#10B981]/15 border border-[#B7E1C8] dark:border-[#10B981]/30 text-[11px] font-semibold text-[#057A4B] dark:text-[#10B981]">
            <CheckSquare className="w-3 h-3" />
            <span>Premium Refurbished Laptops</span>
          </div>

          <h1 className="font-heading text-2xl font-extrabold tracking-[-0.025em] leading-[1.12] text-balance">
            <span className="block text-[#17212B] dark:text-[#F1F5F9]">
              Find Your Perfect Laptop.
            </span>
            <span className="block text-[#059669] dark:text-[#10B981]">
              Quality Refurbished. Smarter Prices.
            </span>
          </h1>

          {/* 2-Column Mobile Split with Proportioned 4:3 Laptop Crop */}
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 space-y-3">
              <p className="font-inter text-xs text-[#17212B]/80 dark:text-[#F1F5F9]/80 leading-relaxed">
                Explore verified, tested laptops at affordable prices in Pune &amp; Delhi.
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="w-full h-9 px-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LaptopIcon className="w-3.5 h-3.5" />
                  <span>Explore Laptops</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                    'Hello PunarTech, I am browsing https://punartech.vercel.app/ and would like assistance selecting a laptop.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-9 px-3 rounded-lg bg-white dark:bg-[#121B22] text-[#057A4B] dark:text-[#10B981] text-xs font-semibold border border-[#A7DBC0] dark:border-[#2C3F4E] inline-flex items-center justify-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="col-span-5 flex flex-col items-center">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-lg flex items-center justify-center -mb-2 relative z-10">
                <img
                  src={imgSrc}
                  alt="PunarTech Certified Laptop"
                  referrerPolicy="no-referrer"
                  onError={() => setImgSrc('/assets/aistudio/images_588341c0.jpg')}
                  className="w-full h-full object-cover object-center mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <div className="w-[94%] h-3 rounded-full bg-white/95 dark:bg-[#1A2832] shadow-sm border border-white/80 dark:border-[#263846]" />
            </div>
          </div>

          {/* Mobile Crisp White 4-Column Icon Bar */}
          <div className="bg-white/95 dark:bg-[#121B22] rounded-xl border border-[#CBE6D6] dark:border-[#1E332B] shadow-xs grid grid-cols-4 divide-x divide-[#E2E8F0] dark:divide-[#1E2D38] py-2.5 px-1">
            {trustHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center px-1 gap-1"
                >
                  <Icon className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                  <span className="text-[10px] font-bold text-[#17212B] dark:text-[#F1F5F9] leading-tight">
                    {item.mobileTitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
