'use client';

import Navbar from "@/components/navbar"
import MessageSection from "@/components/message-section"
import OurWorksSection from "@/components/our-works-section"
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
        <SpecialitySection />
        <OurWorksSection />
        <AIXSection />
        <MembersSection />
        <ContactSection />
        <Footer />
      </main>
    </PageWrapper>
  );
}
