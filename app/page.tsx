'use client';

import dynamic from 'next/dynamic';
import Navbar from "@/components/navbar"
import MessageSection from "@/components/message-section"
import ValuesSection from "@/components/values-section"
import OurWorksSection from "@/components/our-works-section"
import WorksCardsSection from "@/components/works-cards-section"
import MembersSection from "@/components/members-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

const ModelViewer = dynamic(() => import('@/components/model-viewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8ff]">
      <section id="top" className="relative flex flex-col min-h-screen justify-start items-center pt-12 pb-0 overflow-hidden">
        {/* ナビゲーションバー */}
        <Navbar />
        <div className="flex flex-row w-full max-w-7xl mx-auto mt-4 items-center justify-between px-6 z-10">
          {/* 左側テキスト */}
          <div className="flex-1 min-w-[320px]">
            <h1 className="text-5xl md:text-6xl font-bold text-[#2576e5] leading-tight mb-8">
              <span className="text-[#2576e5]">Polish the HORN you</span><br />
              <span className="text-blue-600">own,</span><br />
              <span className="text-[#2576e5]">sharpen it,</span><br />
              <span className="text-blue-600">sharpen, sharpen it.</span>
            </h1>
            <div className="text-2xl text-black mb-32">
              We're <span className="text-[#3B82F6]">SAI</span>.<br />
              And so are you.
            </div>
          </div>
          {/* 右側の3Dモデル（画面いっぱい） */}
          <div className="flex-1 flex justify-center items-center min-w-[320px] h-[60vh] md:h-[80vh] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <ModelViewer />
            </div>
          </div>
        </div>
        {/* 中央下段の大きなテキスト */}
        <div className="w-full max-w-7xl mx-auto px-6 flex justify-start pointer-events-none select-none z-20 mt-8">
          <span className="font-inter font-extrabold text-left text-[#3b82f6] leading-[1] tracking-[-0.04em] text-[clamp(40px,16vw,84px)]">STUDIO SAITAMA</span>
        </div>
      </section>
      <MessageSection />
      <ValuesSection />
      <OurWorksSection />
      <WorksCardsSection />
      <MembersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
