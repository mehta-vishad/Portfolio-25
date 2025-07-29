"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/data/projects"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-80 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto bg-gray-700/80 backdrop-blur-md rounded-3xl border border-gray-500 shadow-xl"
      >
        {/* Header with rounded top corners */}
        <div className="sticky top-0 z-10 bg-gray-700/90 backdrop-blur-md border-b border-gray-600 p-4 md:p-6 rounded-t-3xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title and close button row on mobile */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-extrabold text-white pr-4">{project.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Tech stack icons - separate row on mobile */}
            <div className="flex gap-2 justify-center md:justify-end flex-wrap">
              {project.techStack.map((tech, index) => (
                <div key={index} className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src={`/images/tech/${tech.split('/').pop()}`}
                    alt={`${tech.split('/').pop()?.split('.')[0]} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* Project image and overview in a flex layout */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Project image - smaller and to the side */}
            <div className="md:w-1/3 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            {/* Overview - beside the image on larger screens */}
            <div className="md:w-2/3">
              <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-3">Overview</h3>
              <p className="text-white font-medium text-sm md:text-base">{project.overview}</p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-3">Technologies Used</h3>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {Object.entries(project.technologiesUsed).map(([key, value]) => (
                <div key={key} className="bg-gray-800/70 p-3 md:p-4 rounded-xl">
                  <span className="font-bold text-white capitalize text-sm md:text-base">{key}: </span>
                  <span className="text-gray-200 font-medium text-sm md:text-base">{Array.isArray(value) ? value.join(", ") : value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-3">Key Features</h3>
            <ul className="list-disc pl-4 md:pl-5 space-y-2 md:space-y-3 text-white font-medium text-sm md:text-base">
              {project.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Challenges and Solutions */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-3">Challenges & Solutions</h3>
            <ul className="list-disc pl-4 md:pl-5 space-y-2 md:space-y-3 text-white font-medium text-sm md:text-base">
              {project.challengesAndSolutions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Conclusion */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-3">Conclusion</h3>
            <p className="text-white font-medium text-sm md:text-base">{project.conclusion}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
