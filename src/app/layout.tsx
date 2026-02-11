import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MateProvider } from "@/context/MateContext";
import { ForgeDraftProvider } from "@/context/ForgeDraftContext";
import DustBackground from "@/components/ui/DustBackground";

export const metadata: Metadata = {
  title: "Mememator $MATE — Solana Meme-to-Market Engine",
  description:
    "The Forge. Create memes. Launch to Pump.fun. Based.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="relative min-h-screen min-w-0 overflow-x-hidden antialiased">
        <DustBackground />
        <div className="relative z-10">
          <MateProvider>
            <ForgeDraftProvider>{children}</ForgeDraftProvider>
          </MateProvider>
        </div>
      </body>
    </html>
  );
}
