"use client";

import Link from "next/link";

type SectionLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function SectionLayout({ title, children }: SectionLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950/95">
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4">
          <Link
            href="/?hub=1"
            className="min-h-[2.75rem] min-w-[2.75rem] flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-300"
          >
            ← Mememator
          </Link>
          <span className="text-sm text-zinc-500">{title}</span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl min-w-0 px-3 py-3 sm:px-4 sm:py-5">
        {children}
      </main>
    </div>
  );
}
