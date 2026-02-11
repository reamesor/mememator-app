import type { DeFiTrend, MemecoinTrend, KOL, LaunchTheme, PumpFunFact, HotTopic, PoliticalFigure, WellKnownPerson, MemeSubjectOption } from "./types";

/** DeFi TVL and 24h change — update from DefiLlama/API for live values */
export const defiTrends: DeFiTrend[] = [
  { id: "1", name: "Pump.fun", category: "Shitcoin Launchpad", tvl: "$2.1B+", change24h: 12.4, description: "Where dreams and rent money go to bond. No VC, no vesting, just you and the curve.", oneLiner: "The only bonding curve that has bonded more degens than a Telegram group." },
  { id: "2", name: "Jupiter", category: "DEX Aggregator", tvl: "$1.45B", change24h: 5.8, description: "Swap anything. The only aggregator that doesn't judge your token list.", oneLiner: "JUP = justified unlimited pumping (allegedly)" },
  { id: "3", name: "Raydium", category: "AMM", tvl: "$1.62B", change24h: -1.2, description: "Where pump.fun graduates go to get rekt by real liquidity.", oneLiner: "From bonding curve to AMM: the natural evolution of every 100x." },
  { id: "4", name: "Phoenix", category: "Order Book DEX", tvl: "$385M", change24h: 8.5, description: "CBOE-style order books on Solana. For when you want to pretend you're not degenning.", oneLiner: "Limit orders so you can pretend you have a strategy." },
  { id: "5", name: "Tensor", category: "NFT Marketplace", tvl: "—", change24h: 4.2, description: "NFTs on Solana. Yes, they still exist. Yes, people still flip JPEGs.", oneLiner: "Where Mad Lads go to get more mad." },
];

/** Memecoin prices / market data — update from API (e.g. Birdeye, Jupiter) for live values */
export const memecoinTrends: MemecoinTrend[] = [
  { id: "1", name: "Dogwifhat", symbol: "WIF", price: "$2.18", marketCap: "$2.14B", change24h: 6.4, volume24h: "$512M", theme: "Dog + hat", oneLiner: "Just a dog. With a hat. You're not early." },
  { id: "2", name: "Popcat", symbol: "POPCAT", price: "$1.28", marketCap: "$1.26B", change24h: -2.1, volume24h: "$198M", theme: "Cat mouth open", oneLiner: "The only cat that didn't rug. Yet." },
  { id: "3", name: "Bonk", symbol: "BONK", price: "$0.000031", marketCap: "$2.0B", change24h: 11.8, volume24h: "$385M", theme: "Doge Shiba", oneLiner: "Solana's original 'we're so back' moment." },
  { id: "4", name: "Fartcoin", symbol: "FART", price: "$0.000089", marketCap: "$71M", change24h: -8.2, volume24h: "$12M", theme: "Toilet humor", oneLiner: "Yes, really. No, we're not kidding. Solana does that." },
  { id: "5", name: "Gigachad", symbol: "GIGA", price: "$0.072", marketCap: "$108M", change24h: 4.5, volume24h: "$28M", theme: "Sigma male", oneLiner: "Chad energy. Virgin entry. Classic." },
  { id: "6", name: "Slerf", symbol: "SLERF", price: "$0.28", marketCap: "$278M", change24h: -3.2, volume24h: "$76M", theme: "Accidental burn", oneLiner: "Dev burned LP. Still mooned. Only on Solana." },
  { id: "7", name: "Pepe", symbol: "PEPE", price: "$0.000012", marketCap: "$5.1B", change24h: 2.8, volume24h: "$620M", theme: "Frog meme", oneLiner: "Cross-chain frog. Solana version exists." },
];

export const kols: KOL[] = [
  { id: "1", name: "Ansem", handle: "@blknoiz06", followers: "680K", niche: "Solana maxi / degen", memePotential: "Unhinged", sampleQuote: "If you're not buying the dip you're not built for this" },
  { id: "2", name: "Hsaka", handle: "@HsakaTrades", followers: "420K", niche: "Charts + memes", memePotential: "Unhinged", sampleQuote: "NFA but this is the one. Trust me bro." },
  { id: "3", name: "Gigantic Rebirth", handle: "@GiganticRebirth", followers: "310K", niche: "Pump.fun alpha", memePotential: "Unhinged", sampleQuote: "Next 100x. I'm not early you're late." },
  { id: "4", name: "The Crypto Dog", handle: "@TheCryptoDog", followers: "1.2M", niche: "Charts / Chad memes", memePotential: "Unhinged", sampleQuote: "Virgin: sells at ATH. Chad: buys the next dip." },
  { id: "5", name: "Loomdart", handle: "@loomdart", followers: "380K", niche: "DeFi / chaos", memePotential: "Unhinged", sampleQuote: "Ser. This is fine." },
  { id: "6", name: "Solanacels", handle: "@solanacels", followers: "180K", niche: "Solana shitcoins", memePotential: "Unhinged", sampleQuote: "Pump.fun is the only fair launch. Cope eth maxis." },
];

export const politicalFigures: PoliticalFigure[] = [
  { id: "p1", name: "Donald Trump", role: "Politician", handle: "@realDonaldTrump", memePotential: "Very High", sampleQuote: "We're going to make crypto great again." },
  { id: "p2", name: "Vivek Ramaswamy", role: "Politician", handle: "@VivekGRamaswamy", memePotential: "High", sampleQuote: "Crypto is freedom. Regulate the regulators." },
  { id: "p3", name: "Elon Musk", role: "Tech / Politics-adjacent", handle: "@elonmusk", memePotential: "Very High", sampleQuote: "Dogecoin to the moon." },
  { id: "p4", name: "Elizabeth Warren", role: "Politician", handle: "@SenWarren", memePotential: "High", sampleQuote: "Crypto is for criminals. We need crackdown." },
  { id: "p5", name: "Gary Gensler", role: "SEC Chair", memePotential: "Very High", sampleQuote: "Everything is a security. Except when it's not." },
  { id: "p6", name: "RFK Jr.", role: "Politician", handle: "@RobertKennedyJr", memePotential: "High", sampleQuote: "Bitcoin is freedom money." },
];

export const wellKnownPeople: WellKnownPerson[] = [
  { id: "w1", name: "Elon Musk", role: "Tech / X", cryptoSentiment: "loved", handle: "@elonmusk", memePotential: "Very High", sampleQuote: "I still have Doge. No cap." },
  { id: "w2", name: "CZ (Changpeng Zhao)", role: "Ex-Binance", cryptoSentiment: "loved", memePotential: "High", sampleQuote: "4." },
  { id: "w3", name: "Vitalik Buterin", role: "Ethereum", cryptoSentiment: "loved", handle: "@VitalikButerin", memePotential: "High", sampleQuote: "Ethereum does things. So does Solana. It's fine." },
  { id: "w4", name: "SBF (Sam Bankman-Fried)", role: "Ex-FTX", cryptoSentiment: "hated", controversial: true, memePotential: "Very High", sampleQuote: "I didn't know. I'm sorry." },
  { id: "w5", name: "Do Kwon", role: "Terra / Luna", cryptoSentiment: "hated", controversial: true, memePotential: "Very High", sampleQuote: "Stablecoin. What could go wrong." },
  { id: "w6", name: "Jamie Dimon", role: "JPMorgan CEO", cryptoSentiment: "hated", memePotential: "High", sampleQuote: "Bitcoin is for criminals. (We'll still custody it.)" },
  { id: "w7", name: "Taylor Swift", role: "Celebrity", cryptoSentiment: "loved", memePotential: "High", sampleQuote: "No crypto take. CT still makes memes." },
  { id: "w8", name: "Martin Shkreli", role: "Pharma / Convicted", cryptoSentiment: "hated", controversial: true, memePotential: "Very High", sampleQuote: "I'm back. Here's alpha." },
  // Celebrities into crypto, controversial
  { id: "w9", name: "Kim Kardashian", role: "Celebrity / Ethereum Max", cryptoSentiment: "hated", controversial: true, memePotential: "Very High", sampleQuote: "Not financial advice. (SEC: $1.26M fine.)" },
  { id: "w10", name: "Logan Paul", role: "YouTuber / CryptoZoo", cryptoSentiment: "hated", controversial: true, handle: "@LoganPaul", memePotential: "Very High", sampleQuote: "CryptoZoo. Refunds. Maybe. Eventually." },
  { id: "w11", name: "Jake Paul", role: "YouTuber / Crypto promos", cryptoSentiment: "hated", controversial: true, memePotential: "Very High", sampleQuote: "Aped into the wrong token. We've all been there." },
  { id: "w12", name: "Floyd Mayweather", role: "Boxer / ICO promos", cryptoSentiment: "hated", controversial: true, memePotential: "Very High", sampleQuote: "Centra. EOS. No one remembers. We do." },
  { id: "w13", name: "Paris Hilton", role: "Celebrity / NFTs & crypto", cryptoSentiment: "loved", controversial: true, handle: "@ParisHilton", memePotential: "High", sampleQuote: "Sliving in the metaverse. NFTs are my love language." },
  { id: "w14", name: "Lindsay Lohan", role: "Celebrity / LOHAN token", cryptoSentiment: "hated", controversial: true, memePotential: "Very High", sampleQuote: "I'm back. So is my token. SEC: we're watching." },
  { id: "w15", name: "Soulja Boy", role: "Rapper / Crypto & NFTs", cryptoSentiment: "hated", controversial: true, handle: "@souljaboy", memePotential: "Very High", sampleQuote: "Drake? I had crypto first. Crank that Solana." },
  { id: "w16", name: "Akon", role: "Singer / Akoin", cryptoSentiment: "loved", controversial: true, memePotential: "High", sampleQuote: "Akoin. Crypto city in Senegal. Still building. Allegedly." },
  { id: "w17", name: "DJ Khaled", role: "Producer / Crypto promos", cryptoSentiment: "hated", controversial: true, memePotential: "High", sampleQuote: "Another one. (SEC: and another fine.)" },
  { id: "w18", name: "Matt Damon", role: "Actor / Crypto.com", cryptoSentiment: "loved", controversial: true, memePotential: "High", sampleQuote: "Fortune favors the brave. So does the dip." },
  { id: "w19", name: "Reese Witherspoon", role: "Actor / Crypto & NFTs", cryptoSentiment: "loved", controversial: true, memePotential: "High", sampleQuote: "Hello Sunshine. Hello NFT collection." },
  { id: "w20", name: "Post Malone", role: "Rapper / NFT collector", cryptoSentiment: "loved", controversial: true, memePotential: "High", sampleQuote: "Diamond hands. Also diamond rings." },
];

export const launchThemes: LaunchTheme[] = [
  { id: "1", name: "Animal + Hat", description: "Put a hat on it. Or don't. Dog, cat, frog—hat = instant narrative.", examples: ["WIF", "Popcat with top hat", "Pepe in a fedora"], sentiment: "bullish", tags: ["hat", "animal", "doge"], oneLiner: "WIF proved it. Hat = alpha." },
  { id: "2", name: "Political / Chaos", description: "Election year. Pick a side or pick both. Controversy = volume.", examples: ["Trump coin", "Vote meme", "Maga hat token"], sentiment: "unhinged", tags: ["politics", "chaos", "controversy"], oneLiner: "Controversy sells. NFA." },
  { id: "3", name: "Based / Sigma", description: "Gigachad, sigma male, red pill. The internet never gets tired.", examples: ["GIGA", "Sigma token", "Chad coin"], sentiment: "bullish", tags: ["based", "sigma", "chad"], oneLiner: "Stay sigma. Ape alpha." },
  { id: "4", name: "Accident / Oops", description: "Dev burned LP. Dev sent to wrong address. 'Accidental' = free marketing.", examples: ["Slerf", "Wrong address token"], sentiment: "unhinged", tags: ["oops", "burn", "accident"], oneLiner: "Rugproof = we burned it ourselves." },
  { id: "5", name: "Absurd / Toilet", description: "Fartcoin, poop, anything that makes normies leave the room.", examples: ["FART", "Poop coin", "Dookie"], sentiment: "unhinged", tags: ["absurd", "toilet", "unhinged"], oneLiner: "If it's stupid and it works..." },
  { id: "6", name: "Meta / Inception", description: "A meme about memes. A coin about pump.fun. Solana about Solana.", examples: ["Pump.fun the token", "Degen coin", "Ser token"], sentiment: "niche", tags: ["meta", "inception", "recursive"], oneLiner: "We're so deep in the meta we need a map." },
];

export const pumpFunFacts: PumpFunFact[] = [
  { id: "1", title: "Bonding curve", body: "You buy, price goes up. You sell, price goes down. No team tokens, no vesting. Just you, the curve, and your poor decisions.", funny: true },
  { id: "2", title: "Graduate to Raydium", body: "Hit the market cap target and liquidity migrates to Raydium. That's when the real fun starts (or ends).", funny: false },
  { id: "3", title: "1 SOL to launch", body: "That's it. No KYC. No pitch deck. Just a name, image, and 1 SOL. What could go wrong?", funny: true },
  { id: "4", title: "Fair launch (copium)", body: "No VC allocation. No insider dump. Everyone gets rekt equally. That's fairness, right?", funny: true },
  { id: "5", title: "Copy-paste culture", body: "See a coin pumping? Launch the same idea with a different animal. It's not copying, it's 'narrative extension'.", funny: true },
];

export const hotTopics: HotTopic[] = [
  { id: "1", title: "Pump.fun volume eating DEXs", body: "Pump.fun trading volume has been rivaling or beating major Solana DEXs. Bonding curves are the new order flow. Everyone's either launching or aping.", vibe: "trending", oneLiner: "The curve is the new AMM. Cope seethe etc." },
  { id: "2", title: "Cat vs dog narrative war", body: "Popcat, dog coins, cat coins—Solana is split between team cat and team dog. The only thing everyone agrees on is that frogs had their moment.", vibe: "funny", oneLiner: "Cats vs dogs. The only war that matters." },
  { id: "3", title: "Guy launches token named after his ex", body: "Anon launches pump.fun token with ex's name and face. It pumps. She finds out. Chaos. This is Solana.", vibe: "retarded", oneLiner: "Rugging your ex, one bonding curve at a time." },
  { id: "4", title: "Solana mobile (Saga) actually selling", body: "Saga phone and dVPN airdrops have people buying Solana hardware. Yes, a crypto phone. Yes, it's a thing again.", vibe: "trending", oneLiner: "Touch grass? No. Touch Solana. On a phone." },
  { id: "5", title: "KOL says 'this is the one' for the 47th time", body: "Influencer shills new pump.fun token. Says it's different. Chart looks like every other bonding curve. Community: 'we're so back'.", vibe: "funny", oneLiner: "NFA but this is the one. (Spoiler: it wasn't.)" },
  { id: "6", title: "Fartcoin hits $80M market cap", body: "A token literally called FART. Toilet humor. No utility. Just vibes. Solana said yes. Your parents would not understand.", vibe: "retarded", oneLiner: "We put a man on the moon and then we did this." },
  { id: "7", title: "Jupiter airdrop 2 / JUP utility", body: "JUP governance and potential second airdrop are keeping aggregator volume high. Everyone's farming the next drop. Or pretending to.", vibe: "trending", oneLiner: "Airdrop season: the only season that matters." },
  { id: "8", title: "Dev 'accidentally' burns LP, token moons", body: "Slerf wasn't the last. Another dev 'mistakenly' burns liquidity. Community calls it rugproof. Token pumps. Only on Solana.", vibe: "retarded", oneLiner: "Oops I burned it. Anyway here's 10x." },
  { id: "9", title: "Mad Lads floor holding while shitcoins dump", body: "NFTs are dead until they're not. Mad Lads and a few Solana blue chips are holding floor while degen tokens flip 90%. Narrative shift?", vibe: "trending", oneLiner: "JPEGs: still here. Your bags: not so much." },
  { id: "10", title: "Entire CT fighting over 'fair launch' definition", body: "Is pump.fun fair? Is anything fair? Eth maxis say no. Solana degens say only we have fair. Nobody agrees. Great content.", vibe: "funny", oneLiner: "Fair is when we win. Unfair is when they do." },
  { id: "11", title: "Political memecoins printing", body: "Election year. Trump coin, vote tokens, chaos coins. Controversy = volume. Everyone's aping or arguing. No in-between.", vibe: "trending", oneLiner: "Politics and memes: name a better duo. (Don't.)" },
  { id: "12", title: "Someone made a coin that's just the word 'the'", body: "Literal word 'the' as a token. No image. Just text. It has a market cap. We've peaked. We've also bottomed.", vibe: "retarded", oneLiner: "The. That's it. That's the token." },
];

/** Meme generator: animals (classic + crypto meme animals) */
export const memeAnimals: MemeSubjectOption[] = [
  { id: "dog", name: "Dog / Doge", theme: "Shiba, hat optional", suggestedCaption: "When you hold through -80% and the chart finally does the thing | Still not selling" },
  { id: "cat", name: "Cat / Popcat", theme: "Mouth open, screaming", suggestedCaption: "Normies when they discover pump.fun | Degens who have been here since January" },
  { id: "frog", name: "Frog / Pepe", theme: "Green frog, feels", suggestedCaption: "When the KOL says 'this is the one' for the 47th time | Me still aping anyway" },
  { id: "wojak", name: "Wojak", theme: "Crying / coping", suggestedCaption: "Me checking my portfolio at 3am after -90% | 'It's fine. I'm early.'" },
  { id: "chad", name: "Gigachad", theme: "Sigma, unbothered", suggestedCaption: "Selling at the top | Buying the dip with my last SOL" },
  { id: "monke", name: "Monke / Ape", theme: "Diamond hands", suggestedCaption: "Reading the whitepaper | Ape in, figure it out later" },
  { id: "duck", name: "Duck", theme: "Pond, chill", suggestedCaption: "Caring about fundamentals | Just another animal with a hat" },
  { id: "bird", name: "Bird / Twitter", theme: "Blue bird, chaos", suggestedCaption: "Tweeting 'NFA' | The SEC reading your timeline" },
  { id: "bear", name: "Bear", theme: "Market crash", suggestedCaption: "Bull market mentality | Bear market reality" },
  { id: "fox", name: "Fox", theme: "Sly, alpha", suggestedCaption: "Missing the pump | 'I was early, you're late'" },
  { id: "rat", name: "Rat", theme: "Exit liquidity", suggestedCaption: "Thinking you're the smart money | You're the exit liquidity" },
  { id: "fish", name: "Fish", theme: "Whale / small fish", suggestedCaption: "Whales dumping | Me with 0.5 SOL still holding" },
  { id: "capybara", name: "Capybara / $MATE", theme: "Chill, cyber-noir", suggestedCaption: "Pump.fun launching another animal | $MATE capybara just chilling" },
];

/** Meme generator: symbols & vibes (rocket, moon, etc.) */
export const memeSymbols: MemeSubjectOption[] = [
  { id: "rocket", name: "Rocket", theme: "To the moon", suggestedCaption: "When your shitcoin does a 10x in 20 minutes | Still not selling" },
  { id: "moon", name: "Moon", theme: "Destination", suggestedCaption: "Paper hands selling at 2x | Diamond hands still waiting for the moon" },
  { id: "diamond", name: "Diamond hands", theme: "Holding", suggestedCaption: "Selling for 'profits' | Holding until zero or hero" },
  { id: "chart", name: "Chart", theme: "Green / red", suggestedCaption: "Looking at the chart | The chart looking back at you" },
  { id: "bag", name: "Money bag", theme: "Gains / losses", suggestedCaption: "My portfolio last week | My portfolio this week" },
  { id: "fire", name: "Fire / Burn", theme: "Rug / burn", suggestedCaption: "Dev: 'LP is burned' | Community: 'So based'" },
  { id: "copium", name: "Copium", theme: "Cope", suggestedCaption: "It's not a rug, it's a 'correction' | Me on -80% copium" },
  { id: "ser", name: "Ser", theme: "CT slang", suggestedCaption: "Explaining your bags to a normie | Ser, it's going to moon" },
  { id: "ngmi", name: "NGMI / GM", theme: "Vibes", suggestedCaption: "Selling the bottom | GM, we're so back" },
  { id: "alpha", name: "Alpha", theme: "Secret info", suggestedCaption: "Asking for alpha in the group | The alpha was the friends we rekt along the way" },
];

/** Label for last data refresh — use with live API to show "Updated 5m ago" etc. */
export const DATA_UPDATED_LABEL = "Prices & FP update periodically";
