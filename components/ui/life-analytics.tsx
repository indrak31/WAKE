"use client";

import React, { useState, useMemo } from "react";
import { Receipt, chapters } from "@/lib/lifeData";
import { 
  PieChart as PieChartIcon, 
  Coins, 
  Music, 
  ShoppingBag, 
  MapPin, 
  MessageCircle, 
  FileText, 
  Camera, 
  Search, 
  Moon, 
  Sun,
  Sparkles,
  TrendingUp,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LifeAnalyticsProps {
  filteredReceipts: Receipt[];
  className?: string;
}

// Categorization helper for purchases
function categorizePurchase(receipt: Receipt): string {
  const title = (receipt.title || "").toLowerCase();
  const subtitle = (receipt.subtitle || "").toLowerCase();
  const merchant = (receipt.details?.merchant || "").toLowerCase();

  if (
    merchant.includes("transit") || 
    merchant.includes("rail") || 
    merchant.includes("taxi") || 
    merchant.includes("auto") || 
    title.includes("train") || 
    title.includes("transit")
  ) {
    return "Transit & Commute";
  }

  if (
    merchant.includes("bakery") || 
    merchant.includes("provisions") || 
    merchant.includes("kirana") || 
    title.includes("groceries") || 
    title.includes("provisions") || 
    title.includes("bread") || 
    title.includes("bakery")
  ) {
    return "Groceries & Bakery";
  }

  if (
    merchant.includes("streaming") || 
    merchant.includes("service provider") || 
    merchant.includes("periodicals") || 
    title.includes("subscription") || 
    title.includes("booster") || 
    title.includes("journal")
  ) {
    return "Digital & Subscriptions";
  }

  if (
    merchant.includes("laundry") || 
    merchant.includes("lock") || 
    merchant.includes("key") || 
    title.includes("ironing") || 
    title.includes("key")
  ) {
    return "Living & Essentials";
  }

  return "Dining & Cafes";
}

const CATEGORY_COLORS: Record<string, { stroke: string; fill: string; text: string; glow: string }> = {
  "Dining & Cafes": {
    stroke: "#f59e0b", // amber
    fill: "rgba(245, 158, 11, 0.2)",
    text: "text-amber-400",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  "Groceries & Bakery": {
    stroke: "#10b981", // emerald
    fill: "rgba(16, 185, 129, 0.2)",
    text: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  "Transit & Commute": {
    stroke: "#38bdf8", // sky
    fill: "rgba(56, 189, 248, 0.2)",
    text: "text-sky-400",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  "Digital & Subscriptions": {
    stroke: "#a855f7", // purple
    fill: "rgba(168, 85, 247, 0.2)",
    text: "text-purple-400",
    glow: "rgba(168, 85, 247, 0.4)",
  },
  "Living & Essentials": {
    stroke: "#f43f5e", // rose
    fill: "rgba(244, 63, 94, 0.2)",
    text: "text-rose-400",
    glow: "rgba(244, 63, 94, 0.4)",
  },
};

const ACTIVITY_COLORS: Record<string, { stroke: string; fill: string; text: string; icon: any }> = {
  music: { stroke: "#8b5cf6", fill: "rgba(139, 92, 246, 0.25)", text: "text-violet-400", icon: Music },
  purchase: { stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.25)", text: "text-amber-400", icon: ShoppingBag },
  place: { stroke: "#10b981", fill: "rgba(16, 185, 129, 0.25)", text: "text-emerald-400", icon: MapPin },
  message: { stroke: "#3b82f6", fill: "rgba(59, 130, 246, 0.25)", text: "text-blue-400", icon: MessageCircle },
  note: { stroke: "#eab308", fill: "rgba(234, 179, 8, 0.25)", text: "text-yellow-400", icon: FileText },
  photo: { stroke: "#06b6d4", fill: "rgba(6, 182, 212, 0.25)", text: "text-cyan-400", icon: Camera },
  search: { stroke: "#a1a1aa", fill: "rgba(161, 161, 170, 0.25)", text: "text-zinc-400", icon: Search },
};

/**
 * Interactive SVG Donut / Pie Chart Component
 */
function DonutChart({
  data,
  totalValue,
  centerLabel,
  centerSub,
  activeIdx,
  onHover,
}: {
  data: { label: string; value: number; color: string; percent: number }[];
  totalValue: string;
  centerLabel: string;
  centerSub: string;
  activeIdx: number | null;
  onHover: (idx: number | null) => void;
}) {
  const size = 260;
  const radius = 95;
  const strokeWidth = 28;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="relative flex items-center justify-center select-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background track circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />

        {data.map((item, idx) => {
          const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -((cumulativePercent / 100) * circumference);
          cumulativePercent += item.percent;

          const isHovered = activeIdx === idx;
          const isDimmed = activeIdx !== null && activeIdx !== idx;

          return (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: isDimmed ? 0.3 : 1,
                filter: isHovered ? `drop-shadow(0 0 10px ${item.color})` : "none",
              }}
              onMouseEnter={() => onHover(idx)}
              onMouseLeave={() => onHover(null)}
            />
          );
        })}
      </svg>

      {/* Center dynamic info readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
        <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
          {centerLabel}
        </span>
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-1">
          {centerSub}
        </span>
      </div>
    </div>
  );
}

export const LifeAnalytics: React.FC<LifeAnalyticsProps> = ({ filteredReceipts, className }) => {
  const [hoveredExpenseIdx, setHoveredExpenseIdx] = useState<number | null>(null);
  const [hoveredActivityIdx, setHoveredActivityIdx] = useState<number | null>(null);

  // 1. FINANCIAL PIE DATA
  const { expenseData, totalSpent } = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    let total = 0;

    for (const r of filteredReceipts) {
      const amount = r.details?.total || 0;
      if (amount > 0) {
        const cat = categorizePurchase(r);
        categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
        total += amount;
      }
    }

    const items = Object.entries(categoryTotals).map(([label, value]) => ({
      label,
      value,
      percent: total > 0 ? (value / total) * 100 : 0,
      color: CATEGORY_COLORS[label]?.stroke || "#a855f7",
      textColor: CATEGORY_COLORS[label]?.text || "text-purple-400",
    }));

    // Sort descending by value
    items.sort((a, b) => b.value - a.value);

    return { expenseData: items, totalSpent: total };
  }, [filteredReceipts]);

  // 2. ACTIVITY PIE DATA
  const { activityData, totalActivities } = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = filteredReceipts.length;

    for (const r of filteredReceipts) {
      counts[r.type] = (counts[r.type] || 0) + 1;
    }

    const items = Object.entries(counts).map(([type, count]) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      type,
      value: count,
      percent: total > 0 ? (count / total) * 100 : 0,
      color: ACTIVITY_COLORS[type]?.stroke || "#8b5cf6",
      textColor: ACTIVITY_COLORS[type]?.text || "text-violet-400",
      icon: ACTIVITY_COLORS[type]?.icon || Activity,
    }));

    items.sort((a, b) => b.value - a.value);

    return { activityData: items, totalActivities: total };
  }, [filteredReceipts]);

  // 3. TEMPORAL / INSOMNIA DISTRIBUTION (1-4 AM vs Daytime)
  const { lateNightCount, daytimeCount, lateNightPct } = useMemo(() => {
    let late = 0;
    let day = 0;
    for (const r of filteredReceipts) {
      const d = new Date(r.timestamp);
      const hour = d.getHours();
      if (hour >= 1 && hour <= 4) {
        late++;
      } else {
        day++;
      }
    }
    const total = late + day;
    return {
      lateNightCount: late,
      daytimeCount: day,
      lateNightPct: total > 0 ? Math.round((late / total) * 100) : 0,
    };
  }, [filteredReceipts]);

  // Active expense center readout
  const activeExpense = hoveredExpenseIdx !== null ? expenseData[hoveredExpenseIdx] : null;
  const expenseCenterValue = activeExpense ? `$${activeExpense.value.toFixed(2)}` : `$${totalSpent.toFixed(2)}`;
  const expenseCenterSub = activeExpense ? `${activeExpense.label} (${activeExpense.percent.toFixed(1)}%)` : "Total Money Spent";

  // Active activity center readout
  const activeActivity = hoveredActivityIdx !== null ? activityData[hoveredActivityIdx] : null;
  const activityCenterValue = activeActivity ? `${activeActivity.value}` : `${totalActivities}`;
  const activityCenterSub = activeActivity ? `${activeActivity.label} (${activeActivity.percent.toFixed(1)}%)` : "Total Life Fragments";

  return (
    <section
      id="analytics"
      className={cn(
        "relative w-full py-24 px-4 sm:px-6 lg:px-12 bg-neutral-950/80 border-t border-b border-violet-500/15 overflow-hidden select-none",
        className
      )}
      style={{
        background: "linear-gradient(180deg, rgba(9, 5, 20, 0.95) 0%, rgba(18, 9, 38, 0.90) 50%, rgba(9, 5, 20, 0.95) 100%)",
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-150 h-150 rounded-full bg-violet-600/12 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-150 h-150 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <PieChartIcon className="w-3.5 h-3.5 text-violet-400" />
            <span>Digital Life Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
            The Life Breakdown
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
            Every transaction, late-night playlist loop, and transit pass tells a quantitative story. Hover over the segments to trace the patterns.
          </p>
        </div>

        {/* Two Primary Pie Graph Analytics Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* PANEL 1: MONEY SPENT PIE GRAPH */}
          <div className="relative rounded-3xl bg-neutral-900/60 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/60 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    Financial Tracing
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    Itemized expenses across daily household & digital receipts
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400/80 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                ${totalSpent.toFixed(2)} Total
              </span>
            </div>

            {/* Donut Chart & Legend Row */}
            <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-8">
              <DonutChart
                data={expenseData}
                totalValue={`$${totalSpent.toFixed(2)}`}
                centerLabel={expenseCenterValue}
                centerSub={expenseCenterSub}
                activeIdx={hoveredExpenseIdx}
                onHover={setHoveredExpenseIdx}
              />

              {/* Dynamic Interactive Legend */}
              <div className="w-full sm:w-auto space-y-2.5 font-mono text-xs">
                {expenseData.map((item, idx) => {
                  const isHovered = hoveredExpenseIdx === idx;
                  return (
                    <div
                      key={item.label}
                      onMouseEnter={() => setHoveredExpenseIdx(idx)}
                      onMouseLeave={() => setHoveredExpenseIdx(null)}
                      className={cn(
                        "flex items-center justify-between gap-4 px-3 py-2 rounded-xl transition-all cursor-pointer border",
                        isHovered
                          ? "bg-white/10 border-white/25 shadow-lg scale-[1.02]"
                          : "bg-neutral-950/40 border-white/5 hover:border-white/15"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-neutral-200 font-sans font-medium text-xs">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={cn("font-bold", item.textColor)}>
                          ${item.value.toFixed(2)}
                        </span>
                        <span className="text-neutral-500 text-[10px]">
                          ({item.percent.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Insight Bar */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-sans">
              <span>Primary spend driver:</span>
              <span className="text-amber-300 font-medium font-mono">
                {expenseData[0]?.label || "N/A"} (${expenseData[0]?.value.toFixed(2) || 0})
              </span>
            </div>
          </div>

          {/* PANEL 2: ACTIVITY & FRAGMENTS PIE GRAPH */}
          <div className="relative rounded-3xl bg-neutral-900/60 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/60 hover:border-violet-500/30 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    Activity Footprint
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    Distribution of digital fragments, audio logs, and moments
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-violet-400/80 bg-violet-400/10 px-2.5 py-1 rounded-full border border-violet-400/20">
                {totalActivities} Fragments
              </span>
            </div>

            {/* Donut Chart & Legend Row */}
            <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-8">
              <DonutChart
                data={activityData}
                totalValue={`${totalActivities}`}
                centerLabel={activityCenterValue}
                centerSub={activityCenterSub}
                activeIdx={hoveredActivityIdx}
                onHover={setHoveredActivityIdx}
              />

              {/* Dynamic Interactive Legend */}
              <div className="w-full sm:w-auto space-y-2.5 font-mono text-xs">
                {activityData.map((item, idx) => {
                  const Icon = item.icon;
                  const isHovered = hoveredActivityIdx === idx;
                  return (
                    <div
                      key={item.label}
                      onMouseEnter={() => setHoveredActivityIdx(idx)}
                      onMouseLeave={() => setHoveredActivityIdx(null)}
                      className={cn(
                        "flex items-center justify-between gap-4 px-3 py-2 rounded-xl transition-all cursor-pointer border",
                        isHovered
                          ? "bg-white/10 border-white/25 shadow-lg scale-[1.02]"
                          : "bg-neutral-950/40 border-white/5 hover:border-white/15"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                        <span className="text-neutral-200 font-sans font-medium text-xs">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={cn("font-bold", item.textColor)}>
                          {item.value} {item.value === 1 ? "moment" : "moments"}
                        </span>
                        <span className="text-neutral-500 text-[10px]">
                          ({item.percent.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Insight Bar */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-sans">
              <span>Dominant life activity:</span>
              <span className="text-violet-300 font-medium font-mono">
                {activityData[0]?.label || "N/A"} ({activityData[0]?.percent.toFixed(0) || 0}%)
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 3: TEMPORAL INSOMNIA CURVE & SUMMARY CALLOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Insomnia vs Daytime Meter */}
          <div className="md:col-span-2 rounded-2xl bg-neutral-900/50 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">The 2 AM Insomnia Shift</h4>
                  <span className="text-[11px] text-neutral-400 font-sans">Late-night activity vs daytime hours</span>
                </div>
              </div>
              <span className="text-xs font-mono text-sky-400 font-bold">
                {lateNightPct}% Late Night
              </span>
            </div>

            {/* Dual Color Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-white/10 flex">
                <div
                  className="h-full bg-linear-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  style={{ width: `${lateNightPct}%` }}
                />
                <div
                  className="h-full bg-linear-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700 opacity-80"
                  style={{ width: `${100 - lateNightPct}%` }}
                />
              </div>

              <div className="flex justify-between text-xs font-mono pt-1 text-neutral-400">
                <span className="flex items-center gap-1.5 text-sky-300">
                  <Moon className="w-3 h-3 text-sky-400" />
                  {lateNightCount} Insomnia streams (1:00 AM – 4:59 AM)
                </span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Sun className="w-3 h-3 text-amber-400" />
                  {daytimeCount} Daytime & evening moments
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-sans mt-3 leading-relaxed">
              Early chapters show heavy late-night repeat loops on The Weeknd, Lana Del Rey, and The Strokes. After the June 14 turning point, activity abruptly shifts into daytime routines.
            </p>
          </div>

          {/* Emotional Trajectory Summary */}
          <div className="rounded-2xl bg-neutral-900/50 border border-white/10 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">The Pattern Arc</h4>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Phase 1 (Jan–Mar):</span>
                <span className="text-neutral-200">Solo Insomnia</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Phase 2 (Apr–May):</span>
                <span className="text-neutral-200">Neighborhood Walk</span>
              </div>
              <div className="flex justify-between text-purple-300 font-bold pt-1 border-t border-white/10">
                <span>Phase 3 (Jun–Sep):</span>
                <span>The Shared Routine</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>4 hidden hinges connect this dataset</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
