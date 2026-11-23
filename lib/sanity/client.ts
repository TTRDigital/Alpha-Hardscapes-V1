import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";

/** Cache tag every CMS read carries; the publish webhook revalidates it. */
export const CONTENT_TAG = "content";
/** Time-based safety net (seconds) in case a webhook is ever missed. */
export const CONTENT_REVALIDATE = 3600;

const token = process.env.SANITY_READ_TOKEN?.trim() || undefined;

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: !token,
      token,
      perspective: "published",
      stega: false,
    })
  : null;

/** Hard limit on how long a page build waits for Sanity before using the built-in copy. */
const TIMEOUT_MS = 8000;

/**
 * Runs a GROQ query. Returns `undefined` when Sanity is not configured or cannot be
 * reached, so callers can fall back to the built-in content. Never throws.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | undefined> {
  if (!client) return undefined;
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: CONTENT_REVALIDATE, tags: [CONTENT_TAG] },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return result ?? undefined;
  } catch (err) {
    console.warn(`[sanity] query failed, using built-in content: ${(err as Error).message}`);
    return undefined;
  }
}
