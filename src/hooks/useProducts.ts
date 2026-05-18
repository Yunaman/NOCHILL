"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { PRODUCTS as INITIAL_PRODUCTS } from '@/lib/data';

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

export const useProducts = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      addProduct: (product) => {
        set({ products: [product, ...get().products] });
      },
      updateProduct: (updatedProduct) => {
        set({
          products: get().products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          ),
        });
      },
      removeProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
      },
      getProduct: (id) => {
        return get().products.find((p) => p.id === id);
      },
    }),
    {
      name: 'nochill-product-storage',
    }
  )
);
