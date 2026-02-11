"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CAPYBARA_FACES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

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

export default function SpaceCapybaraHero() {
  const [spawnedCapybaras, setSpawnedCapybaras] = useState<
    Array<{ id: number; left?: string; right?: string; top: string; size: number; faceIdx: number }>
  >([]);

  const handleCapybaraClick = useCallback(() => {
    const spots = [
      { left: "12%" as const, top: "18%", size: 32 },
      { right: "12%" as const, top: "22%", size: 28 },
      { left: "8%" as const, top: "72%", size: 30 },
      { right: "10%" as const, top: "68%", size: 26 },
    ];
    const pick = spots[Math.floor(Math.random() * spots.length)];
    const id = Date.now() + Math.random();
    const newOne = {
      id,
      ...pick,
      faceIdx: Math.floor(Math.random() * 11),
    };
    setSpawnedCapybaras((prev) => [...prev.slice(-4), newOne]);
    setTimeout(() => {
      setSpawnedCapybaras((prev) => prev.filter((c) => c.id !== id));
    }, 2500);
  }, []);

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
      className="group/hero relative overflow-hidden border-b border-cyan-500/20"
      style={{
        minHeight: "min(55vh, 380px)",
        background: "linear-gradient(165deg, #0a0a0f 0%, #0d0d14 35%, #0a0a12 70%, #050508 100%)",
      }}
    >
      {/* Subtle grid overlay — cyber/terminal vibe */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

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

      {/* Cyan–amber center glow — site signature colors */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(34,211,238,0.25) 0%, rgba(251,191,36,0.08) 40%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Bottom accent line — cyan glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px opacity-60"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 30%, rgba(251,191,36,0.4) 50%, rgba(34,211,238,0.6) 70%, transparent 100%)",
          boxShadow: "0 0 20px rgba(34,211,238,0.2)",
        }}
        aria-hidden
      />

      {/* Corner vignettes — darker edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
        aria-hidden
      />

      {/* Interactive floating capybaras — hover zoom, click spawns more */}
      {capybaraSpots.map((p) => (
        <motion.button
          key={`float-${p.i}`}
          type="button"
          onClick={handleCapybaraClick}
          title="Click for more capybaras"
          className="absolute z-[5] cursor-pointer touch-manipulation rounded-full transition-[box-shadow] duration-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
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
          whileHover={{ scale: 1.45, opacity: 0.95, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        >
          <img
            src={CAPYBARA_FACES[p.i % CAPYBARA_FACES.length]}
            alt=""
            className="h-full w-full object-contain opacity-80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-opacity hover:opacity-100"
          />
        </motion.button>
      ))}

      {/* Spawned capybaras — appear on click, fade out after 2.5s */}
      <AnimatePresence>
        {spawnedCapybaras.map((c) => (
          <motion.div
            key={c.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute pointer-events-none z-[4]"
            style={{
              ...(c.left != null ? { left: c.left } : { right: c.right }),
              top: c.top,
              width: c.size,
              height: c.size,
            }}
          >
            <img
              src={CAPYBARA_FACES[c.faceIdx]}
              alt=""
              className="h-full w-full object-contain drop-shadow-[0_4px_16px_rgba(34,211,238,0.3)]"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hero content — interactive typography */}
      <div className="relative z-10 flex min-h-[min(55vh,380px)] items-center justify-center px-4">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[10px] font-medium uppercase tracking-[0.45em] sm:tracking-[0.55em] text-cyan-400/80"
          >
            Pure Linings
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="mt-3 font-bold tracking-tight sm:mt-4"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
            }}
          >
            <span className="font-display">
              <span className="text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">Commander</span>{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(251,191,36,0.25)]" style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}>
                MATE
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-2 cursor-default text-xs text-zinc-400 transition-colors duration-200 hover:text-cyan-300 sm:text-sm"
          >
            <span className="text-cyan-400/90">Deploy</span> the narrative. <span className="text-amber-400/90">Ignite</span> the chart.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
