import { NextResponse } from "next/server";

export const maxDuration = 30;

function extractHandle(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  // Already a handle: @username or username
  const handleMatch = trimmed.match(/^@?([a-zA-Z0-9_]+)$/);
  if (handleMatch) return handleMatch[1];
  // URL: twitter.com/username, x.com/username, twitter.com/username/status/123
  const urlMatch = trimmed.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/);
  return urlMatch ? urlMatch[1] : null;
}

type Body = { twitterLink?: string };

function mockSuggest(handle: string) {
  const h = handle.toLowerCase();
  const isCrypto = ["ansem", "blknoiz", "hsaka", "elon", "vitalik", "cz", "sbf"].some((x) => h.includes(x));
  const isPolitics = ["trump", "elon", "warren", "gensler"].some((x) => h.includes(x));
  return {
    handle: `@${handle}`,
    category: isPolitics ? "Politics" : isCrypto ? "KOL or Well-known" : "Unknown — check their bio",
    memePotential: isCrypto ? "Great pick" : "Solid",
    memeIdeas: [
      `When @${handle} tweets and CT loses its mind`,
      `POV: @${handle} says "this is the one" | Me with 0.5 SOL left`,
      `Reject fundamentals. Embrace @${handle} energy.`,
    ],
    suggestedTemplates: ["Drake pointing", "Two buttons", "Chart reaction"],
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const raw = body.twitterLink?.trim() || "";
    const handle = extractHandle(raw);

    if (!handle) {
      return NextResponse.json(
        { error: "Could not extract handle. Paste a Twitter/X URL (e.g. twitter.com/username) or just the handle (@username)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(mockSuggest(handle));
    }

    const prompt = `You are helping a crypto meme creator. They pasted a Twitter/X handle: @${handle}

Analyze what type of account this likely is and suggest meme ideas for Solana/pump.fun/CT content.

Respond with valid JSON only, no markdown:
{
  "handle": "@${handle}",
  "category": "KOL" | "Politics" | "Well-known" | "Other",
  "categoryReason": "Brief 1-sentence why (e.g. 'Crypto influencer, Solana degen')",
  "memePotential": "Great pick" | "Solid" | "Niche",
  "memeIdeas": ["meme idea 1 with @${handle}", "meme idea 2", "meme idea 3"],
  "suggestedTemplates": ["template name 1", "template name 2"]
}

Rules:
- category: KOL = crypto influencer/chart guy, Politics = politician, Well-known = celebrity/public figure, Other = niche/unknown
- memePotential: Great pick = high viral potential/controversial, Solid = good for memes, Niche = specific audience
- memeIdeas: 3 concrete ideas, degen tone, ready for Drake pointing / two buttons / chart memes
- suggestedTemplates: from classic meme formats (Drake pointing, Two buttons, Distracted boyfriend, Chart reaction, etc.)`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error", res.status, err);
      return NextResponse.json(mockSuggest(handle));
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    let rawContent = data.choices?.[0]?.message?.content?.trim() ?? "";
    rawContent = rawContent.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    const parsed = JSON.parse(rawContent) as {
      handle?: string;
      category?: string;
      categoryReason?: string;
      memePotential?: string;
      memeIdeas?: string[];
      suggestedTemplates?: string[];
    };

    return NextResponse.json({
      handle: parsed.handle ?? `@${handle}`,
      category: parsed.category ?? "Other",
      categoryReason: parsed.categoryReason ?? "",
      memePotential: parsed.memePotential ?? "Solid",
      memeIdeas: Array.isArray(parsed.memeIdeas) ? parsed.memeIdeas.slice(0, 3) : mockSuggest(handle).memeIdeas,
      suggestedTemplates: Array.isArray(parsed.suggestedTemplates) ? parsed.suggestedTemplates.slice(0, 3) : mockSuggest(handle).suggestedTemplates,
    });
  } catch (e) {
    console.error("suggest-meme-from-twitter error", e);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
