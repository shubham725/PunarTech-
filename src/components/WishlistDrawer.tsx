import React from 'react';
import { Laptop, WHATSAPP_CONFIG } from '../data/laptops';
import { LaptopImage } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { X, Trash2, Heart } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedLaptops: Laptop[];
  onRemoveFromWishlist: (id: string) => void;
  onClearWishlist: () => void;
  onViewDetails: (laptop: Laptop) => void;
  onOpenWhatsApp: (laptop: Laptop) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedLaptops,
  onRemoveFromWishlist,
  onClearWishlist,
  onViewDetails,
  onOpenWhatsApp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0B1116]/75 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-white dark:bg-[#121B22] shadow-2xl flex flex-col border-l border-[#E2E8F0] dark:border-[#263846]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E2E8F0] dark:border-[#263846] flex items-center justify-between bg-[#F8FAFC] dark:bg-[#0B1116]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
              <h2 className="text-base font-bold text-[#17212B] dark:text-white">
                Saved Laptops ({wishlistedLaptops.length})
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {wishlistedLaptops.length > 0 && (
                <button
                  type="button"
                  onClick={onClearWishlist}
                  className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-rose-600 dark:hover:text-rose-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#18242D] cursor-pointer transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlistedLaptops.length === 0 ? (
              <div className="text-center py-14 text-[#475569] dark:text-[#94A3B8] space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] dark:bg-[#18242D] text-[#059669] dark:text-[#10B981] flex items-center justify-center mx-auto border border-[#E2E8F0] dark:border-[#263846]">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] dark:text-white">
                  No saved laptops yet
                </h3>
                <p className="text-xs max-w-xs mx-auto leading-relaxed">
                  Use the heart icon on any laptop card to save models here for side-by-side comparison or WhatsApp enquiry.
                </p>
              </div>
            ) : (
              wishlistedLaptops.map((laptop) => {
                const priceFormatted =
                  laptop.hasPrice && laptop.sellingPrice !== null
                    ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                    : 'Contact for Price';

                return (
                  <div
                    key={laptop.id}
                    className="p-3 bg-[#F8FAFC] dark:bg-[#18242D] rounded-xl border border-[#E2E8F0] dark:border-[#263846] flex gap-3 items-start"
                  >
                    <div className="w-24 rounded-lg overflow-hidden border border-[#E2E8F0] dark:border-[#263846] shrink-0">
                      <LaptopImage laptop={laptop} size="sm" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#0D9488] dark:text-[#14B8A6] font-semibold mb-0.5">
                        <span>{laptop.stockId}</span>
                        <span className="font-sans text-[#64748B] dark:text-[#94A3B8]">{laptop.branch} Hub</span>
                      </div>

                      <h4 className="text-xs font-bold text-[#17212B] dark:text-white truncate mb-1">
                        {laptop.fullName}
                      </h4>

                      <div className="text-sm font-mono font-bold text-[#17212B] dark:text-white mb-2 tabular-nums">
                        {priceFormatted}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            onViewDetails(laptop);
                            onClose();
                          }}
                          className="h-8 px-3 rounded-lg bg-white hover:bg-[#F1F5F9] dark:bg-[#121B22] dark:hover:bg-[#1E2D38] border border-[#CBD5E1] dark:border-[#2C3F4E] text-[11px] font-semibold text-[#17212B] dark:text-white transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenWhatsApp(laptop)}
                          className="h-8 px-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-[11px] font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <WhatsAppIcon className="w-3 h-3 text-white" />
                          <span>Enquire</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(laptop.id)}
                      className="text-[#64748B] hover:text-rose-600 dark:hover:text-rose-400 p-1 cursor-pointer transition-colors"
                      title="Remove from saved"
                      aria-label={`Remove ${laptop.fullName}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {wishlistedLaptops.length > 0 && (
            <div className="p-4 border-t border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#0B1116]">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                  `Hello PunarTech, I have shortlisted ${wishlistedLaptops.length} laptops from your inventory on https://punartech.vercel.app/:\n\n${wishlistedLaptops
                    .map(
                      (l) =>
                        `• ${l.fullName} (${l.stockId}) - ${
                          l.sellingPrice ? `₹${l.sellingPrice.toLocaleString('en-IN')}` : 'Contact for Price'
                        }\n  Link: https://punartech.vercel.app/?laptop=${l.stockId}`
                    )
                    .join('\n\n')}\n\nPlease share physical availability, inspection report, and best package deal.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Enquire All Saved Laptops</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
