import { products, type Product } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

// schema.org markup. Every value is derived from products.ts and site.ts, so it cannot
// drift from what the page shows. Sidwell's is the seller: the offer URL is their product page.

const BRAND_PREFIX = "Rio Largo";

const SELLER = {
  "@type": "Organization",
  name: "Sidwell's",
  url: "https://sidwells.net/",
};

function productSchema(product: Product) {
  return {
    "@type": "Product",
    "@id": `${SITE_URL}/shop#${product.slug}`,
    name: product.name.startsWith(BRAND_PREFIX) ? product.name : `${BRAND_PREFIX} ${product.name}`,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    category: "Extra virgin olive oil",
    size: product.size,
    countryOfOrigin: "ZA",
    brand: { "@type": "Brand", name: "Rio Largo Olive Estate" },
    offers: {
      "@type": "Offer",
      url: product.orderUrl,
      price: product.price,
      priceCurrency: "GBP",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: SELLER,
    },
  };
}

export const shopSchema = {
  "@context": "https://schema.org",
  "@graph": products.map(productSchema),
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Rio Largo Olive Estate UK",
      inLanguage: "en-GB",
    },
    {
      "@type": "Brand",
      "@id": `${SITE_URL}/#brand`,
      name: "Rio Largo Olive Estate",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-500w.webp`,
    },
  ],
};
