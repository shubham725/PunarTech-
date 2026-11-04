import React, { useState } from 'react';
import { RotateCcw, ChevronDown, ChevronUp, SlidersHorizontal, X, Check } from 'lucide-react';

export interface FilterState {
  branch: 'All' | 'Pune' | 'Delhi';
  pricePreset: string | null;
  customMinPrice: number | null;
  customMaxPrice: number | null;
  includeUnpriced: boolean;
  brands: string[];
  processors: string[];
  generations: number[];
  ram: number[];
  storageTypes: string[];
  hasDedicatedGraphics: boolean | null;
  graphicsBrands: string[];
  displayClasses: string[];
}

export const INITIAL_FILTERS: FilterState = {
  branch: 'All',
  pricePreset: null,
  customMinPrice: null,
  customMaxPrice: null,
  includeUnpriced: true,
  brands: [],
  processors: [],
  generations: [],
  ram: [],
  storageTypes: [],
  hasDedicatedGraphics: null,
  graphicsBrands: [],
  displayClasses: [],
};

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
  hideHeader?: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalMatches,
  isMobileDrawer = false,
  onCloseMobileDrawer,
  hideHeader = false,
}) => {
  // Collapsible section state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    branch: true,
    price: true,
    brand: true,
    processor: true,
    generation: false,
    ram: true,
    storage: false,
    graphics: false,
    display: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateBranch = (branch: 'All' | 'Pune' | 'Delhi') => {
    onFilterChange({ ...filters, branch });
  };

  const toggleArrayItem = <T extends string | number>(
    arr: T[],
    item: T,
    key: keyof FilterState
  ) => {
    const next = arr.includes(item)
      ? arr.filter((x) => x !== item)
      : [...arr, item];
    onFilterChange({ ...filters, [key]: next });
  };

  const handlePricePreset = (preset: string | null) => {
    onFilterChange({
      ...filters,
      pricePreset: filters.pricePreset === preset ? null : preset,
      customMinPrice: null,
      customMaxPrice: null,
    });
  };

  // Check active filter count
  const activeCount =
    (filters.branch !== 'All' ? 1 : 0) +
    (filters.pricePreset || filters.customMinPrice || filters.customMaxPrice ? 1 : 0) +
    (!filters.includeUnpriced ? 1 : 0) +
    filters.brands.length +
    filters.processors.length +
    filters.generations.length +
    filters.ram.length +
    filters.storageTypes.length +
    (filters.hasDedicatedGraphics !== null ? 1 : 0) +
    filters.graphicsBrands.length +
    filters.displayClasses.length;

  return (
    <aside
      className={`bg-white dark:bg-[#152227] rounded-[22px] divide-y divide-[#E3EBE7] dark:divide-[#22353D] transition-colors duration-300 font-['Poppins'] ${
        isMobileDrawer ? 'border-0 p-0 shadow-none' : 'border border-[#E3EBE7] dark:border-[#22353D] shadow-sm p-4 sm:p-5 w-full'
      }`}
    >
      {/* Filter Header */}
      {!hideHeader && (
        <>
          <div className="pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#009B69] dark:text-[#10B981]" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white font-['Urbanist']">Filters</h2>
              {activeCount > 0 && (
                <span className="text-[11px] font-mono font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#C8DFD4] dark:border-[#10B981]/30">
                  {activeCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#007A52] dark:text-[#34D399] hover:underline transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}

              {isMobileDrawer && onCloseMobileDrawer && (
                <button
                  type="button"
                  onClick={onCloseMobileDrawer}
                  className="p-1 rounded-[8px] text-zinc-400 hover:text-zinc-950 dark:hover:text-white cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Matching Results Count */}
          <div className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>Available Matches:</span>
            <span className="font-mono font-bold text-[#007A52] dark:text-[#34D399] tabular-nums">
              {totalMatches} laptops
            </span>
          </div>
        </>
      )}

      {/* 1. Branch Selector */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('branch')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white cursor-pointer font-['Urbanist']"
        >
          <span>Inventory Hub</span>
          {openSections.branch ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
        </button>

        {openSections.branch && (
          <div className="mt-2.5 grid grid-cols-3 gap-1 bg-[#F6F9F8] dark:bg-[#0E1519] p-1.5 rounded-[12px] border border-[#E3EBE7] dark:border-[#22353D]">
            {(['All', 'Pune', 'Delhi'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => updateBranch(b)}
                className={`py-1.5 text-xs font-semibold rounded-[8px] transition-all duration-300 cursor-pointer ${
                  filters.branch === b
                    ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B] shadow-xs font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-[#009B69] dark:hover:text-[#10B981]'
                }`}
              >
                {b === 'All' ? 'All (91)' : b === 'Pune' ? 'Pune (60)' : 'Delhi (31)'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Price Filter */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black dark:text-white cursor-pointer font-['Urbanist']"
        >
          <span>Budget Range (INR)</span>
          {openSections.price ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
        </button>

        {openSections.price && (
          <div className="mt-2.5 space-y-2">
            {[
              { id: 'under12k', label: 'Under ₹12,000' },
              { id: 'k12to15', label: '₹12,000 – ₹15,000' },
              { id: 'k15to20', label: '₹15,000 – ₹20,000' },
              { id: 'k20to25', label: '₹20,000 – ₹25,000' },
              { id: 'k25to30', label: '₹25,000 – ₹30,000' },
              { id: 'above30k', label: 'Above ₹30,000' },
            ].map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer hover:text-black dark:hover:text-white select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.pricePreset === p.id}
                  onChange={() => handlePricePreset(p.id)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-black focus:ring-black w-3.5 h-3.5 accent-[#009B69] dark:accent-[#10B981]"
                />
                <span className="font-mono text-zinc-700 dark:text-zinc-300">{p.label}</span>
              </label>
            ))}

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <label className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer select-none hover:text-black dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={filters.includeUnpriced}
                  onChange={(e) =>
                    onFilterChange({ ...filters, includeUnpriced: e.target.checked })
                  }
                  className="rounded border-zinc-300 dark:border-zinc-700 text-black focus:ring-black w-3.5 h-3.5 accent-[#009B69] dark:accent-[#10B981]"
                />
                <span>Include "Contact for Price"</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 3. Brands */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black dark:text-white cursor-pointer font-['Urbanist']"
        >
          <span>Brand</span>
          {openSections.brand ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
        </button>

        {openSections.brand && (
          <div className="mt-2.5 space-y-1.5">
            {[
              { name: 'Dell', count: 46 },
              { name: 'HP', count: 25 },
              { name: 'Lenovo', count: 13 },
              { name: 'Acer', count: 3 },
              { name: 'Apple', count: 2 },
              { name: 'ASUS', count: 1 },
              { name: 'MSI', count: 1 },
            ].map((b) => (
              <label
                key={b.name}
                className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(b.name)}
                    onChange={() => toggleArrayItem(filters.brands, b.name, 'brands')}
                    className="rounded border-zinc-300 dark:border-zinc-700 text-black focus:ring-black w-3.5 h-3.5 accent-[#009B69] dark:accent-[#10B981]"
                  />
                  <span>{b.name}</span>
                </div>
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">{b.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Processors */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('processor')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black dark:text-white cursor-pointer font-['Urbanist']"
        >
          <span>Processor Series</span>
          {openSections.processor ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
        </button>

        {openSections.processor && (
          <div className="mt-2.5 space-y-1.5">
            {[
              { name: 'Intel Core i3' },
              { name: 'Intel Core i5' },
              { name: 'Intel Core i7' },
              { name: 'AMD Ryzen' },
              { name: 'Pentium' },
            ].map((p) => (
              <label
                key={p.name}
                className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.processors.includes(p.name)}
                  onChange={() => toggleArrayItem(filters.processors, p.name, 'processors')}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-black focus:ring-black w-3.5 h-3.5 accent-[#009B69] dark:accent-[#10B981]"
                />
                <span>{p.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Memory (RAM) */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('ram')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black dark:text-white cursor-pointer font-['Urbanist']"
        >
          <span>Memory (RAM)</span>
          {openSections.ram ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
        </button>

        {openSections.ram && (
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {[4, 8, 16].map((r) => {
              const active = filters.ram.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleArrayItem(filters.ram, r, 'ram')}
                  className={`py-1.5 px-2 rounded-[10px] text-xs font-mono font-semibold border transition-all duration-300 cursor-pointer text-center ${
                    active
                      ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white border-transparent dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B] shadow-xs font-bold'
                      : 'bg-white dark:bg-[#10191E] hover:bg-[#E8F7EE] dark:hover:bg-[#1B2B32] text-zinc-800 dark:text-zinc-200 border-[#E3EBE7] dark:border-[#22353D]'
                  }`}
                >
                  {r}GB
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Storage Type */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('storage')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black dark:text-white cursor-pointer font-['Urbanist']"
        >
          <span>Storage Architecture</span>
          {openSections.storage ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
        </button>

        {openSections.storage && (
          <div className="mt-2.5 space-y-1.5">
            {['SSD only', 'SSD + HDD', 'HDD only'].map((st) => (
              <label
                key={st}
                className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.storageTypes.includes(st)}
                  onChange={() => toggleArrayItem(filters.storageTypes, st, 'storageTypes')}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-black focus:ring-black w-3.5 h-3.5 accent-[#009B69] dark:accent-[#10B981]"
                />
                <span>{st}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 7. Dedicated Graphics */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('graphics')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black dark:text-white cursor-pointer font-['Urbanist']"
        >
          <span>Graphics GPU</span>
          {openSections.graphics ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
        </button>

        {openSections.graphics && (
          <div className="mt-2.5 space-y-1.5">
            <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.hasDedicatedGraphics === true}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    hasDedicatedGraphics: e.target.checked ? true : null,
                  })
                }
                className="rounded border-zinc-300 dark:border-zinc-700 text-black focus:ring-black w-3.5 h-3.5 accent-[#009B69] dark:accent-[#10B981]"
              />
              <span className="font-semibold">Dedicated GPU Only (NVIDIA / Radeon)</span>
            </label>
          </div>
        )}
      </div>

      {/* 8. Display Classes */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggleSection('display')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black dark:text-white cursor-pointer font-['Urbanist']"
        >
          <span>Screen Size</span>
          {openSections.display ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />}
        </button>

        {openSections.display && (
          <div className="mt-2.5 space-y-1.5">
            {['13-inch class', '14-inch class', '15.6-inch class'].map((dc) => (
              <label
                key={dc}
                className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.displayClasses.includes(dc)}
                  onChange={() => toggleArrayItem(filters.displayClasses, dc, 'displayClasses')}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-black focus:ring-black w-3.5 h-3.5 accent-[#009B69] dark:accent-[#10B981]"
                />
                <span>{dc}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
