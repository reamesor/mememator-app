"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import LandingView from "./landing/LandingView";
import SpaceCapybaraHero from "./home/SpaceCapybaraHero";
import LoreSection from "./home/LoreSection";
import CommanderMateMemeGenerator from "./home/CommanderMateMemeGenerator";

const HUB_URL = "/?hub=1";

const HUB_LINKS = [
  { href: "/hot", label: "Hot", summary: "Trends, hot topics & shitcoins on Solana.", color: "orange" },
  { href: "/pump", label: "Pump", summary: "Launch your token on Pump.fun.", color: "green" },
  { href: "/lore", label: "Lore", summary: "Token narrative & meme angle for pump.fun.", color: "amber" },
  { href: "/meme", label: "Meme", summary: "Create meme images with KOLs & templates.", color: "cyan" },
  { href: "/utility", label: "Utility", summary: "$MATE manifesto & utility grid.", color: "rose" },
  { href: "/mate", label: "$MATE", summary: "Token utility, burn, unlock & launchpad.", color: "sky" },
] as const;

const colorClasses: Record<string, string> = {
  orange: "border-orange-500/30 bg-gradient-to-br from-orange-500/15 to-orange-600/5 text-orange-400 hover:border-orange-400/50 hover:from-orange-500/25 hover:shadow-lg hover:shadow-orange-500/10",
  green: "border-green-500/30 bg-gradient-to-br from-green-500/15 to-green-600/5 text-green-400 hover:border-green-400/50 hover:from-green-500/25 hover:shadow-lg hover:shadow-green-500/10",
  purple: "border-purple-500/30 bg-gradient-to-br from-purple-500/15 to-purple-600/5 text-purple-400 hover:border-purple-400/50 hover:from-purple-500/25 hover:shadow-lg hover:shadow-purple-500/10",
  amber: "border-amber-500/30 bg-gradient-to-br from-amber-500/15 to-amber-600/5 text-amber-400 hover:border-amber-400/50 hover:from-amber-500/25 hover:shadow-lg hover:shadow-amber-500/10",
  cyan: "border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 text-cyan-400 hover:border-cyan-400/50 hover:from-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/10",
  rose: "border-rose-500/30 bg-gradient-to-br from-rose-500/15 to-rose-600/5 text-rose-400 hover:border-rose-400/50 hover:from-rose-500/25 hover:shadow-lg hover:shadow-rose-500/10",
  sky: "border-sky-500/30 bg-gradient-to-br from-sky-500/15 to-sky-600/5 text-sky-400 hover:border-sky-400/50 hover:from-sky-500/25 hover:shadow-lg hover:shadow-sky-500/10",
};

function PurposeBlock() {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`mt-5 w-full rounded-xl border text-left transition-all duration-300 ${
        hover
          ? "border-cyan-400/40 bg-cyan-500/5 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
          : "border-zinc-700/80 bg-zinc-900/40 hover:border-cyan-400/25"
      } px-3 py-2.5 sm:px-4 sm:py-3`}
    >
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0 text-cyan-400/80">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 sm:text-xs">
            Why Mememator?
          </p>
          <p className="mt-1 text-sm leading-snug text-zinc-300 sm:text-base">
            Stop burning out on lore—just bank on the launch. We turn{" "}
            <span className={hover ? "text-amber-400/90" : "text-zinc-400"}>terminal brainrot</span>
            {" "}into a professional forge where{" "}
            <span className="font-semibold text-cyan-400">chaos meets capital.</span>
          </p>
          <p className="mt-1.5 text-[10px] text-zinc-500 sm:text-xs">
            <span className="text-cyan-400/80">Lore</span> → <span className="text-cyan-400/80">Meme</span> → <span className="text-cyan-400/80">Forge</span> → <span className="text-cyan-400/80">Pump</span>. Hot topics, KOL memes, token lore, capybara faces, one-click launch. We got you.
          </p>
        </div>
      </div>
    </button>
  );
}

export default function AppWithEntry() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [stage, setStage] = useState<"landing" | "app">(() =>
    searchParams.get("hub") === "1" ? "app" : "landing"
  );

  const goToHub = () => {
    setStage("app");
    router.replace(HUB_URL);
  };

  const goToLanding = () => {
    setStage("landing");
    router.replace("/");
  };

  if (stage === "landing") {
    return <LandingView onEnter={goToHub} />;
  }

  return (
    <div className="app-entry min-h-screen min-w-0 bg-zinc-950/88">
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto window-scroll">
        <main className="flex min-h-full min-w-0 flex-col">
          <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur px-3 py-3 sm:py-3.5">
            <div className="container-tight flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-h-11 items-center justify-between gap-2 sm:shrink-0">
                <button
                  type="button"
                  onClick={goToLanding}
                  className="min-h-[2.75rem] min-w-[2.75rem] shrink-0 flex items-center gap-2 rounded px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition sm:text-sm"
                  title="Back to globe"
                >
                  <img src="/capybara-faces/capybara-1.png" alt="" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 object-contain" />
                  ← Globe
                </button>
              </div>
              <nav className="flex flex-wrap items-center justify-center gap-2 min-w-0">
                <Link href="/hot" className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center rounded-full bg-orange-500/20 px-3.5 py-2 text-xs font-semibold text-orange-400 hover:bg-orange-500/30 sm:text-sm">
                  Hot
                </Link>
                <Link href="/pump" className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center rounded-full bg-green-500/20 px-3.5 py-2 text-xs font-semibold text-green-400 hover:bg-green-500/30 sm:text-sm">
                  Pump
                </Link>
                <Link href="/lore" className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center rounded-full bg-amber-500/20 px-3.5 py-2 text-xs font-semibold text-amber-400 hover:bg-amber-500/30 sm:text-sm">
                  Lore
                </Link>
                <Link href="/meme" className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center rounded-full bg-cyan-500/20 px-3.5 py-2 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/30 sm:text-sm">
                  Meme
                </Link>
                <Link href="/utility" className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center rounded-full bg-rose-500/20 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/30 sm:text-sm" title="Manifesto & utility grid">
                  Utility
                </Link>
                <Link href="/mate" className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center rounded-full bg-sky-500/20 px-3.5 py-2 text-xs font-semibold text-sky-400 hover:bg-sky-500/30 sm:text-sm" title="About $MATE & Launchpad">
                  $MATE
                </Link>
              </nav>
            </div>
          </header>

          <div className="min-h-0 flex-1">
          {/* Pure Linings: Commander MATE hero — homepage only */}
          <SpaceCapybaraHero />

          {/* Why Mememator card — above legend */}
          <div className="border-b border-zinc-800/60 bg-zinc-950/60">
            <div className="container-tight px-4 py-8 sm:px-6 sm:py-10">
              <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-700/60 bg-zinc-900/50 p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <h2 className="font-semibold uppercase tracking-wider text-zinc-200 sm:text-lg">
                    Why Mememator?
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  Stop burning out on lore—just bank on the launch. We turn terminal brainrot into a professional forge
                  where <span className="font-semibold text-cyan-400">chaos meets capital.</span>
                </p>
                <p className="mt-3 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                  <span className="text-cyan-400">Lore</span> → <span className="text-cyan-400">Meme</span> → <span className="text-cyan-400">Forge</span> → <span className="text-cyan-400">Pump</span>.
                  Hot topics, KOL memes, token lore, capybara faces, one-click launch. We got you.
                </p>
              </div>
            </div>
          </div>

          {/* Lore: The Legend of Commander MATE — homepage only */}
          <LoreSection />

          {/* What is Commander MATE feeling and thinking? — meme generator */}
          <CommanderMateMemeGenerator />

          {/* Purpose block + tagline */}
          <div className="container-tight px-4 pt-6 pb-4 sm:px-6">
            <p className="text-center text-xs text-zinc-500 sm:text-sm">
              Trends · Create · Launch. Pick a section below or use the menu above.
            </p>
            <PurposeBlock />
          </div>

          <div className="container-tight px-4 py-8 sm:px-6 sm:py-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {HUB_LINKS.map(({ href, label, summary, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`group flex min-h-[3.5rem] items-center justify-between gap-3 rounded-xl border p-4 transition-all duration-200 active:scale-[0.99] hover:scale-[1.02] hover:shadow-xl sm:min-h-0 sm:p-5 ${colorClasses[color]}`}
                >
                  <div className="min-w-0">
                    <span className="block text-sm font-semibold tracking-tight sm:text-base">{label}</span>
                    <span className="mt-1 block text-[10px] leading-snug opacity-90 sm:text-xs">{summary}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
          </div>

          <footer className="mt-auto border-t border-zinc-800/80 px-4 py-5 sm:py-8">
            <p className="flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 sm:text-xs">
              <img src="/capybara-faces/capybara-1.png" alt="" className="w-4 h-4 shrink-0 object-contain" />
              Mememator $MATE — Solana meme-to-market. NFA.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
