"use client";

import { useState } from "react";
import { launchThemes } from "@/lib/mockData";
import { Copy, Sparkles } from "lucide-react";

const TWEET_TEMPLATES = [
  {
    label: "Launch announcement",
    text: "$NAME is LIVE on pump.fun.\n\nNo VC. No team tokens. Just the curve and the chaos.\n\nNFA.",
  },
  {
    label: "Hype",
    text: "We're not early. We're not late. We're sending $NAME.\n\nLFG 🔥",
  },
  {
    label: "Chart joke",
    text: "POV: You aped into $NAME at 3am and the chart is doing the thing\n\nSer. This is fine. NFA.",
  },
  {
    label: "Thread opener",
    text: "Thread 🧵\n\n1/ No pitch deck\n2/ No roadmap\n3/ Just vibes\n4/ Solana said yes\n5/ We're not sorry.",
  },
  {
    label: "Community",
    text: "Reject utility. Embrace $NAME.\n\nDiamond hands only. NFA.",
  },
];

export default function TweetContentSection() {
  const [tokenName, setTokenName] = useState("");
  const [themeId, setThemeId] = useState("");
  const [lore, setLore] = useState("");
  const [generatedTweets, setGeneratedTweets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const theme = launchThemes.find((t) => t.id === themeId);

  const generateTweets = async () => {
    setLoading(true);
    setError(null);
    setGeneratedTweets([]);
    try {
      const res = await fetch("/api/generate-tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenName: tokenName.trim() || undefined,
          themeName: theme?.name,
          lore: lore.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = (await res.json()) as { tweets?: string[] };
      setGeneratedTweets(Array.isArray(data.tweets) ? data.tweets : []);
    } catch {
      setError("Could not generate tweets. Try the templates below.");
      setGeneratedTweets([]);
    } finally {
      setLoading(false);
    }
  };

  const copyTweet = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const useTemplate = (text: string) => {
    const withToken = tokenName ? text.replace(/\$NAME/g, tokenName) : text.replace(/\$NAME/g, "this token");
    setGeneratedTweets((prev) => [...prev, withToken]);
  };

  return (
    <section className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-4xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Tweet content for token launches
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          Create tweets in advance so your token launch runs smoothly. Mememator drafts launch announcements,
          hype, and community posts—ready to copy and schedule.
        </p>

        <div className="space-y-6">
          {/* Inputs */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Token name
                </label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="e.g. CapyCoin"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Theme
                </label>
                <select
                  value={themeId}
                  onChange={(e) => setThemeId(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200"
                >
                  <option value="">Any</option>
                  {launchThemes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                Lore / context (optional)
              </label>
              <textarea
                value={lore}
                onChange={(e) => setLore(e.target.value)}
                placeholder="Paste your token lore or any context to make tweets fit better."
                rows={3}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
              />
            </div>
            <button
              type="button"
              onClick={generateTweets}
              disabled={loading}
              className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-lg transition hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              {loading ? "Generating…" : "Generate tweets"}
            </button>
          </div>

          {error && (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
              {error}
            </p>
          )}

          {/* Generated tweets */}
          {generatedTweets.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-zinc-200">Generated tweets</h3>
              <div className="space-y-3">
                {generatedTweets.map((tweet, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                  >
                    <p className="whitespace-pre-wrap text-sm text-zinc-300">{tweet}</p>
                    <button
                      type="button"
                      onClick={() => copyTweet(tweet, i)}
                      className="flex w-fit items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copiedIdx === i ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick templates */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-200">Quick templates</h3>
            <p className="mb-3 text-xs text-zinc-500">
              Use <code className="rounded bg-zinc-800 px-1">$NAME</code> to insert your token name.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {TWEET_TEMPLATES.map((t) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => useTemplate(t.text)}
                  className="rounded-lg border border-zinc-700 bg-zinc-800/80 p-3 text-left text-xs text-zinc-400 transition hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-zinc-300"
                >
                  <span className="font-medium text-cyan-400/90">{t.label}</span>
                  <p className="mt-1 line-clamp-2">{t.text.split("\n")[0]}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
