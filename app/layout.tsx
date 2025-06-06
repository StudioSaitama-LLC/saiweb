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
  title: "Studio Saitama",
  description: "Discover the WAVE you need, and feel the New WAVE.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${zenKakuGothicNew.variable} font-sans`}>{children}</body>
    </html>
  )
}
