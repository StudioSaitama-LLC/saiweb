"use client"

import { useState } from "react"
import { X, ImageIcon } from "lucide-react"

interface WorkItem {
  id: number
  title: string
  subtitle: string
  category: string
  client: string
  duration: string
  team: string
  challenge: string
  approach: string[]
  image: string
}

export default function WorksCardsSection() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null)

  const works: WorkItem[] = [
    {
      id: 1,
      title: "Product Design",
      subtitle: "革新的なプロダクトデザイン",
      category: "プロダクトデザイン",
      client: "テクノロジー企業A社",
      duration: "6ヶ月",
      team: "プロダクトデザイナー3名、エンジニア2名",
      challenge:
        "既存のUIが複雑で、ユーザビリティに課題がありました。特に新規ユーザーの離脱率が高く、直感的な操作性の向上が急務でした。",
      approach: [
        "ユーザーインタビューとペルソナ設計",
        "情報アーキテクチャの再構築",
        "プロトタイプによる検証とイテレーション",
        "デザインシステムの構築",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Branding",
      subtitle: "ブランドアイデンティティ構築",
      category: "ブランディング",
      client: "フィンテック スタートアップ",
      duration: "4ヶ月",
      team: "ブランドデザイナー2名、コピーライター1名",
      challenge:
        "新規事業立ち上げに伴い、ゼロからブランドアイデンティティを構築する必要がありました。ターゲット層への訴求力と差別化が重要な課題でした。",
      approach: [
        "競合分析とマーケットリサーチ",
        "ブランドコンセプトの策定",
        "ビジュアルアイデンティティの開発",
        "ブランドガイドラインの制作",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "AI Development",
      subtitle: "AIを活用したソリューション開発",
      category: "AI開発",
      client: "製造業B社",
      duration: "8ヶ月",
      team: "AIエンジニア3名、データサイエンティスト2名",
      challenge:
        "製造ラインの品質管理において、人的ミスによる不良品の発生が課題でした。AIによる自動検査システムの導入が求められていました。",
      approach: [
        "データ収集と前処理",
        "機械学習モデルの開発",
        "リアルタイム検査システムの構築",
        "継続的な学習機能の実装",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Web Development",
      subtitle: "次世代Webアプリケーション",
      category: "Web開発",
      client: "Eコマース企業C社",
      duration: "5ヶ月",
      team: "フロントエンドエンジニア2名、バックエンドエンジニア2名",
      challenge:
        "既存のECサイトのパフォーマンスが低く、モバイル対応も不十分でした。ユーザー体験の向上とコンバージョン率の改善が必要でした。",
      approach: [
        "パフォーマンス分析と最適化",
        "レスポンシブデザインの実装",
        "PWA化による高速化",
        "A/Bテストによる継続改善",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "Mobile App",
      subtitle: "革新的なモバイルアプリ",
      category: "モバイルアプリ",
      client: "ヘルスケア企業D社",
      duration: "7ヶ月",
      team: "モバイルエンジニア3名、UIデザイナー2名",
      challenge: "健康管理アプリの開発において、継続的な利用を促すUXデザインと、正確なデータ計測が課題でした。",
      approach: [
        "ユーザージャーニーマップの作成",
        "ゲーミフィケーション要素の導入",
        "センサーデータの高精度化",
        "パーソナライゼーション機能の実装",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      title: "Data Analytics",
      subtitle: "データドリブンな意思決定支援",
      category: "データ分析",
      client: "小売業E社",
      duration: "6ヶ月",
      team: "データアナリスト2名、ビジュアライゼーションデザイナー1名",
      challenge: "膨大な販売データを活用できておらず、在庫管理や需要予測の精度向上が求められていました。",
      approach: [
        "データウェアハウスの構築",
        "予測モデルの開発",
        "ダッシュボードの設計・開発",
        "レポート自動化システムの構築",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const openModal = (work: WorkItem) => {
    setSelectedWork(work)
  }

  const closeModal = () => {
    setSelectedWork(null)
  }

  return (
    <div className="hero-gradient py-24 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        {/* Works Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-blue-500 mb-4">Works</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div
              key={work.id}
              className="nav-pill rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              onClick={() => openModal(work)}
            >
              {/* Image Placeholder */}
              <div className="bg-gray-200 rounded-lg h-48 mb-6 flex items-center justify-center">
                <ImageIcon size={48} className="text-gray-400" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600">{work.title}</h3>
                <p className="text-blue-500 japanese-text">{work.subtitle}</p>

                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2">
                  <span>Read</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedWork && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="nav-pill rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex flex-col lg:flex-row h-full">
                {/* Left Side - Image */}
                <div className="lg:w-1/2 bg-gray-200 flex items-center justify-center min-h-[300px] lg:min-h-[600px]">
                  <ImageIcon size={64} className="text-gray-400" />
                </div>

                {/* Right Side - Content */}
                <div className="lg:w-1/2 p-8 overflow-y-auto max-h-[600px]">
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <X size={24} />
                  </button>

                  {/* Content */}
                  <div className="space-y-6 japanese-text">
                    <h2 className="text-3xl font-bold text-blue-600">{selectedWork.title}</h2>
                    <p className="text-lg text-blue-500">[{selectedWork.category}]</p>

                    <div className="space-y-3">
                      <p className="text-blue-500">
                        <span className="font-semibold">クライアント:</span> {selectedWork.client}
                      </p>
                      <p className="text-blue-500">
                        <span className="font-semibold">期間:</span> {selectedWork.duration}
                      </p>
                      <p className="text-blue-500">
                        <span className="font-semibold">チーム:</span> {selectedWork.team}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-blue-600">【課題】</h3>
                      <p className="text-blue-500 leading-relaxed">{selectedWork.challenge}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-blue-600">【アプローチ】</h3>
                      <ol className="space-y-2">
                        {selectedWork.approach.map((item, index) => (
                          <li key={index} className="text-blue-500 leading-relaxed">
                            {index + 1}. {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
