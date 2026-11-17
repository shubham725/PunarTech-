import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface FeaturedCategoriesProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const renderCategoryVisual = (id: string) => {
    if (id === 'all') {
      return (
        <img
          src="/assets/aistudio/images_588341c0.jpg"
          alt="All Laptops"
          className="w-full h-full object-contain object-center"
        />
      );
    }
    if (id === 'business') {
      return (
        <img
          src="/assets/aistudio/images_7e575f70.jpg"
          alt="Business Laptops"
          className="w-full h-full object-contain object-center"
        />
      );
    }
    if (id === 'student') {
      return (
        <img
          src="/assets/aistudio/images_a46727d6.jpg"
          alt="Student Laptops"
          className="w-full h-full object-contain object-center"
        />
      );
    }
    if (id === 'gaming') {
      return (
        <img
          src="/assets/aistudio/images_ff5e78a3.jpg"
          alt="Gaming and GPU Laptops"
          className="w-full h-full object-contain object-center"
        />
      );
    }

    if (id === 'i3' || id === 'i5' || id === 'i7') {
      const tier = id === 'i3' ? 'i3' : id === 'i5' ? 'i5' : 'i7';
      const badgeTone =
        id === 'i3'
          ? 'bg-[#0284C7] border-[#38BDF8]/40'
          : id === 'i5'
          ? 'bg-[#0369A1] border-[#38BDF8]/40'
          : 'bg-[#1D4ED8] border-[#60A5FA]/40';

      return (
        <div
          className={`w-14 h-14 rounded-lg ${badgeTone} border text-white flex flex-col items-start justify-between p-2 mx-auto shadow-xs`}
        >
          <span className="text-[9px] font-semibold tracking-wide opacity-90 lowercase">
            intel
          </span>
          <div className="leading-none">
            <span className="block text-[7px] uppercase tracking-wider opacity-80">
              CORE
            </span>
            <span className="font-mono text-sm font-extrabold tracking-tight">
              {tier}
            </span>
          </div>
        </div>
      );
    }

    if (id === 'ryzen') {
      return (
        <div className="w-14 h-14 rounded-lg bg-[#17212B] border border-[#F97316]/50 text-white flex flex-col items-start justify-between p-2 mx-auto shadow-xs">
          <span className="text-[8px] font-bold tracking-widest uppercase text-[#CBD5E1]">
            AMD
          </span>
          <div className="leading-none">
            <span className="block text-[9px] font-extrabold tracking-wider text-[#F97316]">
              RYZEN
            </span>
            <span className="block w-6 h-0.5 bg-[#F97316] mt-1 rounded-full" />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-10 sm:py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#17212B] dark:text-[#F1F5F9] tracking-tight">
              Shop by Category
            </h2>
            <div className="flex items-center gap-2.5 mt-1.5">
              <span className="w-7 h-1 rounded-full bg-[#059669] dark:bg-[#10B981] shrink-0" />
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">
                Browse laptops based on your need and performance.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#059669] dark:text-[#10B981] hover:underline cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile horizontal scroll / Desktop 8-tile row */}
        <div className="flex overflow-x-auto pb-2 gap-3 sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:gap-3.5 sm:overflow-visible no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`min-w-[112px] sm:min-w-0 p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-[#E8F7EE] dark:bg-[#10B981]/15 border-[#059669] dark:border-[#10B981] shadow-xs'
                    : 'bg-white dark:bg-[#121B22] border-[#E2E8F0] dark:border-[#1E2D38] hover:border-[#059669] dark:hover:border-[#10B981]'
                }`}
              >
                <div className="w-full h-16 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] flex items-center justify-center p-1.5 overflow-hidden">
                  {renderCategoryVisual(cat.id)}
                </div>

                <div className="w-full">
                  <div className="text-xs font-bold text-[#17212B] dark:text-[#F1F5F9] truncate">
                    {cat.name}
                  </div>
                  <div
                    className={`text-[11px] font-mono mt-0.5 tabular-nums ${
                      isSelected
                        ? 'text-[#059669] dark:text-[#10B981] font-semibold'
                        : 'text-[#64748B] dark:text-[#94A3B8]'
                    }`}
                  >
                    {cat.count} Units
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
