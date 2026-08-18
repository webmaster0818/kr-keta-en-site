import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { FACTS as F, SITE } from "@/data/facts";
import { LANGS, LANG_CODES } from "@/data/langs";

/*
  言語ディレクトリ配下の記事・基礎ページ（/de/datenschutz/ /de/evisitor-oder-eta/ など）。
  ⚠️ 記事と基礎ページを同じ [slug] で扱う（構造が同じで、違いは導線だけ）。
  ⚠️ 存在しないスラッグは作らない（dynamicParams=false で404にする）。
*/

export const dynamicParams = false;

export function generateStaticParams() {
  const out: Array<{ lang: string; slug: string }> = [];
  for (const lang of LANG_CODES) {
    const t = LANGS[lang];
    for (const a of [...t.articles, ...t.pages]) out.push({ lang, slug: a.slug });
  }
  return out;
}

function find(lang: string, slug: string) {
  const t = LANGS[lang];
  const doc = [...t.articles, ...t.pages].find((a) => a.slug === slug);
  return { t, doc, isArticle: t.articles.some((a) => a.slug === slug) };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const { doc } = find(lang, slug);
  if (!doc) return {};
  return {
    title: { absolute: `${doc.title} | ${LANGS[lang].header.site}` },
    description: doc.description,
    alternates: { canonical: `${SITE}/${lang}/${slug}/` },
    openGraph: { title: doc.title, description: doc.description, locale: LANGS[lang].htmlLang, type: "article" },
  };
}

export default async function LangDoc({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const { t, doc, isArticle } = find(lang, slug);
  if (!doc) return null;

  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.header.site, item: `${SITE}/${lang}/` },
      { "@type": "ListItem", position: 2, name: doc.title, item: `${SITE}/${lang}/${slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />
      <Reveal />

      <section style={{ background: "var(--color-navy)" }}>
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <nav className="text-xs" style={{ color: "rgba(255,255,255,.75)" }}>
            <Link href={`/${lang}/`} style={{ color: "rgba(255,255,255,.85)" }}>{t.header.site}</Link>
            <span> › </span>
            <span>{doc.title}</span>
          </nav>
          <h1 className="mt-4 text-2xl md:text-4xl font-bold leading-tight" style={{ color: "#fff" }}>{doc.title}</h1>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.85)" }}>{doc.description}</p>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,.7)" }}>{t.ui.updated} {F.updatedLabel}</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-14 md:py-16">
        {doc.blocks.map((b, i) => {
          if ("h2" in b) return <h2 key={i} className="heading-band text-xl md:text-2xl mt-10 first:mt-0 reveal">{b.h2}</h2>;
          if ("p" in b) return <p key={i} className="mt-4 leading-relaxed reveal">{b.p}</p>;
          if ("ul" in b)
            return (
              <ul key={i} className="mt-4 space-y-2 leading-relaxed reveal" style={{ paddingLeft: "1.1rem", listStyle: "disc" }}>
                {b.ul.map((x) => <li key={x}>{x}</li>)}
              </ul>
            );
          return (
            <div key={i} className="card mt-6 reveal" style={{ background: "var(--color-bg-soft)" }}>
              <p className="text-sm leading-relaxed">{b.note}</p>
            </div>
          );
        })}

        <div className="mt-12 reveal">
          <a href={F.officialUrl} target="_blank" rel="noopener noreferrer" className="cta-button-red">{t.cta.button}</a>
        </div>

        {isArticle && (
          <div className="mt-14">
            <h2 className="heading-band text-xl md:text-2xl reveal">{t.ui.articles}</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              {t.articles.filter((a) => a.slug !== slug).map((a) => (
                <Link key={a.slug} href={`/${lang}/${a.slug}/`} className="feature-card no-underline reveal">
                  <h3 className="font-bold" style={{ color: "var(--color-navy)" }}>{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{a.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-12 text-xs leading-relaxed" style={{ color: "var(--color-text-light)" }}>{t.footer.disclaimer}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <Link href={`/${lang}/`}>{t.header.site}</Link>
          {t.pages.filter((p) => p.slug !== slug).map((p) => (
            <Link key={p.slug} href={`/${lang}/${p.slug}/`}>{p.title}</Link>
          ))}
        </div>
      </article>
    </>
  );
}
