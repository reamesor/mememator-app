"use client";

import { motion } from "framer-motion";

const CAPYBARA_FACES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

/* Pure Linings: single continuous white vector line, 2–3px stroke on dark bg */

const BG_COLOR = "#0d0d14"; /* Deep Solana purple-black */
const STROKE_COLOR = "#ffffff";

function Star({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={STROKE_COLOR}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "blur(0.5px)" }}
    />
  );
}

function Planet({ cx, cy, r, hasRing }: { cx: number; cy: number; r: number; hasRing?: boolean }) {
  return (
    <g>
      {hasRing && (
        <motion.ellipse
          cx={cx}
          cy={cy - 2}
          rx={r * 1.8}
          ry={r * 0.4}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth={1}
          opacity={0.4}
        />
      )}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={STROKE_COLOR} strokeWidth={1.5} opacity={0.6} />
    </g>
  );
}

export default function SpaceCapybaraHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-zinc-800/60"
      style={{ backgroundColor: BG_COLOR, minHeight: "min(60vh, 420px)" }}
    >
      {/* Parallax stars layer - moves slower */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "8%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {[
            [8, 15, 1], [15, 80, 0.8], [25, 45, 1.2], [35, 25, 0.6], [45, 90, 1],
            [55, 35, 0.9], [65, 70, 0.7], [75, 20, 1], [85, 55, 0.8], [92, 85, 0.6],
            [12, 60, 0.5], [42, 10, 0.7], [72, 95, 0.6], [88, 40, 0.9],
          ].map(([cx, cy, r], i) => (
            <Star key={i} cx={cx} cy={cy} r={r} delay={i * 0.2} />
          ))}
        </svg>
      </motion.div>

      {/* Parallax geometric planets - even slower */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "5%", "0%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
          <Planet cx={12} cy={25} r={4} hasRing />
          <Planet cx={88} cy={75} r={3} />
          <Planet cx={78} cy={20} r={2} />
          <Planet cx={18} cy={70} r={2.5} hasRing />
        </svg>
      </motion.div>

      {/* Floating pixel-art capybara faces — all new ones, no old line-art */}
      {[
        { left: "2%", top: "12%", size: 44, dur: 4, delay: 0 },
        { right: "3%", top: "18%", size: 40, dur: 4.5, delay: 0.2 },
        { left: "6%", top: "45%", size: 48, dur: 3.8, delay: 0.5 },
        { right: "5%", top: "55%", size: 42, dur: 5, delay: 0.3 },
        { left: "4%", top: "78%", size: 38, dur: 4.2, delay: 0.7 },
        { right: "8%", top: "82%", size: 46, dur: 4.8, delay: 0.1 },
        { left: "12%", top: "28%", size: 36, dur: 5.2, delay: 0.4 },
        { right: "14%", top: "68%", size: 40, dur: 3.6, delay: 0.6 },
        { left: "18%", top: "8%", size: 34, dur: 4.4, delay: 0.8 },
        { right: "22%", top: "42%", size: 44, dur: 4.6, delay: 0.2 },
        { left: "20%", top: "88%", size: 32, dur: 5.5, delay: 0.5 },
        { right: "28%", top: "22%", size: 38, dur: 3.9, delay: 0.3 },
        { left: "32%", top: "72%", size: 42, dur: 4.7, delay: 0.9 },
        { right: "35%", top: "5%", size: 36, dur: 4.1, delay: 0.1 },
        { left: "78%", top: "15%", size: 44, dur: 4.3, delay: 0.4 },
        { right: "72%", top: "48%", size: 40, dur: 5.1, delay: 0.6 },
        { left: "75%", top: "82%", size: 38, dur: 3.7, delay: 0.2 },
        { right: "85%", top: "25%", size: 46, dur: 4.9, delay: 0.7 },
        { left: "88%", top: "58%", size: 34, dur: 4.5, delay: 0.3 },
        { right: "92%", top: "88%", size: 42, dur: 5.3, delay: 0.5 },
      ].map((p, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute pointer-events-none z-10"
          style={{
            ...(p.left !== undefined ? { left: p.left } : { right: p.right }),
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -8, 5, 0], rotate: [0, 2, -1, 0] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <img
            src={CAPYBARA_FACES[i % CAPYBARA_FACES.length]}
            alt=""
            className="h-full w-full object-contain opacity-80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      ))}

      {/* Pure Linings branding */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[10px] font-medium uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white/70"
          >
            Pure Linings
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl"
          >
            Commander MATE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-1 text-xs text-white/60 sm:text-sm"
          >
            Deploy the narrative. Ignite the chart.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
