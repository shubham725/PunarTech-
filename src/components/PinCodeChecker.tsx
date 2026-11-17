import React, { useState } from 'react';
import { MapPin, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { WHATSAPP_CONFIG } from '../data/laptops';

export const PinCodeChecker: React.FC = () => {
  const [pinCode, setPinCode] = useState('');
  const [result, setResult] = useState<{
    status: 'delivered' | 'invalid';
    hub: string;
    cityState: string;
    timeline: string;
  } | null>(null);

  const runCheck = (pinValue: string) => {
    const cleanPin = pinValue.trim().replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      setResult({
        status: 'invalid',
        hub: '',
        cityState: '',
        timeline: '',
      });
      return;
    }

    const firstDigit = cleanPin[0];
    const firstTwo = cleanPin.substring(0, 2);

    let hub = 'Pune Hub';
    let cityState = 'Pan-India Courier Dispatch';
    let timeline = '2 to 3 Business Days';

    if (firstTwo >= '40' && firstTwo <= '44') {
      hub = 'Pune Showroom Hub (60 Units)';
      cityState = firstTwo === '41' ? 'Pune & Western Maharashtra' : 'Maharashtra & Goa';
      timeline = firstTwo === '41' ? 'Same-Day or Next-Day Delivery' : '1 to 2 Business Days';
    } else if (['11', '12', '13', '20'].includes(firstTwo)) {
      hub = 'Delhi NCR Hub (31 Units)';
      cityState = firstTwo === '11' ? 'Delhi NCT' : 'Delhi NCR (Noida, Gurugram, Ghaziabad, Faridabad)';
      timeline = 'Same-Day or Next-Day Delivery';
    } else if ((firstTwo >= '36' && firstTwo <= '39') || (firstTwo >= '45' && firstTwo <= '48')) {
      hub = 'Pune Hub (Primary Dispatch)';
      cityState = 'Western & Central India (Gujarat / MP)';
      timeline = '2 Business Days';
    } else if (firstDigit === '1' || firstDigit === '2') {
      hub = 'Delhi Hub (Primary Dispatch)';
      cityState = 'North India';
      timeline = '2 to 3 Business Days';
    } else if (['56', '57', '58', '59', '60', '61', '62', '63', '64'].includes(firstTwo)) {
      hub = 'Pune Hub (Air Express)';
      cityState = 'South India (KA, TN, TS, KL)';
      timeline = '2 Business Days Air Express';
    }

    setResult({
      status: 'delivered',
      hub,
      cityState,
      timeline,
    });
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    runCheck(pinCode);
  };

  const whatsappMessage =
    result?.status === 'delivered'
      ? encodeURIComponent(
          `Hello PunarTech, I checked delivery for PIN Code ${pinCode} (${result.cityState}) on https://punartech.vercel.app/. Please share available laptops ready for dispatch.`
        )
      : encodeURIComponent(
          'Hello PunarTech, I want to verify laptop courier dispatch availability.'
        );

  return (
    <section
      id="pincode-checker"
      className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-14 sm:py-16 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#121B22] rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] p-6 sm:p-8 grid grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="col-span-12 lg:col-span-7 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D9488] dark:text-[#14B8A6]">
              Insured Courier &amp; Pickup
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] dark:text-[#F1F5F9] tracking-tight">
              Check Delivery Timeline by PIN Code
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Orders ship from our Pune or Delhi warehouses in protective packaging with a live video check available prior to dispatch.
            </p>

            <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2.5 max-w-lg">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '');
                    setPinCode(v);
                    if (v.length === 6) runCheck(v);
                  }}
                  placeholder="Enter 6-digit PIN (e.g. 411001)"
                  className="w-full h-10 pl-9 pr-3 text-sm bg-[#F8FAFC] dark:bg-[#0F171E] border border-[#CBD5E1] dark:border-[#263846] rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="h-10 px-5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <span>Check PIN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
              <span>Sample PINs:</span>
              {[
                { name: 'Pune 411001', pin: '411001' },
                { name: 'Delhi 110001', pin: '110001' },
                { name: 'Mumbai 400001', pin: '400001' },
                { name: 'Bengaluru 560001', pin: '560001' },
              ].map((item) => (
                <button
                  key={item.pin}
                  type="button"
                  onClick={() => {
                    setPinCode(item.pin);
                    runCheck(item.pin);
                  }}
                  className="px-2 py-1 rounded-md bg-[#F8FAFC] dark:bg-[#18242D] hover:border-[#059669] border border-[#E2E8F0] dark:border-[#263846] font-mono text-[11px] text-[#17212B] dark:text-[#E2E8F0] cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            {result?.status === 'delivered' ? (
              <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#059669] dark:border-[#10B981] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#059669] dark:text-[#10B981]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Delivery Available</span>
                  </span>
                  <span className="font-mono text-[#64748B]">PIN {pinCode}</span>
                </div>

                <div>
                  <div className="text-sm font-bold text-[#17212B] dark:text-white">
                    {result.cityState}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#475569] dark:text-[#CBD5E1] mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>Estimated timeline: {result.timeline}</span>
                  </div>
                  <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                    Dispatch origin: <strong className="text-[#17212B] dark:text-white">{result.hub}</strong>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                  <span>Confirm Dispatch on WhatsApp</span>
                </a>
              </div>
            ) : result?.status === 'invalid' ? (
              <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-rose-300 dark:border-rose-800 space-y-2">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  Enter a valid 6-digit Indian PIN code.
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8]">
                  For remote courier requests, message us directly on WhatsApp ({WHATSAPP_CONFIG.displayPhone}).
                </p>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] space-y-3 text-xs">
                <div className="font-bold text-[#17212B] dark:text-white">
                  Dual-Hub Dispatch Coverage
                </div>
                <div className="space-y-2 text-[#475569] dark:text-[#94A3B8]">
                  <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0] dark:border-[#263846]">
                    <span>Pune Hub (West &amp; South India)</span>
                    <span className="font-mono font-semibold text-[#17212B] dark:text-white">60 Units</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span>Delhi NCR Hub (North India)</span>
                    <span className="font-mono font-semibold text-[#17212B] dark:text-white">31 Units</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
