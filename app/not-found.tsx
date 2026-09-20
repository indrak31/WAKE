import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090514] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(168,85,247,0.15),transparent_70%] pointer-events-none" />
      <div className="max-w-md w-full bg-neutral-900/70 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10 space-y-4">
        <span className="text-4xl font-mono font-bold text-violet-400">404</span>
        <h2 className="text-lg font-bold text-white tracking-tight">
          Fragment Not Found
        </h2>
        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
          The requested receipt, coordinate, or chapter could not be located in this digital reconstruction.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/15 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to WAKE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
