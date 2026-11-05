import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OfferBannerProps {
  onSelectPreset: (presetKey: string) => void;
  activePreset: string | null;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({
  onSelectPreset,
  activePreset,
}) => {
  const presets = [
    {
      id: 'best-value',
      label: 'Best Value Laptops',
      subtext: 'Core i5/i7 + SSD under ₹23k',
      badge: 'Popular',
    },
    {
      id: 'budget-picks',
      label: 'Budget Picks',
      subtext: 'SSD laptops under ₹15,000',
      badge: 'Economy',
    },
    {
      id: 'high-perf',
      label: '16GB RAM & Creators',
      subtext: 'Heavy multitasking & GPU',
      badge: 'Performance',
    },
    {
      id: 'dual-storage',
      label: 'Dual Storage (SSD + HDD)',
      subtext: 'Speed + bulk file storage',
      badge: 'Capacity',
    },
    {
      id: 'latest-gen',
      label: 'Higher Intel Gen (10th/11th)',
      subtext: 'Newer architecture in stock',
      badge: 'Modern',
    },
  ];

  return (
    <div className="bg-[#F8FBF9] dark:bg-[#090E11] border-b border-[#E3EBE7] dark:border-[#22353D] py-6 font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-[#007A8D] dark:text-[#06B6D4] text-xs font-bold uppercase tracking-wider mb-1 font-['Urbanist']">
              <Sparkles className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
              <span>Transparent Curations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight font-['Urbanist']">
              Smart Choices. Better Laptop Deals.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              Compare configurations and find a laptop that fits your budget.
            </p>
          </div>

          <div className="text-[11px] text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 self-start md:self-auto bg-white dark:bg-[#152227] px-2.5 py-1.5 rounded-lg border border-[#E3EBE7] dark:border-[#22353D]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
            <span>Honest branch pricing · Zero fabricated MRPs</span>
          </div>
        </div>

        {/* Dynamic Preset Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {presets.map((preset) => {
            const isActive = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.id)}
                className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] border-transparent shadow-xs font-bold'
                    : 'bg-white dark:bg-[#152227] hover:bg-[#F0F9F5] dark:hover:bg-[#1A2C33] border-[#E3EBE7] dark:border-[#22353D] text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/20 text-white dark:text-[#04251B]'
                          : 'bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] border border-[#C8DFD4] dark:border-[#10B981]/30'
                      }`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <h3 className={`font-bold leading-snug line-clamp-1 font-['Urbanist'] ${isActive ? 'text-white dark:text-[#04251B]' : 'text-zinc-950 dark:text-white'}`}>
                    {preset.label}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isActive ? 'text-white/80 dark:text-[#04251B]/80' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {preset.subtext}
                  </p>
                </div>
                <div className={`mt-2.5 flex items-center text-[10px] font-semibold gap-1 ${isActive ? 'text-white dark:text-[#04251B]' : 'text-[#007A8D] dark:text-[#06B6D4]'}`}>
                  <span>{isActive ? 'Filtered' : 'Filter now'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
