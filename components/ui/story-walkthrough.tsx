"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronRight, ChevronLeft, X, Sparkles, Compass, Eye, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourStep {
  step: number;
  chapter: string;
  title: string;
  headline: string;
  narrative: string;
  revealQuote?: string;
  targetAnchor: string;
  accentColor: string;
  badge: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    chapter: "Chapter 01: Jan–Feb",
    title: "The 2 AM Playlist",
    badge: "The Restless Beginning",
    headline: "You told yourself you were just a night owl. The data says otherwise.",
    narrative:
      "Your digital footprint starts in sleeplessness. The same 3–4 songs replayed obsessively between 1–4 AM—After Hours at 3:15 AM, searches for 'why can't I sleep', and an unread draft titled 'things to say if he asks'.",
    targetAnchor: "#hero-story",
    accentColor: "#38bdf8",
  },
  {
    step: 2,
    chapter: "Hinge 01: Reveal",
    title: "The Unconscious Move",
    badge: "Authored Hinge #1",
    headline: "You were already planning this before you told anyone — including yourself.",
    narrative:
      "A cross-chapter connection: While still trapped in late-night insomnia in Chapter 1, you secretly searched 'new neighborhood 20 min from Sam's apartment' the very same week. Your data knew where you were going before your conscious mind admitted it.",
    revealQuote: "You were already planning this before you told anyone — including yourself.",
    targetAnchor: "#constellation",
    accentColor: "#f97316",
  },
  {
    step: 3,
    chapter: "Chapter 03: April–May",
    title: "Learning the Block",
    badge: "Curiosity & Discovery",
    headline: "You went looking for a coffee shop and found a whole neighborhood you didn't expect to love.",
    narrative:
      "You bought a potted snake plant, found a used Schwinn bicycle on Craigslist, and started drafting a note on your phone titled 'things I like about this block'—noticing a quiet park bench where nobody looks at you.",
    targetAnchor: "#narrative-timeline",
    accentColor: "#34d399",
  },
  {
    step: 4,
    chapter: "Hinge 03: June 14",
    title: "The Night Everything Lined Up",
    badge: "The Pivotal Turning Point",
    headline: "Five separate receipts. One evening. This is the one your future self will come back to.",
    narrative:
      "In less than five hours: A song played for the first time ('Seaforth' at 7:12 PM), a park check-in, an uncaptioned photo, two iced coffees at 7:50 PM, and a message to Sam at 11:58 PM: 'today was good.'",
    revealQuote: "Five separate receipts. One evening. This is the one your future self will come back to.",
    targetAnchor: "#constellation",
    accentColor: "#fbbf24",
  },
  {
    step: 5,
    chapter: "Hinge 04: September",
    title: "The Second Key",
    badge: "Authored Hinge #4",
    headline: "The thing you were scared to say in January, you didn't have to say by September. It just became true.",
    narrative:
      "Connecting the February note ('things to say if he asks') with a $5.75 hardware receipt in September for a second duplicated brass key with an olive tag. No long conversation required.",
    revealQuote: "The thing you were scared to say in January, you didn't have to say by September. It just became true.",
    targetAnchor: "#constellation",
    accentColor: "#fb7185",
  },
  {
    step: 6,
    chapter: "Chapter 06: Epilogue",
    title: "What the Receipts Knew",
    badge: "The Revelation",
    headline: "None of these moments meant anything alone. Together, they were the whole story, and you were the last one to read it.",
    narrative:
      "Every small thing adds up to somebody. This time, it was you. A full digital reconstruction of human reinvention.",
    revealQuote: "Every small thing adds up to somebody. This time, it was you.",
    targetAnchor: "#reveal",
    accentColor: "#e4e4e7",
  },
];

interface StoryWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryWalkthrough: React.FC<StoryWalkthroughProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Auto-advance timer (~7s per step)
  useEffect(() => {
    if (!isOpen || !isAutoPlaying) {
      setProgress(0);
      return;
    }

    const duration = 7000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        setProgress(0);
        setCurrentStepIndex((prev) => (prev + 1) % TOUR_STEPS.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, isAutoPlaying, currentStepIndex]);

  // Jump to section in page when step changes
  useEffect(() => {
    if (!isOpen) return;
    const el = document.querySelector(currentStep.targetAnchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentStepIndex, isOpen, currentStep.targetAnchor]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end p-4 md:p-8 animate-fadeIn">
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto" onClick={onClose} />

      {/* Floating Story Card */}
      <div
        className="relative z-10 w-full max-w-2xl mx-auto bg-neutral-950/95 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-2xl pointer-events-auto text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden mb-5">
          <div
            className="h-full transition-all duration-75 ease-linear rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: currentStep.accentColor,
              boxShadow: `0 0 10px ${currentStep.accentColor}`,
            }}
          />
        </div>

        {/* Top Header Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{
                backgroundColor: `${currentStep.accentColor}15`,
                borderColor: `${currentStep.accentColor}40`,
                color: currentStep.accentColor,
              }}
            >
              {currentStep.badge}
            </span>
            <span className="text-xs font-mono text-neutral-400">{currentStep.chapter}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-500">
              0{currentStep.step} / 0{TOUR_STEPS.length}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close walkthrough"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="min-h-[160px] flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
            {currentStep.title}
          </h3>

          <p className="text-sm md:text-base font-medium text-amber-200/95 mt-1.5 leading-snug font-sans">
            &ldquo;{currentStep.headline}&rdquo;
          </p>

          <p className="text-xs md:text-sm text-neutral-300 mt-3 font-sans leading-relaxed">
            {currentStep.narrative}
          </p>

          {currentStep.revealQuote && (
            <div className="mt-3 p-2.5 rounded-xl bg-neutral-900/90 border border-amber-400/30 text-xs font-mono text-amber-300 italic flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>&ldquo;{currentStep.revealQuote}&rdquo;</span>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 flex items-center gap-1.5 border border-white/10 cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? "Pause Tour" : "Autoplay"}</span>
            </button>

            <a
              href={currentStep.targetAnchor}
              className="px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 flex items-center gap-1.5 border border-white/10 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Focus View</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setProgress(0);
                setCurrentStepIndex((prev) => (prev === 0 ? TOUR_STEPS.length - 1 : prev - 1));
              }}
              className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 cursor-pointer border border-white/10"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setProgress(0);
                setCurrentStepIndex((prev) => (prev + 1) % TOUR_STEPS.length);
              }}
              className="px-4 py-1.5 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs font-mono flex items-center gap-1 hover:bg-amber-300 transition-colors cursor-pointer shadow-[0_0_12px_rgba(251,191,36,0.4)]"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
