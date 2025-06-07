"use client"

import { useState, useRef, useEffect } from "react"
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
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const works: WorkItem[] = [
    {
      id: 1,
      title: "ファッションメディア「W.W.D」経営戦略立案支援",
      subtitle: "AI導入を軸に、経営資源の最適化および営業支援。従来の意思決定から、データドリブンな経営判断への転換を支援し、組織改変や営業プロセスの最適化に伴走。",
      category: "経営戦略・営業支援・AI導入支援",
      client: "INFAS publications",
      duration: "",
      team: "",
      challenge: "",
      approach: [],
      image: ""
    },
    {
      id: 2,
      title: "XRスタートアップ M&A｜PMI 支援",
      subtitle: "ハコスコ社のM&Aに伴う組織統合プロジェクトを支援。企業文化の融合、業務プロセスの最適化、人材マネジメントの再構築を通じて、シナジー効果の最大化を支援した。",
      category: "M&A・PMI",
      client: "ハコスコ",
      duration: "",
      team: "",
      challenge: "",
      approach: [],
      image: ""
    },
    {
      id: 3,
      title: "出版社新規メディア立ち上げ支援",
      subtitle: "ルアーマガジンなどで知られる内外出版社の親webメディアの立ち上げ支援およびコンテンツ開発を支援。迅速なPoCを実現した。",
      category: "新規事業・PoC",
      client: "内外出版社",
      duration: "",
      team: "",
      challenge: "",
      approach: [],
      image: ""
    },
    {
      id: 4,
      title: "大型複合施設開業期PR支援",
      subtitle: "大宮再開発の象徴として202年にオープンした大宮門街の開業期PR戦略策定~実装を支援。その後も施設内そば屋「SHABA」開業支援や、アートスペース設計など継続的に支援を実施",
      category: "PR・施設運営",
      client: "中央デパート",
      duration: "",
      team: "",
      challenge: "",
      approach: [],
      image: ""
    },
    {
      id: 5,
      title: "AI基盤開発事業者向け国家PJにおけるコミュニティ設計支援",
      subtitle: "経済産業省が実施する国内生成AI基盤開発事業者向け事業「GENIAC」における開発事業者コミュニティの運営支援を実施。社会実装に向けたイベント設計などを並走した。",
      category: "コミュニティ設計・イベント運営",
      client: "BCG",
      duration: "",
      team: "",
      challenge: "",
      approach: [],
      image: ""
    },
    {
      id: 6,
      title: "ローカル運輸カンパニーの経営支援およびブランディング支援",
      subtitle: "観光バス・運輸・プラント工事の3部門からなるローカルカンパニーの経営戦略立案を支援。新規事業のPoCや新入社員教育、クリエイティブの制作などを支援した。",
      category: "人材開発・ブランディング",
      client: "東栄運輸",
      duration: "",
      team: "",
      challenge: "",
      approach: [],
      image: ""
    },
    {
      id: 7,
      title: "ベビーカー国内上市時のマーケティング戦略立案支援",
      subtitle: "シンガポールのベビーカー「hamilton」の国内上市に伴う市場リサーチから上市時のブランド戦略策定を支援",
      category: "マーケティング・ブランディング",
      client: "hamilton",
      duration: "",
      team: "",
      challenge: "",
      approach: [],
      image: ""
    },
    {
      id: 8,
      title: "toB向けEC構築支援",
      subtitle: "老舗お弁当箱メーカーのEC構築を支援。多岐にわたる商品バリエーションのインテグレーションから、EC構築までを支援した",
      category: "EC構築・WEBマーケティング",
      client: "折峰",
      duration: "",
      team: "",
      challenge: "",
      approach: [],
      image: ""
    },
  ]

  const openModal = (work: WorkItem) => {
    setSelectedWork(work)
  }

  const closeModal = () => {
    setSelectedWork(null)
  }

  // 横スクロール位置でアクティブなカードを判定
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const scrollLeft = el.scrollLeft
      const cardWidth = 440 // min-w + gap の目安
      const idx = Math.round(scrollLeft / cardWidth)
      setActiveIdx(idx)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="hero-gradient py-24 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        {/* Works Title 削除 */}
        {/* <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-blue-500 mb-4">CLIENT WORKS</h2>
        </div> */}

        {/* 横スクロールのカード */}
        <div className="relative">
          <div ref={scrollRef} className="flex flex-row gap-8 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
            {works.map((work) => (
              <div
                key={work.id}
                className="rounded-2xl p-8 min-w-[340px] max-w-[380px] h-[260px] bg-white/80 shadow-md flex flex-col justify-between border border-blue-100"
              >
                {/* カテゴリカプセル */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {work.category.split('・').map((cat, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-semibold">
                      {cat}
                    </span>
                  ))}
                </div>
                {/* テキスト中央揃え用ラッパー */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* タイトル */}
                  <h3 className="text-lg font-bold text-blue-700 mb-2 break-words whitespace-pre-line min-h-[48px] flex items-center">{work.title}</h3>
                  {/* 区切り線 */}
                  <div className="w-12 h-px bg-blue-100 my-2 mx-0" />
                  {/* 本文 */}
                  <p className="text-xs text-blue-500 mb-2 break-words whitespace-pre-line min-h-[60px] flex items-center">{work.subtitle}</p>
                </div>
                {/* クライアント名 */}
                <p className="text-[10px] text-blue-400 mt-auto">{work.client}</p>
              </div>
            ))}
          </div>
          {/* ドットインジケーター */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-44px] flex gap-3 z-10">
            {works.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`カード${idx + 1}へスクロール`}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const cardWidth = 440; // min-w + gap の目安
                  el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                }}
                className={`w-5 h-5 rounded-full border-2 border-white shadow-lg transition-all duration-200 focus:outline-none ${activeIdx === idx ? 'bg-[#2563eb] scale-110' : 'bg-[#60a5fa] opacity-60'}`}
              ></button>
            ))}
          </div>
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

        {/* --- AIXセクション追加 --- */}
        <section className="mt-32 w-full">
          <div className="max-w-7xl mx-auto px-6">
            {/* AIX Title */}
            <div className="mb-16">
              <div className="hilowave-text text-left text-[clamp(40px,16vw,256px)]">AIX</div>
            </div>
            {/* AIX説明テキスト */}
            <div className="max-w-5xl mb-12 text-blue-500 text-[20px] sm:text-[24px] md:text-[36px] leading-[1.8] sm:leading-[2.2] md:leading-[2.4] text-left font-bold japanese-text" style={{fontWeight: 900}}>
              <p>AIの波が、やってきました。</p>
              <p>スモールチームの皆さん、またとないチャンスです。</p>
              <p>スタジオサイタマではこれまでの知見をベースに、</p>
              <p>AIによる業務刷新（AIX）に全てを捧げることに決めました。</p>
              <p>Smallチームの突破口AI=SAI を、共に始めましょう。</p>
            </div>
            {/* CTAボタン */}
            <div className="mt-20 flex justify-center">
              <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300">
                今すぐAI協業する
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
