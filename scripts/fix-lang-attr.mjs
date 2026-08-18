// ビルド後に言語ディレクトリのHTMLの <html lang="en"> を各言語コードへ書き換える。
// ⚠️ ルートlayoutは全ページ共通なので lang を分けられない。export後に直すのが確実。
//    （NZ/AU/KRの3サイトとも同じ事情。language dirを追加したら必ずこれを通す）
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
// ディレクトリ名（=言語コード）と、HTMLに入れる lang 値は必ずしも同じでない。
// 例: /zh/ の <html lang> は "zh-Hans"。言語ファイルの htmlLang をそのまま使う。
const langs = readdirSync("data/langs")
  .filter((f) => f.endsWith(".ts") && !f.startsWith("_") && f !== "index.ts")
  .map((f) => {
    const dir = f.replace(/\.ts$/, "");
    const m = readFileSync(join("data/langs", f), "utf8").match(/htmlLang:\s*"([^"]+)"/);
    return { dir, htmlLang: m ? m[1] : dir };
  });

let fixed = 0;
function walk(dir, lang) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, lang);
    else if (e.endsWith(".html")) {
      const s = readFileSync(p, "utf8");
      if (s.includes('<html lang="en"')) {
        writeFileSync(p, s.replace('<html lang="en"', `<html lang="${lang}"`));
        fixed++;
      }
    }
  }
}
for (const { dir: d, htmlLang } of langs) {
  const dir = join(OUT, d);
  try { statSync(dir); } catch { continue; }
  walk(dir, htmlLang);
}
console.log(
  `fix-lang-attr: ${langs.map((l) => `${l.dir}→${l.htmlLang}`).join(", ")} / ${fixed}ファイルの <html lang> を修正`,
);
