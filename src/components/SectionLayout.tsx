"use client";

import Link from "next/link";

type SectionLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function SectionLayout({ title, children }: SectionLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-3 py-2 sm:px-4 sm:py-2.5">
          <Link
            href="/?hub=1"
            className="text-xs font-medium text-zinc-500 hover:text-zinc-300 sm:text-sm"
          >
            ← Mememator
          </Link>
          <span className="text-xs text-zinc-500 sm:text-sm">{title}</span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl min-w-0 px-3 py-4 sm:px-4 sm:py-6">
        {children}
      </main>
    </div>
  );
}
