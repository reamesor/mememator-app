"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Sparkles, X } from "lucide-react";
import BurnTicker from "@/components/ui/BurnTicker";
import ChaosSlider from "@/components/ui/ChaosSlider";
import RetroCard from "@/components/ui/RetroCard";
import PumpLaunchModal from "@/components/ui/PumpLaunchModal";
import { useMate } from "@/context/MateContext";
import { useForgeDraft } from "@/context/ForgeDraftContext";
import { FORGE_STYLES, type ForgeStyleId } from "@/lib/forgeStyles";

export default function ForgePage() {
  const {
    balance,
    walletAddress,
    isForgeMaster,
    canUseHighResOrDeepFried,
    setWalletAddress,
    setConnected,
  } = useMate();
  const { loreDraft, memeDraft, clearLoreDraft, clearMemeDraft } = useForgeDraft();
  const [style, setStyle] = useState<ForgeStyleId>("legacy");
  const [chaos, setChaos] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [launchModalOpen, setLaunchModalOpen] = useState(false);
  const [droppedImage, setDroppedImage] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setDroppedImage(url);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => e.preventDefault(), []);

  const handleLaunchClick = () => setLaunchModalOpen(true);

  const selectedStyleDef = FORGE_STYLES.find((s) => s.id === style);
  const vibeLabel = selectedStyleDef?.vibeLabel ?? "—";

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
          <div className="flex items-center gap-3">
            <span className="font-pixel text-[10px] text-cyan-400">$MATE: {balance.toLocaleString()}</span>
            {walletAddress && (
              <span className="flex items-center gap-1.5 font-pixel text-[10px] text-zinc-400">
                {walletAddress}
                {isForgeMaster && (
                  <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 font-pixel text-[8px] text-cyan-400">
                    Forge-Master
                  </span>
                )}
              </span>
            )}
            <button
              type="button"
              onClick={() => (setWalletAddress(null), setConnected(false))}
              className="rounded border border-zinc-600 px-2 py-1 font-pixel text-[10px] text-zinc-400 hover:border-zinc-500 hover:text-zinc-300"
            >
              Disconnect
            </button>
          </div>
        </div>
      </header>

      <main className="container-tight flex min-h-[calc(100vh-52px-56px)] flex-col gap-4 p-4 lg:flex-row lg:gap-6">
        {/* Left: Toolkit */}
        <aside className="w-full shrink-0 space-y-4 lg:w-64">
          {(loreDraft || memeDraft) && (
            <RetroCard className="space-y-3">
              <h2 className="font-pixel text-[10px] text-cyan-400">Options from Lore & Meme</h2>
              {loreDraft && (
                <div className="rounded border border-zinc-700/80 bg-zinc-900/50 p-2.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-pixel text-[10px] text-cyan-400/90">From Lore</span>
                    <button
                      type="button"
                      onClick={clearLoreDraft}
                      className="rounded p-0.5 text-zinc-500 hover:text-zinc-300"
                      aria-label="Clear lore"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  {loreDraft.tokenName && (
                    <p className="font-pixel text-[10px] text-zinc-300">{loreDraft.tokenName}</p>
                  )}
                  {loreDraft.lore && (
                    <p className="mt-1 line-clamp-2 font-pixel text-[8px] text-zinc-500">
                      {loreDraft.lore}
                    </p>
                  )}
                  {loreDraft.memeAngle && (
                    <p className="mt-0.5 line-clamp-1 font-pixel text-[8px] text-zinc-600">
                      {loreDraft.memeAngle}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (loreDraft.tokenName) setTokenName(loreDraft.tokenName);
                      }}
                      className="rounded border border-cyan-400/40 px-2 py-1 font-pixel text-[8px] text-cyan-400 hover:bg-cyan-400/10"
                    >
                      Use as Token Name
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const parts = [loreDraft.lore, loreDraft.memeAngle].filter(Boolean);
                        if (parts.length) setDescription(parts.join("\n\n"));
                      }}
                      className="rounded border border-cyan-400/40 px-2 py-1 font-pixel text-[8px] text-cyan-400 hover:bg-cyan-400/10"
                    >
                      Use as Description
                    </button>
                  </div>
                </div>
              )}
              {memeDraft && (
                <div className="rounded border border-zinc-700/80 bg-zinc-900/50 p-2.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-pixel text-[10px] text-cyan-400/90">From Meme</span>
                    <button
                      type="button"
                      onClick={clearMemeDraft}
                      className="rounded p-0.5 text-zinc-500 hover:text-zinc-300"
                      aria-label="Clear meme"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <img
                    src={memeDraft.imageDataUrl}
                    alt="Meme from generator"
                    className="mb-2 max-h-20 w-full rounded border border-zinc-700 object-contain"
                  />
                  {memeDraft.caption && (
                    <p className="line-clamp-2 font-pixel text-[8px] text-zinc-500">
                      {memeDraft.caption}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setDroppedImage(memeDraft.imageDataUrl)}
                    className="mt-2 w-full rounded border border-cyan-400/40 py-1.5 font-pixel text-[8px] text-cyan-400 hover:bg-cyan-400/10"
                  >
                    Use as image
                  </button>
                </div>
              )}
            </RetroCard>
          )}
          <RetroCard className="space-y-4">
            <h2 className="font-pixel text-[10px] text-cyan-400">Style</h2>
            <div className="flex flex-wrap gap-2">
              {FORGE_STYLES.map((s) => {
                const locked = s.lockedByTier && !canUseHighResOrDeepFried;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => !locked && setStyle(s.id)}
                    disabled={locked}
                    className={`relative rounded border px-3 py-2 font-pixel text-[8px] transition sm:text-[10px] ${
                      locked
                        ? "cursor-not-allowed border-zinc-700 text-zinc-600"
                        : style === s.id
                          ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-400"
                          : "border-zinc-600 text-zinc-400 hover:border-cyan-400/40"
                    }`}
                  >
                    {s.label}
                    {locked && (
                      <span className="absolute -right-1 -top-1 rounded bg-amber-500/20 p-0.5">
                        <Lock size={10} className="text-amber-400" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedStyleDef && (
              <div className="rounded border border-zinc-700/80 bg-zinc-900/50 px-2.5 py-2 font-pixel text-[8px] text-zinc-400 sm:text-[10px]">
                <p className="text-cyan-400/90">{selectedStyleDef.visualKey}</p>
                <p className="mt-0.5 text-zinc-500">{selectedStyleDef.difficulty}</p>
                <p className="mt-1.5 border-t border-zinc-700/80 pt-1.5 text-cyan-400">
                  Vibe: {vibeLabel}
                </p>
              </div>
            )}
            {!canUseHighResOrDeepFried && (
              <p className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-1.5 font-pixel text-[10px] text-amber-400">
                Stake 50k+ $MATE to unlock
              </p>
            )}
            <ChaosSlider value={chaos} onChange={setChaos} label="Chaos" />
          </RetroCard>
        </aside>

        {/* Center: Canvas */}
        <section className="min-h-[320px] flex-1">
          <RetroCard className="flex min-h-[320px] items-center justify-center overflow-hidden">
            {droppedImage ? (
              <div className="relative max-h-full max-w-full">
                <img
                  src={droppedImage}
                  alt="Meme"
                  className="max-h-[280px] max-w-full object-contain"
                  style={{
                    filter: `saturate(${1 + chaos / 50}) contrast(${1 + chaos / 100})`,
                  }}
                />
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-cyan-400/30 py-12 px-8 text-center"
              >
                <Sparkles className="text-cyan-400/50" size={40} />
                <p className="font-pixel text-[10px] text-zinc-500">Drop assets here</p>
                <p className="font-pixel text-[10px] text-zinc-600">or paste from clipboard</p>
              </div>
            )}
          </RetroCard>
        </section>

        {/* Right: Launchpad */}
        <aside className="w-full shrink-0 lg:w-72">
          <RetroCard className="space-y-4">
            <h2 className="font-pixel text-[10px] text-cyan-400">Launchpad</h2>
            <div>
              <label className="mb-1 block font-pixel text-[10px] text-zinc-500">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="Based Chad"
                className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-pixel text-[10px] text-white placeholder-zinc-600 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-pixel text-[10px] text-zinc-500">Ticker</label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="CHAD"
                className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-pixel text-[10px] text-white placeholder-zinc-600 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-pixel text-[10px] text-zinc-500">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="No roadmap. Just vibes."
                rows={3}
                className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-pixel text-[10px] text-white placeholder-zinc-600 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleLaunchClick}
              className="w-full rounded border-2 border-cyan-400/60 bg-cyan-400/10 py-3 font-pixel text-[10px] text-cyan-400 hover:bg-cyan-400/20"
            >
              Launch to Pump.fun
            </button>
          </RetroCard>
        </aside>
      </main>

      <PumpLaunchModal
        open={launchModalOpen}
        onClose={() => setLaunchModalOpen(false)}
        onConfirm={() => {}}
        tokenName={tokenName || "Unnamed"}
        ticker={ticker || "???"}
      />
    </div>
  );
}
