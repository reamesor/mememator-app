"use client";

import { X, Image, FileText, Rocket } from "lucide-react";
import type { LaunchRecord, LoreRecord, MemeRecord } from "@/lib/userStorage";

type CreationsModalProps = {
  open: boolean;
  onClose: () => void;
  launches: LaunchRecord[];
  memes: MemeRecord[];
  lores: LoreRecord[];
  onSelectLaunch: (l: LaunchRecord) => void;
  onSelectMeme: (m: MemeRecord) => void;
  onSelectLore: (l: LoreRecord) => void;
  deleteLaunch?: (id: string) => void;
  deleteMeme?: (id: string) => void;
  deleteLore?: (id: string) => void;
};

export default function CreationsModal({
  open,
  onClose,
  launches,
  memes,
  lores,
  onSelectLaunch,
  onSelectMeme,
  onSelectLore,
  deleteLaunch,
  deleteMeme,
  deleteLore,
}: CreationsModalProps) {
  if (!open) return null;

  const total = launches.length + memes.length + lores.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-xl"
        role="dialog"
        aria-labelledby="creations-modal-title"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-700/80 px-4 py-3">
          <h2 id="creations-modal-title" className="font-pixel text-sm font-semibold text-cyan-400">
            My Memes & Lores
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {total === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-12 text-center">
              <div className="flex gap-3 text-zinc-600">
                <Image size={28} />
                <FileText size={28} />
              </div>
              <p className="font-pixel text-sm text-zinc-500">
                No creations yet. Connect your wallet, then create memes, lores, or launches—all saved to your folder.
              </p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col overflow-hidden sm:flex-row">
              {/* Memes section */}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col border-b border-zinc-700/50 sm:border-b-0 sm:border-r">
                <div className="flex shrink-0 items-center gap-2 border-b border-zinc-700/50 px-3 py-2">
                  <Image size={14} className="text-cyan-400" />
                  <span className="font-pixel text-[10px] font-medium text-zinc-400">Memes ({memes.length})</span>
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto p-2">
                  {memes.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        onSelectMeme(m);
                        onClose();
                      }}
                      className="flex w-full items-center gap-2 rounded border border-zinc-700/80 bg-zinc-800/50 p-2 text-left transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
                    >
                      <img
                        src={m.imageDataUrl}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded object-cover"
                      />
                      <span className="min-w-0 flex-1 truncate font-pixel text-[10px] text-zinc-400">
                        {m.tokenName || m.caption || "Meme"}
                      </span>
                      {deleteMeme && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMeme(m.id);
                          }}
                          className="shrink-0 rounded p-1 text-zinc-500 hover:bg-red-500/20 hover:text-red-400"
                          aria-label="Delete meme"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lores (narrative) section */}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col border-b border-zinc-700/50 sm:border-b-0 sm:border-r">
                <div className="flex shrink-0 items-center gap-2 border-b border-zinc-700/50 px-3 py-2">
                  <FileText size={14} className="text-cyan-400" />
                  <span className="font-pixel text-[10px] font-medium text-zinc-400">Lores ({lores.length})</span>
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto p-2">
                  {lores.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        onSelectLore(l);
                        onClose();
                      }}
                      className="flex w-full items-start justify-between gap-2 rounded border border-zinc-700/80 bg-zinc-800/50 p-2 text-left transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="truncate font-pixel text-[10px] font-medium text-zinc-300">
                          {l.tokenName || "Lore"}
                        </span>
                        {(l.lore || l.memeAngle) && (
                          <p className="mt-0.5 line-clamp-2 font-pixel text-[9px] text-zinc-500">
                            {(l.lore || l.memeAngle || "").slice(0, 60)}
                            {(l.lore?.length || l.memeAngle?.length || 0) > 60 ? "…" : ""}
                          </p>
                        )}
                      </div>
                      {deleteLore && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteLore(l.id);
                          }}
                          className="shrink-0 rounded p-1 text-zinc-500 hover:bg-red-500/20 hover:text-red-400"
                          aria-label="Delete lore"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Launches section */}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="flex shrink-0 items-center gap-2 border-b border-zinc-700/50 px-3 py-2">
                  <Rocket size={14} className="text-cyan-400" />
                  <span className="font-pixel text-[10px] font-medium text-zinc-400">Launches ({launches.length})</span>
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto p-2">
                  {launches.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        onSelectLaunch(l);
                        onClose();
                      }}
                      className="flex w-full items-start justify-between gap-2 rounded border border-zinc-700/80 bg-zinc-800/50 p-2 text-left transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-pixel text-[10px] font-medium text-zinc-300">
                            {l.tokenName}
                          </span>
                          <span className="shrink-0 font-pixel text-[9px] text-cyan-400">{l.ticker}</span>
                        </div>
                        {l.description && (
                          <p className="mt-0.5 line-clamp-2 font-pixel text-[9px] text-zinc-500">
                            {l.description}
                          </p>
                        )}
                      </div>
                      {deleteLaunch && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteLaunch(l.id);
                          }}
                          className="shrink-0 rounded p-1 text-zinc-500 hover:bg-red-500/20 hover:text-red-400"
                          aria-label="Delete launch"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
