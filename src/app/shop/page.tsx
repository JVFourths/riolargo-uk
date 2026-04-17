import type { Metadata } from "next";
import ShopContent from "./shop-content";

export const metadata: Metadata = {
  title: "Shop | Rio Largo Extra Virgin Olive Oil",
  description:
    "Three 500ml label editions of our cold-pressed extra virgin olive oil from the Breede River Valley. Free UK delivery.",
  openGraph: {
    title: "Shop Rio Largo Olive Oil",
    description:
      "Three 500ml label editions of our cold-pressed extra virgin olive oil. Free UK delivery.",
    type: "website",
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
