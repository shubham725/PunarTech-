import React, { useState } from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';
import { X, ExternalLink } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const directChatUrl = `https://wa.me/918055035502?text=${encodeURIComponent(
    'Hello PunarTech, I want to enquire about available laptops in your Pune / Delhi inventory.'
  )}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Tooltip Card */}
      {tooltipOpen && (
        <div className="mb-3 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-[20px] shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 text-xs font-['Poppins'] text-zinc-800 dark:text-zinc-200 animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
          <button
            onClick={() => setTooltipOpen(false)}
            className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-black dark:hover:text-white p-1 cursor-pointer"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-black dark:text-white">
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            </div>
            <div>
              <span className="font-['Urbanist'] font-bold text-black dark:text-white block text-xs">PunarTech WhatsApp</span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold font-mono">
                +91 80550 35502
              </span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
            Chat directly with our team for live photos, battery condition reports, and branch viewing.
          </p>
          <div className="space-y-2">
            <a
              href={directChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-['Poppins'] font-semibold text-xs transition-all duration-300 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chat with Us (80550 35502)</span>
            </a>

            <a
              href={WHATSAPP_CONFIG.groupInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#E8F7EE] hover:bg-[#D6F0DD] dark:bg-[#10B981]/15 dark:hover:bg-[#10B981]/25 text-[#007A8D] dark:text-[#10B981] font-['Poppins'] font-semibold text-xs transition-all duration-300 border border-[#BCE7CB] dark:border-[#10B981]/30"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#007A8D] dark:text-[#10B981]" />
              <span>Join WhatsApp Group</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!tooltipOpen && (
          <a
            href={directChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-3.5 py-1.5 bg-white/95 dark:bg-[#152227]/95 backdrop-blur-xs text-zinc-900 dark:text-white text-xs font-['Poppins'] font-semibold rounded-full shadow-lg border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] transition-all duration-300"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse mr-1.5" />
            Chat: 80550 35502
          </a>
        )}

        <a
          href={directChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp 80550 35502"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white flex items-center justify-center shadow-xl hover:shadow-[#009B69]/30 transition-all duration-300 transform hover:scale-110 active:scale-95 group focus:outline-hidden focus:ring-4 focus:ring-[#009B69]/30 relative cursor-pointer border-2 border-white dark:border-[#152227]"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          <span className="absolute top-1 right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#25D366] rounded-full border-2 border-white dark:border-[#152227] animate-pulse" />
        </a>
      </div>
    </div>
  );
};
