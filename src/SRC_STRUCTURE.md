# Source structure

## Routes (`app/`)

| Route | Purpose |
|-------|--------|
| `/` | Home: globe landing → hub (AppWithEntry) |
| `/hot` | Hot topics (Solana trends) |
| `/pump` | Pump.fun launch info |
| `/shitcoins` | Memecoin list |
| `/lore` | Token lore & meme copy |
| `/meme` | Meme generator (KOLs, templates) |
| `/utility` | $MATE manifesto + utility grid (monochrome) |
| `/mate` | $MATE token info + launchpad links |
| `/ignition` | The Ignition (connect → Forge) |
| `/forge` | 3-panel meme editor + launch |
| `/hype-hall` | Hype Hall grid |

## Components

- **AppWithEntry** – Main app: landing (GlobeScene + LandingView) or hub with nav + cards.
- **landing/** – GlobeScene (3 orbs), LandingView (manifesto + Enter), IgnitionHero (3D), MouseContext.
- **sections/** – One section per content area (Hot, Pump, Memecoin, DeFi, Lore, KOL/Meme, Themes, Twitter, MemeTagReference).
- **SectionLayout** – Shared wrapper for section pages (back link + title).
- **ui/** – BurnTicker, ChaosSlider, PumpLaunchModal, RetroCard.

## Data & context

- **lib/** – types, mockData, memeSchema, memeArt.
- **context/** – MateContext (balance, connect, tiers).
- **api/** – improve-lore (AI lore suggestions).

## Fonts & theme

- **globals.css** – `--font-primary` (JetBrains Mono) site-wide; void/terminal/chaos variables; utility animations.
