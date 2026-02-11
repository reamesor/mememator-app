"use client";

const MOCK_BURNS = [
  "12,847 $MATE burned · Launches today",
  "Wallet 7xK...3mN burned 2,000 $MATE for luck",
  "Pump.fun launch #48291 · 500 $MATE burned",
  "Total burned: 4.2M $MATE",
  "Wallet 9pL...1qR · 1,500 $MATE · Based.",
  "Live burn · 12,847 launches · 500 $MATE per launch",
];

export default function BurnTicker() {
  const duplicate = [...MOCK_BURNS, ...MOCK_BURNS];
  return (
    <div className="overflow-hidden border-y border-zinc-800 bg-zinc-950/90 py-1.5">
      <div className="flex animate-burn-ticker whitespace-nowrap text-cyan-400/90 font-pixel text-[10px] sm:text-xs">
        {duplicate.map((line, i) => (
          <span key={i} className="mx-4">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
