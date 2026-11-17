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
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-[#0B1116]/75 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#121B22] rounded-t-xl sm:rounded-xl shadow-2xl border border-[#E2E8F0] dark:border-[#263846] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E2E8F0] dark:border-[#263846] flex items-center justify-between bg-[#F8FAFC] dark:bg-[#0B1116]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] dark:bg-[#18242D] text-[#059669] dark:text-[#10B981] border border-[#E2E8F0] dark:border-[#263846] flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 id="share-modal-title" className="text-base font-bold text-[#17212B] dark:text-white">
                Share Laptop Listing
              </h3>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                Direct URL on punartech.vercel.app
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#18242D] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[70vh] space-y-4">
          {/* Item summary banner */}
          <div className="p-3 bg-[#F8FAFC] dark:bg-[#18242D] rounded-xl border border-[#E2E8F0] dark:border-[#263846] flex items-center gap-3">
            <div className="w-16 h-12 rounded-lg bg-[#F1F5F9] dark:bg-[#121B22] overflow-hidden border border-[#E2E8F0] dark:border-[#263846] shrink-0 flex items-center justify-center p-1">
              <img
                src={laptopImg}
                alt={laptop.fullName}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-mono text-[#0D9488] dark:text-[#14B8A6] font-semibold block">
                {laptop.stockId} · {laptop.branch} Hub
              </span>
              <h4 className="text-xs font-bold text-[#17212B] dark:text-white truncate">
                {laptop.fullName}
              </h4>
              <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
                {laptop.hasPrice && laptop.sellingPrice !== null
                  ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                  : 'Contact for Price'}
              </span>
            </div>
          </div>

          {/* Live Link Direct Copy Box */}
          <div className="p-3 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669] dark:text-[#10B981]">
                Product Deep-Link
              </span>
              <button
                type="button"
                onClick={handleCopyLinkOnly}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669] dark:text-[#10B981] hover:underline cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2 bg-white dark:bg-[#121B22] rounded-md border border-[#E2E8F0] dark:border-[#263846] font-mono text-[11px] text-[#0D9488] dark:text-[#14B8A6] truncate select-all">
              {liveWebsiteUrl}
            </div>
          </div>

          {/* Formatted Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#17212B] dark:text-white">
                WhatsApp Message Preview
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#059669] dark:text-[#10B981] hover:underline cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 bg-[#17212B] text-[#E2E8F0] rounded-lg text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto border border-[#263846] select-all">
              {shareText}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#0B1116] flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleDirectWhatsAppShare}
            className="flex-1 h-10 inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Share via WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>

          <button
            type="button"
            onClick={handleCopyLinkOnly}
            className="h-10 inline-flex items-center justify-center gap-1.5 px-4 rounded-lg bg-white hover:bg-[#F1F5F9] text-[#17212B] dark:bg-[#18242D] dark:text-white dark:hover:bg-[#1E2D38] font-semibold text-xs border border-[#CBD5E1] dark:border-[#2C3F4E] cursor-pointer transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#64748B]" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-white hover:bg-[#F1F5F9] text-[#17212B] dark:bg-[#18242D] dark:text-white border border-[#CBD5E1] dark:border-[#2C3F4E] cursor-pointer transition-colors shrink-0"
              title="System share"
              aria-label="System share"
            >
              <Share2 className="w-4 h-4 text-[#0D9488] dark:text-[#14B8A6]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
