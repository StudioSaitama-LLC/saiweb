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

      {/* Our Works Section with Boxed Background */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border-4 border-white/30">
            {/* Background Image Container */}
            <div className="relative h-[600px]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/wazaoipponbackground.jpg')",
                }}
              />
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-black/30">
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

            {/* Button Container - Moved inside the card */}
            <div className="absolute bottom-8 left-6">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                WEBSITE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
