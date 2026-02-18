"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const CAPYBARA_FACES = Array.from({ length: 11 }, (_, i) => `/capybara-faces/capybara-${i + 1}.png`);

const MEME_WIDTH = 900;
const MEME_HEIGHT = 600;

const FACE_SIZES = { sm: 120, md: 200, lg: 280 } as const;

type FaceInstance = {
  id: string;
  faceIndex: number;
  x: number;
  y: number;
  size: keyof typeof FACE_SIZES;
  rotation: number; // degrees
};

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
  "It's not a rug, it's a correction",
  "WAGMI. Probably.",
  "Sent it. No cap.",
  "This is financial advice (it isn't)",
  "Anon energy only",
  "Unhinged but based",
  "CT brainrot mode",
  "Solana said yes, my wallet said oops",
];

const PRESET_THINKING = [
  "Just another day in the forge.",
  "If you know, you know.",
  "NFA but we're not selling.",
  "The curve only goes up. (It doesn't.)",
  "Reject utility. Embrace chaos.",
  "One bonding curve to rule them all.",
  "We're not early. We're not late. We're sending it.",
  "No pitch deck. Just vibes.",
  "LP burned. Community based. Chart doing chart things.",
  "Ser. This is fine.",
  "Diamond hands till we hit zero or hero.",
  "Pump.fun is my second home",
  "Waiting for the next 100x.",
  "Touch grass? Building on Solana.",
  "The only roadmap is up. Or down. No one knows.",
  "Based and degen-pilled.",
  "Red candles can't hurt you if you don't look.",
  "Aping at 3am hits different.",
  "One more chart. Then bed. (Spoiler: it's never one.)",
  "Watching the chart. The chart is watching back.",
];

const BACKGROUNDS = [
  { id: "void", label: "Dark void" },
  { id: "solana", label: "Solana" },
  { id: "chart", label: "Chart green" },
  { id: "sunset", label: "Sunset" },
  { id: "cyber", label: "Cyber" },
  { id: "ocean", label: "Ocean" },
  { id: "pump", label: "Pump.fun" },
  { id: "rug", label: "Rug red" },
  { id: "aurora", label: "Aurora" },
  { id: "neon", label: "Neon mesh" },
  { id: "gold", label: "Gold rush" },
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
    case "pump":
      g.addColorStop(0, "#14532d");
      g.addColorStop(0.3, "#166534");
      g.addColorStop(0.6, "#22c55e");
      g.addColorStop(1, "#0a0a0f");
      break;
    case "rug":
      g.addColorStop(0, "#450a0a");
      g.addColorStop(0.4, "#7f1d1d");
      g.addColorStop(0.7, "#b91c1c");
      g.addColorStop(1, "#050508");
      break;
    case "aurora":
      g.addColorStop(0, "#052e16");
      g.addColorStop(0.25, "#14532d");
      g.addColorStop(0.5, "#064e3b");
      g.addColorStop(0.75, "#134e4a");
      g.addColorStop(1, "#0a0a0f");
      break;
    case "neon":
      g.addColorStop(0, "#1e1b4b");
      g.addColorStop(0.35, "#312e81");
      g.addColorStop(0.65, "#4c1d95");
      g.addColorStop(1, "#0a0a0f");
      break;
    case "gold":
      g.addColorStop(0, "#1c1917");
      g.addColorStop(0.3, "#422006");
      g.addColorStop(0.6, "#a16207");
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

function drawMemeBase(
  ctx: CanvasRenderingContext2D,
  feeling: string,
  thinking: string,
  backgroundId: string
) {
  const w = MEME_WIDTH;
  const h = MEME_HEIGHT;
  const cx = w / 2;

  drawBackground(ctx, w, h, backgroundId);

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

  const glow = ctx.createRadialGradient(cx, h * 0.7, 0, cx, h * 0.7, w * 0.7);
  glow.addColorStop(0, "rgba(34, 211, 238, 0.06)");
  glow.addColorStop(0.4, "rgba(251, 146, 60, 0.03)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const pad = 56;
  const cardW = w - pad * 2;
  const cardH = 90;
  const gap = 16;
  const cardY1 = 52;
  const cardY2 = cardY1 + cardH + gap;
  const radius = 12;

  roundBubble(ctx, pad, cardY1, cardW, cardH, radius);
  ctx.fillStyle = "rgba(39, 39, 42, 0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(34, 211, 238, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  roundBubble(ctx, pad, cardY2, cardW, cardH, radius);
  ctx.fillStyle = "rgba(39, 39, 42, 0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(251, 146, 60, 0.5)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

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

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, h - 40, w, 40);
  ctx.fillStyle = "rgba(34, 211, 238, 0.9)";
  ctx.font = "500 11px JetBrains Mono, ui-monospace, monospace";
  ctx.fillText("Commander MATE feeling memeish", cx, h - 20);
}

function clampPosition(x: number, y: number, size: keyof typeof FACE_SIZES): { x: number; y: number } {
  const half = FACE_SIZES[size] / 2;
  return {
    x: Math.max(half, Math.min(MEME_WIDTH - half, x)),
    y: Math.max(half, Math.min(MEME_HEIGHT - half, y)),
  };
}

export default function CommanderMateMemeGenerator() {
  const [faces, setFaces] = useState<FaceInstance[]>([
    { id: "1", faceIndex: 0, x: 450, y: 480, size: "md", rotation: 0 },
  ]);
  const [selectedFaceId, setSelectedFaceId] = useState<string | null>("1");
  const [feeling, setFeeling] = useState("");
  const [thinking, setThinking] = useState("");
  const [backgroundId, setBackgroundId] = useState<string>("void");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const presetFeeling = feeling.trim() || "Chilling. NFA.";
  const presetThinking = thinking.trim() || "Just another day in the forge.";

  const addFace = useCallback(() => {
    const id = `face-${Date.now()}`;
    const sizes: (keyof typeof FACE_SIZES)[] = ["sm", "md", "lg"];
    const newFace: FaceInstance = {
      id,
      faceIndex: Math.floor(Math.random() * 11),
      x: 120 + (faces.length % 4) * 180,
      y: 200 + Math.floor(faces.length / 4) * 120,
      size: sizes[faces.length % 3],
      rotation: (Math.random() - 0.5) * 24,
    };
    setFaces((prev) => [...prev, newFace]);
    setSelectedFaceId(id);
  }, [faces.length]);

  const removeFace = useCallback((id: string) => {
    setFaces((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (next.length === 0) return prev;
      if (selectedFaceId === id) setSelectedFaceId(next[0].id);
      return next;
    });
  }, [selectedFaceId]);

  const updateFacePosition = useCallback((id: string, x: number, y: number, size: keyof typeof FACE_SIZES) => {
    const { x: cx, y: cy } = clampPosition(x, y, size);
    setFaces((prev) => prev.map((f) => (f.id === id ? { ...f, x: cx, y: cy } : f)));
  }, []);

  const updateFaceIndex = useCallback((id: string, faceIndex: number) => {
    setFaces((prev) => prev.map((f) => (f.id === id ? { ...f, faceIndex } : f)));
  }, []);

  const updateFaceSize = useCallback((id: string, size: keyof typeof FACE_SIZES) => {
    setFaces((prev) => prev.map((f) => (f.id === id ? { ...f, size } : f)));
  }, []);

  const updateFaceRotation = useCallback((id: string, rotation: number) => {
    setFaces((prev) => prev.map((f) => (f.id === id ? { ...f, rotation } : f)));
  }, []);

  const getCanvasCoords = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const scaleX = MEME_WIDTH / rect.width;
      const scaleY = MEME_HEIGHT / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const startDrag = useCallback(
    (clientX: number, clientY: number, id: string) => {
      const coords = getCanvasCoords(clientX, clientY);
      if (!coords) return;
      const face = faces.find((f) => f.id === id);
      if (!face) return;
      setDraggingId(id);
      dragOffset.current = { x: face.x - coords.x, y: face.y - coords.y };
    },
    [faces, getCanvasCoords]
  );

  const doDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!draggingId) return;
      const coords = getCanvasCoords(clientX, clientY);
      if (!coords) return;
      const face = faces.find((f) => f.id === draggingId);
      if (!face) return;
      updateFacePosition(draggingId, coords.x + dragOffset.current.x, coords.y + dragOffset.current.y, face.size);
    },
    [draggingId, faces, getCanvasCoords, updateFacePosition]
  );

  const handleFaceMouseDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      startDrag(e.clientX, e.clientY, id);
    },
    [startDrag]
  );

  const handleFaceTouchStart = useCallback(
    (e: React.TouchEvent, id: string) => {
      const t = e.touches[0];
      if (t) startDrag(t.clientX, t.clientY, id);
    },
    [startDrag]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      doDrag(e.clientX, e.clientY);
    },
    [doDrag]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) doDrag(e.touches[0].clientX, e.touches[0].clientY);
    },
    [doDrag]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = MEME_WIDTH;
    canvas.height = MEME_HEIGHT;
    drawMemeBase(ctx, presetFeeling, presetThinking, backgroundId);
    setImgLoaded(true);
  }, [presetFeeling, presetThinking, backgroundId]);

  const handleDownload = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || faces.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = MEME_WIDTH;
    canvas.height = MEME_HEIGHT;
    drawMemeBase(ctx, presetFeeling, presetThinking, backgroundId);

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    for (const face of faces) {
      try {
        const img = await loadImage(CAPYBARA_FACES[face.faceIndex]);
        const sz = FACE_SIZES[face.size];
        const half = sz / 2;
        ctx.save();
        ctx.translate(face.x, face.y);
        ctx.rotate((face.rotation * Math.PI) / 180);
        ctx.translate(-half, -half);
        ctx.shadowColor = "rgba(34, 211, 238, 0.25)";
        ctx.shadowBlur = 40;
        ctx.drawImage(img, 0, 0, sz, sz);
        ctx.restore();
      } catch {
        // skip failed images
      }
    }

    const a = document.createElement("a");
    a.download = `commander-mate-mood-${Date.now()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  }, [faces, presetFeeling, presetThinking, backgroundId]);

  const selectedFace = faces.find((f) => f.id === selectedFaceId);

  return (
    <section className="border-t border-zinc-800/60 bg-gradient-to-b from-zinc-950/80 to-zinc-950/95">
      <div className="container-tight px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl md:text-4xl">
            What is Commander MATE feeling and thinking?
          </h2>
          <p className="mt-3 text-sm text-zinc-500 sm:text-base">
            Create meme collages: drag faces, add more, resize & rotate. Download and share.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex min-w-0 flex-col items-center">
            <div className="relative w-full max-w-[900px] min-w-0">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-zinc-800/50 to-amber-500/15 opacity-80 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 border-amber-500/20 bg-zinc-900/95 shadow-2xl shadow-cyan-500/5">
                <div
                  ref={containerRef}
                  className="relative w-full"
                  style={{ aspectRatio: `${MEME_WIDTH} / ${MEME_HEIGHT}` }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                  onTouchCancel={handleMouseUp}
                >
                  <canvas
                    ref={canvasRef}
                    width={MEME_WIDTH}
                    height={MEME_HEIGHT}
                    className="pointer-events-none block h-full w-full object-contain"
                  />
                  {/* Draggable Commander MATE faces overlay */}
                  {faces.map((face) => {
                    const sizePct = (FACE_SIZES[face.size] / MEME_WIDTH) * 100;
                    return (
                    <div
                      key={face.id}
                      className="absolute cursor-grab active:cursor-grabbing select-none"
                      style={{
                        left: `${(face.x / MEME_WIDTH) * 100}%`,
                        top: `${(face.y / MEME_HEIGHT) * 100}%`,
                        width: `${sizePct}%`,
                        aspectRatio: "1",
                        transform: `translate(-50%, -50%) rotate(${face.rotation}deg)`,
                        zIndex: selectedFaceId === face.id ? 20 : 10,
                      }}
                      onMouseDown={(e) => handleFaceMouseDown(e, face.id)}
                      onTouchStart={(e) => handleFaceTouchStart(e, face.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!draggingId) setSelectedFaceId(face.id);
                      }}
                    >
                      <img
                        src={CAPYBARA_FACES[face.faceIndex]}
                        alt=""
                        className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        draggable={false}
                        style={{ pointerEvents: "none" }}
                      />
                      {selectedFaceId === face.id && faces.length > 1 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFace(face.id);
                            }}
                            className="rounded bg-red-500/80 px-2 py-0.5 text-[10px] text-white hover:bg-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {selectedFaceId === face.id && (
                        <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400 ring-2 ring-cyan-400/50" />
                      )}
                    </div>
                  );
                  })}
                  {!imgLoaded && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-900/80">
                      <p className="text-sm text-zinc-500">Loading…</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center gap-3 py-4">
                  <button
                    type="button"
                    onClick={addFace}
                    className="flex items-center gap-2 rounded-xl border-2 border-dashed border-cyan-500/50 bg-cyan-500/5 px-6 py-3 text-sm font-semibold text-cyan-400 transition hover:border-cyan-500 hover:bg-cyan-500/15 hover:text-cyan-300"
                  >
                    <span className="text-lg">+</span> Add Commander MATE
                  </button>
                  <p className="text-center text-xs text-zinc-500">
                    Drag to reposition · Click to select · Add multiple for collage style
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/50 p-4 sm:p-5">
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

            {selectedFace && (
              <div className="mt-4 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Edit selected ({faces.length} on meme)
                </p>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="mb-1 text-[10px] text-zinc-500">Face</p>
                <div className="flex flex-wrap gap-1.5">
                  {CAPYBARA_FACES.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => updateFaceIndex(selectedFace.id, i)}
                      className={`h-9 w-9 overflow-hidden rounded-lg border-2 transition-all ${
                        selectedFace.faceIndex === i
                          ? "border-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/30"
                          : "border-zinc-600 hover:border-zinc-500 hover:scale-105"
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] text-zinc-500">Size</p>
                    <div className="flex gap-1">
                      {(["sm", "md", "lg"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateFaceSize(selectedFace.id, s)}
                          className={`rounded border px-2 py-1 text-[10px] font-medium transition ${
                            selectedFace.size === s
                              ? "border-cyan-500 bg-cyan-500/20 text-cyan-400"
                              : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                          }`}
                        >
                          {s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] text-zinc-500">Rotation</p>
                    <div className="flex gap-1">
                      {[-15, -5, 0, 5, 15].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => updateFaceRotation(selectedFace.id, r)}
                          className={`rounded border px-2 py-1 text-[10px] font-medium transition ${
                            selectedFace.rotation === r
                              ? "border-cyan-500 bg-cyan-500/20 text-cyan-400"
                              : "border-zinc-600 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                          }`}
                        >
                          {r}°
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                Feeling quick picks
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {PRESET_FEELINGS.map((p) => (
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

            <div className="mt-4">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Thinking quick picks
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {PRESET_THINKING.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setThinking(p)}
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
