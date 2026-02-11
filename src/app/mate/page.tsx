"use client";

import Link from "next/link";
import { Flame, Lock, Zap, BadgeCheck } from "lucide-react";

export default function MateInfoPage() {
  return (
    <div className="min-h-screen bg-zinc-950/88">
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur">
        <div className="container-tight flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/?hub=1"
            className="min-h-[2.75rem] flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-300"
          >
            ← Mememator
          </Link>
          <span className="font-mono text-sm font-semibold text-cyan-400">$MATE</span>
        </div>
      </header>

      <main className="container-tight px-4 py-6 sm:px-6 sm:py-8 overflow-x-hidden">
        <h1 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          $MATE Token
        </h1>
        <p className="mb-6 text-xs text-zinc-500 sm:text-sm">
          Mememator&apos;s utility token on Solana. Use it to unlock the Forge, burn for launches, and flex status.
        </p>

        <section className="space-y-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-zinc-100">Burn to Launch</h2>
            </div>
            <p className="text-xs text-zinc-400">
              When you launch a token to Pump.fun from <strong className="text-zinc-300">The Forge</strong>, you burn a fixed amount of $MATE (e.g. 500 $MATE) as a &quot;luck fee.&quot; Burns are deflationary and visible on-chain. More burns, less supply. Based.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-semibold text-zinc-100">Stake to Unlock Styles</h2>
            </div>
            <p className="text-xs text-zinc-400">
              Hold <strong className="text-cyan-400">50,000+ $MATE</strong> to unlock <strong className="text-zinc-300">AI-Synth</strong> and <strong className="text-zinc-300">Deep-Fried</strong> meme styles in The Forge. Below that, only the Retro style is available. Stake to unlock—no gatekeeping, just utility.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-zinc-100">Forge-Master Badge</h2>
            </div>
            <p className="text-xs text-zinc-400">
              Hold <strong className="text-emerald-400">100,000+ $MATE</strong> and your wallet gets the <strong className="text-zinc-300">Forge-Master</strong> badge next to your address in The Forge. Pure flex. No roadmap, just vibes and tiered utility.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-zinc-100">Where to Use $MATE</h2>
            </div>
            <p className="mb-3 text-xs text-zinc-400">
              The <strong className="text-zinc-300">Meme-to-Market Engine</strong> (The Ignition → The Forge → Pump.fun) is where $MATE comes to life: connect wallet, create memes, burn $MATE to launch. Discovery happens in <strong className="text-zinc-300">Hype Hall</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/ignition"
                className="rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/30"
              >
                Go to The Ignition
              </Link>
              <Link
                href="/forge"
                className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:border-zinc-500 hover:text-zinc-300"
              >
                The Forge
              </Link>
              <Link
                href="/hype-hall"
                className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:border-zinc-500 hover:text-zinc-300"
              >
                Hype Hall
              </Link>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-[10px] text-zinc-600">
          NFA. Token utility may evolve. Check official channels for the latest.
        </p>
      </main>
    </div>
  );
}
