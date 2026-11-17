import React from 'react';
import { ArrowRight, Check, MapPin, Wrench } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';

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
  const scrollToHubStock = (branch: 'Pune' | 'Delhi') => {
    onSelectBranch(branch);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="showrooms"
      className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-14 sm:py-16 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D9488] dark:text-[#14B8A6]">
              Physical Showrooms &amp; Service Desks
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] dark:text-[#F1F5F9] tracking-tight mt-1">
              Pune &amp; Delhi Showroom Locations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] max-w-md">
            Confirm physical viewing slots, battery diagnostics, or repair/upgrade service on WhatsApp prior to visiting.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Pune Showroom */}
          <div className="col-span-12 lg:col-span-6 bg-white dark:bg-[#121B22] rounded-xl p-6 sm:p-7 border border-[#E2E8F0] dark:border-[#1E2D38] flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] text-[#059669] dark:text-[#10B981] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17212B] dark:text-white">
                      Pune Inventory &amp; Service Hub
                    </h3>
                    <span className="text-xs font-mono text-[#0D9488] dark:text-[#14B8A6]">
                      Stock IDs: PT/P001 – PT/P060
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#059669] dark:text-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/15 px-2.5 py-1 rounded-md border border-[#059669]/25 shrink-0 tabular-nums">
                  {puneCount} Units
                </span>
              </div>

              <ul className="space-y-2 text-xs sm:text-[13px] text-[#475569] dark:text-[#CBD5E1] pt-3 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Full stock of Dell Latitude, HP EliteBook, ThinkPad, Ryzen &amp; MacBook units</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>On-site RAM/SSD upgrades, thermal servicing &amp; motherboard repair bench</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Walk-in inspection, local pickup &amp; West/South India insured courier</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
              <button
                type="button"
                onClick={() => scrollToHubStock('Pune')}
                className="flex-1 h-10 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Browse {puneCount} Pune Laptops</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                  'Hello PunarTech, I want to confirm Pune showroom timings and inspect available laptops.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-[#F1F5F9] border border-[#CBD5E1] dark:border-[#2C3F4E] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                <span>Coordinate Visit</span>
              </a>
            </div>
          </div>

          {/* Delhi Showroom */}
          <div className="col-span-12 lg:col-span-6 bg-white dark:bg-[#121B22] rounded-xl p-6 sm:p-7 border border-[#E2E8F0] dark:border-[#1E2D38] flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] text-[#0D9488] dark:text-[#14B8A6] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17212B] dark:text-white">
                      Delhi NCR Inventory &amp; Service Hub
                    </h3>
                    <span className="text-xs font-mono text-[#0D9488] dark:text-[#14B8A6]">
                      Stock IDs: PT/D001 – PT/D031
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#0D9488] dark:text-[#14B8A6] bg-[#0D9488]/10 px-2.5 py-1 rounded-md border border-[#0D9488]/25 shrink-0 tabular-nums">
                  {delhiCount} Units
                </span>
              </div>

              <ul className="space-y-2 text-xs sm:text-[13px] text-[#475569] dark:text-[#CBD5E1] pt-3 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Value-focused Dell Latitude, Vostro, HP EliteBook &amp; Lenovo ThinkPad stock</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Student &amp; commercial office configurations starting from ₹10,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Physical hardware verification &amp; North India NCR express coordination</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
              <button
                type="button"
                onClick={() => scrollToHubStock('Delhi')}
                className="flex-1 h-10 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Browse {delhiCount} Delhi Laptops</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                  'Hello PunarTech, I want to confirm Delhi showroom timings and inspect available laptops.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-[#F1F5F9] border border-[#CBD5E1] dark:border-[#2C3F4E] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                <span>Coordinate Visit</span>
              </a>
            </div>
          </div>

          {/* Dedicated Repair & Technical Support Strip */}
          <div className="col-span-12 p-5 sm:p-6 rounded-xl bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#1E2D38] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] text-[#059669] dark:text-[#10B981] flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#17212B] dark:text-white">
                  Need Laptop Repair, SSD/RAM Upgrade, or Technical Support?
                </h4>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
                  Both Pune and Delhi hubs provide screen replacement, battery swap, motherboard diagnostics, and SSD upgrades.
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                'Hello PunarTech, I would like to enquire about laptop repair / upgrade support.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-[#F1F5F9] border border-[#CBD5E1] dark:border-[#2C3F4E] text-xs font-semibold inline-flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
              <span>Book Service Check</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
