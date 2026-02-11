import { NextResponse } from "next/server";

export const maxDuration = 30;

type Body = {
  tokenName?: string;
  themeName?: string;
  lore?: string;
  memeAngle?: string;
};

/** Generate mock examples when no API key (so UI works out of the box). */
function mockImprovedLore(body: Body): { improvedLoreExamples: string[]; improvedMemeExamples: string[] } {
  const name = body.tokenName?.trim() || "this token";
  const theme = body.themeName || "Solana degen";
  const base = body.lore?.trim();
  const improvedLoreExamples = [
    base
      ? `${base}\n\nTL;DR: ${name} is the most unhinged thing on the bonding curve. No utility. No roadmap. Just pure Solana retardness. If you know, you know. NFA.`
      : `${name} dropped on pump.fun because the world wasn't ready for it. No VC. No team tokens. Just the curve and the chaos. This is the way.`,
    `What if we told you ${name} wasn't an accident—it was destiny? One bonding curve. One community. Zero apologies. ${theme} energy. We're not early. We're not late. We're sending it.`,
    `No pitch deck. No KYC. Just 1 SOL and a dream. ${name} is what happens when degens stop asking permission and start aping. Solana said yes. Your portfolio might say oops. We're not sorry.`,
  ];
  const improvedMemeExamples = [
    `When you explain ${name} to a normie and they leave the room`,
    `POV: Bonding curve only goes up (it doesn't)`,
    `Reject utility. Embrace ${name}.`,
  ];
  return { improvedLoreExamples, improvedMemeExamples };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const mock = mockImprovedLore(body);
      return NextResponse.json(mock);
    }

    const prompt = `You are helping someone write token lore and meme copy for a Solana/pump.fun meme token. Keep the tone: degen, unhinged, self-aware, funny. No corporate speak.

Token name/concept: ${body.tokenName || "(not set)"}
Theme: ${body.themeName || "(any)"}
Current lore (improve or expand): ${body.lore || "(none yet)"}
Current meme angle: ${body.memeAngle || "(none yet)"}

Respond with valid JSON only, no markdown, no code fence:
{
  "improvedLoreExamples": [ "first full lore paragraph (2-4 sentences)", "second variant", "third variant" ],
  "improvedMemeExamples": [ "one-liner 1", "one-liner 2", "one-liner 3" ]
}
Give exactly 3 improved lore examples and 3 meme one-liners. Keep lore short and punchy (pump.fun description style).`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error", res.status, err);
      const mock = mockImprovedLore(body);
      return NextResponse.json(mock);
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    let raw = data.choices?.[0]?.message?.content?.trim() ?? "";
    raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(raw) as {
      improvedLoreExamples?: string[];
      improvedMemeExamples?: string[];
    };
    const improvedLoreExamples = Array.isArray(parsed.improvedLoreExamples)
      ? parsed.improvedLoreExamples.slice(0, 3)
      : mockImprovedLore(body).improvedLoreExamples;
    const improvedMemeExamples = Array.isArray(parsed.improvedMemeExamples)
      ? parsed.improvedMemeExamples.slice(0, 3)
      : mockImprovedLore(body).improvedMemeExamples;

    return NextResponse.json({ improvedLoreExamples, improvedMemeExamples });
  } catch (e) {
    console.error("improve-lore error", e);
    const mock = mockImprovedLore({});
    return NextResponse.json(mock);
  }
}
