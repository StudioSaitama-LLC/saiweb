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
          <div className="font-extrabold text-left text-[#3B82F6] leading-[0.8] tracking-[-0.02em] font-inter text-[clamp(40px,16vw,256px)]">WORKS</div>
        </div>
      </div>

      {/* Our Works Section with Blue Layer and High-Quality Card */}
      <div className="relative">
        {/* Blue Layer */}
        <div className="absolute inset-0 bg-[#2563eb] opacity-90" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Project Cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-blue-600 font-bold">{project.category}</span>
                    <span className="text-gray-500">{project.duration}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.client}</p>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
