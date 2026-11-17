import React, { useState } from 'react';
import { Laptop, INVENTORY_STATS, WHATSAPP_CONFIG } from '../data/laptops';
import {
  X,
  Shield,
  Download,
  Plus,
  Search,
  Check,
  Lock,
  AlertCircle,
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  laptops: Laptop[];
}

interface CustomerEnquiry {
  id: string;
  customerName: string;
  phone: string;
  stockId: string;
  model: string;
  date: string;
  status: 'New' | 'In Progress' | 'Photos Sent' | 'Converted' | 'Closed';
  notes: string;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  laptops,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'add' | 'enquiries'>('overview');
  const [searchFilter, setSearchFilter] = useState('');

  const [enquiries] = useState<CustomerEnquiry[]>([
    {
      id: 'ENQ-101',
      customerName: 'Shubham Patil',
      phone: '+91 80550 35502',
      stockId: 'PT/P001',
      model: 'Dell Latitude 3480',
      date: '2026-10-31',
      status: 'Photos Sent',
      notes: 'Requested battery diagnostic report on WhatsApp. Shared 4 angles.',
    },
    {
      id: 'ENQ-102',
      customerName: 'Rohit Verma',
      phone: '+91 9811234567',
      stockId: 'PT/D001',
      model: 'Lenovo ThinkBook 14 G2',
      date: '2026-10-30',
      status: 'In Progress',
      notes: 'Delhi hub visit planned for Saturday morning.',
    },
    {
      id: 'ENQ-103',
      customerName: 'Ananya Sharma',
      phone: '+91 9765432109',
      stockId: 'PT/P015',
      model: 'Apple MacBook Pro',
      date: '2026-10-29',
      status: 'Converted',
      notes: 'Handed over in Pune showroom with invoice and adapter.',
    },
  ]);

  const [newModel, setNewModel] = useState('');
  const [newBrand, setNewBrand] = useState<'Dell' | 'HP' | 'Lenovo' | 'Apple' | 'ASUS' | 'Acer'>('Dell');
  const [newBranch, setNewBranch] = useState<'Pune' | 'Delhi'>('Pune');
  const [newCpu, setNewCpu] = useState('');
  const [newRam, setNewRam] = useState('8GB');
  const [newPrice, setNewPrice] = useState('');
  const [addSuccessMessage, setAddSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '2026' || pinInput.trim().toLowerCase() === 'punartech') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Stock ID',
      'Branch',
      'Brand',
      'Model',
      'Processor',
      'RAM',
      'Storage',
      'Display',
      'Selling Price (INR)',
      'Condition',
    ];
    const rows = laptops.map((l) => [
      l.stockId,
      l.branch,
      l.brand,
      `"${l.model.replace(/"/g, '""')}"`,
      `"${l.processor.replace(/"/g, '""')}"`,
      `"${l.ram}"`,
      `"${l.storageRaw}"`,
      `"${l.display}"`,
      l.sellingPrice !== null ? l.sellingPrice : 'Contact for Price',
      `"${l.condition}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `punartech_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModel.trim()) return;
    setAddSuccessMessage(true);
    setTimeout(() => {
      setAddSuccessMessage(false);
      setNewModel('');
      setNewCpu('');
      setNewPrice('');
      setActiveTab('inventory');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0B1116]/75 backdrop-blur-xs">
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-[#121B22] rounded-xl shadow-2xl border border-[#E2E8F0] dark:border-[#263846] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] dark:border-[#263846] bg-[#F8FAFC] dark:bg-[#0B1116] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#121B22] text-[#059669] dark:text-[#10B981] border border-[#E2E8F0] dark:border-[#263846] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#17212B] dark:text-white">
                PunarTech Staff Coordinator Portal
              </h2>
              <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                Inventory audit, CSV export, and customer enquiry tracking
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#17212B] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#18242D] transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] dark:bg-[#18242D] text-[#059669] dark:text-[#10B981] flex items-center justify-center mx-auto border border-[#E2E8F0] dark:border-[#263846]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#17212B] dark:text-white">
                Coordinator Passcode Required
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1 leading-relaxed">
                Enter your staff passcode to inspect inventory tables, export stock sheets, and review customer enquiries.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3 pt-2">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter Passcode (e.g. 2026)"
                className="w-full h-11 px-4 bg-[#F8FAFC] dark:bg-[#18242D] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg text-center text-sm font-mono tracking-widest text-[#17212B] dark:text-white"
                autoFocus
              />

              {pinError && (
                <div className="text-xs text-rose-600 font-semibold flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid passcode (use 2026 or punartech)</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-10 bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                Access Portal
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#263846] px-6 bg-white dark:bg-[#121B22] overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`py-3.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-[#059669] text-[#059669] dark:border-[#10B981] dark:text-[#10B981]'
                      : 'border-transparent text-[#64748B] hover:text-[#17212B] dark:hover:text-white'
                  }`}
                >
                  Overview ({INVENTORY_STATS.total} Units)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className={`py-3.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'inventory'
                      ? 'border-[#059669] text-[#059669] dark:border-[#10B981] dark:text-[#10B981]'
                      : 'border-transparent text-[#64748B] hover:text-[#17212B] dark:hover:text-white'
                  }`}
                >
                  Stock Table
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('enquiries')}
                  className={`py-3.5 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'enquiries'
                      ? 'border-[#059669] text-[#059669] dark:border-[#10B981] dark:text-[#10B981]'
                      : 'border-transparent text-[#64748B] hover:text-[#17212B] dark:hover:text-white'
                  }`}
                >
                  Enquiries ({enquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('add')}
                  className={`py-3.5 border-b-2 cursor-pointer transition-colors inline-flex items-center gap-1 whitespace-nowrap ${
                    activeTab === 'add'
                      ? 'border-[#059669] text-[#059669] dark:border-[#10B981] dark:text-[#10B981]'
                      : 'border-transparent text-[#64748B] hover:text-[#17212B] dark:hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Draft</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="my-2 h-8 inline-flex items-center gap-1.5 px-3 rounded-lg bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#059669] dark:bg-[#10B981]/15 dark:hover:bg-[#10B981]/25 dark:text-[#10B981] border border-[#059669]/25 font-semibold text-xs transition-colors cursor-pointer shrink-0"
                title="Download CSV of all 91 laptops"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846]">
                      <span className="text-[11px] uppercase font-bold text-[#64748B] dark:text-[#94A3B8]">
                        Total Stock
                      </span>
                      <div className="text-2xl font-bold font-mono text-[#17212B] dark:text-white mt-1 tabular-nums">
                        {INVENTORY_STATS.total}
                      </div>
                      <span className="text-[11px] text-[#475569] dark:text-[#94A3B8]">Physical Units</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846]">
                      <span className="text-[11px] uppercase font-bold text-[#64748B] dark:text-[#94A3B8]">
                        Pune Hub
                      </span>
                      <div className="text-2xl font-bold font-mono text-[#17212B] dark:text-white mt-1 tabular-nums">
                        {INVENTORY_STATS.puneCount}
                      </div>
                      <span className="text-[11px] text-[#475569] dark:text-[#94A3B8]">PT/P001–PT/P060</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846]">
                      <span className="text-[11px] uppercase font-bold text-[#64748B] dark:text-[#94A3B8]">
                        Delhi Hub
                      </span>
                      <div className="text-2xl font-bold font-mono text-[#17212B] dark:text-white mt-1 tabular-nums">
                        {INVENTORY_STATS.delhiCount}
                      </div>
                      <span className="text-[11px] text-[#475569] dark:text-[#94A3B8]">PT/D001–PT/D031</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846]">
                      <span className="text-[11px] uppercase font-bold text-[#64748B] dark:text-[#94A3B8]">
                        Priced Units
                      </span>
                      <div className="text-2xl font-bold font-mono text-[#059669] dark:text-[#10B981] mt-1 tabular-nums">
                        {INVENTORY_STATS.pricedCount}/{INVENTORY_STATS.total}
                      </div>
                      <span className="text-[11px] text-[#475569] dark:text-[#94A3B8]">6 Price on Request</span>
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] dark:bg-[#18242D] p-5 rounded-xl border border-[#E2E8F0] dark:border-[#263846]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-white mb-3">
                      Brand Distribution
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                      {Object.entries(INVENTORY_STATS.brands).map(([brand, count]) => (
                        <div
                          key={brand}
                          className="bg-white dark:bg-[#121B22] p-3 rounded-lg border border-[#E2E8F0] dark:border-[#263846] text-center"
                        >
                          <span className="text-xs font-bold text-[#17212B] dark:text-white block">{brand}</span>
                          <span className="text-sm font-bold font-mono text-[#059669] dark:text-[#10B981] tabular-nums">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="relative max-w-sm">
                    <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Filter stock ID, brand, or model..."
                      className="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] dark:bg-[#18242D] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg text-xs text-[#17212B] dark:text-white"
                    />
                  </div>

                  <div className="overflow-x-auto border border-[#E2E8F0] dark:border-[#263846] rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F8FAFC] dark:bg-[#0B1116] text-[#475569] dark:text-[#94A3B8] font-bold border-b border-[#E2E8F0] dark:border-[#263846]">
                        <tr>
                          <th className="p-3">Stock ID</th>
                          <th className="p-3">Branch</th>
                          <th className="p-3">Model</th>
                          <th className="p-3">CPU</th>
                          <th className="p-3">RAM</th>
                          <th className="p-3">Storage</th>
                          <th className="p-3">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#263846]">
                        {laptops
                          .filter((l) =>
                            searchFilter ? l.searchableText.includes(searchFilter.toLowerCase()) : true
                          )
                          .slice(0, 30)
                          .map((l) => (
                            <tr key={l.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#18242D]">
                              <td className="p-3 font-mono font-bold text-[#17212B] dark:text-white">{l.stockId}</td>
                              <td className="p-3 text-[#475569] dark:text-[#CBD5E1]">{l.branch}</td>
                              <td className="p-3 font-semibold text-[#17212B] dark:text-white">{l.fullName}</td>
                              <td className="p-3 text-[#475569] dark:text-[#94A3B8]">{l.processor}</td>
                              <td className="p-3 font-mono">{l.ram}</td>
                              <td className="p-3 font-mono">{l.storageRaw}</td>
                              <td className="p-3 font-mono font-bold text-[#059669] dark:text-[#10B981] tabular-nums">
                                {l.hasPrice && l.sellingPrice
                                  ? `₹${l.sellingPrice.toLocaleString('en-IN')}`
                                  : 'On Request'}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                    Showing top 30 filtered records of {INVENTORY_STATS.total}. Use Export CSV for full stock export.
                  </p>
                </div>
              )}

              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#17212B] dark:text-white">
                      Recent WhatsApp Enquiries
                    </h3>
                    <span className="text-xs font-mono text-[#475569] dark:text-[#94A3B8]">
                      Helpline: {WHATSAPP_CONFIG.displayPhone}
                    </span>
                  </div>

                  <div className="divide-y divide-[#E2E8F0] dark:divide-[#263846] border border-[#E2E8F0] dark:border-[#263846] rounded-xl overflow-hidden">
                    {enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-4 hover:bg-[#F8FAFC] dark:hover:bg-[#18242D] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-[#17212B] dark:text-white">{enq.customerName}</span>
                            <span className="text-[#CBD5E1] dark:text-[#334155]">·</span>
                            <span className="text-xs font-mono text-[#475569] dark:text-[#94A3B8]">{enq.phone}</span>
                            <span className="text-[#CBD5E1] dark:text-[#334155]">·</span>
                            <span className="font-mono text-[10px] text-[#0D9488] dark:text-[#14B8A6] bg-[#F1F5F9] dark:bg-[#121B22] px-1.5 py-0.5 rounded font-semibold border border-[#E2E8F0] dark:border-[#263846]">
                              {enq.stockId}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-[#334155] dark:text-[#CBD5E1]">{enq.model}</div>
                          <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1">{enq.notes}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#F1F5F9] dark:bg-[#121B22] text-[#17212B] dark:text-white border border-[#E2E8F0] dark:border-[#263846]">
                            {enq.status}
                          </span>
                          <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono">{enq.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'add' && (
                <form
                  onSubmit={handleCreateDraft}
                  className="max-w-xl mx-auto space-y-4 p-5 bg-[#F8FAFC] dark:bg-[#18242D] rounded-xl border border-[#E2E8F0] dark:border-[#263846]"
                >
                  <h3 className="text-sm font-bold text-[#17212B] dark:text-white">
                    Add New Laptop Draft Entry
                  </h3>

                  {addSuccessMessage && (
                    <div className="p-3 bg-[#ECFDF5] dark:bg-[#10B981]/15 text-[#059669] dark:text-[#10B981] rounded-lg text-xs font-semibold border border-[#059669]/25 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Draft entry recorded for session!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                        Brand
                      </label>
                      <select
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value as 'Dell' | 'HP' | 'Lenovo' | 'Apple' | 'ASUS' | 'Acer')}
                        className="w-full h-9 px-2.5 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg text-xs text-[#17212B] dark:text-white"
                      >
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Apple">Apple</option>
                        <option value="ASUS">ASUS</option>
                        <option value="Acer">Acer</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                        Showroom Hub
                      </label>
                      <select
                        value={newBranch}
                        onChange={(e) => setNewBranch(e.target.value as 'Pune' | 'Delhi')}
                        className="w-full h-9 px-2.5 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg text-xs text-[#17212B] dark:text-white"
                      >
                        <option value="Pune">Pune Hub</option>
                        <option value="Delhi">Delhi Hub</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                      Model Name
                    </label>
                    <input
                      type="text"
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      placeholder="e.g. Latitude 5410 Core i5 10th Gen"
                      className="w-full h-9 px-3 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg text-xs text-[#17212B] dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                        Processor
                      </label>
                      <input
                        type="text"
                        value={newCpu}
                        onChange={(e) => setNewCpu(e.target.value)}
                        placeholder="Core i5 10th"
                        className="w-full h-9 px-3 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg text-xs text-[#17212B] dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                        RAM
                      </label>
                      <input
                        type="text"
                        value={newRam}
                        onChange={(e) => setNewRam(e.target.value)}
                        className="w-full h-9 px-3 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg text-xs text-[#17212B] dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] block mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="24500"
                        className="w-full h-9 px-3 bg-white dark:bg-[#121B22] border border-[#CBD5E1] dark:border-[#2C3F4E] rounded-lg text-xs text-[#17212B] dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-10 bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    Save Draft Entry
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
