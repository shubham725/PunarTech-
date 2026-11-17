import React from 'react';
import { Home, Laptop, Scale, Heart, Headphones } from 'lucide-react';

interface MobileBottomNavProps {
  comparedCount: number;
  wishlistedCount: number;
  onOpenCompare: () => void;
  onOpenWishlist: () => void;
  onResetHome: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  comparedCount,
  wishlistedCount,
  onOpenCompare,
  onOpenWishlist,
  onResetHome,
}) => {
  return (
    <nav
      aria-label="Mobile quick navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0F171E]/95 backdrop-blur-md border-t border-[#E2E8F0] dark:border-[#1E2D38] shadow-[0_-4px_16px_rgba(15,23,42,0.06)]"
    >
      <div className="grid grid-cols-5 h-16 px-1">
        <button
          type="button"
          onClick={() => {
            onResetHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center gap-1 text-[#059669] dark:text-[#10B981] cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          type="button"
          onClick={() =>
            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="flex flex-col items-center justify-center gap-1 text-[#475569] dark:text-[#94A3B8] hover:text-[#059669] dark:hover:text-[#10B981] cursor-pointer transition-colors"
        >
          <Laptop className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Laptops</span>
        </button>

        <button
          type="button"
          onClick={onOpenCompare}
          className="relative flex flex-col items-center justify-center gap-1 text-[#475569] dark:text-[#94A3B8] hover:text-[#059669] dark:hover:text-[#10B981] cursor-pointer transition-colors"
        >
          <div className="relative">
            <Scale className="w-5 h-5" />
            {comparedCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#059669] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                {comparedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Compare</span>
        </button>

        <button
          type="button"
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center gap-1 text-[#475569] dark:text-[#94A3B8] hover:text-[#059669] dark:hover:text-[#10B981] cursor-pointer transition-colors"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistedCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#059669] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                {wishlistedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Wishlist</span>
        </button>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById('whatsapp-support')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className="flex flex-col items-center justify-center gap-1 text-[#475569] dark:text-[#94A3B8] hover:text-[#059669] dark:hover:text-[#10B981] cursor-pointer transition-colors"
        >
          <Headphones className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Support</span>
        </button>
      </div>
    </nav>
  );
};
