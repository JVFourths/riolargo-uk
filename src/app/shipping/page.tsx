import type { Metadata } from "next";
import ShippingContent from "./shipping-content";

export const metadata: Metadata = {
  title: "Shipping & Returns | Rio Largo",
  description:
    "Free UK delivery on all orders via Royal Mail Tracked 48. Dispatched same day if ordered before 2pm. 14-day satisfaction guarantee.",
  openGraph: {
    title: "Shipping & Returns | Rio Largo",
    description: "Free UK delivery on all orders. Dispatched same day if ordered before 2pm.",
    type: "website",
  },
};

export default function ShippingPage() {
  return <ShippingContent />;
}
