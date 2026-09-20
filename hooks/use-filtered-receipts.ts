"use client";

import { useMemo } from "react";
import { Receipt, ReceiptType } from "@/lib/lifeData";

interface UseFilteredReceiptsOptions {
  receipts: Receipt[];
  searchQuery: string;
  selectedTypes: Set<ReceiptType>;
  selectedChapter: string | null;
}

/**
 * Custom hook providing single-sourced, memoized receipt filtering logic
 */
export function useFilteredReceipts({
  receipts,
  searchQuery,
  selectedTypes,
  selectedChapter,
}: UseFilteredReceiptsOptions): Receipt[] {
  return useMemo(() => {
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
  }, [receipts, searchQuery, selectedTypes, selectedChapter]);
}
