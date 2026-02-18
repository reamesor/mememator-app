"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { kols, politicalFigures, wellKnownPeople, memeAnimals, memeSymbols, hotTopics, memecoinTrends } from "@/lib/mockData";
import { useForgeDraft } from "@/context/ForgeDraftContext";
import { useCreationHistory } from "@/context/CreationHistoryContext";
import { useMate } from "@/context/MateContext";
import BurnConfirmModal from "@/components/ui/BurnConfirmModal";
import type { MemeSubject, MemeSubjectCategory, CryptoSentiment } from "@/lib/types";
import {
  VISUAL_STYLE_TAGS,
  FORMAT_TAGS,
  MEME_SPECTRUM,
  TEMPLATE_FORMAT_MAP,
} from "@/lib/memeSchema";
import type { VisualStyleTagId, MemeSpectrumId } from "@/lib/memeSchema";
import { drawMemeTemplateArt } from "@/lib/memeArt";
import type { MemeTemplateId } from "@/lib/memeArt";

const templates = [
  "Drake pointing (approve / reject)",
  "Distracted boyfriend",
  "Two buttons / This is fine",
  "Change my mind",
  "Expanding brain",
  "Bernie Sanders mittens",
  "Woman yelling at cat",
  "Success kid",
  "One does not simply",
  "This is fine",
  "Left/Right panel",
] as const;

type TemplateId = (typeof templates)[number];

const BACKGROUNDS = [
  { id: "dark", label: "Dark void" },
  { id: "solana", label: "Solana" },
  { id: "chart_green", label: "Chart green" },
  { id: "pump_fun", label: "Pump.fun" },
  { id: "cyber_noir", label: "Cyber noir" },
  { id: "rug_red", label: "Rug red" },
  { id: "sunset_pump", label: "Sunset pump" },
  { id: "neon_mesh", label: "Neon mesh" },
  { id: "ocean_depth", label: "Ocean depth" },
  { id: "aurora", label: "Aurora" },
  { id: "gold_rush", label: "Gold rush" },
  { id: "gradient_chaos", label: "Gradient chaos" },
  { id: "upload", label: "Upload your own" },
] as const;

const CAPTION_PRESETS = [
  "When the chart does the thing and you're still holding",
  "POV: You aped after the KOL said 'this is the one'",
  "Reject utility. Embrace bonding curve.",
  "It's not a rug. It's a 'correction'.",
  "1 SOL to launch. Infinite dreams to lose.",
  "We're not early. We're not late. We're unhinged.",
  "NFA but we're not selling",
  "Diamond hands till zero or hero",
  "Ser. This is fine.",
  "Virgin: sells at ATH. Chad: buys the dip.",
  "Aping at 3am hits different",
  "LP burned. Community based. Chart doing chart things.",
  "When you explain your bags to a normie",
  "The only roadmap is up. Or down. No one knows.",
  "GM. We're so back.",
  "Paper hands sold. I'm still here.",
  "Touch grass? Building on Solana.",
  "WAGMI. Probably.",
  "Dev: No utility. Community: So based.",
];

const TOP_TEXT_PRESETS = ["Reading the whitepaper", "Selling at the top", "Caring about fundamentals", "Asking for alpha", "Paper hands", "Reject degen"];

const BOTTOM_TEXT_PRESETS = ["Ape in anyway", "Buy the dip", "Just vibes", "NFA but sending it", "Diamond hands", "Embrace chaos"];

function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  bgId: string,
  bgImageRef?: React.RefObject<HTMLImageElement | null>
) {
  if (bgId === "upload" && bgImageRef?.current?.complete && bgImageRef.current.naturalWidth) {
    ctx.drawImage(bgImageRef.current, 0, 0, w, h);
    return;
  }

  const g = ctx.createLinearGradient(0, 0, 0, h);
  switch (bgId) {
    case "solana":
      g.addColorStop(0, "#9945FF");
      g.addColorStop(0.4, "#14F195");
      g.addColorStop(1, "#0d0d14");
      break;
    case "chart_green":
      g.addColorStop(0, "#0d0d14");
      g.addColorStop(0.4, "#166534");
      g.addColorStop(1, "#15803d");
      break;
    case "pump_fun":
      g.addColorStop(0, "#14532d");
      g.addColorStop(0.3, "#166534");
      g.addColorStop(1, "#0d0d14");
      break;
    case "cyber_noir":
      g.addColorStop(0, "#0f172a");
      g.addColorStop(0.5, "#1e293b");
      g.addColorStop(1, "#0d0d14");
      break;
    case "rug_red":
      g.addColorStop(0, "#450a0a");
      g.addColorStop(0.4, "#7f1d1d");
      g.addColorStop(1, "#0d0d14");
      break;
    case "sunset_pump":
      g.addColorStop(0, "#1a0a2e");
      g.addColorStop(0.3, "#7c2d12");
      g.addColorStop(0.6, "#ea580c");
      g.addColorStop(1, "#0d0d14");
      break;
    case "neon_mesh":
      g.addColorStop(0, "#1e1b4b");
      g.addColorStop(0.4, "#312e81");
      g.addColorStop(0.7, "#4c1d95");
      g.addColorStop(1, "#0d0d14");
      break;
    case "ocean_depth":
      g.addColorStop(0, "#0c4a6e");
      g.addColorStop(0.4, "#0369a1");
      g.addColorStop(0.7, "#0e7490");
      g.addColorStop(1, "#0d0d14");
      break;
    case "aurora":
      g.addColorStop(0, "#052e16");
      g.addColorStop(0.3, "#14532d");
      g.addColorStop(0.5, "#064e3b");
      g.addColorStop(0.8, "#134e4a");
      g.addColorStop(1, "#0d0d14");
      break;
    case "gold_rush":
      g.addColorStop(0, "#1c1917");
      g.addColorStop(0.3, "#422006");
      g.addColorStop(0.6, "#a16207");
      g.addColorStop(1, "#0d0d14");
      break;
    case "gradient_chaos":
      g.addColorStop(0, "#7c2d12");
      g.addColorStop(0.3, "#ea580c");
      g.addColorStop(0.5, "#4c1d95");
      g.addColorStop(0.8, "#0369a1");
      g.addColorStop(1, "#0d0d14");
      break;
    default:
      ctx.fillStyle = "#0d0d14";
      ctx.fillRect(0, 0, w, h);
      return;
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

const TRENDING_OPTIONS = [
  ...hotTopics.slice(0, 6).map((t) => ({ type: "hot" as const, id: t.id, label: t.title.slice(0, 36) + (t.title.length > 36 ? "…" : ""), faceIndex: (parseInt(t.id, 10) % 11) + 1 })),
  ...memecoinTrends.slice(0, 6).map((m, i) => ({ type: "memecoin" as const, id: m.id, label: `${m.symbol} — ${m.theme}`, faceIndex: (i % 11) + 1 })),
];

const TEXT_POSITIONS = [
  { id: "left", label: "Left", align: "left" as const },
  { id: "center", label: "Center", align: "center" as const },
  { id: "right", label: "Right", align: "right" as const },
] as const;

const MEME_FONTS = [
  { id: "impact", label: "Impact", font: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' },
  { id: "arial_black", label: "Arial Black", font: '"Arial Black", Arial, sans-serif' },
  { id: "comic", label: "Comic Sans", font: '"Comic Sans MS", cursive' },
  { id: "georgia", label: "Georgia", font: "Georgia, serif" },
  { id: "verdana", label: "Verdana", font: "Verdana, sans-serif" },
  { id: "trebuchet", label: "Trebuchet", font: '"Trebuchet MS", sans-serif' },
] as const;

/** Two-panel = top (reject/bad) + bottom (approve/good). One-panel = single caption. */
const TEMPLATE_LAYOUT: Record<TemplateId, "two_panel" | "one_panel"> = {
  "Drake pointing (approve / reject)": "two_panel",
  "Distracted boyfriend": "two_panel",
  "Two buttons / This is fine": "two_panel",
  "Change my mind": "one_panel",
  "Expanding brain": "one_panel",
  "Bernie Sanders mittens": "one_panel",
  "Woman yelling at cat": "two_panel",
  "Success kid": "two_panel",
  "One does not simply": "two_panel",
  "This is fine": "two_panel",
  "Left/Right panel": "two_panel",
};

function getSubjectName(subject: MemeSubject): string {
  if (subject.category === "kol") return kols.find((k) => k.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "politics") return politicalFigures.find((p) => p.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "well_known") return wellKnownPeople.find((w) => w.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "animals") return memeAnimals.find((a) => a.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "symbols") return memeSymbols.find((s) => s.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "custom") return "My image";
  return "Unknown";
}

function getSubjectQuote(subject: MemeSubject): string | undefined {
  if (subject.category === "kol") return kols.find((k) => k.id === subject.id)?.sampleQuote;
  if (subject.category === "politics") return politicalFigures.find((p) => p.id === subject.id)?.sampleQuote;
  if (subject.category === "well_known") return wellKnownPeople.find((w) => w.id === subject.id)?.sampleQuote;
  if (subject.category === "animals") return memeAnimals.find((a) => a.id === subject.id)?.suggestedCaption;
  if (subject.category === "symbols") return memeSymbols.find((s) => s.id === subject.id)?.suggestedCaption;
  if (subject.category === "custom") return "Add your caption below";
  return undefined;
}

function getSuggestedCaption(subject: MemeSubject): string {
  if (subject.category === "custom") return "Reject normie takes | Embrace your meme";
  if (subject.category === "animals") return memeAnimals.find((a) => a.id === subject.id)?.suggestedCaption ?? "Animal meme";
  if (subject.category === "symbols") return memeSymbols.find((s) => s.id === subject.id)?.suggestedCaption ?? "Vibes";
  const name = getSubjectName(subject);
  if (subject.category === "kol") return `When ${name} says it's early but you already aped in and now you're -80%`;
  if (subject.category === "politics") return `POV: ${name} just announced a crypto policy. CT doesn't know whether to ape or leave the country`;
  const person = wellKnownPeople.find((w) => w.id === subject.id);
  if (person?.cryptoSentiment === "loved") return `When ${name} tweets one word and your bags 10x`;
  return `When ${name} appears on the timeline and your portfolio has a panic attack`;
}

type MemeExportAction = "download" | "copy" | "send";

export default function KOLSection() {
  const router = useRouter();
  const { setMemeDraft } = useForgeDraft();
  const { addMeme } = useCreationHistory();
  const { burnFeeMeme, burnForMeme, canAffordMeme } = useMate();
  const [memeBurnModalOpen, setMemeBurnModalOpen] = useState(false);
  const [pendingMemeAction, setPendingMemeAction] = useState<MemeExportAction | null>(null);
  const [subjectType, setSubjectType] = useState<MemeSubjectCategory>("kol");
  const [searchInput, setSearchInput] = useState("");
  const [twitterLinkInput, setTwitterLinkInput] = useState("");
  const [twitterSuggestion, setTwitterSuggestion] = useState<{
    handle: string;
    category: string;
    categoryReason?: string;
    memePotential: string;
    memeIdeas: string[];
    suggestedTemplates: string[];
  } | null>(null);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [twitterError, setTwitterError] = useState<string | null>(null);
  const [wellKnownFilter, setWellKnownFilter] = useState<CryptoSentiment | "all">("all");
  const [controversialOnly, setControversialOnly] = useState(false);
  const [subject, setSubject] = useState<MemeSubject | null>(null);
  const [memeTemplate, setMemeTemplate] = useState<string>(templates[0]);
  const [visualStyle, setVisualStyle] = useState<VisualStyleTagId>("minimalist");
  const [vibe, setVibe] = useState<MemeSpectrumId>("shitpost_chaotic");
  const [capybaraOverlay, setCapybaraOverlay] = useState<number | null>(null);
  const capybaraImagesRef = useRef<Record<number, HTMLImageElement>>({});
  const [backgroundId, setBackgroundId] = useState<string>("dark");
  const [backgroundUpload, setBackgroundUpload] = useState<string | null>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const [mainCharacterMode, setMainCharacterMode] = useState<"template" | "capybara" | "upload" | "trending">("template");
  const [mainCharacterCapybara, setMainCharacterCapybara] = useState<number>(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [trendingOption, setTrendingOption] = useState<{ type: "hot" | "memecoin"; id: string } | null>(null);
  const [topTextPosition, setTopTextPosition] = useState<"left" | "center" | "right">("center");
  const [bottomTextPosition, setBottomTextPosition] = useState<"left" | "center" | "right">("center");
  const [captionPosition, setCaptionPosition] = useState<"left" | "center" | "right">("center");
  const [fontId, setFontId] = useState<string>("impact");

  const formatTag = TEMPLATE_FORMAT_MAP[memeTemplate] ?? "image_macro";
  const formatLabel = FORMAT_TAGS.find((f) => f.id === formatTag)?.label ?? formatTag;

  const suggestedCaption = subject ? getSuggestedCaption(subject) : "";
  const [customCaption, setCustomCaption] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const layout = TEMPLATE_LAYOUT[memeTemplate as TemplateId] ?? "one_panel";

  useEffect(() => {
    if (subject) {
      const cap = getSuggestedCaption(subject);
      setCustomCaption(cap);
      if (layout === "two_panel") {
        const parts = cap.split(/\s*\|\s*/);
        setTopText(parts[0]?.trim() || "Reject / Bad take");
        setBottomText(parts[1]?.trim() || "Ape in anyway");
      }
    }
  }, [subject]);

  useEffect(() => {
    if (subject && layout === "two_panel") {
      const cap = customCaption.trim() || suggestedCaption;
      const parts = cap.split(/\s*\|\s*/);
      setTopText(parts[0]?.trim() || "Reject / Bad take");
      setBottomText(parts[1]?.trim() || "Ape in anyway");
    }
  }, [memeTemplate]);

  const captionToUse = customCaption.trim() || (subject ? getSuggestedCaption(subject) : "");
  const topToUse = topText.trim() || "Reject / Bad";
  const bottomToUse = bottomText.trim() || "Approve / Good";

  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, font: string): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    ctx.font = font;
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      const m = ctx.measureText(test);
      if (m.width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else current = test;
    }
    if (current) lines.push(current);
    return lines;
  }

  function drawMemeText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    fontSize: number,
    fontFamily: string,
    align: "left" | "center" | "right"
  ) {
    const font = `bold ${fontSize}px ${fontFamily}`;
    const lines = wrapText(ctx, text.toUpperCase(), maxWidth, font);
    const lineHeight = fontSize * 1.15;
    const startY = y - (lines.length - 1) * (lineHeight / 2);
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    const stroke = Math.max(2, Math.floor(fontSize / 16));
    lines.forEach((line, i) => {
      const ly = startY + i * lineHeight;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = stroke;
      ctx.strokeText(line, x, ly);
      ctx.fillStyle = "#fff";
      ctx.fillText(line, x, ly);
    });
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
  }

  function getTextX(w: number, align: "left" | "center" | "right"): number {
    const pad = 24;
    if (align === "left") return pad;
    if (align === "right") return w - pad;
    return w / 2;
  }

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas || !subject) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 640;
    const h = 480;
    canvas.width = w;
    canvas.height = h;

    const isTwoPanel = layout === "two_panel";
    const panelH = isTwoPanel ? h / 2 : h;

    // 1. Background
    drawBackground(ctx, w, h, backgroundId, backgroundImageRef);

    // 2. Main character
    const drawCustomCharacter = (img: HTMLImageElement | null, size: number) => {
      if (!img?.complete || !img.naturalWidth) return;
      const x = w / 2 - size / 2;
      const y = isTwoPanel ? panelH / 2 - size / 2 : h / 2 - size / 2 - 40;
      ctx.drawImage(img, x, y, size, size);
    };

    if (mainCharacterMode === "template") {
      drawMemeTemplateArt(ctx, memeTemplate as MemeTemplateId, w, h);
    } else if (mainCharacterMode === "capybara") {
      const img = capybaraImagesRef.current[mainCharacterCapybara];
      if (!img) {
        const nextImg = new Image();
        nextImg.src = `/capybara-faces/capybara-${mainCharacterCapybara}.png`;
        nextImg.onload = () => {
          capybaraImagesRef.current[mainCharacterCapybara] = nextImg;
          drawMeme();
        };
      } else {
        drawCustomCharacter(img, 220);
      }
    } else if (mainCharacterMode === "upload" && uploadedImage) {
      const img = new Image();
      img.src = uploadedImage;
      if (img.complete && img.naturalWidth) {
        const size = Math.min(280, w * 0.6, h * 0.5);
        const x = w / 2 - size / 2;
        const y = isTwoPanel ? panelH / 2 - size / 2 : h / 2 - size / 2 - 30;
        ctx.drawImage(img, x, y, size, size);
      } else {
        img.onload = () => drawMeme();
      }
    } else if (mainCharacterMode === "trending" && trendingOption) {
      const opt = TRENDING_OPTIONS.find((o) => o.type === trendingOption.type && o.id === trendingOption.id);
      const faceIdx = opt?.faceIndex ?? 1;
      const img = capybaraImagesRef.current[faceIdx];
      if (!img) {
        const nextImg = new Image();
        nextImg.src = `/capybara-faces/capybara-${faceIdx}.png`;
        nextImg.onload = () => {
          capybaraImagesRef.current[faceIdx] = nextImg;
          drawMeme();
        };
      } else {
        drawCustomCharacter(img, 200);
      }
    } else {
      drawMemeTemplateArt(ctx, memeTemplate as MemeTemplateId, w, h);
    }

    const padding = 24;
    const maxTextWidth = w - padding * 2;
    const bigFont = 42;
    const smallFont = 28;
    const fontFamily = MEME_FONTS.find((f) => f.id === fontId)?.font ?? MEME_FONTS[0].font;

    if (isTwoPanel) {
      drawMemeText(ctx, topToUse, getTextX(w, topTextPosition), panelH * 0.5, maxTextWidth, bigFont, fontFamily, topTextPosition);
      drawMemeText(ctx, bottomToUse, getTextX(w, bottomTextPosition), panelH + panelH * 0.5, maxTextWidth, bigFont, fontFamily, bottomTextPosition);
    } else {
      drawMemeText(ctx, captionToUse || "Your caption here", getTextX(w, captionPosition), h / 2, maxTextWidth, smallFont, fontFamily, captionPosition);
    }

    // $MATE Capybara overlay (bottom-right, above watermark)
    if (capybaraOverlay != null && capybaraOverlay >= 1 && capybaraOverlay <= 11) {
      const img = capybaraImagesRef.current[capybaraOverlay];
      if (img?.complete && img.naturalWidth) {
        const size = 72;
        const x = w - size - 12;
        const y = h - 32 - size - 8;
        ctx.drawImage(img, x, y, size, size);
      } else if (!img) {
        const nextImg = new Image();
        nextImg.src = `/capybara-faces/capybara-${capybaraOverlay}.png`;
        nextImg.onload = () => {
          capybaraImagesRef.current[capybaraOverlay] = nextImg;
          drawMeme();
        };
      }
    }

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, h - 32, w, 32);
    ctx.fillStyle = "#64748b";
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`Mememator $MATE · ${getSubjectName(subject)}`, 12, h - 16);
    ctx.textAlign = "center";
  };

  useEffect(() => {
    if (subject && (layout === "one_panel" ? captionToUse : true)) drawMeme();
  }, [subject, captionToUse, topToUse, bottomToUse, memeTemplate, visualStyle, vibe, layout, capybaraOverlay, backgroundId, mainCharacterMode, mainCharacterCapybara, uploadedImage, trendingOption, backgroundUpload, topTextPosition, bottomTextPosition, captionPosition, fontId]);

  const doDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !subject) return;
    drawMeme();
    const name = getSubjectName(subject).replace(/\s+/g, "-");
    const a = document.createElement("a");
    a.download = `mememator-${name}-${Date.now()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  const doCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !subject) return;
    drawMeme();
    try {
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
      if (blob) await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    } catch {
      // fallback: some browsers don't support clipboard image
    }
  };

  const doSendToForge = () => {
    const canvas = canvasRef.current;
    if (!canvas || !subject) return;
    drawMeme();
    const imageDataUrl = canvas.toDataURL("image/png");
    const caption =
      layout === "two_panel"
        ? [topToUse, bottomToUse].filter(Boolean).join(" | ")
        : captionToUse;
    const subjectName = getSubjectName(subject);
    setMemeDraft({
      imageDataUrl,
      templateName: memeTemplate,
      topText: layout === "two_panel" ? topToUse : undefined,
      bottomText: layout === "two_panel" ? bottomToUse : undefined,
      caption: caption || undefined,
      subjectName,
    });
    addMeme({ imageDataUrl, caption: caption || undefined, tokenName: subjectName });
    router.push("/forge");
  };

  const requestMemeExport = (action: MemeExportAction) => {
    if (!canAffordMeme) return; // Buttons are disabled when !canAffordMeme
    setPendingMemeAction(action);
    setMemeBurnModalOpen(true);
  };

  const handleMemeBurnConfirm = () => {
    if (!pendingMemeAction) return;
    burnForMeme();
    if (pendingMemeAction === "download") doDownload();
    else if (pendingMemeAction === "copy") doCopyImage();
    else if (pendingMemeAction === "send") doSendToForge();
    setPendingMemeAction(null);
  };

  const handleDownload = () => requestMemeExport("download");
  const handleCopyImage = () => requestMemeExport("copy");
  const handleSendToForge = () => requestMemeExport("send");

  const filteredWellKnown = wellKnownPeople
    .filter((w) => (wellKnownFilter === "all" ? true : w.cryptoSentiment === wellKnownFilter))
    .filter((w) => (!controversialOnly ? true : w.controversial === true));

  const handleSelectSubject = (category: MemeSubjectCategory, id: string) => {
    setSubject({ category, id });
  };

  const handleAnalyzeTwitter = async () => {
    const input = twitterLinkInput.trim();
    if (!input) return;
    setTwitterLoading(true);
    setTwitterError(null);
    setTwitterSuggestion(null);
    try {
      const res = await fetch("/api/suggest-meme-from-twitter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twitterLink: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setTwitterSuggestion({
        handle: data.handle,
        category: data.category,
        categoryReason: data.categoryReason,
        memePotential: data.memePotential,
        memeIdeas: data.memeIdeas ?? [],
        suggestedTemplates: data.suggestedTemplates ?? [],
      });
    } catch (e) {
      setTwitterError(e instanceof Error ? e.message : "Could not analyze. Try again.");
    } finally {
      setTwitterLoading(false);
    }
  };

  // Unified search: flatten all subjects for cross-category search
  const searchQuery = searchInput.trim().toLowerCase();
  const allSubjects: Array<{
    category: MemeSubjectCategory;
    categoryLabel: string;
    id: string;
    name: string;
    searchable: string;
    quality: "Great pick" | "Solid" | "Classic";
    nicheOrTheme?: string;
    handle?: string;
    followers?: string;
    sampleQuote?: string;
    suggestedCaption?: string;
    role?: string;
  }> = [
    ...kols.map((k) => ({
      category: "kol" as const,
      categoryLabel: "KOL",
      id: k.id,
      name: k.name,
      searchable: `${k.name} ${k.handle} ${k.niche} ${k.sampleQuote ?? ""}`.toLowerCase(),
      quality: (k.memePotential === "Unhinged" ? "Great pick" : "Solid") as "Great pick" | "Solid",
      nicheOrTheme: k.niche,
      handle: k.handle,
      followers: k.followers,
      sampleQuote: k.sampleQuote,
    })),
    ...politicalFigures.map((p) => ({
      category: "politics" as const,
      categoryLabel: "Politics",
      id: p.id,
      name: p.name,
      searchable: `${p.name} ${p.handle ?? ""} ${p.role} ${p.sampleQuote ?? ""}`.toLowerCase(),
      quality: (p.memePotential === "Very High" ? "Great pick" : "Solid") as "Great pick" | "Solid",
      nicheOrTheme: p.role,
      handle: p.handle,
      sampleQuote: p.sampleQuote,
    })),
    ...filteredWellKnown.map((w) => ({
      category: "well_known" as const,
      categoryLabel: "Well-known",
      id: w.id,
      name: w.name,
      searchable: `${w.name} ${w.handle ?? ""} ${w.role} ${w.sampleQuote ?? ""} ${w.cryptoSentiment}`.toLowerCase(),
      quality: (w.memePotential === "Very High" ? "Great pick" : "Solid") as "Great pick" | "Solid",
      nicheOrTheme: w.role,
      handle: w.handle,
      sampleQuote: w.sampleQuote,
    })),
    ...memeAnimals.map((a) => ({
      category: "animals" as const,
      categoryLabel: "Animal",
      id: a.id,
      name: a.name,
      searchable: `${a.name} ${a.theme} ${a.suggestedCaption}`.toLowerCase(),
      quality: "Classic" as const,
      nicheOrTheme: a.theme,
      suggestedCaption: a.suggestedCaption,
    })),
    ...memeSymbols.map((s) => ({
      category: "symbols" as const,
      categoryLabel: "Symbol",
      id: s.id,
      name: s.name,
      searchable: `${s.name} ${s.theme} ${s.suggestedCaption}`.toLowerCase(),
      quality: "Classic" as const,
      nicheOrTheme: s.theme,
      suggestedCaption: s.suggestedCaption,
    })),
    { category: "custom" as const, categoryLabel: "Custom", id: "upload", name: "Your image", searchable: "custom your image upload", quality: "Classic" as const, nicheOrTheme: "Upload your own", suggestedCaption: "Add your caption" },
  ];

  const searchResults = searchQuery
    ? allSubjects.filter((s) => s.searchable.includes(searchQuery))
    : [];

  return (
    <section id="kols" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Meme Generator — Create content that hits
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          KOLs, politicians, animals, and symbols. Pick a vibe, choose a template, add your text. Download or copy, then use for token launches and CT.
        </p>

        <div className="mb-4">
          <div className="relative">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, handle, niche, theme..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 pl-9 text-sm text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              aria-label="Search meme templates"
            />
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchInput && (
            <p className="mt-1.5 text-[10px] text-zinc-500">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} — category & meme potential shown on each card
            </p>
          )}
        </div>

        <div className="mb-4 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
          <p className="mb-2 text-[10px] font-medium uppercase text-zinc-500">
            Or paste a Twitter/X link
          </p>
          <p className="mb-2 text-[10px] text-zinc-500">
            Mememator analyzes the account and suggests: category, meme potential, and concrete meme ideas.
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={twitterLinkInput}
              onChange={(e) => { setTwitterLinkInput(e.target.value); setTwitterError(null); }}
              placeholder="twitter.com/username or @handle"
              className="min-w-[200px] flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              aria-label="Twitter URL or handle"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyzeTwitter()}
            />
            <button
              type="button"
              onClick={handleAnalyzeTwitter}
              disabled={twitterLoading}
              className="rounded-lg bg-cyan-500/20 px-4 py-2 text-xs font-medium text-cyan-400 transition hover:bg-cyan-500/30 disabled:opacity-50"
            >
              {twitterLoading ? "Analyzing…" : "Analyze"}
            </button>
          </div>
          {twitterError && (
            <p className="mt-2 text-[10px] text-red-400">{twitterError}</p>
          )}
          {twitterSuggestion && (
            <div className="mt-3 space-y-2 rounded border border-cyan-500/20 bg-cyan-500/5 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://twitter.com/${twitterSuggestion.handle.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-cyan-400 hover:underline"
                >
                  {twitterSuggestion.handle}
                </a>
                <span className="rounded-full bg-zinc-700 px-1.5 py-0.5 text-[9px] text-zinc-400">
                  {twitterSuggestion.category}
                </span>
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                  twitterSuggestion.memePotential === "Great pick" ? "bg-cyan-500/20 text-cyan-400" : "bg-amber-500/20 text-amber-400"
                }`}>
                  {twitterSuggestion.memePotential}
                </span>
              </div>
              {twitterSuggestion.categoryReason && (
                <p className="text-[10px] text-zinc-400">{twitterSuggestion.categoryReason}</p>
              )}
              {twitterSuggestion.suggestedTemplates?.length > 0 && (
                <p className="text-[10px] text-zinc-500">
                  Suggested templates: {twitterSuggestion.suggestedTemplates.join(", ")}
                </p>
              )}
              <div className="pt-2">
                <p className="mb-1.5 text-[10px] font-medium text-zinc-400">Meme ideas — copy & use</p>
                <div className="space-y-1.5">
                  {twitterSuggestion.memeIdeas.map((idea, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <p className="flex-1 rounded border border-zinc-700 bg-zinc-800/80 px-2 py-1.5 text-[10px] italic text-zinc-300">
                        {idea}
                      </p>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(idea)}
                        className="shrink-0 rounded border border-zinc-600 px-2 py-1 text-[9px] text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {(
            [
              { value: "kol" as const, label: "KOLs" },
              { value: "politics" as const, label: "Politics" },
              { value: "well_known" as const, label: "Well-known" },
              { value: "animals" as const, label: "Animals" },
              { value: "symbols" as const, label: "Symbols" },
              { value: "custom" as const, label: "Your image" },
            ] as const
          ).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSubjectType(value)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                subjectType === value ? "bg-cyan-500 text-zinc-950" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {subjectType === "well_known" && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs text-zinc-500">In crypto:</span>
              {(["all", "loved", "hated"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setWellKnownFilter(f)}
                  className={`rounded-full px-2 py-1 text-xs ${
                    wellKnownFilter === f
                      ? f === "loved"
                        ? "bg-green-500/30 text-green-400"
                        : f === "hated"
                          ? "bg-red-500/30 text-red-400"
                          : "bg-zinc-600 text-zinc-200"
                      : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
                  }`}
                >
                  {f === "all" ? "All" : f === "loved" ? "Loved" : "Hated"}
                </button>
              ))}
            </div>
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-400">
              <input
                type="checkbox"
                checked={controversialOnly}
                onChange={(e) => setControversialOnly(e.target.checked)}
                className="rounded border-zinc-600 bg-zinc-800 text-amber-500"
              />
              Controversial only
            </label>
          </div>
        )}

        {searchQuery ? (
          <div className="space-y-4">
            {searchResults.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((s) => (
                  <div
                    key={`${s.category}-${s.id}`}
                    className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
                  >
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1.5">
                      <span className="text-sm font-semibold text-zinc-100">{s.name}</span>
                      <div className="flex flex-wrap gap-1">
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                            s.quality === "Great pick"
                              ? "bg-cyan-500/20 text-cyan-400"
                              : s.quality === "Solid"
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-emerald-500/20 text-emerald-400"
                          }`}
                        >
                          {s.quality}
                        </span>
                        <span className="rounded-full bg-zinc-700 px-1.5 py-0.5 text-[9px] text-zinc-400">
                          {s.categoryLabel}
                        </span>
                      </div>
                    </div>
                    {s.handle && (
                      <a
                        href={`https://twitter.com/${s.handle.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-1 block text-xs text-cyan-400 hover:underline"
                      >
                        {s.handle}
                      </a>
                    )}
                    {s.nicheOrTheme && (
                      <p className="mb-1 text-xs text-zinc-500">
                        {s.category === "kol" || s.category === "politics" || s.category === "well_known"
                          ? `Niche/role: ${s.nicheOrTheme}`
                          : `Theme: ${s.nicheOrTheme}`}
                      </p>
                    )}
                    {s.followers && <p className="mb-1 text-[10px] text-zinc-600">Followers: {s.followers}</p>}
                    {(s.sampleQuote || s.suggestedCaption) && (
                      <p className="mb-2 line-clamp-2 rounded border-l-2 border-zinc-600 bg-zinc-800/50 px-2 py-1 text-[10px] italic text-zinc-400">
                        &ldquo;{s.sampleQuote ?? s.suggestedCaption}&rdquo;
                      </p>
                    )}
                    <button
                      onClick={() => {
                        setSubjectType(s.category);
                        handleSelectSubject(s.category, s.id);
                      }}
                      className="w-full rounded-lg bg-cyan-500/20 py-1.5 text-xs font-medium text-cyan-400 transition hover:bg-cyan-500/30"
                    >
                      Generate Meme
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-6 text-center text-sm text-zinc-500">
                No templates match &ldquo;{searchInput}&rdquo;. Try another term or browse by category below.
              </p>
            )}
          </div>
        ) : (
          <>
        {subjectType === "kol" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kols.map((k) => (
              <div
                key={k.id}
                className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-sm font-semibold text-zinc-100">{k.name}</span>
                  <div className="flex flex-wrap gap-1">
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${k.memePotential === "Unhinged" ? "bg-cyan-500/20 text-cyan-400" : "bg-amber-500/20 text-amber-400"}`}>
                      {k.memePotential === "Unhinged" ? "Great pick" : "Solid"}
                    </span>
                    <span className="rounded-full bg-zinc-700 px-1.5 py-0.5 text-[9px] text-zinc-400">KOL</span>
                  </div>
                </div>
                <a
                  href={`https://twitter.com/${k.handle.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-1 block text-xs text-cyan-400 hover:underline"
                >
                  {k.handle}
                </a>
                <p className="mb-1 text-xs text-zinc-500">Niche: {k.niche}</p>
                <p className="mb-2 text-[10px] text-zinc-600">Followers: {k.followers}</p>
                {k.sampleQuote && (
                  <p className="mb-2 rounded border-l-2 border-cyan-500/50 bg-zinc-800/50 px-2 py-1.5 text-xs italic text-zinc-400">
                    &ldquo;{k.sampleQuote}&rdquo;
                  </p>
                )}
                <button
                  onClick={() => handleSelectSubject("kol", k.id)}
                  className="w-full rounded-lg bg-cyan-500/20 py-1.5 text-xs font-medium text-cyan-400 transition hover:bg-cyan-500/30"
                >
                  Generate Meme
                </button>
              </div>
            ))}
          </div>
        )}

        {subjectType === "politics" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {politicalFigures.map((p) => (
              <div
                key={p.id}
                className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-sm font-semibold text-zinc-100">{p.name}</span>
                  <div className="flex flex-wrap gap-1">
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${p.memePotential === "Very High" ? "bg-cyan-500/20 text-cyan-400" : "bg-amber-500/20 text-amber-400"}`}>
                      {p.memePotential === "Very High" ? "Great pick" : "Solid"}
                    </span>
                    <span className="rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[9px] text-purple-400">Politics</span>
                  </div>
                </div>
                {p.handle && (
                  <a
                    href={`https://twitter.com/${p.handle.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-1 block text-xs text-cyan-400 hover:underline"
                  >
                    {p.handle}
                  </a>
                )}
                <p className="mb-1 text-xs text-zinc-500">{p.role}</p>
                {p.sampleQuote && (
                  <p className="mb-2 rounded border-l-2 border-purple-500/50 bg-zinc-800/50 px-2 py-1.5 text-xs italic text-zinc-400">
                    &ldquo;{p.sampleQuote}&rdquo;
                  </p>
                )}
                <button
                  onClick={() => handleSelectSubject("politics", p.id)}
                  className="w-full rounded-lg bg-purple-500/20 py-1.5 text-xs font-medium text-purple-400 transition hover:bg-purple-500/30"
                >
                  Generate Meme
                </button>
              </div>
            ))}
          </div>
        )}

        {subjectType === "well_known" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWellKnown.map((w) => (
              <div
                key={w.id}
                className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-zinc-100">{w.name}</span>
                  <div className="flex flex-wrap gap-1">
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${w.memePotential === "Very High" ? "bg-cyan-500/20 text-cyan-400" : "bg-amber-500/20 text-amber-400"}`}>
                      {w.memePotential === "Very High" ? "Great pick" : "Solid"}
                    </span>
                    <span className="rounded-full bg-zinc-700 px-1.5 py-0.5 text-[9px] text-zinc-400">Well-known</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${w.cryptoSentiment === "loved" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {w.cryptoSentiment === "loved" ? "Loved" : "Hated"}
                    </span>
                    {w.controversial && (
                      <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[9px] text-amber-400">Controversial</span>
                    )}
                  </div>
                </div>
                {w.handle && (
                  <a
                    href={`https://twitter.com/${w.handle.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-1 block text-xs text-cyan-400 hover:underline"
                  >
                    {w.handle}
                  </a>
                )}
                <p className="mb-1 text-xs text-zinc-500">{w.role}</p>
                {w.sampleQuote && (
                  <p className="mb-2 rounded border-l-2 border-zinc-500/50 bg-zinc-800/50 px-2 py-1.5 text-xs italic text-zinc-400">
                    &ldquo;{w.sampleQuote}&rdquo;
                  </p>
                )}
                <button
                  onClick={() => handleSelectSubject("well_known", w.id)}
                  className="w-full rounded-lg bg-cyan-500/20 py-1.5 text-xs font-medium text-cyan-400 transition hover:bg-cyan-500/30"
                >
                  Generate Meme
                </button>
              </div>
            ))}
          </div>
        )}

        {subjectType === "animals" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {memeAnimals.map((a) => (
              <div
                key={a.id}
                className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-sm font-semibold text-zinc-100">{a.name}</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-400">Classic</span>
                    <span className="rounded-full bg-zinc-700 px-1.5 py-0.5 text-[9px] text-zinc-400">Animal</span>
                  </div>
                </div>
                <p className="mb-1 text-[10px] text-zinc-500">Theme: {a.theme}</p>
                <p className="mb-2 line-clamp-2 text-[10px] italic text-zinc-500">{a.suggestedCaption}</p>
                <button
                  onClick={() => handleSelectSubject("animals", a.id)}
                  className="w-full rounded-lg bg-emerald-500/20 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/30"
                >
                  Generate Meme
                </button>
              </div>
            ))}
          </div>
        )}

        {subjectType === "symbols" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {memeSymbols.map((s) => (
              <div
                key={s.id}
                className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
              >
                <div className="mb-1 flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-sm font-semibold text-zinc-100">{s.name}</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-400">Classic</span>
                    <span className="rounded-full bg-zinc-700 px-1.5 py-0.5 text-[9px] text-zinc-400">Symbol</span>
                  </div>
                </div>
                <p className="mb-1 text-[10px] text-zinc-500">Theme: {s.theme}</p>
                <p className="mb-2 line-clamp-2 text-[10px] italic text-zinc-500">{s.suggestedCaption}</p>
                <button
                  onClick={() => handleSelectSubject("symbols", s.id)}
                  className="w-full rounded-lg bg-amber-500/20 py-1.5 text-xs font-medium text-amber-400 transition hover:bg-amber-500/30"
                >
                  Generate Meme
                </button>
              </div>
            ))}
          </div>
        )}

        {subjectType === "custom" && (
          <div className="rounded-lg border-2 border-dashed border-cyan-500/40 bg-cyan-500/5 p-6">
            <h3 className="mb-2 font-pixel text-sm font-semibold text-cyan-400">Add your own image</h3>
            <p className="mb-4 font-pixel text-[10px] text-zinc-500">
              Upload any image to use as the main character. Pick a template, add text, then download or send to Forge.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  const url = URL.createObjectURL(f);
                  setUploadedImage(url);
                  setMainCharacterMode("upload");
                  handleSelectSubject("custom", "upload");
                }
              }}
              className="block w-full text-[10px] text-zinc-400 file:mr-2 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-4 file:py-2.5 file:font-pixel file:text-xs file:font-medium file:text-cyan-400 hover:file:bg-cyan-500/30"
            />
            {uploadedImage && (
              <div className="mt-4 flex items-center gap-2">
                <img src={uploadedImage} alt="Your upload" className="h-16 w-16 shrink-0 rounded border border-zinc-700 object-cover" />
                <div>
                  <p className="font-pixel text-[10px] text-zinc-400">Image loaded.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setMainCharacterMode("upload");
                      handleSelectSubject("custom", "upload");
                    }}
                    className="mt-1 font-pixel text-[10px] text-cyan-400 hover:underline"
                  >
                    Generate meme below →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
          </>
        )}

        {subject && (
          <div className="mt-6 rounded-lg border border-cyan-500/30 bg-zinc-900/80 p-4 glow-cyan">
            <h3 className="mb-3 text-sm font-semibold text-zinc-100">
              Meme generator: {getSubjectName(subject)}
            </h3>
            <p className="mb-3 text-xs text-zinc-500">
              {subject.category === "kol" && "KOL — use their vibe for your meme."}
              {subject.category === "politics" && "Political figure — trending, controversial, meme gold."}
              {subject.category === "well_known" && "Well-known — loved or hated in crypto. You know what to do."}
              {subject.category === "animals" && "Animal / creature — classic and crypto meme animals. Edit the caption below."}
              {subject.category === "symbols" && "Symbol / vibe — rocket, moon, diamond hands, etc. Edit the caption below."}
              {getSubjectQuote(subject) && (
                <span className="mt-2 block italic text-zinc-400">
                  &ldquo;{getSubjectQuote(subject)}&rdquo;
                </span>
              )}
            </p>

            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Background</label>
              <div className="flex flex-wrap gap-2">
                {BACKGROUNDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBackgroundId(b.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                      backgroundId === b.id
                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-400"
                        : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              {backgroundId === "upload" && (
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        const url = URL.createObjectURL(f);
                        const img = new Image();
                        img.onload = () => {
                          backgroundImageRef.current = img;
                          setBackgroundUpload(url);
                        };
                        img.src = url;
                      }
                    }}
                    className="block w-full max-w-xs text-xs text-zinc-400 file:mr-2 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-3 file:py-2 file:text-xs file:font-medium file:text-cyan-400 hover:file:bg-cyan-500/30"
                  />
                  {backgroundUpload && (
                    <button
                      type="button"
                      onClick={() => {
                        if (backgroundImageRef.current?.src) URL.revokeObjectURL(backgroundImageRef.current.src);
                        backgroundImageRef.current = null;
                        setBackgroundUpload(null);
                      }}
                      className="mt-1 text-[10px] text-zinc-500 hover:text-cyan-400"
                    >
                      Clear upload
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Images — Main character</label>
              <div className="flex flex-wrap gap-2">
                {(["template", "capybara", "upload", "trending"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setMainCharacterMode(mode)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                      mainCharacterMode === mode
                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-400"
                        : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                    }`}
                  >
                    {mode === "template" && "Template"}
                    {mode === "capybara" && "Commander MATE"}
                    {mode === "upload" && "Upload photo"}
                    {mode === "trending" && "From trends"}
                  </button>
                ))}
              </div>
              {mainCharacterMode === "capybara" && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setMainCharacterCapybara(n)}
                      className={`h-9 w-9 overflow-hidden rounded-lg border transition ${
                        mainCharacterCapybara === n ? "border-cyan-500 ring-1 ring-cyan-500/50" : "border-zinc-600 hover:border-zinc-500"
                      }`}
                    >
                      <img src={`/capybara-faces/capybara-${n}.png`} alt={`${n}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {mainCharacterMode === "upload" && (
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        const url = URL.createObjectURL(f);
                        setUploadedImage(url);
                      }
                    }}
                    className="block w-full max-w-xs text-xs text-zinc-400 file:mr-2 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-3 file:py-2 file:text-xs file:font-medium file:text-cyan-400 hover:file:bg-cyan-500/30"
                  />
                  {uploadedImage && (
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="mt-1 text-[10px] text-zinc-500 hover:text-cyan-400"
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
              {mainCharacterMode === "trending" && (
                <div className="mt-2 max-h-32 overflow-y-auto">
                  <p className="mb-1.5 text-[10px] text-zinc-500">Solana / Twitter trends — pick one</p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_OPTIONS.map((o) => (
                      <button
                        key={`${o.type}-${o.id}`}
                        type="button"
                        onClick={() => setTrendingOption({ type: o.type, id: o.id })}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-left text-[10px] transition ${
                          trendingOption?.type === o.type && trendingOption?.id === o.id
                            ? "border-cyan-500 bg-cyan-500/20 text-cyan-400"
                            : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                        }`}
                      >
                        <img
                          src={`/capybara-faces/capybara-${o.faceIndex}.png`}
                          alt=""
                          className="h-6 w-6 shrink-0 rounded object-cover"
                        />
                        <span className="line-clamp-1">{o.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Layout / format</label>
                <div className="max-h-40 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-800/80 p-1.5">
                  {templates.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setMemeTemplate(t)}
                      className={`mb-1 w-full rounded-md px-2.5 py-2 text-left text-xs transition last:mb-0 ${
                        memeTemplate === t
                          ? "bg-cyan-500/25 text-cyan-300 ring-1 ring-cyan-500/50"
                          : "text-zinc-300 hover:bg-zinc-700/80 hover:text-zinc-100"
                      }`}
                    >
                      {memeTemplate === t && "✓ "}{t}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-[10px] text-zinc-500">→ {formatLabel}</p>
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-400">Visual style</label>
                <select
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value as VisualStyleTagId)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-200"
                >
                  {VISUAL_STYLE_TAGS.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-xs text-zinc-400">Vibe (meme spectrum)</label>
              <select
                value={vibe}
                onChange={(e) => setVibe(e.target.value as MemeSpectrumId)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-200"
              >
                {MEME_SPECTRUM.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label} — {m.traits}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Font</label>
              <select
                value={fontId}
                onChange={(e) => setFontId(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200"
              >
                {MEME_FONTS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Text position {layout === "two_panel" ? "(top)" : "(caption)"}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TEXT_POSITIONS.map((p) => {
                  const isTop = layout === "two_panel";
                  const selected = isTop ? topTextPosition === p.id : captionPosition === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => (isTop ? setTopTextPosition(p.id) : setCaptionPosition(p.id))}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                        selected ? "border-cyan-500 bg-cyan-500/20 text-cyan-400" : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {layout === "two_panel" && (
              <div className="mb-3">
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Text position (bottom)</label>
                <div className="flex flex-wrap gap-1.5">
                  {TEXT_POSITIONS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setBottomTextPosition(p.id)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                        bottomTextPosition === p.id ? "border-cyan-500 bg-cyan-500/20 text-cyan-400" : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Add Commander MATE (sticker)</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setCapybaraOverlay(null)}
                  className={`rounded border px-2 py-1 text-[10px] transition ${
                    capybaraOverlay === null
                      ? "border-cyan-500 bg-cyan-500/20 text-cyan-400"
                      : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  None
                </button>
                {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCapybaraOverlay(n)}
                    className={`h-8 w-8 overflow-hidden rounded border transition ${
                      capybaraOverlay === n
                        ? "border-cyan-500 ring-1 ring-cyan-500/50"
                        : "border-zinc-600 hover:border-zinc-500"
                    }`}
                  >
                    <img
                      src={`/capybara-faces/capybara-${n}.png`}
                      alt={`Commander MATE ${n}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3 rounded-lg border border-zinc-700 bg-zinc-800/80 p-2">
              <p className="mb-1.5 text-[10px] font-medium uppercase text-zinc-500">
                Tags for DB / filtering
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[10px] text-cyan-400">
                  format:{formatTag}
                </span>
                <span className="rounded bg-purple-500/20 px-1.5 py-0.5 font-mono text-[10px] text-purple-400">
                  visual:{visualStyle}
                </span>
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[10px] text-amber-400">
                  vibe:{vibe}
                </span>
                <span className="rounded bg-zinc-600 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                  subject:{subject.category}:{subject.id}
                </span>
              </div>
            </div>

            {layout === "two_panel" ? (
              <div className="mb-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">Top (reject / bad)</label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Reject / Bad take"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 font-mono text-xs text-cyan-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <div className="mt-1 flex flex-wrap gap-1">
                    {TOP_TEXT_PRESETS.map((t) => (
                      <button key={t} type="button" onClick={() => setTopText(t)} className="rounded border border-zinc-600 bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-500 hover:border-cyan-500/50 hover:text-cyan-400">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">Bottom (approve / good)</label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Ape in anyway"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 font-mono text-xs text-cyan-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <div className="mt-1 flex flex-wrap gap-1">
                    {BOTTOM_TEXT_PRESETS.map((t) => (
                      <button key={t} type="button" onClick={() => setBottomText(t)} className="rounded border border-zinc-600 bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-500 hover:border-cyan-500/50 hover:text-cyan-400">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="sm:col-span-2 text-[10px] text-zinc-500">
                  Classic meme format: top = cringe, bottom = based. Use for Drake, Two buttons, etc.
                </p>
              </div>
            ) : (
              <div className="mb-3">
                <label className="mb-1 block text-xs text-zinc-400">Caption (edit then export)</label>
                <textarea
                  value={customCaption}
                  onChange={(e) => setCustomCaption(e.target.value)}
                  placeholder={suggestedCaption}
                  rows={2}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 font-mono text-xs text-cyan-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <label className="mt-2 mb-1 block text-[10px] text-zinc-500">Caption quick picks</label>
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  {CAPTION_PRESETS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCustomCaption(c)}
                      className="shrink-0 rounded-full border border-zinc-600 bg-zinc-800/80 px-2 py-1 text-[10px] text-zinc-400 transition hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
                    >
                      {c.length > 32 ? c.slice(0, 32) + "…" : c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3 rounded-lg border border-zinc-700 bg-zinc-900 p-2">
              <p className="mb-1 text-[10px] text-zinc-500">Preview</p>
              <canvas
                ref={canvasRef}
                className="mx-auto block max-w-full rounded border border-zinc-700"
                width={640}
                height={480}
                style={{ width: "100%", maxWidth: 640, height: "auto", aspectRatio: "640/480" }}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownload}
                disabled={!canAffordMeme}
                title={!canAffordMeme ? `Need ${burnFeeMeme} $MATE to export` : undefined}
                className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-medium text-zinc-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-cyan-500"
              >
                Download PNG
              </button>
              <button
                onClick={handleCopyImage}
                disabled={!canAffordMeme}
                title={!canAffordMeme ? `Need ${burnFeeMeme} $MATE to export` : undefined}
                className="rounded-lg bg-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy image
              </button>
              <button
                onClick={handleSendToForge}
                disabled={!canAffordMeme}
                title={!canAffordMeme ? `Need ${burnFeeMeme} $MATE to export` : undefined}
                className="rounded-lg border border-cyan-500/60 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send to Forge
              </button>
              <button
                onClick={() => setSubject(null)}
                className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800"
              >
                Close
              </button>
              <Link
                href="/forge?folder=1"
                className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-400 hover:border-cyan-500/40 hover:text-cyan-400"
              >
                View my folder
              </Link>
            </div>
          </div>
        )}
      </div>
      <BurnConfirmModal
        open={memeBurnModalOpen}
        onClose={() => {
          setMemeBurnModalOpen(false);
          setPendingMemeAction(null);
        }}
        onConfirm={handleMemeBurnConfirm}
        amount={burnFeeMeme}
        actionLabel={
          pendingMemeAction === "download"
            ? "download"
            : pendingMemeAction === "copy"
              ? "copy"
              : "send to Forge"
        }
        description={`Burn ${burnFeeMeme} $MATE to export this meme.`}
      />
    </section>
  );
}
