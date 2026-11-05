import React from 'react';
import { PunarTechLogo } from './icons/PunarTechLogo';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';
import { ShieldCheck, MapPin, PhoneCall } from 'lucide-react';

interface FooterProps {
  onSelectBranch: (b: 'All' | 'Pune' | 'Delhi') => void;
  onSelectCategory?: (cat: string) => void;
  onOpenFAQ?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectBranch,
  onSelectCategory,
  onOpenFAQ,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-[#090E11] text-zinc-400 border-t border-[#1C2C33] pt-12 pb-24 sm:pb-12 transition-colors font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <PunarTechLogo size="lg" />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-['Poppins']">
              PunarTech is your premier destination for thoroughly tested, high-value refurbished and pre-owned laptops. Operating verified hubs in Pune and Delhi with transparent specifications and direct WhatsApp communication.
            </p>
            <div className="text-xs text-[#10B981] font-bold">
              Tagline: "Premium Laptops. Smarter Prices."
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500 pt-1">
              <span className="flex items-center gap-1 text-[#10B981] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Motherboard Tested</span>
              </span>
              <span>•</span>
              <span className="text-[#06B6D4]">Authentic Stock IDs</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-['Urbanist'] font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#10B981] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectBranch('All');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#10B981] transition-colors cursor-pointer"
                >
                  All 91 Laptops
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectBranch('Pune');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#10B981] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#10B981]" />
                  <span>Pune Hub (60 Units)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectBranch('Delhi');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#10B981] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-[#06B6D4]" />
                  <span>Delhi Hub (31 Units)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory?.('deals');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#10B981] transition-colors cursor-pointer"
                >
                  Today's Best Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-['Urbanist'] font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20am%20browsing%20https://punartech.vercel.app/%20and%20need%20support."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10B981] transition-colors flex items-center gap-1.5 text-zinc-200 font-semibold"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>WhatsApp: +91 80550 35502</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_CONFIG.groupInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Join WhatsApp Community</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#10B981] transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Coordinator Staff Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Legal Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-['Urbanist'] font-bold uppercase tracking-wider text-white">
              Business Transparency
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <span>Refurbished Grade: <strong className="text-[#10B981]">Grade A++ Verified</strong></span>
              </li>
              <li>
                <span>Testing Standard: Motherboard, RAM &amp; Drive Verified</span>
              </li>
              <li>
                <span>In-Store Inspection: Pune &amp; Delhi</span>
              </li>
              <li>
                <span>Dispatch: Multi-layer Protective Packaging</span>
              </li>
              <li>
                <span>Official Live Website: <a href="https://punartech.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#10B981] hover:underline font-mono">punartech.vercel.app</a></span>
              </li>
              <li>
                <span className="text-zinc-500 text-[11px]">Privacy Policy • Terms of Sale</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 border-t border-[#1C2C33] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white font-bold">PunarTech</span>
            <span>•</span>
            <a href="https://punartech.vercel.app/" className="hover:text-[#10B981] transition-colors font-mono">punartech.vercel.app</a>
            <span>•</span>
            <span>Pune &amp; Delhi Hubs</span>
            <span>•</span>
            <span className="font-mono text-[#10B981] font-bold">PunarTech On Top!</span>
          </div>

          <div>
            © {new Date().getFullYear()} PunarTech. All rights reserved. "Premium Laptops. Smarter Prices."
          </div>
        </div>
      </div>
    </footer>
  );
};
