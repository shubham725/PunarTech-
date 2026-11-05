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
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !laptop) return null;

  const liveWebsiteUrl = `https://punartech.vercel.app/?laptop=${encodeURIComponent(laptop.stockId)}`;
  const shareText = getLaptopShareText(laptop);
  const whatsappShareUrl = getShareWhatsAppUrl(laptop);
  const laptopImg = getModelSpecificLaptopImage(laptop);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    onNotify?.('Laptop details & live link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyLinkOnly = () => {
    navigator.clipboard.writeText(liveWebsiteUrl);
    setCopiedLink(true);
    onNotify?.('Live website product link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
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
          url: liveWebsiteUrl,
        });
      } catch (err) {
        // User cancelled or unsupported
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-black/80 backdrop-blur-xs font-['Poppins']">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#152227] rounded-t-[24px] sm:rounded-[24px] shadow-2xl border border-[#E3EBE7] dark:border-[#22353D] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E3EBE7] dark:border-[#22353D] flex items-center justify-between bg-[#F8FBF9] dark:bg-[#0E1519]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] border border-[#C8DFD4] dark:border-[#10B981]/30 flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 id="share-modal-title" className="text-base font-['Urbanist'] font-bold text-zinc-950 dark:text-white">
                Share Laptop Deal
              </h3>
              <p className="text-[11px] font-['Poppins'] text-zinc-500 dark:text-zinc-400">
                Live URL on punartech.vercel.app
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-[#E8F7EE] dark:hover:bg-[#10191E] transition-all duration-300 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[70vh] space-y-4 font-['Poppins']">
          {/* Item summary banner */}
          <div className="p-3 bg-[#F8FBF9] dark:bg-[#0E1519] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex items-center gap-3">
            <div className="w-16 h-14 rounded-xl bg-white dark:bg-[#152227] overflow-hidden border border-[#E3EBE7] dark:border-[#22353D] shrink-0 flex items-center justify-center p-1">
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
              <span className="text-[10px] font-mono text-[#007A8D] dark:text-[#06B6D4] font-bold block">
                {laptop.stockId} · {laptop.branch} Hub
              </span>
              <h4 className="text-xs font-['Urbanist'] font-bold text-zinc-950 dark:text-white truncate">
                {laptop.fullName}
              </h4>
              <span className="text-xs font-mono font-extrabold text-[#009B69] dark:text-[#10B981]">
                {laptop.hasPrice && laptop.sellingPrice !== null
                  ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                  : 'Contact for Price'}
              </span>
            </div>
          </div>

          {/* Live Link Direct Copy Box */}
          <div className="p-3 bg-[#E8F7EE]/60 dark:bg-[#10191E] rounded-xl border border-[#C8DFD4] dark:border-[#22353D] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#007A52] dark:text-[#34D399]">
                Live Product URL
              </span>
              <button
                type="button"
                onClick={handleCopyLinkOnly}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#009B69] dark:text-[#10B981] hover:underline cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2 bg-white dark:bg-[#152227] rounded-lg border border-[#E3EBE7] dark:border-[#22353D] font-mono text-[11px] text-[#007A8D] dark:text-[#38BDF8] truncate select-all">
              {liveWebsiteUrl}
            </div>
          </div>

          {/* Formatted Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                WhatsApp Post Preview (Specs &amp; Live Link):
              </span>
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
                    <span>Copy Full Post</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 bg-[#090E11] text-zinc-100 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto border border-[#22353D] select-all">
              {shareText}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-[#E3EBE7] dark:border-[#22353D] bg-[#F8FBF9] dark:bg-[#0E1519] flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleDirectWhatsAppShare}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] active:scale-95 text-white font-['Poppins'] font-semibold text-[15px] transition-all duration-300 shadow-sm cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Send to WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>

          <button
            type="button"
            onClick={handleCopyLinkOnly}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white hover:bg-[#F0F9F5] active:scale-95 text-zinc-900 dark:bg-[#152227] dark:text-white dark:hover:bg-[#1A2C33] font-['Poppins'] font-semibold text-[15px] transition-all duration-300 border border-[#E3EBE7] dark:border-[#22353D] cursor-pointer shadow-xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-[#009B69] dark:text-[#10B981]" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-500" />
                <span>Copy Live Link</span>
              </>
            )}
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white hover:bg-[#F0F9F5] active:scale-95 text-zinc-900 dark:bg-[#152227] dark:text-white text-xs transition-all duration-300 border border-[#E3EBE7] dark:border-[#22353D] cursor-pointer"
              title="More share options"
            >
              <Share2 className="w-4 h-4 text-[#007A8D] dark:text-[#06B6D4]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
