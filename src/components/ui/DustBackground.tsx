"use client";

import { useMemo, useState, useEffect } from "react";

const PARTICLE_COUNT = 90;
const FLOAT_DURATION = 25;
const CURSOR_STRENGTH = 28;

function seed(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function DustBackground() {
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
      size: 2 + Math.floor(seed(i + 2) * 3),
      delay: seed(i + 3) * FLOAT_DURATION,
      duration: FLOAT_DURATION + seed(i + 4) * 10,
      opacity: 0.18 + seed(i + 5) * 0.22,
    }));
  }, []);

  const cursorOffset = {
    x: mouse.x * CURSOR_STRENGTH,
    y: mouse.y * CURSOR_STRENGTH,
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden transition-transform duration-150 ease-out"
      style={{
        transform: `translate(${cursorOffset.x}px, ${cursorOffset.y}px)`,
      }}
      aria-hidden
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
  );
}
