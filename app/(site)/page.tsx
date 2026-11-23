import { metadataFor, renderPath } from "@/components/page/render";

export const revalidate = 3600;

export function generateMetadata() {
  return metadataFor("/");
}

export default function Home() {
  return renderPath("/");
}
