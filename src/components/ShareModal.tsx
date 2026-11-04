import React, { useState } from 'react';
import { Laptop, getLaptopShareText, getShareWhatsAppUrl } from '../data/laptops';
import { getModelSpecificLaptopImage } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { X, Copy, Check, Share2, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  laptop: Laptop | null;
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  laptop,
  isOpen,
  onClose,
  onNotify,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !laptop) return null;

  const shareText = getLaptopShareText(laptop);
  const whatsappShareUrl = getShareWhatsAppUrl(laptop);
  const laptopImg = getModelSpecificLaptopImage(laptop);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    onNotify?.('Laptop details & WhatsApp group link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectWhatsAppShare = () => {
    window.open(whatsappShareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${laptop.fullName} - PunarTech Deal`,
          text: shareText,
        });
      } catch (err) {
        // User cancelled or unsupported
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-black/80 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-t-[24px] sm:rounded-[24px] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 id="share-modal-title" className="text-base font-['Urbanist'] font-bold text-black dark:text-white">
                Share Laptop Details
              </h3>
              <p className="text-[11px] font-['Poppins'] text-zinc-500 dark:text-zinc-400">
                Send to friends, family, or WhatsApp groups
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[70vh] space-y-4 font-['Poppins']">
          {/* Item summary banner */}
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <div className="w-16 h-14 rounded-xl bg-white dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0 flex items-center justify-center p-1">
              <img
                src={laptopImg}
                alt={laptop.fullName}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-bold block">
                {laptop.stockId} · {laptop.branch} Hub
              </span>
              <h4 className="text-xs font-['Urbanist'] font-bold text-black dark:text-white truncate">
                {laptop.fullName}
              </h4>
              <span className="text-xs font-mono font-extrabold text-black dark:text-white">
                {laptop.hasPrice && laptop.sellingPrice !== null
                  ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                  : 'Contact for Price'}
              </span>
            </div>
          </div>

          {/* Formatted Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-black dark:text-white">
                Post Preview (Includes Full Specs &amp; Group Link):
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-semibold text-black dark:text-white hover:underline transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 bg-zinc-900 text-zinc-100 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto border border-zinc-800 select-all">
              {shareText}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleDirectWhatsAppShare}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-800 active:scale-95 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-['Poppins'] font-semibold text-[15px] transition-all duration-300 shadow-sm cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Send to Friend / Group</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-black dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 font-['Poppins'] font-semibold text-[15px] transition-all duration-300 border border-zinc-300 dark:border-zinc-700 cursor-pointer shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Post</span>
              </>
            )}
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-black dark:bg-zinc-800 dark:text-white text-xs transition-all duration-300 border border-zinc-300 dark:border-zinc-700 cursor-pointer"
              title="More share options"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
