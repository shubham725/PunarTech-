import React from 'react';
import { ShieldCheck, Cpu, Wrench, MapPin } from 'lucide-react';

export const TrustMetricsBar: React.FC = () => {
  const indicators = [
    {
      title: 'Hardware & Battery Tested',
      detail: 'Motherboard, ports, screen, keyboard, and battery health verified before listing.',
      icon: ShieldCheck,
    },
    {
      title: 'Exact Verified Specifications',
      detail: 'Documented CPU generation, RAM, SSD/HDD storage, and unique Stock ID per unit.',
      icon: Cpu,
    },
    {
      title: 'Warranty & Repair Support',
      detail: 'Hardware warranty support and in-house technical diagnostics & servicing.',
      icon: Wrench,
    },
    {
      title: 'Pune & Delhi Showrooms',
      detail: 'Inspect devices in person or request a live WhatsApp video check before dispatch.',
      icon: MapPin,
    },
  ];

  return (
    <section className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          {indicators.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="col-span-12 sm:col-span-6 lg:col-span-3 flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-lg bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#1E2D38] text-[#059669] dark:text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#17212B] dark:text-[#F1F5F9]">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
