import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";

let sanityClient: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!sanityClient) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const apiToken = process.env.SANITY_API_READ_TOKEN;

    if (!projectId || !dataset) {
      throw new Error("Sanity configuration missing. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET environment variables.");
    }

    sanityClient = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
      token: apiToken,
    });
  }

  return sanityClient;
}

export async function fetchSanityContent<T>(query: string, params = {}): Promise<T[]> {
  try {
    const client = getSanityClient();
    const result = await client.fetch<T[]>(query, params);
    return result || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
    // Return empty array instead of throwing to prevent access-denied screens
    return [];
  }
}

export function isSanityConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );
}

export function getSanityErrorMessage(error: any): string {
  if (error?.message?.includes("not authorized")) {
    return "Content management requires authentication. Please contact the administrator.";
  }
  if (error?.message?.includes("configuration")) {
    return "Content management is not configured. Please set up Sanity integration.";
  }
  return "Unable to load content. Please try again later.";
}
