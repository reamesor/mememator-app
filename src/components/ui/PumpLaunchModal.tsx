"use client";

import { useMate } from "@/context/MateContext";
import { X } from "lucide-react";

type PumpLaunchModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tokenName: string;
  ticker: string;
};

export default function PumpLaunchModal({
  open,
  onClose,
  onConfirm,
  tokenName,
  ticker,
}: PumpLaunchModalProps) {
  const { burnFeeLaunch, burnForLaunch } = useMate();

  if (!open) return null;

  const handleLaunch = () => {
    burnForLaunch();
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="retro-card w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-pixel text-sm text-cyan-400">Launch to Pump.fun</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-zinc-500 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mb-2 font-pixel text-[10px] text-zinc-400">
          Token: <span className="text-white">{tokenName}</span> (<span className="text-cyan-400">{ticker}</span>)
        </p>
        <p className="mb-4 font-pixel text-[10px] text-amber-400">
          Burning {burnFeeLaunch} $MATE for luck...
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded border border-zinc-600 py-2 font-pixel text-[10px] text-zinc-400 hover:border-zinc-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLaunch}
            className="flex-1 rounded border-2 border-red-500 bg-red-500/20 py-2 font-pixel text-[10px] text-red-400 hover:bg-red-500/30"
          >
            Do Not Press
          </button>
        </div>
      </div>
    </div>
  );
}
