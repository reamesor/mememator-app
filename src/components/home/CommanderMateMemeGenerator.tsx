"use client";

import { useState, useRef } from "react";

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
];

export default function CommanderMateMemeGenerator() {
  const [faceIndex, setFaceIndex] = useState(0);
  const [feeling, setFeeling] = useState("");
  const [thinking, setThinking] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const presetFeeling = feeling.trim() || "Chilling. NFA.";
  const presetThinking = thinking.trim() || "Just another day in the forge.";

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 400;
    const h = 320;
    canvas.width = w;
    canvas.height = h;

    // Dark space bg
    ctx.fillStyle = "#0d0d14";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(34, 211, 238, 0.08)";
    ctx.fillRect(0, 0, w, h);

    // Draw capybara face
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = CAPYBARA_FACES[faceIndex];
    img.onload = () => {
      const faceSize = 140;
      const faceX = w / 2 - faceSize / 2;
      const faceY = h - faceSize - 40;
      ctx.drawImage(img, faceX, faceY, faceSize, faceSize);

      // Thought bubble - "feeling"
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.strokeStyle = "rgba(34, 211, 238, 0.6)";
      ctx.lineWidth = 2;
      roundBubble(ctx, 24, 40, w - 48, 56, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#0d0d14";
      ctx.font = "bold 14px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      wrapText(ctx, presetFeeling, w / 2, 68, w - 64, 18);

      // Thought bubble - "thinking"
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      roundBubble(ctx, 24, 108, w - 48, 56, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#0d0d14";
      wrapText(ctx, presetThinking, w / 2, 136, w - 64, 18);

      // Labels
      ctx.fillStyle = "rgba(34, 211, 238, 0.9)";
      ctx.font = "10px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Feeling:", 32, 32);
      ctx.fillText("Thinking:", 32, 100);

      // Branding
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "10px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Commander MATE · Mememator", w / 2, h - 12);

      const a = document.createElement("a");
      a.download = `commander-mate-mood-${Date.now()}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  };

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
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";
    const lines: string[] = [];
    ctx.font = "bold 14px system-ui, sans-serif";
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

  return (
    <section className="border-t border-zinc-800/60 bg-zinc-950/50">
      <canvas ref={canvasRef} className="sr-only" width={400} height={320} aria-hidden />
      <div className="container-tight px-4 py-8 sm:px-6 sm:py-10">
        <h2 className="mb-1 font-display text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
          What is Commander MATE feeling and thinking?
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          Pick a capybara face, type what MATE is feeling and thinking. Download your meme.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="shrink-0 space-y-3">
            <label className="block text-[10px] font-medium uppercase text-zinc-500">Capybara face</label>
            <div className="flex flex-wrap gap-1.5">
              {CAPYBARA_FACES.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFaceIndex(i)}
                  className={`h-10 w-10 overflow-hidden rounded border transition ${
                    faceIndex === i ? "border-cyan-500 ring-1 ring-cyan-500/50" : "border-zinc-600 hover:border-zinc-500"
                  }`}
                >
                  <img src={src} alt={`Face ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-medium uppercase text-zinc-500">Feeling</label>
              <input
                type="text"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="Chilling. NFA."
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-2.5 py-1.5 text-sm text-cyan-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-medium uppercase text-zinc-500">Thinking</label>
              <input
                type="text"
                value={thinking}
                onChange={(e) => setThinking(e.target.value)}
                placeholder="Just another day in the forge."
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800/80 px-2.5 py-1.5 text-sm text-cyan-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PRESET_FEELINGS.slice(0, 6).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFeeling(p)}
                  className="rounded-full bg-zinc-800 px-2 py-1 text-[10px] text-zinc-400 hover:bg-zinc-700 hover:text-cyan-400"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/80 p-4">
              <div className="relative aspect-[400/320] max-w-[400px] mx-auto rounded-lg overflow-hidden border border-zinc-700">
                <div className="absolute inset-0 bg-[#0d0d14]" />
                <div className="absolute inset-0 bg-cyan-500/5" />
                <img
                  src={CAPYBARA_FACES[faceIndex]}
                  alt="Commander MATE"
                  className="absolute bottom-8 left-1/2 h-[140px] w-[140px] -translate-x-1/2 object-contain drop-shadow-lg"
                />
                <div className="absolute left-4 right-4 top-8 rounded-xl border border-cyan-500/30 bg-white/95 px-3 py-2 text-center">
                  <span className="text-[10px] text-cyan-600">Feeling:</span>
                  <p className="text-sm font-bold text-zinc-900">{presetFeeling}</p>
                </div>
                <div className="absolute left-4 right-4 top-24 rounded-xl border border-cyan-500/30 bg-white/95 px-3 py-2 text-center">
                  <span className="text-[10px] text-cyan-600">Thinking:</span>
                  <p className="text-sm font-bold text-zinc-900">{presetThinking}</p>
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-zinc-500">
                  Commander MATE · Mememator
                </p>
              </div>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-cyan-400"
                >
                  Download meme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
