"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Moon, Sun, Heart, DollarSign, Music, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  children: React.ReactNode;
}

function MetricCard({ title, subtitle, badge, icon: Icon, accentColor, children }: MetricCardProps) {
  return (
    <div className="relative rounded-2xl bg-neutral-900/60 border border-white/10 p-5 md:p-6 backdrop-blur-md shadow-xl overflow-hidden hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
              {badge}
            </span>
            <h4 className="text-base font-bold text-white leading-tight">{title}</h4>
          </div>
        </div>
      </div>

      <div className="mb-3">{children}</div>

      <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-3 border-t border-white/5">
        {subtitle}
      </p>
    </div>
  );
}

export const LifeMetrics: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section
      id="metrics"
      className={cn(
        "relative w-full py-20 px-4 md:px-8 lg:px-12 bg-neutral-950 border-b border-white/5 select-none",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
            The Patterns
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 font-sans">
            What the data quietly recorded across ten months.
          </p>
        </div>

        {/* 4 Interactive Metric Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Metric 1: The Insomnia Curve */}
          <MetricCard
            title="The 2 AM Shift"
            badge="Activity Distribution"
            icon={Moon}
            accentColor="#38bdf8"
            subtitle="68% of activity occurred between 1 AM–4 AM in Jan/Feb. Dropped to 0% after June 14."
          >
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-neutral-300">
                <span>Jan–Feb (Sleepless)</span>
                <span className="text-sky-400 font-bold">68% Late Night</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full w-[68%]" />
              </div>

              <div className="flex justify-between text-neutral-400 pt-1">
                <span>July–Sept (Settled)</span>
                <span className="text-emerald-400 font-bold">0% 2 AM Activity</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full w-[4%]" />
              </div>
            </div>
          </MetricCard>

          {/* Metric 2: Financial Shift (Solo ⟶ Joint) */}
          <MetricCard
            title="$1,420.52 Logged"
            badge="Transaction Arc"
            icon={DollarSign}
            accentColor="#fbbf24"
            subtitle="Started with solo moving costs ($102.45) and evolved into pairs: 'Two Coffees' and 'Second Key Cut'."
          >
            <div className="bg-neutral-950/80 rounded-xl p-3 border border-white/5 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Solo Relocation:</span>
                <span className="text-white">$222.45</span>
              </div>
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Home & Coffee Beans:</span>
                <span className="text-white">$169.50</span>
              </div>
              <div className="flex justify-between text-amber-400 font-bold pt-1 border-t border-neutral-800 text-[11px]">
                <span>Shared / &lsquo;Admit Two&rsquo;:</span>
                <span>$214.75</span>
              </div>
            </div>
          </MetricCard>

          {/* Metric 3: The Sam Trajectory */}
          <MetricCard
            title="The &lsquo;Sam&rsquo; Vector"
            badge="Relationship Footprint"
            icon={Heart}
            accentColor="#fb7185"
            subtitle="From an unsaid draft in February to 12 shared receipts and a second key cut by September."
          >
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-neutral-300">
                <span>Feb 04</span>
                <span className="text-neutral-500 italic font-sans">&lsquo;things to say if he asks&rsquo;</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-300">
                <span>Mar 03</span>
                <span className="text-neutral-400">&lsquo;20 min from Sam&rsquo;s apt&rsquo;</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-rose-400 font-bold">
                <span>Sep 06</span>
                <span>Second Brass Key Cut #2</span>
              </div>
            </div>
          </MetricCard>

          {/* Metric 4: The Hinge Day (June 14) */}
          <MetricCard
            title="June 14: The Hinge"
            badge="Pivotal Convergence"
            icon={Sparkles}
            accentColor="#a855f7"
            subtitle="5 distinct receipts across 4 types occurred within 4 hours and 46 minutes."
          >
            <div className="bg-purple-950/20 border border-purple-800/30 rounded-xl p-3 text-xs font-mono text-purple-200">
              <div className="flex justify-between font-bold text-white mb-1">
                <span>07:12 PM ⟶ 11:58 PM</span>
                <span className="text-purple-400">4.75 hrs</span>
              </div>
              <p className="text-[11px] text-neutral-300 font-sans leading-tight">
                First song play • Park bench • Uncaptioned photo • Two coffees • &ldquo;today was good.&rdquo;
              </p>
            </div>
          </MetricCard>
        </div>
      </div>
    </section>
  );
};
