import React from 'react';
import { Laptop } from '../data/laptops';
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs font-['Poppins']">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#152227] shadow-2xl flex flex-col border-l border-[#E3EBE7] dark:border-[#22353D] transition-colors">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E3EBE7] dark:border-[#22353D] flex items-center justify-between bg-[#F8FBF9] dark:bg-[#0E1519]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg font-['Urbanist'] font-bold text-zinc-950 dark:text-white">
                Saved Laptops ({wishlistedLaptops.length})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {wishlistedLaptops.length > 0 && (
                <button
                  type="button"
                  onClick={onClearWishlist}
                  className="text-xs font-['Poppins'] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 cursor-pointer transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlistedLaptops.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 dark:text-zinc-400 space-y-3 font-['Poppins']">
                <div className="w-12 h-12 rounded-full bg-[#E8F7EE] dark:bg-[#10B981]/15 text-rose-500 flex items-center justify-center mx-auto border border-[#C8DFD4] dark:border-[#10B981]/30">
                  <Heart className="w-6 h-6 fill-rose-500" />
                </div>
                <h3 className="text-base font-['Urbanist'] font-bold text-zinc-950 dark:text-white">Your saved list is empty</h3>
                <p className="text-xs max-w-xs mx-auto">
                  Click the heart icon on any laptop to save models you want to compare or enquire about.
                </p>
              </div>
            ) : (
              wishlistedLaptops.map((laptop) => {
                const priceFormatted =
                  laptop.hasPrice && laptop.sellingPrice !== null
                    ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                    : 'Contact Price';

                return (
                  <div
                    key={laptop.id}
                    className="p-3.5 bg-[#F8FBF9] dark:bg-[#10191E] rounded-2xl border border-[#E3EBE7] dark:border-[#22353D] flex gap-3 relative group transition-colors shadow-2xs"
                  >
                    <div className="w-20 h-20 bg-white dark:bg-[#152227] rounded-xl border border-[#E3EBE7] dark:border-[#22353D] overflow-hidden flex items-center justify-center p-1 shrink-0">
                      <LaptopImage laptop={laptop} size="sm" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#007A52] dark:text-[#34D399] font-bold mb-0.5">
                        <span>{laptop.stockId}</span>
                        <span className="font-sans text-zinc-500 dark:text-zinc-400">{laptop.branch} Hub</span>
                      </div>

                      <h4 className="text-xs font-['Urbanist'] font-bold text-zinc-950 dark:text-white truncate mb-1">
                        {laptop.fullName}
                      </h4>

                      <div className="text-[12px] font-mono font-bold text-zinc-950 dark:text-white mb-2">
                        {priceFormatted}
                      </div>

                      <div className="flex items-center gap-1.5 font-['Poppins']">
                        <button
                          type="button"
                          onClick={() => {
                            onViewDetails(laptop);
                            onClose();
                          }}
                          className="px-3 py-1 rounded-xl bg-white hover:bg-[#E8F7EE] dark:bg-[#152227] dark:hover:bg-[#1B2B32] border border-[#E3EBE7] dark:border-[#22353D] text-[11px] font-semibold text-[#007A52] dark:text-[#34D399] transition-all duration-300"
                        >
                          Specs
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenWhatsApp(laptop)}
                          className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] text-[11px] font-semibold transition-all duration-300 flex items-center gap-1 shadow-xs"
                        >
                          <WhatsAppIcon className="w-3 h-3 text-white dark:text-[#04251B]" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(laptop.id)}
                      className="text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 cursor-pointer transition-colors"
                      title="Remove from saved"
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
            <div className="p-4 border-t border-[#E3EBE7] dark:border-[#22353D] bg-[#F8FBF9] dark:bg-[#0E1519]">
              <a
                href={`https://wa.me/918055035502?text=${encodeURIComponent(
                  `Hello PunarTech, I have shortlisted ${wishlistedLaptops.length} laptops from your inventory on https://punartech.vercel.app/:\n\n${wishlistedLaptops
                    .map((l) => `• ${l.fullName} (${l.stockId}) - ${l.sellingPrice ? `₹${l.sellingPrice.toLocaleString('en-IN')}` : 'Contact for Price'}\n  Link: https://punartech.vercel.app/?laptop=${l.stockId}`)
                    .join('\n\n')}\n\nPlease share physical availability, inspection report, and best package deal.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-['Poppins'] text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Enquire All Shortlisted Laptops</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
