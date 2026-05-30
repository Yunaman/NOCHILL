"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { supabase } from "@/lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        const mapped = (data || []).map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description ?? "",
          category: p.collection ?? "core",
          collection: p.collection,
          images: p.image_url ? [p.image_url] : [],
          imageUrl: p.image_url,
          imageUrlHover: p.image_url_hover,
          slug: p.slug,
          status: p.status ?? "live",
          dropNumber: p.drop_number ?? 1,
          dropTotal: p.drop_total ?? 100,
          sizes: p.sizes ?? [],
          featured: p.featured ?? false,
          archived: false,
          details: [],
        }));
        setProducts(mapped);
        setLoading(false);
      });
  }, []);

  return { products, loading };
}