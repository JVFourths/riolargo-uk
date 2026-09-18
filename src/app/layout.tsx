import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/motion-config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // "./" resolves against each route, so every page gets its own canonical on the bare domain.
  alternates: { canonical: "./" },
  title: "Rio Largo | Award-Winning South African Olive Oil",
  description:
    "Extra virgin olive oil from a family estate on the Breede River, South Africa. Award-winning, cold extracted, and sold in the UK by Sidwell's.",
  openGraph: {
    siteName: "Rio Largo Olive Estate",
    locale: "en_GB",
    type: "website",
  },
  keywords: [
    "olive oil",
    "South African olive oil",
    "extra virgin",
    "premium olive oil",
    "Rio Largo",
    "Breede River Valley",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${hanken.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper-raised focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
