"use client";

import React from "react";
import { motion } from "framer-motion";
import { REVEAL_CONNECTIONS, chapters } from "@/lib/lifeData";
import { cn } from "@/lib/utils";

interface StoryRevealProps {
  className?: string;
}

export const StoryReveal: React.FC<StoryRevealProps> = ({ className }) => {
  const closingChapter = chapters.find((c) => c.id === "chapter-6");

  const reveals = [
    {
      ...REVEAL_CONNECTIONS.reveal1,
      fromLabel: "Feb 08 • 'Call Out My Name' (2:04 AM)",
      toLabel: "Mar 03 • '20 min from Sam's apartment' Search",
    },
    {
      ...REVEAL_CONNECTIONS.reveal2,
      fromLabel: "May 02 • 'things I like about this block' Note",
      toLabel: "Jun 14 • Cobble Hill Park Bench Check-in",
    },
    {
      ...REVEAL_CONNECTIONS.reveal3,
      fromLabel: "Jun 14 • 7:12 PM Song, Park, Photo, 2 Coffees",
      toLabel: "Jun 14 • 11:58 PM 'today was good.' Message",
    },
    {
      ...REVEAL_CONNECTIONS.reveal4,
      fromLabel: "Feb 04 • 'things to say if he asks' Note",
      toLabel: "Sep 06 • Second Key Cut Purchase",
    },
  ];

  return (
    <section
      id="reveal"
      className={cn(
        "relative min-h-screen flex flex-col justify-between py-24 px-6 md:px-12 text-neutral-300 font-sans border-t border-white/5 selection:bg-neutral-800",
        className
      )}
      style={{
        background: "linear-gradient(180deg, rgba(10,5,24,0.72) 0%, rgba(24,11,54,0.8) 25%, rgba(38,16,78,0.8) 50%, rgba(20,10,44,0.8) 80%, rgba(9,5,20,0.85) 100%)",
      }}
    >
      {/* Immersive ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/[0.22] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[550px] h-[550px] rounded-full bg-fuchsia-600/[0.16] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/[0.15] blur-[110px] pointer-events-none" />

      {/* Top Narrative Opening */}
      <div className="max-w-3xl mx-auto text-center z-10 pt-8">
        <span className="text-[11px] font-mono tracking-widest text-violet-400 uppercase block mb-4 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]">
          Chapter 06 • What the Receipts Knew
        </span>

        {/* Verbatim Arc Line */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-neutral-100 leading-tight md:leading-snug drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
          &ldquo;{closingChapter?.arcLine || "None of these moments meant anything alone. Together, they were the whole story, and you were the last one to read it."}&rdquo;
        </h2>
      </div>

      {/* Compressed Constellation Diagram of the 4 Authored Reveal Connections */}
      <div className="max-w-4xl mx-auto w-full my-16 z-10">
        <div className="text-center mb-8">
          <span className="text-xs font-mono tracking-wider text-violet-400/80 uppercase drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]">
            The Four Hinges • Drawn Together
          </span>
        </div>

        {/* Constellation Grid with Pre-connected Threads */}
        <div
          className="relative rounded-2xl border p-6 md:p-10 backdrop-blur-sm"
          style={{
            background: "linear-gradient(135deg, rgba(28, 14, 56, 0.65) 0%, rgba(16, 8, 34, 0.5) 100%)",
            borderColor: "rgba(168, 85, 247, 0.25)",
            boxShadow: "0 0 35px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle connecting lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            style={{ overflow: "visible" }}
          >
            <line
              x1="20%"
              y1="25%"
              x2="80%"
              y2="25%"
              stroke="#52525b"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="20%"
              y1="50%"
              x2="80%"
              y2="50%"
              stroke="#52525b"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="20%"
              y1="75%"
              x2="80%"
              y2="75%"
              stroke="#52525b"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          <div className="space-y-8">
            {reveals.map((reveal, idx) => (
              <motion.div
                key={reveal.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950/70 border border-violet-500/20 hover:border-violet-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    <span className="text-xs font-mono text-violet-300 font-medium">
                      {reveal.label}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono pl-4">
                    {reveal.fromLabel} <span className="text-violet-400/70">⟶</span> {reveal.toLabel}
                  </div>
                </div>

                {/* Verbatim Link Reason Quote */}
                <div className="md:max-w-md text-sm text-neutral-200 italic font-sans border-l border-neutral-700 md:border-l-0 md:text-right pl-3 md:pl-0">
                  &ldquo;{reveal.linkReason}&rdquo;
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Understated Closing Line */}
      <div className="max-w-xl mx-auto text-center z-10 pb-12">
        <p className="text-sm md:text-base font-light text-neutral-400 tracking-wide font-sans">
          Every small thing adds up to somebody. This time, it was you.
        </p>
      </div>
    </section>
  );
};
