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
          <div className="hilowave-text text-center lg:text-left">WAZAO-IPPON</div>
        </div>
      </div>

      {/* Our Works Section with Background */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat snap-start"
        style={{
          backgroundImage: "url('/images/wazaoipponbackground.jpg')",
        }}
      >
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
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
        {/* セクション下部・テキスト左端に揃えて配置 */}
        <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', height: '20vh' }}>
          <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ml-0">
              WEBSITE
            </button>
          </div>
        </div>
      </div>

      {/* 2つ目のWAZAO-IPPONセクション */}
      <div className="relative">
        <div className="hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="hilowave-text text-center lg:text-left">WAZAO-IPPON</div>
          </div>
        </div>
        <div
          className="relative min-h-screen bg-cover bg-center bg-no-repeat snap-start"
          style={{
            backgroundImage: "url('/images/wazaoipponbackground.jpg')",
          }}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
            <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', height: '20vh' }}>
              <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ml-0">
                  WEBSITE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
