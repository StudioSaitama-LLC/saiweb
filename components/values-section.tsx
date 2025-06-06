export default function ValuesSection() {
  const values = [
    {
      title: "STANCE:ALTERNATIVE",
      subtitle: "オルタナティブにこそ、価値を見出す",
      description: `主流から外れた"傍流"にこそ、まだ見ぬ価値が眠っている。
私たちは、常識や枠組みにとらわれず、あえて選ばれない選択肢にBETすることで、
新しい可能性を切り拓く。`,
    },
    {
      title: "RESPECT:SMALL TEAMS",
      subtitle: "小さなチームが、時代を動かす",
      description: `中小事業者や小さなチームだからこそできる、素早い意思決定と柔軟な挑戦。
私たちは、規模にとらわれず、独自の視点と行動力で社会に新しい波を起こします。`,
    },
    {
      title: "POWER:AI",
      subtitle: "AIにフルベット",
      description: `AIは、単なる効率化の道具ではありません。
私たちはAIを、人間の問いや余白、曖昧さを受け止める"相棒"として捉えています。`,
    },
  ]

  return (
    <div className="hero-gradient py-24 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="nav-pill rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              <h3 className="text-blue-600 font-bold text-xl mb-2">{value.title}</h3>
              <h4 className="text-blue-500 text-lg mb-6 japanese-text">{value.subtitle}</h4>
              <p className="text-blue-500 japanese-text whitespace-pre-line text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
