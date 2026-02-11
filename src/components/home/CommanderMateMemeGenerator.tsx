"use client";

import { useState, useRef, useEffect } from "react";

const CAPYBARA_FACES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

const PRESET_FEELINGS = [
  "Chilling. NFA.",
  "Watching charts at 3am",
  "Aping. No ragrets.",
  "Ser. This is fine.",
  "Diamond hands only",
  "NGMI? GM. We're so back.",
  "Pump.fun is my second home",
  "Just vibing in outer space",
  "Full degen mode activated",
  "Commander MATE, deploy narrative",
  "Waiting for the next 100x",
  "LP burned. Based.",
  "Red candles? What red candles.",
  "Touch grass? Building on Solana.",
  "Paper hands sold. I'm still here.",
  "The bonding curve is my therapy.",
];

const MEME_WIDTH = 900;
const MEME_HEIGHT = 600;

const BACKGROUNDS = [
  { id: "void", label: "Dark void" },
  { id: "solana", label: "Solana" },
  { id: "chart", label: "Chart green" },
  { id: "sunset", label: "Sunset" },
  { id: "cyber", label: "Cyber" },
  { id: "ocean", label: "Ocean" },
] as const;

const CAPYBARA_POSITIONS = [
  { id: "bottom-center", label: "Bottom center", x: 0.5, y: 0.92 },
  { id: "bottom-left", label: "Bottom left", x: 0.2, y: 0.92 },
  { id: "bottom-right", label: "Bottom right", x: 0.8, y: 0.92 },
  { id: "center", label: "Center", x: 0.5, y: 0.55 },
  { id: "center-left", label: "Center left", x: 0.2, y: 0.55 },
  { id: "center-right", label: "Center right", x: 0.8, y: 0.55 },
  { id: "top-left", label: "Top left", x: 0.2, y: 0.25 },
  { id: "top-right", label: "Top right", x: 0.8, y: 0.25 },
] as const;

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number, bgId: string) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  switch (bgId) {
    case "solana":
      g.addColorStop(0, "#9945FF");
      g.addColorStop(0.4, "#14F195");
      g.addColorStop(1, "#0a0a0f");
      break;
    case "chart":
      g.addColorStop(0, "#0a0a0f");
      g.addColorStop(0.4, "#166534");
      g.addColorStop(1, "#15803d");
      break;
    case "sunset":
      g.addColorStop(0, "#1a0a2e");
      g.addColorStop(0.3, "#7c2d12");
      g.addColorStop(0.6, "#ea580c");
      g.addColorStop(1, "#050508");
      break;
    case "cyber":
      g.addColorStop(0, "#0f172a");
      g.addColorStop(0.5, "#1e293b");
      g.addColorStop(1, "#020617");
      break;
    case "ocean":
      g.addColorStop(0, "#0c4a6e");
      g.addColorStop(0.4, "#0369a1");
      g.addColorStop(0.8, "#0e7490");
      g.addColorStop(1, "#050508");
      break;
    default:
      g.addColorStop(0, "#0a0a0f");
      g.addColorStop(0.5, "#0d0d14");
      g.addColorStop(1, "#050508");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function roundBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  fontSize: number,
  fontWeight: string
) {
  ctx.font = `${fontWeight} ${fontSize}px system-ui, sans-serif`;
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    const m = ctx.measureText(test);
    if (m.width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  if (line) lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => {
    ctx.fillText(l, x, startY + i * lineHeight);
  });
}

function drawMeme(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  feeling: string,
  thinking: string,
  backgroundId: string,
  capybaraPos: { x: number; y: number }
) {
  const w = MEME_WIDTH;
  const h = MEME_HEIGHT;
  const cx = w / 2;

  // User-selected background
  drawBackground(ctx, w, h, backgroundId);

  // Subtle circuit / grid accent (capybara vibe)
  ctx.strokeStyle = "rgba(34, 211, 238, 0.04)";
  ctx.lineWidth = 1;
  const gridStep = 48;
  for (let x = 0; x < w; x += gridStep) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Cyan / amber radial glow
  const glow = ctx.createRadialGradient(cx, h * 0.7, 0, cx, h * 0.7, w * 0.7);
  glow.addColorStop(0, "rgba(34, 211, 238, 0.06)");
  glow.addColorStop(0.4, "rgba(251, 146, 60, 0.03)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Capybara — positioned by user
  const faceSize = 260;
  const faceX = Math.max(0, Math.min(w - faceSize, w * capybaraPos.x - faceSize / 2));
  const faceY = Math.max(0, Math.min(h - faceSize, h * capybaraPos.y - faceSize / 2));
  ctx.shadowColor = "rgba(34, 211, 238, 0.25)";
  ctx.shadowBlur = 40;
  ctx.drawImage(img, faceX, faceY, faceSize, faceSize);
  ctx.shadowBlur = 0;

  // Clean dark cards — zinc / glass, not white
  const pad = 56;
  const cardW = w - pad * 2;
  const cardH = 90;
  const gap = 16;
  const cardY1 = 52;
  const cardY2 = cardY1 + cardH + gap;

  const radius = 12;

  // Card 1: FEELING — clean dark zinc, cyan border
  roundBubble(ctx, pad, cardY1, cardW, cardH, radius);
  ctx.fillStyle = "rgba(39, 39, 42, 0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(34, 211, 238, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Card 2: THINKING — clean dark zinc, amber border
  roundBubble(ctx, pad, cardY2, cardW, cardH, radius);
  ctx.fillStyle = "rgba(39, 39, 42, 0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(251, 146, 60, 0.5)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Labels & text
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "600 11px JetBrains Mono, ui-monospace, monospace";
  ctx.fillStyle = "#22d3ee";
  ctx.fillText("FEELING", cx, cardY1 + 26);
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "700 20px system-ui, sans-serif";
  wrapText(ctx, feeling, cx, cardY1 + 58, cardW - 48, 26, 20, "700");

  ctx.font = "600 11px JetBrains Mono, ui-monospace, monospace";
  ctx.fillStyle = "#fb923c";
  ctx.fillText("THINKING", cx, cardY2 + 26);
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "700 20px system-ui, sans-serif";
  wrapText(ctx, thinking, cx, cardY2 + 58, cardW - 48, 26, 20, "700");

  // Watermark — Mememator $MATE style
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, h - 40, w, 40);
  ctx.fillStyle = "rgba(34, 211, 238, 0.9)";
  ctx.font = "500 11px JetBrains Mono, ui-monospace, monospace";
  ctx.fillText("Mememator", cx - 42, h - 20);
  ctx.fillStyle = "#fb923c";
  ctx.fillText("$MATE", cx + 2, h - 20);
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("· Commander", cx + 52, h - 20);
}

export default function CommanderMateMemeGenerator() {
  const [faceIndex, setFaceIndex] = useState(0);
  const [feeling, setFeeling] = useState("");
  const [thinking, setThinking] = useState("");
  const [backgroundId, setBackgroundId] = useState<string>("void");
  const [capybaraPosition, setCapybaraPosition] = useState<
    (typeof CAPYBARA_POSITIONS)[number]
  >(CAPYBARA_POSITIONS[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const presetFeeling = feeling.trim() || "Chilling. NFA.";
  const presetThinking = thinking.trim() || "Just another day in the forge.";
  const capybaraPos = { x: capybaraPosition.x, y: capybaraPosition.y };

  // Auto-redraw preview when state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = MEME_WIDTH;
    canvas.height = MEME_HEIGHT;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = CAPYBARA_FACES[faceIndex];
    img.onload = () => {
      setImgLoaded(true);
      drawMeme(ctx, img, presetFeeling, presetThinking, backgroundId, capybaraPos);
    };
  }, [faceIndex, presetFeeling, presetThinking, backgroundId, capybaraPosition.id]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = CAPYBARA_FACES[faceIndex];
    img.onload = () => {
      canvas.width = MEME_WIDTH;
      canvas.height = MEME_HEIGHT;
      drawMeme(ctx, img, presetFeeling, presetThinking, backgroundId, capybaraPos);

      const a = document.createElement("a");
      a.download = `commander-mate-mood-${Date.now()}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  };

  return (
    <section className="border-t border-zinc-800/60 bg-gradient-to-b from-zinc-950/80 to-zinc-950/95">
      <div className="container-tight px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl md:text-4xl">
            What is Commander MATE feeling and thinking?
          </h2>
          <p className="mt-3 text-sm text-zinc-500 sm:text-base">
            Pick a capybara face, type your vibes. Download and share.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Preview first */}
          <div className="flex min-w-0 flex-col items-center">
            <div className="relative w-full max-w-[900px] min-w-0">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-zinc-800/50 to-amber-500/15 opacity-80 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 border-amber-500/20 bg-zinc-900/95 shadow-2xl shadow-cyan-500/5">
                <div
                  className="relative w-full overflow-hidden rounded-t-xl"
                  style={{ aspectRatio: `${MEME_WIDTH} / ${MEME_HEIGHT}` }}
                >
                  <canvas
                    ref={canvasRef}
                    width={MEME_WIDTH}
                    height={MEME_HEIGHT}
                    className="block h-full w-full object-contain"
                  />
                  {!imgLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80">
                      <p className="text-sm text-zinc-500">Loading…</p>
                    </div>
                  )}
                </div>
                <p className="py-3 text-center text-xs text-zinc-500">
                  Preview updates automatically as you type
                </p>
              </div>
            </div>
          </div>

          {/* Controls below preview */}
          <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/50 p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Background
                </label>
                <div className="flex flex-wrap gap-1">
                  {BACKGROUNDS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBackgroundId(b.id)}
                      className={`rounded border px-2 py-1 text-[10px] font-medium transition ${
                        backgroundId === b.id
                          ? "border-cyan-500 bg-cyan-500/20 text-cyan-400"
                          : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Capybara position
                </label>
                <select
                  value={capybaraPosition.id}
                  onChange={(e) => {
                    const pos = CAPYBARA_POSITIONS.find((p) => p.id === e.target.value);
                    if (pos) setCapybaraPosition(pos);
                  }}
                  className="w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-xs text-zinc-200"
                >
                  {CAPYBARA_POSITIONS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                Capybara face
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CAPYBARA_FACES.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFaceIndex(i)}
                    className={`h-9 w-9 overflow-hidden rounded-lg border-2 transition-all ${
                      faceIndex === i
                        ? "border-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/30"
                        : "border-zinc-600 hover:border-zinc-500 hover:scale-105"
                    }`}
                  >
                    <img src={src} alt={`Face ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Feeling
                </label>
                <input
                  type="text"
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  placeholder="Chilling. NFA."
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-cyan-100 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Thinking
                </label>
                <input
                  type="text"
                  value={thinking}
                  onChange={(e) => setThinking(e.target.value)}
                  placeholder="Just another day in the forge."
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-2 text-sm text-cyan-100 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Quick picks
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_FEELINGS.slice(0, 8).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFeeling(p)}
                    className="shrink-0 rounded-full border border-zinc-600 bg-zinc-800/80 px-2.5 py-1.5 text-[11px] text-zinc-300 transition hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-lg transition hover:from-cyan-400 hover:to-cyan-500 hover:shadow-cyan-500/25"
            >
              Download meme
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
