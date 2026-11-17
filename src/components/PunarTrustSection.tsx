import React, { useState } from 'react';
import {
  ShieldCheck,
  Cpu,
  BatteryCharging,
  Monitor,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/laptops';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export const PunarTrustSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      id: 'motherboard',
      title: 'Motherboard & Ports',
      icon: Cpu,
      points: [
        'Motherboard power rail and IC stability check',
        'USB-A, Type-C, Thunderbolt & HDMI port load testing',
        'Internal audio codec, microphone & stereo speaker check',
        'Wi-Fi and Bluetooth wireless throughput validation',
      ],
      guarantee: 'Clean, non-reworked motherboard inspected prior to dispatch.',
    },
    {
      id: 'battery',
      title: 'Battery & Thermals',
      icon: BatteryCharging,
      points: [
        'Battery health & charge-retention stress diagnostic',
        'Adapter wattage verification and charging circuit check',
        'Fresh thermal compound application for cool operation',
        'Cooling fan and heatsink airflow cleaning',
      ],
      guarantee: 'Reliable real-world battery backup and quiet fan thermals.',
    },
    {
      id: 'display',
      title: 'Display & Input',
      icon: Monitor,
      points: [
        'Panel audit for dead pixels, lines, and uniform brightness',
        'Hinge tension and lid alignment check',
        'Full key-by-key keyboard actuation test',
        'Multi-touch trackpad click & tracking calibration',
      ],
      guarantee: 'Crisp display panel and responsive keyboard without sticky keys.',
    },
    {
      id: 'os',
      title: 'Storage & Software',
      icon: HardDrive,
      points: [
        'SSD / NVMe SMART health verification',
        'Clean OS installation with verified system drivers',
        'BIOS firmware inspection and hardware stress boot',
        'Compatible power adapter and cord included in box',
      ],
      guarantee: 'Ready-to-use setup verified with exact Stock ID specifications.',
    },
  ];

  return (
    <section
      id="puncartrust-qa"
      className="bg-[#F8FAFC] dark:bg-[#0B1116] border-b border-[#E2E8F0] dark:border-[#1E2D38] py-14 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#121B22] rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] p-6 sm:p-8 lg:p-10">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0D9488] dark:text-[#14B8A6]">
              Quality Assurance Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] dark:text-[#F1F5F9] tracking-tight mt-1">
              How Every Laptop Is Inspected Before Listing
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
              Review the four technical checkpoints completed by PunarTech technicians across our Pune and Delhi service desks.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="grid grid-cols-12 gap-4 mb-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activeTab === idx;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`col-span-6 lg:col-span-3 p-4 rounded-xl text-left border transition-colors cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#ECFDF5] dark:bg-[#10B981]/15 border-[#059669] dark:border-[#10B981]'
                      : 'bg-[#F8FAFC] dark:bg-[#18242D] border-[#E2E8F0] dark:border-[#263846] hover:border-[#059669]/60'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#059669] text-white'
                        : 'bg-white dark:bg-[#121B22] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#263846]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono font-semibold uppercase text-[#64748B]">
                      Step 0{idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#17212B] dark:text-[#F1F5F9] truncate">
                      {pillar.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Panel */}
          <div className="bg-[#F8FAFC] dark:bg-[#18242D] rounded-xl p-5 sm:p-6 border border-[#E2E8F0] dark:border-[#263846] grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <h3 className="text-lg font-bold text-[#17212B] dark:text-[#F1F5F9]">
                {pillars[activeTab].title}
              </h3>

              <div className="grid grid-cols-12 gap-3">
                {pillars[activeTab].points.map((point, i) => (
                  <div
                    key={i}
                    className="col-span-12 sm:col-span-6 flex items-start gap-2.5 p-3 rounded-lg bg-white dark:bg-[#121B22] border border-[#E2E8F0] dark:border-[#1E2D38]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#475569] dark:text-[#94A3B8] flex items-center gap-2 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#059669] dark:text-[#10B981] shrink-0" />
                <span>{pillars[activeTab].guarantee}</span>
              </p>
            </div>

            <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#121B22] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#1E2D38] space-y-3">
              <h4 className="text-sm font-bold text-[#17212B] dark:text-white">
                Request Live Unit Check
              </h4>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Ask for real chassis photographs, battery report, or repair/upgrade advice before visiting or ordering.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(
                  'Hello PunarTech, I want to request a live hardware & battery inspection video for a laptop on https://punartech.vercel.app/.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Request Diagnostic Video</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
