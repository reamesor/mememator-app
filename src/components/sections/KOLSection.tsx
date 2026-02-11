"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { kols, politicalFigures, wellKnownPeople, memeAnimals, memeSymbols } from "@/lib/mockData";
import { useForgeDraft } from "@/context/ForgeDraftContext";
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
] as const;

type TemplateId = (typeof templates)[number];

/** Two-panel = top (reject/bad) + bottom (approve/good). One-panel = single caption. */
const TEMPLATE_LAYOUT: Record<TemplateId, "two_panel" | "one_panel"> = {
  "Drake pointing (approve / reject)": "two_panel",
  "Distracted boyfriend": "two_panel",
  "Two buttons / This is fine": "two_panel",
  "Change my mind": "one_panel",
  "Expanding brain": "one_panel",
  "Bernie Sanders mittens": "one_panel",
};

function getSubjectName(subject: MemeSubject): string {
  if (subject.category === "kol") return kols.find((k) => k.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "politics") return politicalFigures.find((p) => p.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "well_known") return wellKnownPeople.find((w) => w.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "animals") return memeAnimals.find((a) => a.id === subject.id)?.name ?? "Unknown";
  if (subject.category === "symbols") return memeSymbols.find((s) => s.id === subject.id)?.name ?? "Unknown";
  return "Unknown";
}

function getSubjectQuote(subject: MemeSubject): string | undefined {
  if (subject.category === "kol") return kols.find((k) => k.id === subject.id)?.sampleQuote;
  if (subject.category === "politics") return politicalFigures.find((p) => p.id === subject.id)?.sampleQuote;
  if (subject.category === "well_known") return wellKnownPeople.find((w) => w.id === subject.id)?.sampleQuote;
  if (subject.category === "animals") return memeAnimals.find((a) => a.id === subject.id)?.suggestedCaption;
  if (subject.category === "symbols") return memeSymbols.find((s) => s.id === subject.id)?.suggestedCaption;
  return undefined;
}

function getSuggestedCaption(subject: MemeSubject): string {
  if (subject.category === "animals") return memeAnimals.find((a) => a.id === subject.id)?.suggestedCaption ?? "Animal meme";
  if (subject.category === "symbols") return memeSymbols.find((s) => s.id === subject.id)?.suggestedCaption ?? "Vibes";
  const name = getSubjectName(subject);
  if (subject.category === "kol") return `When ${name} says it's early but you already aped in and now you're -80%`;
  if (subject.category === "politics") return `POV: ${name} just announced a crypto policy. CT doesn't know whether to ape or leave the country`;
  const person = wellKnownPeople.find((w) => w.id === subject.id);
  if (person?.cryptoSentiment === "loved") return `When ${name} tweets one word and your bags 10x`;
  return `When ${name} appears on the timeline and your portfolio has a panic attack`;
}

export default function KOLSection() {
  const router = useRouter();
  const { setMemeDraft } = useForgeDraft();
  const [subjectType, setSubjectType] = useState<MemeSubjectCategory>("kol");
  const [wellKnownFilter, setWellKnownFilter] = useState<CryptoSentiment | "all">("all");
  const [controversialOnly, setControversialOnly] = useState(false);
  const [subject, setSubject] = useState<MemeSubject | null>(null);
  const [memeTemplate, setMemeTemplate] = useState<string>(templates[0]);
  const [visualStyle, setVisualStyle] = useState<VisualStyleTagId>("minimalist");
  const [vibe, setVibe] = useState<MemeSpectrumId>("shitpost_chaotic");

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
    align: "center" | "left" = "center"
  ) {
    const font = `bold ${fontSize}px Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif`;
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

    // Draw character/art for the chosen template first (the main reason for memes)
    drawMemeTemplateArt(ctx, memeTemplate as MemeTemplateId, w, h);

    const padding = 24;
    const maxTextWidth = w - padding * 2;
    const bigFont = 42;
    const smallFont = 28;

    if (isTwoPanel) {
      drawMemeText(ctx, topToUse, w / 2, panelH * 0.5, maxTextWidth, bigFont);
      drawMemeText(ctx, bottomToUse, w / 2, panelH + panelH * 0.5, maxTextWidth, bigFont);
    } else {
      drawMemeText(ctx, captionToUse || "Your caption here", w / 2, h / 2, maxTextWidth, smallFont);
    }

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, h - 32, w, 32);
    ctx.fillStyle = "#64748b";
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`Mememator $MATE · ${getSubjectName(subject)} · ${memeTemplate}`, 12, h - 16);
    ctx.textAlign = "center";
  };

  useEffect(() => {
    if (subject && (layout === "one_panel" ? captionToUse : true)) drawMeme();
  }, [subject, captionToUse, topToUse, bottomToUse, memeTemplate, visualStyle, vibe, layout]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !subject) return;
    drawMeme();
    const name = getSubjectName(subject).replace(/\s+/g, "-");
    const a = document.createElement("a");
    a.download = `mememator-${name}-${Date.now()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };

  const handleCopyImage = async () => {
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

  const handleSendToForge = () => {
    const canvas = canvasRef.current;
    if (!canvas || !subject) return;
    drawMeme();
    const imageDataUrl = canvas.toDataURL("image/png");
    const caption =
      layout === "two_panel"
        ? [topToUse, bottomToUse].filter(Boolean).join(" | ")
        : captionToUse;
    setMemeDraft({
      imageDataUrl,
      templateName: memeTemplate,
      topText: layout === "two_panel" ? topToUse : undefined,
      bottomText: layout === "two_panel" ? bottomToUse : undefined,
      caption: caption || undefined,
      subjectName: getSubjectName(subject),
    });
    router.push("/forge");
  };

  const filteredWellKnown = wellKnownPeople
    .filter((w) => (wellKnownFilter === "all" ? true : w.cryptoSentiment === wellKnownFilter))
    .filter((w) => (!controversialOnly ? true : w.controversial === true));

  const handleSelectSubject = (category: MemeSubjectCategory, id: string) => {
    setSubject({ category, id });
  };

  return (
    <section id="kols" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Meme Generator — Create content that hits
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          KOLs, politicians, animals, and symbols. Pick a vibe, choose a template, add your text. Download or copy, then use for token launches and CT.
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {(
            [
              { value: "kol" as const, label: "KOLs" },
              { value: "politics" as const, label: "Politics" },
              { value: "well_known" as const, label: "Well-known" },
              { value: "animals" as const, label: "Animals" },
              { value: "symbols" as const, label: "Symbols" },
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

        {subjectType === "kol" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kols.map((k) => (
              <div
                key={k.id}
                className="card-hover rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-100">{k.name}</span>
                  <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">
                    {k.memePotential}
                  </span>
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
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-100">{p.name}</span>
                  <span className="rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-400">
                    {p.memePotential}
                  </span>
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
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                        w.cryptoSentiment === "loved"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {w.cryptoSentiment === "loved" ? "Loved" : "Hated"}
                    </span>
                    {w.controversial && (
                      <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">
                        Controversial
                      </span>
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
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-100">{a.name}</span>
                  <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-400">
                    {a.theme}
                  </span>
                </div>
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
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-100">{s.name}</span>
                  <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-400">
                    {s.theme}
                  </span>
                </div>
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

            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-zinc-400">Layout / format</label>
                <select
                  value={memeTemplate}
                  onChange={(e) => setMemeTemplate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-200"
                >
                  {templates.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <p className="mt-0.5 text-[10px] text-zinc-500">→ {formatLabel}</p>
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
                className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-medium text-zinc-950 hover:bg-cyan-400"
              >
                Download PNG
              </button>
              <button
                onClick={handleCopyImage}
                className="rounded-lg bg-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-600"
              >
                Copy image
              </button>
              <button
                onClick={handleSendToForge}
                className="rounded-lg border border-cyan-500/60 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/20"
              >
                Send to Forge
              </button>
              <button
                onClick={() => setSubject(null)}
                className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
