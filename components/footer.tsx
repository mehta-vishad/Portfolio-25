"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, Linkedin } from "lucide-react"

export default function Footer() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const contactInfo = [
    {
      id: "email",
      icon: <Mail className="h-5 w-5" />,
      text: "mehta.vishad@northeastern.edu",
      href: "mailto:mehta.vishad@northeastern.edu",
    },
    {
      id: "phone",
      icon: <Phone className="h-5 w-5" />,
      text: "+1 857-395-4511",
      href: "tel:+18573954511",
    },
    {
      id: "linkedin",
      icon: <Linkedin className="h-5 w-5" />,
      text: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile",
    },
  ]

  const navLinks = [
    { name: "AMA", href: "#ama" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
  ]

  return (
    <footer id="contact" className="bg-black text-white py-12">
      <div className="w-[90%] max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left side - Let's Connect text */}
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Let's Connect!</h2>
            <p className="text-gray-300 text-lg">I'm open to new opportunities and collaborations.</p>
          </div>

          {/* Right side - Contact information */}
          <div className="flex flex-col space-y-4">
            {contactInfo.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center space-x-3 group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                target={item.id === "linkedin" ? "_blank" : undefined}
                rel={item.id === "linkedin" ? "noopener noreferrer" : undefined}
              >
                <span className="text-gray-300 group-hover:text-white transition-colors">{item.icon}</span>
                <span
                  className={`transition-all ${
                    hoveredItem === item.id
                      ? "bg-purple-600 px-2 py-1 -mx-2 rounded"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {item.text}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 my-8"></div>

        {/* Bottom navigation and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="flex space-x-8 mb-4 md:mb-0">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="text-gray-400 text-sm">© All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}
