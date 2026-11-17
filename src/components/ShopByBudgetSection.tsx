import React from 'react';
import { ArrowRight, Tag, TrendingUp } from 'lucide-react';
import { LAPTOP_INVENTORY } from '../data/laptops';

interface ShopByBudgetSectionProps {
  onSelectBudget: (preset: string) => void;
  activePreset: string | null;
}

export const ShopByBudgetSection: React.FC<ShopByBudgetSectionProps> = ({
  onSelectBudget,
  activePreset,
}) => {
  // Compute real counts for each budget band
  const counts = {
    under15: LAPTOP_INVENTORY.filter(
      (l) => l.sellingPrice !== null && l.sellingPrice <= 15000
    ).length,
    k15to20: LAPTOP_INVENTORY.filter(
      (l) => l.sellingPrice !== null && l.sellingPrice > 15000 && l.sellingPrice <= 20000
    ).length,
    k20to25: LAPTOP_INVENTORY.filter(
      (l) => l.sellingPrice !== null && l.sellingPrice > 20000 && l.sellingPrice <= 25000
    ).length,
    above25: LAPTOP_INVENTORY.filter(
      (l) => l.sellingPrice !== null && l.sellingPrice > 25000
    ).length,
  };

  const budgetBands = [
    {
      id: 'k12to15',
      preset: 'k12to15',
      badge: 'Student & Entry',
      prefix: 'Under',
      amount: '₹ 15,000',
      count: counts.under15,
      description: 'Ideal for online classes, MS Office & web browsing',
      sampleModel: 'Dell Latitude / HP ProBook',
    },
    {
      id: 'k15to20',
      preset: 'k15to20',
      badge: 'Most Popular',
      prefix: 'Under',
      amount: '₹ 20,000',
      count: counts.k15to20,
      description: 'Fast SSD, 8GB RAM, Core i5 for smooth business multitasking',
      sampleModel: 'ThinkPad T480 / Latitude 7490',
      highlight: true,
    },
    {
      id: 'k20to25',
      preset: 'k20to25',
      badge: 'Developer Choice',
      prefix: 'Under',
      amount: '₹ 25,000',
      count: counts.k20to25,
      description: '16GB RAM, Full HD screen, 8th Gen i5 / i7 power',
      sampleModel: 'ThinkPad X1 / EliteBook 840 G6',
    },
    {
      id: 'above30k',
      preset: 'above30k',
      badge: 'Power & GPU',
      prefix: 'Above',
      amount: '₹ 25,000+',
      count: counts.above25,
      description: 'Dedicated GPU, 512GB NVMe, Core i7 / Ryzen workstations',
      sampleModel: 'Dell Precision / Lenovo ThinkBook',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 font-['Poppins']">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0d77b6] dark:text-[#38bdf8] bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900 mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Shop By Budget</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Urbanist'] text-zinc-950 dark:text-white tracking-tight">
            Find the Perfect Refurbished Laptop for Your Budget
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl font-['Poppins']">
            Certified Grade-A business models with 6-month warranty, sorted by price point for fast discovery.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <TrendingUp className="w-4 h-4 text-[#009b69] dark:text-[#10b981]" />
          <span>Transparent Pricing • Direct WhatsApp Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {budgetBands.map((band) => {
          const isActive = activePreset === band.preset;
          return (
            <div
              key={band.id}
              onClick={() => onSelectBudget(band.preset)}
              className={`group relative rounded-[20px] p-5 cursor-pointer transition-all duration-300 border flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 ${
                isActive
                  ? 'bg-blue-50/60 dark:bg-[#131f2b] border-[#0d77b6] dark:border-[#38bdf8] ring-2 ring-[#0d77b6]/30'
                  : 'bg-white dark:bg-[#131f2b] border-zinc-200 dark:border-[#1f3345] hover:border-[#0d77b6] dark:hover:border-[#38bdf8]'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase font-['Urbanist'] ${
                      band.highlight
                        ? 'bg-[#0d77b6] text-white'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    {band.badge}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#0d77b6] dark:text-[#38bdf8] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                    {band.count} Units
                  </span>
                </div>

                {/* Price Display */}
                <div>
                  <span className="text-xs font-semibold text-zinc-400 block font-['Urbanist']">
                    {band.prefix}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-['Urbanist'] text-zinc-950 dark:text-white tracking-tight">
                    {band.amount}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-600 dark:text-zinc-300 font-['Poppins'] line-clamp-2 leading-relaxed">
                  {band.description}
                </p>

                {/* Sample Models */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Models: </span>
                  <span>{band.sampleModel}</span>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs font-bold text-[#0d77b6] dark:text-[#38bdf8]">
                <span>Explore Models</span>
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
