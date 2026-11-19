import React from "react"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
        <div className="text-lg font-bold">スタジオサイタマ合同会社</div>
        <div className="text-sm text-white/80">
          <div>さいたま事務所</div>
          <div>〒331-0811 埼玉県さいたま市北区吉野町2丁目3-4</div>
        </div>
        <div className="text-base">info@studiosaitama.com</div>
        <div className="text-xs text-white/70 mt-2">© 2025 Studio Saitama LLC</div>
      </div>
    </footer>
  )
}
