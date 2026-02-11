export interface DeFiTrend {
  id: string;
  name: string;
  category: string;
  tvl: string;
  change24h: number;
  description: string;
  oneLiner?: string;
}

export interface MemecoinTrend {
  id: string;
  name: string;
  symbol: string;
  price: string;
  marketCap: string;
  change24h: number;
  volume24h: string;
  theme: string;
  oneLiner?: string;
}

export interface KOL {
  id: string;
  name: string;
  handle: string;
  followers: string;
  niche: string;
  memePotential: string;
  avatar?: string;
  sampleQuote?: string;
}

export type MemeSubjectCategory = "kol" | "politics" | "well_known" | "animals" | "symbols";

/** Generic option for meme subjects (animals, symbols, etc.) with suggested captions */
export interface MemeSubjectOption {
  id: string;
  name: string;
  theme: string;
  suggestedCaption: string;
}

export interface PoliticalFigure {
  id: string;
  name: string;
  role: string;
  handle?: string;
  memePotential: string;
  sampleQuote?: string;
}

export type CryptoSentiment = "loved" | "hated";

export interface WellKnownPerson {
  id: string;
  name: string;
  role: string;
  cryptoSentiment: CryptoSentiment;
  controversial?: boolean;
  handle?: string;
  memePotential: string;
  sampleQuote?: string;
}

export type MemeSubject =
  | { category: "kol"; id: string }
  | { category: "politics"; id: string }
  | { category: "well_known"; id: string }
  | { category: "animals"; id: string }
  | { category: "symbols"; id: string };

export interface LaunchTheme {
  id: string;
  name: string;
  description: string;
  examples: string[];
  sentiment: "bullish" | "neutral" | "niche" | "unhinged";
  tags: string[];
  oneLiner?: string;
}

export interface PumpFunFact {
  id: string;
  title: string;
  body: string;
  funny?: boolean;
}

export type HotTopicVibe = "trending" | "funny" | "retarded";

export interface HotTopic {
  id: string;
  title: string;
  body: string;
  vibe: HotTopicVibe;
  source?: string;
  oneLiner?: string;
}
