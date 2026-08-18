import { FACTS } from "@/data/facts";

/**
 * 言語ディレクトリ（/de/ /ko/ …）の中身の型。
 *
 * ⚠️ 数値は各言語ファイルに書かない。必ず FACTS を参照する。
 *    翻訳のときに数字を書き写すと、料金改定のときに言語ごとに食い違う。
 * ⚠️ 事実そのものを言語で変えない。表現だけを変える。
 */
export type Article = {
  slug: string;
  title: string;
  description: string;
  /** 見出しと本文の配列。h2 と 段落・箇条書きだけで構成する（凝った装飾は入れない） */
  blocks: Array<
    | { h2: string }
    | { p: string }
    | { ul: string[] }
    | { note: string }
  >;
};

export type LangContent = {
  /** ディレクトリ名＝ISO言語コード（hreflangにも使う） */
  code: string;
  /** <html lang> に入れる値 */
  htmlLang: string;
  /** 言語切替に出す表示名（その言語での自称） */
  label: string;
  /** 対象読者の国（ページ内の説明に使う） */
  audience: string;
  meta: { title: string; description: string };
  header: { site: string; tagline: string; official: string };
  hero: {
    eyebrow: string;
    h1Before: string;
    h1Highlight: string;
    h1After: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    disclaimer: string;
    imageAlt: string;
  };
  stats: Array<{ v: string; l: string; s: string }>;
  whatIs: { h2: string; p1: string; p2: string };
  features: Array<{ h: string; p: string }>;
  eligibility: {
    h2: string;
    lead: string;
    th: [string, string, string, string];
    rows: Array<[string, string, string, string]>;
    note: string;
  };
  steps: { h2: string; items: Array<{ h: string; p: string }>; cta: string };
  rules: { h2: string; allowedH: string; allowed: string[]; deniedH: string; denied: string[] };
  border: { h2: string; p: string };
  faq: { h2: string; items: Array<{ q: string; a: string }> };
  cta: { h2: string; p: string; button: string };
  footer: { disclaimer: string };
  /** 基礎ページ（プライバシーポリシー等）。slug はディレクトリ名になる */
  pages: Article[];
  /** 下層記事 */
  articles: Article[];
  /** UIの共通語 */
  ui: { updated: string; backToTop: string; languages: string; articles: string; readMore: string };
};

/** 言語ファイルから数値を参照するための再エクスポート（数字の二重管理を防ぐ） */
export { FACTS };
