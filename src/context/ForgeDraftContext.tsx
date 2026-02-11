"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type LoreDraft = {
  tokenName: string;
  lore: string;
  memeAngle: string;
  themeName?: string;
};

export type MemeDraft = {
  imageDataUrl: string;
  templateName?: string;
  topText?: string;
  bottomText?: string;
  caption?: string;
  subjectName?: string;
};

type ForgeDraftContextType = {
  loreDraft: LoreDraft | null;
  setLoreDraft: (draft: LoreDraft | null) => void;
  memeDraft: MemeDraft | null;
  setMemeDraft: (draft: MemeDraft | null) => void;
  clearLoreDraft: () => void;
  clearMemeDraft: () => void;
};

const ForgeDraftContext = createContext<ForgeDraftContextType | null>(null);

export function ForgeDraftProvider({ children }: { children: ReactNode }) {
  const [loreDraft, setLoreDraft] = useState<LoreDraft | null>(null);
  const [memeDraft, setMemeDraft] = useState<MemeDraft | null>(null);

  const clearLoreDraft = useCallback(() => setLoreDraft(null), []);
  const clearMemeDraft = useCallback(() => setMemeDraft(null), []);

  return (
    <ForgeDraftContext.Provider
      value={{
        loreDraft,
        setLoreDraft,
        memeDraft,
        setMemeDraft,
        clearLoreDraft,
        clearMemeDraft,
      }}
    >
      {children}
    </ForgeDraftContext.Provider>
  );
}

export function useForgeDraft() {
  const ctx = useContext(ForgeDraftContext);
  if (!ctx) throw new Error("useForgeDraft must be used within ForgeDraftProvider");
  return ctx;
}
