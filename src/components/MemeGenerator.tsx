"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Zap, Terminal } from "lucide-react";

export default function MemeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [topText, setTopText] = useState("THE WORLD IS LOUD");
  const [bottomText, setBottomText] = useState("CHILL WITH $MATE");
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/capybara-logo.png";
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
    img.onerror = () => setImage(null);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#52525b";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Add capybara-logo.png to /public", canvas.width / 2, canvas.height / 2 - 8);
      ctx.fillText("(600×600 recommended)", canvas.width / 2, canvas.height / 2 + 12);
    }

    ctx.fillStyle = "#fb923c";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.font = "bold 42px sans-serif";
    ctx.textAlign = "center";
    ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 60);
    ctx.fillText(topText.toUpperCase(), canvas.width / 2, 60);
    ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 40);
    ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 40);
  }, [topText, bottomText, image]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "MATE-PROPAGANDA.png";
    link.href = canvasRef.current?.toDataURL("image/png") || "";
    link.click();
  };

  return (
    <section className="py-20 px-6 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-[#0c0c0c]/50 shadow-[0_0_80px_-20px_rgba(251,146,60,0.15)] backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 p-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20" />
              <div className="h-3 w-3 rounded-full border border-orange-500/50 bg-orange-500/20" />
              <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20" />
            </div>
            <span className="ml-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
              <Terminal size={14} className="text-orange-500" /> PROPAGANDA_ENGINE_V1.0
            </span>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-tighter text-zinc-600 sm:block">Status: Local_Testing</div>
        </div>
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="flex items-center justify-center border-r border-zinc-800 bg-black/20 p-8 lg:p-12">
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="h-auto w-full rounded-xl border border-zinc-700/50 shadow-2xl shadow-orange-500/5"
            />
          </div>
          <div className="space-y-8 p-8 lg:p-12">
            <div className="space-y-6">
              <input
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-white outline-none focus:border-orange-500/50"
              />
              <input
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-white outline-none focus:border-orange-500/50"
              />
            </div>
            <button
              onClick={handleDownload}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 font-black text-black shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-400"
            >
              <Download size={20} /> EXFILTRATE MEME
            </button>
            <div className="rounded-2xl border border-orange-500/10 bg-orange-500/5 p-5">
              <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-orange-500">
                <Zap size={14} /> SYSTEM LORE
              </h4>
              <p className="font-mono text-[11px] leading-relaxed text-zinc-500">
                The Capybara is the silent observer. Broadcast the $MATE philosophy to the masses.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
