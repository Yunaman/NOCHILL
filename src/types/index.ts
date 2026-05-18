export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[]; // [front, back]
  details: string[];
  featured?: boolean;
  variants?: string[]; // e.g. ["S", "M", "L", "XL"]
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
}

export interface NextDrop {
  id: string;
  title: string;
  date: string; // ISO string
  image: string;
  description: string;
}
