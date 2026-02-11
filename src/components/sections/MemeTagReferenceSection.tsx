"use client";

import { useState } from "react";
import {
  VISUAL_STYLE_TAGS,
  FORMAT_TAGS,
  MEME_SPECTRUM,
} from "@/lib/memeSchema";

export default function MemeTagReferenceSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="meme-tags" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <button
          onClick={() => setOpen(!open)}
          className="mb-2 flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-3 text-left transition hover:bg-zinc-800/50"
        >
          <div>
            <h2 className="font-display text-lg tracking-wide text-zinc-100 sm:text-xl">
              Meme tag reference (DB / filtering)
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Visual style, format, and vibe schema for organizing meme arts
            </p>
          </div>
          <span className="text-lg text-zinc-500">{open ? "−" : "+"}</span>
        </button>

        {open && (
          <div className="space-y-4 rounded-b-lg border border-t-0 border-zinc-800 bg-zinc-900/30 p-4">
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                Visual style (how it looks)
              </h3>
              <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {VISUAL_STYLE_TAGS.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-2"
                  >
                    <code className="text-[10px] text-cyan-400">{v.id}</code>
                    <p className="mt-0.5 text-xs font-medium text-zinc-200">{v.label}</p>
                    <p className="mt-0.5 text-[10px] text-zinc-500">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-purple-400">
                Layout / format (how it&apos;s built)
              </h3>
              <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
                {FORMAT_TAGS.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-2"
                  >
                    <code className="text-[10px] text-purple-400">{f.id}</code>
                    <p className="mt-0.5 text-xs font-medium text-zinc-200">{f.label}</p>
                    <p className="mt-0.5 text-[10px] text-zinc-500">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-400">
                Meme spectrum (vibe / algorithm meta)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[360px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-700 text-zinc-500">
                      <th className="pb-1.5 pr-3 font-medium">Category</th>
                      <th className="pb-1.5 pr-3 font-medium">Typical traits</th>
                      <th className="pb-1.5 font-medium">App label</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-400">
                    {MEME_SPECTRUM.map((m) => (
                      <tr key={m.id} className="border-b border-zinc-800">
                        <td className="py-1.5 pr-3">
                          <code className="text-[10px] text-amber-400">{m.id}</code>
                        </td>
                        <td className="py-1.5 pr-3 text-[10px]">{m.traits}</td>
                        <td className="py-1.5 text-[10px]">{m.appLabel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[10px] text-zinc-600">
              Use these tag IDs in your database and filter logic. Visual + format + vibe = full meme metadata.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
