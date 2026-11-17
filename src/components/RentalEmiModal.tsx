import React, { useState, useEffect } from 'react';
import { Laptop } from '../data/laptops';
import {
  X,
  Calendar,
  CreditCard,
  Check,
  MapPin,
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import {
  getLaptopRentalEstimate,
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
    setEmiDownPayment(0);
  }, [initialMode, isOpen, laptop?.id]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0B1116]/75 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#121B22] rounded-xl shadow-2xl border border-[#E2E8F0] dark:border-[#263846] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rental-emi-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#0B1116] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488] dark:text-[#14B8A6]">
              Flexible Payment Plans
            </span>
            <h3 id="rental-emi-title" className="text-lg font-bold text-[#17212B] dark:text-white">
              Rent or Buy on Easy EMI
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#18242D] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Laptop Bar */}
        <div className="px-5 py-3.5 bg-white dark:bg-[#121B22] border-b border-[#E2E8F0] dark:border-[#263846] flex items-center justify-between gap-3 text-xs">
          <div className="min-w-0">
            <span className="font-bold text-sm text-[#17212B] dark:text-white truncate block">
              {laptop.fullName}
            </span>
            <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[#0D9488] dark:text-[#14B8A6] font-semibold">{laptop.stockId}</span>
              <span>·</span>
              <span>
                {laptop.ram} / {laptop.storageRaw}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-0.5">
                <MapPin className="w-3 h-3" />
                {laptop.branch} Hub
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] block">Price</span>
            <span className="text-sm font-bold font-mono text-[#17212B] dark:text-white tabular-nums">
              {laptop.hasPrice && laptop.sellingPrice
                ? `₹${laptop.sellingPrice.toLocaleString('en-IN')}`
                : 'On Request'}
            </span>
          </div>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="p-3 bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#263846]">
          <div className="grid grid-cols-2 gap-1.5 bg-white dark:bg-[#121B22] p-1 rounded-lg border border-[#E2E8F0] dark:border-[#263846]">
            <button
              type="button"
              onClick={() => setActiveTab('rent')}
              className={`py-2 px-3 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'rent'
                  ? 'bg-[#17212B] dark:bg-[#059669] text-white'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Rent Laptop</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('emi')}
              className={`py-2 px-3 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'emi'
                  ? 'bg-[#17212B] dark:bg-[#059669] text-white'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Easy EMI</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {activeTab === 'rent' ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] rounded-lg space-y-1">
                <span className="text-[11px] font-bold text-[#0D9488] dark:text-[#14B8A6] uppercase tracking-wider block">
                  PunarTech Rental Plan
                </span>
                <div className="text-xl font-bold text-[#059669] dark:text-[#10B981]">
                  Rent on Request
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  {rentEstimate.recommendedFor}. Contact our coordinator for exact monthly rates based on tenure.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#17212B] dark:text-[#E2E8F0]">Rental Duration</span>
                  <span className="text-[#059669] dark:text-[#10B981] font-medium">
                    {rentalMonths >= 6 ? 'Long-term discount eligible' : 'Standard plan'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 6, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setRentalMonths(m)}
                      className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer text-center ${
                        rentalMonths === m
                          ? 'bg-[#17212B] dark:bg-[#059669] text-white border-transparent'
                          : 'bg-white hover:bg-[#F8FAFC] dark:bg-[#18242D] dark:hover:bg-[#1E2D38] text-[#334155] dark:text-[#CBD5E1] border-[#E2E8F0] dark:border-[#263846]'
                      }`}
                    >
                      {m} {m === 1 ? 'Mo' : 'Mos'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Monthly Rent</span>
                  <span className="font-semibold text-[#059669] dark:text-[#10B981]">
                    Undisclosed · Custom Quote
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Duration</span>
                  <span className="font-mono font-bold text-[#17212B] dark:text-white">
                    {rentalMonths} {rentalMonths === 1 ? 'Month' : 'Months'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#263846] pt-2">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Security Deposit</span>
                  <span className="font-medium text-[#17212B] dark:text-[#E2E8F0]">
                    100% Refundable on Return
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#334155] dark:text-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] shrink-0" />
                  <span>Pickup at {laptop.branch} Hub or insured doorstep delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981] shrink-0" />
                  <span>Includes verified charger &amp; ready-to-work OS</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] rounded-lg space-y-1">
                <span className="text-[11px] font-bold text-[#0D9488] dark:text-[#14B8A6] uppercase tracking-wider block">
                  Estimated Installment
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#059669] dark:text-[#10B981] tabular-nums">
                    ₹{monthlyEmi.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">/ month</span>
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  Unit price ₹{laptopPrice.toLocaleString('en-IN')}. 15-minute digital eligibility verification.
                </p>
              </div>

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

              {laptopPrice > 5000 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17212B] dark:text-[#E2E8F0]">
                      Down Payment (Optional)
                    </span>
                    <span className="font-mono font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
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
                    className="w-full accent-[#059669] dark:accent-[#10B981] cursor-pointer"
                  />
                </div>
              )}

              <div className="p-4 bg-[#F8FAFC] dark:bg-[#18242D] rounded-lg border border-[#E2E8F0] dark:border-[#263846] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Monthly Installment</span>
                  <span className="font-mono font-bold text-[#059669] dark:text-[#10B981] text-sm tabular-nums">
                    ₹{monthlyEmi.toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Financed Amount</span>
                  <span className="font-mono font-bold text-[#17212B] dark:text-white tabular-nums">
                    ₹{emiPrincipal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#263846] pt-2">
                  <span className="text-[#475569] dark:text-[#94A3B8]">Supported Partners</span>
                  <span className="font-semibold text-[#0D9488] dark:text-[#14B8A6]">
                    Cards · Bajaj · Zest · Snapmint
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#0B1116] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-lg border border-[#CBD5E1] dark:border-[#2C3F4E] bg-white hover:bg-[#F1F5F9] dark:bg-[#18242D] dark:hover:bg-[#1E2D38] text-[#17212B] dark:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {activeTab === 'rent' ? (
            <button
              type="button"
              onClick={handleOpenRentalWhatsApp}
              className="flex-1 h-10 inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Request Rent Quote</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenEmiWhatsApp}
              className="flex-1 h-10 inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
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
