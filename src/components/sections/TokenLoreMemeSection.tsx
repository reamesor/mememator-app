"use client";

import { useState } from "react";
import Link from "next/link";
import { launchThemes } from "@/lib/mockData";
import { useForgeDraft } from "@/context/ForgeDraftContext";

const LORE_TEMPLATES: Record<string, string> = {
  "Animal + Hat": "A [animal] that just needed one thing: a hat. The streets weren't ready. Solana wasn't ready. Now we're all hat-pilled. No roadmap. No utility. Just vibes and a drip that hits different. This is the way.",
  "Political / Chaos": "Election year energy. No team. No promises. Just pure chaos and the kind of narrative that writes itself. CT will fight. Degens will ape. We're not picking sides—we're picking volume. NFA. Obviously.",
  "Based / Sigma": "Sigma energy. No cap. The kind of token that doesn't need to explain itself. If you know, you know. If you don't, you're not ready. Red pill. Based. Touch grass? We're building on Solana.",
  "Accident / Oops": "Dev made a mistake. Or did they? LP burned. Wrong address. 'Accidental' alpha. The community said rugproof. The chart said send. Sometimes the best narrative is no narrative—just oops and moon.",
  "Absurd / Toilet": "The normies left the room. We stayed. Stupid? Maybe. Working? Absolutely. Solana said yes to this. Your parents would not understand. We're not sorry. Ape at your own risk (and nose).",
  "Meta / Inception": "A meme about the very thing we're doing. Pump.fun on pump.fun. Degens degenning. We're so deep in the meta we need a map. No exit. Only send.",
};

const MEME_PROMPTS = [
  "When the chart does the thing and you're still holding",
  "POV: You aped after the KOL said 'this is the one'",
  "Dev: No utility. Community: So based.",
  "Reject VC allocation. Embrace bonding curve.",
  "It's not a rug. It's an 'accidental' burn.",
  "1 SOL to launch. Infinite dreams to lose.",
  "We're not early. We're not late. We're unhinged.",
  "The only roadmap is up. Or down. No one knows.",
];

export default function TokenLoreMemeSection() {
  const { setLoreDraft } = useForgeDraft();
  const [tokenName, setTokenName] = useState("");
  const [themeId, setThemeId] = useState("");
  const [lore, setLore] = useState("");
  const [memeAngle, setMemeAngle] = useState("");
  const [copied, setCopied] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiLoreExamples, setAiLoreExamples] = useState<string[]>([]);
  const [aiMemeExamples, setAiMemeExamples] = useState<string[]>([]);

  const theme = launchThemes.find((t) => t.id === themeId);

  const sendToForge = () => {
    setLoreDraft({
      tokenName: tokenName.trim(),
      lore: lore.trim(),
      memeAngle: memeAngle.trim(),
      themeName: theme?.name,
    });
  };
  const suggestLore = () => {
    if (theme) {
      setLore(LORE_TEMPLATES[theme.name] ?? theme.description);
    }
  };

  const fullBlob = [
    tokenName && `**${tokenName}**`,
    lore && lore.trim(),
    memeAngle && memeAngle.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  const copyForPump = async () => {
    if (!fullBlob) return;
    await navigator.clipboard.writeText(fullBlob);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addMemePrompt = (prompt: string) => {
    setMemeAngle((prev) => (prev ? `${prev}\n${prompt}` : prompt));
  };

  const improveWithAi = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiLoreExamples([]);
    setAiMemeExamples([]);
    try {
      const res = await fetch("/api/improve-lore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenName: tokenName.trim() || undefined,
          themeName: theme?.name,
          lore: lore.trim() || undefined,
          memeAngle: memeAngle.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("AI request failed");
      const data = (await res.json()) as {
        improvedLoreExamples?: string[];
        improvedMemeExamples?: string[];
      };
      setAiLoreExamples(Array.isArray(data.improvedLoreExamples) ? data.improvedLoreExamples : []);
      setAiMemeExamples(Array.isArray(data.improvedMemeExamples) ? data.improvedMemeExamples : []);
    } catch {
      setAiError("Could not get AI suggestions. You can still use the form.");
      setAiLoreExamples([]);
      setAiMemeExamples([]);
    } finally {
      setAiLoading(false);
    }
  };

  const useLoreExample = (example: string) => {
    setLore(example);
    setAiLoreExamples([]);
  };

  const addMemeExample = (example: string) => {
    setMemeAngle((prev) => (prev ? `${prev}\n${example}` : example));
  };

  return (
    <section id="lore" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Token Lore & Meme
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          Create the narrative and meme angle for a token—anything Solana retardness, fun to launch on pump.fun. Name it, write the lore, nail the meme. Copy the block for your pump.fun description or Twitter.
        </p>
        <p className="mb-4 text-[10px] text-zinc-600 sm:text-xs">
          Pick a theme for instant inspiration, use AI to improve your lore, or write from scratch. Then send to The Forge to create the meme and launch.
        </p>

        <div className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-400">Token name / concept</label>
            <input
              type="text"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="e.g. Ser Doge, Oops Coin, Based Frog"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-400">Theme (optional — for inspiration)</label>
            <select
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="">Pick a vibe</option>
              {launchThemes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.oneLiner}
                </option>
              ))}
            </select>
            {theme && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={suggestLore}
                  className="rounded-full bg-cyan-500/20 px-2 py-1 text-[10px] font-medium text-cyan-400 hover:bg-cyan-500/30"
                >
                  Suggest lore from theme
                </button>
                <p className="text-[10px] text-zinc-500">{theme.description}</p>
              </div>
            )}
          </div>

          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <label className="block text-xs font-medium text-zinc-400">Lore (backstory, narrative, why it&apos;s based)</label>
              <button
                type="button"
                onClick={improveWithAi}
                disabled={aiLoading}
                className="rounded-full bg-violet-500/20 px-2 py-1 text-[10px] font-medium text-violet-400 hover:bg-violet-500/30 disabled:opacity-50"
              >
                {aiLoading ? "Generating…" : "Improve with AI"}
              </button>
            </div>
            <textarea
              value={lore}
              onChange={(e) => setLore(e.target.value)}
              placeholder="The story behind the token. Why it exists. Why degens will care. Keep it short and memeable."
              rows={4}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            {aiError && <p className="mt-1 text-[10px] text-amber-400">{aiError}</p>}
            {aiLoreExamples.length > 0 && (
              <div className="mt-2 rounded-lg border border-violet-500/30 bg-violet-950/20 p-2.5">
                <p className="mb-1.5 text-[10px] font-medium text-violet-400">AI suggestions — pick one to use</p>
                <ul className="space-y-1.5">
                  {aiLoreExamples.map((ex, i) => (
                    <li key={i} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-2">
                      <p className="min-w-0 flex-1 whitespace-pre-wrap text-xs text-zinc-300">{ex}</p>
                      <button
                        type="button"
                        onClick={() => useLoreExample(ex)}
                        className="shrink-0 rounded bg-violet-500/30 px-2 py-0.5 text-[10px] font-medium text-violet-300 hover:bg-violet-500/50"
                      >
                        Use this
                      </button>
                    </li>
                  ))}
                </ul>
                {aiMemeExamples.length > 0 && (
                  <>
                    <p className="mt-2 mb-1 text-[10px] font-medium text-violet-400">Meme one-liners</p>
                    <div className="flex flex-wrap gap-1">
                      {aiMemeExamples.map((ex, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => addMemeExample(ex)}
                          className="rounded-full border border-violet-500/40 bg-violet-900/30 px-2 py-0.5 text-[10px] text-violet-200 hover:bg-violet-500/30"
                        >
                          + {ex}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-400">Meme angle (captions, one-liners, how to meme it)</label>
            <textarea
              value={memeAngle}
              onChange={(e) => setMemeAngle(e.target.value)}
              placeholder="Tweet ideas, meme captions, CT one-liners. What makes this shareable?"
              rows={3}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <p className="mt-1 text-[10px] text-zinc-500">Quick add:</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {MEME_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => addMemePrompt(prompt)}
                  className="rounded-full border border-zinc-600 bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-400 hover:border-zinc-500 hover:text-zinc-300"
                >
                  + {prompt.slice(0, 28)}{prompt.length > 28 ? "…" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-950/80 p-3">
            <p className="mb-1.5 text-[10px] font-medium uppercase text-zinc-500">Copy for pump.fun / Twitter</p>
            <pre className="mb-2 max-h-32 overflow-auto whitespace-pre-wrap break-words rounded bg-zinc-900 p-2 text-xs text-zinc-300">
              {fullBlob || "(Fill name, lore, and meme angle above)"}
            </pre>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyForPump}
                disabled={!fullBlob}
                className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-medium text-zinc-950 hover:bg-cyan-400 disabled:opacity-50 disabled:pointer-events-none"
              >
                {copied ? "Copied!" : "Copy block"}
              </button>
              <Link
                href="/forge"
                onClick={sendToForge}
                className="rounded-lg border border-cyan-500/60 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/20"
              >
                Send to Forge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
