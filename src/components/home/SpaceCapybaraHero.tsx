"use client";

import { motion } from "framer-motion";

/* Pure Linings: single continuous white vector line, 2–3px stroke on dark bg */

const BG_COLOR = "#0d0d14"; /* Deep Solana purple-black */
const STROKE_COLOR = "#ffffff";
const STROKE_WIDTH = 2.5;

/* Pure Linings: minimalist single-line capybara with astronaut helmet */
const CapybaraSVG = () => (
  <svg
    viewBox="0 0 200 120"
    fill="none"
    stroke={STROKE_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Body: rounded loaf shape */}
    <path d="M 45 75 Q 25 70 22 55 Q 20 38 32 28 Q 42 20 55 22" />
    {/* Head + helmet dome */}
    <path d="M 55 22 L 62 16 Q 75 12 88 18 Q 95 24 92 32" />
    {/* Back + belly */}
    <path d="M 92 32 Q 98 45 95 60 Q 90 78 75 85 Q 58 90 45 82 Q 35 78 32 65" />
    {/* Helmet bubble */}
    <ellipse cx="75" cy="22" rx="16" ry="14" strokeWidth={STROKE_WIDTH - 0.5} />
    {/* Eye dot */}
    <circle cx="68" cy="20" r="1.5" strokeWidth={STROKE_WIDTH - 0.5} />
    {/* Ear */}
    <ellipse cx="40" cy="28" rx="6" ry="9" strokeWidth={STROKE_WIDTH - 0.5} />
    {/* Chill floating paws */}
    <path d="M 22 55 L 15 62 M 28 58 L 22 66" strokeWidth={STROKE_WIDTH - 0.5} />
  </svg>
);

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

      {/* Capybara - cruising horizontally + bobbing */}
      <motion.div
        className="absolute bottom-[10%] sm:bottom-[12%] left-0 w-[140px] h-[84px] sm:w-[180px] sm:h-[108px] md:w-[220px] md:h-[132px]"
        initial={{ x: "-15%" }}
        animate={{
          x: ["-15%", "115%"],
          y: [0, 8, 0],
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: "linear" },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <CapybaraSVG />
      </motion.div>

      {/* Second capybara pass (optional depth) - slightly offset timing */}
      <motion.div
        className="absolute bottom-[18%] sm:bottom-[20%] left-0 w-[100px] h-[60px] sm:w-[120px] sm:h-[72px] opacity-40"
        initial={{ x: "50%" }}
        animate={{
          x: ["50%", "180%"],
          y: [0, -6, 0],
        }}
        transition={{
          x: { duration: 22, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ transform: "scaleX(-1)" }}
      >
        <CapybaraSVG />
      </motion.div>

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
