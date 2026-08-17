import type { MetadataRoute } from "next";
import { SITE } from "@/data/facts";

/** ⚠️ output:"export" では必須。無いと「dynamic not configured」でビルドが落ちる。 */
export const dynamic = "force-static";

/**
 * sitemap。⚠️ 以前はテンプレ由来の public/sitemap.xml が置かれており、
 *    **別サイト（eta-pl.com）のURL**を配信していた。SITEから生成する形に変えて再発を防ぐ。
 * ⚠️ 下層ページを作ったらここに足す（作っていないURLを載せない）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      lastModified: new Date("2026-08-17"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
