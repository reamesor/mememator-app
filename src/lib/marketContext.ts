/**
 * Fetches live market summary for injection into AI prompts.
 * Used by generate-tweets, improve-lore, etc.
 */
export async function fetchMarketContext(): Promise<{
  summary: string;
  date: string;
}> {
  const date = new Date().toISOString().slice(0, 10);
  try {
    const ids = "dogwifhat,bonk,popcat,pepe,slerf,floki,mew,wojak,turbo";
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    const res = await fetch(url, {
      next: { revalidate: 180 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { summary: "", date };

    const data = (await res.json()) as Array<{
      symbol: string;
      name: string;
      market_cap: number | null;
      market_cap_change_percentage_24h: number | null;
    }>;

    const top = data
      .filter((c) => c.market_cap != null)
      .slice(0, 8)
      .map(
        (c) =>
          `${(c.symbol || "").toUpperCase()} ($${(c.market_cap! / 1e9).toFixed(2)}B, ${(c.market_cap_change_percentage_24h ?? 0) >= 0 ? "+" : ""}${(c.market_cap_change_percentage_24h ?? 0).toFixed(1)}% 24h)`
      );

    const gainers = data
      .filter((c) => (c.market_cap_change_percentage_24h ?? 0) > 0)
      .sort((a, b) => (b.market_cap_change_percentage_24h ?? 0) - (a.market_cap_change_percentage_24h ?? 0))
      .slice(0, 3)
      .map((c) => `${(c.symbol || "").toUpperCase()} +${(c.market_cap_change_percentage_24h ?? 0).toFixed(1)}%`);

    const parts: string[] = [];
    if (top.length) parts.push(`Top memecoins: ${top.join("; ")}.`);
    if (gainers.length) parts.push(`Today's gainers: ${gainers.join(", ")}.`);

    return { summary: parts.join(" ") || "", date };
  } catch {
    return { summary: "", date };
  }
}
