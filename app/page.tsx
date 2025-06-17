'use client';

import Navbar from "@/components/navbar"
import MessageSection from "@/components/message-section"
import ValuesSection from "@/components/values-section"
import OurWorksSection from "@/components/our-works-section"
import WorksCardsSection from "@/components/works-cards-section"
import MembersSection from "@/components/members-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { SpecialitySection } from "@/components/speciality-section"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <MessageSection />
        <ValuesSection />
        <SpecialitySection />
        <OurWorksSection />
        <WorksCardsSection />
        <MembersSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
