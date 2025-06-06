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
      <section className="relative flex flex-col min-h-screen justify-start items-center pt-12 pb-0 overflow-hidden">
        {/* ナビゲーションバー */}
        <Navbar />
        <div className="flex flex-row w-full max-w-7xl mx-auto mt-4 items-center justify-between px-6 z-10">
          {/* 左側テキスト */}
          <div className="flex-1 min-w-[320px]">
            <h1 className="text-5xl md:text-6xl font-bold text-[#2576e5] leading-tight mb-8">
              Discover the <span className="text-[#2576e5]">WAVE</span> you<br />
              need,<br />
              and feel the<br />
              New <span className="text-[#2576e5]">WAVE</span>.
            </h1>
            <div className="text-2xl text-black mb-32">
              We consider<br />
              your <span className="text-[#2576e5]">Daily Life</span>
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
          <span className="font-inter font-extrabold text-left" style={{fontSize: '256px', letterSpacing: '-0.04em', color: '#3b82f6', lineHeight: 1}}>STUDIO SAITAMA</span>
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
