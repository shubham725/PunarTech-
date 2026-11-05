import React, { useState } from 'react';
import { Laptop, WHATSAPP_CONFIG } from '../data/laptops';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Copy, Check, ExternalLink, X, ShieldCheck, MapPin } from 'lucide-react';

interface WhatsAppModalProps {
  laptop: Laptop | null;
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (message: string) => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  laptop,
  isOpen,
  onClose,
  onNotify,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !laptop) return null;

  const priceText = laptop.hasPrice && laptop.sellingPrice !== null
    ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
    : 'Contact for Price';

  const liveProductUrl = `https://punartech.vercel.app/?laptop=${encodeURIComponent(laptop.stockId)}`;
  const enquiryText = `Hello PunarTech, I am interested in the ${laptop.fullName} (Stock ID: ${laptop.stockId}, ${priceText}) seen on your website: ${liveProductUrl}\n\nIs this laptop available? Please share real photos, current condition, battery health, and warranty details.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(enquiryText);
    setCopied(true);
    onNotify?.('Enquiry message copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    if (WHATSAPP_CONFIG.businessNumber) {
      const url = `https://wa.me/${WHATSAPP_CONFIG.businessNumber}?text=${encodeURIComponent(
        enquiryText
      )}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigator.clipboard.writeText(enquiryText);
      onNotify?.('Enquiry copied! Opening PunarTech WhatsApp Group...');
      window.open(WHATSAPP_CONFIG.groupInviteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#152227] rounded-[24px] shadow-2xl border border-[#E3EBE7] dark:border-[#22353D] overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-modal-title"
      >
        {/* Header with PunarTech logo branding */}
        <div className="bg-gradient-to-r from-[#091512] via-[#0A1A18] to-[#081820] px-6 py-4 text-white flex items-center justify-between border-b border-[#143026]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#009B69]/20 flex items-center justify-center shrink-0 border border-[#009B69]/30">
              <WhatsAppIcon className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <h3 id="whatsapp-modal-title" className="text-base font-['Urbanist'] font-bold text-white">
                WhatsApp Laptop Enquiry
              </h3>
              <p className="text-xs font-['Poppins'] text-zinc-300">
                PunarTech {laptop.branch} Branch · Stock ID: <span className="text-[#10B981] font-mono font-bold">{laptop.stockId}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4 font-['Poppins']">
          {/* Laptop summary pill */}
          <div className="p-3.5 bg-[#F8FBF9] dark:bg-[#152227] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-['Urbanist'] font-bold text-zinc-950 dark:text-white truncate">
                {laptop.fullName}
              </h4>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                <span>{laptop.processor}</span>
                <span aria-hidden="true">·</span>
                <span>{laptop.ram}</span>
                <span aria-hidden="true">·</span>
                <span>{laptop.storageRaw}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-base font-extrabold text-[#009B69] dark:text-[#10B981] font-mono">
                  {priceText}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#007A8D] dark:text-[#06B6D4] bg-[#E0F4F7] dark:bg-[#06B6D4]/15 px-2 py-0.5 rounded-[6px] border border-[#BDEAF2] dark:border-[#06B6D4]/30">
                  <MapPin className="w-3 h-3 text-[#007A8D] dark:text-[#06B6D4]" />
                  {laptop.branch} Stock
                </span>
              </div>
            </div>
          </div>

          {/* Pre-formatted message preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-900 dark:text-white">
                Pre-composed Enquiry Message:
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#009B69] dark:text-[#10B981] hover:underline transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy text</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-3 bg-[#090E11] text-zinc-100 rounded-xl text-xs leading-relaxed font-mono relative border border-[#22353D] break-words">
              {enquiryText}
            </div>
          </div>

          {/* Verification note */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#E8F7EE] dark:bg-[#10B981]/15 text-zinc-800 dark:text-zinc-200 text-xs border border-[#BCE7CB] dark:border-[#10B981]/30">
            <ShieldCheck className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0 mt-0.5" />
            <p>
              Please mention the stock ID <strong className="font-mono text-[#007A8D] dark:text-[#10B981]">{laptop.stockId}</strong> in the chat. Our branch manager will share live photos, battery report, and current availability.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-['Poppins'] font-semibold text-[15px] transition-all duration-300 shadow-sm cursor-pointer active:scale-98"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>Connect on WhatsApp</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-[#F8FBF9] hover:bg-[#E8F7EE] text-zinc-800 dark:bg-[#10191E] dark:text-[#E3EBE7] dark:hover:bg-[#1A2C33] font-['Poppins'] font-semibold text-[15px] transition-all duration-300 border border-[#E3EBE7] dark:border-[#22353D] flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-[#009B69] dark:text-[#10B981]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Message'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
