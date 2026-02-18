"use client";

import { useState, useEffect } from "react";
import { hotTopics } from "@/lib/mockData";
import type { HotTopicVibe } from "@/lib/types";
import type { HotTopic } from "@/lib/types";

const vibeLabels: Record<HotTopicVibe, string> = {
  trending: "What's going on",
  funny: "Funny as shit",
  retarded: "Peak retardness",
};

const vibeStyles: Record<HotTopicVibe, string> = {
  trending: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  funny: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  retarded: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export default function HotTopicsSection() {
  const [filter, setFilter] = useState<HotTopicVibe | "all">("all");
  const [liveTopics, setLiveTopics] = useState<HotTopic[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/market-data")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !data.items?.length) return;
        const items = data.items as Array<{ name: string; symbol: string; change24h: number; marketCap: string }>;
        const derived: HotTopic[] = [];
        const topGainer = items.filter((i) => i.change24h > 0).sort((a, b) => b.change24h - a.change24h)[0];
        if (topGainer && topGainer.change24h >= 3) {
          derived.push({
            id: "live-gainer",
            title: `${topGainer.symbol} +${topGainer.change24h.toFixed(1)}% — top memecoin gainer`,
            body: `${topGainer.name} leading memecoin gains today. MCap ${topGainer.marketCap}. Narrative is live.`,
            vibe: "trending",
            oneLiner: "Real-time market. Not dated.",
          });
        }
        const topLoser = items.filter((i) => i.change24h < 0).sort((a, b) => a.change24h - b.change24h)[0];
        if (topLoser && topLoser.change24h <= -5) {
          derived.push({
            id: "live-loser",
            title: `${topLoser.symbol} ${topLoser.change24h.toFixed(1)}% — market correcting`,
            body: `${topLoser.name} down today. Buy the dip or NGMI. Your call.`,
            vibe: "trending",
            oneLiner: "Live data. Make your move.",
          });
        }
        if (derived.length) setLiveTopics(derived);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const allTopics = [...liveTopics, ...hotTopics];
  const filtered =
    filter === "all"
      ? allTopics
      : allTopics.filter((t) => t.vibe === filter);

  return (
    <section id="hot" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Hot Topics — What&apos;s Going On
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          Live market updates + Solana trends. What&apos;s moving, what&apos;s funny, and what&apos;s peak retardness. Always current.
        </p>
        <p className="mb-4 text-[10px] text-zinc-600">
          Spot the narrative, then head to the Meme generator or Lore page to turn it into content. Launch when ready.
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
              filter === "all"
                ? "bg-zinc-600 text-zinc-100"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            All
          </button>
          {(Object.keys(vibeLabels) as HotTopicVibe[]).map((v) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                filter === v ? vibeStyles[v] : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {vibeLabels[v]}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((topic) => (
            <div
              key={topic.id}
              className={`rounded-xl border p-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${
                topic.vibe === "trending"
                  ? "border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-transparent hover:shadow-cyan-500/10"
                  : topic.vibe === "funny"
                    ? "border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent hover:shadow-amber-500/10"
                    : "border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-transparent hover:shadow-purple-500/10"
              }`}
            >
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${vibeStyles[topic.vibe]}`}
                >
                  {vibeLabels[topic.vibe]}
                </span>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-zinc-100">{topic.title}</h3>
              <p className="mb-1 text-xs text-zinc-500">{topic.body}</p>
              {topic.oneLiner && (
                <p className="text-[10px] italic text-zinc-500">
                  — {topic.oneLiner}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
