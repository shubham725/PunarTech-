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
import { BarChart2, ShieldCheck, TrendingDown, TrendingUp } from 'lucide-react';

interface PriceComparisonChartProps {
  currentLaptop: Laptop;
}

export const PriceComparisonChart: React.FC<PriceComparisonChartProps> = ({ currentLaptop }) => {
  const [viewMode, setViewMode] = useState<'similar' | 'tiers'>('similar');

  const { chartData, tierData, stats } = useMemo(() => {
    const sameProcessorPriced = LAPTOP_INVENTORY.filter(
      (l) => l.hasPrice && l.sellingPrice !== null && l.processorCategory === currentLaptop.processorCategory
    );

    const pool =
      sameProcessorPriced.length >= 4
        ? sameProcessorPriced
        : LAPTOP_INVENTORY.filter((l) => l.hasPrice && l.sellingPrice !== null);

    const prices = pool.map((l) => l.sellingPrice as number);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const candidates = pool.filter((l) => l.id !== currentLaptop.id);
    candidates.sort((a, b) => {
      const priceA = a.sellingPrice ?? 0;
      const priceB = b.sellingPrice ?? 0;
      const target = currentLaptop.sellingPrice ?? avgPrice;
      return Math.abs(priceA - target) - Math.abs(priceB - target);
    });

    const selectedCandidates = candidates.slice(0, 5);
    const combined = [...selectedCandidates];
    if (currentLaptop.hasPrice && currentLaptop.sellingPrice !== null) {
      combined.push(currentLaptop);
    }

    combined.sort((a, b) => (a.sellingPrice ?? 0) - (b.sellingPrice ?? 0));

    const chartData = combined.map((item) => {
      const isSelected = item.id === currentLaptop.id;
      const shortName = isSelected
        ? `${item.stockId} (This Unit)`
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
    <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#18242D] border border-[#E2E8F0] dark:border-[#263846] space-y-4">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#059669] dark:text-[#10B981]" />
            <h3 className="text-sm sm:text-base font-bold text-[#17212B] dark:text-white">
              Segment Price Comparison
            </h3>
          </div>
          <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-0.5">
            Compared against similar {currentLaptop.processorCategory} units across Pune &amp; Delhi hubs.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 bg-white dark:bg-[#121B22] p-1 rounded-lg border border-[#E2E8F0] dark:border-[#263846] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('similar')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              viewMode === 'similar'
                ? 'bg-[#17212B] dark:bg-[#059669] text-white'
                : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white'
            }`}
          >
            Similar Models
          </button>
          <button
            type="button"
            onClick={() => setViewMode('tiers')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              viewMode === 'tiers'
                ? 'bg-[#17212B] dark:bg-[#059669] text-white'
                : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#17212B] dark:hover:text-white'
            }`}
          >
            RAM Averages
          </button>
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 bg-white dark:bg-[#121B22] rounded-lg border border-[#E2E8F0] dark:border-[#263846]">
          <span className="text-[#475569] dark:text-[#94A3B8] block text-[11px]">Selected Unit</span>
          <span className="text-sm sm:text-base font-mono font-bold text-[#059669] dark:text-[#10B981] block mt-0.5 tabular-nums">
            {currentLaptop.hasPrice && currentPrice !== null
              ? `₹${currentPrice.toLocaleString('en-IN')}`
              : 'On Request'}
          </span>
          <span className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
            {currentLaptop.stockId}
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-[#121B22] rounded-lg border border-[#E2E8F0] dark:border-[#263846]">
          <span className="text-[#475569] dark:text-[#94A3B8] block text-[11px]">Segment Average</span>
          <span className="text-sm sm:text-base font-mono font-bold text-[#17212B] dark:text-white block mt-0.5 tabular-nums">
            ₹{stats.avgPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5">
            {stats.totalInSegment} units
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-[#121B22] rounded-lg border border-[#E2E8F0] dark:border-[#263846]">
          <span className="text-[#475569] dark:text-[#94A3B8] block text-[11px]">Segment Low</span>
          <span className="text-sm sm:text-base font-mono font-bold text-[#17212B] dark:text-white block mt-0.5 tabular-nums">
            ₹{stats.minPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] block mt-0.5 truncate">
            {currentLaptop.processorCategory}
          </span>
        </div>

        <div className="p-3 bg-white dark:bg-[#121B22] rounded-lg border border-[#E2E8F0] dark:border-[#263846]">
          <span className="text-[#475569] dark:text-[#94A3B8] block text-[11px]">Variance</span>
          {currentPrice !== null && priceDiff !== null ? (
            <div className="mt-0.5">
              <span
                className={`text-xs font-bold inline-flex items-center gap-1 tabular-nums ${
                  isBelowAvg ? 'text-[#059669] dark:text-[#10B981]' : 'text-[#17212B] dark:text-[#E2E8F0]'
                }`}
              >
                {isBelowAvg ? (
                  <TrendingDown className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
                ) : (
                  <TrendingUp className="w-3.5 h-3.5 text-[#64748B] dark:text-[#94A3B8]" />
                )}
                {isBelowAvg
                  ? `₹${Math.abs(priceDiff).toLocaleString('en-IN')} Below`
                  : `₹${priceDiff.toLocaleString('en-IN')} Above`}
              </span>
              <span className="text-[10px] text-[#0D9488] dark:text-[#14B8A6] font-medium block mt-0.5">
                {isBelowAvg ? 'Value configuration' : 'Higher spec tier'}
              </span>
            </div>
          ) : (
            <span className="text-xs font-semibold text-[#475569] dark:text-[#94A3B8] mt-1 block">
              Enquire for Quote
            </span>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-white dark:bg-[#121B22] rounded-lg border border-[#E2E8F0] dark:border-[#263846] p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="font-semibold text-[#17212B] dark:text-white">
            {viewMode === 'similar'
              ? 'Comparable Stock Pricing'
              : `Average Price by RAM (${currentLaptop.processorCategory})`}
          </span>
          <span className="text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] hidden sm:inline">
            INR (₹)
          </span>
        </div>

        <div className="h-60 sm:h-64 w-full">
          {viewMode === 'similar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 16, right: 12, left: 0, bottom: 24 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} opacity={0.35} />
                <XAxis
                  dataKey="shortName"
                  tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }}
                  interval={0}
                  angle={-12}
                  textAnchor="end"
                  height={35}
                />
                <YAxis
                  tickFormatter={(val) => `₹${Math.round(val / 1000)}k`}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  domain={[0, 'dataMax + 4000']}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#17212B] text-white text-xs p-3 rounded-lg shadow-lg border border-[#2C3F4E] max-w-xs space-y-1">
                          <div className="flex items-center justify-between gap-2 border-b border-[#2C3F4E] pb-1">
                            <span className="font-bold text-white truncate">{data.fullName}</span>
                            {data.isSelected && (
                              <span className="bg-[#059669] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                Selected
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-[#10B981] font-bold text-sm tabular-nums">
                            ₹{data.price.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] text-[#CBD5E1] space-y-0.5">
                            <div>
                              Stock: <span className="font-mono text-white">{data.stockId}</span> ({data.branch})
                            </div>
                            <div>
                              {data.ram} RAM · {data.storage}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={stats.avgPrice}
                  stroke="#0D9488"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: `Avg ₹${stats.avgPrice.toLocaleString('en-IN')}`,
                    position: 'top',
                    fill: '#0D9488',
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                />
                <Bar dataKey="price" radius={[4, 4, 0, 0]} maxBarSize={44}>
                  {chartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.id}`}
                      fill={entry.isSelected ? '#059669' : '#64748B'}
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
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} opacity={0.35} />
                <XAxis
                  dataKey="tier"
                  tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
                />
                <YAxis
                  tickFormatter={(val) => `₹${Math.round(val / 1000)}k`}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  domain={[0, 'dataMax + 5000']}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#17212B] text-white text-xs p-3 rounded-lg shadow-lg border border-[#2C3F4E] space-y-1">
                          <span className="font-bold text-white block">{data.tier}</span>
                          <span className="font-mono text-[#10B981] font-bold text-sm block tabular-nums">
                            Avg: ₹{data.avgPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-[#94A3B8] block">
                            Across {data.count} stock units
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="avgPrice" radius={[4, 4, 0, 0]} maxBarSize={52}>
                  {tierData.map((entry) => (
                    <Cell
                      key={`cell-tier-${entry.ramGb}`}
                      fill={entry.isCurrentTier ? '#059669' : '#64748B'}
                      opacity={entry.isCurrentTier ? 1 : 0.45}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mt-2 pt-2 border-t border-[#E2E8F0] dark:border-[#263846] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#059669] inline-block" />
              <span className="font-medium text-[#17212B] dark:text-white">This Unit ({currentLaptop.stockId})</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#64748B]/50 inline-block" />
              <span>Comparable Inventory</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[#059669] dark:text-[#10B981] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified PunarTech Stock Pricing</span>
          </span>
        </div>
      </div>
    </div>
  );
};
