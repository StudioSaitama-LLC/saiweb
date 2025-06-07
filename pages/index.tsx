import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import MessageSection from "@/components/message-section"
import { SpecialitySection } from "@/components/speciality-section"
import OurWorksSection from "@/components/our-works-section"
import WorksCardsSection from "@/components/works-cards-section"
import MembersSection from "@/components/members-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <MessageSection />
      <SpecialitySection />
      <OurWorksSection />
      <WorksCardsSection />
      <MembersSection />
      <ContactSection />
      <Footer />
    </main>
  )
} 