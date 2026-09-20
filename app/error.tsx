"use client";

import React, { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("WAKE Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#090514] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(239,68,68,0.1),transparent_70%] pointer-events-none" />
      <div className="max-w-md w-full bg-neutral-900/80 border border-red-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400 font-mono text-lg font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Signal Interrupted
        </h2>
        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          An unexpected error occurred while rendering this digital life fragment.
        </p>
        <div className="pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-synchronize</span>
          </button>
        </div>
      </div>
    </div>
  );
}
