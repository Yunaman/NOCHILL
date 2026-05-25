"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://1cly5ldq.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=="product"]{_id,name,slug,status,price,collection,dropNumber,dropTotal,featured,description,sizes,"imageUrl":images[0].asset->url,"imageUrlHover":images[1].asset->url}`
    )
      .then((r) => r.json())
      .then(({ result }) => {
        const mapped = (result || []).map((p: any) => ({
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
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}