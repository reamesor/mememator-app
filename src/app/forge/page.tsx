"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, FolderOpen, Lock, Sparkles, X } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import BurnTicker from "@/components/ui/BurnTicker";
import ChaosSlider from "@/components/ui/ChaosSlider";
import RetroCard from "@/components/ui/RetroCard";
import PumpLaunchModal from "@/components/ui/PumpLaunchModal";
import CreationsModal from "@/components/ui/CreationsModal";
import { useMate } from "@/context/MateContext";
import { useForgeDraft } from "@/context/ForgeDraftContext";
import { useCreationHistory } from "@/context/CreationHistoryContext";
import { FORGE_STYLES, type ForgeStyleId } from "@/lib/forgeStyles";

export default function ForgePage() {
  const router = useRouter();
  const { publicKey, disconnect, connected } = useWallet();
  const {
    balance,
    isForgeMaster,
    canUseHighResOrDeepFried,
    canAffordLaunch,
    burnFeeLaunch,
  } = useMate();

  const walletAddress = publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : null;

  useEffect(() => {
    if (connected) return;
    const t = setTimeout(() => {
      router.replace("/ignition");
    }, 1200); // Give wallet adapter time to auto-connect
    return () => clearTimeout(t);
  }, [connected, router]);
  const { loreDraft, memeDraft, setLoreDraft, clearLoreDraft, clearMemeDraft } = useForgeDraft();
  const { launches, memes, lores, addLaunch, saveLastDraft, loadLastDraft, deleteLaunch, deleteMeme, deleteLore } = useCreationHistory();
  const [style, setStyle] = useState<ForgeStyleId>("legacy");
  const [chaos, setChaos] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [launchModalOpen, setLaunchModalOpen] = useState(false);
  const [creationsModalOpen, setCreationsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("folder") === "1") {
      setCreationsModalOpen(true);
    }
  }, []);
  const [droppedImage, setDroppedImage] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [twitterLinkInput, setTwitterLinkInput] = useState("");
  const [twitterSuggestion, setTwitterSuggestion] = useState<{
    handle: string;
    category: string;
    categoryReason?: string;
    memePotential: string;
    memeIdeas: string[];
    suggestedTemplates: string[];
  } | null>(null);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [twitterError, setTwitterError] = useState<string | null>(null);

  const CAPYBARA_FACES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

  const searchQuery = searchInput.trim().toLowerCase();
  const filteredStyles = searchQuery
    ? FORGE_STYLES.filter(
        (s) =>
          s.label.toLowerCase().includes(searchQuery) ||
          s.vibeLabel.toLowerCase().includes(searchQuery) ||
          s.visualKey.toLowerCase().includes(searchQuery)
      )
    : FORGE_STYLES;
  const filteredFaceIndices = searchQuery
    ? CAPYBARA_FACES.map((_, i) => i + 1).filter(
        (n) => String(n).includes(searchQuery) || `face ${n}`.includes(searchQuery)
      )
    : null;

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

  useEffect(() => {
    const draft = loadLastDraft();
    if (draft) {
      if (draft.tokenName) setTokenName(draft.tokenName);
      if (draft.ticker) setTicker(draft.ticker);
      if (draft.description) setDescription(draft.description);
    }
  }, [loadLastDraft]);

  const saveDraft = useCallback(() => {
    if (tokenName || ticker || description) {
      saveLastDraft({ tokenName, ticker, description, style });
    }
  }, [tokenName, ticker, description, style, saveLastDraft]);

  useEffect(() => {
    const t = setTimeout(saveDraft, 2000);
    return () => clearTimeout(t);
  }, [saveDraft]);

  const handleLaunchClick = () => setLaunchModalOpen(true);

  const handleLaunchConfirmed = useCallback(() => {
    addLaunch({ tokenName: tokenName || "Unnamed", ticker: ticker || "???", description });
  }, [tokenName, ticker, description, addLaunch]);

  const handleAnalyzeTwitter = async () => {
    const input = twitterLinkInput.trim();
    if (!input) return;
    setTwitterLoading(true);
    setTwitterError(null);
    setTwitterSuggestion(null);
    try {
      const res = await fetch("/api/suggest-meme-from-twitter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twitterLink: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setTwitterSuggestion({
        handle: data.handle,
        category: data.category,
        categoryReason: data.categoryReason,
        memePotential: data.memePotential,
        memeIdeas: data.memeIdeas ?? [],
        suggestedTemplates: data.suggestedTemplates ?? [],
      });
    } catch (e) {
      setTwitterError(e instanceof Error ? e.message : "Could not analyze. Try again.");
    } finally {
      setTwitterLoading(false);
    }
  };

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
            <img src="/capybara-faces/capybara-1.png" alt="" className="h-5 w-5 shrink-0 object-contain" />
            <ArrowLeft size={16} />
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to homepage</span>
          </Link>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setCreationsModalOpen(true)}
              className="flex min-h-[2.75rem] items-center gap-1.5 rounded border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 font-pixel text-xs text-cyan-400 transition hover:bg-cyan-500/20 sm:text-sm"
            >
              <FolderOpen size={14} />
              <span className="hidden sm:inline">My Memes & Lores</span>
              <span className="sm:hidden">Creations</span>
            </button>
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
              onClick={() => disconnect()}
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
          <RetroCard className="space-y-2 p-3">
            <div className="relative">
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search styles (Legacy, Deep-Fried, face 3...)"
                className="w-full rounded border border-zinc-700 bg-zinc-800/80 py-2 pl-8 pr-2 font-pixel text-[10px] text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
                aria-label="Search styles and faces"
              />
              <svg className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </RetroCard>

          <RetroCard className="space-y-2 p-3">
            <p className="font-pixel text-[9px] font-medium uppercase text-zinc-500">Paste Twitter/X link</p>
            <p className="font-pixel text-[9px] text-zinc-500">Get meme ideas & use for token name/description.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={twitterLinkInput}
                onChange={(e) => { setTwitterLinkInput(e.target.value); setTwitterError(null); }}
                placeholder="twitter.com/username or @handle"
                className="min-w-0 flex-1 rounded border border-zinc-700 bg-zinc-800 px-2 py-1.5 font-pixel text-[10px] text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleAnalyzeTwitter()}
              />
              <button
                type="button"
                onClick={handleAnalyzeTwitter}
                disabled={twitterLoading}
                className="shrink-0 rounded border border-cyan-500/40 bg-cyan-500/10 px-2 py-1.5 font-pixel text-[10px] text-cyan-400 hover:bg-cyan-500/20 disabled:opacity-50"
              >
                {twitterLoading ? "…" : "Analyze"}
              </button>
            </div>
            {twitterError && <p className="font-pixel text-[9px] text-red-400">{twitterError}</p>}
            {twitterSuggestion && (
              <div className="mt-2 space-y-1.5 rounded border border-cyan-500/20 bg-cyan-500/5 p-2">
                <div className="flex flex-wrap items-center gap-1">
                  <a href={`https://twitter.com/${twitterSuggestion.handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="font-pixel text-[10px] font-semibold text-cyan-400 hover:underline">
                    {twitterSuggestion.handle}
                  </a>
                  <span className="rounded bg-zinc-700 px-1 py-0.5 font-pixel text-[8px] text-zinc-400">{twitterSuggestion.category}</span>
                  <span className={`rounded px-1 py-0.5 font-pixel text-[8px] ${twitterSuggestion.memePotential === "Great pick" ? "bg-cyan-500/20 text-cyan-400" : "bg-amber-500/20 text-amber-400"}`}>
                    {twitterSuggestion.memePotential}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => setTokenName(twitterSuggestion.handle.replace("@", ""))}
                    className="rounded border border-cyan-400/40 px-1.5 py-0.5 font-pixel text-[8px] text-cyan-400 hover:bg-cyan-400/10"
                  >
                    Use as Token Name
                  </button>
                  <button
                    type="button"
                    onClick={() => setDescription(twitterSuggestion.memeIdeas.join("\n\n"))}
                    className="rounded border border-cyan-400/40 px-1.5 py-0.5 font-pixel text-[8px] text-cyan-400 hover:bg-cyan-400/10"
                  >
                    Use ideas as Description
                  </button>
                </div>
              </div>
            )}
          </RetroCard>

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
            <h2 className="font-pixel text-[10px] text-cyan-400">Commander MATE Faces</h2>
            <p className="font-pixel text-[8px] text-zinc-500">Click to use as base image</p>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
              {(filteredFaceIndices
                ? filteredFaceIndices.map((n) => n - 1)
                : CAPYBARA_FACES.map((_, i) => i)
              ).map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setDroppedImage(CAPYBARA_FACES[i])}
                  className="aspect-square overflow-hidden rounded border border-zinc-700 hover:border-cyan-400/50 focus:border-cyan-400/50 focus:outline-none"
                >
                  <img src={CAPYBARA_FACES[i]} alt={`Commander MATE ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </RetroCard>
          <RetroCard className="space-y-3 p-3 sm:p-4">
            <h2 className="font-pixel text-[10px] text-cyan-400">Style</h2>
            <div className="flex flex-wrap gap-1.5">
              {filteredStyles.map((s) => {
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
        <aside className="order-3 w-full shrink-0 space-y-4 lg:order-none lg:w-72">
          <RetroCard className="space-y-2 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-pixel text-[10px] text-cyan-400">My Creations</h2>
                <button
                  type="button"
                  onClick={() => setCreationsModalOpen(true)}
                  className="font-pixel text-[9px] text-cyan-400 hover:underline"
                >
                  Find all
                </button>
              </div>
              <p className="font-pixel text-[9px] text-zinc-500">Pick from history — stored per wallet</p>
              {(launches.length > 0 || memes.length > 0 || lores.length > 0) ? (
              <div className="max-h-32 space-y-1 overflow-y-auto">
                {launches.slice(0, 5).map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      setTokenName(l.tokenName);
                      setTicker(l.ticker);
                      setDescription(l.description);
                    }}
                    className="flex w-full items-center gap-2 rounded border border-zinc-700 bg-zinc-800/50 p-2 text-left font-pixel text-[9px] transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
                  >
                    <span className="truncate font-medium text-zinc-300">{l.tokenName}</span>
                    <span className="shrink-0 text-cyan-400">{l.ticker}</span>
                  </button>
                ))}
                {memes.slice(0, 3).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDroppedImage(m.imageDataUrl)}
                    className="flex w-full items-center gap-2 rounded border border-zinc-700 bg-zinc-800/50 p-1.5 text-left transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
                  >
                    <img src={m.imageDataUrl} alt="" className="h-8 w-8 shrink-0 rounded object-cover" />
                    <span className="truncate font-pixel text-[9px] text-zinc-400">{m.tokenName || m.caption || "Meme"}</span>
                  </button>
                ))}
                {lores.slice(0, 3).map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      setLoreDraft({ tokenName: l.tokenName, lore: l.lore, memeAngle: l.memeAngle, themeName: l.themeName });
                      setTokenName(l.tokenName);
                      const parts = [l.lore, l.memeAngle].filter(Boolean);
                      if (parts.length) setDescription(parts.join("\n\n"));
                    }}
                    className="flex w-full items-center gap-2 rounded border border-zinc-700 bg-zinc-800/50 p-1.5 text-left font-pixel text-[9px] transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
                  >
                    <span className="truncate text-zinc-400">{l.tokenName || "Lore"}</span>
                  </button>
                ))}
              </div>
              ) : (
                <p className="font-pixel text-[9px] text-zinc-600">No creations yet. Connect wallet & create—saved to your folder.</p>
              )}
            </RetroCard>
          <RetroCard className="space-y-3 p-3 sm:p-4">
            <h2 className="font-pixel text-[10px] text-cyan-400">Launchpad</h2>
            <p className="font-pixel mb-2 text-[9px] text-zinc-500">Easy launch for launcher wannabes. Fill in, burn, redirect.</p>
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
              disabled={!canAffordLaunch}
              title={!canAffordLaunch ? `Need ${burnFeeLaunch} $MATE to launch` : undefined}
              className="w-full min-h-[2.75rem] rounded border-2 border-cyan-400/60 bg-cyan-400/10 py-3 font-pixel text-[10px] text-cyan-400 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-cyan-400/10"
            >
              Launch to Pump.fun
            </button>
            {!canAffordLaunch && (
              <p className="mt-1 font-pixel text-[9px] text-amber-400">
                Need {burnFeeLaunch} $MATE to launch. Stake or earn more.
              </p>
            )}
          </RetroCard>
        </aside>
      </main>

      <PumpLaunchModal
        open={launchModalOpen}
        onClose={() => setLaunchModalOpen(false)}
        onConfirm={handleLaunchConfirmed}
        tokenName={tokenName || "Unnamed"}
        ticker={ticker || "???"}
        description={description}
      />
      <CreationsModal
        open={creationsModalOpen}
        onClose={() => setCreationsModalOpen(false)}
        launches={launches}
        memes={memes}
        lores={lores}
        onSelectLaunch={(l) => {
          setTokenName(l.tokenName);
          setTicker(l.ticker);
          setDescription(l.description);
        }}
        onSelectMeme={(m) => setDroppedImage(m.imageDataUrl)}
        onSelectLore={(l) => {
          setLoreDraft({ tokenName: l.tokenName, lore: l.lore, memeAngle: l.memeAngle, themeName: l.themeName });
          setTokenName(l.tokenName);
          const parts = [l.lore, l.memeAngle].filter(Boolean);
          if (parts.length) setDescription(parts.join("\n\n"));
        }}
        deleteLaunch={deleteLaunch}
        deleteMeme={deleteMeme}
        deleteLore={deleteLore}
      />
    </div>
  );
}
