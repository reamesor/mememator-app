"use client";

import { useState, useEffect } from "react";
import { useMate } from "@/context/MateContext";
import { X, ExternalLink } from "lucide-react";

const PUMP_FUN_BASE = "https://pump.fun/create";

type PumpLaunchModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tokenName: string;
  ticker: string;
  description?: string;
};

export default function PumpLaunchModal({
  open,
  onClose,
  onConfirm,
  tokenName,
  ticker,
  description = "",
}: PumpLaunchModalProps) {
  const { burnFeeLaunch, burnForLaunch } = useMate();
  const [step, setStep] = useState<"ready" | "confirm" | "burned">("ready");

  useEffect(() => {
    if (open) setStep("ready");
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    setStep("ready");
    onClose();
  };

  const handleConfirmBurn = () => {
    burnForLaunch();
    onConfirm();
    setStep("burned");

    const params = new URLSearchParams();
    if (tokenName.trim()) params.set("name", tokenName.trim());
    if (ticker.trim()) params.set("symbol", ticker.trim());
    if (description.trim()) params.set("description", description.trim());

    const url = params.toString()
      ? `${PUMP_FUN_BASE}?${params.toString()}`
      : PUMP_FUN_BASE;

    const detailsText = `Token Name: ${tokenName || "(not set)"}\nSymbol: ${ticker || "???"}\nDescription: ${description || "(not set)"}`;
    navigator.clipboard.writeText(detailsText).catch(() => {});

    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      handleClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-3 pb-[env(safe-area-inset-bottom)] sm:items-center sm:p-4">
      <div className="retro-card w-full max-h-[90vh] max-w-sm overflow-auto p-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="font-pixel text-sm text-cyan-400">Launch to Pump.fun</h3>
          <button
            type="button"
            onClick={handleClose}
            className="min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center rounded p-2 text-zinc-500 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mb-2 font-pixel text-[10px] text-zinc-400">
          Token: <span className="text-white">{tokenName}</span> (<span className="text-cyan-400">{ticker}</span>)
        </p>
        {description.trim() && (
          <p className="mb-2 line-clamp-2 font-pixel text-[10px] text-zinc-500">
            Description: {description.trim()}
          </p>
        )}
        <p className="mb-2 font-pixel text-[10px] text-amber-400">
          Burning {burnFeeLaunch} $MATE for luck...
        </p>
        <p className="mb-4 font-pixel text-[9px] text-zinc-500">
          Easy launch: we&apos;ll open pump.fun with your details pre-filled (URL + clipboard). Paste if needed. No custody—your wallet, your keys.
        </p>

        {step === "ready" && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="min-h-[2.75rem] flex-1 rounded border border-zinc-600 py-2 font-pixel text-[10px] text-zinc-400 hover:border-zinc-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setStep("confirm")}
              className="min-h-[2.75rem] flex-1 flex items-center justify-center gap-2 rounded border-2 border-cyan-400/60 bg-cyan-400/20 py-2 font-pixel text-[10px] text-cyan-400 hover:bg-cyan-400/30"
            >
              Launch on Pump.fun
              <ExternalLink size={12} />
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-3">
            <p className="rounded border border-amber-500/30 bg-amber-500/10 px-3 py-2 font-pixel text-[10px] text-amber-400">
              Confirm: Burn {burnFeeLaunch} $MATE and redirect to pump.fun?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("ready")}
                className="min-h-[2.75rem] flex-1 rounded border border-zinc-600 py-2 font-pixel text-[10px] text-zinc-400 hover:border-zinc-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirmBurn}
                className="min-h-[2.75rem] flex-1 rounded border-2 border-amber-500/60 bg-amber-500/20 py-2 font-pixel text-[10px] text-amber-400 hover:bg-amber-500/30"
              >
                Confirm burn & redirect
              </button>
            </div>
          </div>
        )}

        {step === "burned" && (
          <div className="rounded border border-cyan-500/30 bg-cyan-500/10 px-3 py-4 text-center">
            <p className="font-pixel text-sm font-semibold text-cyan-400">
              Burned {burnFeeLaunch} $MATE
            </p>
            <p className="mt-1 font-pixel text-[10px] text-zinc-400">
              Opening pump.fun...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
