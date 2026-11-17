import React, { useEffect, useState } from 'react';
import { Laptop, WHATSAPP_CONFIG } from '../data/laptops';
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
  Package,
  Calendar,
  CreditCard,
  SlidersHorizontal,
} from 'lucide-react';
import {
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
Direct WhatsApp: https://wa.me/${WHATSAPP_CONFIG.number}?text=Enquiry%20for%20${encodeURIComponent(laptop.stockId)}
Website: https://punartech.vercel.app/`;

    navigator.clipboard.writeText(specsSummary);
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 2500);
  };

  const gallery = getLaptopGalleryImages(laptop);
  const currentImg = gallery[activeImageIndex] || gallery[0];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-[#0B1116]/75 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#121B22] rounded-t-xl sm:rounded-xl shadow-2xl border border-[#E2E8F0] dark:border-[#263846] overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="laptop-detail-title"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#0B1116] shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span className="font-mono text-xs font-bold text-[#0D9488] dark:text-[#14B8A6] bg-white dark:bg-[#121B22] px-2.5 py-1 rounded-md border border-[#E2E8F0] dark:border-[#263846] shrink-0">
              {laptop.stockId}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md inline-flex items-center gap-1 shrink-0 bg-[#17212B] dark:bg-[#18242D] text-white border border-[#263846]">
              <MapPin className="w-3 h-3 text-[#10B981]" />
              <span>{laptop.branch} Hub</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-[#059669] dark:text-[#10B981]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Tested &amp; Verified</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#18242D] transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-7 overflow-y-auto space-y-6">
          {/* Hero Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Gallery (5 cols) */}
            <div className="md:col-span-5 rounded-xl border border-[#E2E8F0] dark:border-[#263846] overflow-hidden bg-white dark:bg-[#121B22] flex flex-col">
              <div className="relative">
                <LaptopImage
                  laptop={laptop}
                  size="lg"
                  customSrc={currentImg?.url}
                  altText={`${laptop.fullName} - ${currentImg?.label || 'View'}`}
                />
                <div className="px-3 py-1.5 bg-[#F8FAFC] dark:bg-[#18242D] border-t border-[#E2E8F0] dark:border-[#263846] flex items-center justify-between text-[11px] text-[#475569] dark:text-[#94A3B8]">
                  <span>{currentImg?.label || 'Actual Unit View'}</span>
                  <span className="font-mono tabular-nums">
                    {activeImageIndex + 1}/{gallery.length}
                  </span>
                </div>
              </div>

              {gallery.length > 1 && (
                <div className="p-2.5 bg-white dark:bg-[#121B22] border-t border-[#E2E8F0] dark:border-[#263846] grid grid-cols-3 gap-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`rounded-lg overflow-hidden border p-1 bg-[#F8FAFC] dark:bg-[#18242D] text-left transition-colors cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#059669] dark:border-[#10B981] ring-1 ring-[#059669]'
                          : 'border-[#E2E8F0] dark:border-[#263846] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="h-12 sm:h-14 w-full flex items-center justify-center overflow-hidden">
                        <img
                          src={img.url}
                          alt={img.label}
                          className="w-full h-full object-contain object-center"
                        />
                      </div>
                      <span className="block text-[9px] font-semibold text-[#475569] dark:text-[#CBD5E1] truncate mt-1 text-center">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specs & Purchase Summary (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#0D9488] dark:text-[#14B8A6]">
                    {laptop.brand}
                  </span>
                  {laptop.generation && (
                    <>
                      <span className="text-[#CBD5E1] dark:text-[#334155]">·</span>
                      <span className="font-semibold text-[#475569] dark:text-[#94A3B8]">
                        Intel {laptop.generation}th Gen
                      </span>
                    </>
                  )}
                  <span className="text-[#CBD5E1] dark:text-[#334155]">·</span>
                  <span className="font-medium text-[#059669] dark:text-[#10B981]">
                    {laptop.condition || 'Grade A+ Verified'}
                  </span>
                </div>

                <h2
                  id="laptop-detail-title"
                  className="text-2xl sm:text-3xl font-bold text-[#17212B] dark:text-white tracking-tight mt-1 leading-snug"
                >
                  {laptop.fullName}
                </h2>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 font-mono">
                  Inventory Model: {laptop.model}
                </p>
              </div>

              {/* Price Panel */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] space-y-1.5">
                <span className="text-[11px] text-[#475569] dark:text-[#94A3B8] font-bold uppercase tracking-wider block">
                  Verified Selling Price
                </span>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#17212B] dark:text-white font-mono tracking-tight tabular-nums">
                    {priceFormatted}
                  </span>
                  <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">
                    {laptop.hasPrice
                      ? 'Includes verified power adapter & QA report'
                      : 'Request direct quote on WhatsApp'}
                  </span>
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  In physical stock at PunarTech <strong className="text-[#17212B] dark:text-white">{laptop.branch} Hub</strong>.
                </p>
              </div>

              {/* Rent or Easy EMI Quick Links */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenRentEmi) {
                      onOpenRentEmi(laptop, 'rent');
                    } else {
                      window.open(getRentalWhatsAppUrl(laptop, 3), '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="p-3 rounded-lg bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#263846] hover:border-[#059669] dark:hover:border-[#10B981] text-left transition-colors cursor-pointer"
                >
                  <span className="text-[11px] text-[#0D9488] dark:text-[#14B8A6] flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Monthly Rental</span>
                  </span>
                  <span className="text-sm font-bold text-[#17212B] dark:text-white block mt-0.5">
                    Rent on Request
                  </span>
                  <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
                    Calculate rental plan &rarr;
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenRentEmi) {
                      onOpenRentEmi(laptop, 'emi');
                    } else {
                      window.open(getEmiWhatsAppUrl(laptop, 6), '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="p-3 rounded-lg bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#263846] hover:border-[#059669] dark:hover:border-[#10B981] text-left transition-colors cursor-pointer"
                >
                  <span className="text-[11px] text-[#0D9488] dark:text-[#14B8A6] flex items-center gap-1 font-semibold">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Easy EMI</span>
                  </span>
                  <span className="text-sm font-bold font-mono text-[#17212B] dark:text-white block mt-0.5 tabular-nums">
                    {laptop.sellingPrice
                      ? `₹${Math.round(laptop.sellingPrice / 6).toLocaleString('en-IN')}/mo`
                      : 'Custom EMI Plans'}
                  </span>
                  <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
                    0% No-Cost options &rarr;
                  </span>
                </button>
              </div>

              {/* Primary Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenWhatsApp(laptop)}
                  className="sm:col-span-2 h-11 inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Enquire on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => onShareLaptop(laptop)}
                  className="h-11 inline-flex items-center justify-center gap-2 px-3 rounded-lg bg-white dark:bg-[#18242D] hover:bg-[#F8FAFC] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-white border border-[#CBD5E1] dark:border-[#2C3F4E] text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#0D9488] dark:text-[#14B8A6]" />
                  <span>Share</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopySpecs}
                className="w-full h-9 inline-flex items-center justify-center gap-2 px-3 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2D38] text-[#475569] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#263846] text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedSpecs ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                    <span className="text-[#059669] dark:text-[#10B981]">Specifications copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Specifications</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Full Technical Specifications Table */}
          <div className="space-y-3 pt-5 border-t border-[#E2E8F0] dark:border-[#263846]">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#17212B] dark:text-white">
                Hardware Specifications
              </h3>
              <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                ID: {laptop.stockId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-start gap-3">
                <Cpu className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Processor
                  </span>
                  <span className="text-sm font-bold text-[#17212B] dark:text-white block mt-0.5">
                    {laptop.processor}
                  </span>
                  {laptop.generation && (
                    <span className="text-[11px] text-[#0D9488] dark:text-[#14B8A6] block mt-0.5">
                      Intel {laptop.generation}th Generation
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-start gap-3">
                <Layers className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Memory (RAM)
                  </span>
                  <span className="text-sm font-mono font-bold text-[#17212B] dark:text-white block mt-0.5">
                    {laptop.ram}
                  </span>
                  <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
                    Tested dual/single-channel memory
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-start gap-3">
                <HardDrive className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Storage Drive
                  </span>
                  <span className="text-sm font-mono font-bold text-[#17212B] dark:text-white block mt-0.5">
                    {laptop.storageRaw}
                  </span>
                  <span className="text-[11px] text-[#0D9488] dark:text-[#14B8A6] block mt-0.5">
                    Architecture: {laptop.storageType}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-start gap-3">
                <Monitor className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Display
                  </span>
                  <span className="text-sm font-bold text-[#17212B] dark:text-white block mt-0.5">
                    {laptop.display !== 'Not listed' ? `${laptop.display} Screen` : 'Standard Screen'}
                  </span>
                  <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
                    {laptop.displayClass}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-start gap-3">
                <SlidersHorizontal className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Graphics (GPU)
                  </span>
                  <span className="text-sm font-bold text-[#17212B] dark:text-white block mt-0.5">
                    {laptop.graphicsRaw}
                  </span>
                  <span className="text-[11px] text-[#0D9488] dark:text-[#14B8A6] block mt-0.5">
                    {laptop.hasDedicatedGraphics ? 'Dedicated GPU Equipped' : 'Integrated Graphics'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Showroom Stock
                  </span>
                  <span className="text-sm font-bold text-[#17212B] dark:text-white block mt-0.5">
                    {laptop.branch} Showroom Hub
                  </span>
                  <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
                    Ready for walk-in inspection or dispatch
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Segment Price Comparison Chart */}
          <PriceComparisonChart currentLaptop={laptop} />

          {/* Inspection Checklist */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h4 className="text-xs font-bold text-[#17212B] dark:text-white uppercase tracking-wider">
                PunarTech Hardware Inspection Checklist
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-[#334155] dark:text-[#CBD5E1]">
              {[
                'Motherboard stress & VRM tested',
                'Display panel pixel & brightness check',
                'Keyboard & trackpad precision verified',
                'USB, HDMI & audio ports tested',
                'Battery load & backup verified',
                'Thermal paste & fan cleaned',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 bg-white dark:bg-[#121B22] px-3 py-2 rounded-lg border border-[#E2E8F0] dark:border-[#263846]"
                >
                  <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Package Inclusions & Suitability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] space-y-1.5">
              <span className="font-bold text-[#17212B] dark:text-white flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#0D9488] dark:text-[#14B8A6]" />
                <span>In the Box</span>
              </span>
              <ul className="space-y-1 text-[#475569] dark:text-[#94A3B8] pt-1">
                <li>• 1x {laptop.fullName} (QA Tested)</li>
                <li>• 1x Compatible Power Adapter &amp; Cable</li>
                <li>• Protective transit packaging</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] space-y-1.5">
              <span className="font-bold text-[#17212B] dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <span>Recommended Usage</span>
              </span>
              <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed pt-1">
                {laptop.suitableFor}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#0B1116] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 truncate text-xs">
            <span className="font-mono font-bold text-[#17212B] dark:text-white">{laptop.stockId}</span>
            <span className="text-[#CBD5E1] dark:text-[#334155]">·</span>
            <span className="text-[#475569] dark:text-[#94A3B8] truncate">{laptop.branch} Hub</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-lg bg-white hover:bg-[#F1F5F9] text-[#17212B] dark:bg-[#18242D] dark:text-white dark:hover:bg-[#1E2D38] text-xs font-semibold border border-[#CBD5E1] dark:border-[#2C3F4E] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onOpenWhatsApp(laptop)}
              className="h-10 inline-flex items-center gap-1.5 px-5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
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
