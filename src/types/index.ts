export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  details: string[];
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}
