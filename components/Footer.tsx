'use client'

import { usePathname } from "next/navigation"
import { FACTS as F } from "@/data/facts"
import { LANG_CODES } from "@/data/langs"

/** フッター。⚠️ 韓国サイトは白多めの指示のため、濃色ベタではなく白地＋上辺の赤線にしている。
    ⚠️ 公式ではないことの明示は必須（誤認を避ける）。 */
export default function Footer() {
  // ⚠️ 言語ディレクトリ（/de/ /ko/ …）では、そのページ自身が現地語の免責を出している。
  //    ここで英語のフッターを重ねると、言語ページの末尾だけ英語になる（実際にそうなっていた）。
  const path = usePathname() || "/"
  const inLang = LANG_CODES.some((c) => path === `/${c}` || path.startsWith(`/${c}/`))
  if (inLang) return null

  return (
    <footer style={{ background: "#fff", borderTop: "2px solid var(--color-red-vivid)" }} className="py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="font-bold" style={{ color: "var(--color-navy)" }}>K-ETA Guide</p>
        <p
          className="mt-2 text-xs leading-relaxed"
          style={{ color: "var(--color-text-light)", maxWidth: "62ch", margin: "0.5rem auto 0" }}
        >
          This is an independent guide. It is not affiliated with the Korean Government, the Korea
          Immigration Service or {F.officialHost}, and we do not submit applications. Only{" "}
          {F.officialHost} and the official K-ETA app are genuine application channels. Figures
          checked {F.updatedLabel}.
        </p>
      </div>
    </footer>
  )
}
