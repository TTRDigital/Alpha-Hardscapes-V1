/**
 * Sanity connection settings. All public (the dataset is readable without a token).
 * The variables are prefixed with ALPHA on purpose: a generic NEXT_PUBLIC_SANITY_PROJECT_ID
 * meant for another TTR site must never point this site at the wrong project.
 * Without NEXT_PUBLIC_ALPHA_SANITY_PROJECT_ID the site renders the built-in content.
 */
export const projectId = process.env.NEXT_PUBLIC_ALPHA_SANITY_PROJECT_ID?.trim() || "";
export const dataset = process.env.NEXT_PUBLIC_ALPHA_SANITY_DATASET?.trim() || "production";
export const apiVersion = process.env.NEXT_PUBLIC_ALPHA_SANITY_API_VERSION?.trim() || "2026-11-01";
export const studioBasePath = "/studio";
/** True when the project ID looks valid (Sanity IDs are 8+ lowercase alphanumerics). */
export const sanityConfigured = /^[a-z0-9]{6,}$/.test(projectId);
