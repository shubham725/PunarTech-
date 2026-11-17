import React from 'react';
import { Laptop, getLaptopWhatsAppUrl } from '../data/laptops';
import { ProductCard } from './ProductCard';
import { LaptopImage } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import {
  ArrowRight,
  Clock,
  Percent,
  Heart,
  Cpu,
  HardDrive,
} from 'lucide-react';

interface DealsSectionProps {
  dealLaptops: Laptop[];
  onViewDetails: (laptop: Laptop) => void;
  onOpenWhatsApp: (laptop: Laptop) => void;
  onShareLaptop: (laptop: Laptop) => void;
  comparedLaptopIds?: string[];
  onToggleCompare?: (laptop: Laptop) => void;
  wishlistedLaptopIds?: string[];
  onToggleWishlist?: (laptop: Laptop) => void;
  onOpenRentEmi?: (laptop: Laptop, mode: 'rent' | 'emi') => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  dealLaptops,
  onViewDetails,
  onOpenWhatsApp,
  onShareLaptop,
  comparedLaptopIds = [],
  onToggleCompare,
  wishlistedLaptopIds = [],
  onToggleWishlist,
  onOpenRentEmi,
}) => {
  if (dealLaptops.length === 0) return null;

  const scrollToRentEmi = () => {
    document.getElementById('rental-emi')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="deals"
      className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-10 sm:py-14 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#17212B] dark:text-[#F1F5F9] tracking-tight">
              Today&apos;s Best Deals
            </h2>
            <div className="flex items-center gap-2.5 mt-1.5">
              <span className="w-7 h-1 rounded-full bg-[#059669] dark:bg-[#10B981] shrink-0" />
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">
                Handpicked laptops at great prices, verified and ready to use.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="hidden sm:inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#1E2D38] text-xs font-medium text-[#475569] dark:text-[#94A3B8]">
              <Clock className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
              <span>Ready Stock ·</span>
              <span className="font-mono font-bold text-[#17212B] dark:text-white">
                Pune (60) · Delhi (31)
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="sm:hidden inline-flex items-center gap-1 text-xs font-semibold text-[#059669] dark:text-[#10B981] cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Desktop & Tablet 5-Column Row: 4 Curated Deals + 1 Rent/EMI Promo Card */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {dealLaptops.map((laptop) => (
            <ProductCard
              key={laptop.id}
              laptop={laptop}
              onViewDetails={onViewDetails}
              onOpenWhatsApp={onOpenWhatsApp}
              onShareLaptop={onShareLaptop}
              isCompared={comparedLaptopIds.includes(laptop.id)}
              onToggleCompare={onToggleCompare}
              isWishlisted={wishlistedLaptopIds.includes(laptop.id)}
              onToggleWishlist={onToggleWishlist}
              onOpenRentEmi={onOpenRentEmi}
              featuredLabel="Best Deal"
            />
          ))}

          {/* 5th Card: Rent or Buy with EMI Promo Card matching Template */}
          <div className="sm:col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-b from-[#ECF7F1] to-[#D6EDE0] dark:from-[#10241C] dark:to-[#0C1B15] border border-[#C5E3D1] dark:border-[#1E3B2F] p-5 flex sm:flex-row lg:flex-col justify-between gap-4 overflow-hidden relative">
            <div className="flex-1 flex flex-col justify-between relative z-10">
              <div className="flex justify-between lg:justify-end items-center">
                <span className="lg:hidden text-[11px] font-bold uppercase tracking-wider text-[#057A4B] dark:text-[#34D399]">
                  Flexible Plans
                </span>
                <div className="w-9 h-9 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
              </div>

              <div className="my-3 lg:my-4 space-y-2.5">
                <h3 className="text-xl font-extrabold text-[#17212B] dark:text-white leading-tight">
                  Rent or Buy with EMI
                </h3>
                <p className="text-xs text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-sm">
                  Flexible and affordable options for students, professionals &amp; businesses.
                </p>
                <button
                  type="button"
                  onClick={scrollToRentEmi}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-white dark:bg-[#121B22] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] text-[#057A4B] dark:text-[#34D399] border border-[#B7E1C8] dark:border-[#263846] text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="sm:w-52 sm:h-36 sm:self-center sm:rounded-lg lg:w-auto lg:h-32 lg:mt-2 lg:-mx-5 lg:-mb-5 lg:rounded-none overflow-hidden relative shrink-0 border border-[#C5E3D1]/70 dark:border-[#1E3B2F] lg:border-0">
              <img
                src="/assets/aistudio/images_588341c0.jpg"
                alt="Flexible Rent and EMI Laptop Options"
                className="w-full h-full object-cover object-center opacity-95"
              />
            </div>
          </div>
        </div>

        {/* Mobile Compact Horizontal Deal Cards matching Mobile Screenshot */}
        <div className="sm:hidden space-y-3">
          {dealLaptops.map((laptop) => {
            const isWishlisted = wishlistedLaptopIds.includes(laptop.id);
            const priceDisplay =
              laptop.hasPrice && laptop.sellingPrice !== null
                ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                : 'Contact for Price';
            const emiMonthly =
              laptop.hasPrice && laptop.sellingPrice !== null
                ? Math.round(laptop.sellingPrice / 6)
                : null;

            return (
              <div
                key={laptop.id}
                className="bg-white dark:bg-[#121B22] rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] p-3.5 space-y-3"
              >
                <div className="flex items-start gap-3">
                  {/* Left Thumbnail */}
                  <div
                    onClick={() => onViewDetails(laptop)}
                    className="relative w-28 shrink-0 rounded-lg border border-[#E2E8F0] dark:border-[#263846] overflow-hidden bg-white dark:bg-[#16212A] cursor-pointer"
                  >
                    <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded bg-[#059669] text-white text-[9px] font-bold leading-none">
                      Best Deal
                    </span>
                    <LaptopImage laptop={laptop} size="sm" className="!pt-6 !px-2 !pb-2" />
                  </div>

                  {/* Right Details */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => onViewDetails(laptop)}
                        className="text-sm font-bold text-[#17212B] dark:text-white leading-snug line-clamp-2 cursor-pointer"
                      >
                        {laptop.fullName}
                      </h3>
                      {onToggleWishlist && (
                        <button
                          type="button"
                          onClick={() => onToggleWishlist(laptop)}
                          className={`p-1 rounded-md shrink-0 cursor-pointer ${
                            isWishlisted ? 'text-[#059669]' : 'text-[#64748B]'
                          }`}
                          aria-label="Save laptop"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                      )}
                    </div>

                    <div className="text-[11px] text-[#475569] dark:text-[#94A3B8] space-y-0.5">
                      <div className="flex items-center gap-1 truncate">
                        <Cpu className="w-3 h-3 shrink-0" />
                        <span className="truncate">{laptop.processor}</span>
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <HardDrive className="w-3 h-3 shrink-0" />
                        <span className="font-mono truncate">
                          {laptop.ram} · {laptop.storageRaw}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="font-mono text-base font-extrabold text-[#059669] dark:text-[#10B981] tabular-nums">
                        {priceDisplay}
                      </span>
                      {emiMonthly && (
                        <span className="text-[10px] font-mono font-semibold text-[#057A4B] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-1.5 py-0.5 rounded">
                          EMI ~₹{emiMonthly.toLocaleString('en-IN')}/mo
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onViewDetails(laptop)}
                    className="h-9 rounded-lg border border-[#CBD5E1] dark:border-[#2C3F4E] text-xs font-semibold text-[#17212B] dark:text-white cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenWhatsApp
                        ? onOpenWhatsApp(laptop)
                        : window.open(getLaptopWhatsAppUrl(laptop), '_blank', 'noopener,noreferrer')
                    }
                    className="h-9 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Mobile Compact Rent or Buy Promo Banner */}
          <div className="rounded-xl bg-gradient-to-r from-[#ECF7F1] to-[#D6EDE0] dark:from-[#10241C] dark:to-[#0C1B15] border border-[#C5E3D1] dark:border-[#1E3B2F] p-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#17212B] dark:text-white">
                Rent or Buy with Easy EMI
              </h3>
              <p className="text-[11px] text-[#334155] dark:text-[#CBD5E1] mt-0.5">
                Flexible plans for students &amp; teams
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToRentEmi}
              className="h-9 px-3.5 rounded-full bg-white dark:bg-[#121B22] text-[#057A4B] dark:text-[#34D399] border border-[#B7E1C8] dark:border-[#263846] text-xs font-bold inline-flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Know More</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
