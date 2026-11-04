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
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 shadow-2xl flex flex-col border-l border-zinc-200 dark:border-zinc-800 transition-colors">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-black dark:text-white fill-black dark:fill-white" />
              <h2 className="text-lg font-['Urbanist'] font-bold text-black dark:text-white">
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
                className="p-1.5 rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
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
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-base font-['Urbanist'] font-bold text-black dark:text-white">Your saved list is empty</h3>
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
                    className="p-3.5 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex gap-3 relative group transition-colors shadow-2xs"
                  >
                    <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex items-center justify-center p-1 shrink-0">
                      <LaptopImage laptop={laptop} size="sm" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-bold mb-0.5">
                        <span>{laptop.stockId}</span>
                        <span className="font-sans">{laptop.branch} Hub</span>
                      </div>

                      <h4 className="text-xs font-['Urbanist'] font-bold text-black dark:text-white truncate mb-1">
                        {laptop.fullName}
                      </h4>

                      <div className="text-[12px] font-mono font-bold text-black dark:text-white mb-2">
                        {priceFormatted}
                      </div>

                      <div className="flex items-center gap-1.5 font-['Poppins']">
                        <button
                          type="button"
                          onClick={() => {
                            onViewDetails(laptop);
                            onClose();
                          }}
                          className="px-3 py-1 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-[11px] font-semibold text-black dark:text-white transition-all duration-300"
                        >
                          Specs
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenWhatsApp(laptop)}
                          className="px-3 py-1 rounded-xl bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black text-[11px] font-semibold transition-all duration-300 flex items-center gap-1 shadow-xs"
                        >
                          <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
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
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
              <a
                href={`https://wa.me/918055035502?text=${encodeURIComponent(
                  `Hello PunarTech, I have shortlisted ${wishlistedLaptops.length} laptops from your inventory:\n${wishlistedLaptops
                    .map((l) => `- ${l.fullName} (${l.stockId})`)
                    .join('\n')}\nPlease share availability and bundle deal.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-['Poppins'] text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-300"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Enquire All Shortlisted Laptops</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
