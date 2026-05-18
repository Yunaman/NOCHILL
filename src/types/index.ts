export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  details: string[];
  featured?: boolean;
  archived?: boolean;
  variants?: string[];
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
