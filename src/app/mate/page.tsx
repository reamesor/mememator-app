"use client";

import Link from "next/link";
import { Flame, Lock, Zap, BadgeCheck } from "lucide-react";

export default function MateInfoPage() {
  return (
    <div className="min-h-screen bg-zinc-950/90">
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/97 backdrop-blur-md shadow-[0_1px_0_0_rgba(56,189,248,0.06)]">
        <div className="container-tight flex items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link
            href="/?hub=1"
            className="group min-h-[2.75rem] flex items-center gap-2.5 rounded-lg border border-zinc-700/60 bg-zinc-900/60 px-3 py-2 text-sm font-medium text-zinc-400 transition-all hover:border-sky-500/40 hover:bg-sky-500/10 hover:text-sky-400"
          >
            <img src="/capybara-faces/capybara-1.png" alt="" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain" />
            ← Mememator
          </Link>
          <span className="rounded-full border border-sky-500/40 bg-gradient-to-r from-sky-500/20 to-sky-600/10 px-4 py-1.5 font-mono text-sm font-semibold text-sky-400">$MATE</span>
        </div>
      </header>

      <main className="container-tight px-4 py-6 sm:px-6 sm:py-8 overflow-x-hidden">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
          Solana utility token
        </div>
        <h1 className="mb-2 font-display text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
          $MATE Token
        </h1>
        <p className="mb-4 text-sm text-zinc-400 sm:text-base">
          Mememator&apos;s utility token on Solana. Use it to unlock the Forge, burn for launches, and flex status.
        </p>
        <div className="mb-8 flex flex-wrap gap-2">
          <span className="rounded-full border border-zinc-600 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-400">Solana SPL token</span>
          <span className="rounded-full border border-zinc-600 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-400">Deflationary (burns)</span>
          <span className="rounded-full border border-zinc-600 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-400">No VC, fair launch</span>
        </div>

        <section className="space-y-4">
          <div className="group rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent p-5 transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-amber-500/5">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/20 p-2">
                <Flame className="h-4 w-4 text-amber-400" />
              </div>
              <h2 className="text-base font-bold text-zinc-100">Burn to Launch</h2>
            </div>
            <p className="text-sm text-zinc-400">
              When you launch a token to Pump.fun from <strong className="text-zinc-300">The Forge</strong>, you burn a fixed amount of $MATE (e.g. 500 $MATE) as a &quot;luck fee.&quot; Burns are deflationary and visible on-chain. More burns, less supply. Based.
            </p>
          </div>

          <div className="group rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent p-5 transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/5">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/20 p-2">
                <Lock className="h-4 w-4 text-cyan-400" />
              </div>
              <h2 className="text-base font-bold text-zinc-100">Stake to Unlock Styles</h2>
            </div>
            <p className="text-sm text-zinc-400">
              Hold <strong className="text-cyan-400">50,000+ $MATE</strong> to unlock <strong className="text-zinc-300">AI-Synth</strong> and <strong className="text-zinc-300">Deep-Fried</strong> meme styles in The Forge. Below that, only the Retro style is available. Stake to unlock—no gatekeeping, just utility.
            </p>
          </div>

          <div className="group rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent p-5 transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-emerald-500/5">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/20 p-2">
                <BadgeCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-base font-bold text-zinc-100">Forge-Master Badge</h2>
            </div>
            <p className="text-sm text-zinc-400">
              Hold <strong className="text-emerald-400">100,000+ $MATE</strong> and your wallet gets the <strong className="text-zinc-300">Forge-Master</strong> badge next to your address in The Forge. Pure flex. No roadmap, just vibes and tiered utility.
            </p>
          </div>

          <div className="group rounded-xl border border-zinc-700/60 bg-zinc-900/50 p-5 transition-all hover:border-cyan-500/30 hover:scale-[1.01]">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/20 p-2">
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <h2 className="text-base font-bold text-zinc-100">Where to Use $MATE</h2>
            </div>
            <p className="mb-4 text-sm text-zinc-400">
              The <strong className="text-zinc-300">Meme-to-Market Engine</strong> (The Ignition → The Forge → Pump.fun) is where $MATE comes to life: connect wallet, create memes, burn $MATE to launch. Discovery happens in <strong className="text-zinc-300">Hype Hall</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/ignition"
                className="rounded-lg bg-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/30 hover:scale-105"
              >
                Go to The Ignition
              </Link>
              <Link
                href="/forge"
                className="rounded-lg border border-zinc-600 px-3 py-2 text-sm font-medium text-zinc-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
              >
                The Forge
              </Link>
              <Link
                href="/hype-hall"
                className="rounded-lg border border-zinc-600 px-3 py-2 text-sm font-medium text-zinc-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
              >
                Hype Hall
              </Link>
            </div>
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-zinc-500">
          NFA. Token utility may evolve. Check official channels for the latest.
        </p>
        <p className="mt-2 text-center text-[10px] text-zinc-600">
          Get $MATE from DEXs, Mememator rewards, or community distribution. Connect wallet in The Forge to see your balance.
        </p>
      </main>
    </div>
  );
}
