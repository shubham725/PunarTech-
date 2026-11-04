import React from 'react';
import {
  ShieldCheck,
  Award,
  Laptop,
  CheckCircle2,
  Headphones,
  MapPin,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Quality Tested',
      description:
        'Every laptop undergoes motherboard boot testing, display lines inspection, keyboard responsiveness, and battery backup verification.',
    },
    {
      icon: Award,
      title: 'Affordable Pricing',
      description:
        'Get business-grade Dell Latitudes, HP EliteBooks, and ThinkPads at smarter, transparent prices with zero hidden markups or fake MRPs.',
    },
    {
      icon: Laptop,
      title: 'Multiple Leading Brands',
      description:
        'Diverse collection covering Dell, HP, Lenovo, Acer, Apple, ASUS, and MSI with authentic stock IDs for each physical unit.',
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Specifications',
      description:
        'Exact processor generation, DDR memory capacity, storage technology (SSD/HDD), and graphics chips clearly documented.',
    },
    {
      icon: Headphones,
      title: 'Dedicated WhatsApp Support',
      description:
        'Connect directly with our helpline at +91 80550 35502 for live photos, 360-degree video demos, and real-time guidance.',
    },
    {
      icon: MapPin,
      title: 'Dual Inventory Hubs',
      description:
        'Physical hubs in Pune (60 Units) and Delhi (31 Units) ready for in-store verification, local hand-over, or protective courier dispatch.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8FBF9] dark:bg-[#090E11] border-b border-[#E3EBE7] dark:border-[#22353D] transition-colors font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-['Poppins'] font-semibold uppercase tracking-wider text-[#007A8D] dark:text-[#06B6D4] block mb-1">
            The PunarTech Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white tracking-tight">
            Why Choose PunarTech?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Built on genuine hardware quality, technical transparency, and responsive customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-[22px] bg-white dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-[14px] bg-[#E8F7EE] dark:bg-[#10B981]/15 border border-[#BCE7CB] dark:border-[#10B981]/30 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center mb-4 group-hover:bg-[#009B69] group-hover:text-white dark:group-hover:bg-[#10B981] dark:group-hover:text-[#090E11] transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-['Urbanist'] font-bold text-zinc-950 dark:text-white mb-2 group-hover:text-[#009B69] dark:group-hover:text-[#10B981] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-['Poppins']">
                    {pillar.description}
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
