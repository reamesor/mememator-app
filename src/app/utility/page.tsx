"use client";

import Link from "next/link";
import { Zap, Rocket, Radio, Flame, Sparkles } from "lucide-react";

const MANIFESTO_LINES = [
  "See Solana",
  "trends.",
  "Create",
  "memes.",
  "Launch",
  "tokens.",
];

const UTILITY_CARDS = [
  {
    title: "Premium Forge",
    body: "Hold $MATE to unlock high-fidelity AI models and deep-fried filters.",
    details: ["50K+ $MATE: AI-Synth & Deep-Fried meme styles", "100K+ $MATE: Forge-Master badge on your wallet", "Retro style: free for everyone"],
    icon: Sparkles,
    gradient: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/40",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/20",
  },
  {
    title: "Pump.fun Fast-Track",
    body: "Direct API injection. Verified Creator badge & reduced fees.",
    details: ["Launch tokens faster via Mememator → Pump.fun pipeline", "Badge shows you're a verified Mememator creator", "Lower fees when burning $MATE at launch"],
    icon: Rocket,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/40",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
  },
  {
    title: "The Signal",
    body: "Burn $MATE to feature your token in the Hype Hall feed.",
    details: ["Hype Hall = discovery feed for Mememator launches", "Burn $MATE to boost your token to the top", "More eyes, more volume, more chaos"],
    icon: Radio,
    gradient: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/40",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/20",
  },
  {
    title: "Deflationary",
    body: "Automatic burn on every launch and premium unlock.",
    details: ["Every Forge launch burns a fixed amount of $MATE", "Every premium style unlock burns $MATE", "Supply goes down. Vibes go up. NFA."],
    icon: Flame,
    gradient: "from-rose-500/20 to-rose-600/5",
    border: "border-rose-500/40",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/20",
  },
];

export default function UtilityPage() {
  return (
    <div className="min-h-screen bg-zinc-950/90">
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/97 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,149,0,0.06)]">
        <div className="container-tight flex items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link
            href="/?hub=1"
            className="group min-h-[2.75rem] flex items-center gap-2.5 rounded-lg border border-zinc-700/60 bg-zinc-900/60 px-3 py-2 text-sm font-medium text-zinc-400 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400"
          >
            <img src="/capybara-faces/capybara-1.png" alt="" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain" />
            ← Mememator
          </Link>
          <span className="rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-amber-600/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
            Utility
          </span>
        </div>
      </header>

      <main className="container-tight px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero */}
        <section className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
            <Zap className="h-3.5 w-3.5" />
            Meme-to-market engine
          </div>
          <h1 className="mb-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {MANIFESTO_LINES.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p className="mx-auto max-w-lg text-center text-sm leading-relaxed text-zinc-400 sm:text-base">
            Oversee what&apos;s hot on Solana from Twitter and chain data. Make content that hits. Launch meme tokens and chase the bag.{" "}
            <span className="font-semibold text-amber-400/90">Pure retardation, full send.</span>
          </p>
        </section>

        {/* Utility Grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {UTILITY_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`group rounded-xl border bg-gradient-to-br p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/5 ${card.gradient} ${card.border}`}
              >
                <div className={`mb-3 inline-flex rounded-lg ${card.iconBg} p-2.5`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <h2 className="mb-2 text-base font-bold tracking-tight text-white sm:text-lg">
                  {card.title}
                </h2>
                <p className="mb-3 text-sm leading-relaxed text-zinc-400">
                  {card.body}
                </p>
                {card.details && (
                  <ul className="space-y-1 text-xs text-zinc-500">
                    {card.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400/60">•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>

        <section className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">How $MATE fits in</h3>
          <p className="text-xs leading-relaxed text-zinc-500">
            $MATE is Mememator&apos;s utility token on Solana. You earn it by using the platform and contributing to the ecosystem.
            Hold to unlock premium meme styles, burn to launch tokens or feature in Hype Hall. No roadmap. No promises. Just utility and vibes.
          </p>
          <p className="mt-3 text-center text-xs text-zinc-500">
            Hold $MATE. Burn to launch. Flex status. <Link href="/mate" className="text-cyan-400 hover:underline">Learn more →</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
