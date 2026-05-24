export interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  collection?: string;
  images: string[];
  imageUrl?: string;
  imageUrlHover?: string;
  details: string[];
  featured?: boolean;
  archived?: boolean;
  variants?: string[];
  slug?: string;
  status?: "live" | "low" | "sold";
  dropNumber?: number;
  dropTotal?: number;
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface NextDrop {
  date: string;
  title: string;
  description: string;
  image: string;
}