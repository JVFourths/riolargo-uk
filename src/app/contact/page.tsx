import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact | Rio Largo",
  description:
    "Get in touch about our oils, your order, or wholesale enquiries. We aim to respond within 24 hours.",
  openGraph: {
    title: "Contact | Rio Largo",
    description: "Get in touch about our oils, your order, or wholesale enquiries.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
