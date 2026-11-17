import React from 'react';
import { WHATSAPP_CONFIG } from '../data/laptops';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface AnnouncementBarProps {
  onSelectHub?: (hub: 'Pune' | 'Delhi') => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onSelectHub }) => {
  const scrollToCatalog = (hub: 'Pune' | 'Delhi') => {
    onSelectHub?.(hub);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0B3B2B] dark:bg-[#07261C] text-white/90 text-[11px] sm:text-xs border-b border-[#14533D] dark:border-[#0E3A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 truncate">
          <span className="font-semibold text-white truncate">
            Premium Refurbished Laptops
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <button
            type="button"
            onClick={() =>
              document.getElementById('puncartrust-qa')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="hidden sm:inline text-white/85 hover:text-white transition-colors cursor-pointer"
          >
            Quality Tested
          </button>
          <span className="hidden md:inline text-white/30">|</span>
          <button
            type="button"
            onClick={() =>
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="hidden md:inline text-white/85 hover:text-white transition-colors cursor-pointer"
          >
            Transparent Specs
          </button>
          <span className="hidden lg:inline text-white/30">|</span>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-white/85">
            <button
              type="button"
              onClick={() => scrollToCatalog('Pune')}
              className="hover:text-[#6EE7B7] font-medium transition-colors cursor-pointer"
            >
              Pune
            </button>
            <span>&amp;</span>
            <button
              type="button"
              onClick={() => scrollToCatalog('Delhi')}
              className="hover:text-[#6EE7B7] font-medium transition-colors cursor-pointer"
            >
              Delhi Showrooms
            </button>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
              'Hello PunarTech, I am browsing https://punartech.vercel.app/ and would like assistance.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono font-semibold text-white hover:text-[#6EE7B7] transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#34D399]" />
            <span className="tabular-nums">{WHATSAPP_CONFIG.displayPhone}</span>
          </a>
          <span className="hidden sm:inline text-white/30">|</span>
          <button
            type="button"
            onClick={() =>
              document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="hidden sm:inline text-white/85 hover:text-white font-medium transition-colors cursor-pointer"
          >
            Help
          </button>
        </div>
      </div>
    </div>
  );
};
