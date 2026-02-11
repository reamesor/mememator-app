"use client";

import { launchThemes } from "@/lib/mockData";

const sentimentColors: Record<string, string> = {
  bullish: "bg-green-500/20 text-green-400",
  neutral: "bg-zinc-500/20 text-zinc-400",
  niche: "bg-purple-500/20 text-purple-400",
  unhinged: "bg-amber-500/20 text-amber-400",
};

export default function ThemesSection() {
  return (
    <section id="themes" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Degen Launch Themes (Peak Retardness)
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          Pick a narrative for your pump.fun launch. Controversial, absurd, or just a hat on a dog—Solana has room for it all.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {launchThemes.map((theme) => (
            <div
              key={theme.id}
              className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-100">{theme.name}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${sentimentColors[theme.sentiment]}`}>
                  {theme.sentiment}
                </span>
              </div>
              <p className="mb-1 text-xs text-zinc-500">{theme.description}</p>
              {theme.oneLiner && (
                <p className="mb-2 text-[10px] italic text-amber-400/90">{theme.oneLiner}</p>
              )}
              <div className="mb-2 flex flex-wrap gap-1">
                {theme.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-zinc-600">
                Examples: {theme.examples.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
