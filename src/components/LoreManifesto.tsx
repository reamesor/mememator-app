"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Hammer } from "lucide-react";

export default function LoreManifesto() {
  return (
    <div className="border-t border-zinc-900 bg-[#050505] px-6 py-24 font-mono">
      <div className="mx-auto max-w-4xl space-y-12">
        <h3 className="text-center font-black uppercase tracking-[0.5em] text-orange-500 underline decoration-orange-500/30 underline-offset-8 text-sm">
          $MATE_MANIFESTO
        </h3>
        <div className="grid gap-8 text-[12px] leading-relaxed text-zinc-400 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 p-6"
          >
            <div className="absolute right-0 top-0 p-2 text-zinc-800 transition-colors group-hover:text-orange-500/20">
              01
            </div>
            <h4 className="mb-4 flex items-center gap-2 font-bold uppercase text-white">
              <Zap size={14} className="text-orange-500" /> The Origin
            </h4>
            <p>
              The world is loud, volatile, and exhausting. $MATE was born in the
              silence between the red and green candles. We are the calm within
              the chaos.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 p-6"
          >
            <div className="absolute right-0 top-0 p-2 text-zinc-800 transition-colors group-hover:text-orange-500/20">
              02
            </div>
            <h4 className="mb-4 flex items-center gap-2 font-bold uppercase text-white">
              <Hammer size={14} className="text-orange-500" /> The Forge
            </h4>
            <p>
              MemeMator is our primary weapon. We don&apos;t just post; we forge.
              Every artifact created here is a brick in the $MATE fortress.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
