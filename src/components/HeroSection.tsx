import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Zap, Sparkles, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';

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
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#090E11] border-b border-[#E3EBE7] dark:border-[#22353D] py-8 sm:py-12 lg:py-14 transition-colors duration-300 font-['Poppins']">
      {/* Subtle logo-harmonized ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#009B69]/10 dark:bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#007A8D]/10 dark:bg-[#06B6D4]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Headings, CTAs & 3 Trust Indicators */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] border border-[#C8DFD4] dark:border-[#10B981]/30 text-xs font-semibold uppercase tracking-wider font-['Poppins'] shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#009B69] dark:text-[#10B981]" />
              <span>PREMIUM REFURBISHED TECHNOLOGY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-[1.15] font-['Urbanist']">
              Find Your Perfect Laptop.{' '}
              <span className="text-logo-gradient block sm:inline">Pay Less. Get More.</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed font-['Poppins']">
              Explore quality-tested refurbished laptops from leading brands. Discover powerful performance at prices that make sense.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] font-['Poppins'] text-[15px] font-semibold transition-all duration-300 shadow-md shadow-[#009B69]/20 hover:shadow-lg hover:shadow-[#009B69]/30 cursor-pointer active:scale-95"
              >
                <span>Explore Laptops</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20am%20browsing%20https://punartech.vercel.app/%20and%20looking%20for%20a%20refurbished%20laptop.%20Please%20share%20current%20options."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[12px] bg-white hover:bg-[#E8F7EE] dark:bg-[#152227] dark:hover:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] font-['Poppins'] text-[15px] font-semibold transition-all duration-300 border border-[#C8DFD4] dark:border-[#26443B] shadow-xs hover:shadow-md active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Contact on WhatsApp</span>
              </a>
            </div>

            {/* Three Trust Indicators */}
            <div className="pt-4 border-t border-[#E3EBE7] dark:border-[#22353D] grid grid-cols-1 sm:grid-cols-3 gap-3 font-['Poppins']">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-950 dark:text-white block font-['Urbanist'] text-sm">Quality Tested</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">100% Motherboard verified</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-950 dark:text-white block font-['Urbanist'] text-sm">Verified Specifications</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">Accurate RAM, SSD &amp; CPU</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <div>
                  <span className="font-semibold text-zinc-950 dark:text-white block font-['Urbanist'] text-sm">Affordable Pricing</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">Wholesale refurbished rates</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Premium Product Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white dark:bg-[#152227] rounded-[24px] border border-[#E3EBE7] dark:border-[#22353D] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Top floating pill */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009B69] dark:bg-[#10B981] animate-pulse" />
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white font-['Urbanist']">Available Physical Inventory</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30">
                  {totalLaptops} Units
                </span>
              </div>

              {/* Showcase Featured Laptop Image with Float Animation */}
              <div className="relative h-56 sm:h-64 rounded-[20px] bg-[#F6F9F8] dark:bg-[#0E1519] border border-[#E3EBE7] dark:border-[#22353D] flex items-center justify-center p-4 overflow-hidden group">
                <img
                  src="/assets/aistudio/images_588341c0.jpg"
                  alt="PunarTech Verified Enterprise Laptops"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md animate-float"
                />
                <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-[#009B69] to-[#007A8D] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-[6px] shadow-xs">
                  Enterprise Grade A++
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-[#101828]/90 dark:bg-black/90 text-white backdrop-blur-xs text-[10px] font-mono px-2 py-0.5 rounded-[6px] shadow-xs border border-white/10">
                  Physical Showroom Ready
                </div>
              </div>

              {/* Hub Quick Jump Counters */}
              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <button
                  type="button"
                  onClick={() => onSelectHub('Pune')}
                  className="p-3 rounded-[16px] bg-[#F8FBF9] dark:bg-[#0E1519] border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] dark:hover:border-[#10B981] transition-all text-left cursor-pointer group shadow-2xs hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900 dark:text-white group-hover:text-[#009B69] dark:group-hover:text-[#10B981] font-['Urbanist']">
                      Pune Hub
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
                  </div>
                  <div className="text-lg font-black font-mono text-zinc-950 dark:text-white mt-0.5">
                    {puneCount} Laptops
                  </div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                    Ready for live video &amp; pickup
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectHub('Delhi')}
                  className="p-3 rounded-[16px] bg-[#F8FBF9] dark:bg-[#0E1519] border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] dark:hover:border-[#10B981] transition-all text-left cursor-pointer group shadow-2xs hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900 dark:text-white group-hover:text-[#009B69] dark:group-hover:text-[#10B981] font-['Urbanist']">
                      Delhi Hub
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
                  </div>
                  <div className="text-lg font-black font-mono text-zinc-950 dark:text-white mt-0.5">
                    {delhiCount} Laptops
                  </div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                    Ready for live video &amp; pickup
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
