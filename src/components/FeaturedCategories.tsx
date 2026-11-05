import React from 'react';
import {
  Laptop,
  Briefcase,
  GraduationCap,
  Gamepad2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

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
  return (
    <section className="py-8 sm:py-10 bg-[#F8FBF9] dark:bg-[#090E11] border-b border-[#E3EBE7] dark:border-[#22353D] transition-colors duration-300 font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#007A52] dark:text-[#34D399] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
              <span>Catalog By Workflow &amp; Spec</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-['Urbanist']">
              Browse by Popular Categories
            </h2>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Select any category to filter instantly
          </span>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`p-3.5 rounded-[20px] border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group active:scale-95 hover:-translate-y-1 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white border-transparent shadow-md shadow-[#009B69]/20 dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B] ring-2 ring-[#009B69]/30 dark:ring-[#10B981]/40'
                    : 'bg-white dark:bg-[#152227] hover:bg-[#F6F9F8] dark:hover:bg-[#1B2B32] text-zinc-900 dark:text-zinc-100 border-[#E3EBE7] dark:border-[#22353D] hover:border-[#009B69] dark:hover:border-[#10B981] shadow-2xs'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-[12px] flex items-center justify-center mb-2.5 transition-colors duration-300 ${
                    isSelected
                      ? 'bg-white/20 text-white dark:bg-black/15 dark:text-[#04251B]'
                      : 'bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] group-hover:bg-[#009B69] group-hover:text-white dark:group-hover:bg-[#10B981] dark:group-hover:text-[#04251B]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <h3
                    className={`text-xs font-bold leading-tight mb-0.5 truncate font-['Urbanist'] ${
                      isSelected ? 'text-white dark:text-[#04251B]' : 'text-zinc-900 dark:text-white'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <span
                    className={`text-[10px] font-mono font-medium block ${
                      isSelected ? 'text-white/80 dark:text-[#04251B]/80' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {cat.count} Units
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
