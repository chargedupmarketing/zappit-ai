import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zappit AI | AI-Powered Trading Indicators & Algorithms",
  description:
    "Trade smarter with AI-powered indicators and fully automated trading algorithms for ES & NQ futures. Built for prop firm traders and personal capital investors.",
  keywords: [
    "trading indicators",
    "trading algorithms",
    "AI trading",
    "futures trading",
    "ES",
    "NQ",
    "prop firm",
    "TradingView",
    "Apex",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="glow-orb-1" />
          <div className="glow-orb-2" />
          <div className="glow-orb-3" />
          <div className="relative z-10 min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
