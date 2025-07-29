"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import TechStack from "@/components/tech-stack"
import Chatbot from "@/components/chatbot"
import Timeline from "@/components/timeline"
import ProjectsSection from "@/components/projects-section"
import Footer from "@/components/footer"
import Loader from "@/components/Loader"

export default function Home() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // Prevent scrolling during loading and force to top
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    // Force scroll to top immediately and disable smooth scrolling temporarily
    const htmlElement = document.documentElement
    const originalScrollBehavior = htmlElement.style.scrollBehavior
    htmlElement.style.scrollBehavior = 'auto'
    
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
      
      // Re-enable scrolling after a small delay
      setTimeout(() => {
        document.body.style.overflow = 'unset'
        document.documentElement.style.overflow = 'unset'
        htmlElement.style.scrollBehavior = originalScrollBehavior
        
        // Final scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' })
      }, 200)
      
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
      htmlElement.style.scrollBehavior = originalScrollBehavior
    }
  }, [])

  // Prevent any hash-based scrolling or anchor jumping
  useEffect(() => {
    const preventHashScroll = (e: Event) => {
      if (isInitialLoading) {
        e.preventDefault()
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('hashchange', preventHashScroll)
    window.addEventListener('scroll', preventHashScroll)

    return () => {
      window.removeEventListener('hashchange', preventHashScroll)
      window.removeEventListener('scroll', preventHashScroll)
    }
  }, [isInitialLoading])

  return (
    <>
      {isInitialLoading && <Loader />}
      <main 
        className="flex min-h-screen flex-col"
        style={{
          opacity: isInitialLoading ? 0 : 1,
          transition: "opacity 0.8s ease-in-out"
        }}
      >
        <Navbar />
        <HeroSection />
        <TechStack />
        <Chatbot />
        <Timeline />
        <ProjectsSection />
        <Footer />
      </main>
    </>
  )
}
