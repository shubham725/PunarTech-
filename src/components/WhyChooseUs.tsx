import React from 'react';
import {
  ShieldCheck,
  Wrench,
  Laptop,
  CheckCircle2,
  Headphones,
  MapPin,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Tested Hardware Reliability',
      description:
        'Each device passes motherboard power checks, display inspection, keyboard testing, port diagnostics, and battery health verification.',
    },
    {
      icon: CheckCircle2,
      title: 'Verified Selling Prices',
      description:
        'Business-series Dell Latitudes, HP EliteBooks, and ThinkPads priced transparently with exact configuration details and zero hidden charges.',
    },
    {
      icon: Wrench,
      title: 'Repair & Technical Support',
      description:
        'In-house hardware diagnostics, SSD/RAM upgrades, thermal servicing, and after-sales repair support handled by PunarTech technicians.',
    },
    {
      icon: Laptop,
      title: 'Unit-Level Stock Traceability',
      description:
        'Every laptop across Dell, HP, Lenovo, Apple, Acer, ASUS, and MSI carries a physical Stock ID for live verification.',
    },
    {
      icon: Headphones,
      title: 'Direct WhatsApp Assistance',
      description:
        'Message +91 80550 35502 for unedited unit photographs, battery diagnostic screenshots, or live video walkthroughs before purchase.',
    },
    {
      icon: MapPin,
      title: 'Pune & Delhi Inventory Hubs',
      description:
        'Physical stock stocked across Pune (60 units) and Delhi (31 units) for showroom pickup or insured PAN-India courier dispatch.',
    },
  ];

  return (
    <section
      id="quality-support"
      className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-14 sm:py-16 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D9488] dark:text-[#14B8A6]">
            Why Choose PunarTech
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] dark:text-[#F1F5F9] tracking-tight mt-1">
            Built on transparent hardware standards and real support.
          </h2>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
            Whether buying a refurbished business workstation, upgrading memory, or booking repair service, every specification and price is verified upfront.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="col-span-12 sm:col-span-6 lg:col-span-4 p-6 rounded-xl bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#1E2D38]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] text-[#059669] dark:text-[#10B981] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17212B] dark:text-[#F1F5F9] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
