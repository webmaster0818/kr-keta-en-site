/**
 * K-ETA（韓国電子旅行許可）の事実。ページ側に数値を直書きしない。
 *
 * ⚠️ 数値は必ず一次情報（k-eta.go.kr／在外公館の告示）で裏を取ってから変える。
 * ⚠️ K-ETAがNZeTA・eVisitorと決定的に違う点が2つある。書き分けを崩さないこと。
 *    ①**いま多くの国が一時免除中**（米・英・独・豪・加・台など。2026年12月31日まで）
 *      → 「今すぐ必要」と書くと嘘になる。免除の有無を最初に判定させる構成にしている。
 *    ②**滞在できる日数はK-ETAでは決まらない**。国籍ごとのビザ免除協定で決まる
 *      （おおむね30〜90日）。NZeTA=90日/eVisitor=3か月のように単一の数字を出せない。
 * ⚠️ 免除対象の国数は報道で22か国とも67か国とも書かれており一致しない。
 *    数を断定せず「現在免除の国・地域」と書き、公式の一覧に案内する。
 */
export const FACTS = {
  fee: "KRW 10,000",
  feeUsdApprox: "about US$7–8",
  validYears: 3,
  /** 審査の目安。公式表記は「一般的に72時間以内」 */
  decisionTypical: "72 hours",
  /** 一時免除の期限 */
  exemptionUntil: "31 December 2026",
  exemptionUntilIso: "2026-12-31",
  stayRange: "30 to 90 days",
  updated: "2026-08-17",
  updatedLabel: "17 August 2026",
  /** 申請先。公式（.go.kr）以外に窓口は無いので、CTAは全部ここを指す */
  officialUrl: "https://www.k-eta.go.kr/portal/apply/index.do",
  officialHost: "k-eta.go.kr",
} as const;

/** ⚠️ ドメイン未確定。決まり次第ここだけ差し替える（canonical/OGで使う）。 */
export const SITE = "https://example.invalid";
