"use client";

import { pumpFunFacts } from "@/lib/mockData";

const PUMP_FUN_URL = "https://pump.fun";

export default function PumpSection() {
  return (
    <section id="pump" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Pump.fun — Launch Your Shitcoin
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          The holy land of Solana meme retardness. No pitch deck. No VC. Just you, 1 SOL, and a dream (or a meme).
        </p>

        <div className="mb-6 rounded-lg border-2 border-green-500/40 bg-green-500/5 p-4 glow-green">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="mb-0.5 text-sm font-bold text-zinc-100">
                Ready to become a (alleged) dev?
              </h3>
              <p className="text-xs text-zinc-500">
                Create a token in seconds. Bonding curve. Fair launch. No excuses.
              </p>
            </div>
            <a
              href={PUMP_FUN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-500 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-green-400"
            >
              Launch on Pump.fun →
            </a>
          </div>
        </div>

        <div className="mb-3 text-xs font-medium text-zinc-400">
          How it works (the short version)
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pumpFunFacts.map((fact) => (
<div
            key={fact.id}
            className={`rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${
              fact.funny
                ? "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent hover:shadow-amber-500/10"
                : "border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent hover:shadow-emerald-500/5"
            }`}
          >
              {fact.funny && (
                <span className="mb-1 inline-block text-[10px] font-medium text-amber-400">
                  🤡 Peak retardness
                </span>
              )}
              <h4 className="mb-1 text-xs font-semibold text-zinc-100">{fact.title}</h4>
              <p className="text-xs text-zinc-500">{fact.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h4 className="mb-2 text-xs font-semibold text-zinc-300">Pro tips from degens</h4>
          <ul className="space-y-1.5 text-[10px] text-zinc-500 sm:text-xs">
            <li>• Use Mememator&apos;s Forge to create the meme first—then launch with one click.</li>
            <li>• Write lore before you launch. Copy from our Lore page. Narrative = volume.</li>
            <li>• Burn $MATE at launch to feature in Hype Hall and get more eyes.</li>
            <li>• 1 SOL to launch. Set aside a bit more for initial buys if you want to seed liquidity.</li>
          </ul>
        </div>
        <p className="mt-4 text-center text-xs text-zinc-600">
          Not financial advice. We&apos;re just here for the memes and the bonding curves.
        </p>
      </div>
    </section>
  );
}
