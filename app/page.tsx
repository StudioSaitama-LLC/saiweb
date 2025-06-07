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
import { SpecialitySection } from "@/components/speciality-section"

const ModelViewer = dynamic(() => import('@/components/model-viewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8ff] overflow-x-hidden">
      <section id="top" className="relative flex flex-col min-h-screen justify-start items-center pt-12 pb-0 overflow-hidden">
        {/* ナビゲーションバー */}
        <Navbar />
        <div className="relative w-full max-w-7xl mx-auto mt-4 items-start justify-between px-6 z-10 flex flex-col md:flex-row">
          {/* 左側テキスト */}
          <div className="flex-1 min-w-0 w-full z-10 flex flex-col justify-center">
            <h1 className="text-[35px] md:text-6xl font-bold text-[#2576e5] leading-tight mb-4 mt-10 md:mt-[120px]">
              <span className="text-[#2576e5]">Polish the HORN you</span><br />
              <span className="text-blue-600">own,</span><br />
              <span className="text-[#2576e5]">sharpen it,</span><br />
              <span className="text-blue-600">sharpen, sharpen it.</span>
            </h1>
            <div className="text-[18px] md:text-2xl text-black mb-4">
              We're <span className="text-[#3B82F6]">SAI</span>.<br />
              And so are you.
            </div>
          </div>
          {/* 3Dモデル */}
          <div className="flex-1 min-w-0 w-full flex justify-center md:justify-end items-center md:h-[80vh] mt-0 md:mt-0">
            <div className="w-[210px] h-[255px] md:w-[600px] md:h-[700px] flex items-end md:items-center justify-center md:justify-end pointer-events-none">
              <ModelViewer />
            </div>
          </div>
        </div>
        {/* 中央下段の大きなテキスト */}
        <div className="w-full max-w-7xl mx-auto px-6 flex justify-start pointer-events-none select-none z-20 mt-8">
          <span className="font-inter font-extrabold text-left text-[#3b82f6] leading-[1] tracking-[-0.04em] text-[clamp(40px,16vw,256px)]">STUDIO SAITAMA</span>
        </div>
      </section>
      <MessageSection />
      <ValuesSection />
      <SpecialitySection />
      <OurWorksSection />
      <WorksCardsSection />
      <MembersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
