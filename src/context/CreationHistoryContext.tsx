"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import type { LaunchRecord, LoreRecord, MemeRecord, UserStorageData } from "@/lib/userStorage";
import * as storage from "@/lib/userStorage";

type CreationHistoryContextType = {
  launches: LaunchRecord[];
  memes: MemeRecord[];
  lores: LoreRecord[];
  lastDraft: UserStorageData["lastDraft"] | null;
  addLaunch: (record: Omit<LaunchRecord, "id" | "createdAt">) => void;
  addMeme: (record: Omit<MemeRecord, "id" | "createdAt">) => void;
  addLore: (record: Omit<LoreRecord, "id" | "createdAt">) => void;
  saveLastDraft: (draft: UserStorageData["lastDraft"]) => void;
  deleteLaunch: (id: string) => void;
  deleteMeme: (id: string) => void;
  deleteLore: (id: string) => void;
  loadLastDraft: () => UserStorageData["lastDraft"] | null;
};

const CreationHistoryContext = createContext<CreationHistoryContextType | null>(null);

export function CreationHistoryProvider({ children }: { children: React.ReactNode }) {
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toString() ?? null;

  const [launches, setLaunches] = useState<LaunchRecord[]>([]);
  const [memes, setMemes] = useState<MemeRecord[]>([]);
  const [lores, setLores] = useState<LoreRecord[]>([]);
  const [lastDraft, setLastDraftState] = useState<UserStorageData["lastDraft"] | null>(null);

  useEffect(() => {
    const data = storage.loadUserData(walletAddress);
    if (data) {
      setLaunches(data.launches ?? []);
      setMemes(data.memes ?? []);
      setLores(data.lores ?? []);
      setLastDraftState(data.lastDraft ?? null);
    } else {
      setLaunches([]);
      setMemes([]);
      setLores([]);
      setLastDraftState(null);
    }
  }, [walletAddress]);

  const addLaunch = useCallback(
    (record: Omit<LaunchRecord, "id" | "createdAt">) => {
      storage.addLaunch(walletAddress, record);
      const launch: LaunchRecord = { ...record, id: `launch_${Date.now()}`, createdAt: Date.now() };
      setLaunches((prev) => [launch, ...prev].slice(0, 50));
    },
    [walletAddress]
  );

  const addMeme = useCallback(
    (record: Omit<MemeRecord, "id" | "createdAt">) => {
      storage.addMeme(walletAddress, record);
      const meme: MemeRecord = { ...record, id: `meme_${Date.now()}`, createdAt: Date.now() };
      setMemes((prev) => [meme, ...prev].slice(0, 30));
    },
    [walletAddress]
  );

  const addLore = useCallback(
    (record: Omit<LoreRecord, "id" | "createdAt">) => {
      storage.addLore(walletAddress, record);
      const lore: LoreRecord = { ...record, id: `lore_${Date.now()}`, createdAt: Date.now() };
      setLores((prev) => [lore, ...prev].slice(0, 50));
    },
    [walletAddress]
  );

  const saveLastDraft = useCallback(
    (draft: UserStorageData["lastDraft"]) => {
      storage.saveLastDraft(walletAddress, draft);
      setLastDraftState(draft);
    },
    [walletAddress]
  );

  const deleteLaunch = useCallback(
    (id: string) => {
      storage.deleteLaunch(walletAddress, id);
      setLaunches((prev) => prev.filter((l) => l.id !== id));
    },
    [walletAddress]
  );

  const deleteMeme = useCallback(
    (id: string) => {
      storage.deleteMeme(walletAddress, id);
      setMemes((prev) => prev.filter((m) => m.id !== id));
    },
    [walletAddress]
  );

  const deleteLore = useCallback(
    (id: string) => {
      storage.deleteLore(walletAddress, id);
      setLores((prev) => prev.filter((l) => l.id !== id));
    },
    [walletAddress]
  );

  const loadLastDraft = useCallback(() => {
    const data = storage.loadUserData(walletAddress);
    return data?.lastDraft ?? null;
  }, [walletAddress]);

  return (
    <CreationHistoryContext.Provider
      value={{
        launches,
        memes,
        lores,
        lastDraft,
        addLaunch,
        addMeme,
        addLore,
        saveLastDraft,
        deleteLaunch,
        deleteMeme,
        deleteLore,
        loadLastDraft,
      }}
    >
      {children}
    </CreationHistoryContext.Provider>
  );
}

export function useCreationHistory() {
  const ctx = useContext(CreationHistoryContext);
  if (!ctx) throw new Error("useCreationHistory must be used within CreationHistoryProvider");
  return ctx;
}
