import type { MetadataRoute } from "next";
import { SITE } from "@/data/facts";
import { LANGS, LANG_CODES } from "@/data/langs";

/** ⚠️ output:"export" では必須。無いと「dynamic not configured」でビルドが落ちる。 */
export const dynamic = "force-static";

/**
 * sitemap。英語トップ＋各言語ディレクトリ（トップ・記事・基礎ページ）を列挙する。
 * ⚠️ 以前はテンプレ由来の public/sitemap.xml が **別サイト(eta-pl.com)のURL** を配信していた。
 *    データから生成する形にして再発を防いでいる。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const d = new Date("2026-08-17");
  const out: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: d, changeFrequency: "weekly", priority: 1 },
  ];
  for (const lang of LANG_CODES) {
    const t = LANGS[lang];
    out.push({ url: `${SITE}/${lang}/`, lastModified: d, changeFrequency: "weekly", priority: 0.9 });
    for (const a of [...t.articles, ...t.pages]) {
      out.push({ url: `${SITE}/${lang}/${a.slug}/`, lastModified: d, changeFrequency: "monthly", priority: 0.6 });
    }
  }
  return out;
}
