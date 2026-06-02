import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/gb-logo-transparent.png.asset.json";

interface AnimatedLogoProps {
  onComplete?: () => void;
  className?: string;
}

// Easing curve used across the whole reveal for cohesion.
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Total time before the splash hands control back to the page.
const TOTAL_DURATION = 4500;
// When the swirling particles start converging onto the logo contour.
const CONVERGE_START = 900;
// When the DOM logo image fades/zooms in (blur -> sharp).
const LOGO_REVEAL_AT = 1400;

export function AnimatedLogo({ onComplete, className }: AnimatedLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Logo render size per breakpoint — must mirror the <img> tailwind sizes
    // (h-28 / md:h-36 / lg:h-44) so particles align with the rendered logo.
    const logoDisplaySize = () =>
      window.innerWidth < 768 ? 112 : window.innerWidth < 1024 ? 144 : 176;
    let displaySize = logoDisplaySize();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      displaySize = logoDisplaySize();
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(6, 182, 212, ", // Cyan
      "rgba(16, 185, 129, ", // Emerald/Mint
      "rgba(59, 130, 246, ", // Blue
      "rgba(0, 245, 212, ", // Bright Mint
      "rgba(0, 187, 249, ", // Bright Blue
    ];

    // ---- Logo contour extraction -------------------------------------------
    // We sample the transparent PNG's alpha channel on an offscreen canvas to
    // recover (a) edge points that trace the silhouette and (b) sparse interior
    // points to fill it. Targets are normalized to [-0.5, 0.5] around the logo
    // center, then scaled to `displaySize` at draw time so they stay responsive.
    type NormPoint = { nx: number; ny: number; edge: boolean };
    let edgeTargets: NormPoint[] = []; // ordered around the centroid (for sparks)
    let allTargets: NormPoint[] = []; // edge + interior (for particle assembly)
    let contourReady = false;

    const img = new Image();
    img.src = logo.url;
    img.onload = () => {
      const SAMPLE = 140;
      const ratio = img.naturalHeight / img.naturalWidth || 1;
      const sw = SAMPLE;
      const sh = Math.round(SAMPLE * ratio);
      const off = document.createElement("canvas");
      off.width = sw;
      off.height = sh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, sw, sh);
      let data: Uint8ClampedArray;
      try {
        data = octx.getImageData(0, 0, sw, sh).data;
      } catch {
        return; // tainted canvas — fall back to halo behavior
      }

      const alphaAt = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= sw || y >= sh) return 0;
        return data[(y * sw + x) * 4 + 3];
      };

      const edges: NormPoint[] = [];
      const interior: NormPoint[] = [];
      const A = 50; // alpha threshold
      // The largest dimension maps to displaySize; keep aspect on the other.
      const norm = (x: number, y: number): [number, number] => [
        x / sw - 0.5,
        (y / sh - 0.5) * ratio,
      ];

      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          if (alphaAt(x, y) <= A) continue;
          const isEdge =
            alphaAt(x - 1, y) <= A ||
            alphaAt(x + 1, y) <= A ||
            alphaAt(x, y - 1) <= A ||
            alphaAt(x, y + 1) <= A;
          const [nx, ny] = norm(x, y);
          if (isEdge) edges.push({ nx, ny, edge: true });
          else if ((x + y) % 5 === 0) interior.push({ nx, ny, edge: false });
        }
      }

      if (!edges.length) return;

      // Order edge points by angle around the centroid so a spark can sweep
      // continuously around the silhouette.
      const cx = edges.reduce((s, p) => s + p.nx, 0) / edges.length;
      const cy = edges.reduce((s, p) => s + p.ny, 0) / edges.length;
      edges.sort((a, b) => Math.atan2(a.ny - cy, a.nx - cx) - Math.atan2(b.ny - cy, b.nx - cx));

      // Decimate to a manageable, evenly-spaced set.
      const pickEvenly = (arr: NormPoint[], n: number) => {
        if (arr.length <= n) return arr;
        const out: NormPoint[] = [];
        const step = arr.length / n;
        for (let i = 0; i < n; i++) out.push(arr[Math.floor(i * step)]);
        return out;
      };

      edgeTargets = pickEvenly(edges, 200);
      allTargets = [...edgeTargets, ...pickEvenly(interior, 80)];
      contourReady = true;
    };

    // ---- Particles ----------------------------------------------------------
    const particleCount = 260;
    interface Particle {
      angle: number;
      radius: number;
      orbitSpeed: number;
      size: number;
      color: string;
      alpha: number;
      x: number;
      y: number;
      phase: number;
      targetIndex: number;
      jx: number;
      jy: number;
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.min(width, height) * 0.7 + 120,
        orbitSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.4 + 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.25,
        x: centerX + (Math.random() - 0.5) * 500,
        y: centerY + (Math.random() - 0.5) * 500,
        phase: Math.random() * Math.PI * 2,
        targetIndex: i,
        jx: (Math.random() - 0.5) * 6,
        jy: (Math.random() - 0.5) * 6,
      });
    }

    // ---- Edge-traveling light flashes (sparks) ------------------------------
    interface Spark {
      pos: number; // float index into edgeTargets
      speed: number; // points per frame
      trail: number;
    }
    const sparks: Spark[] = [
      { pos: 0, speed: 1.7, trail: 14 },
      { pos: 0, speed: 2.3, trail: 18 },
      { pos: 0, speed: 1.3, trail: 10 },
    ];

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const cX = width / 2;
      const cY = height / 2;

      // Trailing fade for the cosmic dust effect.
      ctx.fillStyle = "rgba(10, 10, 12, 0.13)";
      ctx.fillRect(0, 0, width, height);

      // Converge factor: 0 = free swirl, 1 = locked onto the logo contour.
      const converge = Math.min(Math.max((elapsed - CONVERGE_START) / 1100, 0), 1);
      const conn = converge * converge * (3 - 2 * converge); // smoothstep

      particles.forEach((p) => {
        p.angle += p.orbitSpeed * (1 + converge * 2.5);

        // Halo fallback target (used early, or if the contour never loads).
        const haloRadius = 95 + Math.sin(p.phase + elapsed * 0.0015) * 35;
        let targetX = cX + Math.cos(p.angle) * haloRadius;
        let targetY = cY + Math.sin(p.angle) * haloRadius;

        if (contourReady && allTargets.length) {
          const t = allTargets[p.targetIndex % allTargets.length];
          const contourX = cX + t.nx * displaySize + p.jx * (1 - conn);
          const contourY = cY + t.ny * displaySize + p.jy * (1 - conn);
          targetX = targetX * (1 - conn) + contourX * conn;
          targetY = targetY * (1 - conn) + contourY * conn;
        }

        const lerp = 0.06 + conn * 0.06;
        p.x += (targetX - p.x) * lerp;
        p.y += (targetY - p.y) * lerp;

        // Once the logo image has resolved, dim the assembly particles so the
        // real logo reads cleanly while they linger as a faint shimmer.
        const settle =
          elapsed > LOGO_REVEAL_AT + 400
            ? Math.max(0.28, 1 - (elapsed - (LOGO_REVEAL_AT + 400)) / 1400)
            : 1;

        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = p.color.replace(", ", ")");
        ctx.beginPath();
        const pulse = 0.35 + Math.abs(Math.sin(p.phase + elapsed * 0.002)) * 0.65;
        ctx.fillStyle = p.color + p.alpha * pulse * settle + ")";
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Edge flashes: bright sparks sweeping along the silhouette once formed.
      if (contourReady && edgeTargets.length && elapsed > LOGO_REVEAL_AT) {
        const flashIntensity = Math.min((elapsed - LOGO_REVEAL_AT) / 500, 1);
        sparks.forEach((s) => {
          s.pos = (s.pos + s.speed) % edgeTargets.length;
          for (let k = 0; k < s.trail; k++) {
            const idx = (Math.floor(s.pos) - k + edgeTargets.length) % edgeTargets.length;
            const t = edgeTargets[idx];
            const x = cX + t.nx * displaySize;
            const y = cY + t.ny * displaySize;
            const headFade = (1 - k / s.trail) * flashIntensity;
            const r = (k === 0 ? 3.2 : 1.8) * headFade + 0.4;
            ctx.beginPath();
            ctx.shadowBlur = 16 * headFade;
            ctx.shadowColor = "rgba(180, 255, 250, 0.9)";
            ctx.fillStyle = `rgba(${
              k === 0 ? "255, 255, 255" : "150, 240, 255"
            }, ${0.9 * headFade})`;
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      ctx.shadowBlur = 0; // reset for performance

      if (elapsed > LOGO_REVEAL_AT && !logoVisible) {
        setLogoVisible(true);
      }

      if (elapsed >= TOTAL_DURATION) {
        if (onComplete) onComplete();
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      img.onload = null;
    };
  }, [logoVisible, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c] overflow-hidden select-none ${className}`}
    >
      {/* Canvas Background for Particle Swirl + Contour Assembly */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Pulsating Backlight Aura — anchored to the exact screen center so it
          sits behind the contour the particles assemble into. */}
      <AnimatePresence>
        {logoVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.45, 0.35], scale: [0.6, 1.05, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.2,
              ease: "easeOut",
              opacity: { times: [0, 0.6, 1] },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-primary/25 via-cyan/20 to-mint/25 blur-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Logo anchored at the EXACT screen center so it aligns with the
          particle contour. The title/subtitle are positioned below without
          shifting the logo off-center. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <AnimatePresence>
          {logoVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                ease: EASE_OUT_EXPO, // [0.22, 1, 0.36, 1]
              }}
              className="relative flex items-center justify-center"
            >
              {/* Floating, glowing ring around logo */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-primary/20 bg-[#0d0d11]/15 backdrop-blur-sm pointer-events-none"
                animate={{
                  scale: [1, 1.06, 1],
                  opacity: [0.25, 0.55, 0.25],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <img
                src={logo.url}
                alt="GB Browser"
                className="h-28 w-28 md:h-36 md:w-36 lg:h-44 lg:w-44 relative drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]"
              />

              {/* Title & Subtitle — absolutely placed below the centered logo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT_EXPO }}
                className="absolute top-full mt-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-max"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-display bg-gradient-to-r from-white via-cyan-100 to-cyan bg-clip-text text-transparent drop-shadow-sm">
                  GB Browser
                </h1>
                <p className="mt-3.5 text-xs md:text-sm tracking-[0.25em] text-cyan uppercase font-semibold opacity-90 animate-pulse">
                  Inovação · Privacidade · Velocidade
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Elegantly styled skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-20 text-xs text-muted-foreground/60 hover:text-foreground border border-border/30 hover:border-border/80 bg-card/30 backdrop-blur px-4 py-2.5 rounded-full transition-all duration-300 focus-ring shadow-lg"
      >
        Pular introdução
      </button>
    </div>
  );
}
