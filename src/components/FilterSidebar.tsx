import React, { useState } from 'react';
import { RotateCcw, ChevronDown, ChevronUp, X } from 'lucide-react';

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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    branch: true,
    price: true,
    brand: true,
    processor: true,
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
      className={`bg-white dark:bg-[#121B22] divide-y divide-[#E2E8F0] dark:divide-[#1E2D38] ${
        isMobileDrawer
          ? 'border-0 p-0'
          : 'rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] p-5 w-full'
      }`}
    >
      {!hideHeader && (
        <div className="pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#17212B] dark:text-[#F1F5F9]">
              Filters
            </h2>
            {activeCount > 0 && (
              <span className="font-mono text-[11px] font-semibold text-[#059669] dark:text-[#10B981]">
                ({activeCount})
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] dark:text-[#14B8A6] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

            {isMobileDrawer && onCloseMobileDrawer && (
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#17212B] dark:hover:text-white cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 1. Showroom Hub */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('branch')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-[#F1F5F9] cursor-pointer"
        >
          <span>Location</span>
          {openSections.branch ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {openSections.branch && (
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {(['All', 'Pune', 'Delhi'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => updateBranch(b)}
                className={`py-2 px-1 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  filters.branch === b
                    ? 'bg-[#059669] text-white border-[#059669]'
                    : 'bg-[#F8FAFC] dark:bg-[#18242D] text-[#475569] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#263846] hover:text-[#17212B] dark:hover:text-white'
                }`}
              >
                {b === 'All' ? 'All (91)' : b === 'Pune' ? 'Pune (60)' : 'Delhi (31)'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Price Range */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-[#F1F5F9] cursor-pointer"
        >
          <span>Price Range</span>
          {openSections.price ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-2">
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
                className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-[#94A3B8] cursor-pointer hover:text-[#17212B] dark:hover:text-white select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.pricePreset === p.id}
                  onChange={() => handlePricePreset(p.id)}
                  className="w-4 h-4 rounded border-[#CBD5E1] accent-[#059669]"
                />
                <span className="font-mono">{p.label}</span>
              </label>
            ))}

            <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
              <label className="flex items-center gap-2.5 text-xs text-[#64748B] dark:text-[#94A3B8] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.includeUnpriced}
                  onChange={(e) =>
                    onFilterChange({ ...filters, includeUnpriced: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-[#CBD5E1] accent-[#059669]"
                />
                <span>Show &ldquo;Contact for Price&rdquo;</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 3. Brand */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-[#F1F5F9] cursor-pointer"
        >
          <span>Brand</span>
          {openSections.brand ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {openSections.brand && (
          <div className="mt-3 space-y-2">
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
                className="flex items-center justify-between text-xs text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(b.name)}
                    onChange={() => toggleArrayItem(filters.brands, b.name, 'brands')}
                    className="w-4 h-4 rounded border-[#CBD5E1] accent-[#059669]"
                  />
                  <span>{b.name}</span>
                </div>
                <span className="font-mono text-[11px] text-[#64748B] tabular-nums">{b.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Processor */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('processor')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-[#F1F5F9] cursor-pointer"
        >
          <span>Processor</span>
          {openSections.processor ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {openSections.processor && (
          <div className="mt-3 space-y-2">
            {[
              'Intel Core i3',
              'Intel Core i5',
              'Intel Core i7',
              'AMD Ryzen',
              'Pentium',
            ].map((proc) => (
              <label
                key={proc}
                className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.processors.includes(proc)}
                  onChange={() => toggleArrayItem(filters.processors, proc, 'processors')}
                  className="w-4 h-4 rounded border-[#CBD5E1] accent-[#059669]"
                />
                <span>{proc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. RAM */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('ram')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-[#F1F5F9] cursor-pointer"
        >
          <span>Memory (RAM)</span>
          {openSections.ram ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {openSections.ram && (
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[4, 8, 16].map((r) => {
              const active = filters.ram.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleArrayItem(filters.ram, r, 'ram')}
                  className={`py-2 px-2 rounded-lg text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-[#F8FAFC] dark:bg-[#18242D] text-[#17212B] dark:text-[#E2E8F0] border-[#E2E8F0] dark:border-[#263846] hover:border-[#059669]'
                  }`}
                >
                  {r}GB
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Storage */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('storage')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-[#F1F5F9] cursor-pointer"
        >
          <span>Storage</span>
          {openSections.storage ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {openSections.storage && (
          <div className="mt-3 space-y-2">
            {['SSD only', 'SSD + HDD', 'HDD only'].map((st) => (
              <label
                key={st}
                className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.storageTypes.includes(st)}
                  onChange={() => toggleArrayItem(filters.storageTypes, st, 'storageTypes')}
                  className="w-4 h-4 rounded border-[#CBD5E1] accent-[#059669]"
                />
                <span>{st}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 7. Graphics */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('graphics')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-[#F1F5F9] cursor-pointer"
        >
          <span>Graphics</span>
          {openSections.graphics ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {openSections.graphics && (
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.hasDedicatedGraphics === true}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    hasDedicatedGraphics: e.target.checked ? true : null,
                  })
                }
                className="w-4 h-4 rounded border-[#CBD5E1] accent-[#059669]"
              />
              <span>Dedicated GPU Only</span>
            </label>
          </div>
        )}
      </div>

      {/* 8. Display */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => toggleSection('display')}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-[#F1F5F9] cursor-pointer"
        >
          <span>Display Size</span>
          {openSections.display ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </button>

        {openSections.display && (
          <div className="mt-3 space-y-2">
            {['13-inch class', '14-inch class', '15.6-inch class'].map((dc) => (
              <label
                key={dc}
                className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={filters.displayClasses.includes(dc)}
                  onChange={() => toggleArrayItem(filters.displayClasses, dc, 'displayClasses')}
                  className="w-4 h-4 rounded border-[#CBD5E1] accent-[#059669]"
                />
                <span>{dc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {!hideHeader && (
        <div className="pt-4 mt-4 border-t border-[#E2E8F0] dark:border-[#1E2D38] flex items-center justify-between text-xs text-[#64748B]">
          <span>Matching Stock</span>
          <span className="font-mono font-bold text-[#17212B] dark:text-white tabular-nums">
            {totalMatches} units
          </span>
        </div>
      )}
    </aside>
  );
};
