"use client";

import variants from "./responsive-images.json";

// next/image ber om en bredde per oppføring i srcset. Vi har ingen bildeserver,
// så vi svarer med den minste ferdiglagde utgaven som er minst så bred, og
// originalen når ingen er det. Bilder uten utgaver (logo, svg) går rett gjennom.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const widths = (variants as Record<string, number[]>)[src];
  const fit = widths?.find((w) => w >= width);
  return fit ? src.replace(/\.webp$/, `-${fit}.webp`) : src;
}
