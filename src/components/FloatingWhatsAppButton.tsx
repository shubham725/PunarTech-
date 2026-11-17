import React, { useState } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';
import { X, ArrowUpRight } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  const directChatUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
    'Hello PunarTech, I am browsing your website https://punartech.vercel.app/ and want to enquire about available laptops in your inventory.'
  )}`;

  return (
    <div className="fixed bottom-20 md:bottom-5 right-4 md:right-5 z-40 flex flex-col items-end">
      {panelOpen && (
        <div className="mb-2.5 w-72 max-w-[calc(100vw-2.5rem)] bg-white dark:bg-[#121B22] rounded-xl shadow-lg border border-[#E2E8F0] dark:border-[#263846] p-4 text-xs text-[#17212B] dark:text-[#E2E8F0] relative">
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            className="absolute top-2.5 right-2.5 text-[#64748B] hover:text-[#17212B] dark:hover:text-white p-1 cursor-pointer"
            aria-label="Close WhatsApp menu"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#059669] text-white flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-[#17212B] dark:text-white block text-xs">
                PunarTech WhatsApp
              </span>
              <span className="text-[11px] text-[#475569] dark:text-[#94A3B8] font-mono tabular-nums">
                {WHATSAPP_CONFIG.displayPhone}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#475569] dark:text-[#94A3B8] leading-relaxed mb-3">
            Message our Pune and Delhi coordinators for live unit photos, battery reports, or showroom visits.
          </p>

          <div className="space-y-2">
            <a
              href={directChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 px-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={WHATSAPP_CONFIG.groupInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 px-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] dark:bg-[#18242D] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-white font-semibold text-xs inline-flex items-center justify-center gap-1.5 border border-[#CBD5E1] dark:border-[#2C3F4E] transition-colors"
            >
              <span>Join Stock Alerts Group</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0D9488]" />
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setPanelOpen((prev) => !prev)}
        aria-label="WhatsApp Support Menu"
        className="w-12 h-12 rounded-full bg-[#059669] hover:bg-[#047857] text-white flex items-center justify-center shadow-md border border-white/20 transition-colors cursor-pointer"
      >
        {panelOpen ? <X className="w-5 h-5" /> : <WhatsAppIcon className="w-6 h-6 text-white" />}
      </button>
    </div>
  );
};
