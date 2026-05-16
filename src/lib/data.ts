import { Product, Collection } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "VOID HOODIE",
    price: 180,
    description: "Heavyweight cotton oversized hoodie with distressed edges. Built for the outsiders.",
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000"],
    details: ["450 GSM Cotton", "Enzyme Washed", "Screen printed branding", "Oversized fit"],
  },
  {
    id: "2",
    name: "SIGNAL CARGO",
    price: 220,
    description: "Multi-pocket technical cargo pants in matte black nylon. No signal found.",
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000"],
    details: ["Water-resistant nylon", "Custom hardware", "Adjustable hem", "6 functional pockets"],
  },
  {
    id: "3",
    name: "ARCHIVE TEE",
    price: 85,
    description: "Vintage washed graphic tee featuring the NOCHILL archive emblem.",
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000"],
    details: ["240 GSM Cotton", "Dropped shoulders", "Direct-to-garment print", "Pre-shrunk"],
  },
  {
    id: "4",
    name: "CHROME BEANIE",
    price: 45,
    description: "Ribbed knit beanie with chrome-finished logo plaque.",
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1576828231591-13c1ec720ec7?q=80&w=1000"],
    details: ["Wool blend", "Removable metal plaque", "Double fold", "One size"],
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
