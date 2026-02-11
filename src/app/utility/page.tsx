"use client";

import Link from "next/link";

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
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-30 border-b border-[#333] bg-[#050505]/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4">
          <Link
            href="/?hub=1"
            className="text-xs font-medium text-[#888] hover:text-white transition"
          >
            ← Mememator
          </Link>
          <span className="text-xs text-[#888]">Utility</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
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
