import React, { useState, useMemo, useEffect } from 'react';
import {
  LAPTOP_INVENTORY,
  Laptop,
  INVENTORY_STATS,
  getLaptopWhatsAppUrl,
  WHATSAPP_CONFIG,
} from './data/laptops';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { DealsSection } from './components/DealsSection';
import { FilterSidebar, FilterState, INITIAL_FILTERS } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { ComparisonModal } from './components/ComparisonModal';
import { CompareBar } from './components/CompareBar';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ShareModal } from './components/ShareModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { RentalAndEmiSection } from './components/RentalAndEmiSection';
import { RentalEmiModal } from './components/RentalEmiModal';
import { WhatsAppContactSection } from './components/WhatsAppContactSection';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Toast } from './components/Toast';
import {
  Search,
  X,
  RotateCcw,
  SlidersHorizontal,
  Inbox,
  ArrowUpDown,
  Sparkles,
  Laptop as LaptopIcon,
  Briefcase,
  GraduationCap,
  Gamepad2,
  Cpu,
  MapPin,
} from 'lucide-react';
import { WhatsAppIcon } from './components/icons/WhatsAppIcon';

export default function App() {
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('recommended');

  // Modals & Drawers State
  const [activeDetailsLaptop, setActiveDetailsLaptop] = useState<Laptop | null>(null);
  const [activeShareLaptop, setActiveShareLaptop] = useState<Laptop | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isMobileFilterDrawerOpen, setIsMobileFilterDrawerOpen] = useState(false);
  const [isRentEmiModalOpen, setIsRentEmiModalOpen] = useState(false);
  const [rentEmiModalLaptop, setRentEmiModalLaptop] = useState<Laptop | null>(null);
  const [rentEmiModalMode, setRentEmiModalMode] = useState<'rent' | 'emi'>('rent');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compare & Wishlist lists (persisted in localStorage for wishlist)
  const [comparedLaptopIds, setComparedLaptopIds] = useState<string[]>([]);
  const [wishlistedLaptopIds, setWishlistedLaptopIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('punartech_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('punartech_wishlist', JSON.stringify(wishlistedLaptopIds));
    } catch {
      // ignore storage error
    }
  }, [wishlistedLaptopIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Direct WhatsApp Enquiry Handler: opens WhatsApp with pre-filled details
  const handleDirectWhatsAppEnquiry = (laptop: Laptop) => {
    const url = getLaptopWhatsAppUrl(laptop);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Compare Toggle (up to 4 laptops)
  const handleToggleCompare = (laptop: Laptop) => {
    setComparedLaptopIds((prev) => {
      if (prev.includes(laptop.id)) {
        showToast(`Removed ${laptop.model} from comparison.`);
        return prev.filter((id) => id !== laptop.id);
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 laptops at a time.');
        return prev;
      }
      showToast(`Added ${laptop.model} to comparison.`);
      return [...prev, laptop.id];
    });
  };

  // Wishlist Toggle
  const handleToggleWishlist = (laptop: Laptop) => {
    setWishlistedLaptopIds((prev) => {
      if (prev.includes(laptop.id)) {
        showToast(`Removed from saved laptops.`);
        return prev.filter((id) => id !== laptop.id);
      }
      showToast(`Saved ${laptop.model} to your wishlist.`);
      return [...prev, laptop.id];
    });
  };

  // Open Rent & EMI modal for a specific laptop or generic
  const handleOpenRentEmi = (laptop: Laptop, mode: 'rent' | 'emi') => {
    setRentEmiModalLaptop(laptop);
    setRentEmiModalMode(mode);
    setIsRentEmiModalOpen(true);
  };

  // Quick category switch
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Smooth scroll down to catalog
    const catalogEl = document.getElementById('catalog');
    catalogEl?.scrollIntoView({ behavior: 'smooth' });
  };

  // Dynamic Category definitions with live inventory counts
  const categoryList = useMemo(() => {
    const counts = {
      all: LAPTOP_INVENTORY.length,
      business: LAPTOP_INVENTORY.filter(
        (l) =>
          l.model.toLowerCase().includes('latitude') ||
          l.model.toLowerCase().includes('think') ||
          l.model.toLowerCase().includes('elitebook') ||
          l.model.toLowerCase().includes('probook')
      ).length,
      student: LAPTOP_INVENTORY.filter((l) => l.sellingPrice !== null && l.sellingPrice <= 18000).length,
      gaming: LAPTOP_INVENTORY.filter((l) => l.hasDedicatedGraphics).length,
      i3: LAPTOP_INVENTORY.filter((l) => l.processorCategory === 'Intel Core i3').length,
      i5: LAPTOP_INVENTORY.filter((l) => l.processorCategory === 'Intel Core i5').length,
      i7: LAPTOP_INVENTORY.filter((l) => l.processorCategory === 'Intel Core i7').length,
      ryzen: LAPTOP_INVENTORY.filter((l) => l.processorCategory === 'AMD Ryzen').length,
    };

    return [
      { id: 'all', name: 'All Laptops', count: counts.all, icon: LaptopIcon, description: 'Complete verified stock' },
      { id: 'business', name: 'Business Laptops', count: counts.business, icon: Briefcase, description: 'Latitude, ThinkPad & EliteBook' },
      { id: 'student', name: 'Student Laptops', count: counts.student, icon: GraduationCap, description: 'Under ₹18,000 budget' },
      { id: 'gaming', name: 'Gaming / GPU', count: counts.gaming, icon: Gamepad2, description: 'Dedicated NVIDIA/Radeon' },
      { id: 'i3', name: 'Intel Core i3', count: counts.i3, icon: Cpu, description: 'Everyday computing' },
      { id: 'i5', name: 'Intel Core i5', count: counts.i5, icon: Cpu, description: 'Workhorse multitasking' },
      { id: 'i7', name: 'Intel Core i7', count: counts.i7, icon: Cpu, description: 'High performance' },
      { id: 'ryzen', name: 'AMD Ryzen', count: counts.ryzen, icon: Cpu, description: 'Fast multicore speed' },
    ];
  }, []);

  // Today's Best Deals: Curated high value picks from inventory
  const dealLaptops = useMemo(() => {
    return LAPTOP_INVENTORY.filter(
      (l) =>
        (l.stockId === 'PT/P017' || // Latitude 7490 i7 16GB
          l.stockId === 'PT/D001' || // ThinkBook 14 G2 i5 11th Gen
          l.stockId === 'PT/P007' || // Latitude 5400 i5 8th Gen
          l.stockId === 'PT/P038') // EliteBook 840 G5
    ).slice(0, 4);
  }, []);

  // Filtered Inventory
  const filteredLaptops = useMemo(() => {
    return LAPTOP_INVENTORY.filter((laptop) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const queryTerms = searchQuery.toLowerCase().trim().split(/\s+/);
        const matchesAll = queryTerms.every((term) =>
          laptop.searchableText.includes(term)
        );
        if (!matchesAll) return false;
      }

      // 2. Hub / Branch
      if (filters.branch !== 'All' && laptop.branch !== filters.branch) {
        return false;
      }

      // 3. Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'business') {
          const m = laptop.model.toLowerCase();
          if (
            !m.includes('latitude') &&
            !m.includes('think') &&
            !m.includes('elitebook') &&
            !m.includes('probook')
          ) {
            return false;
          }
        } else if (selectedCategory === 'student') {
          if (!laptop.hasPrice || laptop.sellingPrice === null || laptop.sellingPrice > 18000) {
            return false;
          }
        } else if (selectedCategory === 'gaming') {
          if (!laptop.hasDedicatedGraphics) return false;
        } else if (selectedCategory === 'i3') {
          if (laptop.processorCategory !== 'Intel Core i3') return false;
        } else if (selectedCategory === 'i5') {
          if (laptop.processorCategory !== 'Intel Core i5') return false;
        } else if (selectedCategory === 'i7') {
          if (laptop.processorCategory !== 'Intel Core i7') return false;
        } else if (selectedCategory === 'ryzen') {
          if (laptop.processorCategory !== 'AMD Ryzen') return false;
        }
      }

      // 4. Brands
      if (filters.brands.length > 0 && !filters.brands.includes(laptop.brand)) {
        return false;
      }

      // 5. Processor Series
      if (
        filters.processors.length > 0 &&
        !filters.processors.includes(laptop.processorCategory)
      ) {
        return false;
      }

      // 6. Generations
      if (
        filters.generations.length > 0 &&
        (laptop.generation === null || !filters.generations.includes(laptop.generation))
      ) {
        return false;
      }

      // 7. RAM
      if (filters.ram.length > 0 && !filters.ram.includes(laptop.ramGb)) {
        return false;
      }

      // 8. Storage Types
      if (
        filters.storageTypes.length > 0 &&
        !filters.storageTypes.includes(laptop.storageType)
      ) {
        return false;
      }

      // 9. Dedicated Graphics
      if (filters.hasDedicatedGraphics === true && !laptop.hasDedicatedGraphics) {
        return false;
      }

      // 10. Display Classes
      if (
        filters.displayClasses.length > 0 &&
        !filters.displayClasses.includes(laptop.displayClass)
      ) {
        return false;
      }

      // 11. Price Preset & Unpriced
      if (!filters.includeUnpriced && !laptop.hasPrice) {
        return false;
      }

      if (filters.pricePreset) {
        if (!laptop.hasPrice || laptop.sellingPrice === null) return false;
        const p = laptop.sellingPrice;
        if (filters.pricePreset === 'under12k' && p >= 12000) return false;
        if (filters.pricePreset === 'k12to15' && (p < 12000 || p > 15000)) return false;
        if (filters.pricePreset === 'k15to20' && (p < 15000 || p > 20000)) return false;
        if (filters.pricePreset === 'k20to25' && (p < 20000 || p > 25000)) return false;
        if (filters.pricePreset === 'k25to30' && (p < 25000 || p > 30000)) return false;
        if (filters.pricePreset === 'above30k' && p < 30000) return false;
      }

      return true;
    });
  }, [searchQuery, filters, selectedCategory]);

  // Sorting
  const sortedLaptops = useMemo(() => {
    return [...filteredLaptops].sort((a, b) => {
      if (sortOption === 'price-asc') {
        if (a.sellingPrice === null && b.sellingPrice === null) return 0;
        if (a.sellingPrice === null) return 1;
        if (b.sellingPrice === null) return -1;
        return a.sellingPrice - b.sellingPrice;
      }
      if (sortOption === 'price-desc') {
        if (a.sellingPrice === null && b.sellingPrice === null) return 0;
        if (a.sellingPrice === null) return 1;
        if (b.sellingPrice === null) return -1;
        return b.sellingPrice - a.sellingPrice;
      }
      if (sortOption === 'ram-desc') {
        return b.ramGb - a.ramGb;
      }
      if (sortOption === 'gen-desc') {
        return (b.generation || 0) - (a.generation || 0);
      }
      if (sortOption === 'brand-asc') {
        return a.brand.localeCompare(b.brand);
      }
      // 'recommended' default: prioritize newer generation & complete specs
      return (b.generation || 0) - (a.generation || 0);
    });
  }, [filteredLaptops, sortOption]);

  // Separate priced vs unpriced
  const { pricedLaptops, unpricedLaptops } = useMemo(() => {
    return {
      pricedLaptops: sortedLaptops.filter((l) => l.hasPrice),
      unpricedLaptops: sortedLaptops.filter((l) => !l.hasPrice),
    };
  }, [sortedLaptops]);

  // Compared laptops array
  const comparedLaptops = useMemo(() => {
    return LAPTOP_INVENTORY.filter((l) => comparedLaptopIds.includes(l.id));
  }, [comparedLaptopIds]);

  // Wishlisted laptops array
  const wishlistedLaptops = useMemo(() => {
    return LAPTOP_INVENTORY.filter((l) => wishlistedLaptopIds.includes(l.id));
  }, [wishlistedLaptopIds]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters(INITIAL_FILTERS);
    setSelectedCategory('all');
    setSortOption('recommended');
    showToast('Filters cleared.');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    filters.branch !== 'All' ||
    filters.pricePreset !== null ||
    filters.brands.length > 0 ||
    filters.processors.length > 0 ||
    filters.ram.length > 0 ||
    filters.storageTypes.length > 0 ||
    filters.hasDedicatedGraphics !== null ||
    filters.displayClasses.length > 0 ||
    selectedCategory !== 'all';

  return (
    <div className="min-h-screen bg-[#F8FBF9] dark:bg-[#090E11] flex flex-col font-['Poppins'] text-[#101828] dark:text-[#F8FAFC] antialiased selection:bg-[#009B69] selection:text-white dark:selection:bg-[#10B981] dark:selection:text-[#04251B] transition-colors duration-300">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* 1. Announcement Bar (Section 4) */}
      <AnnouncementBar
        onSelectHub={(hub) => {
          setFilters((prev) => ({ ...prev, branch: hub }));
        }}
      />

      {/* 2. Main Navigation Header (Section 5) */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBranch={filters.branch}
        onSelectBranch={(b) => setFilters((prev) => ({ ...prev, branch: b }))}
        puneCount={INVENTORY_STATS.puneCount}
        delhiCount={INVENTORY_STATS.delhiCount}
        totalCount={INVENTORY_STATS.total}
        comparedCount={comparedLaptopIds.length}
        wishlistedCount={wishlistedLaptopIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onSelectLaptopFromSearch={(laptop) => {
          setActiveDetailsLaptop(laptop);
        }}
      />

      {/* 3. Hero Section (Section 6) */}
      <HeroSection
        onExploreClick={() => {
          const el = document.getElementById('catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        totalLaptops={INVENTORY_STATS.total}
        puneCount={INVENTORY_STATS.puneCount}
        delhiCount={INVENTORY_STATS.delhiCount}
        onSelectHub={(hub) => {
          setFilters((prev) => ({ ...prev, branch: hub }));
          const el = document.getElementById('catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Featured Laptop Categories (Section 7) */}
      <FeaturedCategories
        categories={categoryList}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 5. Today's Best Deals (Section 14) */}
      <DealsSection
        dealLaptops={dealLaptops}
        onViewDetails={setActiveDetailsLaptop}
        onOpenWhatsApp={handleDirectWhatsAppEnquiry}
      />

      {/* 6. Main Laptop Inventory & Advanced Filter Section (Section 8, 9, 10, 11) */}
      <main id="catalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Catalog Section Header & Sorting Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#152227] p-5 sm:p-6 rounded-[22px] border border-[#E3EBE7] dark:border-[#22353D] shadow-sm transition-all duration-300">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#009B69] dark:bg-[#10B981] animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white tracking-tight">
                All Verified Laptop Inventory
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-['Poppins']">
              Showing <strong className="text-[#007A52] dark:text-[#34D399] font-mono font-bold">{sortedLaptops.length}</strong> of{' '}
              <strong className="text-zinc-700 dark:text-zinc-300 font-mono font-semibold">{LAPTOP_INVENTORY.length}</strong> units in physical stock
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            {/* Mobile Filter Sheet Trigger Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterDrawerOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[12px] bg-white hover:bg-[#E8F7EE] dark:bg-[#152227] dark:hover:bg-[#1B2B32] text-[#007A52] dark:text-[#34D399] font-['Poppins'] font-semibold text-xs border border-[#C8DFD4] dark:border-[#26443B] cursor-pointer transition-all duration-300 shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white dark:bg-[#10191E] border border-[#D1DFD8] dark:border-[#273E47] rounded-[12px] px-3.5 py-2.5 text-zinc-900 dark:text-white font-['Poppins'] font-medium text-xs focus:ring-2 focus:ring-[#009B69] dark:focus:ring-[#10B981] focus:border-[#009B69] dark:focus:border-[#10B981] outline-none cursor-pointer transition-all duration-300 shadow-xs"
                >
                  <option value="recommended">Recommended Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="gen-desc">Generation: Newest First</option>
                  <option value="ram-desc">RAM: Highest First</option>
                  <option value="brand-asc">Brand: A–Z</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-3 py-2.5 rounded-[12px] bg-[#E8F7EE] dark:bg-[#10B981]/15 hover:bg-[#D5EFE0] dark:hover:bg-[#10B981]/25 text-[#007A52] dark:text-[#34D399] font-['Poppins'] font-semibold text-xs border border-[#C8DFD4] dark:border-[#10B981]/30 transition-all duration-300 cursor-pointer"
                title="Clear all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips Row */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs py-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mr-1">Active Filters:</span>
            {filters.branch !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-[#E8F7EE] dark:bg-[#10B981]/15 border border-[#C8DFD4] dark:border-[#10B981]/30 text-[#007A52] dark:text-[#34D399] px-3 py-1 rounded-[10px] font-medium shadow-xs">
                Hub: {filters.branch}
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, branch: 'All' }))}
                  className="hover:text-red-500 ml-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-[#E8F7EE] dark:bg-[#10B981]/15 border border-[#C8DFD4] dark:border-[#10B981]/30 text-[#007A52] dark:text-[#34D399] px-3 py-1 rounded-[10px] font-medium shadow-xs">
                Category: {selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-red-500 ml-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.brands.map((b) => (
              <span key={b} className="inline-flex items-center gap-1 bg-[#E8F7EE] dark:bg-[#10B981]/15 border border-[#C8DFD4] dark:border-[#10B981]/30 text-[#007A52] dark:text-[#34D399] px-3 py-1 rounded-[10px] font-medium shadow-xs">
                Brand: {b}
                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      brands: prev.brands.filter((x) => x !== b),
                    }))
                  }
                  className="hover:text-red-500 ml-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-[#E8F7EE] dark:bg-[#10B981]/15 border border-[#C8DFD4] dark:border-[#10B981]/30 text-[#007A52] dark:text-[#34D399] px-3 py-1 rounded-[10px] font-medium shadow-xs">
                Search: "{searchQuery}"
                <button type="button" onClick={() => setSearchQuery('')} className="hover:text-red-500 ml-1 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#009B69] dark:text-[#10B981] hover:underline font-semibold ml-1 cursor-pointer transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* 2-Column Split: Filter Sidebar (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalMatches={sortedLaptops.length}
            />
          </div>

          {/* Product Grid (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            {sortedLaptops.length === 0 ? (
              <div className="bg-white dark:bg-[#152227] rounded-[22px] border border-[#E3EBE7] dark:border-[#22353D] p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] rounded-full flex items-center justify-center mx-auto border border-[#C8DFD4] dark:border-[#10B981]/30">
                  <Inbox className="w-8 h-8 text-[#009B69] dark:text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white">No matching laptops found</h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mt-1 font-['Poppins']">
                    No laptops match your selected filters or search keywords. Clear your filters to explore all 91 laptops in our Pune and Delhi inventory.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] font-['Poppins'] text-[15px] font-semibold transition-all duration-300 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <>
                {/* Available Stock Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-stretch">
                  {pricedLaptops.map((laptop) => (
                    <ProductCard
                      key={laptop.id}
                      laptop={laptop}
                      onViewDetails={setActiveDetailsLaptop}
                      onOpenWhatsApp={handleDirectWhatsAppEnquiry}
                      onShareLaptop={setActiveShareLaptop}
                      isCompared={comparedLaptopIds.includes(laptop.id)}
                      onToggleCompare={handleToggleCompare}
                      isWishlisted={wishlistedLaptopIds.includes(laptop.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onOpenRentEmi={handleOpenRentEmi}
                    />
                  ))}
                </div>

                {/* Unpriced Section */}
                {unpricedLaptops.length > 0 && (
                  <div className="pt-8 border-t border-[#E3EBE7] dark:border-[#22353D] space-y-4">
                    <div className="bg-[#F8FBF9] dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs transition-colors">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#009B69] dark:text-[#10B981]" />
                          <span>Unpriced Physical Stock ({unpricedLaptops.length} Units)</span>
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-['Poppins']">
                          Physically in showroom stock. Price is quoted immediately on WhatsApp based on your preferred configuration.
                        </p>
                      </div>
                      <a
                        href="https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20want%20to%20enquire%20about%20your%20unpriced%20laptop%20inventory."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] font-bold text-xs transition-colors self-start sm:self-auto shadow-xs"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white dark:text-[#04251B] shrink-0" />
                        <span>Enquire All Prices</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-stretch">
                      {unpricedLaptops.map((laptop) => (
                        <ProductCard
                          key={laptop.id}
                          laptop={laptop}
                          onViewDetails={setActiveDetailsLaptop}
                          onOpenWhatsApp={handleDirectWhatsAppEnquiry}
                          onShareLaptop={setActiveShareLaptop}
                          isCompared={comparedLaptopIds.includes(laptop.id)}
                          onToggleCompare={handleToggleCompare}
                          isWishlisted={wishlistedLaptopIds.includes(laptop.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onOpenRentEmi={handleOpenRentEmi}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* 7. Why Choose PunarTech? (Section 15) */}
      <WhyChooseUs />

      {/* 8. How It Works (Section 16) */}
      <HowItWorks
        onExploreClick={() => {
          const el = document.getElementById('catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 9. Laptop Rental & Easy EMI Plans (New Core Feature) */}
      <RentalAndEmiSection
        onOpenRentModal={(mode, laptop) =>
          handleOpenRentEmi(laptop || LAPTOP_INVENTORY[0], mode)
        }
      />

      {/* 10. Customer Feedback & Testimonials (Section 17) */}
      <TestimonialsSection />

      {/* 10. Frequently Asked Questions (Section 18) */}
      <FAQSection />

      {/* 11. WhatsApp Contact Section (Section 19) */}
      <WhatsAppContactSection />

      {/* 12. Professional Footer (Section 24) */}
      <Footer
        onSelectBranch={(b) => {
          setFilters((prev) => ({ ...prev, branch: b }));
        }}
        onSelectCategory={(cat) => {
          handleSelectCategory(cat);
        }}
        onOpenFAQ={() => {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Mobile Bottom Sticky Navigation Action Bar */}
      <nav
        aria-label="Mobile quick actions"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-3 py-2.5 flex items-center justify-between gap-2 shadow-lg transition-colors"
      >
        <div className="flex items-center gap-1.5 flex-1">
          <button
            type="button"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                branch: prev.branch === 'Pune' ? 'All' : 'Pune',
              }))
            }
            className={`flex-1 py-2 px-1.5 rounded-[12px] text-center text-[11px] font-['Poppins'] font-semibold border transition-all duration-300 cursor-pointer truncate ${
              filters.branch === 'Pune'
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                : 'bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 text-zinc-800 border-zinc-300 dark:border-zinc-700'
            }`}
          >
            <span>Pune (60)</span>
          </button>
          <button
            type="button"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                branch: prev.branch === 'Delhi' ? 'All' : 'Delhi',
              }))
            }
            className={`flex-1 py-2 px-1.5 rounded-[12px] text-center text-[11px] font-['Poppins'] font-semibold border transition-all duration-300 cursor-pointer truncate ${
              filters.branch === 'Delhi'
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                : 'bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 text-zinc-800 border-zinc-300 dark:border-zinc-700'
            }`}
          >
            <span>Delhi (31)</span>
          </button>
        </div>

        <a
          href="https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20want%20to%20enquire%20about%20your%20laptops%20inventory."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.4] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:opacity-95 text-white dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B] text-xs font-['Poppins'] font-semibold shadow-md active:scale-95 transition-all truncate"
        >
          <WhatsAppIcon className="w-4 h-4 text-white dark:text-[#04251B] shrink-0" />
          <span className="truncate">Chat: +91 80550 35502</span>
        </a>
      </nav>

      {/* Floating Compare Bar */}
      <CompareBar
        comparedLaptops={comparedLaptops}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onRemoveFromCompare={(id) =>
          setComparedLaptopIds((prev) => prev.filter((x) => x !== id))
        }
        onClearAll={() => setComparedLaptopIds([])}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsAppButton />

      {/* Modals */}
      {/* 1. Full Product Details Quick View Modal */}
      <ProductDetailsModal
        laptop={activeDetailsLaptop}
        isOpen={Boolean(activeDetailsLaptop)}
        onClose={() => setActiveDetailsLaptop(null)}
        onOpenWhatsApp={handleDirectWhatsAppEnquiry}
        onShareLaptop={(laptop) => setActiveShareLaptop(laptop)}
        onOpenRentEmi={handleOpenRentEmi}
      />

      {/* 2. Side-by-Side Comparison Modal (Up to 4 Laptops) */}
      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedLaptops={comparedLaptops}
        onRemoveFromCompare={(id) =>
          setComparedLaptopIds((prev) => prev.filter((x) => x !== id))
        }
        onClearAll={() => setComparedLaptopIds([])}
        onOpenWhatsApp={handleDirectWhatsAppEnquiry}
      />

      {/* 3. Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedLaptops={wishlistedLaptops}
        onRemoveFromWishlist={(id) =>
          setWishlistedLaptopIds((prev) => prev.filter((x) => x !== id))
        }
        onClearWishlist={() => setWishlistedLaptopIds([])}
        onViewDetails={setActiveDetailsLaptop}
        onOpenWhatsApp={handleDirectWhatsAppEnquiry}
      />

      {/* 4. Share Laptop Details Modal */}
      <ShareModal
        laptop={activeShareLaptop}
        isOpen={Boolean(activeShareLaptop)}
        onClose={() => setActiveShareLaptop(null)}
        onNotify={showToast}
      />

      {/* 5. Laptop Rental & Easy EMI Calculator Modal */}
      <RentalEmiModal
        laptop={rentEmiModalLaptop}
        isOpen={isRentEmiModalOpen}
        onClose={() => setIsRentEmiModalOpen(false)}
        initialMode={rentEmiModalMode}
      />

      {/* 5. Mobile Slide-in Filter Drawer with Sticky Header & Sticky Results Footer */}
      {isMobileFilterDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter laptops drawer"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs lg:hidden"
        >
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setIsMobileFilterDrawerOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#181818] h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-200 border-l border-[#E5E5E5] dark:border-[#2D2D2D]">
            {/* Sticky Drawer Header */}
            <div className="sticky top-0 z-20 px-4 py-3.5 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md border-b border-[#E5E5E5] dark:border-[#2D2D2D] flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#111111] dark:text-white" />
                <span className="font-['Urbanist'] font-bold text-base text-[#111111] dark:text-white">Filter Laptops</span>
                {hasActiveFilters && (
                  <span className="text-[10px] font-mono font-bold text-[#111111] dark:text-white bg-[#F7F7F7] dark:bg-[#252525] px-2 py-0.5 rounded-full border border-[#D9D9D9] dark:border-[#3A3A3A]">
                    Active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-['Poppins'] font-semibold text-[#777777] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterDrawerOpen(false)}
                  className="p-1.5 rounded-[10px] text-[#777777] dark:text-[#999999] hover:text-[#111111] dark:hover:text-white hover:bg-[#F2F2F2] dark:hover:bg-[#252525] transition-colors cursor-pointer"
                  aria-label="Close filters drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Filters Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
                totalMatches={sortedLaptops.length}
                isMobileDrawer={true}
                hideHeader={true}
                onCloseMobileDrawer={() => setIsMobileFilterDrawerOpen(false)}
              />
            </div>

            {/* Sticky Drawer Footer with Live Match Count */}
            <div className="sticky bottom-0 z-20 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md border-t border-[#E5E5E5] dark:border-[#2D2D2D] p-4 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-6px_20px_rgba(0,0,0,0.3)] shrink-0 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-['Poppins']">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#111111] dark:bg-white animate-pulse" />
                  <span className="text-[#777777] dark:text-[#999999] font-medium">Matching inventory:</span>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm text-[#111111] dark:text-white bg-[#F7F7F7] dark:bg-[#252525] px-2.5 py-0.5 rounded-[8px] border border-[#E5E5E5] dark:border-[#2D2D2D] tabular-nums">
                  {sortedLaptops.length} {sortedLaptops.length === 1 ? 'laptop' : 'laptops'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="py-3 px-3.5 rounded-[12px] border border-[#D9D9D9] dark:border-[#3A3A3A] hover:bg-[#F2F2F2] dark:hover:bg-[#252525] text-[#111111] dark:text-white font-['Poppins'] font-semibold text-xs transition-all duration-300 shrink-0 cursor-pointer"
                    title="Reset all filters"
                  >
                    Clear
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileFilterDrawerOpen(false);
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 px-4 bg-[#111111] hover:bg-[#333333] dark:bg-white dark:hover:bg-[#E6E6E6] active:scale-[0.98] text-white dark:text-[#111111] font-['Poppins'] text-[15px] font-semibold rounded-[12px] shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {sortedLaptops.length === 0
                      ? 'No Laptops Match'
                      : `Show ${sortedLaptops.length} ${sortedLaptops.length === 1 ? 'Laptop' : 'Laptops'}`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Admin Inventory Management Portal */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        laptops={LAPTOP_INVENTORY}
      />
    </div>
  );
}
