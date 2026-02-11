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

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-6 sm:px-4 sm:py-6">
        <div
          className="mb-6 flex flex-wrap items-center justify-center gap-4 sm:mb-8 sm:gap-6 md:gap-8 transition-transform duration-200 ease-out"
          style={{ transform: `translate(${mx * tt}px, ${my * tt}px)` }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6)) drop-shadow(0 0 12px rgba(255,255,255,0.15))" }}
            >
              <CapybaraHead className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48" />
            </motion.div>
          ))}
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
