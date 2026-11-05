import React, { useState, useRef, useEffect } from 'react';
import { PunarTechLogo } from './icons/PunarTechLogo';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG, Laptop, LAPTOP_INVENTORY } from '../data/laptops';
import { ThemeToggle } from './ThemeToggle';
import {
  Search,
  X,
  ExternalLink,
  MapPin,
  Heart,
  Scale,
  Shield,
  Menu,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Percent,
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
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Autocomplete matching items (top 5 matches)
  const autocompleteResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    return LAPTOP_INVENTORY.filter((laptop) =>
      laptop.searchableText.includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  // Handle outside click to close autocomplete
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#090E11]/95 backdrop-blur-md border-b border-[#E3EBE7] dark:border-[#22353D] shadow-2xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-14 sm:h-18 md:h-20">
          {/* LEFT: Logo & Brand Tagline */}
          <div className="shrink-0 flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectBranch('All');
                onSearchChange('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group cursor-pointer"
              title="PunarTech - Premium Laptops. Smarter Prices."
            >
              <PunarTechLogo size="lg" />
            </a>
          </div>

          {/* CENTER: Smart Search Bar with Autocomplete Dropdown */}
          <div
            ref={searchContainerRef}
            className="flex-1 max-w-xl relative hidden md:block"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Search className="w-4 h-4 text-[#007A52] dark:text-[#34D399]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder="Search laptops by brand, model or processor..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#F8FBF9] dark:bg-[#10191E] border border-[#E3EBE7] dark:border-[#22353D] rounded-[12px] text-sm font-['Poppins'] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:bg-white dark:focus:bg-[#152227] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Smart Autocomplete Dropdown */}
            {isSearchFocused && autocompleteResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#152227] rounded-[20px] shadow-xl border border-[#E3EBE7] dark:border-[#22353D] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-2 bg-[#F8FBF9] dark:bg-[#0E1519] border-b border-[#E3EBE7] dark:border-[#22353D] flex items-center justify-between text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-['Poppins']">
                  <span>Suggested Matches ({autocompleteResults.length})</span>
                  <span className="text-[#007A52] dark:text-[#34D399] font-mono">PunarTech Stock</span>
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-80 overflow-y-auto">
                  {autocompleteResults.map((laptop) => (
                    <button
                      key={laptop.id}
                      type="button"
                      onClick={() => {
                        onSelectLaptopFromSearch?.(laptop);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left p-3 hover:bg-[#F0FDF4] dark:hover:bg-zinc-800/80 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-mono font-bold text-[#007A52] dark:text-[#34D399] bg-[#E8F7EE] dark:bg-[#10B981]/15 px-1.5 py-0.2 rounded border border-[#C8DFD4] dark:border-[#10B981]/30">
                            {laptop.stockId}
                          </span>
                          <span className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-[#009B69] dark:group-hover:text-[#10B981] group-hover:underline transition-colors truncate font-['Urbanist']">
                            {laptop.fullName}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate font-['Poppins']">
                          {laptop.processor} • {laptop.ram} • {laptop.storageRaw} • {laptop.branch} Hub
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-zinc-900 dark:text-white font-mono">
                          {laptop.hasPrice && laptop.sellingPrice
                            ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                            : 'Price on Req'}
                        </span>
                        <span className="text-[10px] block text-[#007A52] dark:text-[#34D399] font-semibold">
                          View Specs
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* NAVIGATION: Hub Tabs & Quick Actions (Poppins, 16px, weight 500) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#F6F9F8] dark:bg-[#0E1519] p-1 rounded-[14px] border border-[#E3EBE7] dark:border-[#22353D] font-['Poppins'] text-[15px] font-medium">
            <button
              type="button"
              onClick={() => onSelectBranch('All')}
              className={`px-3.5 py-1.5 rounded-[10px] text-[14px] font-medium transition-all duration-300 cursor-pointer ${
                selectedBranch === 'All'
                  ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-semibold dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-[#009B69] dark:hover:text-[#10B981]'
              }`}
            >
              All Laptops ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => onSelectBranch('Pune')}
              className={`px-3.5 py-1.5 rounded-[10px] text-[14px] font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                selectedBranch === 'Pune'
                  ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-semibold dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-[#009B69] dark:hover:text-[#10B981]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Pune Hub ({puneCount})</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectBranch('Delhi')}
              className={`px-3.5 py-1.5 rounded-[10px] text-[14px] font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                selectedBranch === 'Delhi'
                  ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-semibold dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-[#009B69] dark:hover:text-[#10B981]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Delhi Hub ({delhiCount})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('rental-emi');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-[10px] text-[14px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-[#007A8D] dark:hover:text-[#38BDF8] hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 transition-all duration-300 cursor-pointer flex items-center gap-1"
              title="Explore monthly rental and easy EMI plans"
            >
              <Percent className="w-3.5 h-3.5 text-[#007A8D] dark:text-[#38BDF8]" />
              <span>Rent &amp; EMI</span>
            </button>
          </nav>

          {/* RIGHT: Actions (ThemeToggle, Compare, Wishlist, WhatsApp Group, Admin, Menu) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Theme Toggle (Dark / Light) */}
            <ThemeToggle />

            {/* Wishlist Shortcut */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 rounded-[12px] text-zinc-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 transition-all duration-300 border border-[#E3EBE7] dark:border-[#22353D] cursor-pointer"
              title="View saved laptops"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500/15" />
              {wishlistedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistedCount}
                </span>
              )}
            </button>

            {/* Compare Shortcut (Shown on tablet/desktop, or on mobile only when items are being compared) */}
            <button
              type="button"
              onClick={onOpenCompare}
              className={`${
                comparedCount > 0 ? 'flex' : 'hidden sm:flex'
              } items-center relative p-2 rounded-[12px] text-zinc-600 dark:text-zinc-300 hover:text-[#009B69] dark:hover:text-[#10B981] hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 transition-all duration-300 border border-[#E3EBE7] dark:border-[#22353D] cursor-pointer`}
              title="Compare laptops side-by-side"
              aria-label="Compare laptops"
            >
              <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-[#007A52] dark:text-[#34D399]" />
              {comparedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#009B69] text-white dark:bg-[#10B981] dark:text-[#04251B] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {comparedCount}
                </span>
              )}
            </button>

            {/* WhatsApp Community Group Button (Visible on sm+ screens; on mobile it lives inside the drawer) */}
            <a
              href={WHATSAPP_CONFIG.groupInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] font-['Poppins'] text-[13px] sm:text-[14px] font-semibold border border-transparent shadow-xs transition-all duration-300 active:scale-95"
              title="Join PunarTech WhatsApp Community for latest arrivals"
            >
              <WhatsAppIcon className="w-4 h-4 text-white dark:text-[#04251B]" />
              <span>Join Group</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80 dark:text-[#04251B]/80" />
            </a>

            {/* Store Admin Coordinator Launcher */}
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hidden md:flex items-center gap-1.5 p-2 rounded-[12px] text-zinc-600 dark:text-zinc-300 hover:text-[#007A52] dark:hover:text-[#34D399] hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 border border-[#E3EBE7] dark:border-[#22353D] transition-all duration-300 cursor-pointer font-['Poppins'] text-[13px] font-medium"
              title="Store Admin & Inventory Management"
              aria-label="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-[#007A52] dark:text-[#34D399]" />
              <span className="hidden xl:inline">Staff</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-[12px] text-zinc-700 dark:text-zinc-200 hover:text-[#007A52] dark:hover:text-[#34D399] hover:bg-[#E8F7EE] dark:hover:bg-[#10B981]/15 border border-[#E3EBE7] dark:border-[#22353D] cursor-pointer transition-all duration-300"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible only on mobile) */}
        <div className="md:hidden pb-2.5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Search className="w-4 h-4 text-[#007A52] dark:text-[#34D399]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by model, brand, processor..."
              className="w-full pl-9 pr-8 py-2 bg-[#F8FBF9] dark:bg-[#10191E] border border-[#E3EBE7] dark:border-[#22353D] rounded-[12px] font-['Poppins'] text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20 focus:bg-white dark:focus:bg-[#152227] transition-all duration-300"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Expanded Drawer/Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#E3EBE7] dark:border-[#22353D] space-y-2.5 animate-in fade-in duration-150 font-['Poppins']">
            {/* Hub Selector */}
            <div className="grid grid-cols-3 gap-1 bg-[#F6F9F8] dark:bg-[#0E1519] p-1.5 rounded-[14px] border border-[#E3EBE7] dark:border-[#22353D]">
              <button
                type="button"
                onClick={() => {
                  onSelectBranch('All');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-center text-xs font-medium rounded-[10px] transition-all duration-300 ${
                  selectedBranch === 'All'
                    ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-semibold dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B]'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectBranch('Pune');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-center text-xs font-medium rounded-[10px] flex items-center justify-center gap-1 transition-all duration-300 ${
                  selectedBranch === 'Pune'
                    ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-semibold dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B]'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Pune ({puneCount})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectBranch('Delhi');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-center text-xs font-medium rounded-[10px] flex items-center justify-center gap-1 transition-all duration-300 ${
                  selectedBranch === 'Delhi'
                    ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-semibold dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B]'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Delhi ({delhiCount})</span>
              </button>
            </div>

            {/* Mobile WhatsApp VIP Community Link */}
            <a
              href={WHATSAPP_CONFIG.groupInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] flex items-center justify-between shadow-xs transition-all duration-300 active:scale-98"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white/20 dark:bg-[#04251B]/20 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-4 h-4 text-white dark:text-[#04251B]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold font-['Urbanist'] leading-tight">Join WhatsApp VIP Community</div>
                  <div className="text-[10px] text-white/90 dark:text-[#04251B]/80 font-['Poppins']">Get instant stock arrivals &amp; alerts</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/90 dark:text-[#04251B]/90 shrink-0 ml-2" />
            </a>

            {/* Quick Actions (Compare & Wishlist) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onOpenCompare();
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-[12px] bg-white dark:bg-[#152227] text-zinc-900 dark:text-white border border-[#E3EBE7] dark:border-[#22353D] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors hover:border-[#009B69] dark:hover:border-[#10B981]"
              >
                <Scale className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
                <span>Compare {comparedCount > 0 ? `(${comparedCount})` : ''}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenWishlist();
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-[12px] bg-white dark:bg-[#152227] text-zinc-900 dark:text-white border border-[#E3EBE7] dark:border-[#22353D] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors hover:border-rose-400"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Wishlist {wishlistedCount > 0 ? `(${wishlistedCount})` : ''}</span>
              </button>
            </div>

            {/* Mobile Rent & EMI Fast Link */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('rental-emi');
                el?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-[12px] bg-white dark:bg-[#152227] text-zinc-900 dark:text-white border border-[#E3EBE7] dark:border-[#22353D] text-xs font-semibold flex items-center justify-between cursor-pointer transition-all duration-300 hover:border-[#009B69] dark:hover:border-[#10B981]"
            >
              <span className="flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-[#007A52] dark:text-[#34D399]" />
                <span>Laptop Rentals &amp; Easy EMI Plans</span>
              </span>
              <span className="text-[10px] bg-[#E8F7EE] text-[#007A52] dark:bg-[#10B981]/20 dark:text-[#34D399] px-2 py-0.5 rounded-[6px] font-bold border border-[#C8DFD4] dark:border-[#10B981]/30">
                From ₹999/mo
              </span>
            </button>

            {/* Mobile Theme Toggle Row */}
            <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8FBF9] dark:bg-[#10191E] border border-[#E3EBE7] dark:border-[#22353D]">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-200">Appearance Theme:</span>
              <ThemeToggle showLabel={true} />
            </div>

            <div className="flex items-center justify-between pt-1 px-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-white font-semibold py-1.5 hover:underline"
              >
                <Shield className="w-4 h-4 text-[#007A52] dark:text-[#34D399]" />
                <span>Coordinator Staff Portal</span>
              </button>

              <a
                href="https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20am%20browsing%20https://punartech.vercel.app/%20and%20need%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 dark:text-zinc-400 hover:text-[#007A52] dark:hover:text-[#34D399] font-mono text-[11px]"
              >
                Help: +91 80550 35502
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
