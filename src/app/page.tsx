import { Suspense } from "react";
import AppWithEntry from "@/components/AppWithEntry";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <AppWithEntry />
    </Suspense>
  );
}
