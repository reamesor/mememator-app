"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MouseProvider, useMouse } from "./MouseContext";
import GlobeScene from "./GlobeScene";
import FlyingCapybaraLayer from "./FlyingCapybaraLayer";

const CAPYBARA_FACES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

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
            <img src={CAPYBARA_FACES[0]} alt="" className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 object-contain" />
            MEMEMATOR · $MATE · SOLANA
          </span>
          <span className="font-display text-lg tracking-[0.2em] text-white sm:text-xl md:text-2xl pr-[2em] flex items-center gap-2" aria-hidden>
            <img src={CAPYBARA_FACES[0]} alt="" className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 object-contain" />
            MEMEMATOR · $MATE · SOLANA
          </span>
        </div>
      </header>

      <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-6 sm:px-4 sm:py-6">
        {/* Left side - floating capybara faces (uploaded pixel-art) chilling in space */}
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
            <img src={CAPYBARA_FACES[i % CAPYBARA_FACES.length]} alt="" className={`${p.size} object-contain opacity-85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]`} />
          </motion.div>
        ))}
        {/* Right side - floating capybara faces (uploaded pixel-art) chilling in space */}
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
            <img src={CAPYBARA_FACES[(i + 2) % CAPYBARA_FACES.length]} alt="" className={`${p.size} object-contain opacity-85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] scale-x-[-1]`} />
          </motion.div>
        ))}
        {/* Center: Trends. Create. Launch. - single line, centered, glow */}
        <div
          className="mb-6 w-full text-center transition-transform duration-200 ease-out sm:mb-8"
          style={{ transform: `translate(${mx * tt}px, ${my * tt}px)` }}
        >
          <h1
            className="font-display inline-block text-lg font-semibold tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
            style={{
              textShadow: "0 0 24px rgba(255,255,255,0.35), 0 0 48px rgba(34,211,238,0.25), 0 2px 12px rgba(0,0,0,0.5)",
              whiteSpace: "nowrap",
              wordSpacing: "0.2em",
            }}
          >
            Trends. Create. Launch.
          </h1>
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
