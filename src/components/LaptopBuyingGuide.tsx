import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

interface BuyingGuideProps {
  onSelectCategory: (cat: string) => void;
}

export const LaptopBuyingGuide: React.FC<BuyingGuideProps> = ({ onSelectCategory }) => {
  const recommendations = [
    {
      category: 'Student & Everyday Browsing',
      idealFor: 'School, college coursework, video conferencing, online streaming, and office docs.',
      suggestedConfig: 'Intel Core i3 or Pentium, 8GB RAM, 128GB–256GB SSD',
      priceRange: '₹11,500 – ₹17,500',
      actionKey: 'student',
      examples: 'HP 250 G6, Dell Inspiron 3567, Lenovo IdeaPad 320',
    },
    {
      category: 'Office & Business Operations',
      idealFor: 'Multi-tab spreadsheets, ERP software, Zoom/Teams, and dependable daily productivity.',
      suggestedConfig: 'Intel Core i5 (6th–8th Gen), 8GB RAM, 256GB SSD',
      priceRange: '₹16,500 – ₹25,500',
      actionKey: 'business',
      examples: 'Dell Latitude 3480/5400, HP ProBook 440 G5, Dell Vostro 3580',
    },
    {
      category: 'Coding & High-Memory Tasks',
      idealFor: 'VS Code, virtual environments, Docker containers, heavy multitasking.',
      suggestedConfig: '16GB RAM, Intel Core i5/i7 (8th–11th Gen), 512GB Fast SSD',
      priceRange: '₹26,500 – ₹31,000',
      actionKey: 'high-perf',
      examples: 'Dell Latitude 7400 Touch, MSI Modern 14, Lenovo ThinkBook 14 G2',
    },
    {
      category: 'Graphics & Creative Workflow',
      idealFor: 'Photoshop, Illustrator, video clips, and entry-level graphics rendering.',
      suggestedConfig: 'Dedicated NVIDIA/Radeon GPU or AMD Ryzen 5, 8GB–16GB RAM',
      priceRange: '₹20,000 – ₹35,000',
      actionKey: 'gaming',
      examples: 'Acer Aspire A715 (4GB NVIDIA), Dell Inspiron 5559 (4GB Radeon)',
    },
  ];

  return (
    <section className="py-12 bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            <BookOpen className="w-4 h-4 text-black dark:text-white" />
            <span>Buyer Decision Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight">
            How to Choose the Right Laptop
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Match your actual daily workflow to realistic hardware configurations in our inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  Use Case 0{i + 1}
                </span>
                <h3 className="text-sm font-bold text-black dark:text-white leading-snug">
                  {rec.category}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {rec.idealFor}
                </p>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1.5 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 block">Recommended Specs:</span>
                    <span className="text-zinc-800 dark:text-zinc-200 font-medium">{rec.suggestedConfig}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 block">Typical Budget:</span>
                    <span className="font-mono font-bold text-black dark:text-white">{rec.priceRange}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 block">In-Stock Models:</span>
                    <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">{rec.examples}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => onSelectCategory(rec.actionKey)}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-black dark:text-white hover:underline py-1 cursor-pointer transition-colors"
                >
                  <span>Filter matching models</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
