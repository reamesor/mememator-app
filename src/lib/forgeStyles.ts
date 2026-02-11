/**
 * Forge style categorization and vibe labels for meme-to-market.
 * Used by the Forge UI and (later) by algorithm/label logic.
 */

export type ForgeStyleId =
  | "deep-fried"
  | "legacy"
  | "synthetic"
  | "dank-chaos"
  | "minimalist";

export type TechnicalDifficulty = "High Editing" | "Low/Template" | "AI Prompt" | "Medium/Collage" | "Text-only";

/** Style definition: name, visual key, technical difficulty */
export interface ForgeStyleDef {
  id: ForgeStyleId;
  label: string;
  visualKey: string;
  difficulty: TechnicalDifficulty;
  /** Suggested app label for "vibe" / algorithm */
  vibeLabel: string;
  /** Requires 50k+ $MATE to unlock (e.g. AI / high-fidelity) */
  lockedByTier?: boolean;
}

/** Style categorization table */
export const FORGE_STYLES: ForgeStyleDef[] = [
  {
    id: "deep-fried",
    label: "Deep-Fried",
    visualKey: "Grainy, saturated, distorted",
    difficulty: "High Editing",
    vibeLabel: "Fried / Cursed",
    lockedByTier: true,
  },
  {
    id: "legacy",
    label: "Legacy",
    visualKey: "Impact font, Rage characters",
    difficulty: "Low/Template",
    vibeLabel: "Classic / Retro",
  },
  {
    id: "synthetic",
    label: "Synthetic",
    visualKey: "AI-generated, hyper-real",
    difficulty: "AI Prompt",
    vibeLabel: "Synthetic / Surreal",
    lockedByTier: true,
  },
  {
    id: "dank-chaos",
    label: "Dank / Chaos",
    visualKey: "Layered PNGs, \"shoddy\" crops",
    difficulty: "Medium/Collage",
    vibeLabel: "Shitpost / Chaotic",
  },
  {
    id: "minimalist",
    label: "Minimalist",
    visualKey: "Twitter/X screenshots, white borders",
    difficulty: "Text-only",
    vibeLabel: "Wholesome / Modern",
  },
];

/** Vibe category → typical traits (for algorithm / future use) */
export const VIBE_TRAITS: Record<string, { traits: string; label: string }> = {
  "deep-fried": {
    traits: "High saturation, noise, pixelation.",
    label: "Fried / Cursed",
  },
  "ai-ish": {
    traits: "High detail, unusual textures, prompt-based.",
    label: "Synthetic / Surreal",
  },
  chaos: {
    traits: "Overlapping images, no grid, mixed fonts.",
    label: "Shitpost / Chaotic",
  },
  "comic-retro": {
    traits: "Clean lines, hand-drawn or old-print style.",
    label: "Classic / Retro",
  },
  clean: {
    traits: "High-res, simple text-box overlay.",
    label: "Wholesome / Modern",
  },
};

export function getForgeStyle(id: ForgeStyleId): ForgeStyleDef | undefined {
  return FORGE_STYLES.find((s) => s.id === id);
}

export function getVibeLabelForStyle(styleId: ForgeStyleId): string {
  return getForgeStyle(styleId)?.vibeLabel ?? "—";
}
