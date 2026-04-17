import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "Our Story | Rio Largo Olive Estate",
  description:
    "A family estate in the Breede River Valley producing award-winning extra virgin olive oil. Frantoio, Leccino, and Coratina varietals, cold-pressed on site.",
  openGraph: {
    title: "Our Story | Rio Largo Olive Estate",
    description:
      "A family estate in the Breede River Valley producing award-winning extra virgin olive oil.",
    type: "article",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
