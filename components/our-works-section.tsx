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

      {/* Our Works Section with Background */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/circuit-board-bg.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-gray-300 text-lg tracking-wider">SELECTED</p>
                <h2 className="text-white text-5xl md:text-6xl font-bold leading-tight">
                  OUR
                  <br />
                  <span className="text-blue-400">WORKS</span>
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

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
                <span>VIEW ALL PROJECTS</span>
                <span>→</span>
              </button>
            </div>

            {/* Right Content - Project Cards */}
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="nav-pill rounded-2xl p-6 backdrop-blur-md bg-white bg-opacity-10 border border-white border-opacity-20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                      <span className="text-gray-300 text-sm">{project.duration}</span>
                    </div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  </div>

                  <h4 className="text-white text-xl font-bold mb-2">{project.title}</h4>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
                    <span className="text-gray-300 text-sm japanese-text">{project.client}</span>
                  </div>

                  <p className="text-gray-300 text-sm japanese-text leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
