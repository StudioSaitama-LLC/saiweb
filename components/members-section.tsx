import { User } from "lucide-react"

interface Member {
  id: number
  name: string
  nameEn: string
  position: string
  description: string
  image: string
}

export default function MembersSection() {
  const members: Member[] = [
    {
      id: 1,
      name: "山田太郎",
      nameEn: "Taro Yamada",
      position: "CEO / Founder",
      description:
        "AI技術とビジネス戦略の専門家。10年以上のスタートアップ経験を持ち、テクノロジーで社会課題を解決することに情熱を注いでいます。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "佐藤花子",
      nameEn: "Hanako Sato",
      position: "Creative Director",
      description:
        "ブランディングとデザインのエキスパート。国内外の大手企業のクリエイティブディレクションを手がけ、数々の賞を受賞しています。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "鈴木一郎",
      nameEn: "Ichiro Suzuki",
      position: "AI Engineer",
      description:
        "機械学習とデータサイエンスの専門家。大学院でAI研究に従事し、複数の論文を発表。実用的なAIソリューションの開発に取り組んでいます。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "田中美咲",
      nameEn: "Misaki Tanaka",
      position: "UX Designer",
      description:
        "ユーザー体験デザインの専門家。人間中心設計のアプローチで、使いやすく美しいインターフェースを創造しています。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "高橋健太",
      nameEn: "Kenta Takahashi",
      position: "Full Stack Developer",
      description:
        "フロントエンドからバックエンドまで幅広い技術領域をカバー。最新技術を活用した高品質なWebアプリケーション開発を得意としています。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "中村麻衣",
      nameEn: "Mai Nakamura",
      position: "Marketing Strategist",
      description:
        "デジタルマーケティングとブランド戦略の専門家。データドリブンなアプローチで効果的なマーケティング施策を企画・実行しています。",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="hero-gradient py-24 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        {/* Members Title */}
        <div className="mb-16">
          <div className="hilowave-text text-center lg:text-left text-[clamp(40px,16vw,84px)]">MEMBER</div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="nav-pill rounded-3xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Profile Image */}
              <div className="mb-6 flex justify-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={48} className="text-gray-400" />
                </div>
              </div>

              {/* Member Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600 japanese-text">{member.name}</h3>
                <p className="text-lg text-blue-500 font-medium">{member.position}</p>
                <p className="text-blue-500 japanese-text leading-relaxed text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
