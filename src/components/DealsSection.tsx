import React from 'react';
import { Laptop } from '../data/laptops';
import { LaptopImage } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Sparkles, Eye, ArrowRight, ShieldCheck, Zap, MapPin } from 'lucide-react';

interface DealsSectionProps {
  dealLaptops: Laptop[];
  onViewDetails: (laptop: Laptop) => void;
  onOpenWhatsApp: (laptop: Laptop) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  dealLaptops,
  onViewDetails,
  onOpenWhatsApp,
}) => {
  if (dealLaptops.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-[#090E11] border-b border-[#E3EBE7] dark:border-[#22353D] transition-colors duration-300 font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#007A52] dark:text-[#34D399] uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
              <span>Curated Value Picks</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-['Urbanist']">
              Today's Best Deals
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Top hardware configurations with verified motherboard testing and direct showroom readiness.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-3 py-1 rounded-full border border-[#C8DFD4] dark:border-[#10B981]/30">
            {dealLaptops.length} Verified Specials
          </span>
        </div>

        {/* 4-Column Deal Grid with Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {dealLaptops.map((laptop) => {
            const priceFormatted =
              laptop.hasPrice && laptop.sellingPrice
                ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                : 'Contact Price';

            return (
              <div
                key={laptop.id}
                className="rounded-[22px] border border-[#E3EBE7] dark:border-[#22353D] bg-white dark:bg-[#152227] hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-lg hover:shadow-[#009B69]/10 hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  {/* Image container */}
                  <div
                    onClick={() => onViewDetails(laptop)}
                    className="relative h-44 rounded-[16px] bg-[#F6F9F8] dark:bg-[#0E1519] border border-[#E3EBE7] dark:border-[#22353D] overflow-hidden flex items-center justify-center p-3 cursor-pointer mb-3"
                  >
                    <LaptopImage laptop={laptop} size="sm" />
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 pointer-events-none">
                      <span className="bg-gradient-to-r from-[#009B69] to-[#007A8D] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-[6px] shadow-xs">
                        Best Deal
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 z-10 pointer-events-none">
                      <span className="bg-white/95 dark:bg-[#152227]/95 text-zinc-900 dark:text-zinc-200 text-[9px] font-bold px-2 py-0.5 rounded-[6px] border border-[#E3EBE7] dark:border-[#22353D] shadow-2xs font-mono">
                        {laptop.branch} Hub
                      </span>
                    </div>
                  </div>

                  {/* Brand & Title */}
                  <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5 font-['Urbanist']">
                    {laptop.brand} • {laptop.stockId}
                  </div>
                  <h3
                    onClick={() => onViewDetails(laptop)}
                    className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white group-hover:text-[#009B69] dark:group-hover:text-[#10B981] group-hover:underline transition-colors line-clamp-2 min-h-[36px] cursor-pointer font-['Urbanist']"
                  >
                    {laptop.fullName}
                  </h3>

                  {/* Specs summary strip */}
                  <div className="mt-2 p-2.5 bg-[#F6F9F8] dark:bg-[#0E1519] rounded-[12px] border border-[#E3EBE7] dark:border-[#22353D] text-[11px] text-zinc-700 dark:text-zinc-300 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Processor:</span>
                      <span className="font-semibold truncate max-w-[140px] text-zinc-900 dark:text-zinc-100">{laptop.processor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">RAM &amp; Disk:</span>
                      <span className="font-mono font-bold text-[#007A52] dark:text-[#34D399]">
                        {laptop.ram} / {laptop.storageRaw}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="mt-3 pt-3 border-t border-[#E3EBE7] dark:border-[#22353D]">
                  <div className="flex items-baseline justify-between mb-2.5">
                    <span className="text-base sm:text-lg font-black text-zinc-950 dark:text-white font-mono">
                      {priceFormatted}
                    </span>
                    <span className="text-[10px] font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30">
                      Fixed Price
                    </span>
                  </div>

                  {/* High-Contrast Buttons */}
                  <div className="grid grid-cols-2 gap-2 font-['Poppins']">
                    <button
                      type="button"
                      onClick={() => onViewDetails(laptop)}
                      className="py-2 px-2 rounded-[12px] bg-white dark:bg-[#152227] hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] text-xs font-semibold transition-all duration-300 border border-[#C8DFD4] dark:border-[#26443B] cursor-pointer text-center hover:shadow-xs"
                    >
                      Specs
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenWhatsApp(laptop)}
                      className="py-2 px-2 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] text-xs font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-1 active:scale-95 shadow-xs border border-transparent"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-white dark:text-[#04251B]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
