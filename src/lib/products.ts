export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  flavourNotes: string;
  pairing: string;
  price: string;
  size: string;
  image: string;
  available: boolean;
  saPrice?: string;
};

const SMALL_BOTTLE_IMAGE = "/images/bottle-500ml-800w.webp";

export const products: Product[] = [
  {
    slug: "botanicals",
    shortName: "Botanicals",
    name: "\u201CBotanicals\u201D Extra Virgin Olive Oil",
    tagline: "A celebration of the Cape's indigenous flora",
    description:
      "Beautifully balanced with a peppery finish and a smooth, buttery body. Our everyday oil, bright enough for salads and soft enough for finishing.",
    flavourNotes: "Peppery \u00B7 Buttery \u00B7 Balanced",
    pairing: "Salads, fresh bread, grilled vegetables",
    price: "13.00",
    size: "500ml",
    image: SMALL_BOTTLE_IMAGE,
    available: true,
  },
  {
    slug: "belle-fiore",
    shortName: "Belle Fiore",
    name: "\u201CBelle Fiore\u201D Extra Virgin Olive Oil",
    tagline: "Rich, full-bodied, made for the dedicated home cook",
    description:
      "Grassy undertones and a deep golden colour. A robust oil that stands up to strong flavours without losing its character.",
    flavourNotes: "Grassy \u00B7 Robust \u00B7 Golden",
    pairing: "Tomato dishes, roast meats, bean stews",
    price: "13.00",
    size: "500ml",
    image: SMALL_BOTTLE_IMAGE,
    available: true,
  },
  {
    slug: "karoo-splendor",
    shortName: "Karoo Splendor",
    name: "\u201CKaroo Splendor\u201D Extra Virgin Olive Oil",
    tagline: "Inspired by the rugged beauty of the Karoo",
    description:
      "Our award-winning cold-extracted flagship. Herbaceous, bright, and unmistakably estate-grown.",
    flavourNotes: "Herbaceous \u00B7 Bright \u00B7 Complex",
    pairing: "Finishing oil for fish, burrata, fresh pasta",
    price: "13.00",
    size: "500ml",
    image: SMALL_BOTTLE_IMAGE,
    available: true,
  },
];

export const waitlistProducts: Product[] = [
  {
    slug: "decanter-1l",
    shortName: "1 Litre Decanter",
    name: "1 Litre Decanter",
    tagline: "Reusable kitchen decanter with tap",
    description:
      "The same award-winning oil in a beautiful reusable decanter with a built-in tap. Perfect for the kitchen counter.",
    flavourNotes: "",
    pairing: "",
    price: "",
    size: "1 Litre",
    image: "/images/waitlist-1l-800w.webp",
    available: false,
    saPrice: "R330",
  },
  {
    slug: "decanter-2l",
    shortName: "2 Litre Decanter",
    name: "2 Litre Decanter",
    tagline: "Best value for dedicated enthusiasts",
    description:
      "Refillable decanter keeps oil fresh until the last drop. For households that get through a lot of good oil.",
    flavourNotes: "",
    pairing: "",
    price: "",
    size: "2 Litre",
    image: "/images/waitlist-2l-800w.webp",
    available: false,
    saPrice: "R630",
  },
];
