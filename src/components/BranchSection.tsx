import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface BranchSectionProps {
  onSelectBranch: (branch: 'Pune' | 'Delhi') => void;
  puneCount: number;
  delhiCount: number;
}

export const BranchSection: React.FC<BranchSectionProps> = ({
  onSelectBranch,
  puneCount,
  delhiCount,
}) => {
  return (
    <section className="py-12 bg-[#F8FBF9] dark:bg-[#090E11] border-t border-b border-[#E3EBE7] dark:border-[#22353D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007A8D] dark:text-[#06B6D4] block mb-1">
            Regional Stock Hubs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Pune &amp; Delhi Branch Locations
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Browse localized inventory from our two branch hubs. Contact us on WhatsApp to confirm physical viewing hours, availability, and battery health before traveling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pune Branch Card */}
          <div className="bg-white dark:bg-[#152227] rounded-2xl p-6 border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] dark:hover:border-[#10B981] shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center font-bold text-sm border border-[#BCE7CB] dark:border-[#10B981]/30">
                    P
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Pune Inventory Hub</h3>
                    <span className="text-xs text-[#007A8D] dark:text-[#06B6D4] font-mono">Stock prefix: PT/P001–PT/P060</span>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-[#009B69] dark:text-[#10B981] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2.5 py-1 rounded-md border border-[#BCE7CB] dark:border-[#10B981]/30">
                  {puneCount} Laptops
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Wide selection of Core i3, i5, i7, AMD Ryzen and MacBooks</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Dual storage SSD + HDD options available</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>WhatsApp viewing and physical hand-over supported</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3EBE7] dark:border-[#22353D]">
              <button
                type="button"
                onClick={() => onSelectBranch('Pune')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
              >
                <span>Browse {puneCount} Pune Laptops</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delhi Branch Card */}
          <div className="bg-white dark:bg-[#152227] rounded-2xl p-6 border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#007A8D] dark:hover:border-[#06B6D4] shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E0F4F7] dark:bg-[#06B6D4]/15 text-[#007A8D] dark:text-[#06B6D4] flex items-center justify-center font-bold text-sm border border-[#BDEAF2] dark:border-[#06B6D4]/30">
                    D
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Delhi Inventory Hub</h3>
                    <span className="text-xs text-[#007A8D] dark:text-[#06B6D4] font-mono">Stock prefix: PT/D001–PT/D031</span>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-[#007A8D] dark:text-[#06B6D4] bg-[#E0F4F7] dark:bg-[#06B6D4]/15 px-2.5 py-1 rounded-md border border-[#BDEAF2] dark:border-[#06B6D4]/30">
                  {delhiCount} Laptops
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Value-driven Dell Latitude, Vostro &amp; Lenovo ThinkPads</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Budget configurations starting from ₹10,000</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Direct WhatsApp coordination with local Delhi coordinators</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3EBE7] dark:border-[#22353D]">
              <button
                type="button"
                onClick={() => onSelectBranch('Delhi')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
              >
                <span>Browse {delhiCount} Delhi Laptops</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
