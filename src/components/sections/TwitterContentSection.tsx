"use client";

import { useState } from "react";

export default function TwitterContentSection() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<"hype" | "unhinged" | "copium" | "fud" | "alpha" | "meme">("unhinged");
  const [generated, setGenerated] = useState<string | null>(null);

  const generateContent = () => {
    if (!topic.trim()) return;
    const templates: Record<string, string[]> = {
      hype: [
        `🚀 ${topic} on Solana is the next narrative. Don't sleep. NFA but the bonding curve doesn't lie.`,
        `GM degens. ${topic} season on SOL is here. Ape responsibly (you won't).`,
        `Pump.fun is printing. ${topic} is the play. You're either in or you're poor.`,
      ],
      unhinged: [
        `Just aped into ${topic}. My wife left me. My portfolio is -90%. Still holding. This is fine.`,
        `When you discover ${topic} at 2am and your last SOL is already in another shitcoin 😭`,
        `${topic} is going to 100x. I have no evidence. I don't need evidence. Trust me bro.`,
        `POV: You're explaining ${topic} to your family at Thanksgiving and they're calling the police.`,
      ],
      copium: [
        `-80% on ${topic} but it's fine. I'm early. The chart is just resting. Any day now.`,
        `They call it a rug. I call it a discount. ${topic} to the moon. Eventually.`,
        `My ${topic} bags are heavy. So is my conviction. (So is my loss. We don't talk about that.)`,
      ],
      fud: [
        `Unpopular opinion: ${topic} is over. Sell. (NFA but you asked.)`,
        `Everyone's shilling ${topic}. That's usually the top. Just saying.`,
        `${topic}? More like ${topic.slice(0, 3)}-rekt. I'm out.`,
      ],
      alpha: [
        `Alpha: ${topic} — doing the research so you don't have to. DYOR. But also ape.`,
        `Thread: Why ${topic} on Solana is the play this cycle. 1/`,
        `Pump.fun alpha: ${topic} narrative is building. Get in before the KOLs notice.`,
      ],
      meme: [
        `When ${topic} 10x and you sold at 2x for 'profits' 😭🙌`,
        `Virgin: sells ${topic}. Chad: buys the dip. Gigachad: is the dip.`,
        `Me: I'll only put 1 SOL in ${topic}. Me 5 mins later: why do I have 0 SOL.`,
      ],
    };
    const options = templates[tone];
    const pick = options[Math.floor(Math.random() * options.length)];
    setGenerated(pick);
  };

  const tweetUrl = generated
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generated)}`
    : null;

  return (
    <section id="content" className="scroll-mt-20 py-5 px-3 sm:py-8 sm:px-4">
      <div className="mx-auto w-full max-w-2xl min-w-0">
        <h2 className="mb-1 font-display text-xl tracking-wide text-zinc-100 sm:text-2xl">
          Degen Tweet Generator
        </h2>
        <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
          Generate tweet-ready chaos for your Solana / pump.fun shill. Copy or post straight to Twitter. No one will blame us. NFA.
        </p>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="mb-3">
            <label className="mb-1 block text-xs font-medium text-zinc-400">
              Topic or token / narrative
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. WIF, pump.fun, Solana summer, my shitcoin"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-zinc-400">
              Vibe
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(["unhinged", "hype", "copium", "fud", "alpha", "meme"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                    tone === t
                      ? "bg-cyan-500 text-zinc-950"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={generateContent}
            disabled={!topic.trim()}
            className="w-full rounded-lg bg-cyan-500 py-2 text-xs font-medium text-zinc-950 transition hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500"
          >
            Generate Tweet
          </button>

          {generated && (
            <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/80 p-3">
              <p className="mb-3 whitespace-pre-wrap font-mono text-xs text-zinc-200">
                {generated}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(generated)}
                  className="rounded-lg bg-zinc-700 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-600"
                >
                  Copy
                </button>
                {tweetUrl && (
                  <a
                    href={tweetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#1DA1F2] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1a8cd8]"
                  >
                    Post to Twitter
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
