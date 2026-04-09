import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Zen_Kaku_Gothic_New } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku-gothic-new",
})

const siteUrl = "https://studiosaitama.com"
const siteName = "Studio Saitama"
const siteTitle = "Studio Saitama — AI×クリエイティブで、スモールチームの突破口をつくる"
const siteDescription =
  "スタジオサイタマは、AI/ICT/クリエイティブを駆使してスモールチームの突破口を創るクリエイティブ＆テクノロジーカンパニー。ブランド戦略設計、AI活用設計、システム開発、コミュニティ運営まで、領域を跨いでサポートします。"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "スタジオサイタマ合同会社",
  alternateName: "Studio Saitama LLC",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/og-image.png`,
  },
  description: siteDescription,
  email: "info@studiosaitama.com",
  foundingDate: "2024",
  knowsAbout: [
    "AI活用設計",
    "AIエージェント設計",
    "ブランド戦略設計",
    "システム開発",
    "DX推進",
    "コミュニティ運営",
  ],
  sameAs: [],
}

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "ja",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, webSiteSchema]),
          }}
        />
        <script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
          async
        />
      </head>
      <body
        className={`${inter.variable} ${zenKakuGothicNew.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
