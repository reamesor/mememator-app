"use client";

import { useMemo } from "react";

const PARTICLE_COUNT = 56;
const FLOAT_DURATION = 25;

function seed(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function DustBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: seed(i) * 100,
      top: seed(i + 1) * 100,
      size: 1 + Math.floor(seed(i + 2) * 2),
      delay: seed(i + 3) * FLOAT_DURATION,
      duration: FLOAT_DURATION + seed(i + 4) * 10,
      opacity: 0.08 + seed(i + 5) * 0.12,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-zinc-400"
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
  );
}
