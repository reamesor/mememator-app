"use client";

import { memecoinTrends, DATA_UPDATED_LABEL } from "@/lib/mockData";

export default function MemecoinSection() {
  return (
    <section id="shitcoins" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
            Solana Shitcoins (The Only Coins That Matter)
          </h2>
          <span className="text-[10px] text-zinc-500">{DATA_UPDATED_LABEL}</span>
        </div>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          Hot memecoins on SOL. Price, market cap & 24h volume. Spot the narrative before the next anon does. You&apos;re not early. You&apos;re late. Cope.
        </p>
        <p className="mb-4 text-[10px] text-zinc-600">
          Use the themes (hat, sigma, accident, etc.) for your own launch. Check Lore for narrative templates.
        </p>
        <div className="overflow-x-auto">
          <div className="grid min-w-[520px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {memecoinTrends.map((item) => (
              <div
                key={item.id}
                className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-100">{item.name}</span>
                  <span className="rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-400">
                    {item.symbol}
                  </span>
                </div>
                <p className="mb-1 text-xs text-zinc-500">Theme: {item.theme}</p>
                {item.oneLiner && (
                  <p className="mb-2 text-[10px] italic text-amber-400/90">{item.oneLiner}</p>
                )}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-zinc-400">{item.price}</span>
                  <span className="text-zinc-400">MCap: {item.marketCap}</span>
                  <span className={item.change24h >= 0 ? "text-green-400" : "text-red-400"}>
                    {item.change24h >= 0 ? "+" : ""}{item.change24h}% 24h
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-zinc-600">Vol 24h: {item.volume24h}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
