import Image, { type ImageProps } from "next/image";
import type { Img as ImgT } from "@/lib/types";
import { objectPosition } from "@/lib/sanity/image";

type Props = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  image: ImgT;
  /** Fill the parent (parent needs position: relative and a size). */
  fill?: boolean;
};

/** next/image wrapper that accepts a local or Sanity image. */
export function Img({ image, fill, className, style, sizes, ...rest }: Props) {
  const pos = objectPosition(image);
  const alt = image.alt || "";
  const common = {
    src: image.src,
    className,
    sizes: sizes ?? (fill ? "100vw" : undefined),
    style: pos ? { ...style, objectPosition: pos } : style,
    ...rest,
  };
  if (fill) return <Image {...common} alt={alt} fill />;
  return <Image {...common} alt={alt} width={image.width ?? 1600} height={image.height ?? 1067} />;
}
