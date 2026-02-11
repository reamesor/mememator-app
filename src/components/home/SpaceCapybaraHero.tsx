"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CAPYBARA_FACES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

const BG_COLOR = "#0d0d14";
const STROKE_COLOR = "#ffffff";

function Star({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={STROKE_COLOR}
      initial={{ opacity: 0.25 }}
      animate={{ opacity: [0.15, 0.4, 0.15] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "blur(0.5px)" }}
    />
  );
}

function useMouse() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return mouse;
}

export default function SpaceCapybaraHero() {
  const mouse = useMouse();
  const glowX = mouse.x * 100;
  const glowY = mouse.y * 100;

  /* Only 6 capybaras — corners & far edges, small & subtle. Center stays clear. */
  const capybaraSpots: Array<{
    left?: string;
    right?: string;
    top: string;
    size: number;
    dur: number;
    delay: number;
    i: number;
  }> = [
    { left: "3%", top: "5%", size: 28, dur: 5, delay: 0, i: 0 },
    { right: "4%", top: "8%", size: 24, dur: 5.5, delay: 0.5, i: 1 },
    { left: "2%", top: "88%", size: 26, dur: 4.5, delay: 0.2, i: 2 },
    { right: "3%", top: "85%", size: 30, dur: 5.2, delay: 0.8, i: 3 },
    { left: "8%", top: "48%", size: 22, dur: 4.8, delay: 0.3, i: 4 },
    { right: "6%", top: "52%", size: 26, dur: 5.3, delay: 0.6, i: 5 },
  ];

  return (
    <section
      className="group/hero relative overflow-hidden border-b border-zinc-800/60"
      style={{ backgroundColor: BG_COLOR, minHeight: "min(55vh, 380px)" }}
    >
      {/* Ambient stars — fewer, slower */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "6%", "0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {[
            [12, 20, 1], [22, 75, 0.8], [38, 40, 0.6], [58, 85, 0.9], [72, 25, 0.7], [88, 60, 0.8],
            [18, 55, 0.5], [78, 90, 0.6],
          ].map(([cx, cy, r], i) => (
            <Star key={i} cx={cx} cy={cy} r={r} delay={i * 0.3} />
          ))}
        </svg>
      </motion.div>

      {/* Cursor-following glow — soft, behind content */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-300 group-hover/hero:opacity-50"
        style={{
          background: `radial-gradient(ellipse 35% 35% at ${glowX}% ${glowY}%, rgba(34,211,238,0.2) 0%, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Subtle center vignette — draws focus to text */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden
      />

      {/* Minimal floating capybaras — edges only */}
      {capybaraSpots.map((p) => (
        <motion.div
          key={`float-${p.i}`}
          className="absolute pointer-events-none z-0 opacity-40"
          style={{
            ...(p.left != null ? { left: p.left } : { right: p.right }),
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -6, 4, 0], rotate: [0, 1.5, -1, 0] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <img
            src={CAPYBARA_FACES[p.i % CAPYBARA_FACES.length]}
            alt=""
            className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          />
        </motion.div>
      ))}

      {/* Hero content — interactive typography */}
      <div className="relative z-10 flex min-h-[min(55vh,380px)] items-center justify-center px-4">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[10px] font-medium uppercase tracking-[0.45em] sm:tracking-[0.55em] text-white/60"
          >
            Pure Linings
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="mt-3 font-semibold tracking-tight sm:mt-4"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
            }}
          >
            <span
              className="bg-gradient-to-r from-white via-cyan-100 to-amber-100 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}
            >
              Commander MATE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-2 cursor-default text-xs text-white/55 transition-colors duration-200 hover:text-cyan-200/80 sm:text-sm"
          >
            Deploy the narrative. Ignite the chart.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
