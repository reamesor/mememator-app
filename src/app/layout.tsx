import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MateProvider } from "@/context/MateContext";
import { ForgeDraftProvider } from "@/context/ForgeDraftContext";
import { CreationHistoryProvider } from "@/context/CreationHistoryContext";
import SolanaWalletProvider from "@/providers/SolanaWalletProvider";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import FloatingCapybaraFaces from "@/components/ui/FloatingCapybaraFaces";

export const metadata: Metadata = {
  title: "Mememator $MATE — Solana Meme-to-Market Engine",
  description:
    "Mememator helps launcher wannabes turn memes into tokens—easy launch to Pump.fun. Lore, meme, forge, launch.",
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
        <InteractiveBackground />
        <FloatingCapybaraFaces />
        <div className="relative z-10">
          <SolanaWalletProvider>
            <MateProvider>
              <CreationHistoryProvider>
                <ForgeDraftProvider>{children}</ForgeDraftProvider>
              </CreationHistoryProvider>
            </MateProvider>
          </SolanaWalletProvider>
        </div>
      </body>
    </html>
  );
}
