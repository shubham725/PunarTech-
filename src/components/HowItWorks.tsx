import React from 'react';
import { Search, Scale, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface HowItWorksProps {
  onExploreClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExploreClick }) => {
  const steps = [
    {
      step: '01',
      title: 'Explore Laptops',
      description:
        'Browse 91 verified laptops across our Pune & Delhi hubs. Filter by processor, brand, RAM, or price bracket.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Compare Specifications',
      description:
        'Select up to 4 models to compare side-by-side. Inspect processor generation, memory capacity, SSD speed, and display.',
      icon: Scale,
    },
    {
      step: '03',
      title: 'Contact on WhatsApp',
      description:
        'Click the WhatsApp button on any laptop. Our coordinator (+91 80550 35502) shares actual unit photos and battery diagnostic reports.',
      icon: WhatsAppIcon,
      isCustomIcon: true,
    },
    {
      step: '04',
      title: 'Confirm Your Purchase',
      description:
        'Visit our Pune or Delhi showroom for physical handover, or finalize verified courier dispatch with fast power adapter included.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#09090b] border-b border-zinc-200 dark:border-zinc-800 transition-colors font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-['Poppins'] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
            Simple &amp; Transparent Journey
          </span>
          <h2 className="text-2xl sm:text-4xl font-['Urbanist'] font-bold text-black dark:text-white tracking-tight">
            How Buying at PunarTech Works
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-['Poppins']">
            Four simple steps from discovering your model to testing and receiving your laptop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-50 dark:bg-zinc-900 rounded-[22px] p-6 border border-zinc-200 dark:border-zinc-800 relative flex flex-col justify-between group hover:border-black dark:hover:border-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-[14px] bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                      {item.isCustomIcon ? (
                        <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className="font-mono text-2xl font-black text-zinc-300 dark:text-zinc-700 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-['Urbanist'] font-bold text-black dark:text-white mb-2">
                    Step {idx + 1}: {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-['Poppins']">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center text-xs font-['Poppins'] font-semibold text-zinc-700 dark:text-zinc-300">
                  <span>Step {item.step} of 04</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
