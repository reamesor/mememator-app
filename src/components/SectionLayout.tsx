"use client";

import Link from "next/link";

type SectionLayoutProps = {
  title: string;
  accent?: "cyan" | "orange" | "purple" | "amber" | "emerald" | "rose" | "sky";
  children: React.ReactNode;
};

const accentStyles = {
  cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400",
  orange: "from-orange-500/20 to-amber-600/10 border-orange-500/30 text-orange-400",
  purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
  amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
  emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400",
  rose: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400",
  sky: "from-sky-500/20 to-sky-600/10 border-sky-500/30 text-sky-400",
};

export default function SectionLayout({ title, accent = "cyan", children }: SectionLayoutProps) {
  const styles = accentStyles[accent];
  return (
    <div className="min-h-screen bg-zinc-950/90">
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/97 backdrop-blur-md shadow-[0_1px_0_0_rgba(34,211,238,0.06)]">
        <div className="container-tight flex items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link
            href="/?hub=1"
            className="group min-h-[2.75rem] min-w-[2.75rem] flex items-center gap-2.5 rounded-lg border border-zinc-700/60 bg-zinc-900/60 px-3 py-2 text-sm font-medium text-zinc-400 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            <img src="/capybara-faces/capybara-1.png" alt="" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain" />
            <span>← Mememator</span>
          </Link>
          <span className={`rounded-full border bg-gradient-to-r px-4 py-1.5 text-sm font-semibold ${styles}`}>
            {title}
          </span>
        </div>
      </header>
      <main className="container-tight w-full min-w-0 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
