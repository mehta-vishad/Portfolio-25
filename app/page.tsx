import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import TechStack from "@/components/tech-stack"
import Chatbot from "@/components/chatbot"
import ProjectsSection from "@/components/projects-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <TechStack />
      <Chatbot />
      <ProjectsSection />
      <Footer />
    </main>
  )
}
