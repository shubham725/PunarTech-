import React, { useState } from 'react';
import { Laptop, getLaptopWhatsAppUrl } from '../data/laptops';
import { LaptopImage, getLaptopGalleryImages } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Heart, Scale, Share2, Cpu, HardDrive } from 'lucide-react';

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
  featuredLabel?: string;
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
  featuredLabel,
}) => {
  const gallery = getLaptopGalleryImages(laptop);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const priceDisplay =
    laptop.hasPrice && laptop.sellingPrice !== null
      ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
      : 'Contact for Price';

  const emiMonthly =
    laptop.hasPrice && laptop.sellingPrice !== null
      ? Math.round(laptop.sellingPrice / 6)
      : null;

  const handleEnquire = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp(laptop);
    } else {
      window.open(getLaptopWhatsAppUrl(laptop), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className="group bg-white dark:bg-[#121B22] rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] hover:border-[#059669] dark:hover:border-[#10B981] hover:shadow-sm transition-all duration-200 flex flex-col h-full overflow-hidden">
      {/* 1. Product Photography Stage */}
      <div className="relative border-b border-[#E2E8F0] dark:border-[#1E2D38] bg-white dark:bg-[#16212A]">
        {/* Top Left Featured Tag or Stock ID */}
        <div className="absolute top-3 left-3 z-10">
          {featuredLabel ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#059669] text-white text-[10px] font-bold tracking-wide">
              {featuredLabel}
            </span>
          ) : (
            <span className="font-mono text-[10px] font-semibold text-[#64748B] dark:text-[#94A3B8] bg-[#F8FAFC]/90 dark:bg-[#121B22]/90 px-2 py-0.5 rounded border border-[#E2E8F0] dark:border-[#263846]">
              {laptop.stockId}
            </span>
          )}
        </div>

        {/* Top-Right Utility Controls (Compare + Wishlist Heart) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          {onToggleCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(laptop);
              }}
              className={`h-7 px-2 rounded-md border text-[10px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-[#059669] text-white border-[#059669]'
                  : 'bg-white/95 dark:bg-[#121B22]/95 text-[#475569] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#263846] hover:text-[#17212B] dark:hover:text-white'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Add to compare'}
              aria-label="Compare laptop"
            >
              <Scale className="w-3 h-3" />
              <span className="hidden sm:inline">{isCompared ? 'Added' : 'Compare'}</span>
            </button>
          )}

          {onToggleWishlist && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(laptop);
              }}
              className={`w-7 h-7 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-[#E8F7EE] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981] border-[#059669]/40'
                  : 'bg-white/95 dark:bg-[#121B22]/95 text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#263846] hover:text-[#17212B] dark:hover:text-white'
              }`}
              title={isWishlisted ? 'Saved in wishlist' : 'Save laptop'}
              aria-label="Save laptop"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Clean 4:3 Image Frame */}
        <div
          onClick={() => onViewDetails(laptop)}
          className="cursor-pointer"
          title={`View details for ${laptop.fullName}`}
        >
          <LaptopImage
            laptop={laptop}
            size="md"
            customSrc={gallery[activeImageIndex]?.url}
            className="!bg-white dark:!bg-[#16212A] pt-7"
          />
        </div>

        {/* Minimal Angle Switcher */}
        {gallery.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-white/90 dark:bg-[#121B22]/90 px-2 py-1 rounded-full border border-[#E2E8F0] dark:border-[#263846]">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setActiveImageIndex(idx)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'w-4 bg-[#059669] dark:bg-[#10B981]'
                    : 'w-1.5 bg-[#CBD5E1] dark:bg-[#475569]'
                }`}
                aria-label={img.label}
                title={img.label}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Product Information Hierarchy */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3.5">
        <div className="space-y-2.5">
          {/* Model Name */}
          <h3
            onClick={() => onViewDetails(laptop)}
            className="text-sm sm:text-[15px] font-bold text-[#17212B] dark:text-[#F1F5F9] group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors line-clamp-2 min-h-[40px] leading-snug cursor-pointer"
            title={laptop.fullName}
          >
            {laptop.fullName}
          </h3>

          {/* Icon-Prefixed Compact Spec Lines matching Reference */}
          <div className="space-y-1.5 text-xs text-[#475569] dark:text-[#94A3B8]">
            <div className="flex items-center gap-1.5 truncate">
              <Cpu className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              <span className="truncate font-medium text-[#334155] dark:text-[#CBD5E1]">
                {laptop.processor}
              </span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <HardDrive className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              <span className="truncate font-mono text-[11px]">
                {laptop.ram} · {laptop.storageRaw}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-[#059669] dark:text-[#10B981] font-semibold">
              In Stock · {laptop.branch}
            </span>
            <span className="text-[#64748B] dark:text-[#94A3B8]">
              {laptop.condition && laptop.condition.trim() ? laptop.condition : 'Grade A'}
            </span>
          </div>
        </div>

        {/* 3. Verified Price & Actions */}
        <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#1E2D38] space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-lg sm:text-xl font-extrabold text-[#059669] dark:text-[#10B981] tabular-nums">
              {priceDisplay}
            </span>

            {emiMonthly && onOpenRentEmi ? (
              <button
                type="button"
                onClick={() => onOpenRentEmi(laptop, 'emi')}
                className="text-[11px] font-semibold text-[#057A4B] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2 py-0.5 rounded font-mono hover:underline cursor-pointer"
              >
                ₹{emiMonthly.toLocaleString('en-IN')}/mo
              </button>
            ) : (
              <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                {laptop.display !== 'Not listed' ? laptop.display : 'Tested Unit'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onViewDetails(laptop)}
              className="flex-1 h-9 px-2.5 rounded-lg bg-white dark:bg-[#18242D] hover:bg-[#F8FAFC] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-[#F1F5F9] text-xs font-semibold border border-[#CBD5E1] dark:border-[#2C3F4E] transition-colors cursor-pointer whitespace-nowrap"
            >
              View Details
            </button>

            <button
              type="button"
              onClick={handleEnquire}
              className="flex-[1.15] h-9 px-2.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Enquire</span>
            </button>

            <button
              type="button"
              onClick={() => onShareLaptop(laptop)}
              className="w-9 h-9 rounded-lg bg-white dark:bg-[#18242D] hover:bg-[#F8FAFC] dark:hover:bg-[#1E2D38] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#263846] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Share laptop"
              aria-label="Share laptop"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
