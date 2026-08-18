import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import StickyCta from "@/components/StickyCta";
import { FACTS as F, SITE } from "@/data/facts";
import { LANG_CODES } from "@/data/langs";

/*
  構成・UIは nz-eta-site / au-evisitor-en-site と揃えている（okina指摘済みの事項は最初から反映）:
    ・「」の角飾りは .feature-card だけ ・見出しの罫線は見出しの下
    ・日付は "17 August 2026" 形式 ・reveal / 追従CTA / hero-zoom

  ⚠️ K-ETA固有の事情が2つあり、ここを外すと嘘になる。
     ①**いま多くの国が一時免除中**（2026年12月31日まで。米・英・独・豪・加・台など）
       → トップの主役は「あなたは今 K-ETA が必要か」の判定。
     ②**滞在日数はK-ETAでは決まらない**。国籍ごとのビザ免除協定（おおむね30〜90日）で決まる。
     免除国の「数」は報道で22とも67とも書かれ一致しないので、数を断定せず公式一覧に案内する。
*/

export const metadata: Metadata = {
  title: {
    absolute: `K-ETA: who still needs it, and who is exempt until ${F.exemptionUntil} | K-ETA Guide 2026`,
  },
  description:
    `A plain-English guide to Korea's K-ETA: many nationalities — including the US, UK, Germany, Australia and Canada — are temporarily exempt until ${F.exemptionUntil}. If you do need one it costs ${F.fee} (${F.feeUsdApprox}), lasts ${F.validYears} years and is reviewed within about ${F.decisionTypical}.`,
  alternates: {
    canonical: `${SITE}/`,
    // ⚠️ 言語版を足したら自動で増える（手書きしない）
    languages: { en: `${SITE}/`, ...Object.fromEntries(LANG_CODES.map((c) => [c, `${SITE}/${c}/`])) },
  },
  openGraph: {
    title: `K-ETA: who still needs it, and who is exempt until ${F.exemptionUntil}`,
    description: `The exemption ends ${F.exemptionUntil}. What K-ETA costs, how long it lasts, and how the permitted stay is decided.`,
    locale: "en",
    type: "website",
  },
};

const STATS = [
  { v: F.fee, l: "What you pay", s: F.feeUsdApprox },
  { v: `${F.validYears} years`, l: "Valid for", s: "Multiple entries" },
  { v: F.decisionTypical, l: "Review time", s: "Apply well before you fly" },
  { v: "Exempt", l: `Until ${F.exemptionUntil}`, s: "For many nationalities" },
];

const FEATURES = [
  {
    h: "Many nationalities are exempt right now",
    p: `Korea suspended the K-ETA requirement for the countries and regions currently listed as exempt — including the United States, United Kingdom, Germany, Australia, Canada and Taiwan — until ${F.exemptionUntil}. Those travellers can board without one.`,
  },
  {
    h: "It authorises boarding, not your length of stay",
    p: `A K-ETA lets the airline board you. How long you may stay is set by your nationality's visa-waiver arrangement — usually ${F.stayRange} — and the final decision on entry is made by the immigration officer.`,
  },
  {
    h: "Applying is still optional for exempt travellers",
    p: "If you are exempt you may still choose to apply. The benefit is practical: K-ETA holders skip the paper arrival card at the airport. The fee applies as normal.",
  },
];

const STEPS = [
  {
    h: "Check whether you are exempt",
    p: `The exemption runs to ${F.exemptionUntil}. Confirm your nationality against the official list on ${F.officialHost} before you do anything else — the list has changed several times.`,
  },
  {
    h: "Apply on the official site or app",
    p: `Only ${F.officialHost} and the official K-ETA app are genuine. Commercial sites charge a mark-up for filling in the same form; the government fee itself is ${F.fee}.`,
  },
  {
    h: "Upload a photo and pay the fee",
    p: "You enter your passport details, a face photo and your travel plan, then pay by card. The details must match your passport exactly.",
  },
  {
    h: "Wait for the result — then check it before you fly",
    p: `Review usually takes up to ${F.decisionTypical}. Do not leave it to the day of departure, and remember an approval is not a guarantee of entry.`,
  },
];

const FAQ = [
  {
    q: "Do I need a K-ETA right now?",
    a: `Probably not, if you hold a passport from one of the currently exempt countries or regions — the suspension covers nationalities such as the United States, United Kingdom, Germany, Australia, Canada and Taiwan, and runs until ${F.exemptionUntil}. Travellers from visa-waiver countries that are not on the exemption list still need one. The official list on ${F.officialHost} is the only authority, and it has been revised more than once.`,
  },
  {
    q: `What happens after ${F.exemptionUntil}?`,
    a: "Unless Korea extends the suspension again — it has already been extended more than once — the K-ETA requirement returns for the exempt nationalities from 1 January 2027. If you are travelling in early 2027, apply in advance rather than assuming the exemption continues.",
  },
  {
    q: "How much does a K-ETA cost?",
    a: `The government fee is ${F.fee} (${F.feeUsdApprox}), paid by card during the application. Sites that quote substantially more are adding their own service charge, which is not required.`,
  },
  {
    q: "How long is a K-ETA valid?",
    a: `${F.validYears} years from approval, or until your passport expires — whichever comes first. Within that period you may enter multiple times.`,
  },
  {
    q: "How long can I stay in Korea with a K-ETA?",
    a: `The K-ETA does not set your length of stay. It follows the visa-waiver arrangement for your nationality, which is usually ${F.stayRange} per entry. Check the period that applies to your passport before booking a long trip.`,
  },
  {
    q: "Is a K-ETA a visa?",
    a: "No. It is a pre-travel authorisation for people who are already eligible to enter Korea without a visa. If you are not from a visa-waiver country, you need an actual visa instead.",
  },
  {
    q: "Why apply if I am exempt?",
    a: "The practical benefit is that K-ETA holders do not have to complete the arrival card on the plane. If that is not worth the fee to you, there is no obligation to apply while the exemption lasts.",
  },
];

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Reveal />
      <StickyCta />

      {/* ── ヒーロー ── */}
      <section className="hero">
        <div className="hero-media">
          <Image
            src="/images/hero-kr.webp"
            alt="Sunlit Korean palace roof with the Seoul skyline in the distance"
            fill
            priority
            className="hero-img hero-zoom"
          />
        </div>
        <div className="hero-scrim" />
        <div className="hero-inner max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <span className="eyebrow">Korea · Electronic Travel Authorization</span>
          <h1
            className="mt-5 text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: "#ffffff", maxWidth: "24ch" }}
          >
            Most travellers do{" "}
            <span style={{ color: "var(--color-red-light)" }}>not</span> need a K-ETA until{" "}
            {F.exemptionUntil}
          </h1>
          <p
            className="mt-5 text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,.92)", maxWidth: "54ch" }}
          >
            Korea has suspended the K-ETA requirement for the currently exempt countries and regions
            — the US, UK, Germany, Australia, Canada, Taiwan and others — until {F.exemptionUntil}.
            Here is how to check whether that includes you, and what to do if it does not.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={F.officialUrl} target="_blank" rel="noopener noreferrer" className="btn-red">
              Check the official list
            </a>
            <a href="#need-it" className="btn-outline-light">
              Do I need one?
            </a>
          </div>
          <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,.78)" }}>
            Independent guide · not affiliated with the Korean Government · updated {F.updatedLabel}
          </p>
        </div>
      </section>

      {/* ── 統計カード ── */}
      <section
        className="max-w-6xl mx-auto px-6"
        style={{ marginTop: "-3rem", position: "relative", zIndex: 2 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={s.l} className={`card stat-card text-center reveal reveal-delay-${i + 1}`}>
              <p className="stat-num">{s.v}</p>
              <p className="stat-label">{s.l}</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-light)" }}>
                {s.s}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 必要かどうかの判定（K-ETA固有の主役）── */}
      <section id="need-it" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="heading-band text-2xl md:text-3xl reveal">Do you need a K-ETA?</h2>
        <p className="mt-5 leading-relaxed reveal reveal-delay-1" style={{ maxWidth: "70ch" }}>
          Start here. The answer depends on your nationality and on a suspension that has already
          been extended more than once.
        </p>
        <div className="mt-7 card reveal reveal-delay-2" style={{ padding: "1.6rem" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: "40rem" }}>
              <thead>
                <tr style={{ background: "var(--color-navy)", color: "#fff" }}>
                  <th className="text-left px-4 py-3">Your situation</th>
                  <th className="text-left px-4 py-3">K-ETA needed?</th>
                  <th className="text-left px-4 py-3">What to do</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td className="px-4 py-3 font-medium">
                    Your nationality is on the temporary exemption list (US, UK, Germany, Australia,
                    Canada, Taiwan and others)
                  </td>
                  <td className="px-4 py-3 font-bold" style={{ color: "var(--color-gold-dark)" }}>
                    No — until {F.exemptionUntil}
                  </td>
                  <td className="px-4 py-3">
                    Travel without one. Apply only if you want to skip the arrival card.
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td className="px-4 py-3 font-medium">
                    You are from a visa-waiver country that is not on the exemption list
                  </td>
                  <td className="px-4 py-3 font-bold" style={{ color: "var(--color-red-vivid)" }}>
                    Yes
                  </td>
                  <td className="px-4 py-3">
                    Apply on {F.officialHost} before you fly — {F.fee}.
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td className="px-4 py-3 font-medium">You are travelling on or after 1 January 2027</td>
                  <td className="px-4 py-3 font-bold">Assume yes</td>
                  <td className="px-4 py-3">
                    The suspension expires {F.exemptionUntil}. Re-check the official list close to
                    departure.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">
                    You are not from a visa-waiver country
                  </td>
                  <td className="px-4 py-3 font-bold">Not applicable</td>
                  <td className="px-4 py-3">You need a visa, not a K-ETA.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-sm reveal reveal-delay-3" style={{ maxWidth: "70ch" }}>
          Published reports disagree on how many countries the suspension covers, so we do not quote
          a number here — the list on {F.officialHost} is the only authority. Checked{" "}
          {F.updatedLabel}.
        </p>
      </section>

      {/* ── What is ── */}
      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="heading-band text-2xl md:text-3xl reveal">What is the K-ETA?</h2>
          <p className="mt-5 leading-relaxed reveal reveal-delay-1" style={{ maxWidth: "70ch" }}>
            The Korea Electronic Travel Authorization is a pre-travel permission for people who may
            already enter Korea without a visa. It is checked by the airline before boarding, costs{" "}
            {F.fee} and lasts {F.validYears} years.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.h} className={`feature-card reveal reveal-delay-${i + 1}`}>
                <h3 className="font-bold" style={{ color: "var(--color-navy)" }}>
                  {f.h}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 申請手順 ── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="heading-band text-2xl md:text-3xl reveal">How to apply</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {STEPS.map((s, i) => (
            <div key={s.h} className={`feature-card reveal reveal-delay-${(i % 4) + 1}`}>
              <p
                className="text-xs font-bold tracking-widest"
                style={{ color: "var(--color-gold-dark)" }}
              >
                STEP {i + 1}
              </p>
              <h3 className="mt-2 font-bold" style={{ color: "var(--color-navy)" }}>
                {s.h}
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 reveal">
          <a href={F.officialUrl} target="_blank" rel="noopener noreferrer" className="cta-button-red">
            Go to the official K-ETA site
          </a>
        </div>
      </section>

      {/* ── 滞在日数の考え方 ── */}
      <section style={{ background: "var(--color-bg-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="heading-band text-2xl md:text-3xl reveal">
            How long you can stay is decided elsewhere
          </h2>
          <p className="mt-5 leading-relaxed reveal reveal-delay-1" style={{ maxWidth: "70ch" }}>
            This is the part most guides get wrong. A K-ETA does not come with a stay period. Your
            permitted stay comes from the visa-waiver arrangement between Korea and your country —
            usually somewhere in the range of {F.stayRange} per entry — and the immigration officer
            at the airport makes the final decision on both entry and duration.
          </p>
          <p className="mt-4 leading-relaxed reveal reveal-delay-2" style={{ maxWidth: "70ch" }}>
            An approved K-ETA also does not guarantee entry. Carry the same passport you applied
            with; the authorisation is recorded against it.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h2 className="heading-band text-2xl md:text-3xl reveal">Frequently asked questions</h2>
        <div className="mt-8 space-y-4">
          {FAQ.map((f, i) => (
            <details key={f.q} className={`card group reveal reveal-delay-${(i % 4) + 1}`}>
              <summary className="flex items-start justify-between gap-4 font-bold cursor-pointer list-none">
                <span>{f.q}</span>
                <span
                  className="shrink-0 transition-transform group-open:rotate-45"
                  style={{ color: "var(--color-red-vivid)", fontSize: "1.25rem", lineHeight: 1 }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--color-navy)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold reveal" style={{ color: "#fff" }}>
            Check your status on the official site
          </h2>
          <p
            className="mt-4 text-sm leading-relaxed reveal reveal-delay-1"
            style={{ color: "rgba(255,255,255,.85)" }}
          >
            Only {F.officialHost} and the official K-ETA app are genuine. We are an independent guide
            and cannot submit an application on your behalf.
          </p>
          <div className="mt-8 reveal reveal-delay-2">
            <a
              href={F.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button-red"
            >
              Open {F.officialHost}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
