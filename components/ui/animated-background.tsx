"use client";

import React, { useEffect, useRef } from "react";

/**
 * AnimatedBackground — High-performance 60 FPS living canvas:
 * - Dedicated GPU layer via translateZ(0)
 * - Native alpha blending (no mix-blend-mode overhead for zero scroll lag)
 * - Lightweight radiant aurora blobs & twinkling micro-stars
 * - Smooth, non-blocking scroll parallax
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let rafId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Smooth scroll parallax with rAF throttling
    let scrollY = 0;
    let targetScrollY = 0;
    let scrollTicking = false;

    const onScroll = () => {
      targetScrollY = window.scrollY;
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          scrollY = targetScrollY;
          scrollTicking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 5 optimized radiant aurora blobs
    const blobs = [
      { x: 0.15, y: 0.15, r: 420, color: "rgba(147, 51, 234, 0.28)", speedX: 0.0003,  speedY: 0.0004,  phase: 0 },
      { x: 0.82, y: 0.25, r: 460, color: "rgba(168, 85, 247, 0.25)", speedX: -0.00025, speedY: 0.00035, phase: 1.4 },
      { x: 0.50, y: 0.50, r: 500, color: "rgba(126, 34, 206, 0.24)", speedX: 0.0002,  speedY: -0.0003, phase: 2.8 },
      { x: 0.88, y: 0.78, r: 400, color: "rgba(192, 132, 252, 0.20)", speedX: -0.0003, speedY: 0.00025, phase: 4.2 },
      { x: 0.12, y: 0.82, r: 440, color: "rgba(139, 92, 246, 0.24)", speedX: 0.00032, speedY: -0.0004, phase: 2.1 },
    ];

    // 70 twinkling micro-stars
    const stars: {
      x: number;
      y: number;
      r: number;
      alpha: number;
      speed: number;
      phase: number;
      color: string;
    }[] = [];

    const starColors = [
      "rgba(255, 255, 255,",
      "rgba(216, 180, 254,",
      "rgba(192, 132, 252,",
      "rgba(165, 243, 252,",
    ];

    for (let i = 0; i < 70; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.002 + 0.001,
        phase: Math.random() * Math.PI * 2,
        color: starColors[i % starColors.length],
      });
    }

    let t = 0;

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, w, h);

      const parallaxY = (scrollY * 0.08) % h;

      // 1. Central breathing ambient glow
      const breath = 0.08 + 0.03 * Math.sin(t * 0.01);
      const centerGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 40, w * 0.5, h * 0.45, Math.max(w, h) * 0.55);
      centerGrad.addColorStop(0, `rgba(168, 85, 247, ${breath})`);
      centerGrad.addColorStop(1, "transparent");
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Draw radiant violet aurora blobs
      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        const bx = (blob.x + Math.sin(t * blob.speedX + blob.phase) * 0.1) * w;
        let by = (blob.y + Math.cos(t * blob.speedY + blob.phase) * 0.06) * h - parallaxY;
        if (by < -blob.r) by += h + blob.r * 2;
        if (by > h + blob.r) by -= h + blob.r * 2;

        const scale = 1 + Math.sin(t * 0.0006 + blob.phase) * 0.12;
        const r = blob.r * scale;

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, "0.08)"));
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw twinkling stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const sx = star.x * w;
        let sy = star.y * h - (scrollY * 0.04) % h;
        if (sy < 0) sy += h;

        const flicker = star.alpha * (0.4 + 0.6 * Math.sin(t * star.speed + star.phase));
        ctx.fillStyle = `${star.color}${flicker})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 gpu-layer"
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
        opacity: 0.95,
      }}
      aria-hidden="true"
    />
  );
}
