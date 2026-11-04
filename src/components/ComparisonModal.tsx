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
        className="relative w-full max-w-6xl bg-white dark:bg-zinc-900 rounded-[24px] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <h2 id="compare-modal-title" className="text-base sm:text-lg font-['Urbanist'] font-bold text-black dark:text-white">
              Laptop Specification Comparison
            </h2>
            <span className="text-xs font-['Poppins'] font-bold text-black dark:text-white bg-zinc-200 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700">
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
              className="p-1.5 rounded-xl text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
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
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-3 text-[11px] font-['Poppins'] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 w-1/5 bg-zinc-50 dark:bg-zinc-950 rounded-tl-xl">
                  Specification
                </th>
                {comparedLaptops.map((l) => (
                  <th key={l.id} className="p-3 align-top">
                    <div className="space-y-2">
                      <div className="h-32 w-full rounded-[14px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 relative">
                        <LaptopImage laptop={l} size="sm" />
                        <button
                          type="button"
                          onClick={() => onRemoveFromCompare(l.id)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/95 dark:bg-zinc-900/95 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 shadow-xs border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                        {l.stockId} • {l.branch} Hub
                      </div>
                      <div className="text-xs font-['Urbanist'] font-bold text-black dark:text-white line-clamp-2">
                        {l.fullName}
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenWhatsApp(l)}
                        className="w-full py-1.5 px-2 bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black rounded-xl font-['Poppins'] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all duration-300 shadow-sm"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs font-['Poppins']">
              {/* Verified Price */}
              <tr className="bg-zinc-50/50 dark:bg-zinc-900/50">
                <td className="p-3 font-semibold text-black dark:text-white bg-zinc-50 dark:bg-zinc-950">Verified Price</td>
                {comparedLaptops.map((l) => {
                  const isLowest = minPrice !== null && l.sellingPrice === minPrice;
                  return (
                    <td key={l.id} className="p-3">
                      <span className="text-sm font-black font-mono text-black dark:text-white block">
                        {l.hasPrice && l.sellingPrice !== null
                          ? `₹${l.sellingPrice.toLocaleString('en-IN')}`
                          : 'Contact for Price'}
                      </span>
                      {isLowest && (
                        <span className="text-[10px] font-bold text-black dark:text-white bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-[6px] border border-zinc-300 dark:border-zinc-700 inline-block mt-0.5">
                          ✓ Lowest Price
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Processor */}
              <tr>
                <td className="p-3 font-semibold text-black dark:text-white bg-zinc-50 dark:bg-zinc-950">Processor</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 font-medium text-zinc-900 dark:text-zinc-200">
                    {l.processor}
                    {l.generation && (
                      <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                        Intel {l.generation}th Gen
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* RAM */}
              <tr>
                <td className="p-3 font-semibold text-black dark:text-white bg-zinc-50 dark:bg-zinc-950">Memory (RAM)</td>
                {comparedLaptops.map((l) => {
                  const isMax = maxRam !== null && l.ramGb === maxRam;
                  return (
                    <td key={l.id} className="p-3 font-mono">
                      <span className="font-bold text-black dark:text-zinc-200">{l.ram}</span>
                      {isMax && (
                        <span className="text-[10px] font-bold text-black dark:text-white bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-[6px] border border-zinc-300 dark:border-zinc-700 block w-fit mt-0.5">
                          ✓ Highest RAM
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Storage */}
              <tr>
                <td className="p-3 font-semibold text-black dark:text-white bg-zinc-50 dark:bg-zinc-950">Storage Drive</td>
                {comparedLaptops.map((l) => {
                  const isMax = maxSsd !== null && l.ssdGb === maxSsd && (l.ssdGb || 0) > 0;
                  return (
                    <td key={l.id} className="p-3 font-mono">
                      <span className="font-bold text-black dark:text-zinc-200">{l.storageRaw}</span>
                      <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">{l.storageType}</span>
                      {isMax && (
                        <span className="text-[10px] font-bold text-black dark:text-white bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-[6px] border border-zinc-300 dark:border-zinc-700 block w-fit mt-0.5">
                          ✓ Highest SSD
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Display */}
              <tr>
                <td className="p-3 font-semibold text-black dark:text-white bg-zinc-50 dark:bg-zinc-950">Display Screen</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 text-zinc-900 dark:text-zinc-300">
                    {l.display !== 'Not listed' ? `${l.display} Display` : 'Standard Screen'}
                  </td>
                ))}
              </tr>

              {/* Graphics */}
              <tr>
                <td className="p-3 font-semibold text-black dark:text-white bg-zinc-50 dark:bg-zinc-950">Graphics (GPU)</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 text-zinc-900 dark:text-zinc-300">
                    {l.graphicsRaw}
                    {l.hasDedicatedGraphics && (
                      <span className="text-[10px] font-bold text-black dark:text-white block">
                        ✓ Dedicated GPU
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Quality Grade */}
              <tr>
                <td className="p-3 font-semibold text-black dark:text-white bg-zinc-50 dark:bg-zinc-950">Refurbished Grade</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3">
                    <span className="font-bold text-black dark:text-white">Grade A++</span>
                    <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">Motherboard Verified</span>
                  </td>
                ))}
              </tr>

              {/* Hub Availability */}
              <tr>
                <td className="p-3 font-semibold text-black dark:text-white bg-zinc-50 dark:bg-zinc-950">Hub Availability</td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 font-semibold text-black dark:text-zinc-200">
                    <span className="inline-flex items-center gap-1 text-black dark:text-white">
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
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-['Poppins'] text-zinc-500 dark:text-zinc-400">
            Need live photos or testing report? WhatsApp helpline: <strong className="text-black dark:text-white">+91 80550 35502</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 font-['Poppins'] text-[13px] font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-xs"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
