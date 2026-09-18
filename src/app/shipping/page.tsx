import type { Metadata } from "next";
import ShippingContent from "./shipping-content";

export const metadata: Metadata = {
  title: "Delivery & Returns | Rio Largo",
  description:
    "Rio Largo olive oil is sold and delivered in the UK by Sidwell's. Delivery is priced at their checkout and returns follow their policy.",
  openGraph: {
    title: "Delivery & Returns | Rio Largo",
    description: "Sold and delivered in the UK by Sidwell's.",
    type: "website",
  },
};

export default function ShippingPage() {
  return <ShippingContent />;
}
