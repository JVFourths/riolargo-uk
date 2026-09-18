import type { Metadata } from "next";
import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy | Rio Largo",
  description:
    "This site sets no cookies, runs no tracking and collects no personal details. Orders are placed with Sidwell's.",
  openGraph: {
    title: "Privacy | Rio Largo",
    description: "No cookies, no tracking, no forms. Orders are placed with Sidwell's.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
