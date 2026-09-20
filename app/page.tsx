"use client";

import React, { useState, useMemo } from "react";
import { receipts, Receipt, ReceiptType } from "@/lib/lifeData";
import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";
import { ReceiptSearchFilter } from "@/components/ui/receipt-search-filter";
import { ConnectionExplorer } from "@/components/ui/connection-explorer";
import { Timeline } from "@/components/ui/timeline";
import { LifeAnalytics } from "@/components/ui/life-analytics";
import { StoryReveal } from "@/components/ui/story-reveal";
import { ReceiptDetailModal } from "@/components/ui/receipt-detail-modal";
import { SoundtrackDock } from "@/components/ui/soundtrack-dock";
import { StoryWalkthrough } from "@/components/ui/story-walkthrough";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { WakeLogo } from "@/components/ui/wake-logo";

export default function LifeInReceiptsPage() {
  // Shared Filter State lifted to parent page component (Hard Rule 3)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Set<ReceiptType>>(new Set());
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  // Selected receipt for detailed modal inspection
  const [inspectReceipt, setInspectReceipt] = useState<Receipt | null>(null);

  // Guided Story Walkthrough overlay state for hackathon judges
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);

  // Single-sourced filteredReceipts array (Hard Rule 3)
  const filteredReceipts = useMemo(() => {
    return receipts.filter((receipt) => {
      // 1. Chapter filter
      if (selectedChapter && receipt.chapterId !== selectedChapter) {
        return false;
      }

      // 2. Type multi-select filter
      if (selectedTypes.size > 0 && !selectedTypes.has(receipt.type)) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = receipt.title.toLowerCase().includes(q);
        const matchesSubtitle = receipt.subtitle?.toLowerCase().includes(q) || false;
        const matchesMerchant = receipt.details?.merchant?.toLowerCase().includes(q) || false;
        const matchesArtist = receipt.details?.artist?.toLowerCase().includes(q) || false;
        const matchesNote = receipt.details?.noteText?.toLowerCase().includes(q) || false;
        const matchesQuery = receipt.details?.query?.toLowerCase().includes(q) || false;

        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesMerchant &&
          !matchesArtist &&
          !matchesNote &&
          !matchesQuery
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTypes, selectedChapter]);

  // Toggle receipt type in multi-select set
  const handleToggleType = (type: ReceiptType) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  // Reset all active filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTypes(new Set());
    setSelectedChapter(null);
  };

  return (
    <main className="min-h-screen bg-[#090514] text-neutral-100 font-sans relative overflow-x-hidden">
      {/* ANIMATED LIVING BACKGROUND — Aurora Blobs + Twinkling Stars */}
      <AnimatedBackground />

      {/* COMPONENT 1: HERO SHOWCASE (Chaos → Resolve / Chapter Transitions) */}
      <ScrollingFeatureShowcase />

      {/* UNIFIED STICKY SEARCH & FILTER COMMAND BAR */}
      <ReceiptSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedChapter={selectedChapter}
        onSelectChapter={setSelectedChapter}
        onResetFilters={handleResetFilters}
        filteredReceipts={filteredReceipts}
      />

      {/* COMPONENT 3 (Part 2): CONNECTION EXPLORER (Scatter Constellation & SVG Lines) */}
      <ConnectionExplorer
        filteredReceipts={filteredReceipts}
        onSelectReceipt={(r) => setInspectReceipt(r)}
      />

      {/* COMPONENT 4 (Part 1): NARRATIVE TIMELINE (Framer-Motion Chronology & Receipt Grids) */}
      <Timeline
        filteredReceipts={filteredReceipts}
        onSelectReceipt={(r) => setInspectReceipt(r)}
      />

      {/* COMPONENT: LIFE ANALYTICS (Interactive Pie & Donut Charts for Financial & Activity Tracing) */}
      <LifeAnalytics filteredReceipts={filteredReceipts} />

      {/* COMPONENT 5 (Part 3): STORY REVEAL (Closing Chapter 6 Payoff) */}
      <StoryReveal />

      {/* FLOATING SOUNDTRACK DOCK (The Weeknd Synth Moods + Live Canvas Visualizer) */}
      <SoundtrackDock />

      {/* CINEMATIC STORY TOUR OVERLAY */}
      <StoryWalkthrough
        isOpen={walkthroughOpen}
        onClose={() => setWalkthroughOpen(false)}
      />

      {/* DETAILED RECEIPT MODAL OVERLAY */}
      <ReceiptDetailModal
        receipt={inspectReceipt}
        onClose={() => setInspectReceipt(null)}
        onSelectLinkedReceipt={(linked) => setInspectReceipt(linked)}
      />

      {/* Atmospheric Footer */}
      <footer className="relative py-20 px-6 text-center text-xs text-neutral-500 font-mono overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-100 h-100 rounded-full bg-violet-600/12 blur-[100px] pointer-events-none" />
        <div className="max-w-md mx-auto space-y-4 relative z-10 flex flex-col items-center">
          <WakeLogo markSize={22} textSize="text-lg" className="opacity-80" />
          <p className="text-neutral-500 text-[11px] mt-1">A reconstructed digital life across 10 months.</p>
          <p className="text-neutral-600">
            {receipts.length} fragments logged · 6 chapters · 4 hidden hinges
          </p>
          <div className="pt-1">
            <a
              href="https://github.com/indrak31/WAKE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-violet-400/80 hover:text-violet-300 transition-colors"
            >
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              <span>indrak31/WAKE</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
