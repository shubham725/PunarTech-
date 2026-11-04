import React from 'react';
import { Laptop } from '../data/laptops';
import { LaptopImage, getLaptopGalleryImages } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import {
  Eye,
  Share2,
  Heart,
  Scale,
  ShieldCheck,
  Zap,
  MapPin,
  Camera,
  CheckCircle2,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { getLaptopRentalEstimate } from '../utils/finance';

interface ProductCardProps {
  laptop: Laptop;
  onViewDetails: (laptop: Laptop) => void;
  onOpenWhatsApp: (laptop: Laptop) => void;
  onShareLaptop: (laptop: Laptop) => void;
  isCompared?: boolean;
  onToggleCompare?: (laptop: Laptop) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (laptop: Laptop) => void;
  onOpenRentEmi?: (laptop: Laptop, mode: 'rent' | 'emi') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  laptop,
  onViewDetails,
  onOpenWhatsApp,
  onShareLaptop,
  isCompared = false,
  onToggleCompare,
  isWishlisted = false,
  onToggleWishlist,
  onOpenRentEmi,
}) => {
  const priceDisplay =
    laptop.hasPrice && laptop.sellingPrice !== null
      ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
      : 'Contact for Price';

  const gallery = getLaptopGalleryImages(laptop);
  const rentEstimate = getLaptopRentalEstimate(laptop);

  return (
    <article className="group bg-white dark:bg-[#152227] rounded-[22px] border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-xl hover:shadow-[#009B69]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden select-none relative shadow-2xs font-['Poppins']">
      {/* Product Image Stage */}
      <div
        onClick={() => onViewDetails(laptop)}
        className="cursor-pointer relative overflow-hidden bg-[#F6F9F8] dark:bg-[#0E1519] border-b border-[#E3EBE7] dark:border-[#22353D]"
        title="Click to view full specifications & real photos"
      >
        <div className="transition-transform duration-300 group-hover:scale-105">
          <LaptopImage laptop={laptop} size="md" />
        </div>

        {/* Top-Left: "PunarTech Assured" Trust Badge + Stock ID */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 flex items-center gap-1 sm:gap-1.5 pointer-events-none max-w-[70%]">
          <span className="inline-flex items-center gap-0.5 sm:gap-1 bg-gradient-to-r from-[#009B69] to-[#007A8D] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[6px] shadow-xs shrink-0">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>Assured</span>
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#007A52] dark:text-[#34D399] bg-white/95 dark:bg-[#152227]/95 px-2 py-0.5 rounded-[6px] shadow-xs border border-[#C8DFD4] dark:border-[#10B981]/30 truncate">
            {laptop.stockId}
          </span>
        </div>

        {/* Top-Right: Wishlist Heart & Branch Badge */}
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 flex items-center gap-1">
          {onToggleWishlist && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(laptop);
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95 ${
                isWishlisted
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  : 'bg-white/95 dark:bg-[#152227]/95 text-zinc-500 dark:text-zinc-400 hover:text-rose-500 border border-[#E3EBE7] dark:border-[#22353D]'
              }`}
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-label="Wishlist"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
              />
            </button>
          )}

          <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-[6px] shadow-xs bg-[#101828] dark:bg-[#0E1519] text-white border border-transparent dark:border-[#22353D]">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#009B69] dark:text-[#10B981]" />
            <span>{laptop.branch}</span>
          </span>
        </div>

        {/* Bottom-Left: Real Photos Indicator Tag */}
        <div className="absolute bottom-2 left-2 sm:left-2.5 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-zinc-700 dark:text-zinc-200 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs px-2 py-0.5 rounded-[6px] border border-zinc-200 dark:border-zinc-700 shadow-2xs">
            <Camera className="w-3 h-3 text-zinc-500" />
            <span>{gallery.length} Views</span>
          </span>
        </div>

        {/* Bottom-Right: Compare Button */}
        {onToggleCompare && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(laptop);
            }}
            className={`absolute bottom-2 right-2 sm:right-2.5 z-10 px-2 py-1 rounded-[6px] text-[10px] font-semibold shadow-xs border transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
              isCompared
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'bg-white/95 dark:bg-zinc-900/95 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'
            }`}
            title="Add to laptop comparison"
          >
            <Scale className="w-3 h-3" />
            <span>{isCompared ? 'Comparing' : 'Compare'}</span>
          </button>
        )}
      </div>

      {/* Card Details Body */}
      <div className="p-3.5 sm:p-4.5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3 bg-white dark:bg-[#152227] transition-colors">
        <div>
          {/* Brand Header & Generation */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-['Urbanist']">
              {laptop.brand}
            </span>
            {laptop.generation && (
              <span className="text-[9px] sm:text-[10px] font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-1.5 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30 font-mono">
                {laptop.generation}th Gen
              </span>
            )}
          </div>

          {/* Model Title */}
          <h3
            onClick={() => onViewDetails(laptop)}
            className="text-sm sm:text-[15px] font-bold text-zinc-950 dark:text-white group-hover:text-[#009B69] dark:group-hover:text-[#10B981] group-hover:underline transition-colors line-clamp-2 min-h-[38px] sm:min-h-[44px] cursor-pointer leading-snug tracking-tight font-['Urbanist']"
            title={laptop.fullName}
          >
            {laptop.fullName}
          </h3>

          {/* Refurbished Grade Row */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-[#007A52] dark:text-[#34D399] text-[10px] sm:text-[11px] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30">
              Grade A++ Refurbished
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">•</span>
            <span className="text-zinc-700 dark:text-zinc-300 font-semibold text-[10px] sm:text-[11px]">
              Motherboard Verified
            </span>
          </div>

          {/* Key Specifications Matrix */}
          <div className="mt-2 sm:mt-2.5 p-2 sm:p-2.5 bg-[#F6F9F8] dark:bg-[#0E1519] rounded-[14px] border border-[#E3EBE7] dark:border-[#22353D] space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {/* Processor */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009B69] dark:bg-[#10B981] shrink-0" />
              <span className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0 text-[11px] sm:text-xs">CPU:</span>
              <span className="font-semibold text-zinc-900 dark:text-white truncate text-[11px] sm:text-xs">
                {laptop.processor}
              </span>
            </div>

            {/* RAM & Storage */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009B69] dark:bg-[#10B981] shrink-0" />
              <span className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0 text-[11px] sm:text-xs">RAM/Disk:</span>
              <span className="font-bold text-zinc-900 dark:text-white font-mono text-[11px] sm:text-xs">
                {laptop.ram}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span className="font-bold text-zinc-900 dark:text-white truncate text-[11px] sm:text-xs font-mono">
                {laptop.storageRaw}
              </span>
            </div>

            {/* Display */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007A8D] dark:bg-[#06B6D4] shrink-0" />
              <span className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0 text-[11px] sm:text-xs">Display:</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate text-[11px] sm:text-xs">
                {laptop.display !== 'Not listed' ? `${laptop.display} Screen` : 'Standard Display'}
              </span>
            </div>

            {/* Graphics */}
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400 pt-0.5">
              <CheckCircle2 className="w-3 h-3 text-[#009B69] dark:text-[#10B981] shrink-0" />
              <span className="truncate">{laptop.graphicsRaw}</span>
            </div>
          </div>
        </div>

        {/* Bottom Pinned Price and Actions Area */}
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-[#E3EBE7] dark:border-[#22353D] space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block font-['Urbanist']">
                Verified Price
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`text-lg sm:text-2xl font-black tracking-tight ${
                    laptop.hasPrice ? 'text-zinc-950 dark:text-white font-mono' : 'text-[#007A52] dark:text-[#34D399] text-sm sm:text-base font-mono'
                  }`}
                >
                  {priceDisplay}
                </span>
                {laptop.hasPrice && (
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-1.5 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30">
                    Fixed
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#007A52] dark:text-[#34D399]">
                <Zap className="w-3 h-3 text-[#009B69] dark:text-[#10B981] fill-[#009B69] dark:fill-[#10B981]" />
                <span>Ready Stock</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 block font-mono">
                {laptop.branch} Hub
              </span>
            </div>
          </div>

          {/* Rent & EMI Quick Options Row */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-[10px] bg-[#F6F9F8] dark:bg-[#0E1519] border border-[#E3EBE7] dark:border-[#22353D] text-[10px]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenRentEmi?.(laptop, 'rent');
              }}
              className="font-bold text-zinc-800 dark:text-zinc-200 hover:text-[#009B69] dark:hover:text-[#10B981] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              title="Rent this laptop monthly (Rent on Request - Contact Us)"
            >
              <Calendar className="w-3 h-3 text-[#009B69] dark:text-[#10B981]" />
              <span>Rent: Contact Us</span>
            </button>

            <span className="text-zinc-300 dark:text-zinc-700">|</span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenRentEmi?.(laptop, 'emi');
              }}
              className="font-bold text-zinc-800 dark:text-zinc-200 hover:text-[#007A8D] dark:hover:text-[#38BDF8] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              title="Buy on easy monthly installments"
            >
              <CreditCard className="w-3 h-3 text-[#007A8D] dark:text-[#38BDF8]" />
              <span>
                {laptop.sellingPrice
                  ? `EMI: ₹${Math.round(laptop.sellingPrice / 6).toLocaleString('en-IN')}/mo`
                  : 'Easy EMI'}
              </span>
            </button>
          </div>

          {/* Action Buttons: Specs, WhatsApp Enquiry & Share */}
          <div className="flex items-center gap-1.5 pt-1 font-['Poppins']">
            <button
              type="button"
              onClick={() => onViewDetails(laptop)}
              className="flex-1 min-h-[42px] sm:min-h-[38px] inline-flex items-center justify-center gap-1 py-2 px-2 rounded-[12px] bg-white dark:bg-[#152227] hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] text-xs font-semibold transition-all duration-300 cursor-pointer active:scale-95 border border-[#C8DFD4] dark:border-[#26443B] hover:shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Specs</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenWhatsApp(laptop)}
              className="flex-[1.5] min-h-[42px] sm:min-h-[38px] inline-flex items-center justify-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] active:scale-95 text-white dark:text-[#04251B] text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer border border-transparent"
              title="Chat directly on WhatsApp (+91 80550 35502)"
            >
              <WhatsAppIcon className="w-4 h-4 text-white dark:text-[#04251B]" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => onShareLaptop(laptop)}
              className="min-h-[42px] min-w-[42px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center rounded-[12px] bg-white dark:bg-[#152227] hover:bg-[#F6F9F8] dark:hover:bg-[#1B2B32] text-zinc-700 dark:text-zinc-300 transition-all duration-300 border border-[#E3EBE7] dark:border-[#22353D] cursor-pointer active:scale-95 hover:shadow-xs"
              title="Share laptop specifications & WhatsApp group link"
              aria-label="Share deal"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
