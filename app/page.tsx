"use client";

import React, { useState, useMemo } from "react";
import { receipts, Receipt, ReceiptType } from "@/lib/lifeData";
import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";
import { ReceiptSearchFilter } from "@/components/ui/receipt-search-filter";
import { ConnectionExplorer } from "@/components/ui/connection-explorer";
import { Timeline } from "@/components/ui/timeline";
import { StoryReveal } from "@/components/ui/story-reveal";
import { ReceiptDetailModal } from "@/components/ui/receipt-detail-modal";
import { SoundtrackDock } from "@/components/ui/soundtrack-dock";
import { StoryWalkthrough } from "@/components/ui/story-walkthrough";
import { AnimatedBackground } from "@/components/ui/animated-background";

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
      <footer className="relative py-16 px-6 text-center text-xs text-neutral-500 font-mono overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/[0.12] blur-[100px] pointer-events-none" />
        <div className="max-w-md mx-auto space-y-2 relative z-10">
          <p className="text-neutral-400">WAKE — A reconstructed digital life across 10 months.</p>
          <p className="text-neutral-600">
            {receipts.length} fragments logged • 6 chapters • 4 hidden hinges • 0 SaaS placeholders.
          </p>
          <div className="pt-2">
            <a
              href="https://github.com/indrak31/WAKE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              <span>View Source on GitHub: indrak31/WAKE</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
