"use client";

import { useState, useCallback, useEffect } from "react";
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

  const handlePaste = useCallback((e: React.ClipboardEvent | ClipboardEvent) => {
    const data = "clipboardData" in e ? e.clipboardData : null;
    const file = data?.files[0];
    if (file?.type.startsWith("image/")) {
      e.preventDefault();
      setDroppedImage(URL.createObjectURL(file));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("paste", handlePaste as (e: ClipboardEvent) => void);
    return () => window.removeEventListener("paste", handlePaste as (e: ClipboardEvent) => void);
  }, [handlePaste]);

  const handleLaunchClick = () => setLaunchModalOpen(true);

  const selectedStyleDef = FORGE_STYLES.find((s) => s.id === style);
  const vibeLabel = selectedStyleDef?.vibeLabel ?? "—";

  return (
    <div className="min-h-screen bg-void-grid-see-through">
      <BurnTicker />

      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur">
        <div className="container-tight flex h-12 min-h-12 items-center justify-between gap-2">
          <Link
            href="/?hub=1"
            className="min-h-[2.75rem] shrink-0 flex items-center gap-2 rounded px-2 py-2 font-pixel text-xs text-zinc-500 hover:text-zinc-300 sm:text-sm"
          >
            <ArrowLeft size={16} />
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to homepage</span>
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            <span className="font-pixel text-xs text-cyan-400 sm:text-sm">$MATE: {balance.toLocaleString()}</span>
            {walletAddress && (
              <span className="hidden items-center gap-1.5 font-pixel text-xs text-zinc-400 sm:flex sm:text-sm">
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
              className="min-h-[2.75rem] rounded border border-zinc-600 px-3 py-2 font-pixel text-xs text-zinc-400 hover:border-zinc-500 hover:text-zinc-300 sm:text-sm"
            >
              Disconnect
            </button>
          </div>
        </div>
      </header>

      <main className="container-tight flex min-h-[calc(100vh-7rem)] flex-col gap-4 p-4 sm:p-5 lg:min-h-[calc(100vh-52px-56px)] lg:flex-row lg:gap-6">
        {/* Left: Toolkit — order 1 on mobile */}
        <aside className="order-1 w-full shrink-0 space-y-4 lg:order-none lg:w-60">
          {(loreDraft || memeDraft) && (
            <RetroCard className="space-y-2.5 p-3 sm:p-4">
              <h2 className="font-pixel text-[10px] text-cyan-400">Options from Lore & Meme</h2>
              {loreDraft && (
                <div className="rounded border border-zinc-700/80 bg-zinc-900/50 p-2">
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
                <div className="rounded border border-zinc-700/80 bg-zinc-900/50 p-2">
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
          <RetroCard className="space-y-3 p-3 sm:p-4">
            <h2 className="font-pixel text-[10px] text-cyan-400">Style</h2>
            <div className="flex flex-wrap gap-1.5">
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
              <div className="rounded border border-zinc-700/80 bg-zinc-900/50 px-2 py-1.5 font-pixel text-[8px] text-zinc-400 sm:text-[10px]">
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

        {/* Center: Canvas — order 2 on mobile so it appears after toolkit */}
        <section className="order-2 min-h-[220px] flex-1 sm:min-h-[280px] lg:order-none">
          <RetroCard className="flex min-h-[220px] items-center justify-center overflow-hidden p-3 sm:min-h-[280px] sm:p-4">
            {droppedImage ? (
              <div className="relative max-h-full max-w-full p-2">
                <img
                  src={droppedImage}
                  alt="Meme"
                  className="max-h-[220px] max-w-full object-contain sm:max-h-[280px]"
                  style={{
                    filter: `saturate(${1 + chaos / 50}) contrast(${1 + chaos / 100})`,
                  }}
                />
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onPaste={handlePaste}
                className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-cyan-400/30 py-8 px-4 text-center sm:min-h-0 sm:py-12 sm:px-8"
              >
                <Sparkles className="text-cyan-400/50" size={36} />
                <p className="font-pixel text-[10px] text-zinc-500">Drop assets here</p>
                <p className="font-pixel text-[10px] text-zinc-600">or paste from clipboard</p>
              </div>
            )}
          </RetroCard>
        </section>

        {/* Right: Launchpad — order 3 on mobile */}
        <aside className="order-3 w-full shrink-0 lg:order-none lg:w-72">
          <RetroCard className="space-y-3 p-3 sm:p-4">
            <h2 className="font-pixel text-[10px] text-cyan-400">Launchpad</h2>
            <div>
              <label className="mb-1 block font-pixel text-[10px] text-zinc-500">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="Based Chad"
                className="w-full min-h-[2.75rem] rounded border border-zinc-700 bg-zinc-950 px-3 py-2.5 font-pixel text-[10px] text-white placeholder-zinc-600 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-pixel text-[10px] text-zinc-500">Ticker</label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="CHAD"
                className="w-full min-h-[2.75rem] rounded border border-zinc-700 bg-zinc-950 px-3 py-2.5 font-pixel text-[10px] text-white placeholder-zinc-600 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-pixel text-[10px] text-zinc-500">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="No roadmap. Just vibes."
                rows={3}
                className="w-full min-h-[2.75rem] rounded border border-zinc-700 bg-zinc-950 px-3 py-2.5 font-pixel text-[10px] text-white placeholder-zinc-600 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleLaunchClick}
              className="w-full min-h-[2.75rem] rounded border-2 border-cyan-400/60 bg-cyan-400/10 py-3 font-pixel text-[10px] text-cyan-400 hover:bg-cyan-400/20"
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
