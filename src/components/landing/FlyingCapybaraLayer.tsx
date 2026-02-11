"use client";

import { motion } from "framer-motion";
import { useMouse } from "./MouseContext";

const CAPYBARA_FACES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

const STROKE_COLOR = "#ffffff";
const CURSOR_PARALLAX = 20;

function Star({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={STROKE_COLOR}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: [0.15, 0.5, 0.15] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function FlyingCapybaraLayer({ onEnter }: { onEnter?: () => void }) {
  const { mx, my } = useMouse();
  const cursorOffset = { x: mx * CURSOR_PARALLAX, y: my * CURSOR_PARALLAX };

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden" aria-hidden>
      {/* Parallax stars - non-interactive */}
      <div className="pointer-events-none absolute inset-0">
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
      </div>

      {/* Cruising capybara - interactive: cursor parallax, hover glow, click to Enter */}
      <motion.div
        className="absolute inset-0 flex items-end justify-start pointer-events-none"
        style={{ paddingBottom: "15%" }}
      >
        <motion.div
          className="pointer-events-auto cursor-pointer"
          style={{ x: cursorOffset.x, y: cursorOffset.y }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <motion.button
            type="button"
            onClick={onEnter}
            className="relative w-[120px] h-[72px] sm:w-[160px] sm:h-[96px] md:w-[200px] md:h-[120px] touch-manipulation flex items-center justify-center"
            initial={{ x: "-15vw" }}
            animate={{
              x: ["-15vw", "115vw"],
              y: [0, 8, 0],
            }}
            transition={{
              x: { duration: 18, repeat: Infinity, ease: "linear" },
              y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            title="Click Commander MATE to Enter"
          >
            <span className="absolute inset-0 -m-4 rounded-full bg-cyan-400/0 hover:bg-cyan-400/10 transition-colors duration-200 pointer-events-none" />
            <img src={CAPYBARA_FACES[1]} alt="" className="relative z-10 h-full w-full object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" style={{ opacity: 0.95 }} />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Second capybara - depth layer, also interactive */}
      <motion.div
        className="absolute inset-0 flex items-end justify-start pointer-events-none"
        style={{ paddingBottom: "8%" }}
      >
        <motion.div
          className="pointer-events-auto cursor-pointer ml-[30vw]"
          style={{ x: cursorOffset.x * 0.5, y: cursorOffset.y * 0.5 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <motion.button
            type="button"
            onClick={onEnter}
            className="relative w-[80px] h-[48px] sm:w-[100px] sm:h-[60px] opacity-35 touch-manipulation flex items-center justify-center"
            initial={{ x: "0vw" }}
            animate={{
              x: ["0vw", "100vw"],
              y: [0, -6, 0],
            }}
            transition={{
              x: { duration: 22, repeat: Infinity, ease: "linear" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ transform: "scaleX(-1)" }}
            whileHover={{ scale: 1.2, opacity: 0.6 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={CAPYBARA_FACES[2]} alt="" className="h-full w-full object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* User's uploaded pixel-art capybara faces — chilling in outer space */}
      {[
        { left: "2%", top: "12%", size: 36, dur: 4.2, delay: 0 },
        { right: "3%", top: "72%", size: 42, dur: 3.8, delay: 0.4 },
        { left: "18%", top: "82%", size: 32, dur: 5, delay: 0.8 },
        { right: "14%", top: "22%", size: 38, dur: 4.5, delay: 0.2 },
        { left: "5%", top: "42%", size: 34, dur: 4.8, delay: 0.6 },
      ].map((p, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute pointer-events-none"
          style={{
            ...(p.left !== undefined ? { left: p.left } : { right: p.right }),
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -6, 4, 0], rotate: [0, 1.5, -1, 0] }}
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
            className="h-full w-full object-contain opacity-75 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
