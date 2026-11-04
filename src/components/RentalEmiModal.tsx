import React, { useState, useEffect } from 'react';
import { Laptop } from '../data/laptops';
import {
  X,
  Calendar,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Sparkles,
  Info,
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import {
  getLaptopRentalEstimate,
  getLaptopEmiOptions,
  getRentalWhatsAppUrl,
  getEmiWhatsAppUrl,
} from '../utils/finance';

interface RentalEmiModalProps {
  laptop: Laptop | null;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'rent' | 'emi';
}

export const RentalEmiModal: React.FC<RentalEmiModalProps> = ({
  laptop,
  isOpen,
  onClose,
  initialMode = 'rent',
}) => {
  const [activeTab, setActiveTab] = useState<'rent' | 'emi'>(initialMode);
  const [rentalMonths, setRentalMonths] = useState<number>(3);
  const [emiTenure, setEmiTenure] = useState<number>(6);
  const [emiDownPayment, setEmiDownPayment] = useState<number>(0);

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !laptop) return null;

  const rentEstimate = getLaptopRentalEstimate(laptop);
  // Rental duration discount: 6+ months gets 5% off, 12+ months gets 10% off
  const discountRate = rentalMonths >= 12 ? 0.1 : rentalMonths >= 6 ? 0.05 : 0;
  const effectiveMonthlyRent = Math.round(rentEstimate.monthlyRent * (1 - discountRate));
  const totalRent = effectiveMonthlyRent * rentalMonths;

  const laptopPrice = laptop.sellingPrice ?? 18000;
  const emiPrincipal = Math.max(0, laptopPrice - emiDownPayment);
  const emiInterestFactor = emiTenure <= 6 ? 1.0 : emiTenure === 9 ? 1.04 : 1.06;
  const totalEmiPayable = Math.round(emiPrincipal * emiInterestFactor);
  const monthlyEmi = Math.round(totalEmiPayable / emiTenure);

  const handleOpenRentalWhatsApp = () => {
    const url = getRentalWhatsAppUrl(laptop, rentalMonths, 'Personal / Work');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenEmiWhatsApp = () => {
    const url = getEmiWhatsAppUrl(laptop, emiTenure, emiDownPayment);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs font-['Poppins']">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[24px] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150 transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rental-emi-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E3EBE7] dark:border-[#22353D] bg-[#F8FBF9] dark:bg-[#0E1519] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#007A8D] dark:text-[#06B6D4]">
              PunarTech Flexible Options
            </span>
            <h3 id="rental-emi-title" className="text-lg sm:text-xl font-['Urbanist'] font-bold text-zinc-950 dark:text-white">
              Rent or Buy on Easy EMI
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[10px] text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-[#E8F7EE] dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Laptop Bar */}
        <div className="px-5 py-3.5 bg-white dark:bg-[#152227] border-b border-[#E3EBE7] dark:border-[#22353D] flex items-center justify-between gap-3 text-xs">
          <div className="min-w-0">
            <span className="font-['Urbanist'] font-bold text-sm text-zinc-950 dark:text-white truncate block">
              {laptop.fullName}
            </span>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2 mt-0.5 font-['Poppins']">
              <span className="font-mono text-[#009B69] dark:text-[#10B981] font-semibold">{laptop.stockId}</span>
              <span>•</span>
              <span>{laptop.ram} / {laptop.storageRaw}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-[#007A8D] dark:text-[#06B6D4]" />
                {laptop.branch} Hub
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block font-medium">Selling Price</span>
            <span className="text-sm font-bold font-mono text-zinc-950 dark:text-white">
              {laptop.hasPrice && laptop.sellingPrice
                ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                : 'Contact for Price'}
            </span>
          </div>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="p-3 bg-[#F8FBF9] dark:bg-[#0E1519] border-b border-[#E3EBE7] dark:border-[#22353D]">
          <div className="grid grid-cols-2 gap-1.5 bg-[#E8F7EE]/60 dark:bg-zinc-800 p-1 rounded-[14px]">
            <button
              type="button"
              onClick={() => setActiveTab('rent')}
              className={`py-2 px-3 rounded-[10px] text-xs font-['Poppins'] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'rent'
                  ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-[#009B69] dark:hover:text-[#10B981]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Rent This Laptop</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('emi')}
              className={`py-2 px-3 rounded-[10px] text-xs font-['Poppins'] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'emi'
                  ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-[#009B69] dark:hover:text-[#10B981]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Buy on Easy EMI</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {activeTab === 'rent' ? (
            /* Rent View */
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] rounded-[16px] space-y-1">
                <span className="text-[11px] font-semibold text-[#007A8D] dark:text-[#06B6D4] uppercase tracking-wide block">
                  PunarTech Verified Rental Program
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-bold font-['Urbanist'] text-[#009B69] dark:text-[#10B981]">
                    Rent on Request
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 bg-[#E8F7EE] dark:bg-[#10B981]/15 px-2 py-0.5 rounded-[6px] border border-[#C8DFD4] dark:border-[#10B981]/30">
                    Undisclosed Rent Amount
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {rentEstimate.recommendedFor}. Contact us directly for a personalized quotation based on tenure and usage.
                </p>
              </div>

              {/* Rental Duration Options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">Choose Rental Period:</span>
                  <span className="text-[#009B69] dark:text-[#10B981] font-semibold text-[11px]">
                    {rentalMonths >= 6 ? '✓ 5-10% Discount Applied' : 'Standard Monthly Plan'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 3, 6, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setRentalMonths(m)}
                      className={`py-2 px-1 rounded-[12px] text-xs font-['Poppins'] font-semibold border transition-all duration-300 cursor-pointer text-center ${
                        rentalMonths === m
                          ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white border-transparent shadow-xs font-bold'
                          : 'bg-white hover:bg-[#F0F9F5] dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {m} {m === 1 ? 'Month' : 'Months'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#0E1519] rounded-[16px] border border-[#E3EBE7] dark:border-[#22353D] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Monthly Rent:</span>
                  <span className="font-semibold text-[#009B69] dark:text-[#10B981]">
                    Undisclosed — Contact Us for Best Quote
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Rental Duration:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    {rentalMonths} {rentalMonths === 1 ? 'Month' : 'Months'} (Flexible Plan)
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#E3EBE7] dark:border-[#22353D] pt-2">
                  <span className="text-zinc-500 dark:text-zinc-400">Security Deposit:</span>
                  <span className="font-semibold text-[#007A8D] dark:text-[#06B6D4]">
                    Nominal &amp; 100% Refundable on Return
                  </span>
                </div>
              </div>

              {/* Inclusions checklist */}
              <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                  <span>Doorstep delivery or immediate pickup at {laptop.branch} Hub</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                  <span>Includes compatible charger &amp; pre-installed Windows OS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981] shrink-0" />
                  <span>Option to purchase outright with partial rental adjustment</span>
                </div>
              </div>
            </div>
          ) : (
            /* EMI View */
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] rounded-[16px] space-y-1">
                <span className="text-[11px] font-semibold text-[#007A8D] dark:text-[#06B6D4] uppercase tracking-wide block">
                  Flexible Monthly Financing
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#009B69] dark:text-[#10B981]">
                    ₹{monthlyEmi.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">/ month</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Total price ₹{laptopPrice.toLocaleString('en-IN')}. Zero paperwork hassle with quick 15-minute digital check.
                </p>
              </div>

              {/* Tenure Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 block">
                  Choose Repayment Tenure:
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
                      className={`p-2.5 rounded-[12px] text-center border transition-all duration-300 cursor-pointer ${
                        emiTenure === item.m
                          ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white border-transparent shadow-xs font-bold'
                          : 'bg-white hover:bg-[#F0F9F5] dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs font-semibold block">{item.m} Mo</span>
                      <span className={`text-[9px] block font-semibold truncate ${emiTenure === item.m ? 'text-white/85' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        {item.m <= 6 ? 'No-Cost' : 'Low-Cost'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Down Payment */}
              {laptopPrice > 5000 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">Down Payment (Optional):</span>
                    <span className="font-mono font-bold text-[#009B69] dark:text-[#10B981]">
                      ₹{emiDownPayment.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.min(15000, laptopPrice - 3000)}
                    step="1000"
                    value={emiDownPayment}
                    onChange={(e) => setEmiDownPayment(Number(e.target.value))}
                    className="w-full accent-[#009B69] dark:accent-[#10B981] cursor-pointer"
                  />
                </div>
              )}

              {/* EMI Breakdown Summary */}
              <div className="p-4 bg-[#F8FBF9] dark:bg-[#0E1519] rounded-[16px] border border-[#E3EBE7] dark:border-[#22353D] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Monthly Installment:</span>
                  <span className="font-mono font-bold text-[#009B69] dark:text-[#10B981] text-sm">
                    ₹{monthlyEmi.toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Financed Amount:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-200">
                    ₹{emiPrincipal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#E3EBE7] dark:border-[#22353D] pt-2">
                  <span className="text-zinc-500 dark:text-zinc-400">Supported Modes:</span>
                  <span className="font-semibold text-[#007A8D] dark:text-[#06B6D4]">
                    Cards · Bajaj / Zest / Snapmint
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E3EBE7] dark:border-[#22353D] bg-[#F8FBF9] dark:bg-[#0E1519] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-[12px] border border-zinc-300 dark:border-zinc-700 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-['Poppins'] font-semibold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {activeTab === 'rent' ? (
            <button
              type="button"
              onClick={handleOpenRentalWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-['Poppins'] text-[15px] font-semibold shadow-xs transition-all duration-300 cursor-pointer active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Contact Us for Rent (+91 80550 35502)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenEmiWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[12px] bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:from-[#008759] hover:to-[#00697a] text-white font-['Poppins'] text-[15px] font-semibold shadow-xs transition-all duration-300 cursor-pointer active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Apply for EMI on WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
