import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { FACTS as F, SITE } from "@/data/facts";
import { LANGS, LANG_CODES } from "@/data/langs";

/*
  言語ディレクトリのトップ（/de/ など）。英語版 app/page.tsx と同じ構成・同じUIで、
  文言だけ data/langs/{code}.ts から差し込む。
  ⚠️ 数値は言語ファイルではなく FACTS から入れる（言語間で数字が食い違わないように）。
  ⚠️ <html lang> はルートlayoutで固定されるため、ビルド後に scripts/fix-lang-attr.mjs で書き換える。
*/

export const dynamicParams = false;
export function generateStaticParams() {
  return LANG_CODES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = LANGS[lang];
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: {
      canonical: `${SITE}/${lang}/`,
      languages: { en: `${SITE}/`, ...Object.fromEntries(LANG_CODES.map((c) => [c, `${SITE}/${c}/`])) },
    },
    openGraph: { title: t.meta.title, description: t.meta.description, locale: t.htmlLang, type: "website" },
  };
}

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = LANGS[lang];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Reveal />

      <section className="hero">
        <div className="hero-media">
          <Image src="/images/hero-kr.webp" alt={t.hero.imageAlt} fill priority className="hero-img hero-zoom" />
        </div>
        <div className="hero-scrim" />
        <div className="hero-inner max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-tight" style={{ color: "#fff", maxWidth: "24ch" }}>
            {t.hero.h1Before}
            <span style={{ color: "var(--color-red-light)" }}>{t.hero.h1Highlight}</span>
            {t.hero.h1After}
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,.92)", maxWidth: "54ch" }}>
            {t.hero.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={F.officialUrl} target="_blank" rel="noopener noreferrer" className="btn-red">
              {t.hero.ctaPrimary}
            </a>
            <a href="#need-it" className="btn-outline-light">
              {t.hero.ctaSecondary}
            </a>
          </div>
          <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,.78)" }}>
            {t.hero.disclaimer} {F.updatedLabel}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6" style={{ marginTop: "-3rem", position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {t.stats.map((s, i) => (
            <div key={s.l} className={`card stat-card text-center reveal reveal-delay-${i + 1}`}>
              <p className="stat-num">{s.v}</p>
              <p className="stat-label">{s.l}</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-light)" }}>{s.s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="heading-band text-2xl md:text-3xl reveal">{t.whatIs.h2}</h2>
        <p className="mt-5 leading-relaxed reveal reveal-delay-1" style={{ maxWidth: "70ch" }}>{t.whatIs.p1}</p>
        <p className="mt-4 leading-relaxed reveal reveal-delay-2" style={{ maxWidth: "70ch" }}>{t.whatIs.p2}</p>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {t.features.map((f, i) => (
            <div key={f.h} className={`feature-card reveal reveal-delay-${i + 1}`}>
              <h3 className="font-bold" style={{ color: "var(--color-navy)" }}>{f.h}</h3>
              <p className="mt-2 text-sm leading-relaxed">{f.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="need-it" style={{ background: "var(--color-bg-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="heading-band text-2xl md:text-3xl reveal">{t.eligibility.h2}</h2>
          <p className="mt-5 leading-relaxed reveal reveal-delay-1" style={{ maxWidth: "70ch" }}>{t.eligibility.lead}</p>
          <div className="mt-7 card reveal reveal-delay-2" style={{ padding: "1.6rem" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: "40rem" }}>
                <thead>
                  <tr style={{ background: "var(--color-navy)", color: "#fff" }}>
                    {t.eligibility.th.map((h) => (
                      <th key={h} className="text-left px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.eligibility.rows.map((r, ri) => (
                    <tr key={r[1]} style={ri < t.eligibility.rows.length - 1 ? { borderBottom: "1px solid var(--color-border)" } : undefined}>
                      <td className="px-4 py-3 font-medium">{r[0]}</td>
                      <td className="px-4 py-3">{r[1]}</td>
                      <td className="px-4 py-3 font-bold" style={ri === 0 ? { color: "var(--color-gold-dark)" } : undefined}>{r[2]}</td>
                      <td className="px-4 py-3">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 leading-relaxed text-sm reveal reveal-delay-3" style={{ maxWidth: "70ch" }}>{t.eligibility.note}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="heading-band text-2xl md:text-3xl reveal">{t.steps.h2}</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {t.steps.items.map((s, i) => (
            <div key={s.h} className={`feature-card reveal reveal-delay-${(i % 4) + 1}`}>
              <p className="text-xs font-bold tracking-widest" style={{ color: "var(--color-gold-dark)" }}>STEP {i + 1}</p>
              <h3 className="mt-2 font-bold" style={{ color: "var(--color-navy)" }}>{s.h}</h3>
              <p className="mt-2 text-sm leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 reveal">
          <a href={F.officialUrl} target="_blank" rel="noopener noreferrer" className="cta-button-red">{t.steps.cta}</a>
        </div>
      </section>

      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="heading-band text-2xl md:text-3xl reveal">{t.rules.h2}</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="feature-card reveal reveal-delay-1">
              <h3 className="font-bold" style={{ color: "var(--color-gold-dark)" }}>{t.rules.allowedH}</h3>
              <ul className="mt-3 text-sm leading-relaxed space-y-2">
                {t.rules.allowed.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <h3 className="font-bold" style={{ color: "var(--color-red-dark)" }}>{t.rules.deniedH}</h3>
              <ul className="mt-3 text-sm leading-relaxed space-y-2">
                {t.rules.denied.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="heading-band text-2xl md:text-3xl reveal">{t.border.h2}</h2>
        <p className="mt-5 leading-relaxed reveal reveal-delay-1" style={{ maxWidth: "70ch" }}>{t.border.p}</p>
      </section>

      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <h2 className="heading-band text-2xl md:text-3xl reveal">{t.faq.h2}</h2>
          <div className="mt-8 space-y-4">
            {t.faq.items.map((f, i) => (
              <details key={f.q} className={`card group reveal reveal-delay-${(i % 4) + 1}`}>
                <summary className="flex items-start justify-between gap-4 font-bold cursor-pointer list-none">
                  <span>{f.q}</span>
                  <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: "var(--color-red-vivid)", fontSize: "1.25rem", lineHeight: 1 }} aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 下層記事と基礎ページへの導線 */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="heading-band text-2xl md:text-3xl reveal">{t.ui.articles}</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {t.articles.map((a, i) => (
            <Link key={a.slug} href={`/${lang}/${a.slug}/`} className={`feature-card no-underline reveal reveal-delay-${i + 1}`}>
              <h3 className="font-bold" style={{ color: "var(--color-navy)" }}>{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{a.description}</p>
              <p className="mt-3 text-sm font-bold" style={{ color: "var(--color-red-vivid)" }}>{t.ui.readMore} →</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--color-navy)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold reveal" style={{ color: "#fff" }}>{t.cta.h2}</h2>
          <p className="mt-4 text-sm leading-relaxed reveal reveal-delay-1" style={{ color: "rgba(255,255,255,.85)" }}>{t.cta.p}</p>
          <div className="mt-8 reveal reveal-delay-2">
            <a href={F.officialUrl} target="_blank" rel="noopener noreferrer" className="cta-button-red">{t.cta.button}</a>
          </div>
          <p className="mt-8 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,.7)" }}>
            {t.footer.disclaimer}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs">
            {t.pages.map((p) => (
              <Link key={p.slug} href={`/${lang}/${p.slug}/`} style={{ color: "rgba(255,255,255,.85)" }}>{p.title}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
