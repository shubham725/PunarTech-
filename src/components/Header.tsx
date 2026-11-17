import React, { useState, useRef, useEffect } from 'react';
import { PunarTechLogo } from './icons/PunarTechLogo';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG, Laptop, LAPTOP_INVENTORY } from '../data/laptops';
import { ThemeToggle } from './ThemeToggle';
import {
  Search,
  X,
  MapPin,
  Heart,
  Scale,
  Menu,
  ChevronDown,
  ArrowRight,
  Wrench,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedBranch: 'All' | 'Pune' | 'Delhi';
  onSelectBranch: (branch: 'All' | 'Pune' | 'Delhi') => void;
  puneCount: number;
  delhiCount: number;
  totalCount: number;
  comparedCount: number;
  wishlistedCount: number;
  onOpenCompare: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onSelectLaptopFromSearch?: (laptop: Laptop) => void;
  onSelectCategory?: (category: string) => void;
  onSelectBudget?: (preset: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedBranch,
  onSelectBranch,
  puneCount,
  delhiCount,
  totalCount,
  comparedCount,
  wishlistedCount,
  onOpenCompare,
  onOpenWishlist,
  onOpenAdmin,
  onSelectLaptopFromSearch,
  onSelectCategory,
  onSelectBudget,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const autocompleteResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    return LAPTOP_INVENTORY.filter((laptop) =>
      laptop.searchableText.includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: string) => {
    onSelectCategory?.(catId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBudgetClick = (preset: string) => {
    onSelectBudget?.(preset);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0B1116]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E2D38] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Desktop Full Nav / Mobile Bar */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 h-15 sm:h-16">
          {/* Left: Mobile Hamburger + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#18242D] text-[#17212B] dark:text-[#E2E8F0] cursor-pointer shrink-0"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectBranch('All');
                onSearchChange('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="shrink-0 min-w-0 flex items-center cursor-pointer"
              title="PunarTech - Refurbished Laptops & Laptop Services"
            >
              <PunarTechLogo size="md" />
            </a>
          </div>

          {/* Center: Clean Desktop Menu matching Reference */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-[#334155] dark:text-[#CBD5E1]"
            aria-label="Primary navigation"
          >
            <button
              type="button"
              onClick={() => {
                onSelectBranch('All');
                onSelectCategory?.('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-2 rounded-lg bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              Home
            </button>

            {/* Laptops Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'laptops' ? null : 'laptops')
                }
                className="px-3 py-2 rounded-lg hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors cursor-pointer inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>Laptops</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'laptops' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#121B22] rounded-xl shadow-lg border border-[#E2E8F0] dark:border-[#1E2D38] p-2 z-50 space-y-1">
                  {[
                    { id: 'all', name: `All Verified Laptops (${totalCount})`, sub: 'Complete Pune & Delhi stock' },
                    { id: 'business', name: 'Business Laptops', sub: 'Dell Latitude, ThinkPad & EliteBook' },
                    { id: 'student', name: 'Student Laptops', sub: 'Budget-friendly under ₹18,000' },
                    { id: 'i7', name: 'Core i7 & Coding', sub: 'Multitasking & heavy workflows' },
                    { id: 'gaming', name: 'Gaming / Dedicated GPU', sub: 'NVIDIA GeForce & Radeon graphics' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleCategoryClick(item.id)}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors cursor-pointer"
                    >
                      <div className="font-bold text-xs text-[#17212B] dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        {item.sub}
                      </div>
                    </button>
                  ))}

                  <div className="border-t border-[#E2E8F0] dark:border-[#1E2D38] pt-2 px-2 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1.5">
                      Shop by Budget
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { preset: 'k12to15', label: 'Under ₹15k' },
                        { preset: 'k15to20', label: 'Under ₹20k' },
                        { preset: 'k20to25', label: 'Under ₹25k' },
                        { preset: 'above30k', label: '₹25k+' },
                      ].map((b) => (
                        <button
                          key={b.preset}
                          type="button"
                          onClick={() => handleBudgetClick(b.preset)}
                          className="px-2.5 py-1.5 rounded-md bg-[#F8FAFC] dark:bg-[#18242D] hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 text-[11px] font-semibold text-[#17212B] dark:text-[#F1F5F9] border border-[#E2E8F0] dark:border-[#263846] cursor-pointer text-left"
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectBranch(selectedBranch === 'Pune' ? 'All' : 'Pune');
                scrollToSection('catalog');
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                selectedBranch === 'Pune'
                  ? 'bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981]'
                  : 'hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
              <span>Pune Hub</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectBranch(selectedBranch === 'Delhi' ? 'All' : 'Delhi');
                scrollToSection('catalog');
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                selectedBranch === 'Delhi'
                  ? 'bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981]'
                  : 'hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#14B8A6]" />
              <span>Delhi Hub</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('rental-emi')}
              className="px-3 py-2 rounded-lg hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors cursor-pointer whitespace-nowrap"
            >
              Rent &amp; EMI
            </button>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'services' ? null : 'services')
                }
                className="px-3 py-2 rounded-lg hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors cursor-pointer inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#121B22] rounded-xl shadow-lg border border-[#E2E8F0] dark:border-[#1E2D38] p-2 z-50 space-y-1">
                  <button
                    type="button"
                    onClick={() => scrollToSection('showrooms')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors cursor-pointer flex items-start gap-2.5"
                  >
                    <Wrench className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-[#17212B] dark:text-white">
                        Laptop Repair &amp; Upgrades
                      </div>
                      <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        Pune &amp; Delhi service benches
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('puncartrust-qa')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors cursor-pointer flex items-start gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-[#17212B] dark:text-white">
                        Hardware Testing &amp; QA
                      </div>
                      <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        Battery, screen &amp; motherboard check
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('pincode-checker')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors cursor-pointer flex items-start gap-2.5"
                  >
                    <MapPin className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-[#17212B] dark:text-white">
                        PIN Code Delivery Check
                      </div>
                      <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        Check dispatch speed to your city
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('faq')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors cursor-pointer flex items-start gap-2.5"
                  >
                    <HelpCircle className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-[#17212B] dark:text-white">
                        Warranty &amp; FAQ
                      </div>
                      <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        Inspection, payment &amp; support policy
                      </div>
                    </div>
                  </button>

                  <div className="border-t border-[#E2E8F0] dark:border-[#1E2D38] pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenAdmin();
                      }}
                      className="w-full text-left px-2.5 py-2 text-[11px] font-semibold text-[#64748B] hover:text-[#17212B] dark:hover:text-white cursor-pointer"
                    >
                      Coordinator Staff Portal →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Utility Buttons + Chat on WhatsApp CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop Search Trigger */}
            <button
              type="button"
              onClick={() => {
                setDesktopSearchOpen((prev) => !prev);
                setIsSearchFocused(true);
              }}
              className={`hidden lg:inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors cursor-pointer ${
                desktopSearchOpen || searchQuery
                  ? 'border-[#059669] bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981]'
                  : 'border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#18242D] text-[#475569] dark:text-[#CBD5E1] hover:border-[#059669]'
              }`}
              aria-label="Search laptops"
              title="Search laptops"
            >
              <Search className="w-4 h-4" />
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#18242D] text-[#475569] dark:text-[#CBD5E1] hover:border-[#059669] transition-colors cursor-pointer"
              title="Saved laptops"
              aria-label="Saved laptops"
            >
              <Heart className="w-4 h-4" />
              {wishlistedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#059669] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  {wishlistedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCompare}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#18242D] text-[#475569] dark:text-[#CBD5E1] hover:border-[#059669] transition-colors cursor-pointer"
              title="Compare selected laptops"
              aria-label="Compare laptops"
            >
              <Scale className="w-4 h-4" />
              {comparedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#059669] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  {comparedCount}
                </span>
              )}
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                'Hello PunarTech, I am browsing https://punartech.vercel.app/ and want to enquire about available laptops.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Expandable Desktop Search Bar */}
        {desktopSearchOpen && (
          <div
            ref={searchContainerRef}
            className="hidden lg:block pb-3 pt-1 relative"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                autoFocus
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder="Search laptops by model, brand, processor, RAM, or Stock ID (e.g. PT/P001, Latitude, i5)..."
                className="w-full h-10 pl-10 pr-20 bg-[#F8FAFC] dark:bg-[#0F171E] text-xs sm:text-sm text-[#17212B] dark:text-[#F1F5F9] placeholder-[#64748B] border border-[#CBD5E1] dark:border-[#263846] rounded-lg"
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="p-1 text-[#64748B] hover:text-[#17212B] dark:hover:text-white cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDesktopSearchOpen(false)}
                  className="px-2 py-1 text-[11px] font-semibold text-[#64748B] hover:text-[#17212B] dark:hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              {isSearchFocused && autocompleteResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#121B22] rounded-xl shadow-lg border border-[#E2E8F0] dark:border-[#1E2D38] overflow-hidden z-50">
                  <div className="px-3.5 py-2 bg-[#F8FAFC] dark:bg-[#18242D] border-b border-[#E2E8F0] dark:border-[#1E2D38] flex items-center justify-between text-[11px] font-semibold text-[#64748B]">
                    <span>Matching Units ({autocompleteResults.length})</span>
                    <span className="font-mono text-[#059669] dark:text-[#10B981]">In Stock</span>
                  </div>
                  <div className="divide-y divide-[#E2E8F0] dark:divide-[#1E2D38] max-h-80 overflow-y-auto">
                    {autocompleteResults.map((laptop) => (
                      <button
                        key={laptop.id}
                        type="button"
                        onClick={() => {
                          onSelectLaptopFromSearch?.(laptop);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left p-3 hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-semibold text-[#059669] dark:text-[#10B981]">
                              {laptop.stockId}
                            </span>
                            <span className="text-xs font-bold text-[#17212B] dark:text-white truncate">
                              {laptop.fullName}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] truncate mt-0.5">
                            {laptop.processor} · {laptop.ram} · {laptop.storageRaw} · {laptop.branch}
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#17212B] dark:text-white shrink-0 tabular-nums">
                          {laptop.hasPrice && laptop.sellingPrice
                            ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                            : 'On Request'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Always-Visible Mobile Search Bar Row matching Mobile Template */}
        <div ref={mobileSearchRef} className="lg:hidden pb-3 pt-0.5 relative">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setIsSearchFocused(true);
              }}
              placeholder="Search laptops by model, brand, processor..."
              className="w-full h-9.5 pl-9 pr-8 bg-[#F8FAFC] dark:bg-[#0F171E] text-xs text-[#17212B] dark:text-[#F1F5F9] placeholder-[#64748B] border border-[#E2E8F0] dark:border-[#263846] rounded-lg"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-2.5 flex items-center text-[#64748B] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isSearchFocused && autocompleteResults.length > 0 && (
            <div className="mt-1.5 bg-white dark:bg-[#121B22] rounded-xl shadow-lg border border-[#E2E8F0] dark:border-[#1E2D38] overflow-hidden z-50">
              <div className="divide-y divide-[#E2E8F0] dark:divide-[#1E2D38] max-h-64 overflow-y-auto">
                {autocompleteResults.map((laptop) => (
                  <button
                    key={laptop.id}
                    type="button"
                    onClick={() => {
                      onSelectLaptopFromSearch?.(laptop);
                      setIsSearchFocused(false);
                    }}
                    className="w-full text-left p-2.5 hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#17212B] dark:text-white truncate">
                        {laptop.fullName}
                      </div>
                      <div className="text-[10px] text-[#64748B] truncate">
                        {laptop.stockId} · {laptop.processor} · {laptop.ram}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#059669] dark:text-[#10B981] shrink-0 tabular-nums">
                      {laptop.hasPrice && laptop.sellingPrice
                        ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                        : 'On Request'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#17212B]/50 backdrop-blur-xs"
          />

          <div className="relative mr-auto w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#121B22] h-full shadow-xl flex flex-col justify-between overflow-y-auto z-10 border-r border-[#E2E8F0] dark:border-[#1E2D38]">
            <div>
              <div className="px-4 h-16 border-b border-[#E2E8F0] dark:border-[#1E2D38] flex items-center justify-between">
                <PunarTechLogo size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg border border-[#E2E8F0] dark:border-[#263846] flex items-center justify-center text-[#475569] dark:text-[#94A3B8] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {/* Hub Switcher */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Showroom Inventory
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        { key: 'All', label: `All (${totalCount})` },
                        { key: 'Pune', label: `Pune (${puneCount})` },
                        { key: 'Delhi', label: `Delhi (${delhiCount})` },
                      ] as const
                    ).map((hub) => (
                      <button
                        key={hub.key}
                        type="button"
                        onClick={() => {
                          onSelectBranch(hub.key);
                          scrollToSection('catalog');
                        }}
                        className={`py-2 px-2 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                          selectedBranch === hub.key
                            ? 'bg-[#059669] text-white border-[#059669]'
                            : 'bg-[#F8FAFC] dark:bg-[#18242D] text-[#17212B] dark:text-[#F1F5F9] border-[#E2E8F0] dark:border-[#263846]'
                        }`}
                      >
                        {hub.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1.5">
                    Browse Categories
                  </span>
                  {[
                    { id: 'all', name: 'All Certified Laptops' },
                    { id: 'business', name: 'Business Series (Latitude / ThinkPad)' },
                    { id: 'student', name: 'Student Value (Under ₹18,000)' },
                    { id: 'i7', name: 'Core i7 & Coding Laptops' },
                    { id: 'gaming', name: 'Dedicated GPU Workstations' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#17212B] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] flex items-center justify-between cursor-pointer"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                    </button>
                  ))}
                </div>

                {/* Navigation Anchors */}
                <div className="space-y-1 border-t border-[#E2E8F0] dark:border-[#1E2D38] pt-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('deals')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17212B] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] cursor-pointer"
                  >
                    Today&apos;s Best Deals
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('rental-emi')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17212B] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] cursor-pointer"
                  >
                    Laptop Rental &amp; EMI
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('showrooms')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17212B] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] cursor-pointer"
                  >
                    Pune &amp; Delhi Showrooms
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('puncartrust-qa')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17212B] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] cursor-pointer"
                  >
                    Testing, Repair &amp; Warranty
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCompare();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#17212B] dark:text-[#F1F5F9] hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] flex items-center justify-between cursor-pointer"
                  >
                    <span>Compare List</span>
                    <span className="font-mono text-xs font-semibold text-[#059669]">
                      {comparedCount}/4
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#17212B] dark:hover:text-white cursor-pointer"
                  >
                    Staff Coordinator Portal
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E2E8F0] dark:border-[#1E2D38] bg-[#F8FAFC] dark:bg-[#0F171E] space-y-2">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                  'Hello PunarTech, I am browsing https://punartech.vercel.app/ and want to enquire about your laptops.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>WhatsApp {WHATSAPP_CONFIG.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
