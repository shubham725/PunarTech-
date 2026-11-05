import React from 'react';
import { Laptop } from '../data/laptops';
import { LaptopImage } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { X, Trash2, MapPin } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedLaptops: Laptop[];
  onRemoveFromCompare: (id: string) => void;
  onClearAll: () => void;
  onOpenWhatsApp: (laptop: Laptop) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedLaptops,
  onRemoveFromCompare,
  onClearAll,
  onOpenWhatsApp,
}) => {
  if (!isOpen || comparedLaptops.length === 0) return null;

  // Determine highlights among compared items
  const pricedItems = comparedLaptops.filter((l) => l.sellingPrice !== null);
  const minPrice =
    pricedItems.length > 1
      ? Math.min(...pricedItems.map((l) => l.sellingPrice as number))
      : null;

  const maxRam =
    comparedLaptops.length > 1
      ? Math.max(...comparedLaptops.map((l) => l.ramGb))
      : null;

  const maxSsd =
    comparedLaptops.length > 1
      ? Math.max(...comparedLaptops.map((l) => l.ssdGb || 0))
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-6xl bg-white dark:bg-[#152227] rounded-[24px] shadow-2xl border border-[#E3EBE7] dark:border-[#22353D] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#E3EBE7] dark:border-[#22353D] flex items-center justify-between bg-[#F8FBF9] dark:bg-[#0E1519]">
          <div className="flex items-center gap-2.5">
            <h2 id="compare-modal-title" className="text-base sm:text-lg font-['Urbanist'] font-bold text-zinc-950 dark:text-white">
              Laptop Specification Comparison
            </h2>
            <span className="text-xs font-['Poppins'] font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#C8DFD4] dark:border-[#10B981]/30">
              {comparedLaptops.length}/4 Selected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-['Poppins'] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 transition-all duration-300 cursor-pointer"
              aria-label="Close comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Comparison Table */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E3EBE7] dark:border-[#22353D]">
                <th className="p-3 text-[11px] font-['Poppins'] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 w-1/5 bg-[#F8FBF9] dark:bg-[#0E1519] rounded-tl-xl">
                  Specification
                </th>
                {comparedLaptops.map((l) => (
                  <th key={l.id} className="p-3 align-top">
                    <div className="space-y-2">
                      <div className="h-32 w-full rounded-[14px] overflow-hidden border border-[#E3EBE7] dark:border-[#22353D] bg-[#F8FBF9] dark:bg-[#0E1519] relative">
                        <LaptopImage laptop={l} size="sm" />
                        <button
                          type="button"
                          onClick={() => onRemoveFromCompare(l.id)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/95 dark:bg-[#152227]/95 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 shadow-xs border border-[#E3EBE7] dark:border-[#22353D] cursor-pointer"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[10px] font-mono text-[#007A8D] dark:text-[#06B6D4] font-bold">
                        {l.stockId} • {l.branch} Hub
                      </div>
                      <div className="text-xs font-['Urbanist'] font-bold text-zinc-950 dark:text-white line-clamp-2">
                        {l.fullName}
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenWhatsApp(l)}
                        className="w-full py-1.5 px-2 bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white rounded-xl font-['Poppins'] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 shadow-sm active:scale-95"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EBE7] dark:divide-[#22353D] text-xs font-['Poppins']">
              {/* Verified Price */}
              <tr className="bg-[#F8FBF9]/60 dark:bg-[#0E1519]/60">
                <td className="p-3 font-semibold text-zinc-950 dark:text-white bg-[#F8FBF9] dark:bg-[#0E1519]">Verified Price</td>
                {comparedLaptops.map((l) => {
                  const isLowest = minPrice !== null && l.sellingPrice === minPrice;
                  return (
                    <td key={l.id} className="p-3">
                      <span className="text-sm font-black font-mono text-[#009B69] dark:text-[#10B981] block">
                        {l.hasPrice && l.sellingPrice !== null
                          ? `₹${l.sellingPrice.toLocaleString('en-IN')}`
                          : 'Contact for Price'}
                      </span>
                      {isLowest && (
                        <span className="text-[10px] font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-1.5 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30 inline-block mt-0.5">
                          ✓ Lowest Price
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Processor */}
              <tr>
                <td className="p-3 font-semibold text-zinc-950 dark:text-white bg-[#F8FBF9] dark:bg-[#0E1519]">Processor</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 font-medium text-zinc-900 dark:text-zinc-200">
                    {l.processor}
                    {l.generation && (
                      <span className="block text-[10px] text-[#007A8D] dark:text-[#06B6D4]">
                        Intel {l.generation}th Gen
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* RAM */}
              <tr>
                <td className="p-3 font-semibold text-zinc-950 dark:text-white bg-[#F8FBF9] dark:bg-[#0E1519]">Memory (RAM)</td>
                {comparedLaptops.map((l) => {
                  const isMax = maxRam !== null && l.ramGb === maxRam;
                  return (
                    <td key={l.id} className="p-3 font-mono">
                      <span className="font-bold text-[#009B69] dark:text-[#10B981]">{l.ram}</span>
                      {isMax && (
                        <span className="text-[10px] font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-1.5 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30 block w-fit mt-0.5">
                          ✓ Highest RAM
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Storage */}
              <tr>
                <td className="p-3 font-semibold text-zinc-950 dark:text-white bg-[#F8FBF9] dark:bg-[#0E1519]">Storage Drive</td>
                {comparedLaptops.map((l) => {
                  const isMax = maxSsd !== null && l.ssdGb === maxSsd && (l.ssdGb || 0) > 0;
                  return (
                    <td key={l.id} className="p-3 font-mono">
                      <span className="font-bold text-zinc-900 dark:text-zinc-200">{l.storageRaw}</span>
                      <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">{l.storageType}</span>
                      {isMax && (
                        <span className="text-[10px] font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-1.5 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30 block w-fit mt-0.5">
                          ✓ Highest SSD
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Display */}
              <tr>
                <td className="p-3 font-semibold text-zinc-950 dark:text-white bg-[#F8FBF9] dark:bg-[#0E1519]">Display Screen</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 text-zinc-900 dark:text-zinc-300">
                    {l.display !== 'Not listed' ? `${l.display} Display` : 'Standard Screen'}
                  </td>
                ))}
              </tr>

              {/* Graphics */}
              <tr>
                <td className="p-3 font-semibold text-zinc-950 dark:text-white bg-[#F8FBF9] dark:bg-[#0E1519]">Graphics (GPU)</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 text-zinc-900 dark:text-zinc-300">
                    {l.graphicsRaw}
                    {l.hasDedicatedGraphics && (
                      <span className="text-[10px] font-bold text-[#009B69] dark:text-[#10B981] block">
                        ✓ Dedicated GPU
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Quality Grade */}
              <tr>
                <td className="p-3 font-semibold text-zinc-950 dark:text-white bg-[#F8FBF9] dark:bg-[#0E1519]">Refurbished Grade</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3">
                    <span className="font-bold text-[#007A52] dark:text-[#34D399]">Grade A++</span>
                    <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">Motherboard Verified</span>
                  </td>
                ))}
              </tr>

              {/* Hub Availability */}
              <tr>
                <td className="p-3 font-semibold text-zinc-950 dark:text-white bg-[#F8FBF9] dark:bg-[#0E1519]">Hub Availability</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">
                    <span className="inline-flex items-center gap-1 text-[#007A8D] dark:text-[#06B6D4]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{l.branch} Hub Stock</span>
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E3EBE7] dark:border-[#22353D] bg-[#F8FBF9] dark:bg-[#0E1519] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-['Poppins'] text-zinc-500 dark:text-zinc-400">
            Need live photos or testing report? WhatsApp helpline: <strong className="text-[#009B69] dark:text-[#10B981] font-mono">+91 80550 35502</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white hover:bg-[#E8F7EE] text-zinc-800 dark:bg-[#152227] dark:text-zinc-200 dark:hover:bg-[#1A2C33] border border-[#E3EBE7] dark:border-[#22353D] font-['Poppins'] text-[13px] font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-xs"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
