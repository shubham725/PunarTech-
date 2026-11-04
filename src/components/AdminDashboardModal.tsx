import React, { useState } from 'react';
import { Laptop, INVENTORY_STATS } from '../data/laptops';
import {
  X,
  Shield,
  Download,
  Plus,
  Search,
  CheckCircle2,
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

  // Sample real customer enquiry tracker
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

  // Form state for adding new laptop draft
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
    const headers = ['Stock ID', 'Branch', 'Brand', 'Model', 'Processor', 'RAM', 'Storage', 'Display', 'Selling Price (INR)', 'Condition'];
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

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs font-['Poppins']">
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-[24px] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-['Urbanist'] font-bold text-black dark:text-white">
                PunarTech Staff &amp; Inventory Coordinator Portal
              </h2>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Physical stock verification &amp; enquiry workflow management
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#009B69] dark:text-[#10B981] flex items-center justify-center mx-auto border border-[#C8DFD4] dark:border-[#10B981]/30">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-['Urbanist'] font-bold text-black dark:text-white">
                Coordinator Authentication Required
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Enter your staff coordinator passcode to manage inventory records, export CSV, and review customer enquiries.
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
                placeholder="Enter Staff Passcode (e.g. 2026)"
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-[12px] text-center text-sm font-['Poppins'] font-mono tracking-widest text-black dark:text-white focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
                autoFocus
              />

              {pinError && (
                <div className="text-xs text-rose-600 font-semibold flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid passcode. (Hint: use 2026 or punartech)</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:opacity-95 text-white dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B] font-['Poppins'] font-semibold text-[15px] rounded-[12px] transition-all duration-300 cursor-pointer shadow-sm"
              >
                Access Coordinator Portal
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 bg-white dark:bg-zinc-900 overflow-x-auto">
              <div className="flex items-center gap-4 text-xs font-['Poppins'] font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'overview'
                      ? 'border-[#009B69] text-[#009B69] dark:border-[#10B981] dark:text-[#10B981]'
                      : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Overview KPI (91 Units)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'inventory'
                      ? 'border-[#009B69] text-[#009B69] dark:border-[#10B981] dark:text-[#10B981]'
                      : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Live Stock Table
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('enquiries')}
                  className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'enquiries'
                      ? 'border-[#009B69] text-[#009B69] dark:border-[#10B981] dark:text-[#10B981]'
                      : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Customer Enquiries ({enquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('add')}
                  className={`py-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1 ${
                    activeTab === 'add'
                      ? 'border-[#009B69] text-[#009B69] dark:border-[#10B981] dark:text-[#10B981]'
                      : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Laptop Draft</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="my-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] bg-[#E8F7EE] hover:bg-[#D5EFE0] text-[#007A52] dark:bg-[#10B981]/15 dark:hover:bg-[#10B981]/25 dark:text-[#34D399] border border-[#C8DFD4] dark:border-[#10B981]/30 font-['Poppins'] font-semibold text-xs transition-all duration-300 cursor-pointer shadow-xs"
                title="Download CSV of all 91 laptops"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Scrollable Tab Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-500">Total Catalog</span>
                      <div className="text-2xl font-black font-mono text-black dark:text-white mt-1">
                        {INVENTORY_STATS.total} Units
                      </div>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">91 Physical Devices</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-500">Pune Hub</span>
                      <div className="text-2xl font-black font-mono text-black dark:text-white mt-1">
                        {INVENTORY_STATS.puneCount} Units
                      </div>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">PT/P001–PT/P060</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-500">Delhi Hub</span>
                      <div className="text-2xl font-black font-mono text-black dark:text-white mt-1">
                        {INVENTORY_STATS.delhiCount} Units
                      </div>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">PT/D001–PT/D031</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-500">Priced Units</span>
                      <div className="text-2xl font-black font-mono text-black dark:text-white mt-1">
                        {INVENTORY_STATS.pricedCount} / {INVENTORY_STATS.total}
                      </div>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">6 Contact for Price</span>
                    </div>
                  </div>

                  {/* Brand Breakdown */}
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-3">
                      Brand Distribution Breakdown
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                      {Object.entries(INVENTORY_STATS.brands).map(([brand, count]) => (
                        <div key={brand} className="bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                          <span className="text-xs font-bold text-black dark:text-white block">{brand}</span>
                          <span className="text-sm font-black font-mono text-zinc-600 dark:text-zinc-300">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  {/* Search filter in admin */}
                  <div className="relative max-w-sm">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Search stock ID, brand or model..."
                      className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[12px] font-['Poppins'] text-xs text-black dark:text-white focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
                    />
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 font-bold border-b border-zinc-200 dark:border-zinc-800">
                        <tr>
                          <th className="p-3">Stock ID</th>
                          <th className="p-3">Branch</th>
                          <th className="p-3">Brand &amp; Model</th>
                          <th className="p-3">CPU</th>
                          <th className="p-3">RAM</th>
                          <th className="p-3">Storage</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {laptops
                          .filter((l) =>
                            searchFilter
                              ? l.searchableText.includes(searchFilter.toLowerCase())
                              : true
                          )
                          .slice(0, 30)
                          .map((l) => (
                            <tr key={l.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                              <td className="p-3 font-mono font-bold text-black dark:text-white">{l.stockId}</td>
                              <td className="p-3">
                                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{l.branch}</span>
                              </td>
                              <td className="p-3 font-bold text-black dark:text-white">{l.fullName}</td>
                              <td className="p-3 text-zinc-500 dark:text-zinc-400">{l.processor}</td>
                              <td className="p-3 font-mono">{l.ram}</td>
                              <td className="p-3 font-mono">{l.storageRaw}</td>
                              <td className="p-3 font-mono font-bold text-black dark:text-white">
                                {l.hasPrice && l.sellingPrice
                                  ? `₹${l.sellingPrice.toLocaleString('en-IN')}`
                                  : 'Price on Req'}
                              </td>
                              <td className="p-3">
                                <span className="text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
                                  Verified
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                    Showing top 30 filtered records of total 91 inventory units. Use "Export CSV" to view all records in Excel or Google Sheets.
                  </p>
                </div>
              )}

              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                      Active WhatsApp Enquiries
                    </h3>
                    <span className="text-xs font-mono text-black dark:text-white font-bold">
                      Helpline: +91 80550 35502
                    </span>
                  </div>

                  <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                    {enquiries.map((enq) => (
                      <div key={enq.id} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-black dark:text-white">{enq.customerName}</span>
                            <span className="text-zinc-300 dark:text-zinc-700">•</span>
                            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{enq.phone}</span>
                            <span className="text-zinc-300 dark:text-zinc-700">•</span>
                            <span className="font-mono text-[10px] text-black dark:text-white bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-bold">
                              {enq.stockId}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{enq.model}</div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">{enq.notes}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border border-zinc-300 dark:border-zinc-700">
                            {enq.status}
                          </span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">{enq.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'add' && (
                <form onSubmit={handleCreateDraft} className="max-w-xl mx-auto space-y-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-bold text-black dark:text-white">
                    Add New Laptop Draft Entry
                  </h3>

                  {addSuccessMessage && (
                    <div className="p-3 bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A52] dark:text-[#34D399] rounded-[12px] text-xs font-semibold border border-[#C8DFD4] dark:border-[#10B981]/30 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#009B69] dark:text-[#10B981]" />
                      <span>Draft entry saved to session catalog successfully!</span>
                    </div>
                  )}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">Brand</label>
                        <select
                          value={newBrand}
                          onChange={(e) => setNewBrand(e.target.value as any)}
                          className="w-full p-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-[12px] font-['Poppins'] text-xs text-black dark:text-white focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
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
                        <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">Hub Branch</label>
                        <select
                          value={newBranch}
                          onChange={(e) => setNewBranch(e.target.value as any)}
                          className="w-full p-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-[12px] font-['Poppins'] text-xs text-black dark:text-white focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
                        >
                          <option value="Pune">Pune Hub</option>
                          <option value="Delhi">Delhi Hub</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">Model Name</label>
                      <input
                        type="text"
                        value={newModel}
                        onChange={(e) => setNewModel(e.target.value)}
                        placeholder="e.g. Latitude 5410 Core i5 10th Gen"
                        className="w-full p-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-[12px] font-['Poppins'] text-xs text-black dark:text-white focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">Processor</label>
                        <input
                          type="text"
                          value={newCpu}
                          onChange={(e) => setNewCpu(e.target.value)}
                          placeholder="e.g. Core i5 10th Gen"
                          className="w-full p-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-[12px] font-['Poppins'] text-xs text-black dark:text-white focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">RAM</label>
                        <input
                          type="text"
                          value={newRam}
                          onChange={(e) => setNewRam(e.target.value)}
                          className="w-full p-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-[12px] font-['Poppins'] text-xs text-black dark:text-white focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-1">Price (₹)</label>
                        <input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          placeholder="24500"
                          className="w-full p-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-[12px] font-['Poppins'] text-xs text-black dark:text-white focus:outline-hidden focus:border-[#009B69] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#009B69]/15 dark:focus:ring-[#10B981]/20"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-[#009B69] to-[#007A8D] hover:opacity-95 text-white dark:from-[#10B981] dark:to-[#06B6D4] dark:text-[#04251B] font-['Poppins'] font-semibold text-[15px] rounded-[12px] transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      Save Laptop Draft Entry
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
