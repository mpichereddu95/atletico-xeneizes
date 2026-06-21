import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lightsteelblue-giraffe-291026.hostingersite.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/studio"]
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
