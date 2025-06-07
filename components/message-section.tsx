import { InfiniteScroll } from "@/components/InfiniteScroll"

export default function MessageSection() {
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
      </div>
    </div>
  )
}
