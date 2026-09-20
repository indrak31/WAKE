"use client";

import React, { useState, useEffect, useRef } from "react";
import { chapters, Chapter } from "@/lib/lifeData";
import { Music, ShoppingBag, MapPin, MessageCircle, ArrowDown } from "lucide-react";
import { WakeLogo } from "@/components/ui/wake-logo";

export function ScrollingFeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);

  // Use the narrative chapters (Chapters 1 to 4)
  const heroChapters = chapters.slice(0, 4);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollableHeight = container.scrollHeight - window.innerHeight;
        if (scrollableHeight <= 0) return;
        const stepHeight = scrollableHeight / heroChapters.length;
        const newActiveIndex = Math.min(
          heroChapters.length - 1,
          Math.floor(container.scrollTop / stepHeight)
        );
        setActiveIndex(newActiveIndex);
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [heroChapters.length]);

  const currentChapter = heroChapters[activeIndex] || heroChapters[0];

  const dynamicStyles = {
    backgroundColor: currentChapter.bgColor,
    color: currentChapter.textColor,
    transition: "background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.8s ease",
  };

  const gridPatternStyle = {
    "--grid-color": "rgba(255, 255, 255, 0.08)",
    backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: "3.5rem 3.5rem",
  } as React.CSSProperties;

  return (
    <div
      ref={scrollContainerRef}
      id="hero-story"
      className="h-screen w-full overflow-y-auto relative"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div style={{ height: `${heroChapters.length * 100}vh` }}>
        <div
          ref={stickyPanelRef}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center transition-colors duration-700 select-none"
          style={dynamicStyles}
        >
          {/* Subtle noise and radial glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-violet-500/15 via-transparent to-black/50" />
          <div className="absolute top-1/4 right-1/4 w-125 h-125 rounded-full bg-violet-600/15 blur-[140px] pointer-events-none" />

          {/* Wake brand mark — upper left */}
          <div className="absolute top-6 left-8 md:left-12 z-20">
            <WakeLogo markSize={28} textSize="text-2xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto z-10">
            {/* Left Column: Chapter Narratives & Controls */}
            <div className="relative flex flex-col justify-center p-8 md:p-16 border-r border-white/10">
              {/* Pagination indicators */}
              <div className="absolute top-12 left-8 md:left-16 flex items-center space-x-2">
                {heroChapters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const container = scrollContainerRef.current;
                      if (container) {
                        const scrollableHeight = container.scrollHeight - window.innerHeight;
                        const stepHeight = scrollableHeight / heroChapters.length;
                        container.scrollTo({ top: stepHeight * index + 10, behavior: "smooth" });
                      }
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${
                      index === activeIndex
                        ? "w-12 bg-linear-to-r from-violet-400 to-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.9)]"
                        : "w-6 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Jump to Chapter ${index + 1}`}
                  />
                ))}
                <span className="text-xs uppercase tracking-widest text-white/50 pl-3 font-mono">
                  0{activeIndex + 1} / 0{heroChapters.length}
                </span>
              </div>

              {/* Narrator Text Display */}
              <div className="relative min-h-65 w-full mt-6">
                {heroChapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-8 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs uppercase tracking-widest font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.25)]">
                        {chapter.timeframe}
                      </span>
                      <span className="text-xs tracking-wider opacity-60 font-sans">
                        Chapter 0{chapter.number}
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                      {chapter.title}
                    </h1>

                    <p className="mt-5 text-lg md:text-xl text-neutral-300 max-w-lg leading-relaxed font-sans">
                      {chapter.arcLine}
                    </p>
                  </div>
                ))}
              </div>

              {/* Call to Action Button */}
              <div className="absolute bottom-12 left-8 md:left-16 flex items-center gap-4">
                <a
                  href="#explore"
                  className="group px-8 py-4 bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-semibold rounded-full uppercase tracking-wider text-xs hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Begin the story</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </a>
                <span className="text-xs text-white/40 hidden sm:inline-block">
                  Scroll or click to explore fragments
                </span>
              </div>
            </div>

            {/* Right Column: Dynamic Receipt-Style Mockup Slider */}
            <div
              className="hidden md:flex items-center justify-center p-8 md:p-12 relative overflow-hidden"
              style={gridPatternStyle}
            >
              <div className="relative w-[85%] max-w-md h-[72vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col">
                <div
                  className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                >
                  {/* SLIDE 1 RECEIPT VISUAL: The 2 AM Audio Fragment */}
                  <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-linear-to-b from-slate-900/90 to-slate-950/90">
                    <div className="w-full max-w-xs bg-slate-900 border border-slate-700/60 rounded-2xl p-6 shadow-2xl relative">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-4">
                        <span className="flex items-center gap-1.5 text-sky-400 font-sans font-medium">
                          <Music className="w-3.5 h-3.5" /> AUDIO LOG
                        </span>
                        <span>02:47:11 AM</span>
                      </div>
                      {/* Album poster thumbnail */}
                      <div className="relative w-28 h-28 mx-auto mb-4 rounded-xl overflow-hidden shadow-2xl border border-white/20 group">
                        <img
                          src="/covers/call-out-my-name.jpg"
                          alt="Call Out My Name poster"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="text-center font-bold text-lg text-white">Call Out My Name</div>
                      <div className="text-center text-xs text-slate-400 mt-1">The Weeknd • My Dear Melancholy,</div>
                      <div className="mt-4 bg-slate-950/80 rounded-lg p-2.5 flex items-center justify-between text-xs text-slate-300 font-mono">
                        <span>REPLAY #19</span>
                        <span className="text-sky-400 font-bold">1–4 AM LOOP</span>
                      </div>
                    </div>
                  </div>

                  {/* SLIDE 2 RECEIPT VISUAL: The Moving Truck Receipt */}
                  <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-linear-to-b from-zinc-900/90 to-neutral-950/90">
                    <div className="w-full max-w-xs bg-[#fcfaf5] text-neutral-900 p-6 rounded-xl shadow-2xl font-mono-receipt border border-neutral-300">
                      <div className="flex justify-between items-center text-[10px] text-neutral-500 border-b border-dashed border-neutral-300 pb-2 mb-3">
                        <span className="font-sans font-bold text-amber-800 flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3" /> U-HAUL MOVING
                        </span>
                        <span>09:15 AM</span>
                      </div>
                      <div className="text-sm font-bold font-sans">10-Foot Cargo Van Rental</div>
                      <div className="text-xs text-neutral-600 mt-0.5">March 8 • 1-Day Rental</div>
                      <div className="my-3 border-t border-b border-dashed border-neutral-300 py-2 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Van Base Rate</span>
                          <span>$79.95</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                          <span>Blankets (Pack of 6)</span>
                          <span>$18.00</span>
                        </div>
                        <div className="flex justify-between font-bold pt-1 border-t border-neutral-200">
                          <span>TOTAL</span>
                          <span>$102.45</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-neutral-500 text-center font-mono">
                        NEW COORDINATES REGISTERED
                      </div>
                    </div>
                  </div>

                  {/* SLIDE 3 RECEIPT VISUAL: The Neighborhood Note & Café Pin */}
                  <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-linear-to-b from-emerald-950/40 to-neutral-950/90">
                    <div className="w-full max-w-xs space-y-3">
                      <div className="bg-[#fbf7e8] text-neutral-900 p-5 rounded-xl shadow-xl border border-yellow-600/20 font-sans">
                        <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Notes App Draft
                        </div>
                        <div className="text-xs font-semibold text-neutral-800 mb-1">
                          things I like about this block
                        </div>
                        <div className="text-xs text-neutral-700 leading-relaxed font-mono">
                          - cardamom bakery at 6:30<br />
                          - north bench in the park<br />
                          - white bloom tree by mailbox
                        </div>
                      </div>

                      <div className="bg-neutral-900/90 border border-emerald-500/30 p-3.5 rounded-xl text-neutral-200 shadow-lg flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">Café Regular</div>
                          <div className="text-[10px] text-neutral-400">158 Berkeley Pl • 40.6755° N</div>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded">
                          08:22 AM
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SLIDE 4 RECEIPT VISUAL: The June 14 Reveal Cluster */}
                  <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-linear-to-b from-amber-950/30 to-neutral-950/90">
                    <div className="w-full max-w-xs space-y-3">
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-amber-200 text-xs font-mono flex items-center justify-between">
                        <span className="font-bold">JUNE 14 • 11:58 PM</span>
                        <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-bold">
                          THE HINGE
                        </span>
                      </div>

                      <div className="bg-neutral-900 border border-blue-500/20 p-4 rounded-xl shadow-lg">
                        <div className="text-[10px] text-neutral-400 mb-2 flex items-center gap-1">
                          <MessageCircle className="w-3 h-3 text-blue-400" /> Outgoing to Sam
                        </div>
                        <div className="bg-blue-600 text-white text-sm px-3 py-2 rounded-2xl rounded-tr-xs shadow">
                          today was good.
                        </div>
                        <div className="text-right text-[10px] text-neutral-400 mt-1">Read 11:59 PM</div>
                      </div>

                      <div className="bg-neutral-900/80 border border-white/10 p-3 rounded-xl text-neutral-300 text-xs flex justify-between items-center">
                        <span>First Play: &apos;Die For You&apos; • The Hinge</span>
                        <span className="text-amber-400 font-mono">5 CONNECTED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
