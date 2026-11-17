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
import { MobileBottomNav } from './components/MobileBottomNav';
import { FilterSidebar, FilterState, INITIAL_FILTERS } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { getModelSpecificLaptopImage } from './components/LaptopImage';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PunarTrustSection } from './components/PunarTrustSection';
import { PinCodeChecker } from './components/PinCodeChecker';
import { FAQSection } from './components/FAQSection';
import { BranchSection } from './components/BranchSection';
import { RentalAndEmiSection } from './components/RentalAndEmiSection';
import { WhatsAppContactSection } from './components/WhatsAppContactSection';
import { Footer } from './components/Footer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { ComparisonModal } from './components/ComparisonModal';
import { CompareBar } from './components/CompareBar';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ShareModal } from './components/ShareModal';
import { RentalEmiModal } from './components/RentalEmiModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Toast } from './components/Toast';
import {
  X,
  RotateCcw,
  SlidersHorizontal,
  Inbox,
  Laptop as LaptopIcon,
  Briefcase,
  GraduationCap,
  Gamepad2,
  Cpu,
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

  // Deep-link handler: auto-open laptop modal when visited via https://punartech.vercel.app/?laptop=PT/P001
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const laptopQuery = searchParams.get('laptop') || searchParams.get('id');
      const hashQuery = window.location.hash ? window.location.hash.replace('#laptop-', '') : null;
      const target = (laptopQuery || hashQuery)?.trim().toLowerCase();

      if (target) {
        const found = LAPTOP_INVENTORY.find(
          (l) =>
            l.id.toLowerCase() === target ||
            l.stockId.toLowerCase() === target ||
            l.stockId.toLowerCase().replace(/[^a-z0-9]/g, '') === target.replace(/[^a-z0-9]/g, '')
        );
        if (found) {
          setActiveDetailsLaptop(found);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Keep dynamic Open Graph, Twitter Card, and Canonical metadata synced with active view/origin
  useEffect(() => {
    try {
      const origin = window.location.origin;
      const baseUrl = origin + window.location.pathname;
      const defaultTitle = 'PunarTech - Premium Refurbished Laptops Pune & Delhi';
      const defaultDescription =
        "Explore PunarTech's verified inventory of quality refurbished laptops in Pune and Delhi. Compare specs, view prices, Rent & EMI, or enquire on WhatsApp.";
      const defaultImage = `${origin}/og-preview.jpg`;

      const title = activeDetailsLaptop
        ? `${activeDetailsLaptop.fullName} (${activeDetailsLaptop.stockId}) | PunarTech`
        : defaultTitle;
      const description = activeDetailsLaptop
        ? `${activeDetailsLaptop.fullName} — ${activeDetailsLaptop.processor}, ${activeDetailsLaptop.ram}, ${activeDetailsLaptop.storageRaw}. ${
            activeDetailsLaptop.hasPrice && activeDetailsLaptop.sellingPrice
              ? `₹${activeDetailsLaptop.sellingPrice.toLocaleString('en-IN')}`
              : 'Contact for Price'
          } at PunarTech ${activeDetailsLaptop.branch}.`
        : defaultDescription;
      const shareUrl = activeDetailsLaptop
        ? `${baseUrl}?laptop=${encodeURIComponent(activeDetailsLaptop.stockId)}`
        : baseUrl;
      const shareImage = activeDetailsLaptop
        ? `${origin}${getModelSpecificLaptopImage(activeDetailsLaptop)}`
        : defaultImage;

      document.title = title;

      const setMetaTag = (attr: 'name' | 'property', key: string, value: string) => {
        const el = document.querySelector(`meta[${attr}="${key}"]`);
        if (el) {
          el.setAttribute('content', value);
        }
      };

      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        canonicalEl.setAttribute('href', shareUrl);
      }

      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:url', shareUrl);
      setMetaTag('property', 'og:title', title);
      setMetaTag('property', 'og:description', description);
      setMetaTag('property', 'og:image', shareImage);
      setMetaTag('property', 'og:image:secure_url', shareImage);
      setMetaTag('name', 'twitter:url', shareUrl);
      setMetaTag('name', 'twitter:title', title);
      setMetaTag('name', 'twitter:description', description);
      setMetaTag('name', 'twitter:image', shareImage);
    } catch {
      // Ignore metadata update errors
    }
  }, [activeDetailsLaptop]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Direct WhatsApp Enquiry Handler
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
        showToast('Removed from saved laptops.');
        return prev.filter((id) => id !== laptop.id);
      }
      showToast(`Saved ${laptop.model} to your wishlist.`);
      return [...prev, laptop.id];
    });
  };

  // Open Rent & EMI modal
  const handleOpenRentEmi = (laptop: Laptop, mode: 'rent' | 'emi') => {
    setRentEmiModalLaptop(laptop);
    setRentEmiModalMode(mode);
    setIsRentEmiModalOpen(true);
  };

  // Quick category switch
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
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
      { id: 'gaming', name: 'Gaming / GPU', count: counts.gaming, icon: Gamepad2, description: 'Dedicated NVIDIA / Radeon' },
      { id: 'i3', name: 'Intel Core i3', count: counts.i3, icon: Cpu, description: 'Everyday computing' },
      { id: 'i5', name: 'Intel Core i5', count: counts.i5, icon: Cpu, description: 'Office multitasking' },
      { id: 'i7', name: 'Intel Core i7', count: counts.i7, icon: Cpu, description: 'High performance' },
      { id: 'ryzen', name: 'AMD Ryzen', count: counts.ryzen, icon: Cpu, description: 'Multicore speed' },
    ];
  }, []);

  // Featured Deals (4 spotlight units)
  const dealLaptops = useMemo(() => {
    return LAPTOP_INVENTORY.filter(
      (l) =>
        l.stockId === 'PT/P017' ||
        l.stockId === 'PT/D001' ||
        l.stockId === 'PT/P007' ||
        l.stockId === 'PT/P038'
    ).slice(0, 4);
  }, []);

  // Filtered Inventory
  const filteredLaptops = useMemo(() => {
    return LAPTOP_INVENTORY.filter((laptop) => {
      if (searchQuery.trim()) {
        const queryTerms = searchQuery.toLowerCase().trim().split(/\s+/);
        const matchesAll = queryTerms.every((term) => laptop.searchableText.includes(term));
        if (!matchesAll) return false;
      }

      if (filters.branch !== 'All' && laptop.branch !== filters.branch) {
        return false;
      }

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

      if (filters.brands.length > 0 && !filters.brands.includes(laptop.brand)) {
        return false;
      }

      if (filters.processors.length > 0 && !filters.processors.includes(laptop.processorCategory)) {
        return false;
      }

      if (
        filters.generations.length > 0 &&
        (laptop.generation === null || !filters.generations.includes(laptop.generation))
      ) {
        return false;
      }

      if (filters.ram.length > 0 && !filters.ram.includes(laptop.ramGb)) {
        return false;
      }

      if (filters.storageTypes.length > 0 && !filters.storageTypes.includes(laptop.storageType)) {
        return false;
      }

      if (filters.hasDedicatedGraphics === true && !laptop.hasDedicatedGraphics) {
        return false;
      }

      if (filters.displayClasses.length > 0 && !filters.displayClasses.includes(laptop.displayClass)) {
        return false;
      }

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

  const comparedLaptops = useMemo(() => {
    return LAPTOP_INVENTORY.filter((l) => comparedLaptopIds.includes(l.id));
  }, [comparedLaptopIds]);

  const wishlistedLaptops = useMemo(() => {
    return LAPTOP_INVENTORY.filter((l) => wishlistedLaptopIds.includes(l.id));
  }, [wishlistedLaptopIds]);

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
    !filters.includeUnpriced ||
    selectedCategory !== 'all';

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1116] flex flex-col text-[#17212B] dark:text-[#F1F5F9] antialiased selection:bg-[#059669] selection:text-white transition-colors pb-16 md:pb-0">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* 1. Minimal Announcement Bar */}
      <AnnouncementBar
        onSelectHub={(hub) => {
          setFilters((prev) => ({ ...prev, branch: hub }));
        }}
      />

      {/* 2. Clean Professional Navigation */}
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
        onSelectCategory={handleSelectCategory}
        onSelectBudget={(preset) => {
          setFilters((prev) => ({
            ...prev,
            pricePreset: prev.pricePreset === preset ? null : preset,
          }));
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Hero Section */}
      <HeroSection
        onExploreClick={() => {
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        totalLaptops={INVENTORY_STATS.total}
        puneCount={INVENTORY_STATS.puneCount}
        delhiCount={INVENTORY_STATS.delhiCount}
        onSelectHub={(hub) => {
          setFilters((prev) => ({ ...prev, branch: hub }));
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Shop by Category */}
      <FeaturedCategories
        categories={categoryList}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 6. Featured Laptop Deals */}
      <DealsSection
        dealLaptops={dealLaptops}
        onViewDetails={setActiveDetailsLaptop}
        onOpenWhatsApp={handleDirectWhatsAppEnquiry}
        onShareLaptop={setActiveShareLaptop}
        comparedLaptopIds={comparedLaptopIds}
        onToggleCompare={handleToggleCompare}
        wishlistedLaptopIds={wishlistedLaptopIds}
        onToggleWishlist={handleToggleWishlist}
        onOpenRentEmi={handleOpenRentEmi}
      />

      {/* 7. Main Laptop Inventory */}
      <main
        id="catalog"
        className="flex-1 w-full border-b border-[#E2E8F0] dark:border-[#1E2D38] py-14 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-6 items-start">
        {/* Catalog Header & Sorting Toolbar */}
        <div className="col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#121B22] p-5 sm:p-6 rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D9488] dark:text-[#14B8A6]">
              Live Physical Stock
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] dark:text-white tracking-tight mt-0.5">
              All Verified Refurbished Laptops
            </h2>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
              Showing{' '}
              <strong className="text-[#17212B] dark:text-white font-mono font-bold tabular-nums">
                {sortedLaptops.length}
              </strong>{' '}
              of{' '}
              <strong className="text-[#17212B] dark:text-white font-mono font-semibold tabular-nums">
                {LAPTOP_INVENTORY.length}
              </strong>{' '}
              units across Pune &amp; Delhi showrooms
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Mobile Filter Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileFilterDrawerOpen(true)}
              className="lg:hidden h-10 inline-flex items-center gap-2 px-4 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] dark:bg-[#18242D] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-white font-semibold text-xs border border-[#CBD5E1] dark:border-[#2C3F4E] cursor-pointer transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
              <span>Filters{hasActiveFilters ? ' (Active)' : ''}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <label htmlFor="catalog-sort" className="text-[#64748B] dark:text-[#94A3B8] font-medium hidden sm:inline">
                Sort
              </label>
              <select
                id="catalog-sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="h-10 bg-white dark:bg-[#18242D] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg px-3.5 text-[#17212B] dark:text-white font-semibold text-xs cursor-pointer transition-colors"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="gen-desc">Generation: Newest First</option>
                <option value="ram-desc">RAM: Highest First</option>
                <option value="brand-asc">Brand: A–Z</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-10 inline-flex items-center gap-1.5 px-3.5 rounded-lg bg-[#F8FAFC] dark:bg-[#18242D] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2D38] text-[#059669] dark:text-[#10B981] font-semibold text-xs border border-[#CBD5E1] dark:border-[#2C3F4E] transition-colors cursor-pointer"
                title="Clear all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Segment Tabs */}
        <div className="col-span-12 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            {
              id: 'all-stock',
              label: 'All Stock',
              count: LAPTOP_INVENTORY.length,
              active: selectedCategory === 'all' && filters.branch === 'All',
              action: () => {
                setSelectedCategory('all');
                setFilters((prev) => ({ ...prev, branch: 'All' }));
              },
            },
            {
              id: 'pune-hub',
              label: 'Pune Showroom',
              count: INVENTORY_STATS.puneCount,
              active: filters.branch === 'Pune',
              action: () => setFilters((prev) => ({ ...prev, branch: prev.branch === 'Pune' ? 'All' : 'Pune' })),
            },
            {
              id: 'delhi-hub',
              label: 'Delhi Showroom',
              count: INVENTORY_STATS.delhiCount,
              active: filters.branch === 'Delhi',
              action: () => setFilters((prev) => ({ ...prev, branch: prev.branch === 'Delhi' ? 'All' : 'Delhi' })),
            },
            {
              id: 'business-tab',
              label: 'Business Laptops',
              count: categoryList.find((c) => c.id === 'business')?.count || 0,
              active: selectedCategory === 'business',
              action: () => setSelectedCategory((prev) => (prev === 'business' ? 'all' : 'business')),
            },
            {
              id: 'student-tab',
              label: 'Under ₹18,000',
              count: categoryList.find((c) => c.id === 'student')?.count || 0,
              active: selectedCategory === 'student',
              action: () => setSelectedCategory((prev) => (prev === 'student' ? 'all' : 'student')),
            },
            {
              id: 'i7-tab',
              label: 'Core i7',
              count: categoryList.find((c) => c.id === 'i7')?.count || 0,
              active: selectedCategory === 'i7',
              action: () => setSelectedCategory((prev) => (prev === 'i7' ? 'all' : 'i7')),
            },
            {
              id: 'gpu-tab',
              label: 'Dedicated GPU',
              count: categoryList.find((c) => c.id === 'gaming')?.count || 0,
              active: selectedCategory === 'gaming',
              action: () => setSelectedCategory((prev) => (prev === 'gaming' ? 'all' : 'gaming')),
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={tab.action}
              className={`h-9 px-3.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer inline-flex items-center gap-2 shrink-0 border ${
                tab.active
                  ? 'bg-[#17212B] dark:bg-[#059669] text-white border-transparent'
                  : 'bg-white hover:bg-[#F1F5F9] dark:bg-[#121B22] dark:hover:bg-[#18242D] text-[#334155] dark:text-[#CBD5E1] border-[#E2E8F0] dark:border-[#1E2D38]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] font-mono tabular-nums ${
                  tab.active ? 'text-white/80' : 'text-[#64748B] dark:text-[#94A3B8]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="col-span-12 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#64748B] dark:text-[#94A3B8] font-medium">Active:</span>

            {filters.branch !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#263846] text-[#17212B] dark:text-white px-2.5 py-1 rounded-md font-medium">
                <span>Hub: {filters.branch}</span>
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, branch: 'All' }))}
                  className="text-[#64748B] hover:text-rose-600 cursor-pointer"
                  aria-label="Remove location filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#263846] text-[#17212B] dark:text-white px-2.5 py-1 rounded-md font-medium">
                <span>Category: {selectedCategory}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="text-[#64748B] hover:text-rose-600 cursor-pointer"
                  aria-label="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.pricePreset && (
              <span className="inline-flex items-center gap-1.5 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#263846] text-[#17212B] dark:text-white px-2.5 py-1 rounded-md font-medium">
                <span>Budget: {filters.pricePreset}</span>
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, pricePreset: null }))}
                  className="text-[#64748B] hover:text-rose-600 cursor-pointer"
                  aria-label="Remove budget filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.brands.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#263846] text-[#17212B] dark:text-white px-2.5 py-1 rounded-md font-medium"
              >
                <span>Brand: {b}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      brands: prev.brands.filter((x) => x !== b),
                    }))
                  }
                  className="text-[#64748B] hover:text-rose-600 cursor-pointer"
                  aria-label={`Remove brand filter ${b}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#263846] text-[#17212B] dark:text-white px-2.5 py-1 rounded-md font-medium">
                <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[#64748B] hover:text-rose-600 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#059669] dark:text-[#10B981] hover:underline font-semibold ml-1 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Desktop Filter Sidebar (3 Columns) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalMatches={sortedLaptops.length}
          />
        </div>

        {/* Product Catalog Grid Column (9 Columns Desktop / 12 Columns Mobile) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {sortedLaptops.length === 0 ? (
            <div className="bg-white dark:bg-[#121B22] rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-[#F1F5F9] dark:bg-[#18242D] text-[#059669] dark:text-[#10B981] rounded-lg flex items-center justify-center mx-auto border border-[#E2E8F0] dark:border-[#263846]">
                <Inbox className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17212B] dark:text-white">
                  No matching laptops found
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mx-auto mt-1">
                  Adjust or reset your active filters to view all {LAPTOP_INVENTORY.length} verified laptops across Pune and Delhi.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-10 inline-flex items-center gap-2 px-5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <>
              {/* Priced Inventory Grid (Uniform 24px Vertical & Horizontal Gutters) */}
              <div className="grid grid-cols-12 gap-6 items-stretch">
                {pricedLaptops.map((laptop) => (
                  <div
                    key={laptop.id}
                    className="col-span-12 sm:col-span-6 xl:col-span-4 flex"
                  >
                    <div className="w-full">
                      <ProductCard
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
                    </div>
                  </div>
                ))}
              </div>

              {/* Unpriced Physical Stock Section (Uniform 24px Gutters) */}
              {unpricedLaptops.length > 0 && (
                <div className="pt-6 border-t border-[#E2E8F0] dark:border-[#1E2D38] space-y-6">
                  <div className="bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#1E2D38] p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-[#17212B] dark:text-white">
                        Additional Physical Stock ({unpricedLaptops.length} Units)
                      </h3>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                        Available at Pune &amp; Delhi showrooms. Contact WhatsApp for configured pricing based on RAM and SSD options.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                        'Hello PunarTech, I am browsing https://punartech.vercel.app/ and want to enquire about your unpriced laptop inventory.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 inline-flex items-center gap-2 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs transition-colors self-start sm:self-auto shrink-0"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                      <span>Request Stock Prices</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-12 gap-6 items-stretch">
                    {unpricedLaptops.map((laptop) => (
                      <div
                        key={laptop.id}
                        className="col-span-12 sm:col-span-6 xl:col-span-4 flex"
                      >
                        <div className="w-full">
                          <ProductCard
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        </div>
      </main>

      {/* 8. Why Choose PunarTech, Quality Testing, Delivery Check & FAQ */}
      <WhyChooseUs />
      <PunarTrustSection />
      <PinCodeChecker />

      {/* 9. Pune & Delhi Showroom Information + Rent & EMI */}
      <BranchSection
        onSelectBranch={(branch) => setFilters((prev) => ({ ...prev, branch }))}
        puneCount={INVENTORY_STATS.puneCount}
        delhiCount={INVENTORY_STATS.delhiCount}
      />

      <RentalAndEmiSection
        onOpenRentModal={(mode, laptop) =>
          handleOpenRentEmi(laptop || LAPTOP_INVENTORY[0], mode)
        }
      />

      <FAQSection />

      {/* 10. WhatsApp Support Section */}
      <WhatsAppContactSection />

      {/* 11. Professional Footer */}
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

      {/* Floating Compare Bar */}
      <CompareBar
        comparedLaptops={comparedLaptops}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onRemoveFromCompare={(id) =>
          setComparedLaptopIds((prev) => prev.filter((x) => x !== id))
        }
        onClearAll={() => setComparedLaptopIds([])}
      />

      {/* Compact Floating WhatsApp Button */}
      <FloatingWhatsAppButton />

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav
        comparedCount={comparedLaptopIds.length}
        wishlistedCount={wishlistedLaptopIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onResetHome={() => {
          setFilters((prev) => ({ ...prev, branch: 'All' }));
          setSelectedCategory('all');
        }}
      />

      {/* Modals & Drawers */}
      <ProductDetailsModal
        laptop={activeDetailsLaptop}
        isOpen={Boolean(activeDetailsLaptop)}
        onClose={() => setActiveDetailsLaptop(null)}
        onOpenWhatsApp={handleDirectWhatsAppEnquiry}
        onShareLaptop={(laptop) => setActiveShareLaptop(laptop)}
        onOpenRentEmi={handleOpenRentEmi}
      />

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

      <ShareModal
        laptop={activeShareLaptop}
        isOpen={Boolean(activeShareLaptop)}
        onClose={() => setActiveShareLaptop(null)}
        onNotify={showToast}
      />

      <RentalEmiModal
        laptop={rentEmiModalLaptop}
        isOpen={isRentEmiModalOpen}
        onClose={() => setIsRentEmiModalOpen(false)}
        initialMode={rentEmiModalMode}
      />

      {/* Mobile Slide-Out Filter Drawer */}
      {isMobileFilterDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter laptops drawer"
          className="fixed inset-0 z-50 flex justify-end bg-[#0B1116]/65 backdrop-blur-xs lg:hidden"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsMobileFilterDrawerOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#121B22] h-full flex flex-col shadow-2xl z-10 border-l border-[#E2E8F0] dark:border-[#263846]">
            {/* Sticky Drawer Header */}
            <div className="px-4 py-3.5 bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#263846] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <span className="font-bold text-sm text-[#17212B] dark:text-white">Filter Stock</span>
                {hasActiveFilters && (
                  <span className="text-[11px] font-mono font-semibold text-[#059669] dark:text-[#10B981]">
                    (Active)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-[#0D9488] dark:text-[#14B8A6] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#18242D] transition-colors cursor-pointer"
                  aria-label="Close filters drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Filters */}
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

            {/* Sticky Drawer Footer */}
            <div className="bg-[#F8FAFC] dark:bg-[#0B1116] border-t border-[#E2E8F0] dark:border-[#263846] p-4 shrink-0 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#475569] dark:text-[#94A3B8] font-medium">
                  Matching inventory
                </span>
                <span className="font-mono font-bold text-[#17212B] dark:text-white tabular-nums">
                  {sortedLaptops.length} {sortedLaptops.length === 1 ? 'laptop' : 'laptops'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="h-10 px-3.5 rounded-lg border border-[#CBD5E1] dark:border-[#2C3F4E] bg-white dark:bg-[#18242D] text-[#17212B] dark:text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
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
                  className="flex-1 h-10 px-4 bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {sortedLaptops.length === 0
                    ? 'No Matching Laptops'
                    : `Show ${sortedLaptops.length} ${sortedLaptops.length === 1 ? 'Laptop' : 'Laptops'}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff Portal Modal */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        laptops={LAPTOP_INVENTORY}
      />
    </div>
  );
}
