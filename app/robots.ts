import type { MetadataRoute } from "next";
import { SITE } from "@/data/facts";

/** ⚠️ output:"export" では必須。無いと「dynamic not configured」でビルドが落ちる。 */
export const dynamic = "force-static";

/** robots。sitemapのURLは SITE から作る（ホスト名を手書きしない）。 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/_next/"] }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
