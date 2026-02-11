"use client";

import { useState, useEffect } from "react";
import { MouseProvider, useMouse } from "./MouseContext";
import GlobeScene from "./GlobeScene";

const PARALLAX = { title: 14, button: 8 };

function LandingContent({ onEnter, mounted }: { onEnter: () => void; mounted: boolean }) {
  const { mx, my } = useMouse();
  const spotX = 50 + mx * 15;
  const spotY = 40 + my * 15;
  const tt = PARALLAX.title;
  const tb = PARALLAX.button;

  return (
    <div
      className={`absolute inset-0 flex min-w-0 flex-col justify-between transition-opacity duration-1000 pointer-events-none ${
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
        <div className="flex animate-header-slide whitespace-nowrap">
          <span className="font-display text-lg tracking-[0.2em] text-white sm:text-xl md:text-2xl pr-[2em]">
            MEMEMATOR · $MATE · SOLANA
          </span>
          <span className="font-display text-lg tracking-[0.2em] text-white sm:text-xl md:text-2xl pr-[2em]" aria-hidden>
            MEMEMATOR · $MATE · SOLANA
          </span>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 py-4 sm:px-4 sm:py-6">
        <h1
          className="mb-6 text-center font-display text-3xl tracking-wide text-white drop-shadow-lg sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl transition-transform duration-200 ease-out"
          style={{ transform: `translate(${mx * tt}px, ${my * tt}px)` }}
        >
          Trends. Create. Launch.
        </h1>
        <div
          className="transition-transform duration-150 ease-out pointer-events-auto"
          style={{ transform: `translate(${mx * tb}px, ${my * tb}px)` }}
        >
          <button
            type="button"
            onClick={onEnter}
            className="group relative shrink-0 rounded-full bg-cyan-500/20 px-8 py-3 font-display text-base tracking-widest text-cyan-400 ring-1 ring-cyan-500/40 transition-all duration-200 hover:bg-cyan-500/30 hover:ring-cyan-400/60 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:px-10 sm:py-4 sm:text-lg"
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
        <LandingContent onEnter={handleEnter} mounted={mounted} />
      </MouseProvider>
    </div>
  );
}
