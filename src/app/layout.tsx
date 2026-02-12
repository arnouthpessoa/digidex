import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CRTOverlay } from "@/components/CRTOverlay";
import { Header } from "@/components/Header";
import { StatsTracker } from "@/components/StatsTracker";
import { TrackerProvider } from "@/context/TrackerContext";

const pixelDigivolve = localFont({
  src: [
    {
      path: "../../public/fonts/Pixel Digivolve.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pixel Digivolve Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DIGIDEX - Digimon World Evolution Tracker",
  description: "Track your Digimon evolution requirements for Digimon World (Maeson Patch)",
  keywords: ["Digimon World", "Evolution", "Tracker", "Maeson Patch", "PS1"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixelDigivolve.variable} ${vt323.variable}`}>
      <body className="font-retro antialiased min-h-screen bg-bg-dark text-text-primary">
        <TrackerProvider>
          <CRTOverlay />
          <div className="relative z-10 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pb-20">
              {children}
            </main>
            <footer className="text-center py-4 text-text-secondary text-sm">
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/arnouthpessoa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-green hover:underline"
              >
                @arnouthpessoa
              </a>
            </footer>
          </div>
          <StatsTracker />
        </TrackerProvider>
      </body>
    </html>
  );
}
