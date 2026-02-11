"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet } from "lucide-react";
import BurnTicker from "@/components/ui/BurnTicker";
import IgnitionHero from "@/components/landing/IgnitionHero";
import RetroCard from "@/components/ui/RetroCard";
import { useMate } from "@/context/MateContext";

export default function IgnitionPage() {
  const router = useRouter();
  const { isConnected, setConnected, setWalletAddress } = useMate();

  const handleConnect = () => {
    setConnected(true);
    setWalletAddress("7xK...3mN");
    router.push("/forge");
  };

  return (
    <div className="min-h-screen bg-void-grid-see-through">
      <BurnTicker />

      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur">
        <div className="container-tight flex h-12 min-h-12 items-center justify-between gap-2">
          <Link
            href="/?hub=1"
            className="flex items-center gap-2 font-pixel text-xs text-zinc-500 hover:text-zinc-300 sm:text-sm"
          >
            <ArrowLeft size={16} />
            Back to homepage
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 font-pixel text-xs sm:text-sm">
            <span className="text-cyan-400">The Ignition</span>
            <Link href="/forge" className="text-zinc-400 hover:text-cyan-400 hover:underline">
              The Forge
            </Link>
            <Link href="/hype-hall" className="text-zinc-400 hover:text-cyan-400 hover:underline">
              Hype Hall
            </Link>
          </div>
        </div>
      </header>

      <main className="container-tight flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-3 px-3 py-6 sm:px-4 sm:py-10">
        <RetroCard className="flex flex-col items-center justify-center p-4 py-6 sm:py-8">
          <h1 className="font-pixel mb-2 text-center text-[14px] text-zinc-100 sm:text-base md:text-lg">
            MEMEMATOR
          </h1>
          <p className="font-pixel mb-6 text-center text-[8px] text-zinc-500 sm:text-[10px]">
            SOLANA MEME-TO-MARKET ENGINE · $MATE
          </p>

          <div className="mb-8 w-full max-w-xl">
            <IgnitionHero />
          </div>

          <p className="mb-6 max-w-md text-center font-pixel text-[10px] text-zinc-400 sm:text-xs">
            The Forge. Create memes. Launch to Pump.fun. Based.
          </p>

        <button
          type="button"
          onClick={isConnected ? () => router.push("/forge") : handleConnect}
          className="min-h-[3rem] flex items-center justify-center gap-2 rounded-lg border-2 border-cyan-400/60 bg-cyan-400/10 px-8 py-4 font-pixel text-xs text-cyan-400 transition hover:bg-cyan-400/20 sm:text-sm"
        >
            <Wallet size={18} />
            {isConnected ? "Enter The Forge" : "Connect Wallet"}
          </button>

          <div className="mt-8 flex gap-6 font-pixel text-[8px] text-zinc-500 sm:text-[10px]">
            <Link href="/forge" className="text-zinc-400 hover:text-cyan-400 hover:underline">
              The Forge
            </Link>
            <Link href="/hype-hall" className="text-zinc-400 hover:text-cyan-400 hover:underline">
              Hype Hall
            </Link>
            <Link href="/?hub=1" className="text-zinc-500 hover:text-cyan-400 hover:underline">
              ← Back to Mememator
            </Link>
          </div>
        </RetroCard>
      </main>
    </div>
  );
}
