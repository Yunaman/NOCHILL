import { Product, Collection, NextDrop } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "VOID HOODIE",
    price: 180,
    description: "Heavyweight cotton oversized hoodie with distressed edges. Built for the outsiders.",
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
      "https://images.unsplash.com/photo-1556821921-25237edd16e6?q=80&w=1000"
    ],
    details: ["450 GSM Cotton", "Enzyme Washed", "Screen printed branding", "Oversized fit"],
    featured: true,
    variants: ["S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "SIGNAL CARGO",
    price: 220,
    description: "Multi-pocket technical cargo pants in matte black nylon. No signal found.",
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000"
    ],
    details: ["Water-resistant nylon", "Custom hardware", "Adjustable hem", "6 functional pockets"],
    featured: true,
    variants: ["28", "30", "32", "34"]
  },
  {
    id: "3",
    name: "ARCHIVE TEE",
    price: 85,
    description: "Vintage washed graphic tee featuring the NOCHILL archive emblem.",
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000"
    ],
    details: ["240 GSM Cotton", "Dropped shoulders", "Direct-to-garment print", "Pre-shrunk"],
    featured: false,
    variants: ["S", "M", "L", "XL"]
  },
  {
    id: "4",
    name: "CHROME BEANIE",
    price: 45,
    description: "Ribbed knit beanie with chrome-finished logo plaque.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1640134444558-5f212265005c?q=80&w=1000"
    ],
    details: ["Wool blend", "Removable metal plaque", "Double fold", "One size"],
    featured: true,
    variants: ["OS"]
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    name: "DROP 001",
    slug: "drop-001",
    description: "The initial emergence into the void.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
  },
  {
    id: "c2",
    name: "ARCHIVE",
    slug: "archive",
    description: "Historical artifacts from the underground.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000",
  },
];

export const NEXT_DROP: NextDrop = {
  id: "d1",
  title: "VOID RUNNER // 002",
  date: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
  image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
  description: "Limited availability artifacts. Worldwide access only."
};
