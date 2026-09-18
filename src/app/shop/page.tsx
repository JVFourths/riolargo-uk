import type { Metadata } from "next";
import ShopContent from "./shop-content";
import { JsonLd } from "@/components/json-ld";
import { shopSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Shop | Rio Largo Extra Virgin Olive Oil",
  description:
    "Rio Largo extra virgin olive oil from the Breede River Valley: three 500ml labels and a one litre, sold in the UK by Sidwell's.",
  openGraph: {
    title: "Shop Rio Largo Olive Oil",
    description:
      "Three 500ml labels and a one litre, sold in the UK by Sidwell's.",
    type: "website",
  },
};

export default function ShopPage() {
  return (
    <>
      <JsonLd data={shopSchema} />
      <ShopContent />
    </>
  );
}
