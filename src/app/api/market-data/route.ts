import { NextResponse } from "next/server";

/**
 * Fetches live memecoin market data from CoinGecko (free tier).
 * Revalidates every 3 minutes to balance freshness vs rate limits.
 */
export const revalidate = 180; // 3 minutes

const THEME_MAP: Record<string, string> = {
  wif: "Dog + hat",
  dogwifhat: "Dog + hat",
  bonk: "Doge Shiba",
  popcat: "Cat mouth open",
  pepe: "Frog meme",
  slerf: "Accidental burn",
  fart: "Toilet humor",
  giga: "Sigma male",
  gigachad: "Sigma male",
  mew: "Cat",
  floki: "Doge Shiba",
  wojak: "Crying / coping",
  turbo: "Doge",
};

function formatPrice(n: number): string {
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.0001) return `$${n.toFixed(6)}`;
  return `$${n.toExponential(2)}`;
}

function formatCompact(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

interface CoinGeckoMarket {
  id: string;
  symbol: string;
  name: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_change_percentage_24h: number | null;
  total_volume: number | null;
}

export async function GET() {
  try {
    const ids = "dogwifhat,bonk,popcat,pepe,slerf,floki,mew,wojak,turbo,myro";
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=20&page=1&sparkline=false`;
    const res = await fetch(url, {
      next: { revalidate: 180 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`CoinGecko ${res.status}`);
    }

    const data = (await res.json()) as CoinGeckoMarket[];
    const updatedAt = Date.now();

    const items = data
      .filter((c) => c.current_price != null && c.market_cap != null)
      .slice(0, 15)
      .map((c, i) => {
        const sym = (c.symbol || "").toLowerCase();
        const name = (c.name || "").toLowerCase();
        const theme =
          THEME_MAP[sym] ||
          THEME_MAP[name] ||
          Object.entries(THEME_MAP).find(([k]) => name.includes(k) || sym.includes(k))?.[1] ||
          "Meme";

        return {
          id: String(i + 1),
          name: c.name,
          symbol: (c.symbol || "").toUpperCase(),
          price: formatPrice(c.current_price!),
          marketCap: formatCompact(c.market_cap!),
          change24h: c.market_cap_change_percentage_24h ?? 0,
          volume24h: formatCompact(c.total_volume ?? 0),
          theme,
          oneLiner: undefined,
        };
      });

    return NextResponse.json({ items, updatedAt });
  } catch (e) {
    console.error("market-data error", e);
    return NextResponse.json(
      { error: "Live data unavailable", items: null, updatedAt: null },
      { status: 503 }
    );
  }
}
