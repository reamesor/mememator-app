"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, Plus, Trash2, Terminal, RefreshCcw, Flame, Hammer } from "lucide-react";

type CanvasElement = { id: number; content: string; x: number; y: number; size: number };

export default function MemeMatorPro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<CanvasElement[]>([
    { id: 1, content: "STAY CHILL", x: 300, y: 100, size: 45 },
    { id: 2, content: "$MATE SUMMER", x: 300, y: 500, size: 45 },
  ]);
  const [logs, setLogs] = useState([
    "[SYSTEM] Terminal Initialized...",
    "[MATE] Forge Temperature: Optimal",
  ]);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const degenPhrases = [
    "WAGMI",
    "SER PLEASE",
    "NGMI",
    "COPE",
    "LFG",
    "EXIT LIQUIDITY",
    "BEYOND RETARDED",
    "CHILL AF",
  ];

  useEffect(() => {
    const img = new Image();
    img.src = "/capybara-logo.png";
    img.crossOrigin = "anonymous";
    img.onload = () => setBgImage(img);
    img.onerror = () => setBgImage(null);

    const interval = setInterval(() => {
      const newLog = `[PROPAGANDA] ${Math.random().toString(16).slice(2, 8)} forged a new asset...`;
      setLogs((prev) => [newLog, ...prev].slice(0, 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (bgImage) {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#52525b";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Add capybara-logo.png to /public", canvas.width / 2, canvas.height / 2 - 8);
    }

    elements.forEach((el) => {
      ctx.fillStyle = "#fb923c";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 6;
      ctx.font = `bold ${el.size}px Impact, "Arial Black", sans-serif`;
      ctx.textAlign = "center";
      ctx.strokeText(el.content.toUpperCase(), el.x, el.y);
      ctx.fillText(el.content.toUpperCase(), el.x, el.y);
    });
  }, [elements, bgImage]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      ctx.font = `bold ${el.size}px Impact, "Arial Black", sans-serif`;
      const w = ctx.measureText(el.content.toUpperCase()).width;
      const h = el.size * 1.2;
      const left = el.x - w / 2;
      const top = el.y - h;
      if (x >= left && x <= left + w && y >= top && y <= top + h) {
        setDragging(el.id);
        dragOffset.current = { x: x - el.x, y: y - el.y };
        return;
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragging === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX - dragOffset.current.x;
    const y = (e.clientY - rect.top) * scaleY - dragOffset.current.y;

    setElements((prev) =>
      prev.map((el) => (el.id === dragging ? { ...el, x: x, y: y } : el))
    );
  };

  const handleCanvasMouseUp = () => setDragging(null);

  const goFullRetard = () => {
    const randomElements: CanvasElement[] = Array.from({ length: 3 }).map(
      (_, i) => ({
        id: Date.now() + i,
        content: degenPhrases[Math.floor(Math.random() * degenPhrases.length)],
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
        size: Math.floor(Math.random() * 20) + 40,
      })
    );
    setElements(randomElements);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "MATE-PROPAGANDA.png";
    link.href = canvasRef.current?.toDataURL("image/png") || "";
    link.click();
  };

  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-1 overflow-hidden bg-[#050505] font-mono text-white">
      {/* LEFT: TOOLBOX */}
      <div className="flex w-64 flex-col gap-4 border-r border-zinc-800 bg-zinc-900/20 p-4">
        <div className="mb-4 font-black tracking-[0.3em] text-[10px] text-orange-500">
          COMMAND_CENTER
        </div>
        <button
          onClick={() =>
            setElements([
              ...elements,
              {
                id: Date.now(),
                content: "NEW TXT",
                x: 300,
                y: 300,
                size: 35,
              },
            ])
          }
          className="flex w-full items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-xs font-bold transition-all hover:bg-orange-500 hover:text-black"
        >
          <Plus size={14} /> INJECT TEXT
        </button>
        <button
          onClick={goFullRetard}
          className="flex w-full items-center gap-3 rounded-lg border border-orange-500/40 bg-orange-500/10 p-3 text-xs font-bold text-orange-500 transition-all hover:bg-orange-500 hover:text-black"
        >
          <RefreshCcw size={14} /> GO FULL RETARD
        </button>
        <button
          onClick={handleDownload}
          className="flex w-full items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-xs font-bold transition-all hover:bg-cyan-600 hover:text-black"
        >
          <Download size={14} /> EXFILTRATE
        </button>

        <div className="mt-auto rounded-lg border border-zinc-800 bg-black p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] text-zinc-500">
            <Terminal size={10} /> LIVE_FEED
          </div>
          <div className="h-32 space-y-1 overflow-hidden">
            {logs.map((log, i) => (
              <div key={i} className="truncate text-[9px] text-zinc-500">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER: THE WORKBENCH */}
      <div className="relative flex flex-1 items-center justify-center bg-[#070707]">
        <div className="absolute left-6 top-6 flex items-center gap-2 opacity-50">
          <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
          <span className="text-[10px] uppercase tracking-widest">
            Propaganda Workspace
          </span>
        </div>
        <div className="relative overflow-hidden rounded-xl border-4 border-zinc-900 shadow-[0_0_100px_-20px_rgba(251,146,60,0.15)]">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="max-h-[85vh] w-auto cursor-crosshair"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          />
        </div>
      </div>

      {/* RIGHT: THE FORGE PANEL */}
      <div className="relative flex w-80 flex-col gap-6 border-l border-zinc-800 bg-[#080808] p-6">
        <div className="-bottom-10 -right-10 h-40 w-40 bg-orange-600/5 blur-[80px]" />

        <div>
          <h3 className="mb-2 flex items-center gap-2 font-black tracking-[0.3em] text-xs text-orange-500">
            <Flame size={14} className="animate-pulse" /> THE_FORGE_V1
          </h3>
          <p className="font-mono text-[10px] text-zinc-500">
            TEMPER YOUR ASSETS INTO PROPAGANDA.
          </p>
        </div>

        <div className="space-y-3">
          {elements.map((el) => (
            <div
              key={el.id}
              className="group flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-3"
            >
              <input
                className="w-full bg-transparent text-[11px] font-bold text-zinc-400 outline-none focus:text-orange-500"
                value={el.content}
                onChange={(e) =>
                  setElements(
                    elements.map((item) =>
                      item.id === el.id
                        ? { ...item, content: e.target.value }
                        : item
                    )
                  )
                }
              />
              <button
                onClick={() =>
                  setElements(elements.filter((item) => item.id !== el.id))
                }
                className="text-zinc-700 hover:text-red-500"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t border-zinc-900 pt-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
            Tempering Options
          </p>
          {["Thermal Glow", "CRT Distortion", "Degen Noise"].map((label) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-md border border-zinc-900 bg-black p-2"
            >
              <span className="text-[10px] font-bold text-zinc-400">{label}</span>
              <div className="h-3 w-6 rounded-full bg-zinc-800" />
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex justify-between text-[10px] font-black text-orange-500">
            <span>FORGE HEAT</span>
            <span>92%</span>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-4 text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-600/20 transition-all hover:bg-orange-500">
            <Hammer size={14} /> Forge Artifact
          </button>
          <p className="text-center text-[8px] uppercase tracking-tight italic text-zinc-600">
            $MATE tokens are not required for forging, but it helps the vibe.
          </p>
        </div>
      </div>
    </div>
  );
}
