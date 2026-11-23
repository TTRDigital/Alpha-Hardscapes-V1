import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

/** Sanity Studio embedded at /studio. Sign in with the Sanity account that has access to the project. */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
