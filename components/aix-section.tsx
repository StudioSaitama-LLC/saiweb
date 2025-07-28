export default function AIXSection() {
  return (
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
  )
} 