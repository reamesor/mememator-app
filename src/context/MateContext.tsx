"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

const MATE_UNLOCK_STYLE = 50_000;
const FORGE_MASTER = 100_000;
const BURN_FEE_LAUNCH = 500;
const BURN_FEE_LORE = 100;
const BURN_FEE_MEME = 100;

type MateContextType = {
  balance: number;
  setBalance: (n: number) => void;
  canUseHighResOrDeepFried: boolean;
  isForgeMaster: boolean;
  burnFeeLaunch: number;
  burnFeeLore: number;
  burnFeeMeme: number;
  burnForLaunch: () => void;
  burnForLore: () => void;
  burnForMeme: () => void;
  canAffordLaunch: boolean;
  canAffordLore: boolean;
  canAffordMeme: boolean;
};

const MateContext = createContext<MateContextType | null>(null);

export function MateProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(75_000);

  const canUseHighResOrDeepFried = balance >= MATE_UNLOCK_STYLE;
  const isForgeMaster = balance >= FORGE_MASTER;
  const canAffordLaunch = balance >= BURN_FEE_LAUNCH;
  const canAffordLore = balance >= BURN_FEE_LORE;
  const canAffordMeme = balance >= BURN_FEE_MEME;

  const burnForLaunch = useCallback(() => {
    setBalance((b) => Math.max(0, b - BURN_FEE_LAUNCH));
  }, []);

  const burnForLore = useCallback(() => {
    setBalance((b) => Math.max(0, b - BURN_FEE_LORE));
  }, []);

  const burnForMeme = useCallback(() => {
    setBalance((b) => Math.max(0, b - BURN_FEE_MEME));
  }, []);

  return (
    <MateContext.Provider
      value={{
        balance,
        setBalance,
        canUseHighResOrDeepFried,
        isForgeMaster,
        burnFeeLaunch: BURN_FEE_LAUNCH,
        burnFeeLore: BURN_FEE_LORE,
        burnFeeMeme: BURN_FEE_MEME,
        burnForLaunch,
        burnForLore,
        burnForMeme,
        canAffordLaunch,
        canAffordLore,
        canAffordMeme,
      }}
    >
      {children}
    </MateContext.Provider>
  );
}

export function useMate() {
  const ctx = useContext(MateContext);
  if (!ctx) throw new Error("useMate must be used within MateProvider");
  return ctx;
}
