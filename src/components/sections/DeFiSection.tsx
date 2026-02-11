"use client";

import { defiTrends } from "@/lib/mockData";

export default function DeFiSection() {
  return (
    <section id="defi" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Solana DeFi (Where Shitcoins Grow Up)
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          The Solana stack. Pump.fun for launch, Jupiter to swap, Raydium when you graduate. No ETH maxi allowed.
        </p>
        <p className="mb-4 text-[10px] text-zinc-600">
          Mememator plugs into Pump.fun—create your meme in The Forge, burn $MATE, launch. One flow.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {defiTrends.map((item) => (
            <div
              key={item.id}
              className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-100">{item.name}</span>
                <span className="rounded-full bg-cyan-500/20 px-1.5 py-0.5 text-[10px] text-cyan-400">
                  {item.category}
                </span>
              </div>
              <p className="mb-1 text-xs text-zinc-500">{item.description}</p>
              {item.oneLiner && (
                <p className="mb-2 text-[10px] italic text-zinc-600">{item.oneLiner}</p>
              )}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-zinc-400">TVL: {item.tvl}</span>
                <span className={item.change24h >= 0 ? "text-green-400" : "text-red-400"}>
                  {item.change24h >= 0 ? "+" : ""}{item.change24h}% 24h
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
