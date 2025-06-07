import { InfiniteScroll } from "@/components/InfiniteScroll"
import { useState } from "react"

export default function MessageSection() {
  // 各カテゴリの単語リスト（バリューカードは除外済み）
  const abilityCategories = [
    {
      label: "Business Design",
      items: ["事業構想", "戦略立案", "組織デザイン", "PoC"],
    },
    {
      label: "System & Development",
      items: ["システム導入", "AI活用設計", "AIエージェント設計", "DX"],
    },
    {
      label: "Brand & Communication",
      items: ["ブランド戦略設計", "理念開発", "リサーチ", "クリエイティブ制作"],
    },
    {
      label: "Community & Growth",
      items: ["コミュニティ運営", "イベント設計", "ナレッジ設計"],
    },
  ];

  // 選択状態を管理（Setで管理）
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // クリック時のトグル関数
  const handleToggle = (word: string) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(word)) {
        newSet.delete(word);
      } else {
        newSet.add(word);
      }
      return newSet;
    });
  };

  return (
    <div className="hero-gradient py-24 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-10 japanese-text text-left">
          <p className="text-[30px] md:text-2xl lg:text-4xl text-blue-500 mb-8">
            「それ、意味あるの？」って言われることに、どこか惹かれてしまう。
          </p>
          <div className="text-[20px] sm:text-[20px] md:text-[24px] text-blue-500 leading-[1.8] sm:leading-[2.2] md:leading-[2.4] space-y-4 font-bold">
            <p>
              効率とか、正解とか、そういうものを追い求める中で、<br />
              静かに失われていったコトがあると思っている。<br />
              そんな曖昧で扱いづらいものにこそ<br />
              人々の熱狂や、文化の種のような、<br />
              新しい価値がある気がしてならない。
            </p>
            <p>
              我々が探すのは、主流ではなく、傍流。
            </p>
            <p>
              それがこれからの日本にとって、<br />
              いちばん必要なんだって信じてる。<br />
              🦏💨
            </p>
          </div>
        </div>
        {/* 無限スクロールアニメーション */}
        <div className="mt-16">
          <InfiniteScroll />
        </div>
        {/* SPECIALITYセクション */}
        <div className="mt-32">
          <div className="font-extrabold text-left text-[#3B82F6] leading-[0.8] tracking-[-0.02em] font-inter text-[84px] lg:text-[256px]">SPECIALITY</div>
          <div className="text-[20px] sm:text-[24px] md:text-[36px] text-blue-500 mt-8 font-bold japanese-text">現場でブリコラージュし、領域を跨いでサイ適を描く</div>

          {/* 3枚のカード（バリュー） */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CHOICE: ALTERNATIVE */}
            <div className="rounded-2xl p-10 bg-[#2563eb] text-white flex flex-col h-full shadow-xl relative">
              <span className="absolute -top-5 left-6 bg-white text-[#2563eb] font-extrabold text-lg px-6 py-2 rounded-full shadow-md border-2 border-[#2563eb] select-none" style={{letterSpacing: '0.08em'}}>CHOICE</span>
              <h3 className="font-extrabold text-3xl mb-4 tracking-tight text-white mt-4">ALTERNATIVE</h3>
              <div className="text-lg font-semibold mb-2 mt-2 text-white">オルタナティブを選ぶ、という選択</div>
              <div className="border-t-2 border-white/40 my-3 w-12" />
              <p className="whitespace-pre-line text-base leading-relaxed text-white">
                主流に流されず、あえて傍流に立つ。
                常識や枠組みに縛られずに選ぶことで、新しい価値と可能性を拓く。
              </p>
            </div>
            {/* TRUST: SMALL TEAMS */}
            <div className="rounded-2xl p-10 bg-[#2563eb] text-white flex flex-col h-full shadow-xl relative">
              <span className="absolute -top-5 left-6 bg-white text-[#2563eb] font-extrabold text-lg px-6 py-2 rounded-full shadow-md border-2 border-[#2563eb] select-none" style={{letterSpacing: '0.08em'}}>TRUST</span>
              <h3 className="font-extrabold text-3xl mb-4 tracking-tight text-white mt-4">SMALL TEAMS</h3>
              <div className="text-lg font-semibold mb-2 mt-2 text-white">小さなチームだからこそ動かせる</div>
              <div className="border-t-2 border-white/40 my-3 w-12" />
              <p className="whitespace-pre-line text-base leading-relaxed text-white">
                中小企業や小規模チームの素早い意思決定、しなやかな挑戦力。
                その特性こそが時代を動かす力になると信じている。
              </p>
            </div>
            {/* POWER: AI COLLABORATION */}
            <div className="rounded-2xl p-10 bg-[#2563eb] text-white flex flex-col h-full shadow-xl relative">
              <span className="absolute -top-5 left-6 bg-white text-[#2563eb] font-extrabold text-lg px-6 py-2 rounded-full shadow-md border-2 border-[#2563eb] select-none" style={{letterSpacing: '0.08em'}}>POWER</span>
              <h3 className="font-extrabold text-3xl mb-4 tracking-tight text-white mt-4">AI COLLABORATION</h3>
              <div className="text-lg font-semibold mb-2 mt-2 text-white">AIとの協働が、組織の手を広げる</div>
              <div className="border-t-2 border-white/40 my-3 w-12" />
              <p className="whitespace-pre-line text-base leading-relaxed text-white">
                AIを中心に、構造の再設計を推し進める。
                式や仕組みを根本から組み替え、柔軟で多様な課題解決に挑む。
              </p>
            </div>
          </div>

          {/* ABILITY（カテゴリごとのボックス） */}
          <div className="mt-12 space-y-8">
            {abilityCategories.map((cat) => (
              <div key={cat.label}>
                <div className="text-xl font-bold text-blue-700 mb-2">{cat.label}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {cat.items.map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => handleToggle(word)}
                      className={`rounded-xl border-2 text-base font-bold py-4 text-center transition-colors duration-200
                        ${selected.has(word)
                          ? 'bg-[#2563eb] text-white border-[#2563eb]'
                          : 'bg-white text-blue-700 border-blue-400'
                        }
                      `}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
