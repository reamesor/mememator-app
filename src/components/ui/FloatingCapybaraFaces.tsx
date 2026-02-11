"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CAPYBARA_IMAGES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

function useMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
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
  return mouse;
}

export default function FloatingCapybaraFaces() {
  const mouse = useMouse();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const positions = [
    { left: "3%", top: "8%", size: 48, dur: 4, delay: 0 },
    { right: "5%", top: "15%", size: 56, dur: 5, delay: 0.5 },
    { left: "8%", top: "55%", size: 44, dur: 3.5, delay: 1 },
    { right: "4%", top: "62%", size: 52, dur: 4.5, delay: 0.3 },
    { left: "15%", top: "45%", size: 40, dur: 5.5, delay: 1.2 },
    { right: "12%", top: "35%", size: 46, dur: 4.2, delay: 0.8 },
    { left: "2%", top: "85%", size: 42, dur: 3.8, delay: 0.2 },
    { right: "6%", top: "80%", size: 50, dur: 4.8, delay: 0.6 },
    { left: "20%", top: "90%", size: 38, dur: 5.2, delay: 1 },
    { right: "18%", top: "65%", size: 44, dur: 3.6, delay: 0.4 },
    { left: "50%", top: "5%", size: 36, dur: 4.4, delay: 0.7 },
  ];

  const parallax = 15;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {positions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute will-change-transform"
          style={{
            ...(p.left !== undefined ? { left: p.left } : { right: p.right }),
            top: p.top,
            width: p.size,
            height: p.size,
            x: mouse.x * parallax * (i % 2 === 0 ? 1 : -1),
            y: mouse.y * parallax * 0.6,
          }}
          animate={{
            y: [0, -8, 4, -4, 0],
            rotate: [0, 2, -1, 1, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <img
            src={CAPYBARA_IMAGES[i % CAPYBARA_IMAGES.length]}
            alt=""
            className="h-full w-full object-contain opacity-80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
}
