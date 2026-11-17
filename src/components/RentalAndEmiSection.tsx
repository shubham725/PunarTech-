import React, { useState } from 'react';
import {
  Calendar,
  CreditCard,
  Building2,
  Check,
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { Laptop, WHATSAPP_CONFIG } from '../data/laptops';

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
      specs: 'Intel Core i3 · 4GB/8GB RAM · Fast SSD',
    },
    {
      title: 'Office Business Core i5',
      specs: 'Intel Core i5 (6th–8th Gen) · 8GB RAM · 256GB SSD',
    },
    {
      title: 'High Performance Core i7',
      specs: 'Intel Core i7 · 16GB RAM · 512GB SSD',
    },
    {
      title: 'Apple MacBook Air / Pro',
      specs: 'Apple Retina Display · All-day Battery · macOS',
    },
  ];

  const activeTier = rentalTiers[selectedRentalTier];

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
• Live Website: https://punartech.vercel.app/

Please share available laptop models in this category and rental documentation requirements.`;
    window.open(
      `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleEmiWhatsApp = () => {
    const text = `Hello PunarTech Team, I want to check EMI eligibility for purchasing a laptop:
• Laptop Price Budget: ₹${emiLaptopPrice.toLocaleString('en-IN')}
• Down Payment: ₹${emiDownPayment.toLocaleString('en-IN')}
• Loan Amount: ₹${emiPrincipal.toLocaleString('en-IN')}
• Desired Tenure: ${emiTenure} Months (~₹${monthlyEmi.toLocaleString('en-IN')}/month)
• Finance Type: Cardless EMI / Credit Card / Debit Card
• Live Website: https://punartech.vercel.app/

Please guide me with the instant 15-minute approval process.`;
    window.open(
      `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section
      id="rental-emi"
      className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-14 sm:py-16 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D9488] dark:text-[#14B8A6]">
              Flexible Financing &amp; Leasing
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] dark:text-[#F1F5F9] tracking-tight mt-1">
              Rent a Laptop or Buy on Easy EMI
            </h2>
            <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
              Short-term monthly rentals for students and project teams, plus zero-cost and low-cost EMI plans across Pune and Delhi.
            </p>
          </div>
          {onOpenRentModal && (
            <button
              type="button"
              onClick={() => onOpenRentModal('emi')}
              className="self-start md:self-auto h-10 px-4 rounded-lg bg-white dark:bg-[#121B22] hover:bg-[#F1F5F9] dark:hover:bg-[#18242D] text-[#17212B] dark:text-[#F1F5F9] border border-[#CBD5E1] dark:border-[#2C3F4E] text-xs font-semibold transition-colors cursor-pointer"
            >
              Open Quick Estimator Modal
            </button>
          )}
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-12 gap-6">
          {/* 1. Monthly Laptop Rental */}
          <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#121B22] rounded-xl p-6 border border-[#E2E8F0] dark:border-[#1E2D38] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] text-[#059669] dark:text-[#10B981] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] uppercase tracking-wider">
                  Short &amp; Long Term
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#17212B] dark:text-white">
                  Monthly Laptop Rental
                </h3>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-xl font-bold text-[#059669] dark:text-[#10B981]">
                    Rent on Request
                  </span>
                  <span className="text-[11px] font-medium text-[#475569] dark:text-[#94A3B8]">
                    Custom Quote
                  </span>
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                  Tailored monthly pricing based on configuration and rental tenure.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-[#334155] dark:text-[#CBD5E1] pt-3 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Refundable security deposit with simple KYC</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Free servicing &amp; unit replacement support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Same-day pickup in Pune &amp; Delhi showrooms</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
              <button
                type="button"
                onClick={handleRentalWhatsApp}
                className="w-full h-10 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Enquire Rental Quote</span>
              </button>
            </div>
          </div>

          {/* 2. Easy EMI & Installment Purchases */}
          <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#121B22] rounded-xl p-6 border border-[#E2E8F0] dark:border-[#1E2D38] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] text-[#059669] dark:text-[#10B981] flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] uppercase tracking-wider">
                  Flexible Ownership
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#17212B] dark:text-white">
                  Easy EMI Financing
                </h3>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="text-xs text-[#475569] dark:text-[#94A3B8]">From</span>
                  <span className="text-2xl font-bold text-[#17212B] dark:text-white font-mono tabular-nums">
                    ₹1,500
                  </span>
                  <span className="text-xs text-[#475569] dark:text-[#94A3B8]">/ month</span>
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                  Split your purchase over 3, 6, 9, or 12 monthly installments.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-[#334155] dark:text-[#CBD5E1] pt-3 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>0% No-Cost EMI options on 3 &amp; 6 month plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Cardless EMI via Bajaj Finserv, Zest &amp; Snapmint</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>15-minute digital check and immediate ownership</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
              <button
                type="button"
                onClick={handleEmiWhatsApp}
                className="w-full h-10 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Check EMI Eligibility</span>
              </button>
            </div>
          </div>

          {/* 3. Corporate Bulk & Office Lease */}
          <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#121B22] rounded-xl p-6 border border-[#E2E8F0] dark:border-[#1E2D38] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] text-[#0D9488] dark:text-[#14B8A6] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] uppercase tracking-wider">
                  B2B &amp; Teams
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#17212B] dark:text-white">
                  Corporate Bulk Lease
                </h3>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="text-xs text-[#475569] dark:text-[#94A3B8]">Batches of</span>
                  <span className="text-2xl font-bold text-[#17212B] dark:text-white font-mono tabular-nums">
                    5 – 50+
                  </span>
                  <span className="text-xs text-[#475569] dark:text-[#94A3B8]">units</span>
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                  Deploy uniform business fleets without upfront capital spend.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-[#334155] dark:text-[#CBD5E1] pt-3 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>GST invoicing with 18% Input Tax Credit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>4-hour swap SLA in Pune &amp; Delhi NCR</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                  <span>Custom RAM, SSD, and corporate OS imaging</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-[#E2E8F0] dark:border-[#1E2D38]">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                  'Hello PunarTech, I am browsing https://punartech.vercel.app/ and looking for Corporate Bulk Laptop Rental / Lease for our company. Please share B2B catalog and quotation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 px-4 rounded-lg bg-white dark:bg-[#18242D] hover:bg-[#F1F5F9] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-[#F1F5F9] border border-[#CBD5E1] dark:border-[#2C3F4E] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
                <span>Request B2B Quote</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Dual Estimator Box */}
        <div className="bg-white dark:bg-[#121B22] rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] p-6 sm:p-8">
          <div className="grid grid-cols-12 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0] dark:divide-[#1E2D38]">
            {/* Left: Interactive Rental Estimator */}
            <div className="col-span-12 lg:col-span-6 space-y-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#0D9488] dark:text-[#14B8A6] uppercase tracking-wider block">
                    Rental Configurator
                  </span>
                  <h3 className="text-lg font-bold text-[#17212B] dark:text-white mt-0.5">
                    1. Estimate Your Laptop Rent
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-[#475569] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#18242D] px-2.5 py-1 rounded-md border border-[#E2E8F0] dark:border-[#263846] shrink-0">
                  Pune &amp; Delhi
                </span>
              </div>

              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#17212B] dark:text-[#E2E8F0] block">
                  Select Laptop Configuration
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rentalTiers.map((t, idx) => (
                    <button
                      key={t.title}
                      type="button"
                      onClick={() => setSelectedRentalTier(idx)}
                      className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                        selectedRentalTier === idx
                          ? 'border-[#059669] dark:border-[#10B981] bg-[#ECFDF5] dark:bg-[#10B981]/10'
                          : 'border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#18242D] hover:bg-white dark:hover:bg-[#121B22]'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#17212B] dark:text-white block truncate">
                        {t.title}
                      </span>
                      <span className="text-[11px] text-[#059669] dark:text-[#10B981] font-medium block mt-0.5 truncate">
                        {t.specs}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#17212B] dark:text-[#E2E8F0]">Rental Duration</span>
                  <span className="text-[#059669] dark:text-[#10B981] font-medium">
                    {rentalDuration >= 6 ? 'Long-term discount eligible' : 'Standard plan'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 6, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setRentalDuration(m)}
                      className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer text-center ${
                        rentalDuration === m
                          ? 'bg-[#17212B] dark:bg-[#059669] text-white border-transparent'
                          : 'bg-white hover:bg-[#F8FAFC] dark:bg-[#18242D] dark:hover:bg-[#1E2D38] text-[#334155] dark:text-[#CBD5E1] border-[#E2E8F0] dark:border-[#263846]'
                      }`}
                    >
                      {m} {m === 1 ? 'Mo' : 'Mos'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Summary Box */}
              <div className="p-4 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Monthly Rental</span>
                  <span className="font-semibold text-[#059669] dark:text-[#10B981]">
                    Undisclosed / On Request
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Selected Duration</span>
                  <span className="font-mono font-bold text-[#17212B] dark:text-white tabular-nums">
                    {rentalDuration} {rentalDuration === 1 ? 'Month' : 'Months'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#263846] pt-2">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Security Deposit</span>
                  <span className="font-medium text-[#17212B] dark:text-[#E2E8F0]">
                    Nominal &amp; 100% Refundable
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRentalWhatsApp}
                className="w-full h-11 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Request Rental Quote (+91 80550 35502)</span>
              </button>
            </div>

            {/* Right: Interactive EMI Estimator */}
            <div className="col-span-12 lg:col-span-6 space-y-5 lg:pl-8 pt-8 lg:pt-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#0D9488] dark:text-[#14B8A6] uppercase tracking-wider block">
                    EMI Calculator
                  </span>
                  <h3 className="text-lg font-bold text-[#17212B] dark:text-white mt-0.5">
                    2. Calculate Monthly EMI
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-[#475569] dark:text-[#94A3B8] bg-[#F1F5F9] dark:bg-[#18242D] px-2.5 py-1 rounded-md border border-[#E2E8F0] dark:border-[#263846] shrink-0">
                  15-Min Approval
                </span>
              </div>

              {/* Laptop Price Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#17212B] dark:text-[#E2E8F0]">Laptop Price Budget</span>
                  <span className="font-mono font-bold text-[#17212B] dark:text-white text-sm tabular-nums">
                    ₹{emiLaptopPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="45000"
                  step="1000"
                  value={emiLaptopPrice}
                  onChange={(e) => {
                    const nextPrice = Number(e.target.value);
                    setEmiLaptopPrice(nextPrice);
                    if (emiDownPayment > nextPrice - 5000) {
                      setEmiDownPayment(Math.max(0, nextPrice - 5000));
                    }
                  }}
                  className="w-full accent-[#059669] dark:accent-[#10B981] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                  <span>₹10,000</span>
                  <span>₹25,000</span>
                  <span>₹45,000</span>
                </div>
              </div>

              {/* Down Payment Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#17212B] dark:text-[#E2E8F0]">Down Payment</span>
                  <span className="font-mono font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
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
                  className="w-full accent-[#059669] dark:accent-[#10B981] cursor-pointer"
                />
              </div>

              {/* Tenure Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#17212B] dark:text-[#E2E8F0] block">
                  Repayment Tenure
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 9, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setEmiTenure(m)}
                      className={`p-2 rounded-lg text-center border transition-colors cursor-pointer ${
                        emiTenure === m
                          ? 'bg-[#17212B] dark:bg-[#059669] text-white border-transparent'
                          : 'bg-white hover:bg-[#F8FAFC] dark:bg-[#18242D] dark:hover:bg-[#1E2D38] text-[#334155] dark:text-[#CBD5E1] border-[#E2E8F0] dark:border-[#263846]'
                      }`}
                    >
                      <span className="text-xs font-semibold block">{m} Mo</span>
                      <span
                        className={`text-[10px] block truncate ${
                          emiTenure === m ? 'text-white/80' : 'text-[#64748B] dark:text-[#94A3B8]'
                        }`}
                      >
                        {m <= 6 ? 'No-Cost' : 'Low-Cost'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated EMI Display */}
              <div className="p-4 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Estimated Monthly EMI</span>
                  <span className="font-mono font-bold text-[#059669] dark:text-[#10B981] text-lg tabular-nums">
                    ₹{monthlyEmi.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Financed Loan Amount</span>
                  <span className="font-mono font-bold text-[#17212B] dark:text-white tabular-nums">
                    ₹{emiPrincipal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#263846] pt-2 text-[11px]">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Partners</span>
                  <span className="font-semibold text-[#0D9488] dark:text-[#14B8A6]">
                    Bajaj Finserv · ZestMoney · Cards
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEmiWhatsApp}
                className="w-full h-11 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Check EMI Eligibility on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* How Rental & EMI Works (4 Simple Steps) */}
        <div className="grid grid-cols-12 gap-6">
          {[
            {
              step: '01',
              title: 'Select Configuration',
              body: 'Pick any unit from our 91 verified laptops or choose a rental tier.',
            },
            {
              step: '02',
              title: 'Share Digital KYC',
              body: 'Verify Aadhaar and student or employee ID over WhatsApp (+91 80550 35502).',
            },
            {
              step: '03',
              title: '15-Minute Approval',
              body: 'Receive instant eligibility confirmation for EMI or refundable rental deposit.',
            },
            {
              step: '04',
              title: 'Pickup or Dispatch',
              body: 'Collect from our Pune or Delhi hubs or arrange insured courier delivery.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="col-span-12 sm:col-span-6 lg:col-span-3 p-5 bg-white dark:bg-[#121B22] rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] space-y-1.5"
            >
              <span className="font-mono text-xs font-bold text-[#059669] dark:text-[#10B981]">
                STEP {item.step}
              </span>
              <h4 className="text-sm font-bold text-[#17212B] dark:text-white">{item.title}</h4>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
