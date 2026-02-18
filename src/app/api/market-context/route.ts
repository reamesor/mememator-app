import { NextResponse } from "next/server";

/**
 * Returns a compact market summary for injection into AI prompts.
 * Used by generate-tweets and improve-lore to keep output current.
 */
export const revalidate = 180;

export async function GET() {
  try {
    const ids = "dogwifhat,bonk,popcat,pepe,slerf,floki,mew,wojak,turbo";
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=12&page=1&sparkline=false`;
    const res = await fetch(url, {
      next: { revalidate: 180 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json({
        summary: "",
        topCoins: [],
        date: new Date().toISOString().slice(0, 10),
      });
    }

    const data = (await res.json()) as Array<{
      symbol: string;
      name: string;
      market_cap: number | null;
      market_cap_change_percentage_24h: number | null;
    }>;

    const topCoins = data
      .filter((c) => c.market_cap != null)
      .slice(0, 10)
      .map((c) => ({
        symbol: (c.symbol || "").toUpperCase(),
        name: c.name,
        mcap: c.market_cap,
        change24h: c.market_cap_change_percentage_24h ?? 0,
      }));

    const topGainers = topCoins
      .filter((c) => c.change24h > 0)
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 3);

    const summaryParts: string[] = [];
    if (topCoins.length) {
      summaryParts.push(
        `Top memecoins by MCap: ${topCoins.map((c) => `${c.symbol} ($${(c.mcap! / 1e9).toFixed(2)}B, ${c.change24h >= 0 ? "+" : ""}${c.change24h.toFixed(1)}% 24h)`).join("; ")}.`
      );
    }
    if (topGainers.length) {
      summaryParts.push(
        `Today's gainers: ${topGainers.map((c) => `${c.symbol} +${c.change24h.toFixed(1)}%`).join(", ")}.`
      );
    }

    const summary = summaryParts.join(" ") || "Market data temporarily unavailable.";

    return NextResponse.json({
      summary,
      topCoins: topCoins.map((c) => ({ symbol: c.symbol, change24h: c.change24h })),
      date: new Date().toISOString().slice(0, 10),
    });
  } catch (e) {
    console.error("market-context error", e);
    return NextResponse.json({
      summary: "",
      topCoins: [],
      date: new Date().toISOString().slice(0, 10),
    });
  }
}
