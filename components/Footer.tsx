import { FACTS as F } from "@/data/facts"

/** フッター。⚠️ 韓国サイトは白多めの指示のため、濃色ベタではなく白地＋上辺の赤線にしている。
    ⚠️ 公式ではないことの明示は必須（誤認を避ける）。 */
export default function Footer() {
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
