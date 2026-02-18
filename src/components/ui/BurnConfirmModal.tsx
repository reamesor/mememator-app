"use client";

import { X } from "lucide-react";

type BurnConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  actionLabel: string;
  description?: string;
};

export default function BurnConfirmModal({
  open,
  onClose,
  onConfirm,
  amount,
  actionLabel,
  description,
}: BurnConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative w-full max-w-sm rounded-xl border border-zinc-700/80 bg-zinc-900 p-4 shadow-xl"
        role="dialog"
        aria-labelledby="burn-confirm-title"
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 id="burn-confirm-title" className="font-pixel text-sm font-semibold text-amber-400">
            Burn $MATE to continue
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <p className="mb-3 font-pixel text-[10px] text-zinc-400">
          {description ?? `Burn ${amount} $MATE to ${actionLabel}.`}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[2.75rem] flex-1 rounded border border-zinc-600 py-2 font-pixel text-[10px] text-zinc-400 hover:border-zinc-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="min-h-[2.75rem] flex-1 rounded border-2 border-amber-500/60 bg-amber-500/20 py-2 font-pixel text-[10px] text-amber-400 hover:bg-amber-500/30"
          >
            Burn {amount} $MATE & {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
