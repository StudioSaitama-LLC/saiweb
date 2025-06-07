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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-[256px] font-extrabold text-left text-[#3B82F6] leading-[0.8] tracking-[-0.02em] font-inter">WORKS</div>
        </div>
      </div>

      {/* Our Works Section with Blue Layer and High-Quality Card */}
      <div className="relative py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          {/* 背面ブルーレイヤー */}
          <div className="absolute inset-0 rounded-2xl" style={{zIndex:0, background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)', opacity: 0.85}} />
          {/* カード本体 */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-200/70 w-full max-w-full md:max-w-4xl mx-auto" style={{zIndex:1, background: 'rgba(255,255,255,0.10)', boxShadow: '0 12px 48px 0 rgba(59,130,246,0.18), 0 2px 8px rgba(30,58,138,0.10)', backdropFilter: 'blur(16px)'}}>
            {/* 画像レイヤー */}
            <div className="relative h-[320px] sm:h-[400px] md:h-[600px]">
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
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12 flex flex-col justify-between">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
                    {/* Left Content */}
                    <div className="space-y-4 sm:space-y-6 md:space-y-8">
                      <div className="space-y-2 sm:space-y-4 md:space-y-6">
                        <p className="text-gray-300 text-base sm:text-lg tracking-wider">OUR WORK</p>
                        <h2 className="text-white font-bold leading-tight break-words" style={{ fontSize: '2.5rem', lineHeight: 1.1, whiteSpace: 'normal' }}>
                          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6.37rem] leading-tight">WAZAO-IPPON</span>
                        </h2>
                        <h3 className="text-white text-lg sm:text-xl md:text-2xl japanese-text">革新的なソリューションの実績</h3>
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg japanese-text leading-relaxed md:leading-relaxed">
                          AI技術とクリエイティブが融合した、私たちの代表的なプロジェクトをご紹介<br />
                          します。各プロジェクトは独自の課題に対する革新的なアプローチを示してい<br />
                          ます。
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* ボタン */}
                  <div className="mt-6 sm:mt-10 md:mt-12">
                    <button className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all duration-300 border-2 border-white/40 backdrop-blur-md">
                      WEBSITE
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* 高級感のある縁装飾 */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 sm:border-4 border-white/30" style={{boxShadow:'0 0 0 3px rgba(59,130,246,0.10), 0 2px 8px 0 rgba(30,58,138,0.10)'}} />
          </div>
        </div>
      </div>
    </div>
  )
}
