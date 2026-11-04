import React, { useState } from 'react';
import {
  Calendar,
  CreditCard,
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Truck,
  Percent,
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { getRentalWhatsAppUrl, getEmiWhatsAppUrl } from '../utils/finance';
import { Laptop } from '../data/laptops';

interface RentalAndEmiSectionProps {
  onOpenRentModal?: (mode: 'rent' | 'emi', laptop?: Laptop) => void;
}

export const RentalAndEmiSection: React.FC<RentalAndEmiSectionProps> = ({ onOpenRentModal }) => {
  // Rental Calculator State
  const [selectedRentalTier, setSelectedRentalTier] = useState<number>(0);
  const [rentalDuration, setRentalDuration] = useState<number>(3); // 1, 3, 6, 12 months

  // EMI Calculator State
  const [emiLaptopPrice, setEmiLaptopPrice] = useState<number>(20000);
  const [emiDownPayment, setEmiDownPayment] = useState<number>(2000);
  const [emiTenure, setEmiTenure] = useState<number>(6); // 3, 6, 9, 12 months

  const rentalTiers = [
    {
      title: 'Student & Basic Core i3',
      rentPerMonth: 999,
      deposit: 2500,
      specs: 'Intel Core i3 · 4GB/8GB RAM · Fast SSD',
      bestFor: 'College coursework, browsing, basic MS Office & video calls',
    },
    {
      title: 'Office Business Core i5',
      rentPerMonth: 1399,
      deposit: 3000,
      specs: 'Intel Core i5 (6th-8th Gen) · 8GB RAM · 256GB SSD',
      bestFor: 'Work from home, accounting, coding, multitasking',
    },
    {
      title: 'High Performance Core i7',
      rentPerMonth: 1699,
      deposit: 3500,
      specs: 'Intel Core i7 · 16GB RAM · 512GB SSD',
      bestFor: 'Heavy development, design, virtualization & analytics',
    },
    {
      title: 'Apple MacBook Air / Pro',
      rentPerMonth: 2999,
      deposit: 6000,
      specs: 'Apple Retina Display · All-day Battery · macOS',
      bestFor: 'UI/UX design, iOS development, creative professionals',
    },
  ];

  const activeTier = rentalTiers[selectedRentalTier];

  // Duration discount: 6+ months gets 5% off, 12+ months gets 10% off
  const durationDiscountRate = rentalDuration >= 12 ? 0.1 : rentalDuration >= 6 ? 0.05 : 0;
  const effectiveMonthlyRent = Math.round(activeTier.rentPerMonth * (1 - durationDiscountRate));
  const totalRentForPeriod = effectiveMonthlyRent * rentalDuration;

  // EMI calculations
  const emiPrincipal = Math.max(0, emiLaptopPrice - emiDownPayment);
  const emiInterestFactor = emiTenure <= 6 ? 1.0 : emiTenure === 9 ? 1.04 : 1.06;
  const totalEmiPayable = Math.round(emiPrincipal * emiInterestFactor);
  const monthlyEmi = Math.round(totalEmiPayable / emiTenure);

  const handleRentalWhatsApp = () => {
    const text = `Hello PunarTech Team, I want to rent a laptop:
• Tier: ${activeTier.title}
• Specs: ${activeTier.specs}
• Duration: ${rentalDuration} Month(s)
• Rental Rate: Requesting customized quote (Rent on Request)
• Preferred Hub: Pune / Delhi

Please share available laptop models in this category and rental documentation requirements.`;
    window.open(`https://wa.me/918055035502?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmiWhatsApp = () => {
    const text = `Hello PunarTech Team, I want to check EMI eligibility for purchasing a laptop:
• Laptop Price Budget: ₹${emiLaptopPrice.toLocaleString('en-IN')}
• Down Payment: ₹${emiDownPayment.toLocaleString('en-IN')}
• Loan Amount: ₹${emiPrincipal.toLocaleString('en-IN')}
• Desired Tenure: ${emiTenure} Months (~₹${monthlyEmi.toLocaleString('en-IN')}/month)
• Finance Type: Cardless EMI / Credit Card / Debit Card

Please guide me with the instant 15-minute approval process.`;
    window.open(`https://wa.me/918055035502?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="rental-emi" className="py-12 sm:py-16 bg-[#F8FBF9] dark:bg-[#090E11] border-y border-[#E3EBE7] dark:border-[#22353D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] text-xs font-['Poppins'] font-semibold uppercase tracking-wider border border-[#C8DFD4] dark:border-[#10B981]/30 shadow-xs">
            <Percent className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
            <span>Flexible Purchase &amp; Rental Options</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white tracking-tight">
            Rent a Laptop or Buy on <span className="text-logo-gradient">Easy EMI</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-['Poppins']">
            Need a laptop for college or a short-term freelance contract? Want to buy a premium laptop without paying the entire amount upfront? We offer transparent <strong className="text-zinc-950 dark:text-white">monthly rentals</strong> and <strong className="text-zinc-950 dark:text-white">low-cost EMI financing</strong> across Pune and Delhi.
          </p>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Monthly Laptop Rental */}
          <div className="bg-white dark:bg-[#152227] rounded-[22px] p-6 sm:p-7 border border-[#E3EBE7] dark:border-[#22353D] flex flex-col justify-between hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-xl hover:shadow-[#009B69]/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[14px] bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] flex items-center justify-center border border-[#C8DFD4] dark:border-[#10B981]/30 shadow-xs">
                <Calendar className="w-6 h-6 text-[#009B69] dark:text-[#10B981]" />
              </div>

              <div>
                <span className="text-xs font-['Poppins'] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Short &amp; Long Term
                </span>
                <h3 className="text-xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white mt-0.5">
                  Monthly Laptop Rental
                </h3>
              </div>

              <div className="pt-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-black text-[#007A52] dark:text-[#34D399] font-['Urbanist']">
                    Rent on Request
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30">
                    Custom Quote
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-['Poppins']">
                  Undisclosed rent amount — tailored to your configuration and duration. Contact us for instant best quotation.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-zinc-200 dark:border-zinc-800 font-['Poppins']">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                  <span>Low security deposit with simple KYC</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                  <span>Free servicing &amp; instant doorstep replacement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                  <span>Pre-installed Windows 10/11 &amp; essential tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                  <span>Same-day handover in Pune &amp; Delhi hubs</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleRentalWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[12px] bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black border border-black dark:border-white text-[15px] font-['Poppins'] font-semibold shadow-xs transition-all duration-300 cursor-pointer active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Enquire Rental on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* 2. Easy EMI & Installment Purchases */}
          <div className="bg-white dark:bg-zinc-900 rounded-[22px] p-6 sm:p-7 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:shadow-lg dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[14px] bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-xs">
                <CreditCard className="w-6 h-6 text-zinc-900 dark:text-white" />
              </div>

              <div>
                <span className="text-xs font-['Poppins'] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Flexible Ownership
                </span>
                <h3 className="text-xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white mt-0.5">
                  Easy EMI Financing
                </h3>
              </div>

              <div className="pt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">EMI starts at</span>
                  <span className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white font-mono">
                    ₹1,500
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">/ month</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-['Poppins']">
                  Split your laptop cost into 3, 6, 9 or 12 monthly installments.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-zinc-200 dark:border-zinc-800 font-['Poppins']">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                  <span>0% No-Cost EMI on leading Credit Cards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                  <span>Cardless EMI via Bajaj Finserv / ZestMoney / Snapmint</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                  <span>Instant 15-minute digital approval</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                  <span>Full ownership of laptop from day one</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleEmiWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] text-[15px] font-['Poppins'] font-semibold shadow-xs transition-all duration-300 cursor-pointer active:scale-95 border border-transparent"
              >
                <WhatsAppIcon className="w-4 h-4 text-white dark:text-[#04251B]" />
                <span>Apply for EMI on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* 3. Corporate Bulk & Office Lease */}
          <div className="bg-white dark:bg-[#152227] rounded-[22px] p-6 sm:p-7 border border-[#E3EBE7] dark:border-[#22353D] flex flex-col justify-between hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-xl hover:shadow-[#009B69]/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[14px] bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] flex items-center justify-center border border-[#C8DFD4] dark:border-[#10B981]/30 shadow-xs">
                <Building2 className="w-6 h-6 text-[#009B69] dark:text-[#10B981]" />
              </div>

              <div>
                <span className="text-xs font-['Poppins'] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  B2B &amp; Startups
                </span>
                <h3 className="text-xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white mt-0.5">
                  Corporate Bulk Lease
                </h3>
              </div>

              <div className="pt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Volumes from</span>
                  <span className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white font-mono">
                    5 to 50+
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">units</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-['Poppins']">
                  Scale your IT infrastructure without capital expenditure.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-[#E3EBE7] dark:border-[#22353D] font-['Poppins']">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0" />
                  <span>GST invoice with 18% Input Tax Credit benefit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0" />
                  <span>Dedicated corporate engineer &amp; 4-hour SLA in Pune/Delhi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0" />
                  <span>Custom RAM / SSD / OS image configuration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981] shrink-0" />
                  <span>Monthly corporate billing &amp; asset tracking</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href="https://wa.me/918055035502?text=Hello%20PunarTech,%20I%20am%20looking%20for%20Corporate%20Bulk%20Laptop%20Rental%20/%20Lease%20for%20our%20company.%20Please%20share%20B2B%20catalog%20and%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] text-[15px] font-['Poppins'] font-semibold shadow-xs transition-all duration-300 cursor-pointer active:scale-95 border border-transparent"
              >
                <WhatsAppIcon className="w-4 h-4 text-white dark:text-[#04251B]" />
                <span>Get Corporate B2B Quote</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Dual Estimator Box */}
        <div className="bg-white dark:bg-[#152227] rounded-[24px] border border-[#E3EBE7] dark:border-[#22353D] p-6 sm:p-8 shadow-sm transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E3EBE7] dark:divide-[#22353D]">
            {/* Left: Interactive Rental Estimator */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-['Poppins'] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Interactive Calculator
                  </span>
                  <h3 className="text-lg sm:text-xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white">
                    1. Estimate Your Laptop Rent
                  </h3>
                </div>
                <span className="text-[11px] font-['Poppins'] font-semibold bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] px-3 py-1 rounded-full border border-[#C8DFD4] dark:border-[#10B981]/30">
                  Pune &amp; Delhi Stock
                </span>
              </div>

              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs font-['Poppins'] font-semibold text-zinc-900 dark:text-zinc-200 block">
                  Select Laptop Configuration:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {rentalTiers.map((t, idx) => (
                    <button
                      key={t.title}
                      type="button"
                      onClick={() => setSelectedRentalTier(idx)}
                      className={`p-3 rounded-[12px] border text-left transition-all duration-300 cursor-pointer ${
                        selectedRentalTier === idx
                          ? 'border-[#009B69] dark:border-[#10B981] bg-[#F0FDF4] dark:bg-[#10B981]/15 ring-2 ring-[#009B69]/20 dark:ring-[#10B981]/30 shadow-xs'
                          : 'border-[#E3EBE7] dark:border-[#22353D] bg-[#F6F9F8] dark:bg-[#0E1519] hover:bg-white dark:hover:bg-[#152227] text-zinc-900 dark:text-zinc-300'
                      }`}
                    >
                      <span className="text-xs font-['Poppins'] font-semibold text-zinc-900 dark:text-white block truncate">
                        {t.title}
                      </span>
                      <span className="text-[11px] font-semibold text-[#007A52] dark:text-[#34D399] block mt-0.5">
                        Rent on Request
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-['Poppins']">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">Rental Period:</span>
                  <span className="text-[#007A52] dark:text-[#34D399] font-semibold">
                    {rentalDuration >= 6 ? 'Includes Long-Term Discount!' : 'Flexible Tenure'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 3, 6, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setRentalDuration(m)}
                      className={`py-2 px-1 rounded-[12px] text-xs font-['Poppins'] font-semibold border transition-all duration-300 cursor-pointer text-center ${
                        rentalDuration === m
                          ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B] border-transparent shadow-xs font-bold'
                          : 'bg-white hover:bg-[#E8F7EE] dark:bg-[#10191E] text-zinc-700 dark:text-zinc-300 border-[#E3EBE7] dark:border-[#22353D]'
                      }`}
                    >
                      {m} {m === 1 ? 'Month' : 'Months'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Summary Box */}
              <div className="p-4 bg-[#F6F9F8] dark:bg-[#0E1519] rounded-[16px] border border-[#E3EBE7] dark:border-[#22353D] space-y-2.5 font-['Poppins']">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">Monthly Rental:</span>
                  <span className="font-semibold text-[#007A52] dark:text-[#34D399] text-sm">
                    Undisclosed / On Request (Contact Us)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">Rental Duration:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    {rentalDuration} {rentalDuration === 1 ? 'Month' : 'Months'} (Flexible Plan)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-[#E3EBE7] dark:border-[#22353D] pt-2">
                  <span className="text-zinc-500 dark:text-zinc-400">Security Deposit:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Nominal &amp; 100% Refundable on Return
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRentalWhatsApp}
                className="w-full py-3 px-4 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#00875A] hover:to-[#006979] dark:from-[#10B981] dark:to-[#06B6D4] text-white dark:text-[#04251B] border border-transparent font-['Poppins'] text-[15px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-all duration-300 cursor-pointer active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 text-white dark:text-[#04251B]" />
                <span>Contact Us for Rental Quote (+91 80550 35502)</span>
              </button>
            </div>

            {/* Right: Interactive EMI Estimator */}
            <div className="space-y-5 lg:pl-8 pt-8 lg:pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-['Poppins'] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    EMI Calculator
                  </span>
                  <h3 className="text-lg sm:text-xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white">
                    2. Calculate Monthly EMI
                  </h3>
                </div>
                <span className="text-[11px] font-['Poppins'] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">
                  Instant 15-Min Process
                </span>
              </div>

              {/* Laptop Price Slider / Preset */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-['Poppins']">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">Target Laptop Budget:</span>
                  <span className="font-mono font-bold text-zinc-950 dark:text-white text-sm">
                    ₹{emiLaptopPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="45000"
                  step="1000"
                  value={emiLaptopPrice}
                  onChange={(e) => setEmiLaptopPrice(Number(e.target.value))}
                  className="w-full accent-[#009B69] dark:accent-[#10B981] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                  <span>₹10,000</span>
                  <span>₹25,000</span>
                  <span>₹45,000</span>
                </div>
              </div>

              {/* Down Payment Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-['Poppins']">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">Down Payment:</span>
                  <span className="font-mono font-bold text-[#009B69] dark:text-[#10B981]">
                    ₹{emiDownPayment.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.min(15000, emiLaptopPrice - 5000)}
                  step="1000"
                  value={emiDownPayment}
                  onChange={(e) => setEmiDownPayment(Number(e.target.value))}
                  className="w-full accent-[#009B69] dark:accent-[#10B981] cursor-pointer"
                />
              </div>

              {/* Tenure Selector */}
              <div className="space-y-2">
                <label className="text-xs font-['Poppins'] font-semibold text-zinc-900 dark:text-zinc-200 block">
                  Select EMI Tenure:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { m: 3, label: '3 Months (0% Int)' },
                    { m: 6, label: '6 Months (0% Int)' },
                    { m: 9, label: '9 Months' },
                    { m: 12, label: '12 Months' },
                  ].map((item) => (
                    <button
                      key={item.m}
                      type="button"
                      onClick={() => setEmiTenure(item.m)}
                      className={`p-2 rounded-[12px] text-center border transition-all duration-300 cursor-pointer ${
                        emiTenure === item.m
                          ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white border-transparent shadow-xs font-bold'
                          : 'bg-white hover:bg-[#F0F9F5] dark:bg-zinc-800 dark:hover:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs font-['Poppins'] font-semibold block">{item.m} Mo</span>
                      <span className={`text-[9px] block font-semibold truncate ${emiTenure === item.m ? 'text-white/80' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        {item.m <= 6 ? 'No-Cost' : 'Low-Cost'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated EMI Display */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#0E1519] rounded-[16px] border border-[#E3EBE7] dark:border-[#22353D] space-y-2.5 font-['Poppins']">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Estimated Monthly EMI:</span>
                  <span className="font-mono font-bold text-[#009B69] dark:text-[#10B981] text-xl">
                    ₹{monthlyEmi.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Financed Loan Amount:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-200">
                    ₹{emiPrincipal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 font-semibold border-t border-[#E3EBE7] dark:border-[#22353D] pt-2">
                  <span>Supported Partners:</span>
                  <span className="text-[#007A8D] dark:text-[#06B6D4]">Bajaj Finserv · ZestMoney · Cards</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEmiWhatsApp}
                className="w-full py-3 px-4 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-['Poppins'] text-[15px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Check EMI Eligibility on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* How Rental & EMI Works (4 Simple Steps) */}
        <div className="space-y-4 pt-4 border-t border-[#E3EBE7] dark:border-[#22353D] font-['Poppins']">
          <h3 className="text-xl sm:text-2xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white text-center">
            How Does Laptop Rental &amp; EMI Work at PunarTech?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-5 bg-white dark:bg-[#152227] rounded-[20px] border border-[#E3EBE7] dark:border-[#22353D] space-y-2 shadow-2xs hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-xs transition-all duration-300">
              <span className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#009B69] to-[#007A8D] text-white font-bold font-mono flex items-center justify-center text-xs shadow-xs">
                1
              </span>
              <span className="font-['Urbanist'] font-bold text-zinc-950 dark:text-white block text-base">Pick Your Model</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Select any laptop from our 91 verified inventory units or pick a configuration tier.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-[#152227] rounded-[20px] border border-[#E3EBE7] dark:border-[#22353D] space-y-2 shadow-2xs hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-xs transition-all duration-300">
              <span className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#009B69] to-[#007A8D] text-white font-bold font-mono flex items-center justify-center text-xs shadow-xs">
                2
              </span>
              <span className="font-['Urbanist'] font-bold text-zinc-950 dark:text-white block text-base">Quick Digital KYC</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Share Aadhaar card / College ID / Company ID on WhatsApp (+91 80550 35502).
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-[#152227] rounded-[20px] border border-[#E3EBE7] dark:border-[#22353D] space-y-2 shadow-2xs hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-xs transition-all duration-300">
              <span className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#009B69] to-[#007A8D] text-white font-bold font-mono flex items-center justify-center text-xs shadow-xs">
                3
              </span>
              <span className="font-['Urbanist'] font-bold text-zinc-950 dark:text-white block text-base">Instant Approval</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Get approval in 15 minutes. For rentals, pay refundable deposit + 1st month rent.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-[#152227] rounded-[20px] border border-[#E3EBE7] dark:border-[#22353D] space-y-2 shadow-2xs hover:border-[#009B69] dark:hover:border-[#10B981] hover:shadow-xs transition-all duration-300">
              <span className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#009B69] to-[#007A8D] text-white font-bold font-mono flex items-center justify-center text-xs shadow-xs">
                4
              </span>
              <span className="font-['Urbanist'] font-bold text-zinc-950 dark:text-white block text-base">Hub Handover or Dispatch</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Collect physically from Pune / Delhi Hub or get fast insured doorstep delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
