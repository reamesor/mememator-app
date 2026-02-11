import { NextResponse } from "next/server";

export const maxDuration = 30;

type Body = {
  tokenName?: string;
  themeName?: string;
  lore?: string;
  count?: number;
};

function mockTweets(body: Body): { tweets: string[] } {
  const name = body.tokenName?.trim() || "this token";
  const theme = body.themeName || "Solana degen";
  const tweets = [
    `${name} is live on pump.fun.\n\nNo VC. No team tokens. Just the bonding curve and the chaos.\n\nIf you know, you know. NFA.`,
    `We're not early. We're not late. We're sending it.\n\n${name} — ${theme} energy. One curve. One community. Zero apologies.\n\nLFG`,
    `POV: You aped into ${name} at 3am and the chart is doing the thing\n\nSer. This is fine.\n\nNFA but we're not selling`,
    `${name} thread 🧵\n\n1/ No pitch deck\n2/ No roadmap\n3/ Just vibes and a bonding curve\n4/ Solana said yes\n5/ Your portfolio might say oops\n\nWe're not sorry.`,
    `Reject utility. Embrace ${name}.\n\nLP burned. Community based. Chart doing chart things.\n\nDiamond hands only. NFA.`,
  ];
  return { tweets: tweets.slice(0, body.count ?? 5) };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const mock = mockTweets(body);
      return NextResponse.json(mock);
    }

    const prompt = `You are helping someone create Twitter/X tweets for a Solana/pump.fun meme token launch. Generate tweets that:
- Are ready to post (no corporate speak, degen tone)
- Can be used in advance or at launch for smooth content rollout
- Include token name and theme, fit CT (crypto Twitter) culture
- End with NFA or similar where appropriate
- Stay under 280 chars each when possible (some can be longer for threads)

Token name: ${body.tokenName || "(not set)"}
Theme: ${body.themeName || "(any)"}
Lore/context: ${body.lore || "(none)"}

Respond with valid JSON only, no markdown:
{
  "tweets": [ "tweet 1", "tweet 2", "tweet 3", "tweet 4", "tweet 5" ]
}
Give exactly 5 tweet variants. Mix: launch announcement, hype, community, chart joke, thread opener.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.85,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error", res.status, err);
      const mock = mockTweets(body);
      return NextResponse.json(mock);
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    let raw = data.choices?.[0]?.message?.content?.trim() ?? "";
    raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(raw) as { tweets?: string[] };
    const tweets = Array.isArray(parsed.tweets)
      ? parsed.tweets.slice(0, 5)
      : mockTweets(body).tweets;

    return NextResponse.json({ tweets });
  } catch (e) {
    console.error("generate-tweets error", e);
    const mock = mockTweets({});
    return NextResponse.json(mock);
  }
}
