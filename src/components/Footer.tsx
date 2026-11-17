import React from 'react';
import { PunarTechLogo } from './icons/PunarTechLogo';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';
import { MapPin, PhoneCall } from 'lucide-react';

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
    <footer className="bg-[#17212B] dark:bg-[#080D11] text-[#94A3B8] border-t border-[#263846] pt-12 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <PunarTechLogo size="lg" forceTheme="dark" />
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              PunarTech supplies verified refurbished business laptops, repair support, monthly rentals, and flexible EMI options from physical hubs in Pune and Delhi.
            </p>
            <div className="text-xs text-[#CBD5E1] font-medium">
              <span>Pune &amp; Delhi Showrooms · Tested Hardware · Warranty Backed</span>
            </div>
          </div>

          {/* Inventory Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Inventory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectBranch('All');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
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
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
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
                  className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Delhi Hub (31 Units)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory?.('business');
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Business Laptops
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('rental-emi')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rent &amp; Easy EMI
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Showrooms */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Support &amp; Service
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=Hello%20PunarTech,%20I%20am%20browsing%20https://punartech.vercel.app/%20and%20need%20support.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-white font-semibold"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="font-mono tabular-nums">{WHATSAPP_CONFIG.displayPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_CONFIG.groupInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Official WhatsApp Group</span>
                </a>
              </li>
              <li>
                <a
                  href="#showrooms"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('showrooms')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Repair &amp; Technical Support
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenFAQ) {
                      onOpenFAQ();
                    } else {
                      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer text-left"
                >
                  Coordinator Staff Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Store Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quality &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>Multi-point Hardware &amp; Battery QA</li>
              <li>Grade A+ / Grade A Verified Grading</li>
              <li>In-Store Inspection in Pune &amp; Delhi</li>
              <li>Insured Multi-Layer Courier Dispatch</li>
              <li>
                <span>Live Store: </span>
                <a
                  href="https://punartech.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#10B981] hover:underline font-mono"
                >
                  punartech.vercel.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 border-t border-[#263846] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white font-semibold">PunarTech</span>
            <span>·</span>
            <a
              href="https://punartech.vercel.app/"
              className="hover:text-white transition-colors font-mono"
            >
              punartech.vercel.app
            </a>
            <span>·</span>
            <span>Pune &amp; Delhi Hubs</span>
          </div>

          <div>
            © {new Date().getFullYear()} PunarTech. Refurbished Laptops, Rentals &amp; Repair Support.
          </div>
        </div>
      </div>
    </footer>
  );
};
