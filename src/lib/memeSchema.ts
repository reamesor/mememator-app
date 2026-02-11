/**
 * Meme art tagging schema for database and filtering.
 * Use for: search, filters, meme generator options, and API metadata.
 */

// —— Visual Style (how it looks) ——
export const VISUAL_STYLE_TAGS = [
  { id: "low_fidelity", label: "Low-fi / Deep-Fried", description: "Grainy, high saturation, pixelated, 'cursed' look" },
  { id: "synthetic", label: "Synthetic / AI", description: "AI-generated (Midjourney, DALL-E), unusual textures" },
  { id: "vintage_retro", label: "Vintage / Retro", description: "1950s ads, Victorian art, 90s nostalgia" },
  { id: "maximalist", label: "Maximalist", description: "Messy copy-paste, chaotic energy, lots of elements" },
  { id: "minimalist", label: "Minimalist", description: "Clean screenshots, Impact font on plain background" },
  { id: "vector_rage", label: "Vector / Rage", description: "MS Paint, Rage Comic style" },
] as const;

export type VisualStyleTagId = (typeof VISUAL_STYLE_TAGS)[number]["id"];

// —— Layout / Format (how it's built) ——
export const FORMAT_TAGS = [
  { id: "image_macro", label: "Image macro", description: "Classic 'Text on top, text on bottom'" },
  { id: "multi_panel", label: "Multi-panel", description: "Comic-strip, Before/After comparisons" },
  { id: "screencap", label: "Screencap", description: "Screenshots from movies, social, news" },
  { id: "object_labeling", label: "Object labeling", description: "Text over specific items (e.g. Distracted Boyfriend)" },
] as const;

export type FormatTagId = (typeof FORMAT_TAGS)[number]["id"];

// —— Meme Spectrum / Vibe (algorithm-friendly meta) ——
export const MEME_SPECTRUM = [
  {
    id: "fried_cursed",
    label: "Fried / Cursed",
    traits: "High saturation, noise, pixelation",
    appLabel: "Fried / Cursed",
  },
  {
    id: "synthetic_surreal",
    label: "Synthetic / Surreal",
    traits: "High detail, unusual textures, prompt-based",
    appLabel: "Synthetic / Surreal",
  },
  {
    id: "shitpost_chaotic",
    label: "Shitpost / Chaotic",
    traits: "Overlapping images, no grid, mixed fonts",
    appLabel: "Shitpost / Chaotic",
  },
  {
    id: "classic_retro",
    label: "Classic / Retro",
    traits: "Clean lines, hand-drawn or old-print style",
    appLabel: "Classic / Retro",
  },
  {
    id: "wholesome_modern",
    label: "Wholesome / Modern",
    traits: "High-res, simple text-box overlay",
    appLabel: "Wholesome / Modern",
  },
] as const;

export type MemeSpectrumId = (typeof MEME_SPECTRUM)[number]["id"];

// Template-to-format mapping (for meme generator)
export const TEMPLATE_FORMAT_MAP: Record<string, FormatTagId> = {
  "Drake pointing (approve / reject)": "object_labeling",
  "Distracted boyfriend": "object_labeling",
  "Two buttons / This is fine": "image_macro",
  "Change my mind": "screencap",
  "Expanding brain": "multi_panel",
  "Bernie Sanders mittens": "screencap",
  "Woman yelling at cat": "object_labeling",
  "Success kid": "image_macro",
  "One does not simply": "image_macro",
  "This is fine": "image_macro",
  "Left/Right panel": "multi_panel",
};
