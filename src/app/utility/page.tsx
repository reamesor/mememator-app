"use client";

import Link from "next/link";
import CapybaraHead from "@/components/ui/CapybaraHead";

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
  },
  {
    title: "Pump.fun Fast-Track",
    body: "Direct API injection. Verified Creator badge & reduced fees.",
  },
  {
    title: "The Signal",
    body: "Burn $MATE to feature your token in the Hype Hall feed.",
  },
  {
    title: "Deflationary",
    body: "Automatic burn on every launch and premium unlock.",
  },
];

export default function UtilityPage() {
  return (
    <div className="min-h-screen bg-[#050505]/88 text-white">
      <header className="sticky top-0 z-30 border-b border-[#333] bg-[#050505]/95 backdrop-blur">
        <div className="container-tight flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/?hub=1"
            className="min-h-[2.75rem] flex items-center gap-2 text-sm font-medium text-[#888] hover:text-white transition"
          >
            <CapybaraHead className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            ← Mememator
          </Link>
          <span className="text-sm text-[#888]">Utility</span>
        </div>
      </header>

      <main className="container-tight px-4 py-8 sm:px-6 sm:py-12">
        {/* Section 1: The Manifesto */}
        <section className="mb-12 text-center">
          <h1
            className="utility-headline mb-5 text-[0.95rem] font-semibold leading-snug tracking-wide text-white sm:text-[1.05rem]"
          >
            {MANIFESTO_LINES.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p
            className="mx-auto max-w-xl text-center text-[0.8rem] leading-relaxed text-[#888888] sm:text-[0.875rem]"
          >
            Oversee what&apos;s hot on Solana from Twitter and chain data. Make content that hits. Launch meme tokens and chase the bag. Pure retardation, full send.
          </p>
        </section>

        {/* Section 2: The Utility Grid */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {UTILITY_CARDS.map((card) => (
            <div
              key={card.title}
              className="group border border-[#333] bg-transparent p-4 transition-colors hover:border-white"
            >
              <h2
                className="mb-1.5 text-[0.8rem] font-semibold tracking-wide text-white sm:text-[0.875rem]"
              >
                {card.title}
              </h2>
              <p
                className="text-[0.75rem] leading-relaxed text-[#888888] sm:text-[0.8125rem]"
              >
                {card.body}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
