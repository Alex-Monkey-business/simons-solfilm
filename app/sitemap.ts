import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://simonssolfilm.no", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://simonssolfilm.no/solfilm-bil", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://simonssolfilm.no/solfilm-bygg", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://simonssolfilm.no/lakkbeskyttelse", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://simonssolfilm.no/bilpleie", lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: "https://simonssolfilm.no/xpel", lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
