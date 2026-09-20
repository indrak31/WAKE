"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Chapter, Receipt, chapters, getLinkReason } from "@/lib/lifeData";
import { ReceiptCard } from "@/components/ui/receipt-cards";
import { Sparkles, Calendar, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineProps {
  filteredReceipts: Receipt[];
  onSelectReceipt?: (receipt: Receipt) => void;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  filteredReceipts,
  onSelectReceipt,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Local hover/selection state for in-chapter pattern discovery
  const [hoveredReceiptId, setHoveredReceiptId] = useState<string | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, filteredReceipts]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Group filtered receipts by chapter
  const receiptsByChapter = useMemo(() => {
    const map: Record<string, Receipt[]> = {};
    for (const ch of chapters) {
      if (!ch.isReflectionOnly) {
        map[ch.id] = [];
      }
    }
    for (const r of filteredReceipts) {
      if (!map[r.chapterId]) map[r.chapterId] = [];
      map[r.chapterId].push(r);
    }
    return map;
  }, [filteredReceipts]);

  const activeHoveredReceipt = useMemo(
    () => filteredReceipts.find((r) => r.id === hoveredReceiptId) || null,
    [filteredReceipts, hoveredReceiptId]
  );

  return (
    <div
      id="narrative-timeline"
      className={cn("w-full font-sans md:px-10 py-16 border-b border-white/5 relative", className)}
      ref={containerRef}
      style={{
        background: "linear-gradient(180deg, rgba(10,5,24,0.72) 0%, rgba(20,10,44,0.75) 25%, rgba(30,14,64,0.75) 50%, rgba(18,9,38,0.75) 80%, rgba(10,5,24,0.72) 100%)",
      }}
    >
      {/* Ambient gradient glow */}
      <div className="absolute top-1/4 right-1/4 w-162.5 h-162.5 rounded-full bg-violet-600/18 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-137.5 h-137.5 rounded-full bg-fuchsia-600/14 blur-[130px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/6 w-112.5 h-112.5 rounded-full bg-purple-500/12 blur-[110px] pointer-events-none" />
      {/* Narrative Section Header */}
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.45)]">
          The Timeline
        </h2>
        <p className="text-xs sm:text-sm text-violet-300/75 mt-1 font-sans">
          Ten months of digital fragments, in chronological order.
        </p>
      </div>

      {/* Vertical Timeline Body */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-24">
        {chapters
          .filter((c) => !c.isReflectionOnly)
          .map((chapter) => {
            const chapterReceipts = receiptsByChapter[chapter.id] || [];
            if (chapterReceipts.length === 0) return null;

            return (
              <div
                key={chapter.id}
                className="flex justify-start pt-12 md:pt-28 md:gap-12 relative content-auto"
              >
                {/* Sticky Left Pillar: Chapter Name & Node Marker */}
                <div className="sticky flex flex-col md:flex-row z-30 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
                  {/* Glowing Node Dot */}
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-neutral-950 border border-violet-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <div
                      className="h-4 w-4 rounded-full transition-transform duration-300 animate-pulse"
                      style={{
                        backgroundColor: chapter.accentColor,
                        boxShadow: `0 0 16px ${chapter.accentColor}, 0 0 32px ${chapter.accentColor}70`,
                      }}
                    />
                  </div>

                  {/* Desktop Title Header */}
                  <div className="hidden md:block pl-20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase font-mono tracking-widest text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        {chapter.timeframe}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">Ch 0{chapter.number}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {chapter.title}
                    </h3>
                  </div>
                </div>

                {/* Right Content: Mixed Grid of Authentic Receipt Cards */}
                <div className="relative pl-16 pr-4 md:pl-6 w-full">
                  {/* Mobile Chapter Title Header */}
                  <div className="md:hidden block mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] uppercase font-mono tracking-widest text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded">
                        {chapter.timeframe}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-500">Ch 0{chapter.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{chapter.title}</h3>
                  </div>

                  {/* Mixed Receipt Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                    {chapterReceipts.map((receipt) => {
                      const isHovered = hoveredReceiptId === receipt.id;
                      const isLinkedToHovered =
                        activeHoveredReceipt &&
                        activeHoveredReceipt.linkedIds.includes(receipt.id);
                      const isDimmed =
                        hoveredReceiptId !== null &&
                        !isHovered &&
                        !isLinkedToHovered;

                      return (
                        <div
                          key={receipt.id}
                          onMouseEnter={() => setHoveredReceiptId(receipt.id)}
                          onMouseLeave={() => setHoveredReceiptId(null)}
                          className="relative"
                        >
                          <ReceiptCard
                            receipt={receipt}
                            isSelected={isHovered}
                            isLinked={Boolean(isLinkedToHovered)}
                            isDimmed={isDimmed}
                            onClick={() => onSelectReceipt?.(receipt)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

        {/* Scroll Gradient Progress Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-neutral-800 mask-[linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-0.5 bg-linear-to-t from-violet-400 via-fuchsia-400 to-transparent rounded-full shadow-[0_0_15px_rgba(168,85,247,0.95)]"
          />
        </div>
      </div>
    </div>
  );
};
