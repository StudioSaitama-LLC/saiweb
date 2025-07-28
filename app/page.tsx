'use client';

import Navbar from "@/components/navbar"
import MessageSection from "@/components/message-section"
import ValuesSection from "@/components/values-section"
import OurWorksSection from "@/components/our-works-section"
// import WorksCardsSection from "@/components/works-cards-section" // 一時的に非表示
import AIXSection from "@/components/aix-section"
import MembersSection from "@/components/members-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { SpecialitySection } from "@/components/speciality-section"
import HeroSection from "@/components/hero-section"
import PageWrapper from "@/components/PageWrapper"

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <MessageSection />
        <ValuesSection />
        <SpecialitySection />
        <OurWorksSection />
        {/* <WorksCardsSection /> */} {/* 一時的に非表示 */}
        <AIXSection />
        <MembersSection />
        <ContactSection />
        <Footer />
      </main>
    </PageWrapper>
  );
}
