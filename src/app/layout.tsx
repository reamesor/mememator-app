import type { Metadata } from "next";
import "./globals.css";
import { MateProvider } from "@/context/MateContext";
import { ForgeDraftProvider } from "@/context/ForgeDraftContext";

export const metadata: Metadata = {
  title: "Mememator $MATE — Solana Meme-to-Market Engine",
  description:
    "The Forge. Create memes. Launch to Pump.fun. Based.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen min-w-0 overflow-x-hidden antialiased">
        <MateProvider>
          <ForgeDraftProvider>{children}</ForgeDraftProvider>
        </MateProvider>
      </body>
    </html>
  );
}
