"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music2,
  ChevronDown,
  ChevronUp,
  Disc,
  Radio,
  Sliders,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioTrack {
  id: string;
  name: string;
  artist: string;
  mood: string;
  chapter: string;
  coverUrl?: string;
  audioUrl?: string;
  type: "synth" | "ambient";
  color: string;
  baseFreqs: number[];
  filterFreq: number;
  tempo: number;
}

const TRACKS: AudioTrack[] = [
  {
    id: "call-out-my-name",
    name: "Call Out My Name",
    artist: "The Weeknd • My Dear Melancholy,",
    mood: "restless, unresolved, exactly the 1–4 AM repeat-loop mood",
    chapter: "Chapter 1 — The 2 AM Playlist",
    coverUrl: "/covers/call-out-my-name.jpg",
    audioUrl: "/audio/call-out-my-name.mp3",
    type: "synth",
    color: "#38bdf8", // Sky blue midnight
    baseFreqs: [155.56, 185.0, 233.08, 277.18], // D# minor / F# dark melancholic ballad
    filterFreq: 550,
    tempo: 75,
  },
  {
    id: "reminder",
    name: "Reminder",
    artist: "The Weeknd • Starboy",
    mood: "forward motion, a little defiant",
    chapter: "Chapter 2 — New Coordinates",
    coverUrl: "/covers/reminder.jpg",
    audioUrl: "/audio/reminder.mp3",
    type: "synth",
    color: "#f97316", // Warm amber orange transit
    baseFreqs: [174.61, 220.0, 261.63, 329.63], // F minor / modern trap groove
    filterFreq: 850,
    tempo: 105,
  },
  {
    id: "secrets",
    name: "Secrets",
    artist: "The Weeknd • Starboy",
    mood: "curious, exploratory, lighter",
    chapter: "Chapter 3 — Learning the Block",
    coverUrl: "/covers/secrets.jpg",
    audioUrl: "/audio/secrets.mp3",
    type: "synth",
    color: "#34d399", // Emerald spruce
    baseFreqs: [220.0, 261.63, 329.63, 392.0], // A minor 80s new wave
    filterFreq: 950,
    tempo: 120,
  },
  {
    id: "die-for-you",
    name: "Die For You",
    artist: "The Weeknd • Starboy",
    mood: "the one deliberately 'first time playing this song' moment — a turning point",
    chapter: "Chapter 4 — The Night Everything Lined Up",
    coverUrl: "/covers/die-for-you.jpg",
    audioUrl: "/audio/die-for-you.mp3",
    type: "synth",
    color: "#fbbf24", // Twilight gold
    baseFreqs: [138.59, 164.81, 207.65, 277.18], // C# minor soaring emotional ballad
    filterFreq: 750,
    tempo: 85,
  },
  {
    id: "save-your-tears",
    name: "Save Your Tears",
    artist: "The Weeknd • After Hours",
    mood: "settled, a little wistful but at peace",
    chapter: "Chapter 5 — Quietly, Something Changed",
    coverUrl: "/covers/save-your-tears.jpg",
    audioUrl: "/audio/save-your-tears.mp3",
    type: "synth",
    color: "#fb7185", // Rose dawn
    baseFreqs: [196.0, 246.94, 293.66, 392.0], // C major synth-pop shimmer
    filterFreq: 880,
    tempo: 118,
  },
  {
    id: "after-hours",
    name: "After Hours",
    artist: "The Weeknd • After Hours",
    mood: "streamed 14 times between 2:15 AM and 4:00 AM",
    chapter: "Late Night Repeat",
    coverUrl: "/covers/after-hours.jpg",
    audioUrl: "/audio/after-hours.mp3",
    type: "synth",
    color: "#ef4444", // Crimson red
    baseFreqs: [174.61, 207.65, 261.63, 311.13],
    filterFreq: 650,
    tempo: 109,
  },
  {
    id: "we-dont-talk-anymore",
    name: "We Don't Talk Anymore",
    artist: "Charlie Puth feat. Selena Gomez",
    mood: "restless, unresolved midnight memory on repeat",
    chapter: "Late Night Echo",
    coverUrl: "/covers/we-dont-talk-anymore.jpg",
    audioUrl: "/audio/we-dont-talk-anymore.mp3",
    type: "synth",
    color: "#ec4899", // Warm magenta
    baseFreqs: [164.81, 196.0, 246.94, 293.66], // E minor pop groove
    filterFreq: 850,
    tempo: 100,
  },
  {
    id: "mala",
    name: "MALA",
    artist: "6ix9ine feat. Anuel AA",
    mood: "drifting from the bodega speakers on 4th Ave",
    chapter: "Street Resonance",
    coverUrl: "/covers/mala.jpg",
    audioUrl: "/audio/mala.mp3",
    type: "synth",
    color: "#eab308", // Vivid latin gold
    baseFreqs: [130.81, 155.56, 196.0, 233.08], // C minor reggaeton bassline
    filterFreq: 900,
    tempo: 96,
  },
  {
    id: "love-nwantiti",
    name: "Love Nwantiti (ah ah ah)",
    artist: "CKay feat. ElGrande Toto",
    mood: "sunset on the fire escape, breeze finally cooling down",
    chapter: "Warm Dusk",
    coverUrl: "/covers/love-nwantiti.jpg",
    audioUrl: "/audio/love-nwantiti.mp3",
    type: "synth",
    color: "#14b8a6", // Teal dusk
    baseFreqs: [146.83, 185.0, 220.0, 293.66], // D major afro-fusion
    filterFreq: 800,
    tempo: 106,
  },
  {
    id: "rain-tone",
    name: "Rain on Glass & Tape Hiss",
    artist: "Ambient Room Tone",
    mood: "white noise and midnight room atmosphere",
    chapter: "Late Night Backdrop",
    type: "ambient",
    color: "#a1a1aa", // Zinc
    baseFreqs: [],
    filterFreq: 800,
    tempo: 0,
  },
];

export const SoundtrackDock: React.FC<{ className?: string }> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.45);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{ stop: () => void; disconnect: () => void }[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const currentTrackIndexRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  // Stop audio synthesis nodes
  const stopSynth = () => {
    activeNodesRef.current.forEach((n) => {
      try {
        n.stop();
        n.disconnect();
      } catch (e) {}
    });
    activeNodesRef.current = [];
  };

  // Helper to run synth pads as fallback or ambient generator
  const runSynthPad = (ctx: AudioContext, track: AudioTrack, masterGain: GainNode) => {
    stopSynth();

    if (track.type === "ambient") {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 0.2;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(track.filterFreq, ctx.currentTime);

      noise.connect(filter);
      filter.connect(masterGain);
      noise.start();

      activeNodesRef.current.push(noise);
    } else {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(track.filterFreq, ctx.currentTime);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.8, ctx.currentTime);
      lfoGain.gain.setValueAtTime(40, ctx.currentTime);
      lfo.connect(filter.frequency);
      lfo.start();

      filter.connect(masterGain);
      activeNodesRef.current.push(lfo);

      track.baseFreqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.16, ctx.currentTime);

        osc.connect(gain);
        gain.connect(filter);
        osc.start();
        activeNodesRef.current.push(osc);
      });
    }
  };

  const startSynthFallback = async (track: AudioTrack) => {
    try {
      let ctx = audioCtxRef.current;
      if (!ctx || ctx.state === "closed") {
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
      }
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.7, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      runSynthPad(ctx, track, masterGain);
    } catch (e) {
      console.warn("Synth fallback error:", e);
    }
  };

  // Safe playback of selected track index
  const playTrackIndex = async (index: number) => {
    currentTrackIndexRef.current = index;
    setCurrentTrackIndex(index);
    const track = TRACKS[index];

    // If ambient track (no mp3 file)
    if (track.type === "ambient" || !track.audioUrl) {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      await startSynthFallback(track);
      setIsPlaying(true);
      isPlayingRef.current = true;
      return;
    }

    // Has an actual MP3 audioUrl
    stopSynth();

    let audio = audioElementRef.current;
    if (!audio) {
      audio = new Audio();
      audioElementRef.current = audio;
      audio.loop = true;
    }

    audio.volume = volume;

    // Check if we need to switch src
    const currentSrc = audio.src || "";
    if (!currentSrc.endsWith(track.audioUrl)) {
      audio.src = track.audioUrl;
      audio.currentTime = 0;
    }

    try {
      const p = audio.play();
      playPromiseRef.current = p;
      await p;
      playPromiseRef.current = null;
      setIsPlaying(true);
      isPlayingRef.current = true;
    } catch (err: any) {
      playPromiseRef.current = null;
      if (err.name !== "AbortError") {
        console.warn("Could not play audio file, falling back to synth:", err);
        await startSynthFallback(track);
        setIsPlaying(true);
        isPlayingRef.current = true;
      }
    }
  };

  // Toggle play/pause
  const togglePlay = async () => {
    if (isPlaying) {
      // Pause immediately for fast UI feedback
      setIsPlaying(false);
      isPlayingRef.current = false;
      stopSynth();

      const audio = audioElementRef.current;
      if (audio) {
        if (playPromiseRef.current) {
          try {
            await playPromiseRef.current;
          } catch (e) {}
        }
        audio.pause();
      }
    } else {
      // Play immediately for fast UI feedback
      setIsPlaying(true);
      isPlayingRef.current = true;
      await playTrackIndex(currentTrackIndex);
    }
  };

  // Switch track
  const selectTrack = async (index: number) => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    await playTrackIndex(index);
  };

  // Adjust volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioElementRef.current) {
      audioElementRef.current.volume = val;
    }
    if (masterGainRef.current && audioCtxRef.current) {
      try {
        masterGainRef.current.gain.setValueAtTime(val * 0.7, audioCtxRef.current.currentTime);
      } catch (e) {}
    }
  };

  // Real-time Canvas Equalizer Bars Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 20;
      const barWidth = canvas.width / barCount - 2;
      const trackColor = currentTrack.color;

      for (let i = 0; i < barCount; i++) {
        let height = 4;
        if (isPlaying) {
          const wave1 = Math.sin(frame * 0.08 + i * 0.45);
          const wave2 = Math.cos(frame * 0.12 + i * 0.3);
          height = Math.max(4, Math.abs(wave1 * wave2) * (canvas.height - 4) + 4);
        }

        const x = i * (barWidth + 2);
        const y = canvas.height - height;

        ctx.fillStyle = isPlaying ? trackColor : "rgba(255, 255, 255, 0.2)";
        ctx.shadowColor = isPlaying ? trackColor : "transparent";
        ctx.shadowBlur = isPlaying ? 6 : 0;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, currentTrack]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSynth();
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  return (
    <aside
      aria-label="Soundtrack and Ambient Player"
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-500 select-none",
        className
      )}
    >
      {/* Collapsed Mini Pill Player */}
      {!isOpen && (
        <div className="flex items-center gap-2.5 bg-neutral-950/90 backdrop-blur-xl border border-violet-500/40 rounded-full pl-2 pr-4 py-2 shadow-[0_0_25px_rgba(168,85,247,0.35),0_10px_35px_rgba(124,58,237,0.4)] hover:border-violet-400/80 hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.7)] cursor-pointer hover:scale-105 transition-transform"
            aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
          </button>

          {/* Album Poster Thumbnail in Collapsed Pill */}
          {currentTrack.coverUrl && (
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shadow-xs shrink-0">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.name}
                className={cn("w-full h-full object-cover", isPlaying && "animate-spin")}
                style={{ animationDuration: "8s" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 text-left cursor-pointer"
            aria-label="Expand soundtrack dock"
          >
            <div className="w-16 h-5">
              <canvas ref={canvasRef} width={64} height={20} className="w-full h-full" />
            </div>

            <div className="hidden sm:block">
              <div className="text-[11px] font-bold text-white font-mono leading-none truncate max-w-32.5">
                {currentTrack.name.split("(")[0]}
              </div>
              <div className="text-[10px] text-neutral-400 font-mono mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {isPlaying ? "Playing Vibe" : "Soundtrack Dock"}
              </div>
            </div>

            <ChevronUp className="w-4 h-4 text-neutral-400 ml-1 hover:text-white" />
          </button>
        </div>
      )}

      {/* Expanded Deck Controls */}
      {isOpen && (
        <div className="w-80 bg-neutral-950/92 backdrop-blur-2xl border border-violet-500/45 rounded-2xl p-4 shadow-[0_0_40px_rgba(168,85,247,0.35),0_20px_60px_rgba(0,0,0,0.6)] text-neutral-200 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                Soundtrack & Atmosphere
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 cursor-pointer"
              aria-label="Collapse soundtrack dock"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Real-time Visualizer Canvas */}
          <div className="w-full h-10 bg-neutral-900/80 rounded-xl p-2 mb-3 border border-white/5 flex items-center justify-center">
            <canvas ref={canvasRef} width={280} height={32} className="w-full h-full" />
          </div>

          {/* Current Track Info with Album Poster Card */}
          <div className="flex items-center gap-3 mb-3 bg-neutral-900/60 p-2.5 rounded-xl border border-white/10 shadow-lg">
            {currentTrack.coverUrl ? (
              <div className="w-13 h-13 rounded-lg overflow-hidden border border-white/20 shadow-md shrink-0 bg-neutral-950 relative">
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              <div className="w-13 h-13 rounded-lg bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0 text-neutral-400">
                <Music2 className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-0.5 truncate">
                {currentTrack.chapter}
              </div>
              <div className="text-sm font-bold text-white leading-tight truncate">{currentTrack.name}</div>
              <div className="text-xs text-rose-400 font-mono mt-0.5 truncate">{currentTrack.artist}</div>
            </div>
          </div>

          {/* Master Play & Volume Controls */}
          <div className="flex items-center justify-between gap-3 mb-4 bg-neutral-900/60 p-2.5 rounded-xl border border-white/5">
            <button
              onClick={togglePlay}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md",
                isPlaying
                  ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                  : "bg-white text-black hover:bg-neutral-200"
              )}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
            </button>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 flex-1">
              <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.02"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                aria-label="Soundtrack Volume"
              />
            </div>
          </div>

          {/* Selectable Tracks with Poster Thumbnails */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
              Soundtrack
            </div>
            {TRACKS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => selectTrack(idx)}
                className={cn(
                  "w-full text-left p-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2.5 cursor-pointer border",
                  currentTrackIndex === idx
                    ? "bg-neutral-900 text-white border-white/20 shadow-xs"
                    : "bg-neutral-950/40 text-neutral-400 border-transparent hover:text-white hover:bg-neutral-900/50"
                )}
              >
                {t.coverUrl ? (
                  <img
                    src={t.coverUrl}
                    alt={t.name}
                    className="w-8 h-8 rounded-md object-cover border border-white/10 shrink-0"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-md shrink-0 flex items-center justify-center text-neutral-400"
                    style={{ backgroundColor: `${t.color}20` }}
                  >
                    <Music2 className="w-4 h-4" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate font-semibold text-white">{t.name}</span>
                    {currentTrackIndex === idx && isPlaying && (
                      <span className="text-[9px] text-rose-400 animate-pulse uppercase shrink-0 font-bold ml-1">
                        PLAYING
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-neutral-500 truncate">
                    {t.artist}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
