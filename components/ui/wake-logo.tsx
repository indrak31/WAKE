"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WakeMarkProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * Wake mark: a moment (dot) trailing three fading ripples
 * Vectors directly from the official brand identity.
 */
export function WakeMark({ className, size = 32, glow = true }: WakeMarkProps) {
  return (
    <svg
      viewBox="72 70 82 58"
      width={size}
      height={(size * 58) / 82}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 transition-transform duration-300", className)}
      style={
        glow
          ? {
              filter: "drop-shadow(0 0 8px rgba(231, 169, 76, 0.45))",
            }
          : undefined
      }
    >
      {/* Ripple 1 (closest to dot) */}
      <path
        d="M 124.41 109 Q 116.06 100 124.41 91"
        fill="none"
        stroke="#E7A94C"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="1"
        className="transition-opacity duration-300"
      />
      {/* Ripple 2 (middle) */}
      <path
        d="M 112.29 116 Q 97.44 100 112.29 84"
        fill="none"
        stroke="#E7A94C"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
        className="transition-opacity duration-300"
      />
      {/* Ripple 3 (outermost) */}
      <path
        d="M 100.16 123 Q 78.82 100 100.16 77"
        fill="none"
        stroke="#E7A94C"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.28"
        className="transition-opacity duration-300"
      />
      {/* Core moment dot */}
      <circle cx="140" cy="100" r="9" fill="#E7A94C" />
    </svg>
  );
}

/**
 * Wake squircle icon badge matching the official app icon.
 */
export function WakeSquircleIcon({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl flex items-center justify-center overflow-hidden border border-violet-500/20 shadow-lg shadow-violet-950/50",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: "#1B1626",
      }}
    >
      <WakeMark size={size * 0.58} glow />
    </div>
  );
}

/**
 * Full Wake Brand lockup (mark + Fraunces italic wordmark)
 */
export function WakeLogo({
  className,
  markSize = 28,
  textSize = "text-xl",
  showWordmark = true,
}: {
  className?: string;
  markSize?: number;
  textSize?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <WakeMark size={markSize} glow />
      {showWordmark && (
        <span
          className={cn(
            "font-wake tracking-tight text-[#F4EFE6] leading-none transition-colors",
            textSize
          )}
        >
          wake
        </span>
      )}
    </div>
  );
}
