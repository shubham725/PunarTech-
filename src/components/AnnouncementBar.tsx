import React, { useState, useEffect } from 'react';
import { PhoneCall, MapPin, Sparkles, ChevronRight, X } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/laptops';

interface AnnouncementBarProps {
  onSelectHub?: (hub: 'Pune' | 'Delhi') => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onSelectHub }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const announcements = [
    {
      text: 'Premium Refurbished Laptops | Quality Tested | Affordable Prices',
      badge: 'PunarTech',
      linkText: 'Explore Stock',
      action: () => {
        const el = document.getElementById('catalog');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      text: 'Pune Hub (60 Units) & Delhi Hub (31 Units) Ready for Direct Handshake',
      badge: 'Live Stock',
      linkText: 'View Hubs',
      action: () => {
        onSelectHub?.('Pune');
        const el = document.getElementById('catalog');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      text: 'Laptop Rentals starting from ₹999/mo | Easy 3 to 12-Month EMI Available | Pune & Delhi',
      badge: 'Rent & EMI',
      linkText: 'Learn More',
      action: () => {
        const el = document.getElementById('rental-emi');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      text: 'Chat with our coordinator for live photos & battery diagnostic report: +91 80550 35502',
      badge: 'WhatsApp',
      linkText: 'Chat Now',
      action: () => {
        window.open('https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20am%20browsing%20https://punartech.vercel.app/%20and%20want%20to%20connect%20with%20a%20coordinator.', '_blank', 'noopener,noreferrer');
      },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible) return null;

  const active = announcements[currentIdx];

  return (
    <div className="bg-[#0B1512] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6 border-b border-[#1A2E25] font-['Poppins'] transition-all select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Message with smooth fade */}
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="inline-flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white px-2 py-0.5 rounded-[6px] shrink-0 shadow-2xs">
            {active.badge}
          </span>
          <span className="text-zinc-200 truncate">
            {active.text}
          </span>
          <button
            type="button"
            onClick={active.action}
            className="hidden md:inline-flex items-center gap-0.5 text-[#10B981] hover:text-[#34D399] font-semibold underline underline-offset-2 shrink-0 cursor-pointer ml-1"
          >
            <span>{active.linkText}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right: Quick actions & dismiss */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20am%20browsing%20https://punartech.vercel.app/%20and%20want%20to%20connect%20with%20a%20coordinator."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-[#34D399] hover:text-white transition-colors font-mono font-medium"
          >
            <PhoneCall className="w-3 h-3" />
            <span>80550 35502</span>
          </a>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="text-zinc-400 hover:text-white p-0.5 rounded cursor-pointer transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
