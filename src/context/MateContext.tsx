"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

const MATE_UNLOCK_STYLE = 50_000;
const FORGE_MASTER = 100_000;
const BURN_FEE_LAUNCH = 500;

type MateContextType = {
  balance: number;
  setBalance: (n: number) => void;
  isConnected: boolean;
  setConnected: (b: boolean) => void;
  walletAddress: string | null;
  setWalletAddress: (a: string | null) => void;
  canUseHighResOrDeepFried: boolean;
  isForgeMaster: boolean;
  burnFeeLaunch: number;
  burnForLaunch: () => void;
};

const MateContext = createContext<MateContextType | null>(null);

export function MateProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(75_000);
  const [isConnected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const canUseHighResOrDeepFried = balance >= MATE_UNLOCK_STYLE;
  const isForgeMaster = balance >= FORGE_MASTER;

  const burnForLaunch = useCallback(() => {
    setBalance((b) => Math.max(0, b - BURN_FEE_LAUNCH));
  }, []);

  return (
    <MateContext.Provider
      value={{
        balance,
        setBalance,
        isConnected,
        setConnected,
        walletAddress,
        setWalletAddress,
        canUseHighResOrDeepFried,
        isForgeMaster,
        burnFeeLaunch: BURN_FEE_LAUNCH,
        burnForLaunch,
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
