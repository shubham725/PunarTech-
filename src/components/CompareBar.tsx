import React from 'react';
import { Laptop } from '../data/laptops';
import { Scale, X, ArrowRight } from 'lucide-react';

interface CompareBarProps {
  comparedLaptops: Laptop[];
  onOpenCompareModal: () => void;
  onRemoveFromCompare: (id: string) => void;
  onClearAll: () => void;
}

export const CompareBar: React.FC<CompareBarProps> = ({
  comparedLaptops,
  onOpenCompareModal,
  onRemoveFromCompare,
  onClearAll,
}) => {
  if (comparedLaptops.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-[#090E11] text-white rounded-[18px] p-3 shadow-2xl border border-[#22353D] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-6 duration-300 font-['Poppins']">
      {/* Selected thumb list */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 shrink-0">
          <Scale className="w-4 h-4 text-[#10B981]" />
          <span className="hidden sm:inline">Compare</span>
          <span className="font-mono text-white bg-gradient-to-r from-[#009B69] to-[#007A8D] px-2 py-0.5 rounded-[8px] font-bold">
            {comparedLaptops.length}/4
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {comparedLaptops.map((l) => (
            <div
              key={l.id}
              className="flex items-center gap-1.5 bg-[#152227] text-zinc-200 px-2.5 py-1 rounded-[10px] text-xs border border-[#22353D] shrink-0"
            >
              <span className="font-bold text-[#10B981] font-mono text-[10px]">
                {l.stockId}
              </span>
              <span className="truncate max-w-[80px] sm:max-w-[110px] text-[11px] font-medium">{l.model}</span>
              <button
                type="button"
                onClick={() => onRemoveFromCompare(l.id)}
                className="text-zinc-400 hover:text-white p-0.5 cursor-pointer"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-zinc-400 hover:text-rose-400 transition-colors hidden sm:block cursor-pointer font-medium"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onOpenCompareModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-['Poppins'] text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
        >
          <span>Compare Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
