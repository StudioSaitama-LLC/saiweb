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

export const metadata: Metadata = {
  title: "スタジオサイタマ合同会社",
  description: "スタジオサイタマは、埼玉を拠点にAI/ICT/クリエイティブを駆使し、\"オルタナティブ\"の文化醸成を目指す、青春取り戻しカンパニーです。サイタマーだけど本社は東京です。",
  generator: 'v0.dev',
  openGraph: {
    title: "スタジオサイタマ合同会社",
    description: "スタジオサイタマは、埼玉を拠点にAI/ICT/クリエイティブを駆使し、\"オルタナティブ\"の文化醸成を目指す、青春取り戻しカンパニーです。サイタマーだけど本社は東京です。",
    type: "website",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
      </head>
      <body className={`${inter.variable} ${zenKakuGothicNew.variable} font-sans`}>{children}</body>
    </html>
  )
}
