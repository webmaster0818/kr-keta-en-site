import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSans = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "K-ETA Guide — who needs one, and who is exempt until 31 December 2026",
    template: "%s | K-ETA Guide",
  },
  description:
    "An independent, plain-English guide to Korea's K-ETA: who is temporarily exempt until 31 December 2026, what it costs, how long it lasts, and how your permitted stay is actually decided.",
  keywords:
    "K-ETA, Korea Electronic Travel Authorization, K-ETA exemption 2026, K-ETA fee, Korea travel authorisation, k-eta.go.kr",
  robots: { index: true, follow: true },
  /** ⚠️ Search Consoleの所有権確認はMETA方式。
   *  FILE方式は trailingSlash:true のせいで /googleXXXX.html が308になり使えなかった。 */
  verification: { google: "ElMs0b0T0D__8x_xObFp9kihtkZD20zzjTJcPNdVJkQ" },
  openGraph: {
    title: "K-ETA Guide — who needs one, and who is exempt until 31 December 2026",
    description:
      "Many nationalities are exempt from K-ETA until 31 December 2026. Here is how to check whether that includes you.",
    locale: "en",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className={`${notoSans.variable} ${notoSerif.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}