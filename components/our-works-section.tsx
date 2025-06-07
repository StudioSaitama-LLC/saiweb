export default function OurWorksSection() {
  const projects = [
    {
      title: "WAZAO-IPPON",
      client: "日本の釣りに特化した釣りブランド",
      description: "これからの自然観の発掘をテーマに、日本伝統の釣竿「和竿」を中心に、ローカルな日本の水辺文化を模索する活動体。",
      image: "/images/wazaoipponbackground.jpg",
      link: "https://wazao-ippon.com/"
    },
    {
      title: "ツカノマノスゴイサウナ",
      client: "渋谷屋上のポップアップサウナイベント",
      description: "「渋谷にサイタマを創る」とのコンセプトで開催した期間限定サウナイベント。取り壊しが決まっていた渋谷区神泉のビル屋上で週末限定4ヶ月間実施。700名以上を動員した。ツカノマノフードコート連動企画。",
      image: "/images/ツカノマノスゴイサウナ.JPG",
      link: "https://sauna-ikitai.com/saunas/7004"
    }
  ]

  return (
    <div className="relative">
      {/* PROJECTS Title */}
      <div className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="font-extrabold text-left text-[#3B82F6] leading-[0.8] tracking-[-0.02em] font-inter text-[clamp(40px,16vw,256px)]">PROJECTS</div>
        </div>
      </div>

      {/* Projects Container with Snap Scroll */}
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
        {projects.map((project, index) => (
          <div
            key={index}
            className="h-screen snap-start relative"
          >
            {/* Full Screen Background Image */}
            <div className="absolute inset-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>

            {/* Project Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full">
                <div className="text-[#F5F7FA] space-y-8 font-intel">
                  <h3 className="text-4xl md:text-6xl font-bold tracking-wider">{project.title}</h3>
                  <p className="text-xl md:text-2xl text-[#F5F7FA]/90">{project.client}</p>
                  <div className="w-16 h-px bg-[#F5F7FA]/30 my-6"></div>
                  <p className="text-sm md:text-base text-[#F5F7FA]/80 max-w-2xl leading-relaxed">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-12 bg-[#F5F7FA]/10 hover:bg-[#F5F7FA]/20 text-[#F5F7FA] px-8 py-3 rounded-lg text-base font-medium transition-colors duration-300 backdrop-blur-sm border border-[#F5F7FA]/20"
                    >
                      GO WEB
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
