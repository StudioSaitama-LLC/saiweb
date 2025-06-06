import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import MessageSection from "@/components/message-section"
import ValuesSection from "@/components/values-section"
import OurWorksSection from "@/components/our-works-section"
import WorksCardsSection from "@/components/works-cards-section"
import MembersSection from "@/components/members-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen snap-y snap-mandatory overflow-y-scroll">
      <Navbar />
      <HeroSection />
      <MessageSection />
      <ValuesSection />
      <OurWorksSection />
      <WorksCardsSection />
      <MembersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
