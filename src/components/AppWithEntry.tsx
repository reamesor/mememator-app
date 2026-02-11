"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import LandingView from "./landing/LandingView";

const HUB_URL = "/?hub=1";

const HUB_LINKS = [
  { href: "/hot", label: "Hot", summary: "What’s trending on Solana right now.", color: "orange" },
  { href: "/pump", label: "Pump", summary: "Launch your token on Pump.fun.", color: "green" },
  { href: "/shitcoins", label: "Shitcoins", summary: "Hot memecoins, mcap & volume.", color: "purple" },
  { href: "/lore", label: "Lore", summary: "Token narrative & meme angle for pump.fun.", color: "amber" },
  { href: "/meme", label: "Meme", summary: "Create meme images with KOLs & templates.", color: "cyan" },
  { href: "/utility", label: "Utility", summary: "$MATE manifesto & utility grid.", color: "rose" },
  { href: "/mate", label: "$MATE", summary: "Token utility, burn, unlock & launchpad.", color: "sky" },
] as const;

const colorClasses: Record<string, string> = {
  orange: "border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20",
  green: "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20",
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20",
  sky: "border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20",
};

function PurposeBlock() {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`mt-8 w-full rounded-xl border text-left transition-all duration-300 ${
        hover
          ? "border-cyan-400/40 bg-cyan-500/5 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
          : "border-zinc-700/80 bg-zinc-900/40 hover:border-cyan-400/25"
      } px-4 py-3 sm:px-5 sm:py-4`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-cyan-400/80">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500 sm:text-xs">
            Why Mememator?
          </p>
          <p className="mt-1.5 text-sm leading-snug text-zinc-300 sm:text-base">
            Stop burning out on lore—just bank on the launch. We turn{" "}
            <span className={hover ? "text-amber-400/90" : "text-zinc-400"}>terminal brainrot</span>
            {" "}into a professional forge where{" "}
            <span className="font-semibold text-cyan-400">chaos meets capital.</span>
          </p>
          {hover && (
            <p className="mt-2 text-[10px] text-zinc-500 sm:text-xs">
              Lore → Meme → Forge → Pump. We got you.
            </p>
          )}
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
    <div className="app-entry min-h-screen min-w-0 bg-zinc-950">
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto window-scroll">
        <main className="flex min-h-full min-w-0 flex-col">
          <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur px-2 py-2 sm:px-4 sm:py-2.5">
            <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-2">
              <button
                type="button"
                onClick={goToLanding}
                className="shrink-0 rounded px-1.5 py-1 text-[10px] font-medium text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition sm:px-2 sm:text-xs"
                title="Back to globe"
              >
                ← Globe
              </button>
              <div className="flex flex-wrap justify-center gap-1.5 min-w-0">
                <Link href="/hot" className="rounded-full bg-orange-500/20 px-2 py-1 text-[10px] font-semibold text-orange-400 hover:bg-orange-500/30 sm:px-3 sm:py-1.5 sm:text-xs">
                  Hot
                </Link>
                <Link href="/pump" className="rounded-full bg-green-500/20 px-2 py-1 text-[10px] font-semibold text-green-400 hover:bg-green-500/30 sm:px-3 sm:py-1.5 sm:text-xs">
                  Pump
                </Link>
                <Link href="/shitcoins" className="rounded-full bg-purple-500/20 px-2 py-1 text-[10px] font-semibold text-purple-400 hover:bg-purple-500/30 sm:px-3 sm:py-1.5 sm:text-xs">
                  Shitcoins
                </Link>
                <Link href="/lore" className="rounded-full bg-amber-500/20 px-2 py-1 text-[10px] font-semibold text-amber-400 hover:bg-amber-500/30 sm:px-3 sm:py-1.5 sm:text-xs">
                  Lore
                </Link>
                <Link href="/meme" className="rounded-full bg-cyan-500/20 px-2 py-1 text-[10px] font-semibold text-cyan-400 hover:bg-cyan-500/30 sm:px-3 sm:py-1.5 sm:text-xs">
                  Meme
                </Link>
                <Link href="/utility" className="rounded-full bg-rose-500/20 px-2 py-1 text-[10px] font-semibold text-rose-400 hover:bg-rose-500/30 sm:px-3 sm:py-1.5 sm:text-xs" title="Manifesto & utility grid">
                  Utility
                </Link>
                <Link href="/mate" className="rounded-full bg-sky-500/20 px-2 py-1 text-[10px] font-semibold text-sky-400 hover:bg-sky-500/30 sm:px-3 sm:py-1.5 sm:text-xs" title="About $MATE & Launchpad">
                  $MATE
                </Link>
              </div>
            </div>
          </header>

          <div className="min-h-0 flex-1">
          {/* Hero — bold statement (DGB-inspired) */}
          <div className="relative border-b border-zinc-800/60 bg-gradient-to-b from-zinc-900/50 to-transparent">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 md:py-20">
              <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.35em] text-cyan-400/90 sm:text-xs">
                Unapologetically degen
              </p>
              <h1 className="text-center text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                Deploy the narrative.
                <br />
                <span className="text-cyan-400">Ignite the chart.</span>
              </h1>
              <p className="mt-4 text-center text-xs text-zinc-500 sm:text-sm">
                Trends · Create · Launch. Pick a section below or use the menu above.
              </p>

              {/* Interactive purpose — brainrot / glitching / need profits / launch → Mememator saves the day */}
              <PurposeBlock />
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
            <div className="grid gap-4 sm:grid-cols-2">
              {HUB_LINKS.map(({ href, label, summary, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center justify-between gap-4 rounded-xl border p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg sm:p-5 ${colorClasses[color]}`}
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

          <footer className="mt-auto border-t border-zinc-800/80 px-4 py-6 sm:py-8">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 sm:text-xs">
              Mememator $MATE — Solana meme-to-market. NFA.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
