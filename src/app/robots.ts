import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

// substitui o robots.txt estático do site antigo
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.dominio}/sitemap.xml`,
  };
}
