"use client";

import React from "react";
import {
  Music,
  ShoppingBag,
  MessageCircle,
  MapPin,
  StickyNote,
  Camera,
  Search,
  Calendar,
  Film,
  Sparkles,
  Link as LinkIcon,
  Play,
  Pause,
  Disc,
  Flame,
} from "lucide-react";
import { Receipt, ReceiptType } from "@/lib/lifeData";
import { cn } from "@/lib/utils";

export const RECEIPT_TYPE_CONFIG: Record<
  ReceiptType,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  music: { label: "Music", icon: Music, color: "text-violet-400 border-violet-500/30 bg-violet-500/10" },
  movie: { label: "Movie", icon: Film, color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
  place: { label: "Place", icon: MapPin, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  purchase: { label: "Purchase", icon: ShoppingBag, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  photo: { label: "Photo", icon: Camera, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
  message: { label: "Message", icon: MessageCircle, color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
  search: { label: "Search", icon: Search, color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  event: { label: "Event", icon: Calendar, color: "text-pink-400 border-pink-500/30 bg-pink-500/10" },
  note: { label: "Note", icon: StickyNote, color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
};

interface ReceiptCardProps {
  receipt: Receipt;
  isSelected?: boolean;
  isLinked?: boolean;
  isDimmed?: boolean;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  receipt,
  isSelected,
  isLinked,
  isDimmed,
  onClick,
  className,
  compact = false,
}) => {
  const { type, title, subtitle, details } = receipt;
  const config = RECEIPT_TYPE_CONFIG[type];
  const Icon = config.icon;

  const containerClasses = cn(
    "relative transition-all duration-300 rounded-xl cursor-pointer select-none text-left overflow-hidden group",
    isSelected
      ? "ring-2 ring-violet-400 shadow-[0_0_35px_rgba(168,85,247,0.6)] scale-[1.02] z-20"
      : isLinked
      ? "ring-2 ring-fuchsia-400 shadow-[0_0_28px_rgba(217,70,239,0.5)] scale-[1.01] z-10"
      : "hover:scale-[1.01] hover:border-violet-400/70 hover:shadow-[0_4px_30px_rgba(168,85,247,0.3)] shadow-lg",
    isDimmed ? "opacity-25 grayscale-[40%] pointer-events-none" : "opacity-100",
    className
  );

  const rafRef = React.useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const clientX = e.clientX;
    const clientY = e.clientY;
    rafRef.current = requestAnimationFrame(() => {
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      target.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  const renderCardContent = () => {
    // 1. PURCHASE RECEIPT: Thermal Paper Styling
    if (type === "purchase") {
    return (
      <div
        onClick={onClick}
        className={cn(
          containerClasses,
          "bg-[#fcfaf5] text-neutral-900 border border-amber-900/10 font-mono-receipt p-4 shadow-md"
        )}
      >
        {/* Top jagged cut indicator */}
        <div className="flex justify-between items-center border-b border-dashed border-neutral-300 pb-2 mb-2 text-xs text-neutral-500">
          <span className="flex items-center gap-1 font-sans uppercase font-bold tracking-wider text-[10px] text-amber-700">
            <ShoppingBag className="w-3 h-3" /> {details?.merchant || "RECEIPT"}
          </span>
          <span className="text-[11px]">{details?.timeLabel || "RECORDED"}</span>
        </div>

        <div className="font-sans font-semibold text-neutral-900 text-sm mb-1 leading-tight">{title}</div>
        {subtitle && <div className="text-xs text-neutral-600 mb-2">{subtitle}</div>}

        {/* Itemized lines if available */}
        {details?.items && details.items.length > 0 && (
          <div className="border-t border-neutral-200 py-2 space-y-1 text-xs">
            {details.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-neutral-700">
                <span className="truncate pr-2">{item.name}</span>
                <span className="font-mono">${item.price.toFixed(2)}</span>
              </div>
            ))}
            {details.total !== undefined && (
              <div className="flex justify-between font-bold text-neutral-900 pt-1 border-t border-dashed border-neutral-300 text-xs">
                <span>TOTAL</span>
                <span className="font-mono">${details.total.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {/* Barcode graphic */}
        <div className="mt-2 pt-2 border-t border-neutral-200 flex justify-between items-center opacity-60">
          <div className="h-5 flex items-end gap-0.5">
            {[3, 8, 4, 9, 2, 7, 5, 8, 3, 6, 2, 9, 4, 7, 3, 5, 8, 4, 6].map((h, i) => (
              <div key={i} className="bg-neutral-800 w-0.5" style={{ height: `${h * 2}px` }} />
            ))}
          </div>
          <span className="text-[10px] text-neutral-400 font-mono">AUTH# {receipt.id.toUpperCase()}</span>
        </div>
      </div>
    );
  }

  // 2. MUSIC CARD: Interactive Vinyl Groove, The Weeknd Special Styling & Web Audio Synth
  if (type === "music") {
    return (
      <InteractiveMusicCard
        receipt={receipt}
        isSelected={isSelected}
        isLinked={isLinked}
        isDimmed={isDimmed}
        onClick={onClick}
        containerClasses={containerClasses}
      />
    );
  }

  // 3. MESSAGE CARD: iMessage / Signal Chat Bubble
  if (type === "message") {
    return (
      <div
        onClick={onClick}
        className={cn(
          containerClasses,
          "bg-neutral-900/95 border border-blue-500/20 p-4 text-neutral-200"
        )}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block leading-none">{title}</span>
              <span className="text-[10px] text-neutral-400">{details?.sender || "iMessage"}</span>
            </div>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">{details?.timeLabel}</span>
        </div>

        <div className="flex justify-end my-1">
          <div className="max-w-[88%] bg-blue-600 text-white text-sm px-3.5 py-2 rounded-2xl rounded-tr-xs shadow-md font-sans leading-relaxed">
            {subtitle || "..."}
          </div>
        </div>
        <div className="flex justify-end items-center gap-1 text-[10px] text-neutral-400 mt-1">
          <span>Delivered</span>
        </div>
      </div>
    );
  }

  // 4. NOTE CARD: Legal Pad / Drafting Paper
  if (type === "note") {
    return (
      <div
        onClick={onClick}
        className={cn(
          containerClasses,
          "bg-[#fbf7e8] text-neutral-800 border border-yellow-700/20 p-4 shadow-md font-sans"
        )}
      >
        {/* Washi tape accent */}
        <div className="w-16 h-3 bg-amber-200/80 mx-auto -mt-5 mb-2 rounded-sm border border-amber-300/40 shadow-xs rotate-1" />

        <div className="flex justify-between items-center text-xs text-neutral-500 mb-2 border-b border-amber-200 pb-1">
          <span className="flex items-center gap-1 font-bold text-[11px] text-amber-800 uppercase tracking-wide">
            <StickyNote className="w-3 h-3" /> {title}
          </span>
          <span className="text-[10px] text-neutral-500">{details?.timeLabel}</span>
        </div>

        <div className="text-xs text-neutral-800 whitespace-pre-line leading-relaxed font-mono">
          {details?.noteText || subtitle}
        </div>
      </div>
    );
  }

  // 5. PLACE CARD: Map Coordinates & Pin
  if (type === "place") {
    return (
      <div
        onClick={onClick}
        className={cn(
          containerClasses,
          "bg-neutral-900 border border-emerald-500/25 p-4 text-neutral-200"
        )}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-medium tracking-wide uppercase text-emerald-400">
              Location Check-in
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">{details?.timeLabel}</span>
        </div>

        <div className="font-semibold text-white text-sm mb-1">{title}</div>
        <div className="text-xs text-neutral-400 mb-2">{details?.address || subtitle}</div>

        <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-2 text-[11px] text-emerald-300/90 flex justify-between items-center">
          <span className="font-mono">{details?.coords || "Coordinates Logged"}</span>
          {details?.weather && <span className="text-neutral-400">{details.weather}</span>}
        </div>
      </div>
    );
  }

  // 6. PHOTO CARD: Film Grain / Polaroid
  if (type === "photo") {
    return (
      <div
        onClick={onClick}
        className={cn(
          containerClasses,
          "bg-neutral-950 border border-cyan-500/25 p-3 text-neutral-200"
        )}
      >
        <div className="relative aspect-4/3 rounded-lg overflow-hidden mb-2 bg-neutral-900 border border-white/10">
          <img
            src={details?.imageUrl || "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-[10px] text-cyan-300 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
            <Camera className="w-2.5 h-2.5" /> {details?.timeLabel}
          </div>
        </div>
        <div className="font-medium text-xs text-white">{title}</div>
        <div className="text-[11px] text-neutral-400">{subtitle}</div>
      </div>
    );
  }

  // 7. SEARCH CARD: Browser Query Pill
  if (type === "search") {
    return (
      <div
        onClick={onClick}
        className={cn(
          containerClasses,
          "bg-neutral-900 border border-orange-500/25 p-4 text-neutral-200"
        )}
      >
        <div className="flex justify-between items-center mb-2 text-xs text-neutral-400">
          <span className="flex items-center gap-1 text-orange-400 uppercase tracking-wider text-[10px] font-semibold">
            <Search className="w-3 h-3" /> Search Log
          </span>
          <span className="text-[11px] font-mono">{details?.timeLabel}</span>
        </div>

        <div className="bg-neutral-950 border border-neutral-700/60 rounded-full px-3.5 py-2 flex items-center gap-2 shadow-inner my-1">
          <Search className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="text-xs text-neutral-200 font-mono truncate">
            {details?.query || subtitle || title}
          </span>
        </div>
        <div className="text-[10px] text-neutral-500 mt-2 text-right">
          Safari Mobile Search • Private Session
        </div>
      </div>
    );
  }

  // 8. EVENT TICKET CARD: Perforated Stub
  if (type === "event") {
    return (
      <div
        onClick={onClick}
        className={cn(
          containerClasses,
          "bg-neutral-900 border border-pink-500/25 p-4 text-neutral-200"
        )}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider">
              Admission Pass
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">{details?.timeLabel}</span>
        </div>

        <div className="font-semibold text-white text-sm mb-1">{title}</div>
        <div className="text-xs text-neutral-400 mb-3">{details?.venue || subtitle}</div>

        <div className="border-t border-dashed border-neutral-700 pt-2 flex justify-between items-center text-xs">
          <span className="bg-pink-950/60 text-pink-300 border border-pink-700/30 px-2 py-0.5 rounded font-mono text-[11px]">
            Admit: {details?.ticketCount || 2} Persons
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">VERIFIED TICKET</span>
        </div>
      </div>
    );
  }

  // DEFAULT / FALLBACK
  return (
    <div
      onClick={onClick}
      className={cn(containerClasses, "bg-neutral-900 border border-neutral-800 p-4 text-neutral-200")}
    >
      <div className="flex justify-between items-center mb-2">
        <Icon className="w-4 h-4 text-amber-400" />
        <span className="text-[11px] text-neutral-400">{details?.timeLabel}</span>
      </div>
      <div className="font-semibold text-sm text-white">{title}</div>
      <div className="text-xs text-neutral-400 mt-1">{subtitle}</div>
    </div>
  );
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full select-none transition-transform duration-150 ease-out will-change-transform"
      style={{ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)" }}
    >
      {renderCardContent()}
    </div>
  );
};

// -------------------------------------------------------------
// Interactive Music Card with The Weeknd Synthwave Styling & Audio Synth
// -------------------------------------------------------------
function InteractiveMusicCard({
  receipt,
  isSelected,
  isLinked,
  isDimmed,
  onClick,
  containerClasses,
}: {
  receipt: Receipt;
  isSelected?: boolean;
  isLinked?: boolean;
  isDimmed?: boolean;
  onClick?: () => void;
  containerClasses: string;
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const oscillatorNodesRef = React.useRef<OscillatorNode[]>([]);
  const audioElRef = React.useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = React.useRef<Promise<void> | null>(null);

  const isTheWeeknd = receipt.details?.artist?.toLowerCase().includes("weeknd");

  const stopAudio = () => {
    if (audioElRef.current) {
      const audio = audioElRef.current;
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          audio.pause();
        }).catch(() => {});
      } else {
        audio.pause();
      }
    }
    oscillatorNodesRef.current.forEach((n) => {
      try {
        n.stop();
        n.disconnect();
      } catch (e) {}
    });
    oscillatorNodesRef.current = [];
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  };

  const playSynthFallback = async () => {
    try {
      let ctx = audioContextRef.current;
      if (!ctx || ctx.state === "closed") {
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = ctx;
      }
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Custom synthesized chords tailored to each of the 5 Weeknd chapter tracks:
      const titleLower = (receipt.title || "").toLowerCase();
      let freqs = [220.0, 261.63, 329.63, 392.0]; // Fallback melancholic pad

      if (titleLower.includes("call out")) {
        freqs = [155.56, 185.0, 233.08, 277.18]; // Ch 1: D# minor / F# dark melancholic ballad
      } else if (titleLower.includes("reminder")) {
        freqs = [174.61, 220.0, 261.63, 329.63]; // Ch 2: F minor / modern trap groove
      } else if (titleLower.includes("secrets")) {
        freqs = [220.0, 261.63, 329.63, 392.0]; // Ch 3: A minor / 80s new wave
      } else if (titleLower.includes("die for you")) {
        freqs = [138.59, 164.81, 207.65, 277.18]; // Ch 4: C# minor soaring emotional ballad
      } else if (titleLower.includes("save your tears")) {
        freqs = [196.0, 246.94, 293.66, 392.0]; // Ch 5: C major synth-pop shimmer
      } else if (isTheWeeknd) {
        freqs = [174.61, 207.65, 261.63, 311.13]; // F minor / After Hours
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(isTheWeeknd ? 650 : 800, ctx.currentTime);

      // Subtle LFO modulation for warm analog synth chorusing
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(1.5, ctx.currentTime);
      lfoGain.gain.setValueAtTime(25, ctx.currentTime);
      lfo.connect(filter.frequency);
      lfo.start();

      masterGain.connect(ctx.destination);
      filter.connect(masterGain);

      const oscNodes: OscillatorNode[] = [];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = isTheWeeknd ? (i % 2 === 0 ? "sawtooth" : "sine") : "triangle";
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.2, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        oscNodes.push(osc);
      });

      oscillatorNodesRef.current = oscNodes;
      setIsPlaying(true);

      // Auto stop preview after 25 seconds
      setTimeout(() => {
        if (audioContextRef.current === ctx) {
          stopAudio();
        }
      }, 25000);
    } catch (err) {
      console.warn("Could not play synth preview:", err);
    }
  };

  const togglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      setIsPlaying(false);
      stopAudio();
      return;
    }

    setIsPlaying(true);

    // Try playing actual MP3 if audioUrl is defined
    if (receipt.details?.audioUrl) {
      let audio = audioElRef.current;
      if (!audio) {
        audio = new Audio(receipt.details.audioUrl);
        audio.volume = 0.5;
        audioElRef.current = audio;
        audio.onended = () => {
          setIsPlaying(false);
        };
      } else if (!audio.src.endsWith(receipt.details.audioUrl)) {
        audio.src = receipt.details.audioUrl;
        audio.currentTime = 0;
      }

      try {
        const p = audio.play();
        playPromiseRef.current = p;
        await p;
        playPromiseRef.current = null;
        setIsPlaying(true);
      } catch (err: any) {
        playPromiseRef.current = null;
        if (err.name !== "AbortError") {
          console.warn("Could not play MP3, using synth fallback:", err);
          await playSynthFallback();
        }
      }
    } else {
      await playSynthFallback();
    }
  };

  React.useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className={cn(
        containerClasses,
        isTheWeeknd
          ? "bg-linear-to-br from-[#120808] via-[#1a0a0c] to-[#2b080f] border-rose-600/30 hover:border-rose-500/60 p-4 text-neutral-200 shadow-[0_4px_25px_-5px_rgba(225,29,72,0.15)]"
          : "bg-linear-to-br from-neutral-900 via-neutral-900/90 to-violet-950/40 border border-violet-500/20 p-4 text-neutral-200"
      )}
    >
      {/* Top Header with time and badges */}
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-colors",
              isTheWeeknd
                ? "bg-rose-500/20 border border-rose-500/40 text-rose-400"
                : "bg-violet-500/20 border border-violet-400/30 text-violet-300"
            )}
          >
            {isTheWeeknd ? <Flame className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
          </div>
          <span
            className={cn(
              "text-[10px] font-bold tracking-widest uppercase font-mono",
              isTheWeeknd ? "text-rose-400" : "text-violet-400/90"
            )}
          >
            {isTheWeeknd ? "XO • THE WEEKND" : "Audio Log"}
          </span>
        </div>
        <span className="text-[11px] text-neutral-400 font-mono">{receipt.details?.timeLabel}</span>
      </div>

      {/* Main Track Info & Sliding Vinyl Disc with Album Poster Sleeve */}
      <div className="relative flex items-center justify-between my-2.5">
        <div className="relative z-10 flex-1 pr-3">
          <div className="font-bold text-white text-base leading-snug tracking-tight group-hover:text-amber-200 transition-colors">
            {receipt.title}
          </div>
          <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
            <span>{receipt.details?.artist || receipt.subtitle}</span>
            {receipt.details?.album && (
              <span className="text-[10px] text-neutral-500 font-mono truncate max-w-30">
                • {receipt.details.album}
              </span>
            )}
          </div>
        </div>

        {/* Album Cover Poster & Interactive Sliding Vinyl Record */}
        <div className="relative shrink-0 flex items-center h-14 w-20 justify-end">
          {/* Vinyl Disc: Slides out when playing or hovering, spins while playing */}
          <div
            className={cn(
              "absolute z-10 w-12 h-12 rounded-full border-2 bg-[#101012] flex items-center justify-center transition-all duration-700 shadow-xl",
              isTheWeeknd ? "border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]" : "border-violet-500/30",
              isPlaying
                ? "right-0 animate-spin"
                : "right-3 group-hover:right-0"
            )}
            style={{ animationDuration: "3s" }}
          >
            <div className="w-9 h-9 rounded-full border border-neutral-700/60 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border border-neutral-600/40 flex items-center justify-center">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full flex items-center justify-center",
                    isTheWeeknd ? "bg-rose-600" : "bg-violet-600"
                  )}
                >
                  <div className="w-1 h-1 rounded-full bg-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Song Album Poster Jacket */}
          {receipt.details?.albumArt ? (
            <div className="relative z-20 w-14 h-14 rounded-lg overflow-hidden border border-white/20 shadow-2xl shrink-0 group-hover:scale-105 transition-transform bg-neutral-900">
              <img
                src={receipt.details.albumArt}
                alt={`${receipt.title} poster`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="relative z-20 w-12 h-12 rounded-lg bg-neutral-800 border border-white/10 flex items-center justify-center text-neutral-400">
              <Music className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>


      {/* Interactive Player Controls & Waveform */}
      <div
        className={cn(
          "rounded-xl p-2.5 border flex items-center justify-between transition-colors",
          isTheWeeknd
            ? "bg-black/60 border-rose-900/30"
            : "bg-neutral-950/60 border-white/5"
        )}
      >
        <div className="flex items-center gap-2.5">
          {/* Interactive Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm",
              isPlaying
                ? isTheWeeknd
                  ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                  : "bg-violet-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                : isTheWeeknd
                ? "bg-rose-950/80 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-700/40"
                : "bg-neutral-800 text-neutral-300 hover:bg-violet-600 hover:text-white"
            )}
            title={isPlaying ? "Pause Synth Preview" : "Play 80s Synth Preview"}
            aria-label={isPlaying ? "Pause track" : "Play track"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
          </button>

          {/* Equalizer Bars */}
          <div className="flex items-end gap-0.75 h-4">
            <span
              className={cn(
                "w-1 rounded-full transition-all",
                isTheWeeknd ? "bg-rose-400" : "bg-violet-400",
                isPlaying ? "animate-bounce h-4" : "h-2"
              )}
            />
            <span
              className={cn(
                "w-1 rounded-full transition-all",
                isTheWeeknd ? "bg-rose-300" : "bg-violet-300",
                isPlaying ? "animate-pulse h-3.5" : "h-3"
              )}
            />
            <span
              className={cn(
                "w-1 rounded-full transition-all",
                isTheWeeknd ? "bg-rose-400" : "bg-violet-400",
                isPlaying ? "animate-bounce h-4" : "h-1.5"
              )}
              style={{ animationDelay: "150ms" }}
            />
            <span
              className={cn(
                "w-1 rounded-full transition-all",
                isTheWeeknd ? "bg-rose-300" : "bg-violet-300",
                isPlaying ? "animate-pulse h-3" : "h-2.5"
              )}
              style={{ animationDelay: "300ms" }}
            />
          </div>

          <span className="text-xs text-neutral-300 font-mono">
            {isPlaying ? (
              <span className={cn("text-[11px] font-bold", isTheWeeknd ? "text-rose-400" : "text-violet-400")}>
                PLAYING PREVIEW
              </span>
            ) : (
              receipt.details?.duration || "3:40"
            )}
          </span>
        </div>

        {receipt.details?.playCount !== undefined && (
          <span
            className={cn(
              "text-[10px] px-2 py-0.5 rounded border font-mono",
              isTheWeeknd
                ? "text-rose-300 bg-rose-950/60 border-rose-800/40"
                : "text-violet-300 bg-violet-950/60 border-violet-700/30"
            )}
          >
            {receipt.details.playCount === 1 ? "1st play" : `${receipt.details.playCount} replays`}
          </span>
        )}
      </div>
    </div>
  );
}
