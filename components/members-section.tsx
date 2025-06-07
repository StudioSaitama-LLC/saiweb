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
      name: "CHIAKI KATO",
      nameEn: "",
      position: "代表社員\nTECHNICAL DIRECTOR",
      description:
        "慶應義塾大学卒業後、株式会社NTT データ入社。NTT データにて大規模システム開発を経験後、理化学研究所発VRベンチャーハコスコにて開発部長/プロダクトマネージャとしてXR関連新規技術、事業開発に従事。好きな釣りは渓流トラウト。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "TOMOHIRO SOENO",
      nameEn: "",
      position: "業務執行社員\nBRANDING DIRECTOR",
      description:
        "慶應義塾大学卒業後、株式会社博報堂入社。ブランド戦略部門にてアウターブランディングをはじめ、組織のインターナルブランディングやマーケティングコミュニケーションなど広範に従事。好きな釣りはレイクトラウト・マルタウグイ・サツキマスなど5月の釣り。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "William Takagi",
      nameEn: "",
      position: "業務執行社員\nSALES DIRECTOR",
      description:
        "慶應義塾大学卒業後、みずほ銀行入行。国内大手グルメサービスを運営するスタートアップ企業Rettyにて営業・事業企画としてIPOを経験。その後、日本ロレアル勤務を経て、Google Japan にてStrategy Planning、Sales Opsとして日本法人の戦略策定、実行を担う。好きな釣りはサビキ釣り。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "TAKAHIRO ITO",
      nameEn: "",
      position: "BizDev",
      description:
        "慶應義塾大学卒業後、大手外資系IT企業に入社。ITコンサルタントとして業務改善、システム導入のコンサルティングの提案からデリバリーまでを推進。特に人事領域のコンサルティングを強みとし、タレントマネジメントや、人材組織管理・給与・勤怠などの基幹業務システムのプロジェクトに従事。スタートアップのM&A支援・PMI なども行っている。好きな釣りは小鮒釣り。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "MASANARI MURAMOTO",
      nameEn: "",
      position: "CREATIVE PRODUCER",
      description:
        "2016年 オーストラリアから帰国し、株式会社カラス入社。2020年にCEKAI に参加。クリエイティブ・アートディレクション、プランニング・コピーライティングを領域に、東京五輪やグローバルブランドを多数担当した。2025年から拠点をNYに移す。好きな釣りはエギング。",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "more friends",
      nameEn: "",
      position: "サイの仲間達",
      description:
        "プロジェクトに合わせてチームを拡張し、必要に応じてパートナーと連携します。",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="hero-gradient py-24 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        {/* Members Title */}
        <div className="mb-16">
          <div className="hilowave-text text-center lg:text-left text-[clamp(40px,16vw,256px)]">MEMBER</div>
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
                <h3 className="text-2xl font-medium text-[#2563EB] japanese-text">{member.name}</h3>
                <p className="text-[15px] text-neutral-800 font-normal whitespace-pre-line">{member.position}</p>
                <p className="text-[#2563EB] japanese-text leading-relaxed text-sm font-normal">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
