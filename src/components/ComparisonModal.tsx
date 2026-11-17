import React from 'react';
import { Laptop, WHATSAPP_CONFIG } from '../data/laptops';
import { LaptopImage } from './LaptopImage';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { X, Trash2, MapPin, Check } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0B1116]/75 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-6xl bg-white dark:bg-[#121B22] rounded-xl shadow-2xl border border-[#E2E8F0] dark:border-[#263846] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#E2E8F0] dark:border-[#263846] flex items-center justify-between bg-[#F8FAFC] dark:bg-[#0B1116]">
          <div className="flex items-center gap-3">
            <h2
              id="compare-modal-title"
              className="text-base sm:text-lg font-bold text-[#17212B] dark:text-white"
            >
              Side-by-Side Laptop Comparison
            </h2>
            <span className="font-mono text-xs font-bold text-[#059669] dark:text-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/15 px-2.5 py-0.5 rounded-md border border-[#059669]/25 tabular-nums">
              {comparedLaptops.length}/4
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-rose-600 dark:hover:text-rose-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#18242D] transition-colors cursor-pointer"
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
              <tr className="border-b border-[#E2E8F0] dark:border-[#263846]">
                <th className="p-3 text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] w-1/5 bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Specification
                </th>
                {comparedLaptops.map((l) => (
                  <th key={l.id} className="p-3 align-top">
                    <div className="space-y-2.5">
                      <div className="rounded-lg overflow-hidden border border-[#E2E8F0] dark:border-[#263846] relative">
                        <LaptopImage laptop={l} size="sm" />
                        <button
                          type="button"
                          onClick={() => onRemoveFromCompare(l.id)}
                          className="absolute top-2 right-2 p-1 rounded-md bg-white/95 dark:bg-[#121B22]/95 text-[#64748B] hover:text-rose-600 border border-[#E2E8F0] dark:border-[#263846] cursor-pointer"
                          title="Remove item"
                          aria-label={`Remove ${l.fullName}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-[#0D9488] dark:text-[#14B8A6] font-semibold">
                        {l.stockId} · {l.branch}
                      </div>
                      <div className="text-xs font-bold text-[#17212B] dark:text-white line-clamp-2 min-h-[2rem]">
                        {l.fullName}
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenWhatsApp(l)}
                        className="w-full h-9 px-3 bg-[#059669] hover:bg-[#047857] text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#263846] text-xs">
              <tr>
                <td className="p-3 font-semibold text-[#17212B] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Verified Price
                </td>
                {comparedLaptops.map((l) => {
                  const isLowest = minPrice !== null && l.sellingPrice === minPrice;
                  return (
                    <td key={l.id} className="p-3">
                      <span className="text-sm font-bold font-mono text-[#17212B] dark:text-white block tabular-nums">
                        {l.hasPrice && l.sellingPrice !== null
                          ? `₹${l.sellingPrice.toLocaleString('en-IN')}`
                          : 'Contact for Price'}
                      </span>
                      {isLowest && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#059669] dark:text-[#10B981] mt-0.5">
                          <Check className="w-3 h-3" />
                          Lowest Price
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-[#17212B] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Processor
                </td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 font-medium text-[#334155] dark:text-[#CBD5E1]">
                    {l.processor}
                    {l.generation && (
                      <span className="block text-[11px] text-[#0D9488] dark:text-[#14B8A6]">
                        Intel {l.generation}th Gen
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-[#17212B] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Memory (RAM)
                </td>
                {comparedLaptops.map((l) => {
                  const isMax = maxRam !== null && l.ramGb === maxRam;
                  return (
                    <td key={l.id} className="p-3 font-mono">
                      <span className="font-bold text-[#17212B] dark:text-white">{l.ram}</span>
                      {isMax && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-[#059669] dark:text-[#10B981] block mt-0.5">
                          <Check className="w-3 h-3" />
                          Highest RAM
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-[#17212B] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Storage
                </td>
                {comparedLaptops.map((l) => {
                  const isMax = maxSsd !== null && l.ssdGb === maxSsd && (l.ssdGb || 0) > 0;
                  return (
                    <td key={l.id} className="p-3 font-mono">
                      <span className="font-bold text-[#17212B] dark:text-white">{l.storageRaw}</span>
                      <span className="block font-sans text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        {l.storageType}
                      </span>
                      {isMax && (
                        <span className="inline-flex items-center gap-1 font-sans text-[10px] font-semibold text-[#059669] dark:text-[#10B981] mt-0.5">
                          <Check className="w-3 h-3" />
                          Highest SSD
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-[#17212B] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Display
                </td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 text-[#334155] dark:text-[#CBD5E1]">
                    {l.display !== 'Not listed' ? `${l.display} Display` : 'Standard Screen'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-[#17212B] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Graphics
                </td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 text-[#334155] dark:text-[#CBD5E1]">
                    {l.graphicsRaw}
                    {l.hasDedicatedGraphics && (
                      <span className="text-[11px] font-semibold text-[#059669] dark:text-[#10B981] block">
                        Dedicated GPU
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-[#17212B] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Condition
                </td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3">
                    <span className="font-semibold text-[#059669] dark:text-[#10B981]">
                      {l.condition || 'Grade A+ Tested'}
                    </span>
                    <span className="block text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      Motherboard &amp; Battery Verified
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-[#17212B] dark:text-white bg-[#F8FAFC] dark:bg-[#0B1116]">
                  Showroom Hub
                </td>
                {comparedLaptops.map((l) => (
                  <td key={l.id} className="p-3 font-semibold text-[#17212B] dark:text-[#E2E8F0]">
                    <span className="inline-flex items-center gap-1 text-[#0D9488] dark:text-[#14B8A6]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{l.branch} Hub</span>
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#0B1116] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
            Coordinator Helpline: <strong className="text-[#17212B] dark:text-white font-mono">{WHATSAPP_CONFIG.displayPhone}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 bg-white hover:bg-[#F1F5F9] text-[#17212B] dark:bg-[#18242D] dark:text-white dark:hover:bg-[#1E2D38] border border-[#CBD5E1] dark:border-[#2C3F4E] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
