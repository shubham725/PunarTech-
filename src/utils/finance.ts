import { Laptop } from '../data/laptops';

export interface RentalEstimate {
  monthlyRent: number;
  securityDeposit: number;
  categoryLabel: string;
  recommendedFor: string;
}

export interface EmiOption {
  tenureMonths: number;
  monthlyAmount: number;
  totalPayable: number;
  interestRateText: string;
}

/**
 * Calculates estimated monthly rental and security deposit based on laptop specs
 */
export function getLaptopRentalEstimate(laptop: Laptop): RentalEstimate {
  const isMac = laptop.brand === 'Apple';
  const hasGPU = laptop.hasDedicatedGraphics;
  const isI7 = laptop.processorCategory === 'Intel Core i7';
  const isI5 = laptop.processorCategory === 'Intel Core i5';
  const isRyzen = laptop.processorCategory === 'AMD Ryzen';

  if (isMac) {
    return {
      monthlyRent: 2999,
      securityDeposit: 6000,
      categoryLabel: 'MacBook Pro / Air Rental',
      recommendedFor: 'Creative design, iOS development & executive workflow',
    };
  }

  if (hasGPU || (isI7 && laptop.ramGb >= 16)) {
    return {
      monthlyRent: 2299,
      securityDeposit: 4500,
      categoryLabel: 'Power & Workstation Rental',
      recommendedFor: 'Video editing, data science, heavy multitasking & AutoCAD',
    };
  }

  if (isI7 || (isI5 && (laptop.generation ?? 0) >= 8)) {
    return {
      monthlyRent: 1699,
      securityDeposit: 3500,
      categoryLabel: 'Business Performance Rental',
      recommendedFor: 'Software development, office teams & analytics',
    };
  }

  if (isI5 || isRyzen) {
    return {
      monthlyRent: 1399,
      securityDeposit: 3000,
      categoryLabel: 'Standard Business Rental',
      recommendedFor: 'Work from home, accounting, browsing & CRM work',
    };
  }

  // Core i3, Pentium, entry-level
  return {
    monthlyRent: 999,
    securityDeposit: 2500,
    categoryLabel: 'Student & Budget Rental',
    recommendedFor: 'Online classes, basic office software, exams & browsing',
  };
}

/**
 * Calculates EMI options for 3, 6, 9, 12 months
 */
export function getLaptopEmiOptions(price: number | null): EmiOption[] {
  const effectivePrice = price && price > 0 ? price : 18000;

  return [
    {
      tenureMonths: 3,
      monthlyAmount: Math.round(effectivePrice / 3),
      totalPayable: effectivePrice,
      interestRateText: '0% No-Cost EMI',
    },
    {
      tenureMonths: 6,
      monthlyAmount: Math.round(effectivePrice / 6),
      totalPayable: effectivePrice,
      interestRateText: '0% No-Cost EMI',
    },
    {
      tenureMonths: 9,
      monthlyAmount: Math.round((effectivePrice * 1.04) / 9),
      totalPayable: Math.round(effectivePrice * 1.04),
      interestRateText: '~4% Low-Cost EMI',
    },
    {
      tenureMonths: 12,
      monthlyAmount: Math.round((effectivePrice * 1.06) / 12),
      totalPayable: Math.round(effectivePrice * 1.06),
      interestRateText: '~6% Low-Cost EMI',
    },
  ];
}

/**
 * Generates WhatsApp enquiry link for Laptop Rental
 */
export function getRentalWhatsAppUrl(
  laptop: Laptop | null,
  durationMonths: number = 3,
  purpose: string = 'General Use'
): string {
  const phone = '918055035502';
  let message = '';

  if (laptop) {
    message = `Hello PunarTech Team, I am interested in RENTING a laptop:
• Model: ${laptop.fullName}
• Stock ID: ${laptop.stockId}
• Hub: ${laptop.branch} Hub
• Specs: ${laptop.processor} | ${laptop.ram} | ${laptop.storageRaw}
• Expected Rental Duration: ${durationMonths} Month(s)
• Rental Rate: Requesting customized quote (Rent on Request)
• Purpose: ${purpose}
• Live Product Link: https://punartech.vercel.app/?laptop=${encodeURIComponent(laptop.stockId)}

Please share your best customized rental rates, refundable deposit terms, and delivery options for Pune/Delhi.`;
  } else {
    message = `Hello PunarTech Team, I want to enquire about LAPTOP RENTAL options:
• Duration: ${durationMonths} Month(s)
• Purpose: ${purpose}
• Preferred Hub: Pune / Delhi
• Rental Rate: Requesting customized quote (Rent on Request)
• Live Catalog: https://punartech.vercel.app/

Please share available rental laptops in stock and customized pricing plans.`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp enquiry link for EMI Purchase
 */
export function getEmiWhatsAppUrl(
  laptop: Laptop,
  tenureMonths: number = 6,
  downPayment: number = 0
): string {
  const phone = '918055035502';
  const price = laptop.sellingPrice ?? 0;
  const remaining = Math.max(0, price - downPayment);
  const monthly = Math.round(remaining / tenureMonths);

  const message = `Hello PunarTech Team, I want to purchase this laptop on EMI:
• Model: ${laptop.fullName}
• Stock ID: ${laptop.stockId}
• Total Price: ₹${price.toLocaleString('en-IN')}
• Hub: ${laptop.branch} Hub
• Down Payment: ₹${downPayment.toLocaleString('en-IN')}
• Requested Tenure: ${tenureMonths} Months (~₹${monthly.toLocaleString('en-IN')}/month)
• Live Product Link: https://punartech.vercel.app/?laptop=${encodeURIComponent(laptop.stockId)}

Please check my EMI eligibility (Credit Card / Debit Card / Cardless Finance) and guide me through the approval process.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
