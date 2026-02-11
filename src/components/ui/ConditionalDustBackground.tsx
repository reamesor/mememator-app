"use client";

import { usePathname } from "next/navigation";
import DustBackground from "./DustBackground";

const HIDE_DUST_PATHS = ["/forge", "/hype-hall"];

export default function ConditionalDustBackground() {
  const pathname = usePathname();
  const hide = HIDE_DUST_PATHS.some((p) => pathname === p || pathname?.startsWith(p + "/"));

  if (hide) return null;
  return <DustBackground />;
}
