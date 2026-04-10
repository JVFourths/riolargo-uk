import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion-config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rio Largo | Award-Winning South African Olive Oil",
  description:
    "Premium extra virgin olive oil from the Breede River Valley, South Africa. Award-winning, cold-pressed, and delivered fresh to the UK.",
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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-text font-body antialiased">
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
