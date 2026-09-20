"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, chapters, getLinkReason } from "@/lib/lifeData";
import { ReceiptCard, RECEIPT_TYPE_CONFIG } from "@/components/ui/receipt-cards";
import { Sparkles, X, Info, Compass, Link2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionExplorerProps {
  filteredReceipts: Receipt[];
  onSelectReceipt?: (receipt: Receipt) => void;
  className?: string;
}

export const ConnectionExplorer: React.FC<ConnectionExplorerProps> = ({
  filteredReceipts,
  onSelectReceipt,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [activeChapterTab, setActiveChapterTab] = useState<string>("all");

  // Track coordinates for SVG connecting curves
  const [connectionLines, setConnectionLines] = useState<
    {
      fromId: string;
      toId: string;
      d: string;
      reason?: string;
    }[]
  >([]);

  const selectedReceipt = useMemo(
    () => filteredReceipts.find((r) => r.id === selectedId) || null,
    [filteredReceipts, selectedId]
  );

  // Group receipts by chapter
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

  // Handle card click
  const handleCardClick = (receipt: Receipt, e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    if (selectedId === receipt.id) {
      setSelectedId(null);
    } else {
      setSelectedId(receipt.id);
      setShowHint(false);
      onSelectReceipt?.(receipt);
    }
  };

  // Clear selection on background click
  const handleCanvasClick = () => {
    setSelectedId(null);
  };

  // Compute SVG line paths between selected card and linked cards
  useEffect(() => {
    if (!selectedId || !containerRef.current) {
      setConnectionLines([]);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const activeEl = cardRefs.current[selectedId];
    if (!activeEl) {
      setConnectionLines([]);
      return;
    }

    const activeRect = activeEl.getBoundingClientRect();
    const x1 = activeRect.left - containerRect.left + activeRect.width / 2;
    const y1 = activeRect.top - containerRect.top + activeRect.height / 2;

    const currentReceipt = filteredReceipts.find((r) => r.id === selectedId);
    if (!currentReceipt || !currentReceipt.linkedIds.length) {
      setConnectionLines([]);
      return;
    }

    const lines: { fromId: string; toId: string; d: string; reason?: string }[] = [];

    currentReceipt.linkedIds.forEach((targetId) => {
      // Check if target is currently rendered in filtered list
      const targetReceipt = filteredReceipts.find((r) => r.id === targetId);
      if (!targetReceipt) return;

      const targetEl = cardRefs.current[targetId];
      if (!targetEl) return;

      const targetRect = targetEl.getBoundingClientRect();
      const x2 = targetRect.left - containerRect.left + targetRect.width / 2;
      const y2 = targetRect.top - containerRect.top + targetRect.height / 2;

      // Create subtle curved bezier path
      const dx = x2 - x1;
      const dy = y2 - y1;
      const cx = x1 + dx / 2 + (dy > 0 ? 30 : -30);
      const cy = y1 + dy / 2 + (dx > 0 ? -25 : 25);

      const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
      const reason = getLinkReason(selectedId, targetId);

      lines.push({
        fromId: selectedId,
        toId: targetId,
        d,
        reason,
      });
    });

    setConnectionLines(lines);
  }, [selectedId, filteredReceipts, activeChapterTab]);

  // Determine highlight & dim state for any card
  const getCardStatus = (receipt: Receipt) => {
    if (!selectedId) {
      return { isSelected: false, isLinked: false, isDimmed: false };
    }
    if (receipt.id === selectedId) {
      return { isSelected: true, isLinked: false, isDimmed: false };
    }
    const isLinked = selectedReceipt?.linkedIds.includes(receipt.id);
    return {
      isSelected: false,
      isLinked: Boolean(isLinked),
      isDimmed: !isLinked,
    };
  };

  // Find primary link reason for the active card
  const primaryLinkReason = useMemo(() => {
    if (!selectedId || !selectedReceipt || !selectedReceipt.linkedIds.length) return null;
    for (const targetId of selectedReceipt.linkedIds) {
      const reason = getLinkReason(selectedId, targetId);
      if (reason) return reason;
    }
    return null;
  }, [selectedId, selectedReceipt]);

  return (
    <section
      id="constellation"
      ref={containerRef}
      onClick={handleCanvasClick}
      className={cn(
        "relative w-full min-h-screen py-16 px-4 md:px-8 overflow-hidden select-none border-b border-white/5",
        className
      )}
      style={{
        background: "linear-gradient(180deg, rgba(10,5,24,0.72) 0%, rgba(18,9,40,0.75) 20%, rgba(28,14,58,0.75) 50%, rgba(18,9,40,0.75) 80%, rgba(10,5,24,0.72) 100%)",
      }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-162.5 h-162.5 rounded-full bg-violet-600/18 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-150 h-150 rounded-full bg-purple-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-175 h-175 rounded-full bg-fuchsia-600/12 blur-[160px] pointer-events-none" />
      
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[28px_28px] opacity-20 pointer-events-none" />

      {/* Header & Controls */}
      <div className="relative max-w-7xl mx-auto mb-8 z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.45)]">
              The Constellation
            </h2>
            <p className="text-xs sm:text-sm text-violet-300/75 mt-1 font-sans">
              Click any fragment to discover its hidden connections across time.
            </p>
          </div>
        </div>

        {/* Active Link Reason Banner */}
        <AnimatePresence>
          {selectedId && primaryLinkReason && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="mt-5 p-4 rounded-xl bg-neutral-900/90 border border-amber-400/30 shadow-xl backdrop-blur-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                <p className="text-sm md:text-base font-medium text-white italic leading-snug">
                  &ldquo;{primaryLinkReason}&rdquo;
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(null);
                }}
                className="text-neutral-400 hover:text-white p-1 shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Layer for Drawing Connecting Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-15"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="conn-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {connectionLines.map((line, idx) => (
          <g key={idx}>
            <motion.path
              d={line.d}
              fill="none"
              stroke="url(#conn-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 8px rgba(192,132,252,0.85)) drop-shadow(0 0 16px rgba(129,140,248,0.5))" }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
            {/* Streaming Energy Pulse Particles */}
            <motion.path
              d={line.d}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="6 18"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 6px #ffffff)" }}
              initial={{ strokeDashoffset: 48 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              opacity={0.9}
            />
          </g>
        ))}
      </svg>

      {/* Clustered Scatter Canvas Grouped by Chapter */}
      <div className="relative max-w-7xl mx-auto z-10 space-y-12">
        {chapters
          .filter((c) => !c.isReflectionOnly)
          .filter((c) => activeChapterTab === "all" || activeChapterTab === c.id)
          .map((chapter) => {
            const chapterReceipts = receiptsByChapter[chapter.id] || [];
            if (chapterReceipts.length === 0) return null;

            return (
              <div
                key={chapter.id}
                className="relative rounded-2xl border p-5 md:p-8 backdrop-blur-sm overflow-hidden content-auto"
                style={{
                  background: "linear-gradient(135deg, rgba(32, 16, 62, 0.65) 0%, rgba(18, 9, 38, 0.5) 100%)",
                  borderColor: "rgba(168, 85, 247, 0.22)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 0 20px rgba(139, 92, 246, 0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* Chapter Cluster Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/5 gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: chapter.accentColor }}
                    />
                    <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                      Cluster 0{chapter.number} • {chapter.timeframe}
                    </span>
                    <h3 className="text-lg font-bold text-white">{chapter.title}</h3>
                  </div>
                </div>

                {/* Scattered / Organic Grid Layout with Jitter Offsets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {chapterReceipts.map((receipt, idx) => {
                    const status = getCardStatus(receipt);

                    // Organic subtle offsets for a physics-free natural constellation feel
                    const jitterY = (idx % 3 === 1 ? "md:translate-y-2" : idx % 3 === 2 ? "md:-translate-y-1" : "");
                    const jitterX = (idx % 2 === 1 ? "md:translate-x-1" : "");

                    return (
                      <div
                        key={receipt.id}
                        ref={(el) => {
                          cardRefs.current[receipt.id] = el;
                        }}
                        className={cn("transition-transform duration-300", jitterY, jitterX)}
                      >
                        <ReceiptCard
                          receipt={receipt}
                          isSelected={status.isSelected}
                          isLinked={status.isLinked}
                          isDimmed={status.isDimmed}
                          onClick={() => handleCardClick(receipt)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {filteredReceipts.length === 0 && (
          <div className="text-center py-20 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <p className="text-neutral-400 text-base">No moments match your active search or filters.</p>
            <p className="text-neutral-400 text-xs mt-1">Try toggling different receipt types or clearing the search bar.</p>
          </div>
        )}
      </div>
    </section>
  );
};
