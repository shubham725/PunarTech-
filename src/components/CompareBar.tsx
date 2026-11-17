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
    <div className="fixed bottom-20 md:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-5.5rem)] max-w-2xl bg-[#17212B] dark:bg-[#121B22] text-white rounded-xl p-2.5 sm:p-3 shadow-lg border border-[#2C3F4E] flex items-center justify-between gap-3">
      {/* Selected thumb list */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E2E8F0] shrink-0">
          <Scale className="w-4 h-4 text-[#10B981]" />
          <span className="hidden sm:inline">Compare</span>
          <span className="font-mono text-white bg-[#059669] px-2 py-0.5 rounded-md text-[11px] font-bold tabular-nums">
            {comparedLaptops.length}/4
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {comparedLaptops.map((l) => (
            <div
              key={l.id}
              className="flex items-center gap-1.5 bg-[#1E2B37] text-[#E2E8F0] px-2.5 py-1 rounded-lg text-xs border border-[#2C3F4E] shrink-0"
            >
              <span className="font-bold text-[#10B981] font-mono text-[10px]">
                {l.stockId}
              </span>
              <span className="truncate max-w-[75px] sm:max-w-[110px] text-[11px] font-medium">
                {l.model}
              </span>
              <button
                type="button"
                onClick={() => onRemoveFromCompare(l.id)}
                className="text-[#94A3B8] hover:text-white p-0.5 cursor-pointer"
                title="Remove"
                aria-label={`Remove ${l.model} from compare`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-[#94A3B8] hover:text-white transition-colors hidden sm:block cursor-pointer font-medium"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onOpenCompareModal}
          className="h-9 inline-flex items-center gap-1.5 px-3.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>Compare</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
