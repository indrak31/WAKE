"use client";

import React from "react";
import { Receipt, getLinkReason, chapters, receipts } from "@/lib/lifeData";
import { RECEIPT_TYPE_CONFIG } from "@/components/ui/receipt-cards";
import { X, Link2, Calendar, MapPin, Hash, Sparkles } from "lucide-react";

interface ReceiptDetailModalProps {
  receipt: Receipt | null;
  onClose: () => void;
  onSelectLinkedReceipt: (linkedReceipt: Receipt) => void;
}

export const ReceiptDetailModal: React.FC<ReceiptDetailModalProps> = ({
  receipt,
  onClose,
  onSelectLinkedReceipt,
}) => {
  if (!receipt) return null;

  const config = RECEIPT_TYPE_CONFIG[receipt.type];
  const Icon = config.icon;
  const chapter = chapters.find((c) => c.id === receipt.chapterId);

  // Find linked receipt objects
  const linkedItems = receipt.linkedIds
    .map((id) => receipts.find((r) => r.id === id))
    .filter(Boolean) as Receipt[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl p-6 md:p-8 text-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Type & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                {config.label} Fragment • {chapter?.title}
              </span>
              <div className="text-xs text-neutral-500 font-mono">ID: {receipt.id}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Details */}
        <div className="py-5 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-white leading-tight">{receipt.title}</h3>
            {receipt.subtitle && (
              <p className="text-sm text-neutral-300 mt-1 font-sans">{receipt.subtitle}</p>
            )}
          </div>

          {/* Timestamp Badge */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
            <span>Timestamp: {new Date(receipt.timestamp).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</span>
          </div>

          {/* Dataset Provenance Badge */}
          {receipt.details?.sourceDataset && (
            <div className="flex items-center gap-2 text-xs text-amber-300/90 font-mono bg-amber-950/30 px-3 py-2 rounded-lg border border-amber-500/25 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Extracted Source: {receipt.details.sourceDataset}</span>
            </div>
          )}

          {/* Type-Specific Details */}
          {receipt.details?.noteText && (
            <div className="p-4 bg-[#fcf8ec] text-neutral-900 rounded-xl font-mono text-xs whitespace-pre-line border border-amber-300/40">
              {receipt.details.noteText}
            </div>
          )}

          {receipt.details?.items && (
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-xs font-mono space-y-1.5">
              <div className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider mb-1">
                Itemized Summary
              </div>
              {receipt.details.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-neutral-300">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              {receipt.details.total && (
                <div className="flex justify-between font-bold text-white pt-2 border-t border-neutral-800 text-sm">
                  <span>TOTAL CHARGE</span>
                  <span>${receipt.details.total.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {/* Song Poster Artwork for Music Receipts */}
          {receipt.details?.albumArt && (
            <div className="flex items-center gap-4 bg-neutral-950/80 p-3.5 rounded-xl border border-white/10 shadow-lg">
              <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/20 shadow-xl shrink-0">
                <img
                  src={receipt.details.albumArt}
                  alt={`${receipt.title} poster`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                  Official Song Poster
                </span>
                <div className="text-sm font-bold text-white leading-tight">{receipt.title}</div>
                <div className="text-xs text-neutral-400 font-mono">
                  {receipt.details.artist} {receipt.details.album && `• ${receipt.details.album}`}
                </div>
                {receipt.details.duration && (
                  <div className="text-[10px] text-neutral-500 font-mono">
                    Duration: {receipt.details.duration} {receipt.details.playCount && `• Played ${receipt.details.playCount} times`}
                  </div>
                )}
              </div>
            </div>
          )}

          {receipt.details?.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video relative">
              <img
                src={receipt.details.imageUrl}
                alt={receipt.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </div>

        {/* Connected Fragments Section */}
        {linkedItems.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Link2 className="w-3.5 h-3.5" />
              <span>Connected Moments ({linkedItems.length})</span>
            </div>

            <div className="space-y-2">
              {linkedItems.map((linked) => {
                const reason = getLinkReason(receipt.id, linked.id);
                return (
                  <button
                    key={linked.id}
                    onClick={() => onSelectLinkedReceipt(linked)}
                    className="w-full text-left p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-400/40 transition-all group"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {linked.title}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        {linked.type}
                      </span>
                    </div>
                    {reason && (
                      <div className="text-[11px] text-amber-400/90 italic mt-1 font-sans">
                        &ldquo;{reason}&rdquo;
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
