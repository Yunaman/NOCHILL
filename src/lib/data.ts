import { Product, Collection, NextDrop } from "@/types";

/**
 * PRODUCTION MOCK DATA - NOCHILL
 * Curated high-quality visual artifacts for luxury streetwear aesthetic.
 */

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "NOCHILL SIGNATURE HOODIE",
    price: 185,
    description: "HEAVYWEIGHT 500GSM COTTON HOODIE. DESIGNED FOR THE VOID. FEATURES DISCREET CHROME LOGO EMBROIDERY AND CINEMATIC DROPPED SHOULDERS.",
    category: "Hoodies",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
      "https://images.unsplash.com/photo-1514332930284-94224a742123?q=80&w=1000"
    ],
    details: ["500GSM LUXURY COTTON", "DOUBLE-STITCHED SEAMS", "CHROME LOGO EMBROIDERY", "OVERSIZED CINEMATIC FIT"],
    featured: true,
    variants: ["S", "M", "L", "XL"]
  },
  {
    id: "p2",
    name: "VOID ARCHIVE TEE",
    price: 85,
    description: "PREMIUM OVERSIZED TEE IN TRIPLE-WASHED BLACK. FEATURES DISTRESSED EDGES AND REAR SIGNAL PRINT.",
    category: "Tees",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=1000"
    ],
    details: ["250GSM SINGLE JERSEY", "SCREEN-PRINTED GRAPHICS", "DISTRESSED HEM DETAIL", "PRE-SHRUNK FOR PERFECT FIT"],
    featured: true,
    variants: ["M", "L", "XL"]
  },
  {
    id: "p3",
    name: "TACTICAL VOID CARGO",
    price: 245,
    description: "MULTIPLE COMPARTMENT TACTICAL PANTS WITH REFLECTIVE ACCENTS. WATER-RESISTANT FINISH FOR UNDERGROUND OPERATIVES.",
    category: "Pants",
    images: [
      "https://images.unsplash.com/photo-1511105612320-2e62a04dd044?q=80&w=1000",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000"
    ],
    details: ["NYLON RIPSTOP FABRIC", "6 TACTICAL POCKETS", "ADJUSTABLE ANKLE STRAPS", "WATER-REPELLENT COATING"],
    featured: true,
    variants: ["30", "32", "34", "36"]
  },
  {
    id: "p4",
    name: "NO SIGNAL BEANIE",
    price: 45,
    description: "MINIMALIST LOGO BEANIE. HEAVY RIBBED KNIT. DESIGNED FOR MAXIMUM COMFORT IN LOW-LIGHT ENVIRONMENTS.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1534215754734-18e2973b7d80?q=80&w=1000",
      "https://images.unsplash.com/photo-1471466054146-e71bcc0d2bb2?q=80&w=1000"
    ],
    details: ["100% MERINO WOOL", "RIBBED TEXTURE", "SILVER-THREAD EMBROIDERY"],
    variants: ["O/S"]
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    name: "THE VOID // 001",
    slug: "the-void-001",
    description: "The premiere artifact series exploring the boundaries of shadow and light.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000"
  },
  {
    id: "c2",
    name: "NO SIGNAL // 24",
    slug: "no-signal-24",
    description: "A tribute to the static of the underground city nights.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000"
  }
];

export const NEXT_DROP: NextDrop = {
  title: "VOID RUNNER // 002",
  date: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
  image: "https://images.unsplash.com/photo-1514332930284-94224a742123?q=80&w=1000",
  description: "THE NEXT EVOLUTION OF THE ARTIFACT COLLECTION. PREPARE FOR DEPLOYMENT."
};
