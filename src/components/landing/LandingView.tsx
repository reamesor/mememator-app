"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MouseProvider, useMouse } from "./MouseContext";
import GlobeScene from "./GlobeScene";
import FlyingCapybaraLayer from "./FlyingCapybaraLayer";
import CapybaraHead from "@/components/ui/CapybaraHead";

const PARALLAX = { title: 14, button: 8 };

function LandingContent({ onEnter, mounted }: { onEnter: () => void; mounted: boolean }) {
  const { mx, my } = useMouse();
  const spotX = 50 + mx * 15;
  const spotY = 40 + my * 15;
  const tt = PARALLAX.title;
  const tb = PARALLAX.button;

  return (
    <div
      className={`absolute inset-0 z-10 flex min-w-0 flex-col justify-between transition-opacity duration-1000 pointer-events-none ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(34, 211, 238, 0.06) 0%, transparent 45%)`,
        }}
        aria-hidden
      />
      <header className="shrink-0 overflow-hidden px-0 pt-4 sm:pt-8 md:pt-12">
        <div className="flex animate-header-slide whitespace-nowrap items-center gap-3">
          <span className="font-display text-lg tracking-[0.2em] text-white sm:text-xl md:text-2xl pr-[2em] flex items-center gap-2">
            <CapybaraHead className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
            MEMEMATOR · $MATE · SOLANA
          </span>
          <span className="font-display text-lg tracking-[0.2em] text-white sm:text-xl md:text-2xl pr-[2em] flex items-center gap-2" aria-hidden>
            <CapybaraHead className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
            MEMEMATOR · $MATE · SOLANA
          </span>
        </div>
      </header>

      <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-6 sm:px-4 sm:py-6">
        {/* Left side - floating capybaras */}
        {[
          { left: "8%", top: "25%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20", duration: 2.8, delay: 0 },
          { left: "4%", top: "55%", size: "w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18", duration: 3.2, delay: 0.5 },
        ].map((p, i) => (
          <motion.div
            key={`left-${i}`}
            className="absolute pointer-events-none"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -12, 0], rotate: [0, 2, -1, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          >
            <CapybaraHead className={`${p.size} drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]`} />
          </motion.div>
        ))}
        {/* Right side - floating capybaras */}
        {[
          { right: "8%", top: "30%", size: "w-11 h-11 sm:w-15 sm:h-15 md:w-20 md:h-20", duration: 3.1, delay: 0.3 },
          { right: "5%", top: "60%", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24", duration: 2.6, delay: 0.7 },
        ].map((p, i) => (
          <motion.div
            key={`right-${i}`}
            className="absolute pointer-events-none"
            style={{ right: p.right, top: p.top }}
            animate={{ y: [0, 10, -6, 0], rotate: [0, -2, 1, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          >
            <span className="inline-block scale-x-[-1]">
              <CapybaraHead className={`${p.size} drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]`} />
            </span>
          </motion.div>
        ))}
        {/* Center: Trends. Create. Launch. - triangular layout (replacing the 3 circles) */}
        <div
          className="mb-6 relative w-64 h-48 sm:w-80 sm:h-56 md:w-96 md:h-64 transition-transform duration-200 ease-out sm:mb-8"
          style={{ transform: `translate(${mx * tt}px, ${my * tt}px)` }}
        >
          <span className="absolute left-0 top-0 font-display text-xl font-semibold tracking-wide text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
            Trends.
          </span>
          <span className="absolute right-0 top-0 font-display text-xl font-semibold tracking-wide text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
            Create.
          </span>
          <span className="absolute left-1/2 bottom-0 -translate-x-1/2 font-display text-xl font-semibold tracking-wide text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
            Launch.
          </span>
        </div>
        <div
          className="transition-transform duration-150 ease-out pointer-events-auto"
          style={{ transform: `translate(${mx * tb}px, ${my * tb}px)` }}
        >
          <button
            type="button"
            onClick={onEnter}
            className="group relative min-h-[3rem] shrink-0 rounded-full bg-cyan-500/20 px-8 py-3 font-display text-base tracking-widest text-cyan-400 ring-1 ring-cyan-500/40 transition-all duration-200 hover:bg-cyan-500/30 hover:ring-cyan-400/60 hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:min-h-[3.25rem] sm:px-10 sm:py-4 sm:text-lg"
          >
            <span className="relative z-10">Enter</span>
            <span className="absolute inset-0 rounded-full bg-cyan-500/10 opacity-0 transition group-hover:opacity-100" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default function LandingView({ onEnter }: { onEnter: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => onEnter(), 850);
  };

  return (
    <div className={`relative h-screen w-full min-w-0 overflow-hidden ${isExiting ? "globe-exit" : ""}`}>
      <MouseProvider>
        <GlobeScene onGlobeClick={handleEnter} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 0%, rgba(3,4,6,0.5) 70%, rgba(2,2,4,0.85) 100%)",
          }}
        />
        <FlyingCapybaraLayer onEnter={handleEnter} />
        <LandingContent onEnter={handleEnter} mounted={mounted} />
      </MouseProvider>
    </div>
  );
}
