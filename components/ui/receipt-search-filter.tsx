"use client";

import React, { useEffect, useState } from "react";
import { Search, X, RotateCcw } from "lucide-react";
import { ReceiptType, chapters } from "@/lib/lifeData";
import { cn } from "@/lib/utils";


interface ReceiptSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTypes?: Set<ReceiptType>;
  onToggleType?: (type: ReceiptType) => void;
  selectedChapter: string | null;
  onSelectChapter: (chapterId: string | null) => void;
  totalMoments?: number;
  filteredCount?: number;
  onResetFilters: () => void;
  onOpenStoryTour?: () => void;
  className?: string;
}

export const ReceiptSearchFilter: React.FC<ReceiptSearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedChapter,
  onSelectChapter,
  onResetFilters,
  className,
}) => {
  // Local debounced input state (~200ms)
  const [localInput, setLocalInput] = useState(searchQuery);

  useEffect(() => {
    setLocalInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localInput);
    }, 200);

    return () => clearTimeout(handler);
  }, [localInput, onSearchChange]);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedChapter !== null;

  return (
    <div
      id="explore"
      className={cn(
        "sticky top-0 z-40 w-full backdrop-blur-2xl shadow-lg shadow-black/20 transition-all",
        className
      )}
      style={{
        background: "linear-gradient(180deg, rgba(14, 7, 30, 0.94) 0%, rgba(20, 10, 44, 0.90) 100%)",
        borderBottom: "1px solid rgba(168, 85, 247, 0.22)",
        boxShadow: "0 8px 30px rgba(124, 58, 237, 0.25)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-4">

          {/* Minimalist Controls Combo: Search + Chapter Filter + Reset */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 justify-end max-w-xl">
            {/* Live Search Input */}
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-violet-400/60" />
              <input
                type="text"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Search receipts..."
                className="w-full bg-neutral-950/70 border border-violet-500/30 rounded-full pl-8 pr-7 py-1.5 text-xs text-neutral-100 placeholder:text-violet-300/40 focus:outline-hidden focus:border-violet-400 focus:ring-1 focus:ring-violet-400/40 transition-all font-sans"
              />
              {localInput && (
                <button
                  onClick={() => {
                    setLocalInput("");
                    onSearchChange("");
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Chapter Select Dropdown */}
            <select
              value={selectedChapter || ""}
              onChange={(e) => onSelectChapter(e.target.value || null)}
              className="bg-neutral-950/70 border border-violet-500/30 text-xs text-violet-200 rounded-full px-3 py-1.5 focus:outline-hidden focus:border-violet-400 cursor-pointer shrink-0 font-sans transition-all"
              aria-label="Filter by chapter"
            >
              <option value="">All Chapters</option>
              {chapters
                .filter((c) => !c.isReflectionOnly)
                .map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    Ch {ch.number}: {ch.title}
                  </option>
                ))}
            </select>

            {/* Clean Reset Button (Shown only when filtered) */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-amber-400 transition-colors shrink-0 px-2 py-1 rounded-full border border-white/10 hover:border-amber-400/40"
                title="Reset filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* GitHub Repository Link */}
            <a
              href="https://github.com/indrak31/WAKE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-violet-300 hover:text-white bg-violet-950/60 hover:bg-violet-900/80 border border-violet-500/30 hover:border-violet-400/60 px-2.5 py-1 rounded-full transition-all shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
              title="GitHub Repository: indrak31/WAKE"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
