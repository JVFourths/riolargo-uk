import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact | Rio Largo",
  description:
    "Questions about Rio Largo olive oil, an order or wholesale? Email Sidwell's, the estate's sole UK supplier.",
  openGraph: {
    title: "Contact | Rio Largo",
    description: "Get in touch about our oils, your order, or wholesale enquiries.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
