export default function OurWorksSection() {
  const projects = [
    {
      category: "Branding",
      duration: "4ヶ月",
      title: "Project Alpha",
      client: "テクノロジー企業会社",
      description: "AI企業の革新的なブランドアイデンティティを構築。学習プロセスを1",
    },
    {
      category: "Development",
      duration: "4ヶ月",
      title: "Project Beta",
      client: "スタートアップB社",
      description: "次世代UXを追求したWebアプリ。リアルタイム通信・3D・AI機能?",
    },
  ]

  return (
    <div className="relative">
      {/* WORKS Title */}
      <div className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hilowave-text text-center lg:text-left">WORKS</div>
        </div>
      </div>

      {/* Our Works Section with Blue Layer and High-Quality Card */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* 背面ブルーレイヤー */}
          <div className="absolute inset-0 rounded-2xl" style={{zIndex:0, background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)', opacity: 0.85}} />
          {/* カード本体 */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200/70" style={{zIndex:1, background: 'rgba(255,255,255,0.10)', boxShadow: '0 12px 48px 0 rgba(59,130,246,0.18), 0 2px 8px rgba(30,58,138,0.10)', backdropFilter: 'blur(16px)'}}>
            {/* 画像レイヤー */}
            <div className="relative h-[600px]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/wazaoipponbackground.jpg')",
                  filter: 'brightness(0.92) saturate(1.15)',
                  zIndex:2
                }}
              />
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-black/30" style={{zIndex:3}}>
                <div className="relative z-10 h-full max-w-7xl mx-auto px-6 py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Content */}
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <p className="text-gray-300 text-lg tracking-wider">OUR WORK</p>
                        <h2 className="text-white font-bold leading-tight" style={{ fontSize: '6.37rem', whiteSpace: 'nowrap' }}>
                          WAZAO-IPPON
                        </h2>
                        <h3 className="text-white text-xl md:text-2xl japanese-text">革新的なソリューションの実績</h3>
                        <p className="text-gray-300 text-base md:text-lg japanese-text leading-relaxed">
                          AI技術とクリエイティブが融合した、私たちの代表的なプロジェクトをご紹介
                          <br />
                          します。各プロジェクトは独自の課題に対する革新的なアプローチを示してい
                          <br />
                          ます。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ボタン */}
            <div className="absolute bottom-8 left-6 z-20">
              <button className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 border-2 border-white/40 backdrop-blur-md">
                WEBSITE
              </button>
            </div>
            {/* 高級感のある縁装飾 */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border-4 border-white/30" style={{boxShadow:'0 0 0 6px rgba(59,130,246,0.10), 0 2px 16px 0 rgba(30,58,138,0.10)'}} />
          </div>
        </div>
      </div>
    </div>
  )
}
