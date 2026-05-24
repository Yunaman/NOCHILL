import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sy9av61t',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getProducts() {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      status,
      price,
      collection,
      dropNumber,
      dropTotal,
      featured,
      description,
      sizes,
      "imageUrl": images[0].asset->url,
      "imageUrlHover": images[1].asset->url,
    }
  `)
}

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && featured == true] | order(_createdAt desc) {
      _id,
      name,
      slug,
      status,
      price,
      collection,
      dropNumber,
      dropTotal,
      featured,
      "imageUrl": images[0].asset->url,
      "imageUrlHover": images[1].asset->url,
    }
  `)
}