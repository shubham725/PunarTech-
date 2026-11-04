import React from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';
import { ExternalLink, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';

export const WhatsAppContactSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FBF9] dark:bg-[#090E11] border-b border-[#E3EBE7] dark:border-[#22353D] transition-colors font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B251C] via-[#0B2328] to-[#08181F] rounded-[24px] p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-[#164E3E]">
          {/* Subtle ambient lighting with logo green and teal */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#009B69]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#007A8D]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading and Context */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#009B69]/20 backdrop-blur-xs text-xs font-['Poppins'] font-semibold text-[#10B981] uppercase tracking-wider border border-[#009B69]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Direct Customer Channel</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-['Urbanist'] font-bold text-white tracking-tight leading-tight">
                Connect Directly with <span className="bg-gradient-to-r from-[#10B981] to-[#38BDF8] bg-clip-text text-transparent">PunarTech</span> on WhatsApp
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed font-['Poppins']">
                Want live unedited photos of any laptop chassis? Need battery health diagnostics or want to confirm physical showroom timings in Pune or Delhi? Our coordinators are online to assist you.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-['Poppins'] font-medium text-zinc-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Real Unit Video Walkthrough</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Battery Health Report</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Stock Availability Check</span>
                </div>
              </div>
            </div>

            {/* Right Column: Fast Conversion Cards */}
            <div className="lg:col-span-5 space-y-3">
              {/* Direct Chat Card */}
              <a
                href="https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20want%20to%20enquire%20about%20your%20laptops%20inventory."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white text-zinc-950 rounded-[16px] shadow-lg border border-[#E3EBE7] flex items-center justify-between gap-4 hover:border-[#009B69] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#009B69] to-[#007A8D] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <WhatsAppIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-['Poppins'] font-semibold uppercase tracking-wider text-[#007A8D] block">
                      Direct Coordinator Chat
                    </span>
                    <span className="text-base font-bold font-mono text-zinc-950">
                      +91 80550 35502
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#E8F7EE] group-hover:bg-[#009B69] group-hover:text-white text-[#007A8D] flex items-center justify-center transition-colors shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              {/* Official Community Group Card */}
              <a
                href={WHATSAPP_CONFIG.groupInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 hover:bg-white/15 text-white rounded-[16px] border border-white/20 backdrop-blur-xs flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer group active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[12px] bg-white/10 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#10B981]" />
                  </div>
                  <div>
                    <span className="text-xs font-['Poppins'] font-semibold uppercase tracking-wider text-zinc-300 block">
                      Official WhatsApp Group
                    </span>
                    <span className="text-sm font-['Urbanist'] font-bold text-white">
                      Daily Arrival Deals &amp; Price Drops
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#10B981] group-hover:text-white text-white flex items-center justify-center transition-colors shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
