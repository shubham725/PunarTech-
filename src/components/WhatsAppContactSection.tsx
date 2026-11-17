import React from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';

export const WhatsAppContactSection: React.FC = () => {
  return (
    <section
      id="whatsapp-support"
      className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-14 sm:py-16 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#121B22] rounded-xl p-6 sm:p-10 border border-[#E2E8F0] dark:border-[#1E2D38]">
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Heading and Context */}
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D9488] dark:text-[#14B8A6]">
                WhatsApp Support Desk
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] dark:text-[#F1F5F9] tracking-tight leading-tight">
                Speak Directly with a PunarTech Coordinator
              </h2>

              <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-xl leading-relaxed">
                Request unedited photos, battery cycle health reports, or live video inspections for any stock ID before reserving or visiting our Pune and Delhi showrooms.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#334155] dark:text-[#CBD5E1] pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                  <span>Live unit video inspection</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                  <span>Battery &amp; SSD health proof</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                  <span>Repair &amp; bulk order desk</span>
                </span>
              </div>
            </div>

            {/* Right Column: Direct Support & Community Cards */}
            <div className="col-span-12 lg:col-span-5 space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                  'Hello PunarTech, I am browsing your website https://punartech.vercel.app/ and want to enquire about your laptop inventory.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#F8FAFC] dark:bg-[#18242D] hover:border-[#059669] dark:hover:border-[#10B981] text-[#17212B] dark:text-[#F1F5F9] rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-center justify-between gap-4 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#059669] text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0D9488] dark:text-[#14B8A6] block">
                      Direct Coordinator Line
                    </span>
                    <span className="text-base font-bold font-mono text-[#17212B] dark:text-white tabular-nums">
                      {WHATSAPP_CONFIG.displayPhone}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#475569] dark:text-[#94A3B8] group-hover:text-[#059669] dark:group-hover:text-[#10B981] shrink-0 transition-colors" />
              </a>

              <a
                href={WHATSAPP_CONFIG.groupInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#F8FAFC] dark:bg-[#18242D] hover:border-[#059669] dark:hover:border-[#10B981] text-[#17212B] dark:text-[#F1F5F9] rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-center justify-between gap-4 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#263846] text-[#059669] dark:text-[#10B981] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] block">
                      Official Stock Group
                    </span>
                    <span className="text-sm font-bold text-[#17212B] dark:text-white">
                      Daily Arrival Alerts &amp; Price Drops
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#475569] dark:text-[#94A3B8] group-hover:text-[#059669] dark:group-hover:text-[#10B981] shrink-0 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
