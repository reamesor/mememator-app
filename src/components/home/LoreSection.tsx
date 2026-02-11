"use client";

import { motion } from "framer-motion";

export default function LoreSection() {
  return (
    <section className="border-b border-zinc-800/60 bg-zinc-950/60">
      <div className="container-tight px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div className="text-center">
            <h2 className="font-pixel text-lg font-semibold tracking-tight text-white sm:text-xl md:text-2xl">
              The Legend of Commander MATE
            </h2>
            <p className="mt-1 font-pixel text-xs uppercase tracking-widest text-cyan-400/90 sm:text-sm">
              The Cosmic Loaf
            </p>
          </div>

          <div className="space-y-5 font-pixel text-xs sm:text-sm leading-relaxed text-zinc-300">
            <div>
              <h3 className="mb-2 text-cyan-400/90 font-medium uppercase tracking-wider text-[10px] sm:text-xs">
                The Origin
              </h3>
              <p>
                MATE was originally a regular capybara who was so fundamentally unbothered by the chaos of the jungle
                that he accidentally detached from Earth&apos;s gravity. While other animals fought for survival, MATE
                achieved a state of &quot;Absolute Zen&quot; and floated into the stratosphere.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-cyan-400/90 font-medium uppercase tracking-wider text-[10px] sm:text-xs">
                The Mission
              </h3>
              <p>
                Now, he cruises the Solana blockchain at 30,000 TPS (Transactions Per Snooze). He is the
                &quot;Pure Lining&quot;—a single, unbroken thread of white light connecting every diamond hand.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-cyan-400/90 font-medium uppercase tracking-wider text-[10px] sm:text-xs">
                His Philosophy
              </h3>
              <blockquote className="pl-4 border-l-2 border-cyan-400/40 italic text-zinc-200">
                &quot;If you don&apos;t look at the charts, the red candles can&apos;t hurt you.&quot;
              </blockquote>
            </div>

            <div>
              <h3 className="mb-2 text-cyan-400/90 font-medium uppercase tracking-wider text-[10px] sm:text-xs">
                Superpower
              </h3>
              <p>
                <span className="text-amber-400/90 font-medium">Anti-Rug Gravity Field:</span> MATE is physically too
                round and heavy to be rug-pulled. If a dev tries, they just break their back.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
