import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Laptop, LAPTOP_INVENTORY } from '../data/laptops';
import { TrendingDown, TrendingUp, BarChart2, ShieldCheck, Tag } from 'lucide-react';

interface PriceComparisonChartProps {
  currentLaptop: Laptop;
}

export const PriceComparisonChart: React.FC<PriceComparisonChartProps> = ({ currentLaptop }) => {
  const [viewMode, setViewMode] = useState<'similar' | 'tiers'>('similar');

  // Compute similar laptops and stats
  const { chartData, tierData, stats } = useMemo(() => {
    // 1. Filter priced laptops in the same processor category
    const sameProcessorPriced = LAPTOP_INVENTORY.filter(
      (l) => l.hasPrice && l.sellingPrice !== null && l.processorCategory === currentLaptop.processorCategory
    );

    // Fallback if very few items in category
    const pool = sameProcessorPriced.length >= 4 
      ? sameProcessorPriced 
      : LAPTOP_INVENTORY.filter((l) => l.hasPrice && l.sellingPrice !== null);

    // Calculate segment stats
    const prices = pool.map((l) => l.sellingPrice as number);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Pick 5-7 diverse comparable laptops including the current one
    let candidates = pool.filter((l) => l.id !== currentLaptop.id);
    
    // Sort candidates by closeness to current price or generation
    candidates.sort((a, b) => {
      const priceA = a.sellingPrice ?? 0;
      const priceB = b.sellingPrice ?? 0;
      const target = currentLaptop.sellingPrice ?? avgPrice;
      return Math.abs(priceA - target) - Math.abs(priceB - target);
    });

    const selectedCandidates = candidates.slice(0, 5);

    // Build similar items chart list
    const combined = [...selectedCandidates];
    if (currentLaptop.hasPrice && currentLaptop.sellingPrice !== null) {
      combined.push(currentLaptop);
    }

    // Sort by price ascending for clear visual progression
    combined.sort((a, b) => (a.sellingPrice ?? 0) - (b.sellingPrice ?? 0));

    const chartData = combined.map((item) => {
      const isSelected = item.id === currentLaptop.id;
      const shortName = isSelected
        ? `★ ${item.brand} (This Unit)`
        : `${item.brand} ${item.model.split(' ')[0]} (${item.ram})`;

      return {
        id: item.id,
        stockId: item.stockId,
        fullName: item.fullName,
        brand: item.brand,
        model: item.model,
        branch: item.branch,
        ram: item.ram,
        storage: item.storageRaw,
        processor: item.processor,
        price: item.sellingPrice ?? 0,
        shortName,
        isSelected,
      };
    });

    // 2. RAM tier price averages for this category
    const ramGroups: Record<number, number[]> = {};
    pool.forEach((item) => {
      if (item.sellingPrice) {
        if (!ramGroups[item.ramGb]) ramGroups[item.ramGb] = [];
        ramGroups[item.ramGb].push(item.sellingPrice);
      }
    });

    const tierData = Object.keys(ramGroups)
      .map(Number)
      .sort((a, b) => a - b)
      .map((ramGb) => {
        const groupPrices = ramGroups[ramGb];
        const avg = Math.round(groupPrices.reduce((a, b) => a + b, 0) / groupPrices.length);
        const isCurrentTier = currentLaptop.ramGb === ramGb;
        return {
          tier: `${ramGb}GB RAM`,
          ramGb,
          avgPrice: avg,
          count: groupPrices.length,
          isCurrentTier,
        };
      });

    return {
      chartData,
      tierData,
      stats: {
        avgPrice,
        minPrice,
        maxPrice,
        totalInSegment: pool.length,
      },
    };
  }, [currentLaptop]);

  const currentPrice = currentLaptop.sellingPrice;
  const priceDiff = currentPrice !== null ? currentPrice - stats.avgPrice : null;
  const isBelowAvg = priceDiff !== null && priceDiff < 0;

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-[#F8FBF9] dark:bg-[#152227] border border-[#E3EBE7] dark:border-[#22353D] space-y-4 shadow-2xs transition-colors">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[10px] bg-[#E8F7EE] dark:bg-[#10B981]/15 text-[#007A8D] dark:text-[#10B981] flex items-center justify-center shrink-0 border border-[#BCE7CB] dark:border-[#10B981]/30">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-['Urbanist'] font-bold text-zinc-950 dark:text-white">
              Price History &amp; Inventory Comparison
            </h3>
          </div>
          <p className="text-xs font-['Poppins'] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Compare this unit against similar {currentLaptop.processorCategory} laptops across Pune &amp; Delhi hubs.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-[#E8F7EE]/60 dark:bg-[#0E1519] p-1 rounded-xl shrink-0 self-start sm:self-auto font-['Poppins'] border border-[#E3EBE7] dark:border-[#22353D]">
          <button
            type="button"
            onClick={() => setViewMode('similar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
              viewMode === 'similar'
                ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-[#009B69] dark:hover:text-[#10B981]'
            }`}
          >
            Similar Models
          </button>
          <button
            type="button"
            onClick={() => setViewMode('tiers')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
              viewMode === 'tiers'
                ? 'bg-gradient-to-r from-[#009B69] to-[#007A8D] text-white shadow-xs font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-[#009B69] dark:hover:text-[#10B981]'
            }`}
          >
            RAM Tier Averages
          </button>
        </div>
      </div>

      {/* KPI Cards / Price Insights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-['Poppins']">
        <div className="p-3 bg-white dark:bg-[#0E1519] rounded-xl border border-[#E3EBE7] dark:border-[#22353D] shadow-2xs">
          <span className="text-zinc-500 dark:text-zinc-400 block text-[11px] font-medium">Selected Unit</span>
          <span className="text-sm sm:text-base font-mono font-black text-[#009B69] dark:text-[#10B981] block mt-0.5">
            {currentLaptop.hasPrice && currentPrice !== null
              ? `₹${currentPrice.toLocaleString('en-IN')}`
              : 'Contact'}
          </span>
          <span className="text-[10px] text-[#007A8D] dark:text-[#06B6D4] font-semibold mt-0.5 flex items-center gap-1">
            <Tag className="w-2.5 h-2.5" />
            Stock #{currentLaptop.stockId}
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-[#0E1519] rounded-xl border border-[#E3EBE7] dark:border-[#22353D] shadow-2xs">
          <span className="text-zinc-500 dark:text-zinc-400 block text-[11px] font-medium">Category Average</span>
          <span className="text-sm sm:text-base font-mono font-bold text-zinc-950 dark:text-white block mt-0.5">
            ₹{stats.avgPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
            Across {stats.totalInSegment} tested units
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-[#0E1519] rounded-xl border border-[#E3EBE7] dark:border-[#22353D] shadow-2xs">
          <span className="text-zinc-500 dark:text-zinc-400 block text-[11px] font-medium">Segment Starting At</span>
          <span className="text-sm sm:text-base font-mono font-bold text-zinc-950 dark:text-white block mt-0.5">
            ₹{stats.minPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
            Lowest in {currentLaptop.processorCategory}
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-[#0E1519] rounded-xl border border-[#E3EBE7] dark:border-[#22353D] shadow-2xs">
          <span className="text-zinc-500 dark:text-zinc-400 block text-[11px] font-medium">Pricing Assessment</span>
          {currentPrice !== null && priceDiff !== null ? (
            <div className="mt-0.5">
              <span
                className={`text-xs font-bold inline-flex items-center gap-1 ${
                  isBelowAvg ? 'text-[#009B69] dark:text-[#10B981]' : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {isBelowAvg ? (
                  <TrendingDown className="w-3.5 h-3.5 text-[#009B69] dark:text-[#10B981]" />
                ) : (
                  <TrendingUp className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                )}
                {isBelowAvg
                  ? `₹${Math.abs(priceDiff).toLocaleString('en-IN')} Below Avg`
                  : `₹${priceDiff.toLocaleString('en-IN')} Above Avg`}
              </span>
              <span className="text-[10px] text-[#007A8D] dark:text-[#06B6D4] font-semibold block mt-0.5 truncate">
                {isBelowAvg ? 'High Value Deal' : 'Premium Configuration'}
              </span>
            </div>
          ) : (
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mt-0.5 block">
              Enquire on WhatsApp
            </span>
          )}
        </div>
      </div>

        <div className="bg-white dark:bg-[#0E1519] rounded-xl border border-[#E3EBE7] dark:border-[#22353D] p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-bold text-zinc-950 dark:text-white">
              {viewMode === 'similar'
                ? 'Model-by-Model Price Comparison in PunarTech Stock'
                : `Average Price by RAM Configuration (${currentLaptop.processorCategory})`}
            </span>
            <span className="text-[11px] font-mono text-[#007A8D] dark:text-[#10B981] hidden sm:inline">
              Prices in INR (₹)
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            {viewMode === 'similar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 16, right: 12, left: 0, bottom: 24 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} opacity={0.4} />
                  <XAxis
                    dataKey="shortName"
                    tick={{ fontSize: 10, fill: '#71717a', fontWeight: 600 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={35}
                  />
                  <YAxis
                    tickFormatter={(val) => `₹${Math.round(val / 1000)}k`}
                    tick={{ fontSize: 10, fill: '#71717a' }}
                    domain={[0, 'dataMax + 4000']}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#090E11] text-white text-xs p-3 rounded-xl shadow-xl border border-[#22353D] max-w-xs space-y-1">
                            <div className="flex items-center justify-between gap-2 border-b border-[#22353D] pb-1">
                              <span className="font-bold text-white truncate">{data.fullName}</span>
                              {data.isSelected && (
                                <span className="bg-[#009B69] text-white text-[9px] font-black px-1.5 py-0.5 rounded-[4px]">
                                  Selected
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[#10B981] font-extrabold text-sm pt-0.5">
                              ₹{data.price.toLocaleString('en-IN')}
                            </div>
                            <div className="text-[11px] text-zinc-300 space-y-0.5 pt-0.5 font-['Poppins']">
                              <div>Stock ID: <span className="font-mono text-[#06B6D4]">{data.stockId}</span> ({data.branch} Hub)</div>
                              <div>Specs: <span className="text-white">{data.ram} RAM · {data.storage}</span></div>
                              <div>CPU: <span className="text-white">{data.processor}</span></div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={stats.avgPrice}
                    stroke="#007A8D"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: `Avg: ₹${stats.avgPrice.toLocaleString('en-IN')}`,
                      position: 'top',
                      fill: '#007A8D',
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  />
                  <Bar dataKey="price" radius={[8, 8, 0, 0]} maxBarSize={48}>
                    {chartData.map((entry) => (
                      <Cell
                        key={`cell-${entry.id}`}
                        fill={entry.isSelected ? '#009B69' : '#007A8D'}
                        opacity={entry.isSelected ? 1 : 0.45}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tierData}
                  margin={{ top: 16, right: 12, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} opacity={0.4} />
                  <XAxis
                    dataKey="tier"
                    tick={{ fontSize: 11, fill: '#71717a', fontWeight: 600 }}
                  />
                  <YAxis
                    tickFormatter={(val) => `₹${Math.round(val / 1000)}k`}
                    tick={{ fontSize: 10, fill: '#71717a' }}
                    domain={[0, 'dataMax + 5000']}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#090E11] text-white text-xs p-3 rounded-xl shadow-xl border border-[#22353D] space-y-1">
                            <span className="font-bold text-white block">{data.tier} Configuration</span>
                            <span className="font-mono text-[#10B981] font-extrabold text-sm block">
                              Average: ₹{data.avgPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[11px] text-zinc-400 block">
                              Based on {data.count} units in stock
                            </span>
                            {data.isCurrentTier && (
                              <span className="text-[10px] text-[#009B69] font-bold block pt-1">
                                ✓ Matches current selected laptop ({currentLaptop.ram})
                              </span>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="avgPrice" radius={[6, 6, 0, 0]} maxBarSize={56}>
                    {tierData.map((entry) => (
                      <Cell
                        key={`cell-tier-${entry.ramGb}`}
                        fill={entry.isCurrentTier ? '#009B69' : '#007A8D'}
                        opacity={entry.isCurrentTier ? 1 : 0.45}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Legend / Key */}
          <div className="mt-2 pt-2 border-t border-[#E3EBE7] dark:border-[#22353D] flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#009B69] inline-block" />
                <span className="font-semibold text-zinc-900 dark:text-white">Selected Unit ({currentLaptop.stockId})</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#007A8D]/50 inline-block" />
                <span>Similar Inventory Models</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#007A8D] border-t border-dashed border-[#007A8D] inline-block" />
                <span>Segment Average</span>
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#009B69] dark:text-[#10B981] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PunarTech Live Inventory Price Guarantee</span>
            </div>
          </div>
        </div>
    </div>
  );
};
