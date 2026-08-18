import Link from "next/link";
import { FACTS as F } from "@/data/facts";
import { LANGS, LANG_CODES } from "@/data/langs";

/**
 * ヘッダー。⚠️ 韓国サイトは「白多め・最上部も白系」の指示（okina 2026-08-17）なので、
 * NZ/AUの濃色ヘッダーではなく **白地＋下辺に赤の細線**（keta-travel.com と同じ考え方）にしている。
 * ⚠️ リンク先の無いメニューを並べると404を作るので、ページを作った分だけ足す。
 */
export default function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(255,255,255,.96)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderBottom: "2px solid var(--color-red-vivid)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <span
            className="block text-lg font-bold"
            style={{ color: "var(--color-navy)", fontFamily: "var(--font-noto-serif), serif" }}
          >
            K-ETA Guide
          </span>
          <span className="block text-[10px] tracking-wide" style={{ color: "var(--color-text-light)" }}>
            Korea Electronic Travel Authorization
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-2 text-xs" aria-label="Language">
            <Link href="/" style={{ color: "var(--color-text-light)" }}>EN</Link>
            {LANG_CODES.map((c) => (
              <Link key={c} href={`/${c}/`} style={{ color: "var(--color-text-light)" }}>
                {LANGS[c].label}
              </Link>
            ))}
          </nav>
        <a
          href={F.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-red text-sm"
          style={{ padding: ".6rem 1.2rem" }}
        >
          Official site
        </a>
        </div>
      </div>
    </header>
  );
}
