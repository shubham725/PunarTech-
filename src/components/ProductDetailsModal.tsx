import React, { useEffect, useState } from 'react';
import { Laptop } from '../data/laptops';
import { LaptopImage, getLaptopGalleryImages } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { PriceComparisonChart } from './PriceComparisonChart';
import {
  X,
  Cpu,
  HardDrive,
  Monitor,
  MapPin,
  ShieldCheck,
  Check,
  Layers,
  Share2,
  Copy,
  Sparkles,
  Package,
  BatteryCharging,
  Wifi,
  Keyboard,
  Clock,
  PhoneCall,
  Camera,
  Calendar,
  CreditCard,
  Percent,
} from 'lucide-react';
import {
  getLaptopRentalEstimate,
  getRentalWhatsAppUrl,
  getEmiWhatsAppUrl,
} from '../utils/finance';

interface ProductDetailsModalProps {
  laptop: Laptop | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp: (laptop: Laptop) => void;
  onShareLaptop: (laptop: Laptop) => void;
  onOpenRentEmi?: (laptop: Laptop, mode: 'rent' | 'emi') => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  laptop,
  isOpen,
  onClose,
  onOpenWhatsApp,
  onShareLaptop,
  onOpenRentEmi,
}) => {
  const [copiedSpecs, setCopiedSpecs] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [laptop?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !laptop) return null;

  const priceFormatted =
    laptop.hasPrice && laptop.sellingPrice !== null
      ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
      : 'Contact for Price';

  const handleCopySpecs = () => {
    const specsSummary = `PunarTech Verified Laptop Deal
Model: ${laptop.fullName}
Stock ID: ${laptop.stockId}
Branch: ${laptop.branch} Hub
Price: ${priceFormatted}
Processor: ${laptop.processor}
RAM: ${laptop.ram}
Storage: ${laptop.storageRaw}
Display: ${laptop.display !== 'Not listed' ? laptop.display : 'Standard Screen'}
Graphics: ${laptop.graphicsRaw}
Live Website Deal: https://punartech.vercel.app/?laptop=${encodeURIComponent(laptop.stockId)}
Direct WhatsApp: https://wa.me/918055035502?text=Enquiry%20for%20${encodeURIComponent(laptop.stockId)}
Website: https://punartech.vercel.app/`;

    navigator.clipboard.writeText(specsSummary);
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-black/75 backdrop-blur-xs overflow-y-auto font-['Poppins']">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#152227] rounded-t-[24px] sm:rounded-[24px] shadow-2xl border border-[#E3EBE7] dark:border-[#22353D] overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh] animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="laptop-detail-title"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E3EBE7] dark:border-[#22353D] bg-[#F8FBF9] dark:bg-[#0E1519] shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2.5 truncate">
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#007A8D] dark:text-[#10B981] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2.5 sm:px-3 py-1 rounded-[8px] shadow-xs shrink-0 border border-[#BCE7CB] dark:border-[#10B981]/30">
              {laptop.stockId}
            </span>
            <span className="text-[11px] sm:text-xs font-['Poppins'] font-semibold px-2.5 sm:px-3 py-1 rounded-[8px] flex items-center gap-1 sm:gap-1.5 shrink-0 bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{laptop.branch} Hub</span>
            </span>
            <span className="hidden sm:inline-flex text-xs font-semibold text-[#007A8D] dark:text-[#06B6D4] bg-[#E0F4F7] dark:bg-[#06B6D4]/15 border border-[#BDEAF2] dark:border-[#06B6D4]/30 px-2.5 py-1 rounded-[8px]">
              100% Tested &amp; Verified
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-[10px] text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-[#E8F7EE] dark:hover:bg-[#10191E] transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-5 sm:space-y-7">
          {/* Main Hero Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Laptop Image Stage with Multi-Angle Gallery Switcher (5 cols) */}
            <div className="md:col-span-5 rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] overflow-hidden bg-white dark:bg-[#152227] shadow-xs flex flex-col">
              {(() => {
                const gallery = getLaptopGalleryImages(laptop);
                const currentImg = gallery[activeImageIndex] || gallery[0];

                return (
                  <>
                    <div className="relative">
                      <LaptopImage
                        laptop={laptop}
                        size="lg"
                        customSrc={currentImg?.url}
                        altText={`${laptop.fullName} - ${currentImg?.label || 'View'}`}
                      />

                      {/* Floating View Label */}
                      <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 bg-white/95 dark:bg-zinc-900/95 px-2.5 py-1 rounded-md shadow-xs border border-zinc-200 dark:border-zinc-700 backdrop-blur-xs">
                          <Camera className="w-3.5 h-3.5 text-[#007A8D] dark:text-[#06B6D4]" />
                          <span>{currentImg?.label || 'Actual Unit Photo'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Interactive Gallery Thumbnails Switcher */}
                    {gallery.length > 1 && (
                      <div className="p-3 bg-[#F8FBF9] dark:bg-[#0E1519] border-t border-[#E3EBE7] dark:border-[#22353D]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                            <span>Available Angles &amp; Views</span>
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-[#007A8D] dark:text-[#10B981]">
                            {activeImageIndex + 1}/{gallery.length}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {gallery.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveImageIndex(idx)}
                              className={`group/thumb rounded-xl overflow-hidden border-2 p-1 bg-white dark:bg-[#152227] text-left transition-all cursor-pointer ${
                                activeImageIndex === idx
                                  ? 'border-[#009B69] dark:border-[#10B981] ring-2 ring-[#009B69]/20 dark:ring-[#10B981]/20 shadow-xs'
                                  : 'border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] opacity-70 hover:opacity-100'
                              }`}
                            >
                              <div className="h-12 w-full flex items-center justify-center overflow-hidden bg-[#F8FBF9] dark:bg-[#10191E] rounded-lg">
                                <img
                                  src={img.url}
                                  alt={img.label}
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <span className="block text-[9px] font-bold text-zinc-700 dark:text-zinc-300 truncate mt-1 text-center">
                                {img.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}

              <div className="p-3 bg-[#F8FBF9] dark:bg-[#0E1519] border-t border-[#E3EBE7] dark:border-[#22353D] flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-auto">
                <span>Ref: {laptop.stockId}</span>
                <span className="text-[#009B69] dark:text-[#10B981] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Verified PunarTech Unit
                </span>
              </div>
            </div>

            {/* Model Name, Price, and Fast CTAs (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-['Poppins'] font-semibold tracking-wider uppercase text-[#007A8D] dark:text-[#06B6D4]">
                    {laptop.brand} Laptop
                  </span>
                  {laptop.generation && (
                    <span className="text-[11px] font-['Poppins'] font-semibold px-2 py-0.5 rounded-[8px] bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] border border-[#BCE7CB] dark:border-[#10B981]/30">
                      Intel {laptop.generation}th Gen
                    </span>
                  )}
                </div>
                <h2
                  id="laptop-detail-title"
                  className="text-2xl sm:text-3xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white tracking-tight mt-1 leading-snug"
                >
                  {laptop.fullName}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
                  Inventory Model: {laptop.model}
                </p>
              </div>

              {/* Price Box */}
              <div className="p-5 rounded-[20px] bg-white dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] space-y-2 shadow-xs">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-['Poppins'] font-semibold uppercase tracking-wider block">
                  Verified Selling Price
                </span>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-bold text-[#009B69] dark:text-[#10B981] font-mono tracking-tight">
                    {priceFormatted}
                  </span>
                  {laptop.hasPrice ? (
                    <span className="text-xs text-[#007A8D] dark:text-[#06B6D4] font-semibold bg-[#E0F4F7] dark:bg-[#06B6D4]/15 px-3 py-1 rounded-[8px] border border-[#BDEAF2] dark:border-[#06B6D4]/30">
                      Inclusive of All Tests &amp; Charger
                    </span>
                  ) : (
                    <span className="text-xs text-[#009B69] dark:text-[#10B981] font-semibold bg-[#E8F7EE] dark:bg-[#10B981]/15 px-3 py-1 rounded-[8px] border border-[#BCE7CB] dark:border-[#10B981]/30">
                      Enquire for Best Deal
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-['Poppins']">
                  Ready in physical stock at PunarTech <strong className="text-zinc-900 dark:text-white">{laptop.branch} Hub</strong>. No hidden charges.
                </p>
              </div>

              {/* Rent or Buy on Easy EMI Options Banner */}
              <div className="p-4 rounded-[20px] bg-[#F8FBF9] dark:bg-[#0E1519] border border-[#E3EBE7] dark:border-[#22353D] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-['Poppins'] font-semibold text-[#007A8D] dark:text-[#06B6D4] uppercase tracking-wider flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5" />
                    <span>Alternative Flexible Plans</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Pune &amp; Delhi Hubs</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenRentEmi) {
                        onOpenRentEmi(laptop, 'rent');
                      } else {
                        const url = getRentalWhatsAppUrl(laptop, 3);
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="p-3 rounded-[12px] bg-white dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] dark:hover:border-[#10B981] text-left transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <span className="text-[11px] text-[#007A8D] dark:text-[#06B6D4] flex items-center gap-1 font-semibold">
                      <Calendar className="w-3 h-3" />
                      <span>Rent Monthly</span>
                    </span>
                    <span className="text-sm font-bold font-mono text-[#009B69] dark:text-[#10B981] block mt-0.5">
                      Rent: Contact Us
                    </span>
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-400 block mt-0.5 group-hover:text-[#009B69] dark:group-hover:text-[#10B981]">
                      Undisclosed rates · Custom quote &rarr;
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenRentEmi) {
                        onOpenRentEmi(laptop, 'emi');
                      } else {
                        const url = getEmiWhatsAppUrl(laptop, 6);
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="p-3 rounded-[12px] bg-white dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] dark:hover:border-[#10B981] text-left transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <span className="text-[11px] text-[#007A8D] dark:text-[#06B6D4] flex items-center gap-1 font-semibold">
                      <CreditCard className="w-3 h-3" />
                      <span>Easy EMI</span>
                    </span>
                    <span className="text-sm font-bold font-mono text-[#009B69] dark:text-[#10B981] block mt-0.5">
                      {laptop.sellingPrice
                        ? `₹${Math.round(laptop.sellingPrice / 6).toLocaleString('en-IN')}/mo`
                        : 'Custom Plans'}
                    </span>
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-400 block mt-0.5 group-hover:text-[#009B69] dark:group-hover:text-[#10B981]">
                      0% No-Cost on 3/6 mo &rarr;
                    </span>
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => onOpenWhatsApp(laptop)}
                  className="sm:col-span-2 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white border-transparent font-['Poppins'] text-[15px] font-semibold transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
                  title="Direct WhatsApp enquiry to +91 80550 35502"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Enquire on WhatsApp</span>
                </button>

                <button
                  onClick={() => onShareLaptop(laptop)}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-3 rounded-[12px] bg-white dark:bg-[#152227] hover:bg-[#F0F9F5] dark:hover:bg-[#1A2C33] text-zinc-900 dark:text-white border border-[#E3EBE7] dark:border-[#22353D] font-['Poppins'] text-[15px] font-semibold transition-all duration-300 shadow-2xs cursor-pointer active:scale-95"
                >
                  <Share2 className="w-4 h-4 text-[#007A8D] dark:text-[#06B6D4]" />
                  <span>Share Deal</span>
                </button>
              </div>

              {/* Copy specs button */}
              <button
                type="button"
                onClick={handleCopySpecs}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-[12px] bg-[#F8FBF9] dark:bg-[#0E1519] hover:bg-[#E8F7EE] dark:hover:bg-[#1A2C33] text-zinc-700 dark:text-zinc-300 border border-[#E3EBE7] dark:border-[#22353D] text-xs font-['Poppins'] font-semibold transition-all duration-300 cursor-pointer shadow-2xs"
              >
                {copiedSpecs ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
                    <span className="text-[#009B69] dark:text-[#10B981] font-bold">Specifications Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Copy Full Specifications Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Full Technical Specifications Matrix */}
          <div className="space-y-4 pt-4 border-t border-[#E3EBE7] dark:border-[#22353D]">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-black dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#009B69] dark:text-[#10B981]" />
                <span>Full Hardware Specifications</span>
              </h3>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Stock ID: {laptop.stockId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              {/* Processor */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#152227] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center shrink-0 border border-[#BCE7CB] dark:border-[#10B981]/30">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block text-sm">Processor</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{laptop.processor}</span>
                  {laptop.generation && (
                    <span className="text-[11px] text-[#007A8D] dark:text-[#06B6D4] font-medium block mt-0.5">
                      Intel {laptop.generation}th Generation Chip
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">High responsiveness for multitasking</span>
                </div>
              </div>

              {/* Memory (RAM) */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#152227] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center shrink-0 border border-[#BCE7CB] dark:border-[#10B981]/30">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block text-sm">Memory (RAM)</span>
                  <span className="text-[#009B69] dark:text-[#10B981] font-mono font-bold text-sm">{laptop.ram}</span>
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-semibold block mt-0.5">
                    Fast DDR RAM Memory
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">Smooth office, coding &amp; tab browsing</span>
                </div>
              </div>

              {/* Storage */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#152227] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center shrink-0 border border-[#BCE7CB] dark:border-[#10B981]/30">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block text-sm">Storage Drive</span>
                  <span className="text-zinc-900 dark:text-white font-semibold text-sm">{laptop.storageRaw}</span>
                  <span className="text-[11px] text-[#007A8D] dark:text-[#06B6D4] font-semibold block mt-0.5">
                    Drive Architecture: {laptop.storageType}
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">High speed boot &amp; application launch</span>
                </div>
              </div>

              {/* Display & Screen */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#152227] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center shrink-0 border border-[#BCE7CB] dark:border-[#10B981]/30">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block text-sm">Display Screen</span>
                  <span className="text-zinc-900 dark:text-zinc-200 font-semibold">
                    {laptop.display !== 'Not listed' ? `${laptop.display} Display` : 'Standard Screen Size'}
                  </span>
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium block mt-0.5">
                    {laptop.displayClass}
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">Crisp anti-glare viewing panel</span>
                </div>
              </div>

              {/* Graphics GPU */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#152227] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center shrink-0 border border-[#BCE7CB] dark:border-[#10B981]/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block text-sm">Graphics (GPU)</span>
                  <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{laptop.graphicsRaw}</span>
                  {laptop.hasDedicatedGraphics ? (
                    <span className="text-[11px] text-[#009B69] dark:text-[#10B981] font-bold block mt-0.5">
                      ✓ Dedicated GPU Equipped
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                      Energy-efficient Integrated GPU
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">Full HD media playback &amp; rendering</span>
                </div>
              </div>

              {/* Physical Location Hub */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#152227] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center shrink-0 border border-[#BCE7CB] dark:border-[#10B981]/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block text-sm">Physical Location</span>
                  <span className="text-[#009B69] dark:text-[#10B981] font-bold">{laptop.branch} Branch Hub</span>
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-semibold block mt-0.5">
                    Ready for In-Store Demo or Courier
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">Verified stock ID: {laptop.stockId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Price History & Market Inventory Comparison (Recharts) */}
          <PriceComparisonChart currentLaptop={laptop} />

          {/* PunarTech 7-Point Quality Assurance Check */}
          <div className="p-5 rounded-2xl bg-[#F8FBF9] dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#009B69] dark:text-[#10B981]" />
              <h4 className="text-sm font-extrabold text-zinc-950 dark:text-white uppercase tracking-wide">
                PunarTech 7-Point Quality Inspection Report
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-zinc-800 dark:text-zinc-200">
              <div className="flex items-center gap-2 bg-white dark:bg-[#0E1519] p-2.5 rounded-xl border border-[#E3EBE7] dark:border-[#22353D]">
                <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <span>100% Motherboard Tested</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-[#0E1519] p-2.5 rounded-xl border border-[#E3EBE7] dark:border-[#22353D]">
                <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <span>Screen Display Verified (No lines)</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-[#0E1519] p-2.5 rounded-xl border border-[#E3EBE7] dark:border-[#22353D]">
                <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <span>Keyboard &amp; Trackpad Responsive</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-[#0E1519] p-2.5 rounded-xl border border-[#E3EBE7] dark:border-[#22353D]">
                <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <span>USB, HDMI &amp; Ports Checked</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-[#0E1519] p-2.5 rounded-xl border border-[#E3EBE7] dark:border-[#22353D]">
                <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <span>Tested Battery Backup</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-[#0E1519] p-2.5 rounded-xl border border-[#E3EBE7] dark:border-[#22353D]">
                <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                <span>Thermal Cleaned &amp; Serviced</span>
              </div>
            </div>
          </div>

          {/* Package Inclusions & Best For */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F8FBF9] dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] space-y-1.5">
              <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#007A8D] dark:text-[#06B6D4]" />
                <span>What's In The Box:</span>
              </span>
              <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1 pl-1">
                <li>1x {laptop.fullName} Unit (Pre-tested)</li>
                <li>1x Compatible Fast Power Adapter &amp; Cord</li>
                <li>Protective multi-layer shockproof packing</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FBF9] dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] space-y-1.5">
              <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#009B69] dark:text-[#10B981]" />
                <span>Recommended Usage Profile:</span>
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {laptop.suitableFor}
              </p>
            </div>
          </div>

          {/* Live photo request note */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-2xl bg-[#090E11] text-white text-xs border border-[#22353D]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#009B69]/20 text-[#10B981] flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Want live photos or a 360° video demo?</p>
                <p className="text-zinc-400 text-[11px]">
                  Message us on WhatsApp (+91 80550 35502) with Stock ID <strong className="text-[#10B981] font-mono">{laptop.stockId}</strong>.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenWhatsApp(laptop)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Get Live Video on WhatsApp
            </button>
          </div>
        </div>

        {/* Modal Footer (Sticky Bottom on Mobile) */}
        <div className="p-3 sm:p-5 border-t border-[#E3EBE7] dark:border-[#22353D] bg-white/95 dark:bg-[#152227]/95 backdrop-blur-xs flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#007A8D] dark:text-[#10B981]">
              {laptop.stockId}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span className="text-[11px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-400 truncate">{laptop.branch} Hub</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#F8FBF9] hover:bg-[#E8F7EE] text-zinc-700 dark:bg-[#10191E] dark:text-[#E3EBE7] dark:hover:bg-[#1A2C33] text-xs font-['Poppins'] font-semibold transition-all duration-300 cursor-pointer border border-[#E3EBE7] dark:border-[#22353D]"
            >
              Close
            </button>
            <button
              onClick={() => onOpenWhatsApp(laptop)}
              className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white text-xs sm:text-[15px] font-['Poppins'] font-semibold transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Enquiry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
