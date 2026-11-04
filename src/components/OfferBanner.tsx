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
    <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" />
              <span>Transparent Curations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-white tracking-tight">
              Smart Choices. Better Laptop Deals.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              Compare configurations and find a laptop that fits your budget.
            </p>
          </div>

          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 self-start md:self-auto bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white shrink-0" />
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
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                    : 'bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black'
                          : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <h3 className={`font-bold leading-snug line-clamp-1 ${isActive ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>
                    {preset.label}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isActive ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {preset.subtext}
                  </p>
                </div>
                <div className={`mt-2.5 flex items-center text-[10px] font-semibold gap-1 ${isActive ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>
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
