"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BurnTicker from "@/components/ui/BurnTicker";
import RetroCard from "@/components/ui/RetroCard";

const MOCK_MEMES = [
  { id: "1", title: "Based Chad", ticker: "CHAD", style: "Retro", chaos: 23 },
  { id: "2", title: "Brainrot Pepe", ticker: "BRAIN", style: "Deep-Fried", chaos: 89 },
  { id: "3", title: "Sigma Doge", ticker: "SIGMA", style: "AI-Synth", chaos: 45 },
  { id: "4", title: "Degen Ape", ticker: "DEGEN", style: "Retro", chaos: 12 },
  { id: "5", title: "Wojak Inu", ticker: "WOJAK", style: "Deep-Fried", chaos: 67 },
  { id: "6", title: "Ser Moon", ticker: "MOON", style: "Retro", chaos: 34 },
];

export default function HypeHallPage() {
  return (
    <div className="min-h-screen bg-void-grid">
      <BurnTicker />

      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur">
        <div className="container-tight flex h-14 items-center justify-between">
          <Link
            href="/?hub=1"
            className="flex items-center gap-2 font-pixel text-[10px] text-zinc-500 hover:text-zinc-300"
          >
            <ArrowLeft size={14} />
            Back to homepage
          </Link>
          <div className="flex items-center gap-3 font-pixel text-[10px]">
            <span className="text-cyan-400">Hype Hall</span>
            <Link href="/ignition" className="text-zinc-400 hover:text-cyan-400 hover:underline">
              The Ignition
            </Link>
            <Link href="/forge" className="text-zinc-400 hover:text-cyan-400 hover:underline">
              The Forge
            </Link>
          </div>
        </div>
      </header>

      <main className="container-tight flex min-h-[calc(100vh-52px-56px)] flex-col gap-4 p-4">
        <RetroCard className="p-4">
          <h2 className="font-pixel text-[10px] text-cyan-400">Hype Hall</h2>
          <p className="mt-1 font-pixel text-[10px] text-zinc-400 sm:text-xs">
            Trending memes from the Forge. Based.
          </p>
        </RetroCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_MEMES.map((m) => (
            <RetroCard key={m.id} className="overflow-hidden p-4">
              <div className="mb-3 flex aspect-video items-center justify-center rounded border border-zinc-800 bg-zinc-900">
                <span className="font-pixel text-[8px] text-zinc-600">{m.ticker}</span>
              </div>
              <h3 className="font-pixel text-[10px] text-cyan-400">{m.title}</h3>
              <p className="mt-1 font-pixel text-[10px] text-zinc-500">
                {m.style} · Chaos {m.chaos}%
              </p>
            </RetroCard>
          ))}
        </div>
      </main>
    </div>
  );
}
