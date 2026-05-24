"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/sanity";
import { Product } from "@/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const mapped = data.map((p: any) => ({
          id: p._id,
          _id: p._id,
          name: p.name,
          price: p.price,
          description: p.description ?? "",
          category: p.collection ?? "core",
          collection: p.collection,
          images: p.imageUrl ? [p.imageUrl] : [],
          imageUrl: p.imageUrl,
          imageUrlHover: p.imageUrlHover,
          slug: p.slug?.current ?? p.slug,
          status: p.status ?? "live",
          dropNumber: p.dropNumber ?? 1,
          dropTotal: p.dropTotal ?? 100,
          sizes: p.sizes ?? [],
          featured: p.featured ?? false,
          archived: false,
          details: [],
        }));
        setProducts(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}