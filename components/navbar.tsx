"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Chatbot", href: "#chatbot" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] max-w-6xl ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="#home"
            className="text-xl font-extrabold tracking-tight text-white hover:text-purple-400 transition-colors"
          >
            Vishad Mehta
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-white ml-8" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            {isOpen ? (
              <X size={24} suppressHydrationWarning />
            ) : (
              <Menu size={24} suppressHydrationWarning />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-gray-800/50 backdrop-blur-md rounded-2xl">
          <nav className="flex flex-col py-4 px-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-3 text-gray-300 hover:text-purple-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
