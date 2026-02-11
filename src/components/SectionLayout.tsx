"use client";

import Link from "next/link";
import CapybaraHead from "@/components/ui/CapybaraHead";

type SectionLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function SectionLayout({ title, children }: SectionLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950/88">
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur">
        <div className="container-tight flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/?hub=1"
            className="min-h-[2.75rem] min-w-[2.75rem] flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-300"
          >
            <CapybaraHead className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            ← Mememator
          </Link>
          <span className="text-sm text-zinc-500">{title}</span>
        </div>
      </header>
      <main className="container-tight w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6">
        {children}
      </main>
    </div>
  );
}
