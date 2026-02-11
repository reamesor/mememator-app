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
  thinking: string
) {
  const w = MEME_WIDTH;
  const h = MEME_HEIGHT;

  // Rich gradient background
  const bgGradient = ctx.createLinearGradient(0, 0, w, h);
  bgGradient.addColorStop(0, "#0a0e1a");
  bgGradient.addColorStop(0.3, "#0d1525");
  bgGradient.addColorStop(0.6, "#0a121f");
  bgGradient.addColorStop(1, "#050810");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, w, h);

  // Glow overlay
  const glow = ctx.createRadialGradient(w / 2, h * 0.6, 0, w / 2, h * 0.6, w * 0.8);
  glow.addColorStop(0, "rgba(34, 211, 238, 0.08)");
  glow.addColorStop(0.5, "rgba(34, 211, 238, 0.03)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Capybara - larger, centered at bottom
  const faceSize = 280;
  const faceX = w / 2 - faceSize / 2;
  const faceY = h - faceSize - 56;
  ctx.drawImage(img, faceX, faceY, faceSize, faceSize);

  // Thought bubbles - comic style with tails
  const bubblePad = 48;
  const bubbleW = w - bubblePad * 2;
  const bubbleH = 88;
  const gap = 20;
  const bubbleY1 = 56;
  const bubbleY2 = bubbleY1 + bubbleH + gap;

  const bubbleRadius = 20;
  const tailSize = 24;

  ctx.shadowColor = "rgba(34, 211, 238, 0.15)";
  ctx.shadowBlur = 24;

  ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
  ctx.strokeStyle = "rgba(34, 211, 238, 0.6)";
  ctx.lineWidth = 2;
  roundBubble(ctx, bubblePad, bubbleY1, bubbleW, bubbleH, bubbleRadius);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
  roundBubble(ctx, bubblePad, bubbleY2, bubbleW, bubbleH, bubbleRadius);
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;

  // Bubble tail for top bubble (points toward capybara)
  ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
  ctx.strokeStyle = "rgba(34, 211, 238, 0.6)";
  ctx.beginPath();
  ctx.moveTo(w / 2 - tailSize / 2, bubbleY1 + bubbleH);
  ctx.lineTo(w / 2, bubbleY1 + bubbleH + tailSize);
  ctx.lineTo(w / 2 + tailSize / 2, bubbleY1 + bubbleH);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
  ctx.beginPath();
  ctx.moveTo(w / 2 - tailSize / 2, bubbleY2 + bubbleH);
  ctx.lineTo(w / 2, bubbleY2 + bubbleH + tailSize);
  ctx.lineTo(w / 2 + tailSize / 2, bubbleY2 + bubbleH);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#0a0e1a";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "600 14px system-ui, sans-serif";
  ctx.fillStyle = "rgba(34, 211, 238, 0.95)";
  ctx.fillText("FEELING", w / 2, bubbleY1 + 28);
  ctx.fillStyle = "#0a0e1a";
  wrapText(ctx, feeling, w / 2, bubbleY1 + 60, bubbleW - 56, 26, 22, "700");
  ctx.fillStyle = "rgba(34, 211, 238, 0.95)";
  ctx.fillText("THINKING", w / 2, bubbleY2 + 28);
  ctx.fillStyle = "#0a0e1a";
  wrapText(ctx, thinking, w / 2, bubbleY2 + 60, bubbleW - 56, 26, 22, "700");

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "500 12px system-ui, sans-serif";
  ctx.fillText("Commander MATE · Mememator", w / 2, h - 24);
}

export default function CommanderMateMemeGenerator() {
  const [faceIndex, setFaceIndex] = useState(0);
  const [feeling, setFeeling] = useState("");
  const [thinking, setThinking] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const presetFeeling = feeling.trim() || "Chilling. NFA.";
  const presetThinking = thinking.trim() || "Just another day in the forge.";

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
      drawMeme(ctx, img, presetFeeling, presetThinking);
    };
  }, [faceIndex, presetFeeling, presetThinking]);

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
      drawMeme(ctx, img, presetFeeling, presetThinking);

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

        <div className="grid gap-10 xl:grid-cols-[340px_1fr] xl:gap-14">
          {/* Controls */}
          <div className="order-2 space-y-6 rounded-2xl border border-zinc-700/60 bg-zinc-900/50 p-6 sm:p-8 xl:order-1">
            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Capybara face
              </label>
              <div className="flex flex-wrap gap-2">
                {CAPYBARA_FACES.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFaceIndex(i)}
                    className={`h-11 w-11 overflow-hidden rounded-xl border-2 transition-all sm:h-12 sm:w-12 ${
                      faceIndex === i
                        ? "border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)] ring-2 ring-cyan-400/30"
                        : "border-zinc-600 hover:border-zinc-500 hover:scale-105"
                    }`}
                  >
                    <img src={src} alt={`Face ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Feeling
              </label>
              <input
                type="text"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Chilling. NFA."
                className="w-full rounded-xl border-2 border-zinc-700 bg-zinc-800/80 px-4 py-3 text-base text-cyan-100 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Thinking
              </label>
              <input
                type="text"
                value={thinking}
                onChange={(e) => setThinking(e.target.value)}
                placeholder="Just another day in the forge."
                className="w-full rounded-xl border-2 border-zinc-700 bg-zinc-800/80 px-4 py-3 text-base text-cyan-100 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Quick picks
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_FEELINGS.slice(0, 8).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFeeling(p)}
                    className="rounded-full border border-zinc-600 bg-zinc-800/80 px-3 py-2 text-xs text-zinc-300 transition hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-4 text-base font-semibold text-zinc-950 shadow-lg transition hover:from-cyan-400 hover:to-cyan-500 hover:shadow-cyan-500/25"
            >
              Download meme
            </button>
          </div>

          {/* Preview - large, prominent */}
          <div className="order-1 flex min-w-0 flex-col items-center xl:order-2">
            <div className="relative w-full max-w-[900px] min-w-0">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-500/25 via-amber-500/10 to-cyan-500/25 opacity-70 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border-2 border-zinc-700/80 bg-zinc-900/95 shadow-2xl">
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
        </div>
      </div>
    </section>
  );
}
