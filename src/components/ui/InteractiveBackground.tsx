"use client";

import { useMemo, useState, useEffect } from "react";

const PARTICLE_COUNT = 100;
const FLOAT_DURATION = 28;
const CURSOR_STRENGTH = 32;

function seed(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function InteractiveBackground() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: seed(i) * 100,
      top: seed(i + 1) * 100,
      size: 1.5 + Math.floor(seed(i + 2) * 2.5),
      delay: seed(i + 3) * FLOAT_DURATION,
      duration: FLOAT_DURATION + seed(i + 4) * 12,
      opacity: 0.15 + seed(i + 5) * 0.25,
    }));
  }, []);

  const cursorOffset = { x: mouse.x * CURSOR_STRENGTH, y: mouse.y * CURSOR_STRENGTH };
  const glowX = 50 + mouse.x * 20;
  const glowY = 40 + mouse.y * 20;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Animated gradient base */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,10,15,0.4) 0%, transparent 50%), " +
            "radial-gradient(ellipse 120% 80% at 50% 50%, rgba(5,5,8,0.6) 0%, transparent 60%), " +
            "var(--void-black)",
        }}
      />
      {/* Slow ambient shift */}
      <div
        className="absolute inset-0 animate-ambient-glow opacity-30"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(34,211,238,0.06) 0%, transparent 40%)`,
        }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Cursor-reactive particles / stars */}
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{ transform: `translate(${cursorOffset.x}px, ${cursorOffset.y}px)` }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-zinc-300"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animation: `dust-float ${p.duration}s ease-in-out infinite`,
              animationDelay: `-${p.delay}s`,
            }}
          />
        ))}
      </div>
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
