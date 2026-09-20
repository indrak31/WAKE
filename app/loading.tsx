import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#090514] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(168,85,247,0.15),transparent_70%] pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20 border-t-violet-400 animate-spin" />
          <div className="w-8 h-8 rounded-full bg-violet-600/30 blur-sm animate-pulse" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-mono tracking-widest text-violet-300 uppercase">WAKE</p>
          <p className="text-xs text-neutral-500 font-sans">Reconstructing digital life fragments...</p>
        </div>
      </div>
    </div>
  );
}
