"use client";

import { ReactNode } from "react";

type RetroCardProps = {
  children: ReactNode;
  className?: string;
};

export default function RetroCard({ children, className = "" }: RetroCardProps) {
  return (
    <div className={`retro-card rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}
