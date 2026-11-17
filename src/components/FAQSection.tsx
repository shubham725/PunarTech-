import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What does PunarTech refurbishing include?',
      a: 'Every laptop is a commercial or enterprise unit that undergoes motherboard, display, keyboard, port, SSD health, and battery testing before listing. Compatible power adapters are included.',
    },
    {
      q: 'Are laptop specifications and Stock IDs verified?',
      a: 'Yes. Every one of our 91 units carries an individual physical Stock ID (PT/P001–PT/P060 in Pune, PT/D001–PT/D031 in Delhi) with confirmed processor, RAM, storage, and display specifications.',
    },
    {
      q: 'Can I inspect a laptop at your Pune or Delhi showroom before buying?',
      a: 'Yes. Message +91 80550 35502 on WhatsApp with the Stock ID to confirm showroom availability and inspect the physical device in person—or request a live video walkthrough remotely.',
    },
    {
      q: 'Do you offer laptop repair services, upgrades, rentals, and EMI?',
      a: 'Yes. In addition to refurbished laptop sales, PunarTech provides hardware repair and SSD/RAM upgrades, flexible monthly rentals (quote on request), and 3 to 12-month EMI options.',
    },
    {
      q: 'How can I compare multiple laptops?',
      a: 'Click Compare on up to 4 laptops anywhere in the catalog, then open the side-by-side comparison table to inspect processor, RAM, storage, display, and pricing together.',
    },
    {
      q: 'What payment and dispatch methods are supported?',
      a: 'We accept UPI, bank transfer, EMI financing, and showroom payment. Remote orders ship across India in protective packaging after live unit verification.',
    },
  ];

  return (
    <section
      id="faq"
      className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-14 sm:py-16 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="col-span-12 lg:col-span-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D9488] dark:text-[#14B8A6]">
              Support &amp; Policies
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] dark:text-[#F1F5F9] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Clear answers about refurbishment testing, physical inspection at Pune and Delhi showrooms, warranty coverage, repairs, and EMI.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#121B22] rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] divide-y divide-[#E2E8F0] dark:divide-[#1E2D38] px-5 sm:px-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#17212B] dark:text-[#F1F5F9]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
