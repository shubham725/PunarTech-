import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '1. What is a refurbished laptop?',
      a: 'A refurbished laptop is a pre-owned enterprise or commercial unit that has been thoroughly tested, cleaned, and restored to full working condition. Unlike uninspected second-hand devices, PunarTech units undergo hardware diagnosis for motherboard power, display health, RAM stability, and drive health.',
    },
    {
      q: '2. Are laptop specifications verified before listing?',
      a: 'Yes. Every laptop in our 91-unit catalog is assigned a unique physical Stock ID (PT/P001 to PT/D031). We physically confirm the exact processor generation, DDR memory capacity, and SSD/HDD storage before publishing.',
    },
    {
      q: '3. How can I check laptop availability?',
      a: 'Inventory is active across Pune and Delhi hubs. Click the "WhatsApp" button on any laptop card to auto-generate an enquiry with the model and stock ID. Our coordinator confirms real-time availability immediately.',
    },
    {
      q: '4. Can I compare different laptops side-by-side?',
      a: 'Yes! Click the "Compare" button on up to 4 laptops. An interactive comparison bar will appear at the bottom of the screen. Tap "Compare Now" to view specifications side-by-side with highlights for lowest price, highest RAM, and largest storage.',
    },
    {
      q: '5. Do you have physical hubs in Pune and Delhi?',
      a: 'Yes, PunarTech operates dedicated inventory hubs in both Pune (60 laptops) and Delhi (31 laptops). You can filter the catalog specifically by branch to view only local stock ready for immediate pickup.',
    },
    {
      q: '6. How can I contact PunarTech?',
      a: 'You can chat or call our coordinator directly on WhatsApp at +91 80550 35502, join our official PunarTech WhatsApp Community Group, or use the direct enquiry buttons on each product.',
    },
    {
      q: '7. What warranty and testing period is provided?',
      a: 'All units come with our PunarTech 100% Tested Motherboard Assurance. Warranty terms and testing check periods depend on the specific grade and model. Contact us on WhatsApp with the Stock ID to receive specific warranty confirmation for your model.',
    },
    {
      q: '8. What payment methods are available?',
      a: 'We accept UPI (Google Pay, PhonePe, Paytm), direct bank transfers, and cash upon in-person branch inspection and verification.',
    },
    {
      q: '9. Do you provide delivery or courier dispatch?',
      a: 'Yes. In addition to in-store branch visits, we arrange protective multi-layer bubble-wrap courier shipping with compatible power adapter and charging cord included.',
    },
    {
      q: '10. Can I visit the store to test the laptop before buying?',
      a: 'Absolutely. We encourage customers in Pune and Delhi to visit our inventory hubs, test the keyboard and screen display, check battery health in real-time, and make an informed purchase.',
    },
    {
      q: '11. How does the PunarTech laptop rental program work?',
      a: 'You can rent laptops monthly starting from ₹999/month for Core i3 student models up to ₹2,999/month for Apple MacBooks and Core i7 workstations. We require basic digital KYC (Aadhaar or College/Company ID) and a 100% refundable security deposit. All rentals include free maintenance and doorstep delivery in Pune and Delhi.',
    },
    {
      q: '12. Can I buy a laptop on EMI without a credit card?',
      a: 'Yes! In addition to 0% No-Cost EMI on leading Credit Cards, we support Cardless Debit Card EMI and financing via Bajaj Finserv, ZestMoney, and Snapmint. Approval takes just 15 minutes digitally with flexible 3, 6, 9, or 12-month installment plans.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white dark:bg-[#09090b] border-b border-zinc-200 dark:border-zinc-800 transition-colors font-['Poppins']">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-['Poppins'] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            <HelpCircle className="w-4 h-4 text-black dark:text-white" />
            <span>Transparency &amp; Answers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-['Urbanist'] font-bold text-black dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-['Poppins']">
            Clear, honest answers about our refurbished laptops, testing standards, and branch hubs.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-zinc-900 rounded-[16px] border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-300"
                >
                  <span className="text-base font-['Urbanist'] font-bold text-black dark:text-white">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-black dark:text-white">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 font-['Poppins']">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
