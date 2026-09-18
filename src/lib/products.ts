// The range mirrors what Sidwell's sells in the UK: https://sidwells.net/product-category/olive-oil/
// Only list a product here if it is listed there. Ordering happens on sidwells.net:
// each product links to its own page there via `orderUrl`.

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
  imageAlt: string;
  /** "contain" for tall cut-out shots that an arched crop would clip. */
  imageFit: "cover" | "contain";
  available: boolean;
  /** The product page on sidwells.net, where the customer buys it. */
  orderUrl: string;
};

export const SIDWELLS_OLIVE_OIL_URL = "https://sidwells.net/product-category/olive-oil/";

export const products: Product[] = [
  {
    slug: "botanicals",
    shortName: "Botanicals",
    name: "“Botanicals” Extra Virgin Olive Oil",
    tagline: "A celebration of the Cape's indigenous flora",
    description:
      "Beautifully balanced with a peppery finish and a smooth, buttery body. Our everyday oil, bright enough for salads and soft enough for finishing.",
    flavourNotes: "Peppery · Buttery · Balanced",
    pairing: "Salads, fresh bread, grilled vegetables",
    price: "13.00",
    size: "500ml",
    image: "/images/label-botanicals-800w.webp",
    imageAlt:
      "Rio Largo Botanicals decanter, printed with wildflowers and grasses, on a garden table",
    imageFit: "cover",
    available: true,
    orderUrl: "https://sidwells.net/product/botanicals-extra-virgin-olive-oil-500ml/",
  },
  {
    slug: "belle-fiore",
    shortName: "Belle Fiore",
    name: "“Belle Fiore” Extra Virgin Olive Oil",
    tagline: "Rich, full-bodied, made for the dedicated home cook",
    description:
      "Grassy undertones and a deep golden colour. A robust oil that stands up to strong flavours without losing its character.",
    flavourNotes: "Grassy · Robust · Golden",
    pairing: "Tomato dishes, roast meats, bean stews",
    price: "13.00",
    size: "500ml",
    image: "/images/label-belle-fiore-800w.webp",
    imageAlt:
      "Rio Largo Belle Fiore decanter, printed with pink roses on a dark ground",
    imageFit: "cover",
    available: true,
    orderUrl: "https://sidwells.net/product/rio-largo-belle-fiore-extra-virgin-olive-oil-500ml/",
  },
  {
    slug: "karoo-splendor",
    shortName: "Karoo Splendor",
    name: "“Karoo Splendor” Extra Virgin Olive Oil",
    tagline: "Inspired by the rugged beauty of the Karoo",
    description:
      "Our award-winning cold-extracted flagship. Herbaceous, bright, and unmistakably estate-grown.",
    flavourNotes: "Herbaceous · Bright · Complex",
    pairing: "Fish, burrata, fresh pasta, as a finishing oil",
    price: "13.00",
    size: "500ml",
    image: "/images/label-karoo-splendor-800w.webp",
    imageAlt:
      "Rio Largo Karoo Splendor decanter, printed with succulents, in front of Karoo hills",
    imageFit: "cover",
    available: true,
    orderUrl: "https://sidwells.net/product/karoo-splendor-extra-virgin-olive-oil-500ml/",
  },
  {
    slug: "one-litre",
    shortName: "The Litre",
    name: "Rio Largo Extra Virgin Olive Oil (1 Litre)",
    tagline:
      "The same oil in the black olive-branch decanter, for kitchens that get through it",
    description:
      "Selected Italian olive varieties, cold extracted so the oil keeps its goodness, then blended for a consistent flavour and aroma. The odd trace of sediment is normal: the oil is strained by gravity alone. Keep it somewhere cool and dark, not in the fridge.",
    flavourNotes: "Cold extracted · Gravity strained",
    pairing: "Everyday cooking, dressings and the table",
    price: "22.00",
    size: "1 litre",
    image: "/images/decanter-1l-800w.webp",
    imageAlt:
      "Rio Largo one litre decanter in black with white olive-branch drawings",
    imageFit: "contain",
    available: true,
    orderUrl: "https://sidwells.net/product/rio-largo-extra-virgin-olive-oil-1-litre/",
  },
];
